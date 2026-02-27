---
id: 5aca2f50-8212-432f-b161-41319f88d8ac
blueprint: event-segmentation
title: 'Interpret your analysis, part 1'
source: 'https://help.amplitude.com/hc/en-us/articles/360035355132-Interpret-your-event-segmentation-analysis-part-1'
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1760632469
landing: true
landing_blurb: 'Understand what your Event Segmentation analysis is telling you'
academy_course:
  - 49a7ec41-cae7-4f77-8f8f-e0a5101ce1df
---
Amplitude's **Event Segmentation** chart helps you understand what specific groups of users are doing in your product. For example, in an event segmentation analysis, you can:

* Identify the top events fired over a selected time
* Compare event totals to each other
* View which users fire certain events

## Before you begin

Familiarize yourself with the basics of [building charts in Amplitude](/docs/analytics/charts/build-charts-add-events), as well as how to create an [Event Segmentation](/docs/analytics/charts/event-segmentation/event-segmentation-build) chart.

## Interpret your Event Segmentation chart

Event Segmentation is Amplitude's most commonly used chart. This article explores these features and explain how you can best put it to use to generate insights on user behavior.

### Breakdown table

Below the chart, there's a breakdown table. By default, Amplitude includes all top values or events in this table, which update automatically when Amplitude receives new top values or events. You can turn this off by first deselecting the segments and then explicitly selecting the values and events you want to keep.

### Change your chart view

Whichever metric you choose, you have several options for displaying results on the chart. 

* The default setting is a basic **line chart**. These are useful for looking at the trend of one event for one user category over time.
* **Stacked area charts** are useful when you’re looking at data that breaks down into discrete buckets, like when you’re analyzing multiple events.
* **Bar charts** are good for situations when you want to show a distribution of data points, or compare metric values across different segments of your data. Bar charts make it easy to see which values are highest or most common, and how specific groups compare against the rest.
* A **stacked bar chart** shows how broad categories or buckets divide into smaller ones, as well as the relationship each of those smaller parts has to the overall total.
* A **Pie chart** displays each result as a percentage of the total.
* **KPI** displays a grid with the current total values, or average values over a time range you select.

If your analysis uses multiple group-by conditions, the resulting visualization might turn out confusing and hard to interpret. 

For example, here the control panel groups the `Play Song or Video` event by `Genre_Type`, with segmentation by `Country` and `Platform`.

![interpret_event_seg_4a.png](/docs/output/img/event-segmentation/interpret-event-seg-4a-png.png)

While it’s not specifically a chart type, the **group by** visualization will clarify your data in these circumstances. With more than one group by or segmentation, the resulting chart is difficult to understand.

![interpret_event_seg_5.png](/docs/output/img/event-segmentation/interpret-event-seg-5-png.png)

* Instead of a temporal or “bucket-based” chart, the **horizontal bar chart** generates a table view, breaking out the group by events and segmentation properties into separate columns. This makes it easier to digest and cross-reference the data. In the below example, users in the *United States* who played *Pop* songs were more likely to be doing so from a *Web* platform—but not by much:

![interpret_event_seg_6.png](/docs/output/img/event-segmentation/interpret-event-seg-6-png.png)

See [this Help Center article for more information on the syntax and limitations of group-by conditions](/docs/analytics/charts/group-by). 

### Switch between absolute totals and relative percentages

When using stacked area charts and stacked bar charts, you can choose to view your analysis in terms of relative percentages instead of absolute totals.

![interpret_event_seg_7.png](/docs/output/img/event-segmentation/interpret-event-seg-7-png.png)

*# Absolute* will display the overall user volume, whereas *% Relative* gives you the series value divided by the sum of all the series values.

{{partial:admonition type='note'}}
Amplitude disables the *% Relative* option when analyzing two or more events using the Uniques measure in a stacked area chart. Instead, build a formula in the Measured As Module using the `UNIQUES` metric for each event. The *% Relative* will then be available after you choose the formula option.
{{/partial:admonition}}

Be aware that this method will count unique users **per event**. One user could then be counted more than once if they trigger multiple events within the same time window. This is why the **microscope's sum** of unique users may be higher than the number of unique users overall. 

## Learn more

Next, learn about the [advanced features of segmentation analysis in Amplitude, including averages, windows, and cumulative totals](/docs/analytics/charts/event-segmentation/event-segmentation-interpret-2).