---
description: Follow technical writing best practices for code, APIs, and technical terms
globs: ["content/**/*.md", "*.md"]
alwaysApply: true
---

# Technical Writing

Follow these guidelines when documenting technical concepts, code, and APIs.

## Code Formatting

Use backticks for all code-related elements:

### Inline Code Elements
- File names and paths: `config.json`, `/etc/amplitude/settings`
- Function and method names: `logEvent()`, `setUserId()`
- Variable names: `api_key`, `userId`
- Parameter names: `event_name`, `event_properties`
- API endpoints: `/api/v2/events`
- Class names: `AmplitudeClient`, `EventData`
- Package names: `@amplitude/analytics-browser`
- Command-line commands: `npm install`, `php artisan`

**Examples:**
- ✅ "Set the `api_key` parameter in your `config.json` file."
- ✅ "Call the `logEvent()` method to track user actions."
- ❌ "Set the api_key parameter in your config.json file." (missing backticks)

### Code Blocks
Use fenced code blocks with language identifiers:

```javascript
import * as amplitude from '@amplitude/analytics-browser';

amplitude.init('YOUR_API_KEY');
amplitude.track('Button Clicked');
```

```python
import amplitude

amplitude.init("YOUR_API_KEY")
amplitude.track("Button Clicked")
```

## Technical Terms and Acronyms

### Define Acronyms on First Use
Define acronyms the first time they appear in a document (unless they're universally known).

**Examples:**
- ✅ "Configure Role-Based Access Control (RBAC) to manage permissions."
- ✅ "Use the Application Programming Interface (API) to send events."

**Exceptions** (commonly understood acronyms that don't need definition):
- API, SDK, HTML, CSS, JSON, XML, HTTP, HTTPS
- URL, URI, UUID
- iOS, Android

### Capitalization of Technical Terms

Follow standard capitalization for:
- **Product names**: Amplitude, Amplitude Analytics, Session Replay, Guides & Surveys
- **Technology names**: JavaScript, TypeScript, Python, React, Node.js
- **Third-party products**: Keep their official capitalization (GitHub, npm, AWS)

### Amplitude-Specific Terms

Use these approved technical terms (from the vocabulary list):
- "event properties" not "event attributes"
- "user properties" not "user attributes"
- "API key" not "api key" or "API-key"
- "tracking plan" not "tracking-plan"
- "cohort" not "segment" (unless specifically referring to user segments)

## API Documentation

### Endpoint Format
```markdown
`POST /api/v2/events`
```

### Parameters
Document parameters in tables:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `api_key` | string | Yes | Your project API key |
| `events` | array | Yes | Array of event objects |
| `options` | object | No | Additional configuration options |

### Request Examples
Always include request and response examples:

```json
{
  "api_key": "YOUR_API_KEY",
  "events": [{
    "event_type": "Button Clicked",
    "user_id": "user123",
    "event_properties": {
      "button_name": "Submit"
    }
  }]
}
```

## Version Numbers and Dates

### Version Numbers
- Use semantic versioning format: `2.1.0`
- Include "version" before the number in prose: "version 2.1.0"
- Use code formatting for version numbers: `v2.1.0` or `2.1.0`

### Dates
- Use full date format: "January 15, 2024"
- Don't use ambiguous numeric formats like "01/15/24"
- For date ranges, use: "January 1–15, 2024" (en dash)

## Numbers and Units

### Numbers
- Spell out numbers one through nine in prose
- Use numerals for 10 and above
- Use numerals for all technical measurements, versions, and quantities

**Examples:**
- ✅ "The SDK supports three platforms."
- ✅ "Configure the timeout to 30 seconds."
- ✅ "Version 2.0 includes five new features."

### Units
- Use standard abbreviations: KB, MB, GB, TB (not kb, mb)
- Include a space between number and unit: "100 MB" not "100MB"
- For time: ms (milliseconds), s (seconds), min (minutes)

**Examples:**
- ✅ "The API accepts payloads up to 1 MB."
- ✅ "Set the timeout to 30 seconds."
- ✅ "Response time averages 200 ms."

## UI Element References

### Formatting UI Elements
Use bold for UI elements users interact with:

- Buttons: **Save**, **Cancel**, **Create Project**
- Menu items: **File** > **Settings** > **API Keys**
- Tabs: **Configuration**, **Analytics**, **Settings**
- Field labels: **Project Name**, **API Key**, **Event Type**

**Examples:**
- ✅ "Select **Settings** > **API Keys** to view your credentials."
- ✅ "Enter your project name in the **Project Name** field."
- ✅ "Select **Save** to save your changes."

### Navigation Paths
Use angle brackets (>) to show navigation paths:

```markdown
**Settings** > **Data** > **Sources**
```

## Links and References

### Link Text
Use descriptive link text that makes sense out of context. Avoid "click here" or "this link."

**Examples:**
- ❌ "Click [here](url) for more information."
- ✅ "Review the [API reference documentation](url) for more information."
- ❌ "See [this page](url) for setup instructions."
- ✅ "See [Configure authentication](url) for setup instructions."

### Cross-References
When referencing other documentation:

- ✅ "For more details, see [Event tracking overview](link)."
- ✅ "Review [Configure API authentication](link)."
- ❌ "For more details, please refer to the event tracking page."

## Examples and Code Comments

### Use Realistic Examples
Use realistic, meaningful examples rather than generic placeholders:

**Examples:**
- ✅ `"user_email": "alex@example.com"`
- ❌ `"user_email": "foo@bar.com"`
- ✅ `"event_type": "Purchase Completed"`
- ❌ `"event_type": "test_event"`

### Code Comments
Write clear, helpful code comments:

```javascript
// Initialize Amplitude with your project API key
amplitude.init('YOUR_API_KEY');

// Track a purchase event with revenue
amplitude.track('Purchase Completed', {
  product_id: 'prod_123',
  revenue: 29.99,
  currency: 'USD'
});
```

## Error Messages and Troubleshooting

### Error Message Format
Present error messages clearly:

```markdown
**Error:** `InvalidRequestError: Missing required parameter 'api_key'`
```

### Troubleshooting Steps
Use clear, numbered steps:

```markdown
If you receive this error:

1. Verify your API key is correct.
2. Check that the API key is included in the request headers.
3. Ensure your API key hasn't expired.
```

