---
id: b9792555-2543-447e-ab44-4446ea024765
blueprint: destination-catalog
title: Appfit
source: 'https://docs.developers.amplitude.com/data/destinations/appfit'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - event-streaming
  - cohorts
integration_category:
  - attribution
partner_doc_link: 'https://support.appsflyer.com/hc/en-us/articles/211200306-Amplitude-integration-with-AppsFlyer'
short_description: 'AppsFlyer helps brands make good choices for their business and their customers with its advanced measurement, data analytics, deep linking, engagement, fraud protection, data clean room, and privacy-preserving technologies.'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713481965
partner_maintained: false
integration_icon: partner-icons/appfit.svg
---
Amplitude CDP's AppsFlyer streaming integration enables you to forward your Amplitude events straight to [AppsFlyer](https://www.appsflyer.com/) with just a few clicks.


## Setup

### Prerequisites

To configure streaming from Amplitude to AppsFlyer, you need the following information from AppsFlyer.

- **AppsFlyer S2S Key**: The AppsFlyer S2S Key used for authentication. See the [AppsFlyer documentation](https://support.appsflyer.com/hc/en-us/articles/360004562377-Managing-API-and-Server-to-server-S2S-tokens) for help locating your S2S Key.
- **AppsFlyer App ID**: The AppsFlyer identifier for your app. It's located in AppsFlyer App Settings and can also be retrieved from the URL in your AppsFlyer Dashboards.

### Create a new sync

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **AppsFlyer**.
3. Enter a sync name, then click **Create Sync**.

### Enter credentials

1. Select your **AppsFlyer S2S Key**.
2. Enter your **AppsFlyer App ID**.

### Configure event forwarding

Under **Send Events**, make sure the toggle is enabled ("Events are sent to AppsFlyer") if you want to stream events to AppsFlyer. When enabled, events are automatically forwarded to AppsFlyer when they're ingested in Amplitude. Events aren't sent on a schedule or on-demand using this integration.

1. In **Select and filter events** choose which events you want to send. Choose only the events you need in AppsFlyer. _Transformed events aren't supported._

{{partial:admonition type="warning" title="Events for non-AppsFlyer users not supported"}}
AppsFlyer requires that all events have an **AppsFlyer ID** present. If you have selected any events to send to AppsFlyer that may not have an **AppsFlyer ID**, add a filter to send only events where the **AppsFlyer ID** is present. Otherwise, your delivery metrics may be affected.
{{/partial:admonition}}

2. In **Map properties to destination**:
    _Transformed user properties aren't supported._

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

2. (optional) In **Select additional properties**, select any more event and user properties you want to send to AppsFlyer. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to AppsFlyer as [AppsFlyer event values](https://dev.appsflyer.com/hc/reference/post_s2s_inappevent). _Transformed event properties and transformed user properties aren't supported._

### Enable sync

When satisfied with your configuration, at the top of the page toggle the **Status** to "Enabled" and click **Save**.

### Supported AppsFlyer properties

| Parameter Name        | Required              | Recommended         |
|-----------------------|:---------------------:|:-------------------:|
| **AppsFlyer ID**      | :octicons-check-16:   |                     |
| Customer User ID      |                       | :octicons-check-16: |
| Advertising ID (GAID) |                       | :octicons-check-16: |
| Amazon AID            |                       | :octicons-check-16: |
| OAID                  |                       | :octicons-check-16: |
| IMEI                  |                       | :octicons-check-16: |
| IDFA                  |                       | :octicons-check-16: |
| IDFV                  |                       | :octicons-check-16: |
| AF Content ID         |                       |                     |
| AF Content Type       |                       |                     |
| AF Currency           |                       |                     |
| AF Revenue            |                       |                     |
| Event Currency        |                       |                     |
| iOS ATTrackingManager |                       |                     |
| IP Address            |                       |                     |