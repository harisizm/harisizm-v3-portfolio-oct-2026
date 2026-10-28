import { Reveal, STAGGER, Stagger } from "@/components/motion";
import { Chip } from "@/components/ui";
import type { CaseStudy } from "@/data";
import { CaseStudySection } from "./CaseStudySection";
import { hasContent } from "./content";

export interface ApproachSectionProps {
  approach: CaseStudy["approach"];
}

/**
 * Numbered steps, each one an argument rather than a description. Step names
 * are the body face at 20px semibold, the reference's "1. Information That
 * Builds Confidence" (cs-5600); the number is the display face's slashed zero
 * in `--accent`.
 *
 * `rejected` gets its own bordered block with a chip on it. It is the most
 * valuable thing on the page — the alternative considered and turned down is what
 * separates thinking from output — so it is surfaced, not folded into the body
 * copy where it reads as an aside.
 *
 * Numbers are hidden from assistive tech: the `<ol>` already conveys the
 * sequence.
 *
 * Motion (lessons.md D-017): the steps are one `Stagger`, each step stating
 * its own delay, and each REJECTED block lands `REJECTED_LAG` after its step
 * so the argument reads before the thing it argued against. The list is tall,
 * so the trigger fires on a tenth of it rather than the default fifth.
 */
const REJECTED_LAG = 0.15;

export function ApproachSection({ approach }: ApproachSectionProps) {
  return (
    <CaseStudySection id="approach" label="The Approach">
      <Reveal>
        <p className="font-light">{approach.intro}</p>
      </Reveal>

      <Stagger className="mt-12" amount={0.1}>
        <ol className="space-y-12">
          {approach.steps.map((step, index) => (
            <Reveal key={step.title} as="li" delay={index * STAGGER}>
              <div className="flex items-baseline gap-3">
                <span aria-hidden="true" className="u-pixel-num text-accent">
                  &#216;{index + 1}
                </span>
                <h3 className="text-lead font-semibold">{step.title}</h3>
              </div>
              <p className="mt-3">{step.body}</p>

              {hasContent(step.rejected) ? (
                <Reveal
                  className="mt-6 border-l border-accent pl-5"
                  delay={index * STAGGER + REJECTED_LAG}
                >
                  <Chip>Rejected</Chip>
                  <p className="mt-3 font-light text-mid-grey">{step.rejected}</p>
                </Reveal>
              ) : null}
            </Reveal>
          ))}
        </ol>
      </Stagger>
    </CaseStudySection>
  );
}
