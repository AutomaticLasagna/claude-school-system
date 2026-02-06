---
status: pending
priority: p3
issue_id: "015"
tags: [code-review, agent-native]
---

# No Programmatic Session Start/End

## Problem Statement
While CLAUDE.md documents the session workflow in detail, there's no machine-invocable entry point for starting or ending a session. The `/start-session` skill reads data but requires a human to invoke it. An agent can't trigger "start session 5" programmatically.

## Location
- `skills/start-session.md` (skill definition)
- `CLAUDE.md` (workflow documentation)

## Proposed Fix
Create a programmatic API (e.g., Node.js script or extended skill) that can:
1. Start a session (create session JSON, update progress)
2. End a session (finalize session JSON, update progress, check quality gates)

This would make the system truly agent-native - an agent could run the entire learning workflow autonomously.

## Acceptance Criteria
- [ ] Session can be started programmatically
- [ ] Session can be ended programmatically
- [ ] Progress is updated automatically
