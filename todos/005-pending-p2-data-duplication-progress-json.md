---
status: pending
priority: p2
issue_id: "005"
tags: [code-review, architecture, data-integrity]
---

# Data Duplication in progress.json

## Problem Statement
`completedSessions` is stored in two places within `data/progress.json`:
1. Root level: `progress.completedSessions` (line 4-9)
2. Inside each stage: `stages[0].completedSessions` (line 82-87)

These can fall out of sync. The root-level array is the authoritative source, but the stage-level copy exists independently.

## Location
- `data/progress.json:4-9` (root completedSessions)
- `data/progress.json:82-87` (stage-level completedSessions)

## Proposed Fix
Option A: Remove stage-level `completedSessions` and derive it from root + `sessionDetails` keys.
Option B: Keep both but add a validation step in session-end workflow to ensure consistency.

**Recommendation:** Option A - single source of truth. The `RoadmapStages.jsx` component already derives completion from `sessionDetails` keys, so the stage-level `completedSessions` is unused by the frontend.

## Acceptance Criteria
- [ ] Single source of truth for completed sessions
- [ ] Dashboard still shows correct completion per stage
- [ ] Session end workflow maintains consistency
