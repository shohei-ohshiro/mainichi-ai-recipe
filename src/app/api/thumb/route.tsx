import { ImageResponse } from "next/og";
import { loadNotoSerifJP } from "@/lib/og-font";

export const dynamic = "force-dynamic";

/**
 * noteサムネイル自動生成API（1920×1006・note推奨サイズ）。
 * 例: /api/thumb?main=議事録、清書ゼロへ。&sub=走り書きメモを貼るだけ・3分
 * 司令室(/factory)がプレビュー表示し、人間は保存してnoteにアップするだけ。
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const main = (searchParams.get("main") ?? "毎日AIレシピ").slice(0, 40);
  const sub = (searchParams.get("sub") ?? "").slice(0, 60);
  const brand = "毎日AIレシピ";
  const font = await loadNotoSerifJP(main + sub + brand);

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
          padding: "80px 120px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: main.length > 14 ? 96 : 116,
            fontWeight: 700,
            lineHeight: 1.3,
            textAlign: "center",
          }}
        >
          {main}
        </div>
        {sub && (
          <div
            style={{
              display: "flex",
              fontSize: 44,
              color: "#555555",
              marginTop: 48,
            }}
          >
            {sub}
          </div>
        )}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 56,
            left: 80,
            fontSize: 34,
            color: "#555555",
          }}
        >
          {brand}
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 14,
            background: "#111111",
          }}
        />
      </div>
    ),
    {
      width: 1920,
      height: 1006,
      fonts: [{ name: "NotoSerifJP", data: font, weight: 700 }],
    },
  );
}
