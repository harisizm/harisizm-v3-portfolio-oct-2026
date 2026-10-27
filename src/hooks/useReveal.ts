"use client";

import { useEffect, useRef, type RefObject } from "react";

import { useReducedMotion } from "./useReducedMotion";

export interface UseRevealOptions {
  /** Fraction of the element that must be in view before it reveals. */
  threshold?: number;
  /** Shrinks the viewport so the reveal fires before the element hits the edge. */
  rootMargin?: string;
  /** `false` re-hides the element once it leaves the viewport. */
  once?: boolean;
}

/**
 * Scroll reveal, driven by `[data-reveal]` in globals.css.
 *
 * The inversion that looks backwards: the REVEALED state is the stylesheet
 * default, and this hook opts the element INTO hiding by writing
 * `data-reveal="hidden"` on mount. Hiding in CSS and revealing in JS would leave
 * the content permanently invisible whenever the script is blocked, fails or
 * simply hasn't run yet — the second-order trap in lessons.md T-009. Written
 * this way, no JS means no animation and fully readable content.
 *
 * Reduced motion skips the hidden state entirely rather than shortening it, so
 * nothing ever moves. design.md §6.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  options: UseRevealOptions = {},
): RefObject<T | null> {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true } = options;
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (element === null) return;

    // No observer, or motion is unwelcome: land on the final state and stop.
    if (reduced || typeof IntersectionObserver === "undefined") {
      element.dataset.reveal = "shown";
      return;
    }

    element.dataset.reveal = "hidden";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            element.dataset.reveal = "shown";
            if (once) observer.disconnect();
          } else if (!once) {
            element.dataset.reveal = "hidden";
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reduced, threshold, rootMargin, once]);

  return ref;
}
