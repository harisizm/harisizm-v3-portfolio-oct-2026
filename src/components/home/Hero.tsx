/**
 * HERO LINE. The three lines, their timing and the support paragraph live in
 * `src/data/hero.ts`; the headline rolls through them (see RollingHeadline).
 */

import { BottomRail } from "@/components/layout";
import { RollingHeadline } from "./RollingHeadline";
import { Magnetic, Reveal, STAGGER } from "@/components/motion";
import { SplitCta } from "@/components/ui";
import { heroSupport } from "@/data";

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
 * Motion (lessons.md D-017, D-018): the headline rolls row by row
 * (RollingHeadline). The paragraph and the CTA are
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
        {/* 6.8vw: the headline's measure is three columns (1050px at 1440) and
            Chakra Petch 700 is wider than the Inter it replaced, so the widest
            row ("of work, done in") needs the smaller slope to stay on one row.
            The cap applies from about 1765px up. The lines themselves live in
            src/data/hero.ts. */}
        <RollingHeadline className="text-[clamp(2.25rem,6.8vw,120px)] lg:col-span-3" />

        <Reveal
          delay={SUPPORT_DELAY}
          className="mt-10 lg:col-start-4 lg:row-start-1 lg:mt-0 lg:pt-3"
        >
          {/* 24px from lg, regular weight, with the nouns a client scans for
              set bold: a statement beside the headline, not a caption (D-018).
              Below lg the headline floor is 36px, and 24px prose next to it
              outranked the title, so it stays at the 20px lead there. */}
          <p className="max-w-[34ch] text-lead text-ink lg:text-support">
            {heroSupport.map((span, i) =>
              typeof span === "string" ? (
                span
              ) : (
                <strong
                  key={i}
                  className={`font-semibold ${
                    span.emphasis === "accent" ? "text-accent" : ""
                  }`}
                >
                  {span.text}
                </strong>
              ),
            )}
          </p>
        </Reveal>

        <Reveal
          delay={CTA_DELAY}
          className="mt-12 flex justify-start lg:col-span-3 lg:row-start-2 lg:mt-14"
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
