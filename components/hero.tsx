"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Arrow } from "./arrow";
import { Crosshair } from "./crosshair";
import { HeroTerminal } from "./hero-terminal";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          isMotion: "(prefers-reduced-motion: no-preference)",
          isReduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { isReduced } = ctx.conditions ?? {};
          if (isReduced) return;
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.from(".hero-meta > *", {
            autoAlpha: 0,
            y: -8,
            duration: 0.6,
            stagger: 0.05,
          })
            .from(
              ".hero-wordmark span",
              {
                autoAlpha: 0,
                y: 40,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out",
              },
              "-=0.2"
            )
            .from(
              ".hero-foot > *",
              {
                autoAlpha: 0,
                y: 16,
                duration: 0.6,
                stagger: 0.08,
              },
              "-=0.4"
            );
        }
      );
    },
    { scope: root, dependencies: [] }
  );

  return (
    <section
      ref={root}
      className="relative mx-auto flex h-[calc(100vh-3rem)] min-h-[640px] max-w-[1400px] flex-col justify-between border-b border-hairline px-5 pb-6 pt-6 sm:px-6 sm:pb-8 sm:pt-8 lg:pb-10 lg:pt-10"
    >
      <div className="hero-meta grid grid-cols-2 items-start gap-x-4 gap-y-2 md:grid-cols-4">
        <span className="caption">A WORKSHOP / NOT A STUDIO</span>
        <span className="caption hidden md:block">LAT -12.05 / LON -77.05</span>
        <span className="caption hidden md:block">LIMA, PERÚ</span>
        <span className="caption text-right">EST.MMXXVI</span>
      </div>

      <h1 className="hero-wordmark display flex items-baseline overflow-hidden py-2 leading-[0.85] text-ink sm:py-4">
        <span className="text-[clamp(80px,20vw,320px)]">HUNT</span>
        <span className="text-[clamp(16px,3.2vw,52px)] text-ink-muted">.computer</span>
      </h1>

      <div className="hero-foot grid w-full min-w-0 items-end gap-6 lg:grid-cols-[1fr_2fr] lg:gap-10">
        <div className="min-w-0">
          <p className="max-w-full font-sans text-sm leading-relaxed text-ink-muted sm:max-w-md sm:text-[15px]">
            One operator. One machine. Software hunted by hand. Built in private, shipped in
            public, from Lima, Perú.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="caption flex items-center gap-2">
              <Crosshair className="h-3 w-3 text-hunt" />
              06.RELEASES
            </span>
            <span className="caption text-ink-muted">·</span>
            <span className="caption flex items-center gap-1">SCROLL <Arrow direction="s" /></span>
          </div>
        </div>

        <div className="min-w-0 overflow-hidden bg-ink p-4 text-bone sm:p-5 lg:p-6">
          <HeroTerminal />
        </div>
      </div>
    </section>
  );
}
