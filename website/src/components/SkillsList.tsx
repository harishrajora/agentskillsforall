"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Skill } from "@/lib/types";
import { getSkillDisplayName, isHotSkill, toSkillSlug, categoryToSentenceCase } from "@/lib/skillsHelpers";
import { SkillLogo } from "./SkillLogo";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 50;

interface SkillsListProps {
  skills: Skill[];
  categories: string[];
  languages: string[];
}

export function SkillsList({ skills, categories, languages }: SkillsListProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    setPage(1);
    return skills.filter((s) => {
      const matchSearch =
        !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()) ||
        getSkillDisplayName(s.path).toLowerCase().includes(search.toLowerCase());
      const matchCategory = !category || s.category === category;
      return matchSearch && matchCategory;
    });
  }, [skills, search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const startIndex = (page - 1) * PAGE_SIZE;
  const paged = filtered.slice(startIndex, startIndex + PAGE_SIZE);

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
              <span className="text-xs tabular-nums opacity-70">{skills.length}</span>
            </button>
            {categories.map((c) => {
              const count = skills.filter((s) => s.category === c).length;
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
                  <span className="shrink-0 text-xs tabular-nums opacity-70">{count}</span>
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
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-7"
          />
        </div>

        {/* Results count + pagination info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing {filtered.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, filtered.length)} of {filtered.length} skill{filtered.length !== 1 ? "s" : ""}
          </span>
          {totalPages > 1 && (
            <span>Page {page} of {totalPages}</span>
          )}
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
          {paged.map((skill, index) => (
            <Link
              key={skill.path}
              href={`/skills/${toSkillSlug(skill.path)}`}
              className="group flex items-center gap-4 px-2 py-3 transition-colors duration-150 hover:bg-muted/30"
            >
              <span className="w-8 shrink-0 text-right font-mono text-sm text-muted-foreground/60">
                {startIndex + index + 1}
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

        {filtered.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">
            No skills found matching your search.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4 border-t border-border">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              <ChevronLeft className="size-4" />
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  p === page
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              Next
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
