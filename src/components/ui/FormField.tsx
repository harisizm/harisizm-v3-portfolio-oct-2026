"use client";

import { useId } from "react";
import type { ChangeEvent } from "react";

export interface FormFieldOption {
  value: string;
  label: string;
}

interface FormFieldCommon {
  /** Rendered as the orange chip. Always a real `<label htmlFor>`, never a placeholder. */
  label: string;
  name: string;
  /** Supply only to pin the id; one is generated otherwise. */
  id?: string;
  required?: boolean;
  /** Example text with personality — never the label (design.md §7.4). */
  placeholder?: string;
  /** Short help text under the field, wired up with `aria-describedby`. */
  hint?: string;
  /**
   * Validation message. When set the control gets `aria-invalid` and the
   * message id is appended to `aria-describedby` after the hint, so screen
   * readers announce hint then error.
   */
  error?: string;
  autoComplete?: string;
  className?: string;
  inputClassName?: string;
}

/**
 * The variants are a discriminated union so `rows` cannot be passed to a select
 * and a select cannot be rendered with no options.
 */
export type FormFieldProps =
  | (FormFieldCommon & {
      type?: "text" | "email" | "tel" | "url";
      value?: string;
      defaultValue?: string;
      onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    })
  | (FormFieldCommon & {
      type: "textarea";
      rows?: number;
      value?: string;
      defaultValue?: string;
      onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    })
  | (FormFieldCommon & {
      type: "select";
      options: readonly FormFieldOption[];
      value?: string;
      defaultValue?: string;
      onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
    });

/* Shared control skin: 1px orange border, transparent fill (the reference's inputs
   sit straight on the canvas — audit G3), square corners. The 18px body size is
   also what stops iOS zooming the viewport on focus. */
const CONTROL =
  "w-full rounded-none border border-accent bg-transparent px-4 font-body text-body text-ink placeholder:text-mid-grey";

/**
 * Form field — design.md §7.4.
 *
 * The label is a orange chip straddling the input's top border, not a line of text
 * above it: the 10px of wrapper padding is what the chip hangs into, so the
 * border crosses it rather than clearing it. The chip is body face, 16px,
 * sentence case ("Website Type*") — the reference does not uppercase it and does
 * not use the pixel face here.
 *
 * Client component because `useId` makes the label/input pairing automatic — the
 * association cannot be forgotten at the call site — and because the change
 * handlers put it in the client graph regardless.
 */
export function FormField(props: FormFieldProps) {
  const {
    label,
    name,
    required = false,
    placeholder,
    hint,
    error,
    autoComplete,
    className = "",
    inputClassName = "",
  } = props;

  const generatedId = useId();
  const id = props.id ?? `${name}-${generatedId}`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const shared = {
    id,
    name,
    required,
    autoComplete,
    "aria-describedby": describedBy,
    "aria-invalid": error ? true : undefined,
  };

  let control: React.ReactElement;

  if (props.type === "textarea") {
    control = (
      <textarea
        {...shared}
        rows={props.rows ?? 5}
        placeholder={placeholder}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        className={`${CONTROL} min-h-30 resize-y pb-4 pt-5 ${inputClassName}`}
      />
    );
  } else if (props.type === "select") {
    control = (
      <select
        {...shared}
        value={props.value}
        /* An empty default keeps the placeholder option showing until a real
           choice is made, so `required` can actually fail. */
        defaultValue={props.value === undefined ? (props.defaultValue ?? "") : undefined}
        onChange={props.onChange}
        className={`${CONTROL} h-11 appearance-none pr-10 ${inputClassName}`}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  } else {
    control = (
      <input
        {...shared}
        type={props.type ?? "text"}
        placeholder={placeholder}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        className={`${CONTROL} h-11 ${inputClassName}`}
      />
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="relative pt-2.5">
        <label
          htmlFor={id}
          className="absolute left-4 top-0 z-10 bg-accent px-2 py-0.5 font-body text-label leading-[1.2] text-white"
        >
          {label}
          {required ? <span aria-hidden="true">*</span> : null}
        </label>
        {control}
        {props.type === "select" ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-4 flex h-11 items-center text-accent"
          >
            ▾
          </span>
        ) : null}
      </div>
      {hint ? (
        <p id={hintId} className="mt-2 text-label-sm text-mid-grey">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="mt-2 text-label-sm text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}
