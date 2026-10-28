import { CountUp, Reveal, Stagger, STAGGER } from "@/components/motion";
import { Chip } from "@/components/ui";
import { isTestimonial, sortedProjects, type Project } from "@/data";

import { Section } from "./Section";

/**
 * One project's evidence slot, read straight from the data layer. Nothing is
 * restated here, so a number can only change in `src/data` (lessons.md T-010).
 *
 * The testimonial branch is not decoration: `Evidence` is a union so a real
 * quote can drop into the same slot without a redesign (lessons.md D-014). None
 * exists yet, and none is to be written (T-003) — until one does, every project
 * resolves to the usage branch.
 *
 * Motion: each value runs through `CountUp`, which counts the leading integer
 * and leaves the rest of the string literal, so `~2,000`, `95%+` and `24h+`
 * end exactly as written. The source line is its own `Reveal` and arrives
 * last, after the number it vouches for.
 */
function EvidenceCard({ project }: { project: Project }) {
  const { evidence } = project.caseStudy;

  if (isTestimonial(evidence)) {
    if (!evidence.permissionToPublish) return null;

    return (
      <div className="border-t border-border pt-6">
        <p className="u-label">{project.shortTitle}</p>
        <blockquote className="mt-4 max-w-[44ch] text-lead font-light">
          “{evidence.quote}”
        </blockquote>
        <p className="u-label-sm mt-4 text-mid-grey">
          {evidence.author}, {evidence.authorRole}, {evidence.company}
        </p>
      </div>
    );
  }

  return (
    <div className="border-t border-border pt-6">
      <p className="u-label">{project.shortTitle}</p>

      <p className="mt-4 max-w-[40ch] text-lead font-light">
        {evidence.headline}
      </p>

      {/* `items-start` is the fix for audit B5: with the default stretch, a
          metric whose label wrapped grew taller and its column-reverse layout
          floated the number 37px above its siblings. Sized to content, every
          number sits on the same top line and the labels hang below. */}
      <dl className="mt-6 flex flex-wrap items-start gap-x-10 gap-y-5">
        {evidence.metrics.map((metric) => (
          /* Reversed so the value reads first visually while the markup keeps
             the `dt` before its `dd` — a hidden duplicate label would make the
             pair read twice to a screen reader. */
          <div
            key={`${metric.value}-${metric.label}`}
            className="flex max-w-[20ch] flex-col-reverse"
          >
            <dt className="u-label-sm mt-2 text-mid-grey">
              {metric.label}
              {metric.note ? (
                <span className="mt-1 block normal-case tracking-normal">
                  {metric.note}
                </span>
              ) : null}
            </dt>
            <dd className="font-display text-[32px] font-bold leading-[1.1] text-accent">
              <CountUp value={metric.value} />
            </dd>
          </div>
        ))}
      </dl>

      <Reveal y={0} delay={STAGGER * 6}>
        <p className="mt-6 text-label-sm text-mid-grey">Source: {evidence.source}</p>
      </Reveal>
    </div>
  );
}

/**
 * Proof — design.md §9.1 item 6.
 *
 * Every number on this page comes out of a project's `evidence` field and keeps
 * its `source` line beside it, so a reader can challenge it. No testimonial is
 * manufactured to fill the gap (lessons.md T-003) and the absence is stated
 * rather than hidden.
 */
export function Proof() {
  const projects = sortedProjects();

  return (
    <Section id="proof">
      <Reveal className="grid gap-8 lg:grid-cols-4 lg:gap-6">
        <div className="lg:col-span-3">
          <Chip>Proof</Chip>
          <h2 className="mt-8 max-w-[24ch] text-[clamp(1.75rem,3.6vw,48px)] font-medium uppercase leading-[1.1] tracking-[-1px]">
            Every number here has a source next to it.
          </h2>
        </div>
        <p className="text-body text-mid-grey lg:col-start-4 lg:pl-6">
          No client testimonials yet. This is employer and self-initiated work,
          so the evidence is usage and measurement rather than a quote. When a
          real one arrives it goes in the same slot.
        </p>
      </Reveal>

      <Stagger className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-16">
        {projects.map((project) => (
          <Reveal key={project.slug} className="lg:pr-10">
            <EvidenceCard project={project} />
          </Reveal>
        ))}
      </Stagger>
    </Section>
  );
}
