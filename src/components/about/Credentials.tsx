import { Reveal, Stagger } from "@/components/motion";
import { Chip } from "@/components/ui";
import { about, certifications, education } from "@/data";

const linkSkin =
  "u-label inline-flex min-h-11 items-center gap-2 text-accent transition-opacity duration-300 ease-[ease] hover:opacity-70";

/**
 * Education and certification, below the work: a degree finishing in 2027 is
 * context, not the argument (lessons.md T-004).
 *
 * The certificate has a live verification URL but its PDF is not published yet.
 * A null `file` renders no link at all rather than a control that 404s (T-002).
 *
 * Motion: the two columns are `Reveal`s in one `Stagger`, education first.
 */
export function Credentials() {
  const { educationChip, certificationChip, verify, download } = about.credentials;

  return (
    <section className="u-container border-t border-border py-16 lg:py-24">
      <Stagger className="grid gap-12 lg:grid-cols-2 lg:gap-6">
        <Reveal>
          <Chip>{educationChip}</Chip>
          <ul className="mt-8 space-y-8">
            {education.map((entry) => (
              <li key={entry.id} className="border-t border-border pt-6">
                <h3 className="text-title font-medium tracking-tight">
                  {entry.qualification}
                </h3>
                <p className="mt-2 text-body font-light text-ink">{entry.institution}</p>
                <p className="u-label-sm mt-4 text-accent">{entry.dateLabel}</p>
                <p className="mt-2 text-label-sm text-mid-grey">{entry.location}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="lg:pl-6">
          <Chip>{certificationChip}</Chip>
          <ul className="mt-8 space-y-8">
            {certifications.map((cert) => (
              <li key={cert.id} className="border-t border-border pt-6">
                <h3 className="text-title font-medium tracking-tight">{cert.title}</h3>
                <p className="mt-2 text-body font-light text-mid-grey">{cert.issuer}</p>
                <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
                  {cert.verifyUrl ? (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={linkSkin}
                    >
                      {verify}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                  {cert.file ? (
                    <a href={cert.file} download className={linkSkin}>
                      {download}
                      <span aria-hidden="true">↓</span>
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Stagger>
    </section>
  );
}
