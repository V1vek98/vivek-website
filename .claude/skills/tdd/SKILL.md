---
name: test-driven-development
description: Write tests before implementation. Use for any new feature work or bug fixes that need regression tests.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

## Test-Driven Development Process

Follow this strict TDD cycle for every change:

### 1. RED — Write the failing test first
- Understand the requirement fully before writing any test
- Write the simplest test that captures the desired behavior
- Use descriptive test names: `test_should_[expected_behavior]_when_[condition]`
- Run the test and **confirm it fails** for the right reason
- If it passes, the test is either wrong or the feature already exists

### 2. GREEN — Write minimum code to pass
- Implement the **simplest possible code** that makes the test pass
- Do not add extra logic, optimizations, or edge case handling yet
- Run the test and confirm it passes
- If it fails, fix the implementation, not the test (unless the test is wrong)

### 3. REFACTOR — Clean up while green
- Improve code structure, naming, and readability
- Remove duplication between production and test code
- Run all tests after each refactoring step to ensure nothing breaks
- Do not add new behavior during refactoring

### 4. COMMIT — Save progress at each green state
- Create a focused commit after each RED-GREEN-REFACTOR cycle
- Commit message should describe the behavior added, not the test
- Example: `feat: validate email format on user registration`

### Rules
- Never write production code without a failing test
- One logical assertion per test (multiple `assert` calls are OK if testing one behavior)
- Tests should be independent — no shared mutable state between tests
- Mock external dependencies (APIs, databases, file system) at the boundary
- Keep test files mirroring source structure
