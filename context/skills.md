# Skills & Interests

From the `toolboxItems` and `hobbies` arrays in
`reference/v2/sections/About.tsx`.

---

## Toolbox (18 items, in V2 order)

V2 rendered these as two infinite marquee rows — one scrolling left over 60s,
one scrolling right over 45s — with no grouping, no proficiency levels, and no
way to stop the motion.

| # | Technology | Icon source |
|---|---|---|
| 1 | JavaScript | devicon `javascript/javascript-original` |
| 2 | HTML5 | devicon `html5/html5-original` |
| 3 | CSS3 | devicon `css3/css3-original` |
| 4 | React | devicon `react/react-original` |
| 5 | TypeScript | devicon `typescript/typescript-original` |
| 6 | Python | devicon `python/python-original` |
| 7 | Tailwind CSS | devicon `tailwindcss/tailwindcss-original` |
| 8 | Node.js | devicon `nodejs/nodejs-original` |
| 9 | MongoDB | devicon `mongodb/mongodb-original` |
| 10 | MySQL | devicon `mysql/mysql-original` |
| 11 | Express | devicon `express/express-original` |
| 12 | Vite | devicon `vitejs/vitejs-original` |
| 13 | Redux | devicon `redux/redux-original` |
| 14 | Stripe | hand-written local React component (`StripeIcon.tsx`) |
| 15 | Pandas | devicon `pandas/pandas-original` |
| 16 | Streamlit | devicon `streamlit/streamlit-original` (pinned to `devicon@latest`) |
| 17 | Cloudinary | hand-written local React component (`CloudinaryIcon.tsx`) |
| 18 | Vercel | devicon `vercel/vercel-original` |

### Suggested grouping for V3

V2 presented a flat list, which read as padding. A grouped version of the same
truth:

- **Languages:** JavaScript, TypeScript, Python, HTML5, CSS3
- **Frontend:** React, Redux, Tailwind CSS, Vite
- **Backend:** Node.js, Express
- **Databases:** MongoDB, MySQL
- **Data / viz:** Pandas, Streamlit, Plotly, Recharts, Matplotlib
- **Services / infra:** Stripe, Cloudinary, Vercel, Nodemailer, JWT

Plotly, Recharts, Matplotlib, Nodemailer and JWT appear in project bullets but
were **absent from the V2 toolbox**. Reconcile the two lists in V3 so the
skills section and the project bullets agree.

### Icon delivery note

Every icon except Stripe and Cloudinary was fetched at runtime from
`cdn.jsdelivr.net`, which required a `remotePatterns` entry in `next.config.mjs`
and made the skills section dependent on a third-party CDN. V3 should vendor the
SVGs locally — 18 small files, no network dependency, no layout shift.

---

## Hobbies & interests (7 items)

V2 made these draggable pills inside a 200px-tall card, positioned by hardcoded
percentage offsets. The drag interaction was undiscoverable and did nothing.

| Interest | Emoji |
|---|---|
| Sketching | 🎨 |
| Photography | 📸 |
| FPV Drones | 🛸 |
| Gaming | 🎮 |
| Basketball | 🏀 |
| Fitness | 🏋️ |
| Snooker | 🎱 |

**FPV drones and photography are the most distinctive items here** and could
carry real visual content in V3 (actual photos, drone footage) rather than an
emoji pill. Sketching likewise.

---

## Other personal content V2 carried

- **"My Reads" card:** a single book cover — Dostoevsky's *Crime and Punishment*
  — with the description "Explore the classics shaping my perspectives."
  Asset: `assets/brand/crime-and-punishment.png`. One book framed as a plural
  reading habit; either make it a real list in V3 or cut it.
  (V2's repo also held three unused alternate book covers under
  `public/book_options/`, which were not carried over.)
- **Location card:** a static map image of Lahore with a memoji pin, linking out
  to `google.com/maps/place/Lahore,+Punjab,+Pakistan`.
  Asset: `assets/brand/map.png` (1.1 MB for a decorative static image).
