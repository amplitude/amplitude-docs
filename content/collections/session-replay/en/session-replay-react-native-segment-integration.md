---
id: 7f2a8b9c-3d4e-5f6a-7b8c-9d0e1f2a3b4c
blueprint: session-replay
title: 'Session Replay React Native Segment Integration'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1720137600
instrumentation_guide: true
platform: mobile
public: true
description: "Choose this option if you use Segment's Amplitude (Actions) destination to send analytics data to Amplitude from your React Native app."
---
This article covers the installation of Session Replay using the Session Replay React Native Segment plugin. If your React Native app is already instrumented with Segment using their Analytics React Native library and Amplitude (Actions) destination, use this option.

If you instrument your app with an [Amplitude React Native SDK](/docs/sdks/analytics/react-native/react-native-sdk), use the [Session Replay React Native SDK Plugin](/docs/session-replay/session-replay-react-native-sdk-plugin).

If you use Segment using other options, use the [standalone implementation](/docs/session-replay/session-replay-react-native-sdk-plugin).

{{partial:admonition type="tip" heading="Report issues"}}
To report issues with Session Replay for React Native, review [Amplitude-TypeScript GitHub repository](https://github.com/amplitude/Amplitude-TypeScript).
{{/partial:admonition}}

{{partial:admonition type="warning" heading="Amplitude Session Plugin Required"}}
This plugin requires the `@segment/analytics-react-native-plugin-amplitude-session` plugin to extract session IDs from Amplitude integration data. Make sure to add this plugin to your Segment client before adding the session replay plugin.
{{/partial:admonition}}

{{partial:admonition type="note" heading="API Key Matching"}}
The Amplitude API key used in the session replay plugin configuration must match the API key configured in your Segment Amplitude (Actions) destination.
{{/partial:admonition}}

## Before you begin

Use the latest version of the Session Replay React Native Segment Plugin above `0.0.1-beta.2`.

The Session Replay React Native Segment Plugin requires that:

1. Your application is built with React Native.
2. You are using Segment's Analytics React Native library for ingestion.
3. You are using Segment's Amplitude (Actions) destination.
4. You are using Segment's [Amplitude Session Plugin](https://segment.com/docs/connections/sources/catalog/libraries/mobile/react-native/destination-plugins/amplitude-react-native/) to extract session IDs.

## Quickstart

Install the plugin and its dependencies:

{{partial:tabs tabs="npm, yarn"}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/segment-session-replay-plugin-react-native
npm install @amplitude/session-replay-react-native @segment/analytics-react-native
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/segment-session-replay-plugin-react-native
yarn add @amplitude/session-replay-react-native @segment/analytics-react-native
```
{{/partial:tab}}
{{/partial:tabs}}

Configure your application code:

```js
import { createSegmentSessionReplayPlugin } from '@amplitude/segment-session-replay-plugin-react-native';
import { createClient } from '@segment/analytics-react-native';
import { AmplitudeSessionPlugin } from '@segment/analytics-react-native-plugin-amplitude-session';

// Initialize Segment client
const segmentClient = createClient({
  writeKey: 'YOUR_SEGMENT_WRITE_KEY',
});

// Configure session replay plugin
const sessionReplayConfig = {
  apiKey: 'YOUR_AMPLITUDE_API_KEY',
  deviceId: 'YOUR_DEVICE_ID'
};

// Add the Amplitude session plugin first (required for session ID extraction)
await segmentClient.add({ plugin: new AmplitudeSessionPlugin() });

// Add the session replay plugin to Segment
await segmentClient.add(createSegmentSessionReplayPlugin(sessionReplayConfig));
```

## Configuration

The plugin accepts a `SessionReplayConfig` object with the following options:

| Name                 | Type       | Required | Default         | Description                                                                                                                                                                                                                             |
| -------------------- | ---------- | -------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiKey`             | `string`   | Yes      | -               | Your Amplitude API key. This must match the API key used with your Segment Amplitude destination.                                                                                                                                       |
| `deviceId`           | `string`   | No       | -               | The device ID to use for session replay. If not provided, the plugin extracts it from Segment event context.                                                                                                                        |
| `sampleRate`         | `number`   | No       | `0`             | Use this option to control how many sessions to select for replay collection. The number should be a decimal between 0 and 1, for example `0.4`, representing the fraction of sessions to have randomly selected for replay collection. |
| `enableRemoteConfig` | `boolean`  | No       | `true`          | Use this option to enable [remote configuration](/docs/admin/account-management/account-settings#session-replay-settings).                                                                                                              |
| `logLevel`           | `LogLevel` | No       | `LogLevel.Warn` | Use this option to set the log level for the Session Replay plugin.                                                                                                                                                                     |
| `autoStart`          | `boolean`  | No       | `true`          | Use this option to control whether Session Replay starts automatically when initialized. If set to `false`, manually call the `start()` method to begin capture.                                                                        |

## How it works

The Segment Session Replay Plugin automatically:

1. **Initializes Session Replay**: Sets up Amplitude Session Replay with your configuration when the plugin is added to Segment.
2. **Syncs Session Data**: Updates session ID and device ID for each Segment event by extracting them from event properties or Amplitude integration data.
3. **Enriches Events**: Adds session replay properties to `track` and `screen` events before they're sent to Segment.
4. **Manages Lifecycle**: Handles start/stop operations for session replay based on plugin lifecycle.

### Event processing

The plugin processes the following Segment event types:
- `TrackEvent`: Adds session replay properties to track events.
- `ScreenEvent`: Adds session replay properties to screen events.

For these events, the plugin:
- Extracts session ID from event properties or Amplitude integration data.
- Extracts device ID from event context or anonymous ID.
- Adds session replay properties to the event before sending to Segment.

### Session ID extraction

The plugin extracts session IDs in the following order of priority:

1. From Amplitude integration data: `event.integrations['Actions Amplitude'].session_id`.
2. From event properties: `event.properties.session_id`.
3. Defaults to `-1` if no session ID is found.

### Device ID extraction

The plugin extracts device IDs in the following order of priority:

1. From event context: `event.context.device.id`.
2. From anonymous ID: `event.anonymousId`.
3. Defaults to `null` if no device ID is found.

## Advanced topics

This section provides examples for more advanced use cases.

### Manual control

Manually control the session replay plugin after initialization:

```js
import { createSegmentSessionReplayPlugin } from '@amplitude/segment-session-replay-plugin-react-native';

// Create the plugin
const sessionReplayPlugin = createSegmentSessionReplayPlugin(sessionReplayConfig);

// Add to Segment
await segmentClient.add(sessionReplayPlugin);

// Later, manually control recording
await sessionReplayPlugin.start();
await sessionReplayPlugin.stop();
```

### Custom configuration

For more advanced configurations, you can pass additional session replay options:

```js
const sessionReplayConfig = {
  apiKey: 'YOUR_AMPLITUDE_API_KEY',
  sampleRate: 0.1, // Sample 10% of sessions
  enableRemoteConfig: true,
  logLevel: 4, // Debug level
  autoStart: false, // Don't start automatically
};

const sessionReplayPlugin = createSegmentSessionReplayPlugin(sessionReplayConfig);
```

## Troubleshooting



### Session replay properties not added

If session replay properties aren't added to your events:

1. Verify that the Amplitude Session Plugin appears before the Session Replay Plugin.
2. Check that your Segment events are of type `track` or `screen`.
3. Ensure the session replay plugin initializes.

### Session ID not found

If the plugin can't extract session IDs:

1. Verify that the you configured the Amplitude Session Plugin correctly.
2. Check that you configured Segment Amplitude destination correctly.
3. Ensure events include the required Amplitude integration data.

### Device ID Issues

If device ID extraction fails:

1. Check that your Segment events include device information in the context.
2. Verify that anonymous ID is properly set in Segment.
3. Consider manually setting the device ID in the plugin configuration.

For additional troubleshooting, review the [Session Replay React Native SDK Plugin troubleshooting guide](/docs/session-replay/session-replay-react-native-sdk-plugin).