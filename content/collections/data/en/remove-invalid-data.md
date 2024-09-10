---
id: 3b46d4e2-2ab2-43e2-bacf-19e133b534cf
blueprint: data
title: 'Remove invalid or incorrect data'
source: 'https://help.amplitude.com/hc/en-us/articles/16805784778907-Remove-invalid-or-incorrect-data'
this_article_will_help_you:
  - 'Understand the difference between drop and block filters'
  - 'Learn how to block and delete events or properties'
  - 'Learn how to remove corrupt data from analysis'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1723653538
---
Data on Amplitude is immutable once ingested. Amplitude Data provides you with several methods to prevent invalid or incorrect data from appearing in your Amplitude analyses. You can create a drop filter, create a block filter, block events and properties, or delete events and properties. This article describes each technique, as well as the differences between them.

## Create a drop filter

You may find you've loaded incorrect data and want to filter it out from queries. Amplitude Data's **drop filters** feature allows you to remove specific event data from your charts at query time. These events aren't deleted, and they can be restored to your charts simply by editing or deleting the drop filter. Drop filters don't apply to data exports.

{{partial:admonition type="note" heading=""}}
As query-side filters that aren't applied during data ingestion, drop filters **don't affect** your event volume limit.
{{/partial:admonition}}

To create a drop filter, follow these steps:

1. Make sure you’re on `main`, as filters aren't accessible from any other branch
2. In the left-hand sidebar, click *Filters*, then select the *Drop Filters* tab.
3. Click *+ Create Drop Filter* to open the Filter Configuration fly-out panel.
4. Click *Select event ...* to choose the event you want to filter on.
5. Optionally, click *+ where* to include any relevant properties that will refine your filter. For example, perhaps you want to filter out all purchase events that come from a specific geographical location. Simply select that location from the list of properties and set the evaluation to `is not equal`.  
6. Specify the time range for the events you’d like Amplitude Data to drop-filter out.  
  
7. When you’re ready, click *Drop Data* to initiate the drop filter.

If you want to edit or delete a drop filter, click on its name in the drop filter list. In the fly-out panel that appears on the right, make your edits and click *Update Drop Filter*.

{{partial:admonition type="note" heading="Drop filter details"}}
There are some things about drop filters to keep in mind:
* Drop filters don't affect event streams.
* You must use the **same operator** across all selected properties.
* You can **mix and match** event and user properties.
* You can have a maximum of **three properties**.
* You can't use any property **more than once**.
{{/partial:admonition}}

## Create a block filter

Block filters enable you to stop data ingestion for events and properties that you specify based on criteria you define. Blocking Amplitude from ingesting data can help you you need to act quickly before you update your code.

Block filters enable you to:

- Block events based on an event property or Amplitude property. For example, events from a specific data source.
- Block events from a specific IP address or set of IP addresses. Use this to block traffic from a test server or bad actor.
- Block events from a specific version of your application to help find and fix instrumentation issues.
- Block event or user properties that start with a particular string, or properties with numeric names to help uncover instrumentation issues.
- Block bot traffic from websites.

When you add or remove a block filter, allow up to 10 minutes for the change to take effect. As soon as the filter is active, it blocks Amplitude from ingesting matching data.

{{partial:admonition type="warning" heading=""}}
Amplitude doesn't collect data for blocked events or properties. As a result, you can't recover information about blocked data at a later time, because Amplitude never ingests it. If you think you may need data at some point in the future, consider hiding the event or property instead.
{{/partial:admonition}}

To create a block filter:

1. Ensure you're on your project's `main` branch in Data.
2. Click *Filters* in the side navigation.
3. Click *+ Create Block Filter*.
4. Specify the project and data type (Events, Event properties, User properties, or Bot traffic). If applicable, use the available filtering parameters.
5. Click *Block Data* to initiate the block filter.

### Block events based on property values

Block events based on the value of up to three event properties.

When you block events based on property values, Amplitude compares your filter against the raw stringified values sent to Amplitude. Knowing the data type is important in the following scenarios:

- Boolean values: If you send a property as `true` or `false`, Amplitude displays the value as "True" or "False". To use this in a Block filter, you need to specify the exact value sent as a string. In this case, `true` or `false`.
- Array values: Amplitude splits arrays into separate values for querying. Block filters compare against the stringfied raw value.

To find raw property values, use the [Event Explorer](/docs/analytics/charts/event-explorer) to view an example of the event you want to block.

### Block events and properties from your plan

Create Block filters from your Events or Properties list.

1. Ensure you're on your project's `main` branch.
2. In Data, navigate to the Events or Properties tab.
3. Select the Events or Properties you want to block.
4. Once selected, click Block to create the filter, and confirm the block.
5. To unblock a blocked event, repeat the previous steps and click Unblock.

{{partial:admonition type="note" heading=""}}
Custom events are a virtual grouping of your ingested events, aren't blockable. Instead, block the indivdual events that make up the custom event.
{{/partial:admonition}}

## Block events and properties

You can prevent Amplitude Data from ingesting data on a specific event, event property, or user property by blocking it. Amplitude Data immediately stops processing data for that event or property until you decide to unblock it.

{{partial:admonition type="warning" heading=""}}
Because Amplitude Data doesn't ingest any data for blocked events or properties, this means you **can't recover** **any information** about them at any future date. If you don't wish to display a specific event or property but think you may someday need this data, consider **hiding** the event or property instead.
{{/partial:admonition}}

To block an event or property, follow these steps:

1. Make sure you're in the `main` branch. You can only block events and properties from there.
2. Navigate to *Events* or *Properties*, depending on which one you’d like to block.
3. Find the event or property you want to block and click the checkbox next to its name.
4. If blocking an event, click the *Block* drop down menu, and choose either *Block now* or *Schedule for blocking*. If blocking a property, click **Block**.
5. A confirmation modal will appear. If you are sure you still want to block the event or property, click *Block*.
6. To unblock a blocked event, follow steps 1-5 and click *Unblock* instead of *Block*.

{{partial:admonition type="note" heading=""}}
You can't block **custom** events.
{{/partial:admonition}}

## Delete events and properties in Amplitude Data

If you ingest events or properties that you no longer need, you can delete them from your plan.

When you delete an event or property, Amplitude blocks it from future ingestion and removes it from chart drop-downs to prevent future querying. The event or property doesn't count toward your monthly event volume or instrumentation limit.

Deleting an event or property doesn't remove historical data. Charts that reference a deleted event load with data from before you deleted the event and indicates the event is deleted. 

Deleted user properties still appear on events that are already ingested, and you can still see them in historical user stream data.

To delete an event or property:

1. Navigate to the Events or Properties section of Amplitude Data.
2. Find the events or event properties you want to delete and click the checkboxes next to their names.
3. Click Delete.
4. Complete the verification modal.

You can undelete a deleted event or property.

1. From the status filter drop-down, select Deleted to see your deleted events or properties.
2. Find the items you want to restore and click the checkboxes next to their names.
3. Click Restore.

## Delete an entire user

You may want to delete a user entirely. You can do so with the [User Privacy API](https://www.docs.developers.amplitude.com/analytics/apis/user-privacy-api/). This API lets you delete a user, their events, and any associated data, and will help you keep compliant with data laws and regulations.
