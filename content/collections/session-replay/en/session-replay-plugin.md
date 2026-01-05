---
id: 99b87b72-07f8-4e08-9dcd-348f3c8976f3
blueprint: session-replay
title: 'Session Replay Browser SDK Plugin'
source: 'https://www.docs.developers.amplitude.com/session-replay/sdks/standalone/'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1726769090
instrumentation_guide: true
platform: browser
parent: 467a0fe0-6ad9-4375-96a2-eea5b04a7bcf
package_name: '@amplitude/plugin-session-replay-browser'
full_details: false
public: true
description: 'Use the Session Replay plugin if you instrument your site with Amplitude Browser SDK 2.'
---
{{partial:admonition type="note" heading="Session Replay instrumentation"}}
Session Replay isn't enabled by default, and requires setup beyond the standard Amplitude instrumentation.
{{/partial:admonition}}

This article covers the installation of Session Replay using the Browser SDK plugin. If your site is already instrumented with Amplitude, use this option. If you use a provider other than Amplitude for in-product analytics, choose the [standalone implementation](/docs/session-replay/session-replay-standalone-sdk). For more information about the Browser SDK, go to 
[Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2).

{{partial:admonition type="info" heading="Session Replay and performance"}}
Amplitude built Session Replay to minimize impact on the performance of web pages on which it's installed by:

- Asynchronously capturing and processing replay data, to avoid blocking the main user interface thread.
- Using batching and lightweight compression to reduce the number of network connections and bandwidth.
- Optimizing DOM processing.
{{/partial:admonition}}

Session Replay captures changes to a page's Document Object Model (DOM), including elements in the shadow DOM, then replays these changes to build a video-like replay. For example, at the start of a session, Session Replay captures a full snapshot of the page's DOM. As the user interacts with the page, Session Replay captures each change to the DOM as a diff. When you watch the replay of a session, Session Replay applies each diff back to the original DOM in sequential order, to construct the replay. Session replays have no maximum length.

## Before you begin

Use the latest version of the Session Replay Plugin above version {{sdk_versions:session_replay_plugin}}. For more information, see the [change log](https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/plugin-session-replay-browser/CHANGELOG.md) on GitHub.

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

{{partial:admonition type="info" heading="Unified SDK"}}
If you haven't installed the Browser SDK yet, consider using the [Browser Unified SDK](/docs/sdks/analytics/browser/browser-unified-sdk) instead. The Unified SDK provides a single entry point for all Amplitude features (Analytics, Session Replay, Experiment) and simplifies the integration process by handling the initialization and configuration of all components.
{{/partial:admonition}}

{{partial:tabs tabs="npm, yarn"}}
{{partial:tab name="npm"}}
```bash
# If you already have Browser SDK installed, install the Session Replay Plugin
npm install @amplitude/plugin-session-replay-browser --save

# OR if you haven't installed Browser SDK yet, use the Unified SDK instead
npm install @amplitude/unified
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
# If you already have Browser SDK installed, install the Session Replay Plugin
yarn add @amplitude/plugin-session-replay-browser

# OR if you haven't installed Browser SDK yet, use the Unified SDK instead
yarn add @amplitude/unified
```
{{/partial:tab}}
{{/partial:tabs}}

Configure your application code.

{{partial:tabs tabs="Plugin configuration, Unified SDK"}}
{{partial:tab name="Plugin configuration"}}
```js
import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';
 
 // Create and Install Session Replay Plugin
const sessionReplayTracking = sessionReplayPlugin();
amplitude.add(sessionReplayTracking);

// Your existing initialization logic with Browser SDK
amplitude.init(API_KEY);
```
{{/partial:tab}}
{{partial:tab name="Unified SDK"}}
```js
import { initAll } from '@amplitude/unified';

// Initialize Unified SDK with Session Replay configuration
initAll('YOUR_API_KEY', {
    sessionReplay: {
        sampleRate: "<number>"
    }
});
```
{{/partial:tab}}
{{/partial:tabs}}

You can also add the code directly to the `<head>` of your site. With this method, be sure that the Browser SDK isn't initialized elsewhere in your application. If you initialize the Browser SDK more than one time, you may experience mismatches in Device ID or Session ID.

```html
<script src="https://cdn.amplitude.com/libs/analytics-browser-{{sdk_versions.browser}}-min.js.gz"></script>
<script src="https://cdn.amplitude.com/libs/plugin-session-replay-browser-{{sdk_versions.session_replay_plugin}}-min.js.gz"></script>
<script>
const sessionReplayTracking = window.sessionReplay.plugin();
window.amplitude.add(sessionReplayTracking);
window.amplitude.init(API_KEY)
</script>
```

{{partial:admonition type="info" heading=""}}
Session Replay instrumentation happens in the context of an Amplitude Project. Your replay quota gets defined on the Organization level. As a result, you may have multiple Session Replay implementations, across multiple projects each with their own sample rate, that pull from the same quota.
{{/partial:admonition}}

{{partial:admonition type="tip" heading="Compatability with Google Tag Manager"}}
The Session Replay plugin scripts load asynchronously when you add them to the `<head>` tag of your page. As a result, this implementation isn't compatible with Google Tag Manager. For more information, go to [Session Replay Implementation with Google Tag Manager](/docs/session-replay/session-replay-google-tag-manager).
{{/partial:admonition}}

## Configuration

| Name                                    | Type      | Required | Default     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------- | --------- | -------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sampleRate`                            | `number`  | No       | `0`         | Use this option to control how many sessions to select for replay collection. The number should be a decimal between 0 and 1, for example `0.4`, representing the fraction of sessions to have randomly selected for replay collection. Over a large number of sessions, `0.4` would select `40%` of those sessions. This field isn't required because Session Replay supports [Remote Configuration](/docs/admin/account-management/account-settings#session-replay-settings) of settings including Sample Rate. |
| `privacyConfig`                         | `object`  | No       | `undefined` | Supports advanced masking configurations with CSS selectors.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `applyBackgroundColorToBlockedElements` | `boolean` | No       | `false`     | If true, applies a background color to blocked elements for visual masking. This helps visualize which elements are blocked from being captured in the replay.                                                                                                                                                                                                                                                                                                                                                    |
| `debugMode`                             | `boolean` | No       | `false`     | Adds additional debug event property to help debug instrumentation issues (such as mismatching apps). Only recommended for debugging initial setup, and not recommended for production.                                                                                                                                                                                                                                                                                                                           |
| `serverZone`                            | `string`  | No       | `US`        | EU or US. Sets the Amplitude server zone. Set this to EU for Amplitude projects created in EU data center.                                                                                                                                                                                                                                                                                                                                                                                                        |
| `configServerUrl`                       | `string`  | No       | `undefined` | Specifies the endpoint URL to fetch remote configuration. If provided, it overrides the default server zone configuration.                                                                                                                                                                                                                                                                                                                                                                                        |
| `trackServerUrl`                        | `string`  | No       | `undefined` | Specifies the endpoint URL to send session replay data. If provided, Amplitude forwards requests from the SDK there instead of the default Session Replay endpoint.                                                                                                                                                                                                                                                                                                                                                          |
| `shouldInlineStylesheet`                | `boolean` | No       | `true`      | If stylesheets are inlined, the contents of the stylesheet are stored. During replay, the stored stylesheet is used instead of attempting to fetch it remotely. This prevents replays from appearing broken due to missing stylesheets. Inlining stylesheets may not work in all cases. If this is undefined stylesheets are inlined.                                                                                                                                                                             |
| `storeType`                             | `string`  | No       | `idb`       | Specifies how replay events should be stored. `idb` uses IndexedDB to persist replay events when all events can't be sent during capture. `memory` stores replay events only in memory, meaning events are lost when the page is closed. If IndexedDB is unavailable, the system falls back to memory.                                                                                                                                                                                                            |
| `performanceConfig.enabled`             | `boolean` | No       | `true`     | If enabled, event compression will be deferred to occur during the browser's idle periods.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `performanceConfig.timeout`             | `number`  | No       | `undefined` | Optional timeout in milliseconds for the requestIdleCallback API. If specified, this value sets a maximum time for the browser to wait before executing the deferred compression task, even if the browser isn't idle.                                                                                                                                                                                                                                                                                            |
| `useWebWorker`             | `boolean` | No       | `false`     | Uses a web worker to compress replay events. This improves performance by moving compression off the main thread.                                                                                                                                                                                                                                                                                                                                                                   |

### API endpoints

Session Replay uses the following API endpoints:

- **Data ingestion**:
  - US: `https://api-sr.amplitude.com/sessions/v2/track`
  - EU: `https://api-sr.eu.amplitude.com/sessions/v2/track`
  - Session Replay sends captured replay data to these endpoints.
- **Remote configuration**:
  - US: `https://sr-client-cfg.amplitude.com/config`
  - EU: `https://sr-client-cfg.eu.amplitude.com/config`
  - Session Replay fetches remote configuration from these endpoints.

If you set up a domain proxy, forward requests to these endpoints. You can override these defaults using the `trackServerUrl` and `configServerUrl` configuration options.

### Track default session events

Session Replay enables session tracking by default. This ensures that Session Replay captures Session Start and Session End events. If you didn't capture these events before you implement Session Replay, expect an increase in event volume. For more information about session tracking, go to [Browser SDK 2.0 | Tracking Sessions](/docs/sdks/analytics/browser/browser-sdk-2#track-sessions).

{{partial:tabs tabs="SDK configuration, Plugin configuration"}}
{{partial:tab name="SDK configuration"}}
Use the Browser SDK configuration to implicitly enable session tracking.

```js
amplitude.init(API_KEY, USER, {
    autocapture: {
        sessions: true
    }
});
```
{{/partial:tab}}
{{partial:tab name="Plugin configuration"}}
Disable all default tracking by the Browser SDK. In this case, the plugin enables default session tracking.

```js
amplitude.init(API_KEY, USER, {
    autocapture: false
});
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="info" heading="Session Start and Session End events"}}
Beginning with plugin version 1.12.1, Session Replay no longer captures `Session Start` and `Session End` events by default. To enable capture of these events, set `forceSessionTracking: true`:

```js
const sessionReplayTracking = window.sessionReplay.plugin({ 
 forceSessionTracking: true, // Enable capture of Session Start and Session End events
 sampleRate: 1, // 100% sample rate, should reduce for production traffic. 
}); 
```

Amplitude requires at least one event in any captured session to enable playback of the replay.
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

By default, Session Replay captures 0% of sessions for replay. If you used Amplitude's new account snippet to instrument, sample rate defaults to `1` (100% of sessions) to enable easier testing. Update the sample rate from the [Session Replay settings page](/docs/admin/account-management/account-settings#session-replay-settings) or use the `sampleRate` configuration option to set the percentage of total sessions that Session Replay captures. For example:

```js
// This configuration samples 1% of all sessions
await sessionReplay.init(AMPLITUDE_API_KEY, {
 sampleRate: 0.01 
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

To restart replay collection, call `amplitude.add(sessionReplayTracking)` to re-add the plugin.

{{partial:admonition type='note'}}
Remember that `amplitude.add()` takes in an object of type `Plugin` as a parameter and `amplitude.remove()` takes in a string as a parameter which is the name of the plugin you want to remove. 
{{/partial:admonition}}

{{partial:admonition type='note'}}
Always wait for `amplitude.add()` to finish before invoking `amplitude.remove()`. If you don't, you may get an error in the console: `TypeError: Cannot read properties of undefined (reading 'teardown')`. Use the `promise` property to do this, as shown in either of these examples:

```js
await amplitude.add(sessionReplayTracking).promise;
await amplitude.remove(sesionReplayTracking.name).promise;
```

```js
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

### Cookies

Session Replay doesn't use cookies directly, and has no impact on cookie size. [Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2) uses cookies for session management.

## Known limitations

Keep the following limitations in mind as you implement Session Replay:

- Session Replay doesn't stitch together replays from a single user across multiple projects. For example:
  - You instrument your marketing site and web application as separate Amplitude projects with Session Replay enabled in each.
  - A known user begins on the marketing site, and logs in to the web application.
  - Amplitude captures both sessions.
  - The replay for each session is available for view in the host project.
- Session Replay supports standard session definitions, and doesn't support time-based or [custom session definitions](/docs/data/sources/instrument-track-sessions).
- Session Replay can't capture the following HTML elements:
  - Canvas
  - WebGL
  - `<object>` tags including plugins like Flash, Silverlight, or Java. Session replay supports `<object type="image">`
  - Lottie animations
  - `<iframe>` elements from a different origin
  - Assets that require authentication, like fonts, CSS, or images
- Session Replay isn't compatible with ad blocking software.

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

For more information about individual statuses and errors, go to the [Session Replay Ingestion Monitor](/docs/session-replay/ingestion-monitor).

### CSS styling doesn't appear in a replay

When Amplitude captures a replay, it doesn't download and store CSS files or other static assets that are part of your application or site. Session Replay stores references to these files, and uses those references while it reconstructs the replay. In some situations, the styling present in the replay may differ from your application for the following reasons:

- Assets on your site move or change name. This can happen when you deploy a new version of your application.
- Assets on your site are behind access controls that prevent Amplitude from fetching them.

To help resolve CSS loading issues:

- Ensure your domain is publicly accessible. If you work in a local environment, Amplitude may not have access to assets stored on `localhost`.
- Your CDN should keep track of old stylesheets for older replays. If the content of the same stylesheet changes over time, try to append a unique string or hash to the asset URL. For example, `stylesheet.css?93f8b89`.
- Add `app.amplitude.com` or `app.eu.amplitude.com` to the list of domains that your server's CORS configuration permits.
- Make external stylesheets accessible to Session Replay. To ensure Session Replay can capture external stylesheets, add the `crossorigin="anonymous"` attribute to the `<link rel="stylesheet">` elements in your code.
 
    This instructs the browser to load the CSS without sending credentials, which allows cross-origin access to the stylesheet rules. Without this attribute, browsers like Google Chrome block programmatic access to those rules (for example, attempts to read `stylesheet.cssRules` fails).

    Although your site appears correctly to users, these restrictions can prevent session replay tools from capturing the full styling information, resulting in incomplete or broken visual playback.

### Capture sessions contain limited information

The Session Replay Plugin enables session tracking by default. If you instrument events outside of the Browser SDK, Amplitude doesn't tag those events as part of the session replay. This means you can't use tools like Funnel, Segmentation, or Journeys charts to find session replays. You can find session replays with the User Sessions chart or through User Lookup.

If you use a method other than the Browser SDK to instrument your events, consider using the [Session Replay Standalone SDK](/docs/session-replay/session-replay-standalone-sdk/)

{{partial:partials/session-replay/sr-web-mismatch type="plugin"}}

### Session Replay processing errors

In general, replays should be available within minutes of ingestion. Delays or errors may be the result of one or more of the following:

- Mismatching API keys or Device IDs. This can happen if Session Replay and standard event instrumentation use different API keys or Device IDs.
- Session Replay references the wrong project.
- Short sessions. If a user bounces within a few seconds of initialization, the SDK may not have time to upload replay data.
- Page instrumentation. If Session Replay isn't implemented on all pages a user visits, their session may not capture properly.
- Replays older than the set [retention period](#retention-period) (defaults to 30 days, or 90 days if you purchase extra volume).
