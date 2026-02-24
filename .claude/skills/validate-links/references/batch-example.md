# Batch Validation Example

When validating multiple files, process each file separately, then provide a combined summary.

## Example Single-File Report

**User:** "Validate links in lifecycle-interpret.md"

```markdown
## Link Validation Report for lifecycle-interpret.md

### Correct Links: 2

- Line 16: `/docs/analytics/charts/lifecycle/lifecycle-track-growth` ✓
- Line 36: `/docs/analytics/charts/review-chart-data` ✓

### Issues Found: 1

#### Issue 1: Relative path with .md extension
- **Line 58:** `[Growth chart](../lifecycle/lifecycle-growth.md)`
- **Problem:** Uses relative path and includes .md extension.
- **Suggested fix:** `[Growth chart](/docs/analytics/charts/lifecycle/lifecycle-growth)`
- **Confidence:** High

### Skipped Links: 3

- 2 external links (not validated)
- 1 image link (not validated)

### Summary

- **Total links checked:** 6
- **Valid links:** 2
- **Issues found:** 1
- **External/image links (skipped):** 3

---

Would you like me to fix this automatically?
```

## Example Batch Report

**User:** "Check links in all files in the lifecycle collection"

After validating each file individually, provide a combined summary:

```markdown
## Batch Link Validation Report

Validated 5 files:

### Summary by File

1. **lifecycle-interpret.md**: 1 issue (relative path)
2. **event-segmentation.md**: 3 issues (2 relative paths, 1 .md extension)
3. **funnel-analysis.md**: All links valid.
4. **retention-overview.md**: 2 issues (missing /docs/ prefix)
5. **cohorts.md**: All links valid.

### Total Summary

- **Files checked:** 5
- **Files with issues:** 3
- **Total issues:** 6
- **Most common issue:** Relative paths (3 occurrences)

Would you like me to fix all issues automatically?
```

## Tips for Contributors

1. Always start internal links with `/docs/`.
2. Never use relative paths (`../` or `./`).
3. Never include `.md` extensions in links.
4. Check CLAUDE.md or `references/collection-routes.md` for the collection route reference.
5. Use full web routes even for files in the same directory.
