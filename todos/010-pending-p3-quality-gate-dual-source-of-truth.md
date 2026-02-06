---
status: pending
priority: p3
issue_id: "010"
tags: [code-review, data-integrity, architecture]
---

# Quality Gate Status Tracked in Two Files

## Problem Statement
Quality gate statuses are stored in two files with inconsistent values:
- `data/progress.json:353-361` has `qualityGates.gitWorkflows.status: "complete"`
- `data/quality-gates.json:8` has `gates[0].status: "in-progress"`

No single source of truth. An agent or the dashboard could read the wrong one.

## Location
- `data/progress.json:353-361`
- `data/quality-gates.json`

## Proposed Fix
Pick one file as authoritative. Recommendation: keep gate definitions in `quality-gates.json` (criteria, thresholds) and status in `progress.json` (dynamic state). Remove `status` from `quality-gates.json`.

## Acceptance Criteria
- [ ] Single source of truth for gate status
- [ ] Dashboard reads from the correct source
- [ ] Session end workflow updates the correct source
