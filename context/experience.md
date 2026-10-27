# Experience, Education & Certifications

Verbatim from `reference/v2/sections/Experience.tsx` and
`reference/v2/sections/EducationAndCertification.tsx`.

---

## Work experience

### Chat Support Executive — Mindbridge

- **Dates:** June 2024 – September 2024
- **Logo:** `assets/brand/mindbridge logo.png`
- **Description:** Handled customer, rider, and vendor queries for Talabat,
  resolving food delivery issues and providing active, empathetic assistance to
  riders.

### Email Marketing Manager — SBI International

- **Dates:** June 2023 – July 2023
- **Logo:** none in V2
- **Description:** Researched and identified potential clients, built targeted
  email lists, crafted tailored pitches, and optimized campaigns to drive
  engagement for construction projects.

> Neither role is a software engineering role. V2 presented them under the
> heading "Career History / Experience" directly after the projects, which made
> the strongest evidence (shipped apps with real users) compete with the weakest
> (a 2-month marketing stint). See `v2-post-mortem.md` — this is a positioning
> decision for V3, not just a layout one.

---

## Education

**Bachelor of Science in Software Engineering**
The University of Lahore
February 2023 – May 2027

- Logo: `assets/brand/uol logo.png` (1.4 MB — must be re-exported)
- V2 displayed no GPA, no coursework, and no honours.

---

## Certifications

**Supervised Machine Learning Specialization**
Coursera · Stanford Online · DeepLearning.AI

- Verify credential: https://coursera.org/share/542313d84f1815a93b7e0398c4b8c1fe
- Certificate PDF: `assets/docs/coursera-supervised-ml-certificate.pdf`
- Certificate image (used as a card background in V2): `assets/docs/cert-image.png`
- V2 gave this two buttons: "View Certificate" (opened the local PDF) and
  "Verify Credential" (opened the Coursera share link).

> The V2 source file is named `EducationAndCertification.tsx` (singular) but the
> heading reads "Education & Certifications" (plural) while holding exactly one
> certificate. Only one cert exists as of Oct 2026 — if V3 keeps a plural
> heading, plan for the list to grow or make it singular.

---

## Raw CV

`assets/docs/cv.pdf` (232 KB) is the authoritative document and was linked from
both the hero (as an inline preview panel plus a download) and the footer. It was
**not readable in this session** — no PDF tooling available — so it may contain
dates, skills, or contact details that never made it onto the site. Open it
manually and reconcile against this file before writing V3 content.

The hero's download attribute named the file `Hafiz_Muhammad_Haris_CV.pdf`.

---

## Gaps V2 left open

- No "currently" statement — no indication of what Haris is doing right now
  (studying, freelancing, job-seeking).
- No internships listed, despite being 3+ years into a 4-year degree.
- No technical role of any kind in the work history, which makes the projects
  carry the entire engineering argument alone.
