import { Chip, DarkPanel } from "@/components/ui";

export interface WorkIndexRailProps {
  /** Printed as a bracketed count. Derived from the data, never typed in. */
  count: number;
}

/**
 * The sticky left column of `/work` (teardown §6.3).
 *
 * Persistent context at the top, an always-present CTA pinned to the bottom, and
 * the project evidence scrolling past on the right. On mobile it is a static
 * header and the dark panel simply sits above the first project.
 */
export function WorkIndexRail({ count }: WorkIndexRailProps) {
  return (
    <div className="pt-10 pb-12 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:py-14">
      <div>
        <Chip variant="bracketed">Work</Chip>

        <h1 className="mt-6 text-[34px] leading-[1.1] tracking-[-1px] sm:text-heading">
          Shipped work,
          <br />
          end to end
        </h1>

        <p className="mt-6 max-w-[46ch] text-mid-grey lg:max-w-[34ch]">
          Each project below is a full case study: the constraint it started from,
          the decisions behind it, what was rejected, and what actually changed.
          Where a number exists it is here. Where one does not, nothing stands in
          for it.
        </p>

        <p aria-hidden="true" className="u-label mt-6 text-mid-grey">
          [&nbsp;{count}&nbsp;]
        </p>
      </div>

      <DarkPanel
        href="/contact"
        label="Start a conversation"
        className="mt-12 lg:mt-0"
      >
        <p className="text-lead font-light">Want to discuss a project?</p>
      </DarkPanel>
    </div>
  );
}
