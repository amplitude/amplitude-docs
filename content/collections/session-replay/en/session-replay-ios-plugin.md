---
id: af03dd4a-f389-4ad1-9a24-6dd1bbcdacbe
blueprint: session-replay
title: 'Session Replay iOS Plugin'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1738344736
instrumentation_guide: true
platform: ios
public: true
description: 'Choose this option if you use an Amplitude iOS SDK to instrument your iOS application.'
---
This article covers the installation of Session Replay using the iOS plugin. If your app is already instrumented with the the Amplitude [iOS Swift SDK](/docs/sdks/analytics/ios/ios-swift-sdk) or legacy Amplitude [iOS SDK](/docs/sdks/analytics/ios/ios-sdk), use this option.

If you use Segment through their Analytics-Swift SDK and [Amplitude (Actions) destination](https://segment.com/docs/connections/destinations/catalog/actions-amplitude/), choose the [Segment Plugin](/docs/session-replay/session-replay-ios-segment-integration).

If you use a provider other than Amplitude for in-product analytics, choose the [standalone implementation](/docs/session-replay/session-replay-ios-standalone-sdk).

{{partial:partials/session-replay/sr-ios-performance}}

Session Replay captures changes to an app's view tree, this means the main view and all it's child views recursively. It then replays these changes to build a video-like replay. For example, at the start of a session, Session Replay captures a full snapshot of the app's view tree. As the user interacts with the app, Session Replay captures each change to the view as a diff. When you watch the replay of a session, Session Replay applies each diff back to the original view tree in sequential order, to construct the replay. Session replays have no maximum length.

{{partial:admonition type="tip" heading="Report issues"}}
To report issues with Session Replay for iOS, see the [AmplitudeSessionReplay-ios GitHub repository](https://github.com/amplitude/AmplitudeSessionReplay-ios).
{{/partial:admonition}}

## Before you begin

The method you use depends on the version of the Amplitude Android SDK you use.

{{partial:tabs tabs="iOS Swift SDK, iOS SDK (maintenance)"}}
{{partial:tab name="iOS Swift SDK"}}
Use the latest version of the iOS Session Replay plugin above `{{sdk_versions:session_replay_ios}}`.

The Session Replay iOS Plugin requires that:

1. Your application runs on iOS or iPadOS.
2. You are using `1.9.0` or higher of the [iOS Swift SDK](/docs/sdks/analytics/ios/ios-swift-sdk).
{{/partial:tab}}
{{partial:tab name="iOS SDK (maintenance)"}}
Use the latest version of the Session Replay Middleware above version `{{sdk_versions:session_replay_ios}}`. For a list of available versions, see all [release versions](https://github.com/amplitude/AmplitudeSessionReplay-iOS) on GitHub.

The Session Replay Middleware requires that:

* Your application runs on iOS or iPadOS.
* You are using `8.22.0` or higher of the [(maintenance) Amplitude iOS SDK](/docs/sdks/analytics/ios/ios-sdk).
* You can provide a device ID to the SDK.

{{/partial:tab}}
{{/partial:tabs}}

{{partial:partials/session-replay/sr-ios-supported-versions}}

## Quickstart

Add the [latest version](https://github.com/amplitude/AmplitudeSessionReplay-iOS) of the plugin to your project dependencies.

{{partial:tabs tabs="Swift SDK, Legacy SDK"}}
{{partial:tab name="Swift SDK"}}
**Swift Package Manager**

Add Session Replay as a dependency in your Package.swift file, or the Package list in Xcode.

```swift
dependencies: [
    .package(url: "https://github.com/amplitude/AmplitudeSessionReplay-iOS", .branch("main"))
]
```

For integrating with `Amplitude-Swift`, use the `AmplitudeSwiftSessionReplayPlugin` target.

```swift
.product(name: "AmplitudeSwiftSessionReplayPlugin", package: "AmplitudeSessionReplay")
```

**CocoaPods**

Add the core library and the plugin to your Podfile.

```
pod 'AmplitudeSessionReplay', :git => 'https://github.com/amplitude/AmplitudeSessionReplay-iOS.git'
pod 'AmplitudeSwiftSessionReplayPlugin', :git => 'https://github.com/amplitude/AmplitudeSessionReplay-iOS.git'
```

**Configure your application code**

```swift
import AmplitudeSwift
import AmplitudeSwiftSessionReplayPlugin

// Initialize Amplitude Analytics SDK instance
let amplitude = Amplitude(configuration: Configuration(apiKey: API_KEY))

// Create and Install Session Replay Plugin
// Recording will be handled automatically
amplitude.add(plugin: AmplitudeSwiftSessionReplayPlugin(sampleRate: 1.0))
```

{{/partial:tab}}
{{partial:tab name="Legacy SDK"}}
**Swift Package Manager**

Add Session Replay as a dependency in your Package.swift file, or the Package list in Xcode.

```swift
dependencies: [
    .package(url: "https://github.com/amplitude/AmplitudeSessionReplay-iOS", .branch("main"))
]
```

For integrating with `Amplitude-iOS`, use the `AmplitudeiOSSessionReplayMiddleware` target.

```swift
.product(name: "AmplitudeiOSSessionReplayMiddleware", package: "AmplitudeSessionReplay")
```

**CocoaPods**

Add the core library and the middleware to your Podfile.

```
pod 'AmplitudeSessionReplay', :git => 'https://github.com/amplitude/AmplitudeSessionReplay-iOS.git'
pod 'AmplitudeiOSSessionReplayMiddleware', :git => 'https://github.com/amplitude/AmplitudeSessionReplay-iOS.git'
```

**Configure your application code**

```swift
import Amplitude
import AmplitudeiOSSessionReplayMiddleware

// Initialize Amplitude Analytics SDK instance

let amplitude = Amplitude.instance()

// Although not required, we recommend enabling session start and end events when enabling Session Replay
amplitude.defaultTracking.sessions = true

// Create and Install Session Replay Middleware
// Recording will be handled automatically
amplitude.addEventMiddleware(AmplitudeiOSSessionReplayMiddleware(sampleRate: 0.1))

amplitude.initializeApiKey(API_KEY)
```


{{/partial:tab}}
{{/partial:tabs}}

## Configuration


Pass the following option when you initialize the Session Replay plugin:

| Name                  | Type      | Required | Default          | Description                                                                                                                                                                                                                                                                                                          |
| --------------------- | --------- | -------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sampleRate`          | `number`  | No       | `0`              | Use this option to control how many sessions to select for replay collection. The number should be a decimal between 0 and 1 (for example, `0.4`), representing the fraction of sessions to have randomly selected for replay collection. Over a large number of sessions, `0.4` would select `40%` of those sessions. |
| `enableRemoteConfig`  | `boolean` | No       | `true`           | Enables or disables [remote configuration ](#remote-configuration) for this instance of Session Replay.                                                                                                                                                                                                              |

{{partial:partials/session-replay/sr-remote-config-test}}

{{partial:partials/session-replay/sr-ios-mask-data}}

### User opt-out

The Session Replay plugin follows the Ampltiude-Swift SDK's `optOut` setting, and doesn't support user opt-outs on its own.

```swift
// Set optOut on the Amplitude SDK
let amplitude = Amplitude(configuration: Configuration(apiKey: API_KEY,
                                                           optOut: true,
                                                           /* other configuration */))
amplitude.add(plugin: AmplitudeSwiftSessionReplayPlugin(/* session replay options */))
```

{{partial:partials/session-replay/sr-eu-data-residency}}

```swift
// Set serverZone on the Amplitude SDK
let amplitude = Amplitude(configuration: Configuration(apiKey: API_KEY,
                                                           serverZone: .EU,
                                                           /* other configuration */))
amplitude.add(plugin: AmplitudeSwiftSessionReplayPlugin(/* session replay options */))
```

{{partial:partials/session-replay/sr-sampling-rate}}

```swift
// This configuration samples 1% of all sessions
amplitude.add(plugin: AmplitudeSwiftSessionReplayPlugin(sampleRate: 0.01))
```

### Disable replay collection

Once enabled, Session Replay runs on your app until either:

- The user leaves your app
- You call `amplitude.remove(plugin: sessionReplayPlugin)`

Call `amplitude.remove(plugin: sessionReplayPlugin)` before a user navigates to a restricted area of your app to disable replay collection while the user is in that area.

{{partial:admonition type="note" heading="Keep a reference"}}
This requires keeping a reference to the SessionReplayPlugin instance `let sessionReplayPlugin = AmplitudeSwiftSessionReplayPlugin(/* session replay options */)`.
{{/partial:admonition}}

Call `amplitude.add(plugin: sessionReplayPlugin)` to re-enable replay collection when the return to an unrestricted area of your app.

You can also use a feature flag product like [Amplitude Experiment](docs/experiment) to create logic that enables or disables replay collection based on criteria like location. For example, you can create a feature flag that targets a specific user group, and add that to your initialization logic:

```swift
import AmplitudeSwift
import AmplitudeSwiftSessionReplayPlugin

// Your existing initialization logic with Amplitude-Swift SDK
let amplitude = Amplitude(configuration: Configuration(apiKey: API_KEY,
                                                           /* other configuration */))

if (nonEUCountryFlagEnabled) {
  // Create and Install Session Replay Plugin
  let sessionReplayPlugin = AmplitudeSwiftSessionReplayPlugin(sampleRate: 0.1)
  amplitude.add(plugin: sessionReplayPlugin)
}
```

{{partial:partials/session-replay/sr-ios-webview}}

{{partial:partials/session-replay/sr-data-retention}}

{{partial:partials/session-replay/sr-ios-storage}}

{{partial:partials/session-replay/sr-ios-known-limitations}}

### Multiple Amplitude instances

Session Replay supports attaching to a single instance of the Amplitude SDK. If you have more than one instance instrumented in your application, make sure to start Session Replay on the instance that most relates to your project.

{{partial:partials/session-replay/sr-ios-troubleshooting}}

### Replay length and session length don't match

In some scenarios, the length of a replay may exceed the time between the `[Amplitude] Start Session` and `[Amplitude] End Session` events. This happens when a user closes the `[Amplitude] End Session` occurs, but before the iOS SDK and Session Replay plugin can process it. When the user uses the app again, the SDK and plugin process the event and send it to Amplitude, along with the replay. You can verify this scenario occurs if you see a discrepancy between the `End Session Client Event Time` and the `Client Upload Time`.

### Session replays don't appear in Amplitude

Session replays may not appear in Amplitude due to:

- Lack of connectivity
- No events triggered through the iOS SDK in the current session
- Sampling

#### Lack of connectivity

Ensure your app has access to the internet then try again.

#### No events triggered through the iOS SDK in the current session

Session Replay requires that at least one event in the user's session has the `[Amplitude] Session Replay ID` property. If you instrument your events with an analytics provider other than Amplitude, the iOS SDK may send only the default Session Start and Session End events, which don't include this property.

For local testing, you can force a Session Start event to ensure that Session Replay functions.

1. In Amplitude, in the User Lookup Event Stream, you should see a Session Start event that includes the `[Amplitude] Session Replay ID` property. After processing, the Play Session button should appear for that session.

#### Sampling

As mentioned above, the default `sampleRate` for Session Replay is `0`. Update the rate to a higher number. For more information see, [Sampling rate](#sampling-rate).

#### Some sessions don't include the Session Replay ID property

Session replay doesn't require that all events in a session have the `[Amplitude] Session Replay ID` property, only that one event in the session has it. Reasons why `[Amplitude] Session Replay ID`  may not be present in an event include:

- The user may have opted out or the session may not be part of the sample set given the current `sampleRate`. Increasing the `sampleRate` captures more sessions.
- Amplitude events may still send through your provider, but `additionalEventProperties` doesn't return the `[Amplitude] Session Replay ID` property. This can result from `optOut` and `sampleRate` configuration settings. Check that `optOut` and `sampleRate` are set to include the session.

### Session Replay processing errors

In general, replays should be available within minutes of ingestion. Delays or errors may be the result of one or more of the following:

- Mismatching API keys or Device IDs. This can happen if Session Replay and standard event instrumentation use different API keys or Device IDs.
- Session Replay references the wrong project.
- Short sessions. If a users bounces within a few seconds of initialization, the SDK may not have time to upload replay data.
- Replays older than the set [retention period](#retention-period) (defaults to 90 days).