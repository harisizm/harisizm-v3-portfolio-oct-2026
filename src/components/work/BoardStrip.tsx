import Image from "next/image";
import { Reveal, STAGGER, Stagger } from "@/components/motion";
import type { Board } from "@/data";

export interface BoardStripProps {
  boards: readonly Board[];
}

/** A board whose artefact has actually been drawn. */
type DrawnBoard = Board & { src: string };

/**
 * Craft-evidence boards between prose sections — diagrams, schemas, measurement
 * panels (design.md §9.2).
 *
 * `boardsAfter()` already drops boards with a null `src`, and every board in the
 * data layer is currently null, so this returns null everywhere today. The second
 * filter is not belt-and-braces: it is what narrows the type, and it keeps the
 * component safe for a caller that passes `project.caseStudy.boards` raw.
 *
 * Returning null rather than an empty wrapper is what stops an absent board
 * leaving a gap between two sections.
 *
 * The boards stagger in (lessons.md D-017), each `Reveal` taking the grid
 * cell its figure used to. `Reveal` fades and rises; it has no scale, so the
 * boards do not grow into place.
 */
export function BoardStrip({ boards }: BoardStripProps) {
  const drawn = boards.filter((board): board is DrawnBoard => board.src !== null);
  if (drawn.length === 0) return null;

  return (
    <Stagger className="grid gap-10 border-t border-border py-14 sm:grid-cols-2">
      {drawn.map((board, index) => (
        <Reveal key={board.id} delay={index * STAGGER}>
          <figure>
            {/* The image sets its own height. A fixed 4:3 frame with
                object-contain letterboxed every 16:9 dashboard in grey. */}
            <Image
              src={board.src}
              alt={board.alt}
              width={board.width ?? 1600}
              height={board.height ?? 950}
              sizes="(min-width: 1024px) 36vw, (min-width: 640px) 45vw, 100vw"
              className="h-auto w-full border border-border"
            />
            <figcaption className="mt-4">
              <span className="u-label text-accent">{board.title}</span>
              <span className="mt-2 block max-w-[52ch] text-mid-grey">
                {board.caption}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </Stagger>
  );
}
