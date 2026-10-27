import { Chip } from "@/components/ui";
import { skills } from "@/data";

/**
 * The stack in the CV's own seven categories — a grouped grid, not a flat
 * marquee (design.md §9.1). The grouping is content: this component slices the
 * data into columns and never re-groups it.
 */
export function CapabilityGrid() {
  return (
    <section className="u-container border-t border-border py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1408px]">
        <Chip>Capability</Chip>
        <h2 className="mt-6 text-title font-medium tracking-tight sm:text-heading">
          What I build with
        </h2>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group) => (
            <section key={group.id} aria-labelledby={`skills-${group.id}`}>
              <h3 id={`skills-${group.id}`} className="u-label text-accent">
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
      </div>
    </section>
  );
}
