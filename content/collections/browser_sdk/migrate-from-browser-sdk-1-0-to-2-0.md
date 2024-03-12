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
updated_at: 1710278271
sdk_version_comparison:
  -
    cells:
      - Feature
      - 'Latest Browser SDK'
      - 'Maintenance Browser SDK'
  -
    cells:
      - Package
      - '[@amplitude/analytics-browser](https://www.npmjs.com/package/@amplitude/analytics-browser)'
      - '[amplitude-js](https://www.npmjs.com/package/amplitude-js)'
  -
    cells:
      - 'Web Attribution'
      - 'By default, the Browser SDK includes the `web-attribution` plugin which implements Web Attribution V1.'
      - 'Configuration required. Use Maintenance Web Attribution.'
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