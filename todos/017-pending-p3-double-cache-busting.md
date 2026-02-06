---
status: pending
priority: p3
issue_id: "017"
tags: [code-review, quality]
---

# Double Cache-Busting

## Problem Statement
Cache-busting is applied at both the client and server levels:
- Client: `fetchOptions` with `cache: 'no-store'` and `Cache-Control: no-cache` header
- Server: `res.setHeader('Cache-Control', 'no-store')` in Vite middleware

Only one layer is needed. The server-side header is sufficient.

## Location
- `src/utils/dataLoader.js:10-13` (client-side cache busting)
- `vite.config.js:17` (server-side cache busting)

## Proposed Fix
Remove the client-side `fetchOptions` object and just use `fetch(url)`. The server already sends the correct `Cache-Control` header.

## Acceptance Criteria
- [ ] Single layer of cache control
- [ ] Data still refreshes on browser reload
