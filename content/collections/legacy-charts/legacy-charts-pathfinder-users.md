---
title: "The Pathfinder Users chart: see the paths your users take through your product"
source: "https://help.amplitude.com/hc/en-us/articles/235777567-The-Pathfinder-Users-chart-see-the-paths-your-users-take-through-your-product"
id: 8a84c13d-eec2-4ad3-a0f8-2d5242390af9
---

{{partial:admonition type='note'}}
This chart will be merged into the new Journeys experience. This article will remain live for as long as legacy Pathfinder Users charts remain accessible. [Learn about the new Journeys experience with support for top user paths here](/docs/analytics/charts/journeys/journeys-understand-paths).
{{/partial:admonition}}

Amplitude's **Pathfinder Users** chart shows you the "paths" your users are taking through your product. Just specify an event you're interested in, and Amplitude will tell you the steps your users took to get there, or the events they fired afterwards. It's a handy way to identify the natural pathways in your product, and can help generate strategies for guiding the user experience in a new or more effective direction.

{{partial:admonition type='note'}}
[Custom events](/docs/admin/account-management/account-settings) are not supported in Pathfinder Users for Amplitude 2.0.
{{/partial:admonition}}

## Before you begin

First and foremost, events will not appear in any Amplitude charts until instrumentation is complete, so make sure you've got that done. You'll definitely want to read our article on [building charts in Amplitude](/docs/get-started/helpful-definitions). Lastly, review the difference between [active and inactive events](/docs/knowledge/articles/5078778423579/en-us?brand_id=68397), as inactive events are *hidden* by default in Pathfinder Users' charts.

You should also keep in mind that all paths in Pathfinder Users are tracked in individual sessions. This means that if you're sending Amplitude events via the [HTTP API](https://help.amplitude.com/hc/en-us/articles/360032842391-HTTP-API-V2) or through another pipeline, you must send a `session_id` with the event. If you don't, your product's path views won't be accurate.

## Set up a Pathfinder Users chart

To build your own pathfinder user analysis, follow these steps:

1. In the Events Module, decide whether you want your path to start with a specific event, or end with one:
	* To view the actions or events users take **after** a given event, select *starting with* from the *Event paths taken* dropdown menu.
	* To view the events users take **before** a given event, select *ending with* from the *Event paths taken* dropdown menu.  
	  
	![pathfinder_users_1.png](/docs/output/img/legacy-charts/pathfinder-users-1-png.png)
2. Select the starting (or ending) event. Unlike many other Amplitude charts, Pathfinder Users requires you to choose a specific event that is instrumented in Amplitude; choosing *Any Event*is not supported.
3. If desired, add properties to your starting event by clicking on *+ where*, selecting the property name, and specifying the property value you’re interested in.
4. You can  also add up to four other events to your path, if you wish. The effect of adding more steps to your path will be to narrow the focus of the analysis to users whose path matches the order of events you select.
5. In the Segmentation Module, identify the user segment you want to include in this analysis. You can import a previously-saved segment by clicking *Saved Segments* and selecting the one you want from the list. Otherwise, Amplitude begins from the assumption that your analysis will target all users.
6. If you do not want to import a previously-saved user segment, you can start building your own by adding properties. To do so, click *+ where*, choose the property you want to include, and specify the property value you’re interested in.
7. You can narrow your focus even further by telling Amplitude you only want to include users who have already performed certain actions. To do so, click *+ perform*, then choose the event you’re interested in.
8. In the Metrics Module, decide whether you'd prefer to see your results measured in terms of users or sessions.   
  
{{partial:admonition type='note'}}
When measuring by session count, the results will generally be larger than user count. This is because user count measures unique users, while session count tracks every session a specific user has. A session is defined as the period of time a user has your app in the foreground.   
{{/partial:admonition}}
  
![pathfinder_users_2.png](/docs/output/img/legacy-charts/pathfinder-users-2-png.png)
9. Use the date picker to specify the timezone and set the timeframe for your analysis. Your analysis can span a maximum of 30 days.
10. You can name and save Pathfinder Users reports by clicking *Save*. Note that you cannot pin Pathfinder Users reports to dashboards, but you can search for them in the Search tab.

## Interpret your Pathfinder Users chart

The chart displays paths in descending order of use—the most commonly-taken path will be at the top, followed by the second-most common, etc. You can alter the lengths of the path by selecting more events in the left module of the chart control panel.

In the chart shown below, the starting event is '[Amplitude] Start Session'. The top row shows us that , 11.0% (33,943) of all active users in the last seven days fired the '[Amplitude] Start Session' event, and followed immediately with four 'PlaySong' events.

![](/docs/output/img/legacy-charts/Screen_Shot_2016-12-02_at_3.01.42_PM.png)

If you're using Amplitude's default [`session_id`](/docs/cdp/sources/instrument-track-sessions) to group events into sessions, events in a given session will be ordered by `event_time` instead. 

### Expand events by property

You can group your results by the properties of a specific event. By adding an event and property pairing to *Expand events by property*, you can tell Amplitude to take that event and apply a 'group by' condition, based on the values of the property you selected.   

In this example, the Pathfinder Users chart displays results broken out by values for the `country` property of the `Edit Profile` event—but not for the `Main Landing Screen` event.

![pathfinder_users_3.gif](/docs/output/img/legacy-charts/pathfinder-users-3-gif.gif)

You can expand multiple events by property in this way.
