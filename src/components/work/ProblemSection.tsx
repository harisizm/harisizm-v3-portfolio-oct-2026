import { Reveal, SplitLines } from "@/components/motion";
import type { CaseStudy } from "@/data";
import { CaseStudySection } from "./CaseStudySection";

export interface ProblemSectionProps {
  problem: CaseStudy["problem"];
}

/**
 * The problem, from the user's side (lessons.md D-019), in the signature
 * asymmetric rhythm (design.md §9.2, audit A5): a large left block at the
 * case-study statement scale, 33.6px in a measure of roughly 765px, then a
 * smaller right-aligned continuation that says whose work this was.
 *
 * The statement starts at the content edge, not in the prose column the other
 * sections use, so this is the one `stacked` section. The right-alignment
 * holds at every width: it is the one thing that makes the rhythm survive the
 * collapse to one column.
 *
 * Motion (lessons.md D-017): the statement rises line by line; the aside
 * follows a beat later. `SplitLines` clips each line with 0.12em of vertical
 * slack, which at 1.15 line-height covers Inter's overshoot.
 */
export function ProblemSection({ problem }: ProblemSectionProps) {
  return (
    <CaseStudySection id="problem" label="The Problem" layout="stacked">
      <SplitLines
        as="p"
        className="max-w-[765px] text-[26px] leading-[1.15] tracking-[-0.3px] md:text-statement-cs md:tracking-[-0.4px]"
      >
        {problem.lead}
      </SplitLines>
      <Reveal
        className="ml-auto mt-12 max-w-[48ch] md:mt-16 lg:ml-[45%] lg:max-w-none"
        delay={0.15}
      >
        <p className="text-right font-light">{problem.aside}</p>
      </Reveal>
    </CaseStudySection>
  );
}
