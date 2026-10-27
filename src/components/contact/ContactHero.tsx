import { Chip, GridOverlay } from "@/components/ui";

/**
 * Page header — `[ CONTACT ]` over the two-weight headline (design.md §4): the
 * opening clause at 600, the resolving clause at 300, one size, one colour.
 */
export function ContactHero() {
  return (
    <header className="u-container relative pb-16 pt-12 lg:pb-20 lg:pt-20">
      <GridOverlay />
      <div className="mx-auto w-full max-w-[1408px]">
        <Chip variant="bracketed">Contact</Chip>
        <h1 className="mt-6 max-w-[20ch] text-balance text-title tracking-tight sm:text-statement xl:text-hero">
          <span className="font-semibold">Tell me what you are building.</span>{" "}
          <span className="font-light">I will tell you what it takes.</span>
        </h1>
        <p className="mt-8 max-w-[56ch] text-lead font-light">
          Two routes below, depending on why you are here. Either way a real person
          reads it — there is no inbox robot on the other end of this page.
        </p>
      </div>
    </header>
  );
}
