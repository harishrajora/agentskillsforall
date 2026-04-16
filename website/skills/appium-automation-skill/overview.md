**One-liner:** Cross-platform mobile automation for Android (UiAutomator2) and iOS (XCUITest) with real device cloud testing, W3C gestures, and hybrid app support in Java, Python, JavaScript, Ruby, and C#.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/appium-skill

**When to Apply:**
Reference when automating mobile apps on Android or iOS, testing on real devices or emulators, handling gestures (swipe, long press, pinch), testing hybrid/WebView apps, or running on TestMu AI device farm. Triggers on "Appium", "mobile test", "Android test", "iOS test", "real device", "UiAutomator", "XCUITest driver".

**Rule Categories by Priority:**

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Platform Capabilities | CRITICAL | caps- |
| 2 | Locator Strategy | CRITICAL | locator- |
| 3 | Wait Strategy | HIGH | wait- |
| 4 | Gesture Actions | HIGH | gesture- |
| 5 | Cross-Platform POM | MEDIUM-HIGH | pom- |
| 6 | Cloud Integration | MEDIUM-HIGH | cloud- |
| 7 | Hybrid App Testing | MEDIUM | hybrid- |
| 8 | Device Interactions | LOW-MEDIUM | device- |

**Quick Reference:**

1. **Platform Capabilities (CRITICAL)**
   - caps-android-uiautomator2 — Use automationName: UiAutomator2 for Android
   - caps-ios-xcuitest — Use automationName: XCUITest for iOS
   - caps-separate-sets — Create separate capability sets for Android and iOS

2. **Locator Strategy (CRITICAL)**
   - locator-accessibility-id — Use AccessibilityId first (cross-platform)
   - locator-resource-id — Use Android resource-id for platform-specific
   - locator-ios-predicate — Use iOSNsPredicateString for iOS queries
   - locator-no-xpath — Avoid XPath (slow, fragile on mobile)

3. **Gesture Actions (HIGH)**
   - gesture-w3c-actions — Use W3C Actions API, not deprecated TouchAction
   - gesture-no-hardcoded-coords — Use element-based actions (screen size varies)
   - gesture-swipe-scroll — Use PointerInput sequences for swipe/scroll

**Playbook Deep Dive (11 sections):**
§1 Project Setup & Capabilities · §2 BaseTest with Thread-Safe Driver · §3 Cross-Platform Page Objects · §4 Advanced Gestures (W3C Actions) · §5 WebView & Hybrid App Testing · §6 Device Interactions · §7 Parallel Device Execution · §8 LambdaTest Real Device Cloud · §9 CI/CD Integration · §10 Debugging Table (12 problems) · §11 Best Practices (13 items)


The agent loads from 6 on-demand reference files (`cloud-integration.md`, `hybrid-apps.md`, `ios-specific.md`, `javascript-patterns.md`, `python-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---
