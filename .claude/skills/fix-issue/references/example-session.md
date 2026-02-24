# Example Fix-Issue Session

This worked example shows a full session resolving a DOC ticket.

---

**User:** `/fix-issue DOC-1096`

**Step 1 — MCP check:** Atlassian MCP is reachable. Confirmed.

**Step 2 — Issue retrieval:**

Retrieved DOC-1096:
- **Summary:** "Add Claude agent support documentation"
- **Description:** "Amplitude now supports Claude agents as a data source. Need documentation covering how to configure and use the integration."
- **Acceptance criteria:** "Page exists in the instrumentation collection covering setup steps and required SDK configuration."

**Step 3 — Git setup:**

```bash
git checkout main
git pull
git checkout -b DOC-1096
```

Branch `DOC-1096` created from `main`.

**Step 4 — File identification:**

Searched `content/collections/` for "Claude agent" and related terms. No existing file found. The issue requires creating a new file: `content/collections/instrumentation/en/claude-agent.md`.

**Step 5 — Proposal:**

"This issue asks for a new documentation page covering Claude agent support. I plan to:

1. Create `content/collections/instrumentation/en/claude-agent.md` with setup steps, required SDK configuration, and a basic example.

Does this approach look right? Any additional context on what the page should cover?"

**User:** "Yes, go ahead."

**Step 6 — Changes applied:**

Created `content/collections/instrumentation/en/claude-agent.md` with:
- Introduction explaining Claude agent support.
- Prerequisites (Amplitude SDK version, API key).
- Step-by-step setup instructions.
- Code example showing event tracking from a Claude agent.

Style rules applied: active voice (two-pass verified), present tense, contractions, second person, no "please", concise language, correct UI formatting.

**Step 7 — Summary:**

```markdown
## Issue Resolution Summary

### Jira Issue: DOC-1096

**Summary:** Add documentation for Claude agent support as an Amplitude data source.

### Changes Made

1. **content/collections/instrumentation/en/claude-agent.md** (new file)
   - Created documentation covering prerequisites, setup steps, and a code example for tracking events from Claude agents.

### Style Rules Applied

- Active voice: two-pass check completed, zero passive constructions.
- Present tense: no future tense constructions.
- Contractions applied throughout.

### Next Steps

- Review the changes and commit when satisfied.
- Run `/validate-links` to verify internal links.
- Create a PR and tag `@tech-writers` for review.
```
