---
id: a7958374-901d-401d-abc9-ba400074edbd
blueprint: analytic
title: 'Identify users with similar behaviors'
source: 'https://help.amplitude.com/hc/en-us/articles/231881448-Behavioral-cohorts-Identify-users-with-similar-behaviors'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
landing: true
landing_blurb: 'In Amplitude, a **cohort** is a group of users who share a trait or set of traits.'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1727218471
pricing_information: 5d99038a-1046-415e-b4ba-a7a27eb0918b
---
In Amplitude, a **cohort** is a group of users who share a trait or set of traits. There are two different types of cohorts: [predictive cohorts](/docs/cdp/audiences/predictions) and **behavioral cohorts**. 

### Feature availability

This feature is available to users on **Plus**, **Growth**, and **Enterprise** **plans** only.

### Restrictions

This feature is available for users on **Plus** plans. 

* Organizations on the Plus plan have a limit of five behavioral cohorts

Behavioral cohorts are defined by user actions taken within a specific time period. They allow you to group together different users based on the events they've triggered in your product. Once you've created a cohort, you can add them as a segment in many Amplitude charts.

Some examples of behavioral cohorts might be:

* Users who watch three consecutive episodes of a TV show in the first day after signing up for a video streaming service
* Users who enable push notifications during onboarding
* Android users who abandoned their carts on an e-commerce site in the last month

## heading
Ultimately, this sort of behavioral data reveals how engagement with your product affects retention, conversion, revenue, and other business outcomes you care about.

Cohorts are extremely useful across the Amplitude platform. To segment your data by cohorts, select *Cohort* in the [Segmentation Module](/docs/analytics/charts/build-charts-add-user-segments), and then choose the cohort you're interested in from the drop-down list.

For any chart or query that segments on a cohort, the segmented cohort automatically recomputes itself whenever the chart generates. You can manually re-compute the cohort at any time by clicking the refresh icon.

## ANother heading
If you have the [Accounts add-on](/docs/analytics/account-level-reporting), you can apply a group-level cohort instead of a cohort of users. When you select a specific group type, only the cohorts it contains appear in the drop-down list on the right side of the equals sign:

![behavioral_cohorts_1.png](/docs/output/img/analytics/behavioral_cohorts_1.png)

You can also create a chart using the cohort directly from the Cohort page:

## Last one
![cohort create chart.png](/docs/output/img/analytics/cohort-create-chart.png)

But before you can do any of that, define a new cohort. Read the next article to learn how to [define a new cohort](/docs/analytics/define-cohort).