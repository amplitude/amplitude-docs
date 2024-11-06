---
id: 0a282ff3-e487-45bd-af38-dbad6c534de2
blueprint: data
title: 'Streaming transformations'
landing: false
exclude_from_sitemap: false
---
Amplitude supports streaming pre-existing transformed events and event properties. This includes support for Custom Events, Derived Properties, Transformed Events, and Transformed Properties. With this feature, you can select any existing transformations you made in Amplitude taxonomy when setting up your streaming configuration.

## Feature availability

This feature is available on Plus, Growth, or Enterprise plans. For more information, see the [pricing page](https://amplitude.com/pricing).

## Setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click on any streaming destination tile.
3. Enter a sync name, then click Create Sync.
4. Toggle Status from **Disabled** to **Enabled**.
5. Paste your Server Secret Key.
6. Toggle the Send events.
7. In **Select and filter events** choose which events you want to send. Choose only the events you need in your downstream destinations. In the drop down, you can select any transformed events.
8. (optional) In **Select additional properties**, select any more event properties including transformed event properties you want to send. If you don't select any properties here, Amplitude doesn't send any.
9. (optional) In **Select additional user properties**, select any more user properties you want to send. If you don't select any properties here, Amplitude doesn't send any.
10. When satisfied with your configuration, click Save.

## Example use cases

1. **Example 1:** If you stream events to AppsFlyer, which requires unique event names for attribution and doesn’t understand event properties, you had to create custom events in the backend and resend them to Amplitude CDP. With this feature, you can now use Amplitude Data to rename your events before sending them to AppsFlyer. This streamlines your process, reducing duplicate ingestion and optimizing event volume.
2. **Example 2:** If you want to stream derived properties from Amplitude to Braze to improve your campaign effectiveness, you can now select derived properties in sync filters and include them when sending more properties. This means you can run more targeted and efficient campaigns using the enriched event data from Amplitude.

## Considerations

Keep these things in mind when streaming transformations from Amplitude:

* Amplitude sends selected event and user properties along with the event.
* Amplitude targets an end-to-end p95 latency of 60s. This means 95% of Events streamed from Amplitude within 60s or less. Amplitude has internal processes, monitors, and alerts in place to meet this target.

## Limitations

There are some limitations when streaming transformations from Amplitude:

* When changing the names of custom events or derived properties, don't forget to update any existing sync configs that use them. Syncs require up-to-date event and property names in order to work properly. Note that this only applies to the name of the transformation: changing the underlying definition of a custom event or derived property doesn't affect syncing.
* You can't stream **lookup properties** directly. Lookup properties allow you to upload a .csv file mapping an existing event or user property to a list of new properties, used to add more properties to already ingested events during query time based on the lookup property. However, these mapped properties aren't selectable when setting up the sync in either event filters or when sending more properties to the destination.
* You can only stream **channel classifiers** directly by requesting it from Amplitude. Channels, which act like derived properties applied in real-time when querying within Amplitude, are mainly used by marketers to define their acquisition channels based on UTM and referrer data. Although they're used as a property where values map to specific rules on existing properties, these channel properties can't be selected when setting up the sync in either event filters, or when sending more properties to the destination, unless you've explicitly enabled this feature.
* Streaming transformation is available for all streaming destinations except for Data Warehouse destinations.

## FAQ


{{partial:collapse name="Will this impact my event volume streaming limit?"}}
Yes, this counts towards your existing event streaming volume limit. Check your event streaming limit by navigating to the Settings page and clicking on Plans & Billing.
{{/partial:collapse}}


{{partial:collapse name="Can I select both the raw event/property in the event streaming drop down?"}}
You can use both for your streaming sync. For example, if three event types are merged into one, there would be four event types in the selection dropdown.
{{/partial:collapse}}


{{partial:collapse name="How are custom events and transformed properties handled during streaming?"}}
Custom events and transformed properties follow the configurations set in your Amplitude Data taxonomy. The transformations are applied before the data is streamed to the destination.
{{/partial:collapse}}


{{partial:collapse name="How can I enable channel classifiers for my event stream?"}}
Support for selecting channel classifiers in the event streaming sync config is available on request. Email integrations@Amplitude.com with your organization ID and app IDs for access.
{{/partial:collapse}}