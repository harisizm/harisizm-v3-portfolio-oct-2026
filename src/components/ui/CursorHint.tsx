"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { POINTER_FINE, useMediaQuery } from "@/components/motion";
import { useReducedMotion } from "@/hooks";

export interface CursorHintProps {
  /** Two or three uppercase words: "View case study", "Opens in a new tab". */
  label: string;
  children: ReactNode;
  className?: string;
}

function subscribeNever(): () => void {
  return () => {};
}

/* The chip sits to the lower right of the pointer, clear of the arrow. */
const OFFSET = { x: 18, y: 22 };

/**
 * A label that rides beside the pointer while it is over the wrapped element
 * (lessons.md D-021): a solid chip in the display face, the menu button's
 * skin, so the hint reads as part of the chrome rather than a tooltip.
 *
 * Fine pointers only: on touch there is no hover to hint at. Under reduced
 * motion the chip still appears but snaps to the pointer instead of trailing
 * it on a spring. It is portalled to `body` because the cards it wraps sit
 * inside transformed ancestors (reveals, presses), and a fixed element inside
 * a transform is positioned against the transform, not the viewport.
 *
 * Decorative: the wrapped control already names its destination, so the
 * chip is hidden from assistive tech.
 */
export function CursorHint({ label, children, className = "" }: CursorHintProps) {
  const fine = useMediaQuery(POINTER_FINE);
  const reduced = useReducedMotion();
  const [over, setOver] = useState(false);
  /* False on the server and for the hydrating render, true after: the portal
     target does not exist until then. A store, not an effect, so the flag
     never comes from a setState inside an effect. */
  const mounted = useSyncExternalStore(subscribeNever, () => true, () => false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const node = ref.current;
    if (!fine || node === null) return;
    const move = (event: PointerEvent) => {
      x.set(event.clientX + OFFSET.x);
      y.set(event.clientY + OFFSET.y);
      if (reduced) {
        sx.jump(event.clientX + OFFSET.x);
        sy.jump(event.clientY + OFFSET.y);
      }
    };
    const enter = (event: PointerEvent) => {
      /* Land on the pointer, then trail it: without the jump the chip flies
         in from wherever it was last hidden. */
      sx.jump(event.clientX + OFFSET.x);
      sy.jump(event.clientY + OFFSET.y);
      move(event);
      setOver(true);
    };
    const leave = () => setOver(false);
    node.addEventListener("pointerenter", enter);
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", leave);
    return () => {
      node.removeEventListener("pointerenter", enter);
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", leave);
    };
  }, [fine, reduced, x, y, sx, sy]);

  return (
    <div ref={ref} className={className}>
      {children}
      {mounted && fine
        ? createPortal(
            <motion.span
              aria-hidden="true"
              className="u-pixel pointer-events-none fixed left-0 top-0 z-[60] whitespace-nowrap bg-accent px-3 py-2 text-white"
              style={{ x: sx, y: sy }}
              initial={false}
              animate={{ opacity: over ? 1 : 0, scale: over ? 1 : 0.85 }}
              transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {label}
            </motion.span>,
            document.body,
          )
        : null}
    </div>
  );
}
