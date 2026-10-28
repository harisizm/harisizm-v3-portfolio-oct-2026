"use client";

import { motion } from "motion/react";

import { useReducedMotion, useScrollSpy } from "@/hooks";
import { RAIL_SPRING, type RailSection } from "./RailNav";

export interface ScrollProgressProps {
  sections: readonly RailSection[];
  className?: string;
}

/**
 * The mobile replacement for the rail's scroll-spy nav.
 *
 * The reference drops its nav entirely below 1024px and leaves a nine-screen
 * page with no orientation at all (teardown §6.5, lessons.md T-007). This is the
 * thin sticky indicator design.md §9.2 specifies instead: the section being read,
 * its position in the sequence, and a fill showing how far through the case study
 * the reader is.
 *
 * Progress is derived from the same scroll-spy that drives the desktop rail, so
 * there is no scroll listener and nothing to throttle — the only work happens
 * when a section actually crosses the detection band.
 *
 * Not a live region: it would announce on every section change while a screen
 * reader user is reading the headings that caused it.
 *
 * The fill moves on `RAIL_SPRING` (lessons.md D-017), the same spring as the
 * desktop marker it stands in for. `initial={false}` renders the current width
 * on the server, so the first paint is right and only later changes animate;
 * under reduced motion they snap.
 */
export function ScrollProgress({ sections, className = "" }: ScrollProgressProps) {
  const active = useScrollSpy(sections.map((section) => section.id));
  const reduced = useReducedMotion();

  if (sections.length === 0) return null;

  const index = Math.max(
    0,
    sections.findIndex((section) => section.id === active),
  );
  const current = sections[index];
  const percent = ((index + 1) / sections.length) * 100;

  return (
    <div className={`sticky top-0 z-20 bg-canvas ${className}`}>
      <p className="u-container flex min-h-11 items-center justify-between gap-4 py-2">
        <span className="u-label flex items-center gap-2 text-ink">
          <span aria-hidden="true">&#9642;</span>
          {current.label}
        </span>
        <span className="u-label shrink-0 text-mid-grey">
          &#216;{index + 1} / &#216;{sections.length}
        </span>
      </p>
      <div aria-hidden="true" className="h-[2px] w-full bg-border">
        <motion.div
          className="h-full bg-accent"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={reduced ? { duration: 0 } : RAIL_SPRING}
        />
      </div>
    </div>
  );
}
