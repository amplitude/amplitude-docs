---
title: "Group-bys: How Amplitude prunes and orders chart results"
source: "https://help.amplitude.com/hc/en-us/articles/360031259831-Group-bys-How-Amplitude-prunes-and-orders-chart-results"
id: 3fc06830-001c-4c85-9d1f-6fc7c5ea7a39
---

#### This article will help you:

* Understand when and why Amplitude Analytics truncates group-by query results
* Understand how Amplitude Analytics prioritizes group-by results

In its basic form, Amplitude's **group-by** feature is a tool for categorizing events for aggregation. 

![group_by.png](/output/img/charts/group-by-png.png)

When you want to count the number of events by country, for example, you'd use a group-by:

![group_by_2.png](/output/img/charts/group-by-2-png.png)  

Check out our Help Center article for a more detailed look at [group-by visualization in Amplitude's Event Segmentation charts](/analytics/charts/build-charts-add-events).

## Group-by result limits

For performance purposes, Amplitude sets a maximum limit on the number of groups a query result can return. When this limit is exceeded, the top groups are kept, while the rest are pruned from the query result. The top groups are determined in accordance with the table below.

With a single group-by in the Event Segmentation chart, results may be limited to 100 group-by results. For double group-bys, results may be limited to 500 group by results, in which each group by value pair is counted as a single result.

## Group ordering

This table shows how Amplitude prioritizes group-bys for display in the Breakdown Table:

|  |  |
| --- | --- |
| **Metric** | **Ordering** |
| Uniques | Number of unique users |
| Totals | Total number of events |
| % Active | Number of unique users |
| Average | Total number of events |
| Frequency | Number of unique users |
| Distribution of Property Value | Total number of events |
| Sum of Property Value | Sum of property values |
| Average of Property Value | Sum of property values |
| Distinct Property Values Per User | Total number of (user, property value) pairs |
| Formulas: Percentile | Total number of events |
| Formulas: Frequency Percentile | Total number of events |
| Formulas: Property Count | Number of unique properties |
| Formulas: Property Count Average | Total number of (user, property) pairs |
| Formulas: Default | Number of unique users |

## Formulas with group ordering

For formulas *without* a group-by, the ordering described above will only be used if every metric in the formula uses the same ordering. Otherwise, Amplitude will use the default formulas ordering.

For formulas *with* a group-by, Amplitude will rank the groups by the largest overall values *per group* summed across all formulas in a single expression.

{{partial:admonition type='note'}}
 If group-by pruning occurs with multiple formula terms combined with operators, formulas may take longer to load because Amplitude will issue additional queries to ensure that all formula terms are querying the same groups.
{{/partial:admonition}}
