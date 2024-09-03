---
id: bbf77d65-6251-456d-adb9-b9591a1b8ca8
blueprint: chart
title: 'Chart basics in Amplitude'
source: 'https://help.amplitude.com/hc/en-us/articles/231999267-Chart-basics-in-Amplitude'
this_article_will_help_you:
  - 'Share and customize your charts in Amplitude'
  - 'Customize your charts'
  - 'Set expectations for chart caching times'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717690752
---
## Before you begin

If you haven't done so yet, stop and read this [article on how to create a chart in Amplitude](/docs/get-started/create-a-chart) before proceeding.

Also, keep in mind some features may require a certain subscription or a paid add on: 

* Create Dynamic Group Property is a paid add on for Plus and above
* Monitors are available to Enterprise, and are a paid add on for Growth
* Collaboration features are accessible to all plans

## Start from a template

From the new Chart screen or the chart switcher, click Templates at the top of the left sidebar. On the Chart Templates panel, search for an existing template, filter by goal, or browse by chart type.

When you select a template, it prepopluates the chart definition. Save the chart directly, or edit it to better meet your requirements and then save it.

{{partial:admonition type="note" heading=""}}
Chart templates rely on default events and properties and work best if you use Amplitude SDKs to instrument your applications or websites.
{{/partial:admonition}}

## Share your chart

To share your chart, either click the link icon to copy the chart's URL to your clipboard, or click the share icon to open the *Share your analysis* modal.

![share_your_analysis.png](/docs/output/img/charts/share-your-analysis-png.png)

Enter the names or emails of the stakeholders you want to share the chart with, and set their access privileges with the drop-down to the right. When you're ready, click *Modify Owners*.

## Add your chart to a dashboard or notebook

To add your chart to a new or existing [dashboard](/docs/analytics/dashboard-create) or notebook, click *+ Add to* and scroll down until you find the dashboard or notebook you're looking for. You can also use this chart as the basis for creating a new dashboard or notebook.

## Add custom legend labels

You can edit the legend of your chart to make it more readable. This is useful if, for example, you have applied multiple group-bys to a chart, and want to make it easy for viewers to understand what each segment is referring to.
Click the legend label you wish to change, then type in the description you want. The segment names in the breakdown data table below the chart doesn't change to reflect custom legend labels, however. 

## Customize a chart's y-axis

You can set the minimum and maximum values displayed on your chart's y-axis (vertical). This enables you to avoid dramatic changes in y-axis values between subsequent chart views, as well as keep consistent y-axes across charts when adding them to dashboards.

To do so, click the vertical axis on your chart, then enter the desired minimum and maximum values in the modal that appears.

![create](/docs/output/img/charts/create.gif)

## Switch projects or chart types

To switch the project you are viewing, click the project name in the title of the chart and select a different project. Your chart reflects the data of the newly selected project. The new chart matches the controls of the original chart as closely as possible, and drops any events or properties not instrumented in the new project.

You can also switch the chart type, by clicking the chart type name and selecting a different type. You can choose to preserve the events or segments you have already added to your current chart.

## Change chart layout

You can opt to view your charts in a top-down orientation, in line with earlier versions of Amplitude's chart controls UI. To do so, open a chart and click More Control Options at the top of the chart controls and select *Change Layout* from the menu that appears.  

![](statamic://asset::help_center_conversions::charts/more-chart-options.png)

To return to the standard side chart controls layout, repeat the process.

## Chart cache times

Amplitude caches charts and requests. The cache time is dependent on the time interval (daily, weekly, monthly) and the numbers days from the present day. Amplitude also caches CSV downloads from charts.

Below are the cache times for charts. **Cache times for dashboards, REST API requests, and CSV downloads are twice as long as the times listed below.** 

**Real-time queries:**

* five minutes, within the last 24 hours

**Hourly queries:**

* five minutes

**Daily queries:**

* ten minutes, within last seven days
* 60 minutes, within last 30 days
* six hours, greater than last 30 days

**Weekly queries:**

* 60 minutes, within last four weeks
* six hours, within last 12 weeks
* 24 hours, greater than last 12 weeks

**Monthly queries:**

* six hours, within last three months
* 24 hours, within last six months
* 48 hours, greater than last six months

{{partial:admonition type='note'}}
If you're measuring time on the date picker using the "between" option, the query times listed above apply to any range of that duration, and not just the most recent. For instance, a chart generated in 2023 that examines monthly data collected between January 2020 and June 2020 (a six-month span that's not the most recent six months) is cached for 24 hours.
{{/partial:admonition}}