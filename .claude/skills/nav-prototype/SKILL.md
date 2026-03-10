---
name: nav-prototype
description: >
  Redesigns a Statamic sidebar navigation section by analyzing structural problems and generating three architecture prototype alternatives as swappable YAML files. Use when a user wants to "redesign navigation", "prototype nav options", "restructure the sidebar", "create nav alternatives", "fix nav hierarchy", or wants to explore layout options for a documentation section before committing to a change. Produces Option 1 (user journey), Option 2 (product-first), Option 3 (flattened zones), a bash switcher script, and activates Option 1 as the default.
---

# Nav Prototype

Generate three alternative navigation architecture prototypes for any Statamic nav tree section. Outputs swappable YAML files and a bash switcher script, then activates Option 1.

## Reference files

Read these before starting:
- `references/statamic-nav.md` — YAML format, node types, UUID index pattern, file naming conventions
- `references/ia-principles.md` — structural problem checklist, three architecture patterns, design principles

## Invocation

```
/nav-prototype file:<path-to-nav-yaml>
```

Example:
```
/nav-prototype file:content/trees/navigation/en/guides_and_surveys.yaml
```

## Step 1: Parse the nav tree

Read the target nav YAML file. Walk the `tree:` array recursively and build a flat list of all nodes, capturing for each:
- Node type (page entry / section group / URL entry)
- Navigation depth (1 = top level)
- Parent section title
- `entry:` UUID value (page entries only)

For the YAML format, see `references/statamic-nav.md`.

## Step 2: Build the UUID index

Identify the collection associated with the nav tree. Collection content files live at:
```
content/collections/<collection-name>/en/*.md
```

Read each file's YAML frontmatter and extract `id:` and `title:`. Build a lookup table `{ uuid → title }` to resolve all `entry:` values to human-readable page titles.

If the nav file name doesn't make the collection name obvious (for example, `guides_and_surveys.yaml` → `guides_and_surveys`), check `content/collections/` for a matching folder name.

## Step 3: Diagnose structural problems

Using the parsed tree and UUID index, apply the seven-item checklist from `references/ia-principles.md`. For each problem found, note:
- What it is
- Which items are affected
- Which design principle it violates

Produce a diagnosis summary to include in the final report.

## Step 4: Generate three prototype YAML files

Read `references/ia-principles.md` for the three architecture patterns.

For each option, generate a complete, valid Statamic nav YAML file. Rules:
- All `entry:` UUIDs must be preserved exactly as-is — never modify content UUIDs
- All nav node `id:` values must be unique within the file — reuse existing node `id:` values where possible; generate new synthetic UUIDs for new section groups using the format `a1000001-0001-4000-a000-000000000001`, incrementing the third segment for each new group
- Add a comment block at the top of each file describing the option's architecture principle
- Every page from the original must appear in exactly one option (no pages dropped, no duplicates unless intentional and noted in a comment)

Write the three files:
- `<nav-dir>/<nav-name>.option1.yaml` — User journey architecture
- `<nav-dir>/<nav-name>.option2.yaml` — Product-first with shared section
- `<nav-dir>/<nav-name>.option3.yaml` — Flattened zones

## Step 5: Back up the original and create the switcher script

**Back up the original** (skip if `.original.yaml` already exists):
```bash
cp <nav-dir>/<nav-name>.yaml <nav-dir>/<nav-name>.original.yaml
```

**Create `switch-nav.sh`** at the repo root (or update it if it already exists for this nav file).

The script must:
- Accept a single argument: `0` (restore original), `1`, `2`, or `3`
- Copy the selected `*.option{N}.yaml` or `.original.yaml` to the active nav file
- Print a confirmation message with the source and target paths
- Use `set -euo pipefail`
- Exit with an error message for invalid arguments or missing source files

## Step 6: Activate Option 1 and report

Copy `option1.yaml` to the active nav file:
```bash
cp <nav-dir>/<nav-name>.option1.yaml <nav-dir>/<nav-name>.yaml
```

Then output the following report:

---

```
## Nav prototype complete — <nav-name>

**Active option:** Option 1 (User journey architecture)

### Problems diagnosed in original nav

<list of structural problems with design principle citations>

---

### Options created

#### Option 1: User journey architecture (active)
<top-level section structure in order>
**Principle:** Progressive disclosure — orientation before detail, concept before mechanism.

#### Option 2: Product-first with shared <section-name> section
<top-level section structure in order>
**Principle:** Gestalt similarity — product sections primary; shared features grouped by similarity.

#### Option 3: Flattened zones
<top-level section structure in order>
**Principle:** Visibility of system status — users always see full nav scope without toggle interaction.
Note: Full visual effect requires CSS/template change to `side-nav.antlers.html`.

---

### Files created

| File | Purpose |
|------|---------|
| `<nav-name>.original.yaml` | Backup of original nav |
| `<nav-name>.option1.yaml` | User journey prototype |
| `<nav-name>.option2.yaml` | Product-first prototype |
| `<nav-name>.option3.yaml` | Flattened zones prototype |
| `switch-nav.sh` | Swap active nav between options |

### Switch commands

    ./switch-nav.sh 0   # Restore original
    ./switch-nav.sh 1   # Option 1: User journey (currently active)
    ./switch-nav.sh 2   # Option 2: Product-first
    ./switch-nav.sh 3   # Option 3: Flattened zones
```
