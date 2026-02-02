---
name: start-session
description: Load previous session context to restore learning continuity
triggers:
  - /start-session
  - start a learning session
  - continue learning
---

# /start-session

Load context from the Claude School Meta-Learning System to continue the agentic engineering learning journey.

## What This Skill Does

1. Reads `data/progress.json` to get current stage and session number
2. Reads the previous session's JSON file for context
3. Checks if current session is in-progress (resume) or needs creation
4. Presents a formatted summary to start the session

## Instructions for Claude

When /start-session is triggered:

### Step 1: Read Progress Data

Read `data/progress.json` and extract:
- `currentStage` (which stage of the 6-stage roadmap)
- `currentSession` (session number to work on)
- `completedSessions` (which sessions are done)

### Step 2: Load Previous Session Context

If `currentSession > 1`:
- Read `data/sessions/session-{currentSession - 1}.json`
- Extract: `nextObjectives`, `openQuestions`, `keyInsights`

### Step 3: Check Current Session State

Check if `data/sessions/session-{currentSession}.json` exists:
- **If exists with status="in-progress"**: Resuming interrupted session
- **If exists with status="complete"**: Error state (session already done)
- **If doesn't exist**: New session starting

### Step 4: Create Session File (If New)

If starting new session, create `data/sessions/session-{currentSession}.json`:
```json
{
  "sessionNumber": {currentSession},
  "date": "{today's date YYYY-MM-DD}",
  "status": "in-progress",
  "stage": {currentStage},
  "title": "",
  "skillsDemonstrated": [],
  "openQuestions": [],
  "nextObjectives": [],
  "filesModified": [],
  "keyInsights": []
}
```

### Step 5: Output Session Summary

Present this information to start the session:

```
═══════════════════════════════════════════════════════════════
                    CLAUDE SCHOOL - SESSION {N}
═══════════════════════════════════════════════════════════════

ROADMAP POSITION
  Stage: {currentStage} - {stageName}
  Session: {currentSession} of 20
  Progress: {completedSessions.length}/20 sessions complete

FROM LAST SESSION
  Title: {previousSession.title}
  Date: {previousSession.date}

  Key Insights:
  {list keyInsights}

  Open Questions:
  {list openQuestions or "None"}

TODAY'S OBJECTIVES
  {list previousSession.nextObjectives}

STATUS: {New session | Resuming in-progress session}
═══════════════════════════════════════════════════════════════
```

## Error Handling

**If progress.json missing:**
> "Cannot find progress.json. Please ensure the data/ directory exists with valid progress tracking files."

**If previous session file missing:**
> "Note: Previous session file not found. Starting fresh with no prior context."

**If data/sessions/ directory missing:**
Create it before writing the new session file.
