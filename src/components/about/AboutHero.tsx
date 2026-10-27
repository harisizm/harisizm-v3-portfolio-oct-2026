import { Chip, GridOverlay } from "@/components/ui";
import { pageHeading, pageLead } from "./content";

/**
 * Page header — `[ ABOUT ]` bracket label over a large heading, with the lead
 * paragraph set against it rather than under it so the eye lands on the
 * headline first (design.md §9).
 */
export function AboutHero() {
  return (
    <header className="u-container relative pb-16 pt-12 lg:pb-24 lg:pt-20">
      <GridOverlay />
      <div className="mx-auto w-full max-w-[1408px]">
        <Chip variant="bracketed">About</Chip>
        <h1 className="mt-6 max-w-[24ch] text-balance text-title font-medium tracking-tight sm:text-heading lg:text-statement">
          {pageHeading}
        </h1>
        <p className="mt-8 max-w-[52ch] text-lead font-light text-ink lg:ml-auto lg:text-right">
          {pageLead}
        </p>
      </div>
    </header>
  );
}
