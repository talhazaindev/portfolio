import { ImageResponse } from "next/og";

export const alt = "Talha Zain — Applied AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Brand Open Graph image. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #070b12 0%, #101826 55%, #0c121c 100%)",
          color: "#eef2f7",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              border: "1px solid rgba(148,173,204,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              background: "#0c121c",
            }}
          >
            <div style={{ position: "absolute", width: 8, height: 8, borderRadius: 999, background: "#67e8f9", left: 12, top: 12 }} />
            <div style={{ position: "absolute", width: 8, height: 8, borderRadius: 999, background: "#3b82f6", right: 12, top: 12 }} />
            <div style={{ position: "absolute", width: 9, height: 9, borderRadius: 999, background: "#eef2f7", left: 21, bottom: 11 }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 22, fontWeight: 600 }}>Talha Zain</div>
            <div style={{ fontSize: 14, letterSpacing: 3, color: "#8b9bb0" }}>TZ · SYSTEMS</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, letterSpacing: -2, fontWeight: 600 }}>Talha Zain</div>
          <div style={{ fontSize: 34, color: "#67e8f9" }}>Applied AI Engineer</div>
          <div style={{ fontSize: 22, color: "#8b9bb0", maxWidth: 820 }}>
            Agentic AI · LLM Systems · RAG · Production AI Engineering
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
