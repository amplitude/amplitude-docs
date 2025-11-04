---
id: 3719e8a7-755b-4426-842b-a90fd0e62ad3
blueprint: section
title: 'Session Replay'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1743537777
nav_title: session_replay
hide_toc: false
current-collection: session-replay
academy_course:
  - c21d8f17-d66b-4bd3-a340-b139dbb7a835
---
Sometimes you need to go beyond a funnel analysis to understand the "why" behind your product metrics. Amplitude’s built-in Session Replay feature gives full visibility in the customer journey by uncovering qualitative insights from your quantitative data. It brings digital experiences to life, unlocking growth bottlenecks and giving you the confidence to take appropriate action.

Find Session Replay in the left-hand sidebar in Amplitude Analytics.

[View and modify Session Replay settings in your organization settings](/docs/admin/account-management/account-settings#session-replay-settings).

## Feature availability

Session Replay is available to try on all new Amplitude plans as of February 7, 2024 (including the Starter and Plus updates from October 2023). Existing Growth and Enterprise customers can also access Session Replay as an add-on purchase. Contact your account manager with questions. See our [pricing page](https://amplitude.com/pricing) for more details.

{{partial:admonition type="note" heading=""}}
Session Replay **isn't** enabled by default, and requires instrumentation beyond the standard Amplitude instrumentation.
{{/partial:admonition}}

{{partial:partials/session-replay/sr-retention}}

## Use Session Replay to review user activity

You can launch a session replay from a user’s event stream, inside a chart, or from your homepage. Replays are generally available for viewing five minutes after a session begins.

When viewing a session replay from your homepage or from a search, the user's event stream syncs with the replay. You can select an event from the stream, and the replay jumps to that point in the session. (This feature isn't available when viewing a replay from a chart.)

![image-20240109-232506.png](/docs/output/img/session-replay/image-20240109-232506-png.png)

Session Replay supports user sessions of any length.

{{partial:admonition type="note" heading=""}}
Event names with a *sparkle* icon indicate that Amplitude has generated a name to provide more context around the action a user is taking. These are Autocapture events ingested as `Page Viewed`, `Element Clicked`, and `Element Changed`, but Amplitude uses property information to make them more valuable in the event stream. Click any of them to see their ingested name and properties.
{{/partial:admonition}}

## Error analytics and console logs

Session Replay can capture and display technical errors and console logs that occur during user sessions. This helps you understand whether technical issues are impacting user experience and correlate errors with drops in conversion or engagement.

When enabled, Session Replay captures:

* **JavaScript console logs**: Console messages, warnings, and errors logged by your application
* **Network errors**: Failed network requests and API calls
* **Runtime errors**: JavaScript errors that occur during the session

### View console logs in a replay

To view console logs and errors in a session replay:

1. Open a session replay from a chart, User Look-Up, or the Session Replay list.
2. Look for the console icon in the replay interface.
3. Click the console icon to expand the console log view.

The console view displays logs, warnings, and errors in chronological order alongside the session timeline. You can click on any log entry to jump to that moment in the replay.

### Enable or disable console logs

Admins and managers can enable or disable console log capture through organization settings:

1. Navigate to *Settings > Organization Settings*.
2. Go to the *Session Replay & Heatmaps* section.
3. Toggle the *Console Logs* setting on or off for your projects.

Changes to this setting apply to future session captures only.

### Analyze error events

Error events captured during sessions appear in your event stream and can be analyzed like any other event. You can:

* Use [Event Segmentation](/docs/analytics/charts/event-segmentation/event-segmentation-build) to measure error frequency and trends
* Include error events in [Funnel Analysis](/docs/analytics/charts/funnel-analysis/funnel-analysis-build) to review how errors impact conversion
* Filter session replays by error events to focus on problematic sessions

This helps quantify the business impact of technical issues and prioritize fixes based on data.

## Frustration analytics

Session Replay automatically detects and highlights user frustration signals during playback. These signals help you identify UX problems that may not be obvious in traditional analytics.

### Frustration event types

* **Rage clicks**: When users rapidly click the same element multiple times, usually indicating something isn't working as expected. This often means a button or link appears interactive but doesn't respond.
* **Dead clicks**: When users click on elements that appear clickable but have no functionality—such as non-interactive images styled like buttons or links that lead nowhere.

### View frustration events in replays

Frustration events appear directly in the session timeline and event stream, making them easy to spot:

1. Open a session replay.
2. Look for rage click and dead click indicators in the timeline.
3. Click on a frustration event to jump to that moment in the replay.

Like error events, frustration events can be analyzed using Event Segmentation and Funnel Analysis to understand their impact on user behavior and conversion rates.

{{partial:admonition type="note" heading=""}}
Frustration analytics are available to all Session Replay users and don't require additional configuration.
{{/partial:admonition}}

### View Session Replay from User Look-Up

To access Session Replay from a user’s event stream, use the [User Look-Up](/docs/analytics/user-data-lookup) feature. This can be helpful if a user has reported a potential bug during their session, or if you want to understand whether a user's experience is representative of a bigger trend.

Find the user with User Look-Up (you’ll need their user ID to do this), then click *Play Session* next to the session you're looking for in the event stream. The replay appears to the right, where you can review session activity. You can generate a link to share the replay with your team from the view in a User Look-Up event stream. Click *Copy URL* from the view to copy the link. 

### View Session Replay from a chart

To use Session Replay in a chart, follow these steps:

1. Open the Amplitude chart that contains the events you want to look at.
2. Open the [Microscope](/docs/analytics/microscope) and click *Watch Session Replays*.
3. Check the *Streams with session replays* box.

The replay modal appears, where you can: 

* Browse the available replays that correspond to the specific data point on the chart
* Pause replay
* Skip forward and backwards by 10-second increments
* Speed up and down
* Skip periods of inactivity
* Navigate to the standalone replay page and watch with event sync
* Copy and share the replay's URL

The user’s cursor movement displays as a red line, and masked HTML elements appear as a series of asterisks. Session Replay shows the timestamp of the session as it occurred.

#### Availability in Amplitude charts

Session Replay is available in the following Amplitude chart types, with these restrictions around each chart type's available metrics:

* **Event Segmentation**: Session replay is available for all six measures.
* **Funnel Analysis**: Session replay is only available for the conversion measure. For Funnel Analysis charts, the order of events appears in chronological order (oldest to newest).
* **Journeys**: Session replay is available on the Pathfinder and Journey Map visualizations.
* **User Sessions**: Session replay is available for all six measures. This chart won’t allow session replays for [custom defined sessions](/docs/data/sources/instrument-track-sessions).
* **Experiment charts**: Session replay is available on all Experiment charts.

### View Session Replay from your homepage

With Session Replay, your homepage shows 100 sessions captured over the past seven days. Each session displays its start time, user ID, session length, and country.

{{partial:admonition type="note" heading=""}}
If you can’t see the Session Replay widget and have a customized [home page](/docs/get-started/amplitude-home-page), reset the home page and then re-add your customizations to make the widget visible.
{{/partial:admonition}}

Click *Play* to see the session view in the modal that appears. 

## View the number of captured sessions

To review your Session Replay quota and retention time frame, navigate to the Plans & Billing page for your organization.

## Search for a replay

Session replay gives you two options for searching replays: either by date, or with a filter.

1. Navigate to *Session Replay* to see the complete list of session replays available for viewing.
2. To narrow the list by date, click the calendar icon just above the list and select the starting and ending dates you'd like to use. You can also use a preset time range: one day, seven days, or 30 days.

Filtered results by date or time frame match the project's timezone.

3. To narrow the list with a filter, click *+ Add Filter*. You can filter by cohorts, events, event properties, user properties, and session duration. You can also use multiple filters to further narrow your list.

Once you make your selection, view replays that took place within the selected time frame, or replays that meet your filter specifications. Your search results generate a unique URL that you can share with your team.

{{partial:admonition type='note'}}
Keep in mind that if you apply a filter to exclude replays with a specific property value, Session Replay search returns results for all replays with a different value for that property, **and** replays with **missing** values for that property.
{{/partial:admonition}}

The list of results shows a maximum of 100 replays. 

## Add a replay to a dashboard or notebook

There are three ways you can add a Session Replay to a dashboard or notebook:

* From the Session Replay page itself (accessible from the homepage and Session Replay search)
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

* Session Replay supports standard session definitions only. [Custom session definitions](/docs/data/sources/instrument-track-sessions) and time-based session definitions aren't supported.
* Session Replay can only be used to segment by users, and isn't available for [account-level reporting](/docs/analytics/account-level-reporting).
* If you are in a portfolio view, you can see replays for different users under different projects. However, keep in mind that Session Replay doesn't stitch together replays from a single user across multiple projects. If a user begins a session in one project and then continues to a second project, Amplitude Analytics generates separate replays for that user for each project.
* Session Replay doesn't capture these unsupported HTML elements:
	* Canvas
	* WebGL
	* `<object>` elements: Plugins such as Flash, Java, Silverlight, etc., except `<object type="image">`
	* Lottie Animations (web and mobile)
	* iFrames not from origin
	* Assets that require authentication, like fonts, CSS files, and images

## Troubleshoot replay playback

Sometimes, replays may appear missing or otherwise unavailable for playback. The causes of these issues, and steps you can take to to mitigate them depend on the issue.

### Parts of this session weren't captured

If you experience this error, parts of a replay may show as inactive periods because Amplitude doesn't capture any user interaction during that period. Sometimes, it impacts the entire replay.

When you see this error in a replay, one of the following may have happened:

* **The user closed the browser**. Amplitude captures and uploads session replays as users use your product. If they leave the app or close their browser before the session replay upload completes, some parts of the replay appear to be missing in Amplitude and unavailable for playback.
* **Network issues**. If the user on your site or app experiences network degradation, their replay may fail to upload. If you notice pattern, or commonly experience this issue, contact [Amplitude Support](https://gethelp.amplitude.com/hc/en-us).
* **Requests throttled**. During holiday periods, special events, or other peak times, traffic to your site or app may spike resulting in a large volume of session replays. In these instances, Amplitude may throttle uploads to keep system performance.

If you see this error:

* **Check for throttle errors**. Open the [Ingestion Monitor](/docs/session-replay/ingestion-monitor). Check for a spike `429` throttling errors. If you know a period of high traffic is coming up due to a campaign or other event, contact [Amplitude Support](https://gethelp.amplitude.com/hc/en-us) for a temporary change to the throttle threshold.
* **Leave in-product feedback**. Leave a thumbs-down if the replay you're viewing doesn't meet expectation.
* **Contact Amplitude**. If you see issues in replace collection that you think might relate to missing data, contact [Amplitude Support](https://gethelp.amplitude.com/hc/en-us).

### Replay temporarily unavailable due to ingestion delay

This message appears when you view a replay that Amplitude ingested within the last five minutes. It takes Amplitude one or two minutes to make a replay available for playback.

Live replays that are longer than five minutes become available for playback as soon as Amplitude receives enough data to generate the replay. Refresh the page for the most recent replay data.