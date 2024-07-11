---
id: 9d5d7274-611b-4be2-9bbe-2a5360fa87df
blueprint: data-table
title: 'Multi-dimensional analysis with Data Tables'
source: 'https://help.amplitude.com/hc/en-us/articles/6797483965083-Multi-dimensional-analysis-with-Data-Tables'
this_article_will_help_you:
  - 'Build a custom analysis using multiple metrics in several different dimensions'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1720718276
landing: true
landing_blurb: 'Build a custom analysis using multiple metrics in several different dimensions'
---
When analyzing a rich dataset, analysts often need to compare multiple metrics at once, and slice and dice that data by different dimensions to generate a custom analysis. Amplitude’s Data Tables enable multi-metric, multi-dimensional analyses in a single view. It's an extremely flexible chart, allowing you to quickly analyze any combination of user behavior, user attributes, and metrics. 

{{partial:admonition type='note'}}
You may also find [this course](https://academy.amplitude.com/analyze-multiple-metrics-at-once-with-data-tables) on Data Tables helpful.
{{/partial:admonition}}

Data Tables are useful for:

* Marketing [attribution](/docs/analytics/charts/data-tables/data-tables-attribute-credit) (total visits, page views, and conversion rate by UTM source)
* Market Segment analysis (comparing several actions broken down by country)
* Experiment analysis (multiple metrics by control vs variant groups)
* Trend investigation (quickly and easily breaking down a number by multiple properties)
* Comparing time periods across multiple metrics (metric A, metric B, and metric C, broken down by category, compared to last quarter)

![compare_time_periods.gif](/docs/output/img/data-tables/compare-time-periods-gif.gif)

You can easily sort columns in ascending or descending order (just click the metric header), drag and drop or resize columns, and highlight, copy and paste any number of cells from your Data Table.

To get a quick overview of how Data Tables work, check out our [short Loom tutorial](https://www.loom.com/share/c6467e0667334368a51acab1bff77cd5?t=13).

Don't forget to read the [Help Center article on results limits and sorting logic in Data Tables](/docs/analytics/charts/data-tables/data-tables-results-and-sorting-logic).

### Feature availability

This feature is available to users on **all Amplitude plans**. See our [pricing page](https://amplitude.com/pricing) for more details.

## Set up a Data Table

To set up and use a Data Table, follow these steps:

1. Navigate to *Create New > Analysis > Data Table*.
2. In the empty Data Table panel, click *Add an event or metric* and select the event or metric you’re interested in. A new Data Table opens, with your chosen event or metric in the first column. Add more by clicking *+ Add Event or Metric* in the rightmost column in the Data Table.  
  
    You can [create a new metric](/docs/analytics/charts/data-tables/data-tables-create-metric) at this point, if you need to.

3. To break out your events and metrics by property values—country, for example, or platform, or week—click *Select property…* in the leftmost column of the table and choose the property you’re interested in.

    ![select_property.gif](/docs/output/img/data-tables/select-property-gif.gif)  
      
    This runs a group-by on your events and metrics, grouping by the property you selected. You can include up to five top-level group-bys in a single Data Table.

    {{partial:admonition type='note'}}
    When you do a top-level group by in a Data Table and include a Formula Metric, the results are consistent with measuring by a Formula in Event Segmentation *and* grouping by an Event property (as opposed to grouping by a Segment in Event Segmentation).  
    {{/partial:admonition}}

4. Once you’ve added a group-by property, you can run a secondary group-by on that row of your Data Table. For example, you can break your events and metrics out by the `Day of Week` property nested within `Country`.  
  
    ![nested_groupby.png](/docs/output/img/data-tables/nested-groupby-png.png)  
      
    Click the Bar icon in the rightmost group-by column and select the property you’re interested in.  
  
    ![groupby_property.jpeg](/docs/output/img/data-tables/groupby-property-jpeg.jpeg)

5. Next, add [user segments](/docs/analytics/charts/build-charts-add-events), if desired. Saved segments are accessible. Multiple segments show up in the table as separate columns within the same metric.

Once setup, there are several options you can use to manage and manipulate your data.

Within any cell, click the Options icon to: 

* **Open as chart,** which opens a new tab with the chosen metric applied;
* **Create cohort**, which allows you to save the chart's data points as a [cohort](/docs/analytics/behavioral-cohorts);
* **Copy** the data so you can paste elsewhere as needed or export the data as a CSV file.

![open_as_chart.jpeg](/docs/output/img/data-tables/open-as-chart-jpeg.jpeg)

Within any column header, click the Options icon to:

* **Add Filter**, which applies a filter to the chosen field;
* **Duplicate** or **remove columns**;
* **Rename** a column for clarity or consistency of your data;

{{partial:admonition type='note'}}
 A display name can be reset to its original name by choosing *Reset to Original Name* from the column's Options icon.
{{/partial:admonition}}

* **Save as** **metric**, which allows you to use the metric in other analyses;
* **Attribution**, which allows you to apply an [attribution model](/docs/analytics/charts/data-tables/data-tables-attribute-credit) to the chosen field or all fields;
* **Sort** values by low to high (ascending) or high to low (descending).

![dataTablesOptions.png](/docs/output/img/data-tables/datatablesoptions-png.png)

### Using metrics in Data Tables

With Data Tables, including a "-" character in any cells included in your formula's calculation results in an error.

Sometimes, using Uniques as a metric type in combination with group-bys can generate results that appear counterintuitive at first. For example, when you add a group-by to the event in the left column, the total sum for the event (as seen on the top row) **isn't a sum** of each of the rows below. Because there's a group-by applied to the event, the same user can exist in multiple rows.

The same logic applies to the Session Totals metric. When you add a group-by in the left column, the total number of sessions in the top row can be fewer than the sum of the rows below. This is because the chart counts a session containing property values X and Y under both X and Y groups.

### Filter your events and metrics for specific values within a group-by

You can click **Filter** to select which property values you want to keep or hide in the table.

You can also add an ad hoc filter for in-line events or metrics. To do so, click the three dots from the event or metric header and select “Add Filter.” This lets you apply filters *on top* of your events or metrics. Once applied, you can see the filters you applied by hovering over the **Filter** icon.

* Session-based and attribute-based metrics aren't supported, and
* display options *Relative % for totals* nor *Data bars in cells* aren't visible.

![display_options.jpeg](/docs/output/img/data-tables/display-options-jpeg.jpeg)

## Transpose rows and columns

You can transpose columns and rows of a Data Table when:

* you've toggled on a period over period comparison,
* segments exist in your chart definition,
* you've added top-level group-bys to your data table, *or*
* time properties exist.

Transposing *isn't* possible if:

* *nested* group-bys exist
* if the table contains session or attribution-based metrics
* if the user has unchecked the *Absolute numbers*

{{partial:admonition type="note" heading=""}}
Transposed Data Tables don't support display options *Relative % for totals,* *Data bars in cells*, nor *Color % delta*.
{{/partial:admonition}}

To transpose a Data Table, follow these steps:

1. Add events or metrics to horizontal access.
2. Add top level group-bys to vertical axis.
3. Change the *Columns* dropdown to rows to flip the axes.

![rows_read_only.png](/docs/output/img/data-tables/rows-read-only-png.png)

{{partial:admonition type='note'}}
Transposed Data Tables are read-only.
{{/partial:admonition}}