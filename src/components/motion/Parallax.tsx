"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks";

export interface ParallaxProps {
  /** A `fill` image, or anything else absolutely positioned to its parent. */
  children: ReactNode;
  className?: string;
  /** Percent of the layer's height the child travels in each direction. */
  amount?: number;
  /**
   * Percent of the frame's height the layer extends past the frame at each
   * end. Needed for an `object-cover` image so the drift never exposes an
   * edge; set to 0 for an `object-contain` image, which must not be scaled
   * past its frame (the letterbox is the window the image drifts behind).
   */
  overscan?: number;
}

/**
 * Scroll-linked drift for a cover image inside a fixed-ratio frame.
 *
 * Fills its positioned parent, hides overflow, and slides a layer holding the
 * child from `-amount` to `+amount` of its own height as the frame crosses the
 * viewport.
 *
 * The transform is only applied once the scroll position has actually been
 * measured. The server cannot know it, and the motion value starts at progress
 * zero, so applying it straight away would server-render the image shifted and
 * then jump it on hydration. Under reduced motion it is never applied.
 */
export function Parallax({
  children,
  className = "",
  amount = 6,
  overscan = amount,
}: ParallaxProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [measured, setMeasured] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  /* With overscan, travel stays inside it (90%, so rounding never exposes the
     frame's edge). Without it, the child is meant to show its edges. */
  const travel = overscan > 0 ? Math.min(amount, overscan * 0.9) : amount;
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, `${travel}%`]);

  useMotionValueEvent(scrollYProgress, "change", () => setMeasured(true));

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: overscan > 0 ? `-${overscan}%` : 0,
          bottom: overscan > 0 ? `-${overscan}%` : 0,
          ...(reduced || !measured ? {} : { y }),
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
