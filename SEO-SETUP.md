# 検索流入をゼロから立ち上げる手順（人間の作業・一度きり）

19本の記事が18日間でPV実質1だったのは、記事の質ではなく **Googleにサイトの存在が届いていない** のが主因の疑いが濃い。
robots.txt / canonical / sitemap の配管はコード側で整えた（2026-07-21）。残りは人間しかできない3つ。

**所要 60〜90分。やり切れば、あとは毎朝の自動投稿がそのまま資産になる。**
新規ドメインのSEOは効き始めるまで3〜6ヶ月かかるので、**着手が早いほど効く**。

---

## STEP 1: 独自ドメインを取る（15分・年1,500円前後）

`.vercel.app` サブドメインはドメイン評価がゼロから育たず、検索で不利。
独自ドメインに移すと、そこから積み上げた評価が**自分の資産として残る**。

1. お名前.com / Cloudflare Registrar / Google Domains 後継などで `.com` か `.jp` を取得
   （候補例: `mainichi-ai-recipe.com` / `ai-recipe.jp`。短く、覚えやすく、記事内容と一致するもの）
2. Vercel のプロジェクト `mainichi-ai-recipe` → Settings → Domains → 取得したドメインを追加
3. 表示されるDNSレコード（A または CNAME）を、ドメイン取得元の管理画面に登録
4. Vercel の Domains 画面が `Valid Configuration` になるまで待つ（通常10分〜数時間）

## STEP 2: サイトURLを新ドメインに切り替える（3分）

コード側は環境変数1本で全部（sitemap / robots / RSS / OGP / canonical）が追従するようにしてある。

1. Vercel → Settings → Environment Variables
2. `NEXT_PUBLIC_SITE_URL` = `https://<取得したドメイン>`（**末尾スラッシュなし**）
3. Production / Preview / Development すべてにチェック
4. Deployments → 最新のものを Redeploy（環境変数は再デプロイで初めて効く）
5. `https://<ドメイン>/robots.txt` と `/sitemap.xml` を開き、新ドメインになっていることを確認

## STEP 3: Google Search Console に登録する（30分）

**ここが本丸。** これをやらないとGoogleは19本の存在を知らないままになる。

1. https://search.google.com/search-console にログイン
2. 「URLプレフィックス」で `https://<ドメイン>` を追加
3. 所有権の確認 → **HTMLタグ方式**を選び、表示された `content="..."` の中身をコピー
4. Vercel の環境変数に `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = コピーした値 を追加 → Redeploy
   （`src/app/layout.tsx` の `verification.google` が自動で読む）
5. Search Console に戻って「確認」を押す
6. 左メニュー「サイトマップ」→ `sitemap.xml` を送信
7. 上部の検索窓に記事URLを1本入れて「インデックス登録をリクエスト」（手動で数本push すると初速が出る）

### 登録後に見る場所（週1回・5分でいい）

- Search Console →「検索結果のパフォーマンス」: **表示回数**が動き始めたら、Googleが認識した合図
- 「ページのインデックス作成」: 19本のうち何本がインデックスされたか。ゼロのままなら何かが詰まっている

---

## 効果が出るまでの目安

| 時期 | 期待する状態 |
|---|---|
| 登録から1〜2週間 | インデックス数が0→数本。表示回数がぽつぽつ出る |
| 1〜2ヶ月 | 19本の大半がインデックス。表示回数が3桁に |
| 3〜6ヶ月 | ロングテールのクリックが日次で入り始める。ここから先は記事数が効く |

**この間、毎朝の自動投稿は止めないこと。** 記事数はSEOでそのまま効く数少ない変数で、しかも人間の手がかからない。
