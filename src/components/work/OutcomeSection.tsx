import type { CaseStudy } from "@/data";
import { CaseStudySection } from "./CaseStudySection";
import { MetricList } from "./MetricList";

export interface OutcomeSectionProps {
  outcome: CaseStudy["outcome"];
}

/**
 * Headline, body, then the metrics.
 *
 * The headline sits below the 51px statement scale on purpose: that scale is the
 * Overview's signature and loses its force if a second section borrows it.
 * `metrics` is optional in the data layer and the list collapses to nothing when
 * it is absent or empty.
 */
export function OutcomeSection({ outcome }: OutcomeSectionProps) {
  return (
    <CaseStudySection id="outcome" label="The Outcome">
      <p className="max-w-[26ch] text-[24px] font-medium leading-[1.25] tracking-[-0.5px] md:text-[32px]">
        {outcome.headline}
      </p>
      <p className="mt-8 max-w-[62ch] text-lead font-light">{outcome.body}</p>
      {outcome.metrics ? (
        <MetricList metrics={outcome.metrics} className="mt-14" />
      ) : null}
    </CaseStudySection>
  );
}
