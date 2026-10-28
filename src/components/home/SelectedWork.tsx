import Image from "next/image";
import Link from "next/link";

import { Chip, DarkPanel } from "@/components/ui";
import { sortedProjects, type Project } from "@/data";

import { Reveal } from "./Reveal";
import { Section } from "./Section";

/** First letters of the short title, or its first two letters if it is one word. */
function monogram(shortTitle: string): string {
  const words = shortTitle.split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    return words
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }
  return shortTitle.slice(0, 2).toUpperCase();
}

interface CoverProps {
  project: Project;
  size: "thumb" | "full";
}

/**
 * The cover slot.
 *
 * Every `cover.src` in the data layer is currently null — no capture exists for
 * the four employer projects, and the two personal ones are still PNGs in
 * `assets/` awaiting a WebP export. So the null case is the normal case, and it
 * gets a *designed* frame rather than a broken `<img>` or a grey rectangle that
 * reads as a bug: the dotted rule from the grid motif, the project's monogram in
 * the display face, and the lime crop marks the menu reticle already uses
 * (design.md §8). It is aria-hidden because it carries no information the
 * adjacent title and date row do not already state.
 *
 * The full frame is the reference's 986×676 at 1440 (audit B3), spanning
 * columns 2 to 4. When art arrives, setting `cover.src` switches this to a real
 * `next/image` with `sizes` — §12 wants a genuine srcset on every content image.
 */
function Cover({ project, size }: CoverProps) {
  const full = size === "full";
  const { src, alt } = project.cover;

  const frame = full
    ? "aspect-[986/676] w-full"
    : "aspect-square w-14 shrink-0";

  if (src !== null) {
    return (
      <div className={`relative overflow-hidden bg-surface-alt ${frame}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={full ? "(min-width: 1024px) 75vw, 100vw" : "56px"}
          loading="lazy"
          className="object-cover"
        />
      </div>
    );
  }

  const mark = "absolute size-2 border-accent-2";

  return (
    <div
      aria-hidden="true"
      className={`relative border border-dotted border-grid-line bg-surface-alt ${frame}`}
    >
      {full ? (
        <>
          <span className={`${mark} left-3 top-3 border-l-2 border-t-2`} />
          <span className={`${mark} right-3 top-3 border-r-2 border-t-2`} />
          <span className={`${mark} bottom-3 left-3 border-b-2 border-l-2`} />
          <span className={`${mark} bottom-3 right-3 border-b-2 border-r-2`} />
        </>
      ) : null}

      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className={`font-display font-bold tracking-[2px] text-accent ${
            full ? "text-[clamp(2.5rem,7vw,5.5rem)]" : "text-label"
          }`}
        >
          {monogram(project.shortTitle)}
        </span>
      </span>

      {full ? (
        <span className="u-label absolute bottom-4 left-4 right-4 text-mid-grey">
          {project.tags.join(" / ")}
        </span>
      ) : null}
    </div>
  );
}

/**
 * One card is one link (audit B3). Chip and uppercase title at the top of
 * column 1, the tagline and thumbnail row pushed to the bottom so they sit on
 * the image's baseline, the image across columns 2 to 4. No second "read the
 * case study" control: the card is the control, and the link's accessible name
 * is the heading plus the tagline, which is what a reader would want announced.
 */
function WorkCard({ project }: { project: Project }) {
  return (
    <Reveal>
      <Link
        href={`/work/${project.slug}`}
        className="group grid gap-8 lg:grid-cols-4 lg:gap-6"
      >
        <div className="flex flex-col lg:justify-between lg:pr-10">
          <div>
            <Chip>Work</Chip>
            <h3 className="mt-6 text-[clamp(1.6rem,3vw,40px)] font-medium uppercase leading-[1.1] transition-opacity duration-300 ease-[ease] group-hover:opacity-70">
              {project.shortTitle}
            </h3>
          </div>

          <div className="mt-8 lg:mt-16">
            <p className="max-w-[40ch] text-body font-light text-ink">
              {project.tagline}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <Cover project={project} size="thumb" />
              <div className="min-w-0">
                <p className="text-body font-medium leading-tight">
                  {project.shortTitle}
                </p>
                <p className="mt-1 text-label-sm text-mid-grey">
                  {project.dateLabel}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="transition-opacity duration-300 ease-[ease] group-hover:opacity-90 lg:col-span-3">
          <Cover project={project} size="full" />
        </div>
      </Link>
    </Reveal>
  );
}

/**
 * Selected work — design.md §9.1 item 3. The top three of the curated strength
 * order, which leads with the production work rather than the newest commit
 * (lessons.md D-010).
 *
 * No section heading and no chip above the cards: the reference opens straight
 * on the first card, and each card carries its own `WORK` chip (audit B3).
 */
export function SelectedWork() {
  const featured = sortedProjects().slice(0, 3);

  return (
    <Section id="work">
      <div className="flex flex-col gap-20 lg:gap-28">
        {featured.map((project) => (
          <WorkCard key={project.slug} project={project} />
        ))}
      </div>

      <Reveal className="mt-20 grid lg:mt-28 lg:grid-cols-4 lg:gap-6">
        <DarkPanel
          className="lg:col-span-2 lg:col-start-3"
          href="/work"
          label="[ View all projects ]"
          subline="Each one includes the alternative that was rejected, and why."
        >
          <p className="text-lead font-light">
            Six case studies, four of them systems built for Web7Labs and
            Bitbash.
          </p>
        </DarkPanel>
      </Reveal>
    </Section>
  );
}
