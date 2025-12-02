---
id: 8f2e4c1a-9b3d-4e5f-a7c8-1d2e3f4g5h6i
blueprint: browser_sdk
title: 'Page URL Enrichment Plugin'
sdk_status: Current
article_type: plugin
source: https://www.docs.developers.amplitude.com/data/sdks/browser-2/page-url-enrichment/
supported_languages:
  - js
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1722787200
package_name: '@amplitude/plugin-page-url-enrichment-browser'
full_details: true
public: true
description: 'Use the Page URL Enrichment plugin to automatically add page URL-related properties to all events tracked by the Browser SDK.'
---
The Page URL Enrichment plugin automatically adds page URL-related properties to all events tracked by the Browser SDK. This plugin enhances your event data with contextual information about the current page and previous page navigation. This lets you better understand user journeys and page transitions.

{{partial:admonition type="note" title="Enabled by default"}}
Starting with Browser SDK version 2.x, this plugin is enabled by default with autocapture. Only install it manually if you want custom configuration or have disabled autocapture entirely.
{{/partial:admonition}}

When using the plugin, remember:

- The plugin automatically starts tracking page changes when enabled.
- Session storage maintains state, so previous page information persists across page refreshes within the same session.
- The plugin works with both traditional multi-page applications and single-page applications.
- If session storage isn't available, the plugin still functions but previous page tracking may have limitations.

## Installation

This package is available on the npm registry for installation using `npm` and `yarn`.

```bash
# npm
npm install @amplitude/plugin-page-url-enrichment-browser

# yarn
yarn add @amplitude/plugin-page-url-enrichment-browser
```

## Usage

{{partial:admonition type="info" title="Enabled by default with autocapture"}}
This plugin is automatically enabled when you use autocapture with Browser SDK version 2.x. The manual installation steps below are only needed if you want custom configuration or have disabled autocapture entirely.
{{/partial:admonition}}

This plugin works on top of Amplitude Browser SDK and adds page URL enrichment properties to all events. To use this plugin, you must be using `@amplitude/analytics-browser` version `v2.0.0` or later.

### Disable page URL enrichment

If you want to disable the automatic page URL enrichment, set `autocapture.pageUrlEnrichment` to `false`:

```typescript
import * as amplitude from '@amplitude/analytics-browser';

amplitude.init('AMPLITUDE_API_KEY', {
  autocapture: {
    pageUrlEnrichment: false,
  },
});
```

### Manual plugin installation

If you need custom configuration or have disabled autocapture entirely, you can install the plugin manually:

### 1. Import Amplitude packages

```typescript
import * as amplitude from '@amplitude/analytics-browser';
import { pageUrlEnrichmentPlugin } from '@amplitude/plugin-page-url-enrichment-browser';
```

### 2. Instantiate page URL enrichment plugin

The plugin accepts an optional parameter of type `Object` to configure the plugin.

```typescript
const pageUrlEnrichment = pageUrlEnrichmentPlugin();
```

### 3. Install plugin to Amplitude SDK

```typescript
amplitude.add(pageUrlEnrichment);
```

### 4. Initialize Amplitude SDK

```typescript
amplitude.init('API_KEY');
```

## Event properties

This plugin adds the following properties to all events:

| Property | Description |
| --- | --- |
| `[Amplitude] Page Domain` | The website's hostname (`location.hostname`) |
| `[Amplitude] Page Location` | The website's full URL (`location.href`) |
| `[Amplitude] Page Path` | The website's pathname (`location.pathname`) |
| `[Amplitude] Page Title` |  The website's title (`document.title`). Can be masked by adding the `data-amp-mask` attribute to the `<title>` element.  
| `[Amplitude] Page URL` | The website's URL excluding query parameters. |
| `[Amplitude] Previous Page Location` | The URL of the previous page the user visited. |
| `[Amplitude] Previous Page Type` | A classification of the previous page type. |

### Previous page type classification

The `[Amplitude] Previous Page Type` property classifies the previous page based on the following logic:

- **`direct`**: No previous page or referrer (user came directly to the site).
- **`internal`**: Previous page was from the same domain (same hostname).
- **`external`**: Previous page was from a different domain.

## How it works

The Page URL Enrichment plugin:

1. **Tracks page changes**: Monitors navigation events such as `pushState`, `replaceState`, and `popstate` events to detect page changes in single-page applications.
2. **Stores navigation history**: Uses session storage to maintain the current and previous page URLs across page navigation.
3. **Enriches all events**: Automatically adds page URL properties to every event tracked by the Browser SDK.
4. **Preserves existing properties**: If an event already has any of the page URL properties, the plugin preserves the existing values.

## Page title masking

The Page URL Enrichment plugin supports page title masking through the `data-amp-mask` attribute on your page's `<title>` element. This attribute tells the plugin that you've disguised the page title from users and want to use the masked value in the `[Amplitude] Page Title` property.

For example: 

```html
<head>
  <!-- Masked page title
  This page title is fully masked in the `[Amplitude] Page Title`
  of all events enriched by the Page URL Enrichment plugin on this page

  Page title: "*****"
  -->
  <title data-amp-mask>Private Dashboard For John Doe</title>
</head>
```

The Page URL Enrichment plugin replaces the actual page title with the masked value (`*****`) in all events that this plugin enriches.

## Session storage

The plugin uses session storage to persist navigation information across page changes. The plugin stores data using these keys:

- `AMP_URL_INFO`: Stores the current and previous page URLs.

This ensures that previous page information persists during single-page application navigation or page refreshes within the same session.

## Example

Here's a complete example of how to set up the Page URL Enrichment plugin:

```typescript
import * as amplitude from '@amplitude/analytics-browser';
import { pageUrlEnrichmentPlugin } from '@amplitude/plugin-page-url-enrichment-browser';

// Create the plugin instance
const pageUrlEnrichment = pageUrlEnrichmentPlugin();

// Add the plugin to Amplitude
amplitude.add(pageUrlEnrichment);

// Initialize Amplitude
amplitude.init('AMPLITUDE_API_KEY');

// Track an event - it will automatically include page URL properties
amplitude.track('Button Clicked', {
  button_name: 'Sign Up'
});
```

The tracked event includes properties like:

```json
{
  "event_type": "Button Clicked",
  "event_properties": {
    "button_name": "Sign Up",
    "[Amplitude] Page Domain": "example.com",
    "[Amplitude] Page Location": "https://example.com/signup?utm_source=google",
    "[Amplitude] Page Path": "/signup",
    "[Amplitude] Page Title": "Sign Up - Example",
    "[Amplitude] Page URL": "https://example.com/signup",
    "[Amplitude] Previous Page Location": "https://example.com/home",
    "[Amplitude] Previous Page Type": "internal"
  }
}
```

