/**
 * サイトの正規URL。独自ドメインに移す時はここ1箇所…ではなく、
 * Vercel の環境変数 NEXT_PUBLIC_SITE_URL を差し替えるだけで全部が追従する
 * （sitemap / robots / RSS / OGP / canonical）。
 * 末尾スラッシュは常に落とす（URLの重複をGoogleに見せないため）。
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mainichi-ai-recipe.vercel.app"
).replace(/\/$/, "");
