import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F4F1EA",
      }}
    >
      <svg width="140" height="140" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="22" fill="none" stroke="#FF5500" strokeWidth="3" />
        <line x1="32" y1="2" x2="32" y2="20" stroke="#FF5500" strokeWidth="3" />
        <line x1="32" y1="44" x2="32" y2="62" stroke="#FF5500" strokeWidth="3" />
        <line x1="2" y1="32" x2="20" y2="32" stroke="#FF5500" strokeWidth="3" />
        <line x1="44" y1="32" x2="62" y2="32" stroke="#FF5500" strokeWidth="3" />
        <circle cx="32" cy="32" r="3" fill="#FF5500" />
      </svg>
    </div>,
    { ...size }
  );
}
