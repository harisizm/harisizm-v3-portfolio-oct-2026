/**
 * The content layer's front door. Components import from `@/data` and never
 * reach into a file here directly, so a reshuffle of the data files does not
 * ripple into JSX (lessons.md T-010).
 */

export * from "./types";
export { projects, type ProjectSlug } from "./projects";
export { experience, education, certifications } from "./experience";
export { skills, type SkillGroupId } from "./skills";
export * from "./about";
export * from "./enquiry";
export { processSteps, type ProcessStep } from "./process";

import { projects } from "./projects";
import type {
  Board,
  CaseStudySectionId,
  Evidence,
  Project,
  Testimonial,
  UsageEvidence,
} from "./types";

/** Scroll-spy nav for the case-study template, in document order. */
export const caseStudySections = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "The Challenge" },
  { id: "approach", label: "The Approach" },
  { id: "outcome", label: "The Outcome" },
  { id: "evidence", label: "Evidence" },
] as const satisfies readonly { id: CaseStudySectionId; label: string }[];

/**
 * Curated strength order — the lineup leads with production work, which is not
 * the same as leading with the most recent commit (lessons.md D-010).
 */
export function sortedProjects(): readonly Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

/** Chronological, newest first. For the archive view and structured data. */
export function projectsByDate(): readonly Project[] {
  return [...projects].sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Employer work ships only once that specific case study has been signed off
 * (T-014). Call this for anything publicly routable; `projects` itself stays
 * complete so drafts remain previewable.
 */
export function approvedProjects(): readonly Project[] {
  return sortedProjects().filter((p) => p.approvalStatus === "approved");
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function allSlugs(): readonly string[] {
  return sortedProjects().map((p) => p.slug);
}

/**
 * Previous and next in the curated order, wrapping at both ends — a case study
 * always offers a way onward rather than dead-ending (design.md §9.2).
 */
export function adjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const ordered = sortedProjects();
  const i = ordered.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  const len = ordered.length;
  return {
    prev: ordered[(i - 1 + len) % len] ?? null,
    next: ordered[(i + 1) % len] ?? null,
  };
}

/**
 * Boards that follow a given section and actually have an artefact behind them.
 * A board with a null `src` is a plan, not content, and does not render (T-002).
 */
export function boardsAfter(
  project: Project,
  section: CaseStudySectionId,
): readonly Board[] {
  return project.caseStudy.boards.filter(
    (b) => b.after === section && b.src !== null,
  );
}

export function isTestimonial(evidence: Evidence): evidence is Testimonial {
  return evidence.kind === "testimonial";
}

export function isUsageEvidence(evidence: Evidence): evidence is UsageEvidence {
  return evidence.kind === "usage";
}
export { heroLines, heroTyping, type HeroLine, type HeroSegment } from "./hero";
