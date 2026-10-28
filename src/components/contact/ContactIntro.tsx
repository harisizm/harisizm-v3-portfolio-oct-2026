import { contactCopy } from "@/data";
import { site } from "@/lib/site";

import { HiringPanel } from "./HiringPanel";

const directLink =
  "u-label inline-flex min-h-11 items-center break-all text-accent transition-opacity duration-300 ease-[ease] hover:opacity-70";

/**
 * Column 1 of the contact body (`contact-0.webp`): the intro paragraph, then
 * lower down the `Or just email me:` line with the `mailto:` and `tel:`, then
 * the hiring shortcut.
 *
 * The email and phone are the fallback that is never behind anything. V2
 * shipped no `mailto:` anywhere on the site and its only contact CTA had no
 * handler at all (lessons.md T-002, T-007). Both links here are plain anchors
 * in the server HTML, so they work with scripts disabled and on a touch device
 * that has no hover state to reveal them.
 */
export function ContactIntro() {
  const { intro, direct, booking } = contactCopy;

  return (
    <div className="flex flex-col gap-16 lg:gap-24">
      <p className="max-w-[40ch] text-body font-light text-ink">{intro}</p>

      <div>
        <p className="text-label-sm text-mid-grey">{direct}</p>
        <p className="mt-1 flex flex-col items-start">
          <a href={`mailto:${site.email}`} className={directLink}>
            {site.email}
          </a>
          <a href={`tel:${site.phoneHref}`} className={directLink}>
            {site.phone}
          </a>
        </p>

        {/* A booking control renders only when there is a booking link to
            render. `site.booking` is null today, so nothing appears here: no
            disabled button, no placeholder (lessons.md T-002). */}
        {site.booking ? (
          <a
            href={site.booking}
            target="_blank"
            rel="noreferrer noopener"
            className={`${directLink} mt-6 gap-2`}
          >
            {booking}
            <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>

      <HiringPanel />
    </div>
  );
}
