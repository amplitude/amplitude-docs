---
id: 0ab649dd-1a05-47d3-9d56-f476f141030f
blueprint: guides_and_survey
title: 'Guides and Surveys Android SDK'
landing: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1750710914
---
Amplitude's Guides and Surveys Android SDK enables you to deploy [Guides and Surveys](/docs/guides-and-surveys) in your Android applications.

{{partial:admonition type="beta" heading="This SDK is in Open Beta"}}
This feature is in open beta and under active development.
{{/partial:admonition}}

## Requirements

The Guides and Surveys Android SDK requires:

* Android API Level 24 (Android 7.0) or higher
* Kotlin 1.8.22 or newer
* [Amplitude Android-Kotlin SDK](/docs/sdks/analytics/android/android-kotlin-sdk) 1.0 or higher.

## Install and initialize the SDK

Guides and Surveys supports different installation options to work best with your existing Amplitude implementation, if you have one.

### Using Kotlin 1.8.22+

Add the following dependencies to your application's `build.gradle.kts` file:

```kotlin
dependencies {
    // Amplitude Engagement SDK
    implementation("com.amplitude:amplitude-engagement-android:1.0+")

    // Amplitude Analytics SDK (required dependency)
    implementation("com.amplitude:analytics-android:1.+")
}
```

#### Initialize the SDK

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

{{partial:admonition type="warning" heading="Use the same API key for Guides & Surveys and Analytics"}}
To avoid analytics mismatches and ensure accurate data collection, use the same API key for both Guides & Surveys and your Analytics SDK. Both should reference the same Amplitude project. Using different API keys can cause:

- The SDK to fetch guides and surveys from the wrong project
- Analytics data to appear in different projects
- Insights and survey responses are incomplete or mismatched

Make sure the API key you provide to Guides & Surveys matches the API key used to initialize your Amplitude Analytics SDK.
{{/partial:admonition}}

{{partial:admonition type="note" heading=""}}
After you call `amplitude.add`, you are technically done installing. While screen tracking and element targeting are optional, Amplitude recommends that you [set up URL handling for preview mode](/docs/guides-and-surveys/guides-and-surveys-android-sdk#simulate-guides-and-surveys-for-preview).
{{/partial:admonition}}

### Enable screen tracking (optional)

Required for screen targeting and the Time on Screen trigger.

```kotlin
// Track screen views to trigger guides based on screens
amplitudeEngagement.screen("HomeScreen")
```

### Enable element targeting (optional)

Pin and tooltip guides require the ability for the SDK to target specific elements on screen. 

#### Jetpack Compose

Use Amplitude Engagement's `.amplitudeView` modifier to tag Jetpack Compose views. Pass your instance of `AmplitudeEngagement` as a parameter to `.amplitudeView`. Configure a `CompositionLocalProvider` and access it in your view hierarchy or pass your instance as a parameter to your composable views.

```kotlin
// Jetpack Compose Tagging

@Composable
fun MyView() {
    // Use your instance of Amplitude Engagement by creating a Composition context or passing as a param
    val engagement = LocalEngagement.current

    Box {
        Button(
            modifier = Modifier.amplitudeView(
                engagement, 
                tag = "my-button",
                onTrigger = {
                    // Optional code to run with tap element action
                }
            )
        )
    }
}
```

#### Non-Jetpack Compose

Guides and Surveys also supports non-Jetpack Compose views. The SDK uses the `tag`, `contentDescription`, or `resourceName` fields to check for a matching selector. You need to set only one of these.

Configure this in your existing layout XMLs or programmatically by setting the properties on the view instance.

```xml
<!-- in my_layout.xml -->
<LinearLayout>
    <Button
        <!-- Set either contentDescription or tag to your desired selector -->
        android:contentDescription="my-button"
        android:tag="my-button" />
</LinearLayout>
```

```kotlin
// Non Jetpack Compose Programmatic Tagging
val button = Button(this)

// Set the contentDescription
button.contentDescription = "my-button"
// Or, set the tag
button.tag = "my-button"
```

## Manage themes

Configure the visual theme mode if your app supports light and dark modes.

```kotlin
// Set the theme mode
amplitudeEngagement.setThemeMode(ThemeMode.DARK) // Options: AUTO, LIGHT, DARK
```

## Router configuration

Configure how Guides and Surveys handles screen navigation.

```kotlin
engagement.setRouter { identifier ->
  // Your screen handling and navigation
}
```

| Parameter           | Type                    | Description                                                                     |
| ------------------- | ----------------------- | ------------------------------------------------------------------------------- |
| `identifier`        | `String`                | Required. A screen identifier (or route) that tells your app where to navigate. |
| `router` (callback) | `(String) -> Unit`      | Required. A callback you implement to handle screen navigation when Guides or Surveys need to change screens. |

{{partial:admonition type="note" heading="Update link behavior"}}
After you configure the router with `setRouter()`, update the link behavior setting in the Guides and Surveys interface. For any link actions in your guides or surveys, change the behavior to **Use router**. This ensures that the guide or survey uses the custom router function instead of the default browser navigation.
{{/partial:admonition}}

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

Display a specific guide or survey. Ignores any targeting rules and limits except for screen targeting.

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

### Add your mobile app to project settings

Before you can use preview mode, add your Android app to your project settings in Amplitude:

1. In Amplitude, navigate to **Settings** > **Organization Settings** > **Projects**.
2. Select your project.
3. Click the **Guides and Surveys** tab.
4. In the **App Management** section, click **Add App**.
5. Enter your Android app's package name (for example, `com.example.myapp`).
6. Click **Save**.

After you add your app, Amplitude generates a unique URL scheme for mobile preview.

### Locate the mobile URL scheme

After adding your app to project settings, locate the URL scheme:

1. In the **Guides and Surveys** tab of your project settings, find the **URL scheme (mobile)** field.
2. Copy its value, for example, `amp-abc123`.

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

## Changelog
You can access the changelog [here](/docs/guides-and-surveys/guides-and-surveys-mobile-sdk-changelog).