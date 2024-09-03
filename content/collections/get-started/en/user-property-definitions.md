---
id: 4d421b64-f9f4-45c7-b0d6-ea0708c21b78
blueprint: get-started
title: 'User property definitions'
source: 'https://help.amplitude.com/hc/en-us/articles/215562387-User-property-definitions'
this_article_will_help_you:
  - 'Understand how Amplitude defines user properties'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717611472
---
By default, Amplitude tracks the user properties listed in the table below automatically, via client-side [SDKs](https://www.docs.developers.amplitude.com/data/sdks/sdk-overview/#analytics-sdks). All these properties will be prefixed with the Amplitude logo whenever you encounter them in Amplitude. If you prefer, configure Amplitude's SDKs to disable automatic tracking of these properties:

* [Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2#optional-tracking)
* [iOS SDK](/docs/sdks/analytics/ios/ios-swift-sdk#disable-tracking)
* [Android SDK](/docs/sdks/analytics/android/android-kotlin-sdk#disable-tracking)

Amplitude uses the collected IP address to determine a user's location properties (`City`, `Country` , `Region`, and `DMA`) using the [MaxMind](https://www.maxmind.com/en/home) database. MaxMind is widely accepted as the most reliable digital mapping source.

In Amplitude charts, if you choose to segment by device ID, event ID, latitude, longitude, server upload time, session ID, user ID, or ID, you'll have to supply the exact values you're looking yourself. Additionally, you will not be able to group by event ID, latitude, longitude, server upload time, or ID.

{{partial:admonition type="note"}}
If you send data server-side instead of using an SDK, Amplitude cannot track these user properties automatically. You must instead set these properties explicitly. 
{{/partial:admonition}}

{{partial:partials/property-table}}