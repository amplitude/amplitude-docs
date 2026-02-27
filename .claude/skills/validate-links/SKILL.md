---
name: validate-links
description: This skill should be used when the user wants to "check links", "validate internal links", "verify links in this file", "are my links correct", "fix broken links", or needs to confirm that documentation links follow Statamic routing conventions.
version: 0.1.0
---

# Validate Links

Check documentation files for incorrect internal link formats and suggest corrections.

## About This Skill

This skill scans documentation files for common link errors, validates internal links against Statamic routing rules, reports issues with line numbers and suggested corrections, and optionally applies fixes automatically.

## Common Link Errors

### Relative paths with `../`

```markdown
❌ [Lifecycle](../lifecycle/lifecycle-interpret.md)
✅ [Lifecycle](/docs/analytics/charts/lifecycle/lifecycle-interpret)
```

### Markdown extensions

```markdown
❌ [API docs](/docs/apis/analytics/taxonomy.md)
✅ [API docs](/docs/apis/analytics/taxonomy)
```

### File paths instead of web routes

```markdown
❌ [Doc](/content/collections/analytics/en/chart.md)
✅ [Doc](/docs/analytics/chart)
```

### Missing `/docs/` prefix

```markdown
❌ [Analytics](/analytics/chart)
✅ [Analytics](/docs/analytics/chart)
```

## Validation Process

### Step 1: Extract All Links

Find all markdown links in the format `[text](url)`.

### Step 2: Categorize Links

**Skip validation for:**
- External links starting with `http://` or `https://`.
- Image links pointing to `/docs/output/img/` or `statamic://asset::`.
- Anchor-only links starting with `#`.

**Validate:**
- All other internal documentation links.

### Step 3: Check Internal Links

For each internal link, verify it:
1. Starts with `/docs/`.
2. Doesn't contain `../` or `./`.
3. Doesn't end with `.md`.
4. Doesn't contain `/content/collections/`.
5. Follows a valid collection route pattern.

### Step 4: Suggest Corrections

For each invalid link:
1. Identify the target file from context.
2. Look up the correct collection route from CLAUDE.md or `references/collection-routes.md`.
3. Suggest the correct `/docs/` format.
4. Indicate confidence level: **High** (clearly determinable), **Medium** (inferable, verify file exists), or **Low** (can't determine — ask the contributor).

## Output Format

```markdown
## Link Validation Report for [filename]

### Correct Links: [count]

- Line [number]: `/docs/collection/slug` ✓

### Issues Found: [count]

#### Issue 1: Relative path with .md extension
- **Line [number]:** `[Growth chart](../lifecycle/lifecycle-growth.md)`
- **Problem:** Uses relative path and includes .md extension.
- **Suggested fix:** `[Growth chart](/docs/analytics/charts/lifecycle/lifecycle-growth)`
- **Confidence:** High

### Skipped Links: [count]

- [count] external links (not validated)
- [count] image links (not validated)
- [count] anchor links (not validated)

### Summary

- **Total links checked:** [number]
- **Valid links:** [number]
- **Issues found:** [number]
- **External/image/anchor links (skipped):** [number]

---

Would you like me to fix these issues automatically?
```

## Auto-Fix Mode

If the user requests automatic fixes:

1. Confirm the fixes to be made.
2. Apply corrections using the Edit tool.
3. Report what changed:

```markdown
## Applied Fixes

Fixed [number] link(s):

1. Line [number]: Changed `[text](old-link)` to `[text](new-link)`

All internal links now follow Statamic routing conventions.
```

## Special Cases

- **Anchors are valid:** `/docs/analytics/chart#specific-section` — don't flag these.
- **Guides and Surveys** uses a special `{section}` pattern: `/docs/guides-and-surveys/{section}/{slug}`.
- **Batch mode:** Process each file separately, then provide a combined summary. See `references/batch-example.md`.

## Additional Resources

### Reference Files

- **`references/collection-routes.md`** — Full collection-to-route mapping table.
- **`references/batch-example.md`** — Example batch validation report for multiple files.

### Related Skills

- **`/document-feature`** — Validate links in newly created documentation.
- **`/edit-doc`** — Run after style corrections to verify links weren't broken.
