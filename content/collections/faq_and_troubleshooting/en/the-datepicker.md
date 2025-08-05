---
id: 58d6a33c-545b-44fe-a840-d5df0a1ab748
blueprint: faq_and_troubleshooting
title: 'The datepicker'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/18133682827419'
this_article_will_help_you:
  - 'Understand nuances in the way the datepicker understands time'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718928315
---
In Amplitude, you use the datepicker to select the timeframe of the analysis you're conducting. In many ways, it's very intuitive, as it's something you've most likely seen in other software contexts. You can choose to analyze data collected between two dates, since a specific date, or in the last *x* days, weeks, or months, where *x* is a value you select. 

However, there are certain nuances to the way the datepicker understands time. This **explainer** should clarify these nuances for you.

## Offset

When using Last, your queries will return the data from the timeframe you specified, **as well as the latest, still-incomplete interval**.

For example, if you set the datepicker to the last 30 days, you'll get data from the last 30 full days, **and** data from however many hours have elapsed today. 

![newDropdownDatepicker.png](/docs/output/img/faq/newdropdowndatepicker-png.png)

The dotted line that's framing March 13th tells you that the data for that day is incomplete. Similarly, you'd see this data represented on a chart as a [dotted line](/docs/faq/the-dotted-line-in-amplitude-charts).

If you'd rather not get data from the incomplete day, you can use an **offset**. To use an offset, click *Add Offset* from the *Advanced Settings* dropdown. Then enter the number of days to offset by.

Using the example from above, set the datepicker to collect data from the last 30 days, offset by one. The current date, March 13th, would no longer be surrounded by a dotted line because it would be excluded from your analysis.

To remove the offset, click *Remove Offset* from the *Advanced Settings* dropdown. 

## Exclude

When using Since or the Last *x* days, weeks, or months options, you can also choose to **exclude the current day**, week, or month. This can be helpful when the entirety of data for the selected timeframe is not yet available. 

To exclude the current day, click *Exclude Today* from the *Advanced Settings* dropdown. The current date (March 13th) would no longer be framed in a dotted line and would be excluded from your analysis. 

![newDatepickerExcludeON.png](/docs/output/img/faq/newdatepickerexcludeon-png.png)

You can change this at anytime by clicking *Include Today*. Use the same process to exclude or include the current week or current month in the datepicker.

{{partial:admonition type='note'}}
 The offset and exclude functionalities cannot be used simultaneously. 
{{/partial:admonition}}

## Time input

When using Since or Between, you can narrow down your selected time frame even further by enabling **time input**. Time input allows you to enter a start time or an end time to add granularity to your analysis. 

{{partial:admonition type='note'}}
 The datepicker's time input feature is only available for Event Segmentation and Funnel Analysis charts.
{{/partial:admonition}}

To enable time granularity, click *Enable Time Input* from the *Advanced Settings* dropdown. Once enabled, enter the desired start or end times in hours, minutes, and seconds to accompany your selected date range.

![newDatepickerGranularityON.png](/docs/output/img/faq/newdatepickergranularityon-png.png)

To turn it off, choose *Disable Time Input* from *Advanced Settings*.