"use client";

import { useLayoutEffect, useRef } from "react";

import { site } from "@/lib/site";

/* Measure at a fixed size and scale linearly from it. 100px keeps the maths
   legible in the devtools and is well clear of any font-size hinting. */
const PROBE_PX = 100;
const MIN_PX = 40; // 2.5rem
const MAX_PX = 384; // 24rem

/**
 * The giant footer wordmark — audit B7, design.md §9.1 item 8.
 *
 * Sized to span gutter to gutter by MEASURING, not from the typeface's advance
 * width: the display family is about to change (audit A2), and any formula
 * derived from any one family's advance width would be wrong the day it does.
 * The server renders a safe `clamp()` so the mark is never absent or
 * overflowing before hydration; the layout effect then fits it exactly, and
 * refits when the container resizes or the real font lands (`swap` means the
 * first measurement may be of the fallback's metrics).
 *
 * It writes `font-size` straight to the node rather than through state: no
 * re-render, no setState-in-effect, and the class-based clamp stays as the
 * no-JS fallback since nothing on the React side ever owns the style.
 */
export function FooterWordmark() {
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

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
      const fitted = (PROBE_PX * box.clientWidth) / probed;
      text.style.fontSize = `${Math.min(MAX_PX, Math.max(MIN_PX, fitted))}px`;
    };

    fit();
    void document.fonts.ready.then(fit);

    /* The box is a block, so a change of font-size never changes its width —
       the observer cannot feed back on itself. */
    const observer = new ResizeObserver(fit);
    observer.observe(box);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    /* `overflow-hidden` is the guarantee, not the intent: between the clamp and
       the fit, at no width can this push the page sideways. */
    <div ref={boxRef} className="w-full overflow-hidden">
      {/* `inline-block`, not `block`: a block span is as wide as the box no
          matter the font size, so the probe would measure the container and
          the fit would always resolve to the probe size. */}
      <span
        ref={textRef}
        className="inline-block whitespace-nowrap font-display text-[clamp(2.5rem,19vw,24rem)] font-bold uppercase leading-none"
      >
        {site.name}
      </span>
    </div>
  );
}
