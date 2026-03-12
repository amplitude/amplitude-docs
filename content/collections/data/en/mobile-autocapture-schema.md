---
id: f4a8b2c1-9e3d-4f6a-8b1c-2d5e7f9a0b3c
blueprint: data
title: 'Mobile Autocapture Schema'
landing: false
exclude_from_sitemap: false
---
This reference lists Autocapture **event types** and **event property names** for native iOS and Android when you use the [iOS Swift SDK](/docs/sdks/analytics/ios/ios-swift-sdk) and [Android-Kotlin SDK](/docs/sdks/analytics/android/android-kotlin-sdk). Use it when you need a stable contract for pipelines, partners, or validation.

{{partial:admonition type="note" heading=""}}
Amplitude doesn't ship a separate React Native Autocapture package. React Native apps that need comparable behavior typically instrument events manually or bridge to native SDKs. This schema applies to **native** iOS and Android Autocapture only.
{{/partial:admonition}}

For setup steps, go to [Autocapture](/docs/get-started/autocapture). For web Autocapture event properties, go to [Autocapture events and properties](/docs/data/autocapture-events-and-properties).

## Machine-readable schema

Download the combined schema as JSON: [`/docs/mobile-autocapture-schema.json`](/docs/mobile-autocapture-schema.json).

## Shared conventions

- **Event type** values match what Amplitude stores as `event_type` (for example, `[Amplitude] Screen Viewed`).
- **Property names** use the `[Amplitude] …` prefix in the product and in this doc.
- Session events typically carry only standard user and session context unless you add more in code.

## iOS (Swift SDK)

Enable options through `AutocaptureOptions` as described in [Autocapture (iOS)](/docs/sdks/analytics/ios/ios-swift-sdk#autocapture).

| Event type | When it fires | Typical event properties |
| ---------- | ------------- | ------------------------ |
| `[Amplitude] Start Session` | Session starts | User properties (when enabled). |
| `[Amplitude] End Session` | Session ends | User properties (when enabled). |
| `[Amplitude] Application Installed` | First open after install | `[Amplitude] Version`, `[Amplitude] Build`. |
| `[Amplitude] Application Updated` | First open after update | `[Amplitude] Version`, `[Amplitude] Build`, `[Amplitude] Previous Version`, `[Amplitude] Previous Build`. |
| `[Amplitude] Application Opened` | Launch or foreground after first open | `[Amplitude] Version`, `[Amplitude] Build`, `[Amplitude] From Background` (when applicable). |
| `[Amplitude] Application Backgrounded` | App enters background | — |
| `[Amplitude] Screen Viewed` | UIKit screen appears | `[Amplitude] Screen Name`. |
| `[Amplitude] Deep Link Opened` | Deep link opens | URL and referrer-related properties. |
| `[Amplitude] Network Request` | Captured HTTP traffic (per SDK rules) | `[Amplitude] URL`, `[Amplitude] URL Query`, `[Amplitude] URL Fragment`, `[Amplitude] Request Method`, `[Amplitude] Status Code`, `[Amplitude] Error Code`, `[Amplitude] Error Message`, `[Amplitude] Start Time`, `[Amplitude] Completion Time`, `[Amplitude] Duration`, `[Amplitude] Request Body Size`, `[Amplitude] Response Body Size`, plus optional experimental body and header properties when configured. |
| `[Amplitude] Element Interacted` | `UIControl` / gesture interaction | `[Amplitude] Action`, `[Amplitude] Target View Class`, `[Amplitude] Target Text`, `[Amplitude] Target Accessibility Label`, `[Amplitude] Target Accessibility Identifier`, `[Amplitude] Action Method`, `[Amplitude] Gesture Recognizer`, `[Amplitude] Hierarchy`, `[Amplitude] Screen Name`. |
| `[Amplitude] Rage Click` | Frustration (rage click) | See [Track frustration interactions](/docs/sdks/analytics/ios/ios-swift-sdk#track-frustration-interactions). |
| `[Amplitude] Dead Click` | Frustration (dead click) | Same section as Rage Click. |

## Android (Kotlin SDK)

Enable options through `AutocaptureOption` as described in [Autocapture (Android)](/docs/sdks/analytics/android/android-kotlin-sdk#autocapture).

| Event type | When it fires | Typical event properties |
| ---------- | ------------- | ------------------------ |
| `[Amplitude] Start Session` | Session starts | User properties (when enabled). |
| `[Amplitude] End Session` | Session ends | User properties (when enabled). |
| `[Amplitude] Application Installed` | First open after install | `[Amplitude] Version`, `[Amplitude] Build`. |
| `[Amplitude] Application Updated` | First open after update | `[Amplitude] Version`, `[Amplitude] Build`, `[Amplitude] Previous Version`, `[Amplitude] Previous Build`. |
| `[Amplitude] Application Opened` | Launch or foreground after first open | `[Amplitude] Version`, `[Amplitude] Build`, `[Amplitude] From Background` (when applicable). |
| `[Amplitude] Application Backgrounded` | App backgrounds | — |
| `[Amplitude] Screen Viewed` | Activity shown | `[Amplitude] Screen Name`. |
| `[Amplitude] Fragment Viewed` | Fragment shown | `[Amplitude] Screen Name`, `[Amplitude] Fragment Class`, `[Amplitude] Fragment Identifier`, `[Amplitude] Fragment Tag`. |
| `[Amplitude] Deep Link Opened` | Deep link opens | `[Amplitude] Link URL`, `[Amplitude] Link Referrer`. |
| `[Amplitude] Network Request` | Captured HTTP traffic (plugin) | `[Amplitude] URL`, `[Amplitude] URL Query`, `[Amplitude] URL Fragment`, `[Amplitude] Request Method`, `[Amplitude] Status Code`, `[Amplitude] Error Message`, `[Amplitude] Start Time`, `[Amplitude] Completion Time`, `[Amplitude] Duration`, `[Amplitude] Request Body Size`, `[Amplitude] Response Body Size`. |
| `[Amplitude] Element Interacted` | Clickable view or Compose | `[Amplitude] Action`, `[Amplitude] Target Class`, `[Amplitude] Target Resource`, `[Amplitude] Target Tag`, `[Amplitude] Target Text`, `[Amplitude] Target Source`, `[Amplitude] Hierarchy`, `[Amplitude] Screen Name`. |
| `[Amplitude] Rage Click` | Frustration (optional) | See [Track frustration interactions](/docs/sdks/analytics/android/android-kotlin-sdk#track-frustration-interactions). |
| `[Amplitude] Dead Click` | Frustration (optional) | Same section as Rage Click. |

## Related resources

- [iOS Swift SDK](/docs/sdks/analytics/ios/ios-swift-sdk)
- [Android-Kotlin SDK](/docs/sdks/analytics/android/android-kotlin-sdk)
- [Autocapture events and properties (web)](/docs/data/autocapture-events-and-properties)
