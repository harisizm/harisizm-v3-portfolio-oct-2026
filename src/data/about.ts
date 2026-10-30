import { projects } from "./projects";
import type { Metric } from "./types";

/**
 * About-page content. Prose, headings and the stat-row inputs live here, not
 * in `src/components/about/` (lessons.md T-010).
 *
 * Every claim is traceable to `./experience.ts` or `./projects.ts`. Nothing is
 * rounded up and nothing is invented. No em or en dashes anywhere a visitor
 * reads (T-015).
 */

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

/** The escalating trio: grey, then ink, then orange (design.md §7.5). */
export type CardTone = "grey" | "ink" | "accent";

export interface ApproachCard {
  readonly num: string;
  readonly title: string;
  readonly body: string;
  readonly tone: CardTone;
}

export interface ResolvedStat extends Metric {
  /** Which case study the number came from, printed so a reader can check it. */
  readonly project: string;
}

export interface AboutContent {
  readonly hero: {
    readonly chip: string;
    /** Set in uppercase by the component (audit A6). Written in sentence case here. */
    readonly heading: string;
    readonly lead: string;
  };
  readonly approach: {
    readonly chip: string;
    readonly heading: string;
    readonly cards: readonly ApproachCard[];
  };
  readonly story: {
    readonly heading: string;
    readonly paragraphs: readonly StoryParagraph[];
  };
  readonly stats: {
    /** Screen-reader heading for the row. Nothing visible carries it. */
    readonly heading: string;
  };
  readonly experience: { readonly chip: string; readonly heading: string; readonly current: string };
  readonly capability: { readonly chip: string; readonly heading: string };
  readonly credentials: {
    readonly educationChip: string;
    readonly certificationChip: string;
    readonly verify: string;
    readonly download: string;
  };
  readonly closing: {
    readonly ruleHeading: string;
    readonly ruleLabel: string;
    readonly panelBody: string;
    readonly panelLabel: string;
  };
}

export const about: AboutContent = {
  hero: {
    chip: "About",
    heading: "I build systems that keep running after launch day.",
    lead:
      "Full-stack software engineer in Lahore, and a final-year Software Engineering student at " +
      "The University of Lahore. I spend my days on the unglamorous half of a live product: " +
      "bookings, payments, sessions, migrations, and the tests that keep them honest.",
  },

  approach: {
    chip: "How I work",
    heading: "Three steps, in this order, every time",
    cards: [
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
          "Tests, migrations and typed boundaries belong in the first version, not a later pass. Tourgenz has no CI pipeline, so its ~2,000 tests are the only thing standing between a refactor and a broken booking. That is why they were written as the features were.",
        tone: "ink",
      },
      {
        num: "Ø3",
        title: "Run it in production",
        body:
          "Shipping is the midpoint, not the finish. I deploy it, watch it, and fix what the logs actually say. That is why the Bitbash pipelines held up over a 24h+ unattended run instead of only surviving a demo.",
        tone: "accent",
      },
    ],
  },

  story: {
    heading: "Final-year student, full-time engineer on a live platform",
    paragraphs: [
      {
        id: "now",
        spans: [
          "I build systems that have to keep working when nobody is watching them. ",
          { text: "Right now that means Tourgenz", emphasis: "strong" },
          ", an AI-powered tourism and booking marketplace for Pakistan that has been live in production since September 2026. I am one of its core engineers at Web7Labs. The parts with my name on them are the booking and payments flow, authentication and sessions, the geospatial layer and the AI trip planner, through to deployment and the monitoring that runs after it.",
        ],
      },
      {
        id: "rigour",
        spans: [
          "There is no CI pipeline on that project, so ",
          { text: "the test suite is the pipeline", emphasis: "strong" },
          ": roughly 2,000 tests across 214 files, on top of 111 hand-written SQL migrations for a PostgreSQL database running PostGIS and pgvector. Seven surfaces ship from that one codebase, a traveller app, five vendor portals and an admin control room, which is why correctness is not negotiable. A booking status change has to mean the same thing in all seven.",
        ],
      },
      {
        id: "before",
        spans: [
          "Before Web7Labs I interned at Bitbash from May to July 2026, where I shipped two automation platforms and then operated them live. One replaced a multi-day manual research process with an automated discovery-to-export pipeline: ",
          { text: "95%+ less manual effort", emphasis: "strong" },
          ", thousands of qualified business leads a day, and a VPS-hosted run that held for 24h+ unattended. The other collected Upwork jobs, pushed hundreds of Discord alerts a day, and turned the same data into SEO pages 70%+ faster than the process it replaced.",
        ],
      },
      {
        id: "degree",
        spans: [
          "I am in the final year of a BS in Software Engineering at The University of Lahore, finishing June 2027. ",
          { text: "The degree is the context; the shipped work is the argument.", emphasis: "em" },
          " The pattern underneath all of it is the same. Find the job somebody does by hand every day, and get it down to ten minutes without asking anyone to trust it blindly. The Web7Labs marketing team's eight-hour, ~300-lead prospecting routine was one of those jobs.",
        ],
      },
      {
        id: "ask",
        spans: [
          "If you have a process that only works because someone remembers to run it, that is the kind of problem I want to hear about.",
        ],
      },
    ],
  },

  stats: { heading: "By the numbers" },

  experience: {
    chip: "Experience",
    heading: "Where the work happened",
    current: "Current role",
  },

  capability: { chip: "Capability", heading: "What I build with" },

  credentials: {
    educationChip: "Education",
    certificationChip: "Certification",
    verify: "Verify credential",
    download: "Download PDF",
  },

  closing: {
    ruleHeading: "The work this all came out of",
    ruleLabel: "All projects",
    panelBody: "Got a process that only works because someone remembers to run it?",
    panelLabel: "Start a project",
  },
};

/**
 * The stat row reads its numbers out of the case studies rather than restating
 * them, so a metric cannot drift between the About page and the project it came
 * from. A label that no longer matches resolves to nothing and the stat is
 * dropped: a missing stat beats a stale one.
 */
const statSources = [
  { slug: "tourgenz", label: "vendor types" },
  { slug: "tourgenz", label: "curated destinations" },
  { slug: "client-hunt", label: "per prospecting run" },
  { slug: "transgpa", label: "students using it" },
] as const;

/* Reads `./projects` directly rather than the `./index` helpers: `index.ts`
   re-exports this file, and importing it back would make the cycle real. */
function findMetric(slug: string, label: string): ResolvedStat | null {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;

  const { results, evidence } = project.caseStudy;
  const pool: readonly Metric[] = [
    ...(results.metrics ?? []),
    ...(evidence.kind === "usage" ? evidence.metrics : []),
  ];

  const match = pool.find((m) => m.label === label);
  return match ? { ...match, project: project.shortTitle } : null;
}

export function resolveStats(): readonly ResolvedStat[] {
  return statSources
    .map(({ slug, label }) => findMetric(slug, label))
    .filter((stat): stat is ResolvedStat => stat !== null);
}
