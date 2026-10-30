import type { BrandSlug } from "./brands";

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

/**
 * The icon vocabulary (lessons.md D-020). Content names one of these beside a
 * figure and `components/ui/Icon.tsx` draws it; the set is closed so a name
 * can never point at a drawing that does not exist.
 */
export type IconName =
  | "clock"
  | "clock-reduce"
  | "users"
  | "bot"
  | "bots"
  | "calendar"
  | "globe"
  | "map-pin"
  | "store"
  | "chart"
  | "file"
  | "shield"
  | "bolt"
  | "check"
  | "hand-off"
  | "mail"
  | "sheet"
  | "mic"
  | "tag"
  | "layers"
  | "gauge"
  | "refresh"
  | "grid"
  | "briefcase"
  | "lock"
  | "bell"
  | "graduation"
  | "hash"
  | "rocket"
  | "speak"
  | "code"
  | "layout"
  | "server"
  | "database"
  | "wrench"
  | "sparkle"
  | "api"
  | "async"
  | "stream"
  | "anchor"
  | "pipeline"
  | "switch"
  | "funnel"
  | "vector"
  | "mask"
  | "route"
  | "state";

/** A number that survived the rewrite intact. `source` keeps it auditable. */
export interface Metric {
  readonly value: string;
  readonly label: string;
  readonly note?: string;
  /** Drawn above the figure wherever the metric is shown (D-020). */
  readonly icon?: IconName;
}

/** Who owns the work. Employer projects are gated on `approvalStatus` (T-014). */
export type Ownership = "personal" | "employer";

/**
 * Employer work ships only once Web7Labs or Bitbash have signed off on the
 * detail level of that specific case study. Approval does not generalise.
 */
export type ApprovalStatus = "draft" | "approved";

/**
 * The case-study template, as a client reads it (lessons.md D-019): the
 * problem they recognise, what they get, the three things worth seeing in how
 * it was built, and the results. Evidence closes it.
 */
export type CaseStudySectionId =
  | "problem"
  | "delivers"
  | "built"
  | "results"
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
  /** Intrinsic pixels, so next/image can reserve the box before it loads. */
  readonly width?: number;
  readonly height?: number;
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

/* ---------------------------------------------------------------------------
   Diagrams, as data. Each mechanism in a case study names one of these and the
   `diagrams` components draw it inline in the site's own tokens, so a drawing
   is never a raster that goes stale when the palette moves (D-019). Keep the
   labels short: they are set at label size inside a 640px figure.
--------------------------------------------------------------------------- */

export interface FlowStep {
  readonly label: string;
  /** One short line under the label. */
  readonly note?: string;
  /** The step the drawing is about. One per flow, drawn in `--accent`. */
  readonly accent?: boolean;
}

export interface BarSpec {
  readonly label: string;
  /** The figure printed at the end of the bar. */
  readonly value: string;
  /** Bar length as a share of the longer one, 0 to 1. */
  readonly share: number;
}

export interface ExchangeRound {
  readonly from: "left" | "right";
  readonly label: string;
  readonly accent?: boolean;
}

export type DiagramSpec =
  /** Left to right, one arrow between steps. `excluded` draws a crossed-out
      box under the flow for the thing deliberately not in it. */
  | {
      readonly kind: "flow";
      readonly steps: readonly FlowStep[];
      readonly excluded?: string;
    }
  /** One centre, spokes around it. The feature map. */
  | {
      readonly kind: "hub";
      readonly centre: string;
      readonly spokes: readonly string[];
    }
  /** Two horizontal bars: the old way and the new one. */
  | {
      readonly kind: "before-after";
      readonly before: BarSpec;
      readonly after: BarSpec;
    }
  /** Two parties passing offers, with a floor they cannot go under. */
  | {
      readonly kind: "exchange";
      readonly left: string;
      readonly right: string;
      readonly rounds: readonly ExchangeRound[];
      readonly floor: string;
    }
  /** One viewport against a grid of them, each with its count. */
  | {
      readonly kind: "coverage";
      readonly single: { readonly label: string; readonly count: string };
      readonly grid: { readonly label: string; readonly count: string };
    };

/** One thing the user gets. A title a client would say, and one line on it. */
export interface Feature {
  readonly title: string;
  readonly body: string;
  readonly icon: IconName;
}

/** One of the three things worth seeing in how it was built. */
export interface Mechanism {
  readonly title: string;
  /** Two sentences at most. What it does for the user, then how. */
  readonly body: string;
  readonly diagram: DiagramSpec;
  /** One line under the drawing. */
  readonly caption: string;
}

export interface CaseStudy {
  /** The problem, from the user's side. Big left block, smaller right-aligned continuation. */
  readonly problem: { readonly lead: string; readonly aside: string };
  /** What the user gets: a feature map around `centre`, then one line per feature. */
  readonly delivers: {
    readonly intro: string;
    readonly centre: string;
    readonly features: readonly Feature[];
  };
  /** How it was built: three mechanisms, each with its drawing. */
  readonly built: {
    readonly intro: string;
    readonly mechanisms: readonly Mechanism[];
  };
  readonly results: {
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
  /**
   * Shown in place of the Source link when the code is private. It is a
   * sentence, not a control: nothing to click, so T-002 is untouched. Only
   * read when `repo` is null.
   */
  readonly repoNote?: string;
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
  /** Drawn beside the group's label (D-020). */
  readonly icon: IconName;
}

/**
 * What the moving strip draws beside one stack name (D-021): the brand's own
 * mark where it publishes one, a hand-drawn line icon where it does not.
 */
export type StackMark =
  | { readonly kind: "brand"; readonly slug: BrandSlug }
  | { readonly kind: "icon"; readonly name: IconName };

/**
 * The honest placeholder. Prose that is still missing says so rather than
 * inventing a specific — an invented fact is worse than a visible gap.
 */
export const TODO = "TODO: awaiting detail from Haris";
