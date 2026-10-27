"use client";

import { useEffect, useState } from "react";

export interface UseScrollSpyOptions {
  /**
   * Collapses the viewport to a detection band. The default reads the upper
   * middle of the screen, which is where a reader's eye sits.
   */
  rootMargin?: string;
}

/**
 * Tracks which of `ids` is the section currently being read. Drives the
 * case-study rail nav (design.md §9.2).
 *
 * IntersectionObserver rather than a scroll listener: the callback only runs
 * when a section actually crosses the band, so there is no per-frame work and
 * nothing to throttle.
 *
 * Returns `null` only when `ids` is empty. When no section is in the band —
 * before the first one reaches it, between two sections, or scrolled past the
 * last — it falls back to the last section that did cross, so the rail
 * indicator never blanks out.
 */
export function useScrollSpy(
  ids: readonly string[],
  options: UseScrollSpyOptions = {},
): string | null {
  const { rootMargin = "-25% 0px -50% 0px" } = options;

  // Callers pass an array literal, which is a fresh identity every render.
  // Keying the effect on the contents stops it tearing down the observer on
  // every parent re-render.
  const key = ids.join("\u0000");
  const [observed, setObserved] = useState<string | null>(null);

  useEffect(() => {
    const order = key === "" ? [] : key.split("\u0000");
    if (order.length === 0) return;
    if (typeof IntersectionObserver === "undefined") return;

    const elements = order
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Lowest visible section wins. While a new section's heading enters the
        // band the outgoing one is usually still spanning it, and the new one
        // is the answer the reader expects.
        for (let i = order.length - 1; i >= 0; i -= 1) {
          const id = order[i];
          if (visible.has(id)) {
            setObserved(id);
            return;
          }
        }
        // Nothing in the band. Deliberately no setState: the last observed id
        // stays active so the indicator holds its position.
      },
      { rootMargin, threshold: 0 },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [key, rootMargin]);

  // Derived at render rather than synced from an effect, which would cost an
  // extra render pass on mount and whenever `ids` changes. `observed` is null
  // until the first band crossing, and goes stale if the id list is swapped.
  if (observed !== null && ids.includes(observed)) return observed;
  return ids.length > 0 ? ids[0] : null;
}
