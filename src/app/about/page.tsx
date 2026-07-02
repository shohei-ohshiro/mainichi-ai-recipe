import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "このブログについて",
  description: "毎日AIレシピの運営方針と書き手について",
};

export default function AboutPage() {
  return (
    <div className="prose prose-gray max-w-none">
      <h1>このブログについて</h1>
      <p>
        「毎日AIレシピ」は、AIを毎日仕事で使っている開発者が、
        <strong>専門用語ゼロ</strong>で「明日からそのまま真似できるAI仕事術」を
        毎日1つ届けるブログです。
      </p>
      <h2>大切にしていること</h2>
      <ul>
        <li>読んだ人が<strong>今日そのまま試せる</strong>手順で書く（抽象論なし）</li>
        <li>コピペで使えるプロンプトは必ずそのまま載せる</li>
        <li>誇張しない。試していないことを断定しない</li>
      </ul>
      <h2>AIの利用について</h2>
      <p>
        記事はAIの支援を受けて執筆し、人間が内容を確認・編集して公開しています。
        レシピは実際の業務での利用経験に基づいています。
      </p>
      <h2>note・Zenn でも書いています</h2>
      <p>
        <a href="https://note.com/every_ai_recipe">note</a>
        では同じテーマのレシピを毎日投稿しています。エンジニア向けの一段深い版は
        <a href="https://zenn.dev/every_ai_recipe">Zenn</a>
        へ。あわせてフォローしてもらえると嬉しいです。
      </p>
    </div>
  );
}
