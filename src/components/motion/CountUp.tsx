"use client";

import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks";

import { DURATION, EASE } from "./tokens";

export interface CountUpProps {
  /** The number as it should finally read: `~2,000`, `95%+`, `8h → ~10 min`. */
  value: string;
  className?: string;
  duration?: number;
  /** Fraction of the number that must be in view before it counts. */
  amount?: number;
}

interface ParsedValue {
  prefix: string;
  digits: string;
  rest: string;
  target: number;
  grouped: boolean;
}

/* The first run of digits, with its thousands separators. Everything before it
   and everything after it is literal: `8h → ~10 min` counts the 8 and leaves
   `h → ~10 min` alone. */
const LEADING_INTEGER = /^(\D*?)(\d{1,3}(?:,\d{3})+|\d+)([\s\S]*)$/;

function parse(value: string): ParsedValue | null {
  const match = LEADING_INTEGER.exec(value);
  if (match === null) return null;
  const [, prefix, digits, rest] = match;
  return {
    prefix,
    digits,
    rest,
    target: Number(digits.replace(/,/g, "")),
    grouped: digits.includes(","),
  };
}

const GROUPED = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

function format(n: number, grouped: boolean): string {
  return grouped ? GROUPED.format(n) : String(Math.round(n));
}

/**
 * Counts the leading integer of a stat up from zero when it scrolls into view.
 * Prefix and suffix text stay exactly as written.
 *
 * The server renders the final figure, hidden behind `data-enter`, with an
 * invisible copy holding the width so the row does not shuffle as the digits
 * grow. `MotionBoot` shows the final figure for JS-off and reduced motion; with
 * motion, the digits appear at zero and run to the value.
 */
export function CountUp({
  value,
  className = "",
  duration = DURATION.slow,
  amount = 0.6,
}: CountUpProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount });
  const parsed = parse(value);

  const target = parsed?.target ?? 0;
  const grouped = parsed?.grouped ?? false;
  const running = inView && !reduced && parsed !== null;

  useEffect(() => {
    const node = ref.current;
    if (!running || node === null) return;
    node.textContent = format(0, grouped);
    const controls = animate(0, target, {
      duration,
      ease: EASE,
      onUpdate: (latest) => {
        node.textContent = format(latest, grouped);
      },
    });
    return () => controls.stop();
  }, [running, target, grouped, duration]);

  if (parsed === null) return <span className={className}>{value}</span>;

  return (
    <span className={className}>
      {parsed.prefix}
      <span className="relative inline-block tabular-nums">
        <span aria-hidden="true" className="invisible">
          {parsed.digits}
        </span>
        <motion.span
          ref={ref}
          data-enter=""
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView || reduced ? 1 : 0 }}
          transition={{ duration: 0 }}
        >
          {parsed.digits}
        </motion.span>
      </span>
      {parsed.rest}
    </span>
  );
}
