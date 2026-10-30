"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { useCallback, useId, useRef, useState, type CSSProperties } from "react";

import { Press } from "@/components/motion";
import { StatusPill } from "@/components/ui";

import { StackedMark } from "./StackedMark";
import { MenuOverlay } from "./MenuOverlay";

/* Measured on the reference: 96px bar, 193×58 logo chip, 103×44 menu button
   (audit A4). The `--header-h` token in globals.css must agree — anything that
   sticks below the bar offsets by it. */
const HEADER_H = "96px";

/**
 * Site header — design.md §6.1, §8.
 *
 * A client component because it owns the menu's open state and the ref focus
 * returns to. Everything in it that could be static — the wordmark, the status
 * pill — is a presentational import, so the client bundle carries the state
 * machine and nothing else.
 *
 * `sticky` rather than `fixed`: the menu is the whole navigation, so its trigger
 * has to stay reachable at any scroll depth, and sticky does that without the
 * layout offset a fixed bar needs.
 */
export function Header() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayId = useId();

  /* The route the menu was opened on, rather than a boolean. Any navigation —
     including browser back/forward, which no click handler sees — moves the
     pathname away from it and the menu is closed by derivation. A boolean would
     need an effect to notice, and an effect that calls setState is a cascading
     render. */
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt !== null && openedAt === pathname;

  /** Escape, or the trigger itself: focus goes back where it came from. */
  const dismiss = useCallback(() => {
    setOpenedAt(null);
    triggerRef.current?.focus();
  }, []);

  /** A nav item was followed. Leave focus to the incoming route. */
  const navigate = useCallback(() => {
    setOpenedAt(null);
  }, []);

  /* Open: a slate chip with canvas text, not orange on the orange overlay. The
     focus ring flips to white for the same reason — orange on orange is
     invisible, and slate on it is 2:1. */
  const triggerSkin = open
    ? "bg-accent-2 text-canvas focus-visible:outline-white"
    : "bg-accent text-white";

  // Solid canvas ground. Left transparent, page content scrolled visibly under
  // the bar and collided with the status pill and the trigger. The grid rules
  // give up the header band in exchange; they resume immediately below it.
  return (
    <header
      style={{ "--header-h": HEADER_H } as CSSProperties}
      className="sticky top-0 z-50 bg-canvas"
    >
      {/* Above the overlay's z-40, so the trigger stays live while it is open.
          The bar is also what the overlay cycles focus through, which is why it
          carries a ref: everything visible above the overlay has to be
          reachable from the keyboard, not just clickable. */}
      <div
        ref={barRef}
        className="u-container relative z-50 flex min-h-(--header-h) items-center justify-between gap-4"
      >
        {/* The stacked mark in its reticle (D-022). `onClick` closes the menu
            as well as navigating: on the home page the route does not change,
            so nothing else would. */}
        <StackedMark onClick={navigate} />

        <div className="flex items-center gap-4">
          {/* Orange on the orange overlay would be invisible, and the menu is
              its own surface — the pill belongs to the page, not to it. */}
          {open ? null : (
            <div className="hidden bg-canvas px-2 py-1 sm:block">
              <StatusPill />
            </div>
          )}

          {/* `Press` is a span around the button, not a replacement for it:
              the ref, the aria wiring and the click stay on the real control. */}
          <Press>
            <button
              ref={triggerRef}
              type="button"
              aria-expanded={open}
              aria-controls={open ? overlayId : undefined}
              onClick={() => {
                if (open) dismiss();
                else setOpenedAt(pathname);
              }}
              className={`u-pixel inline-flex min-h-11 min-w-[103px] items-center justify-center gap-2 px-4 transition-opacity duration-300 ease-[ease] hover:opacity-80 ${triggerSkin}`}
            >
              {/* The glyph is state, not name: the accessible name stays "MENU"
                  at both ends of the toggle, and `aria-expanded` carries the
                  state. A name that flips to "Close" would break voice control,
                  which types what it sees. */}
              <span aria-hidden="true">{open ? "✕" : "+"}</span>
              Menu
            </button>
          </Press>
        </div>
      </div>

      {/* AnimatePresence keeps the overlay mounted through its close
          choreography. Its own effects still end with its lifetime, and while
          it is leaving it is `inert`, so nothing can be focused or clicked on
          a menu that is already on its way out. */}
      <AnimatePresence>
        {open ? (
          <MenuOverlay
            key="menu"
            id={overlayId}
            chromeRef={barRef}
            onDismiss={dismiss}
            onNavigate={navigate}
          />
        ) : null}
      </AnimatePresence>
    </header>
  );
}
