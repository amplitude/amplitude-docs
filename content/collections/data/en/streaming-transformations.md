---
id: 0a282ff3-e487-45bd-af38-dbad6c534de2
blueprint: data
title: 'Streaming transformations'
landing: false
exclude_from_sitemap: false
---
Amplitude supports streaming pre-existing transformed events, event properties and user properties. This includes support for Custom Events, Derived Properties, Transformed Events, and Transformed Properties. With this feature, you can select any existing transformations you made in Amplitude taxonomy when setting up your streaming configuration.

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

1. **Example 1:** If you stream events to AppsFlyer, which requires unique event names for attribution and doesn’t understand event properties, you had to create custom events in the backend and resend them to Amplitude Activation. With this feature, you can now use Amplitude Data to rename your events before sending them to AppsFlyer. This streamlines your process, reducing duplicate ingestion and optimizing event volume.
2. **Example 2:** If you want to stream derived properties from Amplitude to Braze to improve your campaign effectiveness, you can now select derived properties in sync filters and include them when sending more properties. This means you can run more targeted and efficient campaigns using the enriched event data from Amplitude.

## Considerations

Keep these things in mind when streaming transformations from Amplitude:

* Amplitude sends selected event and user properties along with the event.
* Amplitude targets an end-to-end p95 latency of 60s. This means 95% of Events streamed from Amplitude within 60s or less. Amplitude has internal processes, monitors, and alerts in place to meet this target.

## How transformations are structured in the payload

When you forward transformations to a destination, they're included as separate nested JSON fields in the payload. This is important to understand if you're using custom FTL (FreeMarker Template Language) templates or need to know how your destination receives the data.

### Selection requirement

To forward a transformation, you must first select it in your sync configuration. You can select transformations in:

* The **Select and filter events** section (for example, filtering where a derived property is not null)
* The **Select additional properties** section
* The **Map properties to destination** section (if applicable)

Only transformations that you explicitly select are included in the streaming payload.

### JSON structure

When transformations are attached to the payload, they're added as nested JSON objects. The top-level field name depends on the type of transformation:

| Transformation Type | Top-level JSON Field Name |
|---------------------|---------------------------|
| Merged properties | N/A (replaced in original field) |
| Derived properties | `derived_properties` |
| Channel properties | `derived_properties` |
| Lookup properties | `lookup_properties` |

The child field names within these objects match the transformation names displayed in the Amplitude UI.

### Example payload

If you select a derived property called `sample_derived_property_key1`, the streaming payload looks like this:

```json
{
  "event_type": "Button Clicked",
  "user_id": "12345",
  "derived_properties": {
    "sample_derived_property_key1": "whatever_value"
  }
}
```

### Using transformations with custom FTL

If your destination uses custom FTL templates, you can access transformation data using these patterns.

**Example 1: Using FtlUtils to serialize derived properties**

```ftl
<#assign UtilClass=statics['com.amplitude.integrations.connector.utils.FtlUtils']>
{
  "version": "derived_properties_sample_ftl1",
  "derived_properties": ${UtilClass.toJson(input.derived_properties)}
}
```

**Example 2: Manually iterating over derived properties**

```ftl
<#assign UtilClass=statics['com.amplitude.integrations.connector.utils.FtlUtils']>
{
  "version": "derived_properties_sample_ftl2",
  "derived_properties": {
    <#list input.derived_properties?keys as key>
      "${key}": "${input.derived_properties[key]}"<#sep>,</#sep>
    </#list>
  }
}
```

## Supported custom events

Amplitude supports streaming custom events that meet specific criteria. When you create custom events in the Amplitude taxonomy, you can select them for event streaming if they're configured with:

* **Supported properties:** User properties and event properties only
* **Supported operators:** `is`, `is not`, `contains`, and `does not contain`

Custom events that use other property types or operators aren't available for selection in event streaming configurations.

## Limitations

There are some limitations when streaming transformations from Amplitude:

* When changing the names of custom events or derived properties, don't forget to update any existing sync configs that use them. Syncs require up-to-date event and property names to work properly. Note that this only applies to the name of the transformation: changing the underlying definition of a custom event or derived property doesn't affect syncing.
* You can stream lookup properties directly by requesting them from Amplitude and then using them to filter events. Lookup properties let you upload a .csv file that maps an existing event or user property to a list of new properties. You can also use it to add more properties to already ingested events during query time based on the lookup property.
  * The streaming setup won't display lookup property files over 1000 rows
  * After saving the file, the lookup property can take up to 1 hour to populate into streaming system.
* You can only stream **channel classifiers** directly by requesting it from Amplitude. Channels, which act like derived properties applied in real-time when querying within Amplitude, are mainly used by marketers to define their acquisition channels based on UTM and referrer data. Although they're used as a property where values map to specific rules on existing properties, these channel properties can't be selected when setting up the sync in either event filters, or when sending more properties to the destination, unless you've explicitly enabled this feature.
* Streaming transformation is available for all streaming destinations except for Data Warehouse destinations.
* Streaming setup does not allow the selection of unsupported trnasformations. This includes but not limited to:
  * Custom events that don't meet the criteria in the [Supported custom events](#supported-custom-events) section
  * Group property
  * Cart property
  * Nested property (e.g. derived property relying on merged property): the exception is nested property based on merged/cart property, UI can select them but they indeed will not work

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
