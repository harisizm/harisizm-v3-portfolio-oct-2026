# V2 Copy Deck

Every user-facing string V2 rendered, in page order, verbatim — typos included
and flagged. Use this so V3 rewrites deliberately rather than re-inventing from
a blank page.

Project bullets are not repeated here; they live in `projects.md`.

---

## Navigation

Fixed pill nav, centred, top of viewport. Six items:

> Home · Projects · Education · Experience · About · Contact

## Hero

| Slot | Copy |
|---|---|
| Rotating ring (SVG textPath) | Available for new projects |
| H2 (left column) | Building Production-Grade Web Apps That Solve Real Problems |
| Body | Full-stack software engineer specializing in MERN, data visualization, and automation. I design, ship, and scale applications used by real users. |
| Primary button | Explore My Work |
| H1 (right column, under avatar) | Hafiz Muhammad Haris |
| CV trigger | View Full CV |
| CV panel title | Full CV |
| CV download button | Download |
| Download filename | `Hafiz_Muhammad_Haris_CV.pdf` |
| Social tooltips | LinkedIn Profile · View Repositories · Copy my Email |

> The H1 (the name) sat in the *right* column below the avatar while the H2
> (the pitch) led the left column. Visually the name read as a caption. Decide
> the intended reading order in V3.

## Projects

| Slot | Copy |
|---|---|
| Eyebrow | Real-world Results |
| Title | Featured Projects |
| Description | A showcase of production-ready applications combining data, automation, and modern web tech. |
| Card buttons | GitHub · Live Demo |

## Education & Certifications

| Slot | Copy |
|---|---|
| Eyebrow | Qualifications |
| Title | Education & Certifications |
| Description | My academic background and professional certifications. |
| Card heading | Certifications |
| Cert name | Supervised Machine Learning Specialization |
| Cert issuer | Coursera, Stanford Online, Deeplearning.AI |
| Cert buttons | View Certificate · Verify Credential |
| Card heading | Education |
| Degree | Bachelor of Science in Software Engineering |
| Institution | The University of Lahore |
| Dates | February 2023 - May 2027 |

> "Deeplearning.AI" is mis-capitalised — the company styles it **DeepLearning.AI**.

## Experience

| Slot | Copy |
|---|---|
| Eyebrow | Career History |
| Title | Experience |
| Description | My professional journey and roles. |
| Role 1 | Chat Support Executive - Mindbridge |
| Dates 1 | June 2024 – September 2024 |
| Body 1 | Handled customer, rider, and vendor queries for Talabat, resolving food delivery issues and providing active, empathetic assistance to riders. |
| Role 2 | Email Marketing Manager - SBI International |
| Dates 2 | June 2023 – July 2023 |
| Body 2 | Researched and identified potential clients, built targeted email lists, crafted tailored pitches, and optimized campaigns to drive engagement for construction projects. |

> Role titles use a hyphen (`-`) as a separator where the date ranges use an
> en dash (`–`). Pick one convention in V3.

## About

| Slot | Copy |
|---|---|
| Eyebrow | About Me |
| Title | A Glimpse Into My World |
| Description | Learn more about who I am, what I do, and what inspires me. |
| Card 1 title | My Reads |
| Card 1 description | Explore the classics shaping my perspectives. |
| Card 2 title | My Toolbox |
| Card 2 description | Explore the technologies and tools I use to craft exceptional digital experiences. |
| Card 3 title | Beyond the Code |
| Card 3 description | Explore my interests and hobbies beyond the digital realm. |
| Card 4 | no copy — static map image + memoji pin |

> Three of the four card descriptions begin with the word "Explore", and the
> hero's primary button is "Explore My Work". Four Explores on one page.

## Contact

| Slot | Copy |
|---|---|
| H2 | Lets create something amazing together |
| Body | Ready to bring your next project to life? Let's connect and discuss how I can help you achieve your goals. |
| Button | Hire me |
| Toast | Email copied to clipboard |
| Social tooltips | LinkedIn Profile · View Repositories · Copy my Email |

> "Lets" is missing its apostrophe. The body text uses a correct curly
> apostrophe in "Let's" two words later, so the heading is simply wrong.
> The "Hire me" button had no action attached — see `v2-post-mortem.md` §3.

## Footer

| Slot | Copy |
|---|---|
| Copyright | © 2026. All rights reserved - Haris |
| Links | My Resume · Github · LinkedIn |

> "Github" should be "GitHub". The year is hardcoded.

## Document metadata

| Slot | Copy |
|---|---|
| `<title>` | Haris Iftikhar |
| `<meta description>` | portfolio -2 |

> **Two problems.** The description is placeholder text that shipped to
> production. And the title says **Haris Iftikhar** while every other surface on
> the site says **Hafiz Muhammad Haris** — the name in the browser tab did not
> match the name in the hero. Settle on one legal/display name for V3 and use it
> in the title, the H1, the OG tags and the CV filename.

---

## Voice observations

- **Tense and person:** first person throughout ("My", "I design, ship, and
  scale"), present tense.
- **Register:** aspirational-agency. Phrases like "craft exceptional digital
  experiences", "bring your next project to life", "create something amazing
  together" are stock portfolio filler and could appear on any of ten thousand
  sites.
- **The strong copy is the specific copy.** "Parsed academic PDFs locally in
  <2 seconds, ensuring zero server-side data storage" earns trust. "Explore the
  technologies and tools I use to craft exceptional digital experiences" does
  not. V3 should move the whole page toward the former register.
- **Section descriptions add nothing.** "My professional journey and roles"
  under a heading that says "Experience" is pure restatement. Either cut these
  or make them say something only Haris could say.
- **Audience is unnamed.** "Hire me" implies employers; "your next project"
  implies freelance clients. V3 should decide which.
