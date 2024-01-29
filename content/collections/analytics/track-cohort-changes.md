---
id: d60ded31-18b1-466c-bb81-34e6455ee52a
blueprint: analytic
title: 'Track changes in your cohort populations over time'
source: 'https://help.amplitude.com/hc/en-us/articles/360049309011-Track-changes-in-your-cohort-populations-over-time'
---
#### This article will help you:

* Identify and act on trends in the populations of your dynamic cohorts

Amplitude's **cohort population over time** chart shows you how the size of your behavioral cohorts are changing. As you release new features and launch new campaigns, understanding how your customers respond to them is a critical part of the iteration process. Cohort population over time gives you a simple, intuitive display of these trends.

Cohort population over time is part of Amplitude's [Behavioral Cohorts](/analytics/behavioral-cohorts) feature. If you're not already familiar with it, check out the linked article in our Help Center.

To view changes in a cohort population over time, navigate to the Cohort Details page and scroll below the cohort definition:

![population over time.png](/output/img/analytics/population over time.png)

Cohort population over time will show you, as a time series, the **number of users** who meet a cohort definition on each day over a predefined time.

Let’s say you want to define a [behavioral cohort](/analytics/behavioral-cohorts) of power users as those who have triggered at least 50 active events in the past 30 days:

![Cohort_Pop_2.png](/output/img/analytics/Cohort_Pop_2.png)

There are 15,391 users in this cohort. The cohort population over time graph will show you what that number was each day, over the past 30 days:

![pasted_image_0.png](/output/img/analytics/pasted_image_0.png)

In the graph above, the number of users who met the criteria for the 30-day period ending September 6 was 14,988. This means 14,988 users fired more than 50 active events between 7 August and 6 September. From the graph, you can see your power user cohort population has been steady over the last month. Knowing this will help you assess the effectiveness of any campaigns or releases from your team.

Cohort population over time can also help in other situations:

* Understanding the number of newly activated users
* Analyzing growth of paying users cohort
* Analyzing growth of [sticky users](/analytics/charts/stickiness/stickiness-identify-features) cohort
* Analyzing growth of churned users cohorts
* Analyzing growth of different personas (for example, wish-list users, or single or multi-device watchers)
* Analyzing growth of cohort of users who have achieved certain milestones, like making their first purchase

## FAQs

**Can I adjust the date range or level of detail?**

Unfortunately, not at this time.

**I don’t see cohort population under my cohort. Is this expected?**

Cohort population is only supported for **dynamic cohorts**, i.e. cohorts that can be recomputed according to specified criteria. It is not supported for static cohorts. Examples of static cohorts include those imported from a CSV file, or created using Microscope within charts.

Additionally, the following cohorts are not supported:

* cohorts that contain "had user property most recently" in the definition
* cohorts that have more than 10 OR clauses in the definition
