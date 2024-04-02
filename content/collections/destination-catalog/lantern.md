---
id: c458b2bc-8b22-41f7-a8f8-c0551d684005
blueprint: destination-catalog
title: Lantern
source: 'https://docs.developers.amplitude.com/data/destinations/lantern-event-streaming'
category: Event streaming
---
[Lantern](https://www.withlantern.com/) is a customer success platform designed to predict when customers are ready to expand or in need of help and run workflows to engage them. Lantern helps B2B companies connect with the right customer at the right time and increase Net Dollar Retention.

{{partial:admonition type="info" title="Lantern manages this integration"}}
Contact the [Lantern support team](https://www.withlantern.com/pricing) for support with this integration.
{{/partial:admonition}}

## Considerations

Keep these things in mind when sending events to Lantern.

- You must enable this integration in each Amplitude project you want to use it in.
- You must have a paid Lantern plan.
- Amplitude matches the `user_id` to the Lantern `analytics_id`  to associate events.
- Relevant limits for Lantern events are:
    - Maximum event size of data: 64 bytes
    - Maximum size of event data: 4250K bytes (4.25MB)
- To forward event properties, you need to specify the event properties in the UI during the setup stage.

## Setup

### Lantern setup

Get your webhook ID from Lantern.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Lantern**.
3. Enter a sync name, then click **Create Sync**.
4. Toggle Status to **Enabled**.
5. Enter your Lantern Webhook ID.
6. Toggle the Send events filter to select the events to send. You can send all events, but Amplitude recommends choosing the most important ones.
7. Use the Event Properties filter to select which event properties you want to send.
8. When finished, save the destination.
