import { SocialLinks } from "@/components/layout";
import { Reveal, SplitLines, STAGGER } from "@/components/motion";
import { Chip } from "@/components/ui";
import { contactCopy } from "@/data";

/**
 * Page header, built to `contact-0.webp`: `[ CONTACT ]` over a two-line
 * headline at weight 300, socials with icons sitting at the column-4 edge, and
 * a full-width 1px ink rule closing the band.
 *
 * Light weight and sentence case here are deliberate (audit G1): the reference
 * sets this page's heading that way, unlike its uppercase section titles. The
 * two lines are data; the break between them is the component's.
 *
 * No grid overlay of its own: the page-level one in `app/layout.tsx` runs the
 * rules under every section (audit A3).
 *
 * Motion: each data line of the headline is its own `SplitLines`, the second
 * one beat behind the first; the socials fade up once the lines have risen.
 */
export function ContactHero() {
  const { chip, heading } = contactCopy;

  return (
    <header className="u-container pt-12 lg:pt-20">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Chip variant="bracketed">{chip}</Chip>
          {/* clamp rather than the `text-hero` token: 100px is the reference's
              size for this page and it has to survive 390px. */}
          <h1 className="mt-4 text-[clamp(2.75rem,7vw,100px)] font-light leading-[1.05] tracking-tight">
            {heading.map((line, i) => (
              <SplitLines key={line} delay={STAGGER * i}>
                {line}
              </SplitLines>
            ))}
          </h1>
        </div>
        <Reveal delay={STAGGER * 4} className="shrink-0 lg:pb-2">
          <SocialLinks
            showLabels
            className="lg:justify-end"
            linkClassName="text-ink hover:opacity-70"
          />
        </Reveal>
      </div>
      <hr className="mt-12 border-0 border-t border-ink lg:mt-16" />
    </header>
  );
}
