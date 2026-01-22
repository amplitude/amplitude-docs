---
id: a4bddb42-4981-4ea5-b915-5ae66fd19031
blueprint: analytic
title: 'Historical Count, part 3: Funnels and behavioral cohorts'
source: 'https://help.amplitude.com/hc/en-us/articles/21065498729243-Historical-Count-part-3-Funnels-and-behavioral-cohorts'
this_article_will_help_you:
  - 'Learn how to leverage Historical Counts in your funnel analyses and behavioral cohorts'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717692188
---
This article is third in a series about Historical Counts. If you haven't done so already, read parts [one](/docs/analytics/historical-count-1) and [two](/docs/analytics/historical-count-2).

## Historical count in funnel analyses

In Funnel Analysis charts, a user could enter the funnel multiple times, or perform the various steps multiple times. To decide if a user counts as converted in a Funnel Analysis chart with a Historical Count filter, Amplitude considers two things: 

1. The *N*th instance must be within the date picker dates; and
2. The *N*th instance must occur within the [conversion window](/docs/analytics/charts/funnel-analysis/funnel-analysis-build) of the other funnel steps.

As an example, imagine a two-step funnel. In this example, the Historical Count filter is set to 2 on `event_a`, with a date range of December 21st, 2020 to December 22nd, 2020. This means that you want to know when `event_a` was performed for the second time (Historical Count filter = 2).  

The funnel is:

Step 1 = `event_a`

Step 2 = `event_b`

And the user has performed the events in this order: BBAB**A**B.

The chart looks back 12 months (to December 21st, 2019 in this example) for historical context. If the second time the event happened wasn't within the stated date range (December 21st, 2020 to December 22nd 2020) and, instead, was some time previous, the chart doesn't include the user in the chart. 

The user must perform the second instance of `event_a` within the specified date range (December 21 to December 22, 2020) to be counted as converted.

If the Historical Count filter is applied to the second event (`event_b`), and the user performs the event in this order: B**B**ABAB

Then all of the following must occur for the user to appear in the chart:

* `event_a` occurred within the specified time period (December 21st, 2020 to December 22nd, 2020)
* `event_b` occurred within the specified time period
* `event_a` (the occurrance within the specified time period) happened before the second occurrence of `event_b`

If either of the events occurred outside of the specified date range, or if `event_a` did not occur before the seccond instance of `event_b` within the timeframe, then the user isn't included.

{{partial:admonition type='note'}}
When using [Historical Count filters](/docs/analytics/historical-count-1) on the same events that happen within the same second, users appear to have dropped off. This is because the [funnel query](/docs/analytics/charts/funnel-analysis/funnel-analysis-interpret) doesn't distinguish between events that happen within the same second, but the Historical Count filter does. 
{{/partial:admonition}}

## Historical Count in behavioral cohorts

Historical Count and behavioral cohorts are related but separate concepts in Amplitude. 

A behavior cohort defines a group of users who took a specific action with a certain frequency within a specific time period. For example, users who completed a workout five times in the last 30 days. A fitness company might want to know which of its users fit this description, as it might be their definition of a recent power user.

Conversely, Historical Count lets you pinpoint a user’s fifth workout. So if they completed only two workouts in the last 30 days, but also completed three workouts before that, the most recent workout was actually their fifth. This is an important distinction, as a user’s fifth workout overall could also mark an important milestone in their overall user lifecycle in that they have now transitioned into a long-term group of users.

Amplitude lets you combine the power of both by creating a cohort with historical count as a condition. You can also see the cohort population over time.

### Limitations with "Any Event" and "Any Active Event"

When using Historical Count in Cohort Builder, you can't use "Any Event" or "Any Active Event" for dynamic cohorts. These event types work only when creating static cohorts:

* **Dynamic cohorts**: Using Historical Count in Cohort Builder creates a dynamic cohort that updates automatically. However, "Any Event" and "Any Active Event" aren't supported for dynamic cohorts with Historical Count.
* **Static cohorts**: If you create a cohort using "Any Event where Historical Count = 1", it becomes a static cohort. Static cohorts don't update automatically and represent a snapshot of users at a specific point in time.
* **Workaround**: To track users based on "Any Event" with Historical Count, create the analysis in an Event Segmentation chart first, then save it as a static cohort.

This limitation applies only to Cohort Builder. You can still use "Any Event" or "Any Active Event" with Historical Count in Event Segmentation, Funnel Analysis, Pathfinder, and Retention Analysis charts.

To add Historical Count to a behavioral cohort, review [Creating a behavioral cohort in Amplitude](/docs/analytics/behavioral-cohorts).
