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

In Funnel Analysis charts, a user could enter the funnel multiple times, or perform the various steps multiple times. In order to decide if a user counts as converted in a Funnel Analysis chart with a Historical Count filter, Amplitude considers two things: 

1. The *N*th instance must be within the date picker dates; and
2. The *N*th instance must occur within the [conversion window](/docs/analytics/charts/funnel-analysis/funnel-analysis-build) of the other funnel steps.

As an example, let's imagine a two-step funnel. We've set the Historical Count filter to 2 on `event_a`, with a date range of December 21st, 2020 to December 22nd, 2020. The funnel is:

Step 1 = `event_a`

Step 2 = `event_b`

And the user has performed the events in this order: BBABAB.

Here, in order to count as a conversion, the user will have to perform the second instance of `event_a` in the specified date range (December 21 and 22, 2020), **and** perform `event_b` within the conversion window for `event_a`.

If we instead apply the Historical Count filter of 2 to the second event—everything else remaining equal—the user will count as a conversion if:

* **Either** occurrence of `event_a` is in the specified time frame,
* The **second** occurrence of `event_b` is in the specified time frame, and
* `Event_a` (the one in the specified time frame) was performed **before** the second occurrence of `event_b`.

{{partial:admonition type='note'}}
When using [Historical Count filters](/docs/analytics/historical-count-1) on the same events that happen within the same second, users will appear to have dropped off. This is because the [funnel query](/docs/analytics/charts/funnel-analysis/funnel-analysis-interpret) does not distinguish between events that happen within the same second, but the Historical Count filter does. 
{{/partial:admonition}}

## Historical Count in behavioral cohorts

Historical Count and behavioral cohorts are related but are **distinct** concepts in Amplitude. 

A behavior cohort can be used to define a group of users who took a specific action with a certain frequency in a specific time frame—for example, users who completed a workout five times in the last 30 days. A fitness company might want to know which of its users fit this description, as it may be their definition of a recent power user.

Conversely, Historical Count allows you to pinpoint a user’s fifth workout. So if they completed only two workouts in the last 30 days, but had also completed three workouts prior to that, the most recent workout was actually their fifth. This is an important distinction, because a user’s fifth workout overall could also mark an important milestone in their overall user lifecycle: they have now transitioned into a group of users that are highly likely to retain long-term, or be a frequent purchaser.

Amplitude allows users to combine the power of both, by creating a cohort with historical count as a condition. You can also see the cohort population over time as well.

To add Historical Count to a behavioral cohort, see our Help Center article on [creating a behavioral cohort in Amplitude](/docs/analytics/behavioral-cohorts).
