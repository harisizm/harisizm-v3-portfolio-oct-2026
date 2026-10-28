import type { Metadata } from "next";
import { Stagger } from "@/components/motion";
import {
  RAIL_CELL,
  RAIL_GRID,
  WorkIndexEntry,
  WorkIndexRail,
} from "@/components/work";
import { sortedProjects } from "@/data";

/**
 * The work index — teardown §6.3.
 *
 * Curated strength order, not chronology: V2 listed Jan 2026 → Aug 2025 →
 * Dec 2025 and was neither (design.md §10). `approvedProjects()` is the
 * pre-launch publication gate for employer work and deliberately is not used
 * here — every case study has to be reviewable while it is still a draft
 * (lessons.md T-014).
 *
 * The rows are one `Stagger` (lessons.md D-017): a shared trigger, each row
 * stating its own step. `amount` is low because the list is several screens
 * tall and the default fifth of it would never be in view at once.
 */
const projects = sortedProjects();

export const metadata: Metadata = {
  title: "Work",
  description: `${projects.length} case studies: the constraint each project started from, the decisions behind it, and what changed.`,
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work",
    description: `${projects.length} case studies: the constraint each project started from, the decisions behind it, and what changed.`,
    url: "/work",
  },
};

export default function WorkIndexPage() {
  return (
    <main>
      {/* The grid overlay is mounted once in app/layout.tsx; the rail cell
          draws its own solid divider (audit E5). */}
      <div className={RAIL_GRID}>
        <div className={RAIL_CELL}>
          <WorkIndexRail count={projects.length} />
        </div>

        <Stagger className="min-w-0 lg:pt-14" amount={0.1}>
          {projects.map((project, index) => (
            <WorkIndexEntry
              key={project.slug}
              project={project}
              index={index}
              priority={index === 0}
            />
          ))}
        </Stagger>
      </div>
    </main>
  );
}
