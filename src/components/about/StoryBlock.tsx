import { about, type Span } from "@/data";

/**
 * The first-person story. Emphasis arrives as typed spans from the data layer,
 * so the pull-phrases are content rather than markup and no paragraph needs
 * `dangerouslySetInnerHTML`.
 *
 * Heading in columns 1 to 2, paragraphs in columns 3 to 4, as the reference
 * sets its story block.
 */
function renderSpan(span: Span, key: number) {
  if (typeof span === "string") return span;
  if (span.emphasis === "strong") return <strong key={key} className="font-semibold">{span.text}</strong>;
  return <em key={key}>{span.text}</em>;
}

export function StoryBlock() {
  const { heading, paragraphs } = about.story;

  return (
    <section className="u-container py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-4 lg:gap-6">
        <h2 className="max-w-[20ch] text-title font-medium uppercase tracking-tight sm:text-heading lg:col-span-2">
          {heading}
        </h2>
        <div className="max-w-[62ch] space-y-6 lg:col-span-2 lg:pl-6">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.id} className="text-body font-light text-ink">
              {paragraph.spans.map(renderSpan)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
