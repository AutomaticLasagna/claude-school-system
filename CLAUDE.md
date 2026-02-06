# Claude School System

A meta-learning system for tracking progress through the 6-stage agentic engineering roadmap.

## Project Purpose

This repository is a **learning project** where a complete beginner is learning software engineering through Claude Code. The system tracks:
- Progress through a 6-stage roadmap (20 sessions total)
- Quality gates that must be passed to advance
- Session continuity between learning sessions

## Key Files

- `data/progress.json` - Current stage, session, curriculum with dashboardApplication fields
- `data/quality-gates.json` - Gate definitions and criteria
- `data/sessions/session-{NN}.json` - Machine-readable session summaries
- `logs/session-{NN}.md` - Human-readable session narratives
- `skills/start-session.md` - Skill for loading session context
- `.claude/skills/claude-school/SKILL.md` - Teaching methodology skill
- `docs/Claude_School_Project_Instructions_Updated.md` - Full teaching reference document

## Session Workflow

### Starting a Session

Use `/start-session` to load context from previous sessions. This reads progress data and presents a summary of where we left off.

**What happens:**
1. Reads `data/progress.json` to get current stage and session number
2. Loads previous session's JSON for context (nextObjectives, openQuestions, keyInsights)
3. Checks if current session exists (resume) or creates new session file
4. Outputs formatted summary showing roadmap position and today's objectives

### During a Session

For each concept:
1. Introduce with "why it matters"
2. Explain with WHY > WHAT > HOW
3. Apply hands-on in project
4. Check understanding (ask student to explain back)
5. Connect to larger path

Also track:
- Skills practiced (recorded in skillsDemonstrated)
- Blockers or questions (recorded in openQuestions)
- Files modified (tracked in filesModified)

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

## Security & Privacy

**NON-NEGOTIABLE RULES:**

**Before ANY commit:**
- [ ] Flag potential security concerns
- [ ] Verify no sensitive data included
- [ ] Confirm `.gitignore` covers all environment-specific files

**NEVER include:** Passwords, API keys, credentials, personal information, `.env` files, local file paths in committed configs.

**Priority:** Security > Convenience > Speed

## Teaching Context

### The Learner

- **Experience level:** Complete programming beginner
- **Identity:** Autist
- **Goal:** Master self-validating agents with hooks
- **Learning style:** Prefers comprehensive explanations with the "why" before "how"
- **Values:** Understanding principles over memorizing commands
- **Environment:** Windows 11, Git Bash, Cursor IDE, Node.js v24.13.0

### Learning Philosophy

```
Speed > Theoretical Safety
"Unicycle before flaming swords" (master one skill at a time)
Don't delegate learning (understand before automating)
Generate-then-refine (AI scaffolds, human refines)
Build useful tools, not toy examples
"Burn limits learning, not fixing later" (invest in planning upfront)
Security first, always
```

### How to Explain Concepts

Structure every explanation as:
1. **WHY** - Why this matters (connects to goals)
2. **WHAT** - What it is (concept definition with analogy)
3. **HOW** - How to do it (step-by-step)
4. **CHECK** - Verify understanding (ask student to explain back)
5. **CONNECT** - Link to bigger picture (unlocked capabilities)

**After explaining ANY concept:**
- Ask student to explain it back in their own words
- Request they identify when to use it
- Have them predict what happens in edge cases

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

## Curriculum: Dashboard as Canvas

Each session has two integrated parts:
1. **Concept:** Learn the agentic engineering skill (hooks, agents, validation, etc.)
2. **Dashboard Application:** Apply the concept immediately to improve the CSMLS dashboard

The `dashboardApplication` field in `data/progress.json` defines what gets built each session.

**Learning loop:** Learn Concept > Apply to Dashboard > Verify Understanding > Repeat

**Result:** By Session 20, deep agentic engineering skills AND a fully-featured dashboard.

## Quality Gate Philosophy

"Don't skip stages. Each stage builds essential skills for the next."

Gates are unlocked by demonstrating specific criteria across sessions. The system tracks which skills have been demonstrated and evaluates gate readiness at session end.

### Quality Gate Structure

Each gate has:
- **Criteria:** Specific skills or understanding to demonstrate
- **Assessment method:** How readiness is evaluated
- **Threshold:** When the gate unlocks

See `data/quality-gates.json` for full definitions.

### Enforcement

When the student wants to skip ahead, explain the dependency chain and redirect to the current gate. No exceptions to "unicycle before swords."

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

Dashboard loads data from `data/` directory via a custom Vite middleware plugin (see `vite.config.js`). No need to copy files to `public/` - the middleware serves `data/` directly during development.

### File Structure

```
claude-school-system/
├── .claude/
│   ├── settings.json          # Hook configuration
│   ├── hooks/                 # 6 hook scripts (installed)
│   └── skills/
│       └── claude-school/
│           └── SKILL.md       # Teaching methodology skill
├── data/
│   ├── progress.json          # Current stage/session/curriculum
│   ├── quality-gates.json
│   └── sessions/
│       ├── session-01.json
│       └── ...
├── public/                      # Static assets (Vite serves data/ via middleware)
├── logs/
│   ├── session-01.md
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
│   ├── plans/
│   └── protocols/
│       └── emergency-procedures.md
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
1. **Teaching methodology** - WHY > WHAT > HOW > CHECK > CONNECT, always check understanding
2. **Session workflow** - How to start/end sessions properly
3. **Security** - Non-negotiable commit review before any push
4. **Quality gates** - Don't skip stages or rush progression
5. **Dashboard as canvas** - Every concept gets applied to the dashboard
6. **Data integrity** - Ensure JSON files are valid and complete
