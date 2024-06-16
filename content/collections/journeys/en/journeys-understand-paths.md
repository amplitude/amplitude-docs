---
id: b8a605c9-d9fa-44ee-8508-12991ce72e74
blueprint: journey
title: 'Understand the paths users take, and why they convert'
source: 'https://help.amplitude.com/hc/en-us/articles/16427637651995-Journeys-Understand-the-paths-users-take-in-your-product-and-why-they-convert'
this_article_will_help_you:
  - 'Analyze conversions between the key transition points in your product'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717103550
landing: true
landing_blurb: 'Analyze conversions between the key transition points in your product'
---
Amplitude’s **Journeys** chart incorporates the power of the legacy Journeys, and Pathfinder Users charts to generate a complete, 360-degree analysis of how your users convert—or fail to convert—between key transitions in your product. It allows you to inspect your users’ product journeys in two ways: By the **total number of unique users** who took a particular path, or by the **total number of times** they opted for that path.

Within a Journeys chart, you can:

* Start with **Pathfinder** for a high level exploration of paths your customers take and drill in on a particular branch based on a starting event, ending event, or between two events. This is a helpful starting point if you don’t necessarily know what you want to see.
* Dive deeper with **Journey Map** to compare all your customer paths against each other and understand the details: analyze paths by frequency, similarity, or average time to complete; easily see where paths branch out at the most detailed level; or compare converted vs. dropped-off paths.

A common use case for Journeys is to bridge the gap between your **ideal** customer journey—which you can generate in a funnel chart—and the customer journeys your users are **actually** taking, as shown in a Journey Map or a Pathfinder analysis. 

Read the Amplitude Help Center article [Understand and use the Journeys visualizations](/docs/analytics/charts/journeys/journeys-understand-visualizations) for more information on the **Pathfinder** and **Journey Map** visualizations.

### Feature availability

This feature is available to users on **all Amplitude plans**. See our [pricing page](https://amplitude.com/pricing) for more details.

* This chart is currently in beta, which means it is still undergoing development. The legacy Journeys, Pathfinders, and Pathfinders Users charts and their corresponding documentation will be accessible until this chart is generally available.

## Create a Journeys chart

A Journeys chart lets you analyze paths that:

* include specific events
* exclude specific events by property
* expand events by property
* measure paths within a specific conversion window
* analyze by a single segment

You can also hide noisy events, only show specific events, collapse repeated events, and view custom events. Any settings you change while viewing one visualization will carry over to the others.

Finally, in any Journeys visualization, you can remove an event, expand an event by property, filter by sequences that include the event and property pair, or create a cohort from an event. Just click the event and select the option you want from the menu that appears.

To create a new Journeys chart, follow these steps:

1. *Click Create New > Analysis > Journeys*.
2. In the Paths module, use the dropdown to specify whether you want to build a path **starting** with a specific event, **ending** with a specific event, or a path **between** two specific events.
3. Click *+ Add Event* and add your desired event.
4. In the *Filter by paths, expand by property* module, click:

      * *+ Add event to filter* to narrow your results so that they only include paths in which your specified event appears;
      * *+ Add event to exclude* to hide specified event and property values from the results;
      * *+ Add event to expand* to group by an event and view property values separately (this is essentially the same as applying a group-by condition).

5. In the *Measured As* module, specify whether you want this chart to measure by uniques or event totals.
6. In the *Segment by* module, [specify the users you’d like to include in this analysis](/docs/analytics/charts/build-charts-add-user-segments).
7. In the chart area, set your preferred **bucket below threshold**. This threshold sets a lower boundary for node visibility in your chart. In other words, if the percentage of users who took a particular path is **lower** than the bucket below threshold, Amplitude **will not** display that path.
8. Your chart will appear. If you want to hide noisy events, show only specific events, show custom events, or collapse repeated events, click the *Filter Events* dropdown and make your selections.

{{partial:admonition type='note'}}
Inactive events are hidden by default. To show them, click *Choose events to exclude* and de-select the ones you'd like to be visible.
{{/partial:admonition}}

![](/docs/output/img/journeys/3kd7ifhLg-hLRYwAD-5yyN3dD-YVmIhCy4U9Q6kc9j4YCTn66OvxbWwuypySg9aWWo-KeY1Xm97_DKXFbgsXc30_mPmQMkL_SEhjdYa3NKsEW8hw-IVbLS41qZn5IuQcczh-DXfR-OWlJftEN3KBcm0)

Be aware that any changes you make to settings in this procedure will populate across [all three Journeys visualizations, which you can read more about here](/docs/analytics/charts/journeys/journeys-understand-visualizations).

## How the conversion window works in a Journeys chart

Like any other Amplitude chart, you will need to set a length of time for your analysis. In a Journeys chart, this is done with the **conversion window**.

![](/docs/output/img/journeys/tEzAMjPOTHZ2jjsumP8BRwqaN7clzTQnhhtWdxElSGiowh8L77-tFfua6Kk5KU3V2FtBc0kiZ_2G2K0rwqyigmxKF2gRMogP_B7U5AidrM_P5xLrg9RhG5SBazwnxX0rgPKpg0VaLlkoQlTgNROFCfY)

A conversion window can be measured in **clock time**, or it can be measured in **sessions**. When you set the window to a unit of clock time, your chart will include event paths that were completed within that length of time, no matter how many sessions it took.

When you set the window to one session, your chart will include event paths that were completed within a single session, no matter how much time elapsed (as long as it does not exceed the length of time covered by the chart).

[Now that you've built your Journeys analysis, read about what it all means in this Help Center article.](/docs/analytics/charts/journeys/journeys-understand-visualizations)

## Access legacy Journeys, Pathfinder, and Pathfinder Users charts

This Journeys experience was built by combining the Pathfinder and Pathfinder Users charts with the legacy Journeys feature (previously included with the Funnel Analysis chart). It is still possible to access those legacy analyses:

* Access any legacy Journeys charts from within a [Funnel Analysis](/docs/analytics/charts/funnel-analysis/funnel-analysis-build), by clicking on the bar you’re interested in and selecting *Show User Journeys*.
* Legacy Pathfinder and Pathfinder Users charts are accessible from the chart switcher in the top-left of the screen.