import { Chip } from "@/components/ui";
import { site } from "@/lib/site";

/**
 * The fallback that is never behind anything — no hover, no JavaScript, no form.
 *
 * This is the single biggest thing V2 got wrong: it shipped no `mailto:`
 * anywhere on the site and its only contact CTA had no handler at all
 * (lessons.md T-002, T-007). Both links here are plain anchors in the server
 * HTML, so they work with scripts disabled and on a touch device that has no
 * hover state to reveal them.
 */
export function DirectLines() {
  return (
    <section
      aria-labelledby="direct-heading"
      className="u-container border-y border-border bg-surface-alt py-10"
    >
      <div className="mx-auto flex w-full max-w-[1408px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Chip>Direct</Chip>
          <h2 id="direct-heading" className="mt-4 text-title font-medium tracking-tight">
            Or skip the forms entirely.
          </h2>
        </div>

        <dl className="flex flex-col gap-6 sm:flex-row sm:gap-12">
          <div>
            <dt className="u-label text-mid-grey">Email</dt>
            <dd>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center break-all text-body text-accent underline decoration-accent underline-offset-4 transition-opacity duration-300 ease-[ease] hover:opacity-70"
              >
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="u-label text-mid-grey">Phone</dt>
            <dd>
              <a
                href={`tel:${site.phoneHref}`}
                className="inline-flex min-h-11 items-center text-body text-accent underline decoration-accent underline-offset-4 transition-opacity duration-300 ease-[ease] hover:opacity-70"
              >
                {site.phone}
              </a>
            </dd>
            <dd className="text-label text-mid-grey">
              {site.location} — UTC+5
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
