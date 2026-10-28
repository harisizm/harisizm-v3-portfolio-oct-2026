import { about, resolveStats } from "@/data";

/* The reference's panels step down the row: the first is short, the next
   taller, the next taller again. Four stats, so the fourth steps back. */
const PANEL_HEIGHTS = ["lg:h-24", "lg:h-48", "lg:h-72", "lg:h-48"] as const;

/**
 * Numbers read out of the case studies, never retyped here, and each one is
 * printed with the project it belongs to so a reader can go and check it.
 *
 * Built to `about-2700.webp`: an ink panel on top, and a giant pale numeral in
 * the display face that starts inside the panel and breaks out of its bottom
 * edge onto the canvas. The numeral is `--mid-grey`, which is quiet on both
 * grounds and still clears 3:1 at this size. Labels 18px light, mid grey.
 */

/* The reference's numerals are three characters ("25+", "3-6"). Ours run to
   twelve ("8h → ~10 min"), so the size follows the length: a value that would
   wrap or escape its column is sized down rather than broken across lines. */
function numeralSize(value: string): string {
  if (value.length <= 4) return "text-[clamp(56px,7vw,104px)]";
  if (value.length <= 7) return "text-[clamp(40px,4.5vw,64px)]";
  return "text-[clamp(28px,3vw,44px)]";
}

export function StatRow() {
  const stats = resolveStats();
  if (stats.length === 0) return null;

  return (
    <section aria-labelledby="stats-heading" className="u-container py-16 lg:py-24">
      <h2 id="stats-heading" className="u-sr-only">
        {about.stats.heading}
      </h2>
      <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:items-start lg:gap-6">
        {stats.map((stat, i) => (
          <div key={`${stat.project}-${stat.label}`} className="flex flex-col">
            <div aria-hidden="true" className={`h-20 bg-ink ${PANEL_HEIGHTS[i % PANEL_HEIGHTS.length]}`} />
            <dt className="u-sr-only">
              {stat.label}, {stat.project}
            </dt>
            <dd className="px-4">
              {/* Pulled up by half its own height so it straddles the panel's
                  bottom edge. `8h → ~10 min` is a long value in a 4-up column:
                  it wraps rather than overflowing. */}
              <span
                className={`-mt-[0.5em] block whitespace-nowrap font-display font-bold leading-none text-mid-grey ${numeralSize(stat.value)}`}
              >
                {stat.value}
              </span>
              <span className="mt-3 block max-w-[24ch] text-body font-light text-mid-grey">
                {stat.label}
                {stat.note ? `, ${stat.note}` : null}
              </span>
              <span className="u-label-sm mt-4 block text-accent">{stat.project}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
