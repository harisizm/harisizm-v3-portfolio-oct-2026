/**
 * Content guards for the case-study template.
 *
 * `src/data/types.ts` exports `TODO` as the honest placeholder: prose that is
 * still missing says so in the data rather than inventing a specific. On screen
 * that string is not content, so every optional block runs through this guard
 * and renders nothing instead (lessons.md T-002, T-003).
 *
 * The `startsWith` check is deliberate — a hand-written `"TODO: …"` that never
 * went through the constant must behave the same way.
 */
import { TODO } from "@/data";

export function hasContent(value: string | null | undefined): value is string {
  if (!value) return false;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed !== TODO && !trimmed.startsWith("TODO");
}
