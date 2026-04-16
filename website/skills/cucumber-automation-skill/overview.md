**One-liner:** Cucumber BDD with Gherkin feature files, step definitions, hooks, tags, Scenario Outline, and dependency injection in Java, JavaScript, Ruby, and TypeScript.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/cucumber-skill

**When to Apply:**
Reference when writing BDD tests with Given/When/Then syntax, creating Gherkin feature files, implementing step definitions, or setting up Cucumber with dependency injection. Triggers on "Cucumber", "Gherkin", "BDD", "Feature file", "Given/When/Then", "step definitions".

**Rule Categories by Priority:**

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Feature Writing | CRITICAL | feature- |
| 2 | Step Definitions | CRITICAL | step- |
| 3 | Hooks & Lifecycle | HIGH | hook- |
| 4 | Shared State & DI | HIGH | state- |
| 5 | Tags & Filtering | MEDIUM | tag- |
| 6 | Parallel Execution | MEDIUM | parallel- |
| 7 | Reporting | LOW-MEDIUM | report- |

**Quick Reference:**

1. **Feature Writing (CRITICAL)**
   - feature-business-language — Use business language, not UI details in Gherkin
   - feature-declarative-steps — Write declarative steps ("I am logged in") not imperative ("I click login button")
   - feature-background — Use Background for shared setup across scenarios
   - feature-scenario-outline — Use Scenario Outline + Examples for data-driven BDD

2. **Step Definitions (CRITICAL)**
   - step-meaningful-actions — Each step should represent a meaningful business action
   - step-typed-parameters — Use {string}, {int} parameter types for type safety
   - step-no-ui-details — Keep UI interaction details in page objects, not steps

**Playbook Deep Dive (11 sections):**
§1 Project Setup & Configuration · §2 Feature Writing Patterns · §3 Step Definitions · §4 Dependency Injection & Shared State · §5 Hooks (Lifecycle Management) · §6 Custom Parameter Types & Transformers · §7 Parallel Execution · §8 Reporting · §9 CI/CD Integration · §10 Debugging Table (10 problems) · §11 Best Practices (13 items)


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---
