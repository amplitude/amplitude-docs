---
id: 4d2e02c1-9bf7-48ec-ab17-641fe208de23
blueprint: page
title: 'Site components'
package: "@amplitude/session-replay-browser"
---

{{partial:admonition type="warning" heading="test"}}
Here's some **formatted** *text*. And `this`.

```js
import { pageUrlEnrichmentPlugin } from '@amplitude/plugin-page-url-enrichment-browser';

const pageUrlEnrichment = pageUrlEnrichmentPlugin();
amplitude.add(pageUrlEnrichment);
amplitude.init(API_KEY);
```
{{/partial:admonition}}


## test

```swift
// Basic boot with user ID
amplitudeEngagement.boot("USER_ID")

// Advanced boot with options

let bootOptions = AmplitudeBootOptions(
  user_id: "USER_ID",
  device_id: "DEVICE_ID",
  user_properties: ["key": "value"]
)
amplitudeEngagement.boot(options: bootOptions)
```

More content **here**

```swift
// Basic boot with user ID
amplitudeEngagement.boot("USER_ID")

// Advanced boot with options

let bootOptions = AmplitudeBootOptions(
  user_id: "USER_ID",
  device_id: "DEVICE_ID",
  user_properties: ["key": "value"]
)
amplitudeEngagement.boot(options: bootOptions)
```
