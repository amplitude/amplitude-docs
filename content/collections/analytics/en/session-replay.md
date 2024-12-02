---
id: b119e5d3-f22e-44e9-ab59-fe66b807894a
published: false
blueprint: analytic
title: 'See how your customers use your product with Session Replay'
source: 'https://help.amplitude.com/hc/en-us/articles/20464659456667-See-how-your-customers-use-your-product-with-Session-Replay'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718901114
---
#### This article will help you:

* Deepen your understanding of user session activity with a qualitative lens

Sometimes you need to go beyond a funnel analysis to understand the "why" behind your product metrics. Amplitude’s built-in Session Replay feature gives full visibility in the customer journey by uncovering qualitative insights from your quantitative data. It brings digital experiences to life, unlocking growth bottlenecks and giving you the confidence to take appropriate action.

### Feature availability

This feature is available to users on **Growth** and **Enterprise plans** only.

* Use of this feature requires the Session Replay add-on.

With Session Replay, you can:

* **Improve conversions**: Gain qualitative insights and context around user activity after you’ve analyzed quantitative trends with Event Segmentation, Funnel Analysis, Journeys, and User Sessions charts.
* **Diagnose product issues faster**: Follow along with the replay of a specific user’s session to troubleshoot bugs or gain insight into the overall user experience.
* **Identify significant UX behaviors**: Find out if a single user is representative of a larger macro trend by generating an Event Segmentation or Funnel Analysis chart from a replay in User Lookup.

**NOTE**: Session Replay can only be used to segment by users, and is not available for [account-level reporting](/docs/analytics/account-level-reporting).

## Use Session Replay to review user activity

You can launch a session replay from a user’s event stream, inside a chart, or from your homepage. Replays are generally available for viewing five minutes after a session begins.

When viewing a session replay from your [homepage](#h_01HFD88N1M03EH9D8VF32QBBYQ) or from a [search](#h_01HK600KD02WEC77KE4HYMKHY6), the user's event stream will sync with the replay. You can select an event from the stream, and the replay will jump to that point in the session. (This feature is not yet available when [viewing a replay from a chart](#h_01HFD818NE7FH2D85NS1VTCHYQ).)

![image-20240109-232506.png](/docs/output/img/analytics/image-20240109-232506.png)

There is no limit on the length of a session that can be viewed as a replay.

**NOTE:** By default, Amplitude will store your replays for 90 days. Upon request, this can be changed to 30 days to comply with stricter privacy requirements. If you change your retention period, the changes will apply only to new sessions, and not those that pre-date the change.

To access Session Replay from a user’s event stream, use the [User Lookup](/docs/analytics/user-data-lookup) feature.

**NOTE:** If you are in a portfolio view, you can see replays for different users under different projects. However, keep in mind that Session Replay does **not** stitch together replays from a single user across multiple projects. If a user begins a session in one project and then continues to a second project, Amplitude Analytics will generate separate replays for that user for each project.

### View Session Replay from a chart

To use Session Replay in a chart, follow these steps:

1. Open the Amplitude chart that contains the events you want to look at.
2. Open the [Microscope](/docs/analytics/microscope) and click *View User Streams*.
3. Check the *Streams with session replays* box.

*![](/docs/output/img/analytics/20464659435931)*

4. Click *Play Session* in the event stream to play the events directly below it.

![](/docs/output/img/analytics/20464631555227)

The replay view will then appear in the right-hand panel, where you'll be able to: 

* Expand the view
* Pause replay
* Skip forward and backwards by 10-second increments
* Speed up and down
* Skip periods of inactivity

The user’s cursor movement will be shown as a red line, and masked HTML elements will show a series of asterisks. Session Replay will show the timestamp of the session as it occurred.

#### Availability in Amplitude charts

Session Replay is available in the following Amplitude chart types, with these restrictions around each chart type's available metrics:

* **Event Segmentation**: Session replay is available for all six measures.
* **Funnel Analysis**: Session replay is only available for the conversion measure.
* **Journeys**: Session replay is available on the Pathfinder and Journey Map visualizations.
* **User Sessions**: Session replay is available for all six measures. This chart won’t allow session replays for [custom defined sessions](/docs/data/sources/instrument-track-sessions).

**NOTE**: For Funnel Analysis charts, the order of events will appear in chronological order (oldest to newest).

### View Session Replay from your homepage

With Session Replay, your homepage will show 100 sessions captured over the past seven days. Each session will show its start time, user ID, session length, and country.

**NOTE:** If you can’t see the Session Replay widget and have a customized [home page](/docs/get-started/amplitude-home-page), reset the home page and then re-add your customizations to make the widget visible.

Click *Play* to see the session view in the modal that appears. 

![](/docs/output/img/analytics/20464613106203)

### View the number of captured sessions

To see an approximation of the number of sessions that have associated replays, create a [User Sessions Chart](/docs/analytics/charts/user-sessions/user-sessions-track-engagement-frequency) and configure it to include sessions that contain any events where the event property `Session Replay ID ≠ “(none)”`. This will include all session replays with a value.

## Search for a replay

Session replay gives you two options for searching replays: either by date, or via a filter.

1. Navigate to *Users & Sessions—>Session Replays* to see the complete list of session replays available for viewing.
2. To narrow the list by date, click the calendar icon just above the list and select the starting and ending dates you'd like to use. You can also use a preset timeframe—seven days, 30 days, 60 days, or 90 days—by clicking on the appropriate button.
3. To narrow the list with a filter, click *+ Add Filter*. You can filter by cohorts, events, event properties, and user properties. You can also use multiple filters to further narrow your list.

Once you've made your selection, the list of available replays will be limited to either those replays that took place within your selected timeframe, or those replays that meet your filter specifications.

## Common use cases

Some common use cases for Session Replay include:

* **Watch session activity to troubleshoot a bug**: A user has reported a potential bug during their session. Find the user via *User Lookup* (you’ll need their user ID to do this), then click *Play Session* next to the session you're looking for in the event stream. The replay will then appear to the right, where you can review session activity.
* **Identify trends**: Let's say you want to understand if a single user is representative of a bigger trend. Find the user via the *User Lookup*. In the event stream, select up to 10 events you want to review and click *Create Chart*. Choose either an Event Segmentation or Funnel Analysis chart and click *Create*. The chart will then appear in the modal that opens.

**NOTE**: You can generate a link to share the replay with your team from the view in a User Lookup event stream. Click *Copy URL* from the view to copy the link. 

## Limitations

There are some limitations when using Session Replay:

* Session Replay is available for web-based applications only. This includes mobile web.
* Session Replay supports standard session definitions only. [Custom](/docs/data/sources/instrument-track-sessions) session definitions are not supported.
* You can replay captured sessions for up to three months after they occur.
* Some HTML elements are not supported and will not be captured as part of the replay:
	* Canvas
	* WebGL
	* <object> elements: Plugins such as Flash, Java, Silverlight, etc., with the exception of <object type="image">
	* Lottie Animations (web and mobile)
	* iFrames not from origin
	* Assets that require authentication (e.g. fonts, CSS files, and images)