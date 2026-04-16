**One-liner:** CI/CD pipeline configurations for test automation across GitHub Actions, Jenkins, GitLab CI, and Azure DevOps with TestMu AI cloud integration, caching, and quality gates.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/cicd-pipeline-skill

**When to Apply:**
Reference when setting up automated test execution in CI/CD pipelines, configuring GitHub Actions workflows for test automation, integrating Jenkins/GitLab CI with cloud testing, or implementing quality gates and notifications. Triggers on "CI/CD", "pipeline", "GitHub Actions", "Jenkins", "GitLab CI", "Azure DevOps".

**Rule Categories by Priority:**

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Pipeline Configuration | CRITICAL | pipeline- |
| 2 | Secrets Management | CRITICAL | secrets- |
| 3 | Caching & Speed | HIGH | cache- |
| 4 | Parallel Execution | HIGH | parallel- |
| 5 | Quality Gates | MEDIUM | gate- |
| 6 | Reporting & Notifications | MEDIUM | report- |
| 7 | Docker Services | LOW-MEDIUM | docker- |

**Quick Reference:**

1. **Pipeline Configuration (CRITICAL)**
   - pipeline-github-actions — Use actions/checkout@v4, actions/setup-node@v4, artifact upload
   - pipeline-jenkins — Jenkinsfile with parallel stages (unit + E2E + cloud)
   - pipeline-gitlab — .gitlab-ci.yml with parallel matrix and JUnit reports
   - pipeline-azure — azure-pipelines.yml with variable groups

2. **Secrets Management (CRITICAL)**
   - secrets-github — Store LT_USERNAME/LT_ACCESS_KEY in Settings → Secrets
   - secrets-jenkins — Use credentials store with credentials() binding
   - secrets-gitlab — Store in Settings → CI/CD → Variables

3. **Quality Gates (MEDIUM)**
   - gate-coverage — Enforce minimum code coverage thresholds
   - gate-test-results — Fail pipeline on test failures
   - gate-artifact-upload — Always upload test results as artifacts (if: always())

**Playbook Deep Dive (10 sections):**
§1 GitHub Actions — Production Workflows · §2 Caching & Optimization · §3 GitLab CI — Production Pipeline · §4 Jenkins Pipeline · §5 Quality Gates & Checks · §6 Secrets & Environment Management · §7 Docker Compose for Test Services · §8 Notification & Reporting · §9 Debugging Table · §10 Best Practices


The agent loads from 1 on-demand reference files (`playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---

## Shared Infrastructure

### TestMu AI Cloud Reference
**URL:** https://github.com/LambdaTest/agent-skills/tree/main/shared

Universal cloud reference shared across all 46 skills covering authentication, WebSocket/Hub endpoints, desktop browsers (Chrome, Edge, Firefox, Safari, pw-chromium, pw-firefox, pw-webkit), desktop platforms (Windows 11/10, macOS Sequoia through Catalina), Android devices (Pixel 8/7/6/5, Galaxy S24/S23/S22, OnePlus 11/10 Pro + 100 more), iOS devices (iPhone 16/15/14, iPad Pro/Air), LT:Options capability reference, test status reporting in 5 languages, Lambda Tunnel for localhost, geo-location testing (50+ countries), and network/video capture.

### Evaluation Test Cases
**URL:** https://github.com/LambdaTest/agent-skills/tree/main/evals

Each skill has eval JSON files with test cases defining queries, expected behaviors, and categories (basic-generation, cloud-routing, language-detection, pom-structure, mobile, debugging, negative-trigger, scaffold).

### Validation & Scripts
**URL:** https://github.com/LambdaTest/agent-skills/tree/main/scripts

`validate_skills.py` validates all skills against quality standards (YAML frontmatter, line counts, reference files, categories).

---

## How to Use

### Install a Single Skill
```bash
git clone https://github.com/LambdaTest/agent-skills.git
cp -r agent-skills/playwright-skill .claude/skills/
```

### Install All Skills
```bash
# Claude Code
git clone https://github.com/LambdaTest/agent-skills.git .claude/skills/agent-skills

# Cursor
git clone https://github.com/LambdaTest/agent-skills.git .cursor/skills/agent-skills

# Gemini CLI
git clone https://github.com/LambdaTest/agent-skills.git .gemini/skills/agent-skills
```

### Read Individual Skill Files
Each skill directory contains:
- `SKILL.md` — Core instructions with decision trees and quick patterns
- `reference/playbook.md` — Complete implementation guide with all code examples
- `reference/advanced-patterns.md` — Advanced topics and edge cases
- `reference/cloud-integration.md` — TestMu AI cloud-specific patterns (for E2E/mobile skills)

### Validate Skills
```bash
python3 scripts/validate_skills.py
```
