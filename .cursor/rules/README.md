---
description: Overview of Amplitude documentation writing style rules
globs: []
alwaysApply: false
---

# Amplitude Documentation Style Rules

This directory contains Cursor rules that enforce Amplitude's documentation writing style. These rules are based on our Vale configuration (`.vale.ini`) and style guides in `.github/styles/`.

## Rule Files

### Core Writing Style
1. **voice-and-tense.md** - Use active voice and present tense
2. **contractions.md** - Use contractions for conversational tone
3. **concise-language.md** - Avoid wordy phrases and bureaucratic language
4. **direct-instructions.md** - Write direct commands without "please"
5. **person-and-point-of-view.md** - Use second person, avoid first person

### Structure and Formatting
6. **headings-and-structure.md** - Heading conventions and hierarchy
7. **grammar-and-punctuation.md** - Oxford comma, sentence length, dashes
8. **images-and-accessibility.md** - Alt text requirements for images

### Inclusive and Modern Language
9. **inclusive-terminology.md** - Use inclusive, non-offensive terminology

### Technical Writing
10. **technical-writing.md** - Code formatting, API docs, technical conventions
11. **amplitude-vocabulary.md** - Approved Amplitude-specific terms and spellings

### Statamic-Specific Rules
12. **statamic-routing.md** - Ensures internal links use web routes, not file paths (always applied)

### Documentation Templates (Invoke on Demand)
13. **new-feature-template.md** - Template for documenting new features
14. **link-validation.md** - Validates internal link formats

### Reference Guides
15. **TEMPLATES-INDEX.md** - Index of all available templates and workflows

## How These Rules Work

- **Automatic Application**: Most rules have `alwaysApply: true` and target markdown files in `content/**/*.md`
- **Context Awareness**: Cursor uses these rules when you're editing or creating documentation
- **Enforcement**: Rules provide examples of incorrect and correct usage
- **Consistency**: Ensures documentation follows the same standards as our Vale linter

## Using Documentation Templates

### For Engineers and Contributors

New to contributing docs? Start here:
1. Read **[../ HOW-TO-CONTRIBUTE.md](../HOW-TO-CONTRIBUTE.md)** for a quick start guide
2. Open Cursor Chat (Cmd+L) and say: `"Document new feature: [your feature name]"`
3. Cursor guides you through creating properly structured documentation

### Common Template Commands

In Cursor Chat, you can say:
- `"Document new feature: [name]"` - Creates feature documentation
- `"Validate links in this file"` - Checks for incorrect link formats
- `"Check this doc for style issues"` - Reviews against Amplitude standards
- `"Where should I document [feature]?"` - Suggests the right collection

See **TEMPLATES-INDEX.md** for a complete list of available templates and workflows.

## Integration with Vale

These Cursor rules complement our Vale linter configuration:
- **Vale** runs in CI/CD to catch style issues automatically
- **Cursor rules** help you write correctly from the start
- **Both** enforce the same Microsoft + Amplitude style standards

## Key Principles

### Voice and Tone
- ✅ Active voice, present tense
- ✅ Conversational with contractions
- ✅ Direct and imperative for instructions
- ❌ No "please", no future tense, no passive voice

### Clarity
- ✅ Short sentences (under 30 words)
- ✅ Simple, direct language
- ✅ Oxford comma in lists
- ❌ No wordy phrases, no "currently", no hedging

### Inclusivity
- ✅ Allow list, block list
- ✅ End, stop, cancel
- ✅ Gender-neutral language
- ❌ No blacklist/whitelist, no "kill", no gendered terms

### Technical Accuracy
- ✅ Code formatting for technical terms
- ✅ Proper capitalization (Amplitude, JavaScript, iOS)
- ✅ Approved vocabulary from accept.txt
- ❌ No unapproved abbreviations or spellings

## Examples

### Before (Violates Multiple Rules)
```markdown
# Configuration

Please navigate to the settings page where you will be able to configure 
your API keys. Currently, you can utilize the blacklist feature in order 
to block unwanted events. This is a feature that was designed by our team.
```

### After (Follows All Rules)
```markdown
## Configuration

Navigate to the settings page to configure your API keys. Use the block 
list feature to block unwanted events. This feature helps you filter data 
before it enters Amplitude.
```

## For AI Assistants: Complete Rule Application Checklist

When editing documentation, AI assistants must apply rules in this specific order:

### Step 1: Active Voice (MOST IMPORTANT - Often Missed)
Search the entire document for passive voice patterns:
- `is/are/was/were [verb]ed`
- `can be`, `will be`, `should be`
- `is assigned`, `are granted`, `is removed`, `is created`, `are revoked`, etc.

Convert ALL instances to active voice before proceeding.

**Examples:**
- ❌ "Users can be assigned to groups" → ✅ "You can assign users to groups"
- ❌ "The config is created by the system" → ✅ "The system creates the config"
- ❌ "If a user is removed from a group" → ✅ "If you remove a user from a group"

### Step 2: Present Tense
Remove all future tense constructions (`will`, `would`, `going to`).

**Examples:**
- ❌ "This feature will allow you to..." → ✅ "This feature lets you..."
- ❌ "The modal will open" → ✅ "The modal opens"

### Step 3: Contractions
Replace all formal negations with contractions:
- `cannot` → `can't`
- `are not` → `aren't`
- `is not` → `isn't`
- `does not` → `doesn't`
- `was not` → `wasn't`
- `it is` → `it's`
- `that is` → `that's`

### Step 4: Concise Language
Remove wordy phrases:
- `in order to` → `to`
- `via` → `through`
- `desired` → `want` or `need`
- `easily`, `simply` (if not adding value)

### Step 5: Second Person
Use "you" throughout; avoid "we", "our", "us" (except in metadata/URLs)

**Examples:**
- ❌ "We recommend using..." → ✅ "Use..." or "Amplitude recommends..."
- ❌ "Let's configure..." → ✅ "Configure..."

### Step 6: Direct Instructions
Remove "please" from all instructions.

**Examples:**
- ❌ "Please navigate to Settings" → ✅ "Navigate to Settings"

### Step 7: Final Passive Voice Check
Do a SECOND pass specifically searching for any remaining passive voice patterns.

**Search for these patterns:**
```
is assigned | are assigned | is removed | are removed | can be | 
will be | is granted | are granted | is created | are created |
was assigned | were assigned
```

### Verification Checklist
- [ ] Zero passive voice constructions remain
- [ ] All future tense removed (no "will")
- [ ] All contractions applied
- [ ] No "please" in instructions
- [ ] Second person ("you") used consistently
- [ ] Concise language throughout
- [ ] Don't include any markdown escape characters

**Rule of thumb:** If the subject of the sentence receives the action rather than performs it, rewrite it in active voice.

## Standard Prompt for Documentation Edits

When requesting documentation updates, use this format:

```
Update [file] following ALL .cursor/rules/:
1. Read all rule files in .cursor/rules/
2. Apply active voice (do TWO passes for this - it's often missed)
3. Apply all other rules (present tense, contractions, concise language, etc.)
4. Fix linter errors (except false positives for names/paths)

Focus especially on converting passive voice to active voice.
```

## Updating Rules

When updating these rules:
1. Ensure consistency with `.vale.ini` and `.github/styles/`
2. Update the rule file's metadata (description, globs)
3. Provide clear examples of correct and incorrect usage
4. Test changes by editing a sample markdown file

## References

- **Vale configuration:** `.vale.ini`
- **Vale styles:** `.github/styles/Amplitude/` and `.github/styles/Microsoft/`
- **Approved vocabulary:** `.github/styles/config/vocabularies/dev/accept.txt`
- **Rejected terms:** `.github/styles/config/vocabularies/dev/reject.txt`
- **Official Cursor rules docs:** https://cursor.com/docs/context/rules
- **Statamic routing patterns:** See `statamic-routing.md` for collection route mappings
- **Contributing guide:** `../HOW-TO-CONTRIBUTE.md` for engineers
- **Tech writer guide:** `../IMPLEMENTATION-SUMMARY.md` for implementation
- **Template index:** `TEMPLATES-INDEX.md` for available workflows

