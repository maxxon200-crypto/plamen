import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Horizontal max-width wrapper. Mobile-first padding, widens on larger
 * viewports. Server Component — no interaction, no client JS required.
 */
export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
