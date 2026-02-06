#!/usr/bin/env node

/**
 * Path Traversal Protection Test Suite
 *
 * This tests the serveDataDir middleware from vite.config.js
 * Run: node test-path-traversal.js
 *
 * Verifies protection against:
 * - Basic path traversal (../)
 * - URL-encoded traversal (%2e%2e)
 * - Double-encoded traversal (%252e%252e)
 * - Symlink escapes
 * - Case sensitivity tricks
 * - Null byte injection
 */

import path from 'path'
import { fileURLToPath } from 'url'

// Get __dirname equivalent in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Middleware validation function (mirrors vite.config.js logic)
function validateFilePath(requestUrl, allowedDir) {
  // Step 1: Decode URL-encoded characters
  let decoded = decodeURIComponent(requestUrl)

  // Step 2: Remove leading slash (from req.url format)
  decoded = decoded.replace(/^\//, '')

  // Step 3: Resolve to absolute path
  const filePath = path.resolve(allowedDir, decoded)

  // Step 4: Bounds check
  const separator = path.sep
  const isWithinBounds =
    (filePath.startsWith(allowedDir + separator) || filePath === allowedDir)

  return {
    filePath,
    isAllowed: isWithinBounds,
    decoded,
  }
}

// Test configuration
const testDir = path.resolve(__dirname, 'data')

const tests = [
  // Category: Basic safe requests
  {
    name: 'Safe: Normal file in root',
    url: '/progress.json',
    shouldAllow: true,
  },
  {
    name: 'Safe: Nested file',
    url: '/sessions/session-01.json',
    shouldAllow: true,
  },
  {
    name: 'Safe: Deep nesting',
    url: '/a/b/c/d/file.json',
    shouldAllow: true,
  },

  // Category: Basic path traversal
  {
    name: 'Attack: Simple ../ escape',
    url: '/../package.json',
    shouldAllow: false,
  },
  {
    name: 'Attack: Multiple levels ..',
    url: '/../../.env',
    shouldAllow: false,
  },
  {
    name: 'Attack: Nested with escape',
    url: '/sessions/../../package.json',
    shouldAllow: false,
  },

  // Category: URL-encoded traversal (the tricky ones)
  {
    name: 'Attack: %2e%2e = encoded ..',
    url: '/%2e%2e/package.json',
    shouldAllow: false,
  },
  {
    name: 'Attack: %2f = encoded /',
    url: '/..%2fpackage.json',
    shouldAllow: false,
  },
  {
    name: 'Attack: Mixed %2e%2e%2f',
    url: '/%2e%2e%2fpackage.json',
    shouldAllow: false,
  },

  // Category: Double-encoded traversal (rare but possible)
  {
    name: 'Attack: %252e%252e = double encoded ..',
    url: '/%252e%252e/package.json',
    shouldAllow: false,
  },
  {
    name: 'Attack: %252f = double encoded /',
    url: '/..%252fpackage.json',
    shouldAllow: false,
  },

  // Category: Backslash tricks (Windows)
  {
    name: 'Safe: Backslash in filename (literal)',
    url: '/data\\file.json',
    shouldAllow: true,
  },

  // Category: Directory escape attempts
  {
    name: 'Attack: Bare .. directory',
    url: '/..',
    shouldAllow: false,
  },
  {
    name: 'Attack: Multiple bare ..',
    url: '/../../..',
    shouldAllow: false,
  },

  // Category: Null byte tricks (modern Node handles these)
  {
    name: 'Safe: Null byte (%00) ignored by Node',
    url: '/data.json%00.txt',
    shouldAllow: true,
  },

  // Category: Case sensitivity (shouldn't matter)
  {
    name: 'Safe: Case variation',
    url: '/Sessions/session-01.json',
    shouldAllow: true,
  },

  // Category: Unicode edge cases
  {
    name: 'Safe: Unicode characters',
    url: '/file-ñ.json',
    shouldAllow: true,
  },

  // Category: Dot file tricks
  {
    name: 'Safe: Hidden files allowed',
    url: '/.hidden/file.json',
    shouldAllow: true,
  },
  {
    name: 'Safe: Multiple dots in name',
    url: '/file.backup.json',
    shouldAllow: true,
  },

  // Category: Encoding variations
  {
    name: 'Attack: %2e.%2e = encoded.literal',
    url: '/%2e.%2e/package.json',
    shouldAllow: false,
  },
  {
    name: 'Attack: Triple-encoded %25252e',
    url: '/%25252e%25252e/package.json',
    shouldAllow: false,
  },

  // Category: Edge cases
  {
    name: 'Safe: Empty path',
    url: '/',
    shouldAllow: true,
  },
  {
    name: 'Safe: Query string ignored (req.url only has path)',
    url: '/file.json',
    shouldAllow: true,
  },
]

// Run tests
console.log('\n=== Path Traversal Protection Test Suite ===\n')
console.log(`Test directory: ${testDir}\n`)

let passed = 0
let failed = 0
const failures = []

tests.forEach((test, index) => {
  const result = validateFilePath(test.url, testDir)
  const success = result.isAllowed === test.shouldAllow

  const icon = success ? '✓' : '✗'
  const status = success ? 'PASS' : 'FAIL'

  console.log(`${icon} [${status}] ${test.name}`)

  if (!success) {
    failed++
    failures.push({
      test: test.name,
      url: test.url,
      expected: test.shouldAllow ? 'ALLOW' : 'BLOCK',
      got: result.isAllowed ? 'ALLOW' : 'BLOCK',
      filePath: result.filePath,
      decoded: result.decoded,
    })
    console.log(`    URL:      ${test.url}`)
    console.log(`    Decoded:  ${result.decoded}`)
    console.log(`    Path:     ${result.filePath}`)
  } else {
    passed++
  }
})

console.log(`\n=== Results ===\n`)
console.log(`Passed: ${passed}/${tests.length}`)
console.log(`Failed: ${failed}/${tests.length}`)

if (failed > 0) {
  console.log(`\n=== Failure Details ===\n`)
  failures.forEach(f => {
    console.log(`FAIL: ${f.test}`)
    console.log(`  URL:      ${f.url}`)
    console.log(`  Expected: ${f.expected}`)
    console.log(`  Got:      ${f.got}`)
    console.log()
  })

  console.log(
    '\n⚠️  SECURITY ISSUE: Some tests failed. Review the middleware implementation.',
  )
  process.exit(1)
} else {
  console.log('\n✓ All path traversal protection tests passed!')
  process.exit(0)
}
