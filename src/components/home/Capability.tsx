import { Marquee, Reveal, Stagger } from "@/components/motion";
import { Chip, RuleToLink } from "@/components/ui";
import { skills } from "@/data";

import { Section } from "./Section";

/** Every stack name, in the CV's order, for the strip. One source: `skills`. */
const stackNames = skills.flatMap((group) => group.items);

/**
 * Capability — design.md §9.1 item 5.
 *
 * The CV's seven groups, in the CV's order, rendered as a definition list:
 * grouping is the information, so it survives into the markup.
 *
 * Above the list runs one `Marquee` of the same names (lessons.md D-017,
 * showpiece). It is allowed where V2's toolbox was not (T-009) because it stops
 * under the pointer, is a single static row under reduced motion and with JS
 * off, and repeats nothing the grouped list below does not already state: the
 * strip is texture, the list is the content.
 */
export function Capability() {
  return (
    <Section id="capability">
      <Reveal className="grid gap-8 lg:grid-cols-4 lg:gap-6">
        <div className="lg:col-span-3">
          <Chip>Capability</Chip>
          <h2 className="mt-8 max-w-[24ch] text-[clamp(1.75rem,3.6vw,48px)] font-medium uppercase leading-[1.1] tracking-[-1px]">
            The stack these systems are actually built on.
          </h2>
        </div>
        <p className="text-body text-mid-grey lg:col-start-4 lg:pl-6">
          Grouped the way the work splits, newest first. Nothing on this list is
          here because it looks good on a list.
        </p>
      </Reveal>

      {/* Hidden from assistive tech as a whole: the same names are read out
          of the list below, and a strip that scrolls has no reading order. */}
      <Reveal y={0} className="mt-16 border-t border-border py-6 lg:mt-24">
        <div aria-hidden="true">
          <Marquee className="u-label text-mid-grey">
            {stackNames.map((name) => (
              <span
                key={name}
                className="flex items-center gap-12 whitespace-nowrap"
              >
                {name}
                <span className="size-1.5 bg-accent" />
              </span>
            ))}
          </Marquee>
        </div>
      </Reveal>

      <Stagger>
        <dl className="grid gap-10 border-t border-border pt-10 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-12">
          {skills.map((group) => (
            <Reveal key={group.id} className="lg:pr-10">
              <dt className="u-label text-accent">{group.label}</dt>
              <dd className="mt-3 max-w-[48ch] text-body text-ink">
                {group.items.join(", ")}
              </dd>
            </Reveal>
          ))}
        </dl>
      </Stagger>

      <Reveal className="mt-16 lg:mt-20">
        <RuleToLink
          heading="Experience and education"
          headingClassName="text-[clamp(1.5rem,2.6vw,32px)] font-medium uppercase leading-[1.1] tracking-[-0.02em]"
          as="h3"
          href="/about"
          label="Read the full history"
        />
      </Reveal>
    </Section>
  );
}
