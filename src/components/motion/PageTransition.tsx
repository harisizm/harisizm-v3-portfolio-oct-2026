"use client";

import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { useContext, useEffect, useState, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks";

import { useCoverMorph } from "./CoverMorph";
import { DURATION, EASE } from "./tokens";

/* Module state rather than React state because it has to outlive the page
   wrapper, which is remounted under a new key on every navigation. It is
   `false` on the server and through hydration, so the first paint is the
   server HTML in its final state (no enter animation, honest LCP), and it
   flips the moment the first page starts leaving, which is the first
   navigation. From then on every page animates in. */
let hasNavigated = false;

/**
 * Keeps an outgoing page rendering its OLD route while it animates out.
 *
 * The App Router resolves what a segment shows from `LayoutRouterContext`, not
 * from props. The moment the URL changes, every subscriber re-renders with the
 * new tree, including the copy `AnimatePresence` is holding on to for the exit
 * animation, which would otherwise show the new page fading out. While this
 * copy is present it passes the live context through, so refreshes and
 * search-param changes still reach the page; the last live value is kept, and
 * the moment the copy starts leaving it is pinned to that value instead.
 *
 * This reaches into `next/dist`. It is the one known way to get exit
 * animations out of the App Router and the context has kept this shape from
 * 13 through 16; if an upgrade moves it, the import is the only line that
 * changes.
 */
function FrozenRouter({ children }: { children: ReactNode }) {
  const live = useContext(LayoutRouterContext);
  const present = useIsPresent();
  const [stored, setStored] = useState(live);
  // Derived from the previous render, the way React documents it: only while
  // present, so the exiting copy never picks up the new route.
  if (present && stored !== live) setStored(live);

  useEffect(() => {
    if (!present) hasNavigated = true;
  }, [present]);

  const value = present ? live : stored;
  if (value === null) return <>{children}</>;
  return (
    <LayoutRouterContext.Provider value={value}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

/**
 * Route transition — lessons.md D-017. Fade and rise on enter, fade and drop
 * on exit, keyed on the pathname so every navigation gets both halves.
 *
 * `mode="wait"`: the old page leaves before the new one mounts, so the two are
 * never in the document together and Next's scroll-to-top lands on an
 * invisible page rather than a visible one.
 *
 * The first page is rendered with `initial={false}` on the wrapper itself, not
 * on `AnimatePresence`: the latter marks the whole subtree as "initial
 * blocked", which would stop every `Reveal` on the page from server-rendering
 * its hidden state or animating in on first load.
 *
 * While a cover morph is in flight the vertical travel is dropped at both
 * ends, so the clone's destination can be measured without a transform in
 * the way and "the cover moves, the page fades" is literally what happens.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { pending } = useCoverMorph();
  const still = reduced || pending !== null;

  const variants = {
    initial: { opacity: 0, y: still ? 0 : 16 },
    enter: {
      opacity: 1,
      y: 0,
      transition: reduced ? { duration: 0 } : { duration: 0.5, ease: EASE },
    },
    exit: {
      opacity: 0,
      y: still ? 0 : -12,
      transition: reduced
        ? { duration: 0 }
        : { duration: DURATION.fast, ease: EASE },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial={hasNavigated ? "initial" : false}
        animate="enter"
        exit="exit"
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
