"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Skill } from "@/lib/types";
import { getSkillDisplayName, isHotSkill, toSkillSlug, categoryToSentenceCase } from "@/lib/skillsHelpers";
import { SkillLogo } from "./SkillLogo";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const PAGE_SIZE = 50;

interface SkillsListProps {
  skills: Skill[];
  categories: string[];
  languages: string[];
  totalSkills?: number;
  categoryCounts?: Record<string, number>;
}

interface ApiSkill {
  id: string;
  name: string;
  source: string;
  installs: number;
  category?: string;
}

function apiToSkill(s: ApiSkill): Skill {
  return {
    name: s.name,
    path: s.name.toLowerCase().replace(/\s+/g, "-"),
    description: `From ${s.source} (${s.installs} installs)`,
    languages: [],
    category: s.category || "community",
    files: { skill_md: "" },
    sourceRepo: s.source,
  };
}

export function SkillsList({ skills: initialSkills, categories, languages, totalSkills = 0, categoryCounts = {} }: SkillsListProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("");
  const [allLoaded, setAllLoaded] = useState<Skill[]>(initialSkills);
  const [loadedCount, setLoadedCount] = useState(initialSkills.length);
  const [searching, setSearching] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchHasMore, setSearchHasMore] = useState(false);

  // Server-side search
  useEffect(() => {
    const q = search.trim();
    if (q.length < 2) {
      setSearchMode(false);
      setSearching(false);
      return;
    }
    setSearchMode(true);
    setSearching(true);
    const controller = new AbortController();
    const t = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(q)}&limit=${PAGE_SIZE}&offset=0`, { signal: controller.signal })
        .then((r) => (r.ok ? r.json() : { skills: [] }))
        .then((data: { skills: ApiSkill[] }) => {
          const mapped = data.skills.map(apiToSkill);
          setAllLoaded(mapped);
          setLoadedCount(mapped.length);
          setSearchHasMore(mapped.length === PAGE_SIZE);
        })
        .catch(() => {})
        .finally(() => setSearching(false));
    }, 250);
    return () => {
      controller.abort();
      clearTimeout(t);
    };
  }, [search]);

  // When search is cleared, restore initial skills
  useEffect(() => {
    if (search.trim().length < 2 && searchMode) {
      setAllLoaded(initialSkills);
      setLoadedCount(initialSkills.length);
      setSearchMode(false);
    }
  }, [search, searchMode, initialSkills]);

  const loadMore = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    try {
      const q = search.trim();
      const url = searchMode
        ? `/api/search?q=${encodeURIComponent(q)}&limit=${PAGE_SIZE}&offset=${loadedCount}`
        : `/api/search?q=&limit=${PAGE_SIZE}&offset=${loadedCount}`;
      const res = await fetch(url);
      if (!res.ok) return;
      const data: { skills: ApiSkill[] } = await res.json();
      const mapped = data.skills.map(apiToSkill);
      setAllLoaded((prev) => [...prev, ...mapped]);
      setLoadedCount((prev) => prev + mapped.length);
      if (searchMode) setSearchHasMore(mapped.length === PAGE_SIZE);
    } finally {
      setLoadingMore(false);
    }
  };

  const filtered = useMemo(() => {
    return allLoaded.filter((s) => !category || s.category === category);
  }, [allLoaded, category]);

  // Figure out if we can still load more
  const canLoadMore = searchMode
    ? searchHasMore
    : totalSkills > 0
      ? loadedCount < totalSkills
      : loadedCount % PAGE_SIZE === 0 && loadedCount > 0;

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      {/* Sidebar: Categories */}
      <aside className="w-full shrink-0 lg:w-56">
        <div className="sticky top-4">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Categories
          </h3>
          <nav className="flex flex-col gap-1">
            <button
              onClick={() => setCategory("")}
              className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                !category
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              }`}
            >
              <span>All skills</span>
              <span className="text-xs tabular-nums opacity-70">{(totalSkills || initialSkills.length).toLocaleString()}</span>
            </button>
            {categories.map((c) => {
              const count = categoryCounts[c] ?? initialSkills.filter((s) => s.category === c).length;
              const active = category === c;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(active ? "" : c)}
                  className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                  }`}
                >
                  <span className="truncate text-left">{categoryToSentenceCase(c)}</span>
                  <span className="shrink-0 text-xs tabular-nums opacity-70">{count.toLocaleString()}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="min-w-0 flex-1 space-y-4">
        {/* Search */}
        <div className="relative w-full max-w-md">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground/60">/</span>
          <Input
            type="search"
            placeholder={`Search across all ${(totalSkills ? totalSkills : initialSkills.length).toLocaleString()} skills...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-7 pr-20"
          />
          {searching && (
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground/60">
              searching…
            </span>
          )}
        </div>

        {/* Count info */}
        <div className="text-sm text-muted-foreground">
          Showing {filtered.length.toLocaleString()} of {(totalSkills || initialSkills.length).toLocaleString()} skills
        </div>

        {/* Table header */}
        <div className="flex items-center gap-4 border-b border-border px-2 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span className="w-8 text-right">#</span>
          <span className="flex-1">Skill</span>
          <span className="hidden w-40 sm:block">Source</span>
          <span className="w-20 text-right">Category</span>
        </div>

        {/* Skill rows */}
        <div className="divide-y divide-border/50">
          {filtered.map((skill, index) => (
            <Link
              key={`${skill.path}-${index}`}
              href={`/skills/${toSkillSlug(skill.path)}`}
              className="group flex items-center gap-4 px-2 py-3 transition-colors duration-150 hover:bg-muted/30"
            >
              <span className="w-8 shrink-0 text-right font-mono text-sm text-muted-foreground/60">
                {index + 1}
              </span>
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <SkillLogo skillPath={skill.path} className="shrink-0" />
                <span className="truncate font-medium text-foreground group-hover:text-primary transition-colors">
                  {getSkillDisplayName(skill.path)}
                </span>
                {isHotSkill(skill.path) && (
                  <Badge variant="secondary" className="bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/30 text-[10px] px-1.5 py-0">
                    Hot
                  </Badge>
                )}
              </div>
              <span className="hidden w-40 shrink-0 truncate text-sm text-muted-foreground sm:block">
                {skill.sourceRepo || "harishrajora/skills"}
              </span>
              <span className="w-20 shrink-0 text-right text-xs text-muted-foreground">
                {categoryToSentenceCase(skill.category)}
              </span>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && !searching && (
          <p className="py-12 text-center text-muted-foreground">
            No skills found matching your search.
          </p>
        )}

        {/* Load more */}
        {canLoadMore && filtered.length > 0 && (
          <div className="flex justify-center pt-6">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="rounded-md border border-border bg-muted/30 px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/60 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? "Loading…" : "Load more"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
