import Image from "next/image";
import type { Evidence, Testimonial, UsageEvidence } from "@/data";
import { isTestimonial } from "@/data";
import { CaseStudySection } from "./CaseStudySection";
import { MetricList } from "./MetricList";

export interface EvidenceSectionProps {
  evidence: Evidence;
}

/**
 * Is there anything in the slot that may be shown?
 *
 * The page calls this before building the scroll-spy list, so a withheld
 * testimonial takes the whole section — and its nav entry — with it rather than
 * leaving a labelled empty block (reference defect §9.4: `No items found.`).
 */
export function hasPublishableEvidence(evidence: Evidence): boolean {
  return isTestimonial(evidence)
    ? evidence.permissionToPublish && evidence.quote.trim().length > 0
    : evidence.metrics.length > 0 || evidence.headline.trim().length > 0;
}

/** Month and year, formatted in UTC so the server's timezone cannot shift it. */
const collectedFormat = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * The closing slot — design.md §9.2, lessons.md T-003.
 *
 * Both branches of the `Evidence` union are implemented. Every project carries
 * usage evidence today and no testimonial exists; when a real quote arrives from
 * Web7Labs or Bitbash it drops into the data layer and renders here with no
 * component change (lessons.md D-014). Nothing placeholder is ever rendered: a
 * testimonial without `permissionToPublish` does not reach this component.
 */
export function EvidenceSection({ evidence }: EvidenceSectionProps) {
  if (!hasPublishableEvidence(evidence)) return null;

  return (
    <CaseStudySection id="evidence" label="Evidence">
      {isTestimonial(evidence) ? (
        <TestimonialEvidence testimonial={evidence} />
      ) : (
        <UsageEvidenceBlock usage={evidence} />
      )}
    </CaseStudySection>
  );
}

function TestimonialEvidence({ testimonial }: { testimonial: Testimonial }) {
  const avatarSrc = testimonial.avatar?.src ?? null;

  return (
    <figure>
      <blockquote className="max-w-[24ch] text-[24px] font-medium leading-[1.25] tracking-[-0.5px] md:text-[32px]">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-10 flex items-center gap-4">
        {avatarSrc !== null ? (
          <Image
            src={avatarSrc}
            alt={testimonial.avatar?.alt ?? ""}
            width={48}
            height={48}
            sizes="48px"
            className="size-12 shrink-0 object-cover"
          />
        ) : (
          <span aria-hidden="true" className="text-accent-2">
            &#9642;
          </span>
        )}
        <span>
          <span className="u-label block">{testimonial.author}</span>
          <span className="u-label mt-1 block text-mid-grey">
            {testimonial.authorRole}, {testimonial.company}
          </span>
        </span>
      </figcaption>
      <p className="u-label mt-6 text-mid-grey">
        Collected{" "}
        <time dateTime={testimonial.collectedOn}>
          {collectedFormat.format(new Date(testimonial.collectedOn))}
        </time>
      </p>
    </figure>
  );
}

function UsageEvidenceBlock({ usage }: { usage: UsageEvidence }) {
  const artifacts = (usage.artifacts ?? []).filter(
    (artifact): artifact is typeof artifact & { src: string } =>
      artifact.src !== null,
  );

  return (
    <div>
      <p className="max-w-[26ch] text-[24px] font-medium leading-[1.25] tracking-[-0.5px] md:text-[32px]">
        {usage.headline}
      </p>
      <MetricList metrics={usage.metrics} className="mt-14" />

      {artifacts.length > 0 ? (
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {artifacts.map((artifact) => (
            <div
              key={artifact.src}
              className="relative aspect-[16/10] w-full overflow-hidden bg-surface-alt"
            >
              <Image
                src={artifact.src}
                alt={artifact.alt}
                fill
                sizes="(min-width: 640px) 32vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}

      {/* Where the numbers came from, so a reader can challenge them. */}
      <p className="u-label mt-12 max-w-[60ch] text-mid-grey">
        Source: <span className="normal-case">{usage.source}</span>
      </p>
    </div>
  );
}
