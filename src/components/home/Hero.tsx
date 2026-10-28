/**
 * HERO LINE — three candidates. Haris to pick — CLAUDE.md open item.
 *
 * The test from `context/portfolio-principles.md`: could a competent developer
 * with a different story put this sentence on their site? Each one below leans
 * on something that is actually his. Lines 1 and 2 set in 600, line 3 in 300,
 * all at 120px uppercase. Measured constraint: 1408px holds about 19 uppercase
 * characters per line at 120px, and line 1 shares its row with the support
 * paragraph, so it has to stay at or under 12.
 *
 *   SET (below) — result-led, 40 characters
 *     600 · WHAT YOU DO
 *     600 · BY HAND, I TURN
 *     300 · INTO A SYSTEM.
 *
 *   ALT A — hardest number first, 39 characters (Client Hunt's measured result)
 *     600 · EIGHT HOURS
 *     600 · OF WORK, DONE IN
 *     300 · TEN MINUTES.
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
import { SplitCta } from "@/components/ui";

import { Section } from "./Section";

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
        <h1 className="text-center text-[clamp(2.25rem,8.4vw,120px)] uppercase leading-[0.9] lg:col-span-3">
          <span className="block font-semibold">What you do</span>
          <span className="block font-semibold">by hand, I turn</span>
          <span className="block font-light">into a system.</span>
        </h1>

        <p className="mt-10 max-w-[38ch] text-lead font-light text-ink lg:col-start-4 lg:row-start-1 lg:mt-0 lg:pt-3">
          Haris, a full-stack engineer in Lahore. Core engineer on{" "}
          <span className="whitespace-nowrap">tourgenz.com</span>, a tourism and
          booking marketplace that has been live since September 2026, and the
          author of three automation platforms running in production for paying
          clients.
        </p>

        <div className="mt-12 flex justify-center lg:col-span-3 lg:row-start-2 lg:mt-14">
          <SplitCta
            href="/contact"
            label="Start a project"
            ariaLabel="Start a project: go to the contact page"
          />
        </div>
      </div>

      {/* Anchored to the hero, not the viewport — see BottomRail. The scroll cue
          targets the next section, so it is a real link rather than a label. */}
      <BottomRail scrollTo="positioning" />
    </Section>
  );
}
