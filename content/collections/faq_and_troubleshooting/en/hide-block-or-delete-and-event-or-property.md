---
id: 77de4fdf-474c-49fa-9e07-4fc7548ed372
blueprint: faq_and_troubleshooting
title: 'Hide, block, or delete and event or property'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/360059279291'
category: governance
---
For many customers, the differences between hiding, blocking, and deleting an event or property from your tracking plan are not immediately clear. For example, hidden or blocked events and properties will still count towards your project's instrumentation [limit](/docs/faq/limits), whereas deleted events and properties will not. 

![selected event property in data.png](/docs/output/img/faq/selected-event-property-in-data-png.png)

{{partial:admonition type='note'}}
These options will only appear in the menu at the top of [Amplitude Data](/docs/data/index) after you select an event or property. The options will not be visible prior to that.
{{/partial:admonition}}

This article will answer some frequently asked questions about the similarities and differences between each option.

{{partial:collapse name="What is a hidden event or property?"}}
If you **don't** want your users to query on an event or property in Amplitude charts, but **do** still want to collect data for that event or property, consider hiding it.

You can hide an event or property from drop-downs, Pathfinder results, and Personas charts:

* Hiding from drop-downs means you won't be able to select that event or property from drop-down lists in any Amplitude chart.
* If you hide the event or property from Pathfinder or Personas results, that event will not be included in those chart's calculations. However, Amplitude will still ingest the data for the event or property, and it will be queryable again after you unhide it.
{{/partial:collapse}}


{{partial:collapse name="What does blocking an event or property do?"}}
When you block an event or property, you're telling Amplitude you want to continue to query on **historical** data, but would like to stop collecting **new** data for that event or property. This can be helpful if a particular event is causing you to hit your **monthly event volume** limit. 

When you do this, Amplitude will stop ingesting and processing the event or property. Blocked events and properties ingested **prior** to blocking will still be selectable in drop-downs and used in charts. Data from after the block is instituted will **not** appear in user streams or chart results.

Blocking an event or property does not stop you from sending that data to Amplitude, so you will still receive a success response when you send it. However Amplitude will drop that data before the processing stage, and it cannot be recovered.
{{/partial:collapse}}


{{partial:collapse name="What happens to deleted events and properties?"}}
If you've instrumented an event or property that you no longer need, deleting it will help you keep your data structure organized. Too many unnecessary events and properties can lead to hitting your project's instrumentation limit.

As with blocking, Amplitude will no longer collect deleted events and properties, and the data sent after deleting an event or property cannot be recovered. The difference is that deleted events and properties will no longer be available in drop-downs. 

Charts that include the now-deleted event or property will still be available, but you will not be able to include it in any new charts. If you removed the deleted event from a chart, you will not be able to add it back it unless you undelete it. However, deleted events will still appear in chart results, so if you'd like to remove/hide data from charts for a deleted event, please [create a drop filter](/docs/data/remove-invalid-data) prior to deleting the event.
{{/partial:collapse}}


{{partial:collapse name="What are the differences between hiding, blocking, and deleting?"}}
**Table Comparison**

|             | Blocked from Ingestion | Available in data exports | Available in chart dropdowns | Count towards monthly event volume limit | Count towards 2000 event type limit | In Govern         |
| ----------- | ---------------------- | ------------------------- | ---------------------------- | ---------------------------------------- | ----------------------------------- | ----------------- |
| **Blocked** | Yes                    | No                        | Yes                          | No                                       | Yes                                 | All, Blocked      |
| **Deleted** | Yes                    | No                        | No                           | No                                       | No                                  | Deleted           |
| **Hidden**  | No                     | Yes                       | No                           | Yes                                      | Yes                                 | All, Live, Hidden |

{{/partial:collapse}}