---
id: 43132e17-2269-4a6d-bc69-9066e95dec1d
blueprint: analytic
title: 'Anomaly + Forecast: Find anomalies in your data'
source: 'https://help.amplitude.com/hc/en-us/articles/360044072251-Anomaly-Forecast-Find-anomalies-in-your-data'
this_article_will_help_you:
  - 'Distinguish meaningful fluctuations in your core metrics from those caused by statistical noise.'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717697158
---
When core metrics fluctuate, it can be hard to know if those movements are meaningful and worthy of investigation, or just random noise. Amplitude's **Anomaly + Forecast** feature highlights statistically significant deviations from expected values for your metrics, based on historical data. 

This can help you: 

* Determine whether a change is truly meaningful
* Catch instrumentation errors
* Study seasonal trends
* Monitor the impact of product releases

Forecast lets you project metrics into the future, so that you can set realistic goals for your team and product.

### Feature availability

This feature is available to users on **Growth** and **Enterprise plans** only.

## Before you begin

Anomaly detection and forecast can only be applied to time-series data within the following Amplitude charts: Event Segmentation, Conversion over Time (when counting by unique users for the entire funnel), User Sessions, Retention over Time, and Stickiness over Time. 

Within Event Segmentation, it works with rolling windows, rolling averages, growth percentage, and custom formulas that support time series analyses.

Anomaly detection does not work on cumulative time series charts, or charts comparing two different time periods.

If you're using an hourly interval, Anomaly + Forecast supports a maximum of one group-by.

## Set up anomaly detection

The anomaly detection technique used in Anomaly + Forecast is built on the extensively-tested open source tool [Prophet](https://facebook.github.io/prophet/). It's a procedure for forecasting time series data that's robust to missing data points, shifts in trends, as well as large outliers. 

You can find the control for this feature on the left hand side, right above the main chart area. If your chart is not supported by the Anomaly + Forecast feature, the button will be grayed out instead.

To set up anomaly detection, follow these steps:

1. Click *Anomaly + Forecast* to enable the feature. The button will turn orange when the feature is engaged.
2. Click the drop-down arrow to the right of the *Anomaly + Forecast* button.

![anomaly.jpeg](/docs/output/img/analytics/anomaly.jpeg)

3. Select the mode. Your options are **agile**, **robust**, and **custom**. **Agile** mode adjusts more quickly to recent trends, using a 95% confidence interval and 120 days of training data prior to the beginning of the chart's date range. **Robust** mode is best for stable metrics, as it incorporates a full year of additional training data, and can therefore better account for seasonality. **Custom** allows you to change both the confidence interval and the training duration to fit your specific requirements. Higher significance levels tend to results in fewer anomalies appearing on the chart.   

  {{partial:admonition type='note'}}
  Amplitude will automatically detect seasonality in each mode. The duration will depend on the amount of data used to train the model. Agile mode typically uses daily and weekly seasonalities, while Robust mode looks for monthly and yearly seasonalities. In cases where sufficient data is not available, seasonalities may not be detected or applied.
  {{/partial:admonition}}

4. Add a **forecast**, if you prefer. Forecast projects your metrics **into the future**, whereas anomalies are only detected within your historical data. To add a forecast, enter the number of months you'd like your forecast to extend in the *Forecast Period* field.
5. Click *Apply* to begin detecting anomalies.

## Interpret your results

Charts with a single series will display a light blue band (**confidence interval** band) and a dashed line representing the **expected** value beside the solid blue line that is your **actual** data. Any anomalies detected will appear in orange, outside the confidence band. An anomaly can be communicated in this way: "Based on 120 days of training data, we can say with 95% confidence that this data point represents an unexpected change."

If no orange dots are present, all data points are within the confidence interval.

You can run Anomaly + Forecast with multiple series on a chart. However, you'll have to hover over each series to view its confidence band (these will all be displayed in different colors as well).

For forecasts, you'll see the solid lines representing actual data and the confidence intervals until the current date. From there, the forecast will only display dashed lines representing the anticipated future values.  Prophet projects metrics by assuming the magnitude and frequency of changes observed in the past are similar in the future, with a certain degree of confidence. 

Forecast results can be communicated in this way: “Based on the trend seen with the last 120 days of data, we are 95% confident that this metric will be between [high value] and [low value] on [a future date].”

### Determine anomaly causes

Identifying an anomaly is only the first step. You'll likely want to know what caused it in the first place.

Start by looking at a few related metrics to see if you observe anomalies on those as well. In particular, look at the events that fire before or after the step in the funnel. You could also use group-bys on any properties that might yield more insights into why these anomalies occurred.

A third option is to examine the business context surrounding the anomaly. For example, did a new feature ship that day? Could that have been the cause?

Finally, [Amplitude's Root Cause Analysis feature](/docs/analytics/root-cause-analysis) is a powerful tool for tracking down the causes of anomalies.

## Training data

Amplitude uses different default training durations for different time intervals and modes. In custom mode, this is configurable and is added to the chart date range. 

For example, using a daily interval and looking at the last 30 days of data on the chart, the default training data duration for daily charts is 120 days prior to the start of the chart date range. In this case, Amplitude will use a total of **150 days** of data to train the model.

In agile mode, Amplitude uses the following default data training durations:

| **>Time interval used on the chart** | **Default training duration** |
| --- | --- |
| Real time | Not Available |
| Hourly | 7 days |
| Daily | 120 days |
| Weekly | 26 weeks |
| Monthly | 6 months |
| Quarterly | 2 quarters |

In robust mode, Amplitude uses the following default data training durations:

| **>Time interval used on the chart** | **Default training duration** |
| --- | --- |
| Real time | Not Available |
| Hourly | 7 days |
| Daily | 365 days |
| Weekly | 52 weeks |
| Monthly | 12 months |
| Quarterly | 4 quarters |

The **upper limit** of training data (prior periods + chart duration) used for each interval is as follows:

| **>Time interval used on the chart** | **Training duration limits** |
| --- | --- |
| Real time | Not Available |
| Hourly | 14 days |
| Daily | 395 days |
| Weekly | 56 weeks |
| Monthly | 13 months |
| Quarterly | 5 quarters |

If you have a specific training duration in mind that agile or robust modes don't offer, you can set that duration by choosing the custom mode.

## Insights package

If you need alerting for anomalies, Amplitude's Insights package includes automatic and custom monitor alerts. You can find more about the package [here](/analytics/insights).