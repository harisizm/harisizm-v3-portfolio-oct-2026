"use client";

import { useEffect } from "react";

import { useReducedMotion } from "@/hooks";

/* The two frames of the tab icon (lessons.md D-022): the stacked word as
   outlines (Chakra Petch 700, converted with fontTools so the tab never
   needs the font), canvas on the signal orange, with a caret block after
   "izm" on and off. `app/icon.svg` is the same drawing without the caret,
   which is what a visitor without JavaScript, or with reduced motion, keeps. */
const HARIS = `<path fill="#EFECE6" transform="translate(2.53 24.45) scale(0.02444 -0.02444)" d="M60 714H192V421L269 498H428L539 387V0H407V351L373 386H287L192 290V0H60ZM639 92V206L731 298H984V361L953 392H803L773 361V333H643V390L750 498H1007L1114 390V0H995V71L921 0H731ZM912 102 984 171V204H796L769 177V127L794 102ZM1229 498H1351V415L1431 498H1573V386H1458L1361 286V0H1229ZM1633 602V666L1679 712H1749L1795 666V602L1749 556H1679ZM1648 498H1780V0H1648ZM1885 98V159H2015V131L2037 108H2199L2221 131V174L2198 198H1983L1889 293V402L1984 498H2244L2341 400V339H2211V367L2189 390H2041L2019 367V328L2042 304H2257L2351 209V96L2256 0H1982Z"/>`;
const IZM = `<path fill="#EFECE6" transform="translate(12.07 47.86) scale(0.02444 -0.02444)" d="M55 602V666L101 712H171L217 666V602L171 556H101ZM70 498H202V0H70ZM297 102 574 389V391H307V498H745V396L468 109V107H745V0H297ZM830 498H952V416L1033 498H1159L1227 429L1295 498H1469L1576 390V0H1444V351L1410 386H1326L1273 333V0H1145V353L1113 386H1053L962 294V0H830Z"/>`;
function frame(caret: boolean): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
    `<rect width="64" height="64" fill="#C23A05"/>` +
    HARIS +
    IZM +
    (caret ? `<rect x="53.6" y="30.5" width="5" height="17.4" fill="#EFECE6"/>` : "") +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const FRAMES = [frame(true), frame(false)];
/** The header caret blinks on a 1s cycle; the tab keeps time with it. */
const PERIOD = 1000;

/**
 * Blinks the caret in the browser tab's icon by swapping the icon link's
 * `href` between two inline SVG frames. Runs only while the document is
 * visible, since a background tab's icon is what a visitor sees when they
 * come back and a half-blink there is noise, and never under reduced motion.
 * Renders nothing.
 */
export function FaviconBlink() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (link === null) return;
    const original = link.href;
    let on = true;
    let id: number | undefined;

    const tick = () => {
      link.href = FRAMES[on ? 0 : 1];
      on = !on;
    };
    const start = () => {
      if (id !== undefined) return;
      tick();
      id = window.setInterval(tick, PERIOD / 2);
    };
    const stop = () => {
      if (id === undefined) return;
      window.clearInterval(id);
      id = undefined;
      link.href = FRAMES[0];
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
      link.href = original;
    };
  }, [reduced]);

  return null;
}
