---
id: fa18dd32-0f85-4436-8f2e-77d4705fd36b
blueprint: session-replay
instrumentation_guide: true
title: 'Session Replay React Native SDK Plugin'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1741713791
platform: react-native
public: true
description: 'Use this plugin if you instrument your application with the Amplitude React Native SDK.'
---
This article covers the installation of Session Replay using the [React Native SDK](/docs/sdks/analytics/react-native/react-native-sdk) plugin. If your application uses the React Native SDK, use this option.

## Before you begin

Use the latest version of the Session Replay React Native plugin above {{sdk_versions:session_replay_react_native_plugin}}. For more information, see the [change log](https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/plugin-session-replay-react-native/CHANGELOG.md) on GitHub.

## Quickstart

{{partial:tabs tabs="npm, yarn"}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/plugin-session-replay-react-native --save
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/plugin-session-replay-react-native
```
{{/partial:tab}}
{{/partial:tabs}}

Configure your application code.

```js
import { SessionReplayPlugin } from '@amplitude/plugin-session-replay-react-native';

// ...

const config: SessionReplayConfig = {
    enableRemoteConfig: true, // default true
    sampleRate: 1, // default 0
};
await init('YOUR_API_KEY').promise;
await add(new SessionReplayPlugin(config)).promise;
```

## Configuration

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `sampleRate` | `number` | No | `0` | Use this option to control how many sessions to select for replay collection. The number should be a decimal between 0 and 1, for example `0.4`, representing the fraction of sessions to have randomly selected for replay collection. Over a large number of sessions, `0.4` would select `40%` of those sessions. This field isn't required because Session Replay supports [Remote Configuration](/docs/admin/account-management/account-settings#session-replay-settings) of settings including Sample Rate. | 
| `enableRemoteConfing` | `boolean` | No | `true` | Use this option to enable [remote configuration](/docs/admin/account-management/account-settings#session-replay-settings). |

### Mask onscreen data

Session Replay enables you to mask or obfuscate areas of your application which may contain sensitive data or PII. Masking happens at the view level. To mask a view, add the `AmpMaskView` tag with the `amp-mask`  mask property around the section you're masking.

```js
import { AmpMaskView } from '@amplitude/plugin-session-replay-react-native';

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

To unmask a view at a later time, change the mask property to `amp-unmask`.

```js
import { AmpMaskView } from '@amplitude/plugin-session-replay-react-native';

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

### User opt-out

The Session Replay plugin follows the [React Native SDK's `optOut` setting](/docs/sdks/analytics/react-native/react-native-sdk#opt-users-out-of-tracking), and doesn't support user opt-outs on its own.

### EU data residency

Session Replay is available to Amplitude Customers who use the EU data center. Set the `serverZone` configuration option to `EU` during initialization. For example:

```js
import { SessionReplayPlugin } from '@amplitude/plugin-session-replay-react-native';

// ...

const config: SessionReplayConfig = {
    enableRemoteConfig: true, // default true
    sampleRate: 1, // default 0
    serverZone: "EU" // [tl! ~~]
};
await init('YOUR_API_KEY').promise;
await add(new SessionReplayPlugin(config)).promise;
```

### Sampling rate

By default, Session Replay captures 0% of sessions for replay. If you enable Remote Configuration, update the sample rate from the [Session Replay settings page](/docs/admin/account-management/account-settings#session-replay-settings) or use the `sampleRate` configuration option to set the percentage of total sessions that Session Replay captures. For example:

```js
import { SessionReplayPlugin } from '@amplitude/plugin-session-replay-react-native';

// ...

const config: SessionReplayConfig = {
    enableRemoteConfig: true, // default true
    sampleRate: 1, // [tl! ~~]
};
await init('YOUR_API_KEY').promise;
await add(new SessionReplayPlugin(config)).promise;
```

To set the `sampleRate` consider the monthly quota on your Session Replay plan. For example, if your monthly quota is 2,500,000 sessions, and you average 3,000,000 monthly sessions, your quota is 83% of your average sessions. In this case, to ensure sampling lasts through the month, set `sampleRate` to `.83` or lower.

Keep the following in mind as you consider your sample rate:

- When you reach your monthly session quota, Amplitude stops capturing sessions for replay.
- Session quotas reset on the first of every month.
- Use sample rate to distribute your session quota over the course of a month, rather than using your full quota at the beginning of the month.
- To find the best sample rate, Amplitude recommends that you start low, for example `.01`. If this value doesn't capture enough replays, raise the rate over the course of a few days. For ways to monitor the number of session replays captured, see [View the number of captured sessions](/docs/session-replay).

Session Replay supports remote sampling rate settings. This enables users in your organization to configure or update the sampling rate of your project after implementation, without a code change. In the event of a conflict, Session Replay defaults to the remote setting. For more information, see [Account Settings](/docs/admin/account-management/account-settings#session-replay-settings).

## Track web views (beta)

By default, Session Replay blocks web views, and doesn't track them. If you want to track web views in your application, wrap the view in the `AmpMaskView` tag, and apply the `amp-unmask` mask property.

```js
<AmpMaskView mask="amp-unmask" style={{ flex: 1 }}>
    <WebView source={{ uri: 'https://reactnative.dev/' }} style={{ flex: 1 }} />
</AmpMaskView>
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