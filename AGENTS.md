# AGENTS.md

This file summarizes the documentation rules in .cursor/rules.

## Scope and application
- Most rules apply to content/**/*.md and sometimes all *.md files.
- Some rules are always on (style, headings, routing); others are on demand
  (link validation, new feature template).
- Rules align with the Vale configuration in .vale.ini and styles in
  .github/styles.

## Required writing style (apply in this order)
1. Active voice. Do two passes to remove passive voice.
2. Present tense. Remove future tense (for example, "will").
3. Contractions. Use conversational contractions.
4. Concise language. Remove wordy phrases and temporal qualifiers.
5. Second person. Use "you"; avoid "we/I".
6. Direct instructions. No "please"; use imperative verbs.
7. Statamic routing. Use correct /docs routes for internal links.
8. Final passive voice check.

## Concise language rules
- Replace wordy phrases (for example, "in order to" -> "to").
- Avoid temporal qualifiers like "currently" unless necessary.
- Remove hedging (for example, "might want to").

## Headings, lists, and structure
- Do not use H1 in document body; start content with H2.
- Use sentence case headings with no end punctuation or colons.
- Do not skip heading levels.
- List items must use ending punctuation.
- Use italics for navigation paths (Settings > API Keys).

## Grammar and punctuation
- Use the Oxford comma.
- Avoid "etc."; use "for example" or "such as".
- Keep sentences under 30 words when possible.
- Use em dashes for parenthetical statements (--- in Markdown).
- Use backticks for code/UI terms instead of quotation marks.

## Inclusive language
- Replace blacklist/whitelist with block list/allow list.
- Replace kill/abort with stop/end/cancel.
- Use gender-neutral language.
- Prefer "select" over "click" and avoid color-only instructions.
- Avoid Latin terms (e.g., "via", "e.g.", "i.e.").

## Voice, tone, and point of view
- Use active voice and present tense.
- Use second person ("you"), avoid first person.
- Tone: authoritative, friendly, confident, no fluff.

## Technical writing rules
- Use backticks for filenames, paths, commands, parameters, endpoints.
- Use fenced code blocks with a language identifier.
- Define acronyms on first use (except common ones like API, SDK).
- Follow approved capitalization (Amplitude, JavaScript, Node.js).
- Numbers: spell out 1-9 in prose; use numerals for 10+ and measurements.
- Dates: "January 15, 2024" format; avoid numeric dates.
- UI formatting: bold for interactive UI elements, italics for orientation
  elements (page names, sections, navigation paths).

## Vocabulary and terminology
- Use approved product names and technical terms.
- Use "event properties" and "user properties", not "attributes".
- Use "API key", "user ID" in prose; code uses actual parameter names.
- Avoid banned terms (for example, "master/slave", "sanity check",
  "dummy data", "currently").
- Check the approved vocabulary list in
  .github/styles/config/vocabularies/dev/accept.txt.

## Images and accessibility
- Always include descriptive alt text for images.
- Only use empty alt text for purely decorative images.
- Keep alt text concise and meaningful.
- Use descriptive image filenames.

## Statamic routing for internal links (always apply)
- Internal doc links must use /docs routes, not file paths.
- Do not use relative paths (../) or .md extensions.
- Use the collection route pattern from content/collections/*.yaml.
- Anchors are allowed; images use /docs/output/img/... or statamic://asset.

## Link validation (on demand)
- Validate internal links for missing /docs, .md extensions, relative paths,
  and file paths.
- Skip external, image, and anchor links.
- Provide a report with line numbers, problems, and suggested fixes.
- If asked to fix links, apply corrections and report changes.

## New feature template (on demand)
- Ask for feature name, product area, user benefit, prerequisites,
  and primary workflow.
- Choose the correct collection and route pattern.
- Generate frontmatter and a standard structure (overview, prerequisites,
  steps, examples, questions, related resources).
- Suggest filename/location and remind about images, code examples, and
  link testing.

## Jira ticket management
- Check the user prompt for a Jira issue key or link (DOC-###).
- If missing, create a DOC Task via mcp_Atlassian_createJiraIssue with:
  cloudId https://amplitude.atlassian.net, project DOC, issue type Task.
- Provide the ticket ID and URL, and remind to include the ID in the branch.

## No new files rule
- Do not create new files unless explicitly requested or required to
  complete a user request.
- Never add README or extra docs on your own initiative.
