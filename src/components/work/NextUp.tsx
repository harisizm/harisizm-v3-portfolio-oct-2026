import Link from "next/link";
import { DarkPanel } from "@/components/ui";
import type { Project } from "@/data";
import { ProjectCover } from "./ProjectCover";

export interface NextUpProps {
  next: Project | null;
}

/**
 * The three exits — design.md §9.2. Back to the index, on to the next case
 * study, or into the contact page. A case study never dead-ends.
 *
 * `adjacentProjects()` wraps at both ends, so `next` is only null if the slug is
 * unknown — which `notFound()` has already handled. The guard is still here so
 * the two surviving exits render rather than the component throwing.
 */
export function NextUp({ next }: NextUpProps) {
  return (
    <section
      aria-labelledby="next-up-heading"
      className="border-t border-border py-12"
    >
      <div className="u-container">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/work"
            className="u-label inline-flex min-h-11 items-center gap-2 transition-opacity duration-300 ease-[ease] hover:opacity-70"
          >
            <span aria-hidden="true">&lsaquo;</span>
            Back
          </Link>

          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="u-label inline-flex min-h-11 items-center transition-opacity duration-300 ease-[ease] hover:opacity-70"
            >
              <span aria-hidden="true">[&nbsp;</span>
              View next
              <span aria-hidden="true">&nbsp;]</span>
            </Link>
          ) : null}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col justify-between gap-10">
            <div>
              <h2 id="next-up-heading" className="u-label text-mid-grey">
                Next up
              </h2>
              {next ? (
                <>
                  <Link
                    href={`/work/${next.slug}`}
                    className="mt-3 block text-[32px] leading-[1.1] tracking-[-1px] transition-opacity duration-300 ease-[ease] hover:opacity-70 sm:text-title lg:text-heading"
                  >
                    {next.shortTitle}
                  </Link>
                  <p className="mt-4 max-w-[46ch] text-mid-grey">
                    {next.tagline}
                  </p>
                </>
              ) : null}
            </div>

            <DarkPanel
              href="/contact"
              label="Start a conversation"
              className="lg:max-w-[420px]"
            >
              <p className="text-lead font-light">
                Want to discuss a project?
              </p>
            </DarkPanel>
          </div>

          {/* A second route to the same place, so it is out of the tab order and
              out of the accessibility tree — and it does not render at all
              without an image, which would leave an empty anchor behind. */}
          {next && next.cover.src !== null ? (
            <Link href={`/work/${next.slug}`} aria-hidden="true" tabIndex={-1}>
              <ProjectCover
                image={next.cover}
                sizes="(min-width: 1024px) 45vw, 100vw"
                ratioClassName="aspect-[16/10] lg:aspect-auto lg:h-full"
              />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
