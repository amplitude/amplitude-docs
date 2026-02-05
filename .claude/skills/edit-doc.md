# Edit Doc

Apply all Amplitude documentation style rules systematically to a document.

## When to Use This Skill

Use this skill to apply comprehensive style corrections to existing documentation.

**Invoke with:**
- `/edit-doc`
- "Apply style rules to this document"
- "Fix style issues in this file"
- "Make this follow Amplitude style"

## What This Skill Does

This skill performs a systematic, priority-ordered review of documentation to ensure it meets all Amplitude style standards:

1. Searches for common style violations using pattern matching
2. Reports all findings before making changes
3. Applies fixes by category (not line-by-line) for efficiency
4. Does a **TWO-PASS check for active voice** (most commonly missed)
5. Provides a summary of all changes made

## Critical: Active Voice First

**Active voice is the #1 priority** and the most commonly missed rule. You MUST do a two-pass check:

### Pass 1: Initial Active Voice Conversion
Convert obvious passive voice constructions.

### Pass 2: Dedicated Active Voice Search
After all other fixes, search specifically for remaining passive patterns:
```
is | are | was | were | can be | will be | should be |
is assigned | are assigned | is removed | are removed |
is granted | are granted | is created | are created |
is available | are available | was assigned | were assigned
```

Convert ALL remaining instances before considering the document complete.

## Systematic Review Process

### Phase 1: Pattern-Based Search (Run First)

Before making any edits, search for these patterns to identify ALL issues:

#### 1. Passive Voice (HIGHEST PRIORITY)
**Search for:**
- `is/are/was/were [verb]ed`
- `can be`, `will be`, `should be`
- `is assigned`, `are granted`, `is removed`, `is created`, `are revoked`
- `is available`, `is processed`, `is sent`, `is configured`

**Examples:**
- ❌ "Users can be assigned to groups"
- ✅ "You can assign users to groups"
- ❌ "Events are sent to the API"
- ✅ "Send events to the API" or "The SDK sends events to the API"

#### 2. Future Tense
**Search for:**
- `will`, `will be`, `will allow`, `will enable`
- `would be`, `we are going to`, `going to`

**Examples:**
- ❌ "This feature will allow you to..."
- ✅ "This feature lets you..."

#### 3. Missing Contractions
**Search for:**
- `cannot`, `are not`, `is not`, `does not`, `do not`
- `has not`, `have not`, `was not`, `were not`
- `should not`, `could not`, `would not`, `will not`

**Examples:**
- ❌ "You cannot configure..."
- ✅ "You can't configure..."

#### 4. "Please" in Instructions
**Search for:**
- `please` (case-insensitive)

**Examples:**
- ❌ "Please navigate to Settings"
- ✅ "Navigate to Settings"

#### 5. Wordy Phrases
**Search for:**
- `in order to`, `via`, `prior to`, `desired`
- `currently`, `at present`, `once` (meaning "after")
- `due to the fact that`, `has the ability to`

**Examples:**
- ❌ "in order to configure"
- ✅ "to configure"
- ❌ "currently available"
- ✅ "available"

#### 6. First Person Plural
**Search for:**
- ` we `, ` our `, ` us ` (in prose, not URLs)

**Examples:**
- ❌ "We recommend using..."
- ✅ "Use..." or "Amplitude recommends..."

#### 7. List Items Without Punctuation
**Search for:**
- Bulleted list items missing ending punctuation
- Numbered list items missing ending punctuation

**Examples:**
- ❌ `- Configure the settings`
- ✅ `- Configure the settings.`

#### 8. Bold Navigation (Should Be Italics)
**Search for:**
- `**[text]** >` patterns

**Examples:**
- ❌ `**Settings** > **API Keys**`
- ✅ `*Settings > API Keys*`

#### 9. Headings Issues
**Search for:**
- Headings ending with `.`, `?`, `!`, or `:`
- Headings starting with `#` (should start with `##`)
- Title case in headings (should be sentence case)

**Examples:**
- ❌ `## How do I configure the API?`
- ✅ `## Configure the API`
- ❌ `## Prerequisites:`
- ✅ `## Prerequisites`

### Phase 2: Create Findings Report

Before making ANY edits, document what you found:

```markdown
## Style Issues Found in [filename]

### 🔴 Critical: Active Voice
- Line 23: "Users can be assigned to groups"
- Line 45: "Events are sent to the API endpoint"
- Line 67: "The configuration is created by the system"
[Total: X instances]

### Future Tense
- Line 12: "This feature will allow you to"
- Line 34: "The modal will open"
[Total: X instances]

### Missing Contractions
- Line 18: "cannot" → "can't"
- Line 29: "does not" → "doesn't"
- Line 41: "is not" → "isn't"
[Total: X instances]

### "Please" in Instructions
- Line 56: "Please navigate to Settings"
- Line 78: "Please save your changes"
[Total: X instances]

### Wordy Phrases
- Line 15: "in order to configure"
- Line 27: "via the API"
- Line 39: "currently available"
[Total: X instances]

### First Person Plural
- Line 19: "We recommend using"
- Line 44: "Let's configure"
[Total: X instances]

### List Punctuation
- Lines 30-35: List items missing ending periods
[Total: X items]

### Navigation Formatting
- Line 51: "**Settings** > **API Keys**" (should use italics)
[Total: X instances]

### Heading Issues
- Line 8: Heading ends with ":"
- Line 65: Heading ends with "?"
[Total: X issues]

---
**Total issues found:** X
**Priority order:** Active voice → Future tense → Contractions → Direct instructions → Concise language → Second person → UI formatting → Lists → Headings
```

### Phase 3: Apply Fixes Systematically

Work through issues **by category**, not line-by-line. Apply all related changes together for efficiency.

**Fix in this priority order:**

1. **Active Voice** (Do First Pass)
2. **Present Tense** (Remove future tense)
3. **Contractions**
4. **Direct Instructions** (Remove "please")
5. **Concise Language** (Remove wordy phrases)
6. **Second Person** (Remove "we/our/us")
7. **UI Formatting** (Bold vs italics)
8. **List Punctuation**
9. **Headings**
10. **Active Voice Second Pass** (CRITICAL - Search again)

### Phase 4: Second Active Voice Pass (MANDATORY)

After completing all other fixes, do a dedicated second pass for active voice:

1. **Search again** for passive voice patterns
2. **Convert any remaining** passive constructions
3. **Verify zero passive voice** remains

This second pass is CRITICAL because passive voice is easily missed when fixing other issues.

### Phase 5: Verification

After all fixes, verify:
- ✅ Re-run passive voice search → zero results
- ✅ Check that changes are correct and maintain meaning
- ✅ Verify no new issues introduced
- ✅ Confirm all list items have ending punctuation
- ✅ Ensure headings follow rules (no end punctuation, sentence case)

## Completion Summary

When complete, provide a comprehensive summary:

```markdown
## Style Corrections Applied to [filename]

### Changes Made

#### 1. Active Voice (Priority #1)
**First Pass:**
- Line 23: "Users can be assigned" → "You can assign users"
- Line 45: "Events are sent" → "Send events" or "The SDK sends events"
- Line 67: "is created by the system" → "the system creates"

**Second Pass (Critical):**
- Line 89: "is removed from" → "you remove from"
- Line 102: "can be configured" → "you can configure"

**Total active voice fixes:** X

#### 2. Present Tense
- Line 12: "will allow" → "lets"
- Line 34: "will open" → "opens"

**Total future tense fixes:** X

#### 3. Contractions
- Line 18: "cannot" → "can't"
- Line 29: "does not" → "doesn't"
- Line 41: "is not" → "isn't"

**Total contraction fixes:** X

#### 4. Direct Instructions
- Line 56: Removed "Please" from "Please navigate to Settings"
- Line 78: Removed "Please" from "Please save your changes"

**Total "please" removals:** X

#### 5. Concise Language
- Line 15: "in order to configure" → "to configure"
- Line 27: "via the API" → "through the API"
- Line 39: Removed "currently" from "currently available"

**Total wordy phrase fixes:** X

#### 6. Second Person
- Line 19: "We recommend" → "Amplitude recommends"
- Line 44: "Let's configure" → "Configure"

**Total first person fixes:** X

#### 7. UI Formatting
- Line 51: Changed "**Settings** > **API Keys**" to "*Settings > API Keys*"

**Total UI formatting fixes:** X

#### 8. List Punctuation
- Lines 30-35: Added ending periods to list items

**Total list punctuation fixes:** X items

#### 9. Headings
- Line 8: Removed ":" from heading
- Line 65: Removed "?" and rephrased heading

**Total heading fixes:** X

---

### Summary Statistics
- **Total changes:** X
- **Lines modified:** X
- **Most common issue:** [Category name] (X instances)
- **Critical issue resolved:** Active voice (X instances, verified with two-pass check)

### Rules Referenced
All changes follow the style rules in .claude/CLAUDE.md:
- Active voice (two-pass verification completed ✓)
- Present tense
- Contractions required
- Second person
- Direct instructions (no "please")
- Concise language
- Grammar and punctuation
- UI element formatting
- Heading conventions

The document now meets Amplitude documentation standards.
```

## Special Considerations

### Preserve Technical Accuracy

When making style corrections:
- **Don't change** technical terms, code, API endpoints, or product names
- **Don't alter** meaning - ensure corrections are semantically equivalent
- **Be careful** with code examples in markdown blocks
- **Preserve** links and image references

### UI Element Formatting Rules

**Bold = Interactive elements only:**
- Buttons: **Save**, **Cancel**
- Clickable tabs: **Configuration**
- Input fields: **API Key**

**Italics = Orientation/navigation:**
- Page names: *Settings*, *Dashboard*
- Navigation paths: *Settings > API Keys*
- Section titles: *API Configuration*

### Common Passive Voice Patterns

These are FREQUENTLY missed - search explicitly:

```
is assigned | are assigned
is removed | are removed
is granted | are granted
is created | are created
is available | are available
is processed | is processed
is sent | are sent
can be configured | can be accessed
will be displayed | will be shown
should be checked | should be verified
was assigned | were assigned
```

### When to Use "Amplitude" as Subject

For passive constructions where the actor is unclear, often use "Amplitude" as the subject:

- ❌ "Data is processed in real time"
- ✅ "Amplitude processes data in real time"

- ❌ "Permissions are granted at the organization level"
- ✅ "Amplitude grants permissions at the organization level"

## Example Before/After

### Before (Multiple Violations)

```markdown
# Configuration

Please navigate to the settings page where you will be able to configure
your API keys. Currently, you can utilize the blacklist feature in order
to block unwanted events. This feature was designed by our team.

- Configure the API endpoint
- Set up authentication
- Enable real-time processing
```

### After (All Rules Applied)

```markdown
## Configuration

Navigate to the settings page to configure your API keys. Use the block
list feature to block unwanted events. Amplitude designed this feature to
help you filter data.

- Configure the API endpoint.
- Set up authentication.
- Enable real-time processing.
```

### Changes Made:
1. ❌ `#` → ✅ `##` (no H1 in document body)
2. ❌ "Please navigate" → ✅ "Navigate" (no "please")
3. ❌ "will be able to" → ✅ "to" (present tense, concise)
4. ❌ "Currently," → ✅ Removed (temporal qualifier)
5. ❌ "utilize" → ✅ "Use" (concise)
6. ❌ "blacklist" → ✅ "block list" (inclusive terminology)
7. ❌ "in order to" → ✅ "to" (concise)
8. ❌ "was designed by our team" → ✅ "Amplitude designed" (active voice, second person)
9. Added ending periods to all list items

## When to Stop

A document is complete when:
- ✅ Zero passive voice constructions (verified with two searches)
- ✅ Zero future tense
- ✅ All contractions applied
- ✅ No "please" in instructions
- ✅ All wordy phrases replaced
- ✅ Second person used consistently
- ✅ All list items have ending punctuation
- ✅ All headings follow conventions
- ✅ UI elements formatted correctly (bold vs italics)

## Integration with Other Skills

After using this skill, consider:
- **`/validate-links`**: Check that links follow Statamic routing
- **`/document-feature`**: Use for creating new documentation from scratch

## Performance Notes

- For files > 500 lines, report progress by section
- Group similar fixes to minimize edit operations
- Prioritize critical issues (active voice) first
- Show before/after examples for clarity
