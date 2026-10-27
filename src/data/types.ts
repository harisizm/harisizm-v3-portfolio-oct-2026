/**
 * Shapes for the content layer. Nothing here renders; every component reads
 * these types rather than an object literal inside its own file (lessons.md T-010).
 */

/**
 * An image the site may not have yet. `src` is nullable because several case
 * studies are being written before their art exists — a null source renders no
 * image frame at all rather than a broken one (T-002).
 */
export interface ImageRef {
  readonly src: string | null;
  readonly alt: string;
  readonly width?: number;
  readonly height?: number;
}

/** A number that survived the rewrite intact. `source` keeps it auditable. */
export interface Metric {
  readonly value: string;
  readonly label: string;
  readonly note?: string;
}

/** Who owns the work. Employer projects are gated on `approvalStatus` (T-014). */
export type Ownership = "personal" | "employer";

/**
 * Employer work ships only once Web7Labs or Bitbash have signed off on the
 * detail level of that specific case study. Approval does not generalise.
 */
export type ApprovalStatus = "draft" | "approved";

export type CaseStudySectionId =
  | "overview"
  | "challenge"
  | "approach"
  | "outcome"
  | "evidence";

export type BoardKind =
  | "architecture"
  | "schema"
  | "data-flow"
  | "state-machine"
  | "access-matrix"
  | "metrics"
  | "measurement"
  | "interface";

/**
 * A craft-evidence artefact that sits between prose sections — a diagram, a
 * measurement panel, a before/after. `src` is null until the artefact is drawn;
 * a board with no source does not render.
 */
export interface Board {
  readonly id: string;
  readonly kind: BoardKind;
  readonly title: string;
  readonly caption: string;
  readonly src: string | null;
  readonly alt: string;
  /** The section this board follows in the scroll. */
  readonly after: CaseStudySectionId;
}

/**
 * The closing slot. A real testimonial and metric-based proof share one union so
 * a quote can drop in later without a component changing (lessons.md D-014).
 * No testimonial exists yet and none is to be written (T-003).
 */
export interface UsageEvidence {
  readonly kind: "usage";
  readonly headline: string;
  readonly metrics: readonly Metric[];
  /** Where the numbers came from, so a reader can challenge them. */
  readonly source: string;
  readonly artifacts?: readonly ImageRef[];
}

export interface Testimonial {
  readonly kind: "testimonial";
  readonly quote: string;
  readonly author: string;
  readonly authorRole: string;
  readonly company: string;
  readonly avatar?: ImageRef;
  /** ISO date the quote was given. */
  readonly collectedOn: string;
  /** Nothing publishes without this true, whatever the approval status says. */
  readonly permissionToPublish: boolean;
}

export type Evidence = Testimonial | UsageEvidence;

export interface ApproachStep {
  readonly title: string;
  readonly body: string;
  /** What was rejected and why — the part that makes the step an argument. */
  readonly rejected?: string;
}

export interface CaseStudy {
  /** Big left block, then the smaller right-aligned continuation. */
  readonly overview: { readonly lead: string; readonly aside: string };
  readonly challenge: {
    readonly intro: string;
    readonly problems: readonly string[];
    readonly breakingPoint: string;
  };
  readonly approach: {
    readonly intro: string;
    readonly steps: readonly ApproachStep[];
  };
  readonly outcome: {
    readonly headline: string;
    readonly body: string;
    readonly metrics?: readonly Metric[];
  };
  readonly evidence: Evidence;
  readonly boards: readonly Board[];
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  /** Used in the sticky rail and the "next up" card, where the full title wraps. */
  readonly shortTitle: string;
  readonly tagline: string;
  /** Curated strength order, 1 = strongest. Not the same as chronology. */
  readonly order: number;
  /**
   * Sort key only. Where the CV gives a period rather than a date, this is the
   * first day of that period; `dateLabel` is what the site actually prints.
   */
  readonly date: string;
  readonly dateLabel: string;
  readonly durationLabel?: string;
  readonly tags: readonly string[];
  readonly stack: readonly string[];
  readonly ownership: Ownership;
  readonly employer?: string;
  readonly approvalStatus: ApprovalStatus;
  /** null ⇒ the View Live control does not render. V2 shipped one pointing at "#". */
  readonly live: string | null;
  /** null ⇒ no repo control. Never guess a URL to fill this. */
  readonly repo: string | null;
  readonly cover: ImageRef;
  readonly caseStudy: CaseStudy;
  /**
   * Never rendered. Technical detail that is true but carries ToS or
   * client-perception risk in public copy, kept beside the project so the
   * approval conversation has it (T-014).
   */
  readonly internalNotes?: readonly string[];
}

export interface ExperienceRole {
  readonly id: string;
  readonly company: string;
  readonly title: string;
  readonly start: string;
  /** null ⇒ current role. */
  readonly end: string | null;
  readonly dateLabel: string;
  readonly location: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  /** Case studies produced in this role, by slug. */
  readonly projectSlugs: readonly string[];
}

export interface EducationEntry {
  readonly id: string;
  readonly institution: string;
  readonly qualification: string;
  readonly dateLabel: string;
  readonly location: string;
}

export interface Certification {
  readonly id: string;
  readonly title: string;
  readonly issuer: string;
  readonly verifyUrl: string | null;
  /** Local copy, null until it is published under /public. */
  readonly file: string | null;
}

export interface SkillGroup {
  readonly id: string;
  readonly label: string;
  readonly items: readonly string[];
}

/**
 * The honest placeholder. Prose that is still missing says so rather than
 * inventing a specific — an invented fact is worse than a visible gap.
 */
export const TODO = "TODO: awaiting detail from Haris";
