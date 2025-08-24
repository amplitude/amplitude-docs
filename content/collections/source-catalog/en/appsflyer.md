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

AppsFlyer has two integrations with Amplitude:
  Amplitude Attribution API to send install data to Amplitude. Make sure you understand the limitations of the Attribution API before setting up this integration.
  Amplitude HTTP V2 API to send install and in-app data to Amplitude.
Attribution API limitations:
Attribution events are held for up to 72 hours for potential user matching. If a user didn't trigger an Amplitude event within 72 hours of the attribution event, the attribution data is dropped.
Attribution is matched to Amplitude users or events via the Advertising ID (IDFA/IDFV or ADID). Make sure you are sending this ID with your Amplitude events. You must configure the Android SDK and iOS SDK to send this data. If you use Browser SDK, you must send the Advertising ID using HTTP API.
The above can cause discrepancies between AppsFlyer and Amplitude data. When a user doesn't trigger any events measured by Amplitude within 72 hours, the linkage between the same user across both platforms may be temporarily affected. 
This may result in a lower event count in Amplitude when comparing to events in AppsFlyer.
Amplitude removes the ADID information due to privacy concerns, so you see ADID = null when you send ADID. 
The attribution information is processed, but is stripped of the ADID before the event is saved.
When choosing the HTTP V2 API integration, make sure to setup the following:
  Amplitude device ID
  Customer user ID
  Amplitude session ID
Choose either the Amplitude Attribution API (V1) or HTTP V2 API (V2) integration. 
Do not use both simultaneously. Using both versions at the same time may result in duplicate events being sent to Amplitude.
Some media sources have data restrictions that cause app installs to be categorized as organic or to not be shared with third parties like Amplitude. When required, installs and in-app events are sent without media source name and campaign details. 
Find [here](https://support.appsflyer.com/hc/en-us/articles/360006868017-About-raw-data-identifier-restrictions) more information on the sources with data restrictions.
For more information about AppsFlyer's integration, see their [help center](https://support.appsflyer.com/hc/en-us/articles/211200306-Amplitude-integration-with-AppsFlyer)

## Set up and use the integration

You can find detailed instructions on implementing this integration in the [AppsFlyer documentation](https://support.appsflyer.com/hc/en-us/articles/211200306-Amplitude-integration-with-AppsFlyer).
