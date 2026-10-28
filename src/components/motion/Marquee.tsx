"use client";

import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks";

export interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** Pixels per second. */
  speed?: number;
  /** Pixels between items, and between the strip and its repeat. */
  gap?: number;
  pauseOnHover?: boolean;
}

/**
 * A strip that scrolls left for ever, pausing while the pointer is over it.
 *
 * Driven by a frame callback on a motion value rather than a keyframe loop, so
 * a pause holds position and a resume carries on from it. The content is
 * rendered twice and the track wraps by exactly one copy's width, which is
 * what makes the loop seamless. The repeat is `aria-hidden`; a screen reader
 * hears the content once.
 *
 * Reduced motion gets a single static copy and no second one. The server
 * renders both copies (it cannot know), with the overflow hidden, so a visitor
 * without JS sees a still strip, not a doubled one.
 */
export function Marquee({
  children,
  className = "",
  speed = 60,
  gap = 48,
  pauseOnHover = true,
}: MarqueeProps) {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const period = useRef(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const track = trackRef.current;
    if (track === null) return;
    const first = track.firstElementChild;
    if (!(first instanceof HTMLElement)) return;
    const observer = new ResizeObserver(() => {
      period.current = first.offsetWidth + gap;
    });
    observer.observe(first);
    return () => observer.disconnect();
  }, [gap, reduced]);

  useAnimationFrame((_, delta) => {
    if (reduced || paused || period.current === 0) return;
    let next = x.get() - (speed * delta) / 1000;
    if (next <= -period.current) next += period.current;
    x.set(next);
  });

  const hover = pauseOnHover && !reduced;

  return (
    <div
      className={`overflow-hidden ${className}`}
      onPointerEnter={hover ? () => setPaused(true) : undefined}
      onPointerLeave={hover ? () => setPaused(false) : undefined}
    >
      <motion.div
        ref={trackRef}
        className="flex w-max items-center"
        style={{ x, gap }}
      >
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        {reduced ? null : (
          <div aria-hidden="true" className="flex shrink-0 items-center" style={{ gap }}>
            {children}
          </div>
        )}
      </motion.div>
    </div>
  );
}
