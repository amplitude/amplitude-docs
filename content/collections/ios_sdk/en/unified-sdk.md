---
id: 9a4b3c2d-1e5f-4a7e-9c31-1c1571d6a73f
blueprint: ios_sdk
title: 'Unified SDK for Swift'
sdk_status: beta
article_type: core
supported_languages:
  - swift
  - obj-c
github_link: 'https://github.com/amplitude/AmplitudeUnified-Swift'
releases_url: 'https://github.com/amplitude/AmplitudeUnified-Swift/releases'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1721756427
source: 'https://www.docs.developers.amplitude.com/data/sdks/ios-unified/'
package_name: AmplitudeUnified
bundle_url: 'https://cocoapods.org/pods/AmplitudeUnified'
platform: iOS
---

{{partial:admonition type="beta" heading="Unifed SDK for Swift"}}
The Unified SDK for Swift is in beta and undergoing testing.
{{/partial:admonition}}

This is the official documentation for the Amplitude Unified SDK for Swift.

The Unified SDK is a wrapper around Amplitude's existing SDKs, providing a simplified interface to use multiple Amplitude products together. It currently includes:

- [Analytics SDK (AmplitudeSwift)](/docs/sdks/analytics/ios/ios-swift-sdk)
- [Experiment SDK](/docs/sdks/experiment-sdks/experiment-ios)
- [Session Replay SDK](/docs/session-replay/session-replay-ios-plugin) (iOS only)

## Install the SDK

{{partial:tabs tabs="CocoaPods, Swift Package Manager"}}
{{partial:tab name="CocoaPods"}}
1. Add the dependency to your `Podfile`:

    ```bash
    pod 'AmplitudeUnified', '~> 0.0.0'
    ```
2. Run `pod install` in the project directory.
{{/partial:tab}}
{{partial:tab name="Swift Package Manager"}}
1. Navigate to `File` > `Swift Package Manager` > `Add Package Dependency`. This opens a dialog that allows you to add a package dependency. 
2. Enter the URL `https://github.com/amplitude/AmplitudeUnified-Swift` in the search bar. 
3. Xcode automatically resolves to the latest version. Or you can select a specific version. 
4. Click the "Next" button to confirm the addition of the package as a dependency. 
5. Build your project to make sure the package is properly integrated.
{{/partial:tab}}
{{/partial:tabs}}

## Initialize the SDK

You must initialize the SDK before you can instrument. The API key for your Amplitude project is required.

{{partial:tabs tabs="Swift, Obj-C"}}
{{partial:tab name="Swift"}}
```swift
// Basic initialization with default configurations
let amplitude = Amplitude(
    apiKey: "YOUR_API_KEY"
)

// Advanced initialization with custom configurations
let amplitude = Amplitude(
    apiKey: "YOUR_API_KEY",
    serverZone: .US,
    instanceName: "default_instance",
    analyticsConfig: AnalyticsConfig(),
    experimentConfig: ExperimentPlugin.Config(),
    sessionReplayConfig: SessionReplayPlugin.Config(),
    logger: ConsoleLogger()
)
```
{{/partial:tab}}
{{partial:tab name="Obj-C"}}
```objc
// Basic initialization with default configurations
Amplitude *amplitude = [[Amplitude alloc] initWithApiKey:@"YOUR_API_KEY"];

// Basic initialization with server zone
Amplitude *amplitude = [[Amplitude alloc] initWithApiKey:@"YOUR_API_KEY" 
                                              serverZone:AMPServerZoneUS];

// Advanced initialization with custom configurations
Amplitude *amplitude = [[Amplitude alloc] initWithApiKey:@"YOUR_API_KEY"
                                              serverZone:AMPServerZoneUS
                                           instanceName:@"default_instance"
                                                 analyticsConfig:[[AMPAnalyticsConfig alloc] init]
                                                experimentConfig:[[ExperimentPluginConfig alloc] init]
                                            sessionReplayConfig:[[AMPSessionReplayPluginConfig alloc] init]
                                                         logger:nil];
```
{{/partial:tab}}
{{/partial:tabs}}

## Configure the SDK

### Analytics Configuration

The Unified SDK provides a simplified configuration interface for the Analytics SDK. For a complete list of configuration options, see the [Analytics SDK documentation](/docs/sdks/analytics/ios/ios-swift-sdk#configure-the-sdk).

{{partial:tabs tabs="Swift, Obj-C"}}
{{partial:tab name="Swift"}}
```swift
let analyticsConfig = AnalyticsConfig(
    flushQueueSize: 30,
    flushIntervalMillis: 30000,
    trackingOptions: TrackingOptions().disableTrackCity().disableTrackIpAddress(),
    minTimeBetweenSessionsMillis: 300000,
    autocapture: [.sessions, .appLifecycles, .screenViews]
)

let amplitude = Amplitude(
    apiKey: "YOUR_API_KEY",
    analyticsConfig: analyticsConfig
)
```
{{/partial:tab}}
{{partial:tab name="Obj-C"}}
```objc
AMPAnalyticsConfig *analyticsConfig = [[AMPAnalyticsConfig alloc] init];
analyticsConfig.flushQueueSize = 30;
analyticsConfig.flushIntervalMillis = 30000;
[analyticsConfig.trackingOptions disableTrackCity];
[analyticsConfig.trackingOptions disableTrackIpAddress];
analyticsConfig.minTimeBetweenSessionsMillis = 300000;
analyticsConfig.autocapture = AMPAutocaptureOptions.all;
analyticsConfig.migrateLegacyData = YES;
analyticsConfig.enableAutoCaptureRemoteConfig = YES;
]];
Amplitude *amplitude = [[Amplitude alloc] initWithApiKey:@"YOUR_API_KEY"
                                         analyticsConfig:analyticsConfig];
```
{{/partial:tab}}
{{/partial:tabs}}

### Experiment Configuration

The Unified SDK automatically configures the Experiment SDK with sensible defaults. For more advanced configuration options, see the [Experiment SDK documentation](/docs/sdks/experiment-sdks/experiment-ios).

{{partial:tabs tabs="Swift, Obj-C"}}
{{partial:tab name="Swift"}}
```swift
let experimentConfig = ExperimentPlugin.Config(
    serverUrl: "https://api.lab.amplitude.com",
    debug: true,
    fetchTimeoutMillis: 10000
)

let amplitude = Amplitude(
    apiKey: "YOUR_API_KEY",
    experimentConfig: experimentConfig
)
```
{{/partial:tab}}
{{partial:tab name="Obj-C"}}
```objc
ExperimentPluginConfig *experimentConfig = [[ExperimentPluginConfig alloc] init];
experimentConfig.serverUrl = @"https://api.lab.amplitude.com";
experimentConfig.debug = YES;
experimentConfig.fetchTimeoutMillis = 10000;

Amplitude *amplitude = [[Amplitude alloc] initWithApiKey:@"YOUR_API_KEY"
                                        experimentConfig:experimentConfig];
```
{{/partial:tab}}
{{/partial:tabs}}

### Session Replay Configuration

The Unified SDK automatically configures the Session Replay SDK with sensible defaults. For more advanced configuration options, see the [Session Replay SDK documentation](/docs/session-replay/session-replay-ios-plugin).

{{partial:admonition type="note" heading=""}}
Session Replay is only available on iOS platforms, not on macOS, tvOS, watchOS, or visionOS.
{{/partial:admonition}}

{{partial:tabs tabs="Swift, Obj-C"}}
{{partial:tab name="Swift"}}
```swift
#if canImport(AmplitudeSessionReplay)
let sessionReplayConfig = SessionReplayPlugin.Config(
    sessionSampleRate: 100,
    scrollSampleRate: 50
)

let amplitude = Amplitude(
    apiKey: "YOUR_API_KEY",
    sessionReplayConfig: sessionReplayConfig
)
#endif
```
{{/partial:tab}}
{{partial:tab name="Obj-C"}}
```objc
#if __has_include(<AmplitudeSessionReplay/AmplitudeSessionReplay.h>)
AMPSessionReplayPluginConfig *sessionReplayConfig = [[AMPSessionReplayPluginConfig alloc] init];
sessionReplayConfig.sessionSampleRate = 100;
sessionReplayConfig.scrollSampleRate = 50;

Amplitude *amplitude = [[Amplitude alloc] initWithApiKey:@"YOUR_API_KEY"
                                     sessionReplayConfig:sessionReplayConfig];
#endif
```
{{/partial:tab}}
{{/partial:tabs}}

## Using the SDK

The Unified SDK provides access to all the functionality of the individual SDKs through a single interface.

### Analytics

The Unified SDK exposes all the Analytics SDK functionality directly. For a complete list of methods, see the [Analytics SDK documentation](/docs/sdks/analytics/ios/ios-swift-sdk).

{{partial:tabs tabs="Swift, Obj-C"}}
{{partial:tab name="Swift"}}
```swift
// Track an event
amplitude.track(eventType: "Button Clicked", eventProperties: ["button_id": "sign_up"])

// Set user properties
let identify = Identify()
identify.set(property: "plan", value: "premium")
amplitude.identify(identify: identify)

// Set user ID
amplitude.setUserId(userId: "user@example.com")
```
{{/partial:tab}}
{{partial:tab name="Obj-C"}}
```objc
// Track an event
[amplitude track:@"Button Clicked" eventProperties:@{@"button_id": @"sign_up"}];

// Set user properties
AMPIdentify *identify = [[AMPIdentify alloc] init];
[identify set:@"plan" value:@"premium"];
[amplitude identify:identify];

// Set user ID
[amplitude setUserId:@"user@example.com"];
```
{{/partial:tab}}
{{/partial:tabs}}

### Experiment

The Experiment SDK is automatically initialized and configured when you create an Amplitude instance with the Unified SDK. You can access the Experiment client through the `experiment` property.

{{partial:tabs tabs="Swift, Obj-C"}}
{{partial:tab name="Swift"}}
```swift
// Fetch variants for the current user
amplitude.experiment.fetch().onFetchCompleted { error in
    if let error = error {
        print("Error fetching variants: \(error)")
        return
    }
    
    // Get a variant for a flag
    let variant = amplitude.experiment.variant("my-flag")
    print("Variant: \(variant.value)")
    
    // Evaluate a flag locally
    let localVariant = amplitude.experiment.variant("local-flag", fallback: "default")
    print("Local variant: \(localVariant.value)")
    
    // Exposure tracking is automatic when you call variant()
    // But you can also track exposures manually
    amplitude.experiment.exposure("my-flag")
}
```
{{/partial:tab}}
{{partial:tab name="Obj-C"}}
```objc
// Access the experiment client
ExperimentClient *experimentClient = amplitude.experiment;

// Fetch variants for the current user
[[experimentClient fetch] onFetchCompleted:^(NSError * _Nullable error) {
    if (error != nil) {
        NSLog(@"Error fetching variants: %@", error);
        return;
    }
    
    // Get a variant for a flag
    ExperimentVariant *variant = [experimentClient variant:@"my-flag"];
    NSLog(@"Variant: %@", variant.value);
    
    // Evaluate a flag locally
    ExperimentVariant *localVariant = [experimentClient variant:@"local-flag" fallback:@"default"];
    NSLog(@"Local variant: %@", localVariant.value);
    
    // Exposure tracking is automatic when you call variant()
    // But you can also track exposures manually
    [experimentClient exposure:@"my-flag"];
}];
```
{{/partial:tab}}
{{/partial:tabs}}

### Session Replay

The Session Replay SDK is automatically initialized and configured when you create an Amplitude instance with the Unified SDK on iOS platforms. Session Replay isn't available on macOS, tvOS, watchOS, or visionOS.

{{partial:tabs tabs="Swift, Obj-C"}}
{{partial:tab name="Swift"}}
```swift
#if canImport(AmplitudeSessionReplay)
// Session Replay is automatically initialized and configured
// You can access the Session Replay client through the sessionReplay property

// Start recording a session
amplitude.sessionReplay?.startRecording()

// Stop recording
amplitude.sessionReplay?.stopRecording()

// Pause recording
amplitude.sessionReplay?.pauseRecording()

// Resume recording
amplitude.sessionReplay?.resumeRecording()
#endif
```
{{/partial:tab}}
{{partial:tab name="Obj-C"}}
```objc
#if __has_include(<AmplitudeSessionReplay/AmplitudeSessionReplay.h>)
// Session Replay is automatically initialized and configured
// You can access the Session Replay client through the sessionReplay property
SessionReplay *sessionReplay = amplitude.sessionReplay;

// Start recording a session
[sessionReplay startRecording];

// Stop recording
[sessionReplay stopRecording];

// Pause recording
[sessionReplay pauseRecording];

// Resume recording
[sessionReplay resumeRecording];
#endif
```
{{/partial:tab}}
{{/partial:tabs}}

## Advanced topics

Follow instructions in this section to enable identity management and other features.

### Identity management

The Unified SDK provides a unified identity management system that synchronizes user identity across all Amplitude products. When you set a user ID or device ID using the Amplitude methods, the changes are automatically propagated to Experiment and Session Replay.

{{partial:tabs tabs="Swift, Obj-C"}}
{{partial:tab name="Swift"}}
```swift
// Set user ID - automatically propagated to all products
amplitude.setUserId(userId: "user@example.com")

// Set device ID - automatically propagated to all products
amplitude.setDeviceId(deviceId: "custom-device-id")

// Reset user - clears user ID and generates a new device ID
amplitude.reset()

// Access the current identity
let userId = amplitude.identity.userId
let deviceId = amplitude.identity.deviceId
```
{{/partial:tab}}
{{partial:tab name="Obj-C"}}
```objc
// Set user ID - automatically propagated to all products
[amplitude setUserId:@"user@example.com"];

// Set device ID - automatically propagated to all products
[amplitude setDeviceId:@"custom-device-id"];

// Reset user - clears user ID and generates a new device ID
[amplitude reset];

// Access the current identity
NSString *userId = amplitude.identity.userId;
NSString *deviceId = amplitude.identity.deviceId;
```
{{/partial:tab}}
{{/partial:tabs}}

### User properties

The Unified SDK maintains a cache of user properties that are set with identify operations. This allows you to access the current user properties state at any time.

{{partial:tabs tabs="Swift"}}
{{partial:tab name="Swift"}}
```swift
// Set user properties
let identify = Identify()
identify.set(property: "plan", value: "premium")
identify.set(property: "age", value: 25)
amplitude.identify(identify: identify)

// Access the current user properties
let userProperties = amplitude.identity.userProperties
print("User plan: \(userProperties["plan"] ?? "none")")
print("User age: \(userProperties["age"] ?? 0)")

// Clear all user properties
let clearIdentify = Identify()
clearIdentify.clearAll()
amplitude.identify(identify: clearIdentify)
```
{{/partial:tab}}
{{/partial:tabs}}

## Debugging

To enable debug logging, set the log level to `DEBUG` in the Analytics configuration:

{{partial:tabs tabs="Swift, Obj-C"}}
{{partial:tab name="Swift"}}
```swift
let analyticsConfig = AnalyticsConfig(
    // Other configuration options...
)

let amplitude = Amplitude(
    apiKey: "YOUR_API_KEY",
    analyticsConfig: analyticsConfig,
    logger: ConsoleLogger(logLevel: LogLevelEnum.DEBUG.rawValue)
)
```
{{/partial:tab}}
{{partial:tab name="Obj-C"}}
```objc
AMPAnalyticsConfig *analyticsConfig = [[AMPAnalyticsConfig alloc] init];
// Other configuration options...

Amplitude *amplitude = [[Amplitude alloc] initWithApiKey:@"YOUR_API_KEY"
                                         analyticsConfig:analyticsConfig
                                                  logger:^(NSInteger logLevel, NSString *logMessage) {
        NSLog(@"%@", logMessage);
    }];
```
{{/partial:tab}}
{{/partial:tabs}}

## Common Issues

If your implementation of the Unified SDK doesn't work as you expect, make sure you account for the following common issues.

### Session Replay not working on non-iOS platforms

Session Replay is only available on iOS platforms. It isn't available on macOS, tvOS, watchOS, or visionOS. The Unified SDK automatically detects the platform and only initialize Session Replay on iOS.

### Events not showing up in Amplitude

If events don't appear in Amplitude:

1. Check that you're using the correct API key
2. Verify that the device has an internet connection
3. Make sure you wait long enough to ensure events flush (the default time is 30 seconds)
4. Check the logs for any error messages

### Experiment flags aren't fetched

If Experiment flags aren't fetched:

1. Ensure you've called `amplitude.experiment.fetch()`
2. Check that the user ID or device ID is set correctly
3. Verify that you configure the flags correctly in the Amplitude Experiment dashboard
4. Check the logs for any error messages from the Experiment SDK

## Migration guide

If you use the individual Amplitude SDKs separately, follow these steps to migrate to the Unified SDK:

1. Add the Unified SDK dependency to your project
2. Remove the individual SDK dependencies (AmplitudeSwift, Experiment, AmplitudeSessionReplay)
3. Replace your initialization code with the Unified SDK initialization
4. Update your API calls to use the Unified SDK interface

### Before migration

{{partial:tabs tabs="Swift, Obj-C"}}
{{partial:tab name="Swift"}}
```swift
// Analytics SDK
let amplitude = Amplitude(configuration: Configuration(
    apiKey: "YOUR_API_KEY",
    flushQueueSize: 30,
    flushIntervalMillis: 30000
))

// Experiment SDK
let experimentClient = Experiment.initialize(
    apiKey: "YOUR_API_KEY",
    config: ExperimentConfig(
        serverUrl: "https://api.lab.amplitude.com"
    )
)

// Session Replay SDK
let sessionReplay = SessionReplayPlugin(config: SessionReplayPlugin.Config(
    sessionSampleRate: 100
))
amplitude.add(plugin: sessionReplay)
```
{{/partial:tab}}
{{partial:tab name="Obj-C"}}
```objc
// Analytics SDK
AMPConfiguration *configuration = [AMPConfiguration initWithApiKey:@"YOUR_API_KEY"];
configuration.flushQueueSize = 30;
configuration.flushIntervalMillis = 30000;
Amplitude *amplitude = [Amplitude initWithConfiguration:configuration];

// Experiment SDK
ExperimentConfig *experimentConfig = [ExperimentConfig initWithApiKey:@"YOUR_API_KEY"];
experimentConfig.serverUrl = @"https://api.lab.amplitude.com";
ExperimentClient *experimentClient = [Experiment initializeWithApiKey:@"YOUR_API_KEY" config:experimentConfig];

// Session Replay SDK
AMPSessionReplayPluginConfig *sessionReplayConfig = [[AMPSessionReplayPluginConfig alloc] init];
sessionReplayConfig.sessionSampleRate = 100;
AMPSessionReplayPlugin *sessionReplay = [[AMPSessionReplayPlugin alloc] initWithConfig:sessionReplayConfig];
[amplitude add:sessionReplay];
```
{{/partial:tab}}
{{/partial:tabs}}

### After migration

{{partial:tabs tabs="Swift, Obj-C"}}
{{partial:tab name="Swift"}}
```swift
let analyticsConfig = AnalyticsConfig(
    flushQueueSize: 30,
    flushIntervalMillis: 30000
)

let experimentConfig = ExperimentPlugin.Config(
    serverUrl: "https://api.lab.amplitude.com"
)

let sessionReplayConfig = SessionReplayPlugin.Config(
    sessionSampleRate: 100
)

let amplitude = Amplitude(
    apiKey: "YOUR_API_KEY",
    analyticsConfig: analyticsConfig,
    experimentConfig: experimentConfig,
    sessionReplayConfig: sessionReplayConfig
)
```
{{/partial:tab}}
{{partial:tab name="Obj-C"}}
```objc
AMPAnalyticsConfig *analyticsConfig = [[AMPAnalyticsConfig alloc] init];
analyticsConfig.flushQueueSize = 30;
analyticsConfig.flushIntervalMillis = 30000;

ExperimentPluginConfig *experimentConfig = [[ExperimentPluginConfig alloc] init];
experimentConfig.serverUrl = @"https://api.lab.amplitude.com";

AMPSessionReplayPluginConfig *sessionReplayConfig = [[AMPSessionReplayPluginConfig alloc] init];
sessionReplayConfig.sessionSampleRate = 100;

Amplitude *amplitude = [[Amplitude alloc] initWithApiKey:@"YOUR_API_KEY"
                                            serverZone:AMPServerZoneUS
                                          instanceName:@"default"
                                       analyticsConfig:analyticsConfig
                                      experimentConfig:experimentConfig
                                   sessionReplayConfig:sessionReplayConfig
                                                logger:nil];
```
{{/partial:tab}}
{{/partial:tabs}}