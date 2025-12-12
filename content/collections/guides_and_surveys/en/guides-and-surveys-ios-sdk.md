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
* [Amplitude Analytics iOS Swift SDK](/docs/sdks/analytics/ios/ios-swift-sdk): 1.13.0+

## Install and initialize the SDK

Guides and Surveys supports different installation options to work best with your existing Amplitude implementation, if you have one.

### Using Amplitude Analytics iOS Swift 1.13.0+

First, install the Guides and Surveys iOS SDK with Swift Package Manager or CocoaPods.

{{partial:tabs tabs="Swift Package Manager, CocoaPods"}}
{{partial:tab name="Swift Package Manager"}}
1. In Xcode, click *File > Add Packages...*
2. Enter the repository URL `https://github.com/amplitude/Amplitude-Engagement-Swift`
3. Select the `Amplitude-Engagement-Swift` package, version `1.6.0`.
4. Click **Add Package**.
{{/partial:tab}}
{{partial:tab name="CocoaPods"}}
Add the following line to your Podfile, then run `pod install`.

```T
pod 'AmplitudeEngagementSwift', '~> 1.6.0'
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="note" heading=""}}
We don't update our docs on each release. You can check for the latest version here: https://github.com/amplitude/Amplitude-Engagement-Swift
{{/partial:admonition}}

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
| `initOptions.serverUrl`  | `string`                                                                                          | Optional. Sets a custom server URL for API requests. Useful for [proxy setups](/docs/guides-and-surveys/proxy). Default: `https://gs.amplitude.com` (US) or `https://gs.eu.amplitude.com` (EU)                                                         |
| `initOptions.cdnUrl`     | `string`                                                                                          | Optional. Sets a custom CDN URL for static assets. Useful for [proxy setups](/docs/guides-and-surveys/proxy). Default: `https://cdn.amplitude.com` (US) or `https://cdn.eu.amplitude.com` (EU)                                                         |
| `initOptions.mediaUrl`   | `string`                                                                                          | Optional. Sets a custom URL for proxying nudge images. Useful for [proxy setups](/docs/guides-and-surveys/proxy) when images are blocked. Default: `https://engagement-static.amplitude.com` (US) or `https://engagement-static.eu.amplitude.com` (EU) |
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

### Not using Amplitude Analytics Swift 1.13.0+
In this case, installation is very similar to above; however, you need to manually call `.boot`.

First, install the Guides and Surveys iOS SDK with Swift Package Manager or CocoaPods.

{{partial:tabs tabs="Swift Package Manager, CocoaPods"}}
{{partial:tab name="Swift Package Manager"}}
1. In Xcode, click *File > Add Packages...*
2. Enter the repository URL `https://github.com/amplitude/Amplitude-Engagement-Swift`
3. Select the `Amplitude-Engagement-Swift` package, version `1.6.0`.
4. Click **Add Package**.
{{/partial:tab}}
{{partial:tab name="CocoaPods"}}
Add the following line to your Podfile, then run `pod install`.

```T
pod 'AmplitudeEngagementSwift', '~> 1.6.0'
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="note" heading=""}}
We don't update our docs on each release. You can check for the latest version here: https://github.com/amplitude/Amplitude-Engagement-Swift
{{/partial:admonition}}

#### Initialize the SDK

```swift
import AmplitudeEngagementSwift


let amplitudeEngagement = AmplitudeEngagement("YOUR_API_KEY")


let configuration = Configuration(
  apiKey: API_KEY
)
```

#### Configuration options

| Parameter                | Type                                                                                              | Description                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiKey`                 | `string`                                                                                          | Required. API key of the Amplitude project you want to use.                                                                                                               |
| `initOptions.serverZone` | `EU` or `US`                                                                                      | Optional. Sets the Amplitude server zone. Set this to EU for Amplitude projects created in EU data center. Default: `US`                                                  |
| `initOptions.serverUrl`  | `string`                                                                                          | Optional. Sets a custom server URL for API requests. Useful for [proxy setups](/docs/guides-and-surveys/proxy). Default: `https://gs.amplitude.com` (US) or `https://gs.eu.amplitude.com` (EU)                                                         |
| `initOptions.cdnUrl`     | `string`                                                                                          | Optional. Sets a custom CDN URL for static assets. Useful for [proxy setups](/docs/guides-and-surveys/proxy). Default: `https://cdn.amplitude.com` (US) or `https://cdn.eu.amplitude.com` (EU)                                                         |
| `initOptions.mediaUrl`   | `string`                                                                                          | Optional. Sets a custom URL for proxying nudge images. Useful for [proxy setups](/docs/guides-and-surveys/proxy) when images are blocked. Default: `https://engagement-static.amplitude.com` (US) or `https://engagement-static.eu.amplitude.com` (EU) |
| `initOptions.logLevel`   | `LogLevel.None` or `LogLevel.Error` or `LogLevel.Warn` or `LogLevel.Verbose` or `LogLevel.Debug`. | Optional. Sets the log level. Default: `LogLevel.Warn`                                                                                                                    |
| `initOptions.locale`     | `string`                                                                                          | Optional. Sets the locale for [localization](/docs/guides-and-surveys/sdk#localization). Default: `undefined`. Not setting a language means the default language is used. |

#### Boot the SDK

```swift
// Basic boot with user ID
amplitudeEngagement.boot("USER_ID")

// Advanced boot with options

let bootOptions = AmplitudeBootOptions(
  user_id: "USER_ID",
  device_id: "DEVICE_ID",
  user_properties: ["key": "value"]
  integrations: [
    { event, eventProperties in
        // Custom event handler
    }
  ]
)
amplitudeEngagement.boot(options: bootOptions)
```

{{partial:admonition type="note" heading=""}}
After you call `amplitudeEngagement.boot`, you are technically done installing. While screen tracking and element targeting are optional, we highly recommend [setting up URL handling for preview mode](/docs/guides-and-surveys/guides-and-surveys-ios-sdk#simulate-guides-and-surveys-for-preview).
{{/partial:admonition}}

## Add your application to project settings

After installing the SDK, add your iOS application to your Amplitude project settings so it appears as a platform option when you create guides and surveys.

To add your application:

1. Navigate to *Settings > Projects* in Amplitude.
2. Select your project.
3. Navigate to the **Guides and Surveys** tab.
4. In the **App Management** section, expand and click **+ Add App**.
5. Select **iOS** from the dropdown.

After you add your application, it appears as a platform option when you create or edit guides and surveys. This enables you to deliver guides and surveys to your iOS app users.

## Screen tracking and element targeting
Screen tracking and element targeting are technically optional, but can be very helpful for making your guides and surveys feel more targeted.

### Enable screen tracking

Required for screen-based targeting and the Time on Screen trigger. The screen string (eg "HomeScreen" in the example below) is compared with the string provided in the guide or survey page targeting section.

```swift
// Track screen views to trigger guides based on screens
amplitudeEngagement.screen("HomeScreen")
```

{{partial:admonition type="warning" heading=""}}
`Screen Viewed` events from the Amplitude iOS Swift SDK's [Autocapture feature](/docs/sdks/analytics/ios/ios-swift-sdk#autocapture) are auto-forwarded to the Engagement SDK.
{{/partial:admonition}}

### Enable element targeting

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

## Other SDK methods

### Manage themes

Configure the visual theme mode if your app supports light and dark modes.


```swift
// Set the theme mode
amplitudeEngagement.setThemeMode(ThemeMode.DARK) // Options: AUTO, LIGHT, DARK
```

### Router configuration

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

### Reset

Reset a guide or survey to a specific step.

```swift
amplitudeEngagement.reset(key = "GUIDE_KEY", stepIndex = 0)
```

| Parameter  | Type                    | Description                                           |
| ---------- | ----------------------- | ----------------------------------------------------- |
| `key`       | `string` | Required. The guide or survey's key.                                                    |
| `stepIndex` | `number` | Required. The zero-based index of the step to reset to. Defaults to the initial step. |


### List

Retrieve a list of all live guides and surveys along with their status.

```swift
val guidesAndSurveys = amplitudeEngagement.list()
```

### Show

Display a specific guide or survey. Ignores any targeting rules and limits except for screen targeting.

```kotlin
amplitudeEngagement.show(key = "GUIDE_KEY")
```

| Parameter  | Type                    | Description                                           |
| ---------- | ----------------------- | ----------------------------------------------------- |
| `key`       | `string` | Required. The guide or survey's key.                                                    |


### Forward event

If you don't use the plugin, but want to trigger Guides using events.

```swift
amplitudeEngagement.forwardEvent([
  "event_type": "my event type", 
  "event_properties": [String: String]()
])
```

### Close all

Close all active guides and surveys.

```kotlin
amplitudeEngagement.closeAll()
```

## Simulate Guides and Surveys for preview
Previewing guides and surveys direclty in your application allows you to experience what your users will. Previewing makes it much easier to iterate on copy, targeting rules, trigger logic, etc.

### Locate the mobile URL scheme

To locate the URL scheme:
1. Navigate to *Settings > Projects* in Amplitude.
2. Select your project.
3. Navigate to the **General** tab.
4. Find the **URL scheme (mobile)** field.
5. Copy its value, for example, `amp-abcdefgh12345678`.

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

## Known limitations

### Tab bar element targeting

Pins and tooltips can't target tab bar items (for example, `UITabBar` elements). Tab bars use system-level components that exist outside the standard view hierarchy, which prevents the SDK from reliably locating and attaching guides to these elements.

**Workaround:** Use screen-based targeting or event-based triggers to show guides when users navigate to specific tabs, rather than pinning directly to tab bar items.

## Changelog

You can access the changelog [here](/docs/guides-and-surveys/guides-and-surveys-mobile-sdk-changelog).
