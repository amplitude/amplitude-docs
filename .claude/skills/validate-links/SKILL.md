---
name: validate-links
description: Check documentation files for incorrect internal link formats and suggest corrections.
---

# Validate Links

Check documentation files for incorrect internal link formats and suggest corrections.

## When to Use This Skill

Use this skill to validate that internal links follow Statamic routing conventions.

**Invoke with:**
- `/validate-links`
- "Check the links in this file"
- "Validate internal links"
- "Are my links correct?"

## What This Skill Does

This skill scans documentation files for common link errors and provides a detailed report with suggested corrections:

1. Extracts all markdown links from the file
2. Categorizes links (internal, external, images, anchors)
3. Validates internal documentation links against Statamic routing rules
4. Reports issues with line numbers
5. Suggests corrections
6. Optionally auto-fixes issues

## Common Link Errors

### 1. Relative Paths with `../`

**Incorrect:**
```markdown
[Lifecycle](../lifecycle/lifecycle-interpret.md)
[Browser SDK](../../sdks/browser/browser-sdk-2.md)
```

**Correct:**
```markdown
[Lifecycle](/docs/analytics/charts/lifecycle/lifecycle-interpret)
[Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2)
```

**Problem:** Relative paths break when files are moved and don't match Statamic's routing system.

### 2. Markdown Extensions

**Incorrect:**
```markdown
[API docs](/docs/apis/analytics/taxonomy.md)
[Chart guide](/docs/analytics/chart.md)
```

**Correct:**
```markdown
[API docs](/docs/apis/analytics/taxonomy)
[Chart guide](/docs/analytics/chart)
```

**Problem:** Web routes don't include `.md` extensions.

### 3. File Paths Instead of Web Routes

**Incorrect:**
```markdown
[Doc](/content/collections/analytics/en/chart.md)
[Guide](content/collections/data/en/sources.md)
```

**Correct:**
```markdown
[Doc](/docs/analytics/chart)
[Guide](/docs/data/sources)
```

**Problem:** These are repository file paths, not web URLs.

### 4. Missing `/docs/` Prefix

**Incorrect:**
```markdown
[Analytics](/analytics/chart)
[Audiences](/data/audiences/cohorts)
[SDK](/sdks/browser/installation)
```

**Correct:**
```markdown
[Analytics](/docs/analytics/chart)
[Audiences](/docs/data/audiences/cohorts)
[SDK](/docs/sdks/browser/installation)
```

**Problem:** All documentation routes must start with `/docs/`.

**Exception:** External links (starting with `http://` or `https://`) don't need `/docs/`.

## Validation Process

### Step 1: Extract All Links

Find all markdown links in the format `[text](url)`.

### Step 2: Categorize Links

Categorize each link for appropriate handling:

**External links** (skip validation):
- Start with `http://` or `https://`
- Examples: `https://amplitude.com`, `https://github.com/amplitude`

**Image links** (skip validation):
- Point to `/docs/output/img/` or `statamic://asset::`
- Examples: `![Alt text](/docs/output/img/analytics/chart.png)`

**Anchor links** (skip validation):
- Start with `#` only
- Examples: `[Section](#heading)`

**Internal documentation links** (validate these):
- Everything else that should point to other documentation pages

### Step 3: Check Internal Links

For each internal documentation link, verify it:
1. Starts with `/docs/`
2. Doesn't contain `../` or `./`
3. Doesn't end with `.md`
4. Doesn't contain `/content/collections/`
5. Follows valid collection route patterns

### Step 4: Suggest Corrections

For invalid links:
1. Identify the target file (if possible from context)
2. Look up the correct collection route from CLAUDE.md
3. Suggest the proper `/docs/` format
4. Indicate confidence level (high, medium, low)

## Output Format

Provide a detailed report in this format:

```markdown
## Link Validation Report for [filename]

### Correct Links: [count]

- Line [number]: `[text](/docs/collection/slug)` ✓
- Line [number]: `[text](/docs/another-collection/slug)` ✓

### Issues Found: [count]

#### Issue 1: Relative path with .md extension
- **Line [number]:** `[Growth chart](../lifecycle/lifecycle-growth.md)`
- **Problem:** Uses relative path and includes .md extension
- **Suggested fix:** `[Growth chart](/docs/analytics/charts/lifecycle/lifecycle-growth)`
- **Confidence:** High

#### Issue 2: Missing /docs/ prefix
- **Line [number]:** `[Settings](/admin/account-management/settings)`
- **Problem:** Missing /docs/ prefix
- **Suggested fix:** `[Settings](/docs/admin/account-management/settings)`
- **Confidence:** High

#### Issue 3: Markdown extension
- **Line [number]:** `[API docs](/docs/apis/analytics/taxonomy.md)`
- **Problem:** Includes .md extension
- **Suggested fix:** `[API docs](/docs/apis/analytics/taxonomy)`
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

## Confidence Levels

When suggesting fixes, indicate your confidence level:

### High Confidence
The correction is clearly determinable from the link structure.

**Example:**
```
[Lifecycle](../lifecycle/lifecycle-interpret.md)
→ /docs/analytics/charts/lifecycle/lifecycle-interpret
```

### Medium Confidence
Can infer the collection, but should verify the file exists.

**Example:**
```
[Cohorts](/data/cohorts)
→ /docs/data/audiences/cohorts (verify file exists)
```

### Low Confidence
Can't determine the correct route from context.

**Example:**
```
[Guide](../guide.md)
→ Unable to determine correct collection - please specify
```

## Auto-Fix Mode

If the user requests automatic fixes:

1. **Confirm the fixes** you'll make
2. **Apply corrections** using the Edit tool
3. **Report what was changed:**
   ```markdown
   ## Applied Fixes

   Fixed [number] link(s):

   1. Line [number]: Changed `[text](old-link)` to `[text](new-link)`
   2. Line [number]: Changed `[text](old-link)` to `[text](new-link)`

   All internal links now follow Statamic routing conventions.
   ```

## Special Cases

### Anchors (These Are OK)

Links with anchors are valid:
```markdown
[Section heading](/docs/analytics/chart#specific-section)
[Installation](/docs/sdks/browser/sdk#installation)
```

### External Links (Don't Validate)

These are fine as-is:
```markdown
[Amplitude Website](https://amplitude.com)
[GitHub Repository](https://github.com/amplitude/amplitude-docs)
[Help Center](https://help.amplitude.com)
```

### Image Links (Don't Validate)

Images use different path conventions:
```markdown
![Dashboard screenshot](/docs/output/img/analytics/dashboard.png)
![Workflow diagram](statamic://asset::help_center_conversions::diagrams/workflow.svg)
```

### Guides and Surveys Collection

This collection uses a special `{section}` pattern:
- Route: `/docs/guides-and-surveys/{section}/{slug}`
- Example: `/docs/guides-and-surveys/customization/content-editor`

## Common Collection Routes (Quick Reference)

Use these mappings when suggesting corrections:

| Collection | Route Pattern |
|-----------|---------------|
| analytics | `/docs/analytics/{slug}` |
| charts | `/docs/analytics/charts/{slug}` |
| event-segmentation | `/docs/analytics/charts/event-segmentation/{slug}` |
| funnel-analysis | `/docs/analytics/charts/funnel-analysis/{slug}` |
| lifecycle | `/docs/analytics/charts/lifecycle/{slug}` |
| retention-analysis | `/docs/analytics/charts/retention-analysis/{slug}` |
| data | `/docs/data/{slug}` |
| audiences | `/docs/data/audiences/{slug}` |
| sources | `/docs/data/sources/{slug}` |
| destination-catalog | `/docs/data/destination-catalog/{slug}` |
| session-replay | `/docs/session-replay/{slug}` |
| experiment | `/docs/feature-experiment/{slug}` |
| browser_sdk | `/docs/sdks/analytics/browser/{slug}` |
| ios_sdk | `/docs/sdks/analytics/ios/{slug}` |
| android_sdk | `/docs/sdks/analytics/android/{slug}` |
| api | `/docs/apis/analytics/{slug}` |
| admin | `/docs/admin/{slug}` |
| account-management | `/docs/admin/account-management/{slug}` |

For a complete list, refer to CLAUDE.md or `.cursor/rules/statamic-routing.mdc`.

## Example Validation Session

**User:** "Validate links in this file"

**Your response:**

```markdown
## Link Validation Report for lifecycle-interpret.md

### Correct Links: 2

- Line 16: `/docs/analytics/charts/lifecycle/lifecycle-track-growth` ✓
- Line 36: `/docs/analytics/charts/review-chart-data` ✓

### Issues Found: 1

#### Issue 1: Relative path with .md extension
- **Line 58:** `[Growth chart](../lifecycle/lifecycle-growth.md)`
- **Problem:** Uses relative path and includes .md extension
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

## Helpful Tips for Users

After validation, provide these reminders:

1. **Always start internal links with `/docs/`**
2. **Never use relative paths** (`../` or `./`)
3. **Never include `.md` extensions** in links
4. **Check CLAUDE.md** for the collection route reference
5. **Use full web routes** even for files in the same directory

## Integration with Other Skills

This skill complements:
- **`/document-feature`**: Validates links in newly created documentation
- **`/edit-doc`**: Can be run after style corrections to verify links
- **CLAUDE.md**: Uses the same collection route mappings

## Batch Mode (Multiple Files)

If asked to validate multiple files:

1. Process each file separately
2. Combine results into a summary report
3. Group issues by type (relative paths, missing /docs/, etc.)
4. Prioritize critical issues (broken routes)

**Example batch summary:**
```markdown
## Batch Link Validation Report

Validated 5 files:

### Summary by File

1. **lifecycle-interpret.md**: 1 issue (relative path)
2. **event-segmentation.md**: 3 issues (2 relative paths, 1 .md extension)
3. **funnel-analysis.md**: All links valid
4. **retention-overview.md**: 2 issues (missing /docs/ prefix)
5. **cohorts.md**: All links valid

### Total Summary

- **Files checked:** 5
- **Files with issues:** 3
- **Total issues:** 6
- **Most common issue:** Relative paths (3 occurrences)

Would you like me to fix all issues automatically?
```

## Performance Notes

- Fast validation for files with < 100 links
- For very large files (200+ links), report progress
- Prioritize showing critical errors first
- Group similar issues together for clarity
