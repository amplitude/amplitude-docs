---
name: fix-issue
description: This skill should be used when the user wants to "fix a Jira issue", "resolve a DOC ticket", "fix DOC-###", "work on a documentation ticket", or provides a Jira issue key or URL for a documentation change that needs to be made.
version: 0.1.0
---

# Fix Issue

Retrieve a Jira issue, understand what it describes, and update documentation to resolve it.

## About This Skill

This skill automates the end-to-end workflow for resolving Jira documentation issues (DOC tickets). It verifies connectivity, retrieves the issue, sets up a Git branch, identifies the affected documentation files, proposes changes for user approval, applies updates with Amplitude style rules, and summarizes the result.

## Step 1: Verify Atlassian MCP Connectivity

Before anything else, confirm the Atlassian MCP server is enabled and reachable. Make a test call (for example, retrieve user info or the issue itself).

**If the MCP isn't reachable or returns an error, stop immediately and inform the user. Do not proceed.**

## Step 2: Retrieve the Jira Issue

Extract the issue key from the user's input. The key follows the pattern `DOC-###` (for example, `DOC-1096`). Retrieve the issue using the Atlassian MCP.

Gather:
- **Summary/title** — what the issue is about.
- **Description** — full details of what needs to change.
- **Acceptance criteria** — if provided, what "done" looks like.
- **Attachments or comments** — any additional context.

## Step 3: Set Up the Git Branch

```bash
git checkout main
git pull
git branch -D DOC-#### 2>/dev/null; git checkout -b DOC-####
```

If a branch with that name already exists, delete it and recreate it from `main`.

## Step 4: Identify Impacted Documentation

Using the issue details, locate the documentation files that need changes:

1. Search `content/collections/` for relevant files using keywords from the issue summary and description.
2. If the issue references specific pages, URLs, or slugs, map them to file paths.

**Tips:**
- A URL like `/docs/analytics/charts/lifecycle/lifecycle-interpret` maps to `content/collections/lifecycle/en/lifecycle-interpret.md`.
- Use unique terms from the issue to locate relevant content.
- Check the collection route mappings in CLAUDE.md if needed.

## Step 5: Propose a Solution

Before making changes, present a brief proposal:

1. **What the issue asks for** — one to two sentences summarizing the Jira issue.
2. **Files to change** — list the files to modify.
3. **Proposed changes** — describe what to update, add, or remove.

Wait for user approval before proceeding. If the right approach is unclear, ask for guidance rather than guessing.

## Step 6: Apply Changes with Style Rules

Make the documentation updates following all Amplitude style rules from CLAUDE.md:

- **Active voice** (two-pass check — highest priority).
- **Present tense** (no "will", "would").
- **Contractions** ("don't" not "do not").
- **Second person** ("you" not "we").
- **No "please"** — use direct instructions.
- **Concise language** — no "in order to", "utilize".
- **Correct formatting** — bold for interactive UI elements, italics for orientation elements and navigation paths.

After applying changes, run a self-review against the style rules to catch anything missed.

## Step 7: Summarize Changes

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

- **Stop if unsure.** If the next step is unclear, stop and ask the user.
- **Don't guess at content.** If the Jira issue is ambiguous, ask for clarification rather than making assumptions.
- **Don't modify unrelated files.** Only change documentation directly related to the issue.
- **Verify MCP first.** Never skip the MCP connectivity check — the entire workflow depends on it.

## Additional Resources

### Reference Files

- **`references/example-session.md`** — A full worked example of a fix-issue session.

### Related Skills

- **`/edit-doc`** — Run after making changes to double-check style compliance.
- **`/validate-links`** — Run after editing to verify all internal links are correct.
- **`/document-feature`** — Use instead if the issue requires creating an entirely new page.
