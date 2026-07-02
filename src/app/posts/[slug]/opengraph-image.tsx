import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "@/lib/posts";
import { loadNotoSerifJP } from "@/lib/og-font";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  const title = post?.title ?? "毎日AIレシピ";
  const date = post?.date ?? "";
  const brand = "毎日AIレシピ";
  const tagline = "明日から使えるAI仕事術を、毎日1つ。";
  const font = await loadNotoSerifJP(title + date + brand + tagline);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "64px 72px",
          fontFamily: "NotoSerifJP",
          color: "#111111",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#555555" }}>{brand}</div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 24 ? 56 : 64,
            fontWeight: 700,
            lineHeight: 1.35,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#555555",
            borderTop: "2px solid #111111",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex" }}>{tagline}</div>
          <div style={{ display: "flex" }}>{date}</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "NotoSerifJP", data: font, weight: 700 }] },
  );
}
