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

When you select a template, it prepopulates the chart definition. Save the chart directly, or edit it to better meet your requirements and then save it.

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

## Customize your chart's Y-axis

If the data that comprises your chart doesn't fit the default scale, you can customize the chart's Y-axis for better viewability.

To customize the Y-axis, click it on the chart. The Custom Y-axis modal appears.

{{partial:admonition type="note" heading="Applicable chart types"}}
Y-axis customization is available for Event Segmentation charts.
{{/partial:admonition}}

### Axis name and values

By default, the Y-axis name comes from the measurement that's displayed. For example, if your chart displays event totals, the axis name is `Totals`. In cases where you need to share the chart or otherwise provide more context, enter a more descriptive name.

To help the data fit more cleanly on the chart, you can set minimum and maximum values. By default, a chart's Y-axis starts at zero. Sometimes, your data might be in a small range, but with higher value.

In the examples below, the chart on the left uses the default axis values, and the chart on the right has the minimum set to `10000` and the maximum set to `15000`.

![](statamic://asset::help_center_conversions::event-segmentation/y-axis-scale.png)

Enable **Display data out of the min and max value** to ensure that if any data falls out of the range you set, it still appears on the chart. Otherwise, chart data extends 

Customize the unit of measure that displays for a chart to ensure that the chart represents the data most accurately. Choose from:

- Raw number
- Percent
- Currency (defaults to the [currency set at the project level](/docs/admin/account-management/currency-unit))
- Custom (add a prefix or suffix)

### Add a second Y-axis

If the chart displays more than one event, add a second Y-axis to ensure best visibility. For example, on a chart that tracks Weekly Active Users, if you add a second event that measures new users, you add a second Y-axis to ensure best visibility for both.

In this example, Weekly Active Users, measured by `Any Active Event` falls in the range of 12,000 - 13,500. Weekly New Users, has a range between 5500, and 6000. The addition of a second Y-axis ensures that both events display with enough granularity to observe increases and decreases over time.

![](statamic://asset::help_center_conversions::event-segmentation/dual-y-axis.png)

The second Y-axis supports the same customization options as the primary Y-axis.

{{partial:admonition type="note" heading="Dual Y-axis availability"}}
Dual-Y axis is available on event segmentation line charts.
{{/partial:admonition}}

## Switch projects or chart types

To switch the project you are viewing, click the project name in the title of the chart and select a different project. Your chart reflects the data of the newly selected project. The new chart matches the controls of the original chart as closely as possible, and drops any events or properties not instrumented in the new project.

You can also switch the chart type, by clicking the chart type name and selecting a different type. You can choose to preserve the events or segments you have already added to your current chart.

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

## Releases and annotations

* **Add an annotation** to your chart on the specific date of the data point you've selected, such as the dates of a feature release or a marketing campaign. Annotations appear as purple vertical lines in your chart, and they can be removed in your project's [Settings page](/docs/admin/account-management/account-settings). There are some limits to annotations:
  * Only users with Admin or Manager permission levels can create annotations.
  * Chart-specific annotations are only available for Event Segmentation and User Sessions charts.
  * Annotations don't support public links and aren't accessible in dashboards or notebooks.
* **Create a release**. A **release** represents a change in your product. See [this Help Center article for more information on releases in Amplitude](/docs/analytics/releases). 


## Keyboard shortcuts

{{partial:admonition type="note" heading="Shortcut availability"}}
Keyboard shortcuts are available on the creation page for all charts, except Data Tables.
{{/partial:admonition}}

| Shortcut    | Action                               | Description                                                                                                                                                                                                                                                                |
| ----------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Shift`+`e` | Event quick select                   | Opens the event selector, enabling you to add a new event to the chart definition.                                                                                                                                                                                         |
| `Shift`+`f` | Event filter select                  | Equivalent to clicking `+Filter` in an event block. If the chart definition has no events, this shortcut does nothing. If the chart definition has multiple event blocks, this shortcut selects the last event in the list and opens the property dropdown for that event. |
| `Shift`+`g` | Group by quick select                | Equivalent  to clicking `+Group` in an event block. If the chart definition has no events, this shortcut does nothing. If the chart definition has multiple event blocks, this shortcut selects the last event in the list and opens the property dropdown for that event. |
| `Shift`+`r` | Refresh chart data                   | Equivalent to clicking `Refresh` on a chart. Refreshes the chart's source data.                                                                                                                                                                                            |
| `Shift`+`s` | Save chart                           | Equivalent to clicking `Save` on a chart. If the chart is new and isn't saved, the Save Chart modal displays. On an existing chart, the chart saves with no confirmation.                                                                                                  |
| `Shift`+`d` | Copy chart                           | Equivalent to clicking `Copy` to duplicate the chart in a new tab. If the chart is new, and isn't saved, this shortcut does nothing.                                                                                                                                       |
| `Shift`+`u` | Copy URL                             | Equivalent to clicking `Copy URL`.                                                                                                                                                                                                                                         |
| `Shift`+`t` | Add to                               | Equivalent to clicking `Add to`.                                                                                                                                                                                                                                           |
| `Shift`+`n` | New chart                            | Equivalent to clicking `New chart`.                                                                                                                                                                                                                                        |
| `Shift`+`?` | Toggle shortcut modal                | This shortcut hides or displays a modal that describes the available keyboard shortcuts.                                                                                                                                                                                   |
| `Return`    | Add to chart  definition             | When you hover on an event or property, press `return` to add it to the chart definition.                                                                                                                                                                                  |
| `Space`     | Toggle selection of a property value | When you hover over a property value, press `space` to select or deselect it.                                                                                                                                                                                              |

