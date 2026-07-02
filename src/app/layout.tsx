import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const TITLE = "毎日AIレシピ";
const DESC =
  "AIを毎日仕事で使う開発者が、専門用語ゼロで届ける「明日から使えるAI仕事術」。毎日1レシピ更新。";

export const metadata: Metadata = {
  metadataBase: new URL("https://mainichi-ai-recipe.vercel.app"),
  title: { default: TITLE, template: `%s | ${TITLE}` },
  description: DESC,
  applicationName: TITLE,
  openGraph: {
    title: TITLE,
    description: DESC,
    type: "website",
    locale: "ja_JP",
    siteName: TITLE,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="antialiased bg-white text-gray-900">
        <header className="border-b border-gray-100">
          <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
            <Link href="/" className="font-bold tracking-tight">
              毎日AIレシピ
            </Link>
            <nav className="flex gap-4 text-sm text-gray-600">
              <Link href="/about" className="hover:text-gray-900">
                このブログについて
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-2xl px-6 py-10">{children}</main>
        <footer className="border-t border-gray-100">
          <div className="mx-auto max-w-2xl px-6 py-8 text-xs text-gray-400">
            <p>
              記事はAIの支援を受けて執筆し、人間が内容を確認・編集して公開しています。
            </p>
            <p className="mt-2">© 2026 毎日AIレシピ</p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
