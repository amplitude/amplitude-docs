---
name: edit-doc
description: This skill should be used when the user asks to "apply style rules", "fix style issues", "edit this doc", "make this follow Amplitude style", "clean up this document", or wants systematic style corrections applied to existing Amplitude documentation.
version: 0.1.0
---

# Edit Doc

Apply all Amplitude documentation style rules systematically to an existing document.

## About This Skill

This skill performs a priority-ordered review of documentation to ensure it meets all Amplitude style standards. It reports all findings before making changes, applies fixes by category, and verifies the result.

## Phase 1: Pattern-Based Search

Before making any edits, search for these patterns to identify all issues. Document findings with line numbers.

**Search for, in this priority order:**

1. **Passive voice (highest priority):** `is/are/was/were [verb]ed`, `can be`, `will be`, `should be`, `is assigned`, `are granted`, `is removed`, `is created`, `is available`, `is processed`, `is sent`, `is configured`.
2. **Future tense:** `will`, `will be`, `will allow`, `will enable`, `would be`, `going to`.
3. **Missing contractions:** `cannot`, `are not`, `is not`, `does not`, `do not`, `has not`, `have not`, `was not`, `were not`, `should not`, `could not`, `would not`, `will not`.
4. **"Please" in instructions:** `please` (case-insensitive).
5. **Wordy phrases:** `in order to`, `via`, `prior to`, `desired`, `currently`, `due to the fact that`, `has the ability to`.
6. **First person plural:** ` we `, ` our `, ` us ` (in prose, not URLs).
7. **List items without ending punctuation:** Bulleted and numbered list items missing periods or other end marks.
8. **Bold navigation paths:** `**[text]** >` patterns (navigation paths should use italics, not bold).
9. **Heading issues:** Headings ending with `.`, `?`, `!`, or `:`; headings using `#` (should start at `##`); title case instead of sentence case.

Report all findings before proceeding. See `references/report-templates.md` for the findings report format.

## Phase 2: Apply Fixes Systematically

Work through issues by category, not line-by-line. Apply all related changes together for efficiency.

**Fix in this priority order:**

1. Active voice (first pass)
2. Present tense
3. Contractions
4. Direct instructions (remove "please")
5. Concise language
6. Second person (remove "we/our/us")
7. UI formatting (bold vs italics)
8. List punctuation
9. Headings
10. **Active voice (second pass — mandatory)**

## Phase 3: Second Active Voice Pass (Mandatory)

After completing all other fixes, search again explicitly for remaining passive patterns:

```
is assigned | are assigned | is removed | are removed |
is granted | are granted | is created | are created |
is available | are available | was assigned | were assigned |
is sent | are sent | can be configured | can be accessed |
will be displayed | will be shown | should be checked
```

Convert all remaining instances. This second pass is critical — passive voice is easily missed when fixing other issues.

## Phase 4: Verification

After all fixes:

- Re-run passive voice search and confirm zero results.
- Verify changes are semantically correct and don't alter technical meaning.
- Confirm all list items have ending punctuation.
- Confirm all headings follow rules (no end punctuation, sentence case, starts at `##`).
- Confirm UI elements use the correct formatting (bold for interactive elements, italics for navigation paths).

## Completion Summary

When complete, provide a summary of all changes made with before/after examples and counts by category. See `references/report-templates.md` for the summary format.

## Special Considerations

**Preserve technical accuracy:**
- Don't change technical terms, code, API endpoints, or product names.
- Don't alter meaning — ensure corrections are semantically equivalent.
- Be careful with code examples inside markdown code fences.
- Preserve links and image references.

**UI element formatting:**
- Bold (`**text**`) = interactive elements only: buttons, clickable tabs, input field labels, checkboxes, menu items.
- Italics (`*text*`) = orientation elements: page names, navigation paths, section titles.
- Navigation paths always use italics with angle brackets: `*Settings > API Keys*`.

**When to use "Amplitude" as subject:**
When the actor in a passive construction is the system or product, use "Amplitude" as the subject:
- "Data is processed in real time" → "Amplitude processes data in real time"
- "Permissions are granted at the organization level" → "Amplitude grants permissions at the organization level"

**Performance:**
- For files over 500 lines, report progress by section.
- Group similar fixes to minimize edit operations.
- Show before/after examples for clarity.

## Stop Conditions

A document is complete when:
- Zero passive voice constructions (verified with two searches).
- Zero future tense.
- All contractions applied.
- No "please" in instructions.
- All wordy phrases replaced.
- Second person used consistently.
- All list items have ending punctuation.
- All headings follow conventions.
- UI elements formatted correctly.

## Additional Resources

### Reference Files

- **`references/report-templates.md`** — Findings report and completion summary templates with examples.
- **`references/before-after-example.md`** — A full before/after document transformation example.

### Related Skills

- **`/validate-links`** — Check links after applying style corrections.
- **`/document-feature`** — Create new documentation from scratch.
