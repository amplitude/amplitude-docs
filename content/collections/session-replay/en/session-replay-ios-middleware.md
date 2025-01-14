---
id: 78d50fa5-972c-4705-a9cf-f844551768d1
published: false
blueprint: session-replay
title: 'Session Replay iOS Middleware'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1730234244
alpha: true
instrumentation_guide: true
platform: ios
public: false
parent: 467a0fe0-6ad9-4375-96a2-eea5b04a7bcf
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

### WebView support (Beta)

By default, web views are blocked in a session replay recording. To enable these components, you can manually unmask views by using the instructions [here](#block-on-screen-data)

{{partial:partials/session-replay/sr-data-retention}}

{{partial:partials/session-replay/sr-ios-storage}}

{{partial:partials/session-replay/sr-ios-known-limitations}}

### Multiple Amplitude instances

Session Replay supports attaching to a single instance of the Amplitude SDK. If you have more than one instance instrumented in your application, make sure to start Session Replay on the instance that most relates to your project.

{{partial:partials/session-replay/sr-ios-troubleshooting}}

### Replay length and session length don't match

In some scenarios, the length of a replay may exceed the time between the `[Amplitude] Start Session` and `[Amplitude] End Session` events. This happens when a user closes the `[Amplitude] End Session` occurs, but before the iOS SDK and Session Replay middleware can process it. When the user uses the app again, the SDK and middleware process the event and send it to Amplitude, along with the replay. You can verify this scenario occurs if you see a discrepancy between the `End Session Client Event Time` and the `Client Upload Time`.

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