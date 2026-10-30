import { DiagramFigure } from "@/components/diagrams";
import { Reveal, STAGGER, Stagger } from "@/components/motion";
import type { CaseStudy } from "@/data";
import { CaseStudySection } from "./CaseStudySection";

export interface BuiltSectionProps {
  built: CaseStudy["built"];
}

/**
 * How it was built (lessons.md D-019): three mechanisms, and no more than
 * three. Each is a numbered title, two sentences, and its drawing. The
 * drawing carries the explanation; the sentences say what it means for the
 * person using the product.
 *
 * Numbers are the display face's slashed zero in `--accent`, hidden from
 * assistive tech because the `<ol>` already conveys the sequence.
 *
 * Motion (lessons.md D-017): one `Stagger`, each mechanism stating its own
 * delay. The list is tall, so the trigger fires on a tenth of it.
 */
export function BuiltSection({ built }: BuiltSectionProps) {
  return (
    <CaseStudySection id="built" label="How It Was Built">
      <Reveal>
        <p className="font-light">{built.intro}</p>
      </Reveal>

      <Stagger className="mt-12" amount={0.1}>
        <ol className="space-y-16">
          {built.mechanisms.map((mechanism, index) => (
            <Reveal key={mechanism.title} as="li" delay={index * STAGGER}>
              <div className="flex items-baseline gap-3">
                <span aria-hidden="true" className="u-pixel-num text-accent">
                  &#216;{index + 1}
                </span>
                <h3 className="text-lead font-semibold">{mechanism.title}</h3>
              </div>
              <p className="mt-3">{mechanism.body}</p>
              <DiagramFigure
                className="mt-8"
                spec={mechanism.diagram}
                caption={mechanism.caption}
                alt={`Drawing: ${mechanism.title}. ${mechanism.caption}`}
              />
            </Reveal>
          ))}
        </ol>
      </Stagger>
    </CaseStudySection>
  );
}
