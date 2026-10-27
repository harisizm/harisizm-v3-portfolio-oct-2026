import Link from "next/link";
import { Chip } from "@/components/ui";
import type { Project } from "@/data";
import { ProjectCover } from "./ProjectCover";

export interface WorkIndexEntryProps {
  project: Project;
  /** Position in the curated order, 0-based. Printed as the slashed-zero number. */
  index: number;
  /** First entry only — it is the one above the fold. */
  priority?: boolean;
}

/**
 * One project in the scrolling right column of `/work`.
 *
 * The whole entry is a single anchor: one tab stop, one hover target, one
 * destination. The `View case study` line is a span inside it rather than a
 * second link, which would double every project in the tab order.
 *
 * Every cover in the data layer is null today, so the entry currently renders as
 * a typographic row. That is deliberate — a placeholder tile would be a frame
 * promising art that does not exist (lessons.md T-002) — and the image slots in
 * above the text the moment a cover lands.
 */
export function WorkIndexEntry({
  project,
  index,
  priority = false,
}: WorkIndexEntryProps) {
  return (
    <article>
      <Link
        href={`/work/${project.slug}`}
        className="group block border-t border-border pt-6 pb-14"
      >
        <ProjectCover
          image={project.cover}
          sizes="(min-width: 1024px) 70vw, 100vw"
          priority={priority}
          className="mb-8"
        />

        <div className="flex items-baseline justify-between gap-4">
          <span aria-hidden="true" className="u-label text-mid-grey">
            &#216;{index + 1}
          </span>
          <span className="u-label text-mid-grey">{project.dateLabel}</span>
        </div>

        <h2 className="mt-3 text-[28px] leading-[1.1] tracking-[-0.5px] sm:text-title">
          {project.title}
        </h2>

        <p className="mt-4 max-w-[62ch] text-mid-grey">{project.tagline}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </div>

        <span className="u-label mt-6 inline-flex min-h-11 items-center gap-2 text-accent transition-opacity duration-300 ease-[ease] group-hover:opacity-70">
          View case study
          <span aria-hidden="true">&#8599;</span>
        </span>
      </Link>
    </article>
  );
}
