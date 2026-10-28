import { Chip } from "@/components/ui";
import { site } from "@/lib/site";

import { SocialLinks } from "./Footer";

export interface BottomRailProps {
  /**
   * Id of the section the scroll cue jumps to. Omit it and the cue renders as
   * plain text instead of a link — a label that leads nowhere is not a control,
   * but a control that leads nowhere is the V2 defect in lessons.md T-002.
   */
  scrollTo?: string;
  className?: string;
}

/**
 * Persistent bottom rail — design.md §7.7.
 *
 * Anchored to the bottom of the hero — socials left, `↓ SCROLL DOWN` centre,
 * email right — so it scrolls away with it. It is NOT fixed to the viewport:
 * a fixed rail sits over whatever happens to be at the bottom of the screen at
 * every scroll position, which overlapped the hero CTA on the first render.
 * Mount it inside a `relative` section; the hero reserves the space.
 *
 * Every item is the body face uppercase (`.u-label`) — the reference's rail
 * is `INSTAGRAM, LINKEDIN,` / `↓ SCROLL DOWN` / the email, none of it pixel
 * (audit A1).
 *
 * The email is a plain `mailto:` anchor. The whole contact path works with no
 * hover and no JavaScript — the single thing V2 got most wrong (T-007).
 *
 * The bar itself is `pointer-events-none` and each item re-enables them, so the
 * empty space between the three never swallows a click meant for the page.
 */
export function BottomRail({ scrollTo, className = "" }: BottomRailProps) {
  const cue = (
    <>
      <span aria-hidden="true">↓</span> Scroll down
    </>
  );

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-30 u-container pb-3 ${className}`}
    >
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
        <SocialLinks
          variant="inline"
          className="pointer-events-auto bg-canvas"
          linkClassName="hover:opacity-70"
        />

        {/* Decorative on a phone, where the rail has no room for three items. */}
        {scrollTo === undefined ? (
          <p className="u-label pointer-events-auto hidden bg-canvas px-2 py-1 text-accent sm:block">
            {cue}
          </p>
        ) : (
          <a
            href={`#${scrollTo}`}
            className="u-label pointer-events-auto hidden min-h-11 items-center gap-1 bg-canvas px-2 text-accent transition-opacity duration-300 ease-[ease] hover:opacity-70 sm:inline-flex"
          >
            {cue}
          </a>
        )}

        <a
          href={`mailto:${site.email}`}
          className="pointer-events-auto inline-flex min-h-11 items-center bg-canvas transition-opacity duration-300 ease-[ease] hover:opacity-70"
        >
          <Chip variant="bracketed">{site.email}</Chip>
        </a>
      </div>
    </div>
  );
}
