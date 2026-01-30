# Session 1: Environment Setup & First Application

**Date:** January 25, 2026  
**Duration:** ~2 hours  
**Status:** ✓ Complete

## Objectives

- Set up native Windows development environment
- Install and configure essential tools
- Build first CLI application to learn fundamentals

## What I Learned

### Environment Setup
- Migrated from VM to native Windows for better performance
- Installed Git for Windows, nvm-windows, Node.js v24.13.0
- Configured Cursor IDE with Claude Code integration

### Programming Fundamentals
- `process.argv` for command-line arguments (and why `.slice(2)`)
- File system persistence with `fs.readFileSync` and `fs.writeFileSync`
- Array methods: `push()`, `filter()`, `find()`
- JSON serialization for data storage

### Project: task-tracker
Built a working CLI with CRUD operations:
- Add tasks
- List all tasks
- Mark tasks complete
- Delete tasks

## Key Insights

1. **VM was unnecessary complexity** - Native Windows is faster and simpler for learning
2. **"Unicycle before flaming swords"** - Master one skill at a time
3. **Ordered feature lists** prevent Claude Code from building everything at once
4. **CLAUDE.md files** provide teaching context for AI tools

## Challenges Overcome

- VM crashes forcing migration to native environment
- Understanding inverse filter logic for delete operation
- Deciding between GitHub Projects vs separate task tracker

## Files Created

- `E:\Claude Code\learning\task-tracker\package.json`
- `E:\Claude Code\learning\task-tracker\index.js`
- `E:\Claude Code\learning\task-tracker\tasks.json`
- `E:\Claude Code\learning\task-tracker\CLAUDE.md`

## Next Session Preview

Git workflows, GitHub setup, and CSMLS foundation