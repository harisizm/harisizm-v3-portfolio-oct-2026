import { Chip } from "@/components/ui";
import type { CaseStudy } from "@/data";
import { CaseStudySection } from "./CaseStudySection";
import { hasContent } from "./content";

export interface ApproachSectionProps {
  approach: CaseStudy["approach"];
}

/**
 * Numbered steps, each one an argument rather than a description.
 *
 * `rejected` gets its own bordered block with a chip on it. It is the most
 * valuable thing on the page — the alternative considered and turned down is what
 * separates thinking from output — so it is surfaced, not folded into the body
 * copy where it reads as an aside.
 *
 * Numbers use the display face's slashed zero (design.md §4, Numerals) and are
 * hidden from assistive tech: the `<ol>` already conveys the sequence.
 */
export function ApproachSection({ approach }: ApproachSectionProps) {
  return (
    <CaseStudySection id="approach" label="The Approach">
      <p className="max-w-[62ch] text-lead font-light">{approach.intro}</p>

      <ol className="mt-12 space-y-12">
        {approach.steps.map((step, index) => (
          <li key={step.title}>
            <div className="flex items-baseline gap-3">
              <span
                aria-hidden="true"
                className="font-display text-[18px] font-bold leading-[1.1] text-accent"
              >
                &#216;{index + 1}
              </span>
              <h3 className="text-lead font-semibold">{step.title}</h3>
            </div>
            <p className="mt-3 max-w-[64ch]">{step.body}</p>

            {hasContent(step.rejected) ? (
              <div className="mt-6 border-l border-accent pl-5">
                <Chip>Rejected</Chip>
                <p className="mt-3 max-w-[60ch] text-mid-grey">{step.rejected}</p>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </CaseStudySection>
  );
}
