import type { CaseStudy } from "@/data";
import { CaseStudySection } from "./CaseStudySection";

export interface OverviewSectionProps {
  overview: CaseStudy["overview"];
}

/**
 * The signature asymmetric rhythm (design.md §9.2, audit A5): a large left
 * block at the case-study statement scale, 33.6px in a measure of roughly
 * 765px (about six lines), then a smaller right-aligned continuation in the
 * right half of the column.
 *
 * The statement starts at the content edge, not in the prose column the other
 * sections use, so this is the one `stacked` section. The home statement's
 * 51px is deliberately not reused here: in this column it made a 13-line
 * tower, the single largest "too big" offender in the audit.
 *
 * The right-alignment holds at every width. The reference keeps it on mobile and
 * it is the one thing that makes the rhythm survive the collapse to one column:
 * drop it and the section is just two paragraphs.
 */
export function OverviewSection({ overview }: OverviewSectionProps) {
  return (
    <CaseStudySection id="overview" label="Overview" layout="stacked">
      <p className="max-w-[765px] text-[26px] leading-[1.15] tracking-[-0.3px] md:text-statement-cs md:tracking-[-0.4px]">
        {overview.lead}
      </p>
      <p className="ml-auto mt-12 max-w-[48ch] text-right font-light md:mt-16 lg:ml-[45%] lg:max-w-none">
        {overview.aside}
      </p>
    </CaseStudySection>
  );
}
