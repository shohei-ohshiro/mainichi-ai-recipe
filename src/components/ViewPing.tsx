"use client";

import { useEffect } from "react";

/** 自前アクセスカウンター。改善ループ用にページビューを1回記録する。 */
export default function ViewPing({ slug }: { slug: string }) {
  useEffect(() => {
    fetch(
      `https://ai-market-radar-seven.vercel.app/api/factory/pageview?slug=${encodeURIComponent(slug)}`,
      { mode: "no-cors" },
    ).catch(() => {});
  }, [slug]);
  return null;
}
