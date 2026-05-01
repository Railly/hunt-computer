"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type RevealProps = {
  children: React.ReactNode;
  /** CSS selector for items to stagger inside this Reveal. Default: direct children. */
  selector?: string;
  /** Stagger between items (seconds). Default 0.08. */
  stagger?: number;
  /** Initial Y offset (px). Default 24. */
  y?: number;
  /** Tween duration (seconds). Default 0.7. */
  duration?: number;
  /** Delay before first item (seconds). Default 0. */
  delay?: number;
  /** start string for ScrollTrigger. Default "top 85%". */
  start?: string;
  /** Wrapper className passthrough. */
  className?: string;
  as?: "div" | "section" | "article" | "ul" | "ol";
};

export function Reveal({
  children,
  selector,
  stagger = 0.08,
  y = 24,
  duration = 0.7,
  delay = 0,
  start = "top 85%",
  className,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const targets = selector
        ? root.querySelectorAll(selector)
        : Array.from(root.children);
      if (targets.length === 0) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          isMotion: "(prefers-reduced-motion: no-preference)",
          isReduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { isReduced } = ctx.conditions ?? {};
          if (isReduced) {
            gsap.set(targets, { autoAlpha: 1, y: 0 });
            return;
          }

          gsap.set(targets, { autoAlpha: 0, y });
          gsap.to(targets, {
            autoAlpha: 1,
            y: 0,
            duration,
            stagger,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root,
              start,
              once: true,
            },
          });
        }
      );
    },
    { scope: ref, dependencies: [] }
  );

  const Tag = as;
  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
