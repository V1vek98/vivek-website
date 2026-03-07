# Catchup — Restore context after /clear

Read all files changed in the current git branch compared to main:

1. Run `git diff main --name-only` to list changed files
2. Read each changed file to understand the current state
3. Run `git log main..HEAD --oneline` to understand commit history
4. Summarize:
   - What this branch is working on
   - What has been completed so far
   - What appears to be remaining work
   - Any issues or TODOs found in the code

Be concise. Focus on the big picture, not line-by-line changes.
