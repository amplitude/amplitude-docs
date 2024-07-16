---
id: 3719e8a7-755b-4426-842b-a90fd0e62ad3
blueprint: section
title: 'Session Replay'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1721084749
nav_title: session_replay
hide_toc: false
---
Sometimes you need to go beyond a funnel analysis to understand the "why" behind your product metrics. Amplitude’s built-in Session Replay feature gives full visibility in the customer journey by uncovering qualitative insights from your quantitative data. It brings digital experiences to life, unlocking growth bottlenecks and giving you the confidence to take appropriate action.

## Feature availability

Session Replay is available to try on all new Amplitude plans as of February 7, 2024 (including the Starter and Plus updates from October 2023). Existing Growth and Enterprise customers can also access Session Replay as an add-on purchase. Contact your account manager with questions. See our [pricing page](https://amplitude.com/pricing) for more details.

{{partial:admonition type="note" heading=""}}
Session Replay is **not** enabled by default, and requires instrumentation beyond the standard Amplitude instrumentation.
{{/partial:admonition}}
## Use Session Replay to review user activity

You can launch a session replay from a user’s event stream, inside a chart, or from your homepage. Replays are generally available for viewing five minutes after a session begins.

When viewing a session replay from your [homepage](#h_01HFD88N1M03EH9D8VF32QBBYQ) or from a [search](#h_01HK600KD02WEC77KE4HYMKHY6), the user's event stream syncs with the replay. You can select an event from the stream, and the replay jumps to that point in the session. (This feature isn't available when [viewing a replay from a chart](#h_01HFD818NE7FH2D85NS1VTCHYQ).)

![image-20240109-232506.png](/docs/output/img/session-replay/image-20240109-232506-png.png)

There is no limit on the length of a session that can be viewed as a replay.

### View Session Replay from User Look-Up

To access Session Replay from a user’s event stream, use the [User Look-Up](/docs/analytics/user-data-lookup) feature. This can be helpful if a user has reported a potential bug during their session, or if you want to understand whether a user's experience is representative of a bigger trend. 

Find the user via User Look-Up (you’ll need their user ID to do this), then click *Play Session* next to the session you're looking for in the event stream. The replay appears to the right, where you can review session activity. You can generate a link to share the replay with your team from the view in a User Look-Up event stream. Click *Copy URL* from the view to copy the link. 

### View Session Replay from a chart

To use Session Replay in a chart, follow these steps:

1. Open the Amplitude chart that contains the events you want to look at.
2. Open the [Microscope](/docs/analytics/microscope) and click *View User Streams*.
3. Check the *Streams with session replays* box.
4. Click *Play Session* in the event stream to play the events directly below it.

![UserStreams.png](/docs/output/img/session-replay/userstreams-png.png)

The replay view appears in the right-hand panel, where you can: 

* Expand the view
* Pause replay
* Skip forward and backwards by 10-second increments
* Speed up and down
* Skip periods of inactivity
* Copy and share the replay's URL

The user’s cursor movement displays as a red line, and masked HTML elements appear as a series of asterisks. Session Replay shows the timestamp of the session as it occurred.

#### Availability in Amplitude charts

Session Replay is available in the following Amplitude chart types, with these restrictions around each chart type's available metrics:

* **Event Segmentation**: Session replay is available for all six measures.
* **Funnel Analysis**: Session replay is only available for the conversion measure. For Funnel Analysis charts, the order of events appears in chronological order (oldest to newest).
* **Journeys**: Session replay is available on the Pathfinder and Journey Map visualizations.
* **User Sessions**: Session replay is available for all six measures. This chart won’t allow session replays for [custom defined sessions](/docs/cdp/sources/instrument-track-sessions).

### View Session Replay from your homepage

With Session Replay, your homepage shows 100 sessions captured over the past seven days. Each session displays its start time, user ID, session length, and country.

{{partial:admonition type="note" heading=""}}
If you can’t see the Session Replay widget and have a customized [home page](/docs/get-started/amplitude-home-page), reset the home page and then re-add your customizations to make the widget visible.
{{/partial:admonition}}

Click *Play* to see the session view in the modal that appears. 

![](/docs/output/img/session-replay/20464613106203)

## View the number of captured sessions

To review your Session Replay quota and retention time frame, navigate to the Plans & Billing page for your organization.

To see an approximation of the number of sessions that have associated replays, create a [User Sessions Chart](/docs/analytics/charts/user-sessions/user-sessions-track-engagement-frequency) and configure it to include all sessions with any active event, where the first property value of `Session Replay ID` is not equal to `"(none)"`. This includes all session replays with a value.

## Search for a replay

Session replay gives you two options for searching replays: either by date, or via a filter.

1. Navigate to *Users & Sessions—>Session Replays* to see the complete list of session replays available for viewing.
2. To narrow the list by date, click the calendar icon just above the list and select the starting and ending dates you'd like to use. You can also use a preset timeframe—seven days, 30 days, 60 days, or 90 days—by clicking on the appropriate button.

Filtered results by date or time frame match the project's timezone.

3. To narrow the list with a filter, click *+ Add Filter*. You can filter by cohorts, events, event properties, user properties, and session duration. You can also use multiple filters to further narrow your list.

Once you've made your selection, you can view replays that took place within your selected time frame, or replays that meet your filter specifications. Your search results generate a unique URL that you can share with your team. 

The list of results shows a maximum of 100 replays. 

## Add a replay to a dashboard or notebook

There are three ways you can add a Session Replay to a dashboard or notebook:

* From the Session Replay page itself (accessible via the homepage and Session Replay search)
* From within [User Look-Up](/docs/analytics/user-data-lookup)
* From within an individual chart

![image-20231213-175140 (1).png](/docs/output/img/session-replay/image-20231213-175140-1-png.png)

## Use cases

With Session Replay, you can:

* **Improve product conversions**: Blend quantitative and qualitative insights and use new information to hypothesize and test new workflows that boost conversions and revenue.
* **Diagnose product issues faster**: Isolate specific user sessions for troubleshooting bugs, getting critical qualitative context that helps teams speed up resolution process.
* **Identify significant UX behaviors**: Go from micro to macro by checking if single user sessions are representative of larger trends and drive changes that benefit more customers.
* **Unlock qualitative insights at scale**: Explore how users are engaging with a newly launched feature and get a pulse on customer behavior at scale without running surveys or interviews.
* **Tie replays to behaviors that matter**: Sync your user stream to meaningful events in your session replay to quickly inspect behaviors and inform decisions faster.
* **Tell stories and innovate faster**: Share links and add replays to notebooks and dashboards to get buy-in across colleagues and act on initiatives faster.

## Limitations

There are some limitations when using Session Replay:

* Session Replay is available for web-based applications only. This includes mobile web. Desktop applications aren't supported.
* Session Replay supports standard session definitions only. [Custom session definitions](/docs/cdp/sources/instrument-track-sessions) aren't supported.
* Session Replay can only be used to segment by users, and isn't available for [account-level reporting](/docs/analytics/account-level-reporting).
* You can replay captured sessions for up to three months (90 days) after they occur. You can request to change this to 30 days, to comply with stricter privacy requirements. If you change your retention period, the changes apply only to new sessions, and not those that pre-date the change.
* If you are in a portfolio view, you can see replays for different users under different projects. However, keep in mind that Session Replay doesn't stitch together replays from a single user across multiple projects. If a user begins a session in one project and then continues to a second project, Amplitude Analytics generates separate replays for that user for each project.
* Session Replay doesn't capture these unsupported HTML elements:
	* Canvas
	* WebGL
	* `<object>` elements: Plugins such as Flash, Java, Silverlight, etc., except `<object type="image">`
	* Lottie Animations (web and mobile)
	* iFrames not from origin
	* Assets that require authentication, like fonts, CSS files, and images

	