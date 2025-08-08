---
id: 58d6a33c-545b-44fe-a840-d5df0a1ab748
blueprint: faq_and_troubleshooting
title: 'The datepicker'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/18133682827419'
this_article_will_help_you:
  - 'Understand nuances in the way the datepicker understands time'
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1753204770
landing: false
---
In Amplitude, you use the datepicker to select the timeframe of the analysis you're conducting. In many ways, it's intuitive, as it's something you've most likely seen in other software contexts. You can choose to analyze data collected between two dates, since a specific date, or in the last x days, weeks, or months, where x is a value you select. 

However, there are nuances to the way the datepicker understands time.

## Offset

When using Last, your queries return the data from the timeframe you specified, as well as the latest, still-incomplete interval.

For example, if you set the datepicker to the last 30 days, Amplitude retrieves data from the last 30 full days, and however many hours have elapsed today.

![](statamic://asset::help_center_conversions::faq/datepicker.png)

If you don't want data from the incomplete day, or are using a delayed batch ingestion system, use an offset. To use an offset, click +Offset in the datepicker, then enter the number of days to offset by.

To remove the offset, click 'X' near the Offset by text.

## Exclude

When using Since or the Last x days, weeks, or months options, you can also choose to exclude the current day, week, or month. This can be helpful when the entirety of data for the selected timeframe isn't available. 

To exclude the incomplete time interval from your chart, click +Exclude in the datepicker and select the Incomplete Interval option. The current date is no longer framed in a dotted line and is excluded from your analysis. 

Deselect Incomplete Interval to revert this setting. Use the same process to exclude or include the current week, current month or current quarter.

{{partial:admonition type="note" heading=""}}
Amplitude doesn't support using offset and exclude at the same time.
{{/partial:admonition}}

### Exclude specific days

You can exclude specific days of the week from your analysis. This is ideal for organizations that operate on custom schedules. For example, retailers can exclude Sundays when stores aren't open or SaaS companies can omit weekends to focus on workweek behavior.

This exclusion affects not only chart visuals but also metric calculations like averages and rolling windows.

Exclude specific days is only supported on the following chart types: 

* Segmentation
* Funnels
* Data Tables
* Retention
* Sessions

Exclude specific days is only supported for the following time ranges:

* Last
* Since

{{partial:admonition type="tip" heading=""}}
Exclude specific days doesn't work with Period over Period analysis and it doesn't work with `realtime` intervals.
{{/partial:admonition}}

#### How Amplitude handles excluded days

When you exclude days, Amplitude:

* Exclude days removes the days from the calculations and from the chart visualization.
* For averages, the calculation is done on the valid days in the window. For example, if you are looking at the range Sunday - Saturday (7 days) with Wednesday removed:
    * For non-average time series analysis, the data shows as normal with Wednesday removed.
    * For aggregate data analysis, the data doesn't count the Wednesday in the aggregation,
* For averaging analysis (such as the rolling window), Amplitude doesn't count the dropped days in the numerator or the denominator. If you have a 7-day rolling window, the data point is treated as a 0 and divide average based on the valid days in the window (6 days in this example).
* For non-daily or non-hourly intervals analysis, no data is removed from the chart or the table. However, the data still has the underlying days removed.

This method avoids artificially low averages and maintains consistent windowing on charts.

## Time input

When using Since or Between, you can narrow the range further by enabling time input. Time input enables you to enter a start time or an end time to add granularity to your analysis. 

{{partial:admonition type='note'}}
The datepicker's time input feature is only available for Event Segmentation and Funnel Analysis charts.
{{/partial:admonition}}

To enable time granularity, click  +Time in the datepicker. After you enable it, enter the start or end times in hours, minutes, and seconds to accompany your selected date range.

To turn it off, choose click the 'X' near the entered time.

## Presets

The datepicker also supports presets to streamline repetitive analysis and ensure consistency across teams.

### Using presets

Presets allow quick access to predefined time ranges, including:

* Last 7 days
* Last month
* Year to date
* Custom fiscal periods

When you select a preset, the datepicker automatically fills in the associated time range.

### Custom presets

You can create custom presets for recurring analysis windows like product launches, campaigns, or testing periods. Presets can include:

* Specific start/end dates
* Relative timeframes (for example "Last 60 days")
* Optional exclusions (like incomplete data or specific weekdays)

Amplitude defines presets at the project level, and they're available across the project. Admins and managers can create, edit, and manage these presets in Project Settings.

### Default presets

Users can also define their own default preset for a given project. This preset automatically applies when creating new charts.
