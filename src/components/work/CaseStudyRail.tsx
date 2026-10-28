import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/data";
import { RailNav, type RailSection } from "./RailNav";
import { TagChip } from "./TagChip";

export interface CaseStudyRailProps {
  project: Project;
  sections: readonly RailSection[];
}

/**
 * The sticky left rail — design.md §9.2, audit E2.
 *
 * Desktop: a full-height sticky column that persists for the whole scroll, with
 * the identity block at the top and the scroll-spy nav pinned to the bottom.
 * Everything in it is the body face: `‹ BACK` at 18px, the title uppercase at
 * the 48px heading size, the tagline at 18px light, the links uppercase 16px
 * with an icon in front, the way the reference sets `VIEW LIVE`.
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
    <div className="pt-8 lg:sticky lg:top-[var(--header-h)] lg:flex lg:h-[calc(100svh-var(--header-h))] lg:flex-col lg:justify-between lg:py-14">
      <div>
        <Link
          href="/work"
          className="u-label-lg inline-flex min-h-11 items-center gap-2 text-ink transition-opacity duration-300 ease-[ease] hover:opacity-70"
        >
          <span aria-hidden="true">&lsaquo;</span>
          Back
        </Link>

        <h1 className="mt-1 text-[32px] uppercase leading-[1.1] tracking-[-1px] sm:text-title lg:text-heading">
          {project.shortTitle}
        </h1>

        {/* Mobile only: the desktop meta block carries these below the cover. */}
        <div className="mt-3 flex flex-wrap gap-x-2 gap-y-2 lg:hidden">
          {project.tags.map((tag) => (
            <TagChip key={tag}>{tag}</TagChip>
          ))}
        </div>

        <p className="mt-4 max-w-[48ch] font-light text-mid-grey lg:max-w-[30ch]">
          {project.tagline}
        </p>

        {project.live !== null || project.repo !== null ? (
          <div className="mt-4 flex flex-wrap gap-x-6">
            {project.live !== null ? (
              <RailLink href={project.live} label="View live" icon={<GlobeIcon />} />
            ) : null}
            {project.repo !== null ? (
              <RailLink href={project.repo} label="Source" icon={<GitHubIcon />} />
            ) : null}
          </div>
        ) : null}

        {/* Private code gets a sentence where the Source link would be. Plain
            text on purpose: a greyed-out link would be the V2 dead control. */}
        {project.repo === null && project.repoNote !== undefined ? (
          <p className="mt-3 flex max-w-[30ch] items-start gap-2 text-label-sm text-mid-grey">
            <GitHubIcon />
            <span>{project.repoNote}</span>
          </p>
        ) : null}
      </div>

      <RailNav sections={sections} className="mt-12 hidden lg:mt-0 lg:block" />
    </div>
  );
}

function RailLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="u-label inline-flex min-h-11 items-center gap-2 text-accent transition-opacity duration-300 ease-[ease] hover:opacity-70"
    >
      {icon}
      {label}
    </a>
  );
}

/* Both icons are decorative: the label beside them is the accessible name. */
function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="shrink-0"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
