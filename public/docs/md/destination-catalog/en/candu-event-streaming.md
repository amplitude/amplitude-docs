---
id: 6bc2dd78-30ae-4209-b3de-606b32420d22
blueprint: destination-catalog
title: 'Candu Event Streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - event-streaming
partner_maintained: false
integration_icon: partner-icons/candu.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
source: 'https://www.docs.developers.amplitude.com/data/destinations/candu-event-streaming/'
updated_at: 1720114566
integration_category:
  - customer-engagement
---
Candu helps you build, iterate, and personalize your in-app content experiences. This integration enables you to stream events and users updates from to Amplitude to Candu.

{{partial:admonition type="note" heading=""}}
Contact the [Candu support team](https://www.candu.ai/) with any questions about this integration.
{{/partial:admonition}}

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.
- You need a Candu account to enable this integration.
- Amplitude sends selected user and event properties along with the event.

## Setup

### Prerequisites

To configure an Event Streaming integration from Amplitude to Candu, you must fulfill the following prerequisites from Candu:

- **A Candu Account:** You must have a Candu account to use this integration. Contact Candu to learn more.
- **Candu API Key:** Candu requires an API key to send data to Candu.

### Candu setup

1. Log in to your My Candu account.
2. Navigate to the **Credentials** tab to find and copy your account's API Key.

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Candu - Event Stream**.
2. Enter a sync name, then click **Create Sync**.
3. Toggle Status from **Disabled** to **Enabled**.
4. Paste your **API Key (Access Token from the Candu platform)**.
5. (Optional) In the **Create & Update users** section, enable the toggle if you want to send users and their properties in real-time whenever Amplitude creates a user or updates the user property.
6. In the **Send Events** section, enable the **Events are sent to Candu** toggle to stream events to Candu. When enabled, Amplitude forwards events to Candu when they're ingested. Events aren't sent on a schedule or on demand using this integration.
7. In the **Select and filter events** section choose which events you want to send. Choose only the events you need in Candu. This integration doesn't support[Transformed events](/docs/data/transformations).
8. Enable the destination and **Save** to finish.