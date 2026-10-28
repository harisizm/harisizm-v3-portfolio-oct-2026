import { Reveal, Stagger } from "@/components/motion";
import { Chip } from "@/components/ui";
import { about, type CardTone } from "@/data";

/* Grey → ink → blue. The escalation is the hierarchy (design.md §7.5), so the
   tone is content-driven rather than derived from the index: reordering the
   cards must not silently reorder the weights.

   The grey card is a mid grey with no border (audit F1), mixed from the tokens
   rather than a new colour: ink at 25% over the canvas lands on the reference's
   #ababab-ish panel. Its body text stays ink at 80% because `--mid-grey` on
   that ground is 2:1 and fails AA. */
const TONE: Record<CardTone, { shell: string; num: string; body: string }> = {
  grey: {
    shell: "bg-[color-mix(in_srgb,var(--ink)_25%,var(--canvas))] text-ink",
    num: "text-ink",
    body: "text-ink/80",
  },
  ink: {
    shell: "bg-ink text-white",
    num: "text-white",
    body: "text-white/80",
  },
  accent: {
    shell: "bg-accent text-white",
    num: "text-white",
    body: "text-white/90",
  },
};

/**
 * The three-card escalation, the strongest hierarchy device on the reference.
 * Chip and heading centred above; cards in columns 2 to 4 at `lg`, all three
 * starting at the same top with the middle one running 22px lower, which is
 * what makes the trio read as a climb instead of three equal columns.
 *
 * Motion: the cards are a `Stagger` with a longer rise (`y={24}`) than the
 * default, so the climb is something you watch happen. `Stagger` cannot be an
 * `ol`, so it wraps the list and the `li`s are the `Reveal`s inside it.
 */
export function ApproachCards() {
  const { chip, heading, cards } = about.approach;

  return (
    <section className="u-container py-16 lg:py-24">
      <Reveal className="flex flex-col items-center text-center">
        <Chip>{chip}</Chip>
        <h2 className="mt-6 max-w-[20ch] text-balance text-title font-medium uppercase tracking-tight sm:text-heading">
          {heading}
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-4 lg:items-start">
        <Stagger className="lg:col-span-3 lg:col-start-2">
          <ol className="grid gap-4 sm:grid-cols-3 lg:gap-6 lg:items-start">
            {cards.map((card, i) => {
              const tone = TONE[card.tone];
              const taller = i === 1 ? "lg:pb-[54px]" : "";

              return (
                <Reveal
                  key={card.num}
                  as="li"
                  y={24}
                  className={`flex min-h-[300px] flex-col p-6 lg:p-8 ${tone.shell} ${taller}`}
                >
                  <span className={`u-pixel-num ${tone.num}`}>{card.num}</span>
                  <h3 className="mt-6 text-[32px] font-medium leading-[1.15] tracking-tight">
                    {card.title}
                  </h3>
                  <p className={`mt-4 max-w-[40ch] text-body font-light ${tone.body}`}>
                    {card.body}
                  </p>
                </Reveal>
              );
            })}
          </ol>
        </Stagger>
      </div>
    </section>
  );
}
