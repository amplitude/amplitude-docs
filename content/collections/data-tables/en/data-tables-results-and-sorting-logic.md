---
id: ce073128-d6a9-48e8-8d07-c7afaa128254
blueprint: data-table
title: 'Results limits and sorting logic in Data Tables charts'
source: 'https://help.amplitude.com/hc/en-us/articles/19466947066651-Results-limits-and-sorting-logic-in-Data-Tables-charts'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1719958028
landing: true
landing_blurb: 'Learn how Amplitude decides what results to display in a Data Table chart'
this_article_will_help_you:
  - 'Use the sorting logic behind Data Tables to create elegant and accurate charts'
  - 'Understand when, why, and how Data Tables limit the amount of data you export'
---
For more complex analyses, it's important to understand how Amplitude Analytics decides what results to display, as well as what happens when you sort on a given column.

## Display limits

Data Tables apply display limits based on your group-by configuration. These are the maximum rows shown in the table—Amplitude still processes all your data, but displays only the top results:

* **Single top-level group-by:** 100 rows maximum
* **Multiple top-level group-bys:** 500 rows maximum
* **Metrics with attribution:** 20 rows maximum
* **Multiple metric types with different limits:** The smallest limit applies

### Nested group-bys

To add multiple group-bys in a data table, start with one group-by already selected in the first column. Then, look for the icon with three stacked lines that appears when you hover—it says "Add top-level group-by." Click this icon to add another column and a second group-by.

![Add top-level group-by icon](/docs/output/img/data-tables/add-nested-groupby-icon.png)

By default, the first group-by is applied first. Amplitude then finds the second group-by value within each value of the first, and continues in that order for any additional group-bys you add.

![Multiple group-bys applied in order](/docs/output/img/data-tables/nested-groupby-png.png)

Amplitude applies display limits to each group-by level separately. For example, if you group by `city` (top-level limit: 100 rows), then add a nested group-by for `email`, up to 100 emails display for each city.

### Multiple metric types

If your Data Table includes metrics with different display limits, the smallest limit applies to all metrics. For example, if you include both an event segmentation metric (normally 100 rows) and an attribution metric (20 rows), only 20 rows display.

{{partial:admonition type='note'}}
If your table contains metrics that aren't segmentation-based (like conversion, attribution, or session) **and** you're doing multiple group-bys, you may see fewer results than these limits suggest. Contact your CSM or Amplitude Support if this is an issue.
{{/partial:admonition}}

## Sorting logic

Once you have these results, any sorting you do applies **only to them**, and **doesn't** bring in any new results. 

For example, imagine your group-by has enough different property values that Amplitude Analytics limits the results displayed to the top 100. By default, Amplitude sorts these results in descending order. If you opt to view your results in ascending order, **you don't** see the “bottom 100” results instead. You **still** see only the same top 100 results—only their sorting order has changed.

When using multiple metrics, sorting by a particular column displays data for all columns based on the values in the sorted column. For a data table with multiple segments, multiple metrics, and a period over period comparison, sorting a period-over-period column within a metric gives you a dataset based on the first segment's current period.

![sort_columns.jpeg](/docs/output/img/data-tables/sort-columns-jpeg.jpeg)

## Column ranking behavior

When you apply group-bys to your Data Table, Amplitude ranks and prunes high-cardinality results before displaying them. The ranking method depends on the metric type in the sorted column.

### Single-term formulas and non-formula metrics

When you sort a column by a single-term formula metric or any non-formula metric (like Uniques, Totals, or property aggregations), Amplitude ranks groups according to the standard [group ordering logic](/docs/analytics/charts/group-by#group-ordering).

For example, if you sort by Uniques, Amplitude ranks by the number of unique users. If you sort by Sum of Property Value, Amplitude ranks by the sum of property values.

### Multi-term formula metrics

When you sort a column by a formula metric with multiple terms (such as `PROPSUM(A) / TOTALS(B)`), Amplitude uses a different ranking approach. Instead of ranking by the final calculated formula values, **Amplitude ranks by the sum of unique users across all metrics in the formula**.

This ranking method is less accurate because it doesn't reflect the actual formula results. The system weights each group by unique user count, calculates each metric separately, performs the formula operation, and then orders the results.

{{partial:admonition type='note'}}
This weighted ranking applies only when determining which groups to display (the top N results based on display limits). Once Amplitude selects the groups, sorting within those results displays them in the correct order based on the actual formula values.
{{/partial:admonition}}

#### Example

You create a Data Table with the formula `PROPSUM(A) / TOTALS(B)` grouped by Country:

* **USA**: Revenue = $40,000, Events = 20,000, Users with revenue events = 1
* **Canada**: Revenue = $10,000, Events = 10,000, Users with revenue events = 10

When ranking to determine which countries to display, Amplitude ranks Canada higher than USA because Canada has 10 users with revenue events compared to USA's 1 user. This happens even though USA's actual formula result ($40,000 / 20,000 = $2) is higher than Canada's ($10,000 / 10,000 = $1).

After Amplitude selects which countries to display based on this user-weighted ranking, the table correctly sorts them by their actual formula values.

### Why this matters

This ranking behavior can produce unexpected results when working with high-cardinality data (many unique group-by values). Groups with high formula values but few users may not appear in your results if other groups have more users, even if those groups have lower formula values.

{{partial:admonition type='tip' heading='Workaround'}}
If you need to rank by actual formula results, consider:

* Breaking your analysis into separate metrics without using multi-term formulas
* Exporting the data and performing calculations outside Amplitude
* Using filters to reduce cardinality before applying group-bys
{{/partial:admonition}}

This behavior also applies to Event Segmentation charts with custom formulas. For more details on formula metrics, review [Custom formulas in Event Segmentation](/docs/analytics/charts/event-segmentation/event-segmentation-custom-formulas).

## CSV export limits

CSV exports have different row limits than what displays in the table. Export limits depend on the metric type:

* **Event segmentation metrics without attribution:** 10,000 rows
* **Funnel metrics without attribution:** 300 rows  
* **Session metrics:** 100 rows
* **Any metric with attribution:** 20 rows
* **Multiple metric types:** Smallest limit applies

Amplitude prunes rows exceeding the limit—they don't appear in the exported CSV file.

## Limits for Dashboard REST API queries

With results queried from the [Dashboard REST API](/docs/apis/analytics/dashboard-rest), event segmentation metrics have a limit of 1000 rows. This is the only difference from the .CSV limits described in the previous section.

## How time properties work in Data Tables

When you apply time properties as group-bys, all limits described above apply to each group of the property.

### Examples:

* If you are using multiple top-level group-bys, the display limit is 500 rows.   
If, for example, you add another top-level group-by for the month property (a time-related property), and the date range includes three months (and thus, three different values for the property), up to 1500 rows (`500 rows * three property values`) display in the Data Table.
* If you export a funnel metric without attribution, grouped by a non-time property, the .CSV export result limit is 300 rows.   
If, for example, you add another top-level group-by for the day property (a time property), and the date range includes seven days (and thus, seven different values for the property), up to 2100 rows (`300 rows * seven property values`) export to your .CSV.
*  The 10,000 row limit for event segmentation metrics without attribution doesn't apply if the final group-by in the top level group includes a time property.