---
blueprint: data
title: 'Streaming transformations'
landing: false
exclude_from_sitemap: false
---
Amplitude now provides customers with the ability to stream pre-existing transformed event and event properties. This includes support for Custom Events, Derived Properties, Transformed Events, Transformed Properties. With this feature, you can now select any existing transformations you made in Amplitude taxonomy when setting up your streaming configuration.

## Feature availability

This feature is available with **Amplitude paid plans only**. You will need to be on a PLUS/Growth/Enterprise plan in order to create the corresponding transformations in Amplitude before streaming it out. See the [pricing page](https://Amplitude.com/pricing) for details.

## Setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click on any streaming destination tile. E.g. Braze.
3. Enter a sync name, then click Create Sync.
4. Toggle Status from **Disabled** to **Enabled**.
5. Paste your Server Secret Key.
6. Toggle the Send events.
7. In **Select and filter events** choose which events you want to send. Choose only the events you need in your downstream destinations. In the drop down, you can select any transformed events.
8. (optional) In **Select additional properties**, select any more event properties including transformed event properties you want to send. If you don't select any properties here, Amplitude doesn't send any.
9. (optional) In **Select additional user properties**, select any more user properties you want to send. If you don't select any properties here, Amplitude doesn't send any.
10. When satisfied with your configuration, click Save.

## Example Use cases

1. **Example 1:** A company streams events to AppsFlyer, which requires unique event names for attribution and doesn’t understand event properties. This meant the company had to create custom events in the backend and resend them to Amplitude CDP. With our new feature, the company can now use Amplitude Data to rename their events before sending them to AppsFlyer. This streamlines their process, reducing duplicate ingestions and optimizing event volume.
2. **Example 2:** A company wants to stream derived properties from Amplitude to Braze to improve their campaign effectiveness. Now, they can select derived properties in sync filters and include them when sending additional properties. This means they can run more targeted and efficient campaigns using the enriched event data from Amplitude.

## Considerations

Keep these things in mind when streaming transformations from Amplitude

* You must enable this integration in each Amplitude project you want to use it in.
* Amplitude sends selected event and user properties along with the event.
* Amplitude targets an end-to-end p95 latency of 60s. This means 95% of Events streamed deliver to HubSpot within 60s or less. Amplitude has internal processes, monitors, and alerts in place to meet this target.

## Limitations

There are some limitations when streaming transformations from Amplitude:

* Customers cannot stream **lookup properties** directly. Lookup properties allow customers to upload a .csv file mapping an existing event or user property to a list of new properties, used to add additional properties to already ingested events during query time based on the lookup property. However, these mapped properties are not selectable when setting up the sync in either event filters or when sending additional properties to the destination.
* Customers cannot stream **channel classifiers** directly.  Channels, which act like derived properties applied in real-time when querying, are mainly used by marketers to define their acquisition channels based on UTM and referrer data. Although they are used as a property where values are mapped to specific rules on existing properties, these channel properties are not selectable when setting up the sync in either event filters or when sending additional properties to the destination.
* Streaming transformation is available for all streaming destinations except for [Webhooks](https://Amplitude.com/docs/data/destination-catalog/webhooks), [Amazon Kinesis Firehose](https://Amplitude.com/docs/data/destination-catalog/amazon-kinesis-firehose), [Google PubSub](https://Amplitude.com/docs/data/destination-catalog/google-pub-sub) and Data Warehouse destinations.

## FAQs

This sections covers some frequently asked questions about streaming transformations.


{{partial:collapse name="How can you join this Closed BETA program?"}}
Please email integrations@Amplitude.com with your Organization ID if you're interested in understanding how to get access to this capability.
{{/partial:collapse}}


{{partial:collapse name="Will this impact my event volume streaming limit?"}}
Yes, this will count towards your existing event streaming volume limit. Check your Event streaming limit by navigating to the Settings page and clicking on Plans & Billing. 
{{/partial:collapse}}


{{partial:collapse name="Can I select both the raw event/property in the event streaming drop down??"}}
Customers should be allowed to use both for their streaming sync. For example if three event types are merged into one, there would be 4 event types in the selection dropdown.
{{/partial:collapse}}


{{partial:collapse name="How are custom events and transformed properties handled during streaming"}}
Custom events and transformed properties are handled according to the configurations set in your Amplitude Data taxonomy. The transformations are applied before the data is streamed to the destination.
{{/partial:collapse}}
