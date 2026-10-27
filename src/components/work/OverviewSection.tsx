import type { CaseStudy } from "@/data";
import { CaseStudySection } from "./CaseStudySection";

export interface OverviewSectionProps {
  overview: CaseStudy["overview"];
}

/**
 * The signature asymmetric rhythm (design.md §9.2): a large left block at the
 * 51px statement scale, then a smaller right-aligned continuation.
 *
 * The right-alignment holds at every width. The reference keeps it on mobile and
 * it is the one thing that makes the rhythm survive the collapse to one column —
 * drop it and the section is just two paragraphs.
 */
export function OverviewSection({ overview }: OverviewSectionProps) {
  return (
    <CaseStudySection id="overview" label="Overview">
      <p className="max-w-[20ch] text-[30px] leading-[1.18] tracking-[-0.5px] sm:max-w-[16ch] md:text-statement md:leading-[1.15] md:tracking-[-1.5px]">
        {overview.lead}
      </p>
      <p className="ml-auto mt-12 max-w-[48ch] text-right text-lead font-light md:mt-16">
        {overview.aside}
      </p>
    </CaseStudySection>
  );
}
