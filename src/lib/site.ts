/**
 * Single source of truth for identity and contact.
 *
 * V2 typed the email address into two separate clipboard calls and hardcoded the
 * footer year. Nothing here gets repeated in a component — see lessons.md T-005.
 */

export const site = {
  /** Wordmark. Legal name is `fullName`, used on the CV and in structured data. */
  name: "harisizm",
  shortName: "Haris",
  fullName: "Hafiz Muhammad Haris",

  url: "https://harisizm.com",

  role: "Full-Stack Software Engineer",
  location: "Lahore, Pakistan",

  /**
   * NOTE: this differs from the address printed on cv-2026-10.pdf
   * (haris687.chohan@gmail.com). The CV needs re-exporting. See lessons.md D-013.
   */
  email: "hariszim01@gmail.com",
  phone: "+92 300 9495926",
  phoneHref: "+923009495926",

  social: {
    github: "https://github.com/harisizm",
    linkedin: "https://www.linkedin.com/in/harisizm",
  },

  /** Booking link — URL not supplied yet. Null hides the control entirely (T-002). */
  booking: null as string | null,

  cv: "/docs/cv-2026-10.pdf",

  /**
   * Availability. One flag, not baked into markup — V2 welded
   * "Available for new projects" into an SVG textPath with no way to turn it off.
   */
  availability: {
    open: true,
    label: "Available for projects",
  },
} as const;

export const nav = [
  { num: "Ø1", label: "Home", href: "/" },
  { num: "Ø2", label: "Work", href: "/work" },
  { num: "Ø3", label: "About", href: "/about" },
  { num: "Ø4", label: "Contact", href: "/contact" },
] as const;
