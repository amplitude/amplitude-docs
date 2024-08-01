---
id: 062d89f1-1e39-4f90-8490-1ee34c5647f9
blueprint: get-started
title: Autocapture
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1722531117
---
Amplitude's Autocapture helps you gain insights as soon as you install the SDK. This document describes enabling Autocapture.

## Autocapture for the web

When you use them together, Amplitude's latest [Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2) and [Autocapture plugin](/docs/sdks/analytics/browser/autocapture-plugin) captures default events, form field interactions, and marketing attribution information. 

### Install the SDK and plugin
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
npm install @amplitude/plugin-autocapture-browser
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/analytics-browser
yarn add @amplitude/plugin-autocapture-browser
```
{{/partial:tab}}
{{/partial:tabs}}

### Initialize the SDK and plugin

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

### Content security policy (CSP)

If your web app configures the strict Content Security Policy (CSP) for security concerns, adjust the policy to allowlist to Amplitude domains:

* Add `https://*.amplitude.com` to `script-src`
* Add `https://*.amplitude.com` to `connect-src`

### Autocapture for web features

After you install and enable the SDK and plugin, the following features are available.

#### Default events

| Event           | Description                                              | Properties                                                                                                                                                                             |
| --------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page viewed     | Captures when a user loads a page on your site.          | Page counter, Page domain, Page location, Page path, Page title, Page URL, Session Replay ID (if enabled), Referrer, [Attribution](#attribution), [User properties](#user-properties). |
| Start session   | Captures when a user starts a session on your site.      | Session Replay ID (if enabled), [User properties](#user-properties).                                                                                                                   |
| End session     | Captures when a user ends a session on your site.        | [User properties](#user-properties).                                                                                                                                                   |
| Form started    | Captures when a user interacts with a form on your site. | Form destination, Session Replay ID (if enabled), [User properties](#user-properties).                                                                                                 |
| Form submitted  | Captures when a user submits a form on your site.        | Form destination, Session Replay ID (if enabled), [User properties](#user-properties).                                                                                                 |
| File downloaded | Captures when a user downloads a file from your site.    | File extension, File name, Link text, Link URL, Session Replay ID (if enabled),                                                                                                        |

For more information, see Track Default Events in the [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2#track-default-events) documentation. 

#### Marketing attribution

Captures the following properties:

* UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`)
* Referrer parameters ()
