---
id: 9066a0a1-19b7-4291-887a-8af4375ff471
blueprint: destination-catalog
use_cases:
  - "The use case with streaming events from Amplitude to Google Analytics 4 (GA4) involves leveraging Amplitude's robust event tracking capabilities to seamlessly forward event data to GA4. This integration enables businesses to gain comprehensive insights into user behavior, engagement, and interactions across their digital platforms. By combining Amplitude's analytics with GA4's advanced capabilities, organizations can track conversions, measure user engagement, identify trends, and optimize content effectively. This integration facilitates data-driven decision-making, empowering businesses to refine their marketing strategies, enhance digital experiences, and drive better outcomes across their web and mobile platforms."
short_description: "Amplitude CDP's Google Analytics 4 (iOS/Android) streaming integration enables you to forward your Amplitude events and users straight to Google Analytics 4 (iOS/Android) with just a few clicks."
integration_category:
  - marketing-analytics
integration_type:
  - event-streaming
title: 'Google Analytics 4 (Web)'
source: 'https://docs.developers.amplitude.com/data/destinations/google-analytics-4-gtag'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/google-analytics-4.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713478576
---

Amplitude CDP's Google Analytics 4 (Web) streaming integration enables you to forward your Amplitude events and users straight to Google Analytics 4 (Web) with just a few clicks.

{{partial:admonition type="note" title="Choose the correct Google Analytics 4 destination"}}
Google Analytics 4 (Web) destination works with a web application instrumented with Google Tag (gtag.js). If you are working with an iOS or Android mobile application using Firebase, set up a [Google Analytics 4 (iOS/Android)](/data/destination-catalog/google-analtics-4-ios-android) destination.
{{/partial:admonition}}

## Use cases

When you send events from Amplitude to Google Analytics 4, you enrich Google Analytics 4's data collection capabilities, deepen understanding of user journeys, and integrate product and marketing insights. This approach optimizes user acquisition and retention, and enhances the overall user experience. For more information, see Amplitude's blog post [GA4 as an Amplitude CDP Destination: Hybrid Tracking Method for Full User Journey Analysis](https://amplitude.com/blog/GA4-amplitude-hybrid-tracking) that walks through the end-to-end use case for this Google Analytics 4 streaming integration.

## Setup

### Prerequisites

To configure streaming from Amplitude to Google Analytics 4 (Web), you need the following information from Google Analytics 4 (Web).

- **Google Analytics 4 Measurement ID**: The measurement ID associated with a Google Analytics stream. See the [Google documentation](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#required_parameters) for help locating your measurement ID.
- **Google Analytics 4 Measurement Protocol API Secret**: The measurement protocol API secret used for authentication. See the [Google documentation](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#required_parameters) for help generating an API secret.

### Create a new sync

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Google Analytics 4 (Web)**.
3. Enter a sync name, then click **Create Sync**.

### Enter credentials

1. Enter your **Google Analytics 4 Measurement ID**.
2. Enter your **Google Analytics 4 Measurement Protocol API Secret**.

### Configure mappings

_This applies to both event and user forwarding. Transformed user properties aren't supported._

1. Select an Amplitude user property that corresponds to your [Google Analytics 4 **Client ID**](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag#payload_post_body), from the left dropdown.
2. (optional) Map an Amplitude user property to [Google Analytics 4 **User ID**](https://support.google.com/analytics/answer/9213390).
      1. Select an Amplitude user property that corresponds to your Google Analytics 4 **User ID**, from the left dropdown.
      2. Select **User ID**, from the corresponding right dropdown.

### Configure event forwarding

Under **Send Events**, make sure the toggle is enabled ("Events are sent to Google Analytics 4") if you want to stream events to Google Analytics 4. When enabled, events are automatically forwarded to Google Analytics 4 when they're ingested in Amplitude. Events aren't sent on a schedule or on-demand using this integration.

1. In **Select and filter events** choose which events you want to send. Choose only the events you need in Google Analytics 4. _Amplitude sets `non_personalized_ads` to `true` for all events events. Transformed events aren't supported._

{{partial:admonition type="warning" title="Events for non-Google Analytics 4 users cannot be streamed"}}
Google Analytics 4 requires that all events have a Google Analytics 4 **App Instance ID** present. If you have selected any events to send to Google Analytics 4 that may not have a **App Instance ID**, add a filter to send only events where the **App Instance ID** is present. Otherwise, your delivery metrics may be affected.
{{/partial:admonition}}

2. (optional) In **Select additional properties**, select any more event and user properties you want to send to Google Analytics 4. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to Google Analytics 4 as [Google Analytics 4 parameters](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag#payload_post_body). _Transformed event properties and transformed user properties aren't supported._

### Configure user forwarding

To stream user and property updates to Google Analytics 4, enable **Send Users**. This setting creates or updates users in Google Analytics 4 when you update them in Amplitude with the [HTTP V2 API](/analytics/apis/http-v2-api/) or [Identify API](/analytics/apis/identify-api/). This integration doesn't support scheduled or on-demand updates.

You can optionally select user properties to send to Google Analytics 4 in the **Select additional properties** field. Amplitude sends only the properties you select and only when one of them is updated. Amplitude sends these properties as [Google Analytics 4 User Properties](https://developers.google.com/analytics/devguides/collection/protocol/ga4/user-properties?client_type=gtag). _This integration doesn't support transformed user properties_.

### Enable sync

When satisfied with your configuration, at the top of the page toggle the **Status** to "Enabled" and click **Save**.

## Delivery metrics

The events delivered, not delivered, and delivery rate metrics for this destination are an estimate based on a sample of events sent to the Google Analytics 4 Measurement Protocol [validation endpoint](https://developers.google.com/analytics/devguides/collection/protocol/ga4/validating-events). In addition to sending all events to the [ingestion endpoint](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events), a sample of up to the first 100 events (and 100 user property changes, if "Send Users" is enabled) are sent to the validation endpoint every 10 minutes. The metrics shown in Amplitude are scaled from the sample of events, sent to the validation endpoint, to the total volume of events sent to the ingestion endpoint. If the delivery rate is below 100%, the counts of events delivered shown in Amplitude may not match exactly with the number of events seen in Google Analytics 4. Latency metrics are still computed exclusively from events sent to the ingestion endpoint.

