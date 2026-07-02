import { ImageResponse } from "next/og";
import { loadNotoSerifJP } from "@/lib/og-font";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const brand = "毎日AIレシピ";
  const tagline = "明日から使えるAI仕事術を、毎日1つ。";
  const sub = "専門用語ゼロ・3分で試せるレシピ";
  const font = await loadNotoSerifJP(brand + tagline + sub);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          fontFamily: "NotoSerifJP",
          color: "#111111",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", fontSize: 40, color: "#555555" }}>{brand}</div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700 }}>{tagline}</div>
        <div style={{ display: "flex", fontSize: 28, color: "#555555" }}>{sub}</div>
      </div>
    ),
    { ...size, fonts: [{ name: "NotoSerifJP", data: font, weight: 700 }] },
  );
}
