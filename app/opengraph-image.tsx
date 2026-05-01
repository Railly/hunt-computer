import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Hunt — A workshop, not a studio.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "public", "fonts");
const serif = readFileSync(join(fontDir, "InstrumentSerif.ttf"));
const mono = readFileSync(join(fontDir, "GeistMono-Regular.ttf"));

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#F4F1EA",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "48px 64px",
      }}
    >
      {/* Top corners */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "Geist Mono",
          fontSize: 16,
          letterSpacing: 1.6,
          textTransform: "uppercase",
          color: "#8A8A8A",
        }}
      >
        <span>A WORKSHOP / NOT A STUDIO</span>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="20" height="20" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="22" fill="none" stroke="#FF5500" strokeWidth="3" />
            <line x1="32" y1="2" x2="32" y2="20" stroke="#FF5500" strokeWidth="3" />
            <line x1="32" y1="44" x2="32" y2="62" stroke="#FF5500" strokeWidth="3" />
            <line x1="2" y1="32" x2="20" y2="32" stroke="#FF5500" strokeWidth="3" />
            <line x1="44" y1="32" x2="62" y2="32" stroke="#FF5500" strokeWidth="3" />
            <circle cx="32" cy="32" r="3" fill="#FF5500" />
          </svg>
          HUNT.COMPUTER
        </span>
      </div>

      {/* Wordmark */}
      <div
        style={{
          fontFamily: "Instrument Serif",
          fontSize: 380,
          lineHeight: 0.85,
          letterSpacing: -8,
          color: "#0A0A0A",
          display: "flex",
          alignItems: "baseline",
          gap: 12,
        }}
      >
        <span>HUNT</span>
        <span style={{ fontSize: 96, color: "#8A8A8A" }}>.computer</span>
      </div>

      {/* Bottom corners */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontFamily: "Geist Mono",
          fontSize: 16,
          letterSpacing: 1.6,
          textTransform: "uppercase",
          color: "#8A8A8A",
        }}
      >
        <span>BY HUNTER · LIMA, PERÚ</span>
        <span>EST.MMXXVI</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Geist Mono", data: mono, style: "normal", weight: 400 },
      ],
    }
  );
}
