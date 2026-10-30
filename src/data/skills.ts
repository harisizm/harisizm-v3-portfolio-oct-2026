import type { BrandSlug } from "./brands";
import type { IconName, SkillGroup, StackMark } from "./types";

/**
 * The CV's own seven categories, in the CV's order. Grouping is content, not a
 * layout decision — a component that wants three columns slices this, it does
 * not re-group it.
 */
export const skills = [
  {
    id: "languages",
    label: "Programming Languages",
    icon: "code",
    items: ["Python", "JavaScript", "TypeScript", "C++"],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "layout",
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
    icon: "server",
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
    icon: "sparkle",
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
    icon: "bot",
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
    icon: "database",
    items: ["PostgreSQL", "PostGIS", "pgvector", "MongoDB", "MySQL", "SQLite"],
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    icon: "wrench",
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

const brand = (slug: BrandSlug): StackMark => ({ kind: "brand", slug });
const icon = (name: IconName): StackMark => ({ kind: "icon", name });

/**
 * One mark per stack name on the strip (lessons.md D-021). The brand's own
 * mark where it publishes one through Simple Icons; a line icon drawn in the
 * site's hand where it does not. Every name in `skills` has an entry, and
 * the Capability section falls back to the group's icon if one is missing.
 */
export const stackMarks: Readonly<Record<string, StackMark>> = {
  Python: brand("python"),
  JavaScript: brand("javascript"),
  TypeScript: brand("typescript"),
  "C++": brand("cplusplus"),
  React: brand("react"),
  "Next.js": brand("nextdotjs"),
  Vite: brand("vite"),
  "Tailwind CSS": brand("tailwindcss"),
  "Redux Toolkit": brand("redux"),
  Zustand: icon("state"),
  "React Query": brand("reactquery"),
  "Framer Motion": brand("framer"),
  HTML: brand("html5"),
  CSS: brand("css3"),
  "Node.js": brand("nodedotjs"),
  "Express.js": brand("express"),
  FastAPI: brand("fastapi"),
  "REST APIs": icon("api"),
  GraphQL: brand("graphql"),
  Prisma: brand("prisma"),
  SQLAlchemy: brand("sqlalchemy"),
  AsyncIO: icon("async"),
  Zod: brand("zod"),
  "JWT auth": brand("jsonwebtokens"),
  "SSE streaming": icon("stream"),
  OpenRouter: icon("route"),
  "RAG grounding": icon("anchor"),
  "Prompt pipelines": icon("pipeline"),
  "Model failover": icon("switch"),
  "Stream sanitization": icon("funnel"),
  "Insight caching": icon("bolt"),
  Selenium: brand("selenium"),
  Playwright: icon("mask"),
  Puppeteer: brand("puppeteer"),
  "GraphQL scraping": brand("graphql"),
  "TLS impersonation": icon("lock"),
  "Headless Chrome": brand("googlechrome"),
  PostgreSQL: brand("postgresql"),
  PostGIS: icon("map-pin"),
  pgvector: icon("vector"),
  MongoDB: brand("mongodb"),
  MySQL: brand("mysql"),
  SQLite: brand("sqlite"),
  Git: brand("git"),
  GitHub: brand("github"),
  VPS: icon("server"),
  Postman: brand("postman"),
  Vercel: brand("vercel"),
  Railway: brand("railway"),
  Supabase: brand("supabase"),
  Streamlit: brand("streamlit"),
  Cloudinary: brand("cloudinary"),
  Vitest: brand("vitest"),
  Sentry: brand("sentry"),
};
