---
id: f47b9d82-8e14-4a53-a6f2-27b1cc5a319a
blueprint: guides_and_survey
title: 'Guides and Surveys Mobile SDK Changelog'
landing: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1750443681
---

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
