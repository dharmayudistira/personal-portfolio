import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Dharma Yudistira — Product Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#111110",
          padding: "64px 72px",
          fontFamily: "monospace",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid lines */}
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          <div style={{ position: "absolute", left: 72, top: 0, bottom: 0, width: 1, backgroundColor: "rgba(255,255,255,0.04)" }} />
          <div style={{ position: "absolute", right: 72, top: 0, bottom: 0, width: 1, backgroundColor: "rgba(255,255,255,0.04)" }} />
          <div style={{ position: "absolute", top: 64, left: 0, right: 0, height: 1, backgroundColor: "rgba(255,255,255,0.04)" }} />
          <div style={{ position: "absolute", bottom: 64, left: 0, right: 0, height: 1, backgroundColor: "rgba(255,255,255,0.04)" }} />
        </div>

        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#22c55e" }} />
            <span style={{ fontSize: 13, color: "#22c55e", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Open_to_Work
            </span>
          </div>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Full-Time // Zero One Group
          </span>
        </div>

        {/* Name */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, lineHeight: 0.85 }}>
          <span style={{ fontSize: 148, fontWeight: 700, color: "#e8e8e6", textTransform: "uppercase", letterSpacing: "-0.04em" }}>
            Dharma
          </span>
          <span style={{ fontSize: 148, fontWeight: 700, color: "rgba(232,232,230,0.6)", textTransform: "uppercase", letterSpacing: "-0.04em" }}>
            Yudistira
          </span>
        </div>

        {/* Bottom strip */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24 }}>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Product Engineer
          </span>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em" }}>·</span>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            3+ Yrs Exp
          </span>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em" }}>·</span>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Full-Stack · Mobile
          </span>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em" }}>·</span>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            dharma-yudistira.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
