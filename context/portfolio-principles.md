# Portfolio Principles

Source: *"How to build a portfolio website the right way"* by Kanza Fazal, NVRMND
Studio — <https://www.nvrmndstudio.com/resources/how-to-build-a-portfolio-website>
(published 23 Sep 2026). Summarised in our own words below, with the application
to V3 worked out. Read the original for the full argument.

The article's authority comes from the vantage point: the author screened **180+
applications** for a UI/UX role and was reading portfolios as a hiring decision-maker.
That is exactly the position a recruiter — or a prospective client — will be in when
they land on harisizm.com.

---

## The headline findings

- Only about **35%** of applicants sent a portfolio *website* rather than a PDF.
  Shipping a site at all is already a differentiator.
- Of those who did, roughly **90% were templates** — and the author is explicit that
  templates are not the problem.

> The template is the mould. The problem is that most people never decided what they
> were pouring into it.

This reframes the whole exercise. The design system in [`design.md`](../design.md)
is the mould. This file is about what goes in it.

**Relevant to us:** the V2 post-mortem says V2 was built on a template, and V3 is
being built as a near-replica of another studio's visual system. By this article's
own argument that is *not* the failure mode — provided the content is decided,
specific and ours. The risk is not the borrowed mould. It is pouring nothing into it.

---

## Practice 1 — Identity before job title

Opening with a role label ("Full-stack developer") puts you in an undifferentiated
pile. The author's point is sharper than "be memorable": a reader who isn't hooked
doesn't decide you're wrong for the job — **they don't decide anything at all**, and
move on. Indifference, not rejection, is what kills the page.

The hero has to say what makes you specifically you, before any scrolling happens.
Four patterns the article offers:

1. **Keep the title, twist it toward what you're actually into** — the role plus the
   obsession that shapes how you do it.
2. **Name exactly who you help** — the client type, stated plainly.
3. **Lead with the specific offer** — the concrete thing you produce, and how fast.
4. **Lead with the result** — what the person gets out of working with you.

### Applied to V3

Current V2 headline — *"Building Production-Grade Web Apps That Solve Real Problems"* —
is pattern-free. It would fit several thousand developers and names no one.

Raw material that is genuinely specific to this work:

- Shipped tools that students at a named university **actually use** — 100+ on
  TransGPA, 60+ on the timetable generator. Not coursework; real users.
- A habit of building the thing that removes a repeated manual chore.
- Privacy-first by construction — TransGPA parses transcripts **locally**, storing
  nothing server-side.
- Range across MERN *and* Python/data tooling.

Directions worth drafting against (pick one, write it properly — this is an open item
in `design.md` §13):

- *Result-led:* "I build the tool that replaces the spreadsheet everyone's been
  emailing around."
- *Audience-led:* "I build production web apps for teams who've outgrown the manual
  process."
- *Offer-led:* "Full-stack web apps, shipped and deployed — not prototypes."

The test: could a competent developer with a different story put the same sentence
on their site? If yes, it isn't the hero.

---

## Practice 2 — Narrate the work, don't link to it

The second clear separator in the 180+ applications: whether the applicant explained
**what part they actually played**. Dropping a link to a Figma file or a live site
asks the reader to go and verify your work for you. Forty of those blur together.

The author's complaint is specific — final screens with no account of how they were
reached, broken links, generic mockups. What was missing was *how the person thinks*.

What a piece of work needs in order to argue for you:

- **What you actually did on it** — the real scope, not the category word. "Design"
  and "Full-stack" are both too coarse to mean anything.
- **The field or industry it was for** — because the constraints differ, and showing
  you know that is itself evidence.
- **The problems that appeared** — in the brief or mid-build — and what you did about
  them. This is the part that reveals thinking rather than output.
- **The link placed inside the case study**, not standing in for it. The link is proof;
  the case study is the argument.

> The applicants who explained the decision behind a screen — not just the screen —
> were the ones still remembered at the end.

### Applied to V3

This *is* the case-study template in `design.md` §9.2, and it is why the Approach
section explicitly asks for **what was rejected and why**. A list of features is
output; a rejected alternative is thinking.

Concrete material already available for the existing six:

| Project | The decision worth narrating |
|---|---|
| TransGPA | Parsing PDFs **client-side** — a privacy constraint chosen deliberately, with a real cost (bundle size, browser parsing) and a real payoff (zero server storage, `<2s`) |
| Grocery POS | A **normalised relational schema** with an EER diagram — a design artefact that already exists and can be shown |
| Khilariverse | Role-based access across admin/user, plus Cloudinary and Nodemailer removing manual work entirely |
| Timetable Generator | Automated parsing of the department's own Excel sheets — the manual chore it replaced is the story |

V2 gave each of these three bullets and a screenshot. The bullets were already
metric-led, which is a good instinct — but three bullets is a summary, not an argument.

**Also:** the article's broken-links complaint is a live risk here. `context/projects.md`
flags that these are free-tier Vercel and Streamlit deployments, and Streamlit apps
sleep after inactivity. Verify every URL before launch, and render no live control
where there is no deployment.

---

## Practice 3 — Make it yours, then make it easy

Two halves, in that order.

**Make it yours.** The window is roughly 3–10 seconds before someone decides whether
to keep reading. If the site shows personality in that window, it is doing the work
of a first pitch — it is the first evidence of your taste. The article's advice here
is permissive rather than prescriptive: a typeface you actually like even if it's
chunky, a register you're drawn to, colours that mean something to you rather than
ones a template chose.

**Then make it easy.** Give one obvious next action. A LinkedIn follow, a booking
link, an email address that doesn't have to be hunted for. The author's closing point
is that people over-invest in a custom domain or a novel design and under-invest in
the part that decides the outcome: **how easy it is to decide to hire you.**

### Applied to V3

The "make it yours" half is where the near-replica direction carries the most risk,
and it is worth naming plainly: adopting another studio's visual language wholesale
means the personality on the page is, at first, theirs. The mould is borrowed. Every
ounce of "yours" therefore has to come from the content — the voice in the case
studies, what gets shown as evidence, what's admitted to, the choice of accent pair,
the hero line. Pour something specific in or the page says nothing about Haris.

The "make it easy" half is where V2 failed outright, and it maps to hard requirements
already in `design.md`:

- V2's **"Hire me" button had no `onClick` and no `href`.** The primary conversion
  control was inert. Every CTA in V3 resolves to a real destination.
- V2 had **no `mailto:` anywhere.** The only route to the email was hovering a button,
  noticing a floating icon, clicking it, and reading a toast. On touch, where hover
  doesn't exist, the contact path was effectively unreachable.
- V3's contact fork (`design.md` §9.3) gives each reader type a labelled path, with a
  plain email fallback that needs neither hover nor JavaScript.

And one note of reassurance for the domain purchase: by this article's argument,
nobody closes the tab because the URL wasn't custom enough. `harisizm.com` is worth
having for coherence with the handle — it is not what decides the outcome.

---

## The checklist

Before any page ships, it answers yes to all of these:

- [ ] Does the hero say something only this person could say?
- [ ] Does every project explain what was actually done, not just what exists?
- [ ] Is a rejected alternative named anywhere?
- [ ] Is the live link *inside* the case study rather than standing in for it?
- [ ] Does every live link resolve today?
- [ ] Is the next action obvious within one screen, on every page?
- [ ] Does the contact path work with no hover and no JavaScript?
- [ ] Would this page still sound like Haris with the visual design stripped away?
