---
id: 70c86f31-42e5-47d4-ab32-698e7513f499
blueprint: session-replay
title: 'Session Replay iOS Standalone SDK'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1742315929
alpha: true
instrumentation_guide: true
platform: mobile
public: true
description: 'Choose this option if you use an iOS analytics provider other than Amplitude.'
---
This article covers the installation of Session Replay for iOS using the standalone SDK. If you use a provider other than Amplitude for in-product analytics, choose this option. 

If your app is already instrumented with an  [Amplitude iOS SDK](/docs/sdks/analytics/ios/ios-swift-sdk), use the [Session Replay iOS SDK Plugin](/docs/session-replay/session-replay-ios-plugin).

If you use Segment through their Analytics-Swift SDK and [Amplitude (Actions) destination](https://segment.com/docs/connections/destinations/catalog/actions-amplitude/), choose the [Segment Plugin](/docs/session-replay/session-replay-ios-segment-integration).

{{partial:partials/session-replay/sr-ios-performance}}

{{partial:admonition type="tip" heading="Report issues"}}
To report issues with Session Replay for iOS, see the [AmplitudeSessionReplay-ios GitHub repository](https://github.com/amplitude/AmplitudeSessionReplay-ios).
{{/partial:admonition}}

## Before you begin

Use the latest version of the Session Replay SDK above version `{{sdk_versions:session_replay_ios}}`. For a list of available versions, see the [release versions](https://github.com/amplitude/AmplitudeSessionReplay-iOS/tags) on GitHub.

Session Replay Standalone SDK requires that:

1. Your application runs on iOS or iPadOS.
2. You track sessions with a timestamp, which you can pass to the SDK. You inform the SDK whenever a session timestamp changes.
3. You can provide a device ID to the SDK.
4. The `Session ID` and `Device ID` you pass to the Standalone SDK must match those sent as event properties to Amplitude.

The Standalone SDK doesn't provide Session management capabilities. Your application or a third-party integration must update the SDK with changes to `Session ID` and `Device ID`. 

{{partial:partials/session-replay/sr-ios-supported-versions}}

## Quickstart

Add the [latest version](https://github.com/amplitude/AmplitudeSessionReplay-iOS) of Session Replay to your project dependencies.

{{partial:tabs tabs="SPM, CocoaPods"}}
{{partial:tab name="SPM"}}
Add Session Replay as a dependency in your Package.swift file, or the Package list in Xcode.

```swift
dependencies: [
    .package(url: "https://github.com/amplitude/AmplitudeSessionReplay-iOS", .branch("main"))
]
```

For integrating with third party Analytics, use the `AmplitudeSessionReplay` target.

```swift
.product(name: "AmplitudeSessionReplay", package: "AmplitudeSessionReplay")
```
{{/partial:tab}}
{{partial:tab name="CocoaPods"}}
Add Session Replay to your Podfile.

```
pod 'AmplitudeSessionReplay', :git => 'https://github.com/amplitude/AmplitudeSessionReplay-iOS.git'
```
{{/partial:tab}}
{{/partial:tabs}}

Configure your application code.

1. Create a  `let sessionReplay = SessionReplay()` object to begin collecting replays. Pass the API key, and a session identifier and device identifier if available.
2. When the session identifier or device identifier changes, pass the new value to Amplitude with `sessionReplay.sessionId` or `sessionReplay.deviceId`, respectively.
3. Collect Session Replay properties to send with other event properties with `sessionReplay.additionalEventProperties`

```swift
import AmplitudeSessionReplay
import ThirdPartyAnalytics

// Initialize the standalone session replay SDK
let sessionReplay = SessionReplay(apiKey: amplitude.apiKey,
                                     deviceId: DEVICE_ID,
                                     sessionId: SESSION_ID,
                                     sampleRate: 0.1)

// Track an event
// Get session replay properties for this session
var eventProperties = event.eventProperties ?? [:]
eventProperties.merge(sessionReplay.additionalEventProperties) { (current, _) in current }
event.eventProperties = eventProperties
ThirdPartyAnalytics.track(event)

// Handle session ID changes
// Whenever the session ID changes
ThirdPartyAnalytics.setSessionId(deviceId)
// Update the session ID in session replay
sessionReplay.sessionId = ThirdPartyAnalytics.getSessionId()

// Handle device ID changes
// Whenever the device ID changes
ThirdPartyAnalytics.setDeviceId(sessionId)
// Update the device ID in session replay
sessionReplay.deviceId = ThirdPartyAnalytics.getDeviceId()
```

## Configuration

Pass the following configuration options when you initialize the Session Replay SDK.

| Name                  | Type      | Required | Default          | Description                                                                                                                                                                                                                                                                                                          |
| --------------------- | --------- | -------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiKey`              | `String`  | No       | `null`           | Sets the Amplitude API Key.                                                                                                                                                                                                                                                                                                 |
| `deviceId`            | `string`  | Yes      | `undefined`      | Sets an identifier for the device running your application.                                                                                                                                                                                                                                                          |
| `sessionId`           | `number`  | Yes      | `undefined`      | Sets an identifier for the users current session. The value must be in milliseconds since epoch (Unix Timestamp).                                                                                                                                                                                                    |
| `sampleRate`          | `number`  | No       | `0`              | Use this option to control how many sessions to select for replay collection. The number should be a decimal between 0 and 1, for example `0.4`, representing the fraction of sessions to have randomly selected for replay collection. Over a large number of sessions, `0.4` would select `40%` of those sessions. |
| `optOut`              | `boolean` | No       | `false`          | Sets permission to collect replays for sessions. Setting a value of true prevents Amplitude from collecting session replays.                                                                                                                                                                                         |
| `logger`              | `Logger`  | No       | `ConsoleLogger`  | Sets a custom `logger` class from the Logger to emit log messages to desired destination. Set to `null` to disable logging.                                                                                                                                                                                                   |
| `serverZone`          | `string`  | No       | `US`             | EU or US. Sets the Amplitude server zone. Set this to EU for Amplitude projects created in EU data center.                                                                                                                                                                                                           |
| `enableRemoteConfig`  | `boolean` | No       | `true`           | Enables or disables [remote configuration ](#remote-configuration) for this instance of Session Replay.                                                                                                                                                                                                              |
| `serverUrl`           | `string`  | No       | `null`           | Explicitly set the server URL. Use this setting for proxy configuration.                                                                                                                                                                                                                                             |

{{partial:partials/session-replay/sr-remote-config-test}}

{{partial:partials/session-replay/sr-ios-mask-data}}

### User opt-out

Session Replay provides an option for opt-out configuration. This prevents Amplitude from collecting session replays when passed as part of initialization. For example:

```swift
// Pass a boolean value to indicate a users opt-out status
        let sessionReplay = SessionReplay(apiKey: API_KEY,
                                             optOut: true,
                                             /* other session replay options */)
```

{{partial:partials/session-replay/sr-eu-data-residency}}

```swift
// Set serverZone to EU
let sessionReplay = SessionReplay(apiKey: API_KEY,
                                     serverZone: .EU,
                                     /* other session replay options */)
```

{{partial:partials/session-replay/sr-sampling-rate}}

```swift
// This configuration samples 1% of all sessions
let sessionReplay = SessionReplay(apiKey: API_KEY,
                                     sampleRate: 0.01,
                                     /* other session replay options */)
```

### Disable replay collection

Once enabled, Session Replay runs on your app until either:

- The user leaves your app
- You call `sessionReplay.stop()`

Call `sessionReplay.stop()` before a user navigates to a restricted area of your app to disable replay collection while the user is in that area. 

Create a new instance `sessionReplay.start()` to re-enable replay collection when the return to an unrestricted area of your app.

You can also use a feature flag product like [Amplitude Experiment](/docs/experiment) to create logic that enables or disables replay collection based on criteria like location. For example, you can create a feature flag that targets a specific user group, and add that to your initialization logic:

```swift
import AmplitudeSessionReplay
import ThirdPartyAnalytics

let sessionReplay = SessionReplay(apiKey: amplitude.apiKey,
                                     deviceId: DEVICE_ID,
                                     sessionId: SESSION_ID,
                                     sampleRate: 1.0)

if (nonEUCountryFlagEnabled) {
    sessionReplay.start()
}
```

{{partial:partials/session-replay/sr-ios-webview}}

{{partial:partials/session-replay/sr-ios-mapview-support}}

{{partial:partials/session-replay/sr-data-retention}}

{{partial:partials/session-replay/sr-ios-storage}}

{{partial:partials/session-replay/sr-ios-known-limitations}}

{{partial:partials/session-replay/sr-ios-troubleshooting}}
