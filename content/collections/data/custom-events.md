---
id: c2c4ceb7-94ab-44f8-967a-99ff8f07e800
blueprint: data
title: 'Custom events'
source: 'https://help.amplitude.com/hc/en-us/articles/16805886899483-Custom-events'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717621393
this_article_will_help_you:
  - 'Understand how creating a custom event can support your analysis'
  - 'Learn how to create a custom event'
landing: false
---
Sometimes, you may need to create an analysis in which a particular step of the process can be any of a selection of specific events. 

It is possible to [combine multiple events in-line](/analytics/charts/event-segmentation/event-segmentation-in-line-events) through the Events Module, however, the in-line event that you create will only be relevant to that specific chart and will not be accessible anywhere else unless it is saved as a **custom event**. A custom event is made up of two separate events joined by an `OR` clause. For example, this analysis is interested in users who, after receiving a push notification, **either** played a song **or** searched for one as their next step: 

![customEvent_funnel.png](/output/img/data/customevent-funnel-png.png)

You create a custom event in the *Events* panel from one or more pre-existing events. Doing so tells Amplitude to combine for those pre-existing events and count any user activity for them as activity for the new custom event. This is useful if you want an easy way to track overall activity on related or similar events, like whether a visitor has fired either the `view_landing_page_1` or `view_landing_page_2` events.

In the image above, `Play or Search Song` is a custom event consisting of the `Play Song` event, the `Search Song` event, and an `OR` clause to connect the two. Any user who triggers **either** the `Play Song` event **or** the `Search Song` event is considered to have **converted** that second step.

Another method is conditioning an added event with an [event property or user property](/data/user-properties-and-events). This is the primary method for analyzing if a user had performed one of many events.

### Feature availability

This feature is available to users on **Plus**, **Growth**, and **Enterprise** **plans** only.

## Before you begin

* Only admins, managers, and members can create custom events.
* Custom events are available only in the Event Segmentation, Funnel Analysis, Retention Analysis, Lifecycle, Stickiness, Impact Analysis, Pathfinder, and Compass charts.
* You cannot query on custom events in Redshift.
* All custom events will have the prefix `[Custom]` before the event name in your charts.
* Editing or renaming custom events being used on other charts will break those charts. Amplitude will continue to query the previously-named value until it is manually changed on any charts that use it. You will receive a warning when making any edits to custom events.
* Querying event properties on custom events will **only** be possible if the property is applicable to all events. If you're trying to create a custom event with five different events, and you'd like to see the location values from all of those events, you'll need to instrument the location event property to **all** the individual events making up the custom event.

## Group two existing events into a single custom event

To do this, follow these steps:

1. In Amplitude Data’s left-hand rail, click *Events*. Then click *Create Custom Event*.

2. In the modal that appears, select the events you want to analyze as a single event. There is an option to set different filters on these events, in case the analysis requires a more granular view of the selected events.

![create_customEvent.png](/output/img/data/create-customevent-png.png)

At this point, this event is available for further analyses in Amplitude. To use it, select the newly-created event in the *Custom* category in the appropriate chart drop-down menus.