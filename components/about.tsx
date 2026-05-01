import { Crosshair } from "./crosshair";
import { Reveal } from "./reveal";

const facets = [
  { label: "DAY JOB", value: "AI Engineer at Clerk" },
  { label: "FOUNDER", value: "Crafter Station" },
  { label: "BASED IN", value: "Lima, Perú" },
  { label: "TIMEZONE", value: "GMT-5" },
];

export function About() {
  return (
    <section
      id="about"
      className="border-b border-hairline py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
        <div className="mb-16 grid grid-cols-2 items-end gap-4 md:grid-cols-4">
          <span className="caption">SECTION.01</span>
          <h2 className="display col-span-2 text-[clamp(48px,7vw,96px)] text-ink">
            Who's
            <br />
            hunting.
          </h2>
          <span className="caption flex items-center justify-end gap-2">
            <Crosshair className="h-3 w-3 text-hunt" />
            ABOUT
          </span>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[2fr_1fr]">
          <div className="display max-w-3xl text-[clamp(28px,3.5vw,56px)] leading-[1.15] text-ink">
            <p>
              Hi, I'm <span className="text-hunt">Railly Hugo</span>. Software engineer from
              Lima, Perú. I work full-time at Clerk on AI Enablement, run Crafter Station as a
              non-profit for the LATAM tech ecosystem, and ship side projects most nights.
            </p>
            <p className="mt-8 font-sans text-base leading-relaxed text-ink-muted sm:text-lg">
              This site is the workshop. Everything I build that isn't owned by Clerk lives here:
              themes, CLIs, agent tools, editors. Some have stars, some are private studies. All
              are made by hand.
            </p>
          </div>

          <Reveal as="ul" className="grid gap-px bg-hairline" selector="li" stagger={0.06} y={12}>
            {facets.map((f) => (
              <li key={f.label} className="flex items-baseline justify-between bg-bone p-5">
                <span className="caption">{f.label}</span>
                <span className="font-sans text-sm text-ink">{f.value}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
