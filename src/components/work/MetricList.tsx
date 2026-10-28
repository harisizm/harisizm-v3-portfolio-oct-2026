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
 */
export function MetricList({ metrics, className = "" }: MetricListProps) {
  if (metrics.length === 0) return null;

  return (
    <dl className={`grid gap-x-10 gap-y-8 sm:grid-cols-2 ${className}`}>
      {metrics.map((metric) => (
        <div
          key={`${metric.label}-${metric.value}`}
          className="flex flex-col-reverse border-t border-border pt-4"
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
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
