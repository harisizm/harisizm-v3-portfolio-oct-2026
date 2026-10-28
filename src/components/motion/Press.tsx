"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/hooks";

import { EASE } from "./tokens";
import { usePointerFine } from "./useMediaQuery";

export interface PressProps {
  children: ReactNode;
  /** Defaults to `inline-block`; pass `block` to fill a grid cell. */
  className?: string;
  /** Scale on press. */
  scale?: number;
  /** Pixels of hover lift. Only with a fine pointer; touch gets the press. */
  lift?: number;
}

/**
 * Tactile feedback for a button or link: a slight press on tap, a slight lift
 * on hover. Wrap the control, do not replace it; the control keeps its own
 * markup, href and focus ring, and still works with this stripped out.
 *
 * A `span`, so it can sit inside a paragraph or a flex row without changing
 * the document outline. Layout-wise it is the control's size.
 */
export function Press({
  children,
  className = "inline-block",
  scale = 0.97,
  lift = 2,
}: PressProps) {
  const reduced = useReducedMotion();
  const fine = usePointerFine();

  return (
    <motion.span
      className={className}
      whileTap={reduced ? undefined : { scale }}
      whileHover={reduced || !fine ? undefined : { y: -lift }}
      transition={{ duration: 0.2, ease: EASE }}
    >
      {children}
    </motion.span>
  );
}
