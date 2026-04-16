**One-liner:** Production-grade Playwright browser automation with auto-wait assertions, API mocking, visual regression, and real mobile device testing across TypeScript, JS, Python, Java, and C#.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/playwright-skill

**When to Apply:**
Reference this skill when writing E2E tests with Playwright, automating browsers with auto-wait assertions, testing on real mobile devices, mocking APIs, performing visual regression, or running cross-browser tests. Triggers on "Playwright", "E2E test", "browser test", "cross-browser", "test my app", "real device".

**Rule Categories by Priority:**

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Selector Strategy | CRITICAL | selector- |
| 2 | Assertion Pattern | CRITICAL | assert- |
| 3 | Page Object Model | HIGH | pom- |
| 4 | Cloud & Mobile | HIGH | cloud- |
| 5 | Network Interception | MEDIUM-HIGH | network- |
| 6 | Visual Regression | MEDIUM | visual- |
| 7 | Auth & Fixtures | MEDIUM | auth- |
| 8 | CI/CD & Debugging | LOW-MEDIUM | ci- |

**Quick Reference:**

1. **Selector Strategy (CRITICAL)**
   - selector-get-by-role — Use getByRole('button', { name: 'Submit' }) first (accessible, resilient)
   - selector-get-by-label — Use getByLabel('Email') for form fields
   - selector-get-by-test-id — Use getByTestId only as last resort
   - selector-no-raw-css — Never use raw CSS/XPath unless matching third-party widgets

2. **Assertion Pattern (CRITICAL)**
   - assert-web-first — Use auto-retrying assertions: await expect(locator).toBeVisible()
   - assert-no-manual-check — Never use const text = await page.textContent(); expect(text)
   - assert-no-hard-wait — Never use page.waitForTimeout(3000)

3. **Cloud & Mobile (HIGH)**
   - cloud-cdp-websocket — Connect via wss://cdp.lambdatest.com/playwright
   - cloud-hyperexecute-projects — Use project format for parallel cloud runs
   - cloud-mobile-webkit — iOS always uses webkit, never chromium
   - cloud-status-report — Report pass/fail via lambdatest_action

**Playbook Deep Dive (16 sections):**
§1 Production Configuration · §2 Auth Fixture Reuse · §3 Page Object Model · §4 Advanced Network Interception · §5 Visual Regression Testing · §6 File Upload & Download · §7 Multi-Tab, Popup & Dialog Handling · §8 Geolocation, Permissions & Device Emulation · §9 Custom Test Fixtures · §10 API Testing with Playwright · §11 Accessibility Testing (axe-core) · §12 Parallel & Sharding · §13 CI/CD Integration · §14 Debugging Toolkit · §15 Debugging Table (10 problems) · §16 Best Practices (17 items)


The agent loads from 9 on-demand reference files (`cloud-integration.md`, `page-object-model.md`, `mobile-testing.md`, `debugging-flaky.md`, `api-mocking-visual.md`, `python-patterns.md`, `java-patterns.md`, `csharp-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices. The skill also includes utility scripts and templates: `scripts/scaffold-project.sh`, `scripts/validate-config.py`, and `templates/`.

---
