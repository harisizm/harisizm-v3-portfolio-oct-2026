import { Chip } from "@/components/ui";
import { experience } from "@/data";

/**
 * Work history straight from the data layer. The current role is flagged off
 * `end === null` rather than a hardcoded "Present" string, so the marker cannot
 * outlive the job (see the note in `src/data/experience.ts`).
 */
export function ExperienceTimeline() {
  return (
    <section className="u-container border-t border-border py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1408px]">
        <Chip>Experience</Chip>
        <h2 className="mt-6 text-title font-medium tracking-tight sm:text-heading">
          Where the work happened
        </h2>

        <ol className="mt-12 space-y-12">
          {experience.map((role) => (
            <li
              key={role.id}
              className="grid gap-6 border-t border-border pt-8 lg:grid-cols-[1fr_2.4fr] lg:gap-16"
            >
              <div>
                <p className="u-label text-accent">{role.dateLabel}</p>
                <p className="mt-2 text-label text-mid-grey">{role.location}</p>
                {role.end === null ? (
                  <p className="mt-4 flex items-center gap-2">
                    <span aria-hidden="true" className="size-2.5 bg-accent-2" />
                    <span className="u-label text-accent">Current role</span>
                  </p>
                ) : null}
              </div>

              <div>
                <h3 className="text-title font-medium tracking-tight">{role.company}</h3>
                <p className="u-label mt-2 text-mid-grey">{role.title}</p>
                <p className="mt-6 max-w-[62ch] text-body text-ink">{role.summary}</p>
                <ul className="mt-6 max-w-[62ch] space-y-4">
                  {role.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-4 text-body text-mid-grey">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-accent" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
