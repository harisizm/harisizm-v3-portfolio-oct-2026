import { Reveal } from "@/components/motion";
import type { CaseStudy } from "@/data";
import { CaseStudySection } from "./CaseStudySection";
import { MetricList } from "./MetricList";

export interface ResultsSectionProps {
  results: CaseStudy["results"];
}

/**
 * Headline, one paragraph, then the numbers.
 *
 * The headline is 28px medium, the reference's "The Results? Chef's Kiss"
 * (cs-8000). It sits well below the statement scale on purpose: that scale is
 * the Problem's signature and loses its force if a second section borrows it.
 * `metrics` is optional in the data layer and the list collapses to nothing
 * when it is absent or empty.
 *
 * Headline then body reveal a beat apart (lessons.md D-017); the metrics
 * choreograph themselves in `MetricList`.
 */
export function ResultsSection({ results }: ResultsSectionProps) {
  return (
    <CaseStudySection id="results" label="The Results">
      <Reveal>
        <p className="text-[24px] font-medium leading-[1.25] tracking-[-0.3px] md:text-[28px]">
          {results.headline}
        </p>
      </Reveal>
      <Reveal className="mt-6" delay={0.1}>
        <p className="font-light">{results.body}</p>
      </Reveal>
      {results.metrics ? (
        <MetricList metrics={results.metrics} className="mt-14" />
      ) : null}
    </CaseStudySection>
  );
}
