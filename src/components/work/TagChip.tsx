export interface TagChipProps {
  children: string;
}

/**
 * A project tag. Deliberately not the blue pixel-face `Chip`: that one labels a
 * section, this one classifies a project, and the reference keeps the two apart
 * with a quiet light-grey chip in the body face at the small label size
 * (m-cs-0, audit I). Tags are nouns, so no uppercase transform is forced on
 * them beyond what `.u-label-sm` applies.
 */
export function TagChip({ children }: TagChipProps) {
  return (
    <span className="u-label-sm inline-block bg-surface-alt px-2 pb-[5px] pt-[6px] text-ink">
      {children}
    </span>
  );
}
