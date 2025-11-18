---
id: 7771a16f-7edf-4cec-9098-3e9b23ca6dfb
blueprint: guides_and_survey
title: 'Guides and Surveys iOS SDK'
landing: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1750710877
---
Amplitude's Guides and Surveys iOS SDK enables you to deploy [Guides and Surveys](/docs/guides-and-surveys) in your iOS applications.

{{partial:admonition type="beta" heading="This SDK is in Open Beta"}}
This feature is in open beta and under active development.
{{/partial:admonition}}

## Requirements

The Guides and Surveys iOS SDK requires:

* User devices on iOS 15 or higher
* Swift 5.9+
* [Amplitude iOS Swift SDK](/docs/sdks/analytics/ios/ios-swift-sdk): 1.13.0+

## Install and initialize the SDK

Guides and Surveys supports different installation options to work best with your existing Amplitude implementation, if you have one.

### Using Amplitude Swift 5.9+

First, install the Guides and Surveys iOS SDK with Swift Package Manager or CocoaPods.

{{partial:tabs tabs="Swift Package Manager, CocoaPods"}}
{{partial:tab name="Swift Package Manager"}}
1. In Xcode, click *File > Add Packages...*
2. Enter the repository URL `https://github.com/amplitude/Amplitude-Engagement-Swift`
3. Select the `Amplitude-Engagement-Swift` package, version `1.0.5`.
4. Click **Add Package**.
{{/partial:tab}}
{{partial:tab name="CocoaPods"}}
Add the following line to your Podfile, then run `pod install`.

```T
pod 'AmplitudeEngagementSwift', '~> 1.0.5'
```
{{/partial:tab}}
{{/partial:tabs}}

#### Initialize the SDK

Next, make sure to initialize the SDK.

```swift
import AmplitudeEngagementSwift


let amplitudeEngagement = AmplitudeEngagement("YOUR_API_KEY")


let configuration = Configuration(
  apiKey: API_KEY
)
let amplitude = Amplitude(configuration: configuration)
amplitude.add(plugin: amplitudeEngagement.getPlugin())
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
After you call `amplitude.add`, you are technically done installing. While screen tracking and element targeting are optional, it's highly recommended to [set up URL handling for preview mode](/docs/guides-and-surveys/guides-and-surveys-ios-sdk#simulate-guides-and-surveys-for-preview).
{{/partial:admonition}}

## Add your application to project settings

After installing the SDK, add your iOS application to your Amplitude project settings so it appears as a platform option when you create guides and surveys.

To add your application:

1. Navigate to **Settings** > **Projects** in Amplitude.
2. Select your project.
3. Navigate to the **General** tab.
4. In the **Platform** section, click **+ Add Platform**.
5. Select **iOS** from the platform list.
6. Enter your application details:
   - **App name**: Your app's display name
   - **Bundle ID**: Your iOS bundle identifier (for example, `com.example.myapp`)
7. Click **Save**.

After you add your application, it appears as a platform option when you create or edit guides and surveys. This enables you to target your iOS users and preview guides directly in your app.

{{partial:admonition type='tip' heading='Find your bundle ID'}}
Your iOS bundle identifier is defined in your Xcode project settings under **General** > **Identity** > **Bundle Identifier**.
{{/partial:admonition}}

### Enable screen tracking (optional)

```swift
// Track screen views to trigger guides based on screens
amplitudeEngagement.screen("HomeScreen")
```

### Enable element targeting (optional)

Pin and tooltip guides require the ability for the SDK to target specific elements on screen. To enable this in your app, give the element a unique identifier.

```swift
// Swift UI
MySwiftView {
    // Content
}
.amplitudeView("MySwiftView", onTrigger: {
    // Optional code to run with tap element action
}

// UIKit
let myView = MyUIKitView(...)
myView.accessibilityIdentifier = "MyView"
```

## Manage themes

Configure the visual theme mode if your app supports light and dark modes.


```swift
// Set the theme mode
amplitudeEngagement.setThemeMode(ThemeMode.DARK) // Options: AUTO, LIGHT, DARK
```

## Router configuration

Configure how Guides and Surveys handles screen navigation.

```swift
engagement.setRouter { identifier in
  // Your screen handling and navigation
}
```

| Parameter          | Type                    | Description                                                                     |
| ------------------ | ----------------------- | ------------------------------------------------------------------------------- |
| `identifier`       | `String`                | Required. A screen identifier (or route) that tells your app where to navigate. |
| `router` (closure) | `(String) -> Void`      | Required. A function (closure) you implement to handle screen navigation when Guides or Surveys need to change screens. |

{{partial:admonition type="note" heading="Update link behavior"}}
After you configure the router with `setRouter()`, update the link behavior setting in the Guides and Surveys interface. For any link actions in your guides or surveys, change the behavior to **Use router**. This ensures that the guide or survey uses the custom router function instead of the default browser navigation.
{{/partial:admonition}}

## Reset

Reset a guide or survey to a specific step.

```swift
amplitudeEngagement.reset(key = "GUIDE_KEY", stepIndex = 0)
```

| Parameter  | Type                    | Description                                           |
| ---------- | ----------------------- | ----------------------------------------------------- |
| `key`       | `string` | Required. The guide or survey's key.                                                    |
| `stepIndex` | `number` | Required. The zero-based index of the step to reset to. Defaults to the initial step. |


## List

Retrieve a list of all live guides and surveys along with their status.

```swift
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

If you don't use the plugin, but want to trigger Guides using events.

```swift
amplitudeEngagement.forwardEvent([
  "event_type": "my event type", 
  "event_properties": [String: String]()
])
```

## Close all

Close all active guides and surveys.

```kotlin
amplitudeEngagement.closeAll()
```

## Simulate Guides and Surveys for preview

To use preview mode to test a guide or survey in your app, configure a custom URL scheme.

### Add your mobile app to project settings

Before you can use preview mode, add your iOS app to your project settings in Amplitude:

1. In Amplitude, navigate to **Settings** > **Organization Settings** > **Projects**.
2. Select your project.
3. Click the **Guides and Surveys** tab.
4. In the **App Management** section, click **Add App**.
5. Enter your iOS app's bundle ID (for example, `com.example.MyApp`).
6. Click **Save**.

After you add your app, Amplitude generates a unique URL scheme for mobile preview.

### Locate the mobile URL scheme

After adding your app to project settings, locate the URL scheme:

1. In the **Guides and Surveys** tab of your project settings, find the **URL scheme (mobile)** field.
2. Copy its value, for example, `amp-abc123`.

### Add the URL scheme in Xcode

1. Open your iOS project in Xcode.
2. In the Project navigator, select your app's target.
3. On the **Info** tab, locate the **URL Types** section.
4. Add a new URL type with the following values:
    * **Identifier**: Provide a descriptive name, like `AmplitudeURLScheme`.
    * **URL Schemes**: Paste the value you copied from Amplitude, for example `amp-abc123`.

### Configure URL handling for preview links

```swift
// In your AppDelegate or SceneDelegate
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    if amplitudeEngagement.handleUrl(url) {
        return true
    }
    // Handle other URL schemes
    return false
}
```

## Changelog
You can access the changelog [here](/docs/guides-and-surveys/guides-and-surveys-mobile-sdk-changelog).