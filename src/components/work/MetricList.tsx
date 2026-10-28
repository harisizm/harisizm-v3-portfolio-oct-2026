import { CountUp, Reveal, STAGGER, Stagger } from "@/components/motion";
import type { Metric } from "@/data";

export interface MetricListProps {
  metrics: readonly Metric[];
  className?: string;
}

/**
 * The numbers, as a description list.
 *
 * `flex-col-reverse` keeps the markup valid — `dt` (the label) before `dd` (the
 * value) — while the value reads first, which is the order the eye wants. The
 * value takes the display face at 32px in `--accent` per design.md §4; the
 * label is the small body-face label and the note stays sentence case because
 * it is a sentence, not a number.
 *
 * Motion (lessons.md D-017): the rows stagger in and each value counts up
 * from zero when it is in view. `CountUp` animates only the leading integer
 * and keeps everything else literal, so `~2,000` keeps its tilde and its
 * comma, `8,445` its comma, and `1 to 2 min` counts the 1 and leaves the rest.
 * A `div` wraps the list so `Stagger` can be the trigger without the `dl`
 * having to be one; the grid stays on the `dl`.
 */
export function MetricList({ metrics, className = "" }: MetricListProps) {
  if (metrics.length === 0) return null;

  return (
    <Stagger className={className}>
      <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {metrics.map((metric, index) => (
          <Reveal
            key={`${metric.label}-${metric.value}`}
            className="flex flex-col-reverse border-t border-border pt-4"
            delay={index * STAGGER}
          >
            <dt className="u-label-sm mt-3 text-mid-grey">
              {metric.label}
              {metric.note ? (
                <span className="mt-1 block normal-case tracking-normal">
                  {metric.note}
                </span>
              ) : null}
            </dt>
            <dd className="m-0 font-display text-[32px] font-bold leading-none text-accent">
              <CountUp value={metric.value} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </Stagger>
  );
}
