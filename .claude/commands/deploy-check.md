# Deploy Check — Pre-deployment validation

Run a comprehensive check before deploying:

1. **Tests**: Run the full test suite and report results
2. **Lint**: Run linter and report any errors
3. **Type Check**: Run type checker if configured
4. **Build**: Attempt a production build
5. **Security**: Check for known vulnerabilities in dependencies
6. **Git Status**: Ensure working tree is clean (no uncommitted changes)
7. **Branch**: Confirm we're on the correct branch for deployment

Report a clear PASS / FAIL for each check. If any critical check fails, recommend NOT deploying and explain what needs to be fixed first.
