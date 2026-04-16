import "server-only";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import type { SkillsIndex } from "./types";

const SKILLS_DIR = path.join(process.cwd(), "skills");

let cachedIndex: SkillsIndex | null = null;

export async function getSkillsIndexFromFs(): Promise<SkillsIndex> {
  if (cachedIndex) return cachedIndex;
  const indexPath = path.join(SKILLS_DIR, "index.json");
  const raw = await fs.readFile(indexPath, "utf-8");
  cachedIndex = JSON.parse(raw) as SkillsIndex;
  return cachedIndex;
}

const DOC_TYPE_TO_FILENAME: Record<"playbook" | "advanced-patterns" | "cloud-integration", string> = {
  playbook: "playbook.md",
  "advanced-patterns": "advanced-patterns.md",
  "cloud-integration": "cloud-integration.md",
};

const OPTIONAL_DOC_TYPES = ["playbook", "advanced-patterns", "cloud-integration"] as const;

export async function getExistingOptionalDocTypes(
  skillPath: string
): Promise<("playbook" | "advanced-patterns" | "cloud-integration")[]> {
  const dir = path.join(SKILLS_DIR, skillPath);
  const existing: ("playbook" | "advanced-patterns" | "cloud-integration")[] = [];
  for (const docType of OPTIONAL_DOC_TYPES) {
    const filePath = path.join(dir, DOC_TYPE_TO_FILENAME[docType]);
    try {
      await fs.access(filePath);
      existing.push(docType);
    } catch {
      // file not present
    }
  }
  return existing;
}

export async function getSkillMarkdownFromFs(
  skillPath: string,
  docType: "skill" | "playbook" | "advanced-patterns" | "cloud-integration"
): Promise<string | null> {
  let filePath: string;
  if (docType === "skill") {
    filePath = path.join(SKILLS_DIR, skillPath, "SKILL.md");
  } else {
    const filename = DOC_TYPE_TO_FILENAME[docType];
    filePath = path.join(SKILLS_DIR, skillPath, filename);
  }
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    if (docType === "skill") {
      const parsed = matter(raw);
      return parsed.content;
    }
    return raw;
  } catch {
    return null;
  }
}

export async function getOverviewMarkdownFromFs(skillPath: string): Promise<string | null> {
  const filePath = path.join(SKILLS_DIR, skillPath, "overview.md");
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}
