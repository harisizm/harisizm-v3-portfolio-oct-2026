import { Chip } from "@/components/ui";
import { approach, type CardTone } from "./content";

/* Grey → ink → blue. The escalation is the hierarchy (design.md §7.5), so the
   tone is content-driven rather than derived from the index — reordering the
   cards must not silently reorder the weights. */
const TONE: Record<CardTone, { shell: string; num: string; body: string }> = {
  grey: {
    shell: "border border-border bg-surface-alt text-ink",
    num: "text-accent",
    body: "text-mid-grey",
  },
  ink: {
    shell: "bg-ink text-white",
    num: "text-accent-2",
    body: "text-white/70",
  },
  accent: {
    shell: "bg-accent text-white",
    num: "text-white",
    body: "text-white/80",
  },
};

/**
 * The three-card escalation — the strongest hierarchy device on the reference.
 * The middle card is taller and lifted a step out of the row at `lg`, which is
 * what makes the trio read as a climb instead of three equal columns.
 */
export function ApproachCards() {
  return (
    <section className="u-container border-t border-border py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1408px]">
        <Chip>How I work</Chip>
        <h2 className="mt-6 max-w-[30ch] text-title font-medium tracking-tight sm:text-heading">
          Three steps, in this order, every time.
        </h2>

        <ol className="mt-12 grid gap-4 lg:grid-cols-3 lg:items-start">
          {approach.map((card, i) => {
            const tone = TONE[card.tone];
            const lifted = i === 1 ? "lg:-mt-8 lg:pb-20" : "";

            return (
              <li
                key={card.num}
                className={`flex min-h-[300px] flex-col p-6 lg:p-8 ${tone.shell} ${lifted}`}
              >
                <span className={`font-display text-body font-bold ${tone.num}`}>
                  {card.num}
                </span>
                <h3 className="mt-6 text-title font-medium tracking-tight">
                  {card.title}
                </h3>
                <p className={`mt-4 max-w-[40ch] text-body ${tone.body}`}>{card.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
