"use client";

import type { ReactNode } from "react";

import { useReveal } from "@/hooks";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Fraction of the block that must be in view. Lower it for tall blocks. */
  threshold?: number;
}

/**
 * The only client component on the home page: a wrapper that gives its children
 * the scroll reveal from `useReveal`.
 *
 * Children are rendered on the server and handed in as props, so wrapping a
 * section in this does not pull that section's markup into the client bundle.
 *
 * Nothing about the content depends on it: `useReveal` opts an element *into*
 * hiding from JS, so with scripts blocked every block here renders in its final,
 * readable state (lessons.md T-009).
 */
export function Reveal({ children, className = "", threshold = 0.1 }: RevealProps) {
  const ref = useReveal<HTMLDivElement>({ threshold });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
