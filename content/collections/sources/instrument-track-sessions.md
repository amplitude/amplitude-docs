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
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718136903
---
In Amplitude, sessions are a useful metric for understanding the frequency and duration of your users' engagement with your product. The most direct way to build a session-based analysis is with the [User Sessions chart](/docs/data/user-properties-and-events). 

{{partial:admonition type='note'}}
You may also find [this video](https://academy.amplitude.com/how-long-do-users-spend-in-my-product/1091393) on User Sessions helpful.
{{/partial:admonition}}

## How Amplitude defines "sessions"

Generally, a session is the period of time a user has your app in the foreground or has your website open. The specifics differ slightly between mobile and web applications:

* For **mobile**, a session begins when the app is brought into the foreground; it ends when the app goes into the background and no events are fired for at least five minutes. All events sent within five minutes of each other are counted towards the current session. Note that you can define your own session expiration time by calling `setMinTimeBetweenSessionsMillis(timeout)`, where the timeout input is in milliseconds.
* On a **browser**, a session begins when the website is opened and the SDK is initialized; it ends when the last event is triggered. Web sessions time out after 30 minutes by default. All events fired within 30 minutes of each other are counted as part of the same session. This timeout window can be customized via the [Browser SDK configuration options](/docs/sdks/analytics/browser/browser-sdk-2).

Amplitude automatically generates a session ID for each new session; that ID is the session's start time in milliseconds since **epoch** (also known as the [Unix timestamp](https://en.wikipedia.org/wiki/Unix_time)). All events within the same session share the same session ID. If you are using Amplitude's SDKs, this happens automatically. However, if you are sending data to Amplitude using the HTTP API, you will have to explicitly set the [session ID](/docs/apis/analytics/http-v2) field in order to track sessions.

## How Amplitude tracks your sessions

By default, the setting in Amplitude for the session property is session ID. All events with the same session ID and the same user ID will be grouped into the same session. The session ID does **not** have to be unique across multiple users. You can also [change the property you use](#h_d6df9d70-48fa-44cb-8907-7c3c652b007f) to group sessions.

As noted above, session IDs for events sent via the Amplitude SDKs are automatically generated and managed. However, for events sent via the [HTTP API](/docs/apis/analytics/http-v2), Amplitude defaults to a session ID of `-1`. This means the event is excluded from all session metrics.

{{partial:admonition type='note'}}
This commonly occurs when sending data to Amplitude from Segment via a cloud-mode connection. As with sending data via HTTP API, you will have to explicitly set a session ID to track sessions.
{{/partial:admonition}}

![SessionId.png](/docs/output/img/sources/sessionid-png.png)

Events included in the same session will be connected with a blue line, as shown above.

### Start Session and End Session events

By default, Amplitude tracks `Start Session` and `End Session` events using the beginning and ending times of each session by session ID. Amplitude also uses session ID to calculate [session lengths](#h_408dc7ad-4919-4fa1-a506-c43174f68096). If you use session IDs, Amplitude will not add additional events to your monthly event volume limit.

That said, if tracking`Start Session` and`End Session` events is critical to your analysis outside of session lengths, you can easily turn on tracking for these events by adding this line of code before initializing the SDK:

For Android:

```
Amplitude amplitude = new Amplitude(new Configuration(  apiKey = AMPLITUDE\_API\_KEY,  context = applicationContext,  trackingSessionEvents = true, ));
```

For iOS:

```
[Amplitude instance].trackingSessionEvents = YES;
```

For Browser:

```
amplitude.init(API\_KEY, OPTIONAL\_USER\_ID, {  defaultTracking: {  sessions: true,  }, });
```

**Important Notes:**

* This only applies to Amplitude's **Android**,**iOS**, and **Browser** SDKs. Refer to Amplitude's [Developer Center](/docs/sdks/analytics) for all SDK documentation.
* Start/End Session events count towards your monthly [event volume limit](https://help.amplitude.com/hc/en-us/articles/115002923888#h_5d6b52ca-cb1e-4497-82a3-81b86b2f30ff).
* The `End Session` event will be sent at the start of the user's next session.
* You will not be able to add additional event properties to these Start Session and End Session events. If you would like to send event properties for session start/end events, try implementing your own custom `Open App` and `Close App` events.

### Out-of-session events

You can also log events as out-of-session by setting the session ID to `-1`. Out-of-session events are not considered part of the current session. Because they do not extend the current session, they can be useful if you're logging events triggered by push notifications.

Out-of-session events are normally server-side events received by Amplitude (see our [HTTP API](/docs/apis/analytics/http-v2) documentation for more details). These events will appear in a user's event stream as disconnected green squares.

![SessionId](statamic://asset::help_center_conversions::sources/sessionid-neg1-png.png)

### Custom session property

By default, Amplitude sorts events into sessions according to session ID. You can also define a session **without instrumentation**, simply by setting a constant property, custom timeout window, or beginning and ending events to group sessions.

You will need Admin or Manager privileges to edit session definitions.

{{partial:admonition type='note'}}
Custom session definitions are only available in the User Sessions and Pathfinder charts, as well as user timelines. Sessions only include **active** events.
{{/partial:admonition}}

To set a custom session definition, follow these steps:

1. From the left sidebar, navigate to *Settings > Projects*.
2. Click on the project you want to work with.
3. Click *Session Definitions*. The Session Definitions modal will appear.
4. Click *Custom Session Definition*.
5. Next, choose the specifications for any of three conditions that will define the custom session:
	* **Session property**: Click *Select property...* to choose the event or user property you want to use for grouping sessions.
    * **Starting Event and Ending Event**: Click on *Starting Event* or *Ending Event* to choose the events that will signify the beginning and end of a session. The triggering of the ending event will end a session if it occurs before the timeout interval has elapsed.
    * **Session timeout**: Enter the default timeout interval in minutes. Amplitude will count all events from the same user prior to the interval you specify as being part of a single session. We recommend a default of 30 minutes.

You can define one condition or multiple conditions, but be aware that **all** conditions you specify must be met in order for Amplitude to count a session. If you do not define any of these conditions, Amplitude will use session ID as the session-defining property.

6. Finally, enter the confirmation phrase and click *Save*.

![customSessionDefinition.png](/docs/output/img/sources/customsessiondefinition-png.png)

{{partial:admonition type='note'}}
Changing the session definition will apply to **all User Session, Funnel Analysis, Journeys charts, as well as the session metric, in your project**. Be sure you understand what the impacts might be before setting or changing a custom session definition.
{{/partial:admonition}}

Be aware that Amplitude will treat combinations of conditions as **and** logic, meaning all conditions must be met for the session to be counted. For example, if you want to guarantee that all events in sessions are from the same source, you can accomplish this by using session property and timeout window in tandem: 

* Session property = `device ID`
* Session timeout = `30 min`

Alternatively, to define sessions based on in-app usage, you can use starting event and timeout window:

* Start event = `app open`
* Session timeout = `5 min`