---
id: a78497a9-734e-4d88-9e3c-1c2a8d1cb102
blueprint: analytic
title: 'Microscope: Explore individual data points in your charts'
this_article_will_help_you:
  - 'Inspect your data points in a high level of detail'
source: 'https://help.amplitude.com/hc/en-us/articles/236032527-Microscope-Explore-individual-data-points-in-your-charts'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1726005218
---
Amplitude's **Microscope** feature enables you to dig deeper into a specific data point's users. Just hover over a data point in your chart, and a pop-up offers you up to six options (depending on your Amplitude plan) for further inspection.

This article explains how to use this feature and interpret the information provided in the *View User Streams* and *Show User Paths* sections. 

### Feature availability

This feature is available to users on **all Amplitude plans**. See the [pricing page](https://amplitude.com/pricing) for details.

## Before you begin

* Microscope streams only highlight events selected in the chart's [Events Module](/docs/analytics/charts/build-charts-add-events) that occur during the date range selected.
* *View Groups* and *Download Groups* are only available to Enterprise customers.
* Microscope isn't available in the [Pathfinder](/docs/analytics/charts/event-segmentation/event-segmentation-custom-formulas) section of the Event Segmentation chart.

## Use Microscope

To bring up the Microscope menu, simply click on a data point in any supported chart.

![event_seg_microscope.png](/docs/output/img/analytics/microscope-1.png)

From here, you can:

* **Zoom In** on a data point by going down to the next time interval granularity, for example when you click a dat point in a weekly chart and zoom in, the chart updates to daily granularity, and the time period in the date picker update to be the same as the time period of the original data point.
* **Filter By** to quickly drill down and focus on the series.
* **Exclude** or remove distracting or irrelevant series from the analysis.
* **Create a cohort** of the users that make up the selected data point, which you can then further analyze by applying this [cohort](/docs/analytics/behavioral-cohorts) to other charts in Amplitude. When you apply a group in the Segmentation Module, you can also create a group cohort from here.
* **View a list of all the users** in the selected data point. Click a user ID to open that user's profile in the *User Activity* tab. If you are an Enterprise customer with [account-level reporting](/docs/analytics/account-level-reporting), you can also use Microscope to view the groups in a data point. Click any group to see a list of users in that group, in the *User Activity* tab.
* **Download all the users** (up to 1 million) that make up the selected data point, in the form of a .CSV file. This file also contains each user's most-recently sent user property values.

{{partial:admonition type="note" heading=""}}
If you are conducting [account-level reporting](/docs/analytics/account-level-reporting) analysis, you can opt to download the groups included in a certain data point or bucket. The .CSV file includes the following four columns:

* `group_id`: The unique ID of a particular group name (much like Amplitude ID). When Amplitude sees a new group value or group name, Amplitude assigns a unique `group_id` to the unique group name.
* `group_name`: The group property value (like the user ID). For example, if your count-by was for the group `Company`, then the `group_name` could be `Amplitude`. The `group_name` values are set by you.
* `first_time`: The Unix timestamp denoting when Amplitude first saw that group.
* `creator_amplitude_id`: The `amplitude_id` that sent the event creating the group.

Additionally, you can **show user paths**, **view user streams**, and **explore conversion drivers**. Read more about them below.
{{/partial:admonition}}

## Show user paths

This option runs a [Pathfinder Users](/docs/analytics/charts/journeys/journeys-understand-paths) report based on user activity for the selected data point. This is useful for when you want to quickly see the top event paths users take after a specific event or on a particular day.

For example, you can view users who dropped off after a specific event or step in a [Funnel Analysis](/docs/analytics/charts/funnel-analysis/funnel-analysis-build) chart and see what were the top paths the dropped off users performed, instead of successfully completing the funnel.

{{partial:admonition type="note" heading=""}}
The maximum date range for *Show User Paths* is 30 days.
{{/partial:admonition}}

To analyze what users are doing instead of triggering the `Purchase Song or Video` event in the funnel chart below, click the drop-off data point for the `Purchase
 Song or Video` event and use Microscope's *Show User Journeys* feature to view the top event paths users take after the `Select Song or Video` event:

![microscope_2.png](/docs/output/img/analytics/microscope-2.png)

By showing user paths, it becomes clear that after triggering the `Select Song or Video` event, many users trigger either the `Download Song or Video` event or the `Play Song or Video` event. Now we can hypothesize ways to improve the product's purchase flow—like sending users an in-app message to purchase a subscription at exactly the right moment.

![microscope_3.png](/docs/output/img/analytics/microscope-3.png)

## View user streams

When using Microscope in an [Event Segmentation](/docs/analytics/charts/event-segmentation/event-segmentation-build) chart, you can see individual user streams in aggregate by selecting *View User Streams*. All a user's events within the date range of the data point are visible here, as well as:

* Up to 25 events **prior to** the beginning of the time range.
* Up to 50 events **after** the start of the time range.

If you have a specific event selected, it's highlighted in the user's stream. You can also choose to show certain event properties as well. Click a user ID or any event in a user's stream to view their profile in the *[User Activity](/docs/analytics/user-data-lookup)* tab.

{{partial:admonition type="note" heading=""}}
Event names with a *sparkle* icon indicate that Amplitude has generated a name to provide more context around the action a user is taking. These are Autocapture events ingested as `Page Viewed`, `Element Clicked`, and `Element Changed`, but Amplitude uses property information to make them more valuable in the event stream. Click any of them to see their ingested name and properties.
{{/partial:admonition}}

### View Session Replay from a user's event stream

If you are a Growth or an Enterprise customer with the Session Replay add-on, you can launch a session replay from Microscope in the following Amplitude charts: Event Segmentation, Funnel Analysis, Journeys, and User Sessions.

While using Microscope in a supported chart, click on *View User Streams*. Check the *Streams with session replays* box in the modal that appears. Then click *Play Session* in the event stream to play the events directly below it. Check out more about the Session Replay feature, and learn about restrictions in the supported charts, in this help center article.

## Explore conversion drivers

In a funnel chart, click into any step after the initial event to enable the **Explore Conversion Drivers** feature. This allows you to explore events triggered **between** funnel steps for converted and dropped-off users.

For more information, see [Amplitude's conversion drivers feature](/docs/analytics/charts/funnel-analysis/funnel-analysis-identify-conversion-drivers).

## Create a guide or survey from Microscope

On a chart, click a data point to launch microscope. Select *Guide these users* or *Survey these users* to create a guide or survey targeted to that set of users. Amplitude then:

* Creates a cohort based on the chart criteria and data.
* Creates and launches a new guide or survey, with the cohort added to targeting.
