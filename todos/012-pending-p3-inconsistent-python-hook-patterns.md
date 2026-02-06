---
status: pending
priority: p3
issue_id: "012"
tags: [code-review, quality, hooks]
session_6_candidate: true
---

# Inconsistent Python Patterns Across Hooks

## Problem Statement
The 6 Python hooks use inconsistent patterns:
- `stop.py` uses `os.path` while others use `pathlib.Path`
- `session_complete.py` uses append mode (`"a"`) while others do read-modify-write
- `session_end.py` and `user_prompt_submit.py` import `argparse` but only `user_prompt_submit.py` uses it
- 3 hooks import `python-dotenv` unnecessarily (no `.env` file exists)
- `pre_tool_use.py` requires Python `>=3.8` while others require `>=3.11`

## Location
- `.claude/hooks/stop.py` (os.path)
- `.claude/hooks/session_complete.py` (append mode)
- `.claude/hooks/session_end.py:9` (unused argparse)
- All hooks (inconsistent Python version)

## Proposed Fix
Standardize all hooks to:
- Use `pathlib.Path` consistently
- Use read-modify-write pattern (not append)
- Remove unused imports (`argparse`, `dotenv`)
- Align Python version requirement to `>=3.11`

**Note:** Earmarked for **Session 6: Understanding Your Hooks** curriculum.

## Acceptance Criteria
- [ ] All hooks use consistent import patterns
- [ ] No unused imports
- [ ] Consistent file I/O approach
