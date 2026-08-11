import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        black: "#000000",
        charcoal: "#1A1A1A",
        steel: "#B3B3B3",
        bone: "#EDEDED",
        white: "#FFFFFF",
        blood: {
          DEFAULT: "#B10000",
          hi: "#E02020",
        },
      },
      fontFamily: {
        sans: ["var(--font-sofia-sans)"],
        condensed: ["var(--font-display)"],
      },
      fontSize: {
        display: [
          "clamp(3rem, 1rem + 6vw, 7rem)",
          { lineHeight: "0.9", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        h2: [
          "clamp(2rem, 1rem + 4vw, 3.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        h3: [
          "clamp(1.5rem, 0.9rem + 2vw, 2.25rem)",
          { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        caption: [
          "0.75rem",
          { lineHeight: "1.4", letterSpacing: "0.04em", fontWeight: "600" },
        ],
      },
    },
  },
  plugins: [],
};

export default config;
