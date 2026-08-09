import { PT_Sans, Sofia_Sans } from "next/font/google";

export const sofiaSans = Sofia_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
  variable: "--font-sofia-sans",
  display: "swap",
});

// PT Sans Bold, not a display/poster novelty face like the two prior
// picks (Oswald, Russo One) — a serious, widely-used professional
// typeface designed for Cyrillic + Latin together (Paratype, built for a
// Russian government Cyrillic-modernization project). Direct response to
// feedback that Oswald/Russo One both read as generic "AI-safe" display
// picks rather than something a real brand would use.
export const displayFont = PT_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["700"],
  variable: "--font-display",
  display: "swap",
});
