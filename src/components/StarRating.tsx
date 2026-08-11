import { useId } from "react";

interface StarRatingProps {
  /** 0-5 rating value, e.g. 4.4 */
  value: number;
  className?: string;
}

const STAR_PATH =
  "M10 1.5l2.47 5.53 6.03.58-4.56 4.03 1.35 5.93L10 14.6l-5.29 2.97 1.35-5.93L1.5 7.61l6.03-.58L10 1.5z";

/**
 * Decorative 5-star row (SVG, not the Unicode ★ glyph, so partial fill is
 * possible). Purely presentational — the adjacent numeral/label text
 * already carries the accessible rating information, so this is
 * aria-hidden to avoid a redundant screen-reader announcement. Filled
 * portion uses blood as a shape fill (not text), which is the sanctioned
 * use of red per CLAUDE.md.
 *
 * The empty/partial-star outline only renders when a star isn't fully
 * filled (fill < 1). This isn't just an optimization: CLAUDE.md scopes
 * `steel` to "secondary text on dark only," and design-critic caught that
 * an unconditional outline stroke failed contrast (~2.1:1) when this
 * component landed on a white background in Reviews.tsx (which always
 * passes value={5} — every star fully filled). Skipping the outline
 * whenever a star has no empty portion to trace fixes that case
 * completely, since Reviews never has one; ProofBar's partial-fill case
 * (e.g. 4.4/5) still needs — and still gets — the outline, and that
 * usage is on a black background where steel is contract-compliant.
 */
export default function StarRating({ value, className = "" }: StarRatingProps) {
  const clampedValue = Math.max(0, Math.min(5, value));
  const idPrefix = useId();

  return (
    <div className={`flex gap-1 ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, clampedValue - i));
        const clipId = `${idPrefix}star-clip-${i}`;
        return (
          <svg key={i} viewBox="0 0 20 19" className="h-6 w-6 sm:h-7 sm:w-7">
            {fill < 1 && (
              <path
                d={STAR_PATH}
                fill="none"
                strokeWidth="1"
                className="stroke-steel"
              />
            )}
            {fill > 0 && (
              <clipPath id={clipId}>
                <rect x="0" y="0" width={20 * fill} height="19" />
              </clipPath>
            )}
            {fill > 0 && (
              <path
                d={STAR_PATH}
                clipPath={`url(#${clipId})`}
                className="fill-blood"
              />
            )}
          </svg>
        );
      })}
    </div>
  );
}
