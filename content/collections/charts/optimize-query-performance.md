---
title: "Optimize performance with query time sampling in Amplitude Analytics"
source: "https://help.amplitude.com/hc/en-us/articles/14885323242907-Optimize-performance-with-query-time-sampling-in-Amplitude-Analytics"
id: 02a3e7b8-29a0-436e-abdf-e77d118e8263
---

**This article will help you:**

* Understand query time sampling
* Set query time sampling as the default for all new funnel charts

At times, querying large datasets can be time consuming, resource-heavy, and difficult to execute. Amplitude's query engine can use a technique called **query time sampling** to optimize performance and reduce execution time.

When query time sampling is enabled, Amplitude's query engine will select a representative subset of data—specifically, events based on a randomly-selected 10% sample of users—for analysis. It will then [up-sample](https://en.wikipedia.org/wiki/Oversampling_and_undersampling_in_data_analysis) the results, using advanced statistical methods like inverse sampling to extrapolate them to the entire population.

{{partial:admonition type='note'}}
 Up-sampling is done for functions that scale with the number of users, such as totals and uniques. It will not be used for those that do not scale in this way, like average, min, and max. 
{{/partial:admonition}}

### Feature availability

This feature is available to users on **all Amplitude plans**. See our [pricing page](https://amplitude.com/pricing) for more details.

* * Query time sampling is available for Event Segmentation and Funnel Analysis charts only.

## Enable query time sampling

To enable query time sampling, follow these steps:

1. From your Funnel Analysis, click ![lightningBolt.png](/docs/output/img/charts/lightningbolt-png.png).

![querySample.png](/docs/output/img/charts/querysample-png.png)

2. The ![lightningBolt.png](/docs/output/img/charts/lightningbolt-png.png) will then change to ![sampling10Percent.png](/docs/output/img/charts/sampling10percent-png.png).

![testFunnelChart.png](/docs/output/img/charts/testfunnelchart-png.png)

To return to querying your full dataset, turn off query time sampling by clicking ![sampling10Percent.png](/docs/output/img/charts/sampling10percent-png.png). 

## Set query time sampling as the default

Admin users can set query time sampling as the default for all new charts in a project. To do so, follow these steps:

1. Click ![](/docs/output/img/charts/15172559254683) to view your organizational settings.
2. Click *Projects.*
3. Choose the project you'd like to modify and switch the *Query time sampling* toggle to On.

## 

## Caveats

Query time sampling can be a useful way to streamline your workflow, but it's important to keep a few things in mind:

* It may not always be suitable for all types of analyses. These include queries with small datasets, queries that require a high level of granularity, or queries looking for property max, min, or count when the data is highly variable.
* The following features are unavailable when query time sampling is enabled in Amplitude Analytics: create cohorts, set monitors and alerts, scale sampling during data ingestion, and account analysis.
* Merge users are currently **not** supported yet, but will be supported soon. This means orgs with lots of merge users may see inaccurate results. Merged user support has been implemented for funnels.
