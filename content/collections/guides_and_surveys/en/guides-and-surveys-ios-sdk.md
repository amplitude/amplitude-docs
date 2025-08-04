---
id: 7771a16f-7edf-4cec-9098-3e9b23ca6dfb
blueprint: guides_and_survey
title: 'Guides and Surveys iOS SDK'
landing: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1750710877
---
Amplitude's Guides and Surveys iOS SDK enables you to deploy [Guides and Surveys](/docs/guides-and-surveys) in your iOS applications.

## Requirements

The Guides and Surveys iOS SDK requires:

* User devices on iOS 15 or higher
* Swift 5.9+
* [Amplitude iOS Swift SDK](/docs/sdks/analytics/ios/ios-swift-sdk): 1.0.13+

## Install and initialize the SDK

Install the Guides and Surveys iOS SDK with Swift Package Manager or CocoaPods.

{{partial:tabs tabs="Swift Package Manager, CocoaPods"}}
{{partial:tab name="Swift Package Manager"}}
1. In Xcode, click *File > Add Packages...*
2. Enter the repository url `https://github.com/amplitude/Amplitude-Engagement-Swift`
3. Select the `Amplitude-Engagement-Swift` package, version `1.0.5`.
4. Click **Add Package**.
{{/partial:tab}}
{{partial:tab name="CocoaPods"}}
Add the following line to your Podfile, then run `pod install`.

```
pod 'AmplitudeEngagementSwift', '~> 1.0.5'
```
{{/partial:tab}}
{{/partial:tabs}}

### Initialize the SDK

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


### Boot the SDK

```swift
// Basic boot with user ID
amplitudeEngagement.boot("USER_ID")

// Advanced boot with options

let bootOptions = AmplitudeBootOptions(
  user_id: "USER_ID",
  device_id: "DEVICE_ID",
  user_properties: ["key": "value"]
)
amplitudeEngagement.boot(options: bootOptions)
```

### Enable screen tracking (optional)

```swift
// Track screen views to trigger guides based on screens
amplitudeEngagement.screen("HomeScreen")
```

### Enable element targeting

Pin and tooltip guides require the ability for the SDK to target specific elements on screen. To enable this in your app:

```swift
// Swift UI

MySwiftView {

}
.amplitudeView("MySwiftView")

let myView = MyUIKitView(...)
myView.accessibilityIdentifier = "MyView"
```

## Manage themes

Configure the visual theme mode if your app supports light and dark modes.


```swift
// Set the theme mode
amplitudeEngagement.setThemeMode(ThemeMode.DARK) // Options: LIGHT, DARK, SYSTEM
```

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

Display a specific guide or survey. Ignores any targeting rules and limits except for page targeting.

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

### Locate the mobile URL scheme

In Amplitude, navigate to your Project's settings.

On the **General** tab, locate the **URL scheme (mobile)** field. Copy its value, for example, `amp-abc123`.

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

