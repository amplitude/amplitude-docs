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
updated_at: 1715123983
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

### Configuration

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
    

