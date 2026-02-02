# Claude School Meta-Learning System

A file-first meta-learning system that tracks progress through a 6-stage agentic engineering roadmap with session continuity and visual progress tracking.

## What is CSMLS?

The Claude School Meta-Learning System (CSMLS) solves the problem of starting fresh in each learning session. It provides:

1. **Structured session summaries** - JSON files Claude can parse to restore context
2. **Explicit session boundaries** - `/start-session` skill triggers context loading
3. **Visual progress tracking** - React dashboard shows roadmap position

## Architecture

**File-First Design:**
- JSON files for machine-readable data
- Markdown files for human-readable logs
- React reads files statically at load time
- No backend server required

## Quick Start

### Start a Learning Session

```bash
# In Claude Code, use the skill:
/start-session
```

This loads:
- Current stage and session number
- Previous session's context (objectives, insights, questions)
- Today's objectives

### View Progress Dashboard

```bash
npm install
npm run dev
```

Open http://localhost:5173 to see:
- 6-stage roadmap with current position
- Progress percentage
- Latest session summary

### End a Session

When you're done, say "end session" and Claude will:
1. Generate session-{N}.json with summary
2. Create logs/session-{N}.md with narrative
3. Update progress.json (increment session, mark complete)

## File Structure

```
claude-school-system/
├── data/
│   ├── progress.json           # Current roadmap position
│   ├── quality-gates.json      # Gate definitions
│   └── sessions/
│       ├── session-01.json     # Machine-readable summaries
│       ├── session-02.json
│       └── ...
├── logs/
│   ├── session-01.md           # Human-readable narratives
│   ├── session-02.md
│   └── ...
├── skills/
│   └── start-session.md        # Session loading skill
├── src/
│   ├── App.jsx                 # React entry point
│   ├── components/
│   │   ├── Dashboard.jsx       # Main dashboard view
│   │   ├── RoadmapStages.jsx   # 6-stage visualization
│   │   └── SessionSummary.jsx  # Last session display
│   └── utils/
│       └── dataLoader.js       # JSON file loading
├── CLAUDE.md                   # Project context for AI
└── package.json
```

## The 6-Stage Roadmap

**Stage 1: Foundation (Sessions 1-6)**
Core skills, environment setup, Git workflows

**Stage 2: Basic Agents (Sessions 7-9)**
Sub-agents, hooks introduction

**Stage 3: Validation Patterns (Sessions 10-12)**
Self-validating agents, testing

**Stage 4: Multi-Agent Workflows (Sessions 13-15)**
Parallel agents, orchestration

**Stage 5: Production Patterns (Sessions 16-18)**
Error handling, monitoring, deployment

**Stage 6: Advanced Topics (Sessions 19-20)**
Custom plugins, advanced patterns

## Session JSON Schema

```json
{
  "sessionNumber": 1,
  "date": "2026-01-25",
  "status": "complete",
  "stage": 1,
  "title": "Session Title",
  "skillsDemonstrated": ["skill1", "skill2"],
  "openQuestions": ["question1"],
  "nextObjectives": ["objective1", "objective2"],
  "filesModified": ["file1.js", "file2.md"],
  "keyInsights": ["insight1", "insight2"],
  "duration": "2 hours"
}
```

## Development

**Install dependencies:**
```bash
npm install
```

**Start dev server:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

## Key Features

✅ **Session Continuity** - Never lose context between sessions
✅ **Visual Progress** - See where you are in the roadmap
✅ **Dual Storage** - JSON for machines, Markdown for humans
✅ **Offline First** - No external dependencies
✅ **Git-Friendly** - All files are version-controlled

## Quality Gates

Progress is gated by demonstrated skills. The system tracks which skills you've practiced and evaluates readiness to advance stages.

See `data/quality-gates.json` for criteria.

## For More Information

- See `CLAUDE.md` for full project context
- See `docs/plans/` for feature planning documents
- See `docs/brainstorms/` for design discussions

---

**Built with:**
- React + Vite
- File-first architecture
- Claude Code workflows