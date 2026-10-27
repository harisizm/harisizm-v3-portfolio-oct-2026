import type { SkillGroup } from "./types";

/**
 * The CV's own seven categories, in the CV's order. Grouping is content, not a
 * layout decision — a component that wants three columns slices this, it does
 * not re-group it.
 */
export const skills = [
  {
    id: "languages",
    label: "Programming Languages",
    items: ["Python", "JavaScript", "TypeScript", "C++"],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "Redux Toolkit",
      "Zustand",
      "React Query",
      "Framer Motion",
      "HTML",
      "CSS",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST APIs",
      "GraphQL",
      "Prisma",
      "SQLAlchemy",
      "AsyncIO",
      "Zod",
      "JWT auth",
      "SSE streaming",
    ],
  },
  {
    id: "ai",
    label: "AI & LLM Engineering",
    items: [
      "OpenRouter",
      "RAG grounding",
      "Prompt pipelines",
      "Model failover",
      "Stream sanitization",
      "Insight caching",
    ],
  },
  {
    id: "automation",
    label: "Automation & Data Engineering",
    items: [
      "Selenium",
      "Playwright",
      "Puppeteer",
      "GraphQL scraping",
      "TLS impersonation",
      "Headless Chrome",
    ],
  },
  {
    id: "databases",
    label: "Databases",
    items: ["PostgreSQL", "PostGIS", "pgvector", "MongoDB", "MySQL", "SQLite"],
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    items: [
      "Git",
      "GitHub",
      "VPS",
      "Postman",
      "Vercel",
      "Railway",
      "Supabase",
      "Streamlit",
      "Cloudinary",
      "Vitest",
      "Sentry",
    ],
  },
] as const satisfies readonly SkillGroup[];

export type SkillGroupId = (typeof skills)[number]["id"];
