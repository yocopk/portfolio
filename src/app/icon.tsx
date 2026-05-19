import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0e0d0c",
          color: "#c8372d",
          fontSize: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          borderRadius: 6,
        }}
      >
        武
      </div>
    ),
    { ...size },
  );
}
