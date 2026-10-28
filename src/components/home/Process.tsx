import Image from "next/image";

import { Chip, RuleToLink } from "@/components/ui";
import { processSteps, type ProcessStep } from "@/data";

import { Reveal } from "./Reveal";
import { Section } from "./Section";

/** The reference's line-art slot is about 200px square (audit B4). */
const DIAGRAM_PX = 200;

/**
 * The diagram slot. A null `diagram` is spacing, not a placeholder: the column
 * keeps its rhythm so the SVG drops into the same spot when it is drawn, and
 * nothing renders that could be mistaken for a broken image (T-002).
 */
function Diagram({ step }: { step: ProcessStep }) {
  if (step.diagram === null) {
    return <div aria-hidden="true" style={{ height: DIAGRAM_PX }} />;
  }

  return (
    <Image
      src={step.diagram}
      alt=""
      width={DIAGRAM_PX}
      height={DIAGRAM_PX}
      loading="lazy"
      className="mx-auto"
    />
  );
}

/**
 * Process — design.md §9.1 item 4, composed like `home-4250.webp`.
 *
 * Heading, intro and `LEARN MORE ↗` in column 1; the three steps fill columns
 * 2 to 4, each centred: number, display-face name, body-face subtitle with the
 * `//` separator, diagram slot, body. The copy lives in `src/data/process.ts`.
 *
 * The column-1 link is a `RuleToLink` with its rule hidden on desktop: the
 * reference has a bare `LEARN MORE ↗` there, and reusing the primitive keeps
 * one implementation of the arrow link (T-005).
 */
export function Process() {
  return (
    <Section id="process">
      <div className="grid gap-14 lg:grid-cols-4 lg:gap-6">
        <Reveal className="lg:pr-6">
          <Chip>Process</Chip>
          <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,48px)] font-medium uppercase leading-[1.1] tracking-[-1px]">
            How I work
          </h2>
          <p className="mt-4 max-w-[34ch] text-body font-light text-mid-grey">
            Three steps, and the third one is the point. This is how a process
            that runs by hand becomes a system that runs on its own:
          </p>
          <RuleToLink
            className="mt-6 lg:[&>span]:hidden"
            href="/about"
            label="Learn more"
          />
        </Reveal>

        <ol className="grid gap-14 lg:col-span-3 lg:grid-cols-3 lg:gap-6">
          {processSteps.map((step) => (
            <li key={step.num} className="text-center">
              <Reveal className="mx-auto max-w-[36ch] lg:px-4">
                <p className="u-pixel-num text-mid-grey">{step.num}</p>

                {/* Step name: display face, 48px/700/+1px — design.md §4. */}
                <h3 className="mt-1 font-display text-[clamp(1.75rem,3.6vw,48px)] font-bold uppercase leading-[1.1] tracking-[1px] text-accent">
                  {step.name}
                </h3>

                <p className="mt-2 text-lead font-normal leading-[1.4] text-ink">
                  {step.subtitle}
                </p>

                <div className="my-10">
                  <Diagram step={step} />
                </div>

                <p className="text-body">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
