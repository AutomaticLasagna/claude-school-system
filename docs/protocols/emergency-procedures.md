# Emergency Procedures

**Purpose:** Prevent session chaos like Session 4. Clear protocols for when things go wrong.

---

## Token Limit Emergencies

### At 85% Token Usage

**🟡 WARNING STATE - Prepare to Close**

**Actions:**
1. ✅ Finish current small task if <5 minutes
2. ❌ Do NOT start new features
3. ❌ Do NOT start debugging complex issues
4. ✅ Begin session closure process
5. ✅ Document current state

**Example:**
```
Claude: "We're at 85% tokens. Let's wrap up this commit and close the session properly."
```

---

### At 90% Token Usage

**🔴 EMERGENCY MODE - Close Immediately**

**ONLY allowed activities:**
- Document current state
- Create session-XX.json
- Commit work in progress
- Close session

**NOT allowed:**
- Debugging
- New features
- Complex explanations
- Multi-step processes

**Example:**
```
Claude: "EMERGENCY: 90% tokens. Closing session NOW. Current state: [brief summary]. Commit these files: [list]. Session ends incomplete - will resume tomorrow."
```

---

### At 95% Token Usage

**🚨 CRITICAL - Abort**

**One action only:**
- Save minimal state to file
- End conversation immediately

**Example:**
```
Claude: "CRITICAL. Saving state to emergency-state.txt. Session ends NOW. Resume tomorrow."
```

---

## Plugin Workflow Emergencies

### Plugin Workflow Won't Complete

**Symptoms:**
- Workflow running for >30 minutes
- Asking for many approvals
- Token usage climbing rapidly

**Actions:**
1. Check token usage
2. If >70%: Stop workflow, document state
3. If <70%: Let it finish or ask "how much longer?"

---

### Accidentally Exited Plugin Workflow

**What happened:**
- Started `/workflows:work`
- Exited before completion
- Workflow context lost

**Recovery:**
1. Document what was built
2. Mark session incomplete
3. Do NOT try to resume with regular chat
4. Next session: Start fresh workflow OR manually complete

**Example from Session 4:**
```
✅ Code built and merged
❌ Not validated
❌ Not documented
→ Solution: Mark incomplete, fix in next session
```

---

### Plugin Workflow Stuck

**If workflow asks confusing questions:**
1. Type `/help` to see available commands
2. Try `/status` to see workflow state
3. If still stuck: Type `/exit` and document state

---

## Session State Emergencies

### Session Ending Without Completion

**Checklist before emergency close:**
```bash
☐ Document what was accomplished
☐ Document what's incomplete
☐ Update session-XX.json with "incomplete" status
☐ List specific issues/blockers
☐ Define next actions
☐ Commit changes
```

**Example session-XX.json for incomplete session:**
```json
{
  "sessionNumber": 4,
  "status": "incomplete",
  "title": "...",
  "issues": [
    "Dashboard built but not tested",
    "Token limits hit during debugging",
    "No validation performed"
  ],
  "nextActions": [
    "Test dashboard",
    "Fix data loading bug",
    "Create session log"
  ]
}
```

---

### Lost Context Mid-Session

**Symptoms:**
- Can't remember what we were doing
- Files changed but don't know why
- Unclear what the goal was

**Recovery:**
1. Check git log: `git log --oneline -5`
2. Check git status: `git status`
3. Read last session JSON: `cat data/sessions/session-XX.json`
4. Read session plan: `cat docs/plans/session-XX-plan.md`

---

### Switching Between Plugin and Regular Chat

**RULE: Don't mix contexts**

**If in plugin workflow:**
- Stay in plugin workflow until complete
- Do NOT switch to regular chat for "quick fixes"
- Plugin agents have full context

**If need to switch:**
1. Exit plugin workflow cleanly
2. Document state
3. Switch to regular chat
4. Know that plugin context is LOST

---

## Git Emergencies

### Merge Conflict During Emergency

**At high token usage:**
1. Do NOT try to resolve now
2. Abort merge: `git merge --abort`
3. Document conflict
4. Close session
5. Resolve in next session

---

### Uncommitted Changes at Session End

**Quick commit:**
```bash
git add .
git commit -m "WIP: Session X incomplete - [brief description]"
git push
```

**Document in session JSON:**
```json
{
  "status": "incomplete",
  "uncommittedWork": "Description of WIP"
}
```

---

## Communication Emergencies

### User Frustrated/Confused

**Claude actions:**
1. STOP current work immediately
2. Ask: "What's confusing? Let me clarify."
3. Simplify explanation
4. Use analogies
5. Check understanding

**Example:**
```
User: "This is too confusing, I don't understand what's happening"
Claude: "Stop. Let me simplify. Here's what we're doing: [one sentence]. Does that make sense?"
```

---

### Claude Failing as Teacher

**Signs:**
- User says "this isn't working"
- User expresses frustration
- Same problem repeating
- User lost confidence

**Actions:**
1. Acknowledge failure: "You're right, I'm not explaining this well."
2. Reset approach: "Let me try a different way."
3. Ask: "What would help you understand this better?"
4. Simplify to basics
5. Use concrete examples, not abstractions

---

## Prevention Checklist

**Before starting ANY session:**
```bash
☐ Check token budget (should be <20% used)
☐ Load session plan if exists
☐ Review previous session state
☐ Clear objectives defined
☐ Know emergency exit plan
```

**During session (check every 30 min):**
```bash
☐ Token usage still reasonable?
☐ Making progress toward objective?
☐ User understanding concepts?
☐ Time to wrap up soon?
```

---

## Session 4 Lessons Learned

**What went wrong:**
1. Hit 90% tokens during debugging ❌
2. Kept working instead of closing ❌
3. Switched plugin → regular chat mid-workflow ❌
4. Merged code without validation ❌
5. Marked "complete" when incomplete ❌

**What should have happened:**
1. At 85%: Stop debugging, close session ✅
2. Document: "Dashboard built but not validated" ✅
3. Commit with status "incomplete" ✅
4. Next session: Test + fix ✅

---

**Last updated:** February 3, 2026 (After Session 4 chaos)
