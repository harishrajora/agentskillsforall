"use client";

import { useEffect, useState } from "react";
import { Star, GitFork } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GitHubRepoStats } from "@/lib/github";

const DURATION_MS = 1000;
const TICK_MS = 36;

function useAnimatedValue(target: number, enabled: boolean): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!enabled || target <= 0) {
      setValue(target);
      return;
    }
    setValue(0);
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const t = Math.min(1, elapsed / DURATION_MS);
      const easeOut = 1 - (1 - t) * (1 - t);
      setValue(Math.round(easeOut * target));
      if (t >= 1) clearInterval(timer);
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [target, enabled]);
  return value;
}

interface NavbarGitHubStatsProps {
  /** When true (hero at scroll 0), use white text to match flush navbar */
  flushed?: boolean;
}

export function NavbarGitHubStats({ flushed = false }: NavbarGitHubStatsProps) {
  const [stats, setStats] = useState<GitHubRepoStats | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/api/github-stats")
      .then((r) => r.ok ? r.json() : null)
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  const stars = useAnimatedValue(stats?.stars ?? 0, mounted && stats !== null);
  const forks = useAnimatedValue(stats?.forks ?? 0, mounted && stats !== null);
  const repoUrl = stats?.repoUrl ?? "https://github.com/harishrajora/skills";

  const format = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n > 0 ? `${n}+` : "0");

  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View GitHub repository and star"
      className={cn(
        "inline-flex h-9 items-center gap-0 overflow-hidden rounded-md border bg-background text-xs font-normal leading-none shadow-sm backdrop-blur-md transition-colors",
        "border-border hover:border-primary/30 hover:bg-muted/50",
        flushed && "border-white/25 bg-white/10 text-white hover:border-white/40 hover:bg-white/15"
      )}
    >
      <span
        className={cn(
          "flex h-full shrink-0 items-center justify-center rounded-l-md border-r pl-1.5 pr-1.5",
          flushed ? "border-white/25 bg-black/20 text-white" : "border-border bg-muted/50 text-foreground"
        )}
      >
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" className="size-4 shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>
      </span>
      <span
        className={cn(
          "flex h-full items-center gap-1 px-2 pl-2.5 text-sm font-normal tabular-nums",
          flushed ? "text-white" : "text-foreground"
        )}
      >
        {format(stars)}
        <Star className={cn("size-3.5 shrink-0", flushed ? "text-white" : "text-foreground")} aria-hidden />
      </span>
      <span
        className={cn(
          "flex h-full items-center gap-1 rounded-r-md border-l px-2 pr-2.5 text-sm font-normal tabular-nums",
          flushed ? "border-white/25 text-white" : "border-border text-foreground"
        )}
      >
        {format(forks)}
        <GitFork className={cn("size-3.5 shrink-0", flushed ? "text-white" : "text-foreground")} aria-hidden />
      </span>
    </a>
  );
}
