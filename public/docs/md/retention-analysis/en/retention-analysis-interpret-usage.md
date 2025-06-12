---
id: f50ba26f-5561-46a1-99f5-dd6ae795fdb8
blueprint: retention-analysi
title: 'Interpret your Retention Analysis chart: Usage interval'
source: 'https://help.amplitude.com/hc/en-us/articles/14309698064923-Interpret-your-Retention-Analysis-chart-Usage-interval'
this_article_will_help_you:
  - 'Read a retention analysis'
  - "Understand the Retention Analysis chart's usage interval view"
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717103051
landing: true
landing_blurb: "Understand the Retention Analysis chart's usage interval view"
---
In a retention analysis, the **usage interval** shows the percentage of active users who’ve triggered the selected events with a specified daily, weekly, or monthly median frequency. These events must be triggered on **at least two different days** in order for the users to be included. 

Your usage interval is important for drawing accurate conclusions about your retention numbers. Some products are built to be used daily, while others might be used much less frequently. Knowing how often your product is actually used will help you gauge the health of your product when looking at Retention Analysis and [Lifecycle](/docs/analytics/charts/lifecycle/lifecycle-track-growth) charts.

To view the usage interval, click *Usage Interval* in the Measured As module.

![Screenshot_2023-03-31_at_12.19.15_PM.png](/docs/output/img/retention-analysis/screenshot-2023-03-31-at-12-19-15-pm-png.png)

Let's say your product's critical event is `Purchase Song or Video`. You can select this event and use the usage interval view to find the usage interval for that event. To calculate this, Amplitude plots the distribution of each user's median return period: For each user, Amplitude will look at all `Purchase Song or Video` events they triggered in the last 15 days, and then determine the median length of time between each of these events. 

For example, the highlighted data point tells us that 65.4% of your users have a median interval of four days or fewer between each `Purchase Song or Video` event. This inflection point can be interpreted as your usage interval. You can use this usage interval to create a [Return On (Custom)](/docs/analytics/charts/retention-analysis/retention-analysis-interpret) chart or a [Lifecycle](/docs/analytics/charts/lifecycle/lifecycle-track-growth) chart. In this case, it looks like four days is the expected usage interval for active users with the critical event of `Purchase Song or Video`.

![](/docs/output/img/retention-analysis/KiqoU43o_Cws3qYg9f1vK9PBWbnYg2LAREIn_BuYEP7At-hkWclSCblLztzVNe5h3bhd6jNx6pnmbA_Iai8j3fGp-w4aciOz34utjM1-jBlWjsxxK0u5f05c8cFJ4ofmJjQ8bNhmK6_Jfei0-cpoDts.png)

{{partial:admonition type='note'}}
To learn more about how to find your critical event, check out this [blog post](https://blog.amplitude.com/user-retention-app-critical-event).
{{/partial:admonition}}

You can see how the median frequency between events changes over time by selecting the *Usage Interval Over Time* view. Amplitude does not plot averages in this view; instead, it shows the actual percentages. 

For example, the following data point shows us that of the users who triggered `Purchase Song or Video` on March 10th, 89.1% of them fired it again within seven days. 

![Screenshot_2023-03-31_at_12.21.42_PM.png](/docs/output/img/retention-analysis/screenshot-2023-03-31-at-12-21-42-pm-png.png)