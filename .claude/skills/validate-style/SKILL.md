---
name: validate-style
description: This skill should be used when the user wants to "spot-check style compliance", "sample QA a branch", "validate style on edited files", "check if bulk-edit worked", "run a style compliance check", or "verify style quality on a set of files". The bulk-edit skill invokes this automatically after each persona group's edits and taxonomy pass complete.
version: 1.0.0
---

# Validate Style

Spot-check style compliance on a random sample of files from a branch and report a compliance score per rule category. Used as the quality gate after each bulk-edit persona group.

## About This Skill

This skill samples N files from a set of changed files, runs the edit-doc Phase 1 pattern detection (no edits) on each file, and emits a compliance report with PASS / WARN / FAIL status per rule category.

It's typically invoked by `/bulk-edit` after each group completes. It can also be run independently to check any branch or set of files.

## Invocation

```
/validate-style branch:<branch-name> [sample:<n>] [files:<file1,file2,...>]
```

- `branch` — required. The git branch to sample from.
- `sample` — optional. Number of files to sample (default: 5; minimum: 3).
- `files` — optional. Specific files to check instead of a random sample.

## Step 1: Get the list of changed files

```bash
git diff --name-only main...<branch-name> | grep "^content/collections/.*\.md$"
```

Count the total changed files. If fewer than 5, check all of them.

## Step 2: Select a sample

If `files` is specified, use those files exactly.

Otherwise, randomly select `sample` files from the changed set. To ensure variety:
- Select at most 2 files from any single collection
- Prefer files from larger collections (they have more prose to check)
- Avoid selecting only short files (glossary entries, RBAC permission pages)

## Step 3: Run pattern detection on each sampled file

For each sampled file, run the edit-doc Phase 1 search (pattern search only — **do not apply any edits**).

Count remaining violations per category:

### Category 1: Passive voice

Search for: `is/are/was/were [verb]ed`, `can be`, `will be`, `should be`, `is assigned`, `are assigned`, `is removed`, `are removed`, `is granted`, `are granted`, `is created`, `are created`, `is available`, `are available`, `is sent`, `are sent`, `can be configured`, `can be accessed`, `will be displayed`, `will be shown`, `should be checked`

### Category 2: Future tense

Search for: `will `, `will be`, `would be`, `going to`

### Category 3: Missing contractions

Search for: `cannot`, ` are not`, ` is not`, ` does not`, ` do not`, ` has not`, ` have not`, ` was not`, ` were not`, ` should not`, ` could not`, ` would not`, ` will not`

### Category 4: "Please" in instructions

Search for: `please` (case-insensitive)

### Category 5: Wordy phrases

Search for: `in order to`, ` via `, `prior to`, `due to the fact`, `has the ability to`, `at the present time`, `at this point in time`, `currently`

### Category 6: First person plural

Search for: ` we `, ` our `, ` us ` (in prose, not URLs)

### Category 7: List punctuation

Count list items (lines starting with `- ` or `* ` or `1.`/`2.` etc.) that do not end with `.`, `?`, or `!`.

### Category 8: Heading issues

Check headings (lines starting with `##`) for:
- Title case instead of sentence case
- End punctuation (`.`, `?`, `!`, `:`)
- Single `#` headings in the document body

### Category 9: UI formatting

Search for: `**[text]** >` patterns (bold navigation paths that should use italics)

## Step 4: Calculate compliance scores

For each category, calculate:

```
compliance% = (violations_remaining / total_checkable_instances) as a deficit

score = 1 - (violations / total_instances)
```

A file with zero checkable instances for a category scores 100% for that category.

Aggregate scores across all sampled files.

## Step 5: Determine PASS / WARN / FAIL

| Category | PASS | WARN | FAIL |
|---|---|---|---|
| Passive voice | ≥ 95% | 85–94% | < 85% |
| Future tense | ≥ 95% | 85–94% | < 85% |
| Contractions | ≥ 90% | 80–89% | < 80% |
| "Please" | 100% | 95–99% | < 95% |
| Wordy phrases | ≥ 90% | 80–89% | < 80% |
| First person | ≥ 95% | 85–94% | < 85% |
| List punctuation | ≥ 90% | 80–89% | < 80% |
| Headings | ≥ 95% | 85–94% | < 85% |
| UI formatting | ≥ 90% | 80–89% | < 80% |

**Overall result:** The lowest single-category result determines the overall status.

## Step 6: Emit the report

```markdown
## Style Compliance Report

**Branch:** bulk-edit/<group-name>
**Files changed:** <total>
**Files sampled:** <n>
**Overall result:** PASS / WARN / FAIL

### Results by category

| Category | Score | Status | Violations |
|---|---|---|---|
| Passive voice | 97% | PASS | 2 of 68 checked |
| Future tense | 100% | PASS | 0 of 12 checked |
| Contractions | 92% | PASS | 3 of 38 checked |
| "Please" | 100% | PASS | 0 of 5 checked |
| Wordy phrases | 88% | WARN | 4 of 33 checked |
| First person | 96% | PASS | 1 of 25 checked |
| List punctuation | 91% | PASS | 2 of 22 checked |
| Headings | 100% | PASS | 0 of 18 checked |
| UI formatting | 95% | PASS | 1 of 20 checked |

### Sampled files

| File | Violations | Notes |
|---|---|---|
| content/collections/browser_sdk/en/browser-sdk-2.md | 1 | 1 wordy phrase |
| content/collections/instrumentation/en/sdk-quickstart.md | 0 | Clean |
| content/collections/ampli/en/ampli-overview.md | 2 | 2 wordy phrases |
| content/collections/sdk-catalog/en/index.md | 0 | Clean |
| content/collections/node_js_sdk/en/node-sdk.md | 5 | 3 wordy phrases, 2 passive voice |

### Recommendation

[PASS] All categories meet compliance thresholds. Safe to create PR.

— or —

[WARN] "Wordy phrases" scored 88% (below 90% threshold). Recommend tech writer spot-check the 4 remaining violations before merging. PR may be created with a warning note.

— or —

[FAIL] "Passive voice" scored 72% (below 85% threshold). Do not create PR. Re-run editor agents on the 3 failing files with additional passive-voice instructions.

### Files needing re-review (if FAIL or WARN)

- content/collections/node_js_sdk/en/node-sdk.md (5 violations)
```

## Integration with /bulk-edit

When called from the bulk-edit orchestrator:
- A PASS result means proceed to PR creation
- A WARN result means create the PR with a warning note in the body and flag for tech writer attention
- A FAIL result means halt and report to the user — do not create the PR

## Additional resources

- `.claude/skills/edit-doc/SKILL.md` — Pattern definitions for Phases 1–4
- `.claude/skills/bulk-edit/SKILL.md` — Orchestration context
