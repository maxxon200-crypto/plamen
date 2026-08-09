import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Code-generated favicon — a small blood-on-ink monogram, not a stock or
 * AI-generated image (CLAUDE.md bans both, but a typographic brand mark
 * built from the exact palette tokens is explicitly fine). Replaces the
 * default create-next-app icon; no raster asset checked in anywhere.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0A",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 20,
            height: 20,
            backgroundColor: "#B10000",
            color: "#FFFFFF",
            fontFamily: "sans-serif",
            fontWeight: 800,
            fontSize: 16,
          }}
        >
          P
        </div>
      </div>
    ),
    { ...size }
  );
}
