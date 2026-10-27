import { Chip, RuleToLink } from "@/components/ui";
import { skills } from "@/data";

import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * Capability — design.md §9.1 item 5.
 *
 * The CV's seven groups, in the CV's order, rendered as a definition list:
 * grouping is the information, so it survives into the markup. Explicitly not a
 * marquee — V2's scrolling toolbox read as padding, could not be stopped, and
 * ran with no reduced-motion guard (lessons.md T-009).
 */
export function Capability() {
  return (
    <Section id="capability">
      <Reveal className="grid gap-8 lg:grid-cols-4 lg:gap-6">
        <div className="lg:col-span-3">
          <Chip>Capability</Chip>
          <h2 className="mt-8 max-w-[24ch] text-[clamp(1.75rem,3.6vw,48px)] font-medium leading-[1.1] tracking-[-0.02em]">
            The stack these systems are actually built on.
          </h2>
        </div>
        <p className="text-body text-mid-grey lg:col-start-4 lg:pl-6">
          Grouped the way the work splits, newest first. Nothing on this list is
          here because it looks good on a list.
        </p>
      </Reveal>

      <Reveal>
        <dl className="mt-16 grid gap-10 border-t border-border pt-10 lg:mt-24 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-12">
          {skills.map((group) => (
            <div key={group.id} className="lg:pr-10">
              <dt className="u-label text-accent">{group.label}</dt>
              <dd className="mt-3 max-w-[48ch] text-body text-ink">
                {group.items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal className="mt-16 lg:mt-20">
        <RuleToLink
          heading="Experience and education"
          headingClassName="text-[clamp(1.5rem,2.6vw,32px)] font-medium leading-[1.1] tracking-[-0.02em]"
          as="h3"
          href="/about"
          label="Read the full history"
        />
      </Reveal>
    </Section>
  );
}
