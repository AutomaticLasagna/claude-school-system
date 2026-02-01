# CSMLS V1 Brainstorm

**Date:** 2026-02-01
**Status:** Ready for planning

## What We're Building

A **Claude School Meta-Learning System (CSMLS)** that:

1. **Tracks progress** through the 6-stage agentic engineering roadmap
2. **Maintains session continuity** so Claude can restore context between learning sessions
3. **Displays current status** in a minimal React dashboard

### V1 Scope (Included)
- Progress tracking (extends existing `progress.json` and `quality-gates.json`)
- Session continuity via structured JSON summaries
- `/start-session` skill to load context at session start
- Minimal React dashboard showing roadmap position and last session summary

### V2 Scope (Excluded)
- Knowledge compilation
- GitHub integration
- Interactive dashboard features

## Why This Approach

**File-First Architecture** was chosen because:

1. **Builds on existing patterns** - `progress.json` and `quality-gates.json` already work
2. **No backend complexity** - React reads JSON files statically
3. **Explicit control** - `/start-session` skill triggers context load on demand
4. **Hybrid storage preserved** - JSON for machines, markdown for humans
5. **YAGNI** - Simplest solution that delivers the requirements

Alternatives considered:
- CLAUDE.md-driven auto-context (less explicit control)
- Dashboard with Node backend (overkill for V1)

## Key Decisions

### Decision 1: Dual-User System
The dashboard serves **both** the human learner (visual progress) **and** Claude (machine-readable context). This means:
- JSON must be well-structured for Claude to parse
- Display must be human-friendly for motivation/planning

### Decision 2: Session Summary Content
Each session JSON (`data/sessions/session-{N}.json`) captures:
- Skills demonstrated
- Open questions/blockers
- Next session objectives
- Key files modified

This creates a machine-readable learning journal.

### Decision 3: Static Data Flow
React dashboard reads JSON files directly at load time. No real-time sync needed for V1. User refreshes browser to see updates.

### Decision 4: Explicit Session Boundaries
- **Start:** `/start-session` skill reads context and presents summary to Claude
- **End:** Claude generates both markdown log AND JSON summary when session concludes

### Decision 5: Minimal Dashboard for V1
Single-page view with:
- Roadmap visualization (6 stages, current position highlighted)
- Current stage/session indicator
- Progress percentage
- Last session summary display

## Data Model Sketch

```
data/
├── progress.json          # Existing - roadmap position
├── quality-gates.json     # Existing - gate definitions
└── sessions/
    ├── session-01.json    # NEW - structured summary
    ├── session-02.json
    └── ...

logs/
├── session-01.md          # Existing - narrative log
├── session-02.md
└── ...
```

**Session JSON structure:**
```json
{
  "sessionNumber": 2,
  "date": "2026-01-30",
  "status": "complete",
  "skillsDemonstrated": ["git-status", "git-add", "commit-workflow"],
  "openQuestions": [],
  "nextObjectives": ["Learn git branching", "Practice git diff"],
  "filesModified": ["logs/session-02.md", "data/progress.json"]
}
```

## Open Questions

1. **Should `/start-session` also update `progress.json`?** (e.g., increment session number)
2. **How to handle session-in-progress state?** (started but not ended)
3. **Dashboard hosting:** Local dev server (`npm start`) or build to static files?

## Components to Build

1. **Session JSON schema** - Define structure for `data/sessions/session-{N}.json`
2. **`/start-session` skill** - Reads and presents context
3. **Session-end logic** - Claude writes JSON summary (instruction-based, not code)
4. **React dashboard** - Minimal single-page progress viewer
5. **CLAUDE.md** - Project context for Claude Code

## Success Criteria

- [ ] Claude can start a session and immediately know: current stage, last session's work, open questions, today's objectives
- [ ] Human can view a dashboard showing progress through the 6-stage roadmap
- [ ] Session data persists in JSON for machine use AND markdown for human reading
- [ ] No backend server required - static files only
