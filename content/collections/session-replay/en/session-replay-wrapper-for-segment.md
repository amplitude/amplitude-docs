---
id: 951b924e-d18a-44cc-b5b0-51142ffb4e75
blueprint: session-replay
title: 'Session Replay Plugin for Segment'
landing: false
published: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-44cbd-8fdf-771a90c297f0
updated_at: 1726769214
instrumentation_guide: true
platform: 'third-party integration'
public: true
parent: 467a0fe0-6ad9-4375-96a2-eea5b04a7bcf
description: "Choose this option if you use Segment for your site's analytics."
---
Amplitude provides a plugin to enable a one-line integration between Segment and Amplitude's Session Replay.

{{partial:admonition type="note" heading=""}}
This plugin supports [Segment's Amplitude (Actions)](https://segment.com/docs/connections/destinations/catalog/actions-amplitude/) destination only.

To use Session Replay with [Segment's Amplitude (Classic) destination](https://segment.com/docs/connections/destinations/catalog/amplitude/), use the [Session Replay Standalone SDK](/docs/session-replay/session-replay-standalone-sdk).
{{/partial:admonition}}

## Before you begin
Use the latest version of the Session Replay Plugin for Segment above version {{sdk_versions:session_replay_segment_wrapper}}

## Install the plugin

Use npm or Yarn to install the package, which includes the Amplitude Session Replay SDK.

{{partial:tabs tabs="npm, yarn"}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/segment-session-replay-plugin --save
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/segment-session-replay-plugin
```
{{/partial:tab}}
{{/partial:tabs}}

## Use

For information about the `sessionReplayOptions`, see the [Session Replay Standalone SDK configuration](/docs/session-replay/session-replay-standalone-sdk#configuration) section.

```js
import { AnalyticsBrowser } from '@segment/analytics-next';
import { createSegmentActionsPlugin } from '@amplitude/segment-session-replay-plugin';

export const segmentAnalytics = AnalyticsBrowser.load({
  writeKey: SEGMENT_API_KEY,
});

const segmentActionsPlugin = createSegmentActionsPlugin({
  segmentInstance: segmentAnalytics,
  amplitudeApiKey: AMPLITUDE_API_KEY,
  sessionReplayOptions: {
    logLevel: 4,
    sampleRate: 1,
    debugMode: true,
  },
});

segmentAnalytics.register(segmentActionsPlugin);
```

## Segment plugin architecture

Amplitude automatically creates the `[Amplitude] Replay Captured` event when Session Replay captures a session. This event is sent directly to Amplitude to link replays with your analytics data. If you don't see this event in Amplitude, contact Amplitude support. 

## User ID to Device ID mapping

Following Segment's documentation, the plugin maps the Segment user ID to the Amplitude device ID. To find the device ID for replay captures, the plugin checks if `userId` is set, and if not, it uses `anonymousId`.

## Troubleshooting

{{partial:admonition type="warning" heading="Session replay and ad blockers"}}
Session Replay isn't compatible with ad blocking software.
{{/partial:admonition}}

For troubleshooting information, see [Session Replay Standalone SDK | Troubleshooting](/docs/session-replay/session-replay-standalone-sdk#troubleshooting)