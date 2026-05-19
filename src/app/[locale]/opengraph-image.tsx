import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const alt = "Andrea Marchese — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f4ede1",
          color: "#0e0d0c",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "#c8372d",
          }}
        />

        {/* Top meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#6b6661",
            fontFamily: "monospace",
          }}
        >
          <span>武芸 · Bugei · Portfolio</span>
          <span>MMXXVI</span>
        </div>

        {/* Center */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              fontSize: 18,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#c8372d",
              fontFamily: "monospace",
            }}
          >
            {t("role")}
          </span>
          <div style={{ fontSize: 160, lineHeight: 0.85, letterSpacing: -4, display: "flex" }}>
            Andrea
          </div>
          <div style={{ fontSize: 160, lineHeight: 0.85, letterSpacing: -4, fontStyle: "italic", display: "flex" }}>
            Marchese
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <span style={{ fontSize: 32, color: "#0e0d0c", display: "flex" }}>
            {t("tagline")}
          </span>
          <div
            style={{
              width: 100,
              height: 100,
              background: "#c8372d",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f4ede1",
              fontSize: 56,
            }}
          >
            武
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
