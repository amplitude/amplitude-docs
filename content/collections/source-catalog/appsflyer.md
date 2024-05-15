---
id: d973a828-d448-4996-a8c4-cc657c386e93
blueprint: source-catalog
use_cases:
  - "Enhance Amplitude's analytics by sending detailed event data from AppsFlyer, improving insights into user behavior and marketing campaign effectiveness."
  - "Send targeted event data from Amplitude to AppsFlyer to deepen analysis on user actions' impact on marketing performance and attribution."
  - 'Export user cohorts from Amplitude to AppsFlyer for more personalized and effective marketing campaigns, based on specific user behaviors or characteristics.'
short_description: 'The world’s leading data-driven marketers trust AppsFlyer for independent measurement solutions and innovative tools to grow their mobile business.'
integration_category:
  - attribution
integration_type:
  - event-streaming
  - raw-events
  - cohorts
title: AppsFlyer
source: 'https://www.docs.developers.amplitude.com/data/sources/appsflyer'
category: Attribution
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
partner_maintained: false
integration_icon: partner-icons/appsflyer.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713820232
connection: source
---
This integration combines Amplitude's analytics with AppsFlyer's attribution tools into one unified system. With it, you can share all user data in real-time and help non-technical team members pinpoint your targeting, optimize your ad spend, and boost your ROI.

## About AppsFlyer

[AppsFlyer](https://www.appsflyer.com/) provides mobile advertising attribution and analytics, helping marketers to pinpoint their targeting optimize their ad spend and boost their ROI. Send your AppsFlyer data to Amplitude to see how your different acquisition sources are performing.

## Considerations

- This AppsFlyer integration uses the [Amplitude Attribution API](apis/attribution-api) to send data to Amplitude. Make sure you understand how the Attribution API works before setting up this integration.
- AppsFlyer uses the Attribution API, which means:
    - Attribution events are held for up to 72 hours for potential user matching. If a user didn't trigger an Amplitude event within 72 hours of the attribution event, the attribution data is dropped.
    - Attribution is matched to Amplitude users or events via the Advertising ID (IDFA/IDFV or ADID). Make sure you are sending this ID with your Amplitude events. You must configure the [Android SDK](/sdks/sdk-catalog/android/android-kotlin-sdk) and [iOS SDK](/sdks/sdk-catalog/ios-swift) to send this data. If you use [JavaScript SDK](/sdks/sdk-catalog/browser/browser-sdk-2), you must send the Advertising ID using [HTTP API](/apis/http-v2-api).
- There can sometimes be a discrepancy between AppsFlyer and Amplitude data. When a user doesn't trigger any events tracked by Amplitude within 72 hours, the linkage between the same user across both platforms may be temporarily affected. This may result in a lower event count in Amplitude when comparing to events in AppsFlyer.
- Amplitude removes the ADID information due to privacy concerns, so you see `ADID = null` when you send ADID. The attribution information is processed, but is stripped of the ADID before the event is saved.
- [AppsFlyer](https://support.appsflyer.com/hc/en-us/articles/360001546905#how-do-srns-work-restrictions-on-sending-data-to-third-parties) implemented some restrictions to comply with certain media regulations, so app installs from AppsFlyer are categorized as organic. Some SRNs/partners require advertisers to hide media source data. It's hidden before forwarding attribution data to third parties like Amplitude. When required, installs and in-app events are sent without media source name and campaign details. For more information about AppsFlyer's integration, see their [help center](https://support.appsflyer.com/hc/en-us/articles/211200306-Amplitude-integration-with-AppsFlyer). Additionally, [here](https://support.appsflyer.com/hc/en-us/articles/360006091197#sending-data-to-third-parties) is information on the sources not available through AppsFlyer. A possible workaround for this is to either [export the raw data](https://support.appsflyer.com/hc/en-us/articles/209680773-Export-Data-Reports) from AppsFlyer, or collect raw data on your end. Then send the data using Amplitude's HTTP API.

## Set up and use the integration

You can find detailed instructions on implementing this integration in the [AppsFlyer documentation](https://support.appsflyer.com/hc/en-us/articles/211200306-AppsFlyer-Amplitude-Integration).