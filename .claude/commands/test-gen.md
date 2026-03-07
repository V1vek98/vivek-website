# Test Gen — Generate tests for specified code

Generate comprehensive tests for: $ARGUMENTS

Follow these rules:
1. Use the testing framework specified in CLAUDE.md
2. Cover happy path, edge cases, and error scenarios
3. Use descriptive test names: "should [expected behavior] when [condition]"
4. Mock external dependencies (network, database, file system)
5. Each test should be independent — no shared mutable state
6. Include setup and teardown where appropriate
7. Aim for branch coverage, not just line coverage
8. Write the test file next to the source file (or in the tests/ mirror directory)
9. After writing, run the tests to verify they pass
