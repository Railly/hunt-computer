import { Reveal } from "./reveal";

export function Manifesto() {
  const points = [
    {
      n: "01",
      tag: "PRINCIPLE",
      title: "Slow software.",
      body: "I build the slow way. No handoffs. No layers of abstraction. The thing on screen is the thing I shipped, and I can explain every line of it.",
      meta: "12.MIN.READ",
    },
    {
      n: "02",
      tag: "PRINCIPLE",
      title: "One operator.",
      body: "No team to coordinate, no roadmap committee, no quarterly planning. Decisions happen in the same head that writes the code.",
      meta: "08.MIN.READ",
    },
    {
      n: "03",
      tag: "PRINCIPLE",
      title: "Built in private. Shipped in public.",
      body: "The work is private until it isn't. When it ships, it ships hard. Code, post, demo, all at once.",
      meta: "10.MIN.READ",
    },
    {
      n: "04",
      tag: "PRINCIPLE",
      title: "Tools over products.",
      body: "Most of what I build are tools first. For me, for agents, for other operators. If the tool is good enough, the product is the side-effect.",
      meta: "07.MIN.READ",
    },
    {
      n: "05",
      tag: "PRINCIPLE",
      title: "Performance is a feature.",
      body: "Latency, bundle size, cold start, time-to-first-byte. If it isn't fast, it isn't done.",
      meta: "06.MIN.READ",
    },
    {
      n: "06",
      tag: "PRINCIPLE",
      title: "Boring tech, sharp craft.",
      body: "I pick the boring stack on purpose. Next, Postgres, Bun. The interesting part isn't the tools, it's what you do with them.",
      meta: "09.MIN.READ",
    },
  ];
  return (
    <section
      id="manifesto"
      className="relative border-b border-hairline bg-bone-2/40 py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
        <div className="mb-20 grid grid-cols-2 items-end gap-4 md:grid-cols-4">
          <span className="caption">SECTION.02</span>
          <h2 className="display col-span-2 text-[clamp(48px,7vw,96px)] text-ink">
            A workshop,
            <br />
            not a studio.
          </h2>
          <span className="caption text-right">06.PRINCIPLES</span>
        </div>

        <Reveal
          className="grid gap-px bg-hairline md:grid-cols-2"
          selector="article"
          stagger={0.07}
          y={20}
        >
          {points.map((p) => (
            <article
              key={p.n}
              className="group relative flex flex-col justify-between bg-bone p-6 transition-colors hover:bg-bone-2 sm:p-8 lg:p-10"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs text-hunt">{p.n}</span>
                <span className="caption">{p.tag}</span>
              </div>

              <div className="my-10">
                <h3 className="display mb-4 text-3xl text-ink">{p.title}</h3>
                <p className="font-sans text-base leading-relaxed text-ink-muted">{p.body}</p>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="caption">HUNT.{p.n}</span>
                <span className="caption">{p.meta}</span>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
