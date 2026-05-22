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
          color: "#f4ede1",
          fontSize: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          borderRadius: 4,
          position: "relative",
        }}
      >
        武
        <div
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            width: 5,
            height: 5,
            background: "#c8372d",
            borderRadius: 999,
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
