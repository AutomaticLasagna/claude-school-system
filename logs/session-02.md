# Session 2: Git Workflows & CSMLS Foundation

**Date:** January 30, 2026  
**Duration:** ~2 hours  
**Status:** ✓ Complete

## Objectives

- Learn Git fundamentals (repositories, commits, staging, remotes)
- Create first real repository (claude-school-system)
- Push code to GitHub
- Set up CSMLS project structure and initial data files

## What I Learned

### Git Fundamentals
- **Three-stage workflow:** Working Directory → Staging Area → Local Repo → Remote Repo
- **Core commands:** `git add`, `git commit`, `git push`, `git status`, `git log`
- **Repository setup:** `git init`, `git remote add origin`
- **Branch management:** Renamed master to main (modern standard)
- **Commit amendments:** `git commit --amend` to fix messages and author info

### Git Mental Model
- Staging area = buffer zone to choose what goes in next snapshot
- Commits = complete snapshots, not just diffs
- Local vs remote = can work offline, push later
- Branch tracking = Git remembers where to push/pull after initial `-u` flag

### GitHub Integration
- Created remote repository
- Connected local repo with `git remote add origin`
- Configured Git identity with privacy-focused noreply email
- Set up branch tracking for streamlined workflow
- Repository URL: https://github.com/AutomaticLasagna/claude-school-system

### Development Environment
- Integrated Git Bash into Cursor terminal (`` Ctrl+` ``)
- Learned bash vs PowerShell differences
- Comfortable with terminal shortcuts (Shift+Insert for paste)

### CSMLS Foundation
- Created project structure: data/, logs/, src/
- Built progress.json (tracks roadmap position)
- Built quality-gates.json (defines advancement criteria)
- Documented Session 1 in logs/session-01.md

## Key Insights

1. **Staging area gives control** - Commit exactly what you want, when you want it
2. **Commits are local first** - Can make many commits offline, push all at once
3. **Git is fundamental for plugin** - `/workflows:work` uses Git worktrees (branches)
4. **Security matters** - Always review what's being committed, use noreply emails
5. **Understanding beats memorization** - Knowing WHY makes commands make sense

## Commands Mastered

**Status & History:**
- `git status` - Check what's changed
- `git log` - View commit history
- `git log --oneline` - Condensed history view

**Core Workflow:**
- `git add <file>` / `git add .` (git add period is add all changes) - Stage changes
- `git commit -m "message"` - Create snapshot
- `git push` - Upload to GitHub

**Setup & Configuration:**
- `git init` - Initialize repository
- `git remote add origin <url>` - Connect to GitHub
- `git branch -M main` - Rename branch
- `git config --global user.name/email` - Set identity

**Fixing Mistakes:**
- `git commit --amend -m "..."` - Fix commit message
- `git commit --amend --reset-author` - Update author

## Understanding Checks Passed

**Question:** What's the difference between staging area and commit?
**Answer:** Staging area is the buffer zone where changes wait before becoming a commit. Commits are the actual snapshots saved to history.

**Question:** How to commit only 2 of 5 edited files?
**Answer:** Use `git add file1 file2` to stage only those files, then commit.

**Question:** What if laptop dies?
**Answer:** `git clone` the repository from GitHub - gets entire history, not just files.

## Challenges Overcome

- Terminal wasn't accepting input (was scrolled up in output)
- Unclosed quote in bash command (learned to use Ctrl+C to cancel)
- Wrong Git identity initially (fixed with config and --reset-author)
- Typo in commit message (learned --amend to fix)

## Security & Privacy Principles Established 🔒

**Critical guidelines set:**
- Never commit passwords, API keys, personal info, credentials
- Always use `.gitignore` for sensitive files
- Review what's being committed before pushing
- Use privacy-focused noreply emails
- Security takes priority over convenience

## Quality Gate Progress

**Git Workflows Gate:** 85% Complete
- ✓ Understand commits and staging
- ✓ Can create and push to remote repository
- ✓ Understand branches (concept covered)
- ✓ Know how to check repository status
- ⏳ Practice creating branches (Session 3 with plugin)

## Files Created
```
claude-school-system/
├── data/
│   ├── progress.json
│   └── quality-gates.json
├── logs/
│   ├── session-01.md
│   └── session-02.md (this file)
├── src/
└── README.md
```

**GitHub Repository:** 4 commits total (including this session log)

## Next Session Preview

**Session 3:** Install Compound Engineering Plugin & Plan CSMLS V1
- Install plugin from marketplace
- Run `/workflows:plan` for detailed spec
- Learn Plan → Work → Review → Compound lifecycle
- Create first Git branch (hands-on with worktrees)
- Experience deep planning with parallel research agents

**This completes Git quality gate and unlocks plugin capabilities!**

---

*Session completed: January 30, 2026*  
*Next: Plugin installation and CSMLS planning*