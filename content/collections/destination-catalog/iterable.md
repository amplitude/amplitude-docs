---
id: 4daf0bea-69ae-454e-beab-39d622d398d0
blueprint: destination-catalog
use_cases:
  - "Understand how users engage across channels, and how their behavior affects down-funnel usage by automatically ingesting Iterable's campaign metrics into your Amplitude projects."
short_description: 'A cross-channel marketing platform that powers unified customer experiences and empowers you to create, optimize and measure every interaction across the entire customer journey.'
integration_category:
  - marketing-automation
integration_type:
  - event-streaming
title: Iterable (Event Stream)
source: 'https://docs.developers.amplitude.com/data/destinations/iterable'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/iterable.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713478985
---

Amplitude CDP's Iterable streaming integration enables you to forward your Amplitude events and users straight to [Iterable](https://iterable.com/) with just a few clicks.

## Setup

### Prerequisites

To configure streaming from Amplitude to Iterable, you need the following information from Iterable.

**Iterable API Key**: The Iterable API Key used for authentication. See the [Iterable documentation](https://support.iterable.com/hc/en-us/articles/360043464871-API-Keys-#creating-api-keys) for help locating your API Key.

### Create a new sync

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Iterable**.
3. Enter a sync name, then click **Create Sync**.

### Enter credentials

Enter your **Iterable API Key**.

### Configure mappings

_This applies to both event and user forwarding. Transformed user properties aren't supported._

1. Select an Amplitude user property that corresponds to your Iterable user ID, from the left dropdown.
2. Select the type of your Iterable user ID, from the right dropdown.
      - [**User ID**](https://support.iterable.com/hc/en-us/articles/360035402531-Identifying-the-User-#identifying-the-user-by-user-id): Any unique identifier for each user in Iterable.
      - [**Email**](https://support.iterable.com/hc/en-us/articles/360035402531-Identifying-the-User-#identifying-the-user-by-email)
3. (optional) Map other Amplitude user properties to Iterable properties.
      1. Select an Amplitude user property that corresponds to a Iterable property, from the left dropdown.
      2. Select the Iterable property, from the corresponding right dropdown.

See the full list of [Iterable properties that are supported by Amplitude](#supported-iterable-properties).

### Configure event forwarding

Under **Send Events**, make sure the toggle is enabled ("Events are sent to Iterable") if you want to stream events to Iterable. When enabled, events are automatically forwarded to Iterable when they're ingested in Amplitude. Events aren't sent on a schedule or on-demand using this integration.

1. In **Select and filter events** choose which events you want to send. Choose only the events you need in Iterable. _Transformed events aren't supported._

{{partial:admonition type="warning" title=""}}
Iterable requires that all events have an **Iterable ID** present. If you have selected any events to send to Iterable that may not have an **Iterable ID**, add a filter to send only events where the **Iterable ID** is present. Otherwise, your delivery metrics may be affected.
{{/partial:admonition}}

2. (optional) In **Select additional properties**, select any more event and user properties you want to send to Iterable. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to Iterable as [Iterable data fields](https://support.iterable.com/hc/en-us/articles/208183076-Field-Data-Types). _Transformed event properties and transformed user properties aren't supported._

### Configure user forwarding

To stream user and property updates to Iterable, enable **Send Users**. This setting creates or updates users in Iterable when you update them in Amplitude with the [HTTP V2 API](/docs/analytics/apis/http-v2-api/) or [Identify API](/docs/apis/analytics/identify). This integration doesn't support scheduled or on-demand updates.

You can optionally select user properties to send to Iterable in the **Select additional properties** field. Amplitude sends only the properties you select and only when one of them is updated. Amplitude sends these properties as [Iterable data fields](https://support.iterable.com/hc/en-us/articles/208183076-Field-Data-Types). _This integration doesn't support transformed user properties_.

### Enable sync

When satisfied with your configuration, at the top of the page toggle the **Status** to "Enabled" and click **Save**.

## Supported Iterable properties

- **User ID**
- **Email**
- Campaign ID
- Template ID

