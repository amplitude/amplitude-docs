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

## How These Rules Work

- **Automatic Application**: Most rules have `alwaysApply: true` and target markdown files in `content/**/*.md`
- **Context Awareness**: Cursor uses these rules when you're editing or creating documentation
- **Enforcement**: Rules provide examples of incorrect and correct usage
- **Consistency**: Ensures documentation follows the same standards as our Vale linter

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

## Updating Rules

When updating these rules:
1. Ensure consistency with `.vale.ini` and `.github/styles/`
2. Update the rule file's metadata (description, globs)
3. Provide clear examples of correct and incorrect usage
4. Test changes by editing a sample markdown file

## References

- Vale configuration: `.vale.ini`
- Vale styles: `.github/styles/Amplitude/` and `.github/styles/Microsoft/`
- Approved vocabulary: `.github/styles/config/vocabularies/dev/accept.txt`
- Rejected terms: `.github/styles/config/vocabularies/dev/reject.txt`
- Official Cursor rules docs: https://cursor.com/docs/context/rules

