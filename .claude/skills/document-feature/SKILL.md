---
name: document-feature
description: This skill should be used when the user wants to "document a new feature", "create feature docs", "write documentation for a new feature", "add a new page for a feature", or asks for help creating documentation from scratch for an Amplitude product feature.
version: 0.1.0
---

# Document Feature

Interactive wizard for creating new feature documentation with proper structure and style.

## About This Skill

Use this skill to guide a contributor through creating a properly structured, style-compliant documentation page for a new Amplitude feature. The wizard gathers information, determines the correct collection and file location, generates a markdown template, and applies all Amplitude style rules.

## Step 1: Gather Information

Ask these questions to understand the feature. To avoid overwhelming the contributor, ask the most important questions first and follow up as needed.

**Feature name:** What's the feature called?

**Product area:** Which product is this for? (Analytics, CDP/Audiences, Data Management, Session Replay, Feature Experiment, Web Experiment, SDK/API, Admin/Account Management, or other.)

**User benefit:** What problem does this solve or what does it enable? (1–2 sentences. This becomes the opening description and the `this_article_will_help_you` bullets.)

**Prerequisites:** What do users need before using this feature? Consider plan tier requirements, permissions, prior setup, integrations, and dependencies. If none, note that and skip the Prerequisites section.

**Primary workflow:** What's the main task or workflow users complete with this feature? Understanding the key steps enables writing clear, numbered instructions.

## Step 2: Determine Collection

Map the product area to the correct collection folder and web route. Consult `references/collection-routes.md` for the full mapping table.

After determining the collection, tell the contributor: "Based on [product area], this should go in the `[collection-name]` collection."

## Step 3: Generate Document Structure

Create a new markdown file with this structure:

```markdown
---
id: [Generate a UUID using uuidv4 format]
blueprint: [Determine from collection - see references/collection-routes.md]
title: [Feature Name]
this_article_will_help_you:
  - '[Key benefit 1]'
  - '[Key benefit 2]'
landing: false
exclude_from_sitemap: false
---

[One-sentence description of what this feature does and why it matters]

## Prerequisites

[If prerequisites exist, list them. Otherwise, remove this section.]

- [Prerequisite 1]
- [Prerequisite 2]

## [Primary task heading — use action verb]

[Brief introduction to the workflow — 1–2 sentences]

1. Navigate to *[Location in Product]*.
2. Select **[Button or Option]**.
3. Configure the settings:
   - **[Setting Name]**: [What it does]
   - **[Setting Name]**: [What it does]
4. Select **[Action Button]**.

[Result description — what happens after these steps]

### Example

[If applicable, show a code example, configuration example, or concrete scenario.]

## Common use cases

[Optional: If there are multiple distinct ways to use this feature]

### [Use case 1]

[Brief description and key steps]

## Common questions

### [Question 1 — phrased as a user would ask]

[Answer in 2–3 sentences]

## Related resources

- [Related documentation](/docs/[collection]/[slug])
```

## Step 4: Apply Style Rules

Ensure all generated content follows Amplitude documentation standards. Apply all rules from CLAUDE.md, with special attention to:

- **Active voice (two passes required):** Search explicitly for `is/are/was/were [verb]ed`, `can be`, `will be`, `should be` and convert all instances. After fixing everything else, search again to catch remaining passive constructions.
- **Present tense:** Remove `will`, `would be`, `going to`.
- **Contractions:** Use "can't" not "cannot", "doesn't" not "does not", etc.
- **Second person:** Use "you" throughout; avoid "we" and "users".
- **No "please":** Use direct imperative instructions.
- **Concise language:** Replace "in order to" with "to", "via" with "through", etc.
- **UI formatting:** Bold for interactive elements (**Save**, **API Key**); italics for navigation paths (*Settings > API Keys*).
- **Internal links:** Use full `/docs/` web routes, never relative paths or `.md` extensions.

## Step 5: Suggest Filename and Location

Recommend to the contributor:

- **Filename:** `[feature-name-in-kebab-case].md` — lowercase, hyphen-separated, concise but descriptive.
- **Location:** `content/collections/[collection-name]/en/[filename]`
- **Web URL (after deployment):** `/docs/[route-path]/[slug]`

## Step 6: Remind About Next Steps

After generating the document, remind the contributor:

1. Add images if helpful — place in `public/docs/output/img/[collection]/` with descriptive alt text.
2. Add code examples for SDK/API docs — use realistic values and language identifiers in code blocks.
3. Test the steps — verify the workflow matches the actual product.
4. Run `/validate-links` to verify all internal links use correct web routes.
5. Create a branch, commit, push, and open a PR tagging `@tech-writers` for review.

## Additional Resources

### Reference Files

- **`references/collection-routes.md`** — Full collection-to-route mapping table and blueprint reference.
- **`references/interaction-example.md`** — Worked example interaction between contributor and skill.

### Related Skills

- **`/validate-links`** — Validate links after creating the document.
- **`/edit-doc`** — Re-apply style rules if the contributor modifies the content later.
