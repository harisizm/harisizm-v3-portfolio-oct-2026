import { TODO, type Project } from "./types";

/**
 * Six case studies, every fact traceable to `assets/docs/cv-2026-10.pdf`.
 *
 * Two rules govern the prose. Where the CV does not say enough to write a
 * section honestly, the section says `TODO` instead of inventing a specific
 * (lessons.md T-003). Where the work belongs to an employer, the copy describes
 * the outcome and the architecture, and the techniques that carry ToS risk stay
 * in `internalNotes` (T-014).
 */
export const projects = [
  {
    slug: "tourgenz",
    title: "Tourgenz: Tourism & Booking Platform",
    shortTitle: "Tourgenz",
    tagline:
      "An AI-powered tourism and booking marketplace for Pakistan: a traveller app, five vendor portals and an admin control room, live in production.",
    order: 1,
    date: "2026-09-01",
    dateLabel: "Live since September 2026",
    durationLabel: "July 2026 to present",
    tags: ["Full-stack", "Production", "Geospatial", "AI"],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript (strict)",
      "Express.js",
      "PostgreSQL",
      "PostGIS",
      "pgvector",
      "Prisma",
      "OpenRouter LLM APIs",
      "MapLibre GL",
      "Tailwind CSS v4",
      "React Query",
      "Zustand",
      "Framer Motion",
      "Vitest",
      "Cloudinary",
    ],
    ownership: "employer",
    employer: "Web7Labs",
    approvalStatus: "draft",
    live: "https://tourgenz.com",
    repo: null, // TODO: user supplying — Web7Labs repo, may stay private
    cover: {
      src: null, // TODO: user supplying — no Tourgenz capture exists in assets/projects
      alt: "The Tourgenz traveller app showing the 3D satellite globe over Pakistan.",
    },
    caseStudy: {
      overview: {
        lead: "Tourgenz is a tourism and booking marketplace for Pakistan. Travellers plan and book on one side, five kinds of vendor run their own portal on the other, and an admin control room sits over both. The price of a booking is negotiated rather than fixed, the map covers the whole country without a metered API key, and the trip planner can only recommend what is actually for sale. It has been in production since September 2026.",
        aside:
          "Core engineer on the platform at Web7Labs, responsible for the booking and payments flow, authentication and sessions, the geospatial layer and the AI trip planner, through to deployment and live monitoring.",
      },
      challenge: {
        intro:
          "A marketplace where the price is negotiated is not a checkout with a different label. Four things made it harder than a fixed-price booking flow.",
        problems: [
          "Travellers name their own price. Every booking is an offer inside configurable discount floors and counter-offer limits, so there is no single moment where a price simply becomes final.",
          "Money moves between travellers, five vendor types and the platform's own commission, and once holds and refunds exist a single balance column cannot represent that.",
          "Map features normally mean a metered API key per environment, and the product needed administrative drill-down across the whole country.",
          "Five user roles reach the same data differently, and there was no CI pipeline to catch a regression before it reached production.",
        ],
        breakingPoint: TODO,
      },
      approach: {
        intro:
          "Each of those got a structural answer rather than a patch at the call site.",
        steps: [
          {
            title: "One tested path for every booking status change",
            body: "Offers, counters, acceptance, cancellation and refunds all pass through a single shared transition path rather than being re-implemented per caller, so the discount and counter limits are enforced in one place.",
            rejected:
              "Per-endpoint status updates would have been faster to write, but the limits would then live in as many places as there are callers.",
          },
          {
            title: "A wallet ledger, not a balance",
            body: "Money is tracked as a ledger with holds and a full audit history, so commissions and refunds can be reconstructed after the fact instead of being inferred from a current total.",
            rejected:
              "A mutable balance per account, which cannot answer why a number changed.",
          },
          {
            title: "A map stack with no API key",
            body: "MapLibre GL over open tile sources carries an interactive 3D satellite globe, with PostGIS doing administrative drill-down across 493 curated destinations. AI-written area insights are precomputed into 8,445 geospatial grid cells and rebuilt automatically after catalog writes through a debounced PostgreSQL queue.",
            rejected:
              "A metered commercial maps provider, which puts a per-environment key and a usage bill in front of a feature the product leans on constantly.",
          },
          {
            title: "A trip planner that can only recommend real inventory",
            body: "The AI trip planner and chat assistant are grounded in the live catalog and restricted to listings that are genuinely bookable, so a suggestion is always something a traveller can act on.",
            rejected:
              "An open-ended model response, which produces confident recommendations for things the marketplace does not sell.",
          },
          {
            title: "Sessions built from scratch, with reuse detection",
            body: "Short-lived access tokens are held in memory and never in localStorage; httpOnly refresh cookies rotate automatically, and a stolen or replayed session signs itself out everywhere. Passwords are bcrypt-hashed and every endpoint checks the role.",
            rejected:
              "Tokens in localStorage, which are convenient and readable by any script that gets onto the page.",
          },
          {
            title: "Reliability without CI",
            body: "Roughly 2,000 automated tests across 214 files run against a separate test database, backed by 111 hand-written SQL migrations for the PostGIS/pgvector schema, input validation on every endpoint and strict TypeScript.",
          },
        ],
      },
      outcome: {
        headline:
          "In production since September 2026, with the test suite standing in for the pipeline that does not exist.",
        body: "The platform serves travellers, five vendor portals and an admin control room off one codebase. The numbers below describe how much of it is held in place by tests, migrations and precomputed data rather than by hand.",
        metrics: [
          {
            value: "~2,000",
            label: "automated tests",
            note: "across 214 files, against a separate test database",
          },
          {
            value: "111",
            label: "hand-written SQL migrations",
            note: "PostGIS + pgvector schema",
          },
          { value: "493", label: "curated destinations" },
          {
            value: "8,445",
            label: "precomputed geospatial grid cells",
            note: "rebuilt after catalog writes via a debounced queue",
          },
          { value: "5", label: "user roles", note: "with per-role access checks" },
        ],
      },
      evidence: {
        kind: "usage",
        headline: "Live production software, not a demo deployment.",
        metrics: [
          { value: "Sept 2026", label: "in production since" },
          {
            value: "7",
            label: "surfaces shipped",
            note: "traveller app, five vendor portals, admin control room",
          },
          { value: "~2,000", label: "tests guarding it" },
        ],
        source: "CV, October 2026. Web7Labs production platform at tourgenz.com.",
      },
      boards: [
        {
          id: "tourgenz-architecture",
          kind: "architecture",
          title: "Platform architecture",
          caption:
            "Traveller app, five vendor portals and the admin control room over one Express/PostgreSQL core.",
          src: null,
          alt: "Architecture diagram of the Tourgenz platform.",
          after: "overview",
        },
        {
          id: "tourgenz-booking-state",
          kind: "state-machine",
          title: "Booking state machine",
          caption:
            "Offer, counter, accept, cancel, refund: every edge through one tested path.",
          src: null,
          alt: "State machine diagram of the Tourgenz booking lifecycle.",
          after: "approach",
        },
        {
          id: "tourgenz-geo-pipeline",
          kind: "data-flow",
          title: "Geospatial rebuild pipeline",
          caption:
            "Catalog write, to debounced queue, to 8,445 regenerated grid cells.",
          src: null,
          alt: "Data-flow diagram of the Tourgenz geospatial precompute pipeline.",
          after: "approach",
        },
        {
          id: "tourgenz-roles",
          kind: "access-matrix",
          title: "Role access matrix",
          caption: "Five roles against the resources each one can reach.",
          src: null,
          alt: "Matrix of the five Tourgenz user roles against their permissions.",
          after: "approach",
        },
        {
          id: "tourgenz-tests",
          kind: "metrics",
          title: "Test surface",
          caption:
            "~2,000 tests across 214 files, and the 111 migrations underneath them.",
          src: null,
          alt: "Panel showing Tourgenz test and migration counts.",
          after: "outcome",
        },
      ],
    },
    internalNotes: [
      "Employer-owned (Web7Labs). Case-study detail level needs explicit sign-off before publishing — T-014.",
      "Repo URL not supplied; likely private.",
    ],
  },

  {
    slug: "instagram-lead-generator",
    title: "Instagram Lead Generator",
    shortTitle: "Lead Generator",
    tagline:
      "An asynchronous discovery-to-export pipeline that turned a multi-day manual research process into thousands of qualified business leads a day.",
    order: 2,
    date: "2026-05-01",
    dateLabel: "2026",
    durationLabel: "May to July 2026",
    tags: ["Backend", "Data engineering", "Automation"],
    stack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "asyncio",
      "React",
      "Playwright",
      "curl_cffi",
      "VPS",
    ],
    ownership: "employer",
    employer: "Bitbash",
    approvalStatus: "draft",
    live: null, // internal client tooling — there is no public deployment to link
    repo: null, // TODO: user supplying — Bitbash-owned
    cover: {
      src: null, // TODO: user supplying
      alt: "The lead generator dashboard showing live KPIs during a collection run.",
    },
    caseStudy: {
      overview: {
        lead: "A client's lead research ran by hand and took days for every list. This replaced it with one pipeline that discovers candidate business profiles, qualifies them against the client's criteria and exports the survivors, start to finish, without anyone watching it. A full 124-hashtag list now clears in a single 24-hour run, and the run survives the crashes and network trouble that a day-long job collects along the way.",
        aside:
          "Built at Bitbash: Python and FastAPI behind an asynchronous collection core, a React dashboard in front of it, and the whole thing running unattended on a VPS.",
      },
      challenge: {
        intro:
          "Collecting at this volume is less a scraping problem than an endurance problem. A run that takes a day has to survive a day.",
        problems: [
          "The manual process spanned multiple days per client list and did not scale with the number of hashtags on it.",
          "A single long run touches far more of the source than any one network identity can sustain, so the collection layer has to spread and back off rather than retry harder.",
          "A crash partway through a 24-hour run cannot mean starting over.",
          "The client needed to see progress and pull results while a run was still going.",
        ],
        breakingPoint: TODO,
      },
      approach: {
        intro:
          "The architecture is three separable stages with a resilience layer underneath all of them.",
        steps: [
          {
            title: "Discovery, qualification and export as separate async stages",
            body: "The pipeline is asynchronous end to end, so discovery keeps running while earlier batches are qualified and written. The stages are independent, which is what lets a failure in one of them be retried without replaying the others.",
            rejected:
              "A single synchronous pass per profile, which idles on network waits and loses everything on an interruption.",
          },
          {
            title: "A resilient egress subsystem",
            body: "Around 25 datacenter proxies sit behind the collector, with reactive rotation and escalating cooldowns, so pressure is spread across the pool and a struggling route is rested rather than hammered. Sessions are presented consistently, so a long run looks like a long run rather than a burst.",
          },
          {
            title: "Crash-resilient fault tolerance",
            body: "Progress is persisted to PostgreSQL as the run proceeds, so an interrupted collection resumes from where it stopped instead of restarting. That is what made a 24h+ unattended run on a VPS realistic.",
            rejected: "Holding run state in memory, which works until the first restart.",
          },
          {
            title: "A dashboard the client can actually operate",
            body: "A secure React + FastAPI dashboard with JWT auth, live KPIs during a run, and streaming CSV export so results can be pulled before the run finishes.",
            rejected:
              "Generating the export only at the end, which makes a long run all-or-nothing for the person waiting on it.",
          },
        ],
      },
      outcome: {
        headline:
          "Up to 10,000 qualified business profiles in 24 hours, with manual effort down by 95%+.",
        body: "A process that had consumed multiple days of research per client list now runs unattended overnight and delivers thousands of qualified leads daily.",
        metrics: [
          { value: "10,000", label: "qualified profiles in 24 hours" },
          {
            value: "124",
            label: "hashtag client list",
            note: "covered in a single run",
          },
          { value: "~25", label: "proxies in the rotation pool" },
          { value: "95%+", label: "reduction in manual effort" },
          { value: "24h+", label: "unattended VPS runtime" },
        ],
      },
      evidence: {
        kind: "usage",
        headline: "Operated in production for a paying client, not benchmarked once.",
        metrics: [
          { value: "10,000", label: "profiles per 24h run" },
          { value: "124", label: "hashtags per client list" },
          { value: "24h+", label: "continuous unattended operation" },
        ],
        source: "CV, October 2026. Bitbash client delivery, May to July 2026.",
      },
      boards: [
        {
          id: "instagram-pipeline",
          kind: "data-flow",
          title: "Discovery to export",
          caption: "The three async stages and where state is persisted between them.",
          src: null,
          alt: "Data-flow diagram of the discovery, qualification and export pipeline.",
          after: "overview",
        },
        {
          id: "instagram-egress",
          kind: "architecture",
          title: "Egress and backoff",
          caption:
            "Pool rotation, reactive cooldown escalation, and the recovery path after a failure.",
          src: null,
          alt: "Diagram of the proxy rotation and cooldown subsystem.",
          after: "approach",
        },
        {
          id: "instagram-throughput",
          kind: "metrics",
          title: "Throughput over a 24-hour run",
          caption: "Qualified profiles against elapsed time for one full client list.",
          src: null,
          alt: "Chart of qualified profiles collected over a 24-hour run.",
          after: "outcome",
        },
      ],
    },
    internalNotes: [
      "Employer-owned (Bitbash). Needs sign-off before publishing — T-014.",
      "Collection layer uses curl_cffi TLS impersonation. Kept out of the public prose deliberately; the copy describes resilience and throughput instead.",
    ],
  },

  {
    slug: "upwork-job-intelligence",
    title: "Upwork Job Intelligence & SEO Publishing Platform",
    shortTitle: "Job Intelligence",
    tagline:
      "An end-to-end pipeline that collects live job postings, filters them with an LLM, generates SEO content and publishes it to a public site.",
    order: 3,
    date: "2026-05-15",
    dateLabel: "2026",
    durationLabel: "May to July 2026",
    tags: ["Backend", "Data engineering", "AI", "Automation"],
    stack: [
      "Python",
      "Electron",
      "Next.js",
      "PostgreSQL",
      "Puppeteer",
      "curl_cffi",
      "GraphQL",
      "Discord",
    ],
    ownership: "employer",
    employer: "Bitbash",
    approvalStatus: "draft",
    live: null, // the generated listing site is the client's property, not linked here
    repo: "https://github.com/harisizm/upwork-seo-bot-and-listing-website",
    cover: {
      src: null, // TODO: user supplying
      alt: "The published SEO listing site generated by the pipeline.",
    },
    caseStudy: {
      overview: {
        lead: "One pipeline carries a job posting from the moment it appears to a published, search-optimised page. It collects the posting, filters it with an LLM, generates listing, service and blog content for it and publishes the result to a Next.js site, while a real-time Discord feed carries the postings worth acting on straight to the team. Two PostgreSQL databases hold the two halves, and a watermark-based sync cron keeps them in step.",
        aside:
          "Built at Bitbash, with an Electron control surface over the collection side and the generated pages served from a public Next.js site that belongs to the client.",
      },
      challenge: {
        intro:
          "Job postings are only valuable while they are fresh, and content about them is only valuable if there is enough of it. Those two pressures pull in opposite directions.",
        problems: [
          "Alerts are worthless late, so collection had to run continuously and keep producing them every day without a person restarting it.",
          "Content generation at one page per posting becomes the bottleneck the moment collection works.",
          "Collection and publication are different systems with different uptime needs, but they share a dataset.",
          "The content step depended on an LLM product for which no API key was available.",
        ],
        breakingPoint: TODO,
      },
      approach: {
        intro:
          "Separating the two halves, then collapsing the expensive step, is what made the throughput possible.",
        steps: [
          {
            title: "Two databases, one watermark",
            body: "Collection and publication own separate PostgreSQL databases and are coordinated by a watermark-based sync cron, so the public site never reads a half-written collection run and neither side can stall the other.",
            rejected:
              "A single shared database, which couples the publishing site's availability to the collector's write load.",
          },
          {
            title: "Resilient live collection",
            body: "Postings are collected as structured records rather than parsed out of rendered HTML, so a layout change on the source does not take the collector down, and the transport layer is built for a collector that runs continuously rather than one restarted by hand each morning.",
            rejected:
              "DOM scraping of the rendered page, which breaks on every layout change and is far slower per posting.",
          },
          {
            title: "LLM filtering before generation",
            body: "Collected postings pass a ChatGPT relevance filter before anything is written, so generation effort lands only on postings that belong on the site.",
          },
          {
            title: "One prompt, four content blocks",
            body: "Content generation was consolidated from several round trips into a single prompt that returns four delimited blocks per job, with listing, service and blog content arriving together. That took one to two minutes off every listing. Because no API key was available, the automation drives the model through a browser session with self-healing auth.",
            rejected:
              "A separate request per content type, which multiplies both latency and the number of places a session can fail.",
          },
          {
            title: "Delivery where the team already was",
            body: "A real-time Discord pipeline pushes hundreds of job alerts daily across multiple niches, so the fresh end of the dataset reaches people without anyone opening a dashboard.",
          },
        ],
      },
      outcome: {
        headline:
          "Hundreds of automated alerts a day, and content generation 70%+ faster.",
        body: "The platform runs the whole route from live posting to published page without a person in it, and the alerting half keeps the team on the postings worth a response while they are still open.",
        metrics: [
          { value: "70%+", label: "faster content creation" },
          {
            value: "1 to 2 min",
            label: "saved per listing",
            note: "from consolidating four content blocks into one prompt",
          },
          {
            value: "100s",
            label: "of job alerts delivered daily",
            note: "across multiple niches",
          },
          {
            value: "2",
            label: "PostgreSQL databases",
            note: "coordinated by a watermark-based sync cron",
          },
        ],
      },
      evidence: {
        kind: "usage",
        headline: "Shipped and operated in production, with the source published.",
        metrics: [
          { value: "100s", label: "of alerts per day" },
          { value: "70%+", label: "faster content creation" },
          { value: "Public", label: "source repository" },
        ],
        source:
          "CV, October 2026. Bitbash, May to July 2026; source at github.com/harisizm/upwork-seo-bot-and-listing-website.",
      },
      boards: [
        {
          id: "upwork-architecture",
          kind: "architecture",
          title: "Collector, sync, publisher",
          caption: "Two databases and the watermark cron that keeps them in step.",
          src: null,
          alt: "Architecture diagram of the collection, sync and publishing halves.",
          after: "overview",
        },
        {
          id: "upwork-prompt",
          kind: "data-flow",
          title: "One prompt, four blocks",
          caption:
            "Before and after the consolidation that removed one to two minutes per listing.",
          src: null,
          alt: "Diagram comparing multi-request and single-prompt content generation.",
          after: "approach",
        },
        {
          id: "upwork-schema",
          kind: "schema",
          title: "Watermark sync",
          caption: "What each database holds, and what crosses between them.",
          src: null,
          alt: "Schema diagram of the two PostgreSQL databases and the sync watermark.",
          after: "approach",
        },
      ],
    },
    internalNotes: [
      "Employer-owned (Bitbash). Needs sign-off before publishing — T-014.",
      "Collection works against a reverse-engineered internal GraphQL API behind Cloudflare Turnstile, using curl_cffi TLS impersonation. Named in the CV, deliberately NOT foregrounded in the public prose, which describes resilient collection and architecture instead.",
      "ChatGPT is driven via Puppeteer with no API key and self-healing session auth. Same treatment: the mechanism stays here, the outcome goes in the copy.",
    ],
  },

  {
    slug: "client-hunt",
    title: "Client Hunt",
    shortTitle: "Client Hunt",
    tagline:
      "A crash-resilient desktop tool that compressed a marketing team's eight-hour prospecting day into about ten minutes.",
    order: 4,
    date: "2026-07-01",
    dateLabel: "2026",
    tags: ["Desktop", "Automation", "Internal tool"],
    stack: ["Python", "SQLite", "Headless Chrome", "Google Maps", "Excel / CSV export"],
    ownership: "employer",
    employer: "Web7Labs",
    approvalStatus: "draft",
    live: null, // an internal desktop tool — there is nothing deployed to link
    repo: null, // TODO: user supplying — Web7Labs internal
    cover: {
      src: null, // TODO: user supplying
      alt: "The Client Hunt desktop window partway through a prospecting run.",
    },
    caseStudy: {
      overview: {
        lead: "The Web7Labs marketing team spent a full working day gathering roughly 300 leads from Google Maps by hand, and did it again for every new area. Client Hunt does the same work in about ten minutes on their own machines. It searches outward across a coordinate grid instead of one viewport at a time, drops the duplicates and records why each one was dropped, and lands the result in the spreadsheet the team already uses.",
        aside:
          "Built for an internal team rather than a client, which changes the design: it has to survive being closed mid-run, and the output has to land in the spreadsheet they already use.",
      },
      challenge: {
        intro:
          "Map-based prospecting is bounded by the viewport, not by the dataset. Searching once returns a fraction of what is there.",
        problems: [
          "A single search covers one area, so broad coverage means many searches and a lot of overlap between them.",
          "Overlapping searches return the same business repeatedly, and a deduplicated list is useless if nobody can see why a row was dropped.",
          "A long run on a desktop machine will be interrupted at some point: the window closes, the laptop sleeps or the connection drops.",
          "The output had to arrive as a spreadsheet the team could use immediately, not as a database to query.",
        ],
        breakingPoint:
          "Eight hours of one person's day for roughly 300 leads, repeated for every new area.",
      },
      approach: {
        intro:
          "Four decisions, all of them about a run surviving contact with a real workday.",
        steps: [
          {
            title: "Coordinate-expansion discovery",
            body: "Rather than one query per area, the tool expands outward across a coordinate grid, so coverage is a function of the area requested instead of whatever one search happened to return.",
            rejected:
              "A single query per search term, which silently caps results at the viewport.",
          },
          {
            title: "SQLite-backed deduplication with reason tags",
            body: "Every candidate is written to a local SQLite store and deduplicated against it, and each dropped row carries the reason it was dropped. The team can audit the filter instead of trusting it.",
            rejected:
              "In-memory deduplication, which loses both the dedupe state and the reasoning on restart.",
          },
          {
            title: "Crash resilience as a default, not a feature",
            body: "Because state is on disk from the first row, closing the tool mid-run costs nothing. The next run continues against what is already stored.",
          },
          {
            title: "One-click Excel/CSV export",
            body: "Output lands directly as Excel or CSV, in the shape the marketing team's existing process already expects.",
            rejected:
              "A dashboard, which would have been more to build and would have put a second tool between the team and the spreadsheet they actually work in.",
          },
        ],
      },
      outcome: {
        headline: "An eight-hour manual day became roughly ten minutes.",
        body: "The team's prospecting routine, around 300 leads gathered by hand over a full day, now runs as a single unattended pass, with deduplication and export included rather than done afterwards.",
        metrics: [
          { value: "8h → ~10 min", label: "per prospecting run" },
          {
            value: "~300",
            label: "leads per manual day",
            note: "the baseline it replaced",
          },
          { value: "~48×", label: "faster", note: "on the team's own routine" },
        ],
      },
      evidence: {
        kind: "usage",
        headline: "In daily use by the Web7Labs marketing team.",
        metrics: [
          { value: "~10 min", label: "to replace a full working day" },
          { value: "~300", label: "leads per run, deduplicated" },
        ],
        source: "CV, October 2026. Web7Labs internal tooling.",
      },
      boards: [
        {
          id: "client-hunt-expansion",
          kind: "data-flow",
          title: "Coordinate expansion",
          caption:
            "How one search area becomes a grid of queries, and where the overlap falls.",
          src: null,
          alt: "Diagram of coordinate-expansion discovery across a search area.",
          after: "approach",
        },
        {
          id: "client-hunt-dedupe",
          kind: "schema",
          title: "Dedupe store and reason tags",
          caption: "The local SQLite shape, and what each rejection reason means.",
          src: null,
          alt: "Schema diagram of the SQLite deduplication store.",
          after: "approach",
        },
        {
          id: "client-hunt-before-after",
          kind: "measurement",
          title: "Eight hours against ten minutes",
          caption: "The manual routine and the automated run on the same timeline.",
          src: null,
          alt: "Before-and-after timeline comparing manual prospecting with Client Hunt.",
          after: "outcome",
        },
      ],
    },
    internalNotes: [
      "Employer-owned (Web7Labs). Needs sign-off before publishing — T-014.",
      "Built for the internal marketing team, so any screenshot may contain real client lead data — check before publishing a capture.",
    ],
  },

  {
    slug: "transgpa",
    title: "TransGPA: Academic Transcript Analyzer & CGPA Simulator",
    shortTitle: "TransGPA",
    tagline:
      "A privacy-first transcript analyzer used by 100+ students that parses academic PDFs in the browser and never uploads them.",
    order: 5,
    date: "2026-01-01",
    dateLabel: "January 2026",
    tags: ["Frontend", "Product", "Privacy"],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Recharts", "pdf.js"],
    ownership: "personal",
    approvalStatus: "approved",
    live: "https://trans-gpa-uol.vercel.app",
    repo: null, // TODO: user supplying — the V2-era repo URL now 404s
    cover: {
      src: null, // TODO: re-export assets/projects/Transgpa.png to WebP under /public first
      alt: "The TransGPA dashboard showing a simulated CGPA across semesters.",
    },
    caseStudy: {
      overview: {
        lead: "Students work out what grades they need by hand, or by pasting a transcript into whatever tool is nearest. TransGPA reads the transcript PDF inside the browser, shows the picture across semesters, and lets a student edit the grades ahead and watch the projected CGPA move. The document never leaves their machine: there is no upload, no server-side parser and nothing stored. Over 100 students have used it.",
        aside:
          "Self-initiated, built for students at the University of Lahore and deployed publicly on Vercel. The parse finishes in under two seconds because there is no server round trip to wait for.",
      },
      challenge: {
        intro:
          "An academic transcript is a sensitive document, and the obvious architecture for parsing one is the wrong one.",
        problems: [
          "Uploading a transcript to a server means storing it, and storing it means being responsible for it.",
          "A parse that happens on a server adds a round trip to every attempt, which is fatal for a tool whose whole point is trying scenarios quickly.",
          "A simulation is only useful if the result appears while the student is still thinking about the input.",
        ],
        breakingPoint: TODO,
      },
      approach: {
        intro: "One decision determined the rest of the design.",
        steps: [
          {
            title: "Parse locally, store nothing",
            body: "pdf.js reads the transcript entirely in the browser. There is no upload endpoint and no server-side storage, so the privacy guarantee is structural rather than a policy sentence.",
            rejected:
              "A server-side parser, which is easier to iterate on but makes the tool a custodian of other people's academic records.",
          },
          {
            title: "Simulation as the primary interaction",
            body: "Grades are editable in place and the projected CGPA updates as they change. The question students actually have is what they need next semester, and it is answered by direct manipulation rather than a form submission.",
          },
          {
            title: "Charts that carry the state, not decorate it",
            body: "Recharts dashboards show performance across semesters, with simulated values rendered against the real history so the gap between the two is visible.",
          },
        ],
      },
      outcome: {
        headline:
          "Used by 100+ students, parsing a transcript in under two seconds with nothing leaving the browser.",
        body: "The local-parse decision turned out to be the feature: the tool is fast because there is no round trip, and trustworthy because there is nothing to trust it with.",
        metrics: [
          { value: "100+", label: "students using it" },
          { value: "<2s", label: "local PDF parse" },
          { value: "0", label: "bytes stored server-side" },
        ],
      },
      evidence: {
        kind: "usage",
        headline: "Real students, real transcripts, publicly deployed.",
        metrics: [
          { value: "100+", label: "students" },
          { value: "<2s", label: "to first result" },
        ],
        source: "CV, October 2026; live at trans-gpa-uol.vercel.app",
      },
      boards: [
        {
          id: "transgpa-dataflow",
          kind: "data-flow",
          title: "Where the document goes",
          caption:
            "File picker, parser, chart, and the server that is not in the diagram.",
          src: null,
          alt: "Data-flow diagram showing transcript parsing entirely client-side.",
          after: "approach",
        },
        {
          id: "transgpa-parse-time",
          kind: "measurement",
          title: "Under two seconds, measured",
          caption:
            "Parse timing for a real transcript, shown as a measurement rather than a claim.",
          src: null,
          alt: "Measurement panel showing local PDF parse timing under two seconds.",
          after: "outcome",
        },
      ],
    },
  },

  {
    slug: "khilariverse",
    title: "Khilariverse: E-commerce Gaming Peripherals Store",
    shortTitle: "Khilariverse",
    tagline:
      "A full-stack MERN storefront with 100+ products, role-based access and the admin analytics a catalog that size needs to stay manageable.",
    order: 6,
    date: "2025-12-01",
    dateLabel: "December 2025",
    tags: ["Full-stack", "E-commerce"],
    stack: [
      "MongoDB",
      "Express.js",
      "React (Vite)",
      "Node.js",
      "Redux Toolkit",
      "Tailwind CSS",
      "Cloudinary",
    ],
    ownership: "personal",
    approvalStatus: "approved",
    live: "https://khilariverse.vercel.app",
    repo: "https://github.com/harisizm/Khilariverse",
    cover: {
      src: null, // TODO: re-export assets/projects/Khilariverse.png to WebP under /public first
      alt: "The Khilariverse storefront listing gaming peripherals.",
    },
    caseStudy: {
      overview: {
        lead: "A gaming peripherals store built end to end: storefront, catalog, orders, and the admin side that makes a catalog of 100+ products something one person can actually run. Customers and admins read the same API at different levels of access, five analytics modules report sales, inventory and order tracking, and image storage and transactional email are automated so that neither turns into a daily chore.",
        aside:
          "Self-initiated, on the MERN stack, with the source public and the store deployed on Vercel. The part worth reading is the operator's side rather than the storefront.",
      },
      challenge: {
        intro:
          "Storefronts are the easy part of e-commerce. The work is everything an owner has to do after the first order.",
        problems: [
          "A catalog of 100+ products is unmanageable without inventory and sales visibility.",
          "Admins and customers need the same data at different levels of access, from the same API.",
          "Product images and transactional email are the two jobs that quietly become manual work if they are not automated from the start.",
        ],
        breakingPoint: TODO,
      },
      approach: {
        intro:
          "Build the operator's side as a first-class surface rather than an afterthought.",
        steps: [
          {
            title: "Role-based access across one API",
            body: "Customers and admins read the same resources through the same endpoints, with access decided by role rather than by which client is asking.",
          },
          {
            title: "Five admin analytics modules",
            body: "Sales, inventory and order tracking are reported in the admin surface, so catalog decisions are made against numbers rather than impressions.",
          },
          {
            title: "Automate the two recurring chores",
            body: "Cloudinary handles image storage and transformation, and transactional email is delivered automatically. Those are the two jobs that otherwise turn into daily manual work.",
            rejected:
              "Storing and resizing images on the app server, which makes every deploy carry the media with it.",
          },
        ],
      },
      outcome: {
        headline: "A 100+ product storefront with the operational surface to run it.",
        body: "The store works as a storefront, but the part worth showing is the admin side: five analytics modules and fully automated media and email, which is what keeps a catalog that size from becoming a second job.",
        metrics: [
          { value: "100+", label: "products in the catalog" },
          {
            value: "5+",
            label: "admin analytics modules",
            note: "sales, inventory, order tracking",
          },
          {
            value: "100%",
            label: "automated image storage and transactional email",
          },
        ],
      },
      evidence: {
        kind: "usage",
        headline: "Publicly deployed, full stack, with the source open.",
        metrics: [
          { value: "100+", label: "products" },
          { value: "5+", label: "analytics modules" },
        ],
        source:
          "CV, October 2026; live at khilariverse.vercel.app, source at github.com/harisizm/Khilariverse",
      },
      boards: [
        {
          id: "khilariverse-schema",
          kind: "schema",
          title: "Catalog and order model",
          caption:
            "Products, variants, orders, and the role boundary that cuts across them.",
          src: null,
          alt: "Schema diagram of the Khilariverse data model.",
          after: "approach",
        },
        {
          id: "khilariverse-admin",
          kind: "interface",
          title: "The admin surface",
          caption: "The five analytics modules as the operator sees them.",
          src: null,
          alt: "Screenshot of the Khilariverse admin analytics modules.",
          after: "outcome",
        },
      ],
    },
  },
] as const satisfies readonly Project[];

export type ProjectSlug = (typeof projects)[number]["slug"];
