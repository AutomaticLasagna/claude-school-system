---
status: pending
priority: p3
issue_id: "009"
tags: [code-review, security, hooks]
session_6_candidate: true
---

# Pre-Tool-Use Hook Bypass Patterns

## Problem Statement
The `pre_tool_use.py` hook detects dangerous `rm` commands using regex patterns, but these can be bypassed using alternative deletion methods like `find ... -delete`, `perl -e 'unlink'`, or aliased commands.

## Location
- `.claude/hooks/pre_tool_use.py:11-52` (is_dangerous_rm_command function)

## Proposed Fix
Extend detection to cover:
- `find` with `-delete` or `-exec rm`
- `shred` command
- `truncate` command
- Piped commands that could delete files

Acceptable risk for a learning project - current coverage handles the most common dangerous patterns.

**Note:** Enhancement candidate for **Session 6: Understanding Your Hooks** curriculum.

## Acceptance Criteria
- [ ] Additional dangerous patterns detected
- [ ] No false positives on safe commands
