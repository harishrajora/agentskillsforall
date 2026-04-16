export const AGENT_PATHS: { id: string; name: string; path: string }[] = [
  { id: "cursor", name: "Cursor", path: ".cursor/skills" },
  { id: "claude", name: "Claude Code", path: ".claude/skills" },
  { id: "copilot", name: "GitHub Copilot", path: ".github/skills" },
  { id: "gemini", name: "Gemini CLI", path: ".gemini/skills" },
  { id: "codex", name: "Codex", path: ".codex/skills" },
];

import { getLambdaTestSkillName } from "./skillsMapping";

const REPO = "https://github.com/harishrajora/skills.git";
const CLONE_FOLDER = "skills";

export function getSingleSkillCommands(skillPath: string): Record<string, string> {
  const lambdaTestName = getLambdaTestSkillName(skillPath);
  const out: Record<string, string> = {};
  for (const a of AGENT_PATHS) {
    out[a.id] = `git clone ${REPO}\ncp -r ${CLONE_FOLDER}/${lambdaTestName} ${a.path}/`;
  }
  return out;
}

export function getAllSkillsCommands(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const a of AGENT_PATHS) {
    out[a.id] = `git clone ${REPO} ${a.path}/${CLONE_FOLDER}`;
  }
  return out;
}
