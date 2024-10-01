---
id: 6d713118-1088-470d-bfe7-847fbb372ba8
blueprint: ios_sdk
title: 'iOS SDK'
sdk_status: maintenance
article_type: core
supported_languages:
  - swift
  - obj-c
github_link: 'https://github.com/amplitude/Amplitude-iOS'
releases_url: 'https://github.com/amplitude/Amplitude-iOS/releases'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1727813319
source: 'https://www.docs.developers.amplitude.com/data/sdks/ios/'
package_name: Amplitude
bundle_url: 'https://cocoapods.org/pods/Amplitude-iOS'
platform: iOS
noindex: true
current_version: 36708c4b-d35c-4a7e-9c31-1c1571d6a73f
version_name: iOS
---
This is the official documentation for the Amplitude Analytics iOS SDK.

{{partial:admonition type="warning" heading="Carrier tracking unsupported in iOS 16+"}}
The SDK fetches carrier information by using `serviceSubscriberCellularProviders` and `CTCarrier` which are [deprecated](https://developer.apple.com/documentation/coretelephony/cttelephonynetworkinfo/3024511-servicesubscribercellularprovide) with [no replacement](https://developer.apple.com/forums/thread/714876?answerId=728276022#728276022) starting from iOS 16. Amplitude will keep updated with Apple and re-enable carrier tracking as soon as Apple releases a replacement.
{{/partial:admonition}}

## Install the SDK

Install the iOS SDK with CocoaPods, Carthage or Swift Package Manager

{{partial:tabs tabs="CocoaPods, Carthage, Swift Package Manager"}}
{{partial:tab name="CocoaPods"}}
1. Add dependency to `Podfile`. 
```bash
pod '@{{packageName}}', '~> @{{version}}'
```
2. Run `pod install` in the project directory to install the dependency. 
{{/partial:tab}}
{{partial:tab name="Carthage"}}
Add the following line to your `Cartfile`.
```bash
github "@{{repo}}" ~> @{{version}}
```
See the [Carthage documentation](https://github.com/Carthage/Carthage#adding-frameworks-to-an-application) for more information.
{{/partial:tab}}
{{partial:tab name="Swift Package Manager"}}
 1. Navigate to `File` > `Swift Package Manager` > `Add Package Dependency`. This opens a dialog that allows you to add a package dependency. 
 2. Enter the URL `https://github.com/@{{repo}}` in the search bar. 
 3. Xcode resolves to the latest version. Or you can select a specific version. 
 4. Click the "Next" button to confirm the addition of the package as a dependency. 
 5. Build your project to make sure the package is properly integrated.
{{/partial:tab}}
{{/partial:tabs}}

## Initialize the SDK

You must initialize the SDK before you can instrument. The API key for your Amplitude project is required.

Usually, you can initialize the SDK in the `application:didFinishLaunchingWithOptions:` method of your `YourAppAppDelegate.m` file.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Enable sending automatic session events
    [Amplitude instance].defaultTracking.sessions = YES;
    // Initialize SDK
    [[Amplitude instance] initializeApiKey:@"API_KEY"];
    // Set userId
    [[Amplitude instance] setUserId:@"userId"];
    // Log an event
    [[Amplitude instance] logEvent:@"app_start"];

    return YES;
}
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Enable sending automatic session events
    Amplitude.instance().defaultTracking.sessions = true
    // Initialize SDK
    Amplitude.instance().initializeApiKey("API_KEY")
    // Set userId
    Amplitude.instance().setUserId("userId")
    // Log an event
    Amplitude.instance().logEvent("app_start")

    return true
}
```
{{/partial:tab}}
{{/partial:tabs}}

## Configure the SDK

| Name  | Description | Default Value |
| --- | --- | --- |
| `eventUploadPeriodSeconds` | The amount of time SDK attempts to upload the unsent events to the server or reaches `eventUploadThreshold` threshold. | `30` |
| `eventUploadThreshold` | SDK will attempt to upload once unsent event count exceeds the event upload threshold or reach `eventUploadPeriodSeconds` interval.  | `30` |
| `eventUploadMaxBatchSize` | The maximum number of events sent with each upload request. | `100` |
| `eventMaxCount` | The maximum number of unsent events to keep on the device. | `1000` |
| `minTimeBetweenSessionsMillis` |  When a user closes and reopens the app within minTimeBetweenSessionsMillis milliseconds, the reopen is considered part of the same session and the session continues. Otherwise, a new session is created. The default is 5 minutes. | `5 minutes` |
| `trackingSessionEvents` |  Deprecated. Whether to automatically log start and end session events corresponding to the start and end of a user's session. | `NO` |
| `setServerUrl` | Sends events to a custom URL. | `Amplitude HTTP API URL` |
| `setOptOut` | Opt the user out of tracking. | `NO` |
| `setTrackingOptions` | By default the iOS SDK will track several user properties such as carrier, city, country, ip_address, language, platform, etc. You can use the provided AMPTrackingOptions interface to customize and disable individual fields. | `NO` |
| `setOffline` | Disables sending logged events to Amplitude servers. Events will be sent when set to `true`. | `NO` |
| `setIdentifyUploadPeriodSeconds` | The amount of time SDK will attempt to batch intercepted identify events. | `30` |

### EU data residency

Beginning with version 8.5.0, you can configure the server zone after initializing the client for sending data to Amplitude's EU servers. The SDK sends data based on the server zone if it's set.
 The server zone configuration supports dynamic configuration as well.

For earlier versions, you need to configure the `serverURL` property after initializing the client.

{{partial:admonition type="note" heading=""}}
For EU data residency, the project must be set up inside Amplitude EU. You must initialize the SDK with the API key from Amplitude EU.
{{/partial:admonition}}

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
// For versions starting from 8.5.0
// No need to call setServerUrl for sending data to Amplitude's EU servers

[[Amplitude instance] setServerZone:AMPServerZone.EU];

// For earlier versions
[[Amplitude instance] setServerUrl: @"https://api.eu.amplitude.com"];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
// For versions starting from 8.5.0
// No need to call setServerUrl for sending data to Amplitude's EU servers

Amplitude.instance().setServerZone(AMPServerZone.EU)

// For earlier versions

Amplitude.instance().setServerUrl("https://api.eu.amplitude.com")
```
{{/partial:tab}}
{{/partial:tabs}}

## Send events

Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to note.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
[[Amplitude instance] logEvent:@"Button Clicked"];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().logEvent("Button Click")
```
{{/partial:tab}}
{{/partial:tabs}}

### Send events with properties

Events can also contain properties, which give more context about the event. For example, "hover time" may be a relevant event property for "button click".

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
NSMutableDictionary *eventProperties = [NSMutableDictionary dictionary];
[eventProperties setValue:@"100ms" forKey:@"Hover Time"];
[[Amplitude instance] logEvent:@"Button Clicked" withEventProperties:eventProperties];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().logEvent("Button Clicked", withEventProperties: ["Hover Time": "100ms"] )
```
{{/partial:tab}}
{{/partial:tabs}}

## User properties

{{partial:admonition type="warning" heading="User privacy"}}
Don't track any user data that may be against your privacy terms.
{{/partial:admonition}}

User properties help you understand your users at the time they performed some action within your app. For example, you can learn about their device details, their preferences, or language.

Amplitude-iOS's `AMPIdentity` class manages these features. Identify is for setting the user properties of a particular user without sending any event. The SDK supports these operations on individual user properties: `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove`. Declare the operations via a provided Identify interface. You can chain together multiple operations in a single Identify object.

The `AMPIdentify` object is passed to the Amplitude client to send to the server. Starting from release v8.15.0, identify events with set operations will be batched and sent with fewer events. This change doesn't affect the result the set operations. The flush interval for batched Identify's can be managed with `setIdentifyUploadPeriodSeconds`.

### Set a user property

`set` sets the value of a user property. You can also chain together multiple identify calls.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
AMPIdentify *identify = [[[AMPIdentify identify] set:@"gender" value:@"female"] set:@"age"
    value:[NSNumber numberWithInt:20]];
[[Amplitude instance] identify:identify];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```objc
AMPIdentify *identify = [[[AMPIdentify identify] set:@"gender" value:@"female"] set:@"age"
    value:[NSNumber numberWithInt:20]];
[[Amplitude instance] identify:identify];
```
{{/partial:tab}}
{{/partial:tabs}}

### Set a user property once

`setOnce` sets the value of a user property only once. Subsequent calls using `setOnce`are ignored.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
AMPIdentify *identify1 = [[AMPIdentify identify] setOnce:@"sign_up_date" value:@"2015-08-24"];
[[Amplitude instance] identify:identify1];

AMPIdentify *identify2 = [[AMPIdentify identify] setOnce:@"sign_up_date" value:@"2015-09-14"];
[[Amplitude instance] identify:identify2]; // Is ignored
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
let identify1 = AMPIdentify().setOnce("sign_up_date", value: "2015-08-24")
Amplitude.instance().identify(identify1)

let identify2 = AMPIdentify().setOnce("sign_up_date", value: "2015-09-14")
Amplitude.instance().identify(identify2) // Is ignored
```
{{/partial:tab}}
{{/partial:tabs}}

### Increment a user property

`add` increments a user property by some numerical value. If the user property doesn't have a value set yet, it's initialized to `0` before being incremented.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
AMPIdentify *identify = [[[AMPIdentify identify] add:@"karma" value:[NSNumber numberWithFloat:0.123]]
    add:@"friends" value:[NSNumber numberWithInt:1]];
[[Amplitude instance] identify:identify];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
let identify = AMPIdentify()
    .add("karma", value: NSNumber(value: 0.123))
    .add("friends",value: NSNumber(value: 1))
Amplitude.instance().identify(identify)
```
{{/partial:tab}}
{{/partial:tabs}}

### Remove values from a user property

`remove` removes a value or values from a user property. If the item doesn't exist in the user property, nothing is removed.

```objc
NSMutableArray *array = [NSMutableArray array];
[array addObject:@"some_string"];
[array addObject:[NSNumber numberWithInt:56]];
AMPIdentify *identify = [[[AMPIdentify identify] remove:@"ab-tests" value:@"new-user-test"]
    remove:@"some_list" value:array];
[[Amplitude instance] identify:identify];
```

### Set multiple user properties

Use `setUserProperties` as a shorthand to set multiple user properties at once. This method is a wrapper around `Identify.set` and `identify`.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
NSMutableDictionary *userProperties = [NSMutableDictionary dictionary];
[userProperties setValue:@"VALUE" forKey:@"KEY"];
[userProperties setValue:@"OTHER_VALUE" forKey:@"OTHER_KEY"];
[[Amplitude instance] setUserProperties:userProperties];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
var userProperties: [AnyHashable : Any] = [:]
userProperties["KEY"] = "VALUE"
userProperties["OTHER_KEY"] = "OTHER_VALUE"
Amplitude.instance().userProperties = userProperties
```
{{/partial:tab}}
{{/partial:tabs}}

### Use arrays in user properties

Directly set arrays or use `append` to generate an array.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
NSMutableArray *colors = [NSMutableArray array];
[colors addObject:@"rose"];
[colors addObject:@"gold"];
NSMutableArray *numbers = [NSMutableArray array];
[numbers addObject:[NSNumber numberWithInt:4]];
[numbers addObject:[NSNumber numberWithInt:5]];
AMPIdentify *identify = [[[[AMPIdentify identify] set:@"colors" value:colors] append:@"ab-tests"
    value:@"campaign_a"] append:@"existing_list" value:numbers];
[[Amplitude instance] identify:identify];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
var colors: [AnyHashable] = []
colors.append("rose")
colors.append("gold")
var numbers: [AnyHashable] = []
numbers.append(NSNumber(value: 4))
numbers.append(NSNumber(value: 5))
let identify = AMPIdentify().set("colors", value: colors)
    .append("ab-tests", value: "campaign_a")
    .append("existing_list",value: numbers)
Amplitude.instance().identify(identify)
```
{{/partial:tab}}
{{/partial:tabs}}

#### Append or prepend user property data

- `append` appends a value or values to a user property array.
- `prepend` prepends a value or values to a user property.

If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are added. If the user property has an existing value and it's not a list, it's converted into a list with the new value added.

`append` and `prepend` don't check for duplicates. For duplicate checking, see `preInsert` and `postInsert`.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
NSMutableArray *array = [NSMutableArray array];
[array addObject:@"some_string"];
[array addObject:[NSNumber numberWithInt:56]];
AMPIdentify *identify = [[[AMPIdentify identify] append:@"ab-tests" value:@"new-user-test"]
    append:@"some_list" value:array];
[[Amplitude instance] identify:identify];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
var array: [AnyHashable] = []
array.append("some_string")
array.append(NSNumber(value: 56))
let identify = AMPIdentify()
    .append("ab-tests", value: "new-user-test")
    .append("some_list",value: array)
Amplitude.instance().identify(identify)
```
{{/partial:tab}}
{{/partial:tabs}}

#### Preinsert and postinsert

- `preInsert` inserts a value or values to the front of a user property array if it doesn't exist in the array yet.
- `postInsert` inserts a value or values to the end of a user property array if it doesn't exist in the array yet.

If the user property doesn't exist, it's initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, nothing is inserted.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
NSMutableArray *array = [NSMutableArray array];
[array addObject:@"some_string"];
[array addObject:[NSNumber numberWithInt:56]];
AMPIdentify *identify = [[[AMPIdentify identify] preInsert:@"ab-tests" value:@"new-user-test"]
    preInsert:@"some_list" value:array];
[[Amplitude instance] identify:identify];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
var array: [AnyHashable] = []
array.append("some_string")
array.append(NSNumber(value: 56))
let identify = AMPIdentify()
    .preInsert("ab-tests", value: "new-user-test")
    .preInsert("some_list",value: array)
Amplitude.instance().identify(identify)
```
{{/partial:tab}}
{{/partial:tabs}}

### Remove user properties

`clearUserProperties` removes all the current user's user properties.

{{partial:admonition type="warning" heading="This action is irreversible"}}
If you clear user properties, Amplitude can't sync the user's user property values from before the wipe to any future events.
{{/partial:admonition}}

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
[[Amplitude instance] clearUserProperties];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().clearUserProperties()
```
{{/partial:tab}}
{{/partial:tabs}}

#### Remove a value or values from a user property

`remove` removes an existing value or values from a user property. If the item doesn't exist in the user property, nothing is removed.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
NSMutableArray *array = [NSMutableArray array];
[array addObject:@"some_string"];
[array addObject:[NSNumber numberWithInt:56]];
AMPIdentify *identify = [[[AMPIdentify identify] remove:@"ab-tests" value:@"new-user-test"]
    remove:@"some_list" value:array];
[[Amplitude instance] identify:identify];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
var array: [AnyHashable] = []
array.append("some_string")
array.append(NSNumber(value: 56))
let identify = AMPIdentify()
    .remove("ab-tests", value: "new-user-test")
    .remove("some_list", value: array)
Amplitude.instance().identify(identify)
```
{{/partial:tab}}
{{/partial:tabs}}

## Track default events

Starting from release v8.17.0, the SDK is able to track more default events now. It can be configured to track the following events automatically:

- Sessions
- App lifecycles
- Screen views
- Deep links
  
| Name | Type | Default Value | Description |
|-|-|-|-|
`defaultTracking.sessions` | Optional. `boolean` | `NO` | Enables session tracking. This configuration replaces [`trackingSessionEvents`](#configuration). If value is `YES`, Amplitude tracks session start and session end events.<br /><br />See [Tracking sessions](#tracking-sessions) for more information.|
`defaultTracking.appLifecycles` | Optional. `boolean` | `NO` | Enables application lifecycle events tracking. If value is `YES`, Amplitude tracks application installed, application updated, application opened, and application backgrounded events.<br /><br />Event properties tracked includes: `[Amplitude] Version`,<br /> `[Amplitude] Build`,<br /> `[Amplitude] Previous Version`, `[Amplitude] Previous Build`, `[Amplitude] From Background`<br /><br />See [Tracking application lifecycles](#tracking-application-lifecycles) for more information.|
`defaultTracking.screenViews` | Optional. `boolean` | `NO` | Enables screen views tracking. If value is `YES`, Amplitude tracks screen viewed events.<br /><br />Event properties tracked includes: `[Amplitude] Screen Name`<br /><br />See [Tracking screen views](#tracking-screen-views) for more information.|
`defaultTracking.deepLinks` | Optional. `boolean` | `NO` | Enables deep link tracking. If value is `YES`, Amplitude tracks deep link opened events. Note that you still need to call `continueUserActivity` or `openURL` manually for tracking this event.<br /><br />Event properties tracked includes: `[Amplitude] Link URL`, `[Amplitude] Link Referrer`<br /><br />See [Tracking deep links](#tracking-deep-links) for more information.|

Use the following code sample to enable default event tracking.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
[Amplitude instance].defaultTracking = [AMPDefaultTrackingOptions initWithAllEnabled];
[[Amplitude instance] initializeApiKey:@"API_KEY"];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().defaultTracking = AMPDefaultTrackingOptions.initWithAllEnabled()
Amplitude.instance().initializeApiKey("API_KEY")
```
{{/partial:tab}}
{{/partial:tabs}}

Disable default event tracking with the following code sample.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
[Amplitude instance].defaultTracking = [AMPDefaultTrackingOptions initWithNoneEnabled];
[[Amplitude instance] initializeApiKey:@"API_KEY"];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().defaultTracking = AMPDefaultTrackingOptions.initWithNoneEnabled()
Amplitude.instance().initializeApiKey("API_KEY")
```
{{/partial:tab}}
{{/partial:tabs}}

Default event tracking accepts options that define which events to track.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
[Amplitude instance].defaultTracking = [AMPDefaultTrackingOptions initWithSessions:YES
                                                                        appLifecycles:NO
                                                                            deepLinks:NO
                                                                        screenViews:NO];
[[Amplitude instance] initializeApiKey:@"API_KEY"];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().defaultTracking = AMPDefaultTrackingOptions.initWithSessions(
    true,
    appLifecycles: false,
    deepLinks: false,
    screenViews: false
)
Amplitude.instance().initializeApiKey("API_KEY")
```
{{/partial:tab}}
{{/partial:tabs}}

### Track sessions

You can enable Amplitude to start tracking session events by setting `defaultTracking.sessions` to `true`. Refer to the code sample below.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
[Amplitude instance].defaultTracking = [AMPDefaultTrackingOptions initWithSessions:YES
                                                                        appLifecycles:NO
                                                                            deepLinks:NO
                                                                        screenViews:NO];
[[Amplitude instance] initializeApiKey:@"API_KEY"];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().defaultTracking = AMPDefaultTrackingOptions.initWithSessions(
    true,
    appLifecycles: false,
    deepLinks: false,
    screenViews: false
)
Amplitude.instance().initializeApiKey("API_KEY")
```
{{/partial:tab}}
{{/partial:tabs}}

For more information about session tracking, see [User sessions](#user-sessions).

{{partial:admonition type="note" heading=""}}
`trackingSessionEvents` is deprecated and replaced with `defaultTracking.sessions`.
{{/partial:admonition}}

### Track application lifecycle


You can enable Amplitude to start tracking application lifecycle events by setting `defaultTracking.appLifecycles` to `true`. Refer to the code sample below.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
[Amplitude instance].defaultTracking = [AMPDefaultTrackingOptions initWithSessions:NO
                                                                      appLifecycles:YES
                                                                          deepLinks:NO
                                                                        screenViews:NO];
[[Amplitude instance] initializeApiKey:@"API_KEY"];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().defaultTracking = AMPDefaultTrackingOptions.initWithSessions(
    false,
    appLifecycles: true,
    deepLinks: false,
    screenViews: false
)
Amplitude.instance().initializeApiKey("API_KEY")
```
{{/partial:tab}}
{{/partial:tabs}}

After enabling this setting, Amplitude tracks the following events:

-`[Amplitude] Application Installed`, this event fires when a user opens the application for the first time right after installation, by observing the `UIApplicationDidFinishLaunchingNotification` notification underneath.
-`[Amplitude] Application Updated`, this event fires when a user opens the application after updating the application, by observing the `UIApplicationDidFinishLaunchingNotification` notification underneath.
-`[Amplitude] Application Opened`, this event fires when a user launches or foregrounds the application after the first open, by observing the `UIApplicationDidFinishLaunchingNotification` or `UIApplicationWillEnterForegroundNotification` notification underneath.
-`[Amplitude] Application Backgrounded`, this event fires when a user backgrounds the application, by observing the `UIApplicationDidEnterBackgroundNotification` notification underneath.

### Track screen views

You can enable Amplitude to start tracking screen view events by setting `defaultTracking.screenViews` to `true`. Refer to the code sample below.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
[Amplitude instance].defaultTracking = [AMPDefaultTrackingOptions initWithSessions:NO
                                                                        appLifecycles:NO
                                                                            deepLinks:NO
                                                                        screenViews:YES];
[[Amplitude instance] initializeApiKey:@"API_KEY"];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().defaultTracking = AMPDefaultTrackingOptions.initWithSessions(
    false,
    appLifecycles: false,
    deepLinks: false,
    screenViews: true
)
Amplitude.instance().initializeApiKey("API_KEY")
```
{{/partial:tab}}
{{/partial:tabs}}

After enabling this setting, Amplitude will track the `[Amplitude] Screen Viewed` event with the screen name property, which reads the property value from the controller class metadata using the `viewDidAppear` method swizzling.

### Track deep links

You can enable Amplitude to start tracking deep link events by setting `defaultTracking.deepLinks` to `true`. Refer to the code sample below.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
// Enable tracking deep links.
[Amplitude instance].defaultTracking = [AMPDefaultTrackingOptions initWithSessions:NO
                                                                        appLifecycles:NO
                                                                            deepLinks:YES
                                                                        screenViews:NO];
[[Amplitude instance] initializeApiKey:@"API_KEY"];

// Call helper method to track, e.g., in `onOpenURL` callback.
[[Amplitude instance] openURL:url];
[[Amplitude instance] continueUserActivity:activity];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
// Enable tracking deep links.
Amplitude.instance().defaultTracking = AMPDefaultTrackingOptions.initWithSessions(
    false,
    appLifecycles: false,
    deepLinks: true,
    screenViews: false
)
Amplitude.instance().initializeApiKey("API_KEY")

// Call helper method to track, e.g., in `onOpenURL` callback.
Amplitude.instance().openURL(url: url)
Amplitude.instance().continueUserActivity(activity: activity)
```
{{/partial:tab}}
{{/partial:tabs}}

After enabling this setting, Amplitude is able to track the `[Amplitude] Deep Link Opened` event with the URL and referrer information. Note that you still need to call `continueUserActivity` or `openURL` manually for tracking deep links.

## Set user groups

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, then the count includes the group.

For example, you want to group your users based on what organization they're in by using an 'orgId'. Joe is in 'orgId' '10', and Sue is in 'orgId' '15'. Sue and Joe both perform a certain event. You can query their organizations in the Event Segmentation Chart.

When setting groups, define a `groupType` and `groupName`. In the previous example, 'orgId' is the `groupType` and '10' and '15' are the values for `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'.

Setting a group also sets the `groupType:groupName` as a user property, and overwrites any existing `groupName` value set for that user's groupType, and the corresponding user property value. `groupType` is a string, and `groupName` can be either a string or an array of strings to indicate that a user is in multiple groups.

{{partial:admonition type="example" heading=""}}
Joe is in 'orgID' with the groupName 15. He is also in "sport" with groupNames "tennis" and "soccer". Here is what your code might look like:

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
[[Amplitude instance] setGroup:@"orgId" groupName:[NSNumber numberWithInt:15]];
[[Amplitude instance] setGroup:@"sport" groupName:[NSArray arrayWithObjects: @"tennis", @"soccer", nil]];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().setGroup("orgId", groupName: NSNumber(value: 15))
    Amplitude.instance().setGroup("sport", groupName: NSArray(objects: "tennis", "soccer"))
```
{{/partial:tab}}
{{/partial:tabs}}

{{/partial:admonition}}

You can also use `logEventWithGroups` to set event-level groups, meaning the group designation only applies for the specific event being logged and doesn't persist on the user unless you explicitly set it with `setGroup`:

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
NSDictionary *eventProperties = [NSDictionary dictionaryWithObjectsAndKeys: @"value", @"key", nil];
NSDictionary *groups = [NSDictionary dictionaryWithObjectsAndKeys:[NSNumber numberWithInt:10],
    @"orgId", @"soccer", @"sport", nil];
[[Amplitude instance] logEvent:@"initialize_game" withEventProperties:eventProperties withGroups:groups];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
let eventProperties: [String: Any] = ["key": "value"]
let groups: [String: Any] = ["orgId": 10]

Amplitude.instance().logEvent("initialize_game", withEventProperties: eventProperties, withGroups: groups)
```
{{/partial:tab}}
{{/partial:tabs}}

## Group identify

Use the Group Identify API to set or update the properties of particular groups. These updates only affect events going forward.

The `groupIdentifyWithGroupType` method accepts a group type string parameter and group name object parameter, as well as an Identify object that's applied to the group.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
NSString *groupType = @"plan";
NSObject *groupName = @"enterprise";
AMPIdentify *identify = [[AMPIdentify identify] set:@"key" value:@"value"];
[[Amplitude instance] groupIdentifyWithGroupType:groupType groupName:groupName groupIdentify:identify];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
let identify = AMPIdentify()
    .set("key", value: "value")
Amplitude.instance().groupIdentifyWithGroupType("plan", groupName:NSString(string:"enterprise"), groupIdentify:identify)
```
{{/partial:tab}}
{{/partial:tabs}}

You can add an optional `outOfSession` boolean input as a fourth argument to `groupIdentifyWithGroupType`

## Track revenue

Instances of `AMPRevenue` stores revenue transactions and defines special revenue properties (such as `revenueType`) used in Amplitude's Event Segmentation and Revenue LTV charts. Each instance is passed to `Amplitude.logRevenueV2`. This allows Amplitude to automatically display data relevant to revenue.

To track revenue from a user, call `logRevenueV2` each time a user generates revenue. Here is an example:

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
AMPRevenue *revenue = [[[AMPRevenue revenue] setProductIdentifier:@"productIdentifier"] setQuantity:3];
[revenue setPrice:[NSNumber numberWithDouble:3.99]];
[[Amplitude instance] logRevenueV2:revenue];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
let revenue = AMPRevenue()
revenue.setProductIdentifier("productIdentifier")
revenue.setQuantity(3)
revenue.setPrice(NSNumber(value: 3.99))
Amplitude.instance().logRevenueV2(revenue)
```
{{/partial:tab}}
{{/partial:tabs}}

Calling `logRevenueV2` generates up to 2 different event types in the platform:

- `[Amplitude] Revenue`: This event is logged for all revenue events, regardless of whether verification is turned on.
- `[Amplitude] Revenue (Verified/Unverified)`: These revenue events contain the actual `$revenue` property.

You can't change the default names given to these client-side revenue events in the raw data, but you can change the [display name](/docs/admin/account-management/account-settings). Learn more about tracking revenue in the [Help Center](/docs/cdp/sources/instrument-track-revenue).

{{partial:admonition type="note" heading=""}}
Amplitude doesn't support currency conversion. Normalize all revenue data to your currency of choice before being sent.
{{/partial:admonition}}

Each revenue event has fields available, and each field has a corresponding set method (such as `price` and `setPrice`). See the [API docs for `AMPRevenue`](http://amplitude.github.io/Amplitude-iOS/Classes/AMPRevenue.html#//api/name/productId) for a full list of fields.

Like `logEvent`, you can attach event properties for each call to `logRevenueV2` . However, these event properties only appear in the [Event Segmentation](/docs/analytics/charts/event-segmentation/event-segmentation-build) chart and not in the Revenue charts.

<!-- vale Vale.Spelling = NO-->
| Name  | Description  |
| --- | --- |
| `productId` | Optional. NSString. An identifier for the product. Amplitude recommends something like the "Google Play Store product ID". Defaults to `null`. |
| `quantity`| Required. NSInteger. The quantity of products purchased. Note: revenue = quantity * price. Defaults to 1. |
| `price` | Required. NSNumber. The price of the products purchased, and this can be negative. Note: revenue = quantity * price. Defaults to `null`.|
| `revenueType` | Optional, but required for revenue verification. NSString. The revenue type. For example tax, refund, income. Defaults to `null`. |
| `receipt`  | Optional, but required for revenue verification. NSData. Defaults to `null` |
| `receiptSignature` | Optional, but required for revenue verification. Defaults to `null`. |
| `eventProperties`| Optional. NSDictionary. An object of event properties to include in the revenue event. Defaults to `null`. |
<!-- vale Vale.Spelling = YES -->

{{partial:admonition type="note" heading=""}}
Price can be negative, which may be useful for tracking revenue lost (such as refunds or costs)
{{/partial:admonition}}

## Advanced topics

### User sessions

A session is a period of time that a user has the app in the foreground. Events that are logged within the same session has the same `session_id`. Sessions are handled automatically so you don't have to manually call an API like `startSession()` or `endSession()`.

You can adjust the time window for which sessions are extended by changing the variable `minTimeBetweenSessionsMillis`.

Amplitude groups events together by session. A session represents a single period of user activity, with a start and end time. Different SDKs track sessions differently, depending on the requirements of the platform. The minimum duration of a session can be configured within the SDK.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
[Amplitude instance].defaultTracking.sessions = YES;
[Amplitude instance].minTimeBetweenSessionsMillis = 10 * 60 * 1000; // 10 minutes
[[Amplitude instance] initializeApiKey:@"API_KEY"];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().defaultTracking.sessions = true
Amplitude.instance().minTimeBetweenSessionsMillis = 10 * 60 * 1000 // 10 minutes
Amplitude.instance().initializeApiKey("API_KEY")
```
{{/partial:tab}}
{{/partial:tabs}}

You can also log events as out-of-session. Out-of-session events have a `session_id` of -1 and aren't considered part of the current session, meaning they don't extend the current session. This might be useful if you are logging events triggered by push notifications, for example. You can log events as out-of-session by setting the input parameter `outOfSession` to true when calling `logEvent`

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
[[Amplitude instance] logEvent:@"EVENT_TYPE" withEventProperties:nil outOfSession:YES];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().logEvent("Push Notification", withEventProperties: nil, outOfSession: true)
```
{{/partial:tab}}
{{/partial:tabs}}

You can also log identify events as out-of-session. This is useful if you are updating user properties in the background and don't want to start a new session. Do this by setting the input parameter `outOfSession` to `true` when calling `identify`.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
AMPIdentify *identify = [[AMPIdentify identify] set:@"key" value:@"value"];
[[Amplitude instance] identify:identify outOfSession:YES];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
let identify = AMPIdentify()
    .set("key", value: "value")
Amplitude.instance().identify(identify, outOfSession: true)
```
{{/partial:tab}}
{{/partial:tabs}}

You can use the helper method getSessionId to get the value of the current `sessionId`.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
long sessionId = [[Amplitude instance] getSessionId];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().getSessionId()
```
{{/partial:tab}}
{{/partial:tabs}}

### Set a custom user ID

If your app has its login system that you want to track users with, you can call `setUserId` at any time.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
[[Amplitude] instance] setUserId:@"USER_ID"];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().setUserId("USER_ID")
```
{{/partial:tab}}
{{/partial:tabs}}

You can also add the User ID as an argument to the init call.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
[[Amplitude] instance] initializeApiKey:@"API_KEY" userId:@"USER_ID"];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().initializeApiKey("API_KEY", userId: "USER_ID")
```
{{/partial:tab}}
{{/partial:tabs}}

Don't assign users a user ID that could change, because each unique user ID is a unique user in Amplitude. For more information, see [Track unique users](/docs/cdp/sources/instrument-track-unique-users).

### Debug logging

By default, only critical errors are logged to console. To enable debug logging in iOS, change `AMPLITUDE_DEBUG` from 0 to 1 at the top of the Objective-C file you wish to examine. Error messages are printed by default. To disable error logging, change `AMPLITUDE_LOG_ERRORS` from 1 to 0 in Amplitude.m.

### Logged out and anonymous users

Amplitude [merges user data](/docs/cdp/sources/instrument-track-unique-users), so any events associated with a known `userId` or `deviceId` are linked the existing user.

If a user logs out, Amplitude can merge that user's logged-out events to the user's record. You can change this behavior and log those events to an anonymous user instead.

To log events to an anonymous user:

1. Set the `userId` to null.
2. Generate a new `deviceId`.

Events coming from the current user or device appear as a new user in Amplitude. Note: If you do this, you can't see that the two users were using the same device.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
[[Amplitude instance] setUserId:nil]; // not string nil
[[Amplitude instance] regenerateDeviceId];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().setUserId("userId")
Amplitude.instance().regenerateDeviceId()
```
{{/partial:tab}}
{{/partial:tabs}}


### Disable tracking

By default the iOS SDK tracks several user properties such as `carrier`, `city`, `country`, `ip_address`, `language`, `platform`, etc. You can use the provided `AMPTrackingOptions` interface to customize and disable individual fields.

Each operation on the `AMPTrackingOptions` object returns the same instance, letting you chain multiple operations together.

To use the AMPTrackingOptions interface, first include the header:

```objc
#import "AMPTrackingOptions.h"
```

Before initializing the SDK with your `apiKey`, create a `AMPTrackingOptions` instance with your configuration and set it on the SDK instance

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
AMPTrackingOptions *options = [[[[AMPTrackingOptions options] disableCity] disableIPAddress] disablePlatform];
[[Amplitude instance] setTrackingOptions:options];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
let trackingOptions = AMPTrackingOptions().disableCity()
                                            .disableCarrier();
Amplitude.instance().setTrackingOptions(trackingOptions!);
```
{{/partial:tab}}
{{/partial:tabs}}

Tracking for each field can be individually controlled, and has a corresponding method (for example, `disableCountry`, `disableLanguage`).

| Method | Description |
| --- | --- |
| `disableCarrier` | Disable tracking of device's carrier. |
| `disableCity` | Disable tracking of user's city. |
| `disableCountry` | Disable tracking of user's country. |
| `disableDeviceManufacturer` | Disable tracking of device manufacturer. |
| `disableDeviceModel` | Disable tracking of device model. |
| `disableDMA` | Disable tracking of user's DMA. |
| `disableIDFA` | Disable tracking of user's IDFA. |
| `disableIDFV` | Disable tracking of user's IDFV. |
| `disableIPAddress` | Disable tracking of user's IP address. |
| `disableLanguage` | Disable tracking of device's language. |
| `disableLatLng` | Disable tracking of user's current latitude and longitude coordinates. |
| `disableOSName` | Disable tracking of device's OS Name. |
| `disableOSVersion` | Disable tracking of device's OS Version. |
| `disablePlatform` | Disable tracking of device's platform. |
| `disableRegion` | Disable tracking of user's region. |
| `disableVersionName` | Disable tracking of your app's version name. |


{{partial:admonition type="note" heading=""}}
AMPTrackingOptions only prevents default properties from being tracked on newly created projects, where data has not yet been sent. If you have a project with existing data that you would like to stop collecting the default properties for, get help in the [Amplitude Community](https://community.amplitude.com/?utm_source=devdocs&utm_medium=helpcontent&utm_campaign=devdocswebsite). Existing data isn't deleted.
{{/partial:admonition}}

### Carrier

Amplitude determines the user's mobile carrier using [`CTTelephonyNetworkInfo`](https://developer.apple.com/documentation/coretelephony/cttelephonynetworkinfo), which returns the registered operator of the `sim`. 

### COPPA control

COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking can all be enabled or disabled at one time. Apps that ask for information from children under 13 years of age must comply with COPPA.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
[[Amplitude instance] enableCoppaControl];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().enableCoppaControl()
```
{{/partial:tab}}
{{/partial:tabs}}

### Advertiser ID

Advertiser ID (also referred to as IDFA) is a unique identifier provided by the iOS and Google Play stores. As it's unique to every person and not just their devices, it's useful for mobile attribution.

[Mobile attribution](https://www.adjust.com/blog/mobile-ad-attribution-introduction-for-beginners/) is the attribution of an installation of a mobile app to its original source (such as ad campaign, app store search).

Mobile apps need permission to ask for IDFA, and apps targeted to children can't track at all. Consider using IDFV, device ID, or an email login system when IDFA isn't available.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
amplitude.adSupportBlock = ^{
    return [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
};
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
//  Converted to Swift 5.3 by Swiftify v5.3.22312 - https://swiftify.com/
amplitude.adSupportBlock = {
    return ASIdentifierManager.shared().advertisingIdentifier.uuidString
}
```
{{/partial:tab}}
{{/partial:tabs}}

Remember to add `AdSupport.framework` to your project.

### Set IDFA as device ID

Amplitude uses the IDFV as the device ID by default, but you can change this behavior. After you set up the logic to fetch IDFA, you can also call this [useAdvertisingIdForDeviceId](http://amplitude.github.io/Amplitude-iOS/Classes/Amplitude.html#//api/name/useAdvertisingIdForDeviceId) API to set the IDFA as your `deviceId`. 

### Device ID lifecycle

The SDK initializes the device ID in the following order, with the device ID being set to the first valid value encountered:

1. Device id fetched from the SQLite database
2. IDFA if `useAdvertisingIdForDeviceId` is true and `disableIDFA()` wasn’t called
3. IDFV If `disableIDFV()` wasn’t called
4. A randomly generated UUID

#### One user with multiple devices

A single user may have multiple devices, each having a different device ID. To ensure coherence, set the user ID consistently across all these devices. Even though the device IDs differ, Amplitude can still merge them into a single Amplitude ID, thus identifying them as a unique user.

#### Transfer to a new device

It's possible for multiple devices to have the same device ID when a user switches to a new device. When transitioning to a new device, users often transfer their applications along with other relevant data. The specific transferred content may vary depending on the application. In general, it includes databases and file directories associated with the app. However, the exact items included depend on the app's design and the choices made by the developers. If databases or file directories have been backed up from one device to another, the device ID stored within them may still be present. Consequently, if the SDK attempts to retrieve it during initialization, different devices might end up using the same device ID.

#### Get device ID

You can use the helper method `getDeviceId()` to get the value of the current `deviceId`.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
NSString *deviceId = [[Amplitude instance] getDeviceId];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
let deviceId = Amplitude.instance().getDeviceId()
```
{{/partial:tab}}
{{/partial:tabs}}

#### Custom device ID

You can assign a new device ID using `setDeviceId()`. When setting a custom device ID, make sure the value is sufficiently unique. Amplitude recommends using a UUID.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
[[Amplitude instance] setDeviceId:@"DEVICE_ID"];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().setDeviceId("DEVICE_ID")
```
{{/partial:tab}}
{{/partial:tabs}}

### Location tracking

Amplitude converts the IP of a user event into a location (GeoIP lookup) by default. This information may be overridden by an app's own tracking solution or user data.

### Carrier information

Amplitude-iOS can help report carrier information

If you want to enable SDK to report this information from devices, add `CoreTelephony.framework` as a dependency.

### Dynamic configuration

The iOS SDK lets you configure your apps to use [dynamic configuration](/docs/sdks/dynamic-configuration).
 This feature finds the best server URL automatically based on app users' location.

 To use, enable the `useDynamicConfig` flag.

- If you have your own proxy server and use `apiEndPoint` API, leave dynamic configuration off.
- If you have users in China Mainland, then Amplitude recommends using dynamic configuration.
- By default, this feature returns server URL of Amplitude's US servers, if you need to send data to Amplitude's EU servers, use `setServerZone` to set it to EU zone.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
[Amplitude instance].useDynamicConfig = YES;
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().useDynamicConfig = true
```
{{/partial:tab}}
{{/partial:tabs}}

### SSL pinning

SSL Pinning is a technique used in the client side to avoid man-in-the-middle attack by validating the server certificates again after SSL handshaking. Only use SSL pinning if you have a specific reason to do so. Contact Support before you ship any products with SSL pinning enabled.

If you installed the SDK using CocoaPods, you must enable the preprocessor macro via your Podfile by adding this post install hook:
<!-- vale off-->
```ruby
post_install do |installer_representation|
   installer_representation.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
         config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] ||= ['$(inherited)', 'AMPLITUDE_SSL_PINNING=1']
      end
   end
end
```
<!--vale on-->
If you installed the SDK directly from the source or Swift Package Manager, you can enable SSL pinning by adding the following preprocessor macro. See this [StackOverflow post](https://stackoverflow.com/questions/26928622/add-preprocessor-macro-to-a-target-in-xcode-6) to see how to add preprocessor macro.

```bash title="xCode Settings"
AMPLITUDE_SSL_PINNING=1
```

### Opt users out of tracking

Users may wish to opt out of tracking entirely, which means Amplitude won't track any of their events or browsing history. `setOptOut` provides a way to fulfill a user's requests for privacy.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
[[Amplitude instance] setOptOut:YES]; // disables instrumentation
[[Amplitude instance] setOptOut:NO]; // enables instrumentation
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().optOut = true // disables instrumentation
Amplitude.instance().optOut = false // enables instrumentation
```
{{/partial:tab}}
{{/partial:tabs}}

### tvOS and watchOS

This SDK works with tvOS and watchOS apps. To begin, follow the same setup instructions for iOS apps.

{{partial:admonition type="note" heading=""}}
tvOS apps don't have persistent storage (they only have temporary storage), so for tvOS the SDK is configured to upload events as soon as they're logged.

This means `eventUploadThreshold` is set to 1 by default for tvOS. it's assumed that Apple TV devices have a stable internet connection and as a result, uploading events immediately is reasonable.

If you wish to revert back to the iOS batching behavior, you can do so by changing `eventUploadThreshold` (this is set by default to 30 for iOS).
{{/partial:admonition}}

```objc
[[Amplitude instance] setEventUploadThreshold:30];
```

### iOS extensions

The SDK allows for tracking in iOS extensions. To set up tracking in iOS extensions, follow the same setup instructions but initialize the SDK in your extension's `viewDidLoad` method instead from `application:didFinishLaunchingWithOptions:`.

There are a few things to highlight:

- The `viewDidLoad` method gets called every time your extension is opened. This means that the SDK's `initializeApiKey` method gets called every single time. However, this is okay because it safely ignores calls after the first one. You can protect the initialization with something like a `dispatch_once` block.
- Amplitude's sessions are defined for an app use case. Depending on your expected extension use case, you might not want to enable `defaultTracking.sessions`, or you may want to extend the `minTimeBetweenSessionsMillis` to be longer than five minutes. You should experiment with these two settings to get your desired session definition.
- If you don't expect users to keep your extension open long, you can decrease `eventUploadPeriodSeconds` to something shorter than 30 seconds to upload events at shorter intervals. You can also manually call `[[Amplitude instance] uploadEvents];` to manually force an upload.

### App Clips

The SDK also allows for tracking in App Clips. To set up tracking in App Clips, you need to install Amplitude-iOS under your App Clip target. Make sure the amplitude-iOS SDK is installed on your main app first.

#### CocoaPods

After creating an App Clip target, open your project Podfile and append the following code:

```ruby
target 'appClipTarget' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!
  pod 'Amplitude', :git => 'https://github.com/Amplitude/Amplitude-iOS.git'
end
```

Save the Podfile and run `pod install`

#### Swift Package Manager

1. Open your App Clip target in Xcode. And click the + button under `Framework, Libraries, and Embedded Content` section
2. Select `Amplitude` under `Amplitude Package` and click `add` button

### Push notification events

Don't send push notification events client-side via the iOS SDK. Because a user must open the app to initialize the Amplitude SDK in order for the SDK to send the event, events aren't sent to the Amplitude servers until the next time the user opens the app. This can cause data delays.

You can use [mobile marketing automation partners](https://amplitude.com/integrations?category=mobile-marketing-automation) or the [HTTP API V2](https://developers.amplitude.com/docs/http-api-v2) to send push notification events to Amplitude.

### Offline Mode

The Amplitude SDK supports offline usage through the `setOffline(isOffline)` method. By default, offline mode is disabled.

When offline mode is enabled, events are saved to a local storage but will not be sent to the Amplitude servers. 

When offline mode is disabled, any pending events are sent to Amplitude's servers immediately. 

To limit the necessary permissions required by the SDK, the SDK does not automatically detect network connectivity. Instead, you must manually call `setOffline()` to enable or disable offline mode.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
[[Amplitude instance] setOffline:YES]; // enables offline mode
[[Amplitude instance] setOffline:NO]; // disables offline mode
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
Amplitude.instance().setOffline(true); // enables offline mode
Amplitude.instance().setOffline(false) // disables offline mode
```
{{/partial:tab}}
{{/partial:tabs}}

### Middleware

Middleware lets you extend Amplitude by running a sequence of custom code on every event. This pattern is flexible and can be used to support event enrichment, transformation, filtering, routing to third-party destinations, and more.

Each middleware is a simple interface with a run method:

```objc
- (void)run:(AMPMiddlewarePayload *_Nonnull)payload next:(AMPMiddlewareNext _Nonnull)next;
```

The `payload` contains the `event` being sent and an optional `extra` that lets you pass custom data to your own middleware implementations.

To invoke the next middleware in the queue, use the `next` function. You must call `next(payload)` to continue the middleware chain. If a middleware doesn't call `next`, then the event processing stop executing after the current middleware completes.

Add middleware to Amplitude via `client.addEventMiddleware`. You can add as many middleware as you like. Each middleware runs in the order in which it was added.

You can find examples for [Objective-C](https://github.com/amplitude/ampli-examples/blob/main/ios/objective-c/AmpliObjectiveCSampleApp/AmpliObjectiveCSampleApp/AppDelegate.m#L65) and [Swift](https://github.com/amplitude/ampli-examples/blob/main/ios/swift/AmpliSwiftSampleApp/Shared/AmpliSwiftSampleAppApp.swift#L48).

### Security

iOS automatically protects application data by storing each apps data in its own secure directory. This directory is usually not accessible by other applications. However, if a device is jailbroken, apps are granted root access to all directories on the device.

To prevent other apps from accessing your apps Amplitude data on a jailbroken device, we recommend setting a unique instance name for your SDK. This will create a unique database that is isolated from other apps.

{{partial:tabs tabs="Obj-c, Swift"}}
{{partial:tab name="Obj-c"}}
```objc
Amplitude* amplitude = [Amplitude instanceWithName:@"my-unqiue-instance-name"];
```
{{/partial:tab}}
{{partial:tab name="Swift"}}
```swift
let amplitude = Amplitude.instanceWithName("my-unqiue-instance-name")
```
{{/partial:tab}}
{{/partial:tabs}}

### Apple privacy manifest

Starting December 8, 2020, Apple requires a privacy manifest file for all new apps and app updates. Apple expects to make this mandatory in the Spring of 2024. As Amplitude is a third-party to your app, you need to ensure you properly disclose to your users the ways you use Amplitude in regards to their data.

{{partial:admonition type="note" heading="Update privacy manifest based on your app"}}
Amplitude sets privacy manifest based on a default configuration. Update the privacy manifest according to your configuration and your app.
{{/partial:admonition}}

#### NSPrivacyTracking


{{partial:admonition type="info" heading=""}}
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
| https://api2.amplitude.com | The default HTTP V2 endpoint. |
| https://api.eu.amplitude.com | EU endpoint if `Amplitude.instance().setServerZone(AMPServerZone.EU)`.|
| https://regionconfig.amplitude.com | Batch endpoint if `Amplitude.instance().useDynamicConfig = true`.|
| https://regionconfig.eu.amplitude.com | Batch EU endpoint if `Amplitude.instance().setServerZone(AMPServerZone.EU)` and `Amplitude.instance().useDynamicConfig = true`.|

#### NSPrivacyAccessedAPITypes

The SDK doesn't use any API by default. Learn more [here](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api).

#### Create your app's privacy report

Follow the steps on how to [create your app's privacy](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests#4239187).