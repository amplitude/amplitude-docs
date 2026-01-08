---
id: 8b2c4f1a-9e3d-4c5b-8f7a-1d2e3f4g5h6i
blueprint: session-replay
instrumentation_guide: true
title: 'Session Replay React Native Standalone SDK'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1719792000
platform: mobile
public: true
package_name: '@amplitude/session-replay-react-native'
full_details: true
description: 'Use the standalone SDK if you want to instrument Session Replay without using the Amplitude Analytics SDK.'
---
This article covers the installation of Session Replay using the standalone React Native SDK. Use this option if you want to instrument Session Replay without using the Amplitude Analytics SDK.

If your application already uses the Amplitude React Native SDK, use the [Session Replay React Native SDK Plugin](/docs/session-replay/session-replay-react-native-sdk-plugin) instead.

## Before you begin

Use the latest version of the Session Replay React Native SDK above version 0.0.1-beta.1. For more information, review the [change log](https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/session-replay-react-native/CHANGELOG.md) on GitHub.

## Quickstart

{{partial:tabs tabs="npm, yarn"}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/session-replay-react-native@0.0.1-beta.1 --save
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/session-replay-react-native@0.0.1-beta.1
```
{{/partial:tab}}
{{/partial:tabs}}

Configure your application code.

```js
import { init, SessionReplayConfig, MaskLevel } from '@amplitude/session-replay-react-native';

const config: SessionReplayConfig = {
    apiKey: 'YOUR_API_KEY',
    deviceId: 'YOUR_DEVICE_ID',
    sessionId: Date.now(),
    sampleRate: 1, // default 0
    enableRemoteConfig: true, // default true
    autoStart: true, // default true
    maskLevel: MaskLevel.Medium, // default Medium
};

await init(config);
```

## Configuration

Pass the configuration on initialization of the Session Replay SDK.

| Name                 | Type           | Required | Default            | Description                                                                                                                                                                                                                                                                                                          |
| -------------------- | -------------- | -------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiKey`             | `string`       | Yes      | `undefined`        | Your Amplitude API key for authentication and data routing.                                                                                                                                                                                                                                                          |
| `deviceId`           | `string`       | No       | `null`             | Device identifier that matches the device ID sent with Amplitude events. Must match the Device ID passed as event properties to Amplitude.                                                                                                                                                                           |
| `sessionId`          | `number`       | No       | `-1`               | Session identifier that matches the session ID sent with Amplitude events. Must match the Session ID passed as event properties to Amplitude.                                                                                                                                                                        |
| `sampleRate`         | `number`       | No       | `0`                | Use this option to control how many sessions to select for replay collection. The number should be a decimal between 0 and 1, for example `0.4`, representing the fraction of sessions to have randomly selected for replay collection. Over a large number of sessions, `0.4` would select `40%` of those sessions. |
| `enableRemoteConfig` | `boolean`      | No       | `true`             | Use this option to enable [remote configuration](/docs/admin/account-management/account-settings#session-replay-settings).                                                                                                                                                                                           |
| `logLevel`           | `LogLevel`     | No       | `LogLevel.Warn`    | Use this option to set the log level for the Session Replay SDK.                                                                                                                                                                                                                                                     |
| `autoStart`          | `boolean`      | No       | `true`             | Use this option to control whether Session Replay starts automatically when initialized. If set to `false`, manually call the `start()` method to begin capture.                                                                                                                                                     |
| `maskLevel`          | `MaskLevel`    | No       | `MaskLevel.Medium` | Level of masking applied to sensitive content. Options: `MaskLevel.Light`, `MaskLevel.Medium`, `MaskLevel.Conservative`.                                                                                                                                                                                             |
| `optOut`             | `boolean`      | No       | `false`            | Whether to opt out of session replay collection.                                                                                                                                                                                                                                                                     |
| `serverZone`         | `'US' \| 'EU'` | No       | `'US'`             | Server zone for data processing. Set to `'EU'` for EU data residency.                                                                                                                                                                                                                                                |

## Methods

### init

Initialize the Session Replay SDK with your configuration.

```js
import { init, SessionReplayConfig } from '@amplitude/session-replay-react-native';

const config: SessionReplayConfig = {
    apiKey: 'YOUR_API_KEY',
    deviceId: 'YOUR_DEVICE_ID',
    sessionId: Date.now()
};

await init(config);
```

### start

Start recording session replay. Use this method if you initialized the SDK with `autoStart: false` or if you previously called `stop()`.

```js
import { start } from '@amplitude/session-replay-react-native';

await start();
```

### stop

Stop recording session replay.

```js
import { stop } from '@amplitude/session-replay-react-native';

await stop();
```

### setSessionId

Update the session identifier. Call this method whenever the session ID changes to ensure session replay data correlates with your analytics events.

```js
import { setSessionId } from '@amplitude/session-replay-react-native';

await setSessionId(Date.now());
```

### setDeviceId

Update the device identifier. Call this method whenever the device ID changes to ensure session replay data correlates with your analytics events.

```js
import { setDeviceId } from '@amplitude/session-replay-react-native';

await setDeviceId('new-device-id');
// or clear device ID
await setDeviceId(null);
```

### getSessionId

Get the current session identifier from the Session Replay SDK.

```js
import { getSessionId } from '@amplitude/session-replay-react-native';

const sessionId = await getSessionId();
console.log('Current session ID:', sessionId);
```

### flush

Flush any pending session replay data to the server. Forces immediate upload of recorded session data that may be buffered locally.

```js
import { flush } from '@amplitude/session-replay-react-native';

await flush();
```

## Mask onscreen data

Session Replay enables you to mask or obfuscate areas of your application which may contain sensitive data or PII. Masking happens at the view level. To mask a view, add the `AmpMaskView` tag with the `amp-mask` mask property around the section you're masking.

```js
import { AmpMaskView } from '@amplitude/session-replay-react-native';

// ...

<AmpMaskView mask="amp-mask">
    <Text
        style={[
            styles.sectionTitle,
            {
                color: isDarkMode ? Colors.white : Colors.black,
            },
        ]}
    >
        {title}
    </Text>
</AmpMaskView>
```

### Unmask views

To unmask a view that would otherwise be masked by the global mask level, change the mask property to `amp-unmask`.

```js
import { AmpMaskView } from '@amplitude/session-replay-react-native';

// ...

<AmpMaskView mask="amp-unmask">
    <Text
        style={[
            styles.sectionTitle,
            {
                color: isDarkMode ? Colors.white : Colors.black,
            },
        ]}
    >
        {title}
    </Text>
</AmpMaskView>
```

### Block views

To completely block a view from being recorded, use the `amp-block` mask property.

```js
import { AmpMaskView } from '@amplitude/session-replay-react-native';

// ...

<AmpMaskView mask="amp-block">
    <Text>This content will be completely blocked from recording</Text>
</AmpMaskView>
```

## Track web views (beta)

By default, Session Replay blocks web views and doesn't track them. If you want to track web views in your application, wrap the view in the `AmpMaskView` tag and apply the `amp-unmask` mask property.

```js
import { AmpMaskView } from '@amplitude/session-replay-react-native';
import { WebView } from 'react-native-webview';

// ...

<AmpMaskView mask="amp-unmask" style={ flex: 1 }>
    <WebView source={ uri: 'https://reactnative.dev/' } style={ flex: 1 } />
</AmpMaskView>
```

## EU data residency

Session Replay is available to Amplitude customers who use the EU data center. Set the `serverZone` configuration option to `EU` during initialization.

```js
import { init, SessionReplayConfig } from '@amplitude/session-replay-react-native';

const config: SessionReplayConfig = {
    apiKey: 'YOUR_API_KEY',
    deviceId: 'YOUR_DEVICE_ID',
    sessionId: Date.now(),
    serverZone: 'EU' // Set to EU for data residency
};

await init(config);
```

## Sampling rate

By default, Session Replay captures 0% of sessions for replay. Use the `sampleRate` configuration option to set the percentage of total sessions that Session Replay captures.

```js
import { init, SessionReplayConfig } from '@amplitude/session-replay-react-native';

const config: SessionReplayConfig = {
    apiKey: 'YOUR_API_KEY',
    deviceId: 'YOUR_DEVICE_ID',
    sessionId: Date.now(),
    sampleRate: 0.1 // Capture 10% of sessions
};

await init(config);
```

To set the `sampleRate` consider the monthly quota on your Session Replay plan. For example, if your monthly quota is 2,500,000 sessions, and you average 3,000,000 monthly sessions, your quota is 83% of your average sessions. In this case, to ensure sampling lasts through the month, set `sampleRate` to `.83` or lower.

Keep the following in mind as you consider your sample rate:

- When you reach your monthly session quota, Amplitude stops capturing sessions for replay.
- Session quotas reset on the first of every month.
- Use sample rate to distribute your session quota over the course of a month, rather than using your full quota at the beginning of the month.
- To find the best sample rate, Amplitude recommends that you start low, for example `.01`. If this value doesn't capture enough replays, raise the rate over the course of a few days. For ways to monitor the number of session replays captured, see [View the number of captured sessions](/docs/session-replay).

Session Replay supports remote sampling rate settings. This enables users in your organization to configure or update the sampling rate of your project after implementation, without a code change. In the event of a conflict, Session Replay defaults to the remote setting. For more information, see [Account Settings](/docs/admin/account-management/account-settings#session-replay-settings).

## User opt-out

To opt users out of session replay collection, set the `optOut` configuration option to `true` during initialization, or update it dynamically by reinitializing the SDK.

```js
import { init, SessionReplayConfig } from '@amplitude/session-replay-react-native';

const config: SessionReplayConfig = {
    apiKey: 'YOUR_API_KEY',
    deviceId: 'YOUR_DEVICE_ID',
    sessionId: Date.now(),
    optOut: true // Opt out of session replay collection
};

await init(config);
```