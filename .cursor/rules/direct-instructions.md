---
description: Write direct instructions without unnecessary politeness
globs: ["content/**/*.md", "*.md"]
alwaysApply: true
---

# Direct Instructions

Write instructions directly without unnecessary politeness markers. Be clear and imperative.

## Never Use "Please"

Don't ask users to perform actions. Tell them what to do.

**Examples:**
- ❌ "Please navigate to the Settings page."
- ✅ "Navigate to the Settings page."
- ❌ "Please make sure to save your changes."
- ✅ "Save your changes."
- ❌ "Please refer to the documentation for more details."
- ✅ "See the documentation for more details."

## Use Imperative Mood

Start instructions with action verbs in the imperative mood.

**Common instruction verbs:**
- Configure, Create, Delete, Update, Edit
- Navigate, Select, Choose, Click
- Enter, Type, Specify, Define
- Install, Run, Execute, Deploy
- Enable, Disable, Toggle, Set
- Review, Check, Verify, Validate
- Export, Import, Upload, Download

**Examples:**
- ✅ "Configure the API endpoint in the settings file."
- ✅ "Create a new project in the Amplitude dashboard."
- ✅ "Navigate to **Settings** > **API Keys**."
- ✅ "Select the events you want to track."

## Avoid Hedging Language

Remove qualifiers that weaken instructions:

- ❌ "You might want to configure..."
- ✅ "Configure..."
- ❌ "You should probably check..."
- ✅ "Check..."
- ❌ "It would be good to review..."
- ✅ "Review..."

## Complex Procedures

For multi-step procedures, use numbered lists with direct imperative statements:

```markdown
To configure API authentication:

1. Navigate to **Settings** > **API Keys**.
2. Select **Create New Key**.
3. Enter a name for the key.
4. Copy the generated key to your application.
5. Save your changes.
```

