/**
 * The hero headline, as data (lessons.md T-010).
 *
 * Each line is three rows, because the hero sets rows one and two at 600 and
 * row three at 300 and the rows must break where the weight breaks. A segment
 * marked `accent` renders in `--accent`: it is the measured number the line
 * is built around, and every number here traces to a case study in
 * `projects.ts`. The first line is what the server renders and what a reader
 * with reduced motion or no JavaScript sees; the rest cycle after it.
 *
 * Measure: about 19 uppercase characters per row at the 120px cap, 22 at the
 * 105px size the hero takes at 1440. Keep every row inside that.
 */

export interface HeroSegment {
  readonly text: string;
  readonly accent?: boolean;
}

/** Three rows, top to bottom. */
export type HeroLine = readonly [
  readonly HeroSegment[],
  readonly HeroSegment[],
  readonly HeroSegment[],
];

export const heroLines: readonly HeroLine[] = [
  // Client Hunt: an eight-hour prospecting day down to about ten minutes.
  [
    [{ text: "Eight hours" }],
    [{ text: "of work, done in" }],
    [{ text: "ten minutes.", accent: true }],
  ],
  // Instagram Lead Generator: 10,000 qualified profiles in a 24-hour run.
  [
    [{ text: "10,000", accent: true }, { text: " leads" }],
    [{ text: "in one day," }],
    [{ text: "no hands on it." }],
  ],
  // Instagram Lead Generator: the CV's 95%+ reduction in manual effort.
  [
    [{ text: "95%", accent: true }, { text: " of the" }],
    [{ text: "manual work," }],
    [{ text: "gone." }],
  ],
];

/** Timing for the typewriter, in milliseconds. */
export const heroTyping = {
  /** Per character while typing. */
  type: 42,
  /** Per character while deleting. */
  erase: 18,
  /** How long a finished line stays before it is erased. */
  hold: 4200,
  /** Pause after a line is fully erased, before the next starts. */
  gap: 350,
} as const;
