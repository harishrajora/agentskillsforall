import type { Skill, SkillsIndex } from "./types";
import { parseSkillDescription } from "./parseDescription";
import { parseMarkdownSections, takeSections } from "./parseSkillMarkdown";
import { sortSkillsWithHotFirst, toSkillSlug } from "./skillsHelpers";
import { getSkillsIndexFromFs, getSkillMarkdownFromFs, getOverviewMarkdownFromFs, getExistingOptionalDocTypes } from "./skillsFs";

export { getSkillDisplayName, isHotSkill, toSkillSlug } from "./skillsHelpers";

export async function getSkillsIndex(): Promise<SkillsIndex> {
  return getSkillsIndexFromFs();
}

async function fetchInstalledSkills(): Promise<Skill[]> {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${base}/api/search?q=&limit=100`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as { skills: Array<{ id: string; name: string; source: string; installs: number }> };
    return data.skills.map((s) => ({
      name: s.name,
      path: s.name.toLowerCase().replace(/\s+/g, "-"),
      description: `Installed from ${s.source} (${s.installs} install${s.installs !== 1 ? "s" : ""})`,
      languages: [],
      category: "community",
      files: { skill_md: "" },
      sourceRepo: s.source,
    }));
  } catch {
    return [];
  }
}

export async function getSkills(): Promise<Skill[]> {
  const index = await getSkillsIndex();
  const allSkills = [...index.skills];

  // Merge in skills discovered via CLI telemetry (npx agentskillshub-cli add)
  const installedSkills = await fetchInstalledSkills();
  const existingPaths = new Set(allSkills.map((s) => s.path));

  for (const installed of installedSkills) {
    if (existingPaths.has(installed.path)) continue;
    allSkills.push(installed);
    existingPaths.add(installed.path);
  }

  // Sort: hot skills first (in order), then everything else alphabetically
  return sortSkillsWithHotFirst(allSkills);
}

export async function getSkillByPath(path: string): Promise<Skill | null> {
  const skills = await getSkills();
  return skills.find((s) => s.path === path) ?? null;
}

export async function getSkillBySlug(slug: string): Promise<Skill | null> {
  const byPath = await getSkillByPath(slug);
  if (byPath) return byPath;
  const skills = await getSkills();
  return skills.find((s) => toSkillSlug(s.path) === slug) ?? null;
}

export async function getCategories(): Promise<string[]> {
  const index = await getSkillsIndex();
  return index.categories ?? [];
}

export async function getLanguages(): Promise<string[]> {
  const skills = await getSkills();
  const set = new Set<string>();
  for (const s of skills) {
    for (const lang of s.languages ?? []) set.add(lang);
  }
  return Array.from(set).sort();
}

/**
 * Fetch a SKILL.md from GitHub for community-installed skills.
 * Tries common paths: SKILL.md, <skillName>/SKILL.md, skills/<skillName>/SKILL.md
 */
async function fetchSkillMdFromGitHub(sourceRepo: string, skillName: string): Promise<string | null> {
  const paths = [
    `${skillName}/SKILL.md`,
    "SKILL.md",
    `skills/${skillName}/SKILL.md`,
  ];
  for (const p of paths) {
    try {
      const url = `https://raw.githubusercontent.com/${sourceRepo}/HEAD/${p}`;
      const res = await fetch(url, { next: { revalidate: 300 } });
      if (res.ok) {
        const raw = await res.text();
        // Strip frontmatter
        const match = raw.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
        return match ? match[1].trim() : raw;
      }
    } catch {
      continue;
    }
  }
  return null;
}

/** Fetch README.md from GitHub as fallback documentation. */
async function fetchReadmeFromGitHub(sourceRepo: string): Promise<string | null> {
  try {
    const url = `https://raw.githubusercontent.com/${sourceRepo}/HEAD/README.md`;
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (res.ok) return await res.text();
  } catch {
    // ignore
  }
  return null;
}

export async function getSkillMarkdown(
  slug: string,
  docType: "skill" | "playbook" | "advanced-patterns" | "cloud-integration"
): Promise<string | null> {
  const skill = await getSkillBySlug(slug);
  if (!skill) return null;

  // Try local filesystem first
  const local = await getSkillMarkdownFromFs(skill.path, docType);
  if (local) return local;

  // For community skills, fetch from GitHub
  if (skill.sourceRepo && docType === "skill") {
    const fromGh = await fetchSkillMdFromGitHub(skill.sourceRepo, skill.path);
    if (fromGh) return fromGh;
    // Fallback to README.md
    return fetchReadmeFromGitHub(skill.sourceRepo);
  }

  return null;
}

export async function getSkillOverviewMarkdown(slug: string): Promise<string | null> {
  const skill = await getSkillBySlug(slug);
  if (!skill) return null;

  const local = await getOverviewMarkdownFromFs(skill.path);
  if (local) return local;

  // For community skills, use SKILL.md as overview
  if (skill.sourceRepo) {
    return fetchSkillMdFromGitHub(skill.sourceRepo, skill.path);
  }

  return null;
}

export async function getAvailableDocTypes(
  skill: Skill
): Promise<("skill" | "playbook" | "advanced-patterns" | "cloud-integration")[]> {
  const optional = await getExistingOptionalDocTypes(skill.path);
  if (optional.length > 0 || !skill.sourceRepo) {
    return ["skill", ...optional];
  }
  // Community skills: always show at least the skill (documentation) tab
  return ["skill"];
}

import { getLambdaTestSkillName } from "./skillsMapping";

const GITHUB_REPO = "https://github.com/harishrajora/skills.git";
const GITHUB_REPO_BROWSE = "https://github.com/harishrajora/skills";

export { getLambdaTestSkillName } from "./skillsMapping";

export function getGitHubSkillUrl(path: string, sourceRepo?: string): string {
  if (sourceRepo) {
    return `https://github.com/${sourceRepo}`;
  }
  const skillName = getLambdaTestSkillName(path);
  return `${GITHUB_REPO_BROWSE}/tree/main/${skillName}`;
}

export function getSkillInstallCommand(skillPath: string, sourceRepo?: string): string {
  if (sourceRepo) {
    return `npx agentskillshub-cli add https://github.com/${sourceRepo} --skill ${skillPath}`;
  }
  const skillName = getLambdaTestSkillName(skillPath);
  return `npx agentskillshub-cli add ${GITHUB_REPO} --skill ${skillName}`;
}

function extractFirstUrl(text: string): string | null {
  const match = text.match(/https?:\/\/[^\s)\]">]+/);
  return match ? match[0] : null;
}

export function stripOverviewOneLiner(markdown: string): string {
  return markdown.replace(/\*\*One-liner:\*\*[^\n]*\n?/g, "").replace(/\n{3,}/g, "\n\n").trim();
}

export function stripOverviewUrlBlock(markdown: string, url: string): string {
  const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const sameLine = new RegExp(`\\*\\*URL:\\*\\*[^\\n]*${escaped}[^\\n]*\\n?`, "g");
  let out = markdown.replace(sameLine, "");
  const nextLine = new RegExp(`\\*\\*URL:\\*\\*\\s*\\n\\s*[^\\n]*${escaped}[^\\n]*\\n?`, "g");
  out = out.replace(nextLine, "");
  const urlOnlyLine = new RegExp(`^\\s*[^\\n]*${escaped}[^\\n]*\\s*\\n?`, "gm");
  out = out.replace(urlOnlyLine, "");
  return out.replace(/\n{3,}/g, "\n\n").trim();
}

export interface SkillReadmeSections {
  overview: { whatItDoes: string; whenToUse: string[]; triggers: string[] };
  overviewMarkdown: string | null;
  overviewUrl: string;
  howToUse: string | null;
  samples: { title: string; content: string }[];
  advancedSamples: string | null;
  fullSkillMd: string;
  hasPlaybook: boolean;
  hasAdvanced: boolean;
  hasCloud: boolean;
}

const SAMPLE_SECTIONS_COUNT = 4;

export async function getSkillReadmeSections(slug: string): Promise<SkillReadmeSections | null> {
  const skill = await getSkillBySlug(slug);
  if (!skill) return null;

  const [skillMd, playbookMd, advancedMd, overviewMd] = await Promise.all([
    getSkillMarkdown(slug, "skill"),
    getSkillMarkdown(slug, "playbook").catch(() => null),
    getSkillMarkdown(slug, "advanced-patterns").catch(() => null),
    getOverviewMarkdownFromFs(skill.path).catch(() => null),
  ]);

  const overview = parseSkillDescription(skill.description);
  const docTypes = await getAvailableDocTypes(skill);
  const hasPlaybook = docTypes.includes("playbook");
  const hasAdvanced = docTypes.includes("advanced-patterns");
  const hasCloud = docTypes.includes("cloud-integration");

  let howToUse: string | null = null;
  if (skillMd) {
    const skillSections = parseMarkdownSections(skillMd);
    const intro = skillSections.find((s) => s.title === "Introduction");
    const first = skillSections[0];
    howToUse = intro?.content ?? (first ? `${first.content.slice(0, 2000)}${first.content.length > 2000 ? "\u2026" : ""}` : null);
  }

  let samples: { title: string; content: string }[] = [];
  if (playbookMd) {
    const playbookSections = parseMarkdownSections(playbookMd);
    const firstSections = takeSections(playbookSections, SAMPLE_SECTIONS_COUNT, 200);
    samples = firstSections.map((s) => ({ title: s.title, content: s.content }));
  }

  const overviewUrl = (overviewMd ? extractFirstUrl(overviewMd) : null) ?? getGitHubSkillUrl(skill.path);

  return {
    overview,
    overviewMarkdown: overviewMd ?? null,
    overviewUrl,
    howToUse,
    samples,
    advancedSamples: advancedMd ?? null,
    fullSkillMd: skillMd ?? "",
    hasPlaybook,
    hasAdvanced,
    hasCloud,
  };
}

export async function getSkillOverviewUrl(slug: string): Promise<string> {
  const skill = await getSkillBySlug(slug);
  if (!skill) return getGitHubSkillUrl(slug);
  const overviewMd = await getOverviewMarkdownFromFs(skill.path).catch(() => null);
  return (overviewMd ? extractFirstUrl(overviewMd) : null) ?? getGitHubSkillUrl(skill.path);
}
