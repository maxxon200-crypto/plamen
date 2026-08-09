import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/**
 * Small uppercase label shown above a heading. Colour intentionally stays
 * neutral (steel/ink depending on caller's background via className) —
 * CLAUDE.md bans red text on black, and this primitive is used on both
 * dark and light sections, so it never defaults to blood.
 */
export default function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p
      className={`font-condensed text-caption uppercase tracking-[0.15em] text-steel ${className}`}
    >
      {children}
    </p>
  );
}
