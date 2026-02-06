---
status: pending
priority: p2
issue_id: "003"
tags: [code-review, security]
---

# Overly Permissive fs.allow Configuration

## Problem Statement
`vite.config.js` sets `fs.allow: ['..']` which loosens Vite's built-in file system access restrictions, allowing it to serve files above the project root. This weakens Vite's security sandbox.

## Location
- `vite.config.js:34-36`

## Proposed Fix
Remove the `fs.allow` setting entirely. The custom middleware handles `data/` serving, so Vite's default restrictions should be sufficient.

```js
server: {
    host: 'localhost',
    port: 5174
}
```

## Acceptance Criteria
- [ ] Dashboard still loads correctly without `fs.allow: ['..']`
- [ ] No Vite errors about file access
