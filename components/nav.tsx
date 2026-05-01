import { getBuildSha } from "@/lib/build";
import { Crosshair } from "./crosshair";

export function Nav() {
  const sha = getBuildSha();
  return (
    <header className="sticky top-0 z-50 border-b border-ink bg-ink">
      <div className="mx-auto flex h-12 max-w-[1400px] items-center justify-between px-5 sm:px-6">
        <a href="#" className="flex items-center gap-2 transition-opacity hover:opacity-70">
          <Crosshair className="h-4 w-4 text-hunt" />
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-bone">
            HUNT.COMPUTER
          </span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#about"
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-bone transition-colors hover:text-hunt"
          >
            About
          </a>
          <a
            href="#manifesto"
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-bone transition-colors hover:text-hunt"
          >
            Manifesto
          </a>
          <a
            href="#now"
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-bone transition-colors hover:text-hunt"
          >
            Now
          </a>
          <a
            href="#products"
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-bone transition-colors hover:text-hunt"
          >
            Products
          </a>
          <a
            href="#contact"
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-bone transition-colors hover:text-hunt"
          >
            Contact
          </a>
        </nav>
        <a
          href={
            sha === "local"
              ? "https://github.com/Railly"
              : `https://github.com/Railly/hunt/commit/${sha}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] uppercase tracking-[0.1em] text-bone transition-colors hover:text-hunt"
        >
          BUILD.{sha}
        </a>
      </div>
    </header>
  );
}
