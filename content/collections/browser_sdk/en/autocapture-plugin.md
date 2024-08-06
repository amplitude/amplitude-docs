---
id: f0bf544a-7505-45ef-89ad-e7fe6ec71fbf
blueprint: browser_sdk
title: 'Autocapture Plugin'
sdk_status: Beta
article_type: plugin
source: https://www.docs.developers.amplitude.com/data/sdks/browser-2/autocapture/
supported_languages:
  - js
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718657468
---

{{partial:admonition type="warning" heading="Autocapture plugin is deprecated"}}
As of August 8, 2024, Amplitude's Autocapture plugin for the Browser SDK is deprecated.

If you used the Autocapture plugin prior to August 8, Amplitude recommends that you remove the plugin from your instrumentation, and update Browser SDK to version 2.10.0 or above. Version 2.10.0 ships with Autocapture included.
{{/partial:admonition}}

## Update to the built-in Autocapture

If you used the Autocapture plugin, and updated the Browser SDK to version 2.10.0 or newer, complete the following steps to remove the plugin, and used the Autocapture that ships with Browser SDK.

### Script loader

Replace your referenced script with the following snippet:

{{partial:partials/code/snippet autocapture="true"}}

### Npm or yarn

If you use npm or yarn to add the Browser SDK, update the Browser SDK package, and remove the Autocapture plugin.

```js
// package.json
{
  "dependencies": {
    "@amplitude/analytics-browser": "^2.10.0", // make sure the minimum version is 2.10.0
    "@amplitude/plugin-autocapture-browser": "0.9.0", //[tl! --]
  }
}
```

In your script, remove references to the Autocapture plugin.

```js
import * as amplitude from '@amplitude/analytics-browser';
import { autocapturePlugin } from '@amplitude/plugin-autocapture-browser'; //[tl! --]
 
amplitude.init(AMPLITUDE_API_KEY); //[tl! --]
amplitude.init(AMPLITUDE_API_KEY, { //[tl! ++: 4]
  autocapture: {
    elementInteractions: true,
  },
});
amplitude.add(autocapturePlugin()); //[tl! --]
```

---

Amplitude's Autocapture plugin extends the events and properties that Amplitude tracks by default, and enables Visual Labeling to enable you to define events based on elements on your site. For more information about Visual Labeling, see [Visual Labeling](/docs/data/visual-labeling).

## Installation

Autocapture requires the latest versions of the Amplitude Browser SDK ({{sdk_versions:browser}}) and the Autocapture plugin ({{sdk_versions:visual_labeling_plugin}})

{{partial:tabs tabs="Script Loader, npm, yarn"}}
{{partial:tab name="Script Loader"}}
```html
<script defer src="https://cdn.amplitude.com/libs/analytics-browser-{{sdk_versions:browser}}-min.js.gz"></script>
<script defer src="https://cdn.amplitude.com/libs/plugin-autocapture-browser-{{sdk_versions:visual_labeling_plugin}}-min.js.gz"></script>
```
{{/partial:tab}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/analytics-browser
npm install @amplitude/plugin-autocapture-browser@beta
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/analytics-browser
yarn add @amplitude/plugin-autocapture-browser@beta
```
{{/partial:tab}}
{{/partial:tabs}}

## Initialize the plugin

The Amplitude Browser SDK supports a [plugin architecture](/docs/sdks/sdk-plugins) that enables features like Autocapture. To enable the plugin, update your code with one of the following snippets, depending on your implementation. Both methods require that you define the Autocapture plugin, then call `add()` to enable it.

{{partial:tabs tabs="Script loader, npm / yarn"}}
{{partial:tab name="Script loader"}}
```html
<script type="module">
  window.amplitude.init(AMPLITUDE_API_KEY)
  const autocapturePlugin = window.amplitudeAutocapturePlugin.plugin();
  window.amplitude.add(autocapturePlugin);
</script>
```
{{/partial:tab}}
{{partial:tab name="npm / yarn"}}
```js
import * as amplitude from '@amplitude/analytics-browser';
import { autocapturePlugin } from '@amplitude/plugin-autocapture-browser';

amplitude.init(AMPLITUDE_API_KEY);
amplitude.add(autocapturePlugin());
```
{{/partial:tab}}
{{/partial:tabs}}

## Configuration

The Autocapture plugin adds four settings that help you configure what the plugin tracks.

| <div class="big-column">Setting</div>                   | Default                                                                                              | Description                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `cssSelectorAllowlist`     | `['a','button','input','select','textarea','label','[data-amp-default-track]','.amp-default-track']` | String[]. Accepts one or more CSS selectors that define which elements on the page to track.         |
| `pageUrlAllowlist`         | undefined                                                                                            | `(string\|RegExp)[]`. Defines the URL, URLs, or URL pattern on which Amplitude tracks default events |
| `shouldTrackEventResolver` | undefined                                                                                            | Function. Programatically determines if Amplitude should or shouldn't track an event.              |
| `dataAttributePrefix`      | `data-amp-track`                                                                                     | Allows the plugin to capture data attributes as an event property                                  |

```js
const plugin = autocapturePlugin({
  cssSelectorAllowlist: [
    '.amp-tracking',
    '[amp-tracking]'
  ],
  pageUrlAllowlist: [
    'https://amplitude.com',
    new RegExp('https://amplitude.com/blog/*')
  ],
});
```

By default, if you don't use these settings, Amplitude tracks the default selectors on all page on which you enable the plugin.

{{partial:admonition type="note" heading=""}}
When specify the CSS selectors to track, your selection overrides the default. To retain the default selectors import the `DEFAULT_CSS_SELECTOR_ALLOWLIST` and include it in your code.

```js
import { DEFAULT_CSS_SELECTOR_ALLOWLIST } from '@amplitude/plugin-autocapture-browser';

const selectors = [
  ...DEFAULT_CSS_SELECTOR_ALLOWLIST,
  '.class-of-a-thing-i-want-to-track',
];
```
{{/partial:admonition}}

## New events

When you enable the Autocapture plugin, Amplitude sends two events, from which you can create Labeled Events with Visual Labeling:

- `[Amplitude] Element Clicked`
- `[Amplitude] Element Changed`

These two events capture properties that describe the corresponding element and other context about the user's browser:

<!-- vale off-->
- `[Amplitude] Element ID`
- `[Amplitude] Element Class`
- `[Amplitude] Element Tag`
- `[Amplitude] Element Text` (Collected for `[Amplitude] Element Clicked`, only) 
- `[Amplitude] Element Href` (Collected for `[Amplitude] Element Clicked`, only)
- `[Amplitude] Element Position Left`
- `[Amplitude] Element Position Top`
- `[Amplitude] Viewport Height`
- `[Amplitude] Viewport Width`
- `[Amplitude] Page URL`
- `[Amplitude] Page Title`
- `[Amplitude] Element Selector`
- `[Amplitude] Element Attributes`
- `[Amplitude] Element Aria Label`
- `[Amplitude] Element Parent Label`
<!-- vale on-->

## Disable Autocapture

To disable Autocapture, remove the plugin from any pages that implement it, and set `defaultTracking: false` in the Amplitude initialization on that page.

{{partial:tabs tabs="Script loader, npm / yarn"}}
{{partial:tab name="Script loader"}}
Remove the following lines of code:

```html
<!-- load Amplitude Autocapture plugin -->
<script defer src="https://cdn.amplitude.com/libs/plugin-autocapture-browser-{{sdk_versions:visual_labeling_plugin}}-min.js.gz"></script>
<!-- initialize Amplitude SDK and Autocapture plugin -->
<script type="module">
  const autocapturePlugin = window.amplitudeAutocapturePlugin.plugin();
  window.amplitude.add(autocapturePlugin);
</script>
```
{{/partial:tab}}
{{partial:tab name="npm / yarn"}}
Remove the plugin:

```bash
// npm
npm uninstall @amplitude/plugin-autocapture-browser

// yarn
yarn remove @amplitude/plugin-autocapture-browser
```

Remove the initialization code:

```javascript
// Remove the following lines of code
import { autocapturePlugin } from '@amplitude/plugin-autocapture-browser';

amplitude.add(autocapturePlugin());
```
{{/partial:tab}}
{{/partial:tabs}}
