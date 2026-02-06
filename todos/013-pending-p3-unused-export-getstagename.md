---
status: pending
priority: p3
issue_id: "013"
tags: [code-review, quality]
---

# Unused Export: getStageName

## Problem Statement
`getStageName()` is exported from `dataLoader.js` but never imported or used anywhere in the codebase. Dead code.

## Location
- `src/utils/dataLoader.js:82-85`

## Proposed Fix
Remove the function entirely.

## Acceptance Criteria
- [ ] `getStageName` removed from `dataLoader.js`
- [ ] No import errors elsewhere
