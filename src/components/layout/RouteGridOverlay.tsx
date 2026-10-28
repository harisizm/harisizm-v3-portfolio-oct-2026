"use client";

import { usePathname } from "next/navigation";

import { GridOverlay } from "@/components/ui";

/**
 * The page-level column rules, except on case-study pages.
 *
 * The reference draws the dotted grid on every page but the case studies,
 * where the only vertical is the rail's own divider: a rule running through
 * a 33.6px statement is noise, not structure. The route is the only thing
 * that knows which page this is, and only a client component can read it, so
 * this thin wrapper exists instead of the layout mounting `GridOverlay`
 * directly.
 */
export function RouteGridOverlay() {
  const pathname = usePathname();
  if (/^\/work\/[^/]+\/?$/.test(pathname)) return null;
  return <GridOverlay />;
}
