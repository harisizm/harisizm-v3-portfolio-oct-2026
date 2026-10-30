/**
 * The three process steps on the home page (design.md §9.1 item 4).
 *
 * Written from what the case studies in `projects.ts` actually show, not from
 * agency vocabulary: the work ships to a live deployment first, every claim it
 * makes is a measured one, and the manual process it replaced is the result.
 * Every number quoted here appears in a project's `outcome` or `evidence`
 * fields; change it there and here together, or not at all.
 *
 * Lives in the data layer rather than in `Process.tsx` because content inside a
 * component is a one-way ratchet (lessons.md T-010).
 */
export interface ProcessStep {
  /** Slashed-zero sequence number, display face: `Ø1`. */
  readonly num: string;
  /** Display face, 48px, uppercase. One word. */
  readonly name: string;
  /** Body face, sentence case, with the `//` separator: "Ship // Production". */
  readonly subtitle: string;
  readonly body: string;
  /**
   * Which of the inline line-art drawings in `ProcessDiagram.tsx` the step
   * shows, or null if one is ever removed. They are drawn inline rather than
   * served as files so their parts can turn with the scroll. A null diagram
   * holds the slot as empty space, not a placeholder frame (T-002).
   */
  readonly diagram: ProcessDiagramId | null;
}

export type ProcessDiagramId = "ship" | "measure" | "automate";

export const processSteps = [
  {
    num: "Ø1",
    name: "Ship",
    subtitle: "Ship // Production",
    body: "The first useful version goes somewhere real. Tourgenz has been live since September 2026 with a traveller app, five vendor portals and an admin control room, all of them carrying actual bookings. Everything after launch lands on software people already use.",
    diagram: "ship",
  },
  {
    num: "Ø2",
    name: "Measure",
    subtitle: "Measure // Evidence",
    body: "A claim gets a number or it does not get made. Tourgenz is held in place by roughly 2,000 automated tests across 214 files and 111 hand-written SQL migrations, with no CI pipeline to lean on. TransGPA parses a transcript in under two seconds because it was timed, not because it felt quick.",
    diagram: "measure",
  },
  {
    num: "Ø3",
    name: "Automate",
    subtitle: "Automate // Replace",
    body: "Once the manual process is understood well enough, it gets replaced. An eight-hour prospecting day became about ten minutes. A research job that took days became 10,000 qualified profiles in 24 hours, running unattended on a VPS.",
    diagram: "automate",
  },
] as const satisfies readonly ProcessStep[];
