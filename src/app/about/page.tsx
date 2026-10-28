import type { Metadata } from "next";
import {
  AboutHero,
  ApproachCards,
  CapabilityGrid,
  Credentials,
  ExperienceTimeline,
  StatRow,
  StoryBlock,
} from "@/components/about";
import { Reveal } from "@/components/motion";
import { DarkPanel, RuleToLink } from "@/components/ui";
import { about } from "@/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Haris is a full-stack software engineer in Lahore and a core engineer on Tourgenz, " +
    "a tourism and booking marketplace live in production since September 2026.",
  alternates: { canonical: "/about" },
};

/**
 * About (design.md §9). Ordered so the shipped work carries the page and the
 * degree reads as context underneath it (lessons.md T-004).
 *
 * A Server Component throughout: nothing here is interactive beyond links. The
 * column rules come from the page-level overlay in `app/layout.tsx`.
 */
export default function AboutPage() {
  const { ruleHeading, ruleLabel, panelBody, panelLabel } = about.closing;

  return (
    <main>
      <AboutHero />
      <ApproachCards />
      <StoryBlock />
      <StatRow />
      <ExperienceTimeline />
      <CapabilityGrid />
      <Credentials />

      <section className="u-container border-t border-border py-16 lg:py-24">
        <Reveal>
          <RuleToLink
            heading={ruleHeading}
            href="/work"
            label={ruleLabel}
            headingClassName="text-title font-medium uppercase tracking-tight sm:text-heading"
          />
        </Reveal>
        <Reveal>
          <DarkPanel href="/contact" label={panelLabel} className="mt-12 lg:w-1/2">
            <p className="text-title font-medium tracking-tight">{panelBody}</p>
          </DarkPanel>
        </Reveal>
      </section>
    </main>
  );
}
