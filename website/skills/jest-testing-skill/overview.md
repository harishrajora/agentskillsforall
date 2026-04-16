**One-liner:** Jest unit/integration testing with comprehensive mocking (jest.fn, jest.mock, jest.spyOn), React Testing Library integration, snapshot testing, and async patterns in JavaScript/TypeScript.

**URL:** https://github.com/LambdaTest/agent-skills/tree/main/jest-skill

**When to Apply:**
Reference when writing JavaScript/TypeScript unit tests, mocking modules or functions, testing React components with Testing Library, or using snapshot testing for UI components. Triggers on "Jest", "expect().toBe()", "jest.mock", "snapshot test", "React test".

**Rule Categories by Priority:**

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Mocking Strategy | CRITICAL | mock- |
| 2 | Assertion Pattern | CRITICAL | assert- |
| 3 | Async Testing | HIGH | async- |
| 4 | React Testing | HIGH | react- |
| 5 | Snapshot Testing | MEDIUM | snapshot- |
| 6 | Table-Driven Tests | MEDIUM | table- |
| 7 | Custom Matchers | LOW-MEDIUM | matcher- |
| 8 | CI/CD & Config | LOW | ci- |

**Quick Reference:**

1. **Mocking Strategy (CRITICAL)**
   - mock-return-value — Use mockReturnValue/mockResolvedValue for deterministic tests
   - mock-module — Use jest.mock('./module') for dependency isolation
   - mock-spy-restore — Always restore spies with spy.mockRestore()
   - mock-fake-timers — Use jest.useFakeTimers() for time-dependent code

2. **Assertion Pattern (CRITICAL)**
   - assert-specific-matcher — Use expect(x).toBe(y) not expect(x === y).toBe(true)
   - assert-await-async — Always await async assertions to prevent swallowed failures
   - assert-to-equal-objects — Use toEqual for deep equality, toBe for primitives

3. **React Testing (HIGH)**
   - react-user-event — Prefer userEvent over fireEvent for realistic interactions
   - react-get-by-role — Use getByRole/getByLabelText for accessible queries
   - react-wait-for — Use waitFor for async state updates

**Playbook Deep Dive (12 sections):**
§1 Production Config · §2 Mocking Deep Dive · §3 Async Patterns · §4 Table-Driven Tests (test.each) · §5 Custom Matchers · §6 React Testing (Testing Library) · §7 Snapshot Testing · §8 Testing API Services · §9 Global Setup/Teardown & Projects · §10 CI/CD Integration · §11 Debugging Table (10 problems) · §12 Best Practices (15 items)


The agent loads from 2 on-demand reference files (`advanced-patterns.md`, `playbook.md`) containing detailed implementation guides, cloud integration patterns, debugging tables, and language-specific best practices.

---
