import { cn } from "@/lib/cn";

export function Crosshair({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={cn("h-6 w-6", className)}
      aria-hidden
    >
      <circle cx="32" cy="32" r="22" />
      <line x1="32" y1="2" x2="32" y2="20" />
      <line x1="32" y1="44" x2="32" y2="62" />
      <line x1="2" y1="32" x2="20" y2="32" />
      <line x1="44" y1="32" x2="62" y2="32" />
      <circle cx="32" cy="32" r="2" fill="currentColor" />
    </svg>
  );
}
