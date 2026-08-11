interface FacebookIconProps {
  className?: string;
}

/**
 * Monochrome Facebook glyph — `currentColor` fill, no brand blue. CLAUDE.md's
 * palette exception for real brand colours is scoped narrowly to
 * src/components/Flags.tsx; every other component, this one included,
 * stays inside the 8-token palette, so the mark reads via shape alone.
 */
export default function FacebookIcon({ className = "" }: FacebookIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.5 21v-7.8h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.5-1.46h1.6V4.14c-.28-.04-1.22-.12-2.33-.12-2.3 0-3.87 1.4-3.87 3.98v2.2H7.8v3h2.6V21h3.1z" />
    </svg>
  );
}
