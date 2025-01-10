---
id: 2bf2ce66-3b9f-4021-81b0-28d9661af92e
blueprint: flutter_sdk
title: 'Flutter SDK 4.0'
sdk_status: Beta
article_type: core
major_version: 40
supported_languages:
  - dart
github_link: 'https://github.com/amplitude/Amplitude-Flutter/tree/beta'
releases_url: 'https://github.com/amplitude/Amplitude-Flutter/releases'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1721756317
source: 'https://www.docs.developers.amplitude.com/data/sdks/flutter-4/'
platform: Flutter
package_name: amplitude_flutter
---
This is the official documentation for the Amplitude Analytics Flutter SDK. The Flutter SDK lets you send events from your Flutter application to Amplitude.

## Install the SDK

1. Go to the `pubspec.yaml` file and add Amplitude SDK as a dependency.

    ```yml
    dependencies:
        amplitude_flutter: ^4.0.0-beta.1
    ```

2. Run `flutter pub get` in the terminal to install the SDK.

### iOS installation

Add `platform :ios, '13.0'` to your Podfile. Run `pod install` under the ios directory of your Flutter project to update the CocoaPods dependencies.

To enable Bitcode, follow Flutter's [documentation](https://github.com/flutter/flutter/wiki/Creating-an-iOS-Bitcode-enabled-app).

### Web installation (optional)

Our Flutter SDK uses our [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2) under the hood
for Flutter Web using Dart's JavaScript interop. This involves making our SDK available within the global JS scope. Append
the following Browser SDK 2 snippet into `web/index.html` in your Flutter project to do so.

```html
<script type="text/javascript">
  !function(){"use strict";!function(e,t){var r=e.amplitude||{_q:[],_iq:{}}
  ;if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.")
  ;else{var n=function(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}}
  ,s=function(e,t,r){return function(n){e._q.push({name:t,args:Array.prototype.slice.call(r,0),resolve:n})}}
  ,o=function(e,t,r){e._q.push({name:t,args:Array.prototype.slice.call(r,0)})}
  ,i=function(e,t,r){e[t]=function(){if(r)return{promise:new Promise(s(e,t,Array.prototype.slice.call(arguments)))};o(e,t,Array.prototype.slice.call(arguments))}}
  ,a=function(e){for(var t=0;t<g.length;t++)i(e,g[t],!1);for(var r=0;r<m.length;r++)i(e,m[r],!0)}
  ;r.invoked=!0;var c=t.createElement("script")
  ;c.type="text/javascript",c.integrity="sha384-R0H1kXlk6r2aEQMtwVcPolpk0NAuIqM/8NlxAv24Gr3/PBJPl+9elu0bc3o/FDjR",c.crossOrigin="anonymous",c.async=!0
  ,c.src="https://cdn.amplitude.com/libs/analytics-browser-2.11.10-min.js.gz"
  ,c.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")}
  ;var l=t.getElementsByTagName("script")[0];l.parentNode.insertBefore(c,l);for(var u=function(){return this._q=[],this}
  ,p=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],d=0;d<p.length;d++)n(u,p[d]);r.Identify=u
  ;for(var f=function(){return this._q=[],this},v=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],y=0;y<v.length;y++)n(f,v[y]);r.Revenue=f;var g=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset","extendSession"],m=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"]
  ;a(r),r.createInstance=function(e){return r._iq[e]={_q:[]},a(r._iq[e]),r._iq[e]},e.amplitude=r}}(window,document)}();
</script>
```

## Initialize the SDK

Before you instrument your application, initialize the SDK with your Amplitude project's API key.

```dart
import 'package:amplitude_flutter/amplitude.dart';
import 'package:amplitude_flutter/configuration.dart';
import 'package:amplitude_flutter/events/base_event.dart';

class YourClass {
  Future<void> exampleForAmplitude() async {
    // Create and initailize the instance
    final Amplitude analytics = Amplitude(Configuration(
        apiKey: 'YOUR-API-KEY',
    ));

    // Wait until the SDK is initialized
    await amplitude.isBuilt;

    // Track an event
    amplitude.track(BaseEvent(
        eventType: 'BUTTON_CLICKED',
        eventProperties: {'Hover Time': '100ms'},
    ));

    // Send events to the server
    amplitude.flush()
  }
}
```

## Configure the SDK

| Name  | Description | Default Value |
| --- | --- | --- |
| `apiKey` | `String`. The apiKey of your project. | `null` |
| `flushQueueSize` | `int`. SDK attempts to upload once unsent event count exceeds the event upload threshold or reaches `flushIntervalMillis` interval.  | `30` |
| `flushIntervalMillis` | `int`. The amount of time SDK attempts to upload the unsent events to the server or reaches the `flushQueueSize` threshold. The value is in milliseconds. | `30000` |
| `instanceName` | `String`. The name of the instance. Instances with the same name shares storage and identity. For isolated storage and identity use a unique `instanceName` for each instance.  | `$default_instance`|
| `optOut` | `bool`. Opt the user out of tracking. | `false` |
| `logLevel` | `LogLevel` The log level. `LogLevel.off`, `LogLevel.error`, `LogLevel.warn`, `LogLevel.log`, `LogLevel.debug` | `LogLevel.warn` |
| `minIdLength` | `int`. The minimum length for user id or device id. | `5` |
| `partnerId` | `int`. The partner id for partner integration. | `null` |
| `flushMaxRetries` | `int`. Maximum retry times.  | `5` |
| `useBatch` | `bool`. Whether to use batch API. | `false` |
| `serverZone` | `ServerZone`. `ServerZone.us` or `ServerZone.eu`. The server zone to send to. Adjust server URL based on this config. | `ServerZone.us` |
| `serverUrl` | `String`. The server URL events upload to. | `https://api2.amplitude.com/2/httpapi` |
| `minTimeBetweenSessionsMillis` | `int`. The amount of time for session timeout. The value is in milliseconds. Defaults to 300,000 (5 minutes) for iOS/Android and 1,800,000 (30 minutes) for Web. Overriding this value changes the session timeout for all platforms. This maps to `minTimeBetweenSessionsMillis` for iOS/Android and `sessionTimeout` for Web.| `300000` |
| `trackingOptions` | `TrackingOptions`. Options to control the values tracked in SDK. | `enable` |

### Configuration for Android and iOS

| Name  | Description | Default Value |
| --- | --- | --- |
| `defaultTracking` | `DefaultTrackingOptions`. Options to control the default events tracking. | Check [Tracking default events](#tracking-default-events). |
| `enableCoppaControl` | `bool`. Whether to enable COPPA control for tracking options. | `false` |
| `flushEventsOnClose` | `bool`. Flush unsent events on app close. | `true` |
| `identifyBatchIntervalMillis` | `int`. The amount of time SDK attempts to batch intercepted identify events. The value is in milliseconds| `30000` |
| `migrateLegacyData` | `bool`. Whether to migrate maintenance Android SDK and maintenance iOS SDK data (events, user/device ID). Learn more at the configuration section of the underlying [Kotlin SDK](/docs/sdks/analytics/android/android-kotlin-sdk/#configuration) and [Swift SDK](/docs/sdks/analytics/ios/ios-swift-sdk/#configuration). | `true`|

### Configuration for web and Android
| Name  | Description | Default Value |
| --- | --- | --- |
| `deviceId` | `String`. The device ID to use for this device. If no deviceID is provided, one is generated automatically. | `null` |

### Configuration for Android

| Name  | Description | Default Value |
| --- | --- | --- |
| `locationListening` | `bool`. Whether to enable Android location service. Learn more [here](/docs/sdks/analytics/android/android-kotlin-sdk/#location-tracking).| `true` |
| `useAdvertisingIdForDeviceId` | `bool`. Whether to use advertising id as device id. Check [here](/docs/sdks/analytics/android/android-kotlin-sdk/#advertiser-id) for required module and permission. | `false` |
| `useAppSetIdForDeviceId` | `bool`.  Whether to use app set id as device id. Check [here](/docs/sdks/analytics/android/android-kotlin-sdk/#app-set-id) for required module and permission. | `false` |

### Configuration for web
| Name  | Description | Default Value |
| --- | --- | --- |
| `appVersion` | `String`. Sets an app version for events tracked. This can be the version of your application. For example: "1.0.0". | `null` |
| `cookieOptions.domain` | `String`. Sets the domain property of cookies created. | `null` |
| `cookieOptions.expiration` | `int`. Sets expiration of cookies created in days. | 365 days |
| `cookieOptions.sameSite` | `String`. Sets `SameSite` property of cookies created. | `null` |
| `cookieOptions.secure` | `bool`. Sets `Secure` property of cookies created. | `null` |
| `cookieOptions.upgrade` | `bool`. Sets upgrading from cookies created by [maintenance Browser SDK](/docs/sdks/analytics/browser/javascript-sdk). If `true`, new Browser SDK deletes cookies created by maintenance Browser SDK. If `false`, Browser SDK keeps cookies created by maintenance Browser SDK. | `null` |
| `identityStorage` | `String`. Sets storage API for user identity. Options include cookie for document.cookie, localStorage for localStorage, or none to opt-out of persisting user identity. | `cookie` |
| `userId` | `String`. Sets an identifier for the tracked user. Must have a minimum length of 5 characters unless overridden with the minIdLength option. | `null` |
| `transport` | `String`. Sets request API to use by name. Options include fetch for fetch, xhr for XMLHTTPRequest, or beacon for navigator.sendBeacon. | `fetch` |
| `fetchRemoteConfig` | `bool`. Whether the SDK fetches remote configuration. See [here](https://amplitude.com/docs/sdks/analytics/browser/browser-sdk-2#remote-configuration) for more information. | `false` |


### Configure batching behavior

To support high-performance environments, the SDK sends events in batches. Every event logged by the `track` method is queued in memory. Events are flushed in batches in background. You can customize batch behavior with `flushQueueSize` and `flushIntervalMillis`. By default, the serverUrl will be `https://api2.amplitude.com/2/httpapi`. For customers who want to send large batches of data at a time, set `useBatch` to `true` to set `setServerUrl` to batch event upload API `https://api2.amplitude.com/batch`. Both the regular mode and the batch mode use the same events upload threshold and flush time intervals.

```dart
final Amplitude analytics = Amplitude(Configuration(
    apiKey: 'YOUR-API-KEY',
    flushIntervalMillis: 50000,
    flushQueueSize: 20,
));
```

### EU data residency

You can configure the server zone when initializing the client for sending data to Amplitude's EU servers. The SDK sends data based on the server zone if it's set.

{{partial:admonition type="note" heading=""}}
For EU data residency, the project must be set up inside Amplitude EU. You must initialize the SDK with the API key from Amplitude EU.
{{/partial:admonition}}

```dart
final Amplitude analytics = Amplitude(Configuration(
    apiKey: 'YOUR-API-KEY',
    serverZone: ServerZone.eu,
));
```

## Track

Events represent how users interact with your application. For example, "Song Played" may be an action you want to track.

```dart
amplitude.track(BaseEvent('Song Played'));
```

You can also optionally include event properties.

```dart
amplitude.track(BaseEvent('Song Played', eventProperties: {'title': 'Happy Birthday'}));
```

Refer to the [BaseEvent](https://github.com/amplitude/Amplitude-Flutter/blob/beta/lib/events/base_event.dart) interface for all available fields.

## Identify

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties. Declare the operations via a provided Identify interface. You can chain together multiple operations in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.

{{partial:admonition type="note" heading=""}}
If the Identify call is sent after the event, the results of operations will be visible immediately in the dashboard user's profile area, but it will not appear in chart result until another event is sent after the Identify call. So the identify call only affects events going forward. More details [here](/docs/data/user-properties-and-events).
{{/partial:admonition}}

You can handle the identity of a user using the identify methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms. Send an identify call containing those user property operations to Amplitude server to tie a user's events with specific user properties.

```dart
final Identify identify = Identify()
    ..set('color', 'green')
amplitude.identify(identify)
```

## Track default events

The SDK can track more default events. You can configure it to track the following events by default:

- Sessions
- App lifecycles
- Deep links (now only available on Android)

| Name | Type | Default Value | Description |
|-|-|-|-|
`config.defaultTracking.sessions` | Optional. `bool` | `true` | Enables session tracking. If value is `true`, Amplitude tracks session start and session end events otherwise, Amplitude doesn't track session events. When this setting is `false`, Amplitude tracks `sessionId` only.<br /><br />See [Tracking sessions](#tracking-sessions) for more information.|
`config.defaultTracking.appLifecycles` | Optional. `bool` | `false` | Enables application lifecycle events tracking. If value is `true`, Amplitude tracks application installed, application updated, application opened, and application backgrounded events.<br /><br />Event properties tracked includes: `[Amplitude] Version`,<br /> `[Amplitude] Build`,<br /> `[Amplitude] Previous Version`, `[Amplitude] Previous Build`, `[Amplitude] From Background`<br /><br />See [Tracking application lifecycles](#tracking-application-lifecycles) for more information.|
`config.defaultTracking.deepLinks` | Optional. `bool` | `false` | Only available on Android. It enables deep link tracking. If value is `true`, Amplitude tracks deep link opened events.<br /><br />Event properties tracked includes: `[Amplitude] Link URL`, `[Amplitude] Link Referrer`<br /><br />See [Tracking deep links](#tracking-deep-links) for more information.|

You can enable Amplitude to start tracking all events mentioned above, use the code sample below. Otherwise, you can omit the configuration to keep only session tracking enabled.

```dart
Amplitude(
  Configuration(
    apiKey: 'YOUR-API-KEY',
    defaultTracking: DefaultTrackingOptions.all()
  )
);
```

{{partial:admonition type="warning" heading=""}}
Amplitude may add more events in a future version, and this configuration enables tracking for those events as well.
{{/partial:admonition}}

Similarly, you can prevent Amplitude from track default events with the following code sample:

```dart
Amplitude(
  Configuration(
    apiKey: 'YOUR-API-KEY',
    defaultTracking: DefaultTrackingOptions.none()
  )
);
```

You can also customize the tracking with `DefaultTrackingOptions`.

```dart
Amplitude(
  Configuration(
    apiKey: 'YOUR-API-KEY',
    defaultTracking: DefaultTrackingOptions(
      sessions: false,
      appLifecycles: true,
      deepLinks: true,
    )
  )
);
```

### Track sessions

When you set `configuration.defaultTracking.sessions: true`, you instruct Amplitude to track session events.

```dart
Amplitude(
  Configuration(
    apiKey: 'YOUR-API-KEY',
    defaultTracking: DefaultTrackingOptions(
      sessions: true,
    )
  )
);
```

### Track application lifecycles

When you set `configuration.defaultTracking.appLifecycles` to `true`, Amplitude tracks application lifecycle events.

```dart
Amplitude(
  Configuration(
    apiKey: 'YOUR-API-KEY',
    defaultTracking: DefaultTrackingOptions(
      appLifecycles: true,
    )
  )
);
```

After enabling this setting, Amplitude tracks the following events:

- `[Amplitude] Application Installed`, this event fires when a user opens the application for the first time right after installation.
- `[Amplitude] Application Updated`, this event fires when a user opens the application after updating the application.
- `[Amplitude] Application Opened`, this event fires when a user launches or foregrounds the application after the first open.
- `[Amplitude] Application Backgrounded`, this event fires when a user backgrounds the application.

### Track deep links

{{partial:admonition type="note" heading=""}}
Deep link tracking is available on Android.
{{/partial:admonition}}

When you set `configuration.defaultTracking.deepLinks` to `true`, Amplitude tracks events related to deep links in your application.

```dart
Amplitude(
  Configuration(
    apiKey: 'YOUR-API-KEY',
    defaultTracking: DefaultTrackingOptions(
      deepLinks: true,
    )
  )
);
```

After enabling this setting, Amplitude tracks the `[Amplitude] Deep Link Opened` event with the URL and referrer information.

## User groups

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, then the count includes the group.

For example, you want to group your users based on what organization they're in by using an 'orgId'. Joe is in 'orgId' '10', and Sue is in 'orgId' '15'. Sue and Joe both perform a certain event. You can query their organizations in the Event Segmentation Chart.

When setting groups, define a `groupType` and `groupName`. In the previous example, 'orgId' is the `groupType` and '10' and '15' are the values for `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'.

Setting a group also sets the `groupType:groupName` as a user property, and overwrites any existing `groupName` value set for that user's `groupType`, and the corresponding user property value. `groupType` is a string, and `groupName` can be either a string or an array of strings to indicate that a user is in multiple groups.

{{partial:admonition type="example" heading=""}}
If Joe is in 'orgId' '15', then the `groupName` would be '15'.

```dart
// set group with a single group name
amplitude.setGroup('orgId', '15');
```

If Joe is in 'sport' 'tennis' and 'soccer', then the `groupName` would be '["tennis", "soccer"]'.

```dart
// set group with multiple group names
amplitude.setGroup('sport', ['tennis', 'soccer']);
```
{{/partial:admonition}}

You can also set **event-level groups** by passing an `Event` Object with `groups` to `track`. With event-level groups, the group designation applies only to the specific event being logged, and doesn't persist on the user unless you explicitly set it with `setGroup`.

```dart
amplitude.track(BaseEvent('event type',
    eventProperties: {'event property': 'event property value'},
    groups: {'ordId': '15'}));
```

## Group identify

Use the Group Identify API to set or update the properties of particular groups. Keep these considerations in mind:

- Updates affect only future events, and don't update historical events.
- You can track up to 5 unique group types and 10 total groups.

The `groupIdentify` method accepts a group type string parameter and group name object parameter, and an Identify object that's applied to the group.

```dart
final groupType = 'plan';
final groupName = 'enterprise';

final identify = Identify().set('key', 'value');
amplitude.groupIdentify(groupType, groupName, identify);
```

## Track revenue

Amplitude can track revenue generated by a user. Revenue is tracked through distinct revenue objects, which have special fields that are used in Amplitude's Event Segmentation and Revenue LTV charts. This allows Amplitude to automatically display data relevant to revenue in the platform. Revenue objects support the following special properties, as well as user-defined properties through the `eventProperties` field.

```dart
final revenue = Revenue()
  ..productId = 'com.company.productId'
  ..price = 3.99
  ..quantity = 3;
amplitude.revenue(revenue);
```

| Name   | Description  |
| --- | --- |
| `productId` | Optional. String. An identifier for the product. Amplitude recommends something like the Google Play Store product ID. Defaults to `null`.|
| `quantity `| Required. Integer. The quantity of products purchased. Note: revenue = quantity * price. Defaults to 1 |
| `price `| Required. Double. The price of the products purchased, and this can be negative. Note: revenue = quantity * price. Defaults to `null`.|
| `revenueType`| Optional, but required for revenue verification. String. The revenue type (for example, tax, refund, income). Defaults to `null`.|
| `receipt`| Optional. String. The receipt identifier of the revenue. For example, "123456". Defaults to `null`. |
| `receiptSignature`| Optional, but required for revenue verification. String. Defaults to `null`. |

## Custom user ID

If your app has its login system that you want to track users with, call `setUserId` at any time.

```dart
amplitude.setUserId('user@amplitude.com');
```

## Custom device ID

You can assign a new device ID using `deviceId`. When setting a custom device ID, make sure the value is sufficiently unique. Amplitude recommends using a UUID.

```dart
amplitude.setDeviceId('your-unique-device-id');
```

## Reset when a user logs out

`reset` is a shortcut to anonymize users after they log out, by:

* setting `userId` to `null`
* setting `deviceId` to a new value based on current configuration

With an empty `userId` and a completely new `deviceId`, the current user would appear as a brand new user in dashboard.

```dart
amplitude.reset();
```
