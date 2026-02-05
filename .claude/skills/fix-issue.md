# Fix Issue

Retrieve a Jira issue, understand what it describes, and update documentation to resolve it.

## When to Use This Skill

Use this skill when you have a Jira issue (DOC ticket) that requires documentation changes.

**Invoke with:**
- `/fix-issue <ticket-url-or-key>`
- "Fix Jira issue DOC-123"
- "Resolve this documentation ticket"

## What This Skill Does

This skill automates the end-to-end workflow for resolving Jira documentation issues:

1. Verifies connectivity to the Atlassian MCP
2. Retrieves and analyzes the Jira issue details
3. Creates a dedicated Git branch from `main`
4. Identifies the impacted documentation files
5. Proposes and applies documentation changes
6. Ensures all changes follow Amplitude style rules
7. Summarizes the issue and the changes made

## Process

### Step 1: Verify Atlassian MCP connectivity

Before anything else, confirm the Atlassian MCP server is enabled and reachable. Use the MCP tools to make a test call (for example, retrieve user info or the issue itself).

**If the MCP isn't reachable or returns an error, stop immediately and inform the user.**

### Step 2: Retrieve the Jira issue

Extract the Jira issue key from the user's input. The key follows the pattern `DOC-###` (for example, `DOC-1096`). Retrieve the issue details using the Atlassian MCP.

Gather from the issue:
- **Summary/title**: What the issue is about.
- **Description**: Full details of what needs to change.
- **Acceptance criteria**: If provided, what "done" looks like.
- **Attachments or comments**: Any additional context.

### Step 3: Set up the Git branch

Run these Git operations:

1. Switch to the `main` branch.
2. Pull the latest changes (`git pull`).
3. Create a new branch named after the issue key (for example, `DOC-1096`).
   - If a branch with that name already exists, delete it and recreate it from `main`.

**Example:**
```bash
git checkout main
git pull
git branch -D DOC-1096 2>/dev/null; git checkout -b DOC-1096
```

### Step 4: Identify impacted documentation

Using the issue details, locate the documentation files that need changes:

1. Search the `content/collections/` directory for relevant files.
2. Use keywords from the issue summary and description to narrow down the files.
3. If the issue references specific pages, URLs, or slugs, map them to file paths.

**Tips for finding the right files:**
- A URL like `/docs/analytics/charts/lifecycle/lifecycle-interpret` maps to a file in `content/collections/lifecycle/en/lifecycle-interpret.md`.
- Search for unique terms from the issue to locate relevant content.
- Check the collection route mappings in CLAUDE.md if you need to map a URL to a file path.

### Step 5: Propose a solution

Before making changes, present a brief proposal to the user:

1. **What the issue asks for**: Summarize the Jira issue in one to two sentences.
2. **Files to change**: List the files you plan to modify.
3. **Proposed changes**: Describe what you plan to update, add, or remove.

Wait for the user to approve your proposal before proceeding. If you're unsure about the right approach, ask the user for guidance rather than guessing.

### Step 6: Apply changes with style rules

Make the documentation updates. As you write, follow all Amplitude style rules from CLAUDE.md:

- **Active voice** (two-pass check — highest priority).
- **Present tense** (no "will", "would").
- **Contractions** ("don't" not "do not").
- **Second person** ("you" not "we").
- **No "please"** (use direct instructions).
- **Concise language** (no "in order to", "utilize").
- **Correct formatting** (bold for interactive UI elements, italics for orientation elements).

After applying changes, run a self-review against the style rules to catch anything you missed.

### Step 7: Summarize changes

Provide a clear summary in this format:

```markdown
## Issue Resolution Summary

### Jira Issue: [DOC-###]

**Summary:** [One-line description of the issue]

### Changes Made

1. **[filename]** (line numbers if relevant)
   - [Description of what changed and why]

2. **[filename]**
   - [Description of what changed and why]

### Style Rules Applied

- [List any notable style corrections made during editing]

### Next Steps

- Review the changes and commit when satisfied.
- Consider running `/validate-links` to verify any links in the changed files.
- Create a PR and tag `@tech-writers` for review.
```

## Important Guardrails

- **Stop if unsure.** If you don't know what to write or what the next step is, stop and ask the user.
- **Don't guess at content.** If the Jira issue is ambiguous, ask for clarification rather than making assumptions.
- **Don't modify unrelated files.** Only change documentation directly related to the issue.
- **Verify MCP first.** Never skip the MCP connectivity check — the entire workflow depends on it.

## Example Session

**User:** `/fix-issue DOC-1096`

**Response flow:**

1. Verify Atlassian MCP is reachable — confirmed.
2. Retrieve DOC-1096 details — "Add Claude agent support documentation."
3. Switch to `main`, pull, create branch `DOC-1096`.
4. Search for related files — found `content/collections/instrumentation/en/claude-agent.md`.
5. Propose changes — "Add a new section covering Claude agent configuration."
6. User approves — apply changes with style rules.
7. Summarize — list files changed, style rules applied, and next steps.

## Integration with Other Skills

This skill complements:
- **`/edit-doc`**: Run after making changes to double-check style compliance.
- **`/validate-links`**: Run after editing to verify all internal links are correct.
- **`/document-feature`**: If the issue requires creating an entirely new page, use `/document-feature` instead.
