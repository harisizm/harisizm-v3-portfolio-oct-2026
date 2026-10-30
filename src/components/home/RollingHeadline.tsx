"use client";

import { AnimatePresence, animate, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { EASE } from "@/components/motion";
import { Icon } from "@/components/ui";
import { heroLines, heroRoll, type HeroSegment } from "@/data";
import { useReducedMotion } from "@/hooks";

/**
 * The hero headline as three rolling rows (lessons.md D-018).
 *
 * A line is never on screen half-written. It holds, complete and readable,
 * for `heroRoll.hold`; then each row slides up out of its clip, one after
 * another, and the next line's rows slide in from below the same way. The
 * stat counts up from zero as its row lands. The typewriter this replaced
 * spent most of every cycle showing a fragment.
 *
 * The server renders the first line complete, so the page never opens on an
 * empty hero and crawlers read a whole sentence (T-019). The cycle runs only
 * while the pointer is not on the headline and never under reduced motion,
 * where the first line simply stays.
 *
 * Each row clips its own content, so the block never changes height while a
 * line changes and nothing below it moves.
 */

/* Rows leave on a firm curve and arrive on the house ease. Seconds. */
const EXIT_EASE: [number, number, number, number] = [0.6, 0, 0.4, 1];
const OUT = heroRoll.out / 1000;
const IN = heroRoll.in / 1000;
const STAGGER = heroRoll.stagger / 1000;

/* The whole exchange, in ms: the last row leaves, then the last row arrives. */
const SWAP = heroRoll.out + heroRoll.in + heroRoll.stagger * 4;

export function RollingHeadline({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const [line, setLine] = useState(0);
  const [paused, setPaused] = useState(false);
  /* True once a line has rolled in: only those count their stat. The server's
     first line is already final and must stay that way. */
  const [rolled, setRolled] = useState(false);

  const cycling = !reduced && heroLines.length > 1;

  useEffect(() => {
    if (!cycling || paused) return;
    const id = window.setTimeout(() => {
      setLine((l) => (l + 1) % heroLines.length);
      setRolled(true);
    }, heroRoll.hold + SWAP);
    return () => window.clearTimeout(id);
  }, [cycling, paused, line]);

  const current = heroLines[reduced ? 0 : line];

  return (
    <h1
      className={`text-left font-display font-bold uppercase leading-[0.9] ${className}`}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {current.map((segments, i) => (
        /* The clip. The bottom padding and matching negative margin extend it
           below the line box, so the serif's descenders and the comma in
           "10,000" are not cut at line-height 0.9. */
        <span key={i} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`${line}-${i}`}
              className="block"
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              exit={{
                y: "-115%",
                transition: { duration: OUT, ease: EXIT_EASE, delay: i * STAGGER },
              }}
              transition={{ duration: IN, ease: EASE, delay: i * STAGGER }}
            >
              <Row segments={segments} count={rolled && cycling} />
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </h1>
  );
}

function Row({
  segments,
  count,
}: {
  segments: readonly HeroSegment[];
  count: boolean;
}) {
  return (
    <>
      {segments.map((segment, j) => (
        <span key={j}>
          {segment.accent ? (
            <Stat text={segment.text} count={count} />
          ) : (
            segment.text
          )}
          {/* The figure's picture, sized to the cap height so it sits inside
              the row's clip, drawn in the accent whatever the words are. */}
          {segment.icon ? (
            <Icon
              name={segment.icon}
              size={0.62}
              className="ml-[0.18em] -translate-y-[0.03em] align-baseline text-accent"
            />
          ) : null}
        </span>
      ))}
    </>
  );
}

/* The leading run of digits, with any thousands separators; the rest of the
   segment is literal. "ten minutes." has no digits and never counts. */
const LEADING_INTEGER = /^(\d{1,3}(?:,\d{3})+|\d+)([\s\S]*)$/;
const GROUPED = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

/**
 * The stat: `--accent`, in the italic serif against the squared display face,
 * and not uppercased, since lowercase is where the italic reads as a hand
 * next to type. Counts up from zero as its row lands, with an invisible copy
 * of the final digits holding the width so the words after it do not shuffle.
 */
function Stat({ text, count }: { text: string; count: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = LEADING_INTEGER.exec(text);
  const digits = match?.[1] ?? null;
  const rest = match?.[2] ?? text;
  const grouped = digits?.includes(",") ?? false;
  const target = digits === null ? 0 : Number(digits.replace(/,/g, ""));
  const running = count && digits !== null;

  useEffect(() => {
    const node = ref.current;
    if (!running || node === null) return;
    const format = (n: number) =>
      grouped ? GROUPED.format(n) : String(Math.round(n));
    node.textContent = format(0);
    const controls = animate(0, target, {
      duration: heroRoll.count / 1000,
      /* Starts once the row is inside its clip, so the zero is never seen
         sliding in. */
      delay: IN * 0.4,
      ease: EASE,
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });
    return () => controls.stop();
  }, [running, target, grouped]);

  const skin = "font-serif text-[1.08em] font-normal normal-case italic text-accent";

  if (digits === null) return <span className={skin}>{text}</span>;

  return (
    <span className={skin}>
      <span className="relative inline-block tabular-nums">
        <span aria-hidden="true" className="invisible">
          {digits}
        </span>
        <span ref={ref} className="absolute inset-0">
          {digits}
        </span>
      </span>
      {rest}
    </span>
  );
}
