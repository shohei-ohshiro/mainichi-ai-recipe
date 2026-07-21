import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getAllPosts, getPost } from "@/lib/posts";
import ViewPing from "@/components/ViewPing";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/posts/${params.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `/posts/${params.slug}`,
    },
  };
}

export default function PostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const html = marked.parse(post.content, { async: false }) as string;
  return (
    <article>
      <ViewPing slug={params.slug} />
      <time className="text-xs text-gray-400">{post.date}</time>
      <h1 className="mt-1 text-2xl font-bold leading-snug">{post.title}</h1>
      <div className="mt-2 flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <span key={t} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
            {t}
          </span>
        ))}
      </div>
      <div
        className="prose prose-gray mt-8 max-w-none prose-pre:bg-gray-900 prose-pre:text-gray-100"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="mt-12 border-t border-gray-100 pt-6 text-sm text-gray-600">
        <p>
          毎日1つ、明日から使えるAIレシピを更新しています。{" "}
          <Link href="/" className="underline">
            記事一覧へ
          </Link>
        </p>
      </div>
    </article>
  );
}
