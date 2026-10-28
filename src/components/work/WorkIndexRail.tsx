import { Chip, DarkPanel } from "@/components/ui";

export interface WorkIndexRailProps {
  /** Printed as a bracketed count. Derived from the data, never typed in. */
  count: number;
}

/**
 * The sticky left column of `/work` (teardown §6.3, audit D1 and D3).
 *
 * Persistent context at the top, an always-present CTA pinned to the bottom, and
 * the project evidence scrolling past on the right. On mobile it is a static
 * header and the dark panel simply sits above the first project.
 *
 * The heading is two deliberate lines in uppercase at the 40px title size: the
 * reference's "SEE / FOR YOURSELF". The break is explicit because a 290px rail
 * wrapping a 48px heading on its own produced three ragged lines (D1).
 */
export function WorkIndexRail({ count }: WorkIndexRailProps) {
  return (
    <div className="pt-10 pb-12 lg:sticky lg:top-[var(--header-h)] lg:flex lg:h-[calc(100svh-var(--header-h))] lg:flex-col lg:justify-between lg:py-14">
      <div>
        <Chip variant="bracketed">Work</Chip>

        <h1 className="mt-4 text-[32px] uppercase leading-[1.1] tracking-[-0.5px] sm:text-title">
          Shipped work,
          <br />
          end to end
        </h1>

        <p className="mt-5 max-w-[46ch] font-light text-mid-grey lg:max-w-[30ch]">
          Every project here is a full case study: the constraint it started
          from, the call that was made, the alternative that was turned down,
          and what changed once it shipped.
        </p>

        <p className="u-label-sm mt-6 text-mid-grey">
          Featured projects
          <span className="ml-2 text-ink">
            <span aria-hidden="true">[&nbsp;</span>
            {count}
            <span aria-hidden="true">&nbsp;]</span>
          </span>
        </p>
      </div>

      <DarkPanel
        href="/contact"
        label="Start a conversation"
        className="mt-12 lg:mt-0"
        subline="Tell me what you are building and I will tell you honestly whether I am the right person for it."
      >
        <p className="text-lead font-light">Want to discuss a project?</p>
      </DarkPanel>
    </div>
  );
}
