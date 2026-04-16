**One-liner:** Production-grade Selenium WebDriver automation with cross-browser cloud support across Java, Python, JS, C#, and Ruby.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/selenium-skill

**When to Apply:**
Reference this skill when writing Selenium WebDriver tests, automating browsers with ChromeDriver/GeckoDriver, running cross-browser tests on Selenium Grid, or migrating existing Selenium scripts to cloud execution. Triggers on mentions of "Selenium", "WebDriver", "RemoteWebDriver", "cross-browser", "Selenium Grid".

**Rule Categories by Priority:**

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Locator Strategy | CRITICAL | locator- |
| 2 | Wait Strategy | CRITICAL | wait- |
| 3 | Page Object Model | HIGH | pom- |
| 4 | Cloud Integration | HIGH | cloud- |
| 5 | Driver Management | MEDIUM-HIGH | driver- |
| 6 | Data-Driven Testing | MEDIUM | data- |
| 7 | Reporting & CI/CD | MEDIUM | ci- |
| 8 | Advanced Interactions | LOW-MEDIUM | advanced- |

**Quick Reference:**

1. **Locator Strategy (CRITICAL)**
   - locator-id-first — Use By.id() as most stable locator
   - locator-css-over-xpath — Prefer CSS selectors over XPath for speed and readability
   - locator-no-absolute-xpath — Never use fragile absolute XPaths like //div[3]/span[2]/a
   - locator-data-attributes — Use data-testid for elements without stable IDs

2. **Wait Strategy (CRITICAL)**
   - wait-explicit-only — Use WebDriverWait with ExpectedConditions exclusively
   - wait-no-thread-sleep — Never use Thread.sleep() (flaky, slow)
   - wait-no-implicit-mix — Never mix implicit and explicit waits (unpredictable)
   - wait-fluent-retry — Use FluentWait with polling for complex scenarios

3. **Page Object Model (HIGH)**
   - pom-locator-separation — Locators in page class, assertions in test class
   - pom-base-page — 20+ helper methods for Shadow DOM, iframes, alerts, Angular/jQuery waits
   - pom-factory-pattern — Thread-safe DriverFactory for multi-browser support

4. **Cloud Integration (HIGH)**
   - cloud-env-credentials — LT_USERNAME and LT_ACCESS_KEY from environment variables
   - cloud-lt-options — Configure LT:Options for platform, build, video, network
   - cloud-status-report — Report pass/fail to TestMu AI dashboard via JavascriptExecutor

**Playbook Deep Dive (14 sections):**
§1 Thread-Safe DriverFactory · §2 Configuration Management · §3 Production BasePage · §4 Page Object Example · §5 Smart Wait Strategies · §6 Data-Driven Testing (CSV, Excel) · §7 Screenshot & Reporting · §8 Allure Reporting · §9 CI/CD Integration · §10 Parallel Execution · §11 Advanced Element Interactions · §12 Retry Mechanism · §13 Debugging Table (11+ problems) · §14 Best Practices (17 items)


The agent loads from 9 on-demand reference files (`cloud-integration.md`, `page-object-model.md`, `python-patterns.md`, `javascript-patterns.md`, `csharp-patterns.md`, `ruby-patterns.md`, `php-patterns.md`, `debugging-common-issues.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---
