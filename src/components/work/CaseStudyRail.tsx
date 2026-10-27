import Link from "next/link";
import { Chip } from "@/components/ui";
import type { Project } from "@/data";
import { RailNav, type RailSection } from "./RailNav";

export interface CaseStudyRailProps {
  project: Project;
  sections: readonly RailSection[];
}

/**
 * The sticky left rail — design.md §9.2.
 *
 * Desktop: a full-height sticky column that persists for the whole scroll, with
 * the identity block at the top and the scroll-spy nav pinned to the bottom.
 *
 * Mobile: the same markup, un-sticky, collapsed to a static header with the tag
 * chips the desktop layout keeps in the meta block (teardown §6.5). The nav is
 * dropped here and `ScrollProgress` takes its place.
 *
 * `VIEW LIVE` and the repo link render only when the data has a URL. Null means
 * no control at all — V2 shipped a "Live Demo" button pointing at `#` that
 * scrolled to the top, which is the single defect this repo exists to not repeat
 * (lessons.md T-002).
 */
export function CaseStudyRail({ project, sections }: CaseStudyRailProps) {
  return (
    <div className="pt-8 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:py-14">
      <div>
        <Link
          href="/work"
          className="u-label inline-flex min-h-11 items-center gap-2 text-mid-grey transition-opacity duration-300 ease-[ease] hover:opacity-70"
        >
          <span aria-hidden="true">&lsaquo;</span>
          Back
        </Link>

        <h1 className="mt-2 text-[32px] leading-[1.1] tracking-[-1px] sm:text-title lg:text-heading">
          {project.shortTitle}
        </h1>

        {/* Mobile only: the desktop meta block carries these below the cover. */}
        <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
          {project.tags.map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </div>

        <p className="mt-4 max-w-[48ch] text-mid-grey lg:max-w-[34ch]">
          {project.tagline}
        </p>

        {project.live !== null || project.repo !== null ? (
          <div className="mt-4 flex flex-wrap gap-x-6">
            {project.live !== null ? (
              <RailLink href={project.live} label="View live" />
            ) : null}
            {project.repo !== null ? (
              <RailLink href={project.repo} label="Source" />
            ) : null}
          </div>
        ) : null}
      </div>

      <RailNav sections={sections} className="mt-12 hidden lg:mt-0 lg:block" />
    </div>
  );
}

function RailLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="u-label inline-flex min-h-11 items-center gap-2 text-accent transition-opacity duration-300 ease-[ease] hover:opacity-70"
    >
      {label}
      <span aria-hidden="true">&#8599;</span>
    </a>
  );
}
