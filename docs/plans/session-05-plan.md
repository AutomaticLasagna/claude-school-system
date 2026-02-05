# Session 5 Plan: Compound Workflow & Documentation

**Planned Date:** February 6, 2026 (when Claude Code quota resets)  
**Duration:** 2-3 hours  
**Prerequisites:** Session 4 complete ✅, Hooks already installed ✅  
**Stage:** 1 (Foundation) - Final session before Stage 2  

---

## 🎯 Session Objectives

By the end of this session:
1. ☐ Learn the `/workflows:compound` command
2. ☐ Learn the `/workflows:review` command  
3. ☐ Document learnings from Sessions 1-4
4. ☐ Complete the full Plan → Work → Review → Compound cycle
5. ☐ Create knowledge patterns for future sessions
6. ☐ **Dashboard Feature:** Click session → expand to show details

---

## 🖥️ Dashboard Application: Click to Expand

**What you'll build:** Make sessions in the dashboard clickable to show details.

**Concepts you'll learn:**
- React `useState` hook (toggle visibility)
- Conditional rendering (`{isExpanded && <Details />}`)
- Event handlers (`onClick`)
- Component props (passing session data)

**The feature:**
```
Before: Static list of sessions
After:  Click any session → expands to show full details
```

---

## 📚 What is /workflows:compound?

**Purpose:** Document a recently solved problem to compound your team's knowledge.

**Philosophy:** 
> "Each unit of engineering work should make subsequent units of work easier—not harder."

**The Compounding Effect:**
1. First time solving a problem → Research (30 min)
2. Document the solution → (5 min)
3. Next time similar issue → Quick lookup (2 min)
4. Knowledge compounds → You get smarter

---

## 🔄 The Complete Workflow Cycle

You've already done 3 of 4 steps:

```
/workflows:brainstorm  ✅ Session 3 - Generated ideas
        ↓
/workflows:plan        ✅ Session 3 - Created implementation plan
        ↓
/workflows:work        ✅ Session 4 - Built the dashboard
        ↓
/workflows:review      ⏳ Session 5 - Review your work
        ↓
/workflows:compound    ⏳ Session 5 - Document learnings
        ↓
    [REPEAT]
```

**Session 5 completes the cycle!**

---

## 🛠️ What /workflows:compound Does

When you run `/workflows:compound`, it launches **6 parallel agents**:

| Agent | Purpose |
|-------|---------|
| **Context Analyzer** | Extracts problem type, symptoms |
| **Solution Extractor** | Identifies root cause, solution |
| **Related Docs Finder** | Finds related documentation |
| **Prevention Strategist** | Creates prevention strategies |
| **Category Classifier** | Determines file location |
| **Documentation Writer** | Creates the final doc |

**Output:** Creates `docs/solutions/[category]/[filename].md`

---

## 🛠️ What /workflows:review Does

Multi-agent code review using 13+ specialized agents:

| Agent | Focus |
|-------|-------|
| **security-sentinel** | Security vulnerabilities |
| **performance-oracle** | Performance issues |
| **architecture-strategist** | Architectural concerns |
| **code-simplicity-reviewer** | Code complexity |
| **pattern-recognition-specialist** | Anti-patterns |

**Output:** Creates todos in `todos/` directory with prioritized findings.

---

## 📋 Step-by-Step Plan

### Part 1: Review Your Work (45 min)

**Step 1.1: Run /workflows:review on Session 4 work**

```bash
/workflows:review
```

This will:
- Analyze your React dashboard code
- Check for issues with 13+ agents
- Create prioritized findings
- Generate todos for improvements

**Step 1.2: Triage the findings**
- Review P1 (critical) vs P2 vs P3
- Note: This is a learning project, so findings are learning opportunities

### Part 2: Document Your Learnings (45 min)

**Step 2.1: Run /workflows:compound for Session 4**

```bash
/workflows:compound Session 4 - Dashboard data sync issues and recovery
```

This will document:
- The "Failed to load data" problem
- Root cause (data sync between folders)
- The solution (sync files, add cache: no-store)
- Prevention strategies

**Step 2.2: Run /workflows:compound for Session 3**

```bash
/workflows:compound Session 3 - Plugin workflow planning patterns
```

Document:
- How /workflows:brainstorm works
- How /workflows:plan creates specs
- Parallel agent patterns

### Part 3: Create Knowledge Base (30 min)

**Step 3.1: Review generated docs**
- Check `docs/solutions/` for created files
- Ensure they capture useful patterns

**Step 3.2: Organize by category**
- Which solutions relate to React?
- Which relate to Git/worktrees?
- Which relate to plugin workflows?

### Part 4: Reflect on Full Cycle (30 min)

**Step 4.1: Update session tracking**
- Mark Session 5 complete
- Update progress.json

**Step 4.2: Prepare for Stage 2**
- Review what's next (Session 6: Understanding Hooks)
- Note any gaps in foundation

### Part 5: Build Dashboard Feature (45 min)

**Step 5.1: Add useState to session cards**

```jsx
// In your session component
const [expandedSession, setExpandedSession] = useState(null);

// Toggle function
const toggleSession = (id) => {
  setExpandedSession(expandedSession === id ? null : id);
};
```

**Step 5.2: Make sessions clickable**

```jsx
<div onClick={() => toggleSession(session.id)}>
  {session.title}
  {expandedSession === session.id && (
    <div className="session-details">
      <p>{session.summary}</p>
      <p>Skills: {session.learn.join(', ')}</p>
    </div>
  )}
</div>
```

**Step 5.3: Style the expansion**
- Add transition for smooth expand/collapse
- Show indicator (▶ vs ▼) for state

**Quality Gate:** Can you explain when useState causes a re-render?

---

## 📊 What You'll Document

Based on Sessions 1-4, potential compound docs:

| Problem Solved | Category | Key Learning |
|----------------|----------|--------------|
| Task tracker data persistence | build-errors | JSON file storage patterns |
| Git workflow confusion | integration-issues | Clone → Branch → Commit flow |
| Dashboard data not loading | runtime-errors | Data sync between folders |
| Token limit emergency | performance-issues | Emergency protocols |
| Plugin workflow interruption | logic-errors | Atomic workflow patterns |
| Browser caching issues | ui-bugs | Cache: no-store for dev |

---

## 🎓 Learning Goals

### Must Understand:
- [ ] What /workflows:compound does
- [ ] What /workflows:review does  
- [ ] How parallel agents work during these commands
- [ ] Where solution docs are stored
- [ ] The full Plan → Work → Review → Compound cycle

### Should Practice:
- [ ] Running /workflows:compound with context
- [ ] Running /workflows:review on your code
- [ ] Reviewing generated documentation
- [ ] Organizing knowledge for reuse

### Nice to Have:
- [ ] Document all Session 1-4 learnings
- [ ] Create prevention strategies
- [ ] Build searchable knowledge base

---

## 📊 Quality Gate: Compound Workflow

**Pass when you can answer:**

| Question | Your Answer |
|----------|-------------|
| What does /workflows:compound create? | docs/solutions/*.md files |
| How many agents does it use? | 6+ parallel agents |
| What's the full workflow cycle? | Brainstorm → Plan → Work → Review → Compound |
| Where are solution docs stored? | docs/solutions/[category]/ |
| Why "compound"? | Each documented solution compounds knowledge |

---

## ⚠️ Session 5 Anti-Patterns

| Don't | Do Instead |
|-------|------------|
| Skip /workflows:review | Let agents find issues |
| Create docs manually | Use /workflows:compound |
| Document everything at once | Focus on biggest learnings |
| Rush through | Take time to understand the pattern |

---

## 📝 During Session 5

### Prompt to Start:

```
I'm starting Session 5 of my learning journey. Goal: Complete the workflow cycle.

Context:
- Sessions 1-4 complete (task tracker, git, plugin planning, dashboard)
- I've used /workflows:brainstorm, /workflows:plan, /workflows:work
- Now I need to learn /workflows:review and /workflows:compound
- I want to document my learnings from Sessions 1-4

Let's start with /workflows:review on my dashboard code, then use
/workflows:compound to document the key problems I solved.
```

### Checkpoints:
- [ ] After 30 min: /workflows:review completed
- [ ] After 1 hour: First /workflows:compound doc created
- [ ] After 1.5 hours: 2-3 solution docs created
- [ ] After 2 hours: Knowledge base organized
- [ ] After 2.5 hours: Session complete, ready for Stage 2

---

## 🔗 Connecting to Previous Sessions

### Session 4 Problems → Compound Docs:

| Problem | Root Cause | Prevention |
|---------|------------|------------|
| Data not loading | Files in wrong folder | Always check public/ sync |
| Token limit crash | No emergency protocol | Use 85/90/95% rules |
| Workflow interrupted | Context switch | Never switch mid-workflow |
| Merge without test | Rushed to close | Always validate before merge |

Each becomes a searchable solution doc!

---

## 🚀 What This Enables

After Session 5:

| You'll Have | Why It Matters |
|-------------|----------------|
| Complete workflow knowledge | Can run full cycle independently |
| Documented solutions | Quick reference for similar problems |
| Foundation complete | Ready for Stage 2 (Basic Agents) |
| Knowledge base | Problems solved faster over time |

**Stage 1 complete after this session!**

---

## 📈 Success Metrics

**Session 5 complete when:**
- [ ] Ran /workflows:review on dashboard
- [ ] Ran /workflows:compound at least twice
- [ ] Created solution docs in docs/solutions/
- [ ] Understand the full workflow cycle
- [ ] Updated session tracking

---

**Created:** February 5, 2026  
**Focus:** /workflows:compound and /workflows:review  
**Philosophy:** "Each unit of work should make subsequent work easier"  
**After This:** Session 6 - Understanding Your Hooks → Stage 2
