import Link from "next/link";
import { Press, Reveal, STAGGER } from "@/components/motion";
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
 * One project in the scrolling right column of `/work` (audit D2).
 *
 * The whole entry is a single anchor: one tab stop, one hover target, one
 * destination. There is no second "view case study" link inside it and no tag
 * chips; the tags belong to the case study, and a link inside a link would
 * double every project in the tab order.
 *
 * Two shapes, decided by the data:
 *
 * - With a cover, the reference's row: one full-bleed image spanning the
 *   content column, nothing else visible. The project name still reaches
 *   assistive tech through a visually hidden span, because the alt text
 *   describes the picture, not the project. The cover is one end of the morph
 *   (lessons.md D-017): it lifts off when this row is followed and is landed
 *   on when the case study's `BACK` brings the reader here.
 * - Without one (every project today), a typographic row: number, uppercase
 *   title, tagline, date. A placeholder tile would be a frame promising art
 *   that does not exist (lessons.md T-002).
 *
 * Motion (lessons.md D-017): the entry is a `Reveal` inside the index's
 * `Stagger`, stepped by `index`, and the whole anchor presses on tap. The cover
 * row fades without rising (`y={0}`): its frame is where the morph lands when
 * `BACK` brings the reader here, and the landing box is measured the moment
 * the frame mounts, so a frame still 16px below its resting place would be
 * measured 16px wrong. The parallax inside the frame is `ProjectCover`'s own.
 */
export function WorkIndexEntry({
  project,
  index,
  priority = false,
}: WorkIndexEntryProps) {
  const href = `/work/${project.slug}`;

  const delay = index * STAGGER;

  if (project.cover.src !== null) {
    return (
      <Reveal as="article" y={0} delay={delay}>
        {/* A row this large wants a smaller press than a button: 0.97 of a
            full column reads as a lurch. */}
        <Press className="block" scale={1}>
          <Link
            href={href}
            className="group block pb-2 transition-opacity duration-300 ease-[ease] hover:opacity-90"
          >
            <ProjectCover
              image={project.cover}
              sizes="(min-width: 1024px) 77vw, 100vw"
              priority={priority}
              morph={{ slug: project.slug, departTo: [href] }}
            />
            <span className="u-sr-only">
              {project.title}: {project.tagline}
            </span>
          </Link>
        </Press>
      </Reveal>
    );
  }

  return (
    <Reveal as="article" delay={delay}>
      <Press className="block" scale={1}>
        <Link
          href={href}
          className="group block border-t border-border pt-6 pb-14 transition-opacity duration-300 ease-[ease] hover:opacity-70"
        >
          <div className="flex items-baseline justify-between gap-4">
            <span aria-hidden="true" className="u-pixel-num text-mid-grey">
              &#216;{index + 1}
            </span>
            <span className="u-label-sm text-mid-grey">{project.dateLabel}</span>
          </div>

          <h2 className="mt-3 text-[28px] uppercase leading-[1.1] tracking-[-0.5px] sm:text-title">
            {project.title}
          </h2>

          <p className="mt-4 max-w-[62ch] font-light text-mid-grey">
            {project.tagline}
          </p>
        </Link>
      </Press>
    </Reveal>
  );
}
