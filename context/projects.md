# Projects

All six projects shipped on V2, in the order V2 displayed them. Every bullet and
URL below is verbatim from `reference/v2/sections/Projects.tsx`.

Screenshots live in `assets/projects/`. Note the `company` field was an empty
string on all six — V2 still rendered the `• year` separator next to it, which
produced a stray leading bullet on every card.

---

## 1. TransGPA: Academic Transcript Analyzer & CGPA Simulator

- **Date:** Jan 2026
- **Live:** https://trans-gpa-uol.vercel.app
- **Repo:** https://github.com/harisizm/TransGpa
- **Screenshot:** `assets/projects/Transgpa.png`
- **Stack:** React, TypeScript, Tailwind, Vite
- **Bullets:**
  - Built a privacy-first transcript analyzer used by 100+ students, enabling real-time GPA simulations across multiple semesters
  - Visualized 4+ academic performance metrics using Recharts dashboards
  - Parsed academic PDFs locally in <2 seconds, ensuring zero server-side data storage

> Recharts is named in the bullets but was missing from the displayed tech stack
> icons. Worth correcting in V3.

## 2. Timetable Generator for UOL SE Department

- **Date:** Aug 2025
- **Live:** https://timetable-generator-uol-se.streamlit.app
- **Repo:** https://github.com/harisizm/Timetable_Generator_UOL_deployed
- **Screenshot:** `assets/projects/timetable generator.png`
- **Stack:** Python, Pandas, Plotly
- **Bullets:**
  - Developed a Python-based timetable generator used by 60+ students with smart semester/section filtering
  - Implemented curriculum cross-checking and shareable image output using Streamlit and Matplotlib
  - Automated schedule parsing ensure 100% accuracy from university Excel sheets

> Two copy fixes for V3: "ensure" should read "ensuring", and the bullets credit
> Streamlit + Matplotlib while the icons show Plotly — pick one truth. The V2
> title also shouted mid-sentence: "FOR UOL SE Department".

## 3. Khilariverse: E-commerce Gaming Peripherals Store

- **Date:** Dec 2025
- **Live:** https://khilariverse.vercel.app
- **Repo:** https://github.com/harisizm/Khilariverse
- **Screenshot:** `assets/projects/Khilariverse.png`
- **Stack:** MongoDB, Express, React, Node.js, Redux
- **Bullets:**
  - Developed a full-stack MERN platform supporting 100+ products and role-based access for admins and users
  - Implemented 5+ admin analytics modules for sales, inventory, and order tracking
  - Integrated Cloudinary and Nodemailer, automating 100% of image storage and transactional emails

## 4. Grocery Store Management System (POS)

- **Date:** Dec 2025
- **Live:** none — V2 rendered `link: "#"`
- **Repo:** https://github.com/harisizm/GROCERY-POS-SYSTEM
- **Screenshot:** `assets/projects/grocery pos.png`
- **Stack:** React, Node.js, MySQL, Express
- **Bullets:**
  - Developed a full-featured web-based POS and inventory system with real-time sales processing
  - Implemented inventory, product, and customer management with low-stock alerts and automated updates
  - Designed a normalized relational database in MySQL to ensure data integrity and efficient querying

> **Dead control in V2:** the "Live Demo" button still rendered and pointed at
> `#`, so clicking it jumped to the top of the page. V3 must hide the live
> button when there is no deployment.

## 5. Zayrah: E-commerce Grocery Shopping Website

- **Date:** May 2025
- **Live:** https://zayrah-by-harisizm.vercel.app
- **Repo:** https://github.com/harisizm/Zayrah
- **Screenshot:** `assets/projects/zayrah.png`
- **Stack:** MongoDB, Node.js, React, Tailwind
- **Bullets:**
  - Built a full-stack e-commerce platform with React, Node, Express, MongoDB, and Stripe payments
  - Implemented authentication and role-based access (users, sellers, admins) with JWT and product management
  - Designed a responsive, mobile-friendly UI and integrated real-time APIs for seamless seller experiences

## 6. Zayr: E-commerce Clothing Brand Website

- **Date:** April 2025
- **Live:** https://zayrbyharisizm.vercel.app
- **Repo:** https://github.com/harisizm/Zayr_by_Harisizm
- **Screenshot:** `assets/projects/zayr.png`
- **Stack:** React, HTML5, CSS3, JavaScript
- **Bullets:**
  - Built with React and React Router featuring customized CSS styling
  - Implemented product listing by categories and smooth navigation with functional routing
  - Developed functional Cart and login/signup pages for a complete retail flow

---

## Machine-readable copy

Same data, ready to drop into a V3 data layer. `techStack` entries are
[devicon](https://devicon.dev) slugs; V2 resolved them as
`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{family}/{slug}.svg`
where `family` is the slug up to the first hyphen.

```json
[
  {
    "slug": "transgpa",
    "title": "TransGPA: Academic Transcript Analyzer & CGPA Simulator",
    "date": "2026-01",
    "dateLabel": "Jan 2026",
    "live": "https://trans-gpa-uol.vercel.app",
    "repo": "https://github.com/harisizm/TransGpa",
    "image": "assets/projects/Transgpa.png",
    "techStack": ["react-original", "typescript-original", "tailwindcss-original", "vitejs-original"],
    "results": [
      "Built a privacy-first transcript analyzer used by 100+ students, enabling real-time GPA simulations across multiple semesters",
      "Visualized 4+ academic performance metrics using Recharts dashboards",
      "Parsed academic PDFs locally in <2 seconds, ensuring zero server-side data storage"
    ]
  },
  {
    "slug": "timetable-generator",
    "title": "Timetable Generator for UOL SE Department",
    "date": "2025-08",
    "dateLabel": "Aug 2025",
    "live": "https://timetable-generator-uol-se.streamlit.app",
    "repo": "https://github.com/harisizm/Timetable_Generator_UOL_deployed",
    "image": "assets/projects/timetable generator.png",
    "techStack": ["python-original", "pandas-original", "plotly-original"],
    "results": [
      "Developed a Python-based timetable generator used by 60+ students with smart semester/section filtering",
      "Implemented curriculum cross-checking and shareable image output using Streamlit and Matplotlib",
      "Automated schedule parsing ensure 100% accuracy from university Excel sheets"
    ]
  },
  {
    "slug": "khilariverse",
    "title": "Khilariverse: E-commerce Gaming Peripherals Store",
    "date": "2025-12",
    "dateLabel": "Dec 2025",
    "live": "https://khilariverse.vercel.app",
    "repo": "https://github.com/harisizm/Khilariverse",
    "image": "assets/projects/Khilariverse.png",
    "techStack": ["mongodb-original", "express-original", "react-original", "nodejs-original", "redux-original"],
    "results": [
      "Developed a full-stack MERN platform supporting 100+ products and role-based access for admins and users",
      "Implemented 5+ admin analytics modules for sales, inventory, and order tracking",
      "Integrated Cloudinary and Nodemailer, automating 100% of image storage and transactional emails"
    ]
  },
  {
    "slug": "grocery-pos",
    "title": "Grocery Store Management System (POS)",
    "date": "2025-12",
    "dateLabel": "Dec 2025",
    "live": null,
    "repo": "https://github.com/harisizm/GROCERY-POS-SYSTEM",
    "image": "assets/projects/grocery pos.png",
    "techStack": ["react-original", "nodejs-original", "mysql-original", "express-original"],
    "results": [
      "Developed a full-featured web-based POS and inventory system with real-time sales processing",
      "Implemented inventory, product, and customer management with low-stock alerts and automated updates",
      "Designed a normalized relational database in MySQL to ensure data integrity and efficient querying"
    ]
  },
  {
    "slug": "zayrah",
    "title": "Zayrah: E-commerce Grocery Shopping Website",
    "date": "2025-05",
    "dateLabel": "May 2025",
    "live": "https://zayrah-by-harisizm.vercel.app",
    "repo": "https://github.com/harisizm/Zayrah",
    "image": "assets/projects/zayrah.png",
    "techStack": ["mongodb-original", "nodejs-original", "react-original", "tailwindcss-original"],
    "results": [
      "Built a full-stack e-commerce platform with React, Node, Express, MongoDB, and Stripe payments",
      "Implemented authentication and role-based access (users, sellers, admins) with JWT and product management",
      "Designed a responsive, mobile-friendly UI and integrated real-time APIs for seamless seller experiences"
    ]
  },
  {
    "slug": "zayr",
    "title": "Zayr: E-commerce Clothing Brand Website",
    "date": "2025-04",
    "dateLabel": "April 2025",
    "live": "https://zayrbyharisizm.vercel.app",
    "repo": "https://github.com/harisizm/Zayr_by_Harisizm",
    "image": "assets/projects/zayr.png",
    "techStack": ["react-original", "html5-original", "css3-original", "javascript-original"],
    "results": [
      "Built with React and React Router featuring customized CSS styling",
      "Implemented product listing by categories and smooth navigation with functional routing",
      "Developed functional Cart and login/signup pages for a complete retail flow"
    ]
  }
]
```

## Before V3 ships

- **Verify every live URL still resolves.** These are free-tier Vercel and
  Streamlit deployments; Streamlit apps sleep after inactivity and Vercel
  projects get deleted. A dead "Live Demo" link is worse than no link.
- **Three screenshots are oversized:** `zayr.png` (1.3 MB), `zayrah.png`
  (1.3 MB), `Khilariverse.png` (936 KB). Re-export as WebP before using them.
- **Filenames contain spaces** (`grocery pos.png`, `timetable generator.png`).
  Rename to kebab-case in V3.
- V2 showed each screenshot twice per card — once blurred as a background wash
  behind the title, once sharp in a 16:9 frame. Decide whether that is worth the
  double decode cost.
- Chronology was scrambled: the display order ran Jan 2026 → Aug 2025 → Dec 2025
  → Dec 2025 → May 2025 → Apr 2025. Either sort by date or sort by strength
  deliberately, but not neither.
