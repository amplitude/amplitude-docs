---
id: 5b801f67-851c-4adb-acb9-da7df0004348
blueprint: session-replay
title: 'Session Replay iOS Segment Integration'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1730306275
alpha: true
instrumentation_guide: true
platform: ios
public: false
parent: 467a0fe0-6ad9-4375-96a2-eea5b04a7bcf
description: "Choose this option if you use Segment's Amplitude (Actions) destination to send analytics data to Amplitude."
---
This article covers the installation of Session Replay using the Session Replay iOS Segment plugin. If your app is already instrumented with Segment using their Analytics-Swift library and Amplitude (Actions) destination, use this option.

If your app is already instrumented with an  [Amplitude iOS SDK](/docs/sdks/analytics/ios/ios-swift-sdk), use the [Session Replay iOS SDK Plugin](/docs/session-replay/session-replay-ios-plugin).

If you use Segment using other options, choose the [standalone implementation](/docs/session-replay/session-replay-ios-standalone-sdk).

{{partial:partials/session-replay/sr-ios-performance}}

Session Replay captures changes to an app's view tree, this means the main view and all it's child views recursively. It then replays these changes to build a video-like replay. For example, at the start of a session, Session Replay captures a full snapshot of the app's view tree. As the user interacts with the app, Session Replay captures each change to the view as a diff. When you watch the replay of a session, Session Replay applies each diff back to the original view tree in sequential order, to construct the replay. Session replays have no maximum length.

{{partial:admonition type="tip" heading="Report issues"}}
To report issues with Session Replay for iOS, see the [AmplitudeSessionReplay-ios GitHub repository](https://github.com/amplitude/AmplitudeSessionReplay-ios).
{{/partial:admonition}}

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

{{partial:partials/session-replay/sr-ios-config}}

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

{{partial:partials/session-replay/sr-ios-webview}}

{{partial:partials/session-replay/sr-ios-mapview-support}}

{{partial:partials/session-replay/sr-data-retention}}

{{partial:partials/session-replay/sr-ios-storage}}

{{partial:partials/session-replay/sr-ios-known-limitations}}
