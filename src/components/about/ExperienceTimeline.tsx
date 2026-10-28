import { Chip } from "@/components/ui";
import { about, experience } from "@/data";

/**
 * Work history straight from the data layer. The current role is flagged off
 * `end === null` rather than a hardcoded "Present" string, so the marker cannot
 * outlive the job (see the note in `src/data/experience.ts`).
 *
 * Section label is the chip; the group labels (dates, title, current-role
 * marker) are `.u-label-sm` in the accent; everything else is the body face.
 */
export function ExperienceTimeline() {
  const { chip, heading, current } = about.experience;

  return (
    <section className="u-container border-t border-border py-16 lg:py-24">
      <Chip>{chip}</Chip>
      <h2 className="mt-6 text-title font-medium uppercase tracking-tight sm:text-heading">
        {heading}
      </h2>

      <ol className="mt-12 space-y-12">
        {experience.map((role) => (
          <li
            key={role.id}
            className="grid gap-6 border-t border-border pt-8 lg:grid-cols-4 lg:gap-6"
          >
            <div>
              <p className="u-label-sm text-accent">{role.dateLabel}</p>
              <p className="mt-2 text-label-sm text-mid-grey">{role.location}</p>
              {role.end === null ? (
                <p className="mt-4 flex items-center gap-2">
                  <span aria-hidden="true" className="size-2.5 bg-accent-2" />
                  <span className="u-label-sm text-accent">{current}</span>
                </p>
              ) : null}
            </div>

            <div className="lg:col-span-3 lg:pl-6">
              <h3 className="text-title font-medium tracking-tight">{role.company}</h3>
              <p className="u-label-sm mt-2 text-mid-grey">{role.title}</p>
              <p className="mt-6 max-w-[62ch] text-body font-light text-ink">{role.summary}</p>
              <ul className="mt-6 max-w-[62ch] space-y-4">
                {role.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-4 text-body font-light text-mid-grey">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-accent" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
