import { cn } from "@/lib/cn";

type Direction = "ne" | "se" | "sw" | "nw" | "n" | "s" | "e" | "w";

const rotations: Record<Direction, number> = {
  e: 0,
  se: 45,
  s: 90,
  sw: 135,
  w: 180,
  nw: 225,
  n: 270,
  ne: 315,
};

export function Arrow({
  direction = "ne",
  className,
}: {
  direction?: Direction;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={cn("inline-block h-[0.85em] w-[0.85em] align-baseline", className)}
      style={{ transform: `rotate(${rotations[direction]}deg)` }}
      aria-hidden
    >
      <line x1="1" y1="6" x2="11" y2="6" />
      <polyline points="6,1 11,6 6,11" />
    </svg>
  );
}
