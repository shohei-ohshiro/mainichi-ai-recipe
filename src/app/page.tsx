import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  return (
    <div>
      <section className="mb-10">
        <h1 className="text-2xl font-bold sm:text-3xl">
          明日から使えるAI仕事術を、毎日1つ。
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          AIを毎日仕事で使う開発者が、専門用語ゼロの「そのまま真似できるレシピ」を届けます。
          録音不要の議事録、貼るだけプロンプト、ツールの使い分け——全部3分で試せます。
        </p>
      </section>
      <section className="space-y-6">
        {posts.map((p) => (
          <article key={p.slug} className="group">
            <Link href={`/posts/${p.slug}`} className="block">
              <time className="text-xs text-gray-400">{p.date}</time>
              <h2 className="mt-1 font-semibold group-hover:underline">
                {p.title}
              </h2>
              <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                {p.description}
              </p>
            </Link>
          </article>
        ))}
        {posts.length === 0 && (
          <p className="text-sm text-gray-500">記事は毎朝更新されます。</p>
        )}
      </section>
    </div>
  );
}
