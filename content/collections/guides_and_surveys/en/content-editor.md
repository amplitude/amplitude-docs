---
id: 8f9e2a1b-3c4d-5e6f-7a8b-9c0d1e2f3a4b
blueprint: guides_and_survey
title: 'Content editor'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1750979108
section: customization
landing: true
landing_blurb: 'Learn how to create rich, custom content for your guides and surveys using Markdown and HTML.'
---

The content editor in Guides and Surveys supports rich content creation through Markdown and/or HTML, giving you complete control over how your content appears to users. Although the content editor works for the content field, no other fields (for example titles or buttons) are supported.

## Markdown support

The description editor supports standard Markdown formatting, allowing you to create rich text content without writing HTML. Use Markdown for:

- \*\*Bold text\*\* and \*italic text\*
- Headers and subheaders
- Lists (bulleted and numbered)
- Links and images
- Code blocks and inline code

### Example Markdown content

```markdown
## Welcome to our *new* feature!

This **important update** includes:

1. Enhanced performance
2. New user interface
3. Better accessibility

> **Note:** This feature is available to all users.

For more information, visit our [help center](/help).
```

## HTML and inline CSS

For advanced customization, you can use HTML with inline CSS directly in the step description editor. This gives you complete control over styling and layout.

{{partial:admonition type="info" heading="HTML is sanitized"}}
Anything outside of inline styling, for example an `onclick`, is ignored.
{{/partial:admonition}}

### Example HTML with inline CSS

```html
<h2 style="margin: 0 0 10px 0; font-size: 24px; color: blue;">Special Announcement</h2>
<p style="margin: 0; font-size: 16px; background:yellow;">We're excited to share this update with you!</p>
```

## Custom CSS on themes

For more systematic use of custom CSS, you can write custom CSS directly in your [themes](/docs/guides-and-surveys/themes#custom-css). Use the CSS selectors provided in the [Custom CSS documentation](/docs/guides-and-surveys/custom-css) to target specific elements and create cohesive designs across all your guides and surveys.

{{partial:admonition type="tip" heading="Content preview"}}
Use the theme preview feature to see how your Markdown and HTML content will appear to users before publishing your guide or survey.
{{/partial:admonition}}
