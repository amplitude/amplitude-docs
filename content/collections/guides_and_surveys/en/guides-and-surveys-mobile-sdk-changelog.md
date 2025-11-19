---
id: f47b9d82-8e14-4a53-a6f2-27b1cc5a319a
blueprint: guides_and_survey
title: 'Guides and Surveys Mobile SDK Changelog'
landing: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1750443681
---
<!-- vale off -->

## 1.7.0 (Android, iOS, React Native) \[2025-11-18\]

#### 🐛 Fixes
- Fix: type error when using the Engagement Analytics Plugin with "amplitude.add(...)" (GSDK-698) \[rn\]
- Fix: Guide title incorrectly center-aligned when left alignment was configured (GSDK-701) \[android\]
- Fix: Allow underscore ("_") separated font files on Android (GSDK-701) \[android\]
- Fix: Use correct corner radius and outer padding when rendering Guide (GSDK-701) \[android\]
- Fix: app is unresponsive after displaying StoreKit content (e.g. `manageSubscriptionsSheet`) (GSDK-699) \[ios\]


## 1.6.1 (Android, iOS, React Native) \[2025-11-13\]

#### 🐛 Fixes

- Fix: update ordering of survey and media blocks (GSDK-689) \[android, ios\]
- Fix: fix threading issue for uikit click element (GSDK-571) \[ios\]
- Fix: fix nudge anchoring on custom nav bar behind transparent system nav bar (GSDK-664) \[ios\]
- Fix: refactor view hierarchy scanning to improve performance on the Main thread \[android\]


## 1.6.0 (Android, iOS, React Native) \[2025-11-07\]

### ✨ Features
- Feat: proxy support (GSDK-630) (go to https://amplitude.com/docs/guides-and-surveys/proxy) \[android, ios\]
- Feat: support 4 new popover Guide positions (top-center, bottom-center, left-center, right-center) (FOO-2639) \[android, ios\]

### 🐛 Fixes
- Fix: add debug logging to all SDK methods \[android, ios\]
- Fix: proper handling of null or blank user IDs on boot (GSDK-681) \[android\]
- Fix: theming fixes (incorrect colors, text alignment, popover Guide width, and so forth.) (GSDK-671) \[android\]
- Fix: when pin target scrolls offscreen, guide should be displayed again when target re-appears (GSDK-651) \[android\]
- Fix: on tablets, modal carousel max width in theme is used, rather than device's max-width (GSDK-633, GSDK-616) \[ios, android\]
- Fix: stop showing previously previewed guide when initiating a new preview (GSDK-595) \[ios\]
- Fix: ensure URLs opened in browser are opened on main UI thread (GSDK-652) \[ios\]
- Fix: odd whitespace appears when Guide content is right-aligned (GSDK-647) \[android\]
- Fix: automatically call shutdown() when the user ID is set to `nil` via Amplitude Analytics SDK (#436) \[ios\]
- Fix: modal Guide moves from centered to top left of screen (GSDK-627) \[ios\]
- Fix: app hangs when executing a callback via a CTA button (GSDK-458) \[ios\]
- Fix: banners using text animations have blank text (GSDK-638) \[ios\]
- Fix: tooltip markers not staying with their targeted element when scrolling vertically (GSDK-607) \[ios\]
- Fix: tooltip appearing without pointer (GSDK-607) \[ios\]
- Fix: user-driven dismissal of tooltip should NOT hide the tooltip marker (GSDK-607) \[ios\]
- Fix: ensure user properties passed to `analytics.identify` are used for Guide user property interpolation (#415) \[ios\]
- Fix: prevent flickering for tooltips and closed-by-default pins (GSDK-659) \[ios\]
- Fix: allow pins to target navbar elements (GSDK-664) \[ios\]
- Fix: close button ("x") padding uses value from theme (GSDK-661) \[ios\]
- Fix: images sometimes not loading (GSDK-656) \[ios\]


## 1.5.2 (iOS, React Native) \[2025-10-31\]

- Fix: crash when calling `setUserId`


## 1.5.1 (Android, iOS, React Native) \[2025-10-30\]

- SDK breaking change: `cleanup()` and `reboot()` functions have been removed, use `shutdown()` instead \[android, ios\]

- Fix: ensure `shutdown()` removes all active nudges from view \[android, ios, rn\]
- Fix: ensure non-JSON-safe values are serializable \[android, ios, rn\]


## 1.5.0 (Android, iOS, React Native) \[2025-10-21\]

### 🚨 Breaking Changes
- SDK breaking change: Require calling `shutdown()` before calling `boot()` with a new user ID \[android, ios, rn\]

### ✨ Features
- Feat: custom font support (GSDK-578, GSDK-620) [android, ios\]
- Feat: Analytics plugin tracks changes to user ID (#355) \[android\]
- Feat: support links and italics in Guide titles (GSDK-600) \[android,ios\]

### 🐛 Fixes
- Fix: multiple crashes involving QuickJS (GSDK-640, GSDK-625) \[ios\]
- Fix: crash when rendering Guides in Android apps with multiple Activity or "plain" Activity (for example, not `AppCompatActivity`) (GSDK-589) \[android\]
- Fix: crash on preview when using Debugger (#337) \[ios\]
- Fix: "arrow" for tooltip Guide not hiding when tooltip is closed (GSDK-609) \[ios\]
- Fix: carousel Guide is correct size on large (tablet) screens (GSDK-616) \[ios\]
- Fix: pin form factor "offset" positioning + alignment bugs (GSDK-593) \[ios\]
- Fix: modal and popover Guide snaps to the top-left rather than remaining in the configured position (GSDK-627) \[ios\]
- Fix: a race condition which could cause a Guide to be un-dismissable (#355) \[android, ios, rn\]
- Fix: condition causing duplicate carousel Guides (GSDK-641) \[android\]
- Fix: text animations not always rendering properly (GSDK-638) \[ios\]
- Fix: issue causing Dark Mode theme to not be used, or incorrect colors to be used (GSDK-596, GSDK-612) \[android, ios\]
- Fix: remove extra spacing when actions are hidden (GSDK-421) \[android, ios\]
- Fix: possible issue with "smart delay" trigger (GSDK-605) \[android\]
- Fix: Guide title font weight now defaults to semi-bold (GSDK-615) \[ios\]
