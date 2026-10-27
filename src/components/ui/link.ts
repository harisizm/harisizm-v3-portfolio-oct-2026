/**
 * Shared href handling for the link-shaped primitives (SplitCta, RuleToLink,
 * DarkPanel). Each one had its own copy of these two lines — one implementation
 * per behaviour, per lessons.md T-005.
 *
 * Not re-exported from index.ts: that would create a cycle, and nothing outside
 * this folder needs it.
 */

export interface ResolvedHref {
  /** Route internally through next/link — in-app paths and same-page anchors. */
  internal: boolean;
  /** Attributes to spread on an `<a>`. Empty object when it opens in place. */
  targetProps: { target: "_blank"; rel: "noreferrer noopener" } | Record<string, never>;
}

export function resolveHref(href: string, newTab?: boolean): ResolvedHref {
  const internal = href.startsWith("/") || href.startsWith("#");

  // `mailto:` and `tel:` are absolute but must NOT open a new tab — a blank tab
  // left behind after the mail client launches is the usual bug here.
  const opensNewTab = newTab ?? /^https?:/i.test(href);

  return {
    internal,
    targetProps: opensNewTab
      ? { target: "_blank", rel: "noreferrer noopener" }
      : {},
  };
}
