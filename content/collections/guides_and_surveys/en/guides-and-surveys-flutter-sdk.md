---
id: a1b2c3d4-e5f6-4789-a012-3456789abcde
blueprint: guides_and_survey
title: 'Guides and Surveys Flutter SDK'
landing: false
---
Amplitude's Guides and Surveys Flutter SDK lets you deploy [Guides and Surveys](/docs/guides-and-surveys) in your Flutter applications.

## Requirements

The Guides and Surveys Flutter SDK requires:

* Dart 3.3+
* Flutter 3.7+

## Install and initialize the SDK

Guides and Surveys supports different installation options to work best with your existing Amplitude implementation.


#### Initialize the SDK

```dart
import 'package:amplitude_engagement_flutter/amplitude_engagement_flutter.dart';

// Initialize Guides and Surveys
final engagement = AmplitudeEngagement(apiKey: 'YOUR_API_KEY');
```

#### Configuration options

| Parameter                | Type     | Description                                                                                                                                                               |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiKey`                 | `string` | Required. API key of the Amplitude project you want to use.                                                                                                               |
| `serverZone`             | `EU` or `US` | Optional. Sets the Amplitude server zone. Set this to `EU` for Amplitude projects created in the EU data center. Default: `US`                                            |
| `serverUrl`              | `string` | Optional. Custom server URL for API requests. Useful for [proxy setups](/docs/guides-and-surveys/proxy).                                                                   |
| `cdnUrl`                 | `string` | Optional. Custom CDN URL for static assets. Useful for [proxy setups](/docs/guides-and-surveys/proxy).                                                                     |
| `mediaUrl`               | `string` | Optional. Custom URL for proxying nudge images. Useful for [proxy setups](/docs/guides-and-surveys/proxy) when firewalls block images.                                      |
| `logLevel`               | `LogLevel` enum | Optional. Sets the log level. Default: `LogLevel.warn`                                                                                                                    |
| `locale`                 | `string` | Optional. Sets the locale for [localization](/docs/guides-and-surveys/sdk#localization). Not setting a language means the SDK uses the default language.                    |

{{partial:admonition type="warning" heading="Use the same API key for Guides & Surveys and Analytics"}}
To avoid analytics mismatches and ensure accurate data collection, use the same API key for both Guides & Surveys and your Analytics SDK. Both should reference the same Amplitude project. Using different API keys can cause:

- The SDK to fetch guides and surveys from the wrong project.
- Analytics data to appear in different projects.
- Insights and survey responses to be incomplete or mismatched.

Make sure the API key you provide to Guides & Surveys matches the API key used to initialize your Amplitude Flutter SDK.
{{/partial:admonition}}

{{partial:admonition type="note" heading=""}}
After you call `amplitude.add(engagement.getPlugin())`, you are technically done installing. While screen tracking and element targeting are optional, Amplitude recommends that you [set up URL handling for preview mode](/docs/guides-and-surveys/guides-and-surveys-flutter-sdk#simulate-guides-and-surveys-for-preview).
{{/partial:admonition}}

Add the engagement package to your `pubspec.yaml` and initialize the SDK, then call `boot` with user identity:

```dart
import 'package:amplitude_engagement_flutter/amplitude_engagement_flutter.dart';

final engagement = AmplitudeEngagement(apiKey: 'YOUR_API_KEY');
engagement.boot(
  userId: 'USER_ID',
  deviceId: 'DEVICE_ID', // optional if userId is set
  userProperties: {'key': 'value'}, // optional
  integrations: [
    (event) {
      // Forward events to your analytics provider
    },
  ],
);
```

{{partial:admonition type="warning" heading="Use the same API key for Guides & Surveys and Analytics"}}
To avoid analytics mismatches and ensure accurate data collection, use the same API key for both Guides & Surveys and your Analytics SDK. Both should reference the same Amplitude project.
{{/partial:admonition}}

{{partial:admonition type="note" heading=""}}
After you call `engagement.boot()`, you are technically done installing. Amplitude recommends that you [set up URL handling for preview mode](/docs/guides-and-surveys/guides-and-surveys-flutter-sdk#simulate-guides-and-surveys-for-preview).
{{/partial:admonition}}

## Add your application to project settings

After installing the SDK, add your Flutter application to your Amplitude project settings so it appears as a platform option when you create guides and surveys.

To add your application:

1. Navigate to *Settings > Projects* in Amplitude.
2. Select your project.
3. Navigate to the **Guides and Surveys** tab.
4. In the **App Management** section, expand and click **+ Add App**.
5. Select **Flutter** from the dropdown.

After you add your application, it appears as a platform option when you create or edit guides and surveys. This lets you deliver guides and surveys to your Flutter app users.

### Set a minimum SDK version (when needed)

**Minimum SDK version** is available for mobile SDK versions `3.0.0` and later. Use this setting as a safety control when you identify a critical issue in an older SDK release.

To configure a minimum SDK version:

1. Navigate to *Settings > Projects* in Amplitude.
2. Select your project.
3. Navigate to the **Guides and Surveys** tab.
4. In the **App Management** section, expand and click **+ Add App**.
5. Select **Flutter** from the dropdown.
6. Enter a value in **Minimum SDK version**.

When you set this value, Guides and Surveys compares the configured minimum with the SDK version in each app build:

- If an app build uses an older SDK version, the SDK doesn't initialize in that build.
- If an app build uses the same or newer SDK version, the SDK initializes as expected.

This setting lets you stop guides and surveys on known problematic SDK versions without rolling back your application release.

## Screen tracking and element targeting

### Enable screen tracking

Required for screen-based targeting and the Time on Screen trigger. Guides and Surveys compares the screen string (for example, `"HomeScreen"`) with the string you set in the guide or survey page targeting section.

```dart
engagement.screen('HomeScreen');
```

### Enable element targeting

Pin and tooltip guides require the SDK to target specific widgets on screen. Use the `Semantics` widget (or the engagement SDK's wrapper) to tag targetable elements with a stable identifier.

```dart
import 'package:flutter/material.dart';

// Tag a widget so Guides and Surveys can attach pins and tooltips
Semantics(
  identifier: 'welcome-banner',
  child: Banner(
    child: Text('Welcome to the app'),
  ),
)
```

Use the same identifier string in the Guides and Surveys dashboard when you configure element-based targeting for a guide or survey.

## Other SDK methods

The Flutter SDK provides additional methods for Guides and Surveys, including:

- **Managing themes**: Set the visual theme (light, dark, or auto) using `setThemeMode`.
- **Adding callbacks**: Register named callbacks and trigger them from guides or surveys with the Run callback action.
- **Resetting guides/surveys**: Use `reset` to move a guide or survey back to a specific step.
- **Listing guides/surveys**: Retrieve the full list of live guides and surveys and their status using `list()`.
- **Show**: Display a specific guide or survey with `show(key)`.

### Manage themes

```dart
engagement.setThemeMode(ThemeMode.dark); // Options: auto, light, dark
```

### Register a callback

```dart
engagement.addCallback('show-alert', () {
  // Custom logic when the guide or survey triggers this callback
});
```

### Reset

```dart
engagement.reset(key: 'GUIDE_KEY', stepIndex: 0);
```

### List

```dart
final guidesAndSurveys = engagement.list();
```

### Show

```dart
engagement.show(key: 'GUIDE_KEY');
```

### Forward event

Use `forwardEvent` to enable the *On event tracked* trigger in Guides and Surveys. The SDK doesn't send forwarded events to Amplitude servers; it uses them only for local trigger evaluation.

```dart
engagement.forwardEvent(eventType: 'Button Clicked', eventProperties: {'name': 'Submit'});
```

### Close all

```dart
engagement.closeAll();
```

## Simulate Guides and Surveys for preview

Previewing guides and surveys in your application lets you experience what your users see. Previewing makes it easier to iterate on copy, targeting rules, and trigger logic.

### Locate the mobile URL scheme

1. Navigate to *Settings > Projects* in Amplitude.
2. Select your project.
3. Navigate to the **General** tab.
4. Find the **URL scheme (mobile)** field.
5. Copy its value, for example, `amp-abcdefgh12345678`.

### Configure deep linking (Android)

Add the following intent filter to your main activity in `android/app/src/main/AndroidManifest.xml`:

```xml
<activity android:name=".MainActivity">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="<your-unique-scheme-id>" />
    </intent-filter>
</activity>
```

Replace `<your-unique-scheme-id>` with the URL scheme value from Amplitude.

### Configure deep linking (iOS)

In Xcode, add a URL type with the scheme value you copied from Amplitude (*Info tab > URL Types > URL Schemes*).

### Handle preview URLs in Flutter

Use `flutter_app_link` or the platform-specific linking APIs to handle incoming URLs and pass them to the engagement SDK:

```dart
import 'package:amplitude_engagement_flutter/amplitude_engagement_flutter.dart';

// When your app receives a deep link (e.g. from uni_links or app_links)
void handleIncomingUrl(Uri uri) {
  engagement.handleLink(uri.toString());
}
```

{{partial:admonition type="warning" heading="Deep linking required for preview"}}
Previewing guides and surveys on a device or simulator requires deep linking. Configure your Flutter app for [deep linking](https://docs.flutter.dev/ui/navigation/deep-linking) and pass the URL to the engagement SDK's link handler.
{{/partial:admonition}}

## Known limitations

### Targeting animated elements and elements inside moving containers

Pins and tooltips can't target widgets that are:

- Animated or inside an animated container (they move on screen).
- Inside a container that moves based on user interaction.

{{partial:admonition type="note" heading=""}}
Scrollable views usually work.
{{/partial:admonition}}

{{partial:admonition type="tip" heading="Workaround"}}
Use screen-based targeting or event-based triggers to show guides, perhaps with a delay so any animations can complete. Don't pin directly to elements in animated containers or containers that move through user interaction.
{{/partial:admonition}}

## Changelog

You can access the changelog [here](/docs/guides-and-surveys/guides-and-surveys-mobile-sdk-changelog).
