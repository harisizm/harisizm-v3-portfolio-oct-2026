import { Chip, RuleToLink } from "@/components/ui";

import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * Positioning — design.md §9.1 item 2.
 *
 * One 51px statement paragraph, then the rule-to-link through to About. The
 * statement is the "identity before job title" slot: it says what kind of
 * problem arrives, not what the job is called.
 */
export function Positioning() {
  return (
    <Section id="positioning">
      <Reveal className="grid gap-10 lg:grid-cols-4 lg:gap-6">
        <div className="lg:col-span-3">
          <Chip>About</Chip>

          <p className="mt-8 max-w-[26ch] text-[clamp(1.75rem,4.2vw,51px)] font-normal leading-[1.15] tracking-[-0.025em] lg:max-w-[30ch]">
            Most of my work starts as a process somebody is still running by
            hand — a spreadsheet, an eight-hour Monday, a booking taken over
            WhatsApp. I build the system that takes it over, then put it into
            production and keep it there.
          </p>
        </div>

        <div className="lg:col-start-4 lg:pl-6">
          <p className="text-body text-mid-grey">
            Full-stack, with the backend and the data pipeline usually being the
            hard part: Next.js and React on the surface, Express, FastAPI,
            PostgreSQL and Python underneath. No agency, no account manager —
            you talk to the person writing it.
          </p>
        </div>

        <RuleToLink
          className="lg:col-span-4 lg:mt-8"
          heading="How I work"
          headingClassName="text-[clamp(1.75rem,3.6vw,48px)] font-medium leading-[1.1] tracking-[-0.02em]"
          href="/about"
          label="More about Haris"
        />
      </Reveal>
    </Section>
  );
}
