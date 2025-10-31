---
description: Index of all documentation templates and AI workflows
globs: []
alwaysApply: false
---

# Documentation Templates Index

This file lists all available Cursor AI templates and workflows for creating Amplitude documentation.

## Quick Reference

| Template | Trigger Phrase | What It Does |
|----------|---------------|--------------|
| New Feature | `"Document new feature: [name]"` | Creates feature documentation from scratch |
| API Endpoint | `"Document API endpoint [name]"` | Generates API reference documentation |
| SDK Method | `"Document SDK method [name] for [platform]"` | Creates SDK documentation |
| Code Example | `"Add code example for [feature]"` | Inserts properly formatted code examples |
| Style Check | `"Check this doc for style issues"` | Reviews against Amplitude standards |
| Link Validation | `"Validate links in this file"` | Checks for incorrect link formats |
| Update Docs | `"Add section about [topic]"` | Updates existing documentation |

## Available Templates

### 1. New Feature Template
**File:** `.cursor/rules/new-feature-template.md`  
**Trigger:** Say "Document new feature: [feature name]"  
**Status:** `alwaysApply: false` (invoke on demand)

**What it creates:**
- Properly structured feature documentation
- Frontmatter with all required fields
- Overview and prerequisites
- Step-by-step instructions
- Use cases and examples
- Common questions section
- Related resources with correct links

**Best for:**
- New product features
- New UI functionality
- New workflows
- Feature enhancements

**Example usage:**
```
"Document new feature: Cohort Sync to Facebook"
```

Cursor will ask:
- Product area (Analytics, CDP, Experiment, etc.)
- User benefit
- Prerequisites
- Main workflow

Then generates complete documentation.

---

### 2. Statamic Routing (Always Active)
**File:** `.cursor/rules/statamic-routing.md`  
**Status:** `alwaysApply: true` (always active for markdown files)

**What it does:**
- Ensures all internal links use web routes (`/docs/...`)
- Prevents relative file paths (`../other-doc.md`)
- Provides complete collection route mapping
- Converts file locations to web URLs

**You don't need to invoke this** - it's automatically applied when editing any markdown file in `content/`.

**Benefit:**
Links always work correctly on the website, regardless of file structure.

---

### 3. Style Rules (Always Active)
**Files:** Multiple files in `.cursor/rules/`:
- `voice-and-tense.md`
- `contractions.md`
- `concise-language.md`
- `direct-instructions.md`
- `person-and-point-of-view.md`
- `technical-writing.md`
- (and others)

**Status:** `alwaysApply: true` (always active)

**What they do:**
- Enforce active voice
- Use present tense
- Apply contractions (can't, don't)
- Use second person (you)
- Remove "please" from instructions
- Ensure concise language
- Apply proper technical formatting

**You don't need to invoke these** - they're automatically applied.

**Manual check:**
```
"Check this doc for style issues"
```

---

### 4. Link Validation
**File:** `.cursor/rules/link-validation.md`  
**Trigger:** Say "Validate links" or "Check links"  
**Status:** `alwaysApply: false` (invoke on demand)

**What it checks:**
- Relative paths with `../`
- Markdown `.md` extensions in links
- File paths instead of web routes
- Missing `/docs/` prefix

**Outputs:**
- List of problems found
- Suggested corrections
- Line numbers

**Example usage:**
```
"Validate all links in this file"
```

---

## Planned Templates (Future)

### API Documentation Template
For documenting REST API endpoints with:
- Endpoint details
- Request/response schemas
- Authentication requirements
- Rate limits
- Code examples in multiple languages
- Error codes

### SDK Method Template
For documenting SDK methods with:
- Method signatures
- Parameters and types
- Return values
- Platform-specific notes
- Code examples
- Version compatibility

### Release Notes Generator
For creating release notes with:
- Automatic commit scanning
- Grouping by type (features, fixes, breaking changes)
- Proper formatting
- Links to documentation

### Migration Guide Template
For documenting breaking changes with:
- What changed
- Why it changed
- Step-by-step migration instructions
- Before/after code examples
- Common issues

---

## How Templates Work

### Invocation
1. Open Cursor Chat (Cmd+L or Cmd+K)
2. Type the trigger phrase
3. Answer questions (if prompted)
4. Review generated content
5. Edit as needed

### Customization
Cursor AI understands natural language, so you can:
- Ask for variations: "Document new feature but focus on the API"
- Request changes: "Make it more technical" or "Add more examples"
- Combine requests: "Document this feature and validate links"

### Context Awareness
Cursor reads:
- Your open files
- The collection structure
- Existing similar docs
- All style rules

So it generates documentation that matches your existing patterns.

---

## Style Rule Details

For comprehensive information about Amplitude's documentation style, see:

**📚 Main Style Guide:** `.cursor/rules/README.md`

Key principles:
- **Voice:** Active, not passive
- **Tense:** Present, not future
- **Tone:** Conversational with contractions
- **Perspective:** Second person (you)
- **Instructions:** Direct imperatives without "please"
- **Language:** Concise, no wordy phrases
- **Formatting:** Code formatting for technical terms
- **Inclusivity:** Modern, inclusive terminology

---

## Rule Application Order

When Cursor processes your documentation, it applies rules in this order:

1. **Active voice** (most important, often missed)
2. **Present tense** (remove "will", "would")
3. **Contractions** (cannot → can't)
4. **Concise language** (in order to → to)
5. **Second person** (use "you")
6. **Direct instructions** (no "please")
7. **Statamic routing** (correct link format)
8. **Final passive voice check** (second pass)

This ensures consistent, high-quality output.

---

## Contributing Engineer Workflow

### Recommended Flow

1. **Planning Phase**
   ```
   "Where should I document [feature]?"
   ```
   Cursor suggests the right collection.

2. **Drafting Phase**
   ```
   "Document new feature: [name]"
   ```
   Cursor generates structured documentation.

3. **Enhancement Phase**
   - Add screenshots
   - Include real code examples
   - Test the instructions

4. **Review Phase**
   ```
   "Check this doc for style issues"
   "Validate links in this file"
   ```

5. **Submit Phase**
   - Create PR
   - Vercel auto-generates preview
   - Tag `@tech-writers` for review

---

## Getting Help

### For Template Questions
- **Slack:** `#amplitude-docs`
- **Tag:** `@tech-writers`
- **File:** `.cursor/rules/HOW-TO-CONTRIBUTE.md`

### For Style Questions
- **Guide:** `.cursor/rules/README.md`
- **Vale Config:** `.vale.ini`
- **Slack:** `#amplitude-docs`

### For Technical Issues
- **Cursor Docs:** https://cursor.com/docs
- **Statamic Docs:** https://statamic.dev
- **Team:** `#amplitude-docs`

---

## Benefits of Using Templates

### Speed
- ⚡ Draft documentation in minutes
- 🚀 No memorizing syntax or structure
- ✨ Focus on content, not formatting

### Consistency
- 🎯 All docs follow same style
- 📐 Proper structure every time
- 🔗 Correct links automatically

### Quality
- ✅ Style rules enforced automatically
- 📝 Complete documentation coverage
- 🎨 Professional presentation

### Scalability
- 👥 125+ people can contribute
- 📚 2 writers scale their impact
- 🔄 Documentation doesn't bottleneck releases

---

## Pro Tips

1. **Combine templates** - "Document this feature and validate links"
2. **Iterate** - "Make this more technical" or "Add more examples"
3. **Ask questions** - "What collection should this go in?"
4. **Reference examples** - "Use the same structure as [other doc]"
5. **Start early** - Document during development, not after
6. **Use context** - Keep related docs open so Cursor learns from them

---

## Template Maintenance

The tech writing team maintains these templates. If you notice:
- Missing templates you'd find useful
- Templates that don't work well
- Style rules that seem wrong
- Improvements or suggestions

Share your feedback in `#amplitude-docs` or open an issue in the repo.

---

## Version History

- **2024-10-31:** Initial template system created
  - New Feature Template
  - Statamic Routing
  - Link Validation
  - HOW-TO-CONTRIBUTE guide
  - This index

More templates coming based on team feedback! 🎉

