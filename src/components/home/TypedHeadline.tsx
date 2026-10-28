"use client";

import { useEffect, useState } from "react";

import { heroLines, heroTyping, type HeroLine } from "@/data";
import { useReducedMotion } from "@/hooks";

/**
 * The hero headline as a typewriter.
 *
 * The server renders the first line complete, so the page never opens on an
 * empty hero and crawlers read a whole sentence (lessons.md T-019). On the
 * client the line holds, is erased character by character, and the next one
 * types in; the cycle runs only while the pointer is not on the headline and
 * never under reduced motion, where the first line simply stays.
 *
 * The three rows are always rendered, each holding a non-breaking space when
 * empty, so the block never changes height while it types and nothing below
 * it moves.
 */

interface Char {
  readonly row: 0 | 1 | 2;
  readonly char: string;
  readonly accent: boolean;
}

function flatten(line: HeroLine): Char[] {
  const out: Char[] = [];
  line.forEach((segments, row) => {
    for (const segment of segments) {
      for (const char of segment.text) {
        out.push({ row: row as 0 | 1 | 2, char, accent: segment.accent === true });
      }
    }
  });
  return out;
}

const LINES = heroLines.map(flatten);

type Phase = "hold" | "erase" | "gap" | "type";

export function TypedHeadline({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const [line, setLine] = useState(0);
  const [count, setCount] = useState(LINES[0].length);
  const [phase, setPhase] = useState<Phase>("hold");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused || LINES.length < 2) return;
    const chars = LINES[line];
    let id: number;

    if (phase === "hold") {
      id = window.setTimeout(() => setPhase("erase"), heroTyping.hold);
    } else if (phase === "erase") {
      if (count > 0) {
        id = window.setTimeout(() => setCount((c) => c - 1), heroTyping.erase);
      } else {
        id = window.setTimeout(() => {
          setLine((l) => (l + 1) % LINES.length);
          setPhase("gap");
        }, 0);
      }
    } else if (phase === "gap") {
      id = window.setTimeout(() => setPhase("type"), heroTyping.gap);
    } else {
      if (count < chars.length) {
        id = window.setTimeout(() => setCount((c) => c + 1), heroTyping.type);
      } else {
        id = window.setTimeout(() => setPhase("hold"), 0);
      }
    }
    return () => window.clearTimeout(id);
  }, [reduced, paused, line, count, phase]);

  const chars = LINES[line];
  const shown = reduced ? LINES[0] : chars.slice(0, count);
  const caretRow = shown.length > 0 ? shown[shown.length - 1].row : 0;
  const cycling = !reduced && LINES.length > 1;

  const rows: Char[][] = [[], [], []];
  for (const c of shown) rows[c.row].push(c);

  return (
    <h1
      className={`text-left uppercase leading-[0.9] ${className}`}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {rows.map((row, i) => (
        <span
          key={i}
          className="block font-light"
        >
          {row.length === 0 ? " " : null}
          {row.map((c, j) => (
            <span key={j} className={c.accent ? "text-accent" : undefined}>
              {c.char}
            </span>
          ))}
          {cycling && i === caretRow ? (
            <span
              aria-hidden="true"
              className="hero-caret ml-[0.04em] inline-block h-[0.82em] w-[0.06em] translate-y-[0.06em] bg-accent align-baseline"
            />
          ) : null}
        </span>
      ))}
    </h1>
  );
}
