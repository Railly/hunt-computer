import { Arrow } from "./arrow";
import { Crosshair } from "./crosshair";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative border-y border-hairline bg-hunt py-20 text-bone sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
        <div className="mb-12 flex items-start justify-between">
          <span className="caption text-bone/70">SECTION.05</span>
          <Crosshair className="h-10 w-10 text-bone" />
        </div>
        <h2 className="display max-w-4xl text-[clamp(48px,7vw,112px)]">
          Let's build
          <br />
          something rare.
        </h2>
        <p className="mt-8 max-w-xl text-base text-bone/80">
          Available for a small number of partnerships, audits, and bespoke builds. If you have
          something that requires precision, send me a note.
        </p>
        <a
          href="mailto:hello@hunt.computer"
          className="mt-12 inline-flex items-center gap-2 border border-bone px-6 py-3 text-sm transition-colors hover:bg-bone hover:text-hunt"
        >
          HELLO@HUNT.COMPUTER <Arrow direction="e" />
        </a>
      </div>
    </section>
  );
}
