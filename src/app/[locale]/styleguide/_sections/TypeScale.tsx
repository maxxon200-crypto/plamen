/**
 * Type scale samples — display/h2/h3 in Sofia Sans Condensed (headings),
 * body/caption in Sofia Sans, per CLAUDE.md typography rules. Rendered on
 * a light (bone) section, so labels use ink rather than steel — steel is
 * reserved for secondary text on dark backgrounds only.
 */
export default function TypeScale() {
  return (
    <div className="space-y-8">
      <div>
        <p className="font-sans text-caption uppercase tracking-[0.15em] text-ink">
          display — condensed 800, uppercase, tracking -0.02em
        </p>
        <p className="font-condensed text-display uppercase leading-none">Iron Temple</p>
      </div>

      <div>
        <p className="font-sans text-caption uppercase tracking-[0.15em] text-ink">
          h2 — condensed 800
        </p>
        <h2 className="font-condensed text-h2 uppercase">Old School Strength</h2>
      </div>

      <div>
        <p className="font-sans text-caption uppercase tracking-[0.15em] text-ink">
          h3 — condensed 800
        </p>
        <h3 className="font-condensed text-h3 uppercase">Built By Hand</h3>
      </div>

      <div>
        <p className="font-sans text-caption uppercase tracking-[0.15em] text-ink">
          body — Sofia Sans 400
        </p>
        <p className="font-sans text-body max-w-prose">
          Every machine on this floor was built or maintained by the owner. It is not
          brand new. It works, and it has for years.
        </p>
      </div>

      <div>
        <p className="font-sans text-caption uppercase tracking-[0.15em] text-ink">
          caption — Sofia Sans 600
        </p>
        <p className="font-sans text-caption uppercase tracking-[0.1em]">
          Open 09:00–21:00 daily
        </p>
      </div>
    </div>
  );
}
