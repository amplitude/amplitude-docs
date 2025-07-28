---
id: f4c61e43-7a55-43a3-9dbd-f1ecb2502774
blueprint: session-replay
title: 'Session Replay Standalone SDK'
source: 'https://www.docs.developers.amplitude.com/session-replay/sdks/plugin/'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1731621403
instrumentation_guide: true
platform: browser
package_name: "@amplitude/session-replay-browser"
public: true
full_details: true
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

Use the latest version of the Session Replay standalone SDK above version {{sdk_versions:session_replay_standalone}}. For more information, see the [change log](https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/session-replay-browser/CHANGELOG.md ) on GitHub.

Session Replay Standalone SDK requires that:

1. Your application is web-based.
2. You track sessions with a timestamp, which you can pass to the SDK. You inform the SDK whenever a session timestamp changes.
3. You can provide a device ID to the SDK.
4. The `Session ID` and `Device ID` you pass to the Standalone SDK must match those sent as event properties to Amplitude.

The Standalone SDK doesn't provide Session management capabilities. Your application or a third-party integration must update the SDK with changes to `Session ID` and `Device ID`. 

## Quickstart

Install the plugin with npm or yarn.

{{partial:admonition type="info" heading="Unified SDK"}}
Install the [Browser Unified SDK](/docs/sdks/analytics/browser/browser-unified-sdk) to access the Experiment SDK along with other Amplitude products (Analytics, Session Replay). The Unified SDK provides a single entry point for all Amplitude features and simplifies the integration process by handling the initialization and configuration of all components.
{{/partial:admonition}}

{{partial:tabs tabs="npm, yarn"}}
{{partial:tab name="npm"}}
```bash
# Install Session Replay SDK only
npm install @amplitude/session-replay-browser --save

# Or install Unified SDK to get access to all Amplitude products
npm install @amplitude/unified
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
# Install Session Replay SDK only
yarn add @amplitude/session-replay-browser

# Or install Unified SDK to get access to all Amplitude products
yarn add @amplitude/unified
```
{{/partial:tab}}
{{/partial:tabs}}

Configure your application code.

1. Call `sessionReplay.init` to begin collecting replays. Pass the API key, session identifier, and device identifier.
2. When the session identifier changes, pass the new value to Amplitude with `sessionReplay.setSessionId`.
3. Collect Session Replay properties to send with other event properties with `sessionReplay.getSessionReplayProperties`. See [Add Session Replay ID to your events](#add-session-replay-id-to-your-events) for more information.

{{partial:tabs tabs="Standalone SDK, Unified SDK"}}
{{partial:tab name="Standalone SDK"}}
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
await sessionReplay.setSessionId(sessionId).promise;

// When you send events to Amplitude, call this event to get
// the most up to date session replay properties for the event
const sessionReplayProperties = sessionReplay.getSessionReplayProperties();
3rdPartyAnalytics.track('event', {...eventProperties, ...sessionReplayProperties})
```
{{/partial:tab}}
{{partial:tab name="Unified SDK"}}
```js
import { initAll, sessionReplay } from '@amplitude/unified';

// Initialize the Unified SDK with your API key
// The Unified SDK automatically handles:
// - Device ID and Session ID management
// - Session ID changes
// - Event property collection and tracking
initAll('YOUR_API_KEY', {
    sessionReplay: {
        sampleRate: "<number>"
    }
});

// Call session replay APIs
sessionReplay.shutdown();
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="info" heading=""}}
Session Replay instrumentation happens in the context of an Amplitude Project. Your replay quota is defined on the Organization level. As a result, you may have multiple Session Replay implementations, across multiple projects each with their own sample rate, that pull from the same quota.
{{/partial:admonition}}

You can also use script tags to instrument Session Replay:

```js
<script src="https://cdn.amplitude.com/libs/session-replay-browser-{{sdk_versions:session_replay_standalone}}-min.js.gz"></script>
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

{{partial:admonition type="info" heading=""}}
Amplitude links replays with a session replay ID.  To combine multiple sessions into a single replay, ensure each session references the same device ID and session ID.

{{/partial:admonition}}

{{partial:admonition type="warning" heading="Important"}}
For a replay to be visible in the Amplitude UI, tag at least one Amplitude event with the `[Amplitude] Session Replay ID` property. Without this, the replay doesn't appear in the interface.
{{/partial:admonition}}

The [Session Replay Browser Plugin](/docs/session-replay/session-replay-plugin) handles this by default, since Amplitude manages event instrumentation. With the Standalone SDK, you need to instrument your application to add this property to any events that occur during capture. 

## Configuration

Pass the following configuration options when you initialize the Session Replay SDK.

| Name                        | Type      | Required | Default         | Description                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------- | --------- | -------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `deviceId`                  | `string`  | Yes      | `undefined`     | Sets an identifier for the device running your application.                                                                                                                                                                                                                                                                                                                                  |
| `sessionId`                 | `number`  | Yes      | `undefined`     | Sets an identifier for the users current session. The value must be in milliseconds since epoch (Unix Timestamp).                                                                                                                                                                                                                                                                            |
| `sampleRate`                | `number`  | No       | `0`             | Use this option to control how many sessions to select for replay collection. The number should be a decimal between 0 and 1, for example `0.4`, representing the fraction of sessions to have randomly selected for replay collection. Over a large number of sessions, `0.4` would select `40%` of those sessions. Sample rates as small as six decimal places (`0.000001`) are supported. |
| `optOut`                    | `boolean` | No       | `false`         | Sets permission to collect replays for sessions. Setting a value of true prevents Amplitude from collecting session replays.                                                                                                                                                                                                                                                                 |
| `flushMaxRetries`           | `number`  | No       | `5`             | Sets the maximum number of retries for failed upload attempts. This is only applicable to errors that Amplitude can retry.                                                                                                                                                                                                                                                                   |
| `logLevel`                  | `number`  | No       | `LogLevel.Warn` | `LogLevel.None` or `LogLevel.Error` or `LogLevel.Warn` or `LogLevel.Verbose` or `LogLevel.Debug`. Sets the log level.                                                                                                                                                                                                                                                                        |
| `loggerProvider`            | `Logger`  | No       | `Logger`        | Sets a custom `loggerProvider` class from the Logger to emit log messages to desired destination.                                                                                                                                                                                                                                                                                            |
| `serverZone`                | `string`  | No       | `US`            | EU or US. Sets the Amplitude server zone. Set this to EU for Amplitude projects created in EU data center.                                                                                                                                                                                                                                                                                   |
| `privacyConfig`             | `object`  | No       | `undefined`     | Supports advanced masking configurations with CSS selectors.                                                                                                                                                                                                                                                                                                                                        |
| `applyBackgroundColorToBlockedElements` | `boolean` | No | `false` | If true, applies a background color to blocked elements for visual masking. This helps visualize which elements are blocked from being captured in the replay. |
| `debugMode`                 | `boolean` | No       | `false`         | Adds additional debug event property to help debug instrumentation issues (such as mismatching apps). Only recommended for debugging initial setup, and not recommended for production.                                                                                                                                                                                                      |
| `configServerUrl`           | `string`  | No       | `undefined`     | Specifies the endpoint URL to fetch remote configuration. If provided, it overrides the default server zone configuration.                                                                                                                                                                                                                                                                   |
| `trackServerUrl`            | `string`  | No       | `undefined`     | Specifies the endpoint URL to send session replay data. If provided, it overrides the default server zone configuration.                                                                                                                                                                                                                                                                 |
| `shouldInlineStylesheet`    | `boolean` | No       | `true`          | If stylesheets are inlined, the contents of the stylesheet are stored. During replay, the stored stylesheet is used instead of attempting to fetch it remotely. This prevents replays from appearing broken due to missing stylesheets. Inlining stylesheets may not work in all cases. If this is undefined stylesheets are inlined.                                     |
| `storeType`                 | `string`  | No       | `idb`           | Specifies how replay events should be stored. `idb` uses IndexedDB to persist replay events when all events can't be sent during capture. memory stores replay events only in memory, meaning events are lost when the page is closed. If IndexedDB is unavailable, the system falls back to memory.                                                                                          |
| `performanceConfig.enabled` | `boolean` | No       | `false`         | If enabled, event compression will be deferred to occur during the browser's idle periods.                                                                                                                                                                                                                                                                                                   |
| `performanceConfig.timeout` | `number`  | No       | `undefined`     | Optional timeout in milliseconds for the requestIdleCallback API. If specified, this value sets a maximum time for the browser to wait before executing the deferred compression task, even if the browser isn't idle.                                                                                                                                                       |
| `experimental.useWebWorker` | `boolean` | No       | `false`         | If the SDK should compress the replay events using a webworker.                                                                                                                                                                                                                                                                                                                              |



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
await sessionReplay.init(AMPLITUDE_API_KEY, {
 deviceId: <string>,
 sessionId: <number>,
 optOut: <boolean>,
 sampleRate: <number>
}).promise;

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
 "user_properties": { ... },
 "event_properties": {
 "[Amplitude] Session Replay ID": "cb6ade06-cbdf-4e0c-8156-32c2863379d6/1699922971244"
 },
 "session_id": 1699922971244,
}
```

### Data deletion

Session Replay uses Amplitude's [User Privacy API](/docs/apis/analytics/user-privacy/) to handle deletion requests. Successful deletion requests remove all session replays for the specified user.

When you delete the Amplitude project on which you use Session Replay, Amplitude deletes that replay data.

### Bot filter

Session Replay uses the same [block filter](/docs/data/block-bot-traffic) available in the Amplitude app. Session Replay doesn't block traffic based on event or user properties.

{{partial:partials/session-replay/sr-web-storage}}

## Known limitations

Keep the following limitations in mind as you implement Session Replay:

- Session Replay doesn't stitch together replays from a single user across multiple projects. For example:
  - You instrument your marketing site and web application as separate Amplitude projects with Session Replay enabled in each.
  - A known user begins on the marketing site, and logs in to the web application.
  - Amplitude captures both sessions.
  - The replay for each session is available for view in the host project.
- Session Replay supports default session definitions, and doesn't support time-based or [custom session definitions](/docs/data/sources/instrument-track-sessions).
- Session Replay can't capture the following HTML elements:
  - Canvas
  - WebGL
  - `<object>` tags including plugins like Flash, Silverlight, or Java. Session replay supports `<object type="image">`
  - Lottie animations
  - `<iframe>` elements from a different origin
  - Assets that require authentication, like fonts, CSS, or images
- - Session Replay isn't compatible with ad blocking software.

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

{{partial:partials/session-replay/sr-web-mismatch type="standalone"}}

### Session Replay processing errors

In general, replays should be available within minutes of ingestion. Delays or errors may be the result of one or more of the following:

- Mismatching API keys or Device IDs. This can happen if Session Replay and standard event instrumentation use different API keys or Device IDs.
- Session Replay references the wrong project.
- Short sessions. If a user bounces within a few seconds of initialization, the SDK may not have time to upload replay data.
- Page instrumentation. If Session Replay isn't implemented on all pages a user visits, their session may not capture properly.
- Replays older than the set [retention period](#retention-period) (defaults to 30 days, or 90 days if you purchase extra volume).


