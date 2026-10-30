"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useIsPresent } from "motion/react";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type RefObject,
} from "react";

import { EASE, STAGGER } from "@/components/motion";
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

/* Crop marks, measured on the reference (audit C1): 12px arms, 2px stroke,
   sitting 24px OUTSIDE the item box. The old 16px arms at an 8px inset nearly
   joined into a rectangle. `-inset-6` = 24px, `size-3` = 12px. */
const MARKS = [
  "-left-6 -top-6 border-l-2 border-t-2",
  "-right-6 -top-6 border-r-2 border-t-2",
  "-bottom-6 -left-6 border-b-2 border-l-2",
  "-bottom-6 -right-6 border-b-2 border-r-2",
] as const;

/* ---------------------------------------------------------------------------
   Open and close choreography — lessons.md D-017.

   The orange panel wipes in from the top-right corner, where the trigger is
   (a clip-path inset, 0.5s). The nav items start rising 0.2s into the wipe,
   0.06s apart, and the contact column fades up once the wipe has landed.
   Closing runs the sequence backwards and faster: column and items leave
   first (`when: "afterChildren"`), then the panel wipes back to the corner. The variant labels propagate from the root, so the
   children carry no `initial`/`animate` of their own.

   `inset()` keeps all four values in percent at both ends; motion interpolates
   complex strings only when their structure matches.
--------------------------------------------------------------------------- */
function panelVariants(reduced: boolean) {
  return {
    closed: {
      clipPath: "inset(0% 0% 100% 100%)",
      transition: reduced
        ? { duration: 0 }
        : { duration: 0.4, ease: EASE, when: "afterChildren" as const },
    },
    open: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: reduced ? { duration: 0 } : { duration: 0.5, ease: EASE },
    },
  };
}

function listVariants(reduced: boolean) {
  return {
    closed: {
      transition: reduced
        ? { duration: 0 }
        : { staggerChildren: STAGGER / 2, staggerDirection: -1 },
    },
    open: {
      transition: reduced
        ? { duration: 0 }
        : { staggerChildren: STAGGER, delayChildren: 0.2 },
    },
  };
}

function itemVariants(reduced: boolean) {
  return {
    closed: {
      opacity: 0,
      y: reduced ? 0 : 24,
      transition: reduced ? { duration: 0 } : { duration: 0.2, ease: EASE },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: reduced ? { duration: 0 } : { duration: 0.5, ease: EASE },
    },
  };
}

function columnVariants(reduced: boolean) {
  return {
    closed: {
      opacity: 0,
      transition: reduced ? { duration: 0 } : { duration: 0.15, ease: EASE },
    },
    open: {
      opacity: 1,
      transition: reduced
        ? { duration: 0 }
        : { duration: 0.4, ease: EASE, delay: 0.45 },
    },
  };
}

/**
 * The menu — design.md §8.
 *
 * Full-viewport orange overlay with the dotted column rules still visible through
 * it. Mounted only while open, by `Header`, which owns the open state: that ties
 * every effect here — scroll lock, focus trap, Escape — to the component's own
 * lifetime rather than to a flag, so none of them can leak. `AnimatePresence`
 * in `Header` extends that lifetime by the close animation; `useIsPresent`
 * says which side of the close this render is on.
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
  const present = useIsPresent();

  const currentIndex = nav.findIndex((item) => isCurrent(pathname, item.href));
  /* Where the reticle rests when nothing is hovered: on the current page, as on
     the reference. An unrecognised route falls back to the first item. */
  const restIndex = currentIndex === -1 ? 0 : currentIndex;

  const dialogRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const [marked, setMarked] = useState(restIndex);
  const [reticle, setReticle] = useState<Reticle | null>(null);
  /* The items rise into place on open, and a box measured mid-rise is wrong
     by however far the item still has to travel. The reticle waits for the
     list to report its open animation complete, then measures. */
  const [settled, setSettled] = useState(reduced);

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
  /* The dialog itself takes focus, not the first link. Focusing the link drew
     the global 2px `:focus-visible` ring — a full rectangle fighting the crop
     marks (audit C2). A `tabIndex=-1` container is a legitimate focus target
     for a modal, shows no ring, and the first Tab lands on the first control
     through the trap below. */
  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  /* --- Escape, and the focus trap --------------------------------------- */
  /* Both switch off the moment the close begins: the overlay is `inert` while
     it animates out, and a trap that kept running would pull focus back into
     a menu that no longer exists for the pointer. */
  useEffect(() => {
    if (!present) return;

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

      // Wrap at both ends, and reel focus back in if it escaped altogether —
      // which includes the first Tab, while the dialog container holds focus.
      const atEdge = event.shiftKey ? active === first : active === last;
      if (atEdge || !inside) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [chromeRef, onDismiss, present]);

  /* --- The crop-mark reticle -------------------------------------------- */
  /* FLIP reduced to its useful half: measure the marked item's box with
     `getBoundingClientRect`, then drive ONE element to it with a transform.
     Four marks fading in and out would read as four elements; this reads as a
     viewfinder tracking down the list. Measured in a layout effect, so the box
     is already right at first paint and no measuring happens during render. */
  useLayoutEffect(() => {
    if (!settled) return;
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
  }, [marked, settled]);

  /* Keyboard parity with `onPointerLeave`: once focus leaves the list entirely
     the reticle goes back to rest, rather than staying on whichever item was
     tabbed through last. */
  const onListBlur = (event: FocusEvent<HTMLUListElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setMarked(restIndex);
    }
  };

  /* `outline-none` is deliberate and not a regression: the reticle IS the focus
     indicator here — `onFocus` moves it onto the focused item — and the global
     ring would draw a second, full rectangle around the same word. */
  const itemSkin =
    "relative inline-block font-display text-[clamp(2.75rem,11vw,var(--text-nav))] font-bold uppercase leading-none text-white transition-opacity duration-300 ease-[ease] outline-none";

  const contactSkin =
    "u-label inline-flex min-h-11 items-center text-white transition-opacity duration-300 ease-[ease] hover:opacity-70 focus-visible:outline-white";

  return (
    <motion.div
      id={id}
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      tabIndex={-1}
      inert={!present}
      variants={panelVariants(reduced)}
      initial="closed"
      animate="open"
      exit="closed"
      className="fixed inset-0 z-40 overflow-y-auto bg-accent outline-none"
    >
      {/* The rules sit above the orange, not behind it — design.md §8. */}
      <GridOverlay position="fixed" layer="front" tone="overlay" />

      {/* No column gap: the overlay's rules are plain 1fr tracks, so the panel's
          tracks have to be the same or the nav's right edge and the column-2
          rule disagree about where column 2 ends. */}
      <div
        ref={panelRef}
        className="u-container relative z-20 grid min-h-full grid-cols-1 content-center gap-y-16 pb-16 pt-24 lg:grid-cols-4"
      >
        {/* Nav right-aligned to the right edge of column 2 (x≈655 at 1440 —
            audit C3), with the 64px inset the reference keeps from the rule.
            Below `lg` the nav takes the full width: nothing fits beside it. */}
        <div ref={frameRef} className="relative lg:col-span-2 lg:pr-16">
          {reticle === null || !settled ? null : (
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
              {MARKS.map((mark) => (
                <span
                  key={mark}
                  className={`absolute size-3 border-ink ${mark}`}
                />
              ))}
            </span>
          )}

          <motion.ul
            className="flex flex-col items-end gap-10 sm:gap-12"
            variants={listVariants(reduced)}
            onAnimationComplete={(definition) => {
              if (definition === "open") setSettled(true);
            }}
            onPointerLeave={() => setMarked(restIndex)}
            onBlur={onListBlur}
          >
            {nav.map((item, index) => {
              const active = index === currentIndex;

              return (
                <motion.li key={item.href} variants={itemVariants(reduced)}>
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
                    {item.label}
                    {/* Ink, small, raised to the top-right of the word and
                        flush with its right edge — design.md §8. Ink rather
                        than the slate accent: slate on the orange ground is
                        2:1, ink is 3.4:1, enough for an 18px bold figure
                        (D-018). Absolute, so the word itself is what
                        right-aligns to the column. */}
                    <span className="u-pixel-num absolute right-0 top-0 -translate-y-[0.55em] text-ink">
                      {item.num}
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>

        {/* Contact starts at column 3, not 4 (audit C3). */}
        <motion.div
          variants={columnVariants(reduced)}
          className="flex flex-col gap-12 lg:col-span-2 lg:col-start-3 lg:pl-12"
        >
          <div>
            <p className="u-label-sm text-white/80">Socials</p>
            <SocialLinks
              showLabels
              className="mt-2 flex-col items-start! gap-y-0"
              linkClassName="justify-start text-white hover:opacity-70 focus-visible:outline-white"
            />
          </div>

          <div>
            <p className="u-label-sm text-white/80">E-mail</p>
            {/* Not `Chip variant="bracketed"`: that variant is orange on canvas
                by design, and would disappear on this ground. */}
            <a href={`mailto:${site.email}`} className={contactSkin}>
              <span aria-hidden="true">[&nbsp;</span>
              {site.email}
              <span aria-hidden="true">&nbsp;]</span>
            </a>
          </div>

          <div>
            <p className="u-label-sm text-white/80">Phone</p>
            <a href={`tel:${site.phoneHref}`} className={contactSkin}>
              {site.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
