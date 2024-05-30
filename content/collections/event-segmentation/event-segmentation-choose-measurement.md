---
id: 6d16855b-8236-4455-9383-d4c537bf7a32
blueprint: event-segmentation
title: 'Choose the right measurement'
source: 'https://help.amplitude.com/hc/en-us/articles/19688391224731-Choose-the-right-measurement-for-your-Event-Segmentation-chart'
this_article_will_help_you:
  - 'Choose the most appropriate way to measure and display the results of your event segmentation analysis'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717101776
landing: true
landing_blurb: 'Choose the most appropriate way to measure and display the results of your event segmentation analysis'
---
Amplitude offers you several different ways of looking at your [event segmentation](/analytics/charts/event-segmentation/event-segmentation-build) results. In this section, we'll explain the differences between them.

![build_an_event_seg_analysis_measured_as.png](/output/img/event-segmentation/build-an-event-seg-analysis-measured-as-png.png)

## Uniques

The default measure for the Event Segmentation chart, it displays the total count of unique users in your segment who triggered the event you added in the Events Module. View the exact count by simply hovering over the specific data point you’re interested in. If you want to inspect the users who make up that data point, just click on it (see our Help Center article on Amplitude’s [Microscope](/analytics/microscope) feature to learn more).

## Event Totals

Like Uniques, Event Totals is a straightforward, count-based measure. The difference is that instead of counting unique users, it graphs the total count of times a specific event was fired at each data point.

## Active %

This measure graphs the percentage of all [active users](/get-started/helpful-definitions) (defined as users who have triggered any active event in a specified time frame) who triggered a specific event at each data point.

## Average

The Average measure graphs the average number of times a specific event was triggered. Here, the "average" for any data point is equal to its event totals divided by unique users.

## Frequency

When you apply the Frequency measure, Amplitude will group the users included in your user segment into buckets defined by the number of times each has triggered an event during the time frame of your analysis.

![new_event_seg_screenshot.png](/output/img/event-segmentation/new-event-seg-screenshot-png.png)

Here, we see an event segmentation analysis using the Frequency measure. Each stacked area represents a "frequency bucket." For each data point, Amplitude displays the number of users contained in that bucket. And as described above, if you want to learn more about the users in a particular data point, all you have to do is click on it.

In the screenshot above, the default buckets are represented by the colored dots. Click *customize buckets* to adjust the sizing of the buckets and distribution of the data, or use the Custom Buckets modal to set individual ranges for each bucket.

## Properties

Depending on the details of your analysis, you may also be able to generate an event segmentation chart based on the values of your event or user properties.

* Sum of Property Value: Graphs the sum of property values at each data point. To use this measure, the property value must be an integer.
* Distribution of Property Value: Shows the distribution of event totals broken out by the values of the selected event property. The minimum value is inclusive, and the maximum value is exclusive.
* Average of Property Value: Graphs the average of the property values, or the sum of those values divided by the total number of events fired at each data point. To use this measure, the property value must be an integer.
* Distinct Property Values per User: Graphs the average count of different property values triggered by each user. More specifically, it's the total sum of unique user-distinct property value pairs, divided by the number of users.
* Median Property Value: Graphs the median property values for each data point. This is most useful in situations where averages might be noticeably skewed by outliers. To use this measure, the property value must be an integer.

## Formula

This option is accessible from the *Advanced* drop-down menu in the Measured As Module. In an Event Segmentation chart, you can write formulas that Amplitude will apply to the events you've included in your analysis. To read more about each formula and see some examples of use cases, see our [Custom Formulas](/analytics/charts/event-segmentation/event-segmentation-custom-formulas) article.

[Read this article to learn about how to interpret your Event Segmentation chart.](/analytics/charts/event-segmentation/event-segmentation-interpret-1)