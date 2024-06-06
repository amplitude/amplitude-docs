---
title: "Group two or more events together as a single step in the Events module"
source: "https://help.amplitude.com/hc/en-us/articles/360041885332-Group-two-or-more-events-together-as-a-single-step-in-the-Events-module"
id: df93561f-a99b-4dd8-aa69-47f48229b3ae
---

Sometimes, you may need to create an analysis in which a particular step of the process can be any of a selection of specific events. For example, this analysis is interested in users who, after receiving a push notification, **either** played a song **or** searched for one as their next step: 

![events_in_this_order.png](/output/img/charts/events-in-this-order-png.png)

By default, Amplitude does not permit you to select multiple steps directly through the Events Module. There is no `OR` clause for you to use here. However, it is possible to create a [custom event](https://help.amplitude.com/hc/en-us/articles/360047138392#create-a-custom-event-from-existing-events) that is made up of two separate events joined by an `OR` clause. You would then use this new, custom event in your flow.

In the image above, `Play or Search Song` is a custom event consisting of the `Play Song` event, the `Search Song` event, and an `OR` clause to connect the two. Any user who triggers **either** the `Play Song` event **or** the `Search Song` event is considered to have **converted** that second step.

Another method is conditioning an added event with an [event property or user property](/data/user-properties-and-events). This is the primary method for analyzing if a user had performed one of many events.

## Before you begin

* Only admins, managers, and members can create custom events.
* Custom events are available only in the Event Segmentation, Funnel Analysis, Retention Analysis, Lifecycle, Stickiness, Impact Analysis, Pathfinder, and Compass charts.
* You cannot query on custom events in Redshift.
* All custom events will have the prefix '[Custom]' before the event name in your charts.
* Editing or renaming custom events being used on other charts will break those charts. Amplitude will continue to query the previously-named value until it is manually changed on any charts that use it. You will receive a warning when making any edits to custom events.
* Querying event properties on custom events will *only*be possible if the property is applicable to all events. If you're trying to create a custom event with five different events, and you'd like to see the location values from all of those events, you'll need to instrument the location event property to **all** the individual events making up the custom event.

## Group two existing events into a single custom event

To do this, follow these steps:

1. Navigate to *Data,* choose the project that you'd like to create the custom event for in the drop down. From *Events*, click *Create Custom Event*.

![data_events.png](/output/img/charts/data-events-png.png)

2. In the modal that appears, select the events you want to analyze as a single event. There is an option to set different filters on these events, in case the analysis requires a more granular view of the selected events.

![Screenshot](/output/img/charts/screenshot.png)

At this point, this event is available for further analyses in Amplitude. To use it, select the newly-created event in the *Custom* category in the appropriate chart drop-down menus.

![custom_event.png](/output/img/charts/custom-event-png.png)
