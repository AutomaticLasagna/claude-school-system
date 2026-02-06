---
title: Path Traversal Vulnerability in Custom Vite Middleware
category: security-issues
module: vite-config
tags: [path-traversal, vite, middleware, url-encoding, dev-server]
severity: critical
date_discovered: 2026-02-05
date_resolved: 2026-02-05
symptoms:
  - Arbitrary file read via ../  sequences in URL
  - URL-encoded %2e%2e bypasses naive path checks
  - Dev server exposed to entire LAN via 0.0.0.0 binding
affected_files:
  - vite.config.js
---

# Path Traversal Vulnerability in Custom Vite Middleware

## Problem Symptom

The custom Vite plugin `serveDataDir()` served files from the `data/` directory at `/data/*` URLs. An attacker could read **any file on the machine** by using `../` path traversal sequences in the URL.

Three compounding issues:
1. **No path bounds checking** - `path.join(cwd, 'data', req.url)` resolves `../` and serves files outside `data/`
2. **Server bound to `0.0.0.0`** - Exposed to every device on the local network
3. **`fs.allow: ['..']`** - Weakened Vite's built-in filesystem sandbox

## Root Cause

`path.join()` resolves relative path segments (`..`) but does **not** prevent the resulting path from escaping the intended directory. There was no validation that the resolved file path stayed within `data/`.

```js
// VULNERABLE - no bounds checking
const filePath = path.join(process.cwd(), 'data', req.url)
// req.url = '/../package.json' → resolves to /project/package.json (OUTSIDE data/)
```

## Investigation Steps

### Step 1: Code Review Identified the Vulnerability
The `/workflows:review` command with 7 parallel agents flagged `vite.config.js:13` as a P1 critical security issue.

### Step 2: First Fix Attempt
Added `path.resolve()` with bounds checking:
```js
const dataDir = path.resolve(process.cwd(), 'data')
const filePath = path.resolve(dataDir, req.url.replace(/^\//, ''))
if (!filePath.startsWith(dataDir + path.sep) && filePath !== dataDir) {
  res.statusCode = 403
  res.end('Forbidden')
  return
}
```
Also changed `host: '0.0.0.0'` to `host: 'localhost'` and removed `fs.allow: ['..']`.

### Step 3: Browser Testing Revealed URL Normalization
Browsers resolve `../` before sending the request. Navigating to `localhost:5174/data/../package.json` redirects to `localhost:5174/package.json` in the address bar, bypassing the middleware entirely. **Browsers can't test path traversal** - you need programmatic tools.

### Step 4: Programmatic Testing Found a Bypass
Using Node.js `http.get()` with raw paths revealed:
```
/data/%2e%2e/package.json  → 200 OK (BYPASSED!)
/data/..%2f/package.json   → 200 OK (BYPASSED!)
```
URL-encoded `%2e%2e` (which decodes to `..`) was not being decoded before path resolution, so `path.resolve` treated it as a literal directory name `%2e%2e` - but somewhere in the chain it got decoded and resolved to `..`.

### Step 5: Second Fix - Decode Before Resolve
Added `decodeURIComponent()` before path resolution:
```js
const decoded = decodeURIComponent(req.url).replace(/^\//, '')
const filePath = path.resolve(dataDir, decoded)
```

### Step 6: Final Verification
```
URL-encoded .. traversal:    403 Forbidden ✓
Mixed encoded traversal:     403 Forbidden ✓
Fully encoded traversal:     403 Forbidden ✓
Legitimate /data/progress:   200 OK ✓
```

## Working Solution

```js
// vite.config.js - serveDataDir() middleware
server.middlewares.use('/data', (req, res, next) => {
  const dataDir = path.resolve(process.cwd(), 'data')
  // Decode URL to catch encoded traversal like %2e%2e (encoded ..)
  const decoded = decodeURIComponent(req.url).replace(/^\//, '')
  const filePath = path.resolve(dataDir, decoded)

  // Prevent path traversal attacks
  if (!filePath.startsWith(dataDir + path.sep) && filePath !== dataDir) {
    res.statusCode = 403
    res.end('Forbidden')
    return
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 'no-store')
    fs.createReadStream(filePath).pipe(res)
  } else {
    next()
  }
})
```

Server config:
```js
server: {
  host: 'localhost',  // was '0.0.0.0'
  port: 5174
  // removed: fs: { allow: ['..'] }
}
```

## Why the First Fix Was Incomplete

The first fix used `path.resolve()` + `startsWith()` checking - which correctly blocks `../` in plain text. But it operated on the **raw URL** without decoding. URL encoding (`%2e%2e` = `..`, `%2f` = `/`) creates an equivalent path that bypasses string-level checks but gets decoded by the filesystem or HTTP layer.

**Key lesson:** Always decode user input before validating it. Validation on encoded input is security theater.

## Prevention Checklist

When writing any file-serving middleware:

- [ ] **Decode first** - `decodeURIComponent()` before any path operations
- [ ] **Use `path.resolve()`** not `path.join()` - resolve gives absolute paths for reliable checking
- [ ] **Bounds check** - verify resolved path starts with the allowed directory
- [ ] **Bind to localhost** - never `0.0.0.0` unless you explicitly need LAN access
- [ ] **Test with encoding** - `%2e%2e` (`..`), `%2f` (`/`), double-encoding (`%252e`)
- [ ] **Test programmatically** - browsers normalize URLs, hiding vulnerabilities

## Test Template

```js
// Verify path traversal protection
const http = require('http');
const tests = [
  ['/data/%2e%2e/package.json', 403, 'URL-encoded ..'],
  ['/data/..%2fpackage.json', 403, 'Mixed encoding'],
  ['/data/%2e%2e%2fpackage.json', 403, 'Fully encoded'],
  ['/data/progress.json', 200, 'Legitimate request'],
];
// Each test: http.get with raw path, assert status code
```

## Cross-References

- `todos/001-pending-p1-path-traversal-vulnerability.md` - Original finding
- `todos/002-pending-p2-server-bound-to-all-interfaces.md` - Network exposure
- `todos/003-pending-p2-overly-permissive-fs-allow.md` - Sandbox weakening
- `CLAUDE.md` - Security section ("NEVER include passwords, API keys...")
- `docs/protocols/emergency-procedures.md` - Recovery protocols
- `.claude/hooks/pre_tool_use.py` - Related security hook (blocks dangerous rm commands)

## Key Takeaways

1. **`path.join()` is not a security function** - it resolves paths but doesn't prevent traversal
2. **Always decode before validating** - encoded input bypasses string-level checks
3. **Browsers hide vulnerabilities** - they normalize URLs before sending, making path traversal untestable from the address bar
4. **Defense in depth** - the fix needed path checking AND URL decoding AND network restriction
5. **Test iteratively** - the first fix passed visual inspection but failed programmatic testing
