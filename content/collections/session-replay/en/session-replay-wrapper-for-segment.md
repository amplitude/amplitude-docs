---
id: 951b924e-d18a-44cc-b5b0-51142ffb4e75
blueprint: session-replay
title: 'Session Replay Wrapper for Segment'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1723742318
---
Amplitude provides a wrapper to enable a one-line integration between Segment and Amplitude's Session Replay.

{{partial:admonition type="note" heading=""}}
This wrapper supports [Segment's Amplitude (Actions)](https://segment.com/docs/connections/destinations/catalog/actions-amplitude/) destination only.

To use Session Replay with [Segment's Amplitude (Classic) destination](https://segment.com/docs/connections/destinations/catalog/amplitude/), use the [Session Replay Standalone SDK](/docs/session-replay/session-replay-standalone-sdk).
{{/partial:admonition}}

## Before you begin
Use the latest version of the Session Replay Wrapper for Segment above version {{sdk_versions:session_replay_segment_wrapper}}

## Install the wrapper

Use npm or Yarn to install the package, which includes the Amplitude Session Replay SDK.

{{partial:tabs tabs="npm, yarn"}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/segment-session-replay-wrapper --save
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/segment-session-replay-wrapper
```
{{/partial:tab}}
{{/partial:tabs}}

## Use

For information about the `sessionReplayOptions`, see the [Session Replay Standalone SDK configuration](/docs/session-replay/session-replay-standalone-sdk#configuration) section.

```js
import { AnalyticsBrowser } from '@segment/analytics-next';
import setupAmpSRSegmentWrapper from '@amplitude/segment-session-replay-wrapper';

export const SegmentAnalytics = AnalyticsBrowser.load({
  writeKey: SEGMENT_API_KEY,
});

setupAmpSRSegmentWrapper({
  segmentInstance: SegmentAnalytics,
  amplitudeApiKey: AMPLITUDE_API_KEY,
  sessionReplayOptions: {
    logLevel: 4,
    sampleRate: 1,
    debugMode: true,
  },
});
```

## Segment plugin architecture

This wrapper uses Segment's plugin architecture, which ensures that all `track` and `page` events include the required `Session Replay ID` event property. 

## User ID to Device ID mapping

Following Segment's documentation, the wrapper maps the Segment user ID to the Amplitude device ID. To find the device ID for replay captures, the wrapper checks if `userId` is set, and if not, it uses `anonymousId`.

## Troubleshooting

{{partial:admonition type="warning" heading="Session replay and ad blockers"}}
Session Replay isn't compatible with ad blocking software.
{{/partial:admonition}}

For troubleshooting information, see [Session Replay Standalone SDK | Troubleshooting](/docs/session-replay/session-replay-standalone-sdk#troubleshooting)