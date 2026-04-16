**One-liner:** Production-grade Cypress E2E and component testing with command chaining, network interception, and custom commands in JavaScript/TypeScript.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/cypress-skill

**When to Apply:**
Reference this skill when writing Cypress tests, setting up component testing for React/Vue/Angular, configuring network interception with cy.intercept, or running tests on TestMu AI cloud. Triggers on "Cypress", "cy.visit", "cy.get", "cy.intercept", "component test".

**Rule Categories by Priority:**

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Command Chaining | CRITICAL | chain- |
| 2 | Wait Strategy | CRITICAL | wait- |
| 3 | Selector Strategy | HIGH | selector- |
| 4 | Network Interception | HIGH | network- |
| 5 | Auth & Session | MEDIUM-HIGH | auth- |
| 6 | Component Testing | MEDIUM | component- |
| 7 | Custom Commands | MEDIUM | command- |
| 8 | CI/CD & Debugging | LOW-MEDIUM | ci- |

**Quick Reference:**

1. **Command Chaining (CRITICAL)**
   - chain-no-async-await — Never use async/await with cy commands
   - chain-no-variable-assign — Never assign cy.get() to a variable for later use
   - chain-then-pattern — Use .then() for value extraction when needed

2. **Wait Strategy (CRITICAL)**
   - wait-intercept-alias — Use cy.intercept() + cy.wait('@alias') instead of cy.wait(number)
   - wait-should-retry — Use .should() chains for auto-retrying assertions

3. **Network Interception (HIGH)**
   - network-stub-api — Stub API responses with cy.intercept for deterministic tests
   - network-alias-wait — Always alias intercepts and wait for them before assertions
   - network-request-body — Verify request payloads via cy.wait('@alias').its('request.body')

**Playbook Deep Dive (15 sections):**
§1 Production Configuration · §2 Auth with cy.session() · §3 Page Object / App Actions Pattern · §4 Network Interception Patterns · §5 Component Testing · §6 Custom TypeScript Commands · §7 Database Reset & Seeding · §8 Time & Clock Control · §9 File Operations · §10 iframe & Shadow DOM · §11 Accessibility Testing · §12 Visual Regression (Percy) · §13 CI/CD Integration · §14 Debugging Table (11 problems) · §15 Best Practices (15 items)


The agent loads from 5 on-demand reference files (`cloud-integration.md`, `component-testing.md`, `custom-commands.md`, `debugging-flaky.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---
