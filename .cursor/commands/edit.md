# Edit this document to match the Amplitude writing style

## Overview

Your goal is to parse through the content in an article, and ensure it meets the guidelines in @.cursor/rules.

## Important Guidelines

### Implementation Details

Do not reveal implementation details that users may start to rely on because it will limit our ability to modify the implementation in the future.

### Session Replay Add-On Requirements

Targeted Replay Capture (TRC) is only available to customers who have purchased the Session Replay (SR) add-on.

## Systematic Review Process

### Phase 1: Pattern-Based Searches (Run First)

Before making any edits, search for these patterns to identify all issues:

```bash
# 1. PASSIVE VOICE (Most Critical - #1 Priority)
grep -n "is \|are \|was \|were \|can be\|will be\|is assigned\|are granted\|is removed\|is created\|are created\|is available\|are available"

# 2. LIST ITEMS WITHOUT PUNCTUATION
grep -n "^- [A-Z].*[^.]$"  # Bulleted lists
grep -n "^[0-9]\. .*[^.]$"  # Numbered lists

# 3. BOLD NAVIGATION PATTERNS (should be italics)
grep -n "\*\*.*\*\* >"

# 4. FUTURE TENSE
grep -n "will \|would be\|we are going to\|will allow\|will be able"

# 5. MISSING CONTRACTIONS
grep -n "cannot\|are not\|is not\|does not\|do not\|has not\|have not\|was not\|were not"

# 6. "PLEASE" IN INSTRUCTIONS
grep -n -i "please "

# 7. WORDY PHRASES
grep -n "in order to\|via \|prior to\|desired\|once \|currently "

# 8. FIRST PERSON PLURAL
grep -n " we \| our \| us "
```

### Phase 2: Create Findings Report

Before making edits, document what you found:

```markdown
## Style Issues Found

### Critical: Active Voice
- Line X: [specific passive construction]
- Line Y: [specific passive construction]

### Punctuation
- Lines X-Y: list items missing periods
- Line Z: list item missing period

### Navigation Formatting
- Line X: bold navigation (should be italics)

### [Other categories as needed]
```

### Phase 3: Apply Fixes Systematically

Work through issues by category, not line-by-line. Make all related changes together.

### Phase 4: Verification Pass

After all fixes, confirm:
- [ ] Re-run pattern searches to verify all issues resolved
- [ ] Run `read_lints` to check for errors
- [ ] Verify no new issues introduced

## Completion Summary

When complete, provide a summary of the updates you made, and the rules you referenced.