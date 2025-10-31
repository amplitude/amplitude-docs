---
id: 1e47bc76-6edc-4391-afdf-16d74db2fd7a
blueprint: funnel-analysi
title: 'How Amplitude computes funnels'
source: 'https://help.amplitude.com/hc/en-us/articles/19458087881627-How-Amplitude-computes-funnels'
this_article_will_help_you:
  - 'Understand how Amplitude computes funnels based on of the order of events, segmentation, and filters'
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1760632051
landing: true
landing_blurb: 'Understand how Amplitude computes funnels based on of the order of events, segmentation, and filters'
academy_course:
  - 7d137320-f0f2-4b00-8f77-2f2adb07de68
---
Unlike other charts, a Funnel Analysis requires you to specify the order of the events you include in the Events Module. Your options are:

| Order       | Definition                                                                                                                                                                         |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Any order   | Amplitude considers a user converted when they completes all listed steps.                                                                                                         |
| This order  | Amplitude considers a user converted when they complete steps in the order you specify. They can trigger events in between those that you specify and still count as a conversion. You can add repeated steps with this option. |
| Exact order | Similar to *This order*, Amplitude considers a user converted when they complete steps in the order you specify, but don't trigger events in between.                              |


{{partial:admonition type='note'}}
In ordered funnels, events are unique per conversion path. For example, you have a funnel with two events: `search -> add to cart`. A user searches four times and then adds a product to their cart after that last search `search, search, search, search, add to cart`. Amplitude records one conversion, even though there were four occurrences of the funnel's first step.
{{/partial:admonition}}

## Segmentation

When you [segment the data on a user property](/docs/analytics/charts/build-charts-add-events), Amplitude will apply the segmentation to the first step of your funnel.

For example, suppose Event A is the first step of your funnel, and a user triggered:

* Event B with the user property `[Amplitude] Country` = `Canada`; and then
* Event A with the user property `[Amplitude] Country` = `United
 States`

If you segment by country, Amplitude shows this user in the `[Amplitude] Country` = `United States` segment in the Event A step.

## Filters

There are certain nuances to applying filters in a funnel analysis: 

### Applying filters in the Segmentation Module

In a funnel chart, any filters applied from the Segmentation Module apply only to the first event. You can, however, add filters to individual steps directly in the Events module.

{{partial:admonition type='note'}}
Only users who have triggered an event that meets the conditions of the filters applied to the first event will be counted by Amplitude as entering the funnel.
{{/partial:admonition}}

### Applying group-by filters

You can apply a group-by filter in the Segmentation Module, for up to two properties. The group-by filter will apply only to the first event, similar to the other filters in the Segmentation Module.

If you are looking at the Unique Users metric and users can complete the steps of your funnel multiple times, the group-by filter takes the first occurrence of the event and buckets the user for the value on that event.

{{partial:admonition type='note'}}
If "holding property constant" is applied at the same time, Amplitude counts each property value / user pair as a separate user, so the user is included once for each property value they have.
{{/partial:admonition}}

You can also use the group-by filter for an event (limit of one event group-by per funnel). The results will show how users with a certain event or user property converted through the other steps in the funnel. This helps you understand what property value has the greatest or smallest impact on conversion.

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

If you choose to group by a step other than the first, Amplitude shows a segment of users who didn't reach that segmented step (the blue-shaded segment for `did not reach step` in this example).