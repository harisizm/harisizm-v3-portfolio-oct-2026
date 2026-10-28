"use client";

import { MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";

import { CoverMorphProvider } from "./CoverMorph";
import { DURATION, EASE } from "./tokens";

/**
 * Wraps the app once, in `app/layout.tsx`.
 *
 * - `reducedMotion="user"` makes `motion` itself drop transform and layout
 *   animation under `prefers-reduced-motion`. The primitives go further and
 *   render their final state outright; this is the net under them.
 * - The default transition is the house curve at the base duration, so a bare
 *   `motion.div animate={...}` anywhere in the tree moves like the rest.
 * - `data-hydrated` tells `MotionBoot`'s watchdog the bundle arrived.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-hydrated", "");
  }, []);

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: DURATION.base, ease: EASE }}
    >
      <CoverMorphProvider>{children}</CoverMorphProvider>
    </MotionConfig>
  );
}
