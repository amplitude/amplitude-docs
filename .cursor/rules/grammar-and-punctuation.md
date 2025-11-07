---
description: Follow grammar and punctuation standards
globs: ["content/**/*.md", "*.md"]
alwaysApply: true
---

# Grammar and Punctuation

Follow these grammar and punctuation standards for consistency and clarity.

## Oxford Comma (Serial Comma)

Always use the Oxford comma in lists of three or more items.

**Examples:**
- ❌ "Configure events, properties and user attributes."
- ✅ "Configure events, properties, and user attributes."
- ❌ "Amplitude supports iOS, Android and web platforms."
- ✅ "Amplitude supports iOS, Android, and web platforms."

## Avoid "etc."

Don't end lists with "etc." Start the sentence with "for example" or use "such as" instead.

**Examples:**
- ❌ "You can track events like clicks, page views, etc."
- ✅ "For example, you can track events like clicks and page views."
- ✅ "You can track events such as clicks, page views, and form submissions."

## Sentence Length

Keep sentences under 30 words when possible. Break long sentences into multiple shorter ones.

**Example:**
- ❌ "When you configure the API endpoint in the settings file, you need to ensure that you have the correct credentials and that the endpoint URL is properly formatted, otherwise the connection fails."
- ✅ "Configure the API endpoint in the settings file. Ensure you have the correct credentials and that the endpoint URL is properly formatted. Otherwise, the connection fails."

## Dashes

Use em dashes (—) for parenthetical statements, not double hyphens (--) or en dashes (–).

**Examples:**
- ❌ "The API endpoint -- located in the settings file -- requires authentication."
- ✅ "The API endpoint—located in the settings file—requires authentication."

For markdown, use three hyphens for em dashes:
```markdown
The API endpoint---located in the settings file---requires authentication.
```

Or use the HTML entity:
```markdown
The API endpoint&mdash;located in the settings file&mdash;requires authentication.
```

## Quotation Marks

Use proper quotation marks (" "), not straight quotes (" ").

For code, technical terms, and UI elements, use backticks instead of quotation marks:
- ✅ "Select the `Configuration` tab."
- ✅ "Set the `api_key` parameter."

## Lists

### Bulleted Lists
Use for unordered items. Maintain parallel structure.

**Examples:**
```markdown
Amplitude provides:
- Real-time event tracking
- Advanced analytics dashboards
- Integration with third-party tools
```

### Numbered Lists
Use for sequential steps or ordered items.

**Examples:**
```markdown
To configure authentication:

1. Navigate to **Settings** > **API Keys**.
2. Select **Create New Key**.
3. Copy the generated key.
4. Add the key to your application.
```

### Capitalization in Lists
- Capitalize the first word of each list item
- Use ending punctuation if items are complete sentences
- Omit ending punctuation if items are fragments

## Semicolons

Use semicolons sparingly. Consider breaking into separate sentences or using bullets instead.

**Examples:**
- ❌ "The API supports JSON; XML; and CSV formats."
- ✅ "The API supports JSON, XML, and CSV formats."
- ✅ "The API supports these formats: JSON, XML, and CSV."

## Parentheses

Use parentheses for brief asides. For longer clarifications, use separate sentences or em dashes.

**Examples:**
- ✅ "The SDK (version 2.0 and later) includes automatic session tracking."
- ❌ "The SDK (which was released in 2023 and includes many new features including automatic session tracking and enhanced error handling) requires minimal configuration."
- ✅ "The SDK requires minimal configuration. Version 2.0 and later includes automatic session tracking and enhanced error handling."

