---
id: a2ecdb87-b991-4feb-b75a-44cf9f688d9f
blueprint: stickiness
title: 'Interpret your stickiness analysis'
source: 'https://help.amplitude.com/hc/en-us/articles/360053681271-Interpret-your-stickiness-analysis'
this_article_will_help_you:
  - 'Draw conclusions about user behavior from your Stickiness chart'
  - 'Set up a behavioral cohort from your stickiness analysis'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717104143
landing: true
landing_blurb: 'Draw conclusions about user behavior from your Stickiness chart'
---
Stickiness will help you dig into the details of your product's user engagement, specifically regarding users that have formed product usage habits.

This article will explain the *Metrics* Module of the Stickiness chart, and will help you interpret your stickiness analysis.

## Before you begin

If you haven't done so already, be sure to read our article on [building a Stickiness chart in Amplitude](/docs/analytics/charts/stickiness/stickiness-identify-features).

## Interpret your Stickiness chart

In Amplitude, Stickiness can be measured in one of two ways: **cumulatively** or **non-cumulatively**. You can change this setting at the top of the Metrics Module at any time during your analysis.

### interpret stickiness 1.png

### Non-cumulative stickiness

The non-cumulative Stickiness chart shows you the percentage of users who triggered the event at least once on the **exact number of days** listed on the X-axis. For example, users in the *2 days* bucket have triggered the event on **exactly two days** over the course of a week (or month) in the time frame of your analysis, while those in the *3 days* bucket have done it on **exactly three days** in a week.

![interpret stickiness 2.png](/docs/output/img/stickiness/interpret-stickiness-2-png.png)

In this example, more than 70% of users who added friends during the last 12 weeks, did so on only one day during a given week in the analysis's time frame. Roughly 24% did so on exactly two days, while no users did so on all seven days of any week in the time frame.

{{partial:admonition type='note'}}
 A user can appear in more than one bucket of a non-cumulative stickiness analysis for each week (or month) in the time frame. For example, they might trigger the event on one day in week one, and then three times in week two. This user would then be included in both the one-day and three-day buckets.
{{/partial:admonition}}

### Cumulative stickiness

The cumulative Stickiness chart shows you the percentage of users who triggered the event one or more times on **at least the number of days** listed on the X-axis. For example, users in the *2 days* bucket have triggered the event on **two or more** days over the course of a week (or month) in the time frame of your analysis, while those in the *3 days* bucket have done so on **three or more** days in a week.

![interpret stickiness 3.png](/docs/output/img/stickiness/interpret-stickiness-3-png.png)

Notice the percentage of users who have added friends on one or more days of a given week is 100%. This will always be the case in a cumulative stickiness analysis. That's because any analysis includes only users who have actually triggered the event—and since, by definition, they **all** will have triggered it on at least one day during the selected time frame and be included in the *1 day* bucket.

You can also click on a specific data point to inspect the users included in that point. See our Help Center article on the [Microscope](/docs/analytics/microscope) for more information.

### Breakdown data table

The table shows a detailed breakdown of the data by each user cohort and more granular daily buckets. Days with incomplete data will have an asterisk.

![interpret stickiness 5.png](/docs/output/img/stickiness/interpret-stickiness-5-png.png)

## Track changes in stickiness over time

You can also discover how the stickiness of your most engaged users fluctuates over time, by selecting *Change Over Time* from the *..shown as* drop-down menu:

![interpret stickiness 4.png](/docs/output/img/stickiness/interpret-stickiness-4-png.png)

In this example, we can see how two-day, three-day, five-day, and seven-day stickiness fluctuated with each week's new cohort of users. 

## Create a cohort from your Stickiness chart

Users on Scholarship, Growth, and Enterprise plans can create a [cohort](/docs/analytics/microscope).