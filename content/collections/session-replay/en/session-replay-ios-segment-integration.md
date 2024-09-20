---
id: 5b801f67-851c-4adb-acb9-da7df0004348
blueprint: session-replay
title: 'Session Replay iOS Segment Integration'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1726763546
alpha: true
instrumentation_guide: true
platform: ios
public: false
parent: 467a0fe0-6ad9-4375-96a2-eea5b04a7bcf
---
{{partial:partials/session-replay/sr-ios-eap :when="alpha"}}

This article covers the installation of Session Replay using the Session Replay iOS Segment plugin. If your app is already instrumented with Segment using their Analytics-Swift library and Amplitude (Actions) destination, use this option.

If your app is already instrumented with [(latest) iOS Swift SDK](/docs/sdks/analytics/ios/ios-swift-sdk), use the [Session Replay iOS SDK Plugin](/docs/session-replay/session-replay-ios-plugin).

If your app is already instrumented with [(maintenance) iOS SDK](/docs/sdks/analytics/ios/ios-sdk), use the [Session Replay iOS SDK Middleware](/docs/session-replay/session-replay-ios-middleware).

If you use Segment using other options, choose the [standalone implementation](/docs/session-replay/session-replay-ios-standalone-sdk).

{{partial:partials/session-replay/sr-ios-performance}}

Session Replay captures changes to an app's view tree, this means the main view and all it's child views recursively. It then replays these changes to build a video-like replay. For example, at the start of a session, Session Replay captures a full snapshot of the app's view tree. As the user interacts with the app, Session Replay captures each change to the view as a diff. When you watch the replay of a session, Session Replay applies each diff back to the original view tree in sequential order, to construct the replay. Session replays have no maximum length.

## Before you begin

Use the latest version of the Session Replay iOS Segment Plugin above `{{sdk_versions:session_replay_ios}}`.

The Session Replay iOS Segment Plugin requires that:

1. Your application runs on iOS or iPadOS.
2. You are using Segment's Analytics-Swift library for ingestion.
3. You are using Segment's Amplitude (Actions) destination
4. You are using Segment's [Amplitude Plugin](https://segment.com/docs/connections/sources/catalog/libraries/mobile/apple/destination-plugins/amplitude-swift/)

{{partial:partials/session-replay/sr-ios-supported-versions}}

## Quickstart

Add the [latest version](https://github.com/amplitude/AmplitudeSessionReplay-iOS) of the plugin to your project dependencies.

{{partial:tabs tabs="SPM, CocoaPods"}}
{{partial:tab name="SPM"}}
Add Session Replay as a dependency in your Package.swift file, or the Package list in Xcode.

```swift
dependencies: [
    .package(url: "https://github.com/amplitude/AmplitudeSessionReplay-iOS", .branch("main"))
]
```

For integrating with `Analytics-Swift`, use the `AmplitudeSegmentSessionReplayPlugin` target.

```swift
.product(name: "AmplitudeSegmentSessionReplayPlugin", package: "AmplitudeSessionReplay")
```
{{/partial:tab}}
{{partial:tab name="CocoaPods"}}
Add the core library and the plugin to your Podfile.

```
pod 'AmplitudeSessionReplay', :git => 'https://github.com/amplitude/AmplitudeSessionReplay-iOS.git'
pod 'AmplitudeSegmentSessionReplayPlugin', :git => 'https://github.com/amplitude/AmplitudeSessionReplay-iOS.git'
```
{{/partial:tab}}
{{/partial:tabs}}

Configure your application code:

```swift
import AmplitudeSegmentSessionReplayPlugin
import Segment
import SegmentAmplitude

// Initialize Segment
let analytics = Analytics(configuration: config)

// Ensure Segment's AmplitudeSession plugin is added before AmplitudeSegmentSessionReplayPlugin
analytics.add(plugin: AmplitudeSession())

// Initialize AmplitudeSegmentSessionReplayPlugin with your Amplitude API key
analytics.add(plugin: AmplitudeSegmentSessionReplayPlugin(amplitudeApiKey: API_KEY,
                                                              sampleRate: 0.1))
```

Pass the following option when you initialize the Session Replay plugin:

| Name              | Type      | Required | Default         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------- | --------- | -------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `amplitudeApiKey`       | `String` | Yes       | `nil`          | The API key for the Amplitude project Segment is writing to.|
| `sampleRate`      | `Float`  | No       | `0`             | Use this option to control how many sessions to select for replay collection. <br></br>The number should be a decimal between 0 and 1, for example `0.4`, representing the fraction of sessions to have randomly selected for replay collection. Over a large number of sessions, `0.4` would select `40%` of those sessions. |
| `serverZone` | `ServerZone`  | No       | `ServerZone.US` | `ServerZone.EU` or `ServerZone.US`. Sets the Amplitude server zone. Set this to EU for Amplitude projects created in EU data center. |

{{partial:partials/session-replay/sr-ios-mask-data}}

### User opt-out

Set `optOut` on the plugin to indicate a user has opted out of session replay.

```swift
// Pass a boolean value to indicate a users opt-out status
amplitudeSegmentSessionReplayPlugin.optOut = true
```

{{partial:partials/session-replay/sr-eu-data-residency}}

```swift
// Set serverZone on the AmplitudeSegmentSessionReplayPlugin
let plugin = AmplitudeSegmentSessionReplayPlugin(amplitudeApiKey: API_KEY,
                                                     sampleRate: 0.1,
                                                     serverZone: .EU)
```

{{partial:partials/session-replay/sr-sampling-rate}}

```swift
// This configuration samples 1% of all sessions
amplitude.add(plugin: AmplitudeSegmentSessionReplayPlugin(amplitudeApiKey: API_KEY,
                                                              sampleRate: 0.01))
```

### Disable replay collection

Once enabled, Session Replay runs on your app until either:

- The user leaves your app
- You call `analytics.remove(plugin: amplitudeSegmentSessionReplayPlugin)`

Call `analytics.remove(plugin: amplitudeSegmentSessionReplayPlugin)` before a user navigates to a restricted area of your app to disable replay collection while the user is in that area.

{{partial:admonition type="note" heading="Keep a reference"}}
This requires keeping a reference to the SessionReplayPlugin instance `let amplitudeSegmentSessionReplayPlugin = AmplitudeSegmentSessionReplayPlugin(/* session replay options */)`.
{{/partial:admonition}}

Call `amplitude.add(plugin: amplitudeSegmentSessionReplayPlugin)` to re-enable replay collection when the return to an unrestricted area of your app.

You can also use a feature flag product like [Amplitude Experiment](docs/experiment) to create logic that enables or disables replay collection based on criteria like location. For example, you can create a feature flag that targets a specific user group, and add that to your initialization logic:

```swift
import AmplitudeSwift
import AmplitudeSwiftSessionReplayPlugin

// Your existing initialization logic with Segement
let analytics = Analytics(configuration: config)
analytics.add(plugin: AmplitudeSession())

if (nonEUCountryFlagEnabled) {
  // Create and Install Session Replay Plugin
  let amplitudeSegmentSessionReplayPlugin = AmplitudeSwiftSessionReplayPlugin(sampleRate: 0.1)
  analytics.add(plugin: amplitudeSegmentSessionReplayPlugin)
}
```

{{partial:partials/session-replay/sr-data-retention}}

{{partial:partials/session-replay/sr-ios-storage}}

{{partial:partials/session-replay/sr-ios-known-limitations}}

### Multiple Segment instances

Session Replay supports attaching to a single instance of the Segment SDK. If you have more than one instance instrumented in your application, make sure to start Session Replay on the instance that most relates to your project.

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

Session Replay requires that at least one event in the user's session has the `[Amplitude] Session Replay ID` property.

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