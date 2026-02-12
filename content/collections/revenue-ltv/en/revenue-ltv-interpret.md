---
id: 41c34948-571c-4a59-b522-90d2206def5b
blueprint: revenue-ltv
title: 'Interpret your revenue analysis'
source: 'https://help.amplitude.com/hc/en-us/articles/14453697446043-Interpret-your-revenue-analysis'
this_article_will_help_you:
  - 'Identify the strengths and weaknesses of your approach to new-user monetization'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1732570433
landing: true
landing_blurb: 'Identify the strengths and weaknesses of your approach to new-user monetization'
---
It's important to keep in mind that Revenue LTV is a monetization analysis focusing on **new users only**. Forgetting this could easily lead to some off-base interpretations of your data.

{{partial:admonition type='note'}}
This article assumes you have already familiarized yourself with our article on [building a Revenue LTV chart in Amplitude](/docs/analytics/charts/revenue-ltv/revenue-ltv-track-new-user-monetization). If you haven't, please read that before proceeding.
{{/partial:admonition}}

Let's assume you selected a daily frequency breakdown in step 7 of [building your Revenue LTV chart](/docs/analytics/charts/revenue-ltv/revenue-ltv-track-new-user-monetization). It could just as easily be hourly, weekly, monthly, or quarterly, and the underlying logic would be the same. Let's also assume you are looking at a date range beginning December 5th and ending December 20th.

When calculating each data point, the Revenue LTV chart treats all users of each segment who were new users during your chosen timeframe as a **single cohort**. 

For example, the total revenue amount shown on Day 1 is the total revenue collected from users who began using your product between December 5th and December 20th, by the 48th hour after their first Amplitude event. On Day 5, that same metric shows the total revenue collected from that same cohort of users by the **144th hour after** triggering their first active Amplitude event.

{{partial:admonition type='note'}}
Since we are measuring Day 5 revenue, we are actually looking at total revenue across **six** days—remember, Amplitude considers a user's Day Zero to be the first 24 hours after that user triggers their initial event. So the math works out as (24 hours in a day) \* (six days) = 144 hours. 
{{/partial:admonition}}

Because all users are treated as a single cohort, a user who has paid at any time in the past is considered to be a paying user **even** when looking at data points **before** their first payment.

As a further example, imagine you are looking at Day 10. If some users started using your product fewer than ten days ago, their data **will not** be included in the Day 10 calculations. This can lead to **drops** in ARPU and ARPPU near the end of the timeframe, even though they're based on cumulative revenue.

The breakdown table below the chart can show the data broken up by cohorts of users who started on the same day. Click the triangle next to *All Users* to expand.

![](statamic://asset::help_center_conversions::revenue-ltv/rev-ltv-1.png)

You can set up and interpret any Revenue LTV chart easily, as the user interface allows you to read the parameters like a sentence. For example, the following chart shows you a visualization of all revenue events fired by your users, measured by the average revenue per user daily in the last 30 days.

![](statamic://asset::help_center_conversions::revenue-ltv/rev-ltv-2.png)

You can also hover over the individual data points to see the actual amounts.