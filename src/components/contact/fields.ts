/**
 * The qualifying questions, and the copy that goes with them.
 *
 * Content, not layout — it lives beside the form only because `src/data/` is
 * owned elsewhere this pass, and should move to `src/data/enquiry.ts` unchanged.
 *
 * Audience is freelance clients led by production work (design.md §0), which is
 * why budget and timeline are asked before the brief: they decide scope, and a
 * form that asks them last wastes everybody's afternoon.
 */

import type { FormFieldOption } from "@/components/ui";

export const projectTypeOptions = [
  { value: "web-app", label: "Web app or dashboard" },
  { value: "marketplace", label: "Marketplace or booking platform" },
  { value: "ai-feature", label: "AI feature on an existing product" },
  { value: "automation", label: "Automation or data pipeline" },
  { value: "rescue", label: "Finishing or fixing an existing build" },
  { value: "other", label: "Something else" },
] as const satisfies readonly FormFieldOption[];

export const goalOptions = [
  { value: "launch", label: "Launch something new" },
  { value: "replace-manual", label: "Replace a manual process" },
  { value: "add-ai", label: "Add AI to something that already works" },
  { value: "fix", label: "Fix or finish an existing build" },
  { value: "scale", label: "Scale what is already live" },
] as const satisfies readonly FormFieldOption[];

export const budgetOptions = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-3k", label: "$1,000 – $3,000" },
  { value: "3k-8k", label: "$3,000 – $8,000" },
  { value: "8k-plus", label: "$8,000+" },
  { value: "unsure", label: "Not sure yet — tell me what it costs" },
] as const satisfies readonly FormFieldOption[];

export const timelineOptions = [
  { value: "asap", label: "Now — within two weeks" },
  { value: "month", label: "This month" },
  { value: "quarter", label: "One to three months" },
  { value: "planning", label: "Still planning" },
] as const satisfies readonly FormFieldOption[];

/** The seven answers that make up an enquiry. */
export type EnquiryField =
  | "projectType"
  | "goal"
  | "budget"
  | "timeline"
  | "name"
  | "email"
  | "brief";

export interface EnquiryFieldCopy {
  readonly label: string;
  readonly placeholder: string;
  readonly hint?: string;
}

/** Printed in the enquiry email, so the recipient reads prose and not slugs. */
export const fieldCopy: Record<EnquiryField, EnquiryFieldCopy> = {
  projectType: {
    label: "Project type",
    placeholder: "Pick the closest one",
  },
  goal: {
    label: "What it needs to do",
    placeholder: "Pick the closest one",
  },
  budget: {
    label: "Budget range",
    placeholder: "Pick a range",
    hint: "A range is fine. It shapes the scope, not whether I reply.",
  },
  timeline: {
    label: "Timeline",
    placeholder: "When does this need to exist?",
  },
  name: {
    label: "Your name",
    placeholder: "Who am I replying to?",
  },
  email: {
    label: "Email",
    placeholder: "Somewhere you actually read",
  },
  brief: {
    label: "The brief",
    placeholder:
      "Explain it like you would to a friend who isn't technical. What should it do, and who is stuck today without it?",
    hint: "Two or three sentences is plenty. Links to anything existing are welcome.",
  },
};

export const optionsFor: Partial<Record<EnquiryField, readonly FormFieldOption[]>> = {
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
