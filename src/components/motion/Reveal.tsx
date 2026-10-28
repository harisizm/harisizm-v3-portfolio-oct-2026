"use client";

import { motion } from "motion/react";
import { createContext, useContext, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks";

import { DURATION, EASE, STAGGER } from "./tokens";

/** The block elements a reveal is allowed to be. Keeps the markup semantic. */
export type RevealTag = "div" | "section" | "article" | "li" | "span";

const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  span: motion.span,
} as const;

/* A child inside a `Stagger` must not drive itself: it inherits "hidden" and
   "shown" from the parent, which is what makes the stagger a stagger. */
const StaggerContext = createContext(false);

export interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
  /** Seconds before this block starts, on top of any stagger it sits in. */
  delay?: number;
  /** Fraction of the block that must be in view before it reveals. */
  amount?: number;
  /**
   * Pixels of rise. Zero turns the reveal into a plain fade, which is right
   * for anything that would look odd sliding, such as a full-bleed image.
   */
  y?: number;
  duration?: number;
  /** @deprecated Older name for `amount`. Kept so existing call sites compile. */
  threshold?: number;
}

/**
 * Fade and rise into place, once, when the block scrolls into view.
 *
 * The server renders the HIDDEN state. `MotionBoot` undoes that for visitors
 * without JS or with reduced motion, so the inversion the old `useReveal` had
 * to perform in an effect (hide from JS, never from CSS) is now done by a
 * stylesheet rule plus one attribute: `data-enter`. Every primitive that
 * server-renders a hidden state carries it. See `MotionBoot.tsx` and
 * lessons.md T-009.
 */
export function Reveal({
  children,
  className = "",
  as = "div",
  delay = 0,
  amount,
  y = 16,
  duration = DURATION.base,
  threshold,
}: RevealProps) {
  const reduced = useReducedMotion();
  const staggered = useContext(StaggerContext);
  const Tag = TAGS[as];

  const variants = {
    hidden: { opacity: 0, y },
    shown: { opacity: 1, y: 0, transition: { duration, delay, ease: EASE } },
  };

  if (staggered) {
    return (
      <Tag data-enter="" className={className} variants={variants}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      data-enter=""
      className={className}
      variants={variants}
      initial={reduced ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: threshold ?? amount ?? 0.2 }}
    >
      {children}
    </Tag>
  );
}

export interface StaggerProps {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
  /** Seconds between one child starting and the next. */
  stagger?: number;
  /** Seconds before the first child starts. */
  delay?: number;
  amount?: number;
}

/**
 * Staggers the `Reveal`s directly inside it. Each child keeps its own `y`,
 * `duration` and `delay`; only the start times are spread out. Nest other
 * markup freely, but only `Reveal` (or a `motion.*` with `variants`) takes
 * part in the choreography.
 */
export function Stagger({
  children,
  className = "",
  as = "div",
  stagger = STAGGER,
  delay = 0,
  amount = 0.2,
}: StaggerProps) {
  const reduced = useReducedMotion();
  const Tag = TAGS[as];

  return (
    <StaggerContext.Provider value={true}>
      <Tag
        className={className}
        initial={reduced ? false : "hidden"}
        whileInView="shown"
        viewport={{ once: true, amount }}
        variants={{
          hidden: {},
          shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
        {children}
      </Tag>
    </StaggerContext.Provider>
  );
}
