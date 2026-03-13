# Legacy documentation patterns

Common patterns found in legacy Amplitude documentation, and how to fix them.

## Table of contents

1. [Structural problems](#structural-problems)
2. [Content problems](#content-problems)
3. [Formatting problems](#formatting-problems)

---

## Structural problems

### Monolithic articles (mixed topics)

A single article covers multiple distinct topics or procedures that each deserve their own page.

**Signs**: Article has 3+ H2 sections with unrelated subjects, or multiple "Overview" subsections, or a title that uses "and" to combine two concepts.

**Fix**: See `references/split-criteria.md` for split decision guidance. When splitting, each new article should have a single, focused title.

---

### Nested prerequisites buried in body

Prerequisites are scattered through the article rather than stated upfront.

**Signs**: "Note: Before doing this, you must first..." appearing mid-page. "This assumes you have already configured..." buried in a step.

**Fix**: Consolidate all prerequisites into a `## Before you begin` section immediately after the intro paragraph.

---

### Orphaned notes and warnings

Callout boxes or inline notes that reference outdated behavior, deprecated features, or historical context with no current relevance.

**Signs**: "As of version X...", "Previously, this was handled by...", "Note: This changed in [year]...", notes that reference features or workflows that no longer exist.

**Fix**: Remove if the information is no longer relevant. If still relevant, rewrite as a current-state statement without the historical framing.

---

### Redundant intro paragraphs

Opening paragraphs that restate the page title or describe what the article is about instead of providing useful context.

**Signs**: "This article explains how to configure X. In this article, you will learn about X. X is a feature that lets you..."

**Fix**: Remove the self-referential restatement. Start with a single sentence that describes what the feature does or what the user accomplishes, then move directly into content.

---

### Stacked contributor voice

Multiple contributors added sections over time without editing for consistency, resulting in tonal and stylistic shifts mid-article.

**Signs**: Sudden shift from imperative ("Click Save") to descriptive ("The user then clicks Save"). Mix of formal and casual registers. Repeated context-setting within the same article ("As mentioned, X is important because...").

**Fix**: Rewrite for consistent voice and tense throughout. Remove context re-establishment; readers won't forget what they read two paragraphs ago.

---

### "Overview" sections that don't overview

H2 sections labeled "Overview" that contain procedural steps, or "Introduction" sections that contain reference material.

**Signs**: An "Overview" section that starts with numbered steps. An "Introduction" that lists parameters.

**Fix**: Rename headings to describe the actual content. "Overview" should give a 2–3 sentence conceptual summary. If the content is a procedure, use a task-oriented heading like "Configure X" or "Send your first event."

---

## Content problems

### Circular repetition

Information stated in the intro, restated in the body, and summarized at the end of a short article.

**Signs**: Short articles (under 800 words) with a "Summary" or "Conclusion" section. Key concepts explained more than once.

**Fix**: State each concept once, in the right place. Remove summary sections from procedural articles; they're appropriate only for conceptual or reference content over ~1,500 words.

---

### Verbose setup paragraphs

Long paragraphs explaining why a user might want to do something before explaining how to do it.

**Signs**: Two or more paragraphs of context before the first actionable instruction.

**Fix**: Condense motivation to one sentence maximum. Users who need more context are looking for a conceptual article, not a how-to.

---

### Passive-voice procedure steps

Steps written passively, obscuring who does what.

**Signs**: "The API key is then copied into...", "Events will be sent to...", "The user is redirected to..."

**Fix**: Apply active voice rules from CLAUDE.md. For steps, use imperative: "Copy the API key into...", "Send events to...", "Amplitude redirects you to..."

---

### Outdated screenshots or UI references

References to UI elements that may have changed, or placeholder text indicating a screenshot was planned.

**Signs**: "[Screenshot]", "[TODO: add image]", references to UI labels that don't match current product terminology.

**Fix**: Remove placeholder image references. Update UI labels to current Amplitude terminology. If a screenshot is genuinely needed, note it with `<!-- TODO: screenshot needed -->` for follow-up.

---

### Unexplained jargon and acronyms

Terms used without definition, assuming context the reader may not have.

**Signs**: First use of an acronym without expansion. Product-specific terms without a brief definition on first use.

**Fix**: Expand acronyms on first use: "Session Replay (SR)". Add a brief inline definition for product terms on first use: "A cohort—a group of users with shared characteristics—lets you..."

---

## Formatting problems

### H1 in document body

Using `#` headings inside the article body. The page title is always H1.

**Fix**: Convert all `#` headings in the body to `##` or lower.

---

### Inconsistent heading levels

Jumping from H2 to H4, skipping H3.

**Fix**: Enforce proper hierarchy: H2 > H3 > H4, no skipping.

---

### Missing code formatting

File names, variable names, API endpoints, commands, and code values written as plain text.

**Signs**: "Set the api_key value in your config.json file." (no backticks)

**Fix**: Apply backtick formatting to all inline code elements per CLAUDE.md technical writing rules.

---

### Flat numbered lists used for non-sequential content

Numbered lists used for items that have no required order.

**Signs**: "1. API key 2. Project ID 3. Region" — these are attributes, not steps.

**Fix**: Convert to bulleted lists when order doesn't matter.

---

### Inconsistent list punctuation

Some list items end with periods, others don't, others end with semicolons.

**Fix**: Apply consistent ending punctuation per CLAUDE.md: all list items end with a period.
