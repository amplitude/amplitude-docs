---
id: 0ab649dd-1a05-47d3-9d56-f476f141030f
blueprint: guides_and_survey
title: 'Guides and Surveys Android SDK'
landing: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1750710914
---
Amplitude's Guides and Surveys Android SDK enables you to deploy [Guides and Surveys](/docs/guides-and-surveys) in your Android applications.

## Requirements

The Guides and Surveys Android SDK requires:

* Android API Level 24 (Android 7.0) or higher
* Kotlin 1.8.22 or newer
* [Amplitude Android-Kotlin SDK](/docs/sdks/analytics/android/android-kotlin-sdk) 1.0 or higher.

## Install and initialize the SDK

Add the following depenedencies to your application's `build.gradle.kts` file:

```kotlin
dependencies {
    // Amplitude Engagement SDK
    implementation("com.amplitude:amplitude-engagement-android:1.0+")

    // Amplitude Analytics SDK (required dependency)
    implementation("com.amplitude:analytics-android:1.+")
}
```

### Initialize the SDK

```kotlin
import com.amplitude.android.engagement.AmplitudeEngagement
import com.amplitude.android.engagement.AmplitudeInitOptions

// Initialize the SDK
val amplitudeEngagement = AmplitudeEngagement(
    context = applicationContext,
    apiKey = "YOUR_API_KEY",
    options = AmplitudeInitOptions()
)

// Add the plugin to your Amplitude instance
val amplitude = Amplitude(applicationContext)
amplitude.add(amplitudeEngagement.getPlugin())
```

#### Configuration options

| Parameter                | Type                                                                                              | Description                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiKey`                 | `string`                                                                                          | Required. API key of the Amplitude project you want to use.                                                                                                               |
| `initOptions.serverZone` | `EU` or `US`                                                                                      | Optional. Sets the Amplitude server zone. Set this to EU for Amplitude projects created in EU data center. Default: `US`                                                  |
| `initOptions.logLevel`   | `LogLevel.None` or `LogLevel.Error` or `LogLevel.Warn` or `LogLevel.Verbose` or `LogLevel.Debug`. | Optional. Sets the log level. Default: `LogLevel.Warn`                                                                                                                    |
| `initOptions.locale`     | `string`                                                                                          | Optional. Sets the locale for [localization](/docs/guides-and-surveys/sdk#localization). Default: `undefined`. Not setting a language means the default language is used. |


### Boot the SDK

```kotlin
// Basic boot with user ID
amplitudeEngagement.boot(userId = "USER_ID")

// Advanced boot with options
val bootOptions = AmplitudeBootOptions(
    user = AmplitudeEndUser(
        userId = "USER_ID",
        deviceId = "DEVICE_ID",
        userProperties = mapOf("key" to "value")
    )
)
amplitudeEngagement.boot(bootOptions)
```

### Enable screen tracking (optional)

Required for screen targeting and the Time on Screen trigger.

```kotlin
// Track screen views to trigger guides based on screens
amplitudeEngagement.screen("HomeScreen")
```

## Manage themes

Configure the visual theme mode if your app supports light and dark modes.

```kotlin
// Set the theme mode
amplitudeEngagement.setThemeMode(ThemeMode.DARK) // Options: LIGHT, DARK, SYSTEM
```

## Reset

Reset a guide or survey to a specific step.

```kotlin
amplitudeEngagement.reset(key = "GUIDE_KEY", stepIndex = 0)
```

| Parameter  | Type                    | Description                                           |
| ---------- | ----------------------- | ----------------------------------------------------- |
| `key`       | `string` | Required. The guide or survey's key.                                                    |
| `stepIndex` | `number` | Required. The zero-based index of the step to reset to. Defaults to the initial step. |

## List

Retrieve a list of all live guides and surveys along with their status.

```kotlin
val guidesAndSurveys = amplitudeEngagement.list()
```

## Show

Display a specific guide or survey. Ignores any targeting rules and limits except for page targeting.

```kotlin
amplitudeEngagement.show(key = "GUIDE_KEY")
```

| Parameter  | Type                    | Description                                           |
| ---------- | ----------------------- | ----------------------------------------------------- |
| `key`       | `string` | Required. The guide or survey's key.                                                    |


## Forward event

If you don't use the plugin, but want to trigger Guides using events, call `forwardEvent` with any events want to use as triggers.

```kotlin
// Forward events from Amplitude to trigger guides
val event = BaseEvent()
amplitudeEngagement.forwardEvent(event)
```

## Close all

Close all active guides and surveys.

```kotlin
amplitudeEngagement.closeAll()
```

## Simulate Guides and Surveys for preview

To use preview mode to test a guide or survey in your app, configure a custom URL scheme.

### Locate the mobile URL scheme

In Amplitude, navigate to your Project's settings.

On the **General** tab, locate the **URL scheme (mobile)** field. Copy its value, for example, `amp-abc123`.

### Add the URL scheme in Android Studio

Add the following intent filter to the main activity to your project's `AndroidManifest.xml` file:

```xml
<activity android:name=".MainActivity">
    <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <!-- Add your URL scheme from Amplitude Dashboard here -->
    <!-- ex: android:scheme="amp-12345" -->
    <data android:scheme="<your-unique-scheme-id>" />
    </intent-filter>
</activity>
```

### URL handling for preview links

```kotlin
// In your Activity
override fun onNewIntent(intent: Intent?) {
    super.onNewIntent(intent)
    amplitudeEngagement.handlePreviewLinkIntent(intent)
}
```