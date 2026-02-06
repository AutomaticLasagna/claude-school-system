---
status: pending
priority: p3
issue_id: "014"
tags: [code-review, quality]
---

# Over-Engineered Content-Type Checking

## Problem Statement
`dataLoader.js` checks `Content-Type` headers before parsing JSON responses. Since the custom Vite middleware always sets `Content-Type: application/json` and these are local JSON files, this check adds complexity without value.

## Location
- `src/utils/dataLoader.js:28-35` (content-type check for progress.json)
- `src/utils/dataLoader.js:65` (content-type check for session files)

## Proposed Fix
Remove content-type checks. The `.json()` call will throw on non-JSON responses, which the existing try/catch handles.

## Acceptance Criteria
- [ ] Content-type checks removed
- [ ] Error handling still works for malformed responses
