/**
 * OG画像用に、表示する文字だけを含むNoto Serif JPのサブセットをGoogle Fontsから取得する。
 * （next/ogはwoff2非対応のため、UA無しfetchでTTFを受け取る）
 */
export async function loadNotoSerifJP(text: string): Promise<ArrayBuffer> {
  const unique = Array.from(new Set(text)).join("");
  const cssUrl = `https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700&text=${encodeURIComponent(unique)}`;
  const css = await (await fetch(cssUrl)).text();
  const match = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
  if (!match) throw new Error("OG font fetch failed");
  return (await fetch(match[1])).arrayBuffer();
}
