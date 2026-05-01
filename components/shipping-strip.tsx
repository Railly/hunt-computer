"use client";

import { useEffect, useState } from "react";

type ShipData = {
  lastMsg: string;
  lastRepo: string;
  lastTime: string;
  weekPushes: number;
  weekRepos: number;
  url: string;
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

export function ShippingStrip() {
  const [data, setData] = useState<ShipData | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/commits");
        const json = await res.json();
        if (!alive) return;
        const latest = json?.commits?.[0];
        if (!latest) return;
        setData({
          lastMsg: latest.msg,
          lastRepo: latest.repo.split("/")[1] ?? latest.repo,
          lastTime: latest.date,
          weekPushes: json?.stats?.weekPushes ?? 0,
          weekRepos: json?.stats?.weekRepos ?? 0,
          url: latest.url,
        });
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

  return (
    <div
      className="border-y border-hairline bg-bone-2/60 py-4"
      data-tick={tick}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
        <div className="flex min-w-0 items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em]">
          <span className="flex items-center gap-2 text-ink-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hunt opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-hunt" />
            </span>
            NOW SHIPPING
          </span>
          {data ? (
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-0 truncate text-ink hover:text-hunt"
              title={data.lastMsg}
            >
              {data.lastMsg}
            </a>
          ) : (
            <span className="text-ink-muted">fetching…</span>
          )}
        </div>

        {data && (
          <div className="flex shrink-0 items-center gap-4 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
            <span>
              <span className="text-ink">{data.lastRepo}</span> · {relativeTime(data.lastTime)}
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">
              <span className="text-ink">{data.weekPushes}</span> PUSHES THIS WEEK
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
