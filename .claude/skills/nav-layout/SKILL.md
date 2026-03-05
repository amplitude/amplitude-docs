---
name: nav-layout
description: This skill should be used when the user wants to "analyze navigation structure", "audit nav hierarchy", "check navigation layout", "find orphaned pages", "evaluate nav for a persona", "check if nav fits the reader", or "audit navigation depth and coverage". The bulk-edit skill invokes this automatically after /taxonomy-nav completes for each persona group.
version: 1.0.0
---

# Nav Layout

Analyze the navigation structure and layout for a persona group's documentation. Produces an actionable report for tech writers covering hierarchy depth, orphaned pages, stale nav references, direct URL usage, and whether the overall nav structure serves the persona's reading goals.

## About This Skill

This skill runs **after** `/taxonomy-nav` (which corrects sentence case on section titles) and **before** `/validate-style` (QA sampling). It is read-only — it never modifies YAML files, moves pages, or changes UUIDs.

It answers the question: *Does this navigation structure actually work for the person reading it?*

## Invocation

```
/nav-layout group:<group-name> branch:<branch-name>
```

Or for a single nav tree file:

```
/nav-layout file:content/trees/navigation/en/analytics.yaml
```

Arguments:
- `group` — required when auditing a persona group. Must match a group name in `.claude/skills/bulk-edit/references/collection-groups.md`.
- `branch` — required alongside `group`. Used to scope the UUID index to changed documents.
- `file` — alternative to `group`/`branch` for auditing a single nav tree.

## Step 1: Load inputs

Read these reference files before doing any other work:

- `.claude/docs/personas.md` — persona definitions, including the group's collections and writing goals
- `.claude/skills/bulk-edit/references/collection-groups.md` — collection-to-group lookup and nav tree file mapping

From `collection-groups.md`, extract:
1. The list of collections belonging to the target group
2. The list of nav tree files for the group (from the "Navigation tree files by group" table)

## Step 2: Build the document UUID index

For every collection in the group, use Glob to find all `.md` files:

```
content/collections/<collection-name>/en/*.md
```

For each file, read the frontmatter and extract:
- `id` — the Statamic UUID for this document
- `title` — the document's display title

Build a lookup table: `{ uuid → { title, file_path, collection } }`

This index lets you cross-reference `entry:` UUIDs in nav trees against real documents.

## Step 3: Parse the nav tree files

For each nav tree YAML file in the group (from `content/trees/navigation/en/`), read the full file and walk every node in the `tree:` array recursively.

Classify each node as one of three types:

**Page entry** — has `entry:` field (references a document UUID):
```yaml
-
  id: <uuid>
  entry: <document-uuid>
  title: 'Optional override title'   # optional
```

**Section group** — has `title:` and `children:` fields (no `entry:`):
```yaml
-
  id: <uuid>
  title: 'Section name'
  children:
    - ...
```

**URL entry** — has `url:` field instead of `entry:`:
```yaml
-
  id: <uuid>
  title: 'Link label'
  url: /docs/some/path
```

For each node, record:
- Node type (page entry / section group / URL entry)
- Navigation depth (1 = top level, 2 = inside one section, 3 = inside a nested section, etc.)
- Parent section title (for page entries)
- Child count (for section groups)
- Target UUID (for page entries)
- URL value (for URL entries)

## Step 4: Hierarchy depth audit

Using the parsed nav tree, count the number of page entries at each depth level.

**Flag: Pages at depth 4+**
Any page entry at depth 4 or deeper is likely too buried. Report its title, path (section > subsection > ... > page), and current depth.

**Flag: Single-child sections**
A section group with exactly 1 child page entry wastes a hierarchy level. The page could be a direct top-level entry instead (or the section could be merged with another). Report: section title, the single child page title, and which nav file contains it.

Cap this list at 10 entries if there are many. Report the total count.

## Step 5: Coverage audit

### Orphaned pages

Compare the document UUID index (Step 2) against all `entry:` UUIDs collected from nav trees (Step 3).

A document is **orphaned** if its UUID appears in no nav tree for the group. Orphaned pages exist in the collection but aren't accessible through navigation.

Report:
- File path of the orphaned document
- Its `title`
- Its collection

Cap the report at 5 orphaned pages. If more exist, report the total count.

### Stale nav references

Compare all `entry:` UUIDs in nav trees against the document UUID index.

A nav reference is **stale** if its `entry:` UUID doesn't match any document in the group's collections. This indicates a document was deleted but the nav entry was never removed.

Report:
- Which nav file contains the stale reference
- The stale UUID value
- The parent section the stale entry lives under

Cap the report at 5 stale references. If more exist, report the total count.

## Step 6: URL reference audit

Find all nodes with a `url:` field (direct URL instead of `entry:` UUID reference).

For each URL entry:
1. Note the URL value
2. Check whether a document exists in the UUID index whose path matches or approximates the URL slug
3. If a matching document exists, note that it could be replaced with a proper `entry:` UUID reference

Direct URL references are harder to maintain — if a page is moved or renamed, the URL reference breaks silently while a UUID reference would still resolve.

Report all URL entries found (don't cap — these are rare and all worth flagging).

## Step 7: Persona-fit analysis

Evaluate the top-level section structure (depth-1 section group titles, in order) against the persona's reading goals.

Read the persona definition for the group from `.claude/docs/personas.md`.

Then apply the persona-specific checks below. For each check, look at the actual top-level section titles in the nav tree and note whether the structural expectation is met, partially met, or missing.

### Persona-specific checks

**Developers** (`bulk-edit/developers`):
- Is there a quickstart or "Get started" section within the first 3 top-level sections?
- Are version-specific sections clearly labeled (e.g., "SDK 2.0", "Legacy SDK")?
- Is there a dedicated reference or API section (method signatures, configuration options)?
- Are platform differences (iOS, Android, web) easy to navigate between?

**API users** (`bulk-edit/api-users`):
- Is there a dedicated authentication section at the top level?
- Are endpoints organized by resource type rather than being a flat list?
- Are rate limits, quotas, and pagination guidelines findable without drilling deep?

**Data engineers** (`bulk-edit/data-engineers`):
- Are "Sources" and "Destinations" clearly separated into distinct top-level sections?
- Is warehouse-specific content (BigQuery, Snowflake, Redshift) in its own section or clearly labeled subsections?
- Is there a schema or field reference section?

**Analysts and PMs** (`bulk-edit/analysts-pms`):
- Is there an orientation or overview section near the top?
- Are chart types organized by what question they answer (not just alphabetically)?
- Is there a dedicated "Advanced" or "Power user" section separate from basic content?

**Experimenters** (`bulk-edit/experimenters`):
- Does the nav order reflect the experiment lifecycle: set up → run → analyze?
- Is there a dedicated section for interpreting results?
- Are SDK setup docs and conceptual/theory docs in clearly separate sections?

**Engagement and survey authors** (`bulk-edit/engagement-survey-authors`):
- Does the nav structure reflect a creation workflow (create → target → publish → analyze)?
- Are templates or quickstarts in a prominent position?

**Admins and IT** (`bulk-edit/admins-it`):
- Are permissions and RBAC content in a dedicated, findable section?
- Is SSO setup accessible at the top level or within one click?
- Are billing and account management clearly separated from access control?

**General onboarding** (`bulk-edit/general-onboarding`):
- Is there a clear first-steps or orientation path for new users?
- Is troubleshooting and FAQ content at the end (not buried mid-structure)?
- Is migration content in its own dedicated section?

### Output format for persona-fit analysis

Report each check as one of three states:
- ✅ **Met** — the structural expectation is satisfied
- ⚠️ **Partial** — partially addressed but could be improved
- ❌ **Missing** — not present in the current nav structure

List up to 3 actionable recommendations for the most impactful structural improvements.

## Step 8: Emit the report

Output the following markdown report. This is suitable for posting as a PR comment.

```markdown
## Nav Layout Report — <group>

**Branch:** bulk-edit/<group>
**Persona:** <persona name>
**Nav files analyzed:** <N>
**Total pages indexed:** <N>

---

### Hierarchy depth

| Depth | Pages | Notes |
|---|---|---|
| Level 1 (top-level) | N | Direct nav entries |
| Level 2 | N | Inside one section |
| Level 3 | N | Inside nested section |
| Level 4+ | N | ⚠️ Consider flattening |

**Single-child sections** (wrapper section with only 1 page — consider flattening):
- "<Section name>" in `<nav-file>.yaml` wraps only "<page title>"
- (N total)

---

### Coverage

**Orphaned pages** (in collections but missing from nav):
| File | Title | Collection |
|---|---|---|
| `content/collections/.../page.md` | "Page Title" | collection-name |
(N total — showing first 5)

**Stale nav references** (UUID in nav but no matching document):
| Nav file | UUID | Parent section |
|---|---|---|
| `analytics.yaml` | `abc-123` | "Advanced features" |
(N total — showing first 5)

---

### URL references (prefer UUID-based entries)

| Nav file | URL | Matching document found? |
|---|---|---|
| `developers.yaml` | `/docs/sdks/quickstart` | ✅ Yes — `sdk-quickstart.md` (UUID: `xyz`) |
| `apis.yaml` | `/docs/apis/overview` | ❌ No match found |

---

### Persona-fit analysis

**Persona:** <name> — <one-sentence description>

| Check | Status | Notes |
|---|---|---|
| Quickstart section in first 3 sections | ✅ Met | "Get started" is section 2 |
| Version-specific labels on SDK sections | ⚠️ Partial | "Browser SDK" has no version label |
| Reference/API section present | ❌ Missing | No dedicated reference section found |

**Top-level sections (current order):**
1. "Get started"
2. "Browser SDK"
3. "Node.js SDK"
4. "Advanced"

**Recommendations:**
1. Add a version label to "Browser SDK" → "Browser SDK 2.0" to distinguish from legacy content
2. Create a "Reference" section grouping the 4 method-reference pages currently scattered across sections
3. The "Advanced" section contains 12 pages — consider splitting into "Advanced configuration" and "Migration guides"

---

### Summary

| Check | Result | Count |
|---|---|---|
| Pages at depth 4+ | ⚠️ | N |
| Single-child sections | ⚠️ | N |
| Orphaned pages | ⚠️ | N |
| Stale nav references | ⚠️ | N |
| URL references | ℹ️ | N |
| Persona layout gaps | ⚠️ | N |

**All findings require tech writer review and deliberate editorial decision before implementation.**
No changes were made to any files. This report is for human review only.
```

## What this skill does NOT do

- Never modifies `content/trees/navigation/en/*.yaml` files
- Never modifies `content/navigation/*.yaml` nav group definition files
- Never modifies `content/collections/*.yaml` collection config files
- Never changes `id:` or `entry:` UUID values
- Never reorders entries within a section
- Never moves pages between sections or nav files
- Never creates or deletes any files
- Never commits anything

## Integration with /bulk-edit

When invoked by the `/bulk-edit` orchestrator (Step 6.5):

1. The orchestrator passes `group:<group-name> branch:<branch-name>`
2. The nav-layout agent emits its report as text output
3. The orchestrator saves the report to post as a PR comment in Step 8
4. The report is also summarized in the PR body (counts only — the full report goes in a comment)

The nav-layout report does not produce a PASS/WARN/FAIL signal. It is always informational — it surfaces issues for tech writer review and doesn't block PR creation.

## Additional resources

- `.claude/docs/personas.md` — persona definitions
- `.claude/skills/bulk-edit/references/collection-groups.md` — nav tree file mapping
- `.claude/skills/taxonomy-nav/SKILL.md` — runs before this skill (sentence case fixes)
- `.claude/skills/validate-style/SKILL.md` — runs after this skill (QA sampling)
- `content/trees/navigation/en/` — all nav tree YAML files
