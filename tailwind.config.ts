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
        condensed: ["var(--font-sofia-sans-condensed)"],
      },
    },
  },
  plugins: [],
};

export default config;
