/**
 * Build identifier sourced from Vercel env vars at build time.
 * Falls back to "local" when running outside Vercel.
 */
export function getBuildSha(short = true): string {
  const sha =
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
    "";
  if (!sha) return "local";
  return short ? sha.slice(0, 7) : sha;
}

export function getBuildDate(): string {
  return new Date().toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}
