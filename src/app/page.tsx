import {
  Capability,
  ContactPreview,
  Hero,
  Positioning,
  Process,
  Proof,
  SelectedWork,
} from "@/components/home";

/**
 * Home — design.md §9.1, in that order.
 *
 * Strongest evidence first: production work, then the argument for it, then the
 * stack, then the numbers. V2's order buried shipped software under a degree
 * that finishes in 2027 (lessons.md T-004).
 *
 * A Server Component with no data fetching, so the whole page is static. The
 * only client code on it is the `Reveal` wrapper inside each section.
 */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Positioning />
      <SelectedWork />
      <Process />
      <Capability />
      <Proof />
      <ContactPreview />
    </main>
  );
}
