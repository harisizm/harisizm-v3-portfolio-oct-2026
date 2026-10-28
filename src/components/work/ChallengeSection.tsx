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
 */
export function ChallengeSection({ challenge }: ChallengeSectionProps) {
  return (
    <CaseStudySection id="challenge" label="The Challenge">
      <p className="font-light">{challenge.intro}</p>

      <p className="u-label mt-12 text-accent">Core Problems:</p>
      <ul className="mt-4 space-y-3">
        {challenge.problems.map((problem) => (
          <li key={problem} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.45em] text-accent">
              &#9642;
            </span>
            <span>{problem}</span>
          </li>
        ))}
      </ul>

      {hasContent(challenge.breakingPoint) ? (
        <p className="mt-12 border-l-2 border-accent pl-5 text-lead">
          {challenge.breakingPoint}
        </p>
      ) : null}
    </CaseStudySection>
  );
}
