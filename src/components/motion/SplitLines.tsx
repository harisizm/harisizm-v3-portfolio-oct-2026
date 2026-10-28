"use client";

import { motion, useInView } from "motion/react";
import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";

import { useReducedMotion } from "@/hooks";

import { DURATION, EASE, STAGGER } from "./tokens";

export type SplitLinesTag = "h1" | "h2" | "h3" | "p" | "span" | "div";

export interface SplitLinesProps {
  /** Plain text only. Markup inside a headline splits as separate instances. */
  children: string;
  as?: SplitLinesTag;
  className?: string;
  /** Seconds before the first line starts. */
  delay?: number;
  /** Seconds between lines. */
  stagger?: number;
  duration?: number;
  /** Fraction of the block that must be in view before the lines rise. */
  amount?: number;
}

/**
 * A headline whose lines rise one after another from behind a clip.
 *
 * The server renders the words inline, so the text is a normal headline with
 * JS off and for crawlers. On the client the words are measured once they
 * have wrapped, grouped into lines by their top offset, and re-rendered as
 * one block per line with the rise inside an `overflow-hidden` wrapper.
 *
 * Measurement happens on an invisible, `aria-hidden` twin that stays inline
 * forever, so a resize re-measures without un-splitting the visible lines.
 * A `ResizeObserver` on the twin covers width changes and `document.fonts`
 * covers the swap from fallback metrics to the real face.
 *
 * `text-indent` is honoured on the first line only; the twin inherits it the
 * same way. Padding on the element is not: the twin fills the padding box,
 * so put the padding on a parent.
 */
export function SplitLines({
  children: text,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = STAGGER,
  duration = DURATION.base,
  amount = 0.2,
}: SplitLinesProps) {
  const reduced = useReducedMotion();
  const twinRef = useRef<HTMLSpanElement>(null);
  /* In-view is read on the whole block, never on a line: a line starts
     translated fully outside its overflow-hidden clip, and IntersectionObserver
     honours ancestor clipping, so the line itself would intersect nothing and a
     `whileInView` on it could never fire. */
  const blockRef = useRef<HTMLElement>(null);
  const inView = useInView(blockRef, { once: true, amount });
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [lines, setLines] = useState<string[] | null>(null);
  /* Measurement can fail to land (a bailed hydration, a hot reload that reset
     state, a font that never reports ready). The headline must not depend on
     it: after a short grace the inline words show on their own, and a late
     measurement only upgrades them into rising lines. */
  const [grace, setGrace] = useState(false);

  const words = text.split(/\s+/).filter(Boolean);

  useEffect(() => {
    const id = window.setTimeout(() => setGrace(true), 700);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const twin = twinRef.current;
    if (twin === null || reduced) return;

    const measure = () => {
      const grouped: string[] = [];
      let lastTop: number | null = null;
      wordRefs.current.forEach((node, index) => {
        if (node === null || index >= words.length) return;
        const top = node.offsetTop;
        if (lastTop === null || Math.abs(top - lastTop) > 1) {
          grouped.push(words[index]);
          lastTop = top;
        } else {
          grouped[grouped.length - 1] += ` ${words[index]}`;
        }
      });
      if (grouped.length === 0) return;
      setLines((prev) =>
        prev !== null &&
        prev.length === grouped.length &&
        prev.every((line, i) => line === grouped[i])
          ? prev
          : grouped,
      );
    };

    const observer = new ResizeObserver(measure);
    observer.observe(twin);
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) measure();
    });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
    // `words` is derived from `text`; the string is the stable dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, reduced]);

  const split = !reduced && lines !== null;
  /* Hidden only while a split is still plausible, so the inline words do not
     flash before their copies rise. `MotionBoot` lifts this for JS-off and
     reduced; `grace` lifts it when measurement never arrives. */
  const style: CSSProperties = { opacity: split || reduced || grace ? 1 : 0 };

  const inline = words.map((word, i) => (
    <Fragment key={i}>
      {i > 0 ? " " : null}
      <span>{word}</span>
    </Fragment>
  ));

  return (
    <Tag
      ref={blockRef as never}
      data-enter=""
      className={`relative block ${className}`}
      style={style}
    >
      {split
        ? lines.map((line, i) => (
            /* The clip gets a little vertical slack and gives it back as
               negative margin: at tight line-heights the glyphs overshoot
               the line box, and a flush clip would shave the ascenders. */
            <span
              key={`${i}-${line}`}
              className="block overflow-hidden"
              style={{
                paddingBlock: "0.12em",
                marginBlock: "-0.12em",
                textIndent: i === 0 ? undefined : 0,
              }}
            >
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: inView ? 0 : "110%" }}
                transition={{ duration, delay: delay + i * stagger, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))
        : inline}

      <span
        ref={twinRef}
        aria-hidden="true"
        className="invisible absolute inset-0 block"
      >
        {words.map((word, i) => (
          <Fragment key={i}>
            {i > 0 ? " " : null}
            <span
              ref={(node) => {
                wordRefs.current[i] = node;
              }}
            >
              {word}
            </span>
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
