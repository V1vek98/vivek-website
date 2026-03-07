#!/usr/bin/env bash
# =============================================================
# PreToolUse Hook: Block dangerous bash commands
# =============================================================
# This hook runs BEFORE any Bash tool execution.
# It reads the tool input from stdin (JSON) and checks
# the command against a blocklist of dangerous patterns.
#
# Exit 0 = allow, Exit 2 = block (with stderr message shown to Claude)
# =============================================================

set -euo pipefail

# Read the tool input JSON from stdin
INPUT=$(cat)

# Extract the command being run
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if [ -z "$COMMAND" ]; then
  exit 0
fi

# ---- Dangerous patterns to block ----
DANGEROUS_PATTERNS=(
  "rm -rf /"
  "rm -rf ~"
  "rm -rf \*"
  "mkfs\."
  "dd if="
  "> /dev/sd"
  "chmod -R 777"
  ":(){ :|:& };:"
  "git push.*--force.*main"
  "git push.*--force.*master"
  "git reset --hard.*origin"
  "git clean -fd"
  "DROP DATABASE"
  "DROP TABLE"
  "DELETE FROM.*WHERE 1"
  "TRUNCATE TABLE"
  "curl.*| bash"
  "curl.*| sh"
  "wget.*| bash"
  "wget.*| sh"
  "eval.*\$("
  "npm publish"
  "pip install.*--break-system"
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qiE "$pattern"; then
    echo "BLOCKED: Command matches dangerous pattern: $pattern" >&2
    echo "If you need to run this command, ask the user for explicit confirmation first." >&2
    exit 2
  fi
done

# ---- Block commands that access secrets ----
SECRET_PATTERNS=(
  "cat.*\.env"
  "cat.*credentials"
  "cat.*secret"
  "echo.*\$.*PASSWORD"
  "echo.*\$.*SECRET"
  "echo.*\$.*TOKEN"
  "echo.*\$.*API_KEY"
  "printenv.*PASSWORD"
  "printenv.*SECRET"
  "printenv.*TOKEN"
)

for pattern in "${SECRET_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qiE "$pattern"; then
    echo "BLOCKED: Command may expose secrets: $pattern" >&2
    echo "Use environment variables directly rather than printing them." >&2
    exit 2
  fi
done

exit 0
