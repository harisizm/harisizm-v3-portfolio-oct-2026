import { Reveal, SplitLines, STAGGER } from "@/components/motion";
import { Chip } from "@/components/ui";
import { about } from "@/data";

/**
 * Page header: `[ ABOUT ]` bracket label over the heading, with the lead
 * paragraph set against it rather than under it so the eye lands on the
 * headline first (design.md §9). The heading is uppercase (audit A6): at this
 * size sentence case reads as a paragraph, uppercase reads as a title.
 *
 * No grid overlay of its own: the page-level one in `app/layout.tsx` runs the
 * rules under every section (audit A3).
 *
 * Motion: the heading is a `SplitLines`, the lead a `Reveal` timed to follow
 * its last line, the same entrance the home hero makes.
 */
export function AboutHero() {
  const { chip, heading, lead } = about.hero;

  return (
    <header className="u-container pb-16 pt-12 lg:pb-24 lg:pt-20">
      <Chip variant="bracketed">{chip}</Chip>
      <SplitLines
        as="h1"
        className="mt-6 max-w-[24ch] text-balance text-title font-medium uppercase tracking-tight sm:text-heading lg:text-statement"
      >
        {heading}
      </SplitLines>
      <Reveal delay={STAGGER * 4} className="mt-8 max-w-[52ch] lg:ml-auto">
        <p className="text-lead font-light text-ink lg:text-right">{lead}</p>
      </Reveal>
    </header>
  );
}
