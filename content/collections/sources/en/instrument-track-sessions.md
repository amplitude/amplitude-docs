---
id: aaef4714-72e1-470d-a8e0-87de6001daf3
blueprint: source
title: 'Track sessions'
source: 'https://help.amplitude.com/hc/en-us/articles/115002323627-Track-sessions'
this_article_will_help_you:
  - 'Understand how Amplitude defines and tracks user sessions'
  - 'Learn how to best incorporate sessions into your analyses'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1726162729
---
In Amplitude, sessions are a useful metric for understanding the frequency and duration of your users' engagement with your product. The most direct way to build a session-based analysis is with the [User Sessions chart](/docs/data/user-properties-and-events). 

{{partial:admonition type='note'}}
You may also find [this video](https://academy.amplitude.com/how-long-do-users-spend-in-my-product/1091393) on User Sessions helpful.
{{/partial:admonition}}

## How Amplitude defines "sessions"

Generally, a session is the period of time a user has your app in the foreground or has your website open. The specifics differ slightly between mobile and web applications:

* For **mobile**, a session begins when the app moves into the foreground; it ends when the app goes into the background and fires no events for at least five minutes. All events sent within five minutes of each other count towards the current session. You can define your own session expiration time with  `setMinTimeBetweenSessionsMillis(timeout)`, where the timeout input is in milliseconds.
* On a **browser**, a session begins when the website loads and the SDK is initialized; it ends when the last event is triggered. Web sessions time out after 30 minutes by default. All events fired within 30 minutes of each other count as part of the same session. Customize this timeout window can with the [Browser SDK configuration options](/docs/sdks/analytics/browser/browser-sdk-2).

Amplitude automatically generates a session ID for each new session; that ID is the session's start time in milliseconds since **epoch** (also known as the [Unix timestamp](https://en.wikipedia.org/wiki/Unix_time)). All events within the same session share the same session ID. If you are using Amplitude's SDKs, this happens automatically. If you send data to Amplitude through the HTTP API, explicitly set the [session ID](/docs/apis/analytics/http-v2) field to track sessions.

## How Amplitude tracks your sessions

By default, the setting in Amplitude for the session property is session ID. All events with the same session ID and the same user ID are grouped into the same session. The session ID doesn't need to be unique across multiple users. You can also change the property you use to group sessions.

As noted above, session IDs for events sent through the Amplitude SDKs are automatically generated and managed. However, for events sent through the [HTTP API](/docs/apis/analytics/http-v2), Amplitude defaults to a session ID of `-1`. This means it excludes the event from all session metrics.

{{partial:admonition type='note'}}
This commonly occurs when sending data to Amplitude from Segment through a cloud-mode connection. As with sending data through the HTTP API, you need to explicitly set a session ID to track sessions.
{{/partial:admonition}}

![SessionId.png](/docs/output/img/sources/sessionid-png.png)

Events included in the same session are connected with a blue line, as shown above.

Amplitude assigns a session to a specific date based on its actual start time. The start time must fall within a chart's selected date range in order for Amplitude to include it on that chart. 

For example, consider a session that begins on May 17th at 8:00 PM and ends on May 18th at 1:30 AM. This session appears on charts where the selected date range includes the date on which the session began. In this example, that date range can begin no later than May 17th, **and** end no earlier than May 17th. If the chart's date range begins on May 18th, this session doesn't appear on the chart, even though the session was still active on that date.

### Start Session and End Session events

By default, Amplitude tracks `Start Session` and `End Session` events using the beginning and ending times of each session by session ID. Amplitude also uses session ID to calculate session lengths. If you use session IDs, Amplitude doesn't add extra events to your monthly event volume limit.

That said, if tracking`Start Session` and`End Session` events is critical to your analysis outside of session lengths, you can easily turn on tracking for these events by adding this line of code before initializing the SDK:

For Android:

```java
Amplitude amplitude = new Amplitude(new Configuration(apiKey = AMPLITUDE_API_KEY, context = applicationContext, trackingSessionEvents = true, ));
```

For iOS:

```objc
[Amplitude instance].trackingSessionEvents = YES;
```

For Browser:

```js
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: {
    sessions: true,
  },
});
```

**Important Notes:**

* This only applies to Amplitude's [Android](/docs/sdks/analytics/android/android-kotlin-sdk), [iOS](/docs/sdks/analytics/ios/ios-swift-sdk), and [Browser](/docs/sdks/analytics/browser/browser-sdk-2) SDKs.
* Start/End Session events count towards your monthly [event volume limit](/docs/faq/limits).
* The `End Session` event is sent at the start of the user's next session.
* You can't add extra event properties to these Start Session and End Session events. If you would like to send event properties for session start/end events, try implementing your own custom `Open App` and `Close App` events.

### Out-of-session events

You can also log events as out-of-session by setting the session ID to `-1`. Out-of-session events aren't considered part of the current session. Because they don't extend the current session, they can be useful if you're logging events triggered by push notifications.

Out-of-session events are normally server-side events received by Amplitude (see our [HTTP API](/docs/apis/analytics/http-v2) documentation for more details). These events appear in a user's event stream as disconnected green squares.

![SessionId](statamic://asset::help_center_conversions::sources/sessionid-neg1-png.png)

### Custom session property

By default, Amplitude sorts events into sessions according to session ID. You can also define a session **without instrumentation**, simply by setting a constant property, custom timeout window, or beginning and ending events to group sessions.

You need Admin or Manager privileges to edit session definitions.

{{partial:admonition type='note'}}
Custom session definitions are only available in the User Sessions and Pathfinder charts, as well as user timelines. Sessions only include **active** events.
{{/partial:admonition}}

To set a custom session definition, follow these steps:

1. From the left sidebar, navigate to *Settings > Projects*.
2. Click on the project you want to work with.
3. Click *Session Definitions*. The Session Definitions modal appears.
4. Click *Custom Session Definition*.
5. Next, choose the specifications for any of three conditions that define the custom session:
	* **Session property**: Click *Select property...* to choose the event or user property you want to use for grouping sessions.
    * **Starting Event and Ending Event**: Click on *Starting Event* or *Ending Event* to choose the events that signifies the beginning and end of a session. The triggering of the ending event ends a session if it occurs before the timeout interval has elapsed.
    * **Session timeout**: Enter the default timeout interval in minutes. Amplitude counts all events from the same user prior to the interval you specify as being part of a single session. We recommend a default of 30 minutes.

You can define one condition or multiple conditions, but be aware that **all** conditions you specify must be met for Amplitude to count a session. If you don't define any of these conditions, Amplitude uses session ID as the session-defining property.

1. Finally, enter the confirmation phrase and click *Save*.

![customSessionDefinition.png](/docs/output/img/sources/customsessiondefinition-png.png)

{{partial:admonition type='note'}}
Changing the session definition applies to **all User Session, Funnel Analysis, Journeys charts, as well as the session metric, in your project**. Be sure you understand what the impacts might be before setting or changing a custom session definition.
{{/partial:admonition}}

Be aware that Amplitude treats combinations of conditions as **and** logic, meaning all conditions must be met for the session to count. For example, if you want to guarantee that all events in sessions are from the same source, you can do this by using session property and timeout window in tandem: 

* Session property = `device ID`
* Session timeout = `30 min`

Alternatively, to define sessions based on in-app usage, you can use starting event and timeout window:

* Start event = `app open`
* Session timeout = `5 min`