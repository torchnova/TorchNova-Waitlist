import { ImageResponse } from "next/og";

export const alt = "TorchNova";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Link-preview card: the wordmark on the site's light grey. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#e9eee7",
          color: "#0f0f0f",
          padding: "48px 56px",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 168, fontWeight: 700, letterSpacing: -6, lineHeight: 1 }}>TORCHNOVA</div>
        <div style={{ fontSize: 34, letterSpacing: -1, maxWidth: 700 }}>
          A private platform for founders.
        </div>
      </div>
    ),
    size,
  );
}
