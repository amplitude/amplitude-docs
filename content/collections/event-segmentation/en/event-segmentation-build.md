---
id: 61370d33-6a3c-41a3-ba21-85ccaf8e861b
blueprint: event-segmentation
title: 'Build an event segmentation analysis'
source: 'https://help.amplitude.com/hc/en-us/articles/360052274852-Build-an-event-segmentation-analysis'
this_article_will_help_you:
  - 'Use events and properties to create an Event Segmentation analysis'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1744389533
landing: true
landing_blurb: 'Use events and properties to create an Event Segmentation analysis'
academy_course:
  - 49a7ec41-cae7-4f77-8f8f-e0a5101ce1df
ai_summary: "The Event Segmentation chart in Amplitude lets you analyze top events, user event triggers, unique users, and user event tendencies. You can combine events, properties, and user segments to build detailed analyses. The feature is available on all Amplitude plans. To set up an event segmentation analysis, select events, add properties, measure results, and define user segments. Customize your chart's Y-axis for better viewability by setting axis values, unit of measure, and adding a second Y-axis if needed. Dual Y-axis is available on event segmentation line charts for improved visibility."
---
For most users, Event Segmentation is the foundational Amplitude chart. It shows what your users are doing in your product. With the **Event Segmentation chart**, you can build analyses that:

* Measure the top events performed over a selected time period
* Analyze how often users trigger events
* Determine the count of unique users triggering events in your product
* Clarify which users tend to trigger certain events

Like most Amplitude charts, Event Segmentation charts combine events and event properties with user segments. These can be simple—like, for example, counting the number of users firing a specific event—or they can be intricate formulas of events. 

This article describes the steps required to build a segmentation analysis in Amplitude.

### Feature availability

This feature is available to users on **all Amplitude plans**. See the [pricing page](https://amplitude.com/pricing) for more details.

## Before you begin

If you haven’t already read up on the basics of [building charts in Amplitude](/docs/analytics/charts/build-charts-add-events), you should do so before proceeding.

See this article to read about [selecting the best measurement for your Event Segmentation chart](/docs/analytics/charts/event-segmentation/event-segmentation-choose-measurement).

## Set up an event segmentation analysis

An event segmentation analysis shows what different groups of users are doing in your product. You’ll need to tell Amplitude what events you're interested in, and which users it should include in the analysis.

{{partial:admonition type='note'}}
You can include both active and inactive events in your segmentation analyses, but most customers find their Amplitude charts are more insightful when they focus on active events.
{{/partial:admonition}}

To build an Event Segmentation chart, follow these steps:

1. In the Events Module, select the starting event or metric. You can choose a specific event that's instrumented in Amplitude, or you can tell Amplitude to consider any event as the starting event for this analysis, by selecting *Any Event* from the list of available events.  
  
    You can also [create an in-line custom event](/docs/analytics/charts/event-segmentation/event-segmentation-in-line-events) or [create a new metric](/docs/analytics/charts/data-tables/data-tables-create-metric) at this point, if you need to.

2. If desired, add properties to your starting event by clicking on *+ Filter by*, selecting the property name, and specifying the property value you’re interested in.

    {{partial:admonition type='note'}}
    The list of property values includes those ingested into your project during the last 30 days.
    {{/partial:admonition}}
   
3. Next, select another event to include, if desired. You can choose up to ten, and you can add properties to these events as well.

4. In the Measured As Module, specify how you'd like to measure your results. Unique users and event totals are the most commonly used, but you have several other options to select from.

5. In the Segmentation Module, identify the user segment you want to include in this analysis. You can import a already saved segment by clicking *Saved* and selecting the one you want from the list. Otherwise, Amplitude begins from the assumption that your analysis targets all users.  
  
    {{partial:admonition type='note'}}
    The user segment you select applies to all selected events.
    {{/partial:admonition}}

6. If you don't want to import an already saved user segment, you can start building your own by adding properties. To do so, click *+ Filter by*, choose the property you want to include, and specify the property value you’re interested in.

7. You can narrow your focus even further by telling Amplitude you only want to include users who have already performed certain actions. To do so, click *+ Performed*, then choose the event you’re interested in.

8. If desired, add another user segment by clicking *+ Add Segment*, and repeating steps 6 and 7.

{{partial:admonition type='note'}}
You can break out your starting event by user properties by clicking *Group segment by* in the Segmentation Module, if desired. For example, if you wanted to group users by the cities they were in when they triggered the starting event, you would select *City* from the property list. Amplitude breaks out the segmentation analysis on a city-by-city basis.
{{/partial:admonition}}

In the chart area, you should now see your Event Segmentation chart, along with a tabular view of your results. 

## Customize your chart's Y-axis

If the data that comprises your chart doesn't fit the default scale, you can customize the chart's Y-axis for better viewability.

To customize the Y-axis, click it on the chart. The Custom Y-axis modal appears.

{{partial:admonition type="note" heading="Applicable chart types"}}
Y-axis customization is available for Event Segmentation charts.
{{/partial:admonition}}

### Axis name and values

By default, the Y-axis name comes from the measurement that's displayed. For example, if your chart displays event totals, the axis name is `Totals`. In cases where you need to share the chart or otherwise provide more context, enter a more descriptive name.

To help the data fit more cleanly on the chart, you can set minimum and maximum values. By default, a chart's Y-axis starts at zero. Sometimes, your data might be in a small range, but with higher value.

In the examples below, the chart on the left uses the default axis values, and the chart on the right has the minimum set to `10000` and the maximum set to `15000`.

![](statamic://asset::help_center_conversions::event-segmentation/y-axis-scale.png)

Enable **Display data out of the min and max value** to ensure that if any data falls out of the range you set, it still appears on the chart. Otherwise, chart data extends 

Customize the unit of measure that displays for a chart to ensure that the chart represents the data most accurately. Choose from:

- Raw number
- Percent
- Currency (defaults to the [currency set at the project level](/docs/admin/account-management/currency-unit))
- Custom (add a prefix or suffix)

### Add a second Y-axis

If the chart displays more than one event, add a second Y-axis to ensure best visibility. For example, on a chart that tracks Weekly Active Users, if you add a second event that measures new users, you add a second Y-axis to ensure best visibility for both.

In this example, Weekly Active Users, measured by `Any Active Event` falls in the range of 12,000 - 13,500. Weekly New Users, has a range between 5500, and 6000. The addition of a second Y-axis ensures that both events display with enough granularity to observe increases and decreases over time.

![](statamic://asset::help_center_conversions::event-segmentation/dual-y-axis.png)

The second Y-axis supports the same customization options as the primary Y-axis.

{{partial:admonition type="note" heading="Dual Y-axis availability"}}
Dual-Y axis is available on event segmentation line charts.
{{/partial:admonition}}