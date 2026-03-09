---
name: modernize-docs
description: Modernizes legacy technical documentation for platform migration, LLM consumption, and localization readiness. Transforms single articles or batches of articles by removing duplicative content, restructuring for single-topic focus, applying Amplitude style rules, and optimizing for translation and machine readability. Use when documentation needs to be modernized for a platform migration, prepared for translation, audited for duplication across multiple files, restructured for topic clarity, or improved for LLM/AI consumption. Triggers include "modernize this doc", "prepare these docs for migration", "clean up legacy content", "optimize for translation", "deduplicate these articles", or "modernize docs".
---

# Modernize docs

Transforms legacy Amplitude documentation into modern, clean, platform-ready content. Applies the full Amplitude style guide, removes duplication, restructures for single-topic focus, and optimizes for LLM consumption and localization.

## Workflow

```
1. Determine input type
2. Read all content
3. Analyze for issues
4. Present plan (if significant restructuring)
5. Execute rewrites
6. Write to disk
```

### Step 1: Determine input type

- **File path(s)**: Use Read tool to load each file
- **Pasted content**: Process inline, then ask for the destination file path before writing

### Step 2: Read all content

Read all provided files completely before analyzing. Deduplication analysis requires seeing all content at once.

### Step 3: Analyze for issues

Check for all of the following across all provided content:

| Issue | Action | Reference |
|---|---|---|
| Duplicate sections across files | Flag which to keep, which to remove | — |
| Article too long / mixed topics | Flag for splitting | `references/split-criteria.md` |
| Legacy structural problems | Rewrite | `references/legacy-patterns.md` |
| Localization anti-patterns | Rewrite | `references/localization-guide.md` |
| LLM readability issues | Rewrite | `references/llm-optimization.md` |
| Style rule violations | Rewrite | CLAUDE.md style rules |

### Step 4: Present plan (when required)

**Always present a plan before executing when:**
- An article will be split into multiple files
- Content will be deleted from a file (deduplication)
- More than three files are affected

For smaller changes (style rewrites, localization fixes within a single file), proceed directly.

Plan format:
```
## Modernization plan

### Files to rewrite
- `path/to/file.md` — summary of changes

### Files to split
- `path/to/long-article.md` → `path/to/topic-a.md` + `path/to/topic-b.md`

### Duplicated content
- Section "X" appears in file-a.md and file-b.md → keep in file-a.md, remove from file-b.md

Proceed?
```

Wait for confirmation before executing.

### Step 5: Execute rewrites

Apply all transformations to each file:

1. **Remove duplication** — delete or consolidate duplicated sections per the plan
2. **Restructure** — reorganize content for single-topic focus; see `references/legacy-patterns.md`
3. **Split** — if splitting, divide content at logical boundaries; see `references/split-criteria.md`
4. **Style rules** — apply all Amplitude style rules from CLAUDE.md (two-pass active voice check required)
5. **LLM optimization** — see `references/llm-optimization.md`
6. **Localization** — see `references/localization-guide.md`

**Preserve Statamic frontmatter.** Never modify YAML frontmatter fields (`id`, `title`, `blueprint`, etc.). When splitting, copy the original frontmatter to each new file, then update `title` to match the split article's topic.

### Step 6: Write to disk

- **Rewrites**: Overwrite the original file
- **Splits**: Write each new file to the same directory as the source
- **Deleted content**: Overwrite the source with the deduplicated version

After writing, report a summary:
```
## Changes made

- Rewrote `path/to/file.md` — applied style rules, fixed passive voice, localization cleanup
- Split `path/to/long-article.md` into:
  - `path/to/topic-a.md`
  - `path/to/topic-b.md`
- Removed duplicate "Prerequisites" section from `path/to/file-b.md` (canonical version in `path/to/file-a.md`)
```
