---
id: 02a3e7b8-29a0-436e-abdf-e77d118e8263
blueprint: chart
title: 'Optimize performance with query time sampling in Amplitude Analytics'
source: 'https://help.amplitude.com/hc/en-us/articles/14885323242907-Optimize-performance-with-query-time-sampling-in-Amplitude-Analytics'
this_article_will_help_you:
  - 'Understand query time sampling'
  - 'Set query time sampling as the default for all new funnel charts'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1726689668
---
At times, querying large datasets can be time consuming, resource-heavy, and difficult to execute. Amplitude's query engine can use a technique called **query time sampling** to optimize performance and reduce execution time.

With query time sampling enabled, Amplitude's query engine selects a representative subset of data—specifically, events based on a randomly selected 10% sample of users—for analysis. It then [up-samples](https://en.wikipedia.org/wiki/Oversampling_and_undersampling_in_data_analysis) the results, using advanced statistical methods like inverse sampling to extrapolate them to the entire population.

{{partial:admonition type='note'}}
Up-sampling is useful for functions that scale with the number of users, such as totals and uniques. Amplitude doesn't use it for functions that don't scale the same way, like average, min, and max. 
{{/partial:admonition}}


## Enable query time sampling

To enable query time sampling in a chart:

1. From a Funnel Analysis, click the lightning bolt.

    The lightning bolt updates to show the percentage of the data set that the chart queries.

  ![testFunnelChart.png](/docs/output/img/charts/testfunnelchart-png.png)

2. To query the full dataset, click *Sampled: 10%* to turn off query time sampling.

## Set query time sampling as the default

Project administrators can set query time sampling as the default for all new charts in a project.

1. Navigate to your project's settings.
2. Enable the toggle for **Query Time Sampling**.

## Dashboard query time sampling

To enable query time sampling for a dashboard that contains more than one chart, go the dashboard toolbar, and click Sampling to toggle sampling on or off for the dashboard.

After you enable it, the dashboard shows that query time sampling is enabled. Each chart also displays a lightning bolt icon:

* A blue icon means the chart is using sampled data.
* A red icon means the chart's analysis is on a small set of data, and the sampled data may not accurately reflect the full data set.

When you enable sampling on a dashboard and open a chart, the chart opens with sampling turned on.

## Caveats

Query time sampling can be a useful way to streamline your workflow, but it's important to keep a few things in mind:

* It may not always be suitable for all types of analyses. These include queries with small datasets, queries that require a high level of granularity, or queries looking for property max, min, or count when the data is highly variable.
* The following features are unavailable with query time sampling enabled in Amplitude Analytics: create cohorts, set monitors and alerts, scale sampling during data ingestion, and account analysis.