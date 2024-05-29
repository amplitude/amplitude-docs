---
id: f69d9c00-3e3a-4bc2-ab22-8693888f3be5
blueprint: funnel-analysi
title: "Get the most out of Amplitude's Funnel Analysis chart"
source: 'https://help.amplitude.com/hc/en-us/articles/115001351507-Get-the-most-out-of-Amplitude-s-Funnel-Analysis-chart'
this_article_will_help_you:
  - 'Understand the value of a funnel analysis in Amplitude'
  - 'Plan and design your Funnel Analysis chart'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717015155
---
Funnel analysis has become the cornerstone of event-based analytics. A **funnel** is a series of steps a user takes as part of the experience of using your product. Product managers often try to encourage users to navigate these funnels in order to demonstrate product value and to increase engagement. Amplitude considers a user to have **converted** through a step in the funnel if they trigger the event in the order you've specified.

Users who don't convert have **dropped off**. Knowing which steps of your funnel are leading to user drop-off is often a critical tool in improving engagement and stickiness.

Using Amplitude's [Journeys](/analytics/behavioral-cohorts) features, you can easily identify and set up insightful funnels.

### Feature availability

This feature is available to users on **all Amplitude plans**. See our [pricing page](https://amplitude.com/pricing) for more details.

## Identify funnel events: Which ones should you include?

Funnels should track the flow of users along a critical path in your product. Each funnel step is a distinct action a user can take within a flow you want to analyze.

For example, if you were measuring an onboarding funnel, you may track the following events:

* `Create Account` →
* `SignUpPage1` →
* `SignupPage2` →
* `Registration Complete`

For an e-commerce platform, tracking a purchase funnel might involve the following sequence of events:

* `View Item` →
* `Add to Cart` →
* `Checkout` →
* `Purchase Confirmation`

These examples work great if you already know the paths your users take. However, it's impossible to know every possible navigation route within your platform, especially since the ones your customers are using may at first seem counterintuitive. Amplitude has additional features to help:

* The [Pathfinder](/analytics/charts/journeys/journeys-understand-paths) feature shows the most commonly-taken event paths in your product, either following a specific start action or preceding a specific end action, and helps you discover the alternate navigation routes your users are already taking.
* [Compass](/analytics/charts/compass/compass-aha-moment) can help you find the event most correlated with retention, or your most important KPI.

The next step would be uncovering the different paths users take before triggering these events, so you can encourage that behavior. You could start by trying to understand the actions users are taking immediately before triggering `Search Song or Video`, by analyzing a flow ending with that event. You might find that `Favorite Song or Video` is the most commonly-triggered event immediately before the `Search Song or Video` event.

You could look at this in the other direction. What events are users triggering immediately after adding searching for a song? To answer this question, build a **starting-with** flow, beginning with that event.

## Design the funnel

When setting up your funnel, you will have to decide whether to use **This Order**, **Any Order**, or **Exact Order** mode. The first requires users to follow the **specified order** of events to be counted as converted, but they are also able to trigger additional events along the way. The conversion window is potentially much shorter for this mode: you can set it to as little as one second. Any order counts as converted all users who trigger the funnel steps **in any order** during the conversion window, which you can set anywhere between one and 90 days. Exact order works similarly to this order, but users may **not** trigger any other events along the way. 

Read more in our [Help Center article about building a funnel analysis in Amplitude](/analytics/charts/funnel-analysis/funnel-analysis-build).

Imagine you've been sending push notifications to certain users to get them to play songs. However, you've found that a lot of users trigger `Add a Friend`, `Play Song or Video`, and `Add to Playlist` close to each other. Maybe it's worth understanding whether sending those push notifications actually makes those users more likely to also add more friends. If so, that would be a great insight, and would validate the hypothesis that push notifications have a complementary effect on other major KPIs.

Read more about the [semantics of Amplitude's funnel conversion window](/analytics/charts/funnel-analysis/funnel-analysis-interpret).

## Building and interpreting your funnel analysis

Once you've designed a funnel analysis that will work for you, move on to our [Help Center article on building a funnel analysis in Amplitude Analytics](/analytics/charts/funnel-analysis/funnel-analysis-build), and then learn how to [interpret your results](/analytics/charts/funnel-analysis/funnel-analysis-interpret).

## Acting on the funnel insights

Your next goal should be to create a retention loop where you can get more users to come back and take the desired action—add more friends—which is correlated with retention, your main KPI in this scenario.

For example, you could go back to your funnel and use the [Microscope](/analytics/microscope) feature to make cohorts of users who dropped off from the funnel at critical points, like `Add To Playlist` and `Add Friends`, and message them to take the corresponding actions.

You can use an in-house messaging platform or one of Amplitude's push notification partners like [Airship](https://www.urbanairship.com/) or [Kahuna](https://www.kahuna.com/) to message these cohorts.

## Next steps

Now that you know all about Amplitude's Funnel Analysis chart, the next step is to [build one for yourself](/analytics/charts/funnel-analysis/funnel-analysis-build).