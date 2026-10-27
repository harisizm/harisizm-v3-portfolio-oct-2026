"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

import { GridOverlay } from "@/components/ui";
import { useReducedMotion } from "@/hooks";
import { nav, site } from "@/lib/site";

import { SocialLinks } from "./Footer";

/** Everything the browser puts in the tab order inside the overlay. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface MenuOverlayProps {
  /** Matches the trigger's `aria-controls`. */
  id: string;
  /**
   * The header bar, which stays painted above this overlay — the wordmark and
   * the `✕ MENU` trigger. Its controls join the focus cycle, because anything
   * visible above an open dialog has to be reachable from the keyboard too.
   */
  chromeRef: RefObject<HTMLElement | null>;
  /** Escape or the trigger — closes and restores focus to the trigger. */
  onDismiss: () => void;
  /** A nav item was followed: close, but leave focus to the incoming route. */
  onNavigate: () => void;
}

/** The marked item's box, in the nav frame's coordinates. */
interface Reticle {
  x: number;
  y: number;
  width: number;
  height: number;
}

function isCurrent(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  // `/work/some-slug` keeps WORK lit while a case study is open.
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * The menu — design.md §8.
 *
 * Full-viewport blue overlay with the dotted column rules still visible through
 * it. Mounted only while open, by `Header`, which owns the open state: that ties
 * every effect here — scroll lock, focus trap, Escape — to the component's own
 * lifetime rather than to a flag, so none of them can leak.
 *
 * The four behaviours the reference site misses (focus trap, Escape, focus
 * restored, `aria-expanded`) are all here or on the trigger.
 */
export function MenuOverlay({
  id,
  chromeRef,
  onDismiss,
  onNavigate,
}: MenuOverlayProps) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  const currentIndex = nav.findIndex((item) => isCurrent(pathname, item.href));
  /* Where the reticle rests when nothing is hovered: on the current page, as on
     the reference. An unrecognised route falls back to the first item. */
  const restIndex = currentIndex === -1 ? 0 : currentIndex;

  const panelRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const [marked, setMarked] = useState(restIndex);
  const [reticle, setReticle] = useState<Reticle | null>(null);

  /* --- Body scroll lock ------------------------------------------------- */
  useEffect(() => {
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    // Stand in for the scrollbar's width so the header does not jump sideways.
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, []);

  /* --- Initial focus ---------------------------------------------------- */
  useEffect(() => {
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
  }, []);

  /* --- Escape, and the focus trap --------------------------------------- */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onDismiss();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (panel === null) return;

      /* The header bar comes first, because it sits ahead of the overlay in the
         DOM — and the trigger is also the close button, so it has to be in the
         cycle or there is no way out by keyboard. */
      const chrome = chromeRef.current;
      const cycle: HTMLElement[] = [
        ...(chrome === null
          ? []
          : Array.from(chrome.querySelectorAll<HTMLElement>(FOCUSABLE))),
        ...Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)),
      ];
      if (cycle.length === 0) return;

      const first = cycle[0];
      const last = cycle[cycle.length - 1];
      const active = document.activeElement;
      const inside = active instanceof HTMLElement && cycle.includes(active);

      // Wrap at both ends, and reel focus back in if it escaped altogether.
      const atEdge = event.shiftKey ? active === first : active === last;
      if (atEdge || !inside) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [chromeRef, onDismiss]);

  /* --- The crop-mark reticle -------------------------------------------- */
  /* FLIP reduced to its useful half: measure the marked item's box with
     `getBoundingClientRect`, then drive ONE element to it with a transform.
     Four marks fading in and out would read as four elements; this reads as a
     viewfinder tracking down the list. Measured in a layout effect, so the box
     is already right at first paint and no measuring happens during render. */
  useLayoutEffect(() => {
    let cancelled = false;

    const measure = () => {
      const frame = frameRef.current;
      const item = itemRefs.current[marked];
      if (cancelled || frame === null || item === null || item === undefined) {
        return;
      }

      const frameBox = frame.getBoundingClientRect();
      const itemBox = item.getBoundingClientRect();
      setReticle({
        x: itemBox.left - frameBox.left,
        y: itemBox.top - frameBox.top,
        width: itemBox.width,
        height: itemBox.height,
      });
    };

    measure();
    /* The display face is `font-display: swap`, so the first measurement can be
       of fallback metrics at a different width. Re-measure when it lands. */
    void document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", measure);
    };
  }, [marked]);

  const itemSkin =
    "inline-flex items-start gap-3 font-display text-[clamp(2.75rem,11vw,var(--text-nav))] font-bold uppercase leading-none text-white transition-opacity duration-300 ease-[ease] focus-visible:outline-accent-2";

  const contactSkin =
    "u-label mt-3 inline-flex min-h-11 items-center text-white opacity-75 transition-opacity duration-300 ease-[ease] hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-accent-2";

  return (
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-40 overflow-y-auto bg-accent"
    >
      {/* The rules sit above the blue, not behind it — design.md §8. */}
      <GridOverlay position="fixed" layer="front" />

      <div
        ref={panelRef}
        className="u-container relative z-20 grid min-h-full grid-cols-1 content-center gap-x-8 gap-y-16 pb-16 pt-24 lg:grid-cols-4"
      >
        {/* Right-aligned to the column-3 edge on wide viewports. Below `lg` the
            nav takes the full width: at this size nothing fits beside it. */}
        <div ref={frameRef} className="relative lg:col-span-3">
          {reticle === null ? null : (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0"
              style={{
                transform: `translate3d(${reticle.x}px, ${reticle.y}px, 0)`,
                width: `${reticle.width}px`,
                height: `${reticle.height}px`,
                /* Reduced motion snaps. It does not animate faster — it does
                   not move at all. design.md §6. */
                transition: reduced
                  ? "none"
                  : "transform .3s ease, width .3s ease, height .3s ease",
              }}
            >
              <span className="absolute -left-2 -top-2 size-4 border-l-2 border-t-2 border-accent-2" />
              <span className="absolute -right-2 -top-2 size-4 border-r-2 border-t-2 border-accent-2" />
              <span className="absolute -bottom-2 -left-2 size-4 border-b-2 border-l-2 border-accent-2" />
              <span className="absolute -bottom-2 -right-2 size-4 border-b-2 border-r-2 border-accent-2" />
            </span>
          )}

          <ul
            className="flex flex-col items-end gap-4 sm:gap-6"
            onPointerLeave={() => setMarked(restIndex)}
          >
            {nav.map((item, index) => {
              const active = index === currentIndex;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    ref={(node) => {
                      itemRefs.current[index] = node;
                    }}
                    aria-current={active ? "page" : undefined}
                    onPointerEnter={() => setMarked(index)}
                    onFocus={() => setMarked(index)}
                    onClick={onNavigate}
                    className={`${itemSkin} ${
                      active
                        ? "opacity-100"
                        : "opacity-50 hover:opacity-75 focus-visible:opacity-75"
                    }`}
                  >
                    <span>{item.label}</span>
                    {/* A fixed-width slot, so the labels right-align and the
                        numbers still form a column of their own. */}
                    <span className="w-9 shrink-0 text-left font-display text-[1.125rem] font-bold leading-none text-accent-2">
                      {item.num}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-1">
          <div>
            <p className="u-label text-accent-2">Socials</p>
            <SocialLinks
              showLabels
              className="mt-3 flex-col"
              linkClassName="justify-start text-white opacity-75 hover:opacity-100 focus-visible:outline-accent-2"
            />
          </div>

          <div>
            <p className="u-label text-accent-2">E-mail</p>
            {/* Not `Chip variant="bracketed"`: that variant is blue on canvas by
                design, and would disappear on this ground. */}
            <a href={`mailto:${site.email}`} className={contactSkin}>
              <span aria-hidden="true">[&nbsp;</span>
              {site.email}
              <span aria-hidden="true">&nbsp;]</span>
            </a>
          </div>

          <div>
            <p className="u-label text-accent-2">Phone</p>
            <a href={`tel:${site.phoneHref}`} className={contactSkin}>
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
