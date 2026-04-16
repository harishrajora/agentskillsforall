import type { Skill } from "./types";

const SKILL_DISPLAY_NAME_OVERRIDES: Record<string, string> = {
  "cicd-pipeline-skill": "CI/CD Pipeline Skill",
  "junit-testing-skill": "JUnit 5 Skill",
  "pytest-testing-skill": "pytest Skill",
  "webdriverio-automation-skill": "WebdriverIO Skill",
  "nightwatchjs-automation-skill": "Nightwatch.js Skill",
  "xcuitest-automation-skill": "XCUITest Skill",
  "testcafe-automation-skill": "TestCafe Skill",
  "xunit-testing-skill": "xUnit Skill",
  "mstest-testing-skill": "MSTest Skill",
  "phpunit-testing-skill": "PHPUnit Skill",
  "nemojs-automation-skill": "Nemo.js Skill",
  "serenity-bdd-skill": "Serenity BDD Skill",
  "smartui-testing-skill": "SmartUI Skill",
  "specflow-automation-skill": "SpecFlow Skill",
  "testunit-ruby-skill": "Test::Unit Skill",
  "unittest-testing-skill": "unittest Skill",
  "hyperexecute-skill": "HyperExecute Skill",
};

export function getSkillDisplayName(pathOrName: string): string {
  const override = SKILL_DISPLAY_NAME_OVERRIDES[pathOrName];
  if (override) return override;
  const base = pathOrName
    .replace(/-automation-skill$/i, "")
    .replace(/-testing-skill$/i, "")
    .replace(/-skill$/i, "");
  const title = base.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return title ? `${title} Skill` : pathOrName;
}

const HOT_SKILL_PATHS = [
  "selenium-automation-skill",
  "playwright-automation-skill",
  "appium-automation-skill",
  "test-framework-migration-skill",
] as const;

export function isHotSkill(skillPath: string): boolean {
  return HOT_SKILL_PATHS.includes(skillPath as (typeof HOT_SKILL_PATHS)[number]);
}

export function categoryToSentenceCase(value: string): string {
  if (!value) return value;
  const withSpaces = value.replace(/-/g, " ");
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).toLowerCase();
}

export function toSkillSlug(path: string): string {
  return path
    .replace(/-automation-skill$/i, "-skill")
    .replace(/-testing-skill$/i, "-skill");
}

export function sortSkillsWithHotFirst(skills: Skill[]): Skill[] {
  const order = new Map<string, number>(HOT_SKILL_PATHS.map((p, i) => [p, i]));
  return [...skills].sort((a, b) => {
    const aHot = order.get(a.path);
    const bHot = order.get(b.path);
    if (aHot !== undefined && bHot !== undefined) return aHot - bHot;
    if (aHot !== undefined) return -1;
    if (bHot !== undefined) return 1;
    return getSkillDisplayName(a.path).localeCompare(getSkillDisplayName(b.path));
  });
}
