---
description: Ensure images have proper alt text for accessibility
globs: ["content/**/*.md", "*.md"]
alwaysApply: true
---

# Images and Accessibility

Always include descriptive alt text for images to ensure accessibility.

## Always Include Alt Text

Never use empty brackets for images. All images must have descriptive alt text.

**Examples:**
- ❌ `![](screenshot.png)` (empty alt text)
- ✅ `![Dashboard showing event analytics](screenshot.png)`
- ✅ `![API configuration settings page](config-screenshot.png)`

## Writing Good Alt Text

Alt text should:
1. Describe the content and purpose of the image
2. Be concise but meaningful (typically under 150 characters)
3. Not include phrases like "image of" or "screenshot of" (screen readers announce this automatically)
4. Focus on the information the image conveys, not just what it looks like

**Examples:**

For a UI screenshot:
```markdown
![Settings page with API key configuration form](settings-api-keys.png)
```

For a diagram:
```markdown
![Data flow from client SDK through Amplitude servers to analytics dashboard](data-flow-diagram.svg)
```

For an icon or decorative element that has a nearby text description:
```markdown
![](decorative-line.svg)
```
(Use empty alt text only for purely decorative images that add no information)

## Complex Images

For complex diagrams or charts, consider:
1. Providing alt text that summarizes the key information
2. Following the image with a detailed text description
3. Using a table to present the same data in an alternative format

**Example:**
```markdown
![Monthly active users growth chart showing steady increase from 10K to 50K over 12 months](growth-chart.png)

The chart shows monthly active user growth over the past year:
- January: 10,000 users
- June: 30,000 users
- December: 50,000 users
```

## File Names

Use descriptive file names for images:
- ✅ `amplitude-dashboard-overview.png`
- ✅ `event-tracking-flow-diagram.svg`
- ❌ `screenshot1.png`
- ❌ `image.jpg`

## Image Captions

When using captions (if your documentation system supports them), the caption should complement, not duplicate, the alt text:

```markdown
![Settings page with API key configuration](settings-page.png)
*Navigate to Settings > API Keys to manage your integration credentials*
```

