---
id: 21fd5184-cff2-4c81-9ca5-1a67c8901894
blueprint: persona
title: 'Interpret your Personas chart'
source: 'https://help.amplitude.com/hc/en-us/articles/20719767917083-Interpret-your-Personas-chart'
this_article_will_help_you:
  - 'Interpret your cluster cards'
  - 'Identify and name your personas'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717104252
landing: true
landing_blurb: 'Interpret your cluster cards and identify and name your personas'
---
The [Personas chart](/docs/analytics/charts/personas/personas-clustering) will help you identify and name user clusters, which can then be used to drive engagement and retention.

## Interpret your cluster cards

The first section of a Personas report is the **cluster cards**. Here, we've generated a Personas report with three clusters.

![Screen_Shot_2017-04-14_at_2.55.31_PM.png](/docs/output/img/personas/screen-shot-2017-04-14-at-2-55-31-pm-png.png)

Each card consists of:

* A small bubble chart, where the size of a cluster's bubble represents the proportion of users in the specific cluster
* The count of users in the cluster, as well as the cluster's size relative to all other clusters (expressed as a percentile)
* The percentage of users in the cluster who are also in the target cohort
* An editable description field (we recommend describing your clusters)
* The option to export the cluster as a behavioral cohort

## Identify and name your user personas

The cluster cards offer an excellent overview, but the real details are all found in the **event table** below them. This is where you'll be able to uncover the similar behaviors that hold each cluster together, and that will serve as the basis for their possible user personas.

The table displays a list of events, along with two metrics for each cluster:

* Average # of Events: The average number of times a specific event is triggered by users in cluster *N*.
* Standard Deviation (σ): The standard deviation from the mean of the event. Standard deviation numbers are rounded to the nearest decimal point (e.g. -0.01 is rounded to -0.0).

The table is actually divided into two halves. The top half contains events users in your selected cluster triggered **more** frequently than average, while the bottom half contains events those users triggered **less** frequently than average. You can sort these tables by any cluster, simply by clicking on the cluster you're interested in.

![personas_table_sort.gif](/docs/output/img/personas/personas-table-sort-gif.gif)

Notice that whenever you choose a new cluster to use for sorting the table, the lists of events changes as well. That's because each cluster should exhibit a different pattern of behavior within your product, which means they'll almost certainly be firing events at different rates from each other.

In the table shown below, we see that Cluster 3 is more likely to both watch a video and submit a comment than the average user.

![](/docs/output/img/personas/Screen_Shot_2016-11-29_at_3.52.41_PM.png)

The event table should help you answer the question: "Am I confident I selected enough clusters to do a good job of grouping my users into different personas?" If your answer is no, you should try different cluster quantities. If your answer is yes, then give your clusters appropriate descriptions and save your report.

### Hide events

If there are events you still wish to track but do not want to visualize in your Personas reports, you can [hide them](/docs/data/remove-invalid-data) in your tracking plan. Amplitude clusters over the top 100 events, so if you mark one of those events as hidden, it will no longer count in the calculation.