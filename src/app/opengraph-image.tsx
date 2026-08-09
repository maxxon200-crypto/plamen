import { ImageResponse } from "next/og";

export const alt = "Fitness Plamen GYM Sunny Beach";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0A0A0A";
const BLOOD = "#B10000";
const WHITE = "#FFFFFF";
const STEEL = "#B3B3B3";

/**
 * Default, locale-agnostic OG image (per-locale variants are a later
 * refinement, not required for Phase 5). Entirely code-generated from the
 * exact palette tokens — no photography, no stock imagery, no AI-generated
 * image, per CLAUDE.md's Photography rule.
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: INK,
          padding: "88px",
        }}
      >
        <div style={{ display: "flex", width: 110, height: 10, backgroundColor: BLOOD }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 36,
            fontFamily: "sans-serif",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "-2px",
            lineHeight: 0.95,
            color: WHITE,
            fontSize: 100,
          }}
        >
          <div style={{ display: "flex" }}>Fitness</div>
          <div
            style={{
              display: "flex",
              backgroundColor: BLOOD,
              color: WHITE,
              paddingLeft: 12,
              paddingRight: 12,
            }}
          >
            Plamen Gym
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontFamily: "sans-serif",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "4px",
            color: STEEL,
            fontSize: 30,
          }}
        >
          Sunny Beach · Nesebar · Bulgaria
        </div>
      </div>
    ),
    { ...size }
  );
}
