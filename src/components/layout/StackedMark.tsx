"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type CSSProperties } from "react";

import { DURATION, EASE } from "@/components/motion";
import { useReducedMotion } from "@/hooks";
import { site } from "@/lib/site";

export interface StackedMarkProps {
  /** Fired when the link is followed; the header uses it to close the menu. */
  onClick?: () => void;
}

/** Milliseconds each slot state holds before the next rolls in. */
const HOLD = 3200;

type Slot = "role" | "caret" | "coordinates";
const ORDER: readonly Slot[] = ["role", "caret", "coordinates"];

/**
 * The slot beside the second line of the mark (lessons.md D-022): rolls
 * through the role in two short lines, the blinking caret, and Lahore's
 * coordinates. Sized in em from its own font size, so the header sets it at
 * 10px and the footer at a tenth of its giant line and both get the same
 * proportions. Fixed box, so nothing beside it moves.
 *
 * The server renders the role, which is also what reduced motion keeps.
 */
export function MarkSlot({ className = "", style }: { className?: string; style?: CSSProperties }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % ORDER.length), HOLD);
    return () => window.clearTimeout(id);
  }, [reduced, index]);

  const slot: Slot = reduced ? "role" : ORDER[index];

  return (
    <span
      aria-hidden="true"
      className={`relative block h-[3.6em] w-[8.6em] overflow-hidden ${className}`}
      style={style}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={slot}
          className="absolute inset-0 flex flex-col justify-end"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ duration: DURATION.fast, ease: EASE }}
        >
          {slot === "caret" ? (
            <span className="status-blink mb-[0.1em] block h-[1.8em] w-[0.9em] bg-accent" />
          ) : (
            (slot === "role" ? site.mark.role : site.mark.coordinates).map((line) => (
              <span
                key={line}
                className="block whitespace-nowrap font-body font-medium uppercase leading-[1.5] tracking-[0.16em] text-accent-2"
              >
                {line}
              </span>
            ))
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/**
 * The reticle: four L-shaped corner marks in the accent, the menu's crop
 * marks. `inset` and `size` are in px; under a `group` they step outward.
 */
export function Reticle({ size = 10, thickness = 2 }: { size?: number; thickness?: number }) {
  return (
    <>
      {CORNERS.map((corner) => {
        /* Only the two sides that meet at this corner carry a border. Set
           inline per side: a shorthand width would paint all four. */
        const [v, h] = CORNER_SIDES[corner];
        const style: CSSProperties = {
          width: size,
          height: size,
          borderStyle: "solid",
          borderWidth: 0,
          [v]: thickness,
          [h]: thickness,
        };
        return (
          <span
            key={corner}
            aria-hidden="true"
            style={style}
            className={`pointer-events-none absolute border-accent transition-[inset] duration-300 ease-[ease] ${CORNER_SKIN[corner]}`}
          />
        );
      })}
    </>
  );
}

/**
 * The header mark (lessons.md D-022): "haris" over "izm" in the display face,
 * inside the reticle, with the rolling slot beside the second line. The
 * whole mark is the site's home link (T-002); everything inside it is
 * decorative to assistive tech except the accessible name.
 */
export function StackedMark({ onClick }: StackedMarkProps) {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, home`}
      onClick={onClick}
      className="group relative inline-flex min-h-11 items-center px-3 py-1.5"
    >
      <Reticle />
      <span
        aria-hidden="true"
        className="flex items-end gap-2.5 font-display text-[22px] font-bold leading-[0.95] tracking-[0.3px]"
      >
        <span className="flex flex-col">
          <span className="text-ink">haris</span>
          <span className="text-accent">izm</span>
        </span>
        <MarkSlot className="mb-[1px] text-[10px]" />
      </span>
    </Link>
  );
}

const CORNERS = ["tl", "tr", "bl", "br"] as const;
type Corner = (typeof CORNERS)[number];
const CORNER_SIDES: Record<Corner, ["borderTopWidth" | "borderBottomWidth", "borderLeftWidth" | "borderRightWidth"]> = {
  tl: ["borderTopWidth", "borderLeftWidth"],
  tr: ["borderTopWidth", "borderRightWidth"],
  bl: ["borderBottomWidth", "borderLeftWidth"],
  br: ["borderBottomWidth", "borderRightWidth"],
};
const CORNER_SKIN: Record<Corner, string> = {
  tl: "left-0 top-0 group-hover:-left-0.5 group-hover:-top-0.5",
  tr: "right-0 top-0 group-hover:-right-0.5 group-hover:-top-0.5",
  bl: "bottom-0 left-0 group-hover:-bottom-0.5 group-hover:-left-0.5",
  br: "bottom-0 right-0 group-hover:-bottom-0.5 group-hover:-right-0.5",
};
