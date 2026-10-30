import { brandGlyphs, type StackMark as StackMarkSpec } from "@/data";

import { Icon } from "./Icon";

export interface StackMarkProps {
  mark: StackMarkSpec;
  /** Height in em of the surrounding text. */
  size?: number;
  className?: string;
}

/**
 * One mark on the capability strip (lessons.md D-021): the brand's published
 * glyph, filled in `currentColor` on the same 24-unit grid as the line icons,
 * or one of the line icons where no brand mark exists. Decorative: the name
 * beside it is the content.
 */
export function StackMark({ mark, size = 1.25, className = "" }: StackMarkProps) {
  if (mark.kind === "icon") return <Icon name={mark.name} size={size} className={className} />;

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      style={{ height: `${size}em`, width: `${size}em` }}
      className={`inline-block shrink-0 fill-current ${className}`}
    >
      <path d={brandGlyphs[mark.slug]} />
    </svg>
  );
}
