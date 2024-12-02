---
id: b8a605c9-d9fa-44ee-8508-12991ce72e74
blueprint: journey
title: 'Understand the paths users take, and why they convert'
source: 'https://help.amplitude.com/hc/en-us/articles/16427637651995-Journeys-Understand-the-paths-users-take-in-your-product-and-why-they-convert'
this_article_will_help_you:
  - 'Analyze conversions between the key transition points in your product'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1723654564
landing: true
landing_blurb: 'Analyze conversions between the key transition points in your product'
---
Amplitude’s Journeys chart incorporates the power of the legacy Journeys, and Pathfinder Users charts to generate a complete, 360-degree analysis of how your users convert—or fail to convert—between key transitions in your product. It allows you to inspect your users’ product journeys in two ways: 
- By the total number of unique users who took a particular path.
- By the total number of times they opted for that path.

{{partial:admonition type="note" heading="Uniques versus totals"}}
* When counting **uniques**, Amplitude counts the first conversion per user in the given time range.
* When counting **totals**, Amplitude counts every conversion in the time range.
{{/partial:admonition}}

Within a Journeys chart, you can:

* Start with **Pathfinder** for a high level exploration of paths your customers take and drill in on a particular branch based on a starting event, ending event, or between two events. This is a helpful starting point if you don’t necessarily know what you want to see.
* Dive deeper with **Journey Map** to compare all your customer paths against each other and understand the details: analyze paths by frequency, similarity, or average time to complete; easily see where paths branch out at the most detailed level; or compare converted vs. dropped-off paths.

A common use case for Journeys is to bridge the gap between your **ideal** customer journey—which you can generate in a funnel chart—and the customer journeys your users are **actually** taking, as shown in a Journey Map or a Pathfinder analysis. 

Read the article [Understand and use the Journeys visualizations](/docs/analytics/charts/journeys/journeys-understand-visualizations) for more information on the **Pathfinder** and **Journey Map** visualizations.

### Feature availability

This feature is available to users on **all Amplitude plans**. See the [pricing page](https://amplitude.com/pricing) for more details.

## Create a Journeys chart

A Journeys chart lets you analyze paths that:

* include specific events
* exclude specific events by property
* expand events by property
* measure paths within a specific conversion window
* analyze by a single segment

You can also hide noisy events, only show specific events, collapse repeated events, and view custom events. Any settings you change while viewing one visualization carry over to the others.

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
7. In the chart area, set your preferred **bucket below threshold**. This threshold sets a lower boundary for node visibility in your chart. In other words, if the percentage of users who took a particular path is **lower** than the bucket below threshold, Amplitude doesn't display that path.
8. Your chart appears. If you want to hide noisy events, show only specific events, show custom events, or collapse repeated events, click the *Filter Events* dropdown and make your selections.

{{partial:admonition type='note'}}
Amplitude hides inactive events by default. To show them, click *Choose events to exclude* and de-select the ones you'd like to be visible.
{{/partial:admonition}}

![](/docs/output/img/journeys/journeys1.png)

Any changes you make to settings in this procedure populate across [all three Journeys visualizations, which you can read more about here](/docs/analytics/charts/journeys/journeys-understand-visualizations).

## How the conversion window works in a Journeys chart

Like any other Amplitude chart, Journeys requires a length of time to use as the basis for your analysis. In a Journeys chart, this is the **conversion window**.

![](/docs/output/img/journeys/journeys2.png)

Conversion windows can use clock time or sessions to define the window. When you set the window to a unit of clock time, your chart includes event paths that users completed within that length of time, no matter how many sessions it took.

When you set the window to one session, your chart includes event paths that users completed within a single session, no matter how much time elapsed (as long as it doesn't exceed the length of time covered by the chart).

For information about Journeys visualizations, see [Understand and use the Journeys visualizations](/docs/analytics/charts/journeys/journeys-understand-visualizations).
