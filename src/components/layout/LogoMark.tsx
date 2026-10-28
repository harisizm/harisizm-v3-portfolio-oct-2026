"use client";

import Link from "next/link";
import { useAnimate, type AnimationSequence } from "motion/react";
import { useEffect, useRef } from "react";

import { EASE, POINTER_FINE, usePointerFine } from "@/components/motion";
import { Wordmark } from "@/components/ui";
import { useReducedMotion } from "@/hooks";
import { site } from "@/lib/site";

/* `motion/react` is imported directly here, against the README's rule for page
   components, for the same reason MenuOverlay does: this is a layout-level piece
   with a one-off choreography, not a reusable primitive. The three rules the
   primitives obey still hold — the server renders the resting state, reduced
   motion gets the resting state only, and the pointer sequence needs a pointer. */

export interface LogoMarkProps {
  /** The menu is open: the chip carries its 1px outline. */
  open: boolean;
  /** Fired when the link is followed; the header uses it to close the menu. */
  onClick?: () => void;
}

/* The four "selection handle" squares. Each one is named so the drag can move
   the two that share an edge with the bottom-right corner and leave the rest. */
const HANDLES = [
  { id: "tl", corner: "-left-px -top-px" },
  { id: "tr", corner: "-right-px -top-px" },
  { id: "bl", corner: "-bottom-px -left-px" },
  { id: "br", corner: "-bottom-px -right-px" },
] as const;

/** How far the bottom-right handle is dragged before it is let go. */
const DRAG = { x: 14, y: 6 };

/** The springs the chip and the handles settle on after release. The handles
    are softer on purpose, so they visibly lag the corners and catch up. */
const CHIP_SPRING = { type: "spring", stiffness: 380, damping: 26 } as const;
const HANDLE_SPRING = { type: "spring", stiffness: 260, damping: 20 } as const;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/* The flag is keyed to `performance.timeOrigin`, which is unique per document
   load. A plain boolean would survive a reload (sessionStorage is per tab, not
   per load) and the sequence would play once per tab; keyed, it plays on every
   full load and never on a client-side route change or a remount of the header
   within the same document. */
const FLAG_KEY = "logo-intro";

function alreadyPlayedThisLoad(): boolean {
  const key = String(performance.timeOrigin);
  try {
    if (sessionStorage.getItem(FLAG_KEY) === key) return true;
    sessionStorage.setItem(FLAG_KEY, key);
  } catch {
    /* Storage blocked: play once; a remount will play again, which is harmless. */
  }
  return false;
}

/* Absolute times in seconds. The ghost appears at 0.6, arrives at 1.3, clicks,
   starts dragging at 1.55, lets go at 2.0 and is gone by 2.4; the springs settle
   under 2.8. */
const T = {
  appear: 0.6,
  glide: 0.7,
  click: 1.3,
  drag: 1.55,
  dragFor: 0.45,
  release: 2.0,
  leave: 0.4,
} as const;

/* The ground stretches with a transform from its top-left corner. Animating
   `right`/`bottom` was tried first and never moved: motion cannot interpolate
   an inset that starts as `auto`. Scale factors depend on the chip's rendered
   size, so the sequence is built once the ground has been measured. */
const buildSequence = (groundW: number, groundH: number): AnimationSequence => [
  /* Fade in off to the bottom-right and glide to the corner. Two keyframes per
     axis with a mid point off the straight line, so the path bends slightly. */
  [
    "[data-ghost]",
    { opacity: [0, 1] },
    { duration: 0.25, ease: EASE, at: T.appear },
  ],
  [
    "[data-ghost]",
    { x: [120, 40, 0], y: [120, 96, 0] },
    { duration: T.glide, ease: EASE, at: T.appear },
  ],

  /* Click: the pointer dips, the chip presses, the handles pop as if the object
     was just selected. */
  ["[data-ghost]", { y: [0, 2, 0] }, { duration: 0.18, ease: EASE, at: T.click }],
  ["[data-mark]", { scale: [1, 0.97, 1] }, { duration: 0.18, ease: EASE, at: T.click }],
  [
    "[data-handle]",
    { scale: [1.6, 0.9, 1] },
    { duration: 0.3, ease: EASE, at: T.click + 0.02 },
  ],

  /* Drag: the pointer takes the bottom-right handle out. The lime ground grows
     with it; the two handles sharing an edge with that corner ride along. */
  ["[data-ghost]", { x: DRAG.x, y: DRAG.y }, { duration: T.dragFor, ease: EASE, at: T.drag }],
  [
    "[data-ground]",
    { scaleX: 1 + DRAG.x / groundW, scaleY: 1 + DRAG.y / groundH },
    { duration: T.dragFor, ease: EASE, at: T.drag },
  ],
  ['[data-handle="br"]', { x: DRAG.x, y: DRAG.y }, { duration: T.dragFor, ease: EASE, at: T.drag }],
  ['[data-handle="tr"]', { x: DRAG.x }, { duration: T.dragFor, ease: EASE, at: T.drag }],
  ['[data-handle="bl"]', { y: DRAG.y }, { duration: T.dragFor, ease: EASE, at: T.drag }],

  /* Release: the chip springs back, the handles follow on a softer spring. */
  ["[data-ground]", { scaleX: 1, scaleY: 1 }, { ...CHIP_SPRING, at: T.release }],
  ['[data-handle="br"]', { x: 0, y: 0 }, { ...HANDLE_SPRING, at: T.release }],
  ['[data-handle="tr"]', { x: 0 }, { ...HANDLE_SPRING, at: T.release }],
  ['[data-handle="bl"]', { y: 0 }, { ...HANDLE_SPRING, at: T.release }],

  /* The pointer drifts away and fades. */
  [
    "[data-ghost]",
    { opacity: 0, x: DRAG.x + 48, y: DRAG.y + 40 },
    { duration: T.leave, ease: EASE, at: T.release + 0.05 },
  ],
];

/**
 * The header logo: a lime chip with the wordmark, four selection handles, and
 * once per page load a ghost pointer that clicks it, drags a handle and lets
 * go. The chip is the site's home link throughout (lessons.md T-002); the
 * pointer and the handles are decoration and hidden from assistive tech.
 *
 * The server renders the resting state: chip, wordmark and handles exactly as
 * they end up, so nothing depends on the sequence having played (T-009). The
 * ghost pointer is only mounted for a fine pointer without reduced motion.
 *
 * The lime ground is its own absolutely positioned layer rather than padding
 * on the chip: growing it does not change the link's layout box, so the
 * wordmark holds still and the header bar does not shuffle while the chip is
 * being dragged. The menu-open outline is a box-shadow for the same reason.
 */
export function LogoMark({ open, onClick }: LogoMarkProps) {
  const [scope, animate] = useAnimate<HTMLSpanElement>();
  const reduced = useReducedMotion();
  const fine = usePointerFine();

  /* Hover may only twitch the handles once the sequence has finished (or was
     skipped); mid-drag, a twitch would fight the choreography. */
  const restingRef = useRef(false);

  useEffect(() => {
    /* The media queries are read here rather than from the hooks: on the
       hydration render both hooks return the server's `false`, and this effect
       would otherwise start the sequence for a visitor who asked it not to. */
    if (
      window.matchMedia(REDUCED_MOTION).matches ||
      !window.matchMedia(POINTER_FINE).matches
    ) {
      restingRef.current = true;
      return;
    }

    /* Deferred a tick so StrictMode's double-invoke cancels the first run
       before it writes the flag; otherwise dev would never play it. */
    let controls: ReturnType<typeof animate> | null = null;
    const timer = window.setTimeout(() => {
      if (alreadyPlayedThisLoad()) {
        restingRef.current = true;
        return;
      }
      const ground = scope.current?.querySelector<HTMLElement>("[data-ground]");
      const rect = ground?.getBoundingClientRect();
      if (!rect || rect.width === 0 || rect.height === 0) {
        restingRef.current = true;
        return;
      }
      controls = animate(buildSequence(rect.width, rect.height));
      controls.then(() => {
        restingRef.current = true;
      });
    }, 0);

    return () => {
      window.clearTimeout(timer);
      controls?.stop();
    };
  }, [animate]);

  /* A 1px jitter, back to rest in 0.2s. The outline on hover is CSS, so it
     also works with JS off and under reduced motion; only the twitch is gated. */
  const twitch = () => {
    if (reduced || !fine || !restingRef.current) return;
    animate(
      "[data-handle]",
      { x: [0, 1, -1, 0], y: [0, -1, 1, 0] },
      { duration: 0.2, ease: "linear" },
    );
  };

  const outlined = open ? "shadow-[0_0_0_1px_var(--accent)]" : "group-hover:shadow-[0_0_0_1px_var(--accent)]";

  return (
    <Link
      href="/"
      aria-label={`${site.name}, home`}
      onClick={onClick}
      onPointerEnter={twitch}
      className="group relative inline-flex min-h-11 items-center transition-opacity duration-300 ease-[ease] hover:opacity-80"
    >
      <span ref={scope} className="relative inline-flex">
        <span data-mark="" className="relative inline-block px-[30px] py-[15px]">
          <span
            data-ground=""
            aria-hidden="true"
            className={`absolute inset-0 origin-top-left bg-accent-2 ${outlined}`}
          />
          <Wordmark variant="chip-text" className="relative" />
          {HANDLES.map(({ id, corner }) => (
            <span
              key={id}
              data-handle={id}
              aria-hidden="true"
              className={`absolute size-[3px] bg-accent ${corner}`}
            />
          ))}
        </span>

        {/* The ghost pointer, drawn like public/cursor/default.svg: white fill,
            black 1.5px outline, straight edges, 22px tall. Its tip sits on the
            bottom-right handle at rest; the sequence moves it from there. */}
        {reduced || !fine ? null : (
          <svg
            data-ghost=""
            aria-hidden="true"
            focusable="false"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-full top-full -ml-[1.5px] -mt-px opacity-0"
          >
            <path
              d="M1.5 1 L15 14.5 L9.5 14.5 L12.5 21 L9.5 21 L5.5 13 L1.5 17.5 Z"
              fill="#fff"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinejoin="miter"
            />
          </svg>
        )}
      </span>
    </Link>
  );
}
