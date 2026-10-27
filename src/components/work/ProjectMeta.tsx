import { Chip } from "@/components/ui";
import type { Project } from "@/data";

export interface ProjectMetaProps {
  project: Project;
}

/**
 * The facts under the cover: tags, dates, who owns the work, the stack
 * (teardown §6.4, item 2).
 *
 * Tags are desktop-only here because the rail already shows them on mobile,
 * where it is a static header rather than a sticky column. Every row is
 * conditional on its field existing — `durationLabel` is optional and `employer`
 * only exists on employer-owned work.
 */
export function ProjectMeta({ project }: ProjectMetaProps) {
  return (
    <div className="pt-10">
      <div className="hidden flex-wrap gap-2 lg:flex">
        {project.tags.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>

      <dl className="mt-8 grid gap-x-10 gap-y-6 border-t border-border pt-6 sm:grid-cols-3">
        <MetaRow label="Date" value={project.dateLabel} />
        {project.durationLabel ? (
          <MetaRow label="Duration" value={project.durationLabel} />
        ) : null}
        <MetaRow
          label={project.employer ? "Built at" : "Ownership"}
          value={project.employer ?? "Personal project"}
        />
        <div className="sm:col-span-3">
          <dt className="u-label text-mid-grey">Stack</dt>
          <dd className="m-0 mt-2 max-w-[72ch]">{project.stack.join(", ")}</dd>
        </div>
      </dl>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="u-label text-mid-grey">{label}</dt>
      <dd className="m-0 mt-2">{value}</dd>
    </div>
  );
}
