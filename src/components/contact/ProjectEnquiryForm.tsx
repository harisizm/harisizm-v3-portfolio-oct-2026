"use client";

import { useRef, useState } from "react";
import { Magnetic, Reveal, Stagger } from "@/components/motion";
import { FormField } from "@/components/ui";
import {
  enquiryCopy,
  enquiryFieldOrder,
  enquiryGroups,
  fieldCopy,
  optionsFor,
  type EnquiryField,
} from "@/data";
import { site } from "@/lib/site";
import { submitEnquiry, type EnquiryResult } from "./submitEnquiry";

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

/* Narrow enough to satisfy the input, textarea and select change handlers at
   once, so one updater covers all seven fields instead of three near-copies. */
type ValueEvent = { readonly target: { readonly value: string } };

function validate(values: Record<EnquiryField, string>) {
  const errors: Partial<Record<EnquiryField, string>> = {};

  for (const field of enquiryFieldOrder) {
    if (values[field].trim() === "") errors[field] = fieldCopy[field].required;
  }

  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = enquiryCopy.validation.email;
  }

  if (!errors.brief && values.brief.trim().length < 20) {
    errors.brief = enquiryCopy.validation.brief;
  }

  return errors;
}

/**
 * Option 01, the qualifying form (design.md §9.3), in columns 3 to 4 of the
 * contact body with the groups headed `01 | About your project` and
 * `02 | About you` as the reference sets them.
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
 *     real outcome. See `submitEnquiry.ts`, the only file that changes.
 *
 * Motion: the two field groups and the submit row are a `Stagger`. `Reveal`
 * cannot be a `fieldset`, so each group's wrapper carries the rule and the
 * spacing and the `fieldset` inside stays a plain one. The error summary sits
 * outside the choreography: it appears on submit and must not fade in late.
 * `Magnetic` wraps the submit button; the button is unchanged.
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
       until the next submit: a summary that empties itself mid-typing moves
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

  const summary = enquiryFieldOrder.filter((field) => errors[field]);

  /* Props shared by every control: the `error` prop (not `hint`) carries the
     validation message so the field gets `aria-invalid` and its own `-error` id,
     and the hint keeps its place underneath. */
  const common = (field: EnquiryField) => ({
    id: fieldId(field),
    name: field,
    label: fieldCopy[field].label,
    placeholder: fieldCopy[field].placeholder,
    hint: fieldCopy[field].hint,
    error: errors[field],
    inputClassName: errors[field] ? "border-2" : "",
    value: values[field],
    onChange: update(field),
    required: true,
  });

  function renderField(field: EnquiryField) {
    const options = optionsFor[field];
    if (options) {
      return <FormField key={field} type="select" options={options} {...common(field)} />;
    }
    if (field === "brief") {
      return (
        <FormField
          key={field}
          type="textarea"
          rows={6}
          className="sm:col-span-2"
          {...common(field)}
        />
      );
    }
    if (field === "email") {
      return <FormField key={field} type="email" autoComplete="email" {...common(field)} />;
    }
    return <FormField key={field} autoComplete="name" {...common(field)} />;
  }

  return (
    <form
      /* The no-JS path, kept in the markup rather than added by script, which
         is the entire point of it. No wrapper background: the inputs sit
         straight on the canvas (audit G3). */
      action={`mailto:${site.email}?subject=${encodeURIComponent(enquiryCopy.subject)}`}
      method="post"
      encType="text/plain"
      onSubmit={handleSubmit}
      aria-busy={pending}
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
              ? enquiryCopy.summary.one
              : enquiryCopy.summary.many(summary.length)}
          </p>
          <ul className="mt-3 space-y-2">
            {summary.map((field) => (
              <li key={field}>
                <a
                  href={`#${fieldId(field)}`}
                  className="inline-flex min-h-11 items-center text-body text-ink underline decoration-accent underline-offset-4"
                >
                  {fieldCopy[field].label}: {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <Stagger>
        {enquiryGroups.map((group, i) => (
          <Reveal
            key={group.num}
            className={i > 0 ? "mt-10 border-t border-border pt-10" : ""}
          >
            <fieldset className="border-0 p-0">
              <legend className="float-left w-full text-[24px] font-medium leading-[1.2] text-ink">
                {group.num} | {group.title}
              </legend>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                {group.fields.map(renderField)}
              </div>
            </fieldset>
          </Reveal>
        ))}

        {/* The split CTA's skin (design.md §7.2, 18px body face, 42px tall) as a
            submit control. `SplitCta` is an anchor by design and cannot submit a
            form, so the two-part shape is rebuilt here rather than bending that
            component into a button. */}
        <Reveal className="mt-10 border-t border-border pt-10">
          <Magnetic>
            <button
              type="submit"
              disabled={pending}
              className="group inline-flex items-stretch gap-2 disabled:opacity-60"
            >
              <span className="u-label-lg flex min-h-[42px] items-center bg-accent px-6 text-white transition-opacity duration-300 ease-[ease] group-hover:opacity-80">
                {pending ? enquiryCopy.submitting : enquiryCopy.submit}
              </span>
              <span
                aria-hidden="true"
                className="flex size-[42px] shrink-0 items-center justify-center border border-accent text-accent transition-opacity duration-300 ease-[ease] group-hover:opacity-80"
              >
                ↗
              </span>
            </button>
          </Magnetic>
        </Reveal>
      </Stagger>

      <div role="status" aria-live="polite" className="mt-8 max-w-[62ch]">
        {result ? <ResultMessage result={result} /> : null}
      </div>
    </form>
  );
}

function ResultMessage({ result }: { result: EnquiryResult }) {
  const copy = enquiryCopy.result;
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
        {copy.sent.before}
        {mailLink}
        {copy.sent.after}
      </p>
    );
  }

  if (result.status === "handoff") {
    return (
      <p className="text-body text-ink">
        {copy.handoff.before}
        <strong className="font-semibold">{copy.handoff.strong}</strong>
        {copy.handoff.middle}
        {mailLink}
        {copy.handoff.after}
      </p>
    );
  }

  return (
    <p className="text-body text-ink">
      {result.message}
      {copy.error.middle}
      {mailLink}
      {copy.error.after}
    </p>
  );
}
