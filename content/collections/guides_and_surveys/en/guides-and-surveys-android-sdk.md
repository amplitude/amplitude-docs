---
id: 0ab649dd-1a05-47d3-9d56-f476f141030f
blueprint: guides_and_survey
title: 'Guides and Surveys Android SDK'
landing: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1750710914
---
Amplitude's Guides and Surveys Android SDK enables you to deploy [Guides and Surveys](/docs/guides-and-surveys) in your Android applications.



## Requirements {.web-only-tag}

The Guides and Surveys Android SDK requires:

* Android API Level 24 (Android 7.0) or higher
* Kotlin 1.8.22 or newer

## Installation

Add the following depenedencies to your application's `build.gradle.kts` file:

```kotlin
dependencies {
    // Amplitude Engagement SDK
    implementation("com.amplitude:amplitude-engagement-android:1.0+")

    // Amplitude Analytics SDK (required dependency)
    implementation("com.amplitude:analytics-android:1.+")
}
```

## Initialize the SDK

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

## Enable screen tracking

```kotlin
// Track screen views to trigger guides based on screens
amplitudeEngagement.screen("HomeScreen")
```

## Manage Guides and Surveys

```kotlin
// Show a specific guide
amplitudeEngagement.show(key = "GUIDE_KEY")

// List all available guides and surveys
val guidesAndSurveys = amplitudeEngagement.list()

// Reset a guide to a specific step
amplitudeEngagement.reset(key = "GUIDE_KEY", stepIndex = 0)

// Close all active guides and surveys
amplitudeEngagement.closeAll()
```

## Manage themes

Configure the visual theme mode if your app supports light and dark modes.

```kotlin
// Set the theme mode
amplitudeEngagement.setThemeMode(ThemeMode.DARK) // Options: LIGHT, DARK, SYSTEM
```

## Event forwarding

If you don't use the plugin, but want to trigger Guides using events, call `forwardEvent` with any events want to use as triggers.

```kotlin
// Forward events from Amplitude to trigger guides
val event = BaseEvent()
amplitudeEngagement.forwardEvent(event)

URL Handling (for preview links)

// In your Activity
override fun onNewIntent(intent: Intent?) {
    super.onNewIntent(intent)
    amplitudeEngagement.handlePreviewLinkIntent(intent)
}
```

## Lifecycle management

Android applications should register the SDK for activity lifecycle events:

```kotlin
// This is done automatically if you initialize with Application context
// For manual registration:
if (context is Application) {
    (context as Application).registerActivityLifecycleCallbacks(
        ActivityLifecycleCallbacks(amplitudeEngagement)
    )
}
```

## Resource cleanup

```kotlin
// Clean up resources when the application is terminated
override fun onTerminate() {
    super.onTerminate()
    amplitudeEngagement.cleanup()
}
```