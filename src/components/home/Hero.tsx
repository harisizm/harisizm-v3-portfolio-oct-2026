/**
 * HERO LINE. Chosen by Haris on 2026-10-28: the numbers-first line. The two
 * alternates stay here in case the copy is revisited.
 *
 * The test from `context/portfolio-principles.md`: could a competent developer
 * with a different story put this sentence on their site? Each one below leans
 * on something that is actually his. Lines 1 and 2 set in 600, line 3 in 300,
 * all at 120px uppercase. Measured constraint: 1408px holds about 19 uppercase
 * characters per line at 120px, and line 1 shares its row with the support
 * paragraph, so it has to stay at or under 12.
 *
 *   SET (below): hardest number first, 39 characters (Client Hunt's measured result)
 *     600 · EIGHT HOURS
 *     600 · OF WORK, DONE IN
 *     300 · TEN MINUTES.
 *
 *   ALT A: result-led, 40 characters
 *     600 · WHAT YOU DO
 *     600 · BY HAND, I TURN
 *     300 · INTO A SYSTEM.
 *
 *   ALT B — offer-led, 48 characters
 *     600 · I BUILD SYSTEMS
 *     600 · FOR WORK NOBODY
 *     300 · SHOULD DO BY HAND.
 *
 * Swapping is a three-span edit in this file. The 600/300 split falls on a line
 * boundary, never mid-line.
 */

import { BottomRail } from "@/components/layout";
import { Magnetic, Reveal, SplitLines, STAGGER } from "@/components/motion";
import { SplitCta } from "@/components/ui";

import { Section } from "./Section";

/* The hero's entrance, in reading order: three headline lines rise from their
   clips one after another, the support paragraph fades up once the last line
   is moving, the CTA lands last. Timed off the line stagger so a change to
   `STAGGER` moves the whole sequence together. */
const SUPPORT_DELAY = STAGGER * 5;
const CTA_DELAY = STAGGER * 8;

/**
 * Hero — design.md §9.1 item 1, composed like `reference/nvrmnd/home-0.webp`.
 *
 * One viewport tall, less the sticky header, with the block centred and the
 * rail anchored to the bottom edge, so at 1440×900 the headline, the CTA and
 * the rail are all in the first screen (audit B1).
 *
 * The headline centres across columns 1 to 3 and the support paragraph sits in
 * column 4 beside its first line, which is the reference's shape. A float was
 * tried first and rejected: it narrowed line 2 until "TURN" wrapped onto its
 * own line, breaking the bold/light split, and it forced the paragraph before
 * the `h1` in source so screen readers heard it first. A grid keeps the DOM in
 * reading order.
 *
 * Motion (lessons.md D-017): each headline line is its own `SplitLines`, the
 * mixed-weight case the primitive documents. The paragraph and the CTA are
 * `Reveal`s on the grid cells, so the cells keep their placement and only the
 * content inside fades. `Magnetic` wraps the CTA; the anchor is untouched.
 */
export function Hero() {
  return (
    <Section
      id="hero"
      innerClassName="flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center pb-28 pt-16 lg:pb-32"
    >
      <div className="lg:grid lg:grid-cols-4 lg:gap-x-6">
        {/* clamp rather than the `text-hero` token: the token is the 120px cap
            and this has to survive 390px. 0.9 line-height per design.md §4. */}
        {/* 7.3vw, not 8.4: the headline's measure is three columns (1050px at
            1440), and "OF WORK, DONE IN" at 120px semibold is wider than that,
            so the cap only applies from about 1650px up. */}
        <h1 className="text-center text-[clamp(2.25rem,7.3vw,120px)] uppercase leading-[0.9] lg:col-span-3">
          <SplitLines className="font-semibold">Eight hours</SplitLines>
          <SplitLines className="font-semibold" delay={STAGGER}>
            of work, done in
          </SplitLines>
          <SplitLines className="font-light" delay={STAGGER * 2}>
            ten minutes.
          </SplitLines>
        </h1>

        <Reveal
          delay={SUPPORT_DELAY}
          className="mt-10 lg:col-start-4 lg:row-start-1 lg:mt-0 lg:pt-3"
        >
          <p className="max-w-[38ch] text-lead font-light text-ink">
            Haris, a full-stack engineer in Lahore. Core engineer on{" "}
            <span className="whitespace-nowrap">tourgenz.com</span>, a tourism
            and booking marketplace that has been live since September 2026, and
            the author of three automation platforms running in production for
            paying clients.
          </p>
        </Reveal>

        <Reveal
          delay={CTA_DELAY}
          className="mt-12 flex justify-center lg:col-span-3 lg:row-start-2 lg:mt-14"
        >
          <Magnetic>
            <SplitCta
              href="/contact"
              label="Start a project"
              ariaLabel="Start a project: go to the contact page"
            />
          </Magnetic>
        </Reveal>
      </div>

      {/* Anchored to the hero, not the viewport — see BottomRail. The scroll cue
          targets the next section, so it is a real link rather than a label. */}
      <BottomRail scrollTo="positioning" />
    </Section>
  );
}
