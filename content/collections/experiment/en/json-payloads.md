---
id: a8f9c2d1-5b3e-4a7c-9d2f-1e6b8c4a5d7f
blueprint: experiment
title: 'JSON payloads'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1732059600
---
JSON payloads let you attach dynamic configuration data to experiment variants. This enables you to remotely change your application's behavior or appearance without redeploying code. Instead of hard-coding different experiences for each variant, you can define the differences in a JSON payload and let your application adapt based on the payload it receives.

## How JSON payloads work

When you create a variant, you can optionally attach a JSON payload containing any variables you want to pass to your application. When your application evaluates an experiment, the SDK returns the assigned variant along with its payload. Your application then uses this payload to configure the experience dynamically.

### Workflow overview

1. **Create a variant with a payload**: Add a JSON object to a variant that defines the experience configuration.
2. **Activate the experiment**: Deploy the experiment to your users.
3. **Evaluate in your application**: The SDK fetches the variant and payload for each user.
4. **Use the payload**: Your application reads the payload and applies the configuration.

## Create variants with payloads

You can add JSON payloads to variants through the Amplitude UI or programmatically through the Management API.

### Through the UI

To add a payload when creating a variant:

1. Navigate to *Experiment > Feature Flags* or *Experiments* and select your flag or experiment.
2. In the Variants section, click the **Plus** icon to create a variant.
3. Enter the variant name, value, and description.
4. In the **Payload** field, add your JSON configuration.
5. Click **Apply**.

{{partial:admonition type="example" heading="Example payload"}}

This payload configures a blog layout feature:

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

For more details about creating variants in the UI, go to [Create variations](/docs/feature-experiment/experiment-quick-start#creating-variations).

### Through the Management API

You can create variants with payloads using the Experiment Management API. Include the `payload` field in your request body when creating a variant.

{{partial:admonition type="example" heading="API request example"}}

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

For complete API documentation, go to:
- [Create variant for flags](/docs/apis/experiment/experiment-management-api-flags#create-variant).
- [Create variant for experiments](/docs/apis/experiment/experiment-management-api-experiments#create-variant).

## Access payloads in your application

After you create variants with payloads, your application needs to evaluate the experiment and access the payload. The implementation varies by SDK, but the general pattern is the same:

1. Initialize the Experiment SDK.
2. Fetch the variant for a user.
3. Access the payload from the variant object.
4. Use the payload to configure your application.

### JavaScript/TypeScript example

```javascript
import { Experiment } from '@amplitude/experiment-js-client';

// Initialize the Experiment client
const experiment = Experiment.initialize('<DEPLOYMENT_KEY>', {
  // Optional configuration
});

// Fetch variants for the current user
await experiment.fetch({
  user_id: 'user123',
  device_id: 'device456'
});

// Get the variant for a specific flag
const variant = experiment.variant('blog-layout-flag');

// Access the payload
if (variant && variant.payload) {
  const layout = variant.payload.layout || 'list';
  const titlePosition = variant.payload.titlePosition || 'below';
  const showDescription = variant.payload.showDescription !== false;
  const cardCount = variant.payload.cardCount || 5;
  
  // Use the payload to configure your UI
  configureBlogLayout({
    layout,
    titlePosition,
    showDescription,
    cardCount
  });
}
```

### React example

```javascript
import { useEffect, useState } from 'react';
import { Experiment } from '@amplitude/experiment-js-client';

function BlogComponent() {
  const [layoutConfig, setLayoutConfig] = useState({
    layout: 'list', // Default values
    titlePosition: 'below',
    showDescription: true,
    cardCount: 5
  });

  useEffect(() => {
    async function fetchExperiment() {
      const experiment = Experiment.initialize('<DEPLOYMENT_KEY>');
      
      await experiment.fetch({
        user_id: 'user123'
      });
      
      const variant = experiment.variant('blog-layout-flag');
      
      if (variant && variant.payload) {
        setLayoutConfig({
          layout: variant.payload.layout || 'list',
          titlePosition: variant.payload.titlePosition || 'below',
          showDescription: variant.payload.showDescription !== false,
          cardCount: variant.payload.cardCount || 5
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

async function getExperimentConfig(userId) {
  // Fetch variants for the user
  const user = {
    user_id: userId
  };
  
  const variants = await experiment.fetch(user);
  const variant = variants['blog-layout-flag'];
  
  // Return the payload or defaults
  if (variant && variant.payload) {
    return {
      layout: variant.payload.layout || 'list',
      titlePosition: variant.payload.titlePosition || 'below',
      showDescription: variant.payload.showDescription !== false,
      cardCount: variant.payload.cardCount || 5
    };
  }
  
  // Return default configuration if no variant
  return {
    layout: 'list',
    titlePosition: 'below',
    showDescription: true,
    cardCount: 5
  };
}

// Use in your server route
app.get('/api/blog-config', async (req, res) => {
  const config = await getExperimentConfig(req.user.id);
  res.json(config);
});
```

## Best practices

Follow these best practices to ensure your payload implementation is robust and maintainable.

### Provide default values

Always provide default values when accessing payload properties. This ensures your application works correctly if:
- The user doesn't receive a variant.
- The payload is missing expected properties.
- The experiment is turned off.

```javascript
const layout = variant?.payload?.layout || 'list';
```

### Validate payload structure

Consider validating the payload structure to catch configuration errors early:

```javascript
function validateLayoutPayload(payload) {
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

### Keep payloads simple

Keep payload structures simple and focused on configuration. Avoid:
- Large payloads (keep under 10KB).
- Complex nested structures.
- Sensitive data (payloads are visible in network traffic).

### Document your payload schema

Document the expected structure of your payloads, especially when multiple teams work on the same experiments:

```javascript
/**
 * Blog Layout Flag Payload Schema
 * @typedef {Object} BlogLayoutPayload
 * @property {('list'|'cards'|'grid')} layout - The layout style
 * @property {('above'|'below')} titlePosition - Title position relative to content
 * @property {boolean} gradient - Whether to show gradient backgrounds
 * @property {boolean} showDescription - Whether to show post descriptions
 * @property {number} cardCount - Number of cards to display (1-10)
 */
```

## Common use cases

JSON payloads support a wide range of use cases. Here are some of the most common patterns.

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

### Feature rollout

Gradually enable features with increasing levels of functionality:

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

When you access a variant from the SDK or Evaluation API, you can use only the `value` and `payload` properties. To access other variant properties like `name` and `description`, use the Management API or the Amplitude UI.

For more information about the variant data model, go to [Variants](/docs/feature-experiment/data-model#variants).



