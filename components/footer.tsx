import { getBuildDate, getBuildSha } from "@/lib/build";
import { Crosshair } from "./crosshair";
import { ShippingStrip } from "./shipping-strip";

export function Footer() {
  const sha = getBuildSha();
  const buildDate = getBuildDate();
  return (
    <footer className="overflow-hidden bg-bone">
      <ShippingStrip />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
        {/* Sitemap + meta */}
        <div className="grid gap-12 border-b border-hairline py-12 md:grid-cols-4">
          <div>
            <p className="caption mb-4">SITEMAP</p>
            <ul className="space-y-2 font-sans text-sm text-ink">
              <li>
                <a href="#about" className="hover:text-hunt">
                  About
                </a>
              </li>
              <li>
                <a href="#manifesto" className="hover:text-hunt">
                  Manifesto
                </a>
              </li>
              <li>
                <a href="#now" className="hover:text-hunt">
                  Now building
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-hunt">
                  Products
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-hunt">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="caption mb-4">ELSEWHERE</p>
            <ul className="space-y-2 font-sans text-sm text-ink">
              <li>
                <a
                  href="https://github.com/Railly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-hunt"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/raillyhugo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-hunt"
                >
                  Twitter ↗
                </a>
              </li>
              <li>
                <a
                  href="https://railly.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-hunt"
                >
                  railly.dev ↗
                </a>
              </li>
              <li>
                <a
                  href="https://crafterstation.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-hunt"
                >
                  Crafter Station ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="caption mb-4">COLOPHON</p>
            <ul className="space-y-2 font-sans text-sm text-ink-muted">
              <li>Next.js · React 19</li>
              <li>Tailwind CSS v4</li>
              <li>GSAP · Lenis</li>
              <li>Geist · Instrument Serif</li>
              <li>Bun · Biome · Vercel</li>
            </ul>
          </div>

          <div>
            <p className="caption mb-4">BUILD</p>
            <ul className="space-y-2 font-sans text-sm text-ink-muted">
              <li className="flex items-center gap-2 text-ink">
                <Crosshair className="h-3 w-3 text-hunt" />
                <a
                  href={
                    sha === "local"
                      ? "https://github.com/Railly"
                      : `https://github.com/Railly/hunt/commit/${sha}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs hover:text-hunt"
                >
                  BUILD.{sha}
                </a>
              </li>
              <li className="font-mono text-xs">{buildDate.toUpperCase()}</li>
              <li className="text-xs">By Hunter, from Lima.</li>
              <li className="text-xs">Designed and built by hand.</li>
            </ul>
          </div>
        </div>

        {/* HUNT closer — scales to fit chars dynamically via cqi (container) + cap */}
        <div className="select-none py-8">
          <div className="display whitespace-nowrap text-[clamp(56px,15vw,260px)] leading-[0.85] tracking-[-0.05em] text-ink">
            HUNT.<span className="text-hunt">{sha}</span>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col gap-2 border-t border-hairline py-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="caption">© MMXXVI / RAILLY HUGO</span>
          <span className="caption">A WORKSHOP, NOT A STUDIO.</span>
        </div>
      </div>
    </footer>
  );
}
