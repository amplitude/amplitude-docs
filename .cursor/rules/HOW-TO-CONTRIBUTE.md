---
description: Guide for engineers and contributors to Amplitude documentation
globs: []
alwaysApply: false
---

# Contributing to Amplitude Docs

Welcome! You're an engineer, PM, or other contributor who needs to document something. This guide shows you how to use Cursor's AI to make documentation easier.

## Quick Start: Just Ask Cursor

You don't need to learn Markdown syntax or memorize style rules. Just open Cursor Chat and ask:

### Common Commands

Type these in Cursor Chat (Cmd+L or Cmd+K):

| What You Need | Say This |
|---------------|----------|
| Document a new feature | `"Document new feature: [name]"` |
| Add to existing docs | `"Add section about [topic] to [file]"` |
| Create API documentation | `"Document API endpoint [name]"` |
| Update SDK docs | `"Update [platform] SDK docs for [feature]"` |
| Add code example | `"Add code example for [feature] to [file]"` |
| Check your writing | `"Check this doc for style issues"` |
| Fix formatting | `"Apply all Amplitude style rules to this file"` |

## What Happens Automatically

Cursor applies all Amplitude documentation standards for you:

✅ **Active voice, present tense** - "Configure settings" not "Settings are configured"  
✅ **Contractions** - "can't", "don't", "isn't" for conversational tone  
✅ **Second person** - Uses "you" to address the reader  
✅ **Concise language** - Removes wordy phrases  
✅ **Correct links** - Uses web routes, not file paths  
✅ **Proper formatting** - Headings, lists, code blocks  

You write naturally, Cursor formats correctly.

## Workflow for Documenting a Feature

### 1. Open Cursor in the amplitude-docs repo
```bash
cd /path/to/amplitude-docs
cursor .
```

### 2. Start a chat (Cmd+L)
```
"Document new feature: Predictive Cohorts"
```

### 3. Answer Cursor's questions
Cursor asks about:
- Product area (Analytics, CDP, Experiment, etc.)
- User benefit (what problem it solves)
- Prerequisites (plan tier, permissions, setup)
- Main workflow (how users use it)

### 4. Cursor generates the documentation
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
- Tech writers review within 2 days

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

Cursor handles this automatically, but if you're writing manually, always:
- Start links with `/docs/`
- Use the web route (check the collection's YAML file)
- Never use `.md` extensions
- Never use relative paths (`../`)

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

## Style Tips (Cursor Handles These)

You don't need to memorize these - Cursor applies them automatically - but here are the key principles:

### Active Voice
- ❌ "The data is sent to Amplitude"
- ✅ "Amplitude receives the data"

### Present Tense
- ❌ "The feature will allow you to configure settings"
- ✅ "The feature lets you configure settings"

### Imperative for Instructions
- ❌ "You should navigate to Settings"
- ✅ "Navigate to Settings"

### No "Please"
- ❌ "Click the button please"
- ✅ "Click the button"

### Use Contractions
- ❌ "The setting cannot be configured"
- ✅ "You can't configure this setting"

## Getting Help

### Documentation Questions
- **Slack:** `#amplitude-docs`
- **Tag:** `@tech-writers` in PRs or Slack

### Cursor/Technical Questions
- **Slack:** `#amplitude-docs` or your team channel
- **This file:** `.cursor/rules/HOW-TO-CONTRIBUTE.md`

### Style Guide Details
- See `.cursor/rules/README.md` for comprehensive style guidelines
- Vale linter runs automatically on PRs to catch style issues

## Common Scenarios

### "I need to update existing docs"

1. Find the file in `content/collections/[collection]/en/`
2. Open in Cursor
3. Chat: `"Add information about [topic]"`
4. Cursor updates following all style rules

### "I'm not sure where my docs should go"

Ask Cursor:
```
"Where should I document [feature]? It's for [product area]"
```

Cursor knows the collection structure and suggests the right location.

### "I need to document an API endpoint"

```
"Document API endpoint: POST /api/2/events"
```

Cursor generates:
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
- 🎯 **Better:** Cursor ensures consistency
- 📝 **Focus:** Spend time on content, not formatting

### For Users
- 📚 **Complete docs:** Features launch with documentation
- ⚡ **Timely:** Docs published when features ship
- 🎨 **Consistent:** All docs follow same style
- ✨ **Quality:** Engineer expertise + writer polish

### For the Org
- 📈 **Scale:** 2 writers support 125+ people
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

## Remember

You don't need to be a technical writer to contribute. Just:
- Know your feature
- Answer Cursor's questions
- Review the generated docs
- Submit the PR

The tech writing team is here to help, not gatekeep. We want to make it as easy as possible for you to share your knowledge with users.

Questions? Ask in `#amplitude-docs` anytime! 🎉

