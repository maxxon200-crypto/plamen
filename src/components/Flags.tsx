/**
 * Small flag icons for the language switcher. National flag colours are a
 * deliberate, explicit exception to CLAUDE.md's fixed 8-token palette —
 * flags scoped to exactly this file and nowhere else. English is
 * represented by the UK flag (a judgement call between UK/US; nothing in
 * CLAUDE.md picks one).
 */
const VIEW_BOX = "0 0 60 40";

export function FlagBG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={VIEW_BOX} className={className} aria-hidden="true">
      <rect width="60" height="40" fill="#FFFFFF" />
      <rect y="13.33" width="60" height="13.34" fill="#00966E" />
      <rect y="26.67" width="60" height="13.33" fill="#D62612" />
    </svg>
  );
}

export function FlagEN({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={VIEW_BOX} className={className} aria-hidden="true">
      <rect width="60" height="40" fill="#012169" />
      <line x1="0" y1="0" x2="60" y2="40" stroke="#FFFFFF" strokeWidth="9" />
      <line x1="60" y1="0" x2="0" y2="40" stroke="#FFFFFF" strokeWidth="9" />
      <line x1="0" y1="0" x2="60" y2="40" stroke="#C8102E" strokeWidth="3" />
      <line x1="60" y1="0" x2="0" y2="40" stroke="#C8102E" strokeWidth="3" />
      <rect x="24" width="12" height="40" fill="#FFFFFF" />
      <rect y="14" width="60" height="12" fill="#FFFFFF" />
      <rect x="27" width="6" height="40" fill="#C8102E" />
      <rect y="17" width="60" height="6" fill="#C8102E" />
    </svg>
  );
}

export function FlagRU({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={VIEW_BOX} className={className} aria-hidden="true">
      <rect width="60" height="40" fill="#FFFFFF" />
      <rect y="13.33" width="60" height="13.34" fill="#0039A6" />
      <rect y="26.67" width="60" height="13.33" fill="#D52B1E" />
    </svg>
  );
}

export function FlagDE({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={VIEW_BOX} className={className} aria-hidden="true">
      <rect width="60" height="13.33" fill="#000000" />
      <rect y="13.33" width="60" height="13.34" fill="#DD0000" />
      <rect y="26.67" width="60" height="13.33" fill="#FFCE00" />
    </svg>
  );
}

export const FLAGS = {
  bg: FlagBG,
  en: FlagEN,
  ru: FlagRU,
  de: FlagDE,
} as const;
