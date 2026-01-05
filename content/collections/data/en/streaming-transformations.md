---
id: 0a282ff3-e487-45bd-af38-dbad6c534de2
blueprint: data
title: 'Streaming transformations'
landing: false
exclude_from_sitemap: false
---
Amplitude supports streaming transformed data to your destinations, including Custom Events, Derived Properties, Transformed Events, and Transformed Properties. You can select any transformation from your Amplitude taxonomy when configuring event streaming.

## Setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click on any streaming destination tile.
3. Enter a sync name, then click Create Sync.
4. Toggle Status from **Disabled** to **Enabled**.
5. Paste your destination's Server Secret Key.
6. Toggle **Send events** to enable event streaming.
7. In **Select and filter events**, choose which events to send. Select only the events needed for your downstream destination. The dropdown includes any transformed events from your taxonomy.
8. (*optional*) In **Select additional properties**, select any event properties (including transformed event properties) to include. By default, Amplitude doesn't send any additional properties unless you explicitly select them.
9. (*optional*) In **Select additional user properties**, select any user properties to include. By default, Amplitude doesn't send any additional user properties unless you explicitly select them.
10. When satisfied with your configuration, click **Save**.

## Example use cases

### Streaming renamed events to AppsFlyer

AppsFlyer requires unique event names for attribution and doesn't support event properties. Previously, you had to create custom events in your backend and resend them to Amplitude. Now, you can use Amplitude Data to rename events before streaming them to AppsFlyer, which reduces duplicate ingestion.

### Streaming derived properties to Braze

To improve campaign effectiveness, you can stream derived properties from Amplitude to Braze. Select derived properties in your sync filters and include them when configuring additional properties. This enables more targeted campaigns using enriched event data from Amplitude.

## Considerations

Keep these things in mind when streaming transformations from Amplitude:

* Amplitude sends selected event and user properties along with the event.
* Amplitude targets an end-to-end p95 latency of 60 seconds. This means Amplitude streams 95% of events within 60 seconds. Amplitude has internal processes, monitors, and alerts in place to meet this target.

## How transformations are structured in the payload

The streaming payload includes transformations as nested JSON fields. Understanding this structure is essential when using custom FTL (FreeMarker Template Language) templates or configuring how your destination receives data.

### Selection requirement

You must explicitly select transformations in your sync configuration to include them in the streaming payload. You can select transformations in:

* **Select and filter events** - For example, filtering events where a derived property isn't `null`
* **Select additional properties** - To include specific transformed properties
* **Map properties to destination** - When mapping properties to your destination's schema (if applicable)

The streaming payload only includes transformations you explicitly select.

### JSON structure

The payload includes transformations as nested JSON objects. The top-level field name depends on the transformation type:

| Transformation Type | Top-level JSON Field Name |
|---------------------|---------------------------|
| Merged properties | N/A (replaced in original field) |
| Derived properties | `derived_properties` |
| Channel properties | `derived_properties` |
| Lookup properties | `lookup_properties` |

Field names within these objects match the transformation names shown in the Amplitude UI.

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

* When you rename custom events or derived properties, update any existing sync configurations that reference them. Syncs require current event and property names to work properly. Note: Changing the underlying definition of a transformation doesn't affect syncing—only name changes require sync updates.
* **Lookup properties**: You can stream lookup properties by requesting access from Amplitude. Lookup properties map existing event or user properties to new properties using a CSV file upload, and can enrich already-ingested events at query time.
  * Lookup property files with over 1000 rows won't display in the streaming setup.
  * After saving a lookup property file, it can take up to 1 hour to populate into the streaming system.
* **Channel classifiers**: Streaming channel classifiers requires requesting access from Amplitude. Channels act like derived properties applied in real-time during queries, and are primarily used by marketers to define acquisition channels based on UTM and referrer data. By default, you can't select channel properties in sync configuration (event filters or additional properties) unless this feature is explicitly enabled for your organization.
* Streaming transformations are available for all streaming destinations except Data Warehouse destinations.
* The streaming setup doesn't support the following transformation types:
  * Custom events that don't meet the criteria in the [Supported custom events](#supported-custom-events) section.
  * Group properties.
  * Cart properties.
  * Nested properties (for example, derived properties that rely on other derived properties). Exception: The UI allows selecting nested properties based on merged or cart properties, but these won't work in practice.

## FAQ


{{partial:collapse name="Will this impact my event volume streaming limit?"}}
Yes, this counts towards your existing event streaming volume limit. Check your event streaming limit by navigating to the Settings page and clicking on Plans & Billing.
{{/partial:collapse}}


{{partial:collapse name="Can I select both raw and transformed events/properties?"}}
Yes, you can select both raw and transformed versions in your streaming sync. For example, if three event types are merged into one transformed event, all four event types (the three originals plus the merged version) appear in the selection dropdown.
{{/partial:collapse}}


{{partial:collapse name="How are custom events and transformed properties handled during streaming?"}}
Custom events and transformed properties follow the configurations set in your Amplitude Data taxonomy. The transformations are applied before the data is streamed to the destination.
{{/partial:collapse}}


{{partial:collapse name="How can I enable channel classifiers for my event stream?"}}
Support for selecting channel classifiers in event streaming sync configurations is available on request. Email integrations@amplitude.com with your organization ID and app IDs to request access.
{{/partial:collapse}}
