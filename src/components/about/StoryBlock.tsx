import { story, storyHeading, type Span } from "./content";

/**
 * The first-person story. Emphasis arrives as typed spans from the content
 * module, so the pull-phrases are content rather than markup and no paragraph
 * needs `dangerouslySetInnerHTML`.
 */
function renderSpan(span: Span, key: number) {
  if (typeof span === "string") return span;
  if (span.emphasis === "strong") return <strong key={key} className="font-semibold">{span.text}</strong>;
  return <em key={key}>{span.text}</em>;
}

export function StoryBlock() {
  return (
    <section className="u-container border-t border-border py-16 lg:py-24">
      <div className="mx-auto grid w-full max-w-[1408px] gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <h2 className="max-w-[20ch] text-title font-medium tracking-tight sm:text-heading">
          {storyHeading}
        </h2>
        <div className="max-w-[62ch] space-y-6">
          {story.map((paragraph) => (
            <p key={paragraph.id} className="text-body text-ink">
              {paragraph.spans.map(renderSpan)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
