import { Oswald, Sofia_Sans } from "next/font/google";

export const sofiaSans = Sofia_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
  variable: "--font-sofia-sans",
  display: "swap",
});

// Display/heading typeface. Oswald's narrower, industrial-gothic letterforms
// read as more "old-school iron gym" than Sofia Sans Condensed's rounder,
// corporate-friendly shapes — picked specifically to fix that "wrong
// personality" complaint. Cyrillic subset is non-negotiable (Bulgarian is
// the default locale, Russian is one of the four) — verified it renders BG
// and RU correctly via a full production build before shipping this swap.
export const displayFont = Oswald({
  subsets: ["latin", "cyrillic"],
  weight: ["700"],
  variable: "--font-display",
  display: "swap",
});
