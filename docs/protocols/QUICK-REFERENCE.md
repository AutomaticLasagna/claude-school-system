# Path Traversal Prevention: Quick Reference Card

Print this. Put it next to your desk. Use it every time you write file-serving code.

---

## The Safe Pattern (Copy-Paste Ready)

```javascript
import path from 'path'
import fs from 'fs'

function serveFile(req, allowedDir) {
  // STEP 1: Decode URL-encoded characters first
  const decoded = decodeURIComponent(req.url).replace(/^\//, '')

  // STEP 2: Normalize and expand .. or .
  const filePath = path.resolve(allowedDir, decoded)

  // STEP 3: Verify path stays within allowed directory
  const separator = path.sep
  if (!filePath.startsWith(allowedDir + separator) && filePath !== allowedDir) {
    return { error: 'Forbidden', status: 403 }
  }

  // STEP 4: Verify it's a file, not directory or symlink
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return { error: 'Not found', status: 404 }
  }

  return { filePath, status: 200 }
}
```

Copy this, customize the variable names, done.

---

## The Checklist (Memorize This)

When writing file-serving code, verify:

```
□ Decode with decodeURIComponent()
□ Resolve with path.resolve() (not path.join())
□ Bounds check with startsWith(dir + path.sep)
□ Type check with isFile() (not isDirectory)
□ Network: localhost (not 0.0.0.0)
```

Missing ANY of these = potential vulnerability.

---

## Common Attacks (What You're Protecting Against)

| Attack | Example | Prevention |
|--------|---------|-----------|
| Path traversal | `../../../.env` | Bounds check |
| URL encoding | `%2e%2e` (encoded `..`) | `decodeURIComponent()` |
| Double encoding | `%252e%252e` | Decode, then verify |
| Symlink escape | `/data/link → /etc/` | Check symlink targets |
| Network exposure | Server on `0.0.0.0` | Bind to `localhost` |

---

## Before/After Comparison

### ❌ VULNERABLE
```javascript
const filePath = path.join(cwd, 'data', req.url)
if (fs.existsSync(filePath)) {
  fs.createReadStream(filePath).pipe(res)
}
// Missing: decode, bounds check, type check, network binding
```

### ✓ SAFE
```javascript
const decoded = decodeURIComponent(req.url)
const filePath = path.resolve(allowedDir, decoded)
if (!filePath.startsWith(allowedDir + path.sep)) {
  return 403
}
if (fs.statSync(filePath).isFile()) {
  fs.createReadStream(filePath).pipe(res)
}
// Has: decode, normalization, bounds check, type check
// Plus: localhost binding in server config
```

---

## Why Each Step Matters

### Step 1: Decode First
```
Without: /data/%2e%2e/package.json → looks safe (contains /data)
With:    /data/%2e%2e → decode → /data/.. → looks dangerous
```
**Catches:** URL encoding tricks, hex encoding, double encoding

### Step 2: Normalize Path
```
path.join('/app/data', '../../.env')
  → /app/data/../../.env → /app/.env (ESCAPED!)

path.resolve('/app/data', '../../.env')
  → /app/.env (ESCAPED, but we catch it in step 3!)
```
**Why:** path.resolve() handles `..` correctly, so step 3 can catch escapes

### Step 3: Bounds Check
```
BAD:   filePath.includes(allowedDir)
       /data-backup includes /data ✓ (FALSE POSITIVE!)

GOOD:  filePath.startsWith(allowedDir + path.sep)
       /data-backup does NOT start with /data/ ✓
```
**Catches:** Directory name prefix tricks, boundary confusion

### Step 4: Type Check
```
Even if path is valid, could be:
- Directory (attackers may want to list contents)
- Symlink (symlink could point outside bounds)
- Device file (could read hardware state)
- FIFO (could block forever)

Solution: fs.statSync().isFile()
```
**Catches:** Directory traversal, symlink escapes, special file access

---

## Network Binding

### Before
```javascript
server: {
  host: '0.0.0.0',  // ❌ ACCESSIBLE FROM ANYWHERE
  port: 5174
}
```
Attacker on same network can reach your dev server.

### After
```javascript
server: {
  host: 'localhost',  // ✓ ONLY FROM YOUR COMPUTER
  port: 5174
}
```
Only you can access it. Network attacks can't reach it.

---

## Test Your Code

### The One Test You Must Run
```bash
node test-path-traversal.js
```

Should output:
```
✓ All path traversal protection tests passed!
```

If not:
```
✗ Some tests failed. Review the middleware implementation.
```

Stop, fix, re-run.

---

## One-Minute Review

Before committing file-serving code:

```javascript
// 1. User input is being decoded?
const decoded = decodeURIComponent(req.url)  // ✓

// 2. Using path.resolve(), not path.join()?
const filePath = path.resolve(allowedDir, decoded)  // ✓

// 3. Bounds check with separator?
if (!filePath.startsWith(allowedDir + path.sep)) return 403  // ✓

// 4. Checking it's a file?
if (!fs.statSync(filePath).isFile()) return 404  // ✓

// 5. Network restricted?
server: { host: 'localhost' }  // ✓
```

All yes? Commit it.

---

## Dangerous Functions (Don't Do This)

```javascript
// ❌ path.join() without bounds check
path.join(dir, userInput)

// ❌ String concatenation
dir + userInput

// ❌ Bounds check without separator
filePath.includes(allowedDir)

// ❌ No type check
fs.existsSync(filePath)  // Doesn't verify it's a file

// ❌ No decode
const filePath = path.resolve(dir, req.url)  // req.url is encoded!

// ❌ Network binding to 0.0.0.0
server: { host: '0.0.0.0' }
```

---

## The Real-World Story

This vulnerability was found in your Vite middleware:
- Initial code: Only `path.join()`, no checks
- First fix: Added bounds check, but FORGOT to decode
- Attack: Attacker used `%2e%2e` (encoded `..`) and bypassed bounds check
- Second fix: Added `decodeURIComponent()` BEFORE all path operations
- Result: Now safe against encoding tricks

**Lesson:** One fix isn't enough. Always verify all four steps.

---

## Code Review Shortcut

Reviewing file-serving code? Check these 5 things:

1. `decodeURIComponent()` exists and happens FIRST?
2. `path.resolve()` used, not `path.join()`?
3. `startsWith(dir + path.sep)` bounds check?
4. `.isFile()` type check?
5. Server on `localhost`, not `0.0.0.0`?

Any "no" = ask for changes before approval.

---

## Remember

- **Decode first** - Catches encoding tricks
- **Resolve second** - Normalizes `..` paths
- **Verify third** - Catches escaped paths
- **Check type fourth** - Catches special files
- **Bind locally** - Prevents network attacks

Do all five, every time. It becomes muscle memory.

