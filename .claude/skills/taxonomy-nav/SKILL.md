---
name: taxonomy-nav
description: This skill should be used when the user wants to "update navigation", "fix nav section titles", "audit document taxonomy", "check navigation structure", "update the sidebar for edited docs", or "review document titles for style compliance". The bulk-edit skill invokes this automatically after each persona group completes editing.
version: 1.0.0
---

# Taxonomy & Navigation

Audit and update the documentation navigation structure after bulk content edits. Applies sentence case to navigation section labels, flags frontmatter title violations, and identifies potential structural improvements.

## About This Skill

After bulk style edits, the navigation structure needs a corresponding review. This skill:

1. Builds a UUID-to-title mapping from the edited documents' frontmatter
2. Audits section group labels in `content/trees/navigation/en/*.yaml` and applies sentence case
3. Flags frontmatter `title` fields that violate style (without auto-changing them)
4. Identifies pages that may be misplaced in the nav hierarchy and reports them for editorial review

This skill is typically invoked by the `/bulk-edit` skill automatically. It can also be run independently.

## Invocation

```
/taxonomy-nav group:<group-name> branch:<branch-name>
```

Or for a single nav file:

```
/taxonomy-nav file:content/trees/navigation/en/analytics.yaml
```

## Step 1: Build the UUID-to-title map

Get the list of files changed in the branch:

```bash
git diff --name-only main...<branch-name> | grep "^content/collections/.*\.md$"
```

For each changed file, read its frontmatter and extract:
- `id` — the Statamic UUID for this entry
- `title` — the display title

Build a lookup table: `{ uuid → { title, file_path, collection } }`

This map lets you understand what each `entry:` UUID in the navigation tree actually points to.

## Step 2: Identify the nav tree files to audit

Using `.claude/skills/bulk-edit/references/collection-groups.md`, look up which navigation tree files correspond to the group's collections.

The navigation tree files are at: `content/trees/navigation/en/*.yaml`

Read each relevant nav tree file.

## Step 3: Audit section group titles

Navigation tree files contain section group entries that look like this:

```yaml
tree:
  -
    id: e500817c-24f7-4c91-88f5-248e0cd62cb5
    title: Charts
    children:
      - ...
  -
    id: ed2f8d4b-3612-4639-b3ac-ea4ce47a1f12
    title: 'Cohorts and User Behavior'
    children:
      - ...
```

Find every entry that has a `title` field (these are section group labels, not page entries). Apply the same heading style rules from CLAUDE.md:

### Rules to apply

**Sentence case:** Only the first word and proper nouns are capitalized.
- ❌ `"Organize your Analyses"` → ✅ `"Organize your analyses"`
- ❌ `"Find and Fix Anomalies"` → ✅ `"Find and fix anomalies"`
- ❌ `"Share Your Work"` → ✅ `"Share your work"`
- ✅ `"Amplitude Analytics"` — proper noun, keep as-is
- ✅ `"Share with team members"` — already sentence case, no change

**No end punctuation:** Remove trailing periods, colons, exclamation points, or question marks.
- ❌ `"Chart Settings:"` → ✅ `"Chart settings"`
- ❌ `"Getting Started."` → ✅ `"Getting started"`

**Preserve proper nouns:** Product names, third-party service names, and technical terms retain their capitalization.
- ✅ `"Configure Amplitude Analytics"` — "Amplitude Analytics" is a product name
- ✅ `"Connect to BigQuery"` — "BigQuery" is a proper noun
- ✅ `"Set up SSO"` — "SSO" is a standard abbreviation

### How to update the YAML

When updating a title in a nav tree YAML file:
- Edit only the `title:` value
- Preserve all `id:` and `entry:` UUID values exactly — never change these
- Preserve YAML indentation and structure exactly
- Do not add or remove any `children:` entries or entries within them

Example edit:
```yaml
# Before
    title: 'Organize your Analyses'

# After
    title: 'Organize your analyses'
```

## Step 4: Audit frontmatter titles

Using the UUID-to-title map from Step 1, review each page's `title` field against the same style rules (sentence case, no end punctuation).

**Do not auto-change frontmatter titles.** They appear in:
- Browser tab titles
- Search engine results
- OpenGraph metadata
- Statamic's internal page index

Flag any violations in the report instead. Tech writers should review and change these deliberately, not automatically.

Frontmatter title violations to flag:
- Title case when sentence case is required (e.g., "Event Segmentation Overview" → should be "Event segmentation overview")
- Trailing colon, period, or question mark
- Phrases containing "currently", "please", "via", or other banned words from CLAUDE.md

## Step 5: Identify structural observations

Using the UUID map, scan the nav tree for potential structural issues. Report these as observations — do not make changes.

Look for:
- **Mismatched section labels:** A section titled "Advanced" containing pages with introductory-sounding titles
- **Orphaned entries:** Pages in the nav tree whose UUID doesn't appear in the changed files list (may indicate stale entries)
- **Depth inconsistencies:** A single-page section that might be better as a flat entry rather than a nested section

Report no more than 5 observations — focus on the most significant ones.

## Step 6: Commit nav changes

If any nav tree files were updated:

```bash
git add content/trees/navigation/en/
git commit -m "style(bulk-edit): update nav section titles to sentence case for <group>"
```

If no changes were needed (all titles already correct), skip the commit and note this in the report.

## Step 7: Emit the report

Output a structured report in this format:

```markdown
## Taxonomy & Navigation Report — <group>

**Branch:** bulk-edit/<group>
**Nav files audited:** <N>
**Section titles corrected:** <N>
**Frontmatter titles flagged:** <N>
**Structural observations:** <N>

### Section titles corrected

| File | Before | After |
|---|---|---|
| analytics.yaml | "Organize your Analyses" | "Organize your analyses" |
| analytics.yaml | "Find and Fix Anomalies" | "Find and fix anomalies" |
| charts.yaml | "Chart Settings:" | "Chart settings" |

### Frontmatter titles flagged for tech writer review

These were not changed automatically. Review before merging.

| File | Current title | Issue |
|---|---|---|
| event-segmentation-overview.md | "Event Segmentation Overview" | Title case — should be sentence case |
| funnel-analysis-build.md | "Build a Funnel Analysis:" | Trailing colon |

### Structural observations (for editorial consideration)

1. `sdk-quickstart.md` is in the "Advanced" section of `developers.yaml` — consider moving it under a "Get started" section
2. ...

### Next steps

- Review flagged frontmatter titles and update manually if appropriate
- Review structural observations and consider nav reordering in a follow-up PR
- The nav changes in this commit are safe to merge with the content PR
```

## What this skill does NOT do

- Never reorders `entry:` items within a section (preserves deliberate editorial order)
- Never changes `id:` or `entry:` UUID values (changing these breaks navigation)
- Never moves pages between top-level nav groups (different nav file = different product area)
- Never modifies `content/collections/*.yaml` collection config files
- Never modifies `content/navigation/*.yaml` nav group definition files (Statamic manages these)
- Never changes file names, slugs, or URLs
- Never modifies frontmatter fields automatically

## Additional resources

- `.claude/skills/bulk-edit/references/collection-groups.md` — nav file mapping by group
- `content/trees/navigation/en/` — all navigation tree YAML files
- `.claude/CLAUDE.md` — heading style rules (sentence case, no end punctuation)
