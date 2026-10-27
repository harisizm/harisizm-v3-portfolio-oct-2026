/**
 * HERO LINE — alternatives, for Haris to pick from.
 *
 * The test from `context/portfolio-principles.md`: could a competent developer
 * with a different story put this sentence on their site? All four below are
 * built on a number that is actually his, so none of them survives being
 * borrowed. Opening clause sets in 600, resolving clause in 300, same 120px.
 *
 *   SHIPPED (below)
 *     600 · "I ship production systems"
 *     300 · "that turn an eight-hour day into ten minutes."
 *     — result-led, and the number is Client Hunt's measured one. Leads with
 *       production work, per lessons.md D-010.
 *
 *   ALT A — audience-led, names who it is for
 *     600 · "I build for teams"
 *     300 · "who have outgrown doing it by hand."
 *
 *   ALT B — offer-led, leans on the live platform
 *     600 · "A live AI marketplace, a lead engine, a desktop tool —"
 *     300 · "all of them in production, none of them a prototype."
 *
 *   ALT C — hardest number first
 *     600 · "Ten thousand profiles in a day,"
 *     300 · "an eight-hour job in ten minutes."
 *
 * Swapping is a two-span edit in this file. The 600/300 split should fall on the
 * clause boundary, not mid-phrase.
 */

import { BottomRail } from "@/components/layout";
import { SplitCta } from "@/components/ui";

import { Section } from "./Section";

export function Hero() {
  return (
    <Section
      id="hero"
      innerClassName="flex min-h-[78svh] flex-col justify-end gap-12 pb-28 pt-28 lg:gap-16 lg:pb-32 lg:pt-36"
    >
      {/* clamp rather than the `text-hero` token: the token is the 120px cap and
          this has to survive 390px. 0.9 line-height per design.md §4. */}
      <h1 className="max-w-[22ch] text-[clamp(2.5rem,8.4vw,120px)] leading-[0.9]">
        <span className="font-semibold">I ship production systems </span>
        <span className="font-light">
          that turn an eight-hour day into ten minutes.
        </span>
      </h1>

      <div className="grid gap-12 lg:grid-cols-4 lg:items-end lg:gap-6">
        <div className="lg:col-start-3 lg:col-span-2 lg:justify-self-end lg:max-w-[38ch] lg:pl-6">
          <p className="text-lead font-light text-ink">
            Haris — full-stack engineer in Lahore. Core engineer on{" "}
            <span className="whitespace-nowrap">tourgenz.com</span>, an AI tourism
            and booking marketplace that has been live since September 2026, and
            the author of three automation platforms running in production for
            paying clients.
          </p>
        </div>

        <div className="lg:col-start-1 lg:col-span-2 lg:row-start-1">
          <SplitCta
            href="/contact"
            label="Start a project"
            ariaLabel="Start a project — go to the contact page"
          />
        </div>
      </div>

      {/* Anchored to the hero, not the viewport — see BottomRail. The scroll cue
          targets the next section, so it is a real link rather than a label. */}
      <BottomRail scrollTo="positioning" />
    </Section>
  );
}
