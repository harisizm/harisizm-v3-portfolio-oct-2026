import Link from "next/link";

import { Chip, GridOverlay, Wordmark } from "@/components/ui";
import { nav, site } from "@/lib/site";

/* ---------------------------------------------------------------------------
   Socials

   One implementation, three grounds: the footer and the bottom rail sit on
   canvas, the menu overlay sits on blue. The icons inherit `currentColor` and
   the caller supplies the colour, so none of them carries a copy of these paths
   — lessons.md T-005. It lives in this file rather than its own because the
   footer is the canonical place the full list is shown.
--------------------------------------------------------------------------- */

/** Brand marks, drawn at 24×24 and scaled by font-size at the call site. */
const ICONS = {
  github:
    "M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.5v-1.77c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.42.36.79 1.07.79 2.15v3.19c0 .25.21.62.8.5A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z",
  linkedin:
    "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .78 0 1.75v20.5C0 23.22.79 24 1.78 24h20.44c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z",
} as const;

/** Derived from `site.social`, so adding a network is a one-line data change. */
const SOCIALS = [
  { label: "GitHub", href: site.social.github, path: ICONS.github },
  { label: "LinkedIn", href: site.social.linkedin, path: ICONS.linkedin },
] as const;

export interface SocialLinksProps {
  /** Show the network name beside the icon. Off in the tight bottom rail. */
  showLabels?: boolean;
  /** Layout only — the container sets no `align-items`, so callers may. */
  className?: string;
  /** Colour and state for each link. */
  linkClassName?: string;
}

export function SocialLinks({
  showLabels = false,
  className = "",
  linkClassName = "",
}: SocialLinksProps) {
  return (
    <ul className={`flex flex-wrap gap-x-4 gap-y-2 ${className}`}>
      {SOCIALS.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer noopener"
            /* The icon is not the label: an icon-only link needs a real
               accessible name, never a hover tooltip. design.md §11. */
            aria-label={showLabels ? undefined : social.label}
            className={`u-label inline-flex min-h-11 min-w-11 items-center justify-center gap-2 transition-opacity duration-300 ease-[ease] ${linkClassName}`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 shrink-0"
            >
              <path d={social.path} />
            </svg>
            {showLabels ? <span>{social.label}</span> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------------------------------------------------
   Footer
--------------------------------------------------------------------------- */

const linkSkin =
  "u-label inline-flex min-h-11 items-center transition-opacity duration-300 ease-[ease] hover:opacity-70";

/**
 * Footer — design.md §9.1 item 8.
 *
 * Giant `harisizm` wordmark, quick links as a comma-separated inline list, the
 * email in brackets, the phone, socials, and a copyright year that is computed.
 * V2 hardcoded the year; it was wrong within twelve months.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32">
      <GridOverlay />

      <div className="u-container">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-t border-border py-12 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Footer" className="sm:col-span-2">
            <Chip>Menu</Chip>
            {/* Comma-separated inline list. The separator is decorative, so it
                stays out of each link's accessible name. */}
            <ul className="mt-3 flex flex-wrap items-center gap-x-1">
              {nav.map((item, index) => (
                <li key={item.href} className="inline-flex items-center">
                  <Link href={item.href} className={linkSkin}>
                    {item.label}
                  </Link>
                  {index < nav.length - 1 ? (
                    <span aria-hidden="true" className="u-label text-mid-grey">
                      ,
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <Chip>Contact</Chip>
            <p className="mt-3">
              <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center transition-opacity duration-300 ease-[ease] hover:opacity-70">
                <Chip variant="bracketed">{site.email}</Chip>
              </a>
            </p>
            <p>
              <a href={`tel:${site.phoneHref}`} className={linkSkin}>
                {site.phone}
              </a>
            </p>
          </div>

          <div>
            <Chip>Socials</Chip>
            <SocialLinks
              showLabels
              className="mt-3 flex-col"
              linkClassName="justify-start hover:opacity-70"
            />
          </div>
        </div>

        {/* Sized to span the gutters exactly, from the font's own metrics
            rather than by eye: Departure Mono is monospace at 350/550 = 0.6364em
            per character, so eight characters occupy 5.09 × the font size, and
            (100vw - 2 × 16px gutter) / 5.09 = 19.6vw - 6.3px. The negative
            tracking leaves a little slack. `overflow-hidden` is the guarantee,
            not the intent: at no width can this push the page sideways. */}
        <div className="overflow-hidden pt-6">
          <Wordmark className="text-[clamp(2.5rem,19.6vw_-_6.3px,24rem)] leading-none tracking-[-0.01em]" />
        </div>

        <p className="u-label border-t border-border py-6 text-mid-grey">
          © {year} {site.fullName} · {site.location}
        </p>
      </div>
    </footer>
  );
}
