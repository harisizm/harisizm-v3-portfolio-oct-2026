import Image from "next/image";
import { MorphCover, Parallax } from "@/components/motion";
import type { ImageRef } from "@/data";

/**
 * The one frame every cover sits in: 16:10, full width of its column, a
 * `surface-alt` ground with a hairline border, the image contained inside it.
 * Covers are screenshots and are never cropped (owner rule, 2026-10-28); where
 * the ratio differs the letterbox reads as a deliberate window, not damage.
 * `CoverMorph` renders its clone in this same frame so the morph never re-crops
 * mid-flight. Exported for the home card, which builds its own frame.
 */
export const COVER_FRAME =
  "relative aspect-[16/10] w-full overflow-hidden border border-border bg-surface-alt";

/** The drift the contained image makes inside its window. */
export const COVER_DRIFT = 3;

export interface ProjectCoverProps {
  image: ImageRef;
  /** Required: the reference serves a 2000px asset into a 224px slot (§7 of the teardown). */
  sizes: string;
  /** Above the fold only — eager + fetchpriority high. design.md §12. */
  priority?: boolean;
  className?: string;
  /**
   * Makes this frame one end of the cover morph (lessons.md D-017). The slug
   * pairs it with the same project's cover on another page; `departTo` lists
   * the pathnames whose links lift it off this one. Omit it where the cover is
   * decoration, as in Next Up, and only the parallax applies.
   */
  morph?: { slug: string; departTo?: readonly string[] };
  /** Scroll-linked drift inside the frame. On by default. */
  parallax?: boolean;
}

/**
 * A project image, or nothing at all.
 *
 * When `image.src` is null this returns null. An empty frame, a grey box or a
 * "coming soon" tile would all be a control promising something that does not
 * exist (lessons.md T-002). Callers lay out so that a missing cover collapses
 * cleanly.
 */
export function ProjectCover({
  image,
  sizes,
  priority = false,
  className = "",
  morph,
  parallax = true,
}: ProjectCoverProps) {
  if (image.src === null) return null;

  const frame = `${COVER_FRAME} ${className}`;

  const picture = (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-contain"
    />
  );
  const inner = parallax ? (
    <Parallax amount={COVER_DRIFT} overscan={0}>
      {picture}
    </Parallax>
  ) : (
    picture
  );

  if (morph) {
    return (
      <MorphCover slug={morph.slug} departTo={morph.departTo} className={frame}>
        {inner}
      </MorphCover>
    );
  }

  return <div className={frame}>{inner}</div>;
}
