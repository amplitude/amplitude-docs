---
id: 42e4e239-54c9-4ac4-9170-b535a1fd5eba
blueprint: data
title: 'Destination Event Streaming Overview'
landing: false
source: 'https://www.docs.developers.amplitude.com/data/destination-event-streaming-overview/'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718907005
---
Event Streaming lets you share your Amplitude data throughout your entire system. Use the valuable behavioral data in Amplitude to enhance customer profiles and send data to your marketing, sales, and infrastructure tools.

With event streaming, you gain access to user-friendly, configuration-based tools that offer precise control over the data you send. Filter data by user, group, and event properties, ensuring that you send only the relevant information to your downstream tools. Additionally, you can monitor key metrics like event volume, latency, and detailed delivery status to assess the performance and reliability of your streaming integration.

## Considerations

- **Billing efficiency:** Amplitude tracks event volume based on distinct events sent. If you send same event to multiple Event Streaming destinations, it's counted only once for billing. When you use all your contracted event volume for the billing period, Amplitude pauses all streams until the next billing cycle. Wait until the next billing cycle or upgrade your plan to restart streaming.
- **Latency target:** Amplitude aims for an end-to-end p95 latency of 60 seconds, monitored and supported by alerts.
- **Retry mechanism:** Amplitude addresses Intermittent errors using in-memory retries with exponential backoff for initial sends. The retry pipeline attempts up to 10 times within a 4-hour window. This mechanism applies to all Event Streaming destinations.
- **Streamlined monitoring and management:** The Event Streaming Debugger UI in Amplitude Data lets you monitor pending retries, progress, and expired payloads. Analyze failed payload samples to gain insight into error categories.

## Limitations

- **Forwarding transformed data:** Amplitude event streaming only supports raw (untransformed) events, event properties, and user properties. [Transformed](/docs/data/transformations) events and properties (such as merged properties) aren't supported.
- **Format for User properties:** All forwarded user properties are currently sent as strings except for the [Braze streaming](/docs/data/destination-catalog/braze) and [Iterable streaming](/docs/data/destination-catalog/iterable) destinations
- **Reserved keywords:** Specific keywords, including "_all" and "_identify," can't be used as event names when streaming events from Amplitude.
- **Historical data:** Amplitude's streaming integrations focus on data from the setup point forward. Historical data isn't included in this process, which ensures that Amplitude transmits only events captured post-configuration.

## FAQs

### What's the difference between Cohort syncing and Event Streaming?

- **Cohort Syncing:** in Amplitude involves automatically maintaining lists of user IDs based on specific criteria or behaviors. This feature is a valuable tool for transferring a list of User IDs from Amplitude to third-party tools like SFMC or Braze. It enables you to explore behavioral targeting and thoroughly analyze the impact of your targeting strategies in downstream destinations. Cohort syncing simplifies the management and updating of these lists, allowing for meaningful actions based on user behavior without manual effort.
- **Event Streaming:** Event Streaming offers more than just cohort syncing. It simplifies your data setup by allowing you to use a single Amplitude configuration to smoothly send data to various platforms, eliminating the need for constant technical adjustments. With Event Streaming, you have precise control, choosing which events, users, or properties to send to each platform, ensuring only important data reaches its destination. Additionally, it enables real-time conversion events, triggering actions in tools like Braze, Customer.io, or SFMC to optimize your targeting and enhance the effectiveness of your initiatives.

### What are some examples of how customers are using Event streaming?

1. **Marco Polo:** Used Event Streaming to power a real-time 'Welcome' email campaign by streaming sign-up events from Amplitude to Braze.
2. **Invoice Simple:** Leveraged Event Streaming for a robust engagement campaign, customizing messaging based on a series of events to enhance engagement effectiveness.

### What happens if I don't see an Event streaming destination on Amplitude Catalog?

1. **Webhook streaming** - You can use [Webhook Event streaming](/docs/data/destination-catalog/webhooks) integration to send your Amplitude events and user data to custom webhooks. This allows you to send data to a URL of your choice for various use cases. 
2. **Vendor Switch:** Consider switching to a vendor already integrated with Amplitude, which offers similar functionalities. You can find more information in the Amplitude Catalog [here](https://amplitude.com/integrations).
3. **Self-Build or Vendor Request:** You can either build the integration yourself using the Amplitude Integration Portal or request the vendor to create it through the integration portal. Learn more about the Amplitude Integration Portal [here](/docs/partners/create-an-event-streaming-integration/).

### What's the IP range of your service?

Amplitude data centers use the following IP addresses, depending on their region:

- Amplitude US IP addresses

    - 52.33.3.219
    - 35.162.216.242
    - 52.27.10.221

- Amplitude EU IP addresses

    - 3.124.22.25
    - 18.157.59.125
    - 18.192.47.195
