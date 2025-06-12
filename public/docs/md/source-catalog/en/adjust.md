---
id: 476e34f4-6933-431f-a28b-09797f189d04
blueprint: source-catalog
use_cases:
  - "Leverage Adjust's data to segment users based on specific parameters like ad group or network, enabling a granular analysis of how different advertising efforts impact user engagement, conversion, and retention."
  - "Streaming events to Adjust allows for real-time data transmission from your application to Adjust's platform, enabling immediate analysis and optimization of your marketing efforts."
short_description: 'Adjust unifies all your marketing activities into one powerful platform, giving you the insights you need to scale your business.'
integration_category:
  - attribution
integration_type:
  - raw-events
partner_doc_link: 'https://help.adjust.com/en/classic/integrated-partners-classic/amplitude'
title: Adjust
source: 'https://www.docs.developers.amplitude.com/data/sources/adjust'
category: Attribution
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
partner_maintained: false
integration_icon: partner-icons/adjust.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713818753
connection: source
---
This integration combines Amplitude's analytics with Adjust's attribution tools into one unified system. Use this integration to share all user data in real-time and help non-technical team members see where your users are coming from, and identify your highest-performing sources.

{{partial:admonition type="note" title=""}}
This Adjust integration uses the [Amplitude Attribution API](/docs/apis/analytics/attribution) to send data to Amplitude. Make sure you understand how the Attribution API works before setting up this integration.
{{/partial:admonition}}

## About Adjust

[Adjust](https://www.adjust.com/) combines attribution for advertising sources with advanced analytics and store statistics. Segment your users by Adjust parameters like ad group or network to see how engagement, conversion, and retention rates differ across ad channels.

## Considerations

- Adjust uses the Attribution API, which means:
    - Attribution events are held for up to 72 hours for potential user matching. If a user didn't trigger an Amplitude event within 72 hours of the attribution event, Amplitude drops the attribution data.
    - Attribution is matched to Amplitude users or events via the Advertising ID (IDFA/IDFV or ADID). Make sure you are sending this ID with your Amplitude events. You must configure the [Android SDK](/docs/sdks/analytics/android/android-kotlin-sdk) and [iOS SDK](/docs/sdks/analytics/ios/ios-swift-sdk) to send this data. If you use [Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2), send the Advertising ID with[HTTP API](/docs/apis/analytics/http-v2).
    - Note that while the Advertising ID can be set as Device ID (automatically set by the SDKs), the Advertising ID must also be set as a top-level field in your request payload to Amplitude. You can find this in the HTTP API V2 example upload request body linked [here](/docs/apis/analytics/http-v2#upload-request-headers).
- There can sometimes be a discrepancy between Adjust and Amplitude data. When a user doesn't trigger any events tracked by Amplitude within 72 hours, the linkage between the same user across both platforms may be temporarily affected. This may result in a lower event count in Amplitude when comparing to events in Adjust.
- Amplitude removes the ADID information due to privacy concerns, so you see `ADID = null` when you send ADID. The attribution information is processed, but Amplitude strips the ADID before saving the event.

## Set up and use the integration

<!-- markdown-link-check-disable -->
You can find a complete set of instructions for implementing this integration in the [Adjust documentation](https://help.adjust.com/en/integrated-partners/amplitude).