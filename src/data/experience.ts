import type { Certification, EducationEntry, ExperienceRole } from "./types";

/**
 * Work history, verbatim in substance from `assets/docs/cv-2026-10.pdf`.
 *
 * The CV already dropped V2's two non-technical roles; the site follows the CV,
 * not V2 (lessons.md T-004). `end: null` marks the current role so the label is
 * never a hardcoded "Present" string that outlives the job.
 */
export const experience = [
  {
    id: "web7labs",
    company: "Web7Labs",
    title: "Full-Stack Software Engineer",
    start: "2026-07-01",
    end: null,
    dateLabel: "July 2026 – Present",
    location: "Lahore, Pakistan",
    summary:
      "Core engineer on Tourgenz, an AI-powered tourism and booking marketplace for Pakistan, live in production since September 2026 — a traveller app, five vendor portals and an admin control room.",
    highlights: [
      "Built Tourgenz's booking and payments flow, authentication and sessions, geospatial layer and AI trip planner, through to deployment and live production monitoring.",
      "Kept the platform reliable without a CI pipeline: ~2,000 automated tests across 214 files and 111 hand-written SQL migrations for the PostGIS/pgvector database.",
      "Built Client Hunt for the Web7Labs marketing team, compressing their eight-hour manual prospecting day (~300 leads) into roughly ten minutes.",
    ],
    projectSlugs: ["tourgenz", "client-hunt"],
  },
  {
    id: "bitbash",
    company: "Bitbash",
    title: "Software Engineering Intern",
    start: "2026-05-01",
    end: "2026-07-31",
    dateLabel: "May 2026 – July 2026",
    location: "Lahore, Pakistan",
    summary:
      "Shipped two production automation platforms — a lead-generation pipeline and a job intelligence and SEO publishing system — then operated them live, including a VPS-hosted service running unattended for 24h+.",
    highlights: [
      "Built an Instagram lead-generation platform that replaced a multi-day manual research process with a fully automated discovery-to-export pipeline, cutting manual effort by 95%+ while delivering thousands of qualified business leads daily.",
      "Engineered a resilient Upwork job collection and alerting system with a real-time Discord delivery pipeline pushing hundreds of automated alerts daily across multiple niches.",
      "Built a ChatGPT content pipeline converting collected jobs into SEO listing, service and blog pages, 70%+ faster than the process it replaced.",
    ],
    projectSlugs: ["instagram-lead-generator", "upwork-job-intelligence"],
  },
] as const satisfies readonly ExperienceRole[];

/** No CGPA on the site — the degree is context, not the argument. */
export const education = [
  {
    id: "uol",
    institution: "The University of Lahore",
    qualification: "BS Software Engineering",
    dateLabel: "Expected June 2027",
    location: "Lahore, Pakistan",
  },
] as const satisfies readonly EducationEntry[];

export const certifications = [
  {
    id: "coursera-supervised-ml",
    title: "Supervised Machine Learning Specialization",
    issuer: "Coursera · Stanford Online · DeepLearning.AI",
    verifyUrl: "https://coursera.org/share/542313d84f1815a93b7e0398c4b8c1fe",
    // TODO: publish assets/docs/coursera-supervised-ml-certificate.pdf under /public
    file: null,
  },
] as const satisfies readonly Certification[];
