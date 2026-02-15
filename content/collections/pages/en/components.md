---
id: 4d2e02c1-9bf7-48ec-ab17-641fe208de23
blueprint: page
title: 'Site components'
package: '@amplitude/session-replay-browser'
author: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1757629320
---
This page demonstrates the reusable components available in Amplitude's documentation system. Use these components to create consistent, well-styled content across all documentation.

## Admonitions

Admonitions are styled callout boxes for important information. They support multiple types.

### Note admonition

{{partial:admonition type="note" heading="Note heading"}}
This is a note admonition. Use it for additional information that supplements the main content.
{{/partial:admonition}}

### Tip admonition

{{partial:admonition type="tip" heading="Pro tip"}}
Use tip admonitions to share best practices and helpful suggestions that improve the user experience.
{{/partial:admonition}}

### Warning admonition

{{partial:admonition type="warning" heading="Important warning"}}
Use warning admonitions to alert users about potential issues, breaking changes, or actions that require caution.
{{/partial:admonition}}

### Example admonition

{{partial:admonition type="example" heading="Example scenario"}}
Use example admonitions to show concrete use cases or sample implementations.
{{/partial:admonition}}

### Code in admonitions

{{partial:admonition type="note" heading="Code block example"}}
```typescript
import { Experiment } from '@amplitude/experiment-js-client';

// Initialize the experiment client
const experiment = Experiment.initializeWithAmplitudeAnalytics(
    'DEPLOYMENT_KEY'
);

// Fetch variants
await experiment.fetch();

// Lookup a flag's variant
const variant = experiment.variant('FLAG_KEY');
if (variant.value === 'on') {
    // Flag is on
} else {
    // Flag is off
}
```
{{/partial:admonition}}

### Inline code in admonitions

{{partial:admonition type="note" heading="Inline code reference"}}
Use the `experiment.fetch()` method to retrieve all variants. The `variant()` method accepts a `FLAG_KEY` parameter.
{{/partial:admonition}}

## Card grid (two-column layout)

Card grids display content side-by-side for easy comparison. Perfect for showing good vs. bad code examples.

### Good vs. bad code comparison

{{partial:card-grid}}
  {{partial:card style="tip" label="good" caption="Uses descriptive event names and structured properties"}}
  ```javascript
  amplitude.track('Purchase Completed', {
    product_id: 'SKU_12345',
    product_name: 'Premium Subscription',
    revenue: 29.99,
    currency: 'USD'
  });
  ```
  {{/partial:card}}
  {{partial:card style="warning" label="bad" caption="Vague event name with unstructured data"}}
  ```javascript
  amplitude.track('clicked', {
    data: 'some_product'
  });
  ```
  {{/partial:card}}
{{/partial:card-grid}}

### Configuration comparison

{{partial:card-grid}}
  {{partial:card style="tip" label="good" caption="Production-ready configuration with error handling"}}
  ```typescript
  amplitude.init('API_KEY', {
    serverZone: 'US',
    minIdLength: 5,
    defaultTracking: {
      sessions: true,
      pageViews: true,
      formInteractions: false
    },
    logLevel: 'Warn'
  });
  ```
  {{/partial:card}} 
  {{partial:card style="warning" label="bad" caption="Missing important configuration options"}}
  ```typescript
  amplitude.init('API_KEY');
  ```
  {{/partial:card}}
{{/partial:card-grid}}

### Plain cards without labels

{{partial:card-grid}}
  {{partial:card style="plain"}}
  **Option A: Client-side tracking**
  
  Track events directly from your web application. This approach is simpler but exposes your API key in client-side code.
  
  - Easy to implement
  - Real-time tracking
  - Limited security
  {{/partial:card}}
  {{partial:card style="plain"}}
  **Option B: Server-side tracking**
  
  Send events from your backend servers. This approach is more secure but requires additional infrastructure.
  
  - Enhanced security
  - Better data quality
  - More complex setup
  {{/partial:card}}
{{/partial:card-grid}}

### Custom labels

{{partial:card-grid}}
  {{partial:card style="tip" label="Recommended"}}
  ```python
  amplitude.set_group('company_id', 'acme_corp')
  amplitude.track('Feature Used', {
      'feature_name': 'advanced_analytics'
  })
  ```
  {{/partial:card}}
  {{partial:card style="plain" label="Alternative"}}
  ```python
  amplitude.track('Feature Used', {
      'feature_name': 'advanced_analytics',
      'company_id': 'acme_corp'
  })
  ```
  {{/partial:card}}
{{/partial:card-grid}}

## Procedure component

The procedure component displays step-by-step instructions with numbered circles. Perfect for walkthroughs and tutorials.

{{partial:procedure title="Configure API authentication"}}

1. Navigate to *Settings > API Keys*.
2. Select **Create New Key**.
3. Enter a descriptive name for your API key (for example, "Production App" or "Development Environment").
4. Copy the generated key and store it securely.
5. Add the key to your application's environment variables:
   ```bash
   export AMPLITUDE_API_KEY="your_api_key_here"
   ```
6. Test the connection by sending a test event.

{{/partial:procedure}}

### Procedure with code blocks

{{partial:procedure title="Initialize the SDK"}}

1. Install the Amplitude SDK:
   ```bash
   npm install @amplitude/analytics-browser
   ```
2. Import the SDK in your application:
   ```javascript
   import * as amplitude from '@amplitude/analytics-browser';
   ```
3. Initialize with your API key:
   ```javascript
   amplitude.init('YOUR_API_KEY', {
     defaultTracking: true
   });
   ```
4. Verify initialization by checking the browser console for confirmation messages.

{{/partial:procedure}}

### Nested lists in procedures

{{partial:procedure title="Set up user properties"}}

1. Define your user properties schema:
   - User ID (required)
   - Email address
   - Account tier (Free, Pro, Enterprise)
   - Registration date
2. Set properties when users sign up:
   ```javascript
   amplitude.setUserId(userId);
   const identify = new amplitude.Identify();
   identify.set('email', userEmail);
   identify.set('account_tier', 'Pro');
   amplitude.identify(identify);
   ```
3. Update properties when they change (for example, during upgrades).
4. Verify properties appear in the Amplitude dashboard under *User Lookup*.

{{/partial:procedure}}

## Two-column lists

Two-column lists automatically distribute list items across two columns on wider screens. On mobile devices, they display as a single column.

### Auto-wrapping two-column list

{{partial:two-column-list}}
- Real-time event tracking
- User identification
- Session management
- Revenue tracking
- User properties
- Group analytics
- A/B testing support
- Custom event properties
- Offline event queueing
- GDPR compliance tools
- Cross-platform tracking
- Data enrichment
{{/partial:two-column-list}}

### Manual column control

For precise control over which items appear in each column, use `---SPLIT---` as a separator:

{{partial:two-column-list-grid}}

**Analytics features:**

- Event tracking
- User properties
- Revenue analytics
- Funnel analysis
- Retention tracking
- Cohort analysis

---SPLIT---

**Developer features:**

- TypeScript support
- Multiple SDKs
- Batch event sending
- Plugin system
- Error handling
- Debug mode

{{/partial:two-column-list-grid}}

## Tabs

Tabs organize related content into selectable panels. Perfect for showing platform-specific instructions.

{{partial:tabs tabs="JavaScript, TypeScript, Python"}}
{{partial:tab name="JavaScript"}}
```javascript
const amplitude = require('@amplitude/analytics-node');

amplitude.init('API_KEY');
amplitude.track({
  event_type: 'Button Clicked',
  user_id: 'user_123',
  event_properties: {
    button_name: 'Sign Up'
  }
});
```
{{/partial:tab}}
{{partial:tab name="TypeScript"}}
```typescript
import * as amplitude from '@amplitude/analytics-node';

amplitude.init('API_KEY');
amplitude.track({
  event_type: 'Button Clicked',
  user_id: 'user_123',
  event_properties: {
    button_name: 'Sign Up'
  }
});
```
{{/partial:tab}}
{{partial:tab name="Python"}}
```python
from amplitude import Amplitude

client = Amplitude('API_KEY')
client.track({
    'event_type': 'Button Clicked',
    'user_id': 'user_123',
    'event_properties': {
        'button_name': 'Sign Up'
    }
})
```
{{/partial:tab}}
{{/partial:tabs}}

## Collapse

Collapsible sections hide detailed content until users need it. Great for optional information or lengthy reference material.

{{partial:collapse name="Advanced configuration options"}}

Configure advanced SDK options to customize behavior:

```javascript
amplitude.init('API_KEY', {
  // Network options
  serverZone: 'US',
  serverUrl: 'https://api.amplitude.com',
  useBatch: true,
  
  // Event options
  minIdLength: 5,
  partnerId: 'partner_123',
  
  // Tracking options
  defaultTracking: {
    sessions: true,
    pageViews: true,
    formInteractions: true,
    fileDownloads: true
  },
  
  // Privacy options
  optOut: false,
  trackingOptions: {
    ipAddress: true,
    language: true,
    platform: true
  }
});
```

See the [Browser SDK configuration](/docs/sdks/analytics/browser/browser-sdk-2#configuration) for complete details.

{{/partial:collapse}}

## Combining components

You can combine multiple components for rich, structured documentation.

{{partial:admonition type="tip" heading="Best practices for event tracking"}}

Follow these guidelines when implementing event tracking:

{{partial:procedure title="Event tracking workflow"}}

1. Define your tracking plan with clear event names.
2. Implement events using the recommended patterns:
   {{partial:card-grid}}
     {{partial:card style="tip" label="good"}}
     ```javascript
     amplitude.track('Checkout Started', {
       cart_total: 99.99,
       item_count: 3
     });
     ```
     {{/partial:card}}
     {{partial:card style="warning" label="bad"}}
     ```javascript
     amplitude.track('event_1', {
       val: 99.99
     });
     ```
     {{/partial:card}}
   {{/partial:card-grid}}
3. Test your implementation in development.
4. Deploy to production and monitor in the Amplitude dashboard.

{{/partial:procedure}}
{{/partial:admonition}}

## Component syntax reference

### Quick reference table

| Component | Partial Name | Key Parameters |
|-----------|--------------|----------------|
| Admonition | `partial:admonition` | `type`, `heading` |
| Card Grid | `partial:card-grid` | (container only) |
| Card | `partial:card` | `style`, `label`, `caption` |
| Procedure | `partial:procedure` | `title` |
| Two-Column List | `partial:two-column-list` | (none) |
| Two-Column Grid | `partial:two-column-list-grid` | (use ---SPLIT--- separator) |
| Tabs | `partial:tabs` | `tabs` (comma-separated) |
| Tab | `partial:tab` | `name` |
| Collapse | `partial:collapse` | `name` |

### Admonition types

- `note` - Blue, for supplementary information
- `tip` - Green (mint), for best practices
- `warning` - Orange, for cautions and important notes
- `example` - Pink, for examples and use cases
- `info` - Teal, for general information
- `beta` - Purple, for beta features
- `alpha` - Purple, for alpha features
- `deprecated` - Red, for deprecated features

### Card styles

- `plain` - Gray border, white background
- `tip` - Green border, mint background
- `warning` - Orange border, light orange background

### Card labels

- `good` - Green checkmark icon
- `bad` - Red X icon
- Custom text - No icon, just text
