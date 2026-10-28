export { Header } from "./Header";

export { LogoMark } from "./LogoMark";
export type { LogoMarkProps } from "./LogoMark";

export { Footer, SocialLinks } from "./Footer";
export type { SocialLinksProps } from "./Footer";

export { BottomRail } from "./BottomRail";
export type { BottomRailProps } from "./BottomRail";

/* MenuOverlay is deliberately absent. It is Header's internal — it needs the
   trigger ref and the close callbacks to do its job, and mounting it on its own
   would give the site a menu with no way in or out. */
