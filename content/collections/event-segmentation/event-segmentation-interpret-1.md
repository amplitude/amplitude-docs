---
id: 5aca2f50-8212-432f-b161-41319f88d8ac
blueprint: event-segmentation
title: 'Interpret your event segmentation analysis, part 1'
source: 'https://help.amplitude.com/hc/en-us/articles/360035355132-Interpret-your-event-segmentation-analysis-part-1'
this_article_will_help_you:
  - 'Understand what your Event Segmentation analysis is telling you'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717008788
---
Amplitude's **Event Segmentation** chart helps you understand what specific groups of users are doing in your product. For example, in an event segmentation analysis, you can:

* Identify the top events fired over a selected time period
* Compare event totals to each other
* See which users fire certain events

![interpret_event_seg_1.png](/output/img/event-segmentation/interpret-event-seg-1-png.png)

## Before you begin

If you haven't done so already, you'll want to familiarize yourself with the basics of [building charts in Amplitude](/analytics/charts/build-charts-add-events), as well as how to create an [Event Segmentation](/analytics/charts/event-segmentation/event-segmentation-build) chart. You can also see FAQs about the Event Segmentation chart [here](https://help.amplitude.com/hc/en-us/articles/360052734691). 

## Interpret your Event Segmentation chart

Event Segmentation is Amplitude's most commonly-used chart. It's simple enough to create a useful analysis quickly, even as a brand-new Amplitude user. The rest of this article will explore these features and explain how you can best put it to use to generate insights on user behavior.

### Breakdown table

Below the chart, you'll see a the breakdown table. By default, Amplitude will include all top values or events in this table, which will update automatically when Amplitude receives new top values or events. You can turn this off by first deselecting the segments and then explicitly selecting the values and events you want to keep.

![Screen_Shot_2019-11-13_at_1.00.22_PM.png](/output/img/event-segmentation/screen-shot-2019-11-13-at-1-00-22-pm-png.png)

### Change your chart view

Whichever metric you choose, you’ll have several options when it comes to how you want your results displayed on the chart. 

![interpret_event_seg_2.png](/output/img/event-segmentation/interpret-event-seg-2-png.png)

* The default setting is a basic **line chart**. These are useful for looking at the trend of one event for one user category over time.
* **Stacked area charts** are useful when you’re looking at data that breaks down into discrete buckets, like when you’re analyzing multiple events.
* **Bar charts** are good for situations when you want to show a distribution of data points, or compare metric values across different segments of your data. Bar charts make it easy to see which values are highest or most common, and how specific groups compare against the rest.
* A **stacked bar chart** will show how broad categories or buckets are divided into smaller ones, as well as the relationship each of those smaller parts has to the overall total.

If your analysis uses multiple group-by conditions, the resulting visualization might turn out confusing and hard to interpret. 

For example, here the control panel groups the `Play Song or Video` event by `Genre_Type`, with segmentation by `Country` and `Platform`.

![interpret_event_seg_4a.png](/output/img/event-segmentation/interpret-event-seg-4a-png.png)

While it’s not specifically a chart type, the **group by** visualization will clarify your data in these circumstances. With more than one group by or segmentation, the resulting chart is difficult to understand.

![interpret_event_seg_5.png](/output/img/event-segmentation/interpret-event-seg-5-png.png)

* Instead of a temporal or “bucket-based” chart, the **horizontal bar chart** generates a table view, breaking out the group by events and segmentation properties into separate columns. This makes it easier to digest and cross-reference the data. In the below example, users in the *United States* who played *Pop* songs were more likely to be doing so from a *Web* platform—but not by much:

![interpret_event_seg_6.png](/output/img/event-segmentation/interpret-event-seg-6-png.png)

See [this Help Center article for more information on the syntax and limitations of group-by conditions](/analytics/charts/group-by). 

### Switch between absolute totals and relative percentages

When using stacked area charts and stacked bar charts, you can choose to view your analysis in terms of relative percentages instead of absolute totals.

![interpret_event_seg_7.png](/output/img/event-segmentation/interpret-event-seg-7-png.png)

*# Absolute* will display the overall user volume, whereas *% Relative* gives you the series value divided by the sum of all the series values.

{{partial:admonition type='note'}}
 The *% Relative* will be greyed out when analyzing two or more events using the Uniques measure in a stacked area chart. Instead, build a formula in the Measured As Module using the `UNIQUES` metric for each event. The *% Relative* will then be available once you choose the formula option.
{{/partial:admonition}}

Be aware that this method will count unique users **per event**. One user could then be counted more than once if they trigger multiple events within the same time window. This is why the **microscope's sum** of unique users may be higher than the number of unique users overall. 

## Learn more

Next, learn about the [advanced features of segmentation analysis in Amplitude, including averages, windows, and cumulative totals](/analytics/charts/event-segmentation/event-segmentation-interpret-2).