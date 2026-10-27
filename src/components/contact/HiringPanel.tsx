import { site } from "@/lib/site";

interface IntentLink {
  readonly heading: string;
  readonly action: string;
  readonly href: string;
  /** Hand the file over rather than navigating to it. */
  readonly download?: boolean;
}

/**
 * Option Ø2 — for people who are not commissioning anything: recruiters, hiring
 * managers, and anyone who just wants the CV.
 *
 * Rendered as rule-to-link rows (design.md §7.3) rather than with `RuleToLink`
 * itself, because the CV row needs `download` on a real anchor — routing a PDF
 * through `next/link` is the wrong mechanism for a file.
 */
const links: readonly IntentLink[] = [
  { heading: "Curriculum vitae", action: "Download PDF", href: site.cv, download: true },
  { heading: "LinkedIn", action: "Profile", href: site.social.linkedin },
  { heading: "GitHub", action: "Repositories", href: site.social.github },
  { heading: "Email", action: site.email, href: `mailto:${site.email}` },
];

export function HiringPanel() {
  return (
    <ul className="mt-10 border-t border-border">
      {links.map((link) => {
        const external = link.href.startsWith("http");

        return (
          <li key={link.heading} className="border-b border-border">
            <a
              href={link.href}
              {...(link.download ? { download: true } : {})}
              {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
              className="group flex min-h-16 flex-col justify-center gap-2 py-4 transition-opacity duration-300 ease-[ease] hover:opacity-70 sm:flex-row sm:items-center sm:gap-6"
            >
              <span className="text-title font-medium tracking-tight">{link.heading}</span>
              <span aria-hidden="true" className="hidden h-px flex-1 bg-border sm:block" />
              <span className="u-label flex shrink-0 items-center gap-2 break-all text-accent">
                {link.action}
                <span aria-hidden="true">{link.download ? "↓" : "↗"}</span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
