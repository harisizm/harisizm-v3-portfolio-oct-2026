import Link from "next/link";

import { Chip, DarkPanel } from "@/components/ui";
import { site } from "@/lib/site";

import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * Contact — design.md §9.1 item 7: the fork from §9.3, previewed.
 *
 * Laid out as the escalating trio from §7.5 — grey panel, dark panel, blue
 * panel. The blue one is the plain-email fallback, and it is a real `mailto:`
 * and a real `tel:` in the markup. That is the whole point: V2's only route to
 * the email address was hovering a button and reading a toast, which did not
 * exist at all on touch (lessons.md T-002, T-007).
 */
export function ContactPreview() {
  return (
    <Section id="contact">
      <Reveal className="grid gap-8 lg:grid-cols-4 lg:gap-6">
        <div className="lg:col-span-3">
          <Chip>Contact</Chip>
          <h2 className="mt-8 max-w-[22ch] text-[clamp(1.75rem,4.2vw,51px)] font-normal leading-[1.15] tracking-[-0.025em]">
            Tell me what your team is still doing by hand.
          </h2>
        </div>
        <p className="text-body text-mid-grey lg:col-start-4 lg:pl-6">
          Two routes, so neither one wastes your time. Pick the first if there is
          a project; the second if you are hiring or just looking.
        </p>
      </Reveal>

      <Reveal className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2">
        {/* Grey panel — the first step of the trio. Hand-rolled rather than a
            DarkPanel on a lighter ground, because the `↗` and the label need to
            stay ink-on-grey for contrast. */}
        <Link
          href="/contact"
          className="group relative flex min-h-[180px] flex-col justify-end bg-surface-alt p-6 transition-opacity duration-300 ease-[ease] hover:opacity-90"
        >
          <span
            aria-hidden="true"
            className="absolute right-6 top-6 font-display text-[20px] leading-none text-accent"
          >
            ↗
          </span>
          <div className="mb-auto max-w-[34ch] pr-10">
            <p className="font-display text-body font-bold leading-[1.1] text-mid-grey">
              Ø1
            </p>
            <p className="mt-4 text-lead font-light">
              Start a project. A few questions about scope, budget and timeline,
              and you get a straight answer about whether I am the right person
              for it.
            </p>
          </div>
          <span className="u-label text-accent">Start a project</span>
        </Link>

        <DarkPanel href="/contact" label="Hiring or something else">
          <p className="font-display text-body font-bold leading-[1.1] text-accent-2">
            Ø2
          </p>
          <p className="mt-4 text-lead font-light">
            Hiring, or something else entirely. The CV, the code and the
            profiles, without a form in the way.
          </p>
        </DarkPanel>
      </Reveal>

      {/* Blue panel — the plain path. No hover, no JavaScript, no form. */}
      <Reveal className="mt-6">
        <div className="bg-accent p-6 text-white lg:p-10">
          <p className="u-label">Or just email me</p>

          <p className="mt-5">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-11 items-center break-all text-[clamp(1.25rem,3vw,40px)] font-medium leading-[1.1] transition-opacity duration-300 ease-[ease] hover:opacity-80"
            >
              <span aria-hidden="true">[&nbsp;</span>
              {site.email}
              <span aria-hidden="true">&nbsp;]</span>
            </a>
          </p>

          <p className="mt-6">
            <a
              href={`tel:${site.phoneHref}`}
              className="u-label inline-flex min-h-11 items-center transition-opacity duration-300 ease-[ease] hover:opacity-80"
            >
              {site.phone}
            </a>
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
