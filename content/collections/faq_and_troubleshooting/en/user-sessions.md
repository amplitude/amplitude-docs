---
id: fe60748d-6a3e-4a93-8e5a-007affe53c41
blueprint: faq_and_troubleshooting
title: 'User Sessions'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/17645167873691'
---
This article covers frequently asked questions about the [User Sessions](/docs/analytics/charts/user-sessions/user-sessions-track-engagement-frequency) chart and sessions in the event streams. Please also refer to [Track sessions](/docs/cdp/sources/instrument-track-sessions) for how Amplitude defines and calculates sessions.

Why is my User Sessions chart empty?
The User Sessions chart requires valid session IDs for events. A valid session ID is one that has a value other than -1. You can determine if the events in your project have session IDs by checking any user's event streams. 

Why are there so many zero-length sessions in my User Sessions chart?
There are two likely causes when you see a large number of users in the “0 sec” session data point in the [User Session](/docs/analytics/charts/user-sessions/user-sessions-track-engagement-frequency) chart.

**Potential cause #1: Out-of-session events**

Amplitude considers events sent using the [HTTP API](/docs/cdp/sources/instrument-track-sessions) is calculated based on the formula:

max(client\_event\_time) - session\_id

If you want these events to be considered part of a session, the [session ID](/docs/cdp/sources/instrument-track-sessions) should be a timestamp reflecting the beginning of the session in epoch time.

**Potential cause #2: You're tracking the Start Session event, but no other events**

If your project permits sending start or end session events (which you can enable using [Android SDK](https://help.amplitude.com/hc/en-us/articles/115002935588-Android-SDK-Installation#tracking-sessions) or [iOS SDK](https://help.amplitude.com/hc/en-us/articles/115002278527-iOS-SDK-Installation#tracking-sessions)), anytime your app launches in the foreground, it will send a `Start
 Session` to Amplitude. If Amplitude receives no other events to log after this, it sets the [session length](/docs/cdp/sources/instrument-track-sessions) to zero.

Amplitude's [Microscope](/docs/analytics/microscope) feature lets you examine a given user’s activity, so you can quickly determine whether either of these potential causes is the issue.

When is the Amplitude Start Session event triggered?
This happens when the app enters the foreground, or when the SDK is initialized in the foreground.

Why are there empty sessions with no active events in the user event streams?
When using mobile SDKs with start or end session events enabled, you may see sessions that include only the `Start Session` and `End Session` events. There are a few reasons why this occurs: 

* The user enters and leaves the app without triggering custom events
* The user triggers events that are blocked or deleted in your tracking plan, and which are therefore not ingested into Amplitude
* Certain activities in the app (like backend notifications or identify calls) may bring the app to the foreground without triggering an actual event

Why do some mobile sessions contain a gap of over five minutes, or why do some sessions last an unusually long time?
Some common reasons are: 

* The default session timeout window has changed (set to 5 minutes for mobile SDKs by default)
* Activities in the app (like backend notifications or identify calls) may bring the app to the foreground between two actual sessions, leading to unexpectedly long sessions

Does the change of custom session apply retroactively?
Yes. Once you change the custom session definition, all sessions, including those logged before the change, will be grouped based on the new definition. 

Does the definition of custom session affect the raw data?
It does not affect the raw data, and you can revert it to the default session definition at any time.

Does a server-side integration between Amplitude and Segment provide a Session ID automatically?
Please see [the FAQ article on Segment / Amplitude integration](https://help.amplitude.com/hc/en-us/articles/4416658374427-FAQs-Segment-Amplitude-integration#h_01H6ZJZ5VWRFZMYS1JJZ1NNVAJ) to learn more.
