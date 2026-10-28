import type { CaseStudy } from "@/data";
import { CaseStudySection } from "./CaseStudySection";
import { MetricList } from "./MetricList";

export interface OutcomeSectionProps {
  outcome: CaseStudy["outcome"];
}

/**
 * Headline, body, then the metrics.
 *
 * The headline is 28px medium, the reference's "The Results? Chef's Kiss"
 * (cs-8000). It sits well below the statement scale on purpose: that scale is
 * the Overview's signature and loses its force if a second section borrows it.
 * `metrics` is optional in the data layer and the list collapses to nothing when
 * it is absent or empty.
 */
export function OutcomeSection({ outcome }: OutcomeSectionProps) {
  return (
    <CaseStudySection id="outcome" label="The Outcome">
      <p className="text-[24px] font-medium leading-[1.25] tracking-[-0.3px] md:text-[28px]">
        {outcome.headline}
      </p>
      <p className="mt-6 font-light">{outcome.body}</p>
      {outcome.metrics ? (
        <MetricList metrics={outcome.metrics} className="mt-14" />
      ) : null}
    </CaseStudySection>
  );
}
