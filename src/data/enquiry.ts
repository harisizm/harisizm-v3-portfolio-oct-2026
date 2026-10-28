/**
 * Contact-page content: the qualifying questions and every word around them.
 * Options, labels, placeholders, hints, validation messages, group headings,
 * the hero, the intro and the hiring links (lessons.md T-010).
 *
 * Audience is freelance clients led by production work (design.md §0), which is
 * why budget and timeline are asked before the brief: they decide scope, and a
 * form that asks them last wastes everybody's afternoon.
 *
 * No em or en dashes anywhere a visitor reads (T-015).
 */

/** Structurally identical to the UI's `FormFieldOption`; data does not import components. */
export interface EnquiryOption {
  readonly value: string;
  readonly label: string;
}

export const projectTypeOptions = [
  { value: "web-app", label: "Web app or dashboard" },
  { value: "marketplace", label: "Marketplace or booking platform" },
  { value: "ai-feature", label: "AI feature on an existing product" },
  { value: "automation", label: "Automation or data pipeline" },
  { value: "rescue", label: "Finishing or fixing an existing build" },
  { value: "other", label: "Something else" },
] as const satisfies readonly EnquiryOption[];

export const goalOptions = [
  { value: "launch", label: "Launch something new" },
  { value: "replace-manual", label: "Replace a manual process" },
  { value: "add-ai", label: "Add AI to something that already works" },
  { value: "fix", label: "Fix or finish an existing build" },
  { value: "scale", label: "Scale what is already live" },
] as const satisfies readonly EnquiryOption[];

export const budgetOptions = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-3k", label: "$1,000 to $3,000" },
  { value: "3k-8k", label: "$3,000 to $8,000" },
  { value: "8k-plus", label: "$8,000 and up" },
  { value: "unsure", label: "Not sure yet, tell me what it would cost" },
] as const satisfies readonly EnquiryOption[];

export const timelineOptions = [
  { value: "asap", label: "Now, within two weeks" },
  { value: "month", label: "This month" },
  { value: "quarter", label: "One to three months" },
  { value: "planning", label: "Still planning" },
] as const satisfies readonly EnquiryOption[];

/** The seven answers that make up an enquiry. */
export type EnquiryField =
  | "projectType"
  | "goal"
  | "budget"
  | "timeline"
  | "name"
  | "email"
  | "brief";

/** Field order on the page and in the email body. */
export const enquiryFieldOrder: readonly EnquiryField[] = [
  "projectType",
  "goal",
  "budget",
  "timeline",
  "name",
  "email",
  "brief",
];

export interface EnquiryFieldCopy {
  readonly label: string;
  readonly placeholder: string;
  readonly hint?: string;
  /** Shown when the field is submitted empty. */
  readonly required: string;
}

/** Labels are printed in the enquiry email, so the recipient reads prose and not slugs. */
export const fieldCopy: Record<EnquiryField, EnquiryFieldCopy> = {
  projectType: {
    label: "Project type",
    placeholder: "Pick the closest one",
    required: "Pick the closest project type.",
  },
  goal: {
    label: "What it needs to do",
    placeholder: "Pick the closest one",
    required: "Pick what it needs to do.",
  },
  budget: {
    label: "Budget range",
    placeholder: "Pick a range",
    hint: "A range is fine. It shapes the scope, not whether I reply.",
    required: "Pick a range. Any range is fine.",
  },
  timeline: {
    label: "Timeline",
    placeholder: "When does this need to exist?",
    required: "Pick a timeline.",
  },
  name: {
    label: "Your name",
    placeholder: "Who am I replying to?",
    required: "I need a name to reply to.",
  },
  email: {
    label: "Email",
    placeholder: "Somewhere you actually read",
    required: "I need an email to reply to.",
  },
  brief: {
    label: "The brief",
    placeholder:
      "Explain it like you would to a friend who isn't technical. What should it do, and who is stuck today without it?",
    hint: "Two or three sentences is plenty. Links to anything existing are welcome.",
    required: "Tell me what you are building, in a sentence or two.",
  },
};

export const optionsFor: Partial<Record<EnquiryField, readonly EnquiryOption[]>> = {
  projectType: projectTypeOptions,
  goal: goalOptions,
  budget: budgetOptions,
  timeline: timelineOptions,
};

/** Resolves a stored value back to its human label for the email body. */
export function labelFor(field: EnquiryField, value: string): string {
  const options = optionsFor[field];
  if (!options) return value;
  return options.find((option) => option.value === value)?.label ?? value;
}

export interface EnquiryGroup {
  /** `01`, `02`: plain numerals in the body face, as the reference sets them. */
  readonly num: string;
  readonly title: string;
  readonly fields: readonly EnquiryField[];
}

export const enquiryGroups: readonly EnquiryGroup[] = [
  { num: "01", title: "About your project", fields: ["projectType", "goal", "budget", "timeline"] },
  { num: "02", title: "About you", fields: ["name", "email", "brief"] },
];

/** The real window, printed in the success and handoff copy. Change it here, once. */
export const responseWindow = "within one to two days";

export const enquiryCopy = {
  subject: "Project enquiry via harisizm.com",
  submit: "Send project request",
  submitting: "Sending",
  validation: {
    email: "That address does not look right. Check it for a typo.",
    brief: "A little more detail, please: two or three sentences.",
  },
  summary: {
    one: "One answer still needed",
    many: (count: number) => `${count} answers still needed`,
  },
  result: {
    sent: {
      before: `Sent. I reply to every enquiry ${responseWindow}. If nothing has arrived by then, check your spam folder before assuming it vanished, or mail me directly at `,
      after: ".",
    },
    handoff: {
      before: "Your answers are now a draft in your mail app. ",
      strong: "Send it from there",
      middle: ` and I will reply ${responseWindow}. To be straight with you: this form has no send endpoint behind it yet, so email is the real delivery path. If no draft opened, mail me at `,
      after: ".",
    },
    error: {
      /** Follows the specific message from `submitEnquiry`. */
      middle: " Nothing was sent. Mail the same details to ",
      after: ` and I will reply ${responseWindow}.`,
    },
    /** Transport failures, reported as they happened. */
    httpError: (status: number) => `The form could not reach the server (HTTP ${status}).`,
    offline: "The form could not reach the server. You may be offline.",
  },
} as const;

/** Everything on the contact page that is not the form itself. */
export const contactCopy = {
  chip: "Contact",
  /** Two lines, light weight, sentence case. The component breaks between them. */
  heading: ["First, tell me what", "you are building."],
  intro:
    "This form gives me a real picture of what you are building and where it is stuck today. I read every enquiry myself, and I reply with what it would take: the scope, a rough budget, and the first thing I would build. Budget and timeline are asked early because they decide what is possible.",
  direct: "Or just email me:",
  booking: "Prefer to talk it through first? Book a call",
  hiring: {
    num: "02",
    title: "Hiring, or something else?",
    blurb:
      "Not commissioning a build? Take the shortcut. The CV is the October 2026 export, and the rest are direct lines with no form in between.",
    cv: { heading: "Curriculum vitae", action: "Download PDF" },
    linkedin: { heading: "LinkedIn", action: "Profile" },
    github: { heading: "GitHub", action: "Repositories" },
    email: { heading: "Email" },
  },
} as const;
