---
name: code-review
description: Perform thorough code review on recent changes. Use after writing code or before committing.
allowed-tools: Read, Grep, Glob, Bash
---

## Code Review Checklist

When reviewing code, systematically check each category below.

### 1. Correctness
- Does the code do what it claims to do?
- Are edge cases handled (null, empty, boundary values)?
- Are error conditions handled gracefully?
- Is the happy path clearly distinguishable from error paths?

### 2. Security (OWASP Top 10)
- No SQL injection (parameterized queries used?)
- No XSS (user input escaped/sanitized?)
- No command injection (shell commands use safe APIs?)
- No hardcoded secrets, tokens, or credentials
- No sensitive data in logs or error messages
- Authentication and authorization checks in place?
- Input validation at system boundaries?

### 3. Performance
- No N+1 query patterns
- No unnecessary allocations in hot paths
- Appropriate data structures chosen
- Database queries have proper indexes
- No blocking calls in async contexts

### 4. Maintainability
- Functions are small and focused (single responsibility)
- Naming is clear and consistent
- No dead code or commented-out blocks
- No premature abstractions or over-engineering
- Complex logic has inline comments explaining WHY

### 5. Testing
- New behavior has corresponding tests
- Tests cover both happy path and error cases
- Tests are deterministic (no flaky tests)
- Test names describe expected behavior

### Output Format
```
## Code Review Summary

### Issues Found
- [CRITICAL] description — file:line
- [WARNING] description — file:line
- [SUGGESTION] description — file:line

### What Looks Good
- Positive observation 1
- Positive observation 2

### Recommendation
[APPROVE / REQUEST CHANGES / NEEDS DISCUSSION]
```
