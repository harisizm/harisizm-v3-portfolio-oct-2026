"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void): () => void {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/**
 * The server cannot know the visitor's OS setting, so it assumes motion is
 * allowed and lets the client correct it on hydration. Assuming `true` instead
 * would be worse: every reveal would render in its hidden state on the server.
 */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * `true` when the visitor has asked their OS to reduce motion. Updates live if
 * they change the setting — `useSyncExternalStore` keeps `window` out of render
 * and off the server entirely. See design.md §6 and lessons.md T-009.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
