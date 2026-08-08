/**
 * Grain and duotone utility demos. Placeholder colour blocks only — never
 * stock or AI-generated imagery, per CLAUDE.md.
 */
export default function Texture() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <p className="font-sans text-caption uppercase tracking-[0.15em] text-steel mb-2">
          texture-grain — SVG noise, opacity 0.06
        </p>
        <div className="texture-grain h-40 w-full bg-charcoal" />
      </div>

      <div>
        <p className="font-sans text-caption uppercase tracking-[0.15em] text-steel mb-2">
          duotone-blood — ink to blood overlay
        </p>
        <div className="relative h-40 w-full overflow-hidden bg-steel">
          <div className="duotone-blood h-full w-full bg-steel" />
        </div>
      </div>
    </div>
  );
}
