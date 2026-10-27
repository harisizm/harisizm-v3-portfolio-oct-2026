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
import { DarkPanel, RuleToLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Haris — full-stack software engineer in Lahore, core engineer on Tourgenz, " +
    "a tourism and booking marketplace live in production since September 2026.",
  alternates: { canonical: "/about" },
};

/**
 * About — design.md §9. Ordered so the shipped work carries the page and the
 * degree reads as context underneath it (lessons.md T-004).
 *
 * A Server Component throughout: nothing here is interactive beyond links.
 */
export default function AboutPage() {
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
        <div className="mx-auto w-full max-w-[1408px]">
          <RuleToLink
            heading="The work this all came out of"
            href="/work"
            label="All projects"
            headingClassName="text-title font-medium tracking-tight sm:text-heading"
          />
          <DarkPanel href="/contact" label="Start a project" className="mt-12 lg:w-1/2">
            <p className="text-title font-medium tracking-tight">
              Got a process that only works because someone remembers to run it?
            </p>
          </DarkPanel>
        </div>
      </section>
    </main>
  );
}
