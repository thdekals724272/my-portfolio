// 외부 URL(http/https, data:)은 그대로 쓰고, public/ 폴더의 로컬 경로는 배포 base(import.meta.env.BASE_URL)를
// 붙여서 반환한다. GitHub Pages(서브패스 배포)와 Vercel(루트 배포) 양쪽에서 로컬 이미지 경로가
// 깨지지 않게 하기 위함 — 앞에 '/'를 붙인 절대경로는 서브패스 배포에서 도메인 루트로 풀려버린다.
export function resolveThumbnailUrl(url) {
  if (!url) return null;
  if (/^(https?:)?\/\//i.test(url) || url.startsWith('data:')) return url;
  return `${import.meta.env.BASE_URL}${url.replace(/^\/+/, '')}`;
}
