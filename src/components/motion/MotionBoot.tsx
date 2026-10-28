/**
 * The two lines that make "readable with JS off" true for every primitive.
 *
 * Primitives that animate in (`Reveal`, `Stagger`, `SplitLines`, `CountUp`)
 * are server-rendered in their HIDDEN state, so there is no flash of content
 * that then vanishes and animates back. That is only safe if the hidden state
 * is undone whenever motion is not going to run. This component does that:
 *
 * - The inline script runs before the body is parsed. When the visitor allows
 *   motion it stamps `data-js` on `<html>`; under `prefers-reduced-motion` it
 *   does nothing.
 * - The stylesheet forces every `[data-enter]` element to its final state
 *   unless `data-js` is present. So: scripts disabled, script blocked, or
 *   reduced motion all land on the readable page (lessons.md T-009).
 * - If the bundle never hydrates (`MotionProvider` sets `data-hydrated` when
 *   it does), the script withdraws `data-js` after four seconds and the page
 *   degrades to the static version instead of staying blank.
 *
 * Mount it as the first child of `<body>`. `<html>` needs
 * `suppressHydrationWarning` because the attribute arrives before React does.
 */

const BOOT = `(function(){try{var d=document.documentElement;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.setAttribute("data-js","");setTimeout(function(){if(!d.hasAttribute("data-hydrated"))d.removeAttribute("data-js")},4000)}catch(e){}})();`;

const FAILSAFE = `html:not([data-js]) [data-enter]{opacity:1!important;transform:none!important;clip-path:none!important;visibility:visible!important}`;

export function MotionBoot() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      <style href="motion-boot" precedence="default">
        {FAILSAFE}
      </style>
    </>
  );
}
