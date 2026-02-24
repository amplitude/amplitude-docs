# Contributing to Amplitude Docs

Welcome! You're an engineer, PM, or other contributor who needs to document something. This guide shows you how to use Claude Code to make documentation easier.

## Quick Start: Just Ask Claude Code

You don't need to learn Markdown syntax or memorize style rules. Just ask Claude Code for help:

### Common Tasks

Ask Claude Code to help with documentation:

| What You Need            | Say This or Use This Skill                       |
| ------------------------ | ------------------------------------------------ |
| Document a new feature   | `/document-feature` or "Document new feature: [name]" |
| Add to existing docs     | "Add section about [topic] to [file]"          |
| Create API documentation | "Document API endpoint [name]"                 |
| Update SDK docs          | "Update [platform] SDK docs for [feature]"     |
| Add code example         | "Add code example for [feature] to [file]"     |
| Check your writing       | `/edit-doc` or "Apply style rules to this document" |
| Validate links           | `/validate-links` or "Check links in this file" |

## What Happens Automatically

Claude Code applies all Amplitude documentation standards for you:

✅ **Active voice, present tense** - "Configure settings" not "Settings are configured"
✅ **Contractions** - "can't", "don't", "isn't" for conversational tone
✅ **Second person** - Uses "you" to address the reader
✅ **Concise language** - Removes wordy phrases
✅ **Correct links** - Uses web routes, not file paths
✅ **Proper formatting** - Headings, lists, code blocks

You write naturally, Claude Code formats correctly.

## Workflow for Documenting a Feature

### 1. Open Claude Code in the amplitude-docs repo
```bash
cd /path/to/amplitude-docs
claude
```

### 2. Use the document-feature skill
```
/document-feature
```

Or just ask:
```
"Document new feature: Predictive Cohorts"
```

### 3. Answer Claude Code's questions
Claude Code asks about:
- Product area (Analytics, CDP, Experiment, etc.)
- User benefit (what problem it solves)
- Prerequisites (plan tier, permissions, setup)
- Main workflow (how users use it)

### 4. Claude Code generates the documentation
- Creates properly structured markdown
- Applies all style rules automatically
- Suggests filename and location
- Uses correct internal link format

### 5. Review and enhance
- Add screenshots if helpful
- Include real code examples
- Verify technical accuracy
- Test the steps yourself

### 6. Submit PR
```bash
git checkout -b docs/your-feature-name
git add .
git commit -m "Add docs for [feature]"
git push origin docs/your-feature-name
```

Create PR on GitHub. Vercel automatically generates a preview.

### 7. Tag for review
- Tag `@tech-writers` in the PR
- Or mention in `#amplitude-docs` Slack
- Tech writers review within 2 business days

## Repository Structure

```
amplitude-docs/
├── content/
│   └── collections/           # All documentation lives here
│       ├── analytics/         # Analytics product docs
│       ├── data/             # Data management docs
│       ├── experiment/       # Experiment docs
│       ├── sdks/             # SDK documentation
│       ├── apis/             # API documentation
│       └── [many more]/      # Each product area has a folder
│
├── .claude/                   # Claude Code configuration
│   ├── CLAUDE.md             # Main config (style rules)
│   ├── skills/               # Executable workflows
│   ├── docs/                 # This directory
│   └── README.md             # Navigation hub
│
└── public/
    └── docs/
        └── output/
            └── img/          # Screenshots and images
```

## Internal Links: Use Web Routes, Not File Paths

**❌ Wrong:**
```markdown
[Other doc](../analytics/chart.md)
```

**✅ Correct:**
```markdown
[Other doc](/docs/analytics/chart)
```

Claude Code handles this automatically, but if you're writing manually, always:
- Start links with `/docs/`
- Use the web route (check the collection's YAML file)
- Never use `.md` extensions
- Never use relative paths (`../`)

Use `/validate-links` to check your links before submitting.

## Images

Place images in `public/docs/output/img/[collection-name]/`

Reference them:
```markdown
![Alt text description](/docs/output/img/analytics/my-image.png)
```

## Code Examples

Use fenced code blocks with language:

````markdown
```javascript
// JavaScript example
amplitude.init('YOUR_API_KEY');
```

```python
# Python example
amplitude.init("YOUR_API_KEY")
```
````

## Style Tips (Claude Code Handles These)

You don't need to memorize these - Claude Code applies them automatically via CLAUDE.md - but here are the key principles:

### Active Voice (HIGHEST PRIORITY)
- ❌ "The data is sent to Amplitude"
- ✅ "Send data to Amplitude" or "Amplitude receives the data"

This is the #1 most commonly missed rule. Use `/edit-doc` to catch passive voice.

### Present Tense
- ❌ "The feature will allow you to configure settings"
- ✅ "The feature lets you configure settings"

### Imperative for Instructions
- ❌ "You should navigate to Settings"
- ✅ "Navigate to Settings"

### No "Please"
- ❌ "Please click the button"
- ✅ "Select the button"

### Use Contractions
- ❌ "The setting cannot be configured"
- ✅ "You can't configure this setting"

## Claude Code Skills

Claude Code provides three essential skills for documentation workflows:

### `/document-feature`
Interactive wizard for creating new feature documentation
- Asks about product area, benefits, prerequisites
- Generates structured markdown
- Applies all style rules automatically

### `/validate-links`
Checks internal links for correct Statamic routing
- Validates against `/docs/` web route requirements
- Reports issues with line numbers
- Can auto-fix incorrect links

### `/edit-doc`
Applies all Amplitude style rules systematically
- Two-pass check for active voice
- Removes future tense, applies contractions
- Enforces all formatting standards

## Getting Help

### Documentation Questions
- **Slack:** `#amplitude-docs`
- **Tag:** `@tech-writers` in PRs or Slack

### Claude Code Questions
- **Documentation:** `.claude/README.md` - Navigation and overview
- **Style rules:** `.claude/CLAUDE.md` - Complete style reference
- **This guide:** `.claude/docs/HOW-TO-CONTRIBUTE.md`

### Style Guide Details
- See `.claude/CLAUDE.md` for comprehensive style guidelines
- Vale linter runs automatically on PRs to catch style issues
- Both Claude Code and Vale enforce the same standards

## Common Scenarios

### "I need to update existing docs"

1. Find the file in `content/collections/[collection]/en/`
2. Open Claude Code and navigate to the file
3. Ask: "Add information about [topic]"
4. Claude Code updates following all style rules

Or use `/edit-doc` after making manual edits to apply style rules.

### "I'm not sure where my docs should go"

Use `/document-feature` - it determines the correct collection based on your answers about the product area.

Or ask:
```
"Where should I document [feature]? It's for [product area]"
```

Claude Code knows the collection structure and suggests the right location.

### "I need to document an API endpoint"

```
"Document API endpoint: POST /api/2/events"
```

Claude Code generates:
- Endpoint description
- Request parameters
- Response format
- Code examples (cURL, SDKs)
- Error codes

### "My feature has breaking changes"

Make sure to:
- Clearly mark breaking changes with a callout
- Explain migration steps
- Link to previous version docs if applicable

Use this format:
```markdown
{{partial:admonition type="warning" heading="Breaking change"}}
This version introduces breaking changes. See [Migration guide](/docs/path/to/migration) for details.
{{/partial:admonition}}
```

### "I need to add a warning or note"

Use Statamic partials:

```markdown
{{partial:admonition type="note" heading="Note"}}
This feature is in beta.
{{/partial:admonition}}

{{partial:admonition type="warning" heading="Warning"}}
This action can't be undone.
{{/partial:admonition}}

{{partial:admonition type="tip" heading="Tip"}}
Use this approach for better performance.
{{/partial:admonition}}
```

### "I need to check if my links are correct"

Use the validate-links skill:
```
/validate-links
```

It checks all internal links against Statamic routing rules and suggests corrections.

### "I've made edits and want to ensure style compliance"

Use the edit-doc skill:
```
/edit-doc
```

It applies all Amplitude style rules systematically and reports what was changed.

## What Tech Writers Review

When you submit a PR, tech writers check:

✅ **Completeness** - Does it cover the feature fully?
✅ **Accuracy** - Are the technical details correct?
✅ **Context** - Does it explain why, not just how?
✅ **Discoverability** - Can users find this?
✅ **Cross-references** - Links to related docs?

Style and formatting are mostly automated, so reviews focus on content quality.

## Benefits of This Workflow

### For You
- 🚀 **Faster:** Draft docs in minutes, not hours
- ✅ **Easier:** No memorizing style rules
- 🎯 **Better:** Claude Code ensures consistency
- 📝 **Focus:** Spend time on content, not formatting

### For Users
- 📚 **Complete docs:** Features launch with documentation
- ⚡ **Timely:** Docs published when features ship
- 🎨 **Consistent:** All docs follow same style
- ✨ **Quality:** Engineer expertise + writer polish

### For the Org
- 📈 **Scale:** 2 writers support 125+ engineers
- 🔄 **Sustainability:** Docs don't bottleneck releases
- 🤝 **Collaboration:** Engineers contribute, writers guide
- 💪 **Ownership:** Teams document what they build

## Pro Tips

1. **Document as you build** - Don't wait until launch
2. **Use examples** - Show real configuration values
3. **Think like a user** - What would confuse someone new?
4. **Link generously** - Connect to related documentation
5. **Ask for help early** - Tag tech writers during planning
6. **Test your steps** - Actually follow the instructions
7. **Include screenshots** - Visual guides help tremendously
8. **Use the skills** - `/document-feature`, `/validate-links`, `/edit-doc` streamline your workflow

## Pre-Submit Checklist

Before submitting your PR:

- [ ] Use `/edit-doc` to apply all style rules
- [ ] Use `/validate-links` to verify internal links
- [ ] Add screenshots where helpful
- [ ] Include real code examples (not just placeholders)
- [ ] Test the workflow yourself
- [ ] Review the Vercel preview
- [ ] Tag `@tech-writers` for review

## Remember

You don't need to be a technical writer to contribute. Just:
- Know your feature
- Use `/document-feature` to get started (or ask Claude Code for help)
- Answer the questions
- Review the generated docs
- Use `/edit-doc` and `/validate-links` before submitting
- Submit the PR

The tech writing team is here to help, not gatekeep. We want to make it as easy as possible for you to share your knowledge with users.

## Cursor Users

If you're using Cursor instead of Claude Code, that's fine too! The `.cursor/` directory has equivalent rules. Both systems enforce the same Amplitude documentation standards:

- **Cursor**: Uses `.cursor/rules/` with 30+ .mdc files
- **Claude Code**: Uses `.claude/CLAUDE.md` with consolidated rules

Use whichever AI assistant fits your workflow. The end result is the same: high-quality, consistent documentation.

## Questions?

Ask in `#amplitude-docs` anytime! 🎉

The tech writing team monitors the channel and is happy to help with:
- Where to document your feature
- How to structure complex documentation
- Questions about style or formatting
- Technical writing best practices
- Anything else docs-related
