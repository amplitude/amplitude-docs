---
id: 951b924e-d18a-44cc-b5b0-51142ffb4e75
blueprint: session-replay
title: 'Session Replay Wrapper for Segment'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1719939361
---
Amplitude provides a wrapper to enable a one-line integration between Segment and Amplitude's Session Replay.

{{partial:admonition type="note" heading=""}}
This wrapper supports [Segment's Amplitude (Actions)](https://segment.com/docs/connections/destinations/catalog/actions-amplitude/) destination only. 
{{/partial:admonition}}

## Install the wrapper

Use npm or Yarn to install the package, which includes the Amplitude Session Replay SDK.

{{partial:tabs tabs="npm, yarn"}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/segment-session-replay-wrapper" --save
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/segment-session-replay-wrapper"
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
