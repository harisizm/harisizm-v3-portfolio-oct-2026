import Image from "next/image";
import type { ImageRef } from "@/data";

export interface ProjectCoverProps {
  image: ImageRef;
  /** Required: the reference serves a 2000px asset into a 224px slot (§7 of the teardown). */
  sizes: string;
  /** Above the fold only — eager + fetchpriority high. design.md §12. */
  priority?: boolean;
  ratioClassName?: string;
  className?: string;
}

/**
 * A project image, or nothing at all.
 *
 * Every `cover.src` in the data layer is currently null, so this returns null on
 * every project today. That is the point: an empty frame, a grey box or a "coming
 * soon" tile would all be a control promising something that does not exist
 * (lessons.md T-002). Callers lay out so that a missing cover collapses cleanly.
 */
export function ProjectCover({
  image,
  sizes,
  priority = false,
  ratioClassName = "aspect-[16/10]",
  className = "",
}: ProjectCoverProps) {
  if (image.src === null) return null;

  return (
    <div
      className={`relative w-full overflow-hidden bg-surface-alt ${ratioClassName} ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
