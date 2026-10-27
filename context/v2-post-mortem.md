# V2 Post-Mortem — Do Not Repeat

Findings from reading the full V2 source on 2026-10-27. Line references point at
files under `reference/v2/`.

Everything here is a defect or a structural problem, not a taste preference.

---

## 1. The global font-size hack

`globals.css` opened with:

```css
html { font-size: 77%; }
```

Every `rem` in the app — so every Tailwind spacing, sizing and type utility —
was silently scaled to 77% of its documented value. `text-lg` was not 18px,
`p-8` was not 32px. This meant:

- Tailwind's own scale became unreliable; you could no longer reason about any
  class from the docs.
- Accessibility broke: a user who raises their browser's base font size gets
  77% of the increase they asked for.
- Every subsequent sizing decision was a guess compensating for the hack, which
  is why the codebase is full of arbitrary values like `h-[240px]`,
  `min-h-[60px]`, `text-[10px]`.

**For V3:** never scale the root font size to fix a sizing problem. If the
default type scale feels too large, override the scale in `tailwind.config.ts`
where it stays explicit and inspectable.

## 2. The same interaction was implemented three times

The "hover a button, fan out floating social icons, click one to copy the email,
show a toast" flow exists in full in **both** `Hero.tsx` and `Contact.tsx`, with
duplicated state (`isContactHovered`, `hoverTimeoutRef`, `showCopyToast`), a
duplicated 2-second toast `useEffect`, duplicated inline LinkedIn/email SVG
paths, and duplicated hardcoded `x: 175 / x: 205` offsets.

`Projects.tsx` also defines its own local `TechIcon` component while
`components/TechIcon.tsx` already exists and does the same job.

**For V3:** one `SocialLinks` component, one `useCopyToClipboard` hook, one
`Toast`, one `TechIcon`. The email address should live in a single config
constant, not be typed out in two separate `navigator.clipboard.writeText()`
calls.

## 3. Dead and misleading controls

- **"Hire me" button** (`Contact.tsx`): has no `onClick` and no `href`. Clicking
  it does nothing. It only renders a hover state. This is the single most
  damaging bug on the site — the primary conversion control is inert.
- **"Live Demo" button on Grocery POS** (`Projects.tsx`): `link: "#"`, so it
  scrolls to the top of the page instead of opening a demo.
- **Draggable hobby pills** (`About.tsx`): `drag` with `dragConstraints`, but
  dragging accomplishes nothing and there is no affordance suggesting it is
  possible.
- **No `mailto:` anywhere.** The only way to reach the email was to hover a
  button, notice a floating icon, click it, and read a toast saying it was
  copied. On touch devices, where hover does not exist, this is close to
  unreachable.

**For V3:** every interactive element does something on click. The primary CTA
is a real link or a real form.

## 4. Mobile and touch were an afterthought

- The whole contact/social mechanism is hover-driven (point 3).
- Hover-only tooltips carry the only labels for the tech-stack icons and the
  social buttons — invisible on touch.
- The CV preview panel in `Hero.tsx` hand-computes its own position with
  ~40 lines of `getBoundingClientRect` maths, viewport clamping and three
  different transform origins, including a branch for when there is not enough
  room above. This is a popover library reimplemented badly.
- `tailwind.config.ts` defined only `sm: 375px`, `md: 768px`, `lg: 1024px` —
  no `xl`/`2xl`, so the layout stopped adapting above 1024px while
  `Projects.tsx` separately opted into a `max-w-[1400px]` container. The grid
  and the container disagreed about how wide the site is.

**For V3:** design the touch path first. Use a real popover primitive
(Radix/Floating UI) rather than manual coordinate maths.

## 5. Section order buried the strongest evidence

V2 order was: Hero → Projects → Education → Experience → About → Contact.

The nav exposed the same order. Consequences:

- Education (a degree that does not finish until 2027) sat above work history.
- The two work entries are a chat-support role and a 2-month email-marketing
  role — neither is engineering — so placing them in the middle of the page gave
  the weakest material prime position.
- "About" (toolbox, hobbies, reading, location) came *after* experience, so a
  recruiter met the skills list only on the fourth scroll.

**For V3:** lead with proof of shipped work, put skills near it, and let
education/non-technical work sit lower or combine into a compact timeline.

## 6. Unoptimised images

~8 MB of a 21 MB repo was images, served largely as PNGs:

| File | Size | Role |
|---|---|---|
| `uol logo.png` | 1.4 MB | a logo, used as a blurred card background |
| `map.png` | 1.1 MB | a static decorative map |
| `zayr.png` | 1.3 MB | project screenshot |
| `zayrah.png` | 1.3 MB | project screenshot |
| `Khilariverse.png` | 936 KB | project screenshot |
| `cert-image.png` | 556 KB | blurred card background |
| `grain.jpg` | 176 KB | texture, loaded on **every** card |

Worse, several were rendered with Next's `unoptimized` flag set
(`EducationAndCertification.tsx`), which disables Next's image pipeline
entirely, and each project card decoded its screenshot **twice** — once blurred
as a background wash, once sharp.

`grain.jpg` was applied as a CSS `background-image` via `grainImage.src` on
every single `Card`, plus the hero and the contact block.

**For V3:** WebP/AVIF, correct dimensions, no `unoptimized`, one decode per
image, and generate noise with CSS/SVG rather than a 176 KB JPEG.

## 7. All content was hardcoded in JSX

Projects, toolbox, hobbies, experience, education and certifications were object
literals and raw markup inside the components that rendered them. Editing a
project bullet meant editing a 240-line component.

**For V3:** a `content/` or `data/` layer (TS modules, MDX, or a CMS). The
`.md` files in this folder are already structured for that — `projects.md` ships
a ready-to-use JSON block.

## 8. Oversized components

`Hero.tsx` is **529 lines**. It contains: the nav, scroll-spy logic, a
scroll-to-section helper, ten decorative orbit elements, an SVG rotating text
ring, the avatar, the full social-fan-out mechanism, a clipboard toast, a
hover-positioned CV preview panel with manual placement maths, and a CV modal.

`Projects.tsx` is 240 lines, `About.tsx` 218.

**For V3:** keep section components to layout + data mapping. Push behaviour
into hooks and sub-components.

## 9. Accessibility gaps

- Decorative orbit icons, the grain overlay and the blurred backgrounds are all
  in the DOM with no `aria-hidden`.
- Infinite marquee animations (`animate-move-left`, `animate-move-right`) and
  multiple `animate-ping` loops run unconditionally — no
  `prefers-reduced-motion` guard anywhere in the codebase.
- Icon-only buttons rely on hover tooltips instead of `aria-label`.
- `alt="map"` and `alt="smiling memoji"` on purely decorative images.
- The nav was a row of `<a>` elements with `preventDefault` + manual scroll,
  losing native anchor behaviour and keyboard expectations.

**For V3:** `aria-hidden` on decoration, a `prefers-reduced-motion` media query
honoured by every animation, `aria-label` on every icon button.

## 10. Small correctness and hygiene issues

- `layout.tsx` metadata: `description: "portfolio -2"` — the literal page
  description served to search engines and link previews. No Open Graph tags, no
  `og:image`, no canonical URL, no favicon beyond the Next default.
- A hardcoded `v3.0` version badge was rendered in the corner of **V2**
  (`layout.tsx`), at `text-white/10` so it was nearly invisible — a stray debug
  artifact.
- `grainIamge` — typo in the import name in `Hero.tsx`, carried in the source.
- `cv.pdf` was duplicated in both `public/assets/docs/` and `src/assets/docs/`
  (232 KB each); the Coursera PDF likewise existed in two places under two
  different names.
- `public/book_options/` held three unused candidate images (264 KB), and
  `src/assets/images/` held five unused memoji variants — dead assets shipped
  in the repo.
- The footer read "© 2026. All rights reserved - Haris" with the year
  hardcoded.
- Copy errors: "Lets create something amazing together" (missing apostrophe),
  "Automated schedule parsing ensure 100% accuracy", "FOR UOL SE Department"
  shouting mid-title.

---

## Summary: the five things that matter most

1. **Make the primary CTA work.** A contact path that survives no-hover and
   no-JS. ("Hire me" did nothing at all in V2.)
2. **Drop the 77% root font hack** and build on an honest type scale.
3. **Put content in a data layer**, not inside components.
4. **Design the touch/mobile path first**, not as a fallback.
5. **Budget the images.** Target a page weight under ~1 MB, not ~8 MB of PNGs.
