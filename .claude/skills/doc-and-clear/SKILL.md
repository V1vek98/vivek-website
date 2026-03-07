---
name: document-and-clear
description: Save current progress and context to a file before clearing the session. Use when context window is getting full or switching between tasks.
allowed-tools: Read, Write, Glob, Grep, Bash
---

## Document & Clear Process

When the context window is getting full or you're about to switch tasks:

### 1. Capture Current State
Write a progress document to `docs/plans/progress-[task-name].md` with:

```markdown
# Progress: [Task Name]
## Date: [current date]

## What was accomplished
- [List of completed items]

## Current state
- [What's working now]
- [Files that were modified and why]

## What's remaining
- [Ordered list of next steps]

## Key decisions made
- [Decision 1]: [Rationale]

## Known issues
- [Issue 1]: [Details]

## How to continue
1. Read this file
2. [Specific next step]
3. [Following steps]
```

### 2. Recommend /clear
After writing the progress file, tell the user:
- The progress has been saved to `docs/plans/progress-[task-name].md`
- They should run `/clear` to reset context
- Then start a new session with: "Read docs/plans/progress-[task-name].md and continue from where we left off"
