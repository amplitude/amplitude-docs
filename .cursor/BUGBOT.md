# Bugbot Instructions for Amplitude Documentation

## Purpose
Review all additions and modifications to documentation files (`.md` files) to ensure they comply with the Amplitude documentation style guide located in `.cursor/rules/`.

## Files to Review
- All Markdown files (`.md`) in `content/collections/` or `/Users/mark.zegarelli/work/amplitude-docs/resources/views`.
- Focus on **additions and modifications** (new content or changed content).
- Ignore deletions unless they impact context.

## Style Guide Rules to Enforce

### 1. Active Voice (CRITICAL - Highest Priority)
- **Search for passive voice constructions**: `is/are/was/were [verb]ed`, `can be`, `will be`, `is assigned`, `are granted`, `is removed`.
- **Flag ALL passive voice**: Every instance must be converted to active voice.
- **Examples**:
  - ❌ "Users can be assigned" → ✅ "You can assign users".
  - ❌ "The data is processed by" → ✅ "Amplitude processes the data".
  - ❌ "Events are sent to" → ✅ "Send events to" or "The SDK sends events to".

### 2. Present Tense (High Priority)
- **Flag future tense**: `will`, `will be`, `will allow`, `will open`, `will enable`.
- **Convert to present tense**:
  - ❌ "This will allow you to" → ✅ "This lets you".
  - ❌ "The API will return" → ✅ "The API returns".

### 3. Contractions (High Priority)
- **Flag missing contractions**:
  - ❌ "cannot" → ✅ "can't".
  - ❌ "do not" → ✅ "don't".
  - ❌ "is not" → ✅ "isn't".
  - ❌ "are not" → ✅ "aren't".
  - ❌ "does not" → ✅ "doesn't".

### 4. Direct Instructions (High Priority)
- **Flag "please" in instructions**: Never use "please" before action verbs.
  - ❌ "Please navigate to" → ✅ "Navigate to".
  - ❌ "Please make sure to" → ✅ "Make sure to".
- **Flag hedging language**:
  - ❌ "You might want to" → ✅ "Configure" (imperative).
  - ❌ "You should probably" → ✅ Direct imperative.

### 5. Concise Language (Medium Priority)
- **Flag wordy phrases**:
  - ❌ "in order to" → ✅ "to".
  - ❌ "via" → ✅ "through" or "using".
  - ❌ "prior to" → ✅ "before".
  - ❌ "due to the fact that" → ✅ "because".
  - ❌ "at the present time" → ✅ "now".
- **Flag temporal qualifiers**: "currently", "at present", "right now" (unless version-specific).

### 6. Second Person (Medium Priority)
- **Flag first person plural**: "we", "our", "us" (except in metadata or when referring to Amplitude as a company).
  - ❌ "We recommend" → ✅ "Amplitude recommends" or use imperative.
  - ❌ "Let's configure" → ✅ "Configure".

### 7. Inclusive Terminology (High Priority)
- **Flag outdated terms**:
  - ❌ "blacklist" → ✅ "block list" or "deny list".
  - ❌ "whitelist" → ✅ "allow list".
  - ❌ "kill" → ✅ "stop" or "terminate".
  - ❌ "dummy" → ✅ "placeholder" or "sample".
  - ❌ "sanity check" → ✅ "validate" or "verify".
  - ❌ "versus" or "vs." → ✅ "compared to".
  - ❌ "via" → ✅ "through".
  - ❌ "e.g." → ✅ "for example".
  - ❌ "i.e." → ✅ "that is".
  - ❌ "etc." → ✅ Start with "for example" or "such as".

### 8. Headings and Structure (Medium Priority)
- **Flag H1 in document body**: Document content should start with H2 (`##`), never H1 (`#`).
- **Flag title case in headings**: Use sentence case, not title case.
  - ❌ "## Configure Your API Settings" → ✅ "## Configure your API settings".
- **Flag end punctuation in headings**: No periods, colons, or question marks at end.
  - ❌ "## Prerequisites:" → ✅ "## Prerequisites".
  - ❌ "## How do I configure?" → ✅ "## Configure the API".

### 9. Grammar and Punctuation (Medium Priority)
- **Flag missing Oxford commas**: Lists of 3+ items must have Oxford comma.
  - ❌ "events, properties and user attributes" → ✅ "events, properties, and user attributes".
- **Flag "etc." at end of lists**: Use "for example" or "such as" instead.
- **Flag missing punctuation in list items**: All list items must end with punctuation.

### 10. Images and Accessibility (Medium Priority)
- **Flag empty alt text**: `![](image.png)` must have descriptive alt text.
  - ❌ `![](screenshot.png)` → ✅ `![Dashboard showing event analytics](screenshot.png)`.

### 11. Internal Links (High Priority)
- **Flag incorrect link formats**:
  - ❌ Relative paths: `../folder/file.md`.
  - ❌ File extensions in links: `/docs/guide.md`.
  - ✅ Correct format: `/docs/[collection]/[slug]` (no `.md` extension).
- **Reference**: See `.cursor/rules/statamic-routing.mdc` for correct route patterns.

### 12. Code and Technical Terms (Medium Priority)
- **Flag missing backticks**:
  - File names, function names, parameters, API endpoints must use backticks.
  - ❌ "Set the api_key parameter" → ✅ "Set the `api_key` parameter".
- **Flag incorrect UI element formatting**:
  - Buttons/tabs/fields: Use **bold** (for example, **Save**, **Settings**).
  - Navigation paths: Use *italics* with angle brackets (for example, *Settings > API Keys*).
  - ❌ "Navigate to **Settings** > **API Keys**" → ✅ "Navigate to *Settings > API Keys*".

## Review Process

1. **Scan added/modified lines** for the issues listed above.
2. **Prioritize active voice**: This is the #1 issue to catch.
3. **Report findings** clearly with:
   - Line number or section reference.
   - Current text (what's wrong).
   - Suggested fix (what it should be).
   - Rule violated (reference the specific guideline).
4. **Group similar issues**: If the same issue appears multiple times, group them together.
5. **Be specific**: Quote exact text that needs changing.

## Output Format

When issues are found, format feedback like this:

```
❌ Line [X]: [Current text]
✅ Suggested: [Corrected text]
📖 Rule: [Which style guide rule this violates]
```

## What NOT to Flag

- Code blocks (content inside ` ```code``` `).
- Technical terms that match approved vocabulary (`.cursor/rules/vocabulary.mdc`).
- Passive voice in code comments or when technically necessary.
- Product names and proper nouns.

## Priority Levels

**Critical (Always flag)**:
- Passive voice.
- "please" in instructions.

**High (Flag in most cases)**:
- Future tense.
- Missing contractions.
- Inclusive terminology violations.
- Internal link format errors.

**Medium (Flag when clear)**:
- Wordy phrases.
- Heading format issues.
- Missing backticks for code terms.
- Grammar issues.

## Success Criteria

Documentation changes should:
- Use 100% active voice.
- Use present tense throughout.
- Include appropriate contractions.
- Follow inclusive terminology guidelines.
- Have properly formatted headings, lists, and links.
- Use correct formatting for code and UI elements.

