"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Skill } from "@/lib/types";
import { getSkillDisplayName, isHotSkill, toSkillSlug, categoryToSentenceCase } from "@/lib/skillsHelpers";
import { SkillLogo } from "./SkillLogo";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ALL_CATEGORIES = "__all__";

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
    <div className="space-y-4">
      {/* Search + filter row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
        <Select
          value={category || ALL_CATEGORIES}
          onValueChange={(v) => setCategory(v === ALL_CATEGORIES ? "" : v)}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_CATEGORIES}>All categories ({skills.length})</SelectItem>
            {categories.map((c) => {
              const count = skills.filter((s) => s.category === c).length;
              return (
                <SelectItem key={c} value={c}>
                  {categoryToSentenceCase(c)} ({count})
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Results count + pagination info */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, filtered.length)} of {filtered.length} skill{filtered.length !== 1 ? "s" : ""}
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
            {/* Rank */}
            <span className="w-8 shrink-0 text-right font-mono text-sm text-muted-foreground/60">
              {startIndex + index + 1}
            </span>

            {/* Logo + Name */}
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

            {/* Source */}
            <span className="hidden w-40 shrink-0 truncate text-sm text-muted-foreground sm:block">
              {skill.sourceRepo || "harishrajora/skills"}
            </span>

            {/* Category */}
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

      {/* Pagination controls */}
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
  );
}
