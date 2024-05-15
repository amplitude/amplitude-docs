---
id: 06c84fb1-8d96-4042-863d-fce4619b48ed
blueprint: ios_sdk
title: 'iOS SDK Migration Guide'
sdk_status: current
article_type: migration
supported_languages:
  - swift
  - obj-c
sdk_version_comparison:
  -
    cells:
      - Feature
      - 'iOS Swift SDK (current)'
      - 'iOS SDK (maintenance)'
  -
    cells:
      - Package
      - AmplitudeSwift
      - Amplitude
  -
    cells:
      - Configuration
      - 'Configuration is implemented by the configuration object. Configurations need to be passed into Amplitude Object during initialization'
      - 'Supports specific setter methods.'
  -
    cells:
      - 'Logger provider'
      - '`ConsoleLogger()` by default'
      - '`AMPLITUDE_LOG` configured through a macro'
  -
    cells:
      - 'Storage provider'
      - '`PersistentStorage()` by default. File storage and iOS user’s defaults database. Fully customizable (not supported in Objective-C).'
      - 'SQLite database'
  -
    cells:
      - Customization
      - Plugins
      - MIddleware
  -
    cells:
      - 'Server endpoint'
      - 'Http v2 API'
      - 'Http v1 API'
  -
    cells:
      - 'Batch API support'
      - 'Yes, with configuration'
      - 'Not supported'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1715706346
---
The new version of Amplitude's iOS SDK (Amplitude-Swift) features a plugin architecture, built-in type definition and broader support for front-end frameworks. The new version isn't backwards compatible with Amplitude-iOS.

To migrate to Amplitude-Swift, update your dependencies and instrumentation.

## Terminiology

* `Amplitude-iOS`: Maintenance iOS SDK
* `Amplitude-Swift`: New iOS SDK

## Dependencies

{{partial:tabs tabs="CocoaPods, Swift Package Manaager, Carthage"}}
{{partial:tab name="CocoaPods"}}
Add `AmplitudeSwift` dependency to `Podfile`.

```diff
- pod 'Amplitude', '~> 8.14'
+ pod 'AmplitudeSwift', '~> 1.0'
```
{{/partial:tab}}
{{partial:tab name="Swift Package Manaager"}}
Enter `https://github.com/amplitude/Amplitude-Swift` into the search bar.

```diff
- `https://github.com/amplitude/Amplitude-iOS`
+ `https://github.com/amplitude/Amplitude-Swift`
```
{{/partial:tab}}
{{partial:tab name="Carthage"}}
Add `amplitude/Amplitude-Swift` to your `Cartfile`.

```diff
- github "amplitude/Amplitude-iOS" ~> 8.14
+ github "amplitude/Amplitude-Swift" ~> 1.0
```
{{/partial:tab}}
{{/partial:tabs}}

## Instrumentation changes

This SDK offers an API to instrument events. To migrate to the new SDK, you need to update a few calls. The following sections detail which calls have changed.

### Initialize the SDK

Like all other calls, instance() has been removed. Configuration is handled differently between the maintenance iOS and new iOS SDK. The new iOS SDKs use the Configuration object to set the configuration.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
import Amplitude //[tl! --]
import AmplitudeSwift //[tl! ++]

Amplitude.instance().trackingSessionEvents = true //[tl! --:1]
Amplitude.instance().initializeApiKey("YOUR-API-KEY")
let amplitude = Amplitude(configuration: Configuration( //[tl! ++:5]
    apiKey: "YOUR-API-KEY",
    defaultTracking: DefaultTrackingOptions(
        sessions: true
    )
))
```

{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
#import "Amplitude.h" //[tl! --]
@import AmplitudeSwift; //[tl! ++]

[Amplitude instance].trackingSessionEvents = true; //[tl! --:1]
[[Amplitude instance] initializeApiKey:@"YOUR-API-KEY"];
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:@"YOUR-API-KEY"]; //[tl! ++:2]
configuration.defaultTracking.sessions = true;
Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];
```
{{/partial:tab}}
{{/partial:tabs}}

### Configure the SDK

|Amplitude-iOS|Amplitude-Swift|
|-|-|
|`amplitude.instanceWithName("YOUR-INSTANCE-NAME")`|`config.instanceName`|
|`amplitude.useDynamicConfig`|NOT SUPPORTED.|
|`amplitude.setServerUrl("YOUR-SERVER-URL")`|`config.serverUrl`|
|`amplitude.setServerZone("AMPServerZone.EU or AMPServerZone.US")`|`config.serverZone`|
|`amplitude.trackingOptions`|`config.trackingOptions`|
|`amplitude.trackingSessionEvents`|`config.defaultTracking.sessions`|
|`amplitude.minTimeBetweenSessionsMillis`|`config.minTimeBetweenSessionsMillis`|
|`amplitude.eventUploadMaxBatchSize`|`config.flushQueueSize`|
|`amplitude.eventUploadThreshold`|`config.flushQueueSize`|
|`amplitude.eventUploadPeriodSeconds`|`config.flushIntervalMillis`|
|Set max retries count. NOT SUPPORTED.|`config.flushMaxRetries`|
|`amplitude.eventMaxCount`|NOT SUPPORTED.|
|`amplitude.optOut`|`config.optOut`|
|`amplitude.enableCoppaControl() or amplitude.disableCoppaControl()`|`config.enableCoppaControl`|
|Customize storage provider. NOT SUPPORTED.|`config.storageProvider`|
|Set up log level. NOT SUPPORTED.|`config.logLevel`|
|Customize logger provider. NOT SUPPORTED.|`config.loggerProvider`|
| `deviceId` and `userId` don't have a minimum length.| Minimum length is 5. `config.minIdLength` overwrites the minimum length  of`deviceId` and `userId`.|
|Partner Id for partner integrations. NOT SUPPORTED.|`config.partnerId`|
|The event callback. NOT SUPPORTED. See middleware. |`config.callback`|
|`amplitude.libraryName`|NOT SUPPORTED.|
|`amplitude.libraryVersion`|NOT SUPPORTED.|
|`amplitude.adSupportBlock`|NOT SUPPORTED. See [Plugins](#plugins).|
|`amplitude.useAdvertisingIdForDeviceId`|NOT SUPPORTED. See [Plugins](#plugins).|
|`amplitude.locationInfoBlock`|`amplitude.locationInfoBlock`|
|`amplitude.deferCheckInForeground`|NOT SUPPORTED.|
|`amplitude.setOffline(Yes)`|NOT SUPPORTED.|
|`amplitude.setContentTypeHeader("YOUR-CONTENT-TYPE-HEADER")`|NOT SUPPORTED.| 
|`amplitude.setPlan(plan)`|`config.plan`|
|`plan.setBranch("YOUR-BRANCH")`|`config.plan.branch`|
|`plan.setSource("YOUR-SOURCE")`|`config.plan.source`|
|`plan.setVersion("YOUR-VERSION")`|`config.plan.version`|
|`plan.setVersionId("YOUR-VERSION-ID")`|`config.plan.versionId`|
|`amplitude.setTrackingOptions(options)`|`config.trackingOptions`|
|`amplitude.setSessionId(timestamp)`|NOT SUPPORTED.|

### Track events

The maintenance iOS SDK offered a variety of `logEvent` APIs with `withEventProperties`, `withApiProperties`, `withUserProperties`, `withGroup`, `withGroupProperties`, `withTimestamp`, `outOfSession`, to override specific properties in the event payload. Amplitude has simplified all these variations into a unified `track` API.

#### logEvent

The `logEvent()` API maps to `track()`.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let eventType = "Button Clicked"
let eventProperties: [String: Any] = ["key": "value"]

Amplitude.instance().logEvent( //[tl! --:3]
 eventType, 
 withEventProperties: eventProperties
)
let event = BaseEvent( //[tl! ++:4]
  eventType: eventType,
  eventProperties: eventProperties
)
amplitude.track(event)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
NSString* eventType = @"Button Clicked";
NSDictionary* eventProperties = @{@"key": @"value"};

[[Amplitude instance] logEvent:eventType withEventProperties:eventProperties]; //[tl! --]
AMPBaseEvent* event = [AMPBaseEvent initWithEventType:eventType //[tl! ++:2]
    eventProperties:eventProperties];
[amplitude track:event];
```
{{/partial:tab}}
{{/partial:tabs}}

#### logEvent withTimestamp

The `logEvent()` API maps to `track()`.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let eventType = "Button Clicked"
let timestamp = Int64(NSDate().timeIntervalSince1970 * 1000)
Amplitude.instance().logEvent( //[tl! --:3]
 eventType,
 withTimestamp: timestamp
)
let event = BaseEvent( //[tl! ++:4]
  eventType: eventType,
  timestamp: timestamp
)
amplitude.track(event)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
NSString* eventType = @"Button Clicked";
NSNumber* timestamp = [NSNumber numberWithLongLong:[[NSDate date] timeIntervalSince1970] * 1000];

[[Amplitude instance] logEvent:eventType withTimestamp:timestamp]; //[tl! --]
AMPBaseEvent* event = [AMPBaseEvent initWithEventType:eventType]; //[tl! ++:2]
event.timestamp = [timestamp longLongValue];
[amplitude track:event];
```
{{/partial:tab}}
{{/partial:tabs}}

#### logEvent withGroup

The `logEvent()` API maps to `track()`.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let eventType = "Button Clicked"
let eventProperties: [String: Any] = ["key": "value"]
let groups: [String: Any] = ["orgId": 10]

Amplitude.instance().logEvent( //[tl! --:4]
 eventType,
 withEventProperties: eventProperties,
 withGroups: groups
)
let event = BaseEvent( //[tl! ++:5]
  eventType: eventType,
  eventProperties: eventProperties,
  groups: groups
)
amplitude.track(event)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
NSString* eventType = @"Button Clicked";
NSDictionary* eventProperties = @{@"key": @"value"};

NSDictionary* groups = @{@"orgId": @"10"}; //[tl! --:3]
[[Amplitude instance] logEvent:eventType
    withEventProperties:eventProperties
    withGroups:groups];
AMPBaseEvent* event = [AMPBaseEvent initWithEventType:eventType //[tl! ++:3]
    eventProperties:eventProperties];
[event.groups set:@"orgId" value:@"10"];
[amplitude track:event];
```
{{/partial:tab}}
{{/partial:tabs}}

#### uploadEvents

The `uploadEvents()` API maps to `flush()`.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().uploadEvents() //[tl! --]
amplitude.flush() //[tl! ++]
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
[[Amplitude instance] uploadEvents]; //[tl! --]
[amplitude flush]; //[tl! ++]
```
{{/partial:tab}}
{{/partial:tabs}}

### Set user properties

The APIs for setting user properties are the same, except for the removal of `instance()`. Here are code snippets to migrate APIs for user properties.

#### setUserId

{{partial:admonition type="warning" heading="ID length limit"}}
The maintenance SDK uses an old SDK endpoint (`api2.amplitude.com`) which enforces no length limit for `deviceId` and `userId`. The latest SDK uses Amplitude's Http V2 API (`api2.amplitude.com/2/httpapi`) and requires identifiers to be at least 5 characters by default. When you migrate to the latest SDK, set `config.minIdLength` to a smaller value if you allowed identifiers with fewer than 5 characters.
{{/partial:admonition}}

Setting a user ID can be invoked on `amplitude` without calling `getInstance()`.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let userId = "TEST-USER-ID"
Amplitude.instance().setUserId(userId) //[tl! --]
amplitude.setUserId(userId: userId) //[tl! ++]
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
NSString* userId = @"TEST-USER-ID";
[[Amplitude instance] setUserId:userId]; //[tl! --]
[amplitude setUserId:userId]; //[tl! ++]
```
{{/partial:tab}}
{{/partial:tabs}}

#### setDeviceId

{{partial:admonition type="warning" heading="ID length limit"}}
The maintenance SDK uses an old SDK endpoint (`api2.amplitude.com`) which enforces no length limit for `deviceId` and `userId`. The latest SDK uses Amplitude's Http V2 API (`api2.amplitude.com/2/httpapi`) and requires identifiers to be at least 5 characters by default. When you migrate to the latest SDK, set `config.minIdLength` to a smaller value if you allowed identifiers with fewer than 5 characters.
{{/partial:admonition}}

Set a device ID on `amplitude` without calling `instance()`.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let deviceId = "TEST-DEVICE-ID"
Amplitude.instance().setDeviceId(deviceId) //[tl! --]
amplitude.setDeviceId(deviceId: deviceId) //[tl! ++]
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
NSString* deviceId = @"TEST-DEVICE-ID";
[[Amplitude instance] setDeviceId:deviceId]; //[tl! --]
[amplitude setDeviceId:deviceId]; //[tl! ++]
```
{{/partial:tab}}
{{/partial:tabs}}

#### clearUserProperties

The `clearUserProperties` API has been removed, but you can now use the unified `identify` API to remove user properties.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().clearUserProperties() //[tl! --]
let identify = Identify() //[tl! ++:2]
identify.clearAll()
amplitude.identify(identify: identify)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
[[Amplitude instance] clearUserProperties]; //[tl! --]
AMPIdentify* identify = [AMPIdentify new]; //[tl! ++:2]
[identify clearAll];
[amplitude identify:identify];
```
{{/partial:tab}}
{{/partial:tabs}}

#### setUserProperties

The `setUserProperties` API has been removed, but you can now use the unified `identify` API to add user properties. 

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```diff
Amplitude.instance().setUserProperties([ //[tl! --:3]
  "membership": "paid",
  "payment": "bank",
])
amplitude.identify(userProperties: [ //[tl! ++:3]
  "membership": "paid",
  "payment": "bank"
])
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```diff
[[Amplitude instance] setUserProperties:@{ //[tl! --:3]
    @"membership": @"paid",
    @"payment": @"bank"
}]; 
AMPIdentify* identify = [AMPIdentify new]; //[tl! ++:3]
[identify set:@"membership" value:@"paid"];
[identify set:@"payment" value:@"bank"];
[amplitude identify:identify];
```
{{/partial:tab}}
{{/partial:tabs}}

#### identify

You can now make an identify call on `amplitude` without calling `instance()`.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let identify = AMPIdentify() //[tl! --:2]
identify.set("membership", value: "paid")
Amplitude.instance().identify(identify)
let identify = Identify() //[tl! ++:3]
identify.set(property: "membership", value: "paid")
amplitude.identify(identify: identify)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPIdentify* identify = [AMPIdentify new];
[identify set:@"membership" value:@"paid"];

[[Amplitude instance] identify:identify]; //[tl! --]
[amplitude identify:identify]; //[tl! ++]
```
{{/partial:tab}}
{{/partial:tabs}}

### Set group properties

#### groupIdentify

You can now make an identify call on `amplitude` without calling `instance()`.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let identify = AMPIdentify() //[tl! --:6]
identify.set("membership", value: "paid")
Amplitude.instance().groupIdentify(
  withGroupType: "TEST-GROUP-TYPE", 
  groupName: "TEST-GROUP-NAME", 
  groupIdentify: identify
)

let identify = Identify() //[tl! ++:6]
identify.set(property: "membership", value: "paid")
amplitude.groupIdentify(
  groupType: "TEST-GROUP-TYPE", 
  groupName: "TEST-GROUP-NAME", 
  identify: identify
)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPIdentify* identify = [AMPIdentify new];
[identify set:@"membership" value:@"paid"];

[[Amplitude instance] groupIdentifyWithGroupType:@"TEST-GROUP-TYPE" //[tl! --:2]
    groupName:@"TEST-GROUP-NAME"
    groupIdentify:identify];
[amplitude groupIdentify:@"TEST-GROUP-TYPE" //[tl! ++:2]
    groupName:@"TEST-GROUP-NAME"
    identify:identify];
```
{{/partial:tab}}
{{/partial:tabs}}

### Track revenue

#### logRevenueV2

Track revenue using `revenue()` API on `amplitude` without calling `instance()`.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let revenue = AMPRevenue() //[tl! --:4]
revenue.setProductIdentifier("productIdentifier")
revenue.setQuantity(3)
revenue.setPrice(NSNumber(value: 3.99))
Amplitude.instance().logRevenueV2(revenue)

let revenue = Revenue() //[tl! ++:4]
revenue.productId = "productIdentifier"
revenue.quantity = 3
revenue.price = 3.99
amplitude.revenue(revenue: revenue)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPRevenue* revenue = [AMPRevenue new];

[revenue setProductIdentifier:@"productidentifier"]; //[tl! --:3]
[revenue setQuantity:3];
[revenue setPrice:@3.99];
[[Amplitude instance] logRevenueV2:revenue];
revenue.productId = @"productidentifier"; //[tl! ++:3]
revenue.quantity = 3;
revenue.price = 3.99;
[amplitude revenue:revenue];
```
{{/partial:tab}}
{{/partial:tabs}}

### Patterns

#### Plugins

The configs `amplitude.adSupportBlock` or `amplitude.useAdvertisingIdForDeviceId` were available in `Amplitude-iOS` to allow you to use IDFV or IDFA as the deviceID. Although `Amplitude-Swift` doesn't support these configurations, you can add plugins to the new iOS SDK to enrich event payloads.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
import AdSupport
import AmplitudeSwift
import AppTrackingTransparency
import Foundation
import SwiftUI

/// Plugin to collect IDFA values.  Users will be prompted if authorization status is undetermined.
/// Upon completion of user entry a track event is issued showing the choice user made.
///
/// Don't forget to add "NSUserTrackingUsageDescription" with a description to your Info.plist.
class IDFACollectionPlugin: Plugin {
    let type = PluginType.enrichment
    weak var amplitude: Amplitude? = nil

    func execute(event: BaseEvent?) -> BaseEvent? {
        let status = ATTrackingManager.trackingAuthorizationStatus
        var idfa = fallbackValue
        if status == .authorized {
            idfa = ASIdentifierManager.shared().advertisingIdentifier.uuidString
        }

        let workingEvent = event
        // The idfa on simulator is always 00000000-0000-0000-0000-000000000000
        event?.idfa = idfa
        // If you want to use idfa for the device_id
        event?.deviceId = idfa
        return workingEvent
    }
}

extension IDFACollectionPlugin {
    var fallbackValue: String? {
        // fallback to the IDFV value.
        // this is also sent in event.context.device.id,
        // feel free to use a value that is more useful to you.
        return UIDevice.current.identifierForVendor?.uuidString
    }
}

...
// To install your custom plugin, use 'add()' with your custom plugin as parameter.
amplitude.add(plugin: IDFACollectionPlugin())
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
@import AmplitudeSwift;
#import <AppTrackingTransparency/AppTrackingTransparency.h>
#import <AdSupport/ASIdentifierManager.h>

[amplitude add:[AMPPlugin initWithType:AMPPluginTypeEnrichment execute:^AMPBaseEvent* _Nullable(AMPBaseEvent* _Nonnull event) {
    ATTrackingManagerAuthorizationStatus status = ATTrackingManager.trackingAuthorizationStatus;

    // fallback to the IDFV value.
    // this is also sent in event.context.device.id,
    // feel free to use a value that is more useful to you.
    NSUUID* idfaUUID = [UIDevice currentDevice].identifierForVendor;
    
    if (status == ATTrackingManagerAuthorizationStatusAuthorized) {
        idfaUUID = [ASIdentifierManager sharedManager].advertisingIdentifier;
    }
    
    NSString* idfa = (idfaUUID != nil) ? idfaUUID.UUIDString : nil;

    // The idfa on simulator is always 00000000-0000-0000-0000-000000000000
    event.idfa = idfa;
    // If you want to use idfa for the device_id
    event.deviceId = idfa;
    return event;
}]];
```
{{/partial:tab}}
{{/partial:tabs}}

#### Callback

`Amplitude-Swift` supports configuration-level and event-level callback functions which are called for success and error upload. Configuration-level callback applies for every success and error event upload. Event-level callback is specific for one Event. Notice that the event-level callbacks are stored in cache, those callbacks are lost if the app crashes.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let amplitude = Amplitude(
    configuration: Configuration(
        apiKey: "TEST-API-KEY",
        callback: { (event: BaseEvent, code: Int, message: String) -> Void in
            print("eventCallback: \(event), code: \(code), message: \(message)")
        },
    )
)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:@"YOUR-API-KEY"];
configuration.callback = ^(AMPBaseEvent* _Nonnull event, NSInteger code, NSString* _Nonnull message) {
    NSLog(@"eventCallback: %@, code: %@, message: %@", event.eventType, @(code), message);
};
Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];
```
{{/partial:tab}}
{{/partial:tabs}}

Event-level callbacks:

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let event = BaseEvent(
    callback: { (event: BaseEvent, code: Int, message: String) -> Void in
        print("eventCallback: \(event), code: \(code), message: \(message)")
    }, 
    eventType: "TEST-EVENT-TYPE")
    
amplitude.track(event: event)
```
or:
```swift
let event2 = BaseEvent(eventType:"test")

amplitude.track(
    event: event2, 
    callback: { (event: BaseEvent, code: Int, message: String) -> Void in
        print("eventCallback: \(event), code: \(code), message: \(message)")
})
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPBaseEvent* event = [AMPBaseEvent initWithEventType:@"TEST-EVENT-TYPE"];
event.callback = ^(AMPBaseEvent* _Nonnull event, NSInteger code, NSString* _Nonnull message) {
    NSLog(@"eventCallback: %@, code: %@, message: %@", event.eventType, @(code), message);
};

[amplitude track:event];
```
or:
```objc
AMPBaseEvent* event2 = [AMPBaseEvent initWithEventType:@"test"];

[amplitude track:event2 callback:^(AMPBaseEvent* _Nonnull event, NSInteger code, NSString* _Nonnull message) {
    NSLog(@"eventCallback: %@, code: %@, message: %@", event.eventType, @(code), message);
}];
```
{{/partial:tab}}
{{/partial:tabs}}

## Data migration

Existing [maintenance SDK](/sdks/analytics/ios/ios-sdk) data (events, user/device ID) are moved to the latest SDK by default. It can be disabled by setting `migrateLegacyData` to `false` in the [Configuration](/sdks/analytics/ios/ios-swift-sdk#configuration).

If your macOS app isn't sandboxed, data from the legacy SDK won't migrate. For more information about sandboxing, and how to know if your app is sandboxed, see Apple's article [Protecting user data with App Sandbox](https://developer.apple.com/documentation/security/app_sandbox/protecting_user_data_with_app_sandbox#4098972).

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
amplitude = Amplitude(
    Configuration(
        ...
        migrateLegacyData: false,
    )
)
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objc
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:@"YOUR-API-KEY"];
configuration.migrateLegacyData = false;
Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];
```
{{/partial:tab}}
{{/partial:tabs}}