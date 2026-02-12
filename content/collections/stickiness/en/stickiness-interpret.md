---
id: a2ecdb87-b991-4feb-b75a-44cf9f688d9f
blueprint: stickiness
title: 'Interpret your stickiness analysis'
source: 'https://help.amplitude.com/hc/en-us/articles/360053681271-Interpret-your-stickiness-analysis'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1743538720
landing: true
landing_blurb: 'Draw conclusions about user behavior from your Stickiness chart'
academy_course:
  - 8bd6336d-8535-47ee-a708-c9f7f6fe909a
---
Stickiness helps you dig into the details of your product's user engagement, specifically regarding users that have formed product usage habits.

This article explains the *Metrics* Module of the Stickiness chart and helps you interpret your stickiness analysis.

## Before you begin

If you haven't done so already, read [building a Stickiness chart in Amplitude](/docs/analytics/charts/stickiness/stickiness-identify-features).

## Interpret your Stickiness chart

In Amplitude, you can measure stickiness in one of two ways: **cumulatively** or **non-cumulatively**. You can change this setting at the top of the Metrics Module at any time during your analysis.

### Non-cumulative stickiness

The non-cumulative Stickiness chart shows you the percentage of users who triggered the event at least one time on the **exact number of days** listed on the X-axis. For example, users in the *2 days* bucket have triggered the event on **exactly two days** over the course of a week (or month) in the time frame of your analysis, while those in the *3 days* bucket have done it on **exactly three days** in a week.

![Non-cumulative stickiness chart showing percentage distribution of users across different day buckets](statamic://asset::help_center_conversions::stickiness/stickiness-non-cumulative.png)


{{partial:admonition type='note'}}
A user can appear in more than one bucket of a non-cumulative stickiness analysis for each week (or month) in the time frame. For example, they might trigger the event on one day in week one, and then three times in week two. This user would then be included in both the one-day and three-day buckets.
{{/partial:admonition}}

### Cumulative stickiness

The cumulative Stickiness chart shows you the percentage of users who triggered the event one or more times on **at least the number of days** listed on the X-axis. For example, users in the *2 days* bucket have triggered the event on **two or more** days over the course of a week (or month) in the time frame of your analysis, while those in the *3 days* bucket have done so on **three or more** days in a week.

![Cumulative stickiness chart showing 100% of users in the 1-day bucket with decreasing percentages for higher day buckets](statamic://asset::help_center_conversions::stickiness/stickiness-cumulative.png)

You can also click on a specific data point to inspect the users included in that point. Review the [Microscope](/docs/analytics/microscope) article for more information.

### Breakdown data table

The table shows a detailed breakdown of the data by each user cohort and more granular daily buckets. Days with incomplete data have an asterisk.

![interpret stickiness 5.png](/docs/output/img/stickiness/interpret-stickiness-5-png.png)

## Track changes in stickiness over time

You can also discover how the stickiness of your most engaged users fluctuates over time, by selecting *Change Over Time* from the *..shown as* drop-down menu:

![Stickiness change over time showing fluctuations in two-day, three-day, five-day, and seven-day stickiness across weekly cohorts](statamic://asset::help_center_conversions::stickiness/stickiness-change-over-time.png)

## Create a cohort from your Stickiness chart

Users on Scholarship, Growth, and Enterprise plans can create a [cohort](/docs/analytics/microscope).