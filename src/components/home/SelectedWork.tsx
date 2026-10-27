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
 * When art arrives, setting `cover.src` switches this to a real `next/image`
 * with `sizes` — §12 wants a genuine srcset on every content image.
 */
function Cover({ project, size }: CoverProps) {
  const full = size === "full";
  const { src, alt } = project.cover;

  const frame = full
    ? "aspect-[4/3] w-full"
    : "aspect-square w-14 shrink-0";

  if (src !== null) {
    return (
      <div className={`relative overflow-hidden bg-surface-alt ${frame}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={full ? "(min-width: 1024px) 50vw, 100vw" : "56px"}
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

function WorkRow({ project }: { project: Project }) {
  return (
    <Reveal>
      <article className="grid gap-8 lg:grid-cols-4 lg:items-start lg:gap-6">
        <div className="lg:col-span-2 lg:pr-10">
          <Chip>{project.tags[0]}</Chip>

          <h3 className="mt-6 text-[clamp(1.6rem,3vw,40px)] font-medium leading-[1.1]">
            <Link
              href={`/work/${project.slug}`}
              className="inline-block transition-opacity duration-300 ease-[ease] hover:opacity-70"
            >
              {project.title}
            </Link>
          </h3>

          <p className="mt-5 max-w-[46ch] text-lead font-light text-ink">
            {project.tagline}
          </p>

          <div className="mt-8 flex items-center gap-4 border-t border-border pt-5">
            <Cover project={project} size="thumb" />
            <div className="min-w-0">
              <p className="u-label">{project.shortTitle}</p>
              <p className="u-label mt-1 text-mid-grey">{project.dateLabel}</p>
            </div>
          </div>

          <Link
            href={`/work/${project.slug}`}
            className="u-label mt-6 inline-flex min-h-11 items-center gap-2 text-accent transition-opacity duration-300 ease-[ease] hover:opacity-70"
          >
            Read the case study
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="lg:col-span-2">
          <Cover project={project} size="full" />
        </div>
      </article>
    </Reveal>
  );
}

/**
 * Selected work — design.md §9.1 item 3. The top three of the curated strength
 * order, which leads with the production work rather than the newest commit
 * (lessons.md D-010).
 */
export function SelectedWork() {
  const featured = sortedProjects().slice(0, 3);

  return (
    <Section id="work">
      <Reveal className="grid gap-8 lg:grid-cols-4 lg:gap-6">
        <div className="lg:col-span-3">
          <Chip>Selected work</Chip>
          <h2 className="mt-8 max-w-[24ch] text-[clamp(1.75rem,3.6vw,48px)] font-medium leading-[1.1] tracking-[-0.02em]">
            Three systems in production, not three screenshots.
          </h2>
        </div>
      </Reveal>

      <div className="mt-16 flex flex-col gap-20 lg:mt-24 lg:gap-28">
        {featured.map((project) => (
          <WorkRow key={project.slug} project={project} />
        ))}
      </div>

      <Reveal className="mt-20 grid lg:mt-28 lg:grid-cols-4 lg:gap-6">
        <DarkPanel
          className="lg:col-span-2 lg:col-start-3"
          href="/work"
          label="[ View all projects ]"
        >
          <p className="text-lead font-light">
            Six case studies — four of them systems built for Web7Labs and
            Bitbash, each one with the rejected alternative written down.
          </p>
        </DarkPanel>
      </Reveal>
    </Section>
  );
}
