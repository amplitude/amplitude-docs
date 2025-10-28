---
description: Format headings correctly in documentation
globs: ["content/**/*.md", "*.md"]
alwaysApply: true
---

# Headings and Structure

Follow these rules for creating clear, consistent headings in documentation.

## Never Use H1 in Document Body

The page title is always H1. Start document content with H2 (`##`) headings.

**Examples:**
- ❌ `# Introduction` (in document body)
- ✅ `## Introduction`
- ❌ `# Prerequisites`
- ✅ `## Prerequisites`

## No End Punctuation in Headings

Don't use periods, question marks, or exclamation points at the end of headings.

**Examples:**
- ❌ `## How do I configure the API?`
- ✅ `## Configure the API`
- ❌ `## Important considerations.`
- ✅ `## Important considerations`
- ❌ `## Getting started!`
- ✅ `## Getting started`

## No Colons at End of Headings

Don't end headings with colons.

**Examples:**
- ❌ `## Prerequisites:`
- ✅ `## Prerequisites`
- ❌ `## The following features are included:`
- ✅ `## Included features`

## Use Sentence Case

Use sentence case (capitalize only the first word and proper nouns) rather than title case.

**Examples:**
- ❌ `## Configure Your API Settings` (title case)
- ✅ `## Configure your API settings` (sentence case)
- ❌ `## Understanding Event Tracking And Data Management`
- ✅ `## Understanding event tracking and data management`

**Exception:** Proper nouns and product names retain their capitalization:
- ✅ `## Configure Amplitude Analytics`
- ✅ `## Send data to Amazon S3`

## Use Descriptive, Action-Oriented Headings

Make headings descriptive and, when appropriate, action-oriented.

**Task-based headings (preferred for procedures):**
- ✅ `## Configure authentication`
- ✅ `## Send your first event`
- ✅ `## Create a custom dashboard`

**Concept-based headings (for explanatory content):**
- ✅ `## How authentication works`
- ✅ `## Event tracking overview`
- ✅ `## Data privacy and compliance`

## Heading Hierarchy

Maintain proper heading hierarchy. Don't skip levels.

**Examples:**
```markdown
## Main section (H2)

### Subsection (H3)

#### Detail (H4)
```

❌ **Don't skip levels:**
```markdown
## Main section (H2)

#### Detail (H4) ← Skipped H3
```

