---
id: f4c61e43-7a55-43a3-9dbd-f1ecb2502774
blueprint: session-replay
title: 'Session Replay Standalone SDK'
source: 'https://www.docs.developers.amplitude.com/session-replay/sdks/plugin/'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1726768267
instrumentation_guide: true
platform: browser
public: true
parent: 467a0fe0-6ad9-4375-96a2-eea5b04a7bcf
description: 'If you use a provider other than Amplitude for in-product analytics, choose this option.'
---
{{partial:admonition type="note" heading="Session Replay instrumentation"}}
Session Replay isn't enabled by default, and requires setup beyond the standard Amplitude instrumentation.
{{/partial:admonition}}

This article covers the installation of Session Replay using the standalone SDK. If you use a provider other than Amplitude for in-product analytics, choose this option. If your site is already instrumented with Amplitude Browser SDK, use the [Session Replay Browser SDK Plugin](/docs/session-replay/session-replay-plugin).

{{partial:admonition type="info" heading="Session Replay and performance"}}
Amplitude built Session Replay to minimize impact on the performance of web pages on which it's installed by:

- Asynchronously capturing and processing replay data, to avoid blocking the main user interface thread.
- Using batching and lightweight compression to reduce the number of network connections and bandwidth.
- Optimizing DOM processing.
{{/partial:admonition}}

Session Replay captures changes to a page's Document Object Model (DOM), including elements in the shadow DOM, then replays these changes to build a video-like replay. For example, at the start of a session, Session Replay captures a full snapshot of the page's DOM. As the user interacts with the page, Session Replay captures each change to the DOM as a diff. When you watch the replay of a session, Session Replay applies each diff back to the original DOM in sequential order, to construct the replay. Session replays have no maximum length.

## Before you begin

Use the latest version of the Session Replay standalone SDK above version {{sdk_versions:session_replay_standalone}}. For more information, see the [change log](https://github.com/amplitude/Amplitude-TypeScript/blob/v1.x/packages/session-replay-browser/CHANGELOG.md) on GitHub.

Session Replay Standalone SDK requires that:

1. Your application is web-based.
2. You track sessions with a timestamp, which you can pass to the SDK. You inform the SDK whenever a session timestamp changes.
3. You can provide a device ID to the SDK.
4. The `Session ID` and `Device ID` you pass to the Standalone SDK must match those sent as event properties to Amplitude.

The Standalone SDK doesn't provide Session management capabilities. Your application or a third-party integration must update the SDK with changes to `Session ID` and `Device ID`. 

## Quickstart

Install the plugin with npm or yarn.

{{partial:tabs tabs="npm, yarn"}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/session-replay-browser --save
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/session-replay-browser
```
{{/partial:tab}}
{{/partial:tabs}}

Configure your application code.

1. Call `sessionReplay.init` to begin collecting replays. Pass the API key, session identifier, and device identifier.
2. When the session identifier changes, pass the new value to Amplitude with `sessionReplay.setSessionId`.
3. Collect Session Replay properties to send with other event properties with `sessionReplay.getSessionReplayProperties`. See [Add Session Replay ID to your events](#add-session-replay-id-to-your-events) for more information.

```js
import * as sessionReplay from "@amplitude/session-replay-browser";
import 3rdPartyAnalytics from 'example'

const AMPLITUDE_API_KEY = "key"

// Configure the SDK and begin collecting replays
await sessionReplay.init(AMPLITUDE_API_KEY, {
 deviceId: "<string>",
 sessionId: "<number>",
 optOut: "<boolean>",
 sampleRate: "<number>"
}).promise;

// Call whenever the session id changes
sessionReplay.setSessionId(sessionId);

// When you send events to Amplitude, call this event to get
// the most up to date session replay properties for the event
const sessionReplayProperties = sessionReplay.getSessionReplayProperties();
3rdPartyAnalytics.track('event', {...eventProperties, ...sessionReplayProperties})
```

{{partial:admonition type="info" heading=""}}
Session Replay instrumentation happens in the context of an Amplitude Project. Your replay quota is defined on the Organization level. As a result, you may have multiple Session Replay implementations, across multiple projects each with their own sample rate, that pull from the same quota.
{{/partial:admonition}}

You can also use script tags to instrument Session Replay:

```js
<script src="https://cdn.amplitude.com/libs/session-replay-browser-1.10.0-min.js.gz"></script>
<script>
window.sessionReplay.init(AMPLITUDE_API_KEY, {
    deviceId: "<string>",
    sessionId: "<number>",
    sampleRate: "<number>"
    //...other options
})

// Call whenever the session id changes
window.sessionReplay.setSessionId(sessionId);
 
// When you send events to Amplitude, call this event to get
// the most up-to-date Session Replay properties for the event
const sessionReplayProperties = window.sessionReplay.getSessionReplayProperties();
3rdPartyAnalytics.track('event', {...eventProperties, ...sessionReplayProperties})
</script>
```

## Add Session Replay ID to your events

The Session Replay SDK outputs the Session Replay properties that you need to add to your custom event instrumentation. `getSessionReplayProperties` returns event properties, namely the `[Amplitude] Session Replay ID` event property that you need to add to events before you send them to Amplitude. An example response of getSessionReplayProperties is: 

```json
{
 "[Amplitude] Session Replay ID": "6eb24f81-a106-45b0-879c-65248d7b8911/1710374872575"
}
```

{{partial:admonition type="info" heading=""}}
`getSessionReplayProperties` may return an empty object if Session Replay doesn't capture the session (for example, due to sampling or if the page is out of focus).
{{/partial:admonition}}

`[Amplitude] Session Replay ID` is a unique identifier for the replay, and is different from `[Amplitude] Session ID`, which is the identifier for the user's session.

The [Session Replay Browser Plugin](/docs/session-replay/session-replay-plugin) handles this by default, since Amplitude manages event instrumentation. With the Standalone SDK, you need to instrument your application to add this property to any events that occur during capture. 

## Configuration

Pass the following configuration options when you initialize the Session Replay SDK.

| Name              | Type      | Required | Default         | Description                                                                                                                                                                                                                                                                                                          |
| ----------------- | --------- | -------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `deviceId`        | `string`  | Yes      | `undefined`     | Sets an identifier for the device running your application.                                                                                                                                                                                                                                                          |
| `sessionId`       | `number`  | Yes      | `undefined`     | Sets an identifier for the users current session. The value must be in milliseconds since epoch (Unix Timestamp).                                                                                                                                                                                                    |
| `sampleRate`      | `number`  | No       | `0`             | Use this option to control how many sessions to select for replay collection. The number should be a decimal between 0 and 1, for example `0.4`, representing the fraction of sessions to have randomly selected for replay collection. Over a large number of sessions, `0.4` would select `40%` of those sessions. |
| `optOut`          | `boolean` | No       | `false`         | Sets permission to collect replays for sessions. Setting a value of true prevents Amplitude from collecting session replays.                                                                                                                                                                                         |
| `flushMaxRetries` | `number`  | No       | `5`             | Sets the maximum number of retries for failed upload attempts. This is only applicable to errors that Amplitude can retry.                                                                                                                                                                                           |
| `logLevel`        | `number`  | No       | `LogLevel.Warn` | `LogLevel.None` or `LogLevel.Error` or `LogLevel.Warn` or `LogLevel.Verbose` or `LogLevel.Debug`. Sets the log level.                                                                                                                                                                                                |
| `loggerProvider`  | `Logger`  | No       | `Logger`        | Sets a custom `loggerProvider` class from the Logger to emit log messages to desired destination.                                                                                                                                                                                                                    |
| `serverZone`      | `string`  | No       | `US`            | EU or US. Sets the Amplitude server zone. Set this to EU for Amplitude projects created in EU data center.                                                                                                                                                                                                           |

### Mask on-screen data

{{partial:partials/session-replay/sr-mask-data}}

### User opt-out

Session Replay provides an option for opt-out configuration. This prevents Amplitude from collecting session replays when passed as part of initialization. For example:

```js
// Pass a boolean value to indicate a users opt-out status
await sessionReplay.init(AMPLITUDE_API_KEY, {
 optOut: true, //[tl! ~~]
}).promise;
```

### EU data residency

Session Replay is available to Amplitude Customers who use the EU data center. Set the `serverZone` configuration option to `EU` during initialization. For example:

```js
// For European users, set the serverZone to "EU" 
await sessionReplay.init(AMPLITUDE_API_KEY, {
 serverZone: "EU", //[tl! ~~]
}).promise;
```

### Sampling rate

By default, Session Replay captures 0% of sessions for replay. Use the `sampleRate` configuration option to set the percentage of total sessions that Session Replay captures. For example:

```js
// This configuration samples 1% of all sessions
await sessionReplay.init(AMPLITUDE_API_KEY, {
 sampleRate: 0.01 //[tl! ~~]
}).promise;

```

To set the `sampleRate` consider the monthly quota on your Session Replay plan. For example, if your monthly quota is 2,500,000 sessions, and you average 3,000,000 monthly sessions, your quota is 83% of your average sessions. In this case, to ensure sampling lasts through the month, set `sampleRate` to `.83` or lower.

Keep the following in mind as you consider your sample rate:

- When you reach your monthly session quota, Amplitude stops capturing sessions for replay.
- Session quotas reset on the first of every month.
- Use sample rate to distribute your session quota over the course of a month, rather than using your full quota at the beginning of the month.
- To find the best sample rate, Amplitude recommends that you start low, for example `.01`. If this value doesn't capture enough replays, raise the rate over the course of a few days. For ways to monitor the number of session replays captured, see [View the number of captured sessions](/docs/session-replay#view-the-number-of-captured-sessions).

Session Replay supports remote sampling rate settings. This enables users in your organization to configure or update the sampling rate of your project after implementation, without a code change. In the event of a conflict, Session Replay defaults to the remote setting. For more information, see [Account Settings](/docs/admin/account-management/account-settings#session-replay-settings).

### Disable replay collection

Once enabled, Session Replay runs on your site until either:

- The user leaves your site
- You call `sessionReplay.shutdown()`

Call `sessionReplay.shutdown()` before a user navigates to a restricted area of your site to disable replay collection while the user is in that area. 

Call `sessionReplay.init(API_KEY, {...options})` to re-enable replay collection when the return to an unrestricted area of your site.

You can also use a feature flag product like Amplitude Experiment to create logic that enables or disables replay collection based on criteria like location. For example, you can create a feature flag that targets a specific user group, and add that to your initialization logic:

```js
import * as sessionReplay from "@amplitude/session-replay-browser";
import 3rdPartyAnalytics from 'example'

const AMPLITUDE_API_KEY = <...>
sessionReplay.init(AMPLITUDE_API_KEY, {
 deviceId: <string>,
 sessionId: <number>,
 optOut: <boolean>,
 sampleRate: <number>
})

if (nonEUCountryFlagEnabled) {
 const sessionReplayProperties = sessionReplay.getSessionReplayProperties();
 3rdPartyAnalytics.track('event', {...eventProperties, ...sessionReplayProperties})
}
```

{{partial:partials/session-replay/sr-retention}}

### DSAR API

The Amplitude [DSAR API](/docs/apis/analytics/ccpa-dsar) returns metadata about session replays, but not the raw replay data. All events that are part of a session replay include a `[Amplitude] Session Replay ID` event property. This event provides information about the sessions collected for replay for the user, and includes all metadata collected with each event.

```json
{
 "amplitude_id": 123456789,
 "app": 12345,
 "event_time": "2020-02-15 01:00:00.123456",
 "event_type": "first_event",
 "server_upload_time": "2020-02-18 01:00:00.234567",
 "device_id": "your device id",
 "user_properties": { ... }
 "event_properties": {
 "[Amplitude] Session Replay ID": "cb6ade06-cbdf-4e0c-8156-32c2863379d6/1699922971244"
 }
 "session_id": 1699922971244,
}
```

### Data deletion

Session Replay uses Amplitude's [User Privacy API](/docs/apis/analytics/user-privacy/) to handle deletion requests. Successful deletion requests remove all session replays for the specified user.

When you delete the Amplitude project on which you use Session Replay, Amplitude deletes that replay data.

### Bot filter

Session Replay uses the same [block filter](/docs/data/block-bot-traffic) available in the Amplitude app. Session Replay doesn't block traffic based on event or user properties.

## Session Replay storage

Session Replay doesn't set cookies on the user's browser. Instead, it relies on a browser storage option called [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API). This option enables continuous replay collection during a session in which the user navigates browser tabs or closes and reopens a tab. The SDK cleans up the data it stores in IndexedDB and shouldn't impact the user's disk space.

If a user opts out of all cookies on your site, use the `optOut` configuration option to disable replay collection for that user.

### IndexedDB best practices

To ensure that IndexedDB is initialized and working properly:

* Review CSP headers to ensure they're not overly restrictive. Ensure `default-src` and `script-src` directives allow necessary sources.

* Perform IndexedDB operations are within the same origin. Cross-origin restrictions can block IndexedDB operations.

* Confirm that users use a modern browser that supports IndexedDB. Amplitude recommends the latest versions of Chrome, Firefox, Safari, Edge, or Opera.

## Known limitations

Keep the following limitations in mind as you implement Session Replay:

- Session Replay doesn't stitch together replays from a single user across multiple projects. For example:
  - You instrument your marketing site and web application as separate Amplitude projects with Session Replay enabled in each.
  - A known user begins on the marketing site, and logs in to the web application.
  - Amplitude captures both sessions.
  - The replay for each session is available for view in the host project.
- Session Replay supports standard session definitions, and doesn't support [custom session definitions](/docs/data/sources/instrument-track-sessions).
- Session Replay can't capture the following HTML elements:
  - Canvas
  - WebGL
  - `<object>` tags including plugins like Flash, Silverlight, or Java. Session replay supports `<object type="image">`
  - Lottie animations
  - `<iframe>` elements from a different origin
  - Assets that require authentication, like fonts, CSS, or images
- - Session Replay isn't compatible with ad blocking software.

### Multiple Amplitude instances

Session Replay supports attaching to a single instance of the Amplitude SDK. If you have more than one instance instrumented in your application, make sure to start Session Replay on the instance that most relates to your project.

```html
<script>
 const sessionReplayTracking = window.sessionReplay.plugin();
  const instance = window.amplitude.createInstance();
  instance.add(sessionReplayTracking);
  instance.init(API_KEY);
<script>
```

## Troubleshooting

For more information about individual statuses and errors, see the [Session Replay Ingestion Monitor](/docs/session-replay/ingestion-monitor).

### CSS styling doesn't appear in replay

When Amplitude captures a replay, it doesn't download and store CSS files or other static assets that are part of your application or site. Session Replay stores references to these files, and uses those references while it reconstructs the replay. In some situations, the styling present in the replay may differ from your application for the following reasons:

- Assets on your site move or change name. This can happen when you deploy a new version of your application.
- Assets on your site are behind access controls that prevent Amplitude from fetching them.

To help resolve CSS loading issues:

- Ensure your domain is publicly accessible. If you store assets on `localhost`, try moving them to a staging environment.
- Your CDN should keep track of old stylesheets for older replays. If the content of the same stylesheet changes over time, try to append a unique string or hash to the asset URL. For example, `stylesheet.css?93f8b89`.
- Add `app.amplitude.com` or `app.eu.amplitude.com` to the list of domains that your server's CORS configuration permits.

{{partial:partials/session-replay/sr-web-mismatch}}

### Session Replay processing errors

In general, replays should be available within minutes of ingestion. Delays or errors may be the result of one or more of the following:

- Mismatching API keys or Device IDs. This can happen if Session Replay and standard event instrumentation use different API keys or Device IDs.
- Session Replay references the wrong project.
- Short sessions. If a users bounces within a few seconds of initialization, the SDK may not have time to upload replay data.
- Page instrumentation. If Session Replay isn't implemented on all pages a user visits, their session may not capture properly.
- Replays older than the set [retention period](#retention-period) (defaults to 90 days).

## Use Session Replay with Segment analytics

Session Replay supports other analytics providers. Follow the information below to add Session Replay to an existing Segment-instrumented site.

- [Amplitude (Actions)](#amplitude-actions-destination)
- [Amplitude Classic (Cloud-mode)](#amplitude-classic-destination-cloud-mode)
- [Amplitude Classic (Device-mode)](#amplitude-classic-destination-device-mode)

{{partial:admonition type="warning" heading="Session Replay ID is a required property"}}
To ensure that Session Replay implementations with Segment work as expected, add the `Session Replay ID` event property to your Segment tracking plan. Otherwise, Segment may block the property.
{{/partial:admonition}}

### Amplitude (Actions) destination

Amplitude (Actions) tracks sessions automatically. When a user starts a new session, Amplitude sets an `analytics_session_id` cookie on the users browser. Configure your implementation to listen for changes in value to `analytics_session_id`, which you can do with Segment's [Source Middleware](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/middleware/).

This code snippet shows how to configure Session Replay with Segment's Amplitude (Actions) integration, and update the session ID when `analytics_session_id` changes.

```javascript
import * as sessionReplay from "@amplitude/session-replay-browser";
import { AnalyticsBrowser } from "@segment/analytics-next";

const segmentAnalytics = AnalyticsBrowser.load({
  writeKey: "segment-key",
});

const AMPLITUDE_API_KEY = 'api-key' // must match that saved with Segment
const getStoredSessionId = () => {
 return cookie.get("amp_session_id") || 0;
}

const user = await segmentAnalytics.user();
const storedSessionId = getStoredSessionId();

await sessionReplay.init(AMPLITUDE_API_KEY, { 
  sessionId: storedSessionId,
  deviceId: user.anonymousId()
}).promise;

// Add middleware to check if the session id has changed, 
// and update the session replay instance
segmentAnalytics.addSourceMiddleware(({ payload, next, integrations }) => {
  const storedSessionId = getStoredSessionId();
  const nextSessionId = payload.obj.integrations['Actions Amplitude'].session_id || 0
  if (storedSessionId < nextSessionId) {
    cookie.set("amp_session_id", nextSessionId);
    sessionReplay.setSessionId(nextSessionId);
  }
  next(payload);
});

// Add middleware to always add session replay properties to track calls
SegmentAnalytics.addSourceMiddleware(({ payload, next, integrations }) => {
  const sessionReplayProperties = sessionReplay.getSessionReplayProperties();
  if (payload.type() === "track") {
    payload.obj.properties = {
      ...payload.obj.properties,
      ...sessionReplayProperties,
    };
  }
  
  next(payload);
});
```
### Amplitude Classic destination (Device-mode)

This version of the Amplitude destination installs the Amplitude JavaScript SDK (5.2.2) on the client, and sends events directly to `api.amplitude.com`.

The Device-mode integration tracks sessions by default, since it includes the amplitude-js SDK. The included SDK version (5.2.2) doesn't include an event for session changes. As a result, use Segment's middleware to update Session Replay when the session ID changes.

```javascript
import * as sessionReplay from "@amplitude/session-replay-browser";
import { AnalyticsBrowser } from "@segment/analytics-next";

const segmentAnalytics = AnalyticsBrowser.load({
  writeKey: "segment-key",
});

const AMPLITUDE_API_KEY = 'api-key' // must match that saved with Segment
const getAmpSessionId = () => {
  const sessionId = window.amplitude.getInstance().getSessionId();
  cookie.set("amp_session_id", sessionId);
  return sessionId;
};

// Wait for the amplitude-js SDK to initialize,
// then initialize session replay with the correct device id and session id
window.amplitude.getInstance().onInit(() => {
  const sessionId = getAmpSessionId();
  sessionReplay.init(AMPLITUDE_API_KEY, {
    deviceId: window.amplitude.getInstance().options.deviceId,
    sessionId: getAmpSessionId(),
  });
});

// Add middleware to check if the session id has changed, 
// and update the session replay instance
SegmentAnalytics.addSourceMiddleware(({ payload, next, integrations }) => {
  const nextSessionId = window.amplitude.getInstance().getSessionId();
  const storedSessionId = cookie.get("amp_session_id") || 0;
  if (storedSessionId < nextSessionId) {
    cookie.set("amp_session_id", nextSessionId);
    sessionReplay.setSessionId(nextSessionId);
  }
  next(payload);
});

// Add middleware to always add session replay properties to track calls
SegmentAnalytics.addSourceMiddleware(({ payload, next, integrations }) => {
  const sessionReplayProperties = sessionReplay.getSessionReplayProperties();
  if (payload.type() === "track") {
    payload.obj.properties = {
      ...payload.obj.properties,
      ...sessionReplayProperties,
    };
  }
  
  next(payload);
});
```

### Amplitude Classic destination (Cloud-mode)

This version of the Amplitude destination sends events to Segment's backend, which forwards them to Amplitude. The Cloud-mode destination doesn't track sessions by default. To overcome this, use the Browser SDK as a shell to manage sessions, and use Session Replay as a plugin, as shown below.

```javascript
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";
import { AnalyticsBrowser } from "@segment/analytics-next";

const segmentAnalytics = AnalyticsBrowser.load({
  writeKey: "segment-key",
});

// A plugin must be added so that events sent through Segment will have
// session replay properties and the correct session id
const segmentPlugin = () => {
  return {
    name: "segment",
    type: "destination",
    execute: async (event) => {
      const properties = event.event_properties || {};
      segmentAnalytics.track(event.event_type, properties, {
        integrations: {
          Amplitude: {
            session_id: amplitude.getSessionId(),
          },
        },
      });
      return {
        code: 200,
        event: event,
        message: "OK",
      };
    },
  };
}; 

const AMPLITUDE_API_KEY = 'api-key' // must match that saved with Segment

// Add the session replay plugin first, then the segment plugin
await amplitude.add(sessionReplayPlugin()).promise;
await amplitude.add(segmentPlugin()).promise;

const user = await segmentAnalytics.user();
await amplitude.init(AMPLITUDE_API_KEY, { 
  instanceName: 'session-replay',
  sessionTimeout: Number.MAX_SAFE_INTEGER,
  defaultTracking: false,
  deviceId: user.anonymousId()
}).promise;
amplitude.remove('amplitude');
// Events must be tracked through the shell Browser SDK to properly attach
// session replay properties
amplitude.track('event name')
```