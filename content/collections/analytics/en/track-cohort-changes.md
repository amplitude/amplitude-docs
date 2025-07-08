---
id: d60ded31-18b1-466c-bb81-34e6455ee52a
blueprint: analytic
title: 'Track changes in your cohort populations over time'
source: 'https://help.amplitude.com/hc/en-us/articles/360049309011-Track-changes-in-your-cohort-populations-over-time'
this_article_will_help_you:
  - 'Identify and act on trends in the populations of your dynamic cohorts'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717624206
ai_summary: "Amplitude's cohort population over time chart in Behavioral Cohorts helps you track changes in user numbers based on defined behaviors. It shows daily counts within a specified period, aiding in assessing campaign and feature effectiveness. You can monitor power users, activated users, paying users, stickiness, churn, and more. The feature is useful for evaluating user milestones and personas. Note that cohort population is available for dynamic cohorts only, not static ones or certain specific cohort types. The chart provides valuable insights for optimizing strategies and understanding user behavior trends."
---
Amplitude's **cohort population over time** chart shows you how the size of your behavioral cohorts are changing. As you release new features and launch new campaigns, understanding how your customers respond to them is a critical part of the iteration process. Cohort population over time gives you a simple, intuitive display of these trends.

Cohort population over time is part of Amplitude's [Behavioral Cohorts](/docs/analytics/behavioral-cohorts) feature. If you're not already familiar with it, check out the linked article in our Help Center.

To view changes in a cohort population over time, navigate to the Cohort Details page and scroll below the cohort definition:

![population over time](/docs/output/img/analytics/population-over-time.png)

Cohort population over time shows, as a time series, the **number of users** who meet a cohort definition on each day over a predefined time.

Let’s say you want to define a [behavioral cohort](/docs/analytics/behavioral-cohorts) of power users as those who have triggered at least 50 active events in the past 30 days:

![Cohort_Pop_2.png](/docs/output/img/analytics/Cohort_Pop_2.png)

There are 15,391 users in this cohort. The cohort population over time graph shows you what that number was each day, over the past 30 days:

![pasted_image_0.png](/docs/output/img/analytics/pasted_image_0.png)

In the graph above, the number of users who met the criteria for the 30-day period ending September 6 was 14,988. This means 14,988 users fired more than 50 active events between 7 August and 6 September. From the graph, you can see your power user cohort population has been steady over the last month. Knowing this can help you assess the effectiveness of any campaigns or releases from your team.

Cohort population over time can also help in other situations:

* Understanding the number of newly activated users
* Analyzing growth of paying users cohort
* Analyzing growth of [sticky users](/docs/analytics/charts/stickiness/stickiness-identify-features) cohort
* Analyzing growth of churned users cohorts
* Analyzing growth of different personas (for example, wish-list users, or single or multi-device watchers)
* Analyzing growth of cohort of users who have achieved certain milestones, like making their first purchase

## FAQs

**Can I adjust the date range or level of detail?**

No, this isn't available.

**I don’t see cohort population under my cohort. Is this expected?**

Only dynamic cohorts support listing cohort population. Amplitude recomputes these cohorts according to the specified criteria. Static cohorts don't support listing the cohort population. Examples of static cohorts include those imported from a CSV file, or created using Microscope within charts.

Additionally, the following cohorts aren't supported:

* cohorts that contain "had user property most recently" in the definition
* cohorts that have more than 10 OR clauses in the definition