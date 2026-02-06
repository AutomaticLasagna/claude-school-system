---
status: pending
priority: p3
issue_id: "016"
tags: [code-review, agent-native, hooks]
session_6_candidate: true
---

# Hooks Don't Provide Feedback to Agent

## Problem Statement
5 of 6 hooks log silently to JSON files (exit code 0) without providing any structured feedback that Claude could act on. Only `pre_tool_use.py` communicates back (via stderr + exit code 2 to block actions).

The other hooks are doing work that nobody sees - similar to how the review agents analyzed code but their output wasn't captured.

## Location
- `.claude/hooks/session_start.py` - logs silently
- `.claude/hooks/session_end.py` - logs silently
- `.claude/hooks/stop.py` - logs silently
- `.claude/hooks/user_prompt_submit.py` - logs silently
- `.claude/hooks/session_complete.py` - prints to stdout but agent doesn't see it

## Proposed Fix
Hooks could output structured JSON to stdout that Claude receives as feedback:
- `session_start`: Output current progress summary so Claude knows context
- `session_end`: Output session statistics (duration, tools used)
- `stop`: Output validation results (did session data get saved?)

**Note:** This is a core concept for **Session 6: Understanding Your Hooks** - making hooks that communicate, not just log.

## Acceptance Criteria
- [ ] At least one hook provides structured feedback to the agent
- [ ] Agent can use hook output to make decisions
