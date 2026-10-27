import { resolveStats } from "./content";

/**
 * Numbers read out of the case studies, never retyped here — and each one is
 * printed with the project it belongs to so a reader can go and check it.
 *
 * Staggered vertically at `lg`, the way the reference breaks its numerals out
 * of their panels.
 */
export function StatRow() {
  const stats = resolveStats();
  if (stats.length === 0) return null;

  return (
    <section
      aria-labelledby="stats-heading"
      className="u-container border-t border-border py-16 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1408px]">
        <h2 id="stats-heading" className="u-label text-accent">
          By the numbers
        </h2>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
          {stats.map((stat, i) => (
            <div
              key={`${stat.project}-${stat.label}`}
              className={`bg-ink p-6 text-white ${i % 2 === 1 ? "lg:mt-10" : ""}`}
            >
              <dt className="u-sr-only">
                {stat.label} — {stat.project}
              </dt>
              <dd>
                {/* `8h → ~10 min` is a long value in a 4-up column: it wraps
                    rather than overflowing, so the leading has to allow for
                    two lines. */}
                <span className="block break-words font-display text-title font-bold leading-tight text-white">
                  {stat.value}
                </span>
                <span className="mt-4 block text-body text-white/70">{stat.label}</span>
                {stat.note ? (
                  <span className="mt-1 block text-label text-white/70">{stat.note}</span>
                ) : null}
                <span className="u-label mt-6 block text-accent-2">{stat.project}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
