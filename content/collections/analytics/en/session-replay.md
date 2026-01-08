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

Sometimes you need to go beyond a funnel analysis to understand the "why" behind your product metrics. Amplitude's built-in Session Replay feature gives full visibility in the customer journey by uncovering qualitative insights from your quantitative data. It brings digital experiences to life, unlocking growth bottlenecks and giving you the confidence to take appropriate action.

With Session Replay, you can:

* **Improve conversions**: Gain qualitative insights and context around user activity after you’ve analyzed quantitative trends with Event Segmentation, Funnel Analysis, Journeys, and User Sessions charts.
* **Diagnose product issues faster**: Follow along with the replay of a specific user’s session to troubleshoot bugs or gain insight into the overall user experience.
* **Identify significant UX behaviors**: Find out if a single user is representative of a larger macro trend by generating an Event Segmentation or Funnel Analysis chart from a replay in User Lookup.

**NOTE**: Session Replay can only be used to segment by users, and isn't available for [account-level reporting](/docs/analytics/account-level-reporting).

## Use Session Replay to review user activity

You can launch a session replay from a user’s event stream, inside a chart, or from your homepage. Replays are generally available for viewing five minutes after a session begins.

When viewing a session replay from your [homepage](#h_01HFD88N1M03EH9D8VF32QBBYQ) or from a [search](#h_01HK600KD02WEC77KE4HYMKHY6), the user's event stream syncs with the replay. You can select an event from the stream, and the replay jumps to that point in the session. (This feature isn't yet available when [viewing a replay from a chart](#h_01HFD818NE7FH2D85NS1VTCHYQ).)

![image-20240109-232506.png](/docs/output/img/analytics/image-20240109-232506.png)

There is no limit on the length of a session that can be viewed as a replay.

{{partial:admonition type="note" heading=""}}
Event names with a *sparkle* icon indicate that Amplitude has generated a name to provide more context around the action a user is taking. These are Autocapture events ingested as `Page Viewed`, `Element Clicked`, and `Element Changed`, but Amplitude uses property information to make them more valuable in the event stream. Click any of them to see their ingested name and properties.
{{/partial:admonition}}

**NOTE:** By default, Amplitude stores your replays for 90 days. Upon request, this can be changed to 30 days to comply with stricter privacy requirements. If you change your retention period, the changes apply only to new sessions, and not those that pre-date the change.

To access Session Replay from a user's event stream, use the [User Lookup](/docs/analytics/user-data-lookup) feature.

### Error analytics and console logs

Session Replay can capture and display technical errors and console logs that occur during user sessions. This helps you understand whether technical issues are impacting user experience and correlate errors with drops in conversion or engagement.

When enabled, Session Replay captures:

* **JavaScript console logs**: Console messages, warnings, and errors logged by your application
* **Network errors**: Failed network requests and API calls
* **Runtime errors**: JavaScript errors that occur during the session

#### View console logs in a replay

To view console logs and errors in a session replay:

1. Open a session replay from a chart, User Lookup, or the Session Replay list.
2. Look for the console icon in the replay interface.
3. Click the console icon to expand the console log view.

The console view displays logs, warnings, and errors in chronological order alongside the session timeline. You can click on any log entry to jump to that moment in the replay.

#### Enable or disable console logs

Admins and managers can enable or disable console log capture through organization settings:

1. Navigate to *Settings > Organization Settings*.
2. Go to the *Session Replay & Heatmaps* section.
3. Toggle the *Console Logs* setting on or off for your projects.

Changes to this setting apply to future session captures only.

#### Analyze error events

Error events captured during sessions appear in your event stream and can be analyzed like any other event. You can:

* Use [Event Segmentation](/docs/analytics/charts/event-segmentation/event-segmentation-build) to measure error frequency and trends
* Include error events in [Funnel Analysis](/docs/analytics/charts/funnel-analysis/funnel-analysis-build) to see how errors impact conversion
* Filter session replays by error events to focus on problematic sessions

This helps quantify the business impact of technical issues and prioritize fixes based on data.

### Frustration analytics

Session Replay automatically detects and highlights user frustration signals during playback. These signals help you identify UX problems that may not be obvious in traditional analytics.

#### Frustration event types

* **Rage clicks**: When users rapidly click the same element multiple times, usually indicating something isn't working as expected. This often means a button or link appears interactive but doesn't respond.
* **Dead clicks**: When users click on elements that appear clickable but have no functionality—such as non-interactive images styled like buttons or links that lead nowhere.

#### View frustration events in replays

Frustration events appear directly in the session timeline and event stream, making them easy to spot:

1. Open a session replay.
2. Look for rage click and dead click indicators in the timeline.
3. Click on a frustration event to jump to that moment in the replay.

Like error events, frustration events can be analyzed using Event Segmentation and Funnel Analysis to understand their impact on user behavior and conversion rates.

**NOTE:** Frustration analytics are available to all Session Replay users and don't require additional configuration.

**NOTE:** If you are in a portfolio view, you can see replays for different users under different projects. However, keep in mind that Session Replay **doesn't** stitch together replays from a single user across multiple projects. If a user begins a session in one project and then continues to a second project, Amplitude Analytics generates separate replays for that user for each project.

### View Session Replay from a chart

To use Session Replay in a chart, follow these steps:

1. Open the Amplitude chart that contains the events you want to look at.
2. Open the [Microscope](/docs/analytics/microscope) and click *View User Streams*.
3. Check the *Streams with session replays* box.

*![](/docs/output/img/analytics/20464659435931)*

4. Click *Play Session* in the event stream to play the events directly below it.

![](/docs/output/img/analytics/20464631555227)

The replay view appears in the right-hand panel, where you can: 

* Expand the view
* Pause replay
* Skip forward and backwards by 10-second increments
* Speed up and down
* Skip periods of inactivity

The user's cursor movement appears as a red line, and masked HTML elements show a series of asterisks. Session Replay shows the timestamp of the session as it occurred.

#### Availability in Amplitude charts

Session Replay is available in the following Amplitude chart types, with these restrictions around each chart type's available metrics:

* **Event Segmentation**: Session replay is available for all six measures.
* **Funnel Analysis**: Session replay is only available for the conversion measure.
* **Journeys**: Session replay is available on the Pathfinder and Journey Map visualizations.
* **User Sessions**: Session replay is available for all six measures. This chart won’t allow session replays for [custom defined sessions](/docs/data/sources/instrument-track-sessions).

**NOTE**: For Funnel Analysis charts, the order of events appears in chronological order (oldest to newest).

### View Session Replay from your homepage

With Session Replay, your homepage shows 100 sessions captured over the past seven days. Each session shows its start time, user ID, session length, and country.

**NOTE:** If you can’t see the Session Replay widget and have a customized [home page](/docs/get-started/amplitude-home-page), reset the home page and then re-add your customizations to make the widget visible.

Click *Play* to see the session view in the modal that appears. 

![](/docs/output/img/analytics/20464613106203)

### View the number of captured replays

To see the number of captured replays, create an [Event Segmentation](/docs/analytics/charts/event-segmentation/event-segmentation-build) chart:

1. Select the `[Amplitude] Replay Captured` event.
2. Group by the `[Amplitude] Session Replay ID` event property.
3. In the formula, use `PROPCOUNT(A)` to count distinct session replay IDs.

This formula returns the number of distinct property values for the property by which the event is grouped. In this example, the formula retrieves the number of different session replay IDs.

## Search for a replay

Session replay gives you two options for searching replays: either by date, or through a filter.

1. Navigate to *Users & Sessions—>Session Replays* to see the complete list of session replays available for viewing.
2. To narrow the list by date, click the calendar icon just above the list and select the starting and ending dates you'd like to use. You can also use a preset timeframe—seven days, 30 days, 60 days, or 90 days—by clicking on the appropriate button.
3. To narrow the list with a filter, click *+ Add Filter*. You can filter by cohorts, events, event properties, and user properties. You can also use multiple filters to further narrow your list.

Once you've made your selection, the list of available replays is limited to either those replays that took place within your selected timeframe, or those replays that meet your filter specifications.

## Common use cases

Some common use cases for Session Replay include:

* **Watch session activity to troubleshoot a bug**: A user has reported a potential bug during their session. Find the user through *User Lookup* (you'll need their user ID to do this), then click *Play Session* next to the session you're looking for in the event stream. The replay appears to the right, where you can review session activity.
* **Identify trends**: To understand if a single user is representative of a bigger trend, find the user through the *User Lookup*. In the event stream, select up to 10 events you want to review and click *Create Chart*. Choose either an Event Segmentation or Funnel Analysis chart and click *Create*. The chart appears in the modal that opens.

**NOTE**: You can generate a link to share the replay with your team from the view in a User Lookup event stream. Click *Copy URL* from the view to copy the link. 

## Limitations

There are some limitations when using Session Replay:

* Session Replay is available for web-based applications only. This includes mobile web.
* Session Replay supports standard session definitions only. [Custom](/docs/data/sources/instrument-track-sessions) session definitions aren't supported.
* You can replay captured sessions for up to three months after they occur.
* Some HTML elements aren't supported and aren't captured as part of the replay:
	* Canvas
	* WebGL
	* <object> elements: Plugins such as Flash, Java, Silverlight, etc., with the exception of <object type="image">
	* Lottie Animations (web and mobile)
	* iFrames not from origin
	* Assets that require authentication (e.g. fonts, CSS files, and images)
