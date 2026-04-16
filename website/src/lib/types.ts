export interface SkillFiles {
  skill_md: string;
  reference?: string[];
}

export interface Skill {
  name: string;
  path: string;
  description: string;
  languages?: string[];
  category: string;
  files: SkillFiles;
  /** GitHub source repo (e.g. "vercel-labs/agent-browser") — set for community-installed skills */
  sourceRepo?: string;
}

export interface SkillsIndex {
  version?: string;
  name: string;
  description: string;
  repository: string;
  total_skills: number;
  categories: string[];
  skills: Skill[];
}

export type DocType = "skill" | "documentation" | "playbook" | "advanced-patterns" | "cloud-integration";

export const DOC_TYPE_LABELS: Record<DocType, string> = {
  skill: "Overview",
  documentation: "Documentation",
  playbook: "Playbook",
  "advanced-patterns": "Advanced patterns",
  "cloud-integration": "Cloud integration",
};
