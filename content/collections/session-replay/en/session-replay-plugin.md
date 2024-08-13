---
id: 99b87b72-07f8-4e08-9dcd-348f3c8976f3
blueprint: session-replay
title: 'Session Replay Plugin'
source: 'https://www.docs.developers.amplitude.com/session-replay/sdks/standalone/'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1723582784
---
{{partial:admonition type="note" heading="Session Replay instrumentation"}}
Session Replay isn't enabled by default, and requires setup beyond the standard Amplitude instrumentation.
{{/partial:admonition}}

This article covers the installation of Session Replay using the Browser SDK plugin. If your site is already instrumented with Amplitude, use this option. If you use a provider other than Amplitude for in-product analytics, choose the [standalone implementation](/docs/session-replay/session-replay-standalone-sdk). For more information about the Browser SDK, see 
[Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2).

{{partial:admonition type="info" heading="Session Replay and performance"}}
Amplitude built Session Replay to minimize impact on the performance of web pages on which it's installed by:

- Asynchronously capturing and processing replay data, to avoid blocking the main user interface thread.
- Using batching and lightweight compression to reduce the number of network connections and bandwidth.
- Optimizing DOM processing.
{{/partial:admonition}}

Session Replay captures changes to a page's Document Object Model (DOM), including elements in the shadow DOM, then replays these changes to build a video-like replay. For example, at the start of a session, Session Replay captures a full snapshot of the page's DOM. As the user interacts with the page, Session Replay captures each change to the DOM as a diff. When you watch the replay of a session, Session Replay applies each diff back to the original DOM in sequential order, to construct the replay. Session replays have no maximum length.

## Before you begin

Use the latest version of the Session Replay Plugin above version {{sdk_versions:session_replay_plugin}}. For more information, see the [change log](https://github.com/amplitude/Amplitude-TypeScript/blob/v1.x/packages/plugin-session-replay-browser/CHANGELOG.md) on GitHub.

The Session Replay Plugin requires that:

1. Your application is web-based.
2. You can provide a device ID to the SDK.
3. Your site is instrumented with the Browser 2.0 SDK.

### Supported browsers

Session Replay supports the same set of browsers as Amplitude's SDKs. For more information, see [Browser Compatibility](/docs/get-started/browser-compatibility).

Session Replay may not support all browser extensions or DOM elements introduced by browser extensions.

Session Replay supports Shadow DOM, but there may be exceptions depending on the frameworks your site uses. 

## Quickstart

Install the plugin with npm or yarn.

{{partial:tabs tabs="npm, yarn"}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/plugin-session-replay-browser --save
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/plugin-session-replay-browser
```
{{/partial:tab}}
{{/partial:tabs}}

Configure your application code.

```js
import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';
 
 // Create and Install Session Replay Plugin
const sessionReplayTracking = sessionReplayPlugin();
amplitude.add(sessionReplayTracking);

// Your existing initialization logic with Browser SDK
amplitude.init(API_KEY);
```

You can also add the code directly to the `<head>` of your site. With this method, be sure that the Browser SDK isn't initialized elsewhere in your application. If you initialize the Browser SDK more than once, you may see mismatches in Device ID or Session ID.

```html
<script src="https://cdn.amplitude.com/libs/analytics-browser-2.9.0-min.js.gz"></script>
<script src="https://cdn.amplitude.com/libs/plugin-session-replay-browser-1.4.0-min.js.gz"></script>
<script>
const sessionReplayTracking = window.sessionReplay.plugin();
window.amplitude.add(sessionReplayTracking);
window.amplitude.init(API_KEY)
</script>
```

{{partial:admonition type="info" heading=""}}
Session Replay instrumentation happens in the context of an Amplitude Project. Your replay quota is defined on the Organization level. As a result, you may have multiple Session Replay implementations, across multiple projects each with their own sample rate, that pull from the same quota.
{{/partial:admonition}}

{{partial:admonition type="tip" heading="Compatability with Google Tag Manager"}}
The Session Replay plugin scripts load asynchronously when you add them to the `<head>` tag of your page. As a result, this implementation isn't compatible with Google Tag Manager. For more information, see [Session Replay Implementation with Google Tag Manager](/docs/session-replay/session-replay-google-tag-manager).
{{/partial:admonition}}

## Configuration

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `sampleRate` | `number` | No | `0` | Use this option to control how many sessions to select for replay collection. The number should be a decimal between 0 and 1, for example `0.4`, representing the fraction of sessions to have randomly selected for replay collection. Over a large number of sessions, `0.4` would select `40%` of those sessions. |

### Track default session events

Session Replay enables session tracking by default. This ensures that Session Replay captures Session Start and Session End events. If you didn't capture these events before you implement Session Replay, expect an increase in event volume. For more information about session tracking, see [Browser SDK 2.0 | Tracking Sessions](/docs/sdks/analytics/browser/browser-sdk-2#track-sessions).

{{partial:tabs tabs="SDK configuration, Plugin configuration"}}
{{partial:tab name="SDK configuration"}}
Use the Browser SDK configuration to implicitly enable session tracking.

```js
amplitude.init(API_KEY, USER, {
    defaultTracking: {
        sessions: true
    }
});
```
{{/partial:tab}}
{{partial:tab name="Plugin configuration"}}
Disable all default tracking by the Browser SDK. In this case, the plugin enables default session tracking.

```js
amplitude.init(API_KEY, USER, {
    defaultTracking: false
});
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="info" heading="Session Start and Session End events"}}
Beginning with plugin version 1.1.0, Session Replay no longer requires `Session Start` and `Session End` events, but does capture them by default. To disable capture of these events, set `forceSessionTracking: false`:

```js
const sessionReplayTracking = window.sessionReplay.plugin({ 
 forceSessionTracking: false, 
 sampleRate: 1, // 100% sample rate, should reduce for production traffic. 
}); 

```

Amplitude requires at least one event in any captured session to enable playback of the replay. Amplitude recommends that you leave Session Tracking enabled, as that triggers `[Amplitude] Session Start` at the beginning of the session. If you disable session tracking, configure another event to fire early in the session for best results.
{{/partial:admonition}}

### Mask on-screen data

{{partial:partials/session-replay/sr-mask-data}}

### User opt-out

The Session Replay plugin follows the Browser SDK's `optOut` setting, and doesn't support user opt-outs on its own.

### EU data residency

Session Replay is available to Amplitude Customers who use the EU data center. Set the `serverZone` configuration option to `EU` during initialization. For example:

```js
// For European users, set the serverZone to "EU" 
await sessionReplay.init(AMPLITUDE_API_KEY, {
 serverZone: "EU", // [tl! ~~]
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
- To find the best sample rate, Amplitude recommends that you start low, for example `.01`. If this value doesn't capture enough replays, raise the rate over the course of a few days. For ways to monitor the number of session replays captured, see [View the number of captured sessions](/docs/session-replay).

Session Replay supports remote sampling rate settings. This enables users in your organization to configure or update the sampling rate of your project after implementation, without a code change. In the event of a conflict, Session Replay defaults to the remote setting. For more information, see [Account Settings](/docs/admin/account-management/account-settings#session-replay-settings).

### Disable replay collection

Once enabled, Session Replay runs on your site until either:

- The user leaves your site
- You call `amplitude.remove(sessionReplayTracking.name)`

{{partial:admonition type="note" heading=""}}
These examples assume you use the variable `sessionReplayTracking` in your initialization code.
{{/partial:admonition}}

Call `amplitude.remove('sessionReplayTracking')` before a user navigates to a restricted area of your site to disable replay collection while the user is in that area. 

To restart replay collection, call `amplitude.add('sessionReplayTracking')` to re-add the plugin.

{{partial:admonition type='note'}}
Always wait for `amplitude.add()` to finish before invoking `amplitude.remove()`. If you don't, you may get an error in the console: `TypeError: Cannot read properties of undefined (reading 'teardown')`. Use the `promise` property to do this, as shown in either of these examples:

```
await amplitude.add(sessionReplayTracking).promise;
await amplitude.remove(sesionReplayTracking.name).promise;
```

```
const addPromise = amplitude.add(sessionReplayTracking).promise; 
addPromise.then(() => {
    amplitude.remove(sessionReplayTracking.name).promise;
});
```
{{/partial:admonition}}

You can also use a feature flag product like Amplitude Experiment to create logic that enables or disables replay collection based on criteria like location. For example, you can create a feature flag that targets a specific user group, and add that to your initialization logic:

```js
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";

// Your existing initialization logic with Browser SDK
amplitude.init(API_KEY);

if (nonEUCountryFlagEnabled) {
 // Create and Install Session Replay Plugin
 const sessionReplayTracking = sessionReplayPlugin({
 sampleRate: 0.5,
 });
 amplitude.add(sessionReplayTracking);
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

### CSS styling doesn't appear in a replay

When Amplitude captures a replay, it doesn't download and store CSS files or other static assets that are part of your application or site. Session Replay stores references to these files, and uses those references while it reconstructs the replay. In some situations, the styling present in the replay may differ from your application for the following reasons:

- Assets on your site move or change name. This can happen when you deploy a new version of your application.
- Assets on your site are behind access controls that prevent Amplitude from fetching them.

To help resolve CSS loading issues:

- Ensure your domain is publicly accessible. If you work in a local environment, Amplitude may not have access to assets stored on `localhost`.
- Your CDN should keep track of old stylesheets for older replays. If the content of the same stylesheet changes over time, try to append a unique string or hash to the asset URL. For example, `stylesheet.css?93f8b89`.
- Add `app.amplitude.com` or `app.eu.amplitude.com` to the list of domains that your server's CORS configuration permits.

### Capture sessions contain limited information

The Session Replay Plugin enables session tracking by default. If you instrument events outside of the Browser SDK, Amplitude doesn't tag those events as part of the session replay. This means you can't use tools like Funnel, Segmentation, or Journeys charts to find session replays. You can find session replays with the User Sessions chart or through User Lookup.

If you use a method other than the Browser SDK to instrument your events, consider using the [Session Replay Standalone SDK](/docs/session-replay/session-replay-standalone-sdk/)

### Replay length and session length don't match

In some scenarios, the length of a replay may exceed the time between the `[Amplitude] Start Session` and `[Amplitude] End Session` events. This happens when a user closes the `[Amplitude] End Session` occurs, but before the Browser SDK and Session Replay plugin can process it. When the user visits that page again, the SDK and plugin process the event and send it to Amplitude, along with the replay. You can verify this scenario occurs if you see a discrepancy between the `End Session Client Event Time` and the `Client Upload Time`.

Session replays may not appear in Amplitude due to:

- Content security policy
- Blocked JavaScript
- No events triggered through the browser SDK in the current session
- Sampling

#### Local development and focus state

The Session Replay SDK and plugin capture only the page that's in focus. When you develop locally with the browser console open, focus states may not work as expected. If you don't see replays in Amplitude, try to enable `debugMode`. In this mode, Session Replay ignores the focus handle and enables extra debugging information.

```js
const sessionReplayTracking = window.sessionReplay.plugin({
 debugMode: true,  //[tl! ~~]
 sampleRate: 1, 
 });
```

#### Content security policy

When you add the Session Replay script to your site, visit a page on which the Session Replay SDK is running, and open your browser's developer tools.

Check for any error messages in the JavaScript console that contain the text `Content Security Policy`. For example, `Refused to connect to 'https://api-secure.amplitude.com/sessions/track' because it violates the document's Content Security Policy`.

To resolve this error, update your site's content security policy to allow connection to Amplitude's APIs.

#### Blocked JavaScript

Browser extensions or network security policy may block the Session Replay SDK. Check your browser's developer tools to see if requests fail, and if so, add an exception for the blocked domains.

#### No events triggered through the browser SDK in the current session

Session Replay requires that at least one event in the user's session has the `[Amplitude] Session Replay ID` property. The [Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2) `Session Start` and `Session End` events include this property by default. If you instrument your events with any SDK other than the Amplitude Browser SDK 2, use the [Session Replay Standalone SDK](/docs/session-replay/session-replay-standalone-sdk) and ensure you tag your events with the necessary event properties.

For local testing, you can force a Session Start event to ensure that Session Replay functions. 

1. Open your browser's developer tools, and delete any cookie that begins with `AMP_`.
2. Close developer tools and refresh the page.
3. In Amplitude, in the User Lookup Event Stream, you should see a Session Start event that includes the `[Amplitude] Session Replay ID` property. After processing, the Play Session button should appear for that session.

#### Sampling

As mentioned above, the default `sampleRate` for Session Replay is `0`. Update the rate to a higher number. For more information see, [Sampling rate](#sampling-rate).

#### Some sessions don't include the Session Replay ID property"Link to this section"

Session replay doesn't require that all events in a session have the `[Amplitude] Session Replay ID` property, only that one event in the session has it. Reasons why `[Amplitude] Session Replay ID` may not be present in an event include:

- If you instrument an event with a source different from the source you connect to Session Replay. For example, your application may send events from a backend source, rather than the Browser SDK.
- If events fire when the user isn't focused on the page. Session Replay pauses the SDK when user focus leaves the page. Amplitude events may still send through your provider, but `getSessionReplayProperties()` doesn't return the `[Amplitude] Session Replay ID` property. This is because Session Replay hasn't begun the capture, since the user hasn't interacted with the page. This should lead to a decrease in the amount of inactivity that a replay captures.

### Session Replay processing errors

In general, replays should be available within minutes of ingestion. Delays or errors may be the result of one or more of the following:

- Mismatching API keys or Device IDs. This can happen if Session Replay and standard event instrumentation use different API keys or Device IDs.
- Session Replay references the wrong project.
- Short sessions. If a users bounces within a few seconds of initialization, the SDK may not have time to upload replay data.
- Page instrumentation. If Session Replay isn't implemented on all pages a user visits, their session may not capture properly.
- Replays older than the set [retention period](#retention-period) (defaults to 30 days, or 90 days if you purchase extra volume).