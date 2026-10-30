"use client";

import { motion, useInView } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";

import { DURATION, EASE } from "@/components/motion";
import { useReducedMotion } from "@/hooks";

import { MarkSlot, Reticle } from "./StackedMark";

/* Measure at a fixed size and scale linearly from it. 100px keeps the maths
   legible in the devtools and is well clear of any font-size hinting. */
const PROBE_PX = 100;
const MIN_PX = 40;
const MAX_PX = 384;
/* The reticle sits this far outside the word at each edge. */
const INSET = 24;

/**
 * The giant footer mark (lessons.md D-022): the header's stacked word at the
 * width of the page. "haris" is sized to span gutter to gutter by measuring,
 * not from the typeface's advance width, so it survives a change of family;
 * "izm" takes the same size underneath in the accent, with the rolling slot
 * beside it at a tenth of the line. The reticle frames the block.
 *
 * The server renders a safe `clamp()` so the mark is never absent or
 * overflowing before hydration; the layout effect then fits it exactly and
 * refits when the box resizes or the real font lands. The size is written
 * straight to the node and mirrored into state only for the slot, whose em
 * scale needs the number.
 *
 * Motion (D-017): the two lines rise from behind a clip when the block
 * scrolls into view, the second a beat after the first, and the reticle
 * corners land last. Under reduced motion everything is simply there.
 */
export function FooterMark() {
  const reduced = useReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [fitted, setFitted] = useState<number | null>(null);
  const inView = useInView(boxRef, { once: true, amount: 0.3 });

  useLayoutEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;
    if (box === null || text === null) return;
    let cancelled = false;

    const fit = () => {
      if (cancelled) return;
      text.style.fontSize = `${PROBE_PX}px`;
      const probed = text.getBoundingClientRect().width;
      if (probed === 0) {
        text.style.fontSize = "";
        return;
      }
      const size = Math.min(MAX_PX, Math.max(MIN_PX, (PROBE_PX * (box.clientWidth - INSET * 2)) / probed));
      text.style.fontSize = `${size}px`;
      setFitted(size);
    };

    fit();
    void document.fonts.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  const show = reduced || inView;
  const rise = (delay: number) => ({
    initial: reduced ? false : { y: "100%" },
    animate: { y: show ? 0 : "100%" },
    transition: { duration: DURATION.slow, ease: EASE, delay },
  });

  return (
    <div ref={boxRef} className="group relative w-full overflow-hidden" style={{ padding: INSET }}>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0"
        initial={reduced ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.96 }}
        transition={{ duration: DURATION.base, ease: EASE, delay: 0.5 }}
      >
        <Reticle size={28} thickness={3} />
      </motion.span>

      <span
        ref={textRef}
        className="inline-flex flex-col font-display text-[clamp(2.5rem,19vw,24rem)] font-bold leading-[0.92] tracking-[0.01em]"
      >
        <span className="block overflow-hidden pb-[0.04em]">
          <motion.span className="block text-ink" {...rise(0)}>
            haris
          </motion.span>
        </span>
        <span className="flex items-end gap-[0.12em] overflow-hidden pb-[0.04em]">
          <motion.span className="block text-accent" {...rise(0.12)}>
            izm
          </motion.span>
          {fitted !== null ? (
            <motion.span className="block" {...rise(0.24)}>
              {/* Lifted to the baseline of "izm": the line box carries the
                  face's descender space underneath. */}
              <MarkSlot style={{ fontSize: fitted * 0.1, marginBottom: fitted * 0.17 }} />
            </motion.span>
          ) : null}
        </span>
      </span>
    </div>
  );
}
