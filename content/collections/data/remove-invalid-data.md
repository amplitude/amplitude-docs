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
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717620767
---
Data on Amplitude is immutable once ingested. Amplitude Data provides you with several methods to prevent invalid or incorrect data from appearing in your Amplitude analyses. You can create a drop filter, create a block filter, block events and properties, or delete events and properties. This article describes each technique, as well as the differences between them.

## Create a drop filter

In some cases, you may find you've loaded incorrect data and want to filter it out from queries. Amplitude Data's **drop filters** feature allows you to remove specific event data from your charts at query time. These events are not deleted, and they can be restored to your charts simply by editing or deleting the drop filter. Drop filters do not apply to data exports.

{{partial:admonition type="note" heading=""}}
As query-side filters that are not applied during data ingestion, drop filters **do not affect** your event volume limit.
{{/partial:admonition}}

To create a drop filter, follow these steps:

1. Make sure you’re on `main`, as filters are not accessible from any other branch
2. In the left-hand sidebar, click *Filters*, then select the *Drop Filters* tab.
3. Click *+ Create Drop Filter* to open the Filter Configuration fly-out panel.
4. Click *Select property …* to include any relevant properties that will refine your filter. For example, perhaps you want to filter out all purchase events that come from a specific geographical location. Simply select that location from the list of properties.  
  
    {{partial:admonition type="note" heading=""}}
    Use exact strings to match values as you cannot use comparative operators (such as "Contains") for drop filters.
    {{/partial:admonition}}

5. Specify the time range for the events you’d like Amplitude Data to drop-filter out.  
  
6. When you’re ready, click *Drop Data* to initiate the drop filter.

If you want to edit or delete a drop filter, click on its name in the drop filter list. In the fly-out panel that appears on the right, make your edits and click *Update Drop Filter*.

{{partial:admonition type="note" heading=""}}
Drop filters do not affect the user activity view.
{{/partial:admonition}}

## Create a block filter

You can also set up a block filter. This differs from a drop filter in that data filtered out by a drop filter is recoverable, while any **data filtered out by a block filter cannot be recovered** because it is never ingested in the first place.

You can use a block filter to block individual events or properties, but it’s especially useful for **blocking data by IP address**.

If you are using a block filter to block specific events or properties, you should also **update your instrumentation** so that it no longer sends the unwanted data.

To create a block filter, follow these steps:

1. Make sure you’re on `main`, as filters are not accessible from any other branch
2. In the left-hand sidebar, click *Filters*, then select the *Block Filters* tab.
3. Click *+ Create Block Filter* to open the Filter Configuration fly-out panel.
4. Specify whether you want to filter events, event properties, or user properties.
5. Specify whether the filter will be applied on the basis of event or property name; IP address; or version. Then set the rest of the filter’s parameters.  
  6. When you’re ready, click *Block Data* to initiate the block filter.

## Block events and properties

You can prevent Amplitude Data from collecting data on a specific event, event property, or user property by blocking it. Amplitude Data will immediately stop processing data for that event or property until you decide to unblock it.

{{partial:admonition type="warning" heading=""}}
Because Amplitude Data does not collect any data for blocked events or properties, this means you **cannot recover** **any information** about them at any future date. If you do not wish to display a specific event or property but think you may someday need this data, consider **hiding** the event or property instead.
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

If you ever outgrow events or properties that are part of your Amplitude Data tracking plan, you can easily delete them.

Deleting an event will block the event from ingestion and remove the event from chart drop-downs, meaning you will no longer be able to query on the event. Keep in mind that when you delete an event or event property, it will still appear in your historical data. Deleting an event simply means that Amplitude will no longer collect data for that event, and that the event will no longer count toward your monthly event volume or instrumentation [limit](https://help.amplitude.com/hc/en-us/articles/115002923888). You should also update your instrumentation to stop sending the deleted event type.

Deleting a user property will **not** remove the property from events that have already been ingested. This means that past events in a user's event stream will still contain the user property data.

{{partial:admonition type="note" heading=""}}
You can't delete events or properties in `main`.
{{/partial:admonition}}

To delete events and event properties you no longer need, follow these steps:

1. Create a new branch, or open an existing branch that isn't `main`.
2. Find the events or event properties you want to delete and click the checkboxes next to their names.
3. Click *Delete*.
4. A verification modal will appear, instructing you to type in a confirmation phrase to continue with the deletion process. Type it in the text box and click *Delete*.

![delete_one_event_data.png](/output/img/data/delete-one-event-data-png.png)


If you change your mind after you've deleted an event or property, you can easily undelete it. To do so, follow these steps:

1. From the status filter drop-down, select *Deleted*. This will limit your view to deleted events.
2. Find the items you want to undelete and click the checkboxes next to their names.
3. Click *Undelete.*

## Delete an entire user

You may want to delete a user entirely. You can do so with the [User Privacy API](https://www.docs.developers.amplitude.com/analytics/apis/user-privacy-api/). This API lets you delete a user, their events, and any associated data, and will help you keep compliant with data laws and regulations.