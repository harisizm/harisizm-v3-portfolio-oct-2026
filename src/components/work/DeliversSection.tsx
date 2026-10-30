import { DiagramFigure } from "@/components/diagrams";
import { Reveal, STAGGER, Stagger } from "@/components/motion";
import { Icon } from "@/components/ui";
import type { CaseStudy } from "@/data";
import { CaseStudySection } from "./CaseStudySection";

export interface DeliversSectionProps {
  delivers: CaseStudy["delivers"];
}

/**
 * What the user gets (lessons.md D-019): one line of intro, the feature map
 * drawn as a hub around the product, then one short block per feature.
 *
 * The map and the list carry the same names in the same order, so a reader
 * can look from the drawing to the line that explains it. The list is two
 * columns from `sm`, each item a title at lead size and one sentence under
 * it; nothing here runs longer than that on purpose.
 *
 * Motion (lessons.md D-017): intro, then the figure, then the features as
 * one `Stagger`.
 */
export function DeliversSection({ delivers }: DeliversSectionProps) {
  const spokes = delivers.features.map((feature) => feature.title);

  return (
    <CaseStudySection id="delivers" label="What You Get">
      <Reveal>
        <p className="font-light">{delivers.intro}</p>
      </Reveal>

      <Reveal className="mt-10" delay={0.1}>
        <DiagramFigure
          spec={{ kind: "hub", centre: delivers.centre, spokes }}
          caption={`${delivers.centre}, and the ${delivers.features.length} things it gives the people who use it.`}
          alt={`${delivers.centre} at the centre, with ${spokes.join(", ")} around it.`}
        />
      </Reveal>

      <Stagger className="mt-12" amount={0.1}>
        <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {delivers.features.map((feature, index) => (
            <Reveal
              key={feature.title}
              as="li"
              className="border-t border-border pt-4"
              delay={index * STAGGER}
            >
              <Icon name={feature.icon} size={1.5} className="text-accent" />
              <h3 className="mt-3 text-lead font-semibold">{feature.title}</h3>
              <p className="mt-2 font-light">{feature.body}</p>
            </Reveal>
          ))}
        </ul>
      </Stagger>
    </CaseStudySection>
  );
}
