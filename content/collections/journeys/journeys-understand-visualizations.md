---
id: 6e3ae686-82af-453e-b76c-c8253519a8cd
blueprint: journey
title: 'Understand and use the Journeys visualizations'
source: 'https://help.amplitude.com/hc/en-us/articles/16427848208539-Understand-and-use-the-Journeys-visualizations'
landing: true
landing_blurb: 'Learn the difference between the three different Journey visualizations'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717103599
---
Each Journeys chart consists of three different visualizations: Pathfinder, Journey Map, and Top User Paths. Each view will tell you something different about the customer journey your users are experiencing. Navigate between them by selecting the appropriate tab along the top of the chart area.

In any of these analyses, you can:

* Analyze paths that include specific events
* Exclude specific events by property
* Expand events by property
* Measure paths within a specific conversion window
* Analyze by a single segment

You can also hide noisy events, only show specific events, collapse repeated events, and view custom events. Any settings you change while viewing one visualization will carry over to the others.

Start and end sessions are also defined the same for all Journeys visualizations, and do not allow cohort generation from dropped off users. This is because the start and end times don't always represent true events. For example, let's say a user logs in and then goes inactive after 30 minutes. By default, Amplitude will generate a start session event after the user logs in and an end session event for when the user went inactive. Read more about how Amplitude tracks sessions [here](/cdp/sources/instrument-track-sessions). 

Finally, in any Journeys visualization, you can remove an event, expand an event by property, filter by sequences that include the event and property pair, or create a cohort from an event. Just click the event and select the option you want from the menu that appears.

{{partial:admonition type='note'}}
To [access your legacy Pathfinder, Pathfinder Users, and Journeys charts, see our Help Center article linked here](/analytics/charts/journeys/journeys-understand-paths).
{{/partial:admonition}}

Because Journeys charts automatically hide inactive events, you may see more conversions in a Pathfinder chart than in an identical funnel. Here are some more differences to note between a Journeys chart and a funnel:

* When a path has a step that repeats, a **Journeys chart will begin a path from the first time the repeated event was triggered**; a funnel will use the instance that best meets the conversion window.
* A **Journeys chart uses the earliest path** - the first instance of the starting event for each user - **and creates paths from there**; whereas funnels will take the earliest and longest conversion - based on the instance of the starting event that matches as many of the later events as possible.
* **Funnels created from a Pathfinder will be set to *this order***; and, the results won’t exactly match because a Journeys chart can include hidden events between steps.

## Pathfinder

Pathfinder is the default visualization of the Journeys chart. It’s a great tool to show you how users are using your product by presenting all the paths that start with, or end with, a specific event during a given time period. It shows the paths your customers take and their popularity relative to each other. 

![](/output/img/journeys/2IFR1uDtIQKZMXgmgEwUF3v1pRwk5LFh_XxP2hFihkSxCYWQtskL5qb5xfy-eNEg_BqJKe3Xe_5V27DJMjzEAF5n7Rxx72ySHKJQtSXVLI0P2_r8YTsBMabZH2ffrvXCDa1k5RWxGMMnNhrrt0ep_oU)

The flow diagram shows all the paths starting or ending with a specific event. Each step is labeled. The label tells you the event triggered at that step in the sequence, as well as the frequency the event was triggered at that stage in the sequence. If a step reads *Dropped off* or *Did not perform an event*, that path includes users who dropped off at that point, or who did not trigger an event prior to the next one listed in the path.

Drill in on and expand a particular branch by clicking *More*, to a maximum of nine steps.

{{partial:admonition type='note'}}
You can also easily **turn a Pathfinder chart into a funnel**. Simply click on a step in a Pathfinder flow, then click *Create Funnel* in the pop-up that appears.
{{/partial:admonition}}

One distinguishing feature of Pathfinder is the ability to select **properties instead of events**. Event properties, user properties, and Amplitude User properties are all supported (Historical Count and Event Historical Count are not). You can select one property value per property; you should avoid setting property values to "none," as this may result in inaccurate results.

To filter paths by a property, select *Any Event* and specify the property you'd like to use as a filter.

## Journey Map

The Journey Map will help you understand how conversions happen in your product, and when you know user friction exists somewhere in the user journey but not what’s actually causing it.

Imagine a product manager who wants to better understand the initial activation flow taken by her product’s users. So she opens Journeys and flips to the Journey Map. Here she finds an interesting path she wasn’t expecting, so she clicks on it to dig deeper. The map shows her the average time it takes a user to convert, as well as specific paths taken by individual users.

From here, she might develop a hypothesis about why users are behaving in a way that has implications for the design of the flow itself, which she can take to the product team for discussion and iteration. She might spot something in the flow that looks like it’s causing friction for users, which then leads to further questions and new explorations. Or she notices a large number of users are dropping off before getting to a critical step in the conversion process, so she saves them into a cohort, which she shares with the marketing team to target with specific messaging.

The Journey Map does the hard work of surfacing these patterns for you; all you have to do is follow the insights and keep asking follow-up questions.

![](/output/img/journeys/0ukZnY6Wlnm_-4kXzURQjH4SIPCJcp7uRnDbXvIoOpItSdWpCjNbkRQArmue6r8nwSGfZBNLyQM5pxx4KQQfa6mFCiABMQCczFo5xY63fxwNr1pcSr6T9m6bCCDcUqtnLNjbT5YcNbtRkOJGYXdw-ww)

{{partial:admonition type='note'}}
You cannot create cohorts for event paths that include `Dropped off` or `Did not perform an event`.
{{/partial:admonition}}

## Read a path across both charts

Both visualizations in any Journeys analysis are all measuring the same paths, just in slightly different ways. Let’s look at an example, starting with the Pathfinder.

Our starting event is `charts: create new chart`. This is 100%, because users had to trigger this event in order to be included in the path. If a user didn’t trigger this event, they are not relevant to this analysis and are not included in the charts.

Of these users, 55.4% of them triggered `event explorer: hide event explorer` next. The vast majority of those users—55.2% of the total number of users included in this path, in fact—then triggered `navigation: new chart`.

Note that each percentage on this chart refers to the percentage of all users included in the analysis, and not a percentage of users captured in the previous step.

Next, 20.7% of all users triggered `taxonomy: view event detail panel`, followed by 17.5% triggering `open event dropdown`. This 17.5% represents 2,725 users.

We can see the same progressions in the Journey Map. Here we can also see that those 2,725 users took an average of 1 hour and 48 minutes to progress all the way through the path.

![](/output/img/journeys/oSpPJfbuxyBQuRxC8FLdP_AnO-r0zLvxZ-sd3et_csda79xP-0VWqz_MqUNdQ6jgksbElHtCtXRlPWo-n6cyqd1P5oktPkzVEe9c4fpHfOkDtJ3o31JS7f6awZmcH1muu75inKY3Z2-aUUcYc3eaZkA)

## Differences from the legacy versions of these charts

* There is a change to the logic from the legacy Pathfinder chart. Imagine the following set of events, with a one-day conversion window:

    1. Event A, April 1st, 9:00 a.m.
    2. Event A, April 1st, 10:00 a.m.
    3. Event B, April 2nd, 9:30 a.m.

	The legacy Pathfinder chart limited its analysis to events that occurred within the conversion window; because the first event in this sequence is outside that conversion window, legacy Pathfinder would have used the second event as the beginning of the path.

	Instead, the new Journeys logic begins by looking at the first occurrence of the start event. If it's in the conversion window, it will count as a conversion; if it's not, it counts as a drop-off.

* In the new version, the Pathfinder visualization will match the numbers in the legacy Pathfinder through Step 2. After Step 2 the numbers will differ. In the legacy version, the % shown for an event after Step 2 represents a cumulative sum of all prior events in the step before it; because of the branching experience in the new version, the % shown for any event after Step 2 is specifically related to the event that occurred before it in the same path.

This was done in order to align the Pathfinder and Journeys visual numbers, as well as to provide users with faster exploration capabilities.

* The legacy Journeys chart collapsed events by default, without providing the ability to change this. The new Journeys chart enables you to collapse or expand events whenever you need to.
* The legacy Journeys chart required both starting and ending events, as it was created directly from a funnel. With the new Journeys chart, you can provide only one or the other.