import type { Project } from "./types";

/**
 * Six case studies, written for the client who will read them (lessons.md
 * D-019): the problem they recognise, what the product gives its users, the
 * three parts of the build worth seeing, and the results. Every number is
 * traceable to `assets/docs/cv-2026-10.pdf` or to a screenshot in `public/`.
 *
 * Where the work belongs to an employer, the techniques that carry ToS risk
 * stay in `internalNotes` and out of the prose (T-014). No em or en dashes
 * anywhere a visitor reads (T-015).
 */
export const projects = [
  {
    slug: "tourgenz",
    title: "Tourgenz: Tourism & Booking Platform",
    shortTitle: "Tourgenz",
    tagline:
      "Pakistan's whole trip in one place. Travellers name their price, five kinds of vendor answer, and an AI planner you can talk to only suggests what is really for sale.",
    order: 1,
    date: "2026-09-01",
    dateLabel: "Live since September 2026",
    durationLabel: "July 2026 to present",
    tags: ["Marketplace", "AI planner", "Production"],
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
    approvalStatus: "approved",
    live: "https://tourgenz.com",
    repo: null,
    repoNote: "Oops, this one cannot be public. Client constraints.",
    cover: {
      src: "/projects/tourgenz.webp",
      width: 1800,
      height: 1125,
      alt: "The Tourgenz traveller app showing the 3D satellite globe over Pakistan.",
    },
    caseStudy: {
      problem: {
        lead: "Planning a trip in Pakistan meant five separate searches: a hotel, a car, a guide, an operator and somewhere to eat, each with its own phone call and a price that was never quite final. Travellers wanted one place to plan and book the whole thing. Vendors wanted somewhere to answer an offer instead of losing the customer. The business running it needed to see all of that at once.",
        aside:
          "Core engineer at Web7Labs, responsible for booking and payments, sign-in, the map, the AI planner and the live deployment at tourgenz.com.",
      },
      delivers: {
        intro:
          "One marketplace for the whole trip, built for the people on both sides of it.",
        centre: "Tourgenz",
        features: [
          {
            title: "Name your price",
            icon: "tag",
            body: "A traveller offers what the trip is worth to them, the vendor accepts or counters, and the booking closes at a price both agreed to.",
          },
          {
            title: "An AI planner you can talk to",
            icon: "speak",
            body: "Say where you want to go and for how long. The planner builds an itinerary out of listings that are actually available to book.",
          },
          {
            title: "Five kinds of vendor in one place",
            icon: "store",
            body: "Hotels, transport, tour guides, tour operators and restaurants, each with their own portal for listings, offers and bookings.",
          },
          {
            title: "A map of the whole country",
            icon: "map-pin",
            body: "A 3D satellite globe with 493 curated destinations and an area insight written for each one.",
          },
          {
            title: "An admin control room",
            icon: "layers",
            body: "Every booking, payment and vendor visible from one place, with staff logins the owner creates and limits screen by screen.",
          },
          {
            title: "Money that adds up",
            icon: "sheet",
            body: "Holds, refunds and commissions recorded as a full history, so every balance on the platform can be explained.",
          },
        ],
      },
      built: {
        intro: "Three parts of the build are worth a closer look.",
        mechanisms: [
          {
            title: "The bidding engine",
            body: "A traveller's offer goes to the vendor, who can accept it or counter, and the admin sets a floor no offer can go under. Every step takes the same tested path, so a price can never be agreed outside the rules.",
            diagram: {
              kind: "exchange",
              left: "Traveller",
              right: "Vendor",
              rounds: [
                { from: "left", label: "Makes an offer" },
                { from: "right", label: "Counters" },
                { from: "left", label: "Accepts", accent: true },
              ],
              floor: "Floor set by the admin",
            },
            caption:
              "Offer, counter, accept. The floor is set by the admin and the engine never lets an offer below it through.",
          },
          {
            title: "A planner that only suggests what you can book",
            body: "Before the planner or the chat assistant answers, it looks up the live catalogue and writes only from what came back. A suggestion is always a real listing with a real price, never something the marketplace does not sell.",
            diagram: {
              kind: "flow",
              steps: [
                { label: "You ask", note: "three days in Hunza" },
                { label: "Catalogue search", note: "live, bookable only", accent: true },
                { label: "Itinerary", note: "from real listings" },
                { label: "Book it" },
              ],
            },
            caption:
              "Retrieval first, answer second. The model only writes from what the catalogue returned.",
          },
          {
            title: "Voice in, plan out",
            body: "A traveller can speak the request instead of typing it. Speech becomes text in the browser and goes to the same planner, so talking and typing give the same answer.",
            diagram: {
              kind: "flow",
              steps: [
                { label: "Speak", note: "in the browser", accent: true },
                { label: "Speech to text" },
                { label: "Planner" },
                { label: "Itinerary" },
              ],
            },
            caption:
              "No separate voice product. The spoken request joins the typed one at the planner.",
          },
        ],
      },
      results: {
        headline:
          "Live since September 2026, with travellers, five vendor types and the admin team on one platform.",
        body: "Seven surfaces run off one codebase: the traveller app, five vendor portals and the admin control room. The booking and payment flow is covered by roughly 2,000 automated tests, so a change never breaks a booking that is already live.",
        metrics: [
          { value: "5", label: "vendor types", icon: "store", note: "on one marketplace" },
          { value: "493", label: "curated destinations", icon: "map-pin" },
          {
            value: "7",
            label: "surfaces shipped", icon: "layers",
            note: "traveller app, five vendor portals, admin control room",
          },
          {
            value: "~2,000",
            label: "automated tests", icon: "shield",
            note: "guarding bookings and payments",
          },
        ],
      },
      evidence: {
        kind: "usage",
        headline: "Live production software, not a demo deployment.",
        metrics: [
          { value: "Sept 2026", label: "in production since", icon: "calendar" },
          {
            value: "7",
            label: "surfaces shipped", icon: "layers",
            note: "traveller app, five vendor portals, admin control room",
          },
          { value: "~2,000", label: "tests guarding it", icon: "shield" },
        ],
        source: "CV, October 2026. Web7Labs production platform at tourgenz.com.",
      },
      boards: [],
    },
    internalNotes: [
      "Employer-owned (Web7Labs). Case-study detail level needs explicit sign-off before publishing — T-014.",
      "Repo URL not supplied; likely private.",
      "The planner is grounded by vector retrieval over the catalogue (pgvector). Written as 'looks up the live catalogue' in public copy.",
    ],
  },

  {
    slug: "instagram-lead-generator",
    title: "Instagram Lead Generator",
    shortTitle: "Lead Generator",
    tagline:
      "Overnight lead research. A list of qualified businesses with contact details, up to 10,000 in a day, from a run nobody has to watch.",
    order: 2,
    date: "2026-05-01",
    dateLabel: "2026",
    durationLabel: "May to July 2026",
    tags: ["Lead generation", "Automation", "Dashboard"],
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
    approvalStatus: "approved",
    live: null, // internal client tooling — there is no public deployment to link
    repo: null,
    repoNote: "Oops, this one cannot be public. Client constraints.",
    cover: {
      src: "/projects/instagram/dashboard.webp",
      width: 1299,
      height: 812,
      alt: "The lead generator dashboard showing live KPIs during a collection run.",
    },
    caseStudy: {
      problem: {
        lead: "The client's team was building lead lists by hand: search a hashtag, open each profile, judge it, copy the details into a sheet. One client list took days, and the next one took days again. They did not need a faster person. They needed the list to be waiting for them in the morning.",
        aside:
          "Built at Bitbash: the collection engine, the dashboard and the export, running unattended on a server.",
      },
      delivers: {
        intro: "Start a run in the evening and open a spreadsheet in the morning.",
        centre: "Lead Generator",
        features: [
          {
            title: "Qualified, not just found",
            icon: "check",
            body: "Every profile is checked against the client's criteria, such as follower range, category and whether an email was found, before it makes the list.",
          },
          {
            title: "Contact details included",
            icon: "mail",
            body: "Emails where they exist, with the profile and the hashtag it came from, so the list is ready to work the moment it opens.",
          },
          {
            title: "Start it and walk away",
            icon: "refresh",
            body: "A run survives a day of network trouble and restarts on its own. Nobody sits with it.",
          },
          {
            title: "Watch it live",
            icon: "gauge",
            body: "A dashboard with live counts for the last fifteen minutes, the last hour and the day.",
          },
          {
            title: "Pull results early",
            icon: "sheet",
            body: "Filter by hashtag, follower range or email found, and export to CSV while the run is still going.",
          },
          {
            title: "Whole lists at once",
            icon: "hash",
            body: "Import a 124-hashtag client list as one file and let the queue work through it overnight.",
          },
        ],
      },
      built: {
        intro: "Three things make a day-long run something you can leave alone.",
        mechanisms: [
          {
            title: "Three ways to fetch, so one bad hour never stops it",
            body: "Each profile is fetched the quick way first, a slower way if that is refused, and with a real browser only if both fail. The run keeps moving on whichever way is working that hour.",
            diagram: {
              kind: "flow",
              steps: [
                { label: "Quick request" },
                { label: "Slower parse", note: "if refused" },
                { label: "Real browser", note: "if refused again" },
                { label: "Profile collected", accent: true },
              ],
            },
            caption:
              "Three tiers, one outcome. A refusal on one tier is a handoff, not a failure.",
          },
          {
            title: "Progress saved as it goes",
            body: "Every batch is written to the database the moment it finishes. If the server restarts at three in the morning, the run picks up at the last batch instead of the beginning.",
            diagram: {
              kind: "flow",
              steps: [
                { label: "Batch done" },
                { label: "Saved at once", accent: true },
                { label: "Restart at 3am" },
                { label: "Resumes", note: "from the last batch" },
              ],
            },
            caption: "Nothing is held in memory that would be lost on a restart.",
          },
          {
            title: "Paced like a person, spread across many routes",
            body: "Requests are spread across about 25 routes, and a route that starts being refused is rested rather than pushed harder. That is what lets one run last 24 hours.",
            diagram: {
              kind: "hub",
              centre: "Collector",
              spokes: [
                "~25 routes",
                "Rest a refused route",
                "Back off, never hammer",
                "Steady sessions",
                "24h+ per run",
              ],
            },
            caption:
              "Spread the load, rest what is struggling. The run looks like a long day, not a burst.",
          },
        ],
      },
      results: {
        headline:
          "Up to 10,000 qualified profiles in 24 hours. Days of work, cut by 95%.",
        body: "A process that took the team days per client list now runs overnight on its own and delivers thousands of qualified, contactable leads a day.",
        metrics: [
          { value: "10,000", label: "qualified profiles in 24 hours", icon: "users" },
          {
            value: "124",
            label: "hashtag client list", icon: "hash",
            note: "covered in a single run",
          },
          { value: "95%+", label: "less manual effort", icon: "hand-off" },
          { value: "24h+", label: "running unattended", icon: "refresh" },
        ],
      },
      evidence: {
        kind: "usage",
        headline: "Operated in production for a paying client, not benchmarked once.",
        metrics: [
          { value: "10,000", label: "profiles per 24h run", icon: "users" },
          { value: "124", label: "hashtags per client list", icon: "hash" },
          { value: "24h+", label: "continuous unattended operation", icon: "refresh" },
        ],
        source: "CV, October 2026. Bitbash client delivery, May to July 2026.",
      },
      boards: [
        {
          id: "instagram-hashtag-queue",
          kind: "interface",
          title: "The hashtag queue",
          caption:
            "Every target hashtag with its state and live lead count. Pending, active, paused and failed at a glance, and a whole client list imported as one file.",
          src: "/projects/instagram/hashtag-queue.webp",
          width: 869,
          height: 365,
          alt: "The hashtag queue screen listing scraping targets with status badges and lead counts.",
          after: "delivers",
        },
        {
          id: "instagram-export",
          kind: "interface",
          title: "Export while it runs",
          caption:
            "Filter by hashtag, follower range and whether an email was found, then stream the result straight to CSV. This is the file the client actually opens.",
          src: "/projects/instagram/export.webp",
          width: 1279,
          height: 550,
          alt: "The export screen with filters and a completed streaming download of 965 leads.",
          after: "delivers",
        },
        {
          id: "instagram-fetch-fallbacks",
          kind: "data-flow",
          title: "The three tiers, as built",
          caption:
            "How one profile is fetched: a direct request first, a parse when that is refused, a real browser only when both fail.",
          src: "/projects/instagram/fetch-fallbacks.webp",
          width: 1145,
          height: 774,
          alt: "Flowchart of the three fetching tiers and the failure paths between them.",
          after: "built",
        },
        {
          id: "instagram-tier-usage",
          kind: "measurement",
          title: "Which tier did the work",
          caption:
            "Each batch records which tier fetched it and how many requests were refused. These numbers are what the pacing rules were tuned against.",
          src: "/projects/instagram/tier-usage.webp",
          width: 960,
          height: 325,
          alt: "Usage summaries showing attempts, successes and refusals per fetching tier for each job.",
          after: "built",
        },
        {
          id: "instagram-throughput",
          kind: "metrics",
          title: "175 leads in fifteen minutes",
          caption:
            "The dashboard on the first full day: 175 qualified profiles in the last fifteen minutes, 291 in the hour, 922 across the day.",
          src: "/projects/instagram/175-per-15-min.webp",
          width: 1279,
          height: 305,
          alt: "Dashboard KPIs reading 175 leads in the last 15 minutes and 922 in the last 24 hours.",
          after: "results",
        },
      ],
    },
    internalNotes: [
      "Employer-owned (Bitbash). Needs sign-off before publishing — T-014.",
      "Collection layer uses curl_cffi TLS impersonation and ~25 datacenter proxies with reactive rotation. Kept out of the public prose deliberately; the copy says 'routes' and describes pacing instead.",
    ],
  },

  {
    slug: "upwork-job-intelligence",
    title: "Upwork Job Intelligence & SEO Publishing Platform",
    shortTitle: "Job Intelligence",
    tagline:
      "The right Upwork jobs in the team's Discord minutes after they are posted, and a public site that writes an article for each one.",
    order: 3,
    date: "2026-05-15",
    dateLabel: "2026",
    durationLabel: "May to July 2026",
    tags: ["Alerts", "AI content", "Automation"],
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
    approvalStatus: "approved",
    live: null, // the generated listing site is the client's property, not linked here
    repo: "https://github.com/harisizm/upwork-seo-bot-and-listing-website",
    cover: {
      src: "/projects/upwork/home.webp",
      width: 1424,
      height: 890,
      alt: "The published SEO listing site generated by the pipeline.",
    },
    caseStudy: {
      problem: {
        lead: "A job posting is worth bidding on for about an hour, and the ones worth it are buried among hundreds that are not. The sales team was refreshing searches by hand and still arriving late. The content site they wanted around those jobs would have needed a writer for every page.",
        aside:
          "Built at Bitbash: the collector and its desktop control panel, the alert feed and the public Next.js site, with the source published.",
      },
      delivers: {
        intro: "Two things a sales team wants from the same stream of postings.",
        centre: "Job Intelligence",
        features: [
          {
            title: "Alerts in Discord, minutes after posting",
            icon: "bell",
            body: "Hundreds a day across the team's niches, delivered where they already talk.",
          },
          {
            title: "Only the ones worth a bid",
            icon: "check",
            body: "Every posting is judged by an AI filter against the team's criteria before anything is sent or written.",
          },
          {
            title: "A site that writes itself",
            icon: "file",
            body: "Each selected job becomes a listing, a service page and a blog article, published without a writer touching it.",
          },
          {
            title: "Runs every day on its own",
            icon: "refresh",
            body: "Collection keeps going without someone restarting it each morning.",
          },
          {
            title: "A control panel",
            icon: "gauge",
            body: "A desktop app to start, pause and watch the collection side.",
          },
        ],
      },
      built: {
        intro: "Three parts of the build are worth a closer look.",
        mechanisms: [
          {
            title: "From posting to published page",
            body: "A new posting is collected, judged by the AI filter, and if it passes it is sent to Discord and written up as four pages. The whole route runs without a person in it.",
            diagram: {
              kind: "flow",
              steps: [
                { label: "New posting" },
                { label: "AI filter", note: "worth a bid?", accent: true },
                { label: "Alert to Discord" },
                { label: "Four pages written" },
                { label: "Published" },
              ],
            },
            caption:
              "The filter sits before everything expensive, so effort only lands on postings that belong.",
          },
          {
            title: "Four pages from one pass",
            body: "Instead of asking the model four times per job, one request returns the listing, the service page, the blog post and the job page together. That took one to two minutes off every listing and made content 70% faster.",
            diagram: {
              kind: "before-after",
              before: { label: "Four separate requests", value: "4 round trips", share: 1 },
              after: { label: "One request, four blocks", value: "1 round trip", share: 0.25 },
            },
            caption: "One to two minutes saved per listing, every listing.",
          },
          {
            title: "Two halves that cannot stall each other",
            body: "Collecting and publishing run on separate databases, kept in step by a sync that records how far it got. The public site never shows a half-finished run, and a busy collector never slows the site.",
            diagram: {
              kind: "flow",
              steps: [
                { label: "Collector" },
                { label: "Collection data" },
                { label: "Sync", note: "remembers how far it got", accent: true },
                { label: "Publishing data" },
                { label: "Public site" },
              ],
            },
            caption: "The sync carries a watermark, so nothing crosses twice and nothing is missed.",
          },
        ],
      },
      results: {
        headline: "Hundreds of alerts a day, content 70% faster, and nobody in the loop.",
        body: "The platform runs the whole route from live posting to published page on its own, and the alert feed keeps the team on the postings worth a response while they are still open.",
        metrics: [
          {
            value: "100s",
            label: "of job alerts a day", icon: "bell",
            note: "across multiple niches",
          },
          { value: "70%+", label: "faster content creation", icon: "bolt" },
          {
            value: "1 to 2 min",
            label: "saved per listing", icon: "clock",
            note: "four pages from one request",
          },
          { value: "4", label: "pages per job", icon: "file", note: "listing, service, blog, job" },
        ],
      },
      evidence: {
        kind: "usage",
        headline: "Shipped and operated in production, with the source published.",
        metrics: [
          { value: "100s", label: "of alerts per day", icon: "bell" },
          { value: "70%+", label: "faster content creation", icon: "bolt" },
          { value: "Public", label: "source repository", icon: "globe" },
        ],
        source:
          "CV, October 2026. Bitbash, May to July 2026; source at github.com/harisizm/upwork-seo-bot-and-listing-website.",
      },
      boards: [
        {
          id: "upwork-generated-blog",
          kind: "interface",
          title: "One job, one article",
          caption:
            "A blog post generated from a single job listing and published on the public site, with the original post linked from the article details. The text is the pipeline's own output, untouched.",
          src: "/projects/upwork/generated-blog.webp",
          width: 1380,
          height: 500,
          alt: "A generated blog article on the public listing site, with an article details panel linking to the original job post.",
          after: "delivers",
        },
        {
          id: "upwork-recent-blogs",
          kind: "interface",
          title: "The public site",
          caption:
            "Recent articles on the listing site. Every card here began as a job posting a few hours earlier. Nobody wrote these pages by hand.",
          src: "/projects/upwork/recent-blogs.webp",
          width: 1385,
          height: 415,
          alt: "The recent blogs section of the listing site showing three generated SEO articles.",
          after: "delivers",
        },
        {
          id: "upwork-jobs-table",
          kind: "schema",
          title: "Jobs selected",
          caption:
            "The publishing side after a sync: each selected job with its campaign and title, and the watermark tables beside it that let the two halves agree on what has already crossed.",
          src: "/projects/upwork/jobs-table.webp",
          width: 1067,
          height: 310,
          alt: "pgAdmin showing the jobs_selected table with eight rows and the sync watermark tables in the schema tree.",
          after: "built",
        },
        {
          id: "upwork-products-table",
          kind: "schema",
          title: "Four pages per job",
          caption:
            "One row per job, holding the generated page content. Blog, service, product and job pages come from the same single request, split into four blocks.",
          src: "/projects/upwork/products-table.webp",
          width: 1070,
          height: 310,
          alt: "pgAdmin showing the product table with generated page content keyed by job id.",
          after: "built",
        },
      ],
    },
    internalNotes: [
      "Employer-owned (Bitbash). Needs sign-off before publishing — T-014.",
      "Collection works against a reverse-engineered internal GraphQL API behind Cloudflare Turnstile, using curl_cffi TLS impersonation. Named in the CV, deliberately NOT foregrounded in the public prose.",
      "ChatGPT is driven via Puppeteer with no API key and self-healing session auth. Same treatment: the mechanism stays here, the outcome goes in the copy.",
    ],
  },

  {
    slug: "client-hunt",
    title: "Client Hunt",
    shortTitle: "Client Hunt",
    tagline:
      "A marketing team's eight-hour prospecting day, done in about ten minutes, finding businesses a plain search never shows.",
    order: 4,
    date: "2026-07-01",
    dateLabel: "2026",
    tags: ["Lead generation", "Desktop tool", "Internal tool"],
    stack: ["Python", "SQLite", "Headless Chrome", "Google Maps", "Excel / CSV export"],
    ownership: "employer",
    employer: "Web7Labs",
    approvalStatus: "approved",
    live: null, // an internal desktop tool — there is nothing deployed to link
    repo: null,
    repoNote: "Oops, this one cannot be public. Client constraints.",
    cover: {
      src: "/projects/client-hunt/dashboard.webp",
      width: 1440,
      height: 900,
      alt: "The Client Hunt window after a finished run: the search form, a progress panel reading 17 of 17 places collected, and the activity log.",
    },
    caseStudy: {
      problem: {
        lead: "Finding businesses to call meant searching Google Maps one area at a time, scrolling, copying names and numbers into a sheet, then doing it again for the next area. A full day produced about 300 leads, and a plain search only ever showed a fraction of what was there.",
        aside:
          "Built at Web7Labs for the marketing team's own machines, so it has to survive a closed laptop and land in the spreadsheet they already use.",
      },
      delivers: {
        intro: "Type an area, press start, open the spreadsheet.",
        centre: "Client Hunt",
        features: [
          {
            title: "A day in ten minutes",
            icon: "clock-reduce",
            body: "One run covers an area the team used to spend a working day on.",
          },
          {
            title: "Finds what a search misses",
            icon: "grid",
            body: "Johar Town: a plain search showed 33 businesses. Client Hunt found 164.",
          },
          {
            title: "No duplicate calls",
            icon: "check",
            body: "Repeats are kept but flagged with the reason and tinted in the sheet, so nobody phones the same hostel twice.",
          },
          {
            title: "Straight into Excel",
            icon: "sheet",
            body: "Name, phone, address, rating, reviews and category, one sheet per area, filterable from the first open.",
          },
          {
            title: "Close the laptop, lose nothing",
            icon: "shield",
            body: "Progress is on disk from the first row. The next run continues from where it stopped.",
          },
        ],
      },
      built: {
        intro: "Three decisions, all about a run surviving a real workday.",
        mechanisms: [
          {
            title: "Searching outward instead of once",
            body: "A map search only returns what fits in one view. Client Hunt lays a grid over the area and searches every cell, so coverage follows the area you asked for rather than whatever one search happened to show.",
            diagram: {
              kind: "coverage",
              single: { label: "One search", count: "33 found" },
              grid: { label: "A grid of searches", count: "164 found" },
            },
            caption: "Johar Town, measured. The grid reaches what one viewport never shows.",
          },
          {
            title: "Every repeat explained",
            body: "Each business found is checked against everything already saved. A repeat is kept in the table with a plain-language reason, and the export tints it, so the team decides what a repeat is worth instead of trusting a filter.",
            diagram: {
              kind: "flow",
              steps: [
                { label: "Business found" },
                { label: "Checked", note: "against everything saved", accent: true },
                { label: "Kept, or flagged", note: "with the reason" },
                { label: "Tinted in the sheet" },
              ],
            },
            caption: "Nothing is silently dropped. A flagged row still shows up, with its reason beside it.",
          },
          {
            title: "Saved from the first row",
            body: "Every row is written to disk the moment it is found. Closing the window mid-run costs nothing, because the next run continues against what is already stored.",
            diagram: {
              kind: "flow",
              steps: [
                { label: "Row found" },
                { label: "Written to disk", note: "at once", accent: true },
                { label: "Laptop closes" },
                { label: "Next run continues" },
              ],
            },
            caption: "Reliability on an ordinary office laptop, not a server.",
          },
        ],
      },
      results: {
        headline: "An eight-hour day became about ten minutes.",
        body: "The team's prospecting routine, around 300 leads gathered by hand over a full day, now runs as one unattended pass with the duplicates flagged and the spreadsheet ready at the end.",
        metrics: [
          { value: "8h → ~10 min", label: "per prospecting run", icon: "clock-reduce" },
          {
            value: "164",
            label: "businesses found in Johar Town", icon: "grid",
            note: "a plain search showed 33",
          },
          {
            value: "~300",
            label: "leads per manual day", icon: "users",
            note: "the baseline it replaced",
          },
          { value: "~48×", label: "faster", icon: "bolt", note: "on the team's own routine" },
        ],
      },
      evidence: {
        kind: "usage",
        headline: "In daily use by the Web7Labs marketing team.",
        metrics: [
          { value: "~10 min", label: "to replace a full working day", icon: "clock-reduce" },
          { value: "~300", label: "leads per run, deduplicated", icon: "users" },
        ],
        source: "CV, October 2026. Web7Labs internal tooling.",
      },
      boards: [
        {
          id: "client-hunt-export",
          kind: "interface",
          title: "What lands in the spreadsheet",
          caption:
            "One sheet per area with name, phone, address, rating, review count and category, headers bold and filterable, repeats tinted so nobody calls the same hostel twice. Phone digits are masked here.",
          src: "/projects/client-hunt/sample-export.webp",
          width: 1400,
          height: 520,
          alt: "A trimmed sample of the Excel export with masked phone numbers.",
          after: "delivers",
        },
        {
          id: "client-hunt-searches",
          kind: "measurement",
          title: "Six areas, timed",
          caption:
            "The run history as the team sees it. Johar Town: 164 places found and saved in 5 minutes 43 seconds. Khayaban-e-Amin: 152 in 4 minutes 43.",
          src: "/projects/client-hunt/searches.webp",
          width: 855,
          height: 630,
          alt: "The searches table listing six finished runs with places found, places saved and time taken, beside the export filters.",
          after: "results",
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
      "What grades do I need next semester? A student drops in their transcript and gets the answer live, and the file never leaves their laptop.",
    order: 5,
    date: "2026-01-01",
    dateLabel: "January 2026",
    tags: ["Students", "Privacy", "Product"],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Recharts", "pdf.js"],
    ownership: "personal",
    approvalStatus: "approved",
    live: "https://trans-gpa-uol.vercel.app",
    repo: null,
    repoNote: "Oops, the code for this one is not public.",
    cover: {
      src: "/projects/transgpa.webp",
      width: 2000,
      height: 1250,
      alt: "The TransGPA dashboard showing a simulated CGPA across semesters.",
    },
    caseStudy: {
      problem: {
        lead: "Every semester a student asks the same question: what do I need to get to reach the CGPA I want? Working it out by hand is slow and easy to get wrong. Pasting a transcript into whatever website comes up first means handing a private academic record to a stranger.",
        aside:
          "Self-initiated for students at the University of Lahore, deployed publicly, and used by more than 100 of them.",
      },
      delivers: {
        intro: "Drop in the transcript. Change a grade. Watch the answer move.",
        centre: "TransGPA",
        features: [
          {
            title: "The whole picture in two seconds",
            icon: "file",
            body: "Every semester and every course read from the PDF and charted before the student has finished sitting down.",
          },
          {
            title: "Change a grade, watch the CGPA move",
            icon: "bolt",
            body: "Edit the grades ahead and the projection updates as you type. The question is answered by trying, not by submitting a form.",
          },
          {
            title: "The file never leaves your laptop",
            icon: "lock",
            body: "Parsed in the browser. No upload, no account, nothing stored anywhere.",
          },
          {
            title: "Charts that show the gap",
            icon: "chart",
            body: "Projected results drawn against real history, so the distance to the target is visible rather than a number.",
          },
        ],
      },
      built: {
        intro: "One decision shaped the rest: the transcript stays where it is.",
        mechanisms: [
          {
            title: "Reads the PDF where it sits",
            body: "The transcript is read by the browser itself, so there is no upload and no server copy to protect. The privacy promise is built into how it works, not written in a policy.",
            diagram: {
              kind: "flow",
              steps: [
                { label: "Transcript PDF" },
                { label: "Read in the browser", accent: true },
                { label: "Charts" },
              ],
              excluded: "A server. Not involved.",
            },
            caption: "The server is not in the drawing because it is not in the product.",
          },
          {
            title: "Answered as you type",
            body: "Grades are editable in place and every change recalculates the projection immediately. A student can try ten scenarios in the time a form would take to submit once.",
            diagram: {
              kind: "flow",
              steps: [
                { label: "Edit a future grade" },
                { label: "Recalculated", note: "at once", accent: true },
                { label: "Charts redraw" },
              ],
            },
            caption: "No submit button. The projection follows the edit.",
          },
          {
            title: "Fast because there is nowhere to go",
            body: "With no round trip to a server, the parse finishes in under two seconds. The privacy decision turned out to be the speed decision as well.",
            diagram: {
              kind: "before-after",
              before: { label: "Upload, parse on a server, wait", value: "Round trip", share: 1 },
              after: { label: "Parsed locally", value: "Under 2 seconds", share: 0.25 },
            },
            caption: "Measured on a real transcript, not estimated.",
          },
        ],
      },
      results: {
        headline:
          "Used by 100+ students, with an answer in under two seconds and nothing stored anywhere.",
        body: "The local-parse decision became the whole product: fast because there is no round trip, and trusted because there is nothing to trust it with.",
        metrics: [
          { value: "100+", label: "students using it", icon: "graduation" },
          { value: "<2s", label: "to first result", icon: "bolt" },
          { value: "0", label: "files stored", icon: "lock", note: "anywhere, ever" },
        ],
      },
      evidence: {
        kind: "usage",
        headline: "Real students, real transcripts, publicly deployed.",
        metrics: [
          { value: "100+", label: "students", icon: "graduation" },
          { value: "<2s", label: "to first result", icon: "bolt" },
        ],
        source: "CV, October 2026; live at trans-gpa-uol.vercel.app",
      },
      boards: [
        {
          id: "transgpa-upload",
          kind: "interface",
          title: "Nothing leaves the browser",
          caption:
            "The entry point. A transcript is dropped onto the page and read right there; the line under the drop zone is the whole privacy model in one sentence.",
          src: "/projects/transgpa/upload.webp",
          width: 1400,
          height: 843,
          alt: "The TransGPA landing page with the transcript drop zone and the note that files are processed locally.",
          after: "delivers",
        },
        {
          id: "transgpa-calculator",
          kind: "interface",
          title: "Simulate, then watch the charts move",
          caption:
            "Semesters and courses are editable in place, and the trend, grade distribution and credit-load charts on the right recompute as a grade changes.",
          src: "/projects/transgpa/calculator.webp",
          width: 1365,
          height: 640,
          alt: "The GPA calculator with an editable semester table and performance analytics charts beside it.",
          after: "delivers",
        },
        {
          id: "transgpa-parse-time",
          kind: "measurement",
          title: "Under two seconds, measured",
          caption: "Parse timing for a real transcript, shown as a measurement rather than a claim.",
          src: "/diagrams/transgpa/transgpa-parse-time.svg",
          width: 1200,
          height: 750,
          alt: "Measurement panel showing local PDF parse timing under two seconds.",
          after: "results",
        },
      ],
    },
  },

  {
    slug: "khilariverse",
    title: "Khilariverse: E-commerce Gaming Peripherals Store",
    shortTitle: "Khilariverse",
    tagline:
      "A gaming peripherals store with 100+ products that one person can run: the shop for customers, and the dashboards, stock and automation for the owner.",
    order: 6,
    date: "2025-12-01",
    dateLabel: "December 2025",
    tags: ["E-commerce", "Storefront", "Admin"],
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
      src: "/projects/khilariverse.webp",
      width: 2000,
      height: 1250,
      alt: "The Khilariverse storefront listing gaming peripherals.",
    },
    caseStudy: {
      problem: {
        lead: "A storefront is the easy half of a shop. The hard half starts after the first order: knowing what is selling, what is running out, keeping product photos and order emails going, and doing all of it without a second pair of hands.",
        aside: "Self-initiated, publicly deployed, with the source open.",
      },
      delivers: {
        intro: "A shop customers enjoy and an owner can actually run.",
        centre: "Khilariverse",
        features: [
          {
            title: "Browse by what you play with",
            icon: "grid",
            body: "Keyboards, mice, headsets, chairs, monitors and components, each a filtered view of the full catalogue.",
          },
          {
            title: "Product pages that answer the question",
            icon: "tag",
            body: "Specifications, price, colour and quantity on one screen, then straight to the cart.",
          },
          {
            title: "Sales, stock and orders at a glance",
            icon: "chart",
            body: "Five dashboards for the owner, so decisions about the catalogue come from numbers.",
          },
          {
            title: "Photos and emails that handle themselves",
            icon: "mail",
            body: "Product images are stored and resized automatically, and order emails go out on their own.",
          },
          {
            title: "One login, the right view",
            icon: "users",
            body: "Customers and the owner use the same store and each sees what their role allows.",
          },
        ],
      },
      built: {
        intro: "The owner's side was built as a product, not an afterthought.",
        mechanisms: [
          {
            title: "The owner's dashboard",
            body: "Sales, inventory and order tracking are reported in one place over a catalogue of more than 100 products. The owner sees what to reorder and what to promote without opening a spreadsheet.",
            diagram: {
              kind: "hub",
              centre: "Owner dashboard",
              spokes: [
                "Sales",
                "Inventory",
                "Order tracking",
                "100+ products",
                "Role-aware access",
              ],
            },
            caption: "Everything an owner checks each morning, from one screen.",
          },
          {
            title: "Two chores automated from day one",
            body: "Uploading a product photo stores and resizes it automatically, and placing an order sends the email on its own. Those are the two jobs that quietly become daily work in a shop this size.",
            diagram: {
              kind: "before-after",
              before: { label: "Photos and emails by hand", value: "A daily chore", share: 1 },
              after: { label: "Automated", value: "Nothing to do", share: 0.06 },
            },
            caption: "The catalogue grows without the owner's day growing with it.",
          },
          {
            title: "One store, two views",
            body: "Customers and the owner use the same store and the same data. What each person can see and do is decided by their role, not by which screen they opened.",
            diagram: {
              kind: "flow",
              steps: [
                { label: "Sign in" },
                { label: "Role checked", accent: true },
                { label: "Customer view", note: "or owner view" },
              ],
            },
            caption: "One codebase, one API, and the role decides the rest.",
          },
        ],
      },
      results: {
        headline: "A 100+ product store with the owner's side built to run it.",
        body: "The store works as a shop, and the part worth showing is the owner's side: five dashboards and photos and emails that take care of themselves, which is what keeps a catalogue this size from becoming a second job.",
        metrics: [
          { value: "100+", label: "products in the catalogue", icon: "tag" },
          {
            value: "5+",
            label: "owner dashboards", icon: "chart",
            note: "sales, inventory, order tracking",
          },
          {
            value: "100%",
            label: "automated photos and order emails", icon: "refresh",
          },
        ],
      },
      evidence: {
        kind: "usage",
        headline: "Publicly deployed, full stack, with the source open.",
        metrics: [
          { value: "100+", label: "products", icon: "tag" },
          { value: "5+", label: "analytics modules", icon: "chart" },
        ],
        source:
          "CV, October 2026; live at khilariverse.vercel.app, source at github.com/harisizm/Khilariverse",
      },
      boards: [
        {
          id: "khilariverse-categories",
          kind: "interface",
          title: "Browse by category",
          caption:
            "The storefront's category grid: six peripheral types, each a filtered view of the same catalogue.",
          src: "/projects/khilariverse/categories.webp",
          width: 1600,
          height: 890,
          alt: "The Khilariverse category grid showing keyboards, mice, headsets, chairs, monitors and components.",
          after: "delivers",
        },
        {
          id: "khilariverse-product",
          kind: "interface",
          title: "A product page",
          caption:
            "Specifications, price, colour and quantity on one screen, with the cart one click away.",
          src: "/projects/khilariverse/product.webp",
          width: 940,
          height: 690,
          alt: "A Khilariverse product page for a wireless gaming mouse with key specifications and an add-to-cart control.",
          after: "delivers",
        },
        {
          id: "khilariverse-admin",
          kind: "interface",
          title: "The owner's side",
          caption: "The five dashboards as the owner sees them.",
          src: "/diagrams/khilariverse/khilariverse-admin.svg",
          width: 1200,
          height: 750,
          alt: "Screenshot of the Khilariverse admin analytics modules.",
          after: "built",
        },
      ],
    },
  },
] as const satisfies readonly Project[];

export type ProjectSlug = (typeof projects)[number]["slug"];
