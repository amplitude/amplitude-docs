---
id: 936ddb55-b2b1-4519-87d2-22aa7cfba76a
blueprint: analytic
title: "Change your dashboard's display preferences"
source: 'https://help.amplitude.com/hc/en-us/articles/19464952104475-Change-your-dashboard-s-display-preferences'
this_article_will_help_you:
  - 'Display your dashboards as charts, KPIs, or tables'
  - 'Add target metrics to your dashboards'
  - 'View your dashboards in full-screen mode'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717692809
---
#### This article will help you:

* Display your dashboards as charts, KPIs, or tables
* Add target metrics to your dashboards
* View your dashboards in full-screen mode

Once you've created and populated your dashboard with charts or cohorts, you can modify its display settings to best accommodate your team's needs.

## Display as charts, KPIs, or tables

You have the option to display any [Event Segmentation](/analytics/charts/event-segmentation/event-segmentation-build) charts, **conversion** Funnel charts and User Session charts you add to your dashboard as a chart, a table, or a single KPI. To switch between these display modes, click ••• in the lower-right corner of your chart, and select your preferred display from the *Visualization* section of the menu. 

{{partial:admonition type='note'}}
Your KPI options are limited to Average Session Length and Average Sessions Per User for a User Sessions chart. Also, only the dashboard owner can change the display mode of any included charts.
{{/partial:admonition}}

### Show Summary Metrics

Some charts in your dashboard have the *Show Summary Metrics* option to display summary metrics at the top of the chart. There are some restrictions to note for the applicable charts: 

* **Event Segmentation**: Summary metrics are not available for the frequency metric nor bar charts.
* **Funnel Analysis**: Summary metrics are only available for conversion charts with a single series–meaning, one user segment without a group-by filter.
* **User Sessions**: Summary metrics are not available for the distribution of session length metric.

Follow the below steps to turn on or off summary metrics:

1. From your dashboard, choose the chart you want to display summary metrics for. Ensure the chart type is one that supports summary metrics: Event Segmentation, Funnel Analysis, or User Sessions.
2. Click ••• to open the chart's menu and click *Show Summary Metrics* to turn them on.

	![dashboards KPI.png](/output/img/analytics/dashboards-kpi-png.png)

3. To turn off summary metrics, reopen the chart's menu and click *Show Summary Metrics* to turn them off.

In the Event Segmentation chart below, *Show Summary Metrics* is switched on. The current day is July 25th, and the chart shows total article views in the last 30 days:

![dashboards summary metrics.png](/output/img/analytics/dashboards-summary-metrics-png.png)

* **129k:** Total across the entire date range. In this case, there were about 129k total article views from June 26th to July 25th.
* **4.84k:** The metric in the most complete interval. In the example, there were about 4.84k views on July 24th.
* **193%:** The difference since the previous interval. In the example below, there was a 193% increase in article views from July 24th to July 25th.
* **254%:** The difference compared to the beginning of the date range set. In the example below, there was a 254% overall increase in new users since June 26th.

In another example, let's look at an Event Segmentation chart with a custom formula. In this scenario, *Show Summary Metrics* is still on, only now we see an *Overall Value* that is a count of active users. Although the next three examples highlight counts of active users over the same 30 days, the *Overall Value* varies because of the different windows *(daily, weekly, or monthly):*

* **592k**: Daily active users (DAU) is the number of unique users who were active on *each* day in the last 30 days.

![DAU.png](/output/img/analytics/dau-png.png)

* **631k**: Weekly active users (WAU) is the unique count of users who were active in **at least 1 day in a 7-day window** in the last 30 days.

![WAU.png](/output/img/analytics/wau-png.png)

{{partial:admonition type='note'}}
 The DAU and WAU overall values could have matched in this example if an underlying 7-day **lookback window** had been added to both.
{{/partial:admonition}}

* **734k**: Monthly active users (MAU) is the unique count of users who were active in **at least 1 day in the last 30 days**.

![](statamic://asset::help_center_conversions::analytics/mau-png.png)

## Add target metrics

You can add a target metric for Event Segmentation, conversion Funnel, and User Session charts when using a chart visualization. Target metrics allow you to display the metric value your team is trying to achieve for the selected chart. You may also add a target date to the metric.

{{partial:admonition type='note'}}
The *Add Target Metric* option will only appear on conversion funnel charts with one user segment. 
{{/partial:admonition}}

To do so, follow these steps:

1. Click ••• in the lower-right corner of the chart and click *Add Target Metric*.
2. In the *Add Target Metric* modal, set your target for the chart's current KPI metric.   
  
If this isn't the metric you want, you'll have to change the KPI metric on the chart and try again.
3. Check the *Show progress bar towards target* box if you want to display both a visual progress bar of the distance to your goal, and the baseline number for measuring your progress.
4. Click *+ Add Target Date* to add an optional target date.
5. Click *Save*.

## View your dashboard in full-screen mode

Often, when displaying your dashboards on TV screens or shared monitors, you'll want to put it into full-screen view. To do so, click *More* and select *Enter TV Mode* from the drop-down menu.

{{partial:admonition type='note'}}
When using TV mode, the dashboard will refresh every five minutes. However, the charts in the dashboard will refresh according to [this schedule](/analytics/charts/chart-basics).
{{/partial:admonition}}