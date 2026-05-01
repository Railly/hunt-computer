import { NextResponse } from "next/server";

type Commit = {
  sha: string;
  msg: string;
  repo: string;
  url: string;
  date: string;
};

type PushEvent = {
  type: "PushEvent";
  repo: { name: string };
  payload: { head: string; ref?: string };
  created_at: string;
};

type GhEvent = {
  type: string;
  repo: { name: string };
  payload: Record<string, unknown> & { head?: string; commits?: { sha: string; message: string }[] };
  created_at: string;
};

const USER = "Railly";
const EXCLUDE_REPOS = new Set<string>([
  "Railly/dotfiles",
]);

const TRIVIAL_PATTERNS = [
  /^merge pull request/i,
  /^merge branch/i,
  /^update readme/i,
  /^typo/i,
  /^fix typo/i,
  /^wip$/i,
  /^\.+$/,
];

function isTrivial(msg: string) {
  if (msg.length < 8) return true;
  return TRIVIAL_PATTERNS.some((p) => p.test(msg));
}

async function ghFetch(url: string) {
  const headers: Record<string, string> = {
    "User-Agent": "hunt.computer",
    Accept: "application/vnd.github+json",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url, { headers, next: { revalidate: 0 } });
  if (!res.ok) throw new Error(`gh ${res.status} for ${url}`);
  return res.json();
}

export async function GET() {
  try {
    const events: GhEvent[] = await ghFetch(
      `https://api.github.com/users/${USER}/events/public`
    );

    const pushEvents = events.filter(
      (e): e is PushEvent => e.type === "PushEvent" && !EXCLUDE_REPOS.has(e.repo.name)
    );

    // Resolve commit messages by fetching each head sha (parallel, dedup by sha)
    const seen = new Set<string>();
    const targets: { sha: string; repo: string; date: string }[] = [];
    for (const e of pushEvents) {
      if (!e.payload.head || seen.has(e.payload.head)) continue;
      seen.add(e.payload.head);
      targets.push({ sha: e.payload.head, repo: e.repo.name, date: e.created_at });
      if (targets.length >= 12) break;
    }

    const resolved = await Promise.allSettled(
      targets.map(async (t) => {
        const c = await ghFetch(
          `https://api.github.com/repos/${t.repo}/commits/${t.sha}`
        );
        const msg: string = c?.commit?.message?.split("\n")[0] ?? "";
        return {
          sha: t.sha.slice(0, 7),
          msg,
          repo: t.repo,
          url: c?.html_url ?? `https://github.com/${t.repo}/commit/${t.sha}`,
          date: t.date,
        } satisfies Commit;
      })
    );

    const commits = resolved
      .filter((r): r is PromiseFulfilledResult<Commit> => r.status === "fulfilled")
      .map((r) => r.value)
      .filter((c) => !isTrivial(c.msg))
      .slice(0, 6);

    // Stats: count last 7 days of pushes (across all events, not just resolved)
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const weekPushes = pushEvents.filter(
      (e) => new Date(e.created_at).getTime() > weekAgo
    ).length;
    const weekRepos = new Set(
      pushEvents
        .filter((e) => new Date(e.created_at).getTime() > weekAgo)
        .map((e) => e.repo.name)
    ).size;

    return NextResponse.json(
      {
        commits,
        stats: {
          weekPushes,
          weekRepos,
          lastCommit: commits[0]?.date ?? null,
        },
      },
      {
        headers: {
          // Edge cache 60s, browser revalidate 30s
          "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "unknown", commits: [] },
      { status: 200 }
    );
  }
}
