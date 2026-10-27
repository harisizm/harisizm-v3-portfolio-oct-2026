"use client";

import { useId } from "react";
import type { ChangeEvent } from "react";

export interface FormFieldOption {
  value: string;
  label: string;
}

interface FormFieldCommon {
  /** Rendered as the blue chip. Always a real `<label htmlFor>`, never a placeholder. */
  label: string;
  name: string;
  /** Supply only to pin the id; one is generated otherwise. */
  id?: string;
  required?: boolean;
  /** Example text with personality — never the label (design.md §7.4). */
  placeholder?: string;
  /** Short help text under the field, wired up with `aria-describedby`. */
  hint?: string;
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

/* Shared control skin: 1px blue border, transparent fill, square corners. The
   18px body size is also what stops iOS zooming the viewport on focus. */
const CONTROL =
  "w-full rounded-none border border-accent bg-transparent px-4 font-body text-body text-ink placeholder:text-mid-grey";

/**
 * Form field — design.md §7.4.
 *
 * The label is a blue chip straddling the input's top border, not a line of text
 * above it: the 10px of wrapper padding is what the chip hangs into, so the
 * border crosses it rather than clearing it.
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
    autoComplete,
    className = "",
    inputClassName = "",
  } = props;

  const generatedId = useId();
  const id = props.id ?? `${name}-${generatedId}`;
  const hintId = hint ? `${id}-hint` : undefined;

  const shared = {
    id,
    name,
    required,
    autoComplete,
    "aria-describedby": hintId,
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
          className="u-label absolute left-4 top-0 z-10 bg-accent px-2 py-1 text-white"
        >
          {label}
          {required ? <span aria-hidden="true"> *</span> : null}
        </label>
        {control}
        {props.type === "select" ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-4 flex h-11 items-center font-display text-accent"
          >
            ▾
          </span>
        ) : null}
      </div>
      {hint ? (
        <p id={hintId} className="mt-2 text-label text-mid-grey">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
