/**
 * The hero headline and its support paragraph, as data (lessons.md T-010).
 *
 * Each line is three rows, set in the display face. A segment marked `accent`
 * renders in `--accent` and in the italic serif (D-018): it is the measured
 * number the line is built around, and every number here traces to a case
 * study in `projects.ts`. The first line is what the server renders and what
 * a reader with reduced motion or no JavaScript sees; the rest roll in after
 * it, one row at a time, with the number counting up as its row lands.
 *
 * Measure: about 16 uppercase characters per row in Chakra Petch 700 at the
 * 105px size the hero takes at 1440. Keep every row inside that.
 */

import type { IconName } from "./types";

export interface HeroSegment {
  readonly text: string;
  readonly accent?: boolean;
  /** Drawn after the segment, at the row's end, as the figure's picture (D-020). */
  readonly icon?: IconName;
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
    [{ text: "ten minutes.", accent: true, icon: "clock-reduce" }],
  ],
  // Instagram Lead Generator: 10,000 qualified profiles in a 24-hour run.
  [
    [{ text: "10,000", accent: true }, { text: " leads", icon: "users" }],
    [{ text: "in one day," }],
    [{ text: "no hands on it." }],
  ],
  // Instagram Lead Generator: the CV's 95%+ reduction in manual effort.
  [
    [{ text: "95%", accent: true }, { text: " of the" }],
    [{ text: "manual work," }],
    [{ text: "gone.", icon: "hand-off" }],
  ],
];

/** Timing for the rolling headline, in milliseconds. */
export const heroRoll = {
  /** How long a line stays readable before the rows roll out. */
  hold: 5000,
  /** Between one row leaving and the next, and between one arriving and the next. */
  stagger: 80,
  /** A row's slide out. */
  out: 500,
  /** A row's slide in. */
  in: 650,
  /** The stat counting up from zero as its row lands. */
  count: 900,
} as const;

/**
 * The support paragraph beside the headline. `strong` is set bold in ink,
 * `accent` bold in `--accent`: the nouns a client is scanning for.
 */
export type SupportSpan =
  | string
  | { readonly text: string; readonly emphasis: "strong" | "accent" };

export const heroSupport: readonly SupportSpan[] = [
  "Haris, a full-stack engineer in Lahore. Core engineer on ",
  { text: "tourgenz.com", emphasis: "strong" },
  ", a tourism and booking marketplace live since September 2026, and the author of ",
  { text: "three automation platforms", emphasis: "accent" },
  " running in production for ",
  { text: "paying clients", emphasis: "strong" },
  ".",
];
