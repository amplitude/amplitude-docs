# Article split criteria

Guidance for deciding when and how to split a legacy article into multiple focused articles.

## Table of contents

1. [When to split](#when-to-split)
2. [When not to split](#when-not-to-split)
3. [How to split](#how-to-split)
4. [Naming new files](#naming-new-files)

---

## When to split

Split an article when **any two** of the following are true:

| Signal | Example |
|---|---|
| Article exceeds ~1,200 words (excluding code blocks) | Long getting started page covering installation, configuration, and first use |
| Article has 4+ H2 sections on distinct topics | "Overview", "Configuration", "API reference", "Troubleshooting", "FAQ" |
| Article title uses "and" to join two concepts | "Events and properties", "Creating and managing cohorts" |
| Sections have different audiences | Some sections for developers, others for analysts |
| A single H2 section could stand alone as a complete article | "Troubleshooting" section is comprehensive enough to be its own page |
| The article is hard to summarize in one sentence | Can't describe what it's "about" without listing multiple unrelated things |

**Strong split indicators** (split even if only one is true):
- The article contains both conceptual content ("How X works") and procedural content ("How to configure X") at length
- A section is longer than the rest of the article combined

---

## When not to split

Do **not** split when:

- The article is a complete reference page (API parameters, SDK methods, configuration options) — these belong together even if long.
- Separating the content would require significant cross-referencing between the two articles to be understandable.
- The article is under 600 words — rewrite for concision rather than splitting.
- The sections are tightly ordered steps in a single workflow (numbered procedure articles should stay together).

---

## How to split

### Identify the split point

Find a natural boundary where the content shifts from one topic or task to another. Good split points are:

- After a conceptual overview, before the first procedure
- Between two unrelated procedures ("Creating X" and "Managing X" are often separate articles)
- Before a troubleshooting or FAQ section (these almost always work as standalone articles)
- Before an API reference section in a conceptual article

### Divide the content

1. Determine which content belongs in each new article.
2. Each new article must be self-contained — a reader shouldn't need to read the other article first to understand it.
3. Add a brief cross-reference at the end of each article pointing to the related article: `For more information, see [Article title](/docs/path/to/article).`
4. If both articles share prerequisites, include the prerequisites in both (don't force readers to read another article first).

### Preserve frontmatter

Copy the original YAML frontmatter to each new file. Update only the `title` field to match the new article's topic. Do not modify `id`, `blueprint`, or other fields.

---

## Naming new files

Use the same naming conventions as existing files in the collection (lowercase, hyphenated).

**Pattern**: Derive the filename from the new article's title.

| New title | Filename |
|---|---|
| Configure authentication | `configure-authentication.md` |
| Send your first event | `send-your-first-event.md` |
| Troubleshoot data discrepancies | `troubleshoot-data-discrepancies.md` |

Place new files in the same directory as the source file unless the collection structure suggests a subfolder.
