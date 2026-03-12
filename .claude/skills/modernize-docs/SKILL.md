---
name: modernize-docs
description: Modernizes legacy technical documentation for platform migration, LLM consumption, and localization readiness. Transforms single articles or entire sections of documentation by removing duplicative content, restructuring for single-topic focus, applying Amplitude style rules, and optimizing for translation and machine readability. Use when documentation needs to be modernized for a platform migration, prepared for translation, audited for duplication across multiple files, restructured for topic clarity, or improved for LLM/AI consumption. Triggers include "modernize this doc", "modernize this section", "prepare these docs for migration", "clean up legacy content", "optimize for translation", "deduplicate these articles", or "modernize docs".
---

# Modernize docs

Transforms legacy Amplitude documentation into modern, clean, platform-ready content. Applies the full Amplitude style guide, removes duplication, restructures for single-topic focus, and optimizes for LLM consumption and localization.

## Determine mode

**Single-file mode**: User provides one file path or pastes content directly.
→ Follow [Single-file workflow](#single-file-workflow)

**Batch mode**: User provides a directory path, collection name, or set of more than five files.
→ Follow [Batch workflow](#batch-workflow)

---

## Single-file workflow

```
1. Read the file
2. Analyze for issues
3. Rewrite and write to disk
4. Report changes
```

### Read

Load the file completely.

For pasted content, process inline, then ask for the destination path before writing.

### Analyze

Check for all of the following:

| Issue | Action | Reference |
|---|---|---|
| Article too long / mixed topics | Flag for splitting | `references/split-criteria.md` |
| Legacy structural problems | Rewrite | `references/legacy-patterns.md` |
| Localization anti-patterns | Rewrite | `references/localization-guide.md` |
| LLM readability issues | Rewrite | `references/llm-optimization.md` |
| Style rule violations | Rewrite | CLAUDE.md style rules |

If the article needs to be split, present a plan and wait for confirmation before proceeding. For style-only rewrites, proceed directly.

### Rewrite

Apply all transformations:

1. **Split** (if confirmed) — see `references/split-criteria.md`
2. **Restructure** — see `references/legacy-patterns.md`
3. **Style rules** — apply all rules from CLAUDE.md (two-pass active voice check required)
4. **LLM optimization** — see `references/llm-optimization.md`
5. **Localization** — see `references/localization-guide.md`

**Preserve Statamic frontmatter.** Never modify YAML frontmatter fields (`id`, `title`, `blueprint`, etc.). When splitting, copy the original frontmatter to each new file and update only `title`.

### Write to disk

- Overwrite the original file with the rewritten version.
- For splits, write each new file to the same directory as the source.

Report what changed.

---

## Batch workflow

Loading all files at once exceeds context limits for large sections. Use this three-phase approach instead.

```
Phase 1 — Scan (lightweight, all files)
Phase 2 — Dedup (targeted, flagged pairs only)
Phase 3 — Rewrite (sequential, one file at a time)
```

### Phase 1: Scan

**Goal**: Build a structural map of the section without loading full content.

1. Use Glob to list all `.md` files in the target directory (recursively if needed).
2. Use Grep to extract all headings (`^##`, `^###`) across all files in a single pass. This gives a heading inventory without loading file bodies.
3. For each file, read only the frontmatter and first 30 lines to capture the article title, opening paragraph, and top-level structure.
4. Note file sizes (larger files are split candidates).

From this scan, identify:

- **Duplication candidates**: Files with identical or near-identical H2/H3 headings (for example, "Prerequisites" or "Before you begin" appearing across many files is expected and fine — look for substantive topic headings that repeat).
- **Split candidates**: Files over ~1,200 words or with 4+ unrelated H2 sections. Use `references/split-criteria.md`.
- **Rewrite candidates**: All files (every file gets a full rewrite in Phase 3).

Present a scan summary to the user:

```
## Scan summary: [directory]

X files found.

### Duplication candidates
- "Configure authentication" heading appears in: file-a.md, file-c.md
- "Troubleshooting" section appears in: file-b.md, file-d.md, file-e.md

### Split candidates
- file-f.md (~2,400 words, 6 H2 sections)
- file-g.md (~1,800 words, mixed concepts)

### Rewrite queue
All X files will be rewritten in Phase 3.

Proceed with Phase 2 (dedup review)?
```

Wait for confirmation before continuing.

### Phase 2: Dedup

**Goal**: Resolve duplication before rewriting, so Phase 3 rewrites don't reproduce duplicate content.

Process duplication candidates in pairs or small groups (load 2–3 files at a time maximum).

For each group:
1. Load the full content of the flagged files.
2. Determine which file is the canonical home for the duplicated content.
3. Mark the others for removal or consolidation.
4. Make the dedup edits and write the affected files to disk immediately before moving to the next group.

For split candidates:
1. Load the full file.
2. Identify the split point per `references/split-criteria.md`.
3. Write the split files to disk and delete or truncate the original.

After each edit, unload the file content and move to the next candidate. Never hold more than 2–3 full files in context at once.

When all dedup and split work is complete, present a brief summary:

```
## Dedup complete

- Removed duplicate "Configure authentication" section from file-c.md (canonical: file-a.md)
- Consolidated "Troubleshooting" content into file-b.md; removed from file-d.md and file-e.md
- Split file-f.md into: topic-a.md, topic-b.md
- Split file-g.md into: concept-x.md, procedure-y.md

Proceed with Phase 3 (rewrites)?
```

Wait for confirmation before continuing.

### Phase 3: Rewrite

**Goal**: Apply all transformations to every file, one at a time.

Work through the file list sequentially. For each file:

1. Read the file.
2. Apply all transformations:
   - **Restructure** — see `references/legacy-patterns.md`
   - **Style rules** — apply all rules from CLAUDE.md (two-pass active voice check required)
   - **LLM optimization** — see `references/llm-optimization.md`
   - **Localization** — see `references/localization-guide.md`
3. Write to disk (overwrite).
4. Log the file as complete and move to the next.

**Preserve Statamic frontmatter.** Never modify YAML frontmatter fields.

Log progress as you go:

```
[1/24] ✓ event-tracking-overview.md
[2/24] ✓ send-events.md
[3/24] ✓ event-properties.md
...
```

After all files are complete, report a final summary:

```
## Batch modernization complete

X files rewritten.
Y files split (Z new files created).
W duplicate sections removed.

Files with significant structural changes:
- file-f.md → split into topic-a.md, topic-b.md
- file-a.md — removed duplicate auth section, restructured intro
```
