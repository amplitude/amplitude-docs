---
id: 4d2e02c1-9bf7-48ec-ab17-641fe208de23
blueprint: page
title: 'Site components'
package: '@amplitude/session-replay-browser'
author: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1757629320
---
{{ 
    md_url = "/docs/md/{collection:handle}/en/{slug}.md";
    full_md_url = "{site:url}{md_url}";
    prompt = "Look at this document from Amplitude so I can ask questions about it: " | urlencode;
    chatgpt_url = "https://chat.openai.com/?q={chatgpt_prompt}";
    claude_url = "https://claude.ai/chat?q={claude_prompt}";
}}

https://chat.openai.com/?q={{prompt}}{{"https://amplitude.com{md_url}" | urlencode}}



```html
<script src="https://cdn.amplitude.com/script/AMPLITUDE_API_KEY.js"></script>
<script>
  window.amplitude.init('AMPLITUDE_API_KEY', {
    fetchRemoteConfig: true,
    autocapture: true
  });
</script>
```

```html
<script src="https://cdn.amplitude.com/script/AMPLITUDE_API_KEY.js"></script><script>window.amplitude.init('AMPLITUDE_API_KEY', {"fetchRemoteConfig":true,"autocapture":false});</script>
```
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