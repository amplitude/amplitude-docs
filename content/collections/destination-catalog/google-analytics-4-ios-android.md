---
id: ccbe9afd-a8ad-4207-907f-3e850c970e36
blueprint: destination-catalog
title: 'Google Analytics 4 (iOS/Android)'
source: 'https://docs.developers.amplitude.com/data/destinations/google-analytics-4-ios-android'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
integration_type:
  - event-streaming
integration_category:
  - marketing-analytics
partner_maintained: false
integration_icon: partner-icons/google-analytics-4.svg
use_cases:
  - "The use case with streaming events from Amplitude to Google Analytics 4 (GA4) involves leveraging Amplitude's robust event tracking capabilities to seamlessly forward event data to GA4. This integration enables businesses to gain comprehensive insights into user behavior, engagement, and interactions across their digital platforms. By combining Amplitude's analytics with GA4's advanced capabilities, organizations can track conversions, measure user engagement, identify trends, and optimize content effectively. This integration facilitates data-driven decision-making, empowering businesses to refine their marketing strategies, enhance digital experiences, and drive better outcomes across their web and mobile platforms."
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713562727
---
Amplitude CDP's Google Analytics 4 (iOS/Android) streaming integration enables you to forward your Amplitude events and users straight to Google Analytics 4 (iOS/Android) with just a few clicks.

{{partial:admonition type="note" title="Choose the correct Google Analytics 4 destination"}}
Google Analytics 4 (Web) destination works with a web application instrumented with Google Tag (gtag.js). If you are working with an iOS or Android mobile application using Firebase, set up a [Google Analytics 4 (iOS/Android)](/docs/data/destination-catalog/google-analtics-4-web) destination.
{{/partial:admonition}}

## Setup

### Prerequisites

To configure streaming from Amplitude to Google Analytics 4 (Web), you need the following information from Google Analytics 4 (Web).

- **Google Analytics 4 Firebase App ID**: The identifier for your Google Analytics 4 Firebase app. See the [Google documentation](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=firebase#required_parameters) for help locating your Firebase app ID.
- **Google Analytics 4 Measurement Protocol API Secret**: The measurement protocol API secret used for authentication. See the [Google documentation](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=firebase#required_parameters) for help generating an API secret.

### Create a new sync

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Google Analytics 4 (iOS/Android)**.
3. Enter a sync name, then click **Create Sync**.

### Enter credentials

1. Enter your **Google Analytics 4 Firebase App ID**.
2. Enter your **Google Analytics 4 Measurement Protocol API Secret**.

### Configure mappings

_This applies to both event and user forwarding. Transformed user properties aren't supported._

1. Select an Amplitude user property that corresponds to your [Google Analytics 4 **App Instance ID**](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=firebase#required_parameters), from the left dropdown.
2. (optional) Map an Amplitude user property to [Google Analytics 4 **User ID**](https://support.google.com/analytics/answer/9213390).
      1. Select an Amplitude user property that corresponds to your Google Analytics 4 **User ID**, from the left dropdown.
      2. Select **User ID**, from the corresponding right dropdown.

### Configure event forwarding

Under **Send Events**, make sure the toggle is enabled ("Events are sent to Google Analytics 4") if you want to stream events to Google Analytics 4. When enabled, events are automatically forwarded to Google Analytics 4 when they're ingested in Amplitude. Events aren't sent on a schedule or on-demand using this integration.

1. In **Select and filter events** choose which events you want to send. Choose only the events you need in Google Analytics 4. _Amplitude sets `non_personalized_ads` to `true` for all events events. Transformed events aren't supported._

{{partial:admonition type="warning" title="Events for non-Google Analytics 4 users cannot be streamed"}}
Google Analytics 4 requires that all events have a Google Analytics 4 **App Instance ID** present. If you have selected any events to send to Google Analytics 4 that may not have a **App Instance ID**, add a filter to send only events where the **App Instance ID** is present. Otherwise, your delivery metrics may be affected.
{{/partial:admonition}}


2. (optional) In **Select additional properties**, select any more event and user properties you want to send to Google Analytics 4. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to Google Analytics 4 as [Google Analytics 4 parameters](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=firebase#payload_post_body). _Transformed event properties and transformed user properties aren't supported._

### Configure user forwarding

To stream user and property updates to Google Analytics 4, enable **Send Users**. This setting creates or updates users in Google Analytics 4 when you update them in Amplitude with the [HTTP V2 API](/docs/analytics/apis/http-v2-api/) or [Identify API](/docs/analytics/apis/identify-api/). This integration doesn't support scheduled or on-demand updates.

You can optionally select user properties to send to Google Analytics 4 in the **Select additional properties** field. Amplitude sends only the properties you select and only when one of them is updated. Amplitude sends these properties as [Google Analytics 4 User Properties](https://developers.google.com/analytics/devguides/collection/protocol/ga4/user-properties?client_type=firebase). _This integration doesn't support transformed user properties_.

### Enable sync

When satisfied with your configuration, at the top of the page toggle the **Status** to "Enabled" and click **Save**.

--8<-- "includes/debug-delivery-metrics.md"