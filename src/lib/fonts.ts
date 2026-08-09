import { Russo_One, Sofia_Sans } from "next/font/google";

export const sofiaSans = Sofia_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
  variable: "--font-sofia-sans",
  display: "swap",
});

export const displayFont = Russo_One({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});
