import { CountUp, Reveal, Stagger } from "@/components/motion";
import { Icon } from "@/components/ui";
import { about, resolveStats } from "@/data";

/* Four panels on the three grounds the site has, so the row reads as the
   palette itself: slate, orange, ink, slate. Text on each is canvas. */
const GROUNDS = [
  "bg-accent-2 text-canvas",
  "bg-accent text-white",
  "bg-ink text-canvas",
  "bg-accent-2 text-canvas",
] as const;

/**
 * Numbers read out of the case studies, never retyped here, and each one is
 * printed with the project it belongs to so a reader can go and check it.
 *
 * Redrawn 2026-10-30 (lessons.md D-021). The reference's grey numerals
 * breaking out of ink panels read as the dullest block on the site once the
 * palette moved. Now each stat is a full panel in one of the site's own
 * grounds, the figure in the display face filling the bottom, the icon that
 * names it top-left, and the project it came from as the chip label.
 *
 * Motion: the four panels are a `Stagger`; each figure runs through
 * `CountUp`, which counts only the leading integer and keeps
 * `8h → ~10 min` reading as written.
 */

/* The reference's numerals are three characters ("25+"). Ours run to twelve
   ("8h → ~10 min"), so the size follows the length: a value that would wrap
   or escape its panel is sized down rather than broken across lines. */
function numeralSize(value: string): string {
  if (value.length <= 4) return "text-[clamp(64px,7.5vw,112px)]";
  if (value.length <= 7) return "text-[clamp(44px,4.8vw,72px)]";
  return "text-[clamp(30px,3.1vw,46px)]";
}

export function StatRow() {
  const stats = resolveStats();
  if (stats.length === 0) return null;

  return (
    <section aria-labelledby="stats-heading" className="u-container py-16 lg:py-24">
      <h2 id="stats-heading" className="u-sr-only">
        {about.stats.heading}
      </h2>
      <Stagger>
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, i) => (
            <Reveal
              key={`${stat.project}-${stat.label}`}
              className={`flex min-h-[300px] flex-col justify-between p-6 lg:min-h-[340px] ${GROUNDS[i % GROUNDS.length]}`}
            >
              <div className="flex items-start justify-between gap-4">
                {stat.icon ? <Icon name={stat.icon} size={1.75} /> : <span />}
                <span className="u-label-sm opacity-80">{stat.project}</span>
              </div>
              <dt className="u-sr-only">
                {stat.label}, {stat.project}
              </dt>
              <dd className="m-0">
                <span
                  className={`block whitespace-nowrap font-display font-bold leading-none ${numeralSize(stat.value)}`}
                >
                  <CountUp value={stat.value} />
                </span>
                <span className="mt-4 block max-w-[22ch] text-body font-light opacity-90">
                  {stat.label}
                  {stat.note ? `, ${stat.note}` : null}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </Stagger>
    </section>
  );
}
