import { contactCopy } from "@/data";
import { site } from "@/lib/site";

interface IntentLink {
  readonly heading: string;
  readonly action: string;
  readonly href: string;
  /** Hand the file over rather than navigating to it. */
  readonly download?: boolean;
}

/**
 * Option 02, for people who are not commissioning anything: recruiters, hiring
 * managers, and anyone who just wants the CV. A compact panel under the intro
 * in column 1, body face throughout, every link real.
 *
 * Rendered as rule-to-link rows (design.md §7.3) rather than with `RuleToLink`
 * itself, because the CV row needs `download` on a real anchor and routing a
 * PDF through `next/link` is the wrong mechanism for a file.
 */
export function HiringPanel() {
  const { hiring } = contactCopy;

  const links: readonly IntentLink[] = [
    { heading: hiring.cv.heading, action: hiring.cv.action, href: site.cv, download: true },
    { heading: hiring.linkedin.heading, action: hiring.linkedin.action, href: site.social.linkedin },
    { heading: hiring.github.heading, action: hiring.github.action, href: site.social.github },
    { heading: hiring.email.heading, action: site.email, href: `mailto:${site.email}` },
  ];

  return (
    <section aria-labelledby="option-hiring">
      <h2 id="option-hiring" className="text-[24px] font-medium leading-[1.2]">
        {hiring.num} | {hiring.title}
      </h2>
      <p className="mt-4 max-w-[40ch] text-body font-light text-mid-grey">{hiring.blurb}</p>

      <ul className="mt-6 border-t border-border">
        {links.map((link) => {
          const external = link.href.startsWith("http");

          return (
            <li key={link.heading} className="border-b border-border">
              <a
                href={link.href}
                {...(link.download ? { download: true } : {})}
                {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                className="group flex min-h-14 flex-col justify-center gap-1 py-3 transition-opacity duration-300 ease-[ease] hover:opacity-70 sm:flex-row sm:items-center sm:gap-6"
              >
                <span className="text-body text-ink">{link.heading}</span>
                <span aria-hidden="true" className="hidden h-px flex-1 bg-border sm:block" />
                <span className="u-label-sm flex shrink-0 items-center gap-2 break-all text-accent">
                  {link.action}
                  <span aria-hidden="true">{link.download ? "↓" : "↗"}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
