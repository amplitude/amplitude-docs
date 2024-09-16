---
id: 951b924e-d18a-44cc-b5b0-51142ffb4e75
blueprint: session-replay
title: 'Session Replay Wrapper for Segment'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1723742318
---
Amplitude provides a wrapper to enable integration between Rudderstack and Amplitude's Session Replay.

{{partial:admonition type="note" heading=""}}
This integration snippet supports [Rudderstack Cloud-mode](https://www.rudderstack.com/docs/destinations/rudderstack-connection-modes/#cloud-mode).
{{/partial:admonition}}

## Before you begin

Use the latest version of the Session Replay SDK, version {{sdk_versions:session_replay_standalone}}

## Install the wrapper

Use npm or yarn to install the package, which includes the Amplitude Session Replay SDK.

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

## Use

For information about the `sessionReplayOptions`, see the [Session Replay Standalone SDK configuration](/docs/session-replay/session-replay-standalone-sdk#configuration) section.

```js
import * as sessionReplay from "@amplitude/session-replay-browser";

amplitude.init(AMPLITUDE_API_KEY, user_id, config).promise.then(() => {
      window.rudderAnalytics.ready(function() {
        const rudderAnonymousId = rudderAnalytics.getAnonymousId();

        sessionReplay.init(AMPLITUDE_API_KEY, {
            deviceId: rudderAnonymousId,
            sessionId: rudderAnalytics.getSessionId(),
            sampleRate: .1 // 10% of sessions will be captured 
        }).promise;
   
        // Update track method to include sessionReplayProperties
        const rudderAnalyticsTrack = rudderAnalytics.track;
        rudderAnalytics.track = function (eventName, eventProperties, options, callback) {
          const sessionReplayProperties = sessionReplay.getSessionReplayProperties();
          eventProperties = {
            ...eventProperties,
            ...sessionReplayProperties,
          };
          rudderAnalyticsTrack(eventName, eventProperties, options, callback);
        };
   
        // Update page method to include sessionReplayProperties
        const rudderAnalyticsPage = rudderAnalytics.page;
        rudderAnalytics.page = function (category, name, properties, options, callback) {
          const sessionReplayProperties = sessionReplay.getSessionReplayProperties();
          properties = {
            ...properties,
            ...sessionReplayProperties,
          };
          rudderAnalyticsPage(category, name, properties, options, callback);
        };

        sessionReplay.set(rudderAnalytics.getSessionId())
      });
    }
);
```

## Rudderstack integration

This integration updates Rudderstack's request architecture, which ensures that all `track` and `page` events include the required Amplitude `Session Replay ID` event property. 

## Required field mapping

Following Rudderstack's documentation, Amplitude maps the [Rudderstack Anonymous ID](https://www.rudderstack.com/docs/event-spec/standard-events/identify/#anonymous-id) to the [Amplitude Device ID](/docs/faq/instrumentation#icon-chevron-down), and the [Rudderstack Session ID](https://www.rudderstack.com/docs/sources/event-streams/sdks/session-tracking/) to the [Amplitude Session ID](/docs/data/sources/instrument-track-sessions#how-amplitude-tracks-your-sessions). If you use another field for device ID, contact out to [Amplitude Support](https://support.amplitude.com). 

## Troubleshooting

{{partial:admonition type="warning" heading="Session replay and ad blockers"}}
Session Replay isn't compatible with ad blocking software.
{{/partial:admonition}}

For troubleshooting information, see [Session Replay Standalone SDK | Troubleshooting](/docs/session-replay/session-replay-standalone-sdk#troubleshooting)