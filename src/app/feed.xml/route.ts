import { getAllPosts } from "@/lib/posts";
import { SITE_URL as BASE } from "@/lib/site";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const items = getAllPosts()
    .slice(0, 30)
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${BASE}/posts/${p.slug}</link>
      <guid>${BASE}/posts/${p.slug}</guid>
      <description>${esc(p.description)}</description>
      <pubDate>${new Date(`${p.date}T07:00:00+09:00`).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>毎日AIレシピ</title>
    <link>${BASE}</link>
    <description>AIを毎日仕事で使う開発者が、専門用語ゼロで届ける「明日から使えるAI仕事術」。毎日1レシピ更新。</description>
    <language>ja</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
