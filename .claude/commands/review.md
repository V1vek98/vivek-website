# Review — Review all staged and unstaged changes

Review the current changes for quality and correctness:

1. Run `git diff` to see unstaged changes
2. Run `git diff --cached` to see staged changes
3. For each changed file, review:
   - **Correctness**: Does the logic work? Edge cases handled?
   - **Security**: Any injection risks, hardcoded secrets, exposed data?
   - **Performance**: Any obvious bottlenecks (N+1, unnecessary loops)?
   - **Testing**: Are there tests for the new behavior?
4. Provide a summary with:
   - Issues found (CRITICAL / WARNING / SUGGESTION)
   - What looks good
   - Recommendation: READY TO COMMIT or NEEDS CHANGES
