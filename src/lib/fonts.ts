import { Sofia_Sans, Sofia_Sans_Condensed } from "next/font/google";

export const sofiaSans = Sofia_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
  variable: "--font-sofia-sans",
  display: "swap",
});

export const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin", "cyrillic"],
  weight: ["800"],
  variable: "--font-sofia-sans-condensed",
  display: "swap",
});
