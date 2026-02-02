# Claude School System

A meta-learning system for tracking progress through the 6-stage agentic engineering roadmap.

## Project Purpose

This repository is a **learning project** where a complete beginner is learning software engineering through Claude Code. The system tracks:
- Progress through a 6-stage roadmap (20 sessions total)
- Quality gates that must be passed to advance
- Session continuity between learning sessions

## Key Files

- `data/progress.json` - Current roadmap position (stage, session, completed sessions)
- `data/quality-gates.json` - Gate definitions and criteria
- `data/sessions/session-{NN}.json` - Machine-readable session summaries
- `logs/session-{NN}.md` - Human-readable session narratives
- `skills/start-session.md` - Skill for loading session context

## Session Workflow

### Starting a Session

Use `/start-session` to load context from previous sessions. This reads progress data and presents a summary of where we left off.

**What happens:**
1. Reads `data/progress.json` to get current stage and session number
2. Loads previous session's JSON for context (nextObjectives, openQuestions, keyInsights)
3. Checks if current session exists (resume) or creates new session file
4. Outputs formatted summary showing roadmap position and today's objectives

### During a Session

- Work through learning objectives
- Practice skills (recorded in skillsDemonstrated)
- Note any blockers or questions (recorded in openQuestions)
- Modify files as needed (tracked in filesModified)

### Ending a Session

When the human says "end session", "let's wrap up", "wrap this up", or similar:

**Step 1: Generate Session JSON**

Create/update `data/sessions/session-{N}.json` with:
```json
{
  "sessionNumber": N,
  "date": "YYYY-MM-DD",
  "status": "complete",
  "stage": {currentStage},
  "title": "Brief session title",
  "skillsDemonstrated": ["skill1", "skill2"],
  "openQuestions": ["question1"],
  "nextObjectives": ["objective1", "objective2"],
  "filesModified": ["file1", "file2"],
  "keyInsights": ["insight1", "insight2"],
  "duration": "X hours"
}
```

**Field guidelines:**
- `title`: Brief description of session focus (e.g., "Git Fundamentals")
- `skillsDemonstrated`: List skills actually practiced this session
- `openQuestions`: Any unresolved questions or blockers (can be empty array)
- `nextObjectives`: Goals for next session (2-4 items)
- `filesModified`: Relative paths from repo root
- `keyInsights`: Notable learnings or realizations (2-5 items)
- `duration`: Approximate time spent

**Step 2: Generate Session Log**

Create `logs/session-{N}.md` following the established format:
```markdown
# Session N: [Title]

**Date:** [Date]
**Duration:** [Duration]
**Status:** ✓ Complete

## Objectives
[What we set out to accomplish]

## What I Learned
[Detailed narrative of concepts and skills]

## Key Insights
[Notable realizations]

## Challenges Overcome
[Problems encountered and solved]

## Files Created/Modified
[List of files]

## Next Session Preview
[Brief preview of what's next]
```

**Step 3: Update Progress**

Update `data/progress.json`:
- Add `N` to `completedSessions` array
- Increment `currentSession` by 1
- Update `currentStage` if moving to new stage

Example:
```json
{
  "currentStage": 1,
  "currentSession": 3,
  "completedSessions": [1, 2]
}
```

**Step 4: Evaluate Quality Gates (If Applicable)**

Check if approaching a gate threshold. If the learner is near a quality gate, evaluate readiness based on demonstrated skills.

## Teaching Context

### The Learner

- **Experience level:** Complete programming beginner
- **Learning style:** Prefers comprehensive explanations with the "why" before "how"
- **Values:** Understanding principles over memorizing commands
- **Environment:** Windows 11, Git Bash, Cursor IDE, Node.js v24.13.0

### The 6 Stages

**Stage 1: Foundation (Sessions 1-6)**
- Core skills and environment setup
- Git workflows, basic CLI apps
- File I/O, JSON persistence

**Stage 2: Basic Agents (Sessions 7-9)**
- First sub-agents, hooks introduction
- Task delegation patterns

**Stage 3: Validation Patterns (Sessions 10-12)**
- Self-validating agents and testing
- Quality assurance automation

**Stage 4: Multi-Agent Workflows (Sessions 13-15)**
- Parallel agents and orchestration
- Complex workflow coordination

**Stage 5: Production Patterns (Sessions 16-18)**
- Error handling, monitoring, deployment
- Real-world robustness

**Stage 6: Advanced Topics (Sessions 19-20)**
- Custom plugins and advanced patterns
- Integration and extensibility

## Quality Gate Philosophy

"Don't skip stages. Each stage builds essential skills for the next."

Gates are unlocked by demonstrating specific criteria across sessions. The system tracks which skills have been demonstrated and evaluates gate readiness at session end.

### Quality Gate Structure

Each gate has:
- **Criteria:** Specific skills or understanding to demonstrate
- **Assessment method:** How readiness is evaluated
- **Threshold:** When the gate unlocks

See `data/quality-gates.json` for full definitions.

## Development Notes

### React Dashboard

The project includes a React dashboard that visualizes progress:
- Displays 6-stage roadmap with current position
- Shows progress percentage (completed/total sessions)
- Displays latest session summary

**Running the dashboard:**
```bash
npm install
npm run dev
```

Dashboard loads data from `data/` directory via Vite configuration.

### File Structure

```
claude-school-system/
├── data/
│   ├── progress.json
│   ├── quality-gates.json
│   └── sessions/
│       ├── session-01.json
│       ├── session-02.json
│       └── ...
├── logs/
│   ├── session-01.md
│   ├── session-02.md
│   └── ...
├── skills/
│   └── start-session.md
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── RoadmapStages.jsx
│   │   └── SessionSummary.jsx
│   └── utils/
│       └── dataLoader.js
├── docs/
│   ├── brainstorms/
│   └── plans/
├── CLAUDE.md (this file)
├── README.md
└── package.json
```

## Git Workflow

This project uses Git worktrees for feature development:
- Main branch: stable, deployable code
- Feature branches: isolated development in `.worktrees/` directory
- Commits: conventional format with co-authorship attribution

## Context Priority

When Claude reads this file, prioritize:
1. **Session workflow** - How to start/end sessions properly
2. **Teaching context** - The learner's experience level and style
3. **Quality gates** - Don't skip stages or rush progression
4. **Data integrity** - Ensure JSON files are valid and complete
