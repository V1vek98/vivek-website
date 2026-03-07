#!/usr/bin/env bash
# =============================================================
# PreToolUse Hook: Validate before git commit
# =============================================================
# Matcher: Bash(git commit)
#
# This hook runs tests and linting before allowing a commit.
# The philosophy: let Claude finish its work, then validate at
# commit time rather than blocking mid-plan.
#
# To enable, add this to your .claude/settings.json hooks:
# {
#   "PreToolUse": [{
#     "matcher": "Bash(git commit)",
#     "hooks": [{
#       "type": "command",
#       "command": "bash .claude/hooks/pre-commit-validate.sh"
#     }]
#   }]
# }
# =============================================================

set -euo pipefail

ERRORS=""

# ---- Run tests ----
# Uncomment the test runner for your stack

# Node.js (pnpm)
# if [ -f package.json ]; then
#   if ! pnpm test --reporter=dot 2>&1; then
#     ERRORS="${ERRORS}\n- Tests failed"
#   fi
# fi

# Python (pytest)
# if [ -f pyproject.toml ] || [ -f setup.py ]; then
#   if ! pytest --tb=short -q 2>&1; then
#     ERRORS="${ERRORS}\n- Tests failed"
#   fi
# fi

# Go
# if [ -f go.mod ]; then
#   if ! go test ./... 2>&1; then
#     ERRORS="${ERRORS}\n- Tests failed"
#   fi
# fi

# ---- Run linter ----
# Uncomment the linter for your stack

# Node.js (ESLint)
# if [ -f .eslintrc* ] || [ -f eslint.config.*]; then
#   if ! npx eslint --quiet . 2>&1; then
#     ERRORS="${ERRORS}\n- Lint errors found"
#   fi
# fi

# Python (Ruff)
# if command -v ruff &> /dev/null; then
#   if ! ruff check . 2>&1; then
#     ERRORS="${ERRORS}\n- Lint errors found"
#   fi
# fi

# ---- Run type checker ----
# Uncomment for your stack

# TypeScript
# if [ -f tsconfig.json ]; then
#   if ! npx tsc --noEmit 2>&1; then
#     ERRORS="${ERRORS}\n- Type errors found"
#   fi
# fi

# Python (mypy)
# if command -v mypy &> /dev/null; then
#   if ! mypy . 2>&1; then
#     ERRORS="${ERRORS}\n- Type errors found"
#   fi
# fi

# ---- Report results ----
if [ -n "$ERRORS" ]; then
  echo "COMMIT BLOCKED — fix these issues first:" >&2
  echo -e "$ERRORS" >&2
  echo "" >&2
  echo "Fix the issues above, then try committing again." >&2
  exit 2
fi

exit 0
