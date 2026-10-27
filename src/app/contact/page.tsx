import type { Metadata } from "next";
import {
  ContactHero,
  DirectLines,
  HiringPanel,
  OptionHeader,
  ProjectEnquiryForm,
} from "@/components/contact";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project, or get the CV. Email and phone are on the page — no form " +
    "required, no JavaScript required.",
  alternates: { canonical: "/contact" },
};

/**
 * Contact — the fork (design.md §9.3).
 *
 * Routed by reader intent rather than by one form that tries to serve both: a
 * client who is ready to start answers the qualifying questions, and anybody
 * else takes the direct links. The plain `mailto:` and phone number sit above
 * both branches and are never gated behind either.
 *
 * A Server Component — only the form itself is client-side.
 */
export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <DirectLines />

      <section aria-labelledby="option-start" className="u-container py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1408px]">
          <OptionHeader
            num="Ø1"
            title="Start a project"
            blurb="Four questions about the work, three about you. Budget and timeline are in there deliberately — they decide what is actually possible, and asking them last wastes your afternoon and mine."
            headingId="option-start"
          />

          {/* A booking control renders only when there is a booking link to
              render. `site.booking` is null today, so nothing appears here —
              no disabled button, no placeholder (lessons.md T-002). */}
          {site.booking ? (
            <a
              href={site.booking}
              target="_blank"
              rel="noreferrer noopener"
              className="u-label mt-8 inline-flex min-h-11 items-center gap-2 text-accent underline decoration-accent underline-offset-4 transition-opacity duration-300 ease-[ease] hover:opacity-70"
            >
              Prefer to talk it through first? Book a call
              <span aria-hidden="true">↗</span>
            </a>
          ) : null}

          <ProjectEnquiryForm />
        </div>
      </section>

      <section
        aria-labelledby="option-hiring"
        className="u-container border-t border-border py-16 lg:py-24"
      >
        <div className="mx-auto w-full max-w-[1408px]">
          <OptionHeader
            num="Ø2"
            title="Hiring, or something else"
            blurb="Not commissioning a build? Take the shortcut. The CV is the October 2026 export; the rest are direct lines, no form in between."
            headingId="option-hiring"
          />
          <HiringPanel />
        </div>
      </section>
    </main>
  );
}
