/**
 * The house motion tokens. Every primitive in this folder reads these, and so
 * should any one-off animation elsewhere, so the whole site moves on one curve
 * at one of three speeds (lessons.md D-017).
 */

/** One ease for everything: a fast start that settles softly. */
export const EASE: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

/** Seconds. `fast` is for exits and state changes, `base` for reveals, `slow` for the signature moves. */
export const DURATION = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
} as const;

/** Seconds between staggered siblings. */
export const STAGGER = 0.06;

/** Pointer-driven effects only run where there is a pointer to drive them. */
export const POINTER_FINE = "(hover: hover) and (pointer: fine)";

/** The transition most primitives default to. */
export function houseTransition(duration: number = DURATION.base, delay = 0) {
  return { duration, delay, ease: EASE };
}
