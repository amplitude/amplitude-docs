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
Starting with Browser SDK version 2.10.0, Amplitude includes [Autocapture](/docs/get-started/autocapture) functionality with the SDK. 

For best results, Amplitude recommends that you upgrade to Browser SDK 2.10.0 or higher using the following instructions.
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
