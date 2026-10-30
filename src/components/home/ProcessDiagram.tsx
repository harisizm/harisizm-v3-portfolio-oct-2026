"use client";

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks";
import type { ProcessDiagramId } from "@/data";

/** The reference's line-art slot is about 200px square (audit B4). */
export const DIAGRAM_PX = 200;

/**
 * The three process drawings, inline so their parts can move with the scroll.
 *
 * Each drawing is tied directly to where its step sits in the viewport: as
 * the step scrolls up through the screen the moving parts turn one way, and
 * scrolling back down turns them back. There is no spring or easing between
 * the scroll and the rotation, so the drawings answer the wheel instantly
 * and never drift on after it stops. The still parts carry the meaning (the
 * line that reaches the edge, the dial's face, the loop's core) and the
 * moving parts are the ones that read as work happening.
 *
 * The server renders every drawing unrotated, and the rotation is only ever
 * written once the scroll position has actually been measured, so nothing
 * jumps on hydration. Under reduced motion nothing is written at all.
 */
export function ProcessDiagram({ id }: { id: ProcessDiagramId }) {
  const reduced = useReducedMotion();
  /* `useScroll` wants an HTML target, so the drawing sits in a sized div. */
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const Drawing = DRAWINGS[id];

  return (
    <div ref={ref} className="mx-auto" style={{ width: DIAGRAM_PX, height: DIAGRAM_PX }}>
      <svg
        viewBox="0 0 200 200"
        width={DIAGRAM_PX}
        height={DIAGRAM_PX}
        aria-hidden="true"
        focusable="false"
        className="fill-none stroke-ink"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Drawing progress={scrollYProgress} live={!reduced} />
      </svg>
    </div>
  );
}

interface DrawingProps {
  /** 0 when the drawing's top enters the viewport, 1 when its bottom leaves. */
  progress: MotionValue<number>;
  /** False under reduced motion: the group stays where the server drew it. */
  live: boolean;
}

/**
 * A group that turns about the drawing's centre, from `from` degrees at the
 * top of the travel to `to` at the bottom. The rotation is written straight
 * to the SVG `transform` attribute rather than through a motion style, so
 * the origin is the drawing's own centre in user units and not something
 * the browser has to work out from a bounding box.
 */
function Turn({
  progress,
  live,
  from,
  to,
  children,
}: DrawingProps & { from: number; to: number; children: ReactNode }) {
  const ref = useRef<SVGGElement>(null);
  const degrees = useTransform(progress, [0, 1], [from, to]);

  useMotionValueEvent(degrees, "change", (value) => {
    if (!live) return;
    ref.current?.setAttribute("transform", `rotate(${value.toFixed(2)} 100 100)`);
  });

  return <g ref={ref}>{children}</g>;
}

/* Ship: scattered points converge on one line that reaches the edge. The fan
   of points swings about the centre; the line out to the edge holds still. */
function Ship(props: DrawingProps) {
  return (
    <>
      <Turn {...props} from={-40} to={40}>
        <path d="M100 20A80 80 0 0 0 100 180" strokeOpacity={0.35} />
        <path
          d="M84.5 42L61 32.4 60.4 60.4 30.7 60 40.1 84 22 100 51.7 112.9 37.6 136 43.4 156.6 71 150.2 80.3 173.4"
          strokeOpacity={0.35}
        />
        <path d="M84.5 42L100 100M61 32.4L100 100M60.4 60.4L100 100M30.7 60L100 100M40.1 84L100 100M22 100L100 100M51.7 112.9L100 100M37.6 136L100 100M43.4 156.6L100 100M71 150.2L100 100M80.3 173.4L100 100" />
        <g className="fill-ink stroke-none">
          <circle cx="84.5" cy="42" r="1.75" />
          <circle cx="61" cy="32.4" r="1.75" />
          <circle cx="60.4" cy="60.4" r="1.75" />
          <circle cx="30.7" cy="60" r="1.75" />
          <circle cx="40.1" cy="84" r="1.75" />
          <circle cx="22" cy="100" r="1.75" />
          <circle cx="51.7" cy="112.9" r="1.75" />
          <circle cx="37.6" cy="136" r="1.75" />
          <circle cx="43.4" cy="156.6" r="1.75" />
          <circle cx="71" cy="150.2" r="1.75" />
          <circle cx="80.3" cy="173.4" r="1.75" />
        </g>
      </Turn>
      <circle cx="100" cy="100" r="2.5" className="fill-ink stroke-none" />
      <g className="stroke-accent">
        <path d="M100 100H180" />
        <path d="M140 94V106M160 96V104" />
        <circle cx="180" cy="100" r="2.5" className="fill-accent stroke-none" />
      </g>
    </>
  );
}

/* Measure: a ruled dial with one reading taken. The needle sweeps the dial
   as the step scrolls, and the tick ring creeps the other way behind it. */
function Measure(props: DrawingProps) {
  return (
    <>
      <circle cx="100" cy="100" r="80" />
      <circle cx="100" cy="100" r="32" />
      <Turn {...props} from={20} to={-20}>
        {/* 36 minor ticks: a 6px-wide ring dashed at 1.25px every 1/36 of its circumference */}
        <circle
          cx="100"
          cy="100"
          r="74"
          strokeWidth={6}
          strokeDasharray="1.25 11.666"
          strokeLinecap="butt"
        />
        <path d="M160 100H180M152 70L169.3 60M130 48L140 30.7M100 40V20M70 48L60 30.7M48 70L30.7 60M40 100H20M48 130L30.7 140M70 152L60 169.3M100 160V180M130 152L140 169.3M152 130L169.3 140" />
      </Turn>
      <path d="M100 68V132M68 100H132" strokeOpacity={0.35} />
      <circle cx="100" cy="100" r="2.5" className="fill-ink stroke-none" />
      <Turn {...props} from={-110} to={70}>
        <g className="stroke-accent">
          <path d="M100 100L151.4 38.7" />
          <path d="M146 100A46 46 0 0 0 129.6 64.8" />
          <circle cx="151.4" cy="38.7" r="2.5" className="fill-accent stroke-none" />
        </g>
      </Turn>
    </>
  );
}

/* Automate: a repeating lattice on a loop, one segment closed and running.
   The whole loop turns with the scroll; the core it runs around stays put. */
function Automate(props: DrawingProps) {
  return (
    <>
      <Turn {...props} from={0} to={240}>
        <circle cx="100" cy="100" r="80" />
        {/* the {8/3} star: every node tied to the one three steps on */}
        <path
          d="M180 100L43.4 156.6 100 20 156.6 156.6 20 100 156.6 43.4 100 180 43.4 43.4Z"
          strokeOpacity={0.35}
        />
        {/* direction of travel on the loop */}
        <path d="M15 106L20 100 25 106M106 175L100 180 106 185" />
        <g className="fill-ink stroke-none">
          <circle cx="156.6" cy="156.6" r="1.75" />
          <circle cx="100" cy="180" r="1.75" />
          <circle cx="43.4" cy="156.6" r="1.75" />
          <circle cx="20" cy="100" r="1.75" />
          <circle cx="43.4" cy="43.4" r="1.75" />
          <circle cx="156.6" cy="43.4" r="1.75" />
        </g>
        <g className="stroke-accent">
          <path d="M100 20A80 80 0 0 1 180 100" />
          <path d="M175 94L180 100 185 94" />
          <g className="fill-accent stroke-none">
            <circle cx="100" cy="20" r="2.5" />
            <circle cx="180" cy="100" r="2.5" />
          </g>
        </g>
      </Turn>
      <circle cx="100" cy="100" r="30" />
      <circle cx="100" cy="100" r="2.5" className="fill-ink stroke-none" />
    </>
  );
}

const DRAWINGS: Record<ProcessDiagramId, (props: DrawingProps) => ReactNode> = {
  ship: Ship,
  measure: Measure,
  automate: Automate,
};
