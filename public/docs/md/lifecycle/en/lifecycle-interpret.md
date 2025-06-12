---
id: 0e2e4182-9627-49a1-a313-ed70f3a1076c
blueprint: lifecycle
title: 'Interpret your Lifecycle chart'
source: 'https://help.amplitude.com/hc/en-us/articles/21037113562651-Interpret-your-Lifecycle-chart'
this_article_will_help_you:
  - 'Interpret the results of your Lifecycle chart'
  - 'Switch between chart types'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1732570352
landing: true
landing_blurb: 'Interpret the results of your Lifecycle chart'
---
This article will review how to interpret your Lifecycle analysis. Make sure you've read the previous Help Center article on [setting up the Lifecycle chart](/docs/analytics/charts/lifecycle/lifecycle-track-growth) before proceeding.

## Interpret your Lifecycle chart

The Lifecycle chart's default display is a histogram with two buckets for each of your usage intervals. The blue buckets contain active users, while the red bucket contains dormant users.

This is your **Growth** chart. It shows the distribution of active users and the count of dormant users for a particular day, week, or month. This allows you to see which group of users affects your active user counts the most.

Earlier, we mentioned that all your **active users** would fall into one of three groups: **new**, **current**, or **resurrected** (formerly inactive). Each of these groups is represented in the different shades of blue in the histogram's blue bar. Let's define the three active user groups by looking at days 1 and 2 from the above **Growth** chart:

* A **new user** (light blue) is one who is new in Amplitude as a whole within one usage interval of whenever they performed the event. Amplitude will count that user as **new** for one full interval after their first event is received. Since our example looks at daily usage, a user will be considered **new** on August 1st if they fired the event and were new to Amplitude on the same day - August 1st.
* A **current user** (medium blue) is one who logged the specified event in the **current** interval and also**in the previous usage interval** (day, week, or month). Using the same example, a user who fired the specified event on August 1st and August 2nd would be considered a **current** user on August 2nd.
* A **resurrected user** (dark blue) is a user who logged the specified event in the **current** interval but did **not** log the event in the previous interval (previously inactive). In our example, a user who was new to Amplitude on August 1st, but didn't fire the specified event until August 2nd would be considered a **resurrected** user on August 2nd.

![Screenshot 2023-08-08 at 12.01.00 PM.png](/docs/output/img/lifecycle/screenshot-2023-08-08-at-12-01-00-pm-png.png)

We also have **dormant users**, represented by the red bar. A dormant user is one who did not log the event you've specified, but who was had logged the specified event during the previous time period (day, week, or month). For example, a user who was active on January 1st but **not** active on January 2nd would be considered a dormant user on January 2nd.

### Breakdown table

Below the chart is a [breakdown table](/docs/analytics/charts/review-chart-data) of lifecycle data. You can export the data table as a .CSV file by clicking *Export CSV*.

![lifecycle breakdown table.png](/docs/output/img/lifecycle/lifecycle-breakdown-table-png.png)

## Switch between views

There are also two other views for your Lifecycle chart: Dormant and Pulse.

### Dormant

The Dormant chart shows the distribution of dormant users for a particular day, week, or month. For example, a dormant new user on November 21st (shown in the bar between November 20th and November 21st) is a user who was new on November 20th but became dormant on November 21st.

![](statamic://asset::help_center_conversions::lifecycle/lifecycle-dormant.png)

### Pulse

The Pulse chart shows the ratio of incoming (new and resurrected) users to outgoing (dormant) users for a particular day, week, or month. The ratio shows how many active users you gain for each user who goes dormant.

Specifically, Pulse uses the following formula:

`(# of new users + # of resurrected users) / (# of dormant users)`

Broadly speaking:

* **Pulse > 1** means you're gaining users faster than you're losing them—your product is experiencing growth.
* **Pulse < 1** means you're losing more users than you're gaining—and your product isn't growing.

For example, in the chart below, pulse was 0.95 between December 5th and December 11th. This means we lost more users in that interval than we gained or resurrected.

![](statamic://asset::help_center_conversions::lifecycle/lifecycle-pulse.png)