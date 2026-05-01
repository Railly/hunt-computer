"use client";

import { useEffect, useState } from "react";

type Commit = {
  sha: string;
  msg: string;
  repo: string;
  url: string;
  date: string;
};

type ApiResponse = {
  commits: Commit[];
  stats: {
    weekPushes: number;
    weekRepos: number;
    lastCommit: string | null;
  };
};

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  if (d < 7) return `${d}d ago`;
  return `${Math.floor(d / 7)}w ago`;
}

function shortRepo(full: string) {
  // "crafter-station/css-bash-vote" → "css-bash-vote"
  // "Railly/kai" → "kai"
  return full.split("/")[1] ?? full;
}

export function HeroTerminal() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [tick, setTick] = useState(0);

  // Fetch on mount + every 60s
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/commits");
        const json: ApiResponse = await res.json();
        if (alive) setData(json);
      } catch {
        // silent
      }
    };
    load();
    const id = setInterval(load, 60_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  // Re-render relative time every 30s
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  const commits = data?.commits ?? [];
  const stats = data?.stats;
  const lastTimeText = stats?.lastCommit ? relativeTime(stats.lastCommit) : "loading…";
  const isStale =
    stats?.lastCommit && Date.now() - new Date(stats.lastCommit).getTime() > 7 * 24 * 60 * 60 * 1000;

  return (
    <div
      className="font-mono text-[10px] leading-relaxed sm:text-[11px]"
      data-tick={tick}
    >
      {/* Terminal header */}
      <div className="mb-3 flex flex-col gap-1 border-b border-bone/20 pb-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="truncate text-bone/60">
          <span className="text-hunt">●</span> hunter@hunt.computer ~ $ git log
        </span>
        <span className="text-bone/60">
          {isStale ? "// deep work mode" : `last push ${lastTimeText}`}
        </span>
      </div>

      {/* Commits */}
      <ul className="space-y-1">
        {commits.length === 0 && (
          <li className="text-bone/60">
            <span className="opacity-50">→</span> fetching commits…
          </li>
        )}
        {commits.map((c) => (
          <li key={c.sha} className="group/c flex gap-3">
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full gap-2 hover:text-hunt sm:gap-3"
            >
              <span className="w-12 shrink-0 text-hunt sm:w-14">{c.sha}</span>
              <span className="min-w-0 flex-1 truncate text-bone">{c.msg}</span>
              <span className="hidden w-28 shrink-0 truncate text-right text-bone/50 md:inline lg:w-32">
                {shortRepo(c.repo)}
              </span>
              <span className="w-14 shrink-0 text-right text-bone/50 sm:w-16">
                {relativeTime(c.date)}
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* Footer stats */}
      {stats && (
        <div className="mt-3 flex flex-col gap-1 border-t border-bone/20 pt-2 text-bone/60 sm:flex-row sm:items-center sm:justify-between">
          <span>
            this week: <span className="text-bone">{stats.weekPushes}</span> pushes ·{" "}
            <span className="text-bone">{stats.weekRepos}</span> repos
          </span>
          <a
            href="https://github.com/Railly"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-hunt"
          >
            github.com/Railly ↗
          </a>
        </div>
      )}
    </div>
  );
}
