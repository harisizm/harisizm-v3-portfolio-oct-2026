"use client";

import { motion } from "motion/react";

import { useReducedMotion, useScrollSpy } from "@/hooks";

export interface RailSection {
  readonly id: string;
  readonly label: string;
}

export interface RailNavProps {
  sections: readonly RailSection[];
  className?: string;
}

/**
 * The spring the rail marker and the mobile progress bar move on. Tight and
 * well damped: the marker is a 10px glyph travelling 24px, so anything softer
 * reads as wobble rather than weight. The house tokens are tweened curves and
 * do not cover a spring, so it lives here, beside both users.
 */
export const RAIL_SPRING = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.5,
} as const;

/**
 * The scroll-spy section nav, pinned to the bottom of the sticky rail
 * (design.md §9.2). Body face at the 16px label size, sentence case: the
 * reference's "Overview / Challenge / Strategy" column (audit E2). Active is
 * dark with a marker; inactive is `--mid-grey` and not `--dim`, which is
 * ~2.2:1 on this canvas and fails WCAG AA (§11).
 *
 * Real anchors to real section ids — no `preventDefault` and no scripted scroll,
 * so the nav works before hydration and with JS off. The spy only decides which
 * item is marked.
 *
 * The marker (lessons.md D-017): one `motion.span` with a `layoutId`, rendered
 * inside whichever item is active. When the active item changes it unmounts
 * from the old slot and mounts in the new one, and the shared `layoutId` makes
 * motion animate it from the old box to the new on `RAIL_SPRING`, so it reads
 * as one glyph sliding down the list. Under reduced motion the transition is
 * zero-length and it snaps. Every slot keeps an invisible copy of the glyph
 * for width, so labels do not shift sideways as the marker moves.
 *
 * `motion` is imported here directly rather than through a primitive because
 * a shared-layout marker is one element with one `layoutId`, not something a
 * wrapper could offer without becoming this component.
 *
 * Sections arrive as props rather than being imported here: importing `@/data`
 * into a client component would pull all six case studies into the bundle.
 */
export function RailNav({ sections, className = "" }: RailNavProps) {
  const active = useScrollSpy(sections.map((section) => section.id));
  const reduced = useReducedMotion();

  return (
    <nav aria-label="Case study sections" className={className}>
      <ul>
        {sections.map((section) => {
          const isActive = section.id === active;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`flex min-h-6 items-center gap-1.5 text-label transition-[opacity,color] duration-300 ease-[ease] hover:opacity-70 ${
                  isActive ? "font-medium text-ink" : "text-mid-grey"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="relative inline-block text-[10px] leading-none"
                >
                  <span className="invisible">&#9642;</span>
                  {isActive ? (
                    <motion.span
                      layoutId="rail-marker"
                      className="absolute inset-0 block"
                      transition={reduced ? { duration: 0 } : RAIL_SPRING}
                    >
                      &#9642;
                    </motion.span>
                  ) : null}
                </span>
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
