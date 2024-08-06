---
id: 062d89f1-1e39-4f90-8490-1ee34c5647f9
blueprint: get-started
title: Autocapture
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1722531117
---
Amplitude's Autocapture helps you gain insights as soon as you install the SDK. This document describes enabling Autocapture.

## Autocapture for the web

When you use them together, Amplitude's latest [Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2) and [Autocapture plugin](/docs/sdks/analytics/browser/autocapture-plugin) captures default events, form field interactions, and marketing attribution information. 

### Install the SDK and plugin
Autocapture requires the latest versions of the Amplitude Browser SDK ({{sdk_versions:browser}}).

{{partial:tabs tabs="Script Loader, npm, yarn"}}
{{partial:tab name="Script Loader"}}
{{partial:partials/code/snippet autocapture="true"}}
{{/partial:tab}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/analytics-browser
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/analytics-browser
```
{{/partial:tab}}
{{/partial:tabs}}

### Initialize the SDK

Autocapture ships with Browser SDK 2.10.0 and above. To enable it, set `config.autocapture.elementInteractions` to `true` when you initialize the SDK.

{{partial:tabs tabs="Script loader, npm / yarn"}}
{{partial:tab name="Script loader"}}
{{partial:partials/code/snippet autocapture="true"}}
{{/partial:tab}}
{{partial:tab name="npm / yarn"}}
```js
import * as amplitude from '@amplitude/analytics-browser';
import { autocapturePlugin } from '@amplitude/plugin-autocapture-browser';

amplitude.init('AMPLITUDE_API_KEY', {
  autocapture: {
    elementInteractions: true
  }
});

```
{{/partial:tab}}
{{/partial:tabs}}

### Content security policy (CSP)

If your web app configures the strict Content Security Policy (CSP) for security concerns, adjust the policy to allowlist to Amplitude domains:

* Add `https://*.amplitude.com` to `script-src`
* Add `https://*.amplitude.com` to `connect-src`

### Default events

| Event           | Description                                              | Properties                                                                                                                                                                                       |
| --------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Page viewed     | Captures when a user loads a page on your site.          | Page counter, Page domain, Page location, Page path, Page title, Page URL, Session Replay ID (if enabled), Referrer, [Attribution](#marketing-attribution), [User properties](#user-properties). |
| Start session   | Captures when a user starts a session on your site.      | Session Replay ID (if enabled), [User properties](#user-properties).                                                                                                                             |
| End session     | Captures when a user ends a session on your site.        | [User properties](#user-properties).                                                                                                                                                             |
| Form started    | Captures when a user interacts with a form on your site. | Form destination, Session Replay ID (if enabled), [User properties](#user-properties).                                                                                                           |
| Form submitted  | Captures when a user submits a form on your site.        | Form destination, Session Replay ID (if enabled), [User properties](#user-properties).                                                                                                           |
| File downloaded | Captures when a user downloads a file from your site.    | File extension, File name, Link text, Link URL, Session Replay ID (if enabled),                                                                                                                  |

For more information, see Track Default Events in the [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2#track-default-events) documentation. 

{{partial:admonition type="tip" heading="Default event prefix"}}
Amplitude prefixes default events with the Amplitude logo or `[Amplitude]` in plain text.
{{/partial:admonition}}

### Marketing attribution

Captures the following properties:

* UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`)
* Referrer parameters (`referrer`, `referring_domain`)
* Click identifiers for Google, Facebook, Kochava, Microsoft, TikTok, X (Twitter), LinkedIn, and Reddit.
* [First-touch](/docs/sdks/analytics/browser/browser-sdk-2#first-touch-attribution) and [multi-touch](/docs/sdks/analytics/browser/browser-sdk-2#multi-touch-attribution). For more information about attribution, see [Use sessions, channels, and attribution to drive marketing analytics](/docs/analytics/marketing-analytics).

### User properties

Amplitude attaches [User Properties](/docs/get-started/user-property-definitions) to all default event, unless disabled.

### Visual labeling for web (alpha)

Amplitude's Visual Labeling tool enables you to identify and select individual elements on a page that you want to track. For example, if you want to track the number of users who click a **Sign up**, button you can select it with Visual Labeling, and Amplitude creates an event that targets the specific element.

Events you add with Visual Labeling work retroactively, since Amplitude captures all form-related events starting from when your instrumentation is live.

For more information, see [Visual Labeling](/docs/data/visual-labeling).

## Autocapture for iOS

The latest version of Amplitude's [iOS SDK](/docs/sdks/analytics/ios/ios-swift-sdk) includes Autocapture capabilities.

### Install the SDK

Install the SDK as instructed in the [iOS-Swift SDK](/docs/sdks/analytics/ios/ios-swift-sdk#install-the-sdk) documentation.

### Initialize the SDK with default tracking enabled

The iOS SDK enables session tracking and disables both application lifecycle tracking and screen view tracking by default.

To enable all default tracking, initialize the SDK with the following snippet.

{{partial:tabs tabs="Swift, Obj-C"}}
{{partial:tab name="Swift"}}
```swift
let amplitude = Amplitude(configuration: Configuration(
    apiKey: "API_KEY",
    defaultTracking: DefaultTrackingOptions.ALL //[tl! ~~]
))
```
{{/partial:tab}}
{{partial:tab name="Obj-C"}}
```objc
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:@"API_KEY"];
configuration.defaultTracking = AMPDefaultTrackingOptions.ALL; //[tl! ~~]
Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];
```
{{/partial:tab}}
{{/partial:tabs}}

### Default events

| Event                    | Description                                                                  | Properties                           |
| ------------------------ | ---------------------------------------------------------------------------- | ------------------------------------ |
| Start session            | Captures when a user starts a session in your app.                           | [User properties](#user-properties). |
| End session              | Captures when a user ends a session in your app.                             | [User properties](#user-properties). |
| Application installed    | Captures when a user opens the app for the first time after they install it. |                                      |
| Application updated      | Captures when a user opens the app for the first time after they update it.  |                                      |
| Application opened       | Captures when a user launches or foregrounds the app after the first open.   |                                      |
| Application backgrounded | Captures when a user backgrounds the application.                            |                                      |
| Screen viewed            | Captures when a user views a screen in an app.                               | Screen name                          |

### User properties

Amplitude attaches [User Properties](/docs/get-started/user-property-definitions) to all default event, unless disabled.

## Autocapture for Android

The latest version of Amplitude's [Android SDK](/docs/sdks/analytics/android/android-kotlin-sdk) includes Autocapture capabilities.

### Install the SDK

Install the SDK as instructed in the [Android-Kotlin SDK](/docs/sdks/analytics/android/android-kotlin-sdk#install-the-sdk) documentation.

### Initialize the SDK with default tracking enabled

The Android-Kotlin SDK enables session tracking, and disables application lifecycle, screen view, and deep link tracking by default. To enable all default tracking, initialize the SDK with the following snippet:

```kotlin
Amplitude(
	Configuration(
	 apiKey = AMPLITUDE_API_KEY,
		context = applicationContext,
		defaultTracking = DefaultTrackingOptions.ALL //[tl! ~~]
	)
)
```

### Default events

| Event                    | Description                                                                  | Properties                           |
| ------------------------ | ---------------------------------------------------------------------------- | ------------------------------------ |
| Start session            | Captures when a user starts a session in your app.                           | [User properties](#user-properties). |
| End session              | Captures when a user ends a session in your app.                             | [User properties](#user-properties). |
| Application installed    | Captures when a user opens the app for the first time after they install it. |                                      |
| Application updated      | Captures when a user opens the app for the first time after they update it.  |                                      |
| Application opened       | Captures when a user launches or foregrounds the app after the first open.   |                                      |
| Application backgrounded | Captures when a user backgrounds the application.                            |                                      |
| Screen viewed            | Captures when a user views a screen in an app.                               | Screen name                          |

### User properties

Amplitude attaches [User Properties](/docs/get-started/user-property-definitions) to all default event, unless disabled.

## Working with Autocapture

Autocapture provides flexible options to help ensure you track the most relevant data.

### Update event definitions

In situations where your site or app's code changes, you can update existing event definitions to match, or create a new event that reflects the update. Autocapture consistently captures raw click events, so the new definition retroactively fixes gaps in your data due to site or application changes.

### Adjust tracked events to control event volume

The [Browser](/docs/sdks/analytics/browser/browser-sdk-2#track-default-events), [iOS](/docs/sdks/analytics/ios/ios-swift-sdk#track-default-events), and [Android](/docs/sdks/analytics/android/android-kotlin-sdk#track-default-events) SDKs have granular control that determines which categories of default event the SDK tracks.

### Use Autocapture as a starting point

Autocapture provides the quickest path to analytics, without the need for engineering support. For more complex use-cases, you may want to work with an engineer to expand your instrumentation and capture more rich metadata and events that are core to your business