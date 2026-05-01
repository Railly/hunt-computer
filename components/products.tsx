"use client";

import Image from "next/image";
import { useState } from "react";
import { Arrow } from "./arrow";
import { Crosshair } from "./crosshair";
import { Reveal } from "./reveal";

const products = [
  {
    slug: "tinte",
    name: "TINTE",
    role: "Themes",
    desc: "Theme builder for VS Code, shadcn, and beyond. Agent-native design system infrastructure with live preview and one-click install.",
    href: "https://tinte.dev",
    status: "LIVE",
    build: "585",
    year: "2024",
  },
  {
    slug: "agentfiles",
    name: "AGENTFILES",
    role: "Editor",
    desc: "Browse, create, and edit AI agent files across Claude Code, Cursor, Codex. 13+ tools, born from Obsidian.",
    href: "https://agentfiles.com",
    status: "LIVE",
    build: "538",
    year: "2024",
  },
  {
    slug: "elements",
    name: "ELEMENTS",
    role: "UI",
    desc: "Full-stack shadcn/ui blocks for auth, payments, AI, and logos. The fastest way to ship a B2B SaaS UI.",
    href: "https://tryelements.dev",
    status: "LIVE",
    build: "492",
    year: "2024",
  },
  {
    slug: "text0",
    name: "TEXT0",
    role: "Editor",
    desc: "AI-powered text editor with real-time collaboration. Absurdly smart, deeply personal autocomplete.",
    href: "https://text0.dev",
    status: "LIVE",
    build: "446",
    year: "2024",
  },
  {
    slug: "one-hunter",
    name: "ONE HUNTER",
    role: "Theme",
    desc: "VS Code theme inspired by Vercel and One Dark Pro. Powered by Tinte.",
    href: "https://marketplace.visualstudio.com/items?itemName=raillyhugo.one-hunter",
    status: "LIVE",
    build: "380",
    year: "2022",
  },
  {
    slug: "cligentic",
    name: "CLIGENTIC",
    role: "CLI",
    desc: "Copy-paste CLI blocks for the agent era. Trust ladder, killswitch, audit log. Installable primitives, you own the code.",
    href: "https://cligentic.railly.dev",
    status: "LIVE",
    build: "001",
    year: "2026",
  },
];

export function Products() {
  const [tappedIdx, setTappedIdx] = useState<number | null>(null);
  return (
    <section id="products" className="border-b border-hairline py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
        <div className="mb-20 grid grid-cols-2 items-end gap-4 md:grid-cols-4">
          <span className="caption">SECTION.04</span>
          <h2 className="display col-span-2 text-[clamp(48px,7vw,96px)] text-ink">
            Products
            <br />
            by Hunter.
          </h2>
          <span className="caption flex items-center justify-end gap-2">
            <Crosshair className="h-3 w-3 text-hunt" />
            06.RELEASES
          </span>
        </div>

        <Reveal
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          selector="a"
          stagger={0.06}
          y={20}
        >
          {products.map((p, i) => {
            const isTapped = tappedIdx === i;
            return (
              <a
                key={p.slug}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (window.matchMedia("(hover: none)").matches && !isTapped) {
                    e.preventDefault();
                    setTappedIdx(i);
                  }
                }}
                onMouseLeave={() => setTappedIdx(null)}
                className="group relative block aspect-[2/3] overflow-hidden border border-hairline"
              >
                <Image
                  src={`/cassettes/${p.slug}.webp`}
                  alt={`${p.name} cassette cover`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  priority={i < 3}
                />
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-6 transition-colors duration-300 group-hover:bg-ink/85 ${
                    isTapped ? "bg-ink/85" : "bg-ink/0"
                  }`}
                >
                  <div
                    className={`transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ${
                      isTapped ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                  >
                    <p className="font-sans text-sm leading-relaxed text-bone">{p.desc}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-bone/30 pt-4">
                      <span className="caption text-bone/70">
                        {p.role.toUpperCase()} / EST.{p.year}
                      </span>
                      <span className="caption flex items-center gap-1 text-hunt">
                        VISIT <Arrow />
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </Reveal>

        <p className="mt-12 max-w-2xl font-sans text-sm text-ink-muted">
          Each release is its own cassette. Series consistency, per-product personality. Hover any
          card to read the spec.
        </p>
      </div>
    </section>
  );
}
