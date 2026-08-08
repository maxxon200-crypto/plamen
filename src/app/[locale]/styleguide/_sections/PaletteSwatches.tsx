const swatches: { name: string; hex: string; className: string }[] = [
  { name: "ink", hex: "#0A0A0A", className: "bg-ink" },
  { name: "black", hex: "#000000", className: "bg-black" },
  { name: "charcoal", hex: "#1A1A1A", className: "bg-charcoal" },
  { name: "steel", hex: "#B3B3B3", className: "bg-steel" },
  { name: "bone", hex: "#EDEDED", className: "bg-bone" },
  { name: "white", hex: "#FFFFFF", className: "bg-white" },
  { name: "blood", hex: "#B10000", className: "bg-blood" },
  { name: "blood-hi", hex: "#E02020", className: "bg-blood-hi" },
];

/**
 * Palette swatch grid — every token from CLAUDE.md's colour table, labelled
 * with its name and exact hex. No colours outside this set are permitted
 * anywhere in the codebase.
 */
export default function PaletteSwatches() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {swatches.map((swatch) => (
        <div key={swatch.name} className="border border-steel">
          <div className={`h-24 w-full ${swatch.className}`} />
          <div className="px-3 py-2">
            <p className="font-condensed text-body uppercase tracking-[0.02em]">
              {swatch.name}
            </p>
            <p className="font-sans text-caption text-steel">{swatch.hex}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
