import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const BASE = "https://mainichi-ai-recipe.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((p) => ({
    url: `${BASE}/posts/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
  }));
  return [
    { url: BASE, lastModified: new Date() },
    { url: `${BASE}/about`, lastModified: new Date() },
    ...posts,
  ];
}
