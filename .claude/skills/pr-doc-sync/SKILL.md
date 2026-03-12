---
name: pr-doc-sync
description: Analyzes a GitHub pull request from any repository to determine if it requires documentation updates in amplitude-docs, drafts the updates following Amplitude's style guide, and creates a documentation PR that links back to the source PR. Use when an engineer says "check this PR for doc impact", "does this PR need docs?", "sync docs for this PR", "update docs for PR #", or provides a GitHub PR URL and asks whether documentation needs to change.
---

# PR Doc Sync

Analyze a GitHub PR, determine if it requires documentation updates, draft those updates, and create a docs PR linked back to the source.

## Step 1: Fetch the PR

Retrieve the PR's title, body, and file diff using the `gh` CLI:

```bash
# Fetch metadata
gh pr view <PR_URL> --json title,body,state,headRefName,baseRefName,files

# Fetch the full diff
gh pr diff <PR_URL>
```

If the user provided a PR number instead of a URL, ask for the repository owner/name or construct the URL as `https://github.com/<owner>/<repo>/pull/<number>`.

## Step 2: Classify — does this require a documentation update?

Read the PR title, body, and diff. Determine if the changes are **user-facing** in any of these ways:

**Requires documentation:**
- New feature, option, flag, parameter, or configuration added
- Existing behavior changed in a way users would notice (different output, new defaults, renamed options)
- Feature deprecated or removed
- New API endpoint, or changes to request/response shape
- New SDK method, event, or property
- Error messages, limits, or quotas changed
- Installation, setup, or migration steps affected
- UI changes that affect how users navigate or configure Amplitude

**Does NOT require documentation:**
- Internal refactors with no external behavior change
- Test additions or fixes
- CI/CD, build tooling, or dependency bumps (unless they change minimum version requirements)
- Bug fixes that restore previously-documented behavior (no docs change needed)
- Code style or lint fixes
- Documentation-only changes inside the source repo that don't affect this docs site

**When in doubt**: Summarize the change for the user and ask whether they consider it user-facing before proceeding.

## Step 3: If no doc update is needed

Tell the user clearly:

```
This PR doesn't appear to require documentation changes.

**Reason:** [one-sentence explanation]

If you believe something should still be documented, describe what and I'll draft it.
```

Stop here.

## Step 4: Identify the impacted documentation

Search `content/collections/` for files that cover the affected feature area. Use keywords from the PR title, changed file paths, and function/method names. Tips:

- SDK changes → look in `content/collections/*_sdk/` or `content/collections/instrumentation/`
- API changes → look in `content/collections/apis/`
- Analytics feature changes → look in `content/collections/analytics/` or the relevant chart collection
- Data/CDP changes → look in `content/collections/data/`
- Admin/settings changes → look in `content/collections/admin/`

Confirm the affected files before making any edits. If multiple files might be relevant, list them and describe the likely change needed in each.

## Step 5: Propose changes to the user

Before editing anything, present a brief proposal:

1. **PR summary** — one to two sentences describing the code change.
2. **Doc impact** — what specifically needs to change in the docs.
3. **Files to change** — list each file with a one-line description of the change.

Wait for user approval. If the right approach is unclear, ask rather than guessing.

## Step 6: Set up the Git branch

```bash
git checkout main && git pull
BRANCH="pr-doc-sync/$(echo '<source-repo>' | tr '/' '-')-<pr-number>"
git branch -D "$BRANCH" 2>/dev/null; git checkout -b "$BRANCH"
```

Use the source repo name and PR number in the branch name for traceability (for example, `pr-doc-sync/amplitude-js-sdk-1234`).

## Step 7: Draft and apply the documentation updates

Apply all Amplitude style rules from CLAUDE.md:

- **Active voice** (two-pass check — highest priority)
- **Present tense** — no "will", "would"
- **Contractions** — "don't" not "do not"
- **Second person** — "you" not "we"
- **No "please"** — use direct instructions
- **Concise language** — no "in order to", "utilize", "currently"
- **Correct formatting** — bold for interactive UI elements, italics for navigation paths and orientation labels
- **Oxford comma** — required in all lists
- **No Latin abbreviations** — "for example" not "e.g.", "that is" not "i.e."

After editing, do a second pass specifically scanning for passive voice patterns: `is/are/was/were [verb]ed`, `can be`, `will be`, `should be`.

If new content is needed (for example, a new method or parameter), follow the structure of existing nearby content in the same file.

## Step 8: Create the docs PR

Commit the changes and create a PR. Include a link back to the source PR in the description so reviewers know when to merge.

```bash
git add <changed-files>
git commit -m "docs: sync documentation for <source-repo> PR <number>"

PR_URL=$(gh pr create \
  --title "docs: <brief description from source PR>" \
  --body "$(cat <<'EOF'
## Summary

<One to two sentences describing what changed in the source PR and what docs were updated.>

## Changes

- **<filename>**: <what changed>

## Source PR

This docs PR corresponds to: <SOURCE_PR_URL>

Merge this docs PR after or alongside the source PR.
EOF
)" 2>&1 | tail -1)
```

## Step 9: Log to AGENT_LOG.md

Append one row to `AGENT_LOG.md` immediately after the PR is created:

```
| YYYY-MM-DD | Claude Code | Sync docs for <source-repo> PR <number> | $PR_URL |
```

---

## Guardrails

- **Stop if unsure.** If you can't confidently assess doc impact, ask the user.
- **Don't over-reach.** Only update documentation directly affected by the PR. Don't refactor surrounding content unless it's clearly wrong.
- **One PR = one source PR.** Don't batch multiple source PRs into one docs PR.
- **Verify before editing.** Always propose changes and get approval before modifying files.
