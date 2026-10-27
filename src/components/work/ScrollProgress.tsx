"use client";

import { useScrollSpy } from "@/hooks";
import type { RailSection } from "./RailNav";

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
 */
export function ScrollProgress({ sections, className = "" }: ScrollProgressProps) {
  const active = useScrollSpy(sections.map((section) => section.id));

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
        <div
          className="h-full bg-accent transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
