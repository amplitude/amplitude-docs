---
id: ce073128-d6a9-48e8-8d07-c7afaa128254
blueprint: data-table
title: 'Results limits and sorting logic in Data Tables charts'
source: 'https://help.amplitude.com/hc/en-us/articles/19466947066651-Results-limits-and-sorting-logic-in-Data-Tables-charts'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717103374
landing: true
landing_blurb: 'Learn how Amplitude decides what results to display in a Data Table chart'
---
For more complex analyses, it's important to understand how Amplitude Analytics decides what results to display, as well as what happens when you sort on a given column.

* If your group-by includes a large number of different property values, Amplitude Analytics will only display the top 100 group-by results. With multiple top-level group-bys, the limit is 500.
* If you are nesting group-bys, Amplitude Analytics applies the limit to each one separately:  

	* For example, if you have a top-level group-by around the `city` property, where the limit is 100, Amplitude Analytics will only display the top 100 group-by results. If you then add a second-level group-by around the `email` property, 100 emails at most will be displayed for each city.
* Any metric with attribution will be limited to ten results.
* If your Data Table includes metrics with different limits, the **smallest** row limit will apply.
* If your table contains metrics that are not segmentation-based—like conversion, attribution, or session, for example—**and** you're doing multiple group-bys, you may see fewer results than the limits described here might suggest. Reach out to your CSM or Amplitude Support if this is an issue.

## Sorting logic

Once you have these results, any sorting you do will apply **only to them**, and will **not** bring in any new results. For example, imagine your group-by has enough different property values that Amplitude Analytics limits the results displayed to the top 100. By default, these results are sorted in descending order. If you opt to view your results in ascending order, **you will not** see the “bottom 100” results instead. You will **still** see only the same top 100 results—only their sorting order has changed.

When you are using multiple metrics, sorting by a particular column will display data for all columns based on the values in the sorted column. For a data table with multiple segments, multiple metrics, and a period over period comparison, sorting a period-over-period column within a metric will give you a dataset based on the first segment's current period.

![sort_columns.jpeg](/output/img/data-tables/sort-columns-jpeg.jpeg)

## Limits for .CSV exports

Results exported to .CSV have row limits based on the metric type. If the data table contains multiple metrics of different kinds, the smallest row limit will be applied. Rows exceeding the limit will be pruned and will not appear in the exported .CSV.

* Event segmentation metrics **without** attribution are limited to 10,000 rows.
* Funnel metrics **without** attribution are limited to 300 rows.
* Session metrics are limited to 100 rows.
* Identical to its display limit, any metric **with** attribution will be limited to ten rows.

## Limits for Dashboard REST API queries

With results queried from the Dashboard REST API, event segmentation metrics are limited to 1000 rows. This is the only difference from the .CSV limits described in the previous section.

## How time properties work in Data Tables

When you apply time properties as group-bys, all limits described above will apply to each group of the property.

### Examples:

* If you are using multiple top-level group-bys, the display limit is 500 rows.   
If, for example, you add another top-level group-by for the month property (a time-related property), and the date range includes three months (and thus, three different values for the property), up to 1500 rows (500 rows \* three property values) will be displayed in your Data Table.
* If you export a funnel metric without attribution, grouped by a non-time property, the .CSV export result limit is 300 rows.   
If, for example, you add another top-level group-by for the day property (a time property), and the date range includes seven days (and thus, seven different values for the property), up to 2100 rows (300 rows \* seven property values) will be exported to your .CSV.