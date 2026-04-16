"use client";

import { useEffect, useState } from "react";
import { Star, GitFork } from "lucide-react";

interface RepoStats {
  stars: number;
  forks: number;
}

export function GitHubStatsInline({ repo }: { repo: string }) {
  const [stats, setStats] = useState<RepoStats | null>(null);

  useEffect(() => {
    if (!repo) return;
    fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github.v3+json" },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setStats({ stars: data.stargazers_count ?? 0, forks: data.forks_count ?? 0 });
        }
      })
      .catch(() => setStats(null));
  }, [repo]);

  if (!stats) return null;

  const format = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n > 0 ? `${n}` : "0";

  return (
    <span className="inline-flex items-center gap-3 text-sm text-muted-foreground">
      <span className="inline-flex items-center gap-1">
        <Star className="size-3.5" />
        {format(stats.stars)}
      </span>
      <span className="inline-flex items-center gap-1">
        <GitFork className="size-3.5" />
        {format(stats.forks)}
      </span>
    </span>
  );
}
