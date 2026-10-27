/**
 * About-page prose. Content, not layout — kept out of JSX per the project rule,
 * and kept out of `src/data/` only because that folder is owned elsewhere this
 * pass. It should move to `src/data/about.ts` unchanged when that is free.
 *
 * Every claim here is traceable to `src/data/experience.ts` or
 * `src/data/projects.ts`. Nothing is rounded up and nothing is invented.
 */

import { getProject, isUsageEvidence } from "@/data";
import type { Metric } from "@/data";

export const pageHeading = "I build systems that keep running after launch day.";

export const pageLead =
  "Full-stack software engineer in Lahore, and a final-year Software Engineering student at " +
  "The University of Lahore. I spend my days on the unglamorous half of a live product — " +
  "bookings, payments, sessions, migrations, and the tests that keep them honest.";

/**
 * Inline emphasis without HTML in the content layer: the story renders bold
 * pull-phrases and italics from this union, so no component needs
 * `dangerouslySetInnerHTML` and no copy change can inject markup.
 */
export type Span = string | { readonly text: string; readonly emphasis: "strong" | "em" };

export interface StoryParagraph {
  readonly id: string;
  readonly spans: readonly Span[];
}

/** The escalating trio — grey, then ink, then blue (design.md §7.5). */
export type CardTone = "grey" | "ink" | "accent";

export interface ApproachCard {
  readonly num: string;
  readonly title: string;
  readonly body: string;
  readonly tone: CardTone;
}

export const approach = [
  {
    num: "Ø1",
    title: "Time the manual version",
    body:
      "Before any code: what breaks today, how often, and what it costs. Almost everything I have shipped replaced something a person was doing by hand, so the brief starts by timing that person's day rather than by listing features.",
    tone: "grey",
  },
  {
    num: "Ø2",
    title: "Build it so it can be checked",
    body:
      "Tests, migrations and typed boundaries belong in the first version, not a later pass. Tourgenz has no CI pipeline, so its ~2,000 tests are the only thing standing between a refactor and a broken booking — which is exactly why they were written as the feature was.",
    tone: "ink",
  },
  {
    num: "Ø3",
    title: "Run it in production",
    body:
      "Shipping is the midpoint, not the finish. I deploy it, watch it, and fix what the logs actually say. That is why the Bitbash pipelines held up over a 24h+ unattended run instead of only surviving a demo.",
    tone: "accent",
  },
] as const satisfies readonly ApproachCard[];

export const storyHeading = "Final-year student, full-time engineer on a live platform.";

export const story = [
  {
    id: "now",
    spans: [
      "I build systems that have to keep working when nobody is watching them. ",
      { text: "Right now that means Tourgenz", emphasis: "strong" },
      " — an AI-powered tourism and booking marketplace for Pakistan, live in production since September 2026. I am one of its core engineers at Web7Labs, and the parts with my name on them are the booking and payments flow, authentication and sessions, the geospatial layer and the AI trip planner, through to deployment and the monitoring that runs after it.",
    ],
  },
  {
    id: "rigour",
    spans: [
      "There is no CI pipeline on that project, so ",
      { text: "the test suite is the pipeline", emphasis: "strong" },
      ": roughly 2,000 tests across 214 files, on top of 111 hand-written SQL migrations for a PostgreSQL database running PostGIS and pgvector. Seven surfaces ship from that one codebase — a traveller app, five vendor portals and an admin control room — which is why correctness is not negotiable. A booking status change has to mean the same thing in all seven.",
    ],
  },
  {
    id: "before",
    spans: [
      "Before Web7Labs I interned at Bitbash from May to July 2026, where I shipped two automation platforms and then operated them live. One replaced a multi-day manual research process with an automated discovery-to-export pipeline — ",
      { text: "95%+ less manual effort", emphasis: "strong" },
      ", thousands of qualified business leads a day, and a VPS-hosted run that held for 24h+ unattended. The other collected Upwork jobs, pushed hundreds of Discord alerts a day, and turned the same data into SEO pages 70%+ faster than the process it replaced.",
    ],
  },
  {
    id: "degree",
    spans: [
      "I am in the final year of a BS in Software Engineering at The University of Lahore, finishing June 2027. ",
      { text: "The degree is the context; the shipped work is the argument.", emphasis: "em" },
      " The pattern underneath all of it is the same: find the job somebody does by hand every day — the Web7Labs marketing team's eight-hour, ~300-lead prospecting routine was one of them — and get it down to ten minutes without asking anyone to trust it blindly.",
    ],
  },
  {
    id: "ask",
    spans: [
      "If you have a process that only works because someone remembers to run it, that is the kind of problem I want to hear about.",
    ],
  },
] as const satisfies readonly StoryParagraph[];

export interface ResolvedStat extends Metric {
  /** Which case study the number came from, printed so a reader can check it. */
  readonly project: string;
}

/**
 * The stat row reads its numbers out of the case studies rather than restating
 * them, so a metric cannot drift between the About page and the project it came
 * from. A label that no longer matches resolves to nothing and the stat is
 * dropped — a missing stat beats a stale one.
 */
const statSources = [
  { slug: "tourgenz", label: "automated tests" },
  { slug: "tourgenz", label: "hand-written SQL migrations" },
  { slug: "client-hunt", label: "per prospecting run" },
  { slug: "transgpa", label: "students using it" },
] as const;

function findMetric(slug: string, label: string): ResolvedStat | null {
  const project = getProject(slug);
  if (!project) return null;

  const { outcome, evidence } = project.caseStudy;
  const pool: readonly Metric[] = [
    ...(outcome.metrics ?? []),
    ...(isUsageEvidence(evidence) ? evidence.metrics : []),
  ];

  const match = pool.find((m) => m.label === label);
  return match ? { ...match, project: project.shortTitle } : null;
}

export function resolveStats(): readonly ResolvedStat[] {
  return statSources
    .map(({ slug, label }) => findMetric(slug, label))
    .filter((stat): stat is ResolvedStat => stat !== null);
}
