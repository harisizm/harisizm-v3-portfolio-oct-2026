"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/hooks";

export interface PulseProps {
  children: ReactNode;
  className?: string;
  /** Seconds per beat. */
  duration?: number;
}

/**
 * A slow breathing pulse for the status dot: scale and opacity, looping.
 * Wraps the dot in an `inline-flex` span so the layout is the dot's own.
 * Under reduced motion it renders the dot still, full size, full opacity.
 */
export function Pulse({ children, className = "", duration = 1.8 }: PulseProps) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      className={`inline-flex ${className}`}
      animate={
        reduced
          ? { scale: 1, opacity: 1 }
          : { scale: [1, 1.5, 1], opacity: [1, 0.45, 1] }
      }
      transition={
        reduced
          ? { duration: 0 }
          : { duration, repeat: Infinity, ease: "easeInOut" }
      }
    >
      {children}
    </motion.span>
  );
}
