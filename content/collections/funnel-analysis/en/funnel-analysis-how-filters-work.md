---
id: 633a33f0-1242-4c82-9954-b65cdbbd71d1
blueprint: funnel-analysi
title: 'How filters work in a Funnel Analysis chart'
source: 'https://help.amplitude.com/hc/en-us/articles/14740839213339-How-filters-work-in-a-Funnel-Analysis-chart'
this_article_will_help_you:
  - 'Understand how Amplitude interprets different filters in a Funnel Analysis chart'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717015478
---
There are certain nuances to applying filters in a funnel analysis: 

## Applying filters in the Segmentation Module

In a funnel chart, any filters applied via the Segmentation Module apply only to the first event. You can, however, add filters to individual steps directly in the Events module.

{{partial:admonition type='note'}}
Only users who have triggered an event that meets the conditions of the filters applied to the first event will be counted by Amplitude as entering the funnel.
{{/partial:admonition}}

## Applying group-by filters

You can apply a group-by filter in the Segmentation Module, for up to two properties. The group-by filter will apply only to the first event, similar to the other filters in the Segmentation Module.

If you are looking at the Unique Users metric and users can complete the steps of your funnel multiple times, the group-by filter will take the first occurrence of the event and bucket the user for the value on that event.

{{partial:admonition type='note'}}
If “holding property constant” is applied at the same time, Amplitude counts each property value / user pair as a separate user, so the user is included once for each property value they have.
{{/partial:admonition}}

You can also use the group-by filter for an event (limit of one event group-by per funnel). The results will show how users with a certain event or user property converted through the other steps in the funnel. This helps you understand what property value potentially has the greatest or smallest impact on conversion.

For example, look at this Funnel Analysis chart:

![group-by_events.png](/docs/output/img/funnel-analysis/group-by-events-png.png)

 The *Group-by* here looks at users' property values for `Genre_Type` at the time their `Favorite Song or Video` events are triggered, and shows how they converted through the remaining events of the funnel. 

For example, a user that has a `Pop` property value for `Genre_Type` at the time their `Favorite Song or Video` event was triggered will show up under the `Pop` property bar for the `Play Song or Video` event as well.

{{partial:admonition type='note'}}
If users in your funnel can complete the steps multiple times, this method will take the first occurrence of each event and bucket the user for the value on that event. 
{{/partial:admonition}}

This three-step funnel is grouped by Step 2's event property, `item_id`:

![group_by.png](/docs/output/img/funnel-analysis/group-by-png.png)

The graph shows the conversion distribution of users who triggered Step 2 (`Add Item to Cart`) event, broken out by each `item_id` value.

If you choose to group by a step other than the first, you will also see a segment of users who did not reach that segmented step (the blue-shaded segment for 'did not reach step' in this example).