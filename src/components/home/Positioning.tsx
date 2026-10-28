import { Reveal, SplitLines, Stagger } from "@/components/motion";
import { Chip, RuleToLink } from "@/components/ui";
import { site } from "@/lib/site";

import { Section } from "./Section";

/**
 * Positioning — design.md §9.1 item 2, composed like `home-850.webp`.
 *
 * Chip in column 1; the 51px statement starts in column 2 with a first-line
 * indent, runs to the right edge, and is the "identity before job title" slot:
 * it says what kind of problem arrives, not what the job is called. Below it a
 * bare rule to `MORE ABOUT HARIS ↗` (no heading: the statement is the heading),
 * then a body paragraph in column 2 with the arrow glyph at its left and an
 * italic sign-off.
 *
 * Motion: the statement is a `SplitLines`, which honours the first-line indent
 * because `text-indent` lands on the first split line only. The chip, the rule
 * and the body are `Reveal`s inside one `Stagger`, so they follow the statement
 * in reading order rather than arriving as one block.
 */
export function Positioning() {
  return (
    <Section id="positioning">
      <Stagger className="grid gap-10 lg:grid-cols-4 lg:gap-6">
        <Reveal>
          <Chip>About</Chip>
        </Reveal>

        {/* The reference's first line starts about 200px further right than the
            rest; the indent shrinks with the column so it never eats a whole
            line at 1024. */}
        <SplitLines
          as="p"
          className="text-[clamp(1.75rem,4.2vw,51px)] font-normal leading-[1.15] tracking-[-1.5px] lg:col-span-3 lg:indent-[clamp(120px,14vw,200px)]"
        >
          Most of my work starts as a process somebody is still running by hand:
          a spreadsheet, an eight-hour Monday, a booking taken over WhatsApp. I
          build the system that takes it over, then put it into production and
          keep it there.
        </SplitLines>

        <Reveal className="lg:col-span-3 lg:col-start-2 lg:mt-4">
          <RuleToLink href="/about" label="More about Haris" />
        </Reveal>

        <Reveal className="relative text-body font-light lg:col-span-2 lg:col-start-2 lg:mt-2 lg:max-w-[60ch]">
          {/* The reference's pixel pointing hand, sitting in the margin to the
              left of the text so the paragraph still aligns to the column. */}
          <span
            aria-hidden="true"
            className="mb-3 flex size-6 items-center justify-center border border-accent font-display text-[14px] font-bold leading-none text-accent lg:absolute lg:-left-10 lg:top-1 lg:mb-0"
          >
            →
          </span>
          <p>
            At{" "}
            <strong className="font-semibold text-accent">{site.name}</strong>{" "}
            you talk to the person writing the code. I start with the process as
            your team runs it today, find the step that eats the most hours, and
            build the system that takes it over, from the database to the
            screen.
          </p>
          <p className="mt-5 font-semibold italic">Then I keep it running.</p>
        </Reveal>
      </Stagger>
    </Section>
  );
}
