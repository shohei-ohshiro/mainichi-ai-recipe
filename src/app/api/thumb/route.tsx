import { ImageResponse } from "next/og";
import { loadNotoSerifJP } from "@/lib/og-font";

export const dynamic = "force-dynamic";

const W = 1920;
const H = 1006;

// 統一ブランドデザイン: 白背景に淡い青の幾何学アクセント（円・線・ドット・四角）。
const LINE = "#bcd0ee";
const RING = "#cfe0f5";
const DOT = "#dce7f8";
const DOT_ACCENT = "#8fb3e6";
const FILL_1 = "#eef4fd";
const FILL_2 = "#e4edfb";

function dotGrid(x0: number, y0: number, cols: number, rows: number, gap: number, r: number, fill: string): string {
  let out = "";
  for (let c = 0; c < cols; c++) {
    for (let rIdx = 0; rIdx < rows; rIdx++) {
      out += `<circle cx="${x0 + c * gap}" cy="${y0 + rIdx * gap}" r="${r}" fill="${fill}"/>`;
    }
  }
  return out;
}

// 1920×1006 の装飾レイヤーをSVGで組み立て、背景画像として敷く。
function decorationSvg(): string {
  const body = [
    // 右上: 同心円 + アクセントドット + ドットグリッド
    `<circle cx="1780" cy="40" r="310" fill="none" stroke="${RING}" stroke-width="2"/>`,
    `<circle cx="1780" cy="40" r="245" fill="none" stroke="${RING}" stroke-width="2"/>`,
    `<circle cx="1512" cy="180" r="9" fill="${DOT_ACCENT}"/>`,
    dotGrid(1740, 250, 6, 5, 27, 5, DOT),
    // 左上: 平行の斜線 + 端点リング
    `<line x1="0" y1="118" x2="150" y2="58" stroke="${LINE}" stroke-width="2"/>`,
    `<line x1="0" y1="162" x2="188" y2="86" stroke="${LINE}" stroke-width="2"/>`,
    `<line x1="0" y1="212" x2="150" y2="150" stroke="${LINE}" stroke-width="2"/>`,
    `<circle cx="150" cy="58" r="7" fill="none" stroke="${LINE}" stroke-width="2"/>`,
    `<circle cx="188" cy="86" r="7" fill="none" stroke="${LINE}" stroke-width="2"/>`,
    // 左中: 小さなリング
    `<circle cx="120" cy="470" r="26" fill="none" stroke="${LINE}" stroke-width="2"/>`,
    // 右中: 斜線 + リング
    `<line x1="1648" y1="612" x2="1760" y2="556" stroke="${LINE}" stroke-width="2"/>`,
    `<circle cx="1766" cy="552" r="8" fill="none" stroke="${LINE}" stroke-width="2"/>`,
    // 左下: 大きな淡い円（左端で見切れる） + ドットグリッド
    `<circle cx="30" cy="790" r="205" fill="${FILL_1}"/>`,
    dotGrid(60, 690, 4, 4, 26, 5, DOT),
    // 右下: 平行斜線 + 枠四角 + 塗り四角
    `<line x1="1470" y1="712" x2="1600" y2="602" stroke="${LINE}" stroke-width="2"/>`,
    `<line x1="1512" y1="752" x2="1642" y2="642" stroke="${LINE}" stroke-width="2"/>`,
    `<rect x="1548" y="770" width="92" height="92" fill="none" stroke="${LINE}" stroke-width="2"/>`,
    `<rect x="1612" y="812" width="126" height="126" fill="${FILL_2}"/>`,
    // 下中: 小さな塗り四角
    `<rect x="300" y="872" width="26" height="26" fill="${DOT}"/>`,
  ].join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${body}</svg>`;
}

/**
 * noteサムネイル自動生成API（1920×1006・note推奨サイズ）。
 * 例: /api/thumb?main=議事録、清書ゼロへ。&sub=走り書きメモを貼るだけ・3分
 * 司令室(/factory)がプレビュー表示し、人間は保存してnoteにアップするだけ。
 * デザインは全記事共通の統一ブランド（白背景＋淡い青の幾何学アクセント＋黒セリフ体）。
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const main = (searchParams.get("main") ?? "毎日AIレシピ").slice(0, 40);
  const sub = (searchParams.get("sub") ?? "").slice(0, 60);
  const brand = "毎日AIレシピ";
  const font = await loadNotoSerifJP(main + sub + brand);
  const bg = `data:image/svg+xml,${encodeURIComponent(decorationSvg())}`;

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
          color: "#1a1a1a",
          padding: "80px 140px",
          position: "relative",
        }}
      >
        {/* 装飾レイヤー（全面） */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bg}
          width={W}
          height={H}
          alt=""
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        />
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
            left: 96,
            fontSize: 34,
            fontStyle: "italic",
            color: "#555555",
          }}
        >
          {brand}
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
      fonts: [{ name: "NotoSerifJP", data: font, weight: 700 }],
      headers: {
        // 司令室(別オリジン)の共有ボタンがblob取得できるようにする
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
