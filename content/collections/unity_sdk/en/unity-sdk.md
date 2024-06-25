---
id: 9dc79fa3-30b2-4f67-954e-f03433c6cdbd
blueprint: unity_sdk
title: 'Unity SDK'
sdk_status: current
article_type: core
supported_languages:
  - c-sharp
github_link: 'https://github.com/amplitude/unity-plugin'
releases_url: 'https://github.com/amplitude/unity-plugin/releases'
api_reference_url: 'https://github.com/amplitude/unity-plugin'
shields_io_badge: 'https://img.shields.io/github/v/tag/amplitude/unity-plugin?label=Unity%20SDK'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718672668
source: 'https://www.docs.developers.amplitude.com/data/sdks/unity/'
---
The Amplitude Analytics Unity SDK is a plugin to simplify the integration of Amplitude iOS and Android SDKs into your Unity project. This SDK works with Unity 2019.3.11 and higher.

{{partial:admonition type="tip" heading="Supported platforms"}}
Unity SDK doesn't support pure desktop or Editor

Remember to test your apps using the `Build Settings` for either Android or iOS, which links to their respective devices or emulators.
{{/partial:admonition}}

## Install the SDK

The Amplitude Analytics Unity SDK supports different methods of installation, depending on the platform.

### Option 1: Unity Package Manager

1. Make sure you have [Git](https://git-scm.com/) installed.
2. In Unity, click `Window > Package Manager`.
3. Click the plus **+** sign and select `Add package from Git URL`.
4. Enter `https://github.com/amplitude/unity-plugin.git?path=/Assets`, and then click **Add**.
5. The Unity editor imports the package from Git.

### Option 2: Manual download

1. Download the latest [`amplitude-unity.unitypackage`](https://github.com/amplitude/unity-plugin/releases) from GitHub releases.
2. Double click `amplitude-unity.unitypackage` to import the package into your Unity project.

### Android

#### Add obfuscation exception

Add this line in your ProGuard rules file - `proguard.pro`.

```bash
-keep class com.amplitude.unity.plugins.AmplitudePlugin { *; }
```

#### Dependency management

Amplitude's `com.amplitude.android-sdk` is a transitive library, it doesn't include any other dependencies by itself. Other dependencies for `com.amplitude.android-sdk` are placed into `Assets/Plugins/Android`. Amplitude uses OkHTTP, and the other dependencies you see are ones OkHTTP depends on (for example, Okio or Jetbrains).

If you use OkHTTP  in your project, you can choose not to include OkHTTP and its related dependencies by unchecking them.

#### Use unity-jar-resolver

Some users use `unity-jar-resolver` themselves. When they force resolve dependencies, it cleans up Amplitude-related jars. In this case, declare those dependencies in your `*Dependencies.xml` file.

Add Amplitude's native dependencies under `androidPackage` tag.

```xml
<androidPackage spec="com.amplitude:android-sdk:2.+">
    <repositories>
    <repository>https://maven.google.com</repository>
    </repositories>
</androidPackage>

<androidPackage spec="com.squareup.okhttp3:okhttp:4.2.2">
    <repositories>
    <repository>https://maven.google.com</repository>
    </repositories>
</androidPackage>
```

#### API compatibility

The Amplitude Analytics Unity SDK depends on the OkHTTP library.  OkHTTP v3.13 requires the minimum version to be Android 5.0, Android Lollipop (API 21). [Read details here](https://developer.squareup.com/blog/okhttp-3-13-requires-android-5/).

Amplitude doesn't restrict which OkHTTP version to use. For API 19, 20 (Android KitKat) to work, downgrade the OkHTTP version to be lower than 3.13.

1. Change the version of OkHTTP to be lower than 3.13.
2. In Unity, import the library by copying the .jar file, you can downgrade OkHTTP library by replacing it with a version lower than 3.13.
If you use google dependency resolver, update the dependency version for OkHTTP in `*Dependency.xml` file.

### iOS XCode troubleshooting

If Xcode doesn't let you use a simulator or device, it's because you must configure the Unity project to use either the Device SDK (real life devices) or the Simulator SDK (emulator).

To change the settings for the build, select `Unity > Edit > Project Settings... > Player > iOS Tab`, open the dropdown menu Other Settings, scroll to **Configuration**, and select either value needed for the Target SDK field.

## Initialize the SDK

Initialization is necessary you can do instrumentation. The API key for your Amplitude project is required.

```c#
Amplitude amplitude = Amplitude.getInstance();
amplitude.setServerUrl("https://api2.amplitude.com");
amplitude.logging = true;
amplitude.trackSessionEvents(true);
amplitude.init(AMPLITUDE_API_KEY);
```

Optionally, you may send a string `instanceName` to `getInstance()`. This string is associated with all the settings of one `Amplitude` object.

```c#
Amplitude amplitude1 = Amplitude.getInstance("client_1");
Amplitude amplitude2 = Amplitude.getInstance("client_2");
//Settings changes in amplitude1 will not be reflected in amplitude2
Amplitude.getInstance("client_1") //this is the same reference as amplitude1
```

## Configure the SDK

Amplitude Unity SDK runs on the top of the [Amplitude Android Maintenance SDK](/docs/sdks/analytics/android/android-sdk), and [Amplitude iOS Maintenance SDK](/docs/sdks/analytics/ios/ios-sdk). The following are the C# settable config options.

For other default configurations:

- on Android, see [Android Configuration](/docs/sdks/analytics/android/android-kotlin-sdk/#configuration)
- on iOS side, see [iOS configuration](/docs/sdks/analytics/ios/ios-sdk#configuration)

| Name  | Description | Default Value |
| --- | --- | --- |
| `enableCoppaControl()` | Enable COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking.  | Coppa control is disabled by default. |
| `disableCoppaControl()` | Disable COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking. | Coppa control is disabled by default. |
| `setTrackingOptions()`| `IDictionary<string, bool>`. By default the SDK will track several user properties such as carrier, city, country, ip_address, language, platform, etc. | `All tracking options enabled.` |
| `setMinTimeBetweenSessionsMillis()` | `long`. The amount of time for session timeout if disable foreground tracking. For example, `Amplitude.getInstance().setMinTimeBetweenSessionsMillis(100000)`. The input parameter is in milliseconds. | `5 minutes` |
| `setEventUploadPeriodSeconds()` | `int`. Events wait in the buffer and are sent in a batch. The buffer is flushed every `eventUploadPeriodSeconds` or reach 30 events threshold. For example, `Amplitude.getInstance().setEventUploadPeriodSeconds(50)`. The input parameter is in seconds.| `30 seconds` |
| `setServerZone()` | `AmplitudeServerZone`. The server zone of the projects. Supports EU and US. For EU data residency, change to EU. For example, `Amplitude.getInstance().setServerZone(AmplitudeServerZone.US)`. | `AmplitudeServerZone.US` |
| `setServerUrl()` | `string`. The API endpoint URL that events are sent to. Automatically selected by `ServerZone`. For example, `Amplitude.getInstance().setServerUrl(https://www.your-server-url.com)`. | `https://api2.amplitude.com/` |
| `setUseDynamicConfig()` | `bool`. Find the best server url automatically based on users' geo location. For example, `Amplitude.getInstance().setUseDynamicConfig(true)`. | `false` |
| `setOffline()` | `bool`. Weather the SDK will upload events to Amplitude servers. However, the SDK will always log events. For example, `Amplitude.getInstance().setOffline(true)`. | `false` |
| `useAdvertisingIdForDeviceId()` | `bool`. Whether to use advertising id as device id. Check [here](/docs/sdks/analytics/android/android-sdk#advertiser-id) for the required module and permission. For example, `Amplitude.getInstance().useAdvertisingIdForDeviceId(true)`. | The deviceId will be UUID+"R" by default. |
| `useAppSetIdForDeviceId()` | `bool`. Only for Android. Whether use appset id as a deviceId. Check [here](/docs/sdks/analytics/android/android-sdk#app-set-id) for the required module and permission. For example, `Amplitude.getInstance().useAppSetIdForDeviceId(true)`. | The deviceId will be UUID+"R" by default. |

### Configure batching behavior

To support high-performance environments, the SDK sends events in batches. Every event logged by the `logEvent` method is queued in memory. Events are flushed in batches in background. You can customize batch behavior with `setEventUploadPeriodSeconds`. By default, the serverUrl will be `https://api2.amplitude.com/`. This SDK doesn't support batch mode, the [batch API](/docs/apis/analytics/batch-event-upload) endpoint.

```c#
// Events queue will flush every certain seconds based on setting
// Default value is 30 seconds
amplitude.setEventUploadPeriodSeconds(50);
```

### EU data residency

Starting from version 2.4.0, you can configure the server zone after initializing the client for sending data to Amplitude's EU servers. SDK will switch and send data based on the server zone if it's set.
The server zone configuration supports [dynamic configuration](/docs/sdks/dynamic-configuration) as well.

For earlier versions, you need to configure the `serverURL` property after initializing the client.

{{partial:admonition type="note" heading=""}}
For EU data residency, project need to be set up inside Amplitude EU and SDK initialized with API key from Amplitude EU first. This method won't work without proper set up first.
{{/partial:admonition}}

```c#
// For versions starting from 2.4.0
// No need to call setServerUrl for sending data to Amplitude's EU servers
amplitude.setServerZone(AmplitudeServerZone.EU);

// For earlier versions
amplitude.setServerUrl("https://api.eu.amplitude.com");
```

## Send basic events

Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to note.

```c#
amplitude.logEvent("Button Clicked");
```

When running this in Unity, make sure that you have iOS or Android selected in the Build Settings under "Platform".

## Send events with properties

Events can also contain properties. They give context about the event taken. For example, "hover time" may be a relevant event property to "button click".

```c#
Dictionary<string, object> eventProps = new Dictionary<string, object>();
eventProps.Add("Hover Time", 10);
amplitude.logEvent("Button Clicked", eventProps);
```

## Set user properties

{{partial:admonition type="warning" heading="Privacy and tracking"}}
Don't track any user data that may be against your privacy terms. If you need any assistance with privacy concerns, then please reach out to our Platform team.
{{/partial:admonition}}

### Identify

Identify is for setting the user properties of a particular user without sending any event. The Unity SDK supports the operations `setUserProperty`, `setOnce`, `add`, and `append` on individual user properties.

Declare the operations with a provided Identify interface. Chain together multiple operations in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.

{{partial:admonition type="note" heading="Identify call"}}
If the Identify call is sent after the event, the results of operations will be visible immediately in the dashboard user's profile area, but it will not appear in chart result until another event is sent after the Identify call. So the identify call only affects events going forward. More details [here](/docs/data/user-properties-and-events).
{{/partial:admonition}}

### Manage user identity

You can handle the identity of a user using the identify methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms.

Send an identify call containing those user property operation to Amplitude to tie a user's events with specific user properties.

### setUserProperty

`setUserProperty` sets the value of a user property. You can also chain together multiple identify calls.

```c#
amplitude.setUserProperty("saw_page_a", true);
```

### setOnce

`setOnce` sets the value of a user property only once. Subsequent calls using `setOnce` will be ignored.

```c#
amplitude.setOnceUserProperty("page_views", 50);
```

### add

`add` increments a user property by some numerical value. If the user property doesn't have a value set yet, it's initialized to 0.

```c#
amplitude.addUserProperty("oranges", 5);
Dictionary<string, object> values = new Dictionary<string, object>();
values.Add("Key A", "Value A");
amplitude.addUserPropertyDict("user_facts", values);
```

## Set multiple user properties

`logEvent()` method lets you set the user properties along with event logging. You can use `setUserProperties` as a shorthand to set multiple user properties at once. This method is a wrapper around `Identify.set`.

```c#
Dictionary<string, object> values = new Dictionary<string, object>();
values.Add("user_time", 100.5);
values.Add("engagement", true);
amplitude.setUserProperties(values);
```

### Arrays in user properties

Arrays can be used as user properties. You can directly set arrays or use `append` to generate an array.

```c#
int[] arr = new int[] { 1, 2, 4, 8 };
amplitude.setUserProperty("user_running_times", arr);
```

#### append

`append` appends a value or values to a user property array. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are added.
 If the user property has an existing value and it's not a list, it will be converted into a list with the new value added.

```c#
amplitude.setUserProperty("stringArray", new string[]{"replace", "existing", "strings"});
amplitude.appendUserProperty("stringArray", new string[]{ "append", "more", "strings" });
```

### Clear user properties

`clearUserProperties` method is for clearing all user properties at one time.

{{partial:admonition type="warning" heading="Clearing user properties is irreversible"}}
Amplitude doesn't sync the user's user property values before the wipe to any future events that the user triggers as they will have been reset.
{{/partial:admonition}}

```c#
amplitude.clearUserProperties();
```

#### unset

`unset` unsets and removes a user property.

```c#
amplitude.unsetUserProperty("property_name_to_unset");
```

## Set user groups

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, then the count includes the group.

For example, you want to group your users based on what organization they're in by using an 'orgId'. Joe is in 'orgId' '10', and Sue is in 'orgId' '15'. Sue and Joe both perform a certain event. You can query their organizations in the Event Segmentation Chart.

When setting groups, define a `groupType` and `groupName`. In the previous example, 'orgId' is the `groupType` and '10' and '15' are the values for `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'.

Setting a group also sets the `groupType:groupName` as a user property, and overwrites any existing `groupName` value set for that user's `groupType`, and the corresponding user property value. `groupType` is a string, and `groupName` can be either a string or an array of strings to indicate that a user is in multiple groups.

{{partial:admonition type="example" heading=""}}
This example shows a groupType "orgID" with a groupName of "15". The second line shows a groupType "sport" with "tennis" and "soccer" as groupNames.

```c#
Amplitude.getInstance().setGroup("orgId", "15");
Amplitude.getInstance().setGroup("sport", new JSONArray().put("tennis").put("soccer"));  // list values
```
{{/partial:admonition}}

You can also use `logEventWithGroups` to set event-level groups, meaning the group designation only applies for the specific event being logged and doesn't persist on the user unless you explicitly set it with `setGroup`:

```c#
JSONObjecteventProperties=newJSONObject().put("key", "value");
JSONObjectgroups=newJSONObject().put("orgId", 10);

Amplitude.getInstance().logEvent("initialize_game", eventProperties, groups);
```

## Track revenue

Amplitude can track revenue generated by a user. Revenue is tracked through distinct revenue objects, which have special fields that are used in Amplitude's Event Segmentation and Revenue LTV charts. This allows Amplitude to automatically display data relevant to revenue in the platform. Revenue objects support the following special properties, as well as user-defined properties through the `eventProperties` field.

Calling `logRevenue` generates up to 2 different event types in the platform:

- '[Amplitude] Revenue': This event is logged for all revenue events, regardless of whether verification is turned on.
- '[Amplitude] Revenue (Verified/Unverified)': These revenue events will contain the actual '$revenue' property.

You can't change the default names given to these client-side revenue events in the raw data but you do have the option to modify the [display name](/docs/admin/account-management/account-settings#events). To learn more about tracking revenue, see the documentation [here](/docs/cdp/sources/instrument-track-revenue).

| Name  | Description  |
| --- | --- |
| `productId` | Optional. String. An identifier for the product. Amplitude recommends something like the "Google Play Store product ID". Defaults to `null`. |
| `quantity`| Required. Integer. The quantity of products purchased. Note: revenue = quantity * price. Defaults to 1. |
| `price` | Required. Double. The price of the products purchased, and this can be negative. Note: revenue = quantity * price. Defaults to `null`.|
| `revenueType` | Optional, but required for revenue verification. String. The type of revenue (for example, tax, refund, income). Defaults to `null`. |
| `eventProperties`| Optional. Object. An object of event properties to include in the revenue event. Defaults to `null`. |

{{partial:admonition type="note" heading=""}}
Price can be negative, which may be useful for tracking revenue lost (such as refunds or costs)
{{/partial:admonition}}

### Verify revenue

Because Unity supports both Android and iOS store, consult the proper documentation for revenue verification.
See the [Android](https://developers.amplitude.com/docs/android) and [iOS/tvOS/macOS](https://developers.amplitude.com/docs/ios) documentation, and special instructions for the store (Android AIDL/Google Play Billing, Amazon Store, or iOS App Store).

```c#
amplitude.logRevenue(0.03);
amplitude.logRevenue("sku", 1, 1.99);
amplitude.logRevenue("sku", 1, 1.99, "cmVjZWlwdA==", null);
Dictionary<string, object> revenueProperties = new Dictionary<string, object>()
{
  {"car", "blue"},
  {"price", 12.99}
};
if (Application.platform == RuntimePlatform.IPhonePlayer) {
  amplitude.logRevenue("sku", 1, 1.99, "cmVjZWlwdA==", null, "purchase", revenueProperties);
} else if (Application.platform == RuntimePlatform.Android) {
  amplitude.logRevenue("sku", 1, 1.99, "receipt", "receiptSignature", "purchase", revenueProperties);
}
```

{{partial:admonition type="note" heading=""}}
Amplitude doesn't support currency conversion. All revenue data should be normalized to your currency of choice before being sent.
{{/partial:admonition}}

## User sessions

A session on Android is a period of time that a user has the app in the foreground.

Amplitude groups events together by session. Events that are logged within the same session have the same `session_id`. Sessions are handled automatically so you don't have to manually call an API like `startSession()` or `endSession()`.

You can adjust the time window for which sessions are extended.

```c#
client.setMinTimeBetweenSessionsMillis(10000); //10 seconds
```

By default, '[Amplitude] Start Session' and '[Amplitude] End Session' events aren't sent. Even though these events aren't sent, sessions are still tracked by using `session_id`.
To re-enable those session events, add this line before initializing the SDK.

```c#
Amplitude amplitude = Amplitude.Instance;
amplitude.trackSessionEvents(true);
amplitude.init(AMPLITUDE_API_KEY);
```

You can also log events as out-of-session. Internally (in Amplitude dashboards), out-of-session events have a `session_id` of `-1` and aren't considered part of the current session, meaning they don't extend the current session.
This might be useful if you are logging events triggered by push notifications, for example. You can log events as out-of-session by setting the input parameter `outOfSession` to true when calling `logEvent()`.

```c#
Dictionary<string, object> eventProps = new Dictionary<string, object>();
bool outOfSession = true;
client.logEvent("event out of session", eventProps, outOfSession);
```

## Advertising ID

Advertiser ID (also referred to as IDFA) is a unique identifier provided by the iOS and Google Play stores. Because it's unique to every person and not just their devices, IDFA is useful for mobile attribution. [Mobile attribution](https://www.adjust.com/blog/mobile-ad-attribution-introduction-for-beginners/) is the attribution of an installation of a mobile app to its original source (for example, ad campaign, app store search).

Mobile apps need permission to ask for IDFA, and apps targeted to children can't track at all. Consider IDFV, device id, or an email login system as alternatives when IDFA isn't available.

### iOS setup

See setup instructions in [Unity iOS IDFA and GPS Setup](#ios-idfa-and-gps-setup).

### Android setup

See setup instructions in the [Android SDK](/docs/sdks/analytics/android/android-kotlin-sdk#advertiser-id).

## Location tracking

For location tracking, Amplitude converts the IP of a user event into a location (GeoIP lookup) by default. This information may be overridden by an app's own tracking solution or user data.

Amplitude can access the Android location service (if possible) to add the specific coordinates (longitude and latitude) where an event is logged.

## Set custom user ID

If your app has its login system that you want to track users with, you can call `setUserId` at any time.

```c#
Amplitude.Instance.setUserId("USER_ID");
```

You can also add the User ID as an argument to the init call.

```c#
Amplitude.Instance.init(AMPLITUDE_API_KEY, "USER_ID");
```

Don't assign users a User ID that could change as each unique User ID is interpreted as a unique user in Amplitude.
See [Track unique users in Amplitude](/docs/cdp/sources/instrument-track-unique-users) for more information.

## Advanced topics

### COPPA control

COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking can be enabled or disabled all at once.
Remember that apps asking for information from children under 13 years of age must comply with COPPA.

```c#
client.enableCoppaControl();
```

### Opt out of tracking

Users may wish to opt out of tracking entirely, which means no events and no records of their browsing history. This API provides a way to fulfill certain users' requests for privacy.

```c#
client.setOptOut(true); //No events will be tracked for this user
```

### Dynamic configuration

Unity SDK allows users to configure their apps to use [dynamic configuration](/docs/sdks/dynamic-configuration). This feature finds the best Amplitude server URL automatically based the user's location.

- If you have your own proxy server and use `setServerUrl` API, don't use dynamic configuration.
- If you have users in Mainland China, Amplitude recommends that you use dynamic configuration.
- By default, this feature is off. You must explicitly enabled it to use it.
- By default, this feature returns server URLs for Amplitude's US servers, if you need to send data to Amplitude's EU servers, use `setServerZone` to set it to EU zone.

```c#
amplitude.setUseDynamicConfig(true);
```

## iOS IDFA and GPS setup

This section walks through the process to give Unity SDK users access to IDFA (advertiser ID) and GPS coordinate data in their logged events.

### Considerations

- This functionality wasn't included in the Unity SDK because the Apple App Store flags any app that uses IDFA code, even if the code is disabled or sourced from a third-party SDK developer like Amplitude.
- Consider alternatives to IDFA. Don't assume users will enable IDFA tracking; opt-in systems engage less. Use device id, IDFV, or pass your own app's email login system as a custom user property.
- You can edit the Objective-C iOS logic to fetch IDFA and GPS data. However, the current code was written to handle permissions, and accurately update the IDFA and GPS data within the SDK when the app user gives permissions.

### Setup

!!!note  "iOS App Store compliance"

   If an app is subject to COPPA because it's aimed toward children, the app can't contain any IDFA or GPS tracking code. This is why the IDFA and GPS code requires additional setup.

First, take the [two files](https://github.com/amplitude/unity-plugin/tree/main/IdfaIOS) `unity-plugin/IdfaIOS/CustomIdfa.m` and `unity-plugin/IdfaIOS/CustomGPS.m` and place them into `Assets/Scripts`.
 You may place the file wherever, but check all the `#import` statements lead to correct paths.

In the imports section (the top) of your `.cs` game script, add this import:

```c#
#if (UNITY_IPHONE || UNITY_TVOS)
using System.Runtime.InteropServices;
#endif
```

Inside the game class, add the following code inside your MonoBehavior class, or any other class.

```c#
public class AmplitudeDemo : MonoBehavior {

#if (UNITY_IPHONE || UNITY_TVOS)
    [DllImport ("__Internal")]
    private static extern void setIdfaBlock(string instanceName);
    [DllImport ("__Internal")]
    private static extern void setLocationInfoBlock(string instanceName);
#endif
```

Finally, in your game code, probably in `void Start()`, call these functions. `YOUR_INSTANCE_NAME` is a string associated with this particular instance of Amplitude. `YOUR_INSTANCE_NAME` may also be null or an empty string.

```c#
Amplitude amplitude = Amplitude.getInstance(YOUR_INSTANCE_NAME);
amplitude.init(AMPLITUDE_API_KEY);

#if (UNITY_IPHONE || UNITY_TVOS)
    setLocationInfoBlock(YOUR_INSTANCE_NAME);
    setIdfaBlock(YOUR_INSTANCE_NAME);
#endif
```

These functions prompt the iOS user to accept or reject permissions for GPS location tracking, as well as IDFA tracking.

Your Unity app needs two special configurations.\
For location, navigate to `Unity > Edit > Project Settings...`. The menu in the first image below will pop up. Select `Player`, then click the `iOS` tab. Click `Other Settings`, and scroll until the field `Location Usage Description`. Type a sentence that prompts the user for GPS tracking permissions into the text box.

{{partial:admonition type="note" heading="XCode simulator"}}
IDFA tracking permissions can generally only be tested reliably on real life phones.
{{/partial:admonition}}

For IDFA, the file `Info.plist` has to be edited according to Apple's specifications. This can be done with a Unity script with [guidance from this Unity post](https://forum.unity.com/threads/how-can-you-add-items-to-the-xcode-project-targets-info-plist-using-the-xcodeapi.330574/).

Also, when the app is compiled into iOS and launches into Xcode, find the top-level file `Info.plist`. Click the plus symbol next to any key value pair. Use the Xcode editor to find the key `Privacy - Tracking Usage Description`, make sure the Type is String, and type a prompt to ask for tracking permission in the Value field.