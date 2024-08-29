---
id: 460e81bb-f27a-4e8b-a427-478147415c71
blueprint: analytic
title: 'Insights: Spot anomalies in your metrics quickly with alerts'
source: 'https://help.amplitude.com/hc/en-us/articles/115001764612-Insights-Spot-anomalies-in-your-metrics-quickly-with-alerts'
this_article_will_help_you:
  - 'Set up and manage alerts to monitor the performance of your important project metrics'
  - 'Send alerts directly to a Slack channel'
landing: false
exclude_from_sitemap: false
updated_by: 5343a026-383e-4b6a-ad4d-df18684b6384
updated_at: 1724970092
---
Amplitude's **alerts** feature is built using [Prophet](https://facebook.github.io/prophet/), an advanced data mining and machine learning technique that automatically detects any anomalies in your product data, and instantly brings these hidden trends to your attention. It does this by first identifying expected values, and the confidence intervals around them, and then analyzing the overall trend of the data and combining it with the weekly trend of the data. 

### Feature availability

To find out if this feature is available for your Amplitude plan, [visit our pricing page](https://amplitude.com/pricing).

## Before you begin

There are a few details about alerts you should be aware of:

* You can set alerts for multiple events and user segments at the same time.
* If you use a group-by on a property, your alert will track metrics against the top 1,000 segments only.
* Currently, custom alerts are available in [Event Segmentation](/docs/analytics/charts/event-segmentation/event-segmentation-build) and [Funnel Analysis](/docs/analytics/charts/funnel-analysis/funnel-analysis-build) charts, and only on those set to a daily or hourly frequency.
* A Funnel Analysis must measure conversion over time in order to support alerts.
* In an Event Segmentation chart, if you need to track weekly or monthly KPIs, use a 7-day or 30-day rolling window. Also, alerts are not supported for the Frequency and Formula tabs, or for the bar chart visualization. Some custom formulas are supported, as long as they produce a chart with an X-axis time series.
* Only chart owners can set alerts. If a chart you would like to receive alerts for already exists but was created by someone else, make a copy and save it before setting up an alert. Additionally, any changes you make to a chart will automatically apply to the alert tracking it.

## Set an alert

There are three types of alerts in Amplitude: **automatic**, **custom**, and **smart**.

An **automatic** alert is set up for every event you instrument in Amplitude. It's designed to track all events for anomalies and unexpected trends. This happens automatically; there is nothing for you to do in setting up an automatic alert.

Amplitude will monitor an event for anomalies once it achieves a volume of 100 or more events per day in at least 15 of the last 30 days. Amplitude considers an anomaly to have occurred when an event's value falls outside of the 99% confidence interval of historical data. Amplitude uses 120 training days for automatic monitors.

Automatic event monitoring applies **only** to individual events. The Amplitude-defined `Any Event` does not qualify for anomaly monitoring.

To subscribe to **automatic** alerts and receive emails when an anomaly is detected, navigate to *Settings > Projects,* find the project you want to monitor, and open the *Automatic Monitors* tab. Switch the *Not Subscribed* toggle to *Subscribed*.

To set a **custom** or **smart** alert for a chart you own, follow these steps:

1. Navigate to the chart you want to set an alert for. Note that the chart must be saved before you can set an alert for it.
2. Select *Set Alert* from the *More* drop-down menu and select either a **smart** alert or a **custom** alert:

    * A **smart alert** will look for unexpected changes outside of a 99% confidence interval.
    * A **custom alert** allows you to be more specific about the conditions under which you'll receive a custom alert: whether it's above or below a specific value, or whether it differs from a previous value by a specified amount. You can also set a custom alert based on confidence interval.

    ![conf_interval.gif](/docs/output/img/analytics/conf_interval.gif)

3. If you are setting up a custom alert, specify your alert conditions (these will be tied to the chart's current value either exceeding or falling below a specific value, or to changes in the confidence interval). If you are setting up a smart alert, skip this step.
4. Add the emails of everyone who should receive this alert, and click *Set Alert*.

For custom or smart alert, the training days are 120 for daily interval charts and 14 for hourly interval charts.

### Confidence intervals and statistical significance in custom alerts

When setting up a custom alert, you can choose to receive alerts when significance thresholds of 95%, 98%, or 99% are breached. These confidence intervals are determined by taking your historical data and identifying where 95%, 98%, and 99% of all data points fall.

![conf_int.png](/docs/output/img/analytics/conf_int.png)

The higher the required significance, the less "noisy" your alerts will be. In charts, the blue band represents the range of the confidence interval. A 95% confidence interval will have a narrower band than a 99% confidence interval, because the 99% confidence interval captures more historical data points.

## View and manage alerts

You can see a list of **recently-triggered** alerts for a project by clicking *Notifications* in the left-hand sidebar, then opening the *Alerts* tab. The project can be changed by using the project switcher on the left, and you can see a list of **all existing** alerts for the current project by clicking <img src="/docs/output/img/analytics/gear_icon_for_settings.png" alt="gear_icon_for_settings.png" style="display:inline-block;" /> *Manage Custom Alerts*, and opening either the *Custom Monitors* (for **custom** alerts) or the *Automatic Monitors* (for **smart** alerts) tab. Click on an alert to edit or manage it.

## Alert emails

When an alert is triggered, Amplitude will send an email to everyone who is designated to receive them. This email will be sent by 8:00 AM in the project's timezone for daily metrics, or the hour after an anomaly if an hourly metric is detected.

Click on a chart in the email to be taken directly to that chart in Amplitude. You'll see a side-panel that reiterates the issue Amplitude alerted you about, so you won't lose important context in the moment.

The charts sent in alert emails may have a `server_upload_time` filter to show the value of the data point at the exact time the alert was triggered. It's important to note that, depending on the data point, the value in the alert email may be different than the data point's end of day or final value.

## Slack notifications

In addition to receiving emails when alerts are triggered, you can also set up an alert to post to one or more Slack channels.

When you configure or modify an alert, you can select Slack channels in the *Notification* section at the bottom of the modal.

![slack_chart_alerts.png](/docs/output/img/analytics/slack_chart_alerts.png)

If you have not set up the [Slack integration](/docs/analytics/integrate-slack) yet, you will see a button here that will let you connect your Amplitude account to Slack.