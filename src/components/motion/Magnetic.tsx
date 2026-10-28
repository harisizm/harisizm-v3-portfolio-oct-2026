"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

import { useReducedMotion } from "@/hooks";

import { usePointerFine } from "./useMediaQuery";

export interface MagneticProps {
  children: ReactNode;
  /** Defaults to `inline-block`; pass `block` to fill a grid cell. */
  className?: string;
  /** Maximum pixels the element leans toward the pointer. */
  strength?: number;
}

function clamp(value: number): number {
  return Math.max(-1, Math.min(1, value));
}

/**
 * The element leans toward the pointer while it is over it and springs back
 * when it leaves. Gated on a fine pointer and on motion being welcome: on
 * touch there is no pointer to follow, and under reduced motion nothing
 * moves at all. Wrap the control; the control is unchanged.
 */
export function Magnetic({
  children,
  className = "inline-block",
  strength = 8,
}: MagneticProps) {
  const reduced = useReducedMotion();
  const fine = usePointerFine();
  const active = fine && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 300, damping: 20, mass: 0.4 };
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  const onPointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (!active) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(clamp(dx / (rect.width / 2)) * strength);
    y.set(clamp(dy / (rect.height / 2)) * strength);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.span>
  );
}
