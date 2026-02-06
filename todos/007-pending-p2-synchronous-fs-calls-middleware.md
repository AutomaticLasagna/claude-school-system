---
status: pending
priority: p2
issue_id: "007"
tags: [code-review, performance]
---

# Synchronous File System Calls in Middleware

## Problem Statement
The Vite middleware uses `fs.existsSync()` and `fs.statSync()` in the request handler, blocking the Node.js event loop on every `/data/*` request. While impact is minimal for a dev server with one user, this is an anti-pattern.

## Location
- `vite.config.js:15` (existsSync + statSync)

## Proposed Fix
Use async alternatives:
```js
server.middlewares.use('/data', async (req, res, next) => {
  // ... path traversal check ...
  try {
    const stat = await fs.promises.stat(filePath)
    if (stat.isFile()) {
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Cache-Control', 'no-store')
      fs.createReadStream(filePath).pipe(res)
    } else {
      next()
    }
  } catch {
    next()
  }
})
```

## Acceptance Criteria
- [ ] No synchronous fs calls in request handler
- [ ] Dashboard still loads correctly
