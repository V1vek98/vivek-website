#!/usr/bin/env bash
# =============================================================
# PostToolUse Hook: Auto-format files after Edit/Write
# =============================================================
# This hook runs AFTER Edit or Write tool execution.
# It detects the project's formatter and runs it on changed files.
#
# Uncomment the formatter section that matches your project.
# Only one formatter should be active at a time.
# =============================================================

set -euo pipefail

# Read the tool output JSON from stdin
INPUT=$(cat)

# Extract the file path(s) that were modified
FILE_PATHS=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATHS" ]; then
  exit 0
fi

# ---- JavaScript/TypeScript: Prettier ----
# Uncomment the block below if using Prettier
# if command -v prettier &> /dev/null || [ -f node_modules/.bin/prettier ]; then
#   npx prettier --write "$FILE_PATHS" 2>/dev/null || true
# fi

# ---- JavaScript/TypeScript: Biome ----
# Uncomment the block below if using Biome
# if command -v biome &> /dev/null || [ -f node_modules/.bin/biome ]; then
#   npx biome format --write "$FILE_PATHS" 2>/dev/null || true
# fi

# ---- Python: Ruff ----
# Uncomment the block below if using Ruff
# if command -v ruff &> /dev/null; then
#   ruff format "$FILE_PATHS" 2>/dev/null || true
#   ruff check --fix "$FILE_PATHS" 2>/dev/null || true
# fi

# ---- Python: Black ----
# Uncomment the block below if using Black
# if command -v black &> /dev/null; then
#   black "$FILE_PATHS" 2>/dev/null || true
# fi

# ---- Go: gofmt ----
# Uncomment the block below if using Go
# if command -v gofmt &> /dev/null; then
#   gofmt -w "$FILE_PATHS" 2>/dev/null || true
# fi

# ---- Rust: rustfmt ----
# Uncomment the block below if using Rust
# if command -v rustfmt &> /dev/null; then
#   rustfmt "$FILE_PATHS" 2>/dev/null || true
# fi

exit 0
