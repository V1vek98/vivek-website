#!/usr/bin/env bash
# =============================================================
# PreToolUse Hook: Block writes to protected files
# =============================================================
# Matcher: Write|Edit
#
# Prevents Claude from modifying generated files, lock files,
# and CI configuration without explicit approval.
#
# To enable, add to .claude/settings.json PreToolUse:
# {
#   "matcher": "Write|Edit",
#   "hooks": [{
#     "type": "command",
#     "command": "bash .claude/hooks/validate-write.sh"
#   }]
# }
# =============================================================

set -euo pipefail

INPUT=$(cat)

FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# ---- Block writes to generated/auto-generated files ----
if echo "$FILE_PATH" | grep -qiE '(generated|\.gen\.|\.auto\.|__generated__)'; then
  echo "BLOCKED: Cannot modify generated files. Modify the source template instead." >&2
  exit 2
fi

# ---- Block writes to lock files ----
if echo "$FILE_PATH" | grep -qiE '(package-lock\.json|pnpm-lock\.yaml|yarn\.lock|Cargo\.lock|poetry\.lock|uv\.lock)'; then
  echo "BLOCKED: Lock files should not be manually edited. Use the package manager." >&2
  exit 2
fi

# ---- Block writes to CI config ----
if echo "$FILE_PATH" | grep -qiE '(\.github/workflows|\.gitlab-ci|\.circleci|Jenkinsfile)'; then
  echo "BLOCKED: CI/CD configuration changes require manual review. Ask the user first." >&2
  exit 2
fi

# ---- Block writes to environment files ----
if echo "$FILE_PATH" | grep -qiE '(\.env$|\.env\.)' && ! echo "$FILE_PATH" | grep -qiE '\.example$'; then
  echo "BLOCKED: Cannot write to environment files. Use .env.example instead." >&2
  exit 2
fi

exit 0
