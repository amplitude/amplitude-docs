---
id: 9fc1da65-4b47-4d2c-9633-7fb7fa6fff0a
blueprint: destination-catalog
title: AppsFlyer
source: 'https://docs.developers.amplitude.com/data/destinations/appsflyer'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - cohorts
  - event-streaming
integration_category:
  - attribution
partner_doc_link: 'https://support.appsflyer.com/hc/en-us/articles/211200306-Amplitude-integration-with-AppsFlyer'
use_cases:
  -
    id: lv5gmwyz
    use_case: "Enhance Amplitude's analytics by sending detailed event data from AppsFlyer, improving insights into user behavior and marketing campaign effectiveness."
  -
    id: lv5gmy9d
    use_case: "Send targeted event data from Amplitude to AppsFlyer to deepen analysis on user actions' impact on marketing performance and attribution."
  -
    id: lv5gn640
    use_case: 'Export user cohorts from Amplitude to AppsFlyer for more personalized and effective marketing campaigns, based on specific user behaviors or characteristics.'
short_description: 'AppsFlyer helps brands make good choices for their business and their customers with its advanced measurement, data analytics, deep linking, engagement, fraud protection, data clean room, and privacy-preserving technologies.'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713481932
partner_maintained: false
integration_icon: partner-icons/appsflyer.svg
---
Amplitude's AppsFlyer streaming integration enables you to forward your Amplitude events straight to [AppsFlyer](https://www.appsflyer.com/) with just a few clicks.

## Prerequisites

To configure streaming from Amplitude to AppsFlyer, you need the following information from AppsFlyer.

- **AppsFlyer S2S Key**: The AppsFlyer S2S Key used for authentication. See the [AppsFlyer documentation](https://support.appsflyer.com/hc/en-us/articles/360004562377-Managing-API-and-Server-to-server-S2S-tokens) for help locating your S2S Key.
- **AppsFlyer App ID**: The AppsFlyer identifier for your app. It's located in AppsFlyer App Settings and can also be retrieved from the URL in your AppsFlyer Dashboards.

## Create a new sync

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **AppsFlyer**.
3. Enter a sync name, then click **Create Sync**.

## Enter credentials

1. Select your **AppsFlyer S2S Key**.
2. Enter your **AppsFlyer App ID**.

## Configure event forwarding

Under **Send Events**, make sure the toggle is enabled ("Events are sent to AppsFlyer") if you want to stream events to AppsFlyer. When enabled, events are automatically forwarded to AppsFlyer when they're ingested in Amplitude. Events aren't sent on a schedule or on-demand using this integration.

1. In **Select and filter events** choose which events you want to send. Choose only the events you need in AppsFlyer.

{{partial:admonition type="warning" title="Events for non-AppsFlyer users cannot be streamed"}}
AppsFlyer requires that all events have an **AppsFlyer ID** present. If you have selected any events to send to AppsFlyer that may not have an **AppsFlyer ID**, add a filter to send only events where the **AppsFlyer ID** is present. Otherwise, your delivery metrics may be affected.
{{/partial:admonition}}


2. In **Map properties to destination**:
    1. Select an Amplitude user property that corresponds to your [**AppsFlyer ID**](https://support.appsflyer.com/hc/en-us/articles/4408847686161-Device-identifiers#appsflyer-id), from the left dropdown.
    2. (recommended) Map an Amplitude user property to [AppsFlyer **Customer User ID**](https://support.appsflyer.com/hc/en-us/articles/4408847686161-Device-identifiers#customer-user-id).
        1. Select an Amplitude user property that corresponds to your AppsFlyer **Customer User ID**, from the left dropdown.
        2. Select **Customer User ID**, from the corresponding right dropdown.
    3. (recommended) Map Amplitude user properties to AppsFlyer device identifiers. It's recommended that you map Amplitude properties to as many of AppsFlyer [GAID, Amazon Advertising ID, OAID, and IMEI](https://support.appsflyer.com/hc/en-us/articles/4408847686161-Device-identifiers#android-device-identifiers) (for Android) or [IDFA and IDFV](https://support.appsflyer.com/hc/en-us/articles/4408847686161-Device-identifiers#apple-device-identifiers) (for Apple) as possible.
        1. Select an Amplitude user property that corresponds to an AppsFlyer device identifier, from the left dropdown.
        2. Select the AppsFlyer device identifier, from the corresponding right dropdown.
    4. (optional) Map other Amplitude user properties to AppsFlyer properties.
        1. Select an Amplitude user property that corresponds to an AppsFlyer property, from the left dropdown.
        2. Select the AppsFlyer property, from the corresponding right dropdown.

    See the full list of [AppsFlyer properties that are supported by Amplitude](#supported-appsflyer-properties).

3. (optional) In **Select additional properties**, select any more event and user properties you want to send to AppsFlyer. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to AppsFlyer as [AppsFlyer event values](https://dev.appsflyer.com/hc/reference/post_s2s_inappevent).

## Enable sync

When satisfied with your configuration, at the top of the page toggle the **Status** to "Enabled" and click **Save**.

## Supported AppsFlyer properties

| Parameter Name        | Required | Recommended |
| --------------------- | :------: | :---------: |
| **AppsFlyer ID**      |    ✅     |             |
| Customer User ID      |          |      ✅      |
| Advertising ID (GAID) |          |      ✅      |
| Amazon AID            |          |      ✅      |
| OAID                  |          |      ✅      |
| IMEI                  |          |      ✅      |
| IDFA                  |          |      ✅      |
| IDFV                  |          |      ✅      |
| AF Content ID         |          |             |
| AF Content Type       |          |             |
| AF Currency           |          |             |
| AF Revenue            |          |             |
| Event Currency        |          |             |
| iOS ATTrackingManager |          |             |
| IP Address            |          |             |
