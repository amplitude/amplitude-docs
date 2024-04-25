---
id: 3b3040c0-388f-4a05-b8de-c3e909b01cd3
blueprint: destination-catalog
title: Adjust
source: 'https://docs.developers.amplitude.com/data/destinations/adjust'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_category:
  - attribution
integration_type:
  - raw-events
  - event-streaming
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713459032
partner_doc_link: 'https://help.adjust.com/en/classic/integrated-partners-classic/amplitude'
use_cases:
  -
    id: lv4ftbc6
    use_case: "Leverage Adjust's data to segment users based on specific parameters like ad group or network, enabling a granular analysis of how different advertising efforts impact user engagement, conversion, and retention."
  -
    id: lv4ftkm3
    use_case: "Streaming events to Adjust allows for real-time data transmission from your application to Adjust's platform, enabling immediate analysis and optimization of your marketing efforts"
short_description: 'Adjust unifies all your marketing activities into one powerful platform, giving you the insights you need to scale your business.'
partner_maintained: false
integration_icon: partner-icons/adjust.svg
---
## About Adjust

[Adjust](https://www.adjust.com/) is a business intelligence platform for mobile app marketers, combining attribution for advertising sources with advanced analytics and store statistics.

## Setup

### Prerequisites

To configure an Event Streaming integration from Amplitude to Adjust, you need the following information from Adjust:

- **Adjust App Token:** Find the App token on the Adjust dashboard. For more information, see Adjust's article, [Server-to-server events](https://help.adjust.com/en/article/server-to-server-events).
- **Adjust S2S Security Token:** To start sending data into Adjust, you have to get your Adjust S2S Security Token. For more information, see Adjust's article [Server-to-server (S2S) Security](https://help.adjust.com/en/article/server-to-server-s2s-security).

### Create a new sync

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Adjust**.
3. Enter a sync name, then click **Create Sync**.
4. Enter the **Adjust App Token** from Adjust.
5. Enter the **Adjust S2S Security Token** from Adjust.

### Configure event forwarding

In the **Send Events** section of the Adjust destination config, enable the **Events are sent to Adjust** toggle. This toggle ensures that Amplitude forwards events to Adjust. Amplitude forwards events to Adjust as it receives them, not on a schedule or on demand.

1. In the **Select and filter events** section, choose the events to send to Adjust. This integration doesn't support transformed events.

    To map an event, select the Amplitude event, and enter the corresponding Adjust event token.

2. In the **Map properties to destination** section, select which Amplitude user properties map to which Adjust user properties. Amplitude recommends that you map the following:

    - An Amplitude user property to Adjust **User ID**.
    - Amplitude properties to as many of the Adjust identifiers as possible (iOS IDFA, Google Advertising ID, Amazon Fire Advertising ID, Huawei Open Advertising ID, Adjust Device ID (ADID), IDFA, Android ID).

3. (optional) In the **Select additional properties**, select any more event and user properties to send to Adjust. 

#### Track Revenue events

To track Revenue events, map the Amplitude user properties to the following Adjust properties:

- **Revenue**: Revenue event value in full currency units. Minimum 0.001.
- **Currency**: Revenue event [currency code](https://help.adjust.com/resources/lists/supported-currencies).
- **Environment**: Environment to post the data to (**sandbox** or **production**). This value defaults to `production` if you don't enter a value.

### Enable sync

When satisfied with your configuration, at the top of the page toggle the Status to "Enabled" and click Save.