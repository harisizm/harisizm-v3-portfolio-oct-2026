"use client";

import { useScrollSpy } from "@/hooks";

export interface RailSection {
  readonly id: string;
  readonly label: string;
}

export interface RailNavProps {
  sections: readonly RailSection[];
  className?: string;
}

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
 * The marker keeps its space when inactive (`invisible`, not conditional), so
 * labels do not shift sideways as the active item changes.
 *
 * Sections arrive as props rather than being imported here: importing `@/data`
 * into a client component would pull all six case studies into the bundle.
 */
export function RailNav({ sections, className = "" }: RailNavProps) {
  const active = useScrollSpy(sections.map((section) => section.id));

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
                className={`flex min-h-6 items-center gap-1.5 text-label transition-opacity duration-300 ease-[ease] hover:opacity-70 ${
                  isActive ? "font-medium text-ink" : "text-mid-grey"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`text-[10px] ${isActive ? "visible" : "invisible"}`}
                >
                  &#9642;
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
