---
id: 9b155be9-bb32-428c-9f49-6e00f9630547
blueprint: browser_sdk
title: 'Migrate from Browser SDK 1.0 to 2.0'
sdk_status: current
article_type: migration
supported_languages:
  - js
  - ts
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1709672486
---

```js
// torchlight! {"diffIndicators": true}
  amplitude.init(API_KEY, undefined, {
   attribution: { //[tl! --]
     trackPageViews: true //[tl! --]
   defaultTracking: { //[tl! ++]
     pageViews: { //[tl! ++]
       trackOn: 'attribution', //[tl! ++]
     }, //[tl! ++]
    },
  });
```