---
status: pending
priority: p2
issue_id: "006"
tags: [code-review, performance]
---

# Sequential Session Fetch Waterfall

## Problem Statement
`loadLatestSession()` in `dataLoader.js` tries fetching sessions 20 down to 1 sequentially. With only 4 completed sessions, this makes 16 failed HTTP requests (404s) before finding `session-04.json`. Each failed request adds network latency.

## Location
- `src/utils/dataLoader.js:59-73`

## Proposed Fix
Option A: Use `progress.currentSession - 1` to directly fetch the latest session:
```js
const latestNum = progress.currentSession - 1;
const url = `/data/sessions/session-${String(latestNum).padStart(2, '0')}.json`;
```

Option B: Fetch `progress.json` first (already done), read `completedSessions` to know which sessions exist, then fetch only the last one.

**Recommendation:** Option A - the progress data is already loaded and tells us exactly which session is latest.

## Acceptance Criteria
- [ ] Only 1 session fetch request instead of up to 20
- [ ] Latest session still loads correctly
- [ ] Works when no sessions exist (returns null)
