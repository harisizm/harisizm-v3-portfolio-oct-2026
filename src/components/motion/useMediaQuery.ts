"use client";

import { useCallback, useSyncExternalStore } from "react";

import { POINTER_FINE } from "./tokens";

/**
 * `true` while `query` matches. Like `useReducedMotion` in `@/hooks`, the server
 * snapshot is `false`, so SSR and the hydration pass agree and the client
 * corrects itself afterwards; a `useState` + effect would set state in an
 * effect, and `window.matchMedia` in render would break on the server.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query],
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** A mouse or trackpad is present. Hover lifts and magnetic nudges need this. */
export function usePointerFine(): boolean {
  return useMediaQuery(POINTER_FINE);
}
