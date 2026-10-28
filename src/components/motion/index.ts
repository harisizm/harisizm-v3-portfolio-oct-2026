/**
 * The motion primitives — lessons.md D-017. The API is documented in
 * `README.md` beside this file; it is the contract the rest of the site
 * builds on.
 */

export { EASE, DURATION, STAGGER, POINTER_FINE, houseTransition } from "./tokens";

export { MotionBoot } from "./MotionBoot";
export { MotionProvider } from "./MotionProvider";
export { PageTransition } from "./PageTransition";

export { Reveal, Stagger } from "./Reveal";
export type { RevealProps, RevealTag, StaggerProps } from "./Reveal";

export { SplitLines } from "./SplitLines";
export type { SplitLinesProps, SplitLinesTag } from "./SplitLines";

export { Press } from "./Press";
export type { PressProps } from "./Press";

export { Magnetic } from "./Magnetic";
export type { MagneticProps } from "./Magnetic";

export { CountUp } from "./CountUp";
export type { CountUpProps } from "./CountUp";

export { Marquee } from "./Marquee";
export type { MarqueeProps } from "./Marquee";

export { Pulse } from "./Pulse";
export type { PulseProps } from "./Pulse";

export { Parallax } from "./Parallax";
export type { ParallaxProps } from "./Parallax";

export { MorphCover, useCoverMorph } from "./CoverMorph";
export type { MorphCoverProps } from "./CoverMorph";

export { useMediaQuery, usePointerFine } from "./useMediaQuery";
