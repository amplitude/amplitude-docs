---
title: "Pruning and ordering of data in Amplitude Analytics"
source: "https://help.amplitude.com/hc/en-us/articles/17727675382811-Pruning-and-ordering-of-data-in-Amplitude-Analytics"
id: a916ade1-9b6a-4721-a44d-ccbc95773e0d
---

This article will help you:

* Understand the criteria and procedures Amplitude Analytics follows when streamlining and sorting data

In data analytics, data **pruning** refers to the process of removing or reducing the size of a dataset by eliminating irrelevant, redundant, or low-value data. The goal of data pruning is to streamline the dataset and make it more manageable, efficient, and meaningful for analysis.

**Ordering**, also known as sorting, refers to the process of arranging data in a particular sequence based on one or more criteria. When data is ordered, it becomes easier to identify patterns, trends, and relationships within the dataset.  

This article will explain how Amplitude Analytics performs pruning and ordering in its charts.

## Why Amplitude Analytics prunes and orders data

Amplitude Analytics will prune and order a chart's data whenever there are an excessive number of values returned by a group-by clause. Imagine a chart that groups by user IDs. Since these are distinct values, this query would return every single user ID in the segment you're analyzing. Including all of these values on a single chart would likely make it extremely difficult to read, and all but impossible to gain any value from.

In order to maintain chart performance in these cases, Amplitude **prunes** values of the chart. For charts with one group-by clause, a maximum of 100 values will be viewable. For charts with two group-by clauses, a maximum of 500 values will be viewable.

[Read more about the group-by and how it affects pruning and ordering](/analytics/charts/group-by).

Amplitude Analytics will also **order** chart results, by displaying the top values only. Analytics compares user activity in the chart's time-frame to determine which values are, in fact, the top values.

For example, imagine you have one chart looking at users over the last 30 days, and another looking at the last seven days. By definition, a top active user will have triggered the event more often than other users. So for each of these time-frames, the top users will likely be different, since a top active user in the seven-day time-frame might have been less active (either overall or relative to others in that larger user population) over the 30-day time-frame.

{{partial:admonition type='note'}}
Amplitude Analytics prunes results **before** applying any other filters on the chart. This includes cohorts.
{{/partial:admonition}}

## View your pruned results

There are a few ways you can see the query results that have been pruned from a chart:

* Apply more filters. This will help you narrow down the pool of results, and surface more of the values you want to see.
* Export your results via .CSV download (maximum 10,000 values) or the Dashboard REST API (maximum 20,000 values).

## Chart-specific considerations

### Event Segmentation

* When viewing the Uniques tab in an Event Segmentation chart, all users will display once and only once. There are no top users to surface.

### Funnel Analysis

* If Amplitude Analytics has pruned users on your Funnel Analysis chart, the conversion rate might seem higher than expected. This is because it's based on fewer users.
