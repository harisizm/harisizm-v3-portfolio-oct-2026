import { Chip } from "@/components/ui";
import { about, skills } from "@/data";

/**
 * The stack in the CV's own seven categories, a grouped grid rather than a flat
 * marquee (design.md §9.1). The grouping is content: this component slices the
 * data into columns and never re-groups it.
 */
export function CapabilityGrid() {
  const { chip, heading } = about.capability;

  return (
    <section className="u-container border-t border-border py-16 lg:py-24">
      <Chip>{chip}</Chip>
      <h2 className="mt-6 text-title font-medium uppercase tracking-tight sm:text-heading">
        {heading}
      </h2>

      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {skills.map((group) => (
          <section key={group.id} aria-labelledby={`skills-${group.id}`}>
            <h3 id={`skills-${group.id}`} className="u-label-sm text-accent">
              {group.label}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="border border-border px-3 py-1.5 text-label text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
