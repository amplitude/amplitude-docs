---
id: a8f9c2d1-5b3e-4a7c-9d2f-1e6b8c4a5d7f
blueprint: experiment
title: 'JSON payloads'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1732059600
---

JSON payloads let you attach dynamic configuration data to experiment variants. This enables you to remotely change your application's behavior or appearance without redeploying code.

With strongly typed payloads, you can define a schema for those payloads so Amplitude can validate them before they reach your application.

## How JSON payloads work

When you create a variant, you can optionally attach a JSON payload containing any variables you want to pass to your application.

When your application evaluates an experiment:

- The Experiment SDK fetches the variant for the user.
- The SDK returns the assigned variant along with its payload.
- Your application reads the payload and uses it to configure the experience dynamically.

This works for both simple flags and more complex experiments where the payload defines layouts, feature options, copy, or configuration values.

### Workflow overview

A typical workflow looks like this:

1. **Create a variant with a payload**: Add a JSON object to a variant that defines the configuration for that experience.
2. **Activate the flag or experiment**: Deploy the configuration to your users.
3. **Evaluate in your application**: Use an Experiment SDK (web, mobile, and backend) to fetch the variant for each user.
4. **Use the payload**: Read `variant.payload` and apply the configuration to your UI or business logic.

## Create variants with payloads

You can add JSON payloads to variants through the Amplitude UI or programmatically through the Management API.

### Through the UI

To add a payload when creating or editing a variant:

1. Navigate to *Experiment > Feature Flags* or *Experiments*.
2. Select the flag or experiment you want to configure.
3. In the Variants section, create or edit a variant.
4. Enter the variant name, value, and description.
5. In the **Payload** field, add your JSON configuration.
6. Select **Apply**, then save your changes.

{{partial:admonition type="example" heading="Example payload – config for a blog layout"}}

```json
{
  "layout": "cards",
  "titlePosition": "above",
  "gradient": false,
  "showDescription": true,
  "cardCount": 3
}
```

{{/partial:admonition}}

For more details on creating variants in the UI, go to [Create variations](/docs/feature-experiment/experiment-quick-start#creating-variations).

### Through the Management API

You can also create variants with payloads using the Experiment Management API. Include the `payload` field in your request body.

{{partial:admonition type="example" heading="Example: create a flag variant with payload (simplified)"}}

```bash
curl --request POST \
  --url 'https://experiment.amplitude.com/api/1/flags/{id}/variants' \
  --header 'Authorization: Bearer <management-api-key>' \
  --header 'Content-Type: application/json' \
  --data '{
    "key": "cards-layout",
    "name": "Cards Layout",
    "description": "Blog posts displayed in card format",
    "payload": {
      "layout": "cards",
      "titlePosition": "above",
      "gradient": false,
      "showDescription": true,
      "cardCount": 3
    },
    "rolloutWeight": 1
  }'
```

{{/partial:admonition}}

Refer to the full API docs for:

- [Create variant for flags](/docs/apis/experiment/experiment-management-api-flags#create-variant)
- [Create variant for experiments](/docs/apis/experiment/experiment-management-api-experiments#create-variant)

## Access payloads in your application

After you create variants with payloads, your application needs to:

1. Initialize the Experiment SDK.
2. Fetch the variant(s) for the user.
3. Access `variant.payload`.
4. Apply the configuration (with sensible defaults).

The exact syntax varies by SDK, but the pattern is consistent.

### JavaScript / TypeScript (browser)

```javascript
import { Experiment } from '@amplitude/experiment-js-client';

// Initialize the Experiment client
const experiment = Experiment.initialize('<DEPLOYMENT_KEY>', {
  // Optional configuration
});

// Fetch variants for the current user
await experiment.fetch({
  user_id: 'user123',
  device_id: 'device456',
});

// Get the variant for a specific flag
const variant = experiment.variant('blog-layout-flag');

// Access the payload with defaults
if (variant && variant.payload) {
  const layout = variant.payload.layout || 'list';
  const titlePosition = variant.payload.titlePosition || 'below';
  const showDescription = variant.payload.showDescription !== false;
  const cardCount = variant.payload.cardCount || 5;

  configureBlogLayout({
    layout,
    titlePosition,
    showDescription,
    cardCount,
  });
}
```

### React example

```javascript
import { useEffect, useState } from 'react';
import { Experiment } from '@amplitude/experiment-js-client';

function BlogComponent() {
  const [layoutConfig, setLayoutConfig] = useState({
    layout: 'list',        // defaults
    titlePosition: 'below',
    showDescription: true,
    cardCount: 5,
  });

  useEffect(() => {
    async function fetchExperiment() {
      const experiment = Experiment.initialize('<DEPLOYMENT_KEY>');
      await experiment.fetch({ user_id: 'user123' });

      const variant = experiment.variant('blog-layout-flag');
      if (variant && variant.payload) {
        setLayoutConfig({
          layout: variant.payload.layout || 'list',
          titlePosition: variant.payload.titlePosition || 'below',
          showDescription: variant.payload.showDescription !== false,
          cardCount: variant.payload.cardCount || 5,
        });
      }
    }

    fetchExperiment();
  }, []);

  return (
    <BlogLayout
      layout={layoutConfig.layout}
      titlePosition={layoutConfig.titlePosition}
      showDescription={layoutConfig.showDescription}
      cardCount={layoutConfig.cardCount}
    />
  );
}
```

### Server-side example (Node.js)

```javascript
import { Experiment } from '@amplitude/experiment-node-server';

const experiment = Experiment.initialize('<DEPLOYMENT_KEY>');

async function getExperimentConfig(userId: string) {
  const user = { user_id: userId };
  const variants = await experiment.fetch(user);
  const variant = variants['blog-layout-flag'];

  if (variant && variant.payload) {
    return {
      layout: variant.payload.layout || 'list',
      titlePosition: variant.payload.titlePosition || 'below',
      showDescription: variant.payload.showDescription !== false,
      cardCount: variant.payload.cardCount || 5,
    };
  }

  // Fallback config
  return {
    layout: 'list',
    titlePosition: 'below',
    showDescription: true,
    cardCount: 5,
  };
}

// Example usage in a route
app.get('/api/blog-config', async (req, res) => {
  const config = await getExperimentConfig(req.user.id);
  res.json(config);
});
```

## Strongly typed JSON payloads (advanced)

JSON payloads are flexible by default: you can attach any valid JSON to a variant and read it from `variant.payload`. For more control, you can define the **expected type** for variant payloads so Amplitude validates each payload before it reaches your application.

Strongly typed payloads help you:

- Set the expected type once per flag or experiment.
- Have Amplitude validate each variant payload against that type.
- Catch configuration issues (wrong types, missing required fields) before they reach production.

{{partial:admonition type="note" heading="JSON payload model"}}
Strongly typed payloads build on the same JSON payload model and SDKs described above. How you access `variant.payload` in code doesn't change; you just gain stronger guarantees about what that payload looks like.
{{/partial:admonition}}

### Strongly typed payloads use cases

Strong typing is especially useful when:

- Multiple teams depend on the same configuration (such as product, engineering, and solutions).
- Payloads are complex (nested objects, arrays, and multiple keys).
- You use flags as remote config or as layers that many experiments share.
- You want to reduce runtime errors and make configuration safer.

### Define the expected type for variant payloads

In the UI, by clicking "Set payload type", you choose a **payload type** for the flag or experiment. The type applies to all variants.

**Payload type options:**

- **None** — No type enforcement; payloads can be any valid JSON.
- **String** — `variant.payload` is a string.
- **Number** — `variant.payload` is a number.
- **Object** — `variant.payload` is an object (no fixed keys or types).
- **Array** — `variant.payload` is an array.
- **Custom Schema** — You define an object shape with specific keys and types. You choose the type of each field (string, number, boolean, array, etc.) and can mark any of the fields as required. Amplitude represents this as a JSON schema and validates every variant payload against it.

If a variant payload doesn't match the selected type:

- The UI shows an error on that variant.
- You can't save the change until the payload is valid.
- This prevents deploying broken configuration.

This complements validation in your application code instead of replacing it:

- Amplitude enforces the payload type when you edit payloads.
- Your application can still validate or narrow types at runtime if needed.

### Example: Custom Schema

Suppose you want a payload like this, with `headerText` required:

```json
{
  "buttonColor": "#4A90D9",
  "headerText": "Welcome back!",
  "maxRetries": 3,
  "features": ["dark_mode", "analytics"],
  "showBanner": true
}
```

When you choose **Custom Schema** and define these keys and types, Amplitude uses a JSON schema equivalent to:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "buttonColor": {
      "type": "string"
    },
    "headerText": {
      "type": "string"
    },
    "maxRetries": {
      "type": "integer"
    },
    "features": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "showBanner": {
      "type": "boolean"
    }
  },
  "required": [
    "features",
    "buttonColor",
    "headerText",
    "maxRetries",
    "showBanner"
  ]
}
```

You can mark any of the fields as required in the Custom Schema. Payloads that omit a required field or use the wrong type for a key fail validation and block saving until they're fixed.

### Using strongly typed payloads in your code

Even with strong typing enabled, the SDK interaction stays the same: you still read payloads from `variant.payload` and apply your own types in code.

In TypeScript, you can define a matching type:

```typescript
type BlogLayoutPayload = {
  layout: 'list' | 'cards' | 'grid';
  titlePosition: 'above' | 'below';
  gradient?: boolean;
  showDescription: boolean;
  cardCount: number;
};
```

Then cast and use:

```typescript
const variant = experiment.variant('blog-layout-flag');

if (variant && variant.payload) {
  const payload = variant.payload as BlogLayoutPayload;

  configureBlogLayout({
    layout: payload.layout,
    titlePosition: payload.titlePosition,
    showDescription: payload.showDescription,
    cardCount: payload.cardCount,
  });
}
```

The JSON schema in Amplitude ensures payloads conform to this contract when you create or edit them, and your application enforces the same contract through types or runtime checks.

## Best practices

Follow these best practices to keep your payloads robust and maintainable.

### 1. Always provide default values

Always provide sensible defaults when accessing payload properties. This ensures your application behaves correctly if:

- The user doesn't receive a variant.
- The payload is missing expected properties.
- You turn off the experiment.

Examples:

```javascript
const layout = variant?.payload?.layout || 'list';
const cardCount = variant?.payload?.cardCount || 5;
const showDescription = variant?.payload?.showDescription !== false;
```

### 2. Validate payload structure

Even with strongly typed payloads, you should validate payloads in your application:

```javascript
function validateLayoutPayload(payload: any): boolean {
  const validLayouts = ['list', 'cards', 'grid'];

  if (!validLayouts.includes(payload.layout)) {
    console.error('Invalid layout in payload:', payload.layout);
    return false;
  }

  if (typeof payload.cardCount !== 'number' || payload.cardCount < 1) {
    console.error('Invalid cardCount in payload:', payload.cardCount);
    return false;
  }

  return true;
}

const variant = experiment.variant('blog-layout-flag');
if (variant?.payload && validateLayoutPayload(variant.payload)) {
  applyLayoutConfig(variant.payload);
}
```

When using a JSON schema in Amplitude, try to keep your application-side validation aligned with that schema.

### 3. Keep payloads simple

Keep payload structures focused on configuration:

- Avoid very large payloads (aim for < 10 KB).
- Avoid deeply nested or highly coupled structures.
- Avoid sensitive data (payloads are visible in network traffic and logs).

### 4. Document your payload schema

Document the expected structure of your payloads, especially when multiple teams touch the same flag or experiment.

Example JSDoc-style documentation:

```javascript
/**
 * Blog Layout Flag Payload Schema
 * @typedef {Object} BlogLayoutPayload
 * @property {('list'|'cards'|'grid')} layout         - The layout style
 * @property {('above'|'below')}       titlePosition  - Title position relative to content
 * @property {boolean}                 gradient       - Whether to show gradient backgrounds
 * @property {boolean}                 showDescription- Whether to show post descriptions
 * @property {number}                  cardCount      - Number of cards to display (1-10)
 */
```

If you're using strongly typed payloads in Amplitude, keep your JSON schema and your code documentation or types in sync so everyone shares the same contract.

## Common use cases

JSON payloads (with or without strong typing) support a wide range of use cases.

### Remote configuration

Use payloads to remotely configure features without deploying code:

```json
{
  "apiEndpoint": "https://api.v2.example.com",
  "timeout": 5000,
  "retries": 3,
  "enableCache": true
}
```

### UI customization

Configure UI elements like colors, layouts, and text:

```json
{
  "primaryColor": "#007AFF",
  "buttonText": "Get Started",
  "showBanner": true,
  "bannerMessage": "Limited time offer!"
}
```

### Feature rollout levels

Gradually expose functionality through configuration flags:

```json
{
  "enableAdvancedSearch": true,
  "enableFilters": true,
  "maxResults": 50,
  "showRecommendations": true
}
```

### Content variations

Test different content approaches:

```json
{
  "headline": "Transform Your Workflow",
  "subheadline": "Get started in minutes, not hours",
  "ctaText": "Start Free Trial",
  "showTestimonials": true
}
```

## Payload availability

When you access a variant from the SDK or Evaluation API, you can use the `value` and `payload` properties:

- `value`: the variant's value (for example, "on" or "off" or "control" or "treatment").
- `payload`: the attached JSON configuration.

The Management API or Amplitude UI provides other variant properties like `name` and `description`.

For more information about the variant data model, go to [Variants](/docs/feature-experiment/data-model#variants).