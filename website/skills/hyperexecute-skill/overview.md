**One-liner:** Blazing-fast test orchestration on TestMu AI cloud via YAML configuration — framework-agnostic, supports AutoSplit, Matrix, and Hybrid execution modes with 10x faster parallel runs.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/hyperexecute-skill

**When to Apply:**
Reference when orchestrating test execution at scale on cloud infrastructure, configuring parallel test distribution across machines, or needing framework-agnostic cloud execution (works with any test framework). Triggers on "HyperExecute", "hyperexecute.yaml", "test orchestration", "fast parallel tests".

**Rule Categories by Priority:**

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Execution Mode | CRITICAL | mode- |
| 2 | Test Discovery | CRITICAL | discovery- |
| 3 | Concurrency | HIGH | concurrency- |
| 4 | Pre/Post Hooks | HIGH | hook- |
| 5 | Retry Strategy | MEDIUM | retry- |
| 6 | CI/CD Integration | MEDIUM | ci- |

**Quick Reference:**

1. **Execution Mode (CRITICAL)**
   - mode-autosplit — Use autosplit: true with dynamic discovery for intelligent parallelism
   - mode-matrix — Use matrix for cross-browser/OS combinations
   - mode-hybrid — Use hybrid for static test suite files

2. **Test Discovery (CRITICAL)**
   - discovery-dynamic — Prefer mode: dynamic for auto-splitting across machines
   - discovery-grep — Use grep to find test files: grep -rn 'test(' tests/ --include='*.spec.ts' -l
   - discovery-framework-specific — Tailor discovery command per framework (Playwright, Cypress, pytest, Maven)

3. **Concurrency (HIGH)**
   - concurrency-high — Set concurrency: 10+ to maximize HyperExecute speed
   - concurrency-retry — Enable retryOnFailure: true with maxRetries: 2 for flaky resilience

**Playbook Deep Dive (8 sections):**
§1 Core Configuration · §2 Matrix Configuration · §3 Advanced Features · §4 CLI Usage & Execution · §5 CI/CD Integration · §6 Multiple Config Files Strategy · §7 Debugging Table · §8 Best Practices


The agent loads from 1 on-demand reference files (`playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.
