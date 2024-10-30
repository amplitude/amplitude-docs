---
id: 5416910c-32f8-4e80-be0f-88a10509c029
blueprint: session-replay
title: 'Session Replay Wrapper for Rudderstack'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1730234510
instrumentation_guide: true
platform: browser
public: true
parent: 467a0fe0-6ad9-4375-96a2-eea5b04a7bcf
description: "Choose this option if you use Rudderstack for your site's analytics."
---
Amplitude provides a wrapper for integrating Rudderstack and Amplitude's Session Replay.

{{partial:admonition type="note" heading=""}}
This integration snippet supports [Rudderstack Cloud-mode](https://www.rudderstack.com/docs/destinations/rudderstack-connection-modes/#cloud-mode).
{{/partial:admonition}}

## Before you begin

Use the latest version of the Session Replay SDK, which is {{sdk_versions:session_replay_standalone}}

## Install the wrapper

Use npm or yarn to install the package. This includes the Amplitude Session Replay SDK.

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

Amplitude maps the [Rudderstack Anonymous ID](https://www.rudderstack.com/docs/event-spec/standard-events/identify/#anonymous-id) to the [Amplitude Device ID](/docs/faq/instrumentation#icon-chevron-down), and the [Rudderstack Session ID](https://www.rudderstack.com/docs/sources/event-streams/sdks/session-tracking/) to the [Amplitude Session ID](/docs/data/sources/instrument-track-sessions#how-amplitude-tracks-your-sessions). If you use another field for device ID, contact [Amplitude Support](https://support.amplitude.com). 

## Troubleshooting

{{partial:admonition type="warning" heading="Session replay and ad blockers"}}
Session Replay isn't compatible with ad blocking software.
{{/partial:admonition}}

For troubleshooting information, see [Session Replay Standalone SDK | Troubleshooting](/docs/session-replay/session-replay-standalone-sdk#troubleshooting)