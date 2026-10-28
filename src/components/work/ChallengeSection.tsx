import { Reveal, STAGGER, Stagger } from "@/components/motion";
import type { CaseStudy } from "@/data";
import { CaseStudySection } from "./CaseStudySection";
import { hasContent } from "./content";

export interface ChallengeSectionProps {
  challenge: CaseStudy["challenge"];
}

/**
 * Prose intro, `Core Problems:` as a tight list, then the breaking point.
 *
 * `breakingPoint` is the `TODO` sentinel on five of the six projects. It renders
 * nothing at all rather than printing the placeholder — a visible gap beats a
 * visible "TODO", and both beat an invented specific (lessons.md T-003).
 *
 * Motion (lessons.md D-017): intro and breaking point reveal on their own; the
 * label and the problems share one `Stagger`, each item stating its own step.
 */
export function ChallengeSection({ challenge }: ChallengeSectionProps) {
  return (
    <CaseStudySection id="challenge" label="The Challenge">
      <Reveal>
        <p className="font-light">{challenge.intro}</p>
      </Reveal>

      <Stagger className="mt-12">
        <Reveal>
          <p className="u-label text-accent">Core Problems:</p>
        </Reveal>
        <ul className="mt-4 space-y-3">
          {challenge.problems.map((problem, index) => (
            <Reveal
              key={problem}
              as="li"
              className="flex gap-3"
              delay={(index + 1) * STAGGER}
            >
              <span aria-hidden="true" className="mt-[0.45em] text-accent">
                &#9642;
              </span>
              <span>{problem}</span>
            </Reveal>
          ))}
        </ul>
      </Stagger>

      {hasContent(challenge.breakingPoint) ? (
        <Reveal className="mt-12">
          <p className="border-l-2 border-accent pl-5 text-lead">
            {challenge.breakingPoint}
          </p>
        </Reveal>
      ) : null}
    </CaseStudySection>
  );
}
