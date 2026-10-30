"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { DURATION, EASE } from "@/components/motion";
import { useReducedMotion } from "@/hooks";
import { site } from "@/lib/site";

export interface StatusPillProps {
  className?: string;
}

/** Milliseconds each label holds before the pill rolls to the other. */
const HOLD = 4000;

/**
 * Status pill — design.md §7.6.
 *
 * A blinking 6px `--accent` square, then uppercase body-face text at 14px in
 * `--accent-2`, and the whole thing is a link to the contact page: the pill
 * says Haris is available, so it has to take the reader where that matters
 * (lessons.md T-002). Driven entirely by the one `site.availability.open`
 * flag: when it is false this renders nothing, which is the point. V2 welded
 * "Available for new projects" into an SVG textPath with no way to turn it off.
 *
 * The label rolls between `label` and `altLabel` every few seconds (D-018).
 * The blink is a CSS keyframe and the roll is a `motion` exit and enter; the
 * global reduced-motion rule stills the first and the hook disables the
 * second, so a reduced-motion reader sees a steady dot and the first label.
 */
export function StatusPill({ className = "" }: StatusPillProps) {
  const reduced = useReducedMotion();
  const [alt, setAlt] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => setAlt((a) => !a), HOLD);
    return () => window.clearTimeout(id);
  }, [reduced, alt]);

  if (!site.availability.open) return null;

  const label =
    alt && !reduced ? site.availability.altLabel : site.availability.label;

  return (
    <Link
      href="/contact"
      className={`group inline-flex min-h-11 items-center gap-2 text-accent-2 ${className}`}
    >
      <span
        aria-hidden="true"
        className="status-blink size-1.5 shrink-0 bg-accent"
      />
      {/* The clip: one label's height, so the roll never pushes the trigger. */}
      <span className="u-label-sm grid overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={label}
            className="whitespace-nowrap underline-offset-4 group-hover:underline group-focus-visible:underline"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE }}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </span>
    </Link>
  );
}
