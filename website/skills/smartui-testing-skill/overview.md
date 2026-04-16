**One-liner:** Visual regression testing via AI-powered screenshot comparison on TestMu AI cloud — framework-agnostic, works with Playwright, Selenium, Cypress, Puppeteer, and Storybook.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/smartui-skill

**When to Apply:**
Reference when implementing visual regression testing, comparing screenshots across builds, integrating with Storybook for component-level visual testing, or setting up approval workflows for UI changes. Triggers on "SmartUI", "visual regression", "screenshot comparison", "pixel diff", "visual testing LambdaTest".

**Rule Categories by Priority:**

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Snapshot Strategy | CRITICAL | snapshot- |
| 2 | Configuration | HIGH | config- |
| 3 | Integration Pattern | HIGH | integrate- |
| 4 | Approval Workflow | MEDIUM | approval- |
| 5 | CI/CD | LOW-MEDIUM | ci- |

**Quick Reference:**

1. **Snapshot Strategy (CRITICAL)**
   - snapshot-key-pages — Screenshot key pages/components, not everything (noise reduction)
   - snapshot-wait-render — Always configure waitForPageRender for complete screenshots
   - snapshot-multi-viewport — Configure multiple viewports for responsive coverage

2. **Integration Patterns (HIGH)**
   - integrate-playwright-sdk — Use smartuiSnapshot(page, 'Name') for Playwright
   - integrate-selenium-script — Use executeScript("smartui.takeScreenshot=Name") for Selenium
   - integrate-storybook — Use npx smartui storybook <url> for component libraries
   - integrate-cli-exec — Wrap any test with npx smartui exec -- <command>

3. **Approval Workflow (MEDIUM)**
   - approval-baseline — First run creates baseline automatically
   - approval-review-diffs — Review highlighted differences in SmartUI dashboard
   - approval-new-baseline — Approved screenshots become new baseline

**Playbook Deep Dive (9 sections):**
§1 Project Setup · §2 Static URL Testing · §3 Playwright Integration · §4 Component-Level Testing · §5 Advanced Configuration · §6 Selenium Integration · §7 CI/CD Integration · §8 Debugging Table · §9 Best Practices


The agent loads from 1 on-demand reference files (`playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.
