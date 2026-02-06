---
status: pending
priority: p2
issue_id: "002"
tags: [code-review, security]
---

# Dev Server Bound to All Network Interfaces

## Problem Statement
The Vite dev server was configured with `host: '0.0.0.0'`, exposing it to the entire local network. Any device on the same WiFi/LAN could access the development server and its data.

## Location
- `vite.config.js:32`

## Status
**FIXED** as part of P1 fix - changed to `host: 'localhost'`.

## Acceptance Criteria
- [ ] Server only accessible at `localhost:5174`, not from other devices
