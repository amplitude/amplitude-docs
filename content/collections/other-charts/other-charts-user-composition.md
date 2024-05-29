---
id: e1d50c44-fe18-4cf6-9a33-f9f397255dd6
blueprint: other-chart
title: 'The User Composition chart: View your users by the properties they have in common'
source: 'https://help.amplitude.com/hc/en-us/articles/231258248-The-User-Composition-chart-View-your-users-by-the-properties-they-have-in-common'
this_article_will_help_you:
  - 'Understand the differences between a User Composition chart and other Amplitude chart types'
  - 'Build a user composition analysis and interpret the results'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717021423
---
The User Composition chart shows the breakdown of active users based on a single user property. This grouped view provides insight into **who your users are** and what **properties they share**.  

### Feature availability

This feature is available to users on **all Amplitude plans**. See our [pricing page](https://amplitude.com/pricing) for more details.

## Before you begin

First and foremost, events will not appear in any Amplitude charts until instrumentation is complete, so make sure you've got that done. You'll definitely want to read our article on [building charts in Amplitude](/get-started/helpful-definitions), and be sure you understand [the difference between user properties and event properties](/data/user-properties-and-events). 

## Set up a user composition analysis

Most Amplitude charts rely on the Events Module to build an analysis. The User Composition chart is not an event-driven analysis—and, therefore, does not have an Events Module—so it works a little differently.

![UC_1.png](/output/img/other-charts/uc-1-png.png)

Instead of events, a user composition analysis relies on **user properties**. Select a user property you're interested in, define your user segments, and the User Composition chart will display a breakdown of values for that property across the user segments you've specified.

In the example above, we're looking at a comparison of your product's users in the United States and Germany, broken out by the most recent value for the number of communities they've joined.

To build your own user composition analysis, follow these steps:

1. In the *Composition By* Module, select the user property you're interested in.
2. In the *Segment By* Module, identify the user segment you want to include in this analysis. You can import a previously-saved segment by clicking *Saved* and selecting the one you want from the list. Otherwise, Amplitude begins from the assumption that your analysis will target all users.
3. If you do not want to import a previously-saved user segment, you can start building your own by adding properties. To do so, click *+ Filter by*, choose the property you want to include, and specify the property value you’re interested in.
4. You can narrow your focus even further by telling Amplitude you only want to include users who have already performed certain actions. To do so, click *+ Performed*, then choose the event you’re interested in.
5. If desired, add another user segment by clicking *+ Add Segment*, and repeating steps 2 through 4.
6. In the *Measured As* Module, specify the user property **values** you're most interested in seeing:

    * ***Most Recent Value*** will only consider your users' **most recent values of that property.** This value will be drawn from a user's most recent active event.Users may only appear in **one** bucket when *Most Recent Value* is selected.
    * ***All Values*** will include **every value your active users have had** for the property in question during the time frame of your analysis. Remember that the User Composition chart only includes active users, so user property values tied to inactive events will not be returned.
    * ***Cross Property Values*** will show sets of properties that active users have had within the time range selected. These **buckets are mutually exclusive**; users can only fall into one bucket.

7. Use the date picker to specify the timezone and set the timeframe of your analysis.

In all cases, Amplitude will break out the top 13 values for your user property; any other values will be grouped in the *Other* bucket. The value in the center of the chart is the column sum value in the [breakdown data table](/analytics/charts/review-chart-data) below the chart. It includes only the users who are part of the top 100 user property value groups by user count.

You can also view your results as a bar graph:

![UC_4.png](/output/img/other-charts/uc-4-png.png)

And of course, you can always inspect the composition of your user groups via the [Microscope](/analytics/microscope).