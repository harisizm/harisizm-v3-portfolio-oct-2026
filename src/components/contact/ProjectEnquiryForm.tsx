"use client";

import { useRef, useState } from "react";
import { FormField } from "@/components/ui";
import { site } from "@/lib/site";
import { fieldCopy, optionsFor, type EnquiryField } from "./fields";
import {
  ENQUIRY_SUBJECT,
  RESPONSE_WINDOW,
  submitEnquiry,
  type EnquiryResult,
} from "./submitEnquiry";

/** Fixed ids: one enquiry form per page, and the error summary links to them. */
const fieldId = (field: EnquiryField) => `enquiry-${field}`;

const EMPTY: Record<EnquiryField, string> = {
  projectType: "",
  goal: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
  brief: "",
};

const REQUIRED: Record<EnquiryField, string> = {
  projectType: "Pick the closest project type.",
  goal: "Pick what it needs to do.",
  budget: "Pick a range — any range.",
  timeline: "Pick a timeline.",
  name: "I need a name to reply to.",
  email: "I need an email to reply to.",
  brief: "Tell me what you are building, in a sentence or two.",
};

const ORDER: readonly EnquiryField[] = [
  "projectType",
  "goal",
  "budget",
  "timeline",
  "name",
  "email",
  "brief",
];

/* Narrow enough to satisfy the input, textarea and select change handlers at
   once, so one updater covers all seven fields instead of three near-copies. */
type ValueEvent = { readonly target: { readonly value: string } };

function validate(values: Record<EnquiryField, string>) {
  const errors: Partial<Record<EnquiryField, string>> = {};

  for (const field of ORDER) {
    if (values[field].trim() === "") errors[field] = REQUIRED[field];
  }

  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "That address does not look right — check it for a typo.";
  }

  if (!errors.brief && values.brief.trim().length < 20) {
    errors.brief = "A little more detail, please — two or three sentences.";
  }

  return errors;
}

/**
 * Option Ø1 — the qualifying form (design.md §9.3).
 *
 * Progressive enhancement, in this order:
 *
 *  1. **No JS.** The form posts to a `mailto:` with `enctype="text/plain"`, so
 *     the browser opens the visitor's mail client with the answers in the body,
 *     and `required` on every field means the browser validates it too. The
 *     contact path does not depend on this component running at all.
 *  2. **JS, no endpoint.** `submitEnquiry` returns `handoff` and we open the
 *     same draft, pre-filled and readable, and say plainly that nothing was
 *     sent from the page.
 *  3. **JS with `NEXT_PUBLIC_ENQUIRY_ENDPOINT` set.** It POSTs and reports the
 *     real outcome. See `submitEnquiry.ts` — the only file that changes.
 */
export function ProjectEnquiryForm() {
  const [values, setValues] = useState<Record<EnquiryField, string>>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<EnquiryField, string>>>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<EnquiryResult | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const update = (field: EnquiryField) => (event: ValueEvent) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    /* Clear a field's error as it is corrected, but leave the summary in place
       until the next submit — a summary that empties itself mid-typing moves
       the content under the pointer. */
    setErrors((current) =>
      current[field] ? { ...current, [field]: undefined } : current,
    );
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);

    if (Object.values(found).some(Boolean)) {
      setResult(null);
      summaryRef.current?.focus();
      return;
    }

    setPending(true);
    const outcome = await submitEnquiry(values);
    setPending(false);
    setResult(outcome);

    if (outcome.status === "handoff") {
      // A real effect, not a simulated one: the draft actually opens.
      window.location.href = outcome.mailtoUrl;
    }
  }

  const summary = ORDER.filter((field) => errors[field]);

  return (
    <form
      /* The no-JS path, kept in the markup rather than added by script — which
         is the entire point of it. */
      action={`mailto:${site.email}?subject=${encodeURIComponent(ENQUIRY_SUBJECT)}`}
      method="post"
      encType="text/plain"
      onSubmit={handleSubmit}
      aria-busy={pending}
      className="mt-10"
    >
      {summary.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-10 border border-accent p-4"
        >
          <p className="u-label text-accent">
            {summary.length === 1
              ? "One answer still needed"
              : `${summary.length} answers still needed`}
          </p>
          <ul className="mt-3 space-y-2">
            {summary.map((field) => (
              <li key={field}>
                <a
                  href={`#${fieldId(field)}`}
                  className="inline-flex min-h-11 items-center text-body text-ink underline decoration-accent underline-offset-4"
                >
                  {fieldCopy[field].label} — {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <fieldset className="border-0 p-0">
        <legend className="u-label text-accent">Ø1 | About your project</legend>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {(["projectType", "goal", "budget", "timeline"] as const).map((field) => {
            const options = optionsFor[field];
            if (!options) return null;

            return (
              <FormField
                key={field}
                id={fieldId(field)}
                type="select"
                name={field}
                label={fieldCopy[field].label}
                placeholder={fieldCopy[field].placeholder}
                hint={errors[field] ?? fieldCopy[field].hint}
                inputClassName={errors[field] ? "border-2" : ""}
                options={options}
                value={values[field]}
                onChange={update(field)}
                required
              />
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-14 border-0 p-0">
        <legend className="u-label text-accent">Ø2 | About you</legend>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <FormField
            id={fieldId("name")}
            name="name"
            label={fieldCopy.name.label}
            placeholder={fieldCopy.name.placeholder}
            hint={errors.name}
            inputClassName={errors.name ? "border-2" : ""}
            autoComplete="name"
            value={values.name}
            onChange={update("name")}
            required
          />
          <FormField
            id={fieldId("email")}
            type="email"
            name="email"
            label={fieldCopy.email.label}
            placeholder={fieldCopy.email.placeholder}
            hint={errors.email}
            inputClassName={errors.email ? "border-2" : ""}
            autoComplete="email"
            value={values.email}
            onChange={update("email")}
            required
          />
          <FormField
            id={fieldId("brief")}
            type="textarea"
            name="brief"
            rows={6}
            label={fieldCopy.brief.label}
            placeholder={fieldCopy.brief.placeholder}
            hint={errors.brief ?? fieldCopy.brief.hint}
            inputClassName={errors.brief ? "border-2" : ""}
            value={values.brief}
            onChange={update("brief")}
            required
            className="sm:col-span-2"
          />
        </div>
      </fieldset>

      {/* The split CTA's skin, as a submit control. `SplitCta` is an anchor by
          design — it cannot submit a form — so the two-part shape is rebuilt
          here rather than bending that component into a button. */}
      <button
        type="submit"
        disabled={pending}
        className="group mt-12 inline-flex items-stretch gap-2 disabled:opacity-60"
      >
        <span className="u-label flex min-h-11 items-center bg-accent px-6 text-white transition-opacity duration-300 ease-[ease] group-hover:opacity-80">
          {pending ? "Sending…" : "Send project request"}
        </span>
        <span
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center border border-accent text-accent transition-opacity duration-300 ease-[ease] group-hover:opacity-80"
        >
          ↗
        </span>
      </button>

      <div role="status" aria-live="polite" className="mt-8 max-w-[62ch]">
        {result ? <ResultMessage result={result} /> : null}
      </div>
    </form>
  );
}

function ResultMessage({ result }: { result: EnquiryResult }) {
  const mailLink = (
    <a
      href={`mailto:${site.email}`}
      className="inline-flex min-h-11 items-center text-accent underline decoration-accent underline-offset-4"
    >
      {site.email}
    </a>
  );

  if (result.status === "sent") {
    return (
      <p className="text-body text-ink">
        Sent. I reply to every enquiry {RESPONSE_WINDOW} — if nothing has arrived by
        then, check your spam folder before assuming it vanished, or mail me directly
        at {mailLink}.
      </p>
    );
  }

  if (result.status === "handoff") {
    return (
      <p className="text-body text-ink">
        Your answers are now a draft in your mail app —{" "}
        <strong className="font-semibold">send it from there</strong> and I will reply{" "}
        {RESPONSE_WINDOW}. To be straight with you: this form has no send endpoint
        behind it yet, so email is the real delivery path. If no draft opened, mail me
        at {mailLink}.
      </p>
    );
  }

  return (
    <p className="text-body text-ink">
      {result.message} Nothing was sent. Mail the same details to {mailLink} and I will
      reply {RESPONSE_WINDOW}.
    </p>
  );
}
