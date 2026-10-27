export interface OptionHeaderProps {
  /** `Ø1` / `Ø2` — slashed zero from the display face (design.md §4). */
  num: string;
  title: string;
  blurb: string;
  /** The id the surrounding section points `aria-labelledby` at. */
  headingId: string;
}

/**
 * The header for one branch of the fork. The number carries the sequence so the
 * two options read as a route choice rather than as two unrelated forms.
 */
export function OptionHeader({ num, title, blurb, headingId }: OptionHeaderProps) {
  return (
    <div>
      <p className="u-label font-bold text-accent">Option {num}</p>
      <h2
        id={headingId}
        className="mt-4 max-w-[24ch] text-title font-medium tracking-tight sm:text-heading"
      >
        {title}
      </h2>
      <p className="mt-6 max-w-[52ch] text-body text-mid-grey">{blurb}</p>
    </div>
  );
}
