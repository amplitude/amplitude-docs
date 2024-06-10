---
id: 7cab1dd1-18ad-4940-9379-ed2954c9afd3
blueprint: react_native_sdk
title: 'React Native SDK'
sdk_status: maintenance
article_type: core
supported_languages:
  - js
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1715723294
github_link: 'https://github.com/amplitude/Amplitude-ReactNative'
releases_url: 'https://github.com/amplitude/Amplitude-ReactNative/releases'
bundle_url: 'https://www.npmjs.com/package/@amplitude/react-native'
shields_io_badge: 'https://img.shields.io/npm/v/@amplitude/react-native'
---
This is the official documentation for the Amplitude Analytics React Native SDK.

## Compatibility Matrix

The following matrix lists the support for Amplitude React Native SDK version for [different versions of React Native and React Native CLI](https://github.com/react-native-community/cli).

| @amplitude/react-native | react-native      |Gradle|Android Gradle Plugin|
|-------------------------|-------------------|---|---|
| >= 2.17.1               | >= 0.71           | 7.5.1+ | 7.2.1+ |
| <= 2.17.0               | >= 0.61,  <= 0.70 | 3.5.3+ | 3.5.3+ |

Learn more about the Android [Gradle Plugin compatibility](https://developer.android.com/studio/releases/gradle-plugin#updating-gradle).

## Install the SDK

Run `yarn add @amplitude/react-native` in your project directory, the same level with `package.json`.

```bash
yarn add @amplitude/react-native
```

### iOS installation

```bash
cd ios && pod install
```

## Initialize the SDK

Before you can instrument, you must initialize the SDK using the API key for your Amplitude project.

```ts
import * as React from 'react';
import { Button } from 'react-native';
import { Amplitude, Identify } from '@amplitude/react-native';

const ampInstance = Amplitude.getInstance();
ampInstance.init(AMPLITUDE_API_KEY);

export function MyApp() {
    return (
    <Button
        title="Log Event"
        onPress=() => ampInstance.logEvent('BUTTON_CLICKED')
    />
    );
}
```

## Configure the SDK

Amplitude React Native SDK runs on the top of the [Amplitude Android Maintenance SDK](/docs/sdks/analytics/android/android-sdk), [Amplitude iOS Maintenance SDK](/docs/sdks/analytics/ios/ios-sdk). The following are the ts/js settable config options.
For other default configurations:

- on Android side, check the [Android Configuration](/docs/sdks/analytics/android/android-sdk#configuration)
- on iOS side, check the [iOS configuration](/docs/sdks/analytics/ios/ios-sdk#configuration)

| Name  | Description | Default Value |
| --- | --- | --- |
| `enableCoppaControl()` | Enable COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking. For example, `Amplitude.getInstance().enableCoppaControl();`. | Coppa control is disabled by default. |
| `disableCoppaControl()` | Disable COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking.  For example, `Amplitude.getInstance().disableCoppaControl();`.| Coppa control is disabled by default. |
| `setAdvertisingIdForDeviceId()` | `boolean`. Use the Advertising ID on Android if available from Google Play Services. For example, `Amplitude.getInstance().setAdvertisingIdForDeviceId();`. Please check [here](../android/#advertiser-id) for the required module and permission.| `false`|
| `setAppSetIdForDeviceId()` | `boolean`. Use the App Set ID (fall back to this `useAdvertisingIdForDeviceId` is used) for device ID. For example, `Amplitude.getInstance().setAppSetIdForDeviceId();`. Please check [here](../android/#app-set-id) for the required module and permission.  | `false` |
| `setOptOut()` | `boolean`. Whether or not enables tracking opt out. If the user wants to opt out of all tracking, use this method to enable opt out for them. Once opt out is enabled, no events will be saved locally or sent to the server. For example, `Amplitude.getInstance().setOptOut(true);`. | `false` |
| `trackingSessionEvents()` | `boolean`. Whether to automatically log start and end session events corresponding to the start and end of a user's session. For example, `Amplitude.getInstance().trackingSessionEvents(true);`. | `false` |
| `setUseDynamicConfig()` | `boolean`. Whether or not dynamically adjust server URL. For example, `Amplitude.getInstance().setUseDynamicConfig(true);`. | `false` |
| `setMinTimeBetweenSessionsMillis()`| `number`. Sets the minimum cutoff time in milliseconds for sessions to be considered distinct. For example, `Amplitude.getInstance().setMinTimeBetweenSessionsMillis(600000);`. The input parameter is in milliseconds. | `5 minutes`. `30 minutes` if not enable foreground checking on Android. |
| `setServerZone()` | `serverZone: string, updateServerUrl:boolean`. serverZone - `US` or `EU`. updateServerUrl - Whether or not enable dynamic configuration. Set Amplitude Server Zone, switch to zone related configuration, including dynamic configuration. If updateServerUrl is true, including server url as well. For example, `Amplitude.getInstance().setServerZone('EU', true);` | The serverZone is `US`, and dynamic configuration is enabled by default. |
| `setServerUrl()` | `string`.  Set the API endpoint URL that events are sent to. Automatically selected by `ServerZone`. For example, `Amplitude.getInstance().setServerUrl("https://www.your-server-url.com")`. | `https://api2.amplitude.com/` |
| `setEventUploadMaxBatchSize()` | `number`. Sets event upload max batch size. This controls the maximum number of events sent with each upload request. For example, `Amplitude.getInstance().setEventUploadMaxBatchSize(100);`. | `50` on Android. `100` on iOS. |
| `setEventUploadPeriodMillis()` | `number`. Sets event upload period millis. The SDK will attempt to batch upload unsent events every eventUploadPeriodMillis milliseconds, or if the unsent event count exceeds the event upload threshold. The input parameter is in milliseconds. For example, `Amplitude.getInstance().setEventUploadPeriodMillis(100000);`. | `30 Seconds` |
| `setEventUploadThreshold()` | `number`. Sets event upload threshold. The SDK will attempt to batch upload unsent events every eventUploadPeriodMillis milliseconds, or if the unsent event count exceeds the event upload threshold. For example, `Amplitude.getInstance().setEventUploadThreshold(100);`. | `30` |
| `enableLogging()`| `boolean`. Only for Android. Whether to enable message logging by the SDK. For example, `Amplitude.getInstance().enableLogging(false);`.| `true` |
| `setLogLevel()`| `number`. `2` - `Log.VERBOSE` or `3` - `Log.DEBUG` or `4` - `Log.INFO` or `5` - `Log.WARN` or `6` - `Log.ERROR` or `7` - `Log.ASSERT`. Only for Android. Sets the logging level. Logging messages will only appear if they are the same severity level or higher than the set log level.| `Log.INFO` |
| `addLogCallback()` | `(error: AmplitudeLogError) => void`. Only for Android. Add log callback, it can help read and collect error message from sdk. The call back function like the following format, `({ tag, message }: { tag: string, message: string }) => { //implement your own logic}` | `null` |

### Configure batching behavior

To support high-performance environments, the SDK sends events in batches. Every event logged by the `logEvent` method is queued in memory. Events are flushed in batches in background. You can customize batch behavior with `setEventUploadThreshold` and `setEventUploadPeriodMillis`. By default, the serverUrl will be `https://api2.amplitude.com/`. This SDK doesn't support batch mode, the [batch API](/docs/apis/batch-event-upload) endpoint.

```js
// Events queued in memory will flush when number of events exceed upload threshold
// Default value is 30
Amplitude.getInstance().setEventUploadThreshold(100);
// Events queue will flush every certain milliseconds based on setting
// Default value is 30 second.
Amplitude.getInstance().setEventUploadPeriodMillis(100000);
```

### EU data residency

Beginning with version 2.6.0, you can configure the server zone after initializing the client for sending data to Amplitude's EU servers. The SDK sends data based on the server zone if it's set. The server zone configuration supports dynamic configuration as well.

For earlier versions, you need to configure the `serverURL` property after initializing the client.

{{partial:admonition type="note" heading=""}}
For EU data residency, the project must be set up inside Amplitude EU. You must initialize the SDK with the API key from Amplitude EU.

{{/partial:admonition}}
```ts
// For versions starting from 2.6.0
// No need to call setServerUrl for sending data to Amplitude's EU servers
Amplitude.getInstance().setServerZone('EU');
// For earlier versions
Amplitude.getInstance().setServerUrl("https://api.eu.amplitude.com"));
```

## Send basic events

Events represent how users interact with your application. For example, "button clicked" may be an action you want to track.

```ts
Amplitude.getInstance().logEvent('BUTTON_CLICKED');
```

## Send events with properties

Events can also contain properties that give context about the event. For example, "hover time" may be a relevant event property to "button click."

```ts
Amplitude.getInstance().logEvent("BUTTON_CLICKED", {"Hover Time": "100ms"});
```

## Flush events

Events are typically stored in a buffer and flushed periodically. This behavior is configurable. You can also flush events manually

```ts
Amplitude.getInstance().uploadEvents();
```

## User properties

User properties help you understand your users at the time they performed some action within your app such as their device details, their preferences, or language.

Amplitude-ReactNative's Identify class manages these features. You need to import the `Identify` before using it.

```ts
import { Identify } from '@amplitude/react-native';
```

### Set a user property

`set` sets the value of a user property. You can also chain together multiple identify calls.

```ts
const identify = new Identify();
identify.set("gender", "female").set("age", 20);
Amplitude.getInstance().identify(identify);
```

#### setOnce

`setOnce` sets the value of a user property once. Later calls using `setOnce` are ignored.

```ts
const identify1 = new Identify();
identify1.setOnce("sign_up_date", "2015-08-24");
Amplitude.getInstance().identify(identify1);
const identify2 = new Identify();
identify2.setOnce("sign_up_date", "2015-08-24");
Amplitude.getInstance().identify(identify2);// is ignored
```
### add

`add` increments a user property by some numerical value. If the user property doesn't have a value set yet, it will be initialized to 0 before being incremented.

```ts
const identify = new Identify();
identify.add("karma", 0.123);
Amplitude.getInstance().identify(identify);
```

### Set multiple user properties

You can use `setUserProperties` as a shorthand to set multiple user properties at once. This method is simply a wrapper around `Identify.set` and `identify`.

```ts
const userProperties = {
    "KEY": "VALUE",
    "OTHER_KEY": "OTHER_VALUE",
}
Amplitude.getInstance().setUserProperties(userProperties);
```

### Arrays in user properties

Arrays can be used as user properties. You can directly set arrays or use append to generate an array.

```ts
const colors = ["rose", "gold"];
const numbers = [4, 5];
const identify = new Identify();
identify.set("colors", colors)
        .append("ab-tests", "campaign_a")
        .append("existing_list", numbers);
Amplitude.getInstance().identify(identify);
```

#### append

`append` appends a value or values to a user property array.
If the user property doesn't have a value set yet, it will be initialized to an empty list before the new values are added. If the user property has an existing value and it's not a list, it will be converted into a list with the new value added.

```ts
const array = ["some_string", 56];
const identify = new Identify();
identify.append("ab-tests", "new-user-test")
Amplitude.getInstance().identify(identify);
```

#### preInsert

`preInsert` insert a value or values to a user property if it doesn't exist in the user property yet.
Pre-insert means inserting the value at the beginning of a given list. If the user property doesn't have a value set yet, it will be initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, it will be no operation.

```ts
const array = ["some_string", 56];
const identify = new Identify();
identify.preInsert("ab-tests", "new-user-test")
Amplitude.getInstance().identify(identify);
```

#### postInsert

`postInsert` insert a value or values to a user property if it doesn't exist in the user property yet.
Post-insert means inserting the value at the end of a given list. If the user property doesn't have a value set yet, it will be initialized to an empty list before the new values are post-inserted. If the user property has an existing value, it will be no operation.

```ts
const array = ["some_string", 56];
const identify = new Identify();
identify.postInsert("ab-tests", "new-user-test")
Amplitude.getInstance().identify(identify);
```

### Remove user properties

`clearUserProperties` wipes all the current user's user properties.

{{partial:admonition type="warning" heading="This is a permanent action"}}
This action clears all user properties. Amplitude can't sync the user's user property values from before the wipe to any of the user's future events.
{{/partial:admonition}}

```ts
Amplitude.getInstance().clearUserProperties();
```

#### remove

`remove` removes a value or values to a user property if it does exist in the user property. If the item doesn't exist in the user property, nothing happens.

```ts
const array = ["some_string", 56];
const identify = new Identify();
identify.remove("ab-tests", "new-user-test")
        .remove("some_list",array);
Amplitude.getInstance().identify(identify);
```

#### unset

`unset` unsets and removes a user property.

```ts
const identify = new Identify();
identify.unset("karma").unset("gender");
Amplitude.getInstance().identify(identify);
```

## Track revenue

Amplitude can track revenue generated by a user. Revenue is tracked through distinct revenue objects, which have special fields that are used in Amplitude's Event Segmentation and Revenue LTV charts.
 
This allows Amplitude to automatically display data relevant to revenue in the platform. Revenue objects support the following special properties, as well as user-defined properties through the `eventProperties` field.

Price can be a negative value, which is useful for tracking lost revenue.

{{partial:admonition type="note" heading=""}}
Amplitude doesn't support currency conversion. All revenue data should be normalized to your currency of choice before being sent.
{{/partial:admonition}}

```ts
type RevenueProperties = {
    price: number;
    productId?: string;
    quantity?: number;
    revenueType?: string;
    receipt?: string;
    receiptSignature?: string;
    eventProperties?: PropertiesObject;
};
```

```ts
const userProperties = {
    price: 100;
    productId: "123";
    quantity: 2;
    revenueType: "productRevenue";
    receipt: "11111";
    receiptSignature: "signature";
    eventProperties: {
        "KAY": "VALUE",
      "OTHER_KEY": "OTHER_VALUE"
    };
}
Amplitude.getInstance().logRevenue(userProperties);
```

## Group user properties

Use the Group Identify API to set or update the properties of particular groups. Keep these considerations in mind:

- Updates affect only future events, and don't update historical events.
- You can track up to 5 unique group types and 10 total groups.

The `groupIdentify` method accepts a group type string parameter and group name object parameter, and an Identify object that's applied to the group.

```ts
const identify = new Identify();
identify.set("gender", "female").set("age", 20);
Amplitude.getInstance().groupIdentify("groupType", "groupValue", identify);
```

## User sessions

A session is a period of time that a user has the app in the foreground. Events that are logged within the same session  have the same `session_id`.

Sessions are handled automatically so you don't have to manually call an API like `startSession()` or `endSession()`.
Amplitude groups events together by session.

A session represents a single period of user activity, with a start and end time. Different SDKs track sessions differently, depending on the requirements of the platform.

You are able to determine whether to automatically log start and end session events corresponding to the start and end of a user's session.

```ts
//Enable automatically log start and end session events
Amplitude.getInstance().trackingSessionEvents(true);
//Disable automatically log start and end session events
Amplitude.getInstance().trackingSessionEvents(false);
```

## Set a custom user ID

If your app has its login system that you want to track users with, you can call `setUserId` at any time.

```ts
Amplitude.getInstance().setUserId("test_user_id");
```

## Advanced topics

### COPPA control

COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking can be enabled or disabled all at once.

Remember that apps asking for information from children under 13 years of age must comply with COPPA.

```ts
// Enable COPPA Control
Amplitude.instance().enableCoppaControl();
// Disable COPPA Control
Amplitude.instance().disableCoppaControl();
```

### Opt users out of tracking

Users may wish to opt out of tracking entirely, which means no events and no records of their browsing history. `setOptOut` provides a way to fulfill certain users' requests for privacy.

```ts
//Disables instrumentation
Amplitude.getInstance().setOptOut(true);
//Enables instrumentation
Amplitude.getInstance().setOptOut(false);
```

### Dynamic configuration

React Native SDK allows users to configure their apps to use [dynamic configuration](../../dynamic-configuration.md). This feature finds the best server URL automatically based on app users' location.

- If you have your own proxy server and use `setServerUrl` API, don't use dynamic configuration.
- If you have users in Mainland China, Amplitude recommends that you use dynamic configuration.
- By default, this feature is off. You must explicitly enable it to use it.
- By default, this feature returns the server URL of Amplitude's US servers. If you need to send data to Amplitude's EU servers, use `setServerZone` to set it to EU zone.

```ts
Amplitude.getInstance().setUseDynamicConfig(true);
```

## Troubleshooting

Using an older React Native version and having trouble with iOS?

Amplitude supports versions of React Native >= 0.61. Here's the process to set up with React Native 0.71. See the [compatibility matrix](#compatibility-matrix) for more details.

1. Swift Setup (Xcode)
    - Open your `[project-name].xcodeproj` file in Xcode
    - Right click your project name in the file navigator and then click New File, pick swift, it prompts you to create a bridging headers file. This is necessary to support swift in RN 0.61.
    - Source of this fix: <https://stackoverflow.com/a/54586937>
2. Podfile changes
    - Make sure you are targeting iOS 10 or greater
    - Add `use_modular_headers!` globally to the top of the Podfile
    - Disable modular headers for DoubleConversion, Glog and Folly using `:use_modular_headers => false`.