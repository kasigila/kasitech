import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = "KasiTech - Digital products that work";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          color: "#f4f2ea",
          padding: 72,
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            letterSpacing: -1,
          }}
        >
          <span>{SITE_NAME}</span>
          <span style={{ color: "#c7ff00", fontSize: 18, letterSpacing: 4 }}>
            DAR ES SALAAM
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              color: "#c7ff00",
              fontSize: 22,
              letterSpacing: 5,
              textTransform: "uppercase",
            }}
          >
            Digital products that work
          </div>
          <div
            style={{
              maxWidth: 920,
              fontSize: 88,
              lineHeight: 0.94,
              letterSpacing: -5,
              fontWeight: 700,
            }}
          >
            Websites, systems, commerce and AI for businesses ready to move.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(244, 242, 234, 0.18)",
            paddingTop: 28,
            color: "rgba(244, 242, 234, 0.72)",
            fontSize: 24,
          }}
        >
          <span>www.kasitechinnovations.com</span>
          <span>Built to attract, transact, operate and decide.</span>
        </div>
      </div>
    ),
    size,
  );
}
