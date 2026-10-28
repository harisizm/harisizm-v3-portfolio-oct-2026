"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { useReducedMotion } from "@/hooks";

import { DURATION, EASE } from "./tokens";

/* ---------------------------------------------------------------------------
   The cover morph — lessons.md D-017, "cover-led morph".

   A work card's cover grows into the case-study hero while the rest of the
   page fades, and shrinks back down when the reader leaves. `motion` can do
   this natively with a shared `layoutId`, but only while both elements are
   mounted at once and measured in a stable document, and the App Router gives
   us neither: the outgoing page is unmounted by `AnimatePresence`, and Next
   scrolls to the top between the two measurements. So this is the overlay
   clone the brief allowed for: a fixed-position copy of the cover image,
   placed over the clicked cover, that flies to the hero's box once the new
   page has mounted and measured it, then unmounts.

   Nothing here runs under reduced motion (the click listener is never
   attached) or without JS (there is nothing to attach it). Navigation itself
   never depends on it: the links are ordinary links and the morph is only a
   spectator of them.
--------------------------------------------------------------------------- */

interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface MorphEntry {
  slug: string;
  element: HTMLElement;
  /** Pathnames whose links, when clicked, lift this cover off the page. */
  departTo: readonly string[];
}

interface Capture {
  slug: string;
  src: string;
  from: Box;
  /** Where the clicked link goes, so a navigation elsewhere drops the morph. */
  dest: string;
  /** Where it was clicked, so the capture survives until the route changes. */
  origin: string;
  source: HTMLElement;
}

interface Landing {
  box: Box;
  element: HTMLElement;
  /** Target so far off-screen that flying there would look like a glitch. */
  offscreen: boolean;
}

interface MorphState {
  capture: Capture | null;
  landing: Landing | null;
}

interface CoverMorphContextValue {
  /** The slug of the cover in flight. Both ends hide themselves while it is. */
  pending: string | null;
  register: (entry: MorphEntry) => () => void;
  land: (slug: string, element: HTMLElement) => void;
}

const IDLE: MorphState = { capture: null, landing: null };

const CoverMorphContext = createContext<CoverMorphContextValue>({
  pending: null,
  register: () => () => {},
  land: () => {},
});

/** Read by `PageTransition`: while a morph is in flight the page only fades. */
export function useCoverMorph(): { pending: string | null } {
  const { pending } = useContext(CoverMorphContext);
  return { pending };
}

function normalise(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function toBox(rect: DOMRect): Box {
  return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
}

/** After the clone lands, wait for the real image so the swap is invisible. */
function whenLoaded(element: HTMLElement, done: () => void): void {
  const img = element.querySelector("img");
  if (img === null || (img.complete && img.naturalWidth > 0)) {
    done();
    return;
  }
  let settled = false;
  const finish = () => {
    if (settled) return;
    settled = true;
    clearTimeout(timer);
    img.removeEventListener("load", finish);
    img.removeEventListener("error", finish);
    done();
  };
  const timer = setTimeout(finish, 1000);
  img.addEventListener("load", finish);
  img.addEventListener("error", finish);
}

export function CoverMorphProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const entries = useRef(new Set<MorphEntry>());
  const [state, setState] = useState<MorphState>(IDLE);

  /* A capture is only live on the page it was made on and the page it was
     made for. Any other route means the navigation went somewhere else, so
     the clone is dropped by derivation rather than by an effect. */
  const capture =
    state.capture !== null &&
    (pathname === state.capture.origin || pathname === state.capture.dest)
      ? state.capture
      : null;
  const landing = capture === null ? null : state.landing;

  /* --- Capture: a click on a link one of the covers departs through ------ */
  useEffect(() => {
    if (reduced) return;

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      /* The menu and the wordmark are chrome. A cover lifting out from under
         the closing menu would read as a glitch, not a transition. */
      if (anchor.target === "_blank" || anchor.closest("header") !== null) return;
      if (anchor.origin !== window.location.origin) return;

      const dest = normalise(anchor.pathname);
      let source: MorphEntry | null = null;
      for (const entry of entries.current) {
        if (entry.departTo.includes(dest) && entry.element.isConnected) {
          source = entry;
          break;
        }
      }
      if (source === null) return;

      const img = source.element.querySelector("img");
      if (img === null || img.currentSrc === "") return;
      const rect = source.element.getBoundingClientRect();
      // Off-screen or collapsed: nothing to lift. The page just fades.
      if (rect.width === 0 || rect.bottom <= 0 || rect.top >= window.innerHeight) {
        return;
      }

      setState({
        capture: {
          slug: source.slug,
          src: img.currentSrc,
          from: toBox(rect),
          dest,
          origin: normalise(window.location.pathname),
          source: source.element,
        },
        landing: null,
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reduced]);

  /* --- Watchdog: no landing, no stuck clone ------------------------------ */
  useEffect(() => {
    if (capture === null) return;
    const timer = setTimeout(() => setState(IDLE), 2500);
    return () => clearTimeout(timer);
  }, [capture]);

  const register = useCallback((entry: MorphEntry) => {
    entries.current.add(entry);
    return () => {
      entries.current.delete(entry);
    };
  }, []);

  /* The destination has mounted. The source calls this too, because it hides
     itself by the same `pending` signal; it is told apart by identity. */
  const land = useCallback((slug: string, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const offscreen =
      rect.top > window.innerHeight * 1.25 ||
      rect.bottom < -window.innerHeight * 0.25;
    setState((prev) => {
      if (
        prev.capture === null ||
        prev.capture.slug !== slug ||
        prev.capture.source === element ||
        prev.landing !== null
      ) {
        return prev;
      }
      return { ...prev, landing: { box: toBox(rect), element, offscreen } };
    });
  }, []);

  const onFlightComplete = () => {
    if (landing === null) return;
    if (landing.offscreen) {
      setState(IDLE);
      return;
    }
    whenLoaded(landing.element, () => setState(IDLE));
  };

  const value: CoverMorphContextValue = {
    pending: capture === null ? null : capture.slug,
    register,
    land,
  };

  return (
    <CoverMorphContext.Provider value={value}>
      {children}
      {capture === null ? null : (
        /* Above the page, below the sticky header (z-50), so the clone slides
           under the bar exactly as the real cover would. */
        <motion.div
          aria-hidden="true"
          /* The same ground, border and `object-contain` as the real frames
             (see `COVER_FRAME`), so the clone is pixel-for-pixel the cover it
             replaces at both ends and never re-crops mid-flight. */
          className="pointer-events-none fixed z-[45] overflow-hidden border border-border bg-surface-alt"
          initial={false}
          animate={
            landing === null
              ? { ...capture.from, opacity: 1 }
              : landing.offscreen
                ? { ...capture.from, opacity: 0 }
                : { ...landing.box, opacity: 1 }
          }
          transition={{
            duration: landing?.offscreen ? DURATION.fast : DURATION.base,
            ease: EASE,
          }}
          onAnimationComplete={onFlightComplete}
        >
          {/* The candidate the browser already decoded, so the clone paints
              on its first frame instead of fetching another size. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={capture.src} alt="" className="size-full object-contain" />
        </motion.div>
      )}
    </CoverMorphContext.Provider>
  );
}

export interface MorphCoverProps {
  /** Shared across the card, the index row and the case-study hero. */
  slug: string;
  /**
   * Pathnames whose links launch the morph from this cover. A card points at
   * its own case study; the hero points back at `/work`. Empty means this
   * cover can only be landed on, never departed from.
   */
  departTo?: readonly string[];
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * The frame around a cover image at either end of the morph. Renders a plain
 * `div` on the server and hides itself (React-managed, so the router's
 * back/forward cache can restore it) only while its slug is in flight.
 */
export function MorphCover({
  slug,
  departTo = [],
  className = "",
  style,
  children,
}: MorphCoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { pending, register, land } = useContext(CoverMorphContext);
  const routes = departTo.map(normalise).join("\n");
  const inFlight = pending === slug;

  useEffect(() => {
    const element = ref.current;
    if (element === null) return;
    return register({
      slug,
      element,
      departTo: routes === "" ? [] : routes.split("\n"),
    });
  }, [slug, routes, register]);

  useEffect(() => {
    if (inFlight && ref.current !== null) land(slug, ref.current);
  }, [inFlight, slug, land]);

  return (
    <div
      ref={ref}
      className={className}
      style={inFlight ? { ...style, visibility: "hidden" } : style}
    >
      {children}
    </div>
  );
}
