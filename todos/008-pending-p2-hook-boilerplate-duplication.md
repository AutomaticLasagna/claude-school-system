---
status: pending
priority: p2
issue_id: "008"
tags: [code-review, quality, hooks]
session_6_candidate: true
---

# Hook Boilerplate Duplication

## Problem Statement
5 of 6 Python hooks repeat nearly identical ~30 lines of JSON logging boilerplate:
1. Read JSON from stdin
2. Ensure `logs/` directory exists
3. Read existing log file or initialize empty list
4. Append input data
5. Write back with `json.dump`

This ~150 lines total could be reduced to ~30 with a shared utility.

## Location
- `.claude/hooks/session_start.py`
- `.claude/hooks/session_end.py`
- `.claude/hooks/stop.py`
- `.claude/hooks/user_prompt_submit.py`
- `.claude/hooks/session_complete.py`

## Proposed Fix
Create `.claude/hooks/utils/logger.py` with a shared `log_event(log_name)` function. Each hook imports and calls it.

**Note:** This is earmarked for **Session 6: Understanding Your Hooks** curriculum.

## Acceptance Criteria
- [ ] Shared logging utility created
- [ ] All 5 hooks use the shared utility
- [ ] Logging behavior unchanged
