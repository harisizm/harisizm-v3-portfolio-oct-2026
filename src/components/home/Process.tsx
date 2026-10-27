import { Chip } from "@/components/ui";

import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * Three steps — design.md §9.1 item 4.
 *
 * Written from what the case studies in `@/data` actually show, not from agency
 * vocabulary: the work ships to a live deployment first, every claim it makes is
 * a measured one, and the manual process it replaced is the result. Every number
 * quoted here appears in a project's `outcome` or `evidence` fields.
 *
 * This copy belongs in the data layer eventually — `src/data` is owned by
 * another agent in this pass, so it sits here as a typed module constant rather
 * than inline in the JSX (lessons.md T-010).
 */
interface Step {
  readonly num: string;
  readonly name: string;
  readonly subtitle: string;
  readonly body: string;
}

const steps = [
  {
    num: "Ø1",
    name: "Ship",
    subtitle: "to production // not to a demo folder",
    body:
      "The first useful version goes somewhere real. Tourgenz has been live since September 2026 — a traveller app, five vendor portals and an admin control room, all carrying actual bookings. Everything after launch lands on software people are already using.",
  },
  {
    num: "Ø2",
    name: "Measure",
    subtitle: "the claim // or do not make it",
    body:
      "Tourgenz is held together by roughly 2,000 automated tests across 214 files and 111 hand-written SQL migrations, with no CI pipeline to lean on. TransGPA's parse time is under two seconds because it was timed, not because it felt quick.",
  },
  {
    num: "Ø3",
    name: "Automate",
    subtitle: "the part nobody should be doing // by hand",
    body:
      "Once the manual process is understood well enough, it gets replaced. An eight-hour prospecting day became about ten minutes. A multi-day research process became 10,000 qualified profiles in 24 hours, running unattended on a VPS.",
  },
] as const satisfies readonly Step[];

export function Process() {
  return (
    <Section id="process">
      <Reveal className="grid gap-8 lg:grid-cols-4 lg:gap-6">
        <div className="lg:col-span-3">
          <Chip>Process</Chip>
          <h2 className="mt-8 max-w-[24ch] text-[clamp(1.75rem,3.6vw,48px)] font-medium leading-[1.1] tracking-[-0.02em]">
            Three steps, and the third one is the point.
          </h2>
        </div>
      </Reveal>

      <ol className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-3 lg:gap-6">
        {steps.map((step) => (
          <li key={step.num}>
            <Reveal className="lg:pr-8">
              <p className="font-display text-body font-bold leading-[1.1] text-mid-grey">
                {step.num}
              </p>

              {/* Step name: display face, 48px/700/+1px — design.md §4. */}
              <h3 className="mt-4 font-display text-[clamp(1.75rem,3.6vw,48px)] font-bold uppercase leading-[1.1] tracking-[1px] text-accent">
                {step.name}
              </h3>

              <p className="u-label mt-3 text-mid-grey">{step.subtitle}</p>

              <p className="mt-6 max-w-[42ch] text-body">{step.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
