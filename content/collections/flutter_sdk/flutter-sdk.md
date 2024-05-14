---
id: 91ff3c42-e0d0-493c-9fe4-65262f814883
blueprint: flutter_sdk
title: 'Flutter SDK'
sdk_status: current
article_type: core
supported_languages:
  - dart
github_link: 'https://github.com/amplitude/Amplitude-Flutter'
releases_url: 'https://github.com/amplitude/Amplitude-Flutter/releases'
api_reference_url: 'https://pub.dev/documentation/amplitude_flutter/latest/'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1715724636
migration_guide:
  - 4be26940-0200-46a2-a614-a2c8df0808b1
shields_io_badge: 'https://img.shields.io/pub/v/amplitude_flutter.svg'
---
This is the official documentation for the Amplitude Analytics Flutter SDK.

## Install the SDK

1. Go to the `pubspec.yaml` file and add Amplitude SDK as a dependency.

    ```yml
    dependencies:
      amplitude_flutter: ^3.13.0
    ```

2. Run `flutter pub get` in the terminal to install the SDK.

### iOS installation

Add `platform :ios, '10.0'` to your Podfile.

To enable Bitcode, follow Flutter's [documentation](https://github.com/flutter/flutter/wiki/Creating-an-iOS-Bitcode-enabled-app).

## Initialize the SDK

Before you can instrument, you must initialize the SDK using the API key for your Amplitude project.

```dart
import 'package:amplitude_flutter/amplitude.dart';
import 'package:amplitude_flutter/identify.dart';

class YourClass {
  Future<void> exampleForAmplitude() async {
    // Create the instance
    final Amplitude analytics = Amplitude.getInstance(instanceName: "project");

    // Initialize SDK
    analytics.init(widget.apiKey);

    // Log an event
    analytics.logEvent('MyApp startup', eventProperties: {
      'friend_num': 10,
      'is_heavy_user': true
    });
  }
}
```

## Configure the SDK

The Amplitude Flutter SDK runs on the top of the [Amplitude Android Maintenance SDK](/sdks/analytics-sdks/android-sdk/android-sdk), [Amplitude iOS Maintenance SDK](/sdks/analytics-sdks/ios-swift) and [Amplitude JavaScript Maintenance SDK](/sdks/analytics-sdks/browser-sdk/javascript-sdk). The following are the Dart settable config options.
For other default configurations:

- on Android, check the [Android Configuration](/sdks/analytics-sdks/android-sdk/android-sdk#configuration)
- on iOS, check the [iOS configuration](/sdks/analytics-sdks/ios-swift#configuration)
- on browser, check the [browser configuration](./sdks/analytics-sdks/browser-sdk/javascript-sdk#configuration)

| Name  | Description | Default Value |
| --- | --- | --- |
| `enableCoppaControl()` | Enable COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking. Not supported on Flutter Web. | Coppa control is disabled by default. |
| `disableCoppaControl()` | Disable COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking. Not supported on Flutter Web. | Coppa control is disabled by default. |
| `setMinTimeBetweenSessionsMillis()` | `int`. The amount of time for session timeout if disable foreground tracking. For example, `Amplitude.getInstance().setMinTimeBetweenSessionsMillis(100000)`. The input parameter is in milliseconds. | `5 minutes` |
| `setEventUploadThreshold()` | `int`. The maximum number of events that can be stored locally before forcing an upload. For example, `Amplitude.getInstance().setEventUploadThreshold(30)`.| `30` |
| `setEventUploadPeriodMillis()` | `int`. The amount of time waiting to upload pending events to the server in milliseconds. For example, `Amplitude.getInstance().setEventUploadPeriodMillis(30000)`.| `30000` |
| `setServerZone()` | `String`. The server zone to send to, will adjust server url based on this config. For example, `Amplitude.getInstance().setServerZone(EU)`.| `US` |
| `setServerUrl()` | `String`. The API endpoint URL that events are sent to. Automatically selected by `ServerZone`. For example, `Amplitude.getInstance().setServerUrl(https://www.your-server-url.com)`. | `https://api2.amplitude.com/` |
| `setUseDynamicConfig()` | `bool`. Find the best server url automatically based on users' geo location. For example, `setUseDynamicConfig(true)`. | `false` |
| `setOptOut()` | `bool`. Opt the user out of tracking. For example, `Amplitude.getInstance().setOptOut(true)`.| `false` |
| `trackingSessionEvents()` | `bool`. Whether to automatically log "[Amplitude] Session Start" and "[Amplitude] Session End" session events corresponding to the start and end of a user's session. Not supported on Flutter Web. [Learn more](/#flutter-web-support). | `false` |
| `useAppSetIdForDeviceId()` | Only for Android. Whether to use app ser id as device id on Android side.  Check [here](../android/#app-set-id) for the required module and permission. For example, `Amplitude.getInstance().useAppSetIdForDeviceId(true)` | By default, the deviceId will be UUID+"R" |
    
### Configure batching behavior

To support high-performance environments, the SDK sends events in batches. Every event logged by the `logEvent` method is queued in memory. Events are flushed in batches in background. You can customize batch behavior with `setEventUploadThreshold`. By default, the serverUrl will be `https://api2.amplitude.com/`. This SDK doesn't support batch mode, the [batch API](apis/batch-event-upload) endpoint.

```dart
// Events queued in memory will flush when number of events exceed upload threshold
// Default value is 30
Amplitude.getInstance().setEventUploadThreshold(1);

// Events queue will flush every certain milliseconds based on setting
// Default value is 30,000 milliseconds
Amplitude.getInstance().setEventUploadPeriodMillis(10000);
```

### EU data residency

Beginning with version 3.6.0, you can configure the server zone after initializing the client for sending data to Amplitude's EU servers. The SDK sends data based on the server zone if it's set.
 The server zone configuration supports dynamic configuration as well.

For earlier versions, you need to configure the `serverURL` property after initializing the client.

{{partial:admonition type="note" heading=""}}
For EU data residency, the project must be set up inside Amplitude EU. You must initialize the SDK with the API key from Amplitude EU.
{{/partial:admonition}}

```dart
// For versions starting from 3.6.0
// No need to call setServerUrl for sending data to Amplitude's EU servers
Amplitude.getInstance().setServerZone("EU");

// For earlier versions
Amplitude.getInstance().setServerUrl("https://api.eu.amplitude.com")
```

## Send events

Events represent how users interact with your application. For example, "button clicked" may be an action you want to track.

```dart
Amplitude.getInstance().logEvent('BUTTON_CLICKED');
```

### Send events with properties

Events can also contain properties. They provide context about the event taken. For example, "hover time" may be a relevant event property to "button click"

```dart
Amplitude.getInstance().logEvent('BUTTON_CLICKED', {"Hover Time": "100ms"});
```

### Flush events

Events are typically stored in a buffer and flushed periodically. This behavior is configurable. You can also flush events manually

```dart
Amplitude.getInstance().uploadEvents();
```

## User properties

User properties help you understand your users at the time they performed some action within your app such as their device details, their preferences, or language.

Amplitude-Flutter's `identify` manages this feature. You need to import `identify` before using it.

```dart
import 'package:amplitude_flutter/identify.dart';
```

{{partial:admonition type="warning" heading=""}}
Don't track any user data that may be against your privacy terms.
{{/partial:admonition}}

### set

`set` sets the value of a user property. You can also chain together multiple identify calls.

```dart
final Identify identify = Identify()
                          ..set('gender','female')
                          ..set('age',20);
Amplitude.getInstance().identify(identify);
```

### setOnce

`setOnce` sets the value of a user property one time. Later calls using `setOnce` are ignored.

```dart
final Identify identify1 = Identify();
identify1.setOnce('sign_up_date', '2015-08-24');
Amplitude.getInstance().identify(identify1);
final Identify identify2 = Identify();
identify2.setOnce('sign_up_date', '2015-08-24');
Amplitude.getInstance().identify(identify2);// is ignored
```

### add

`add` increments a user property by some numerical value. If the user property doesn't have a value set yet, it's initialized to 0 before being incremented.

```dart
final Identify identify = Identify().add('karma', 0.123);
Amplitude.getInstance().identify(identify);
```

### preInsert

Adds a value or values to a user property at the beginning of the list, if the value doesn't exist in the user property yet.

If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, nothing happens.

```dart
final Identify identify = Identify()
                          ..preInsert('existing_list', 'some_property')
Amplitude.getInstance().identify(identify);
```

### postInsert

Adds a value or values to a user property at the end of the list, if the value doesn't exist in the user property yet. If the user property doesn't have a value set yet,
 it's initialized to an empty list before the new values are inserted. If the user property has an existing value, nothing happens.

```dart
final Identify identify = Identify()
                          ..postInsert('existing_list','some_property')
Amplitude.getInstance().identify(identify);
```

### Set multiple user properties

You can use `setUserProperties` as a shorthand to set multiple user properties at one time. This method is a wrapper around `Identify.set` and `identify`.

```dart
Map<String, dynamic> userProps = {
  'KEY': 'VALUE',
  'OTHER_KEY': 'OTHER_VALUE'
};
Amplitude.getInstance().setUserProperties(userProperties);
```

### Arrays in user properties

You can use arrays as user properties. You can directly set arrays or use append to generate an array.

```dart
const colors = ["rose", "gold"];
const numbers = [4, 5];
final Identify identify = Identify()
                          ..set("colors", colors)
                          ..append("ab-tests", "campaign_a")
                          ..prepend("existing_list", numbers);
Amplitude.getInstance().identify(identify);
```

#### prepend and append

- `prepend` prepends a value or values to a user property.
- `append` appends a value or values to a user property array.
    If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are added. If the user property has an existing value and it's not a list, it's converted
     into a list with the new value added.

```dart
const array = ["some_string", 56];
final Identify identify = Identify()
                          ..append("ab-tests", "new-user-test")
                          ..prepend("some_list", array)
Amplitude.getInstance().identify(identify);
```

### Remove user properties

`clearUserProperties` clears all the current user's user properties.

{{partial:admonition type="warning" heading=""}}
The result is irreversible! Amplitude can't sync the user's user property values from before the wipe to any future events.
{{/partial:admonition}}

```dart
Amplitude.getInstance().clearUserProperties();
```

#### remove

`remove` removes a value or values from a user property. If the item doesn't exist in the user property, nothing happens.

```dart
const array = ["some_string", 56];
final Identify identify = Identify()
                          ..remove("ab-tests", "new-user-test")
                          ..remove("some_list",array);
Amplitude.getInstance().identify(identify);
```

#### unset

`unset` unsets and removes a user property.

```dart
final Identify identify = Identify()
                          ..unset("ab-tests", "new-user-test")
                          ..unset("some_list",array);
Amplitude.getInstance().identify(identify)
```

## User groups

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, then the count includes the group.

For example, you want to group your users based on what organization they're in by using an 'orgId'. Joe is in 'orgId' '10', and Sue is in 'orgId' '15'. Sue and Joe both perform a certain event. You can query their organizations in the Event Segmentation Chart.

When setting groups, define a `groupType` and `groupName`. In the previous example, 'orgId' is the `groupType` and '10' and '15' are the values for `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'.

Setting a group also sets the `groupType:groupName` as a user property, and overwrites any existing `groupName` value set for that user's `groupType`, and the corresponding user property value. `groupType` is a string, and `groupName` can be either a string or an array of strings to indicate that a user is in multiple groups.

{{partial:admonition type="example" heading=""}}
If Joe is in 'orgId' '15', then the `groupName` would be '15'.

```dart
// set group with a single group name
Amplitude.getInstance().setGroup("orgId", "15");
```

If Joe is in 'sport' 'tennis' and 'soccer', then the `groupName` would be '["tennis", "soccer"]'.

```dart
// set group with multiple group names
Amplitude.getInstance().setGroup("sport", ["tennis", "soccer"]);
```
{{/partial:admonition}}
    

{{partial:admonition type="note" heading=""}}
Event-level groups is unavailable and its availability is yet to be determined.
{{/partial:admonition}}

## Track revenue

Amplitude can track revenue generated by a user. Revenue is tracked through distinct revenue objects, which have special fields that are used in Amplitude's Event Segmentation and Revenue LTV charts.

This allows Amplitude to automatically display data relevant to revenue in the platform.

{{partial:admonition type="note" heading=""}}
Amplitude doesn't support currency conversion. All revenue data should be normalized to your currency of choice before being sent.
{{/partial:admonition}}

```dart
String productId = "product001";
int quantity = 2;
double price = 20;
double amount = 35;
Amplitude.getInstance().logRevenue(productId, quantity, price);
Amplitude.getInstance().logRevenueAmount(amount);
```

{{partial:admonition type="note" heading=""}}
Price can be negative, which may be useful for tracking revenue lost (such as refunds or costs).
{{/partial:admonition}}

## Group user properties

Use the Group Identify API to set or update the properties of particular groups. Keep these considerations in mind:

- Updates affect only future events, and don't update historical events.
- You can track up to 5 unique group types and 10 total groups.

The `groupIdentify` method accepts a group type string parameter and group name object parameter, and an Identify object that's applied to the group.

```dart
final Identify identify = Identify()
                          ..set("gender", "female")
                          ..set("age", 20);
Amplitude.getInstance().groupIdentify("groupType", "groupValue", identify);
```

## User sessions

A session is a period of time that a user has the app in the foreground. Events that are logged within the same session have the same `session_id`. Sessions are handled automatically so you don't have to manually call an API like `startSession()` or `endSession()`.

Amplitude groups events together by session. A session represents a single period of user activity, with a start and end time. Different SDKs track sessions differently, depending on the requirements of the platform.

On Android and iOS, you can choose to automatically log start and end session events corresponding to the start and end of a user's session. This is not supported on Flutter Web.

```dart
//Enable automatically log start and end session events
Amplitude.getInstance().trackingSessionEvents(true);
//Disable automatically log start and end session events
Amplitude.getInstance().trackingSessionEvents(false);
```

Flutter web doesn't support`trackingSessionEvents()`.

## Set a custom user ID

If your app has its login system that you want to track users with, you can call `setUserId` at any time.

```dart
Amplitude.getInstance().setUserId("test_user_id");
```

## Set a custom device ID

By default, device IDs are randomly generated UUIDs. You can define a custom device ID by calling `setDeviceId`.

```dart
Amplitude.getInstance().setDeviceId('test_device_id');
```

You can retrieve the device ID that Amplitude uses with `Amplitude.getInstance().getDeviceId().` This method can return `null` if a `deviceId` hasn't been generated yet.

{{partial:admonition type="note" heading=""}}
Amplitude doesn't recommend defining your own device IDs unless you have your own system for tracking user devices. Make sure the `deviceId` you set is unique to prevent conflicts with other devices in your Amplitude data.
{{/partial:admonition}}

## Advanced topics

### COPPA Control

COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking can be enabled or disabled all at once.

Remember that apps asking for information from children under 13 years of age must comply with COPPA.

```dart
// Enable COPPA Control
Amplitude.getInstance().enableCoppaControl();
// Disable COPPA Control
Amplitude.getInstance().disableCoppaControl();
```

### Advertising ID

Advertiser ID (also referred to as IDFA) is a unique identifier provided by the iOS and Google Play stores. As it's unique to every person and not just their devices, it's useful for mobile attribution.
 [Mobile attribution](https://www.adjust.com/blog/mobile-ad-attribution-introduction-for-beginners/) is the attribution of an installation of a mobile app to its original
 source (for example, and ad campaign or app store search).

 Mobile apps need permission to ask for IDFA, and apps targeted to children can't track at all. Consider IDFV, device id, or an email login system as alternatives when IDFA isn't available.

See [iOS Advertising ID](/sdks/analytics-sdks/ios/ios-swift#advertising-id) or the [Android Advertising ID](/sdks/analytics-sdks/android-sdk/android-kotlin-sdk#advertiser-id) for more information.

### Opt out of tracking

Users may wish to opt out of tracking entirely, which means no events and no records of their browsing history are tracked. `setOptOut` provides a way to fulfill user requests for privacy.

```dart
//Disables instrumentation
Amplitude.getInstance().setOptOut(true);
//Enables instrumentation
Amplitude.getInstance().setOptOut(false);
```

### Dynamic configuration

Flutter SDK lets users configure their apps to use [dynamic configuration](../../dynamic-configuration). This feature finds the best server URL automatically based on app users' location.

- If you have your own proxy server and use `setServerUrl` API, don't use dynamic configuration.
- If you have users in Mainland China, Amplitude recommends that you use dynamic configuration.
- By default, this feature is off. You must explicitly enable it to use it.
- By default, this feature returns server URLs for Amplitude's US servers. If you need to send data to Amplitude's EU servers,  use `setServerZone` to set it to EU zone.

```dart
Amplitude.getInstance().setUseDynamicConfig(true);
```

### Flutter web support

Flutter web support delivers the same experiences on the web as on mobile. Amplitude-Flutter starts to support flutter web from v3.8.0.

These features aren't supported in Flutter web:

- `enableCoppaControl`
- `disableCoppaControl`
- `trackingSessionEvents`. While Flutter Web doesn’t support the ability to send `Start Session` and `End Session` events automatically, the SDK will automatically track session IDs. You can use this for common session-based analyses like the User Session and Pathfinder charts. See our help docs on tracking sessions in Amplitude to [learn more](/cdp/sources/instrument-track-sessions).
- `useAppSetIdForDeviceId`

#### Use

Append the following Amplitude-JavaScript snippet into `web/index.html` in your Flutter project. The Amplitude-JavaScript version must be v8.12.0 and higher.

```html
<script type="text/javascript" defer>
   (function(e,t){var n=e.amplitude||{_q:[],_iq:{}};var r=t.createElement("script")
    ;r.type="text/javascript"
    ;r.integrity="sha384-UcvEbHmT0LE2ZB30Y3FmY3Nfw6puAKXz/LpCFuoywywYikMOr/519Uu1yNq2nL9w"
    ;r.crossOrigin="anonymous";r.async=true
    ;r.src="https://cdn.amplitude.com/libs/amplitude-8.12.0-min.gz.js"
    ;r.onload=function(){if(!e.amplitude.runQueuedFunctions){
    console.log("[Amplitude] Error: could not load SDK")}}
    ;var s=t.getElementsByTagName("script")[0];s.parentNode.insertBefore(r,s)
    ;function i(e,t){e.prototype[t]=function(){
    this._q.push([t].concat(Array.prototype.slice.call(arguments,0)));return this}}
    var o=function(){this._q=[];return this}
    ;var a=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove"]
    ;for(var c=0;c<a.length;c++){i(o,a[c])}n.Identify=o;var u=function(){this._q=[]
    ;return this}
    ;var l=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"]
    ;for(var p=0;p<l.length;p++){i(u,l[p])}n.Revenue=u
    ;var d=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId","enableTracking","setGlobalUserProperties","identify","clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId","groupIdentify","onInit","logEventWithTimestamp","logEventWithGroups","setSessionId","resetSessionId","getDeviceId","getUserId","setMinTimeBetweenSessionsMillis","setEventUploadThreshold","setUseDynamicConfig","setServerZone","setServerUrl","sendEvents","setLibrary","setTransport"]
    ;function v(e){function t(t){e[t]=function(){
    e._q.push([t].concat(Array.prototype.slice.call(arguments,0)))}}
    for(var n=0;n<d.length;n++){t(d[n])}}v(n);n.getInstance=function(e){
    e=(!e||e.length===0?"$default_instance":e).toLowerCase()
    ;if(!Object.prototype.hasOwnProperty.call(n._iq,e)){n._iq[e]={_q:[]};v(n._iq[e])
    }return n._iq[e]};e.amplitude=n})(window,document);
</script>
```

## Compatibility Matrix

The following matrix lists the minimum support for Amplitude Flutter SDK version.
For Gradle Version lower than v6.7.1, use Amplitude Flutter v3.10.0.

|Amplitude Flutter|Gradle|Android Gradle Plugin|Kotlin Gradle Plugin|
|-|-|-|-|
| `3.11.+` | `6.7.1` | `3.6.4` | `1.7.10` |

Learn more about the Android [Gradle Plugin compatibility](https://developer.android.com/studio/releases/gradle-plugin#updating-gradle), [Gradle compatibility](https://docs.gradle.org/current/userguide/compatibility.html#kotlin), and [Kotlin compatibility](https://kotlinlang.org/docs/whatsnew17.html#bumping-minimum-supported-versions).

## Troubleshooting

If you have issues turning on Bitcode in iOS follow Flutter's [documentation](https://github.com/flutter/flutter/wiki/Creating-an-iOS-Bitcode-enabled-app)