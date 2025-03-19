---
id: 78d50fa5-972c-4705-a9cf-f844551768d1
published: false
blueprint: session-replay
title: 'Session Replay iOS Middleware'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1742315923
alpha: true
instrumentation_guide: true
platform: mobile
public: true
---
{{partial:partials/session-replay/sr-ios-eap :when="alpha"}}

This article covers the installation of Session Replay using the [iOS SDK middleware](/docs/sdks/sdk-middleware). If your app is already instrumented with [(maintenance) Amplitude SDK](/docs/sdks/analytics/ios/ios-sdk), use this option. 

If your app is already instrumented with [(latest) iOS Swift SDK](/docs/sdks/analytics/ios/ios-swift-sdk), use the [Session Replay iOS SDK Plugin](/docs/session-replay/session-replay-ios-plugin).

If you use Segment through their Analytics-Swift SDK and [Amplitude (Actions) destination](https://segment.com/docs/connections/destinations/catalog/actions-amplitude/), choose the [Segment Plugin](/docs/session-replay/session-replay-ios-segment-integration).

If you use a provider other than Amplitude for in-product analytics, choose the [standalone implementation](/docs/session-replay/session-replay-ios-standalone-sdk).

{{partial:partials/session-replay/sr-ios-performance}}

## Before you begin

Use the latest version of the Session Replay Middleware above version `{{sdk_versions:session_replay_ios}}`. For a list of available versions, see all [release versions](https://github.com/amplitude/AmplitudeSessionReplay-iOS) on GitHub.

The Session Replay Middleware requires that:

1. Your application runs on iOS or iPadOS.
2. You are using `8.21.0` or higher of the [(maintenance) Amplitude iOS SDK](/docs/sdks/analytics/ios/ios-sdk).
3. You can provide a device ID to the SDK.

{{partial:partials/session-replay/sr-ios-supported-versions}}

## Quickstart

Add the [latest version](https://github.com/amplitude/AmplitudeSessionReplay-iOS) of the middleware to your project dependencies.

{{partial:tabs tabs="SPM, CocoaPods"}}
{{partial:tab name="SPM"}}
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
{{/partial:tab}}
{{partial:tab name="CocoaPods"}}
Add the core library and the middleware to your Podfile.

```
pod 'AmplitudeSessionReplay', :git => 'https://github.com/amplitude/AmplitudeSessionReplay-iOS.git'
pod 'AmplitudeiOSSessionReplayMiddleware', :git => 'https://github.com/amplitude/AmplitudeSessionReplay-iOS.git'
```
{{/partial:tab}}
{{/partial:tabs}}

Configure your application code:

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

Pass the following option when you initialize the Session Replay middleware:

| Name              | Type      | Required | Default         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------- | --------- | -------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sampleRate`      | `Float`  | No       | `0`             | Use this option to control how many sessions to select for replay collection. <br></br>The number should be a decimal between 0 and 1, for example `0.4`, representing the fraction of sessions to have randomly selected for replay collection. Over a large number of sessions, `0.4` would select `40%` of those sessions. For more information see, [Sampling rate](#sampling-rate).|

{{partial:partials/session-replay/sr-ios-mask-data}}

### User opt-out

The Session Replay middleware follows the Ampltiude-iOS SDK's `optOut` setting, and doesn't support user opt-outs on its own.

```swift
// Set optOut on the Amplitude SDK
amplitude.optOut = true
amplitude.addEventMiddleware(AmplitudeiOSSessionReplayMiddleware(/* session replay options */))
```

{{partial:partials/session-replay/sr-eu-data-residency}}

```swift
// Set serverZone on the Amplitude SDK
amplitude.setServerZone(.EU)
amplitude.addEventMiddleware(AmplitudeiOSSessionReplayMiddleware(/* session replay options */))
```

{{partial:partials/session-replay/sr-sampling-rate}}

```swift
// This configuration samples 1% of all sessions
amplitude.addEventMiddleware(AmplitudeiOSSessionReplayMiddleware(sampleRate: 0.01))
```

### Disable replay collection

Once enabled, Session Replay runs on your app until either:

- The user leaves your app
- You call `amplitude.removeEventMiddleware(sessionReplayMiddleware)`

Call `amplitude.removeEventMiddleware(sessionReplayMiddleware)` before a user navigates to a restricted area of your app to disable replay collection while the user is in that area.

{{partial:admonition type="note" heading="Keep a reference"}}
This requires keeping a reference to the Session Replay Middleware instance `let sessionReplayMiddleware = AmplitudeiOSSessionReplayMiddleware(/* session replay options */)`.
{{/partial:admonition}}

Call `amplitude.addEventMiddleware(sessionReplayMiddleware)` to re-enable replay collection when the return to an unrestricted area of your app.

You can also use a feature flag product like [Amplitude Experiment](docs/experiment) to create logic that enables or disables replay collection based on criteria like location. For example, you can create a feature flag that targets a specific user group, and add that to your initialization logic:

```swift
import Amplitude
import AmplitudeiOSSessionReplayMiddleware

// Your existing initialization logic with Amplitude-iOS SDK
let amplitude = Amplitude.instance()

if (nonEUCountryFlagEnabled) {
  // Create and Install Session Replay Middleware
  let sessionReplayMiddleware = AmplitudeiOSSessionReplayMiddleware(sampleRate: 0.1)
  amplitude.addEventMiddleware(sessionReplayMiddleware)
}

amplitude.initializeApiKey(API_KEY)
```

{{partial:partials/session-replay/sr-ios-webview}}

{{partial:partials/session-replay/sr-ios-mapview-support}}

{{partial:partials/session-replay/sr-data-retention}}

{{partial:partials/session-replay/sr-ios-storage}}

{{partial:partials/session-replay/sr-ios-known-limitations}}
