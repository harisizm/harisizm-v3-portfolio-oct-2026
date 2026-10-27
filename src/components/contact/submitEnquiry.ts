/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE SINGLE INTEGRATION POINT FOR THE ENQUIRY FORM
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * There is no backend yet, and this file does not pretend otherwise.
 *
 * To wire a real endpoint, set `NEXT_PUBLIC_ENQUIRY_ENDPOINT` to something that
 * accepts `POST` with a JSON `EnquiryPayload` and answers 2xx. Nothing else in
 * the form changes: `submitEnquiry` starts returning `{ status: "sent" }` and
 * the success copy below is what the visitor reads.
 *
 * Until that variable exists, a submission resolves to `{ status: "handoff" }`
 * and the form hands the visitor a pre-filled mail draft — the same route the
 * no-JS fallback takes. It is deliberately NOT a fake success state: nothing
 * reports "sent" that was not sent (lessons.md T-002).
 */

import { site } from "@/lib/site";
import { fieldCopy, labelFor, type EnquiryField } from "./fields";

export type EnquiryPayload = Readonly<Record<EnquiryField, string>>;

/** The real window, printed in the success copy. Change it here, once. */
export const RESPONSE_WINDOW = "within 24–48 hours";

export type EnquiryResult =
  | { readonly status: "sent"; readonly responseWindow: string }
  /** No endpoint configured — the visitor sends the draft themselves. */
  | { readonly status: "handoff"; readonly mailtoUrl: string }
  | { readonly status: "error"; readonly message: string };

const ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ?? null;

const ORDER: readonly EnquiryField[] = [
  "projectType",
  "goal",
  "budget",
  "timeline",
  "name",
  "email",
  "brief",
];

export const ENQUIRY_SUBJECT = "Project enquiry via harisizm.com";

/**
 * The `mailto:` the JS path hands off to. Labels, not slugs — the mail that
 * lands has to be readable by a human on both ends.
 */
export function buildEnquiryMailto(payload: EnquiryPayload): string {
  const body = ORDER.map(
    (field) => `${fieldCopy[field].label}: ${labelFor(field, payload[field])}`,
  ).join("\n\n");

  // Hand-encoded rather than URLSearchParams: that serialiser writes spaces as
  // `+`, which mail clients paste into the draft literally instead of decoding.
  const query = `subject=${encodeURIComponent(ENQUIRY_SUBJECT)}&body=${encodeURIComponent(body)}`;
  return `mailto:${site.email}?${query}`;
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  if (!ENDPOINT) {
    return { status: "handoff", mailtoUrl: buildEnquiryMailto(payload) };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        status: "error",
        message: `The form could not reach the server (HTTP ${response.status}).`,
      };
    }

    return { status: "sent", responseWindow: RESPONSE_WINDOW };
  } catch {
    return {
      status: "error",
      message: "The form could not reach the server — you may be offline.",
    };
  }
}
