import type { Metadata } from "next";
import { ContactHero, ContactIntro, ProjectEnquiryForm } from "@/components/contact";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project, or get the CV. The email address and phone number are on the " +
    "page, so no form is required and no JavaScript is required.",
  alternates: { canonical: "/contact" },
};

/**
 * Contact, the fork (design.md §9.3), laid out to `contact-0.webp`: the hero
 * and its rule, then a two-column body. Column 1 carries the intro, the plain
 * `mailto:` and `tel:` that are never gated behind anything, and the hiring
 * shortcut. Columns 3 to 4 carry the form immediately. Order of persuasion is
 * the reference's (audit G2): the ask comes first, the shortcut second.
 *
 * A Server Component; only the form itself is client-side.
 *
 * Motion: the intro column is a `Reveal`; the form column choreographs itself
 * (a `Stagger` of its groups), so it is not wrapped a second time here.
 */
export default function ContactPage() {
  return (
    <main>
      <ContactHero />

      <section
        aria-labelledby="option-start"
        className="u-container pb-20 pt-16 lg:pb-32 lg:pt-20"
      >
        <h2 id="option-start" className="u-sr-only">
          Start a project
        </h2>
        <div className="grid gap-16 lg:grid-cols-4 lg:gap-6">
          <Reveal className="lg:col-span-2 lg:pr-6">
            <ContactIntro />
          </Reveal>
          <div className="lg:col-span-2 lg:col-start-3 lg:pl-6">
            <ProjectEnquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}
