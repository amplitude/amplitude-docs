---
id: 36708c4b-d35c-4a7e-9c31-1c1571d6a73f
blueprint: ios_sdk
title: 'iOS Swift SDK'
sdk_status: current
article_type: core
supported_languages:
  - swift
  - obj-c
github_link: 'https://github.com/amplitude/Amplitude-Swift'
releases_url: 'https://github.com/amplitude/Amplitude-Swift/releases'
ampli_article: 4a49ddd0-6bd6-4758-9985-85149b794f13
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1721756427
source: 'https://www.docs.developers.amplitude.com/data/sdks/ios-swift/'
migration_guide:
  - 06c84fb1-8d96-4042-863d-fce4619b48ed
package_name: AmplitudeSwift
bundle_url: 'https://cocoapods.org/pods/AmplitudeSwift'
platform: iOS
---
This is the official documentation for the Amplitude Analytics iOS SDK.

## Install the SDK

{{partial:tabs tabs="CocoaPods, Swift Package Manager, Carthage"}}
{{partial:tab name="CocoaPods"}}
1. Add the dependency to your `Podfile`:

    ```bash
    pod 'AmplitudeSwift', '~> 1.0.0'
    ```
2. Run `pod install` in the project directory.
{{/partial:tab}}
{{partial:tab name="Swift Package Manager"}}
1. Navigate to `File` > `Swift Package Manager` > `Add Package Dependency`. This opens a dialog that allows you to add a package dependency. 
2. Enter the URL `https://github.com/amplitude/Amplitude-Swift` in the search bar. 
3. Xcode will automatically resolve to the latest version. Or you can select a specific version. 
4. Click the "Next" button to confirm the addition of the package as a dependency. 
5. Build your project to make sure the package is properly integrated.
{{/partial:tab}}
{{partial:tab name="Carthage"}}
Add the following line to your `Cartfile`.
```bash
github "amplitude/Amplitude-Swift" ~> 1.0.0
```
Check out the [Carthage docs](https://github.com/Carthage/Carthage#adding-frameworks-to-an-application) for more info.
{{/partial:tab}}
{{/partial:tabs}}

## Initialize the SDK

You must initialize the SDK before you can instrument. The API key for your Amplitude project is required.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let amplitude = Amplitude(configuration: Configuration(
    apiKey: AMPLITUDE_API_KEY
))
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:AMPLITUDE_API_KEY];
Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];
```
{{/partial:tab}}
{{/partial:tabs}}

## Configure the SDK

{{partial:collapse name="Configuration options"}}
| Name                           | Description                                                                                                                                                                                                 | Default Value                            |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `apiKey`                       | The apiKey of your project.                                                                                                                                                                                 | `nil`                                    |
| `instanceName`                 | The name of the instance. Instances with the same name will share storage and identity. For isolated storage and identity use a unique `instanceName` for each instance.                                    | "default_instance"                       |
| `storageProvider`              | Implements a custom `storageProvider` class from `Storage`. Not supported in Objective-C.                                                                                                                   | `PersistentStorage`                      |
| `logLevel`                     | The log level enums: `LogLevelEnum.OFF`, `LogLevelEnum.ERROR`, `LogLevelEnum.WARN`, `LogLevelEnum.LOG`, `LogLevelEnum.DEBUG`                                                                                | `LogLevelEnum.WARN`                      |
| `loggerProvider`               | Implements a custom `loggerProvider` class from the Logger, and pass it in the configuration during the initialization to help with collecting any error messages from the SDK in a production environment. | `ConsoleLogger`                          |
| `flushIntervalMillis`          | The amount of time SDK will attempt to upload the unsent events to the server or reach `flushQueueSize` threshold.                                                                                          | `30000`                                  |
| `flushQueueSize`               | SDK will attempt to upload once unsent event count exceeds the event upload threshold or reach `flushIntervalMillis` interval.                                                                              | `30`                                     |
| `flushMaxRetries`              | Maximum retry times.                                                                                                                                                                                        | `5`                                      |
| `minIdLength`                  | The minimum length for user id or device id.                                                                                                                                                                | `5`                                      |
| `partnerId`                    | The partner id for partner integration.                                                                                                                                                                     | `nil`                                    |
| `identifyBatchIntervalMillis`  | The amount of time SDK will attempt to batch intercepted identify events.                                                                                                                                   | `30000`                                  |
| `flushEventsOnClose`           | Flushing of unsent events on app close.                                                                                                                                                                     | `true`                                   |
| `callback`                     | Callback function after event sent.                                                                                                                                                                         | `nil`                                    |
| `optOut`                       | Opt the user out of tracking.                                                                                                                                                                               | `false`                                  |
| ~`defaultTracking`~ (Deprecated. Use [`autocapture`](#autocapture) instead.)             | Enable tracking of default events for sessions, app lifecycles, screen views, and deep links.                                                                                    | `DefaultTrackingOptions(sessions: true)` |
| `autocapture`             | Enable tracking of [Autocapture events](#autocapture) for sessions, app lifecycles, screen views, deep links, and element interactions.                                                                                    | `AutocaptureOptions.sessions` |
| `minTimeBetweenSessionsMillis` | The amount of time for session timeout.                                                                                                                                                                     | `300000`                                 |
| `serverUrl`                    | The server url events upload to.                                                                                                                                                                            | `https://api2.amplitude.com/2/httpapi`   |
| `serverZone`                   | The server zone to send to, will adjust server url based on this config.                                                                                                                                    | `US`                                     |
| `useBatch`                     | Whether to use batch api.                                                                                                                                                                                   | `false`                                  |
| `trackingOptions`              | Options to control the values tracked in SDK.                                                                                                                                                               | `enable`                                 |
| `enableCoppaControl`           | Whether to enable COPPA control for tracking options.                                                                                                                                                       | `false`                                  |
| `migrateLegacyData`            | Available in `0.4.7`+. Whether to migrate [maintenance SDK](../ios) data (events, user/device ID).                                                                                                          | `true`                                   |
| `offline`                      | Available in `1.2.0+`. Whether the SDK is connected to network. Learn more [here](./#offline-mode).                                                                                                         | `false`                                  |

{{/partial:collapse}}

## Track events

Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to note.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}

```swift
let event = BaseEvent(
    eventType: "Button Clicked", 
    eventProperties: ["my event prop key": "my event prop value"]
)
amplitude.track(event: event)
```

{{/partial:tab}}
{{partial:tab name="Obj-c"}}

```objc
AMPBaseEvent* event = [AMPBaseEvent initWithEventType:@"Button Clicked"
    eventProperties:@{@"my event prop key": @"my event prop value"}];

[amplitude track:event];
```
{{/partial:tab}}
{{/partial:tabs}}

Another way to instrument basic tracking event.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}

```swift
amplitude.track(
    eventType: "Button Clicked",
    eventProperties: ["my event prop key": "my event prop value"]
)
```

{{/partial:tab}}
{{partial:tab name="Obj-c"}}

```objc
[amplitude track:@"Button Clicked" eventProperties:@{
    @"my event prop key": @"my event prop value"
}];
```
{{/partial:tab}}
{{/partial:tabs}}

## Identify

{{partial:admonition type="note" heading=""}}
Starting from release v0.4.0, identify events with only set operations will be batched and sent with fewer events. This change won't affect running the set operations. There is a config `identifyBatchIntervalMillis` for managing the interval to flush the batched identify intercepts.
{{/partial:admonition}}

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties. Declare the operations via a provided Identify interface. You can chain together multiple operations in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.


{{partial:admonition type="note" heading=""}}
If the Identify call is sent after the event, the results of operations will be visible immediately in the dashboard user's profile area, but it will not appear in chart result until another event is sent after the Identify call. The identify call only affects events going forward. More details [here](/docs/data/user-properties-and-events).
{{/partial:admonition}}

You can handle the identity of a user using the identify methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms. Send an identify call containing those user property operations to Amplitude server to tie a user's events with specific user properties.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let identify = Identify()
identify.set(property: "color", value: "green")
amplitude.identify(identify: identify)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPIdentify* identify = [AMPIdentify new];
[identify set:@"color" value:@"green"];
[amplitude identify:identify];
```
{{/partial:tab}}
{{/partial:tabs}}

## Autocapture <a id="track-default-events"></a>

Starting from release v1.8.0, the SDK is able to track more events without manual instrumentation. It can be configured to track the following events automatically:

- Sessions
- App lifecycles
- Screen views
- Element interactions

{{partial:collapse name="Autocapture options"}}
| Name | Type | Set by Default | Description |
| --- | --- | --- | --- |
| `sessions` | `AutocaptureOptions` | Yes | Enables session tracking. If the option is set, Amplitude tracks session start and session end events otherwise, Amplitude doesn't track session events. When this setting isn't set, Amplitude tracks `sessionId` only. See [Track sessions](#track-sessions) for more information. |
| `appLifecycles` | `AutocaptureOptions` | No | Enables application lifecycle events tracking. If the option is set, Amplitude tracks application installed, application updated, application opened, and application backgrounded events. Event properties tracked include: `[Amplitude] Version`, `[Amplitude] Build`, `[Amplitude] Previous Version`, `[Amplitude] Previous Build`, `[Amplitude] From Background`. See [Track application lifecycles](#track-application-lifecycles) for more information. |
| `screenViews` | `AutocaptureOptions` | No | Enables screen views tracking. If the option is set, Amplitude tracks screen viewed events. Event properties tracked include: `[Amplitude] Screen Name`. See [Track screen views](#track-screen-views) for more information. |
| `elementInteractions` | `AutocaptureOptions` | No | Enables element interaction tracking. If the option is set, Amplitude tracks user interactions with `UIControl` element and `UIGestureRecognizer`. Event properties tracked include: `[Amplitude] Action`, `[Amplitude] Target View Class`, `[Amplitude] Target Text`, `[Amplitude] Action Method`, `[Amplitude] Gesture Recognizer`, `[Amplitude] Hierarchy`, `[Amplitude] Accessibility Identifier`, `[Amplitude] Accessibility Label`, `[Amplitude] Screen Name`. See [Track element interactions](#track-element-interactions) for more information. |

{{/partial:collapse}}

You can configure Amplitude to start tracking Autocapture events. Otherwise, you can omit the configuration to keep only session tracking enabled.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
The `autocapture` configuration accepts an [`OptionSet`](https://developer.apple.com/documentation/swift/optionset){:target="_blank"} with `AutocaptureOptions` values.
```swift
let amplitude = Amplitude(configuration: Configuration(
    apiKey: "API_KEY",
    autocapture: [.sessions, .appLifecycles, .screenViews, .elementInteractions]
))
```
By default, if the `autocapture` configuration isn't explicitly set during `Configuration` initialization, `configuration.autocapture` will automatically include `AutocaptureOptions.sessions`.

If you want to prevent automatic session events capture, set `autocapture` without the `AutocaptureOptions.sessions` option.
```swift
let amplitude = Amplitude(configuration: Configuration(
    apiKey: "API_KEY",
    autocapture: .appLifecycles 	// or use `[]` to disable Autocapture.
))
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
The `autocapture` configuration accepts an `Array` of `AutocaptureOptions` values.
```objc
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:@"API_KEY"];
configuration.autocapture = [[AMPAutocaptureOptions alloc] initWithOptionsToUnion:@[
    AMPAutocaptureOptions.sessions,
    AMPAutocaptureOptions.appLifecycles,
    AMPAutocaptureOptions.screenViews,
    AMPAutocaptureOptions.elementInteractions
]];
Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];
```
By default, if the `autocapture` configuration isn't explicitly set during `Configuration` initialization, `configuration.autocapture` will automatically include `AutocaptureOptions.sessions`.

If you want to prevent automatic session events capture, set `autocapture` without the `AutocaptureOptions.sessions` option.
```objc
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:@"API_KEY"];
configuration.autocapture = [[AMPAutocaptureOptions alloc] initWithOptionsToUnion:@[AMPAutocaptureOptions.appLifecycles]];   // or use an empty array to disable Autocapture.
Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];
```
{{/partial:tab}}
{{/partial:tabs}}

### Track sessions

Amplitude enables session tracking by default. Include `AutocaptureOptions.sessions` in the `autocapture` configuration to explicitly configure the SDK to track session events or to enable session event tracking along with other Autocapture configurations.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let amplitude = Amplitude(configuration: Configuration(
    apiKey: "API_KEY",
    autocapture: .sessions
))
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:@"API_KEY"];
configuration.autocapture = [[AMPAutocaptureOptions alloc] initWithOptionsToUnion:@[AMPAutocaptureOptions.sessions]];
Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];
```
{{/partial:tab}}
{{/partial:tabs}}

For more information about session tracking, see [User sessions](#user-sessions).

{{partial:admonition type="note" heading=""}}
`trackingSessionEvents` is deprecated and replaced with the `AutocaptureOptions.sessions` option of the `autocapture` configuration.
{{/partial:admonition}}

### Track application lifecycles

You can enable Amplitude to start tracking application lifecycle events by including `AutocaptureOptions.appLifecycles` in the `autocapture` configuration.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let amplitude = Amplitude(configuration: Configuration(
    apiKey: "API_KEY",
    autocapture: .appLifecycles
))
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:@"API_KEY"];
configuration.autocapture = [[AMPAutocaptureOptions alloc] initWithOptionsToUnion:@[AMPAutocaptureOptions.appLifecycles]];
Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];
```
{{/partial:tab}}
{{/partial:tabs}}

When you enable this setting, Amplitude tracks the following events:

- `[Amplitude] Application Installed`, this event fires when a user opens the application for the first time right after installation, by observing the `UIApplicationDidFinishLaunchingNotification` notification underneath.
- `[Amplitude] Application Updated`, this event fires when a user opens the application after updating the application, by observing the `UIApplicationDidFinishLaunchingNotification` notification underneath.
- `[Amplitude] Application Opened`, this event fires when a user launches or foregrounds the application after the first open, by observing the `UIApplicationDidFinishLaunchingNotification` or `UIApplicationWillEnterForegroundNotification` notification underneath.
- `[Amplitude] Application Backgrounded`, this event fires when a user backgrounds the application, by observing the `UIApplicationDidEnterBackgroundNotification` notification underneath.

### Track screen views

You can enable Amplitude to start tracking screen view events by including `AutocaptureOptions.screenViews` in the `autocapture` configuration.

{{partial:admonition type="warning" heading=""}}
This feature is supported in UIKit. For SwiftUI, track the corresponding event manually.
{{/partial:admonition}}

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
// UIKit
let amplitude = Amplitude(configuration: Configuration(
    apiKey: "API_KEY",
    autocapture: .screenViews
))

// Swift UI
let amplitude = Amplitude(configuration: Configuration(
    apiKey: "API_KEY",
    autocapture: []
))
amplitude.track(ScreenViewedEvent(screenName: "Screen Name"))
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
// UIKit
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:@"API_KEY"];
configuration.autocapture = [[AMPAutocaptureOptions alloc] initWithOptionsToUnion:@[AMPAutocaptureOptions.screenViews]];
Amplitude* amplitude = [Amplitude initWithConfiguration:screenViews];

// Swift UI
configuration.autocapture = [[AMPAutocaptureOptions alloc] initWithOptionsToUnion:@[]];
[amplitude track:[AMPScreenViewedEvent initWithScreenName:@"Screen Name"]];
```
{{/partial:tab}}
{{/partial:tabs}}

When you enable this setting, Amplitude tracks the `[Amplitude] Screen Viewed` event with the screen name property. Amplitude reads this value from the controller class metadata `viewDidAppear` method swizzling.

### Track deep links

Deeplink tracking isn't automated. To track deeplinks, track the corresponding events.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let amplitude = Amplitude(configuration: Configuration(
    apiKey: "API_KEY"
))

amplitude.track(DeepLinkOpenedEvent(url: URL()))
amplitude.track(DeepLinkOpenedEvent(url: "url", referrer:"referrer"))
amplitude.track(DeepLinkOpenedEvent(activity: activity))
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:@"API_KEY"];
Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];

[amplitude track:[AMPDeepLinkOpenedEvent initWithUrl:@"url"]];
[amplitude track:[AMPDeepLinkOpenedEvent initWithUrl:@"url" referrer:@"referrer"]];
[amplitude track:[AMPDeepLinkOpenedEvent initWithActivity:activity]];
```
{{/partial:tab}}
{{/partial:tabs}}

Amplitude tracks the `[Amplitude] Deep Link Opened` event with the URL and referrer information.

### Track element interactions

Amplitude can track user interactions with `UIControl` elements and `UIGestureRecognizer` objects in `UIKit` applications. To enable this option, include `AutocaptureOptions.elementInteractions` in the `autocapture` configuration.

{{partial:admonition type="note" heading=""}}
The `AutocaptureOptions.elementInteractions` option is experimental. Try it out and share your thoughts on our [GitHub](https://github.com/amplitude/Amplitude-Swift).
{{/partial:admonition}}

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let amplitude = Amplitude(configuration: Configuration(
    apiKey: "API_KEY",
    autocapture: .elementInteractions
))
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:@"API_KEY"];
configuration.autocapture = [[AMPAutocaptureOptions alloc] initWithOptionsToUnion:@[AMPAutocaptureOptions.elementInteractions]];
Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];
```
{{/partial:tab}}
{{/partial:tabs}}

After enabling this setting, Amplitude will track the `[Amplitude] Element Interacted` event whenever a user interacts with an element in the application. The SDK swizzles the `UIApplication.sendAction(_:to:from:for:)` method and the `UIGestureRecognizer.state` property setter to instrument `UIControl` action methods and `UIGestureRecognizer` within the application, respectively.

{{partial:admonition type="info" heading=""}}
Currently, Amplitude does not supports tracking user interactions with UI elements in SwiftUI.
{{/partial:admonition}}

## User groups

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, then the count includes the group.

For example, you want to group your users based on what organization they're in by using an 'orgId'. Joe is in 'orgId' '10', and Sue is in 'orgId' '15'. Sue and Joe both perform a certain event. You can query their organizations in the Event Segmentation Chart.

When setting groups, define a `groupType` and `groupName`. In the previous example, 'orgId' is the `groupType` and '10' and '15' are the values for `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'.

 Setting a group also sets the `groupType:groupName` as a user property, and overwrites any existing `groupName` value set for that user's groupType, and the corresponding user property value. `groupType` is a string, and `groupName` can be either a string or an array of strings to indicate that a user is in multiple groups.

 {{partial:admonition type="example" heading=""}}
 If Joe is in 'orgId' '15', then the `groupName` would be '15'.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
// set group with a single group name
amplitude.setGroup(groupType: "orgId", groupName: "15")
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
// set group with a single group name
[amplitude setGroup:@"orgId" groupName:@"15"];
```
{{/partial:tab}}
{{/partial:tabs}}

If Joe is in 'orgId' 'sport', then the `groupName` would be '["tennis", "soccer"]'.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
// set group with multiple group names
amplitude.setGroup(groupType: "sport", groupName: ["tennis", "soccer"])
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
// set group with multiple group names
[amplitude setGroup:@"sport" groupNames:@[@"tennis", @"soccer"]];
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:admonition}}

You can also set **event-level groups** by passing an `Event` Object with `groups` to `track`. With event-level groups, the group designation applies only to the specific event being logged, and doesn't persist on the user unless you explicitly set it with `setGroup`.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
amplitude.track(
    event: BaseEvent(
        eventType: "event type",
        eventProperties: [
            "eventPropertyKey": "eventPropertyValue"
        ], 
        groups: ["orgId": "15"]
    )
)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPBaseEvent* event = [AMPBaseEvent initWithEventType:@"event type"
    eventProperties:@{@"eventPropertyKey": @"eventPropertyValue"}];
[event.groups set:@"orgId" value:@"15"];
[amplitude track:event];
```
{{/partial:tab}}
{{/partial:tabs}}

## Group identify

Use the Group Identify API to set or update the properties of particular groups. Keep these considerations in mind:

- Updates affect only future events, and don't update historical events.
- You can track up to 5 unique group types and 10 total groups.

The `groupIdentify` method accepts a group type string parameter and group name object parameter, and an Identify object that's applied to the group.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let groupType = "plan"
let groupName = "enterprise"
let identify = Identify().set(property: "key", value: "value")
amplitude.groupIdentify(groupType: groupType, groupName: groupProperty, identify: identify)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
NSString* groupType = @"plan";
NSString* groupName = @"enterprise";
AMPIdentify* identify = [AMPIdentify new];
[identify set:@"key" value:@"value"];
[amplitude groupIdentify:groupType groupName:groupName identify:identify];
```
{{/partial:tab}}
{{/partial:tabs}}

## Track revenue

Amplitude can track revenue generated by a user. Revenue is tracked through distinct revenue objects, which have special fields that are used in Amplitude's Event Segmentation and Revenue LTV charts. This allows Amplitude to automatically display data relevant to revenue in the platform. Revenue objects support the following special properties, as well as user-defined properties through the `eventProperties` field.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let revenue = Revenue()
revenue.price = 3.99
revenue.quantity = 3
revenue.productId = "com.company.productId"
amplitude.revenue(revenue: revenue)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPRevenue* revenue = [AMPRevenue new];
revenue.price = 3.99;
revenue.quantity = 3;
revenue.productId = @"com.company.productId";
[amplitude revenue:revenue];
```
{{/partial:tab}}
{{/partial:tabs}}

| Name   | Description  |
| --- | --- |
| `productId` | Optional. String. An identifier for the product. Amplitude recommends something like the Google Play Store product ID. Defaults to `null`.|
| `quantity `| Required. Integer. The quantity of products purchased. Note: revenue = quantity * price. Defaults to 1 |
| `price `| Required. Double. The price of the products purchased, and this can be negative. Note: revenue = quantity * price. Defaults to `null`.|
| `revenueType`| Optional, but required for revenue verification. String. The revenue type (for example, tax, refund, income). Defaults to `null`.|
| `receipt`| Optional. String. The receipt identifier of the revenue. For example, "123456". Defaults to `null`. |
| `receiptSignature`| Optional, but required for revenue verification. String. Defaults to `null`. |

## Custom user ID

If your app has its login system that you want to track users with, you can call `setUserId` at any time.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
amplitude.setUserId(userId: "user@amplitude.com")
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
[amplitude setUserId:@"user@amplitude.com"];
```
{{/partial:tab}}
{{/partial:tabs}}

## Custom device ID

You can assign a new device ID using `deviceId`. When setting a custom device ID, make sure the value is sufficiently unique. Amplitude recommends using a UUID.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
amplitude.setDeviceId(NSUUID().uuidString)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
[amplitude setDeviceId:[[NSUUID UUID] UUIDString]];
```
{{/partial:tab}}
{{/partial:tabs}}

## Custom storage

{{partial:admonition type="warning" heading="Swift only"}}
This feature supports Swift, but not Objective C
{{/partial:admonition}}

If you don't want to store the data in the Amplitude-defined location, you can customize your own storage by implementing the [Storage protocol](https://github.com/amplitude/Amplitude-Swift/blob/211d0c05830fab47e74fa9a053615cf422618a02/Sources/Amplitude/Types.swift#L62-L86) and setting the `storageProvider` in your configuration.

Every iOS app gets a slice of storage just for itself, meaning that you can read and write your app's files there without worrying about colliding with other apps. By default, Amplitude uses this file storage and creates an "amplitude" prefixed folder inside the app "Documents" directory. However, if you need to expose the Documents folder in the native iOS "Files" app and don't want expose "amplitude" prefixed folder, you can customize your own storage provider to persist events on initialization.

```swift
Amplitude(
    configuration: Configuration(
        apiKey: AMPLITUDE_API_KEY,
        storageProvider: YourOwnStorage() // YourOwnStorage() should implement Storage
    )
)
```

## Reset when the user logs out

`reset` is a shortcut to anonymize users after they log out, by:

* setting `userId` to `null`
* setting `deviceId` to a new value based on current configuration

With an empty `userId` and a completely new `deviceId`, the current user would appear as a brand new user in dashboard.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
amplitude.reset()
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
[amplitude reset];
```
{{/partial:tab}}
{{/partial:tabs}}

## Plugins

Plugins enable you to extend Amplitude SDK's behavior by, for example, modifying event properties (enrichment type) or sending to third-party APIs (destination type). A plugin is an object with methods `setup()` and `execute()`.

### Plugin.setup

This method contains logic for preparing the plugin for use and has `amplitude` instance as a parameter. A typical use for this method, is to instantiate plugin dependencies. This method is called when the plugin is registered to the client via `amplitude.add()`.

### Plugin.execute

This method contains the logic for processing events and has `event` instance as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event. If used as a destination type plugin, the expected return value is `null`. This method is called for each event, including Identify, GroupIdentify and Revenue events, that's instrumented using the client interface.

### Enrichment type plugin example

Here's an example of a plugin that modifies each event that's instrumented by adding extra event property.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
class EnrichmentPlugin: Plugin {
    let type: PluginType
    var amplitude: Amplitude?

    init() {
        self.type = PluginType.enrichment
    }

    func setup(amplitude: Amplitude) {
        self.amplitude = amplitude
    }

    func execute(event: BaseEvent?) -> BaseEvent? {
        event?.sessionId = -1
        if event?.eventProperties == nil {
            event?.eventProperties = [:]
        }
        event?.eventProperties?["event prop key"] = "event prop value"
        return event
    }
}

amplitude.add(plugin: EnrichmentPlugin())
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
[amplitude add:[AMPPlugin initWithType:AMPPluginTypeEnrichment
    execute:^AMPBaseEvent* _Nullable(AMPBaseEvent* _Nonnull event) {
    event.sessionId = -1;
    [event.eventProperties set:@"event prop key" value:@"event prop value"];
    return event;
}]];
```
{{/partial:tab}}
{{/partial:tabs}}

### Destination type plugin example

In destination plugins, you can overwrite the `track()`, `identify()`, `groupIdentify()`, `revenue()`, and `flush()` functions.

{{partial:admonition type="warning" heading="Objective-C not supported"}}
Objective-C supports `flush()` and general `execute()` functions.
{{/partial:admonition}}

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
class TestDestinationPlugin: DestinationPlugin {
    override func track(event: BaseEvent) -> BaseEvent? {
        return event
    }

    override func identify(event: IdentifyEvent) -> IdentifyEvent? {
        return event
    }

    override func groupIdentify(event: GroupIdentifyEvent) -> GroupIdentifyEvent? {
        return event
    }

    override func revenue(event: RevenueEvent) -> RevenueEvent? {
        return event
    }

    override func flush() {
    }

    override func setup(amplitude: Amplitude) {
        self.amplitude = amplitude
    }

    override func execute(event: BaseEvent?) -> BaseEvent? {
        return event
    }
}
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
[amplitude add:[AMPPlugin initWithType:AMPPluginTypeDestination
    execute:^AMPBaseEvent* _Nullable(AMPBaseEvent* _Nonnull event) {
    if ([event.eventType isEqualToString:@"$identify"]) {
        // ...
    } else if ([event.eventType isEqualToString:@"$groupidentify"]) {
        // ...
    } else if ([event.eventType isEqualToString:@"revenue_amount"]) {
        // ...
    } else {
        // ...
    }
    return nil;
} flush:^() {
    // ...
}]];
```
{{/partial:tab}}
{{/partial:tabs}}

## Troubleshooting and debugging

Ensure that the configuration and payload are accurate and check for any unusual messages during the debugging process. If everything appears to be right, check the value of `flushQueueSize` or `flushIntervalMillis`. Events are queued and sent in batches by default, which means they are not immediately dispatched to the server. Ensure that you have waited for the events to be sent to the server before checking for them in the charts.

### Log

- Set the log level to debug to collect useful information during debugging.
- Customize `loggerProvider` class from the `LoggerProvider` and implement your own logic, such as logging error message in server in a production environment.

### Plugin

Take advantage of a Destination Plugin to print out the configuration value and event payload before sending them to the server. You can set the logLevel to debug, copy the following `TroubleShootingPlugin` into your project, add the plugin into the Amplitude instance.

[SwiftUI TroubleShootingPlugin example](https://github.com/amplitude/Amplitude-Swift/tree/main/Examples/AmplitudeSwiftUIExample/AmplitudeSwiftUIExample/ExamplePlugins/TroubleShootingPlugin.swift).

### Event callback

The event callback executes after the event is sent, for both successful and failed events. Use this method to monitor the event status and message. For more information, see [configuration > callback](#configuration).

## Advanced topics

### User sessions

Amplitude starts a session when the app is brought into the foreground or when an event is tracked in the background. A session ends when the app remains in the background for more than the time set by `setMinTimeBetweenSessionsMillis()` without any event being tracked. Note that a session will continue for the entire time the app is in the foreground no matter whether session tracking is enabled by `configuration.defaultTracking`, `configuration.autocapture` or not. 

When the app enters the foreground, Amplitude tracks a session start, and starts a countdown based on `setMinTimeBetweenSessionsMillis()`. Amplitude extends the session and restarts the countdown any time it tracks a new event. If the countdown expires, Amplitude waits until the next event to track a session end event.

Amplitude doesn't set user properties on session events by default. To add these properties, use `identify()` and `setUserId()`. Amplitude aggregates the user property state and associates the user with events based on `device_id` or `user_id`.

Due to the way in which Amplitude manages sessions, there are scenarios where the SDK works expected but it may appear as if events are missing or session tracking is inaccurate:

* If a user doesn't return to the app, Amplitude does not track a session end event to correspond with a session start event.
* If you track an event in the background, it's possible that Amplitude perceives the session length to be longer than the user spends on the app in the foreground.
* If you modify user properties between the last event and the session end event, the session end event reflects the updated user properties, which may differ from other properties associated with events in the same session. To address this, use an enrichment plugin to set `event['$skip_user_properties_sync']` to `true` on the session end event, which prevents Amplitude from synchronizing properties for that specific event. See [$skip_user_properties_sync](/docs/data/converter-configuration-reference/#skip_user_properties_sync) in the Converter Configuration Reference article to learn more.

Amplitude groups events together by session. Events that are logged within the same session have the same `session_id`. Sessions are handled automatically so you don't have to manually call `startSession()` or `endSession()`.

You can adjust the time window for which sessions are extended. The default session expiration time is five minutes.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let amplitude = Amplitude(
    configuration: Configuration(
        apiKey: AMPLITUDE_API_KEY,
        minTimeBetweenSessionsMillis: 1000
    )
)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:AMPLITUDE_API_KEY];
configuration.minTimeBetweenSessionsMillis = 1000;
Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="note" heading=""}}
`trackingSessionEvents` is deprecated and replaced with the `AutocaptureOptions.sessions` option of `autocapture`.
{{/partial:admonition}}

You can also track events as out-of-session. Out-of-session events have a `sessionId` of `-1` and behave as follows:

   1. Aren't part of the current session.
   2. Don't extend the current session.
   3. Don't start a new session.
   4. Don't change the `sessionId` for subsequent events.

A potential use case is for events tracked from push notifications, which are usually external to the customers app usage.

Set the `sessionId` to `-1` in `EventOptions` to mark an event as out-of-session  when you call `track(event, options)` or `identify(identify, options)`.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let outOfSessionOptions = EventOptions(sessionId: -1)

amplitude.identify(
    event: Identify().set(property: "user-prop", value: true),
    options: outOfSessionOptions
)

amplitude.track(
    event: BaseEvent(eventType: "Button Clicked"),
    options: outOfSessionOptions
)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPEventOptions* outOfSessionOptions = [AMPEventOptions new];
outOfSessionOptions.sessionId = -1;

AMPIdentify* identify = [AMPIdentify new];
[identify set:@"user-prop" value:YES];
[amplitude identify:identify options:outOfSessionOptions];

AMPBaseEvent* event = [AMPBaseEvent initWithEventType:@"Button Clicked"];
[amplitude track:event options:outOfSessionOptions];
```
{{/partial:tab}}
{{/partial:tabs}}

### Log level

control the level of logs that print to the developer console.

- 'OFF': Suppresses all log messages.
- 'ERROR': Shows error messages only.
- 'WARN': Shows error messages and warnings. This level logs issues that might be a problem and cause some oddities in the data. For example, this level would display a warning for properties with null values.
- 'LOG': Shows informative messages about events.
- 'DEBUG': Shows error messages, warnings, and informative messages that may be useful for debugging.

Set the log level `logLevel` with the level you want.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let amplitude = Amplitude(configuration: Configuration(
    apiKey: AMPLITUDE_API_KEY,
    logLevel: LogLevelEnum.LOG
))
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:AMPLITUDE_API_KEY];
configuration.logLevel = AMPLogLevelLOG;
Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];
```
{{/partial:tab}}
{{/partial:tabs}}

Amplitude [merges user data](/docs/cdp/sources/instrument-track-unique-users), so any events associated with a known `userId` or `deviceId` are linked the existing user.
 If a user logs out, Amplitude can merge that user's logged-out events to the user's record. You can change this behavior and log those events to an anonymous user instead.

To log events to an anonymous user:

1. Set the `userId` to null.
2. Generate a new `deviceId`.

Events coming from the current user or device appear as a new user in Amplitude. Note: If you do this, you can't see that the two users were using the same device.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
amplitude.reset()
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
[amplitude reset];
```
{{/partial:tab}}
{{/partial:tabs}}

### Disable tracking

By default the iOS SDK tracks several user properties such as `carrier`, `city`, `country`, `ip_address`, `language`, and `platform`.
Use the provided `TrackingOptions` interface to customize and toggle individual fields.
Before initializing the SDK with your apiKey, create a `TrackingOptions` instance with your configuration and set it on the SDK instance.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let trackingOptions = TrackingOptions()
trackingOptions.disableTrackCity().disableTrackIpAddress()
let amplitude = Amplitude(
    configuration: Configuration(
        apiKey: AMPLITUDE_API_KEY,
        trackingOptions: trackingOptions
    )
)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:AMPLITUDE_API_KEY];
[configuration.trackingOptions disableTrackCity];
[configuration.trackingOptions disableTrackIpAddress];
Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];
```
{{/partial:tab}}
{{/partial:tabs}}

Tracking for each field can be individually controlled, and has a corresponding method (for example, `disableCountry`, `disableLanguage`).

| Method | Description |
| --- | --- |
| `disableTrackCarrier()` | Disable tracking of device's carrier |
| `disableTrackCity()` | Disable tracking of user's city |
| `disableTrackCountry()` | Disable tracking of user's country |
| `disableTrackDeviceModel()` | Disable tracking of device model|
| `disableTrackDeviceManufacturer()` | Disable tracking of device manufacturer |
| `disableTrackDMA()` | Disable tracking of user's designated market area (DMA) |
| `disableTrackIpAddress()` | Disable tracking of user's IP address |
| `disableTrackLanguage()` | Disable tracking of device's language |
| `disableTrackIDFV()` |  | Disable tracking of identifier for vendors (IDFV) |
| `disableTrackOsName()` | Disable tracking of device's OS Name |
| `disableTrackOsVersion()` | Disable tracking of device's OS Version |
| `disableTrackPlatform()` | Disable tracking of device's platform |
| `disableTrackRegion()` | Disable tracking of user's region |
| `disableTrackVersionName()` | Disable tracking of your app's version name |

{{partial:admonition type="note" heading=""}}
Using `TrackingOptions` only prevents default properties from being tracked on newly created projects, where data has not yet been sent. If you have a project with existing data that you want to stop collecting the default properties for, get help in the [Amplitude Community](https://community.amplitude.com/?utm_source=devdocs&utm_medium=helpcontent&utm_campaign=devdocswebsite). Disabling tracking doesn't delete any existing data in your project.
{{/partial:admonition}}

### Carrier

Amplitude determines the user's mobile carrier using [`CTTelephonyNetworkInfo`](https://developer.apple.com/documentation/coretelephony/cttelephonynetworkinfo), which returns the registered operator of the `sim`.

### COPPA control

COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking can all be enabled or disabled at one time. Apps that ask for information from children under 13 years of age must comply with COPPA.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let amplitude = Amplitude(
    configuration: Configuration(
        apiKey: AMPLITUDE_API_KEY,
        enableCoppaControl: true
    )
)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:AMPLITUDE_API_KEY];
configuration.enableCoppaControl = true;
Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];
```
{{/partial:tab}}
{{/partial:tabs}}

### Advertiser ID

Advertiser ID (also referred to as IDFA) is a unique identifier provided by the iOS and Google Play stores. As it's unique to every person and not just their devices, it's useful for mobile attribution.

[Mobile attribution](https://www.adjust.com/blog/mobile-ad-attribution-introduction-for-beginners/) is the attribution of an installation of a mobile app to its original source (such as ad campaign, app store search). Mobile apps need permission to ask for IDFA, and apps targeted to children can't track at all. Consider using IDFV, device ID, or an email login system when IDFA isn't available.

To retrieve the IDFA and add it to the tracking events, you can follow this [example plugin](https://github.com/amplitude/Amplitude-Swift/blob/main/Examples/AmplitudeSwiftUIExample/AmplitudeSwiftUIExample/ExamplePlugins/IDFACollectionPlugin.swift) to implement your own plugin.

### Device ID lifecycle

The SDK initializes the device ID in the following order, with the device ID being set to the first valid value encountered:

1. Device ID of Amplitude instance if it’s set by `setDeviceId()`
2. IDFV if it exists
3. A randomly generated UUID string

#### One user with multiple devices

A single user may have multiple devices, each having a different device ID. To ensure coherence, set the user ID consistently across all these devices. Even though the device IDs differ, Amplitude can still merge them into a single Amplitude ID, thus identifying them as a unique user.

#### Transfer to a new device

It's possible for multiple devices to have the same device ID when a user switches to a new device. When transitioning to a new device, users often transfer their applications along with other relevant data. The specific transferred content may vary depending on the application. In general, it includes databases and file directories associated with the app. However, the exact items included depend on the app's design and the choices made by the developers. If databases or file directories have been backed up from one device to another, the device ID stored within them may still be present. Consequently, if the SDK attempts to retrieve it during initialization, different devices might end up using the same device ID.

#### Get device ID

Use the helper method `getDeviceId()` to get the value of the current `deviceId`.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let deviceId = amplitude.getDeviceId()
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
NSString* deviceId = [amplitude getDeviceId];
```
{{/partial:tab}}
{{/partial:tabs}}

To set the device, see [custom device ID](#custom-device-id).

### Location tracking

Amplitude converts the IP of a user event into a location (GeoIP lookup) by default. This information may be overridden by an app's own tracking solution or user data.

### Opt users out of tracking

Users may wish to opt out of tracking entirely, which means Amplitude doesn't track any of their events or browsing history. `OptOut` provides a way to fulfill a user's requests for privacy.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let amplitude = Amplitude(
    configuration: Configuration(
        apiKey: AMPLITUDE_API_KEY,
        optOut: true
    )
)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:AMPLITUDE_API_KEY];
configuration.optOut = true;
Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];
```
{{/partial:tab}}
{{/partial:tabs}}

### Set log callback

Implements a customized `loggerProvider` class from the LoggerProvider, and pass it in the configuration during the initialization to help with collecting any error messages from the SDK in a production environment.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
class SampleLogger: Logger {
    typealias LogLevel = LogLevelEnum

    var logLevel: Int

    init(logLevel: Int = LogLevelEnum.OFF.rawValue) {
        self.logLevel = logLevel
    }

    func error(message: String) {
        // TODO: handle error message
    }

    func warn(message: String) {
        // TODO: handle warn message
    }

    func log(message: String) {
        // TODO: handle log message
    }

    func debug(message: String) {
        // TODO: handle debug message
    }
}

let amplitude = Amplitude(
    configuration: Configuration(
        apiKey: AMPLITUDE_API_KEY,
        loggerProvider: SampleLogger()
    )
)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:AMPLITUDE_API_KEY];
configuration.loggerProvider = ^(NSInteger logLevel, NSString* _Nonnull message) {
    switch(logLevel) {
    case AMPLogLevelERROR:
        // TODO: handle error message
        break;
    case AMPLogLevelWARN:
        // TODO: handle warn message
        break;
    case AMPLogLevelLOG:
        // TODO: handle log message
        break;
    case AMPLogLevelDEBUG:
        // TODO: handle debug message
        break;
    }
};
Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];
```
{{/partial:tab}}
{{/partial:tabs}}

### Security

iOS automatically protects application data by storing each apps data in its own secure directory. This directory is usually not accessible by other applications. However, if a device is jailbroken, apps are granted root access to all directories on the device. 

To prevent other apps from accessing your apps Amplitude data on a jailbroken device, Amplitude recommends setting a unique instance name for your SDK. This creates a unique database isolates it from other apps.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let amplitude = Amplitude(
    configuration: Configuration(
        apiKey: "API-KEY",
        instanceName: "my-unqiue-instance-name"
    )
)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:@"API-KEY"
                                                    instanceName:@"my-unqiue-instance-name"];
Amplitude* amplitude = [Amplitude instanceWithConfiguration:configuration];
```
{{/partial:tab}}
{{/partial:tabs}}

### Offline mode

Beginning with version 1.3.0, the Amplitude iOS Swift SDK supports offline mode. The SDK checks network connectivity every time it tracks an event. If the device is connected to network, the SDK schedules a flush. If not, it saves the event to storage. The SDK also listens for changes in network connectivity and flushes all stored events when the device reconnects.

To disable offline mode, add `offline: NetworkConnectivityCheckerPlugin.Disabled` on initialization as shown below.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let amplitude = Amplitude(
    configuration: Configuration(
        apiKey: "API-KEY",
        offline: NetworkConnectivityCheckerPlugin.Disabled
    )
)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```obj-c
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:AMPLITUDE_API_KEY];
configuration.offline = AMPNetworkConnectivityCheckerPlugin.Disabled;
Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];
```
{{/partial:tab}}
{{/partial:tabs}}

You can also implement you own offline logic:

1. Disable the default offline logic as above.
2. Toggle `amplitude.configuration.offline` by yourself.

### Apple privacy manifest

Starting December 8, 2020, Apple requires a privacy manifest file for all new apps and app updates. Apple expects to make this mandatory in the Spring of 2024. As Amplitude is a third-party to your app, you need to ensure you properly disclose to your users the ways you use Amplitude in regards to their data.

{{partial:admonition type="note" heading="Update the privacy manifest based on your app"}}
Amplitude sets privacy manifest based on a default configuration. Update the privacy manifest according to your configuration and your app.
{{/partial:admonition}}

#### NSPrivacyTracking

{{partial:admonition type="note" heading="Tracking definition"}}
Tracking refers to the act of linking user or device data collected from your app with user or device data collected from other companies' apps, websites, or offline properties for targeted advertising or advertising measurement purposes. For more information, see Apple's article [User privacy and data use](https://developer.apple.com/app-store/user-privacy-and-data-use/).
{{/partial:admonition}}

By default, Amplitude doesn't use data for tracking. Add this field and set it to true if your app does.

#### NSPrivacyCollectedDataTypes

| Date type | Linked to user | Used for tracking | Reason for collection | Where it's tracked |
| --------- | -------------- | ------------ | --------------------- | ------------------ |
|Product interaction|Yes|No|Analytics| Such as app launches, taps, clicks, scrolling information, music listening data, video views, saved place in a game, video, or song, or other information about how the user interacts with the app. |
|Device ID|Yes|No|Analytics| Tracked by default. Learn more [here](#device-id-lifecycle)  |
|Coarse Location|Yes|No|Analytics| Country, region, and city based on IP address. Amplitude doesn't collect them from device GPS or location features. |

By default the SDK tracks `deviceId` only. You can use `setUserId()` to track `userId` as well. To do so, add the "User ID" Data type. For more information about data types, see Apple's article [Describing data use in privacy manifests](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests).

#### NSPrivacyTrackingDomains

If you set `NSPrivacyTracking` to true then you need to provide at least one internet domain in `NSPrivacyTrackingDomains` based on your configuraiton. 

| Domain | Description |
| ------ | ----------- |
| https://api2.amplitude.com/2/httpapi | The default HTTP V2 endpoint. |
| https://api.eu.amplitude.com/2/httpapi | EU endpoint if `configuration.serverZone = EU`.|
| https://api2.amplitude.com/batch | Batch endpoint if `configuration.useBatch = true`.|
| https://api.eu.amplitude.com/batch | Batch EU endpoint if `configuration.useBatch = true` and `configuration.serverZone = EU`.|

#### NSPrivacyAccessedAPITypes

The SDK only uses `userDefaults` API for identity storage. 

#### Create your app's privacy report

Follow the steps on how to [create your app's privacy](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests#4239187).