import { Crosshair } from "./crosshair";
import { Reveal } from "./reveal";

const building = [
  {
    name: "CLIPEM",
    status: "PRIVATE",
    role: "Cinematic demo video pipeline",
    desc: "URL to cinematic demo video, fully automated. Webreel + Remotion + ElevenLabs + agent-browser AX tree.",
  },
  {
    name: "WEBCTL",
    status: "BUILDING",
    role: "Rust + agent-browser",
    desc: "Reverse-engineer any website into a declarative IR. Recon once, zero LLM tokens at runtime.",
  },
  {
    name: "KAI",
    status: "PHASE 5",
    role: "Personal AI assistant",
    desc: "Self-evolving agent loop. Webhook gateway, vector memory, voice channels, 9 specialized agents.",
  },
];

const learning = [
  { topic: "Math for ML", note: "Math Academy, 3rd attempt" },
  { topic: "Algorithms & Data Structures", note: "LC medium/hard, by hand" },
  { topic: "Rust", note: "for webctl + agent CLIs" },
  { topic: "English C1", note: "TOEFL 100+ retake target" },
];

export function Now() {
  return (
    <section id="now" className="border-b border-hairline bg-ink py-20 text-bone sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
        <div className="mb-20 grid grid-cols-2 items-end gap-4 md:grid-cols-4">
          <span className="caption text-bone/60">SECTION.03</span>
          <h2 className="display col-span-2 text-[clamp(48px,7vw,96px)]">
            Now
            <br />
            building.
          </h2>
          <span className="caption flex items-center justify-end gap-2 text-bone/60">
            <Crosshair className="h-3 w-3 text-hunt" />
            LIVE.STATUS
          </span>
        </div>

        <Reveal
          className="grid gap-px bg-bone/10 md:grid-cols-3"
          selector="article"
          stagger={0.08}
          y={20}
        >
          {building.map((b, i) => (
            <article
              key={b.name}
              className="flex flex-col justify-between bg-ink p-6 sm:p-8 lg:p-10"
            >
              <div className="flex items-baseline justify-between">
                <span className="display text-3xl">{b.name}</span>
                <span className="caption text-hunt">{b.status}</span>
              </div>
              <div className="my-12">
                <p className="caption mb-3 text-bone/60">{b.role}</p>
                <p className="font-sans text-base leading-relaxed text-bone/85">{b.desc}</p>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="caption text-bone/40">HUNT.0{i + 7}</span>
                <span className="caption text-bone/40">UPDATING</span>
              </div>
            </article>
          ))}
        </Reveal>

        <div className="mt-12 border-t border-bone/10 pt-8">
          <p className="caption mb-6 text-bone/60">CURRENTLY LEARNING</p>
          <Reveal
            className="grid gap-x-8 gap-y-3 sm:grid-cols-2 md:grid-cols-4"
            as="ul"
            selector="li"
            stagger={0.06}
            y={12}
          >
            {learning.map((l) => (
              <li key={l.topic} className="flex items-start gap-3">
                <Crosshair className="mt-1 h-3 w-3 shrink-0 text-hunt" />
                <div>
                  <p className="font-sans text-sm text-bone/85">{l.topic}</p>
                  <p className="caption mt-1 text-bone/40">{l.note}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
