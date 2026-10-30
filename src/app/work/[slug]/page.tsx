import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BoardStrip,
  BuiltSection,
  CaseStudyRail,
  DeliversSection,
  EvidenceSection,
  NextUp,
  ProblemSection,
  ProjectCover,
  ProjectMeta,
  RAIL_CELL,
  RAIL_GRID,
  ResultsSection,
  ScrollProgress,
  hasPublishableEvidence,
} from "@/components/work";
import {
  adjacentProjects,
  allSlugs,
  boardsAfter,
  caseStudySections,
  getProject,
} from "@/data";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Every project, including the employer drafts. `approvedProjects()` gates
 * publication, not routing — a case study that cannot be opened locally cannot
 * be reviewed, and review is what the gate is waiting on (lessons.md T-014).
 */
export function generateStaticParams(): { slug: string }[] {
  return allSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const url = `/work/${project.slug}`;

  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.tagline,
      url,
      // No cover, no OG image entry — an image URL that 404s is worse than none.
      ...(project.cover.src !== null
        ? { images: [{ url: project.cover.src, alt: project.cover.alt }] }
        : {}),
    },
  };
}

/**
 * The case study — design.md §9.2. The page the whole site exists to deliver.
 *
 * A Server Component end to end. The only client code is the rail's scroll-spy
 * nav and the mobile progress indicator, both of which need `useScrollSpy`.
 *
 * Section order and ids come from `caseStudySections`, which is also what drives
 * the spy — one list, so a section can never exist without a nav entry or the
 * other way round. Evidence drops out of both together when there is nothing
 * publishable in the slot.
 *
 * The nav shows the short form of each label ("Problem", not "The
 * Problem"): the reference's rail reads Overview / Challenge / Strategy while
 * the section headings keep their article (audit E2). Only the display label
 * changes; the ids the spy and the anchors use are untouched.
 *
 * The sections are the client-facing template from lessons.md D-019: the
 * problem, what you get, how it was built, the results, then evidence.
 */
export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { caseStudy } = project;
  const showEvidence = hasPublishableEvidence(caseStudy.evidence);
  const sections = caseStudySections
    .filter((section) => section.id !== "evidence" || showEvidence)
    .map((section) => ({
      id: section.id,
      label: section.label.replace(/^The /, ""),
    }));
  const { next } = adjacentProjects(project.slug);

  return (
    <main>
      {/* The reference drops its scroll-spy entirely below 1024px, on a
          nine-screen page. This replaces it (design.md §9.2, lessons.md T-007). */}
      <ScrollProgress sections={sections} className="lg:hidden" />

      {/* The grid overlay is mounted once in app/layout.tsx; the rail cell
          draws its own solid divider (audit E5). */}
      <div className={RAIL_GRID}>
        <div className={RAIL_CELL}>
          <CaseStudyRail project={project} sections={sections} />
        </div>

        <div className="min-w-0 lg:pt-14">
          <ProjectCover
            image={project.cover}
            sizes="(min-width: 1024px) 77vw, 100vw"
            priority
            className="mt-8 lg:mt-0"
            /* The other end of the cover morph: landed on from a card or an
               index row, lifted off again by either `BACK` link. */
            morph={{ slug: project.slug, departTo: ["/work"] }}
          />

          <ProjectMeta project={project} />

          <ProblemSection problem={caseStudy.problem} />
          <BoardStrip boards={boardsAfter(project, "problem")} />

          <DeliversSection delivers={caseStudy.delivers} />
          <BoardStrip boards={boardsAfter(project, "delivers")} />

          <BuiltSection built={caseStudy.built} />
          <BoardStrip boards={boardsAfter(project, "built")} />

          <ResultsSection results={caseStudy.results} />
          <BoardStrip boards={boardsAfter(project, "results")} />

          {showEvidence ? (
            <EvidenceSection evidence={caseStudy.evidence} />
          ) : null}
          <BoardStrip boards={boardsAfter(project, "evidence")} />
        </div>
      </div>

      <NextUp next={next} />
    </main>
  );
}
