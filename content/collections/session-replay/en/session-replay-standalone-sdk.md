---
id: f4c61e43-7a55-43a3-9dbd-f1ecb2502774
blueprint: session-replay
title: 'Session Replay Standalone SDK'
source: 'https://www.docs.developers.amplitude.com/session-replay/sdks/plugin/'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1721323488
---
{{partial:admonition type="note" heading="Session Replay instrumentation"}}
Session Replay isn't enabled by default, and requires setup beyond the standard Amplitude instrumentation.
{{/partial:admonition}}

This article covers the installation of Session Replay using the standalone SDK. If you use a provider other than Amplitude for in-product analytics, choose this option. If your site is already instrumented with Amplitude Browser SDK, use the [Session Replay Browser SDK Plugin](/docs/session-replay/session-replay-plugin).

{{partial:admonition type="info" heading="Session Replay and performane"}}
Amplitude built Session Replay to minimize impact on the performance of web pages on which it's installed by:

- Asynchronously capturing and processing replay data, to avoid blocking the main user interface thread.
- Using batching and lightweight compression to reduce the number of network connections and bandwidth.
- Optimizing DOM processing.
{{/partial:admonition}}

Session Replay captures changes to a page's Document Object Model (DOM), including elements in the shadow DOM, then replays these changes to build a video-like replay. For example, at the start of a session, Session Replay captures a full snapshot of the page's DOM. As the user interacts with the page, Session Replay captures each change to the DOM as a diff. When you watch the replay of a session, Session Replay applies each diff back to the original DOM in sequential order, to construct the replay. Session replays have no maximum length.

## Before you begin

Use the latest version of the Session Replay standalone SDK above version {{sdk_versions:session-replay-standalone}}. For more information, see the [change log](https://github.com/amplitude/Amplitude-TypeScript/blob/v1.x/packages/session-replay-browser/CHANGELOG.md) on GitHub.

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

Alternatively, use script tags to instrument Session Replay:

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

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `deviceId` | `string` | Yes | `undefined` | Sets an identifier for the device running your application. |
| `sessionId` | `number` | Yes | `undefined` | Sets an identifier for the users current session. The value must be in milliseconds since epoch (Unix Timestamp). |
| `sampleRate` | `number` | No | `0` | Use this option to control how many sessions to select for replay collection. The number should be a decimal between 0 and 1, for example `0.4`, representing the fraction of sessions to have randomly selected for replay collection. Over a large number of sessions, `0.4` would select `40%` of those sessions. |
| `optOut` | `boolean` | No | `false` | Sets permission to collect replays for sessions. Setting a value of true prevents Amplitude from collecting session replays. |
| `flushMaxRetries` | `number` | No | `5` | Sets the maximum number of retries for failed upload attempts. This is only applicable to errors that Amplitude can retry. |
| `logLevel` | `number` | No | `LogLevel.Warn` | `LogLevel.None` or `LogLevel.Error` or `LogLevel.Warn` or `LogLevel.Verbose` or `LogLevel.Debug`. Sets the log level. |
| `loggerProvider` | `Logger` | No | `Logger` | Sets a custom `loggerProvider` class from the Logger to emit log messages to desired destination. |
| `serverZone` | `string` | No | `US` | EU or US. Sets the Amplitude server zone. Set this to EU for Amplitude projects created in EU data center. |

### Mask on-screen data

The Session Replay SDK offers three ways to mask user input, text, and other HTML elements.

| Element           | Description                                                                                                                                                                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<input>`         | Session Replay masks all text input fields by default. When a users enters text into an input field, Session Replay captures asterisks in place of text. To *unmask* a text input, add the class `.amp-unmask`. For example: `<input class="amp-unmask">`. |
| text              | To mask text within non-input elements, add the class `.amp-mask`. For example, `<p class="amp-mask">Text</p>`. When masked, Session Replay captures masked text as a series of asterisks.                                                                 |
| non-text elements | To block a non-text element, add the class `.amp-block`. For example, `<div class="amp-block"></div>`. Session Replay replaces blocked elements with a placeholder of the same dimensions.                                                                 |

Session Replay supports setting a masking level on the [Session Replay Settings](#) screen in Amplitude. This includes Light, Medium, and Conservative settings.

Session Replay settings also enable remote masking overrides. These enable users in your organization to configure or update masking after implementation.

In the event of a conflict, Session Replay defers to the remote setting. For example:

|                | .selector-1 | .selector-2 | .selector-3 |
| -------------- | ----------- | ----------- | ----------- |
| Local setting  | `mask`      | --          | `mask`      |
| Remote setting | `unmask`    | `unmask`    | --          |
| Result         | `unmask`    | `unmask`    | `mask`      |

In this example, `.selector-1` has a local setting and a remote setting. The result follows the remote setting, and overrides the setting in the SDK or plugin implementation.

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

## Data retention

Session replay uses existing Amplitude tools and APIs to handle privacy and deletion requests.

{{partial:admonition type="note" heading="Consent management and Session Replay"}}
While privacy laws and regulations vary across states and countries, certain constants exist, including the requirements to disclose in a privacy notice the categories of personal information you are collecting, the purposes for its use, and the categories of third parties with which personal information is shared. When implementing a session replay tool, you should review your privacy notice to make sure your disclosures remain accurate and complete. And as a best practice, review your notice with legal counsel to make sure it complies with the constantly evolving privacy laws and requirements applicable to your business and personal information data practices.
{{/partial:admonition}}

### Retention period

If your Amplitude plan includes Session Replay, Amplitude retains raw replay data for 30 days from the date of ingestion. 

If you purchase extra session volume, Amplitude retains raw replay data for 90 days from the date of ingestion. If you need a more strict policy, contact Amplitude support to set the value to 30 days.

Changes to the retention period impact replays ingested after the change. Sessions captured and ingested before a retention period change retain the previous retention period.

Replays that are outside of the retention period aren't viewable in Amplitude.

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
- Session Replay supports standard session definitions, and doesn't support [custom session definitions](/docs/cdp/sources/instrument-track-sessions).
- Session Replay can't capture the following HTML elements:
  - Canvas
  - WebGL
  - `<object>` tags including plugins like Flash, Silverlight, or Java. Session replay supports `<object type="image">`
  - Lottie animations
  - `<iframe>` elements from a different origin
  - Assets that require authentication, like fonts, CSS, or images

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

### Session replays don't appear in Amplitude 

Session replays may not appear in Amplitude due to:

- Content security policy
- Blocked JavaScript
- Sampling
- Some sessions don't include the Session Replay ID property

#### Content security policy

When you add the Session Replay script to your site, visit a page on which the Session Replay SDK is running, and open your browser's developer tools.

Check for any error messages in the JavaScript console that contain the text `Content Security Policy`. For example, `Refused to connect to 'https://api-secure.amplitude.com/sessions/track' because it violates the document's Content Security Policy`.

To resolve this error, update your site's content security policy to allow connection to Amplitude's APIs.

#### Blocked JavaScript

Browser extensions or network security policy may block the Session Replay SDK. Check your browser's developer tools to see if requests fail, and if so, add an exception for the blocked domains.

#### Sampling

As mentioned above, the default `sampleRate` for Session Replay is `0`. Update the rate to a higher number. For more information see, [Sampling rate](#sampling-rate).

#### Some sessions don't include the Session Replay ID property

Session replay doesn't require that all events in a session have the `[Amplitude] Session Replay ID` property, only that one event in the session has it. Reasons why `[Amplitude] Session Replay ID`  may not be present in an event include:

- If you instrument an event with a source different from the source you connect to Session Replay. For example, your application may send events from a backend source, rather than the Browser SDK.
- If events fire when the user isn't focused on the page. Session Replay pauses the SDK when user focus leaves the page. Amplitude events may still send through your provider, but `getSessionReplayProperties()` doesn't return the `[Amplitude] Session Replay ID` property. This is because Session Replay hasn't begun the capture, since the user hasn't interacted with the page. This should lead to a decrease in the amount of inactivity that a replay captures.

### Session Replay processing errors

In general, replays should be available within minutes of ingestion. Delays or errors may be the result of one or more of the following:

- Mismatching API keys or Device IDs. This can happen if Session Replay and standard event instrumentation use different API keys or Device IDs.
- Session Replay references the wrong project.
- Short sessions. If a users bounces within a few seconds of initialization, the SDK may not have time to upload replay data.
- Page instrumentation. If Session Replay isn't implemented on all pages a user visits, their session may not capture properly.
- Replays older than the set [retention period](#retention-period) (defaults to 90 days).