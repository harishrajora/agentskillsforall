"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Skill } from "@/lib/types";
import { getSkillDisplayName, isHotSkill, toSkillSlug, categoryToSentenceCase } from "@/lib/skillsHelpers";
import { SkillLogo } from "./SkillLogo";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const ALL_OPTION_VALUE = "__all__";

interface SkillsListProps {
  skills: Skill[];
  categories: string[];
  languages: string[];
}

export function SkillsList({ skills, categories, languages }: SkillsListProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("");

  const filtered = useMemo(() => {
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

  return (
    <div className="space-y-4">
      {/* Search + filter row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
              !category
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({skills.length})
          </button>
          {categories.map((c) => {
            const count = skills.filter((s) => s.category === c).length;
            return (
              <button
                key={c}
                onClick={() => setCategory(category === c ? "" : c)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                  category === c
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {categoryToSentenceCase(c)} ({count})
              </button>
            );
          })}
        </div>
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
            key={skill.path}
            href={`/skills/${toSkillSlug(skill.path)}`}
            className="group flex items-center gap-4 px-2 py-3 transition-colors duration-150 hover:bg-muted/30"
          >
            {/* Rank */}
            <span className="w-8 shrink-0 text-right font-mono text-sm text-muted-foreground/60">
              {index + 1}
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
    </div>
  );
}
