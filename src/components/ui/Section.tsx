import type { ReactNode } from "react";

type Background = "ink" | "black" | "charcoal" | "bone" | "white";

const backgroundClasses: Record<Background, string> = {
  ink: "bg-ink text-white",
  black: "bg-black text-white",
  charcoal: "bg-charcoal text-white",
  bone: "bg-bone text-ink",
  white: "bg-white text-ink",
};

interface SectionProps {
  children: ReactNode;
  background?: Background;
  className?: string;
  id?: string;
}

/**
 * Vertical rhythm wrapper for full-bleed page sections. Applies a palette
 * background token and consistent vertical padding. Server Component.
 */
export default function Section({
  children,
  background = "ink",
  className = "",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-20 lg:py-28 ${backgroundClasses[background]} ${className}`}
    >
      {children}
    </section>
  );
}
