import { Reveal, SplitLines } from "@/components/motion";
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
 *
 * Motion (lessons.md D-017): the statement rises line by line; the aside
 * follows a beat later. `SplitLines` clips each line with 0.12em of vertical
 * slack, which at 1.15 line-height covers Inter's 0.03em overshoot with room
 * to spare, so no descender is shaved. The aside's layout classes sit on the
 * `Reveal` and only the text styling stays on the paragraph.
 */
export function OverviewSection({ overview }: OverviewSectionProps) {
  return (
    <CaseStudySection id="overview" label="Overview" layout="stacked">
      <SplitLines
        as="p"
        className="max-w-[765px] text-[26px] leading-[1.15] tracking-[-0.3px] md:text-statement-cs md:tracking-[-0.4px]"
      >
        {overview.lead}
      </SplitLines>
      <Reveal
        className="ml-auto mt-12 max-w-[48ch] md:mt-16 lg:ml-[45%] lg:max-w-none"
        delay={0.15}
      >
        <p className="text-right font-light">{overview.aside}</p>
      </Reveal>
    </CaseStudySection>
  );
}
