---
id: 18f5ac3b-003a-4386-86a3-1ffad3ca2429
blueprint: instrumentation
title: 'SDK Maintenance and Support'
source: 'https://www.docs.developers.amplitude.com/data/sdks/sdk-maintenance-and-support/'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
nav_title: developers
exclude_from_sitemap: false
version_support_matrix:
  -
    id: lxz4ns26
    article: 3ee6e0df-273e-4c50-8bfd-d5a4abc9a33c
    version: 1.x
    phase: GA
    ga_date: '2021-11-15'
    type: sdk_tool
    enabled: true
    icon: icons/terminal.svg
  -
    id: lxz4pg5i
    name: Amplitude-Android
    article: 9f4dcd07-e262-4c9b-b841-ebb721d37a6d
    version: '1.x - 2.x'
    phase: Maint
    ga_date: '2014-05-01'
    notes: 'Maintenance: 2023-06-14'
    type: sdk_tool
    enabled: true
    icon: icons/android-sm.svg
  -
    id: lxz8z7lp
    name: Amplitude-Android
    article: 9f4dcd07-e262-4c9b-b841-ebb721d37a6d
    version: 3.x
    phase: EOS
    ga_date: '2021-12-16'
    notes: |-
      EOL: 2021-12-16
      Bad release (3.35.1)
    type: sdk_tool
    enabled: true
    icon: icons/android-sm.svg
  -
    id: lxz8vcmy
    article: 4e6f43a0-1f71-4b9d-9193-f45500b42188
    icon: icons/android-sm.svg
    name: Amplitude-Kotlin
    version: 1.x
    phase: GA
    ga_date: '2022-06-28'
    type: sdk_tool
    enabled: true
  -
    id: lxz92u57
    article: 8471af8b-e132-4073-8330-d5dd7bbbd8ae
    icon: icons/ts-small.svg
    name: Amplitude-TypeScript
    version: 1.x
    phase: Maint
    ga_date: '2022-06-29'
    notes: 'MD: 2023-06-29'
    type: sdk_tool
    enabled: true
  -
    id: lxz9gxwj
    article: 25904c6b-609d-4365-9660-2782ef50d52d
    icon: icons/ts-small.svg
    name: Amplitude-TypeScript
    version: 1.x
    phase: Maint
    ga_date: '2022-06-29'
    notes: |-
      MD: 2023-06-29
      Replaced by Browser 2.0
    type: sdk_tool
    enabled: true
  -
    id: lxz9jmj7
    article: 00d74a7b-23bd-4a24-86a1-92c046e7e1b5
    icon: icons/ts-small.svg
    name: Amplitude-TypeScript
    version: 2.x
    phase: GA
    ga_date: '2023-06-14'
    type: sdk_tool
    enabled: true
  -
    id: lxz9lrkx
    article: e6b6889d-9d39-4f04-89a1-87f78db80f49
    icon: icons/js-sm.svg
    name: Amplitude-JavaScript
    version: '1.x - 8.x'
    phase: Maint
    ga_date: '2014-06-11'
    notes: 'MD: 2023-06-29'
    type: sdk_tool
    enabled: true
  -
    id: lxz9w0l3
    article: 8160e521-d064-46f7-bf1b-595dc1c56327
    title_override: 'Chrome Event Explorer'
    icon: icons/chrome.svg
    version: 1.x
    phase: GA
    ga_date: '2023-04-25'
    type: sdk_tool
    enabled: true
  -
    id: lxza5mmb
    article: 91ff3c42-e0d0-493c-9fe4-65262f814883
    icon: icons/flutter.svg
    name: Amplitude-Flutter
    version: '1.x - 3.x'
    phase: GA
    ga_date: '2020-04-30'
    type: sdk_tool
    enabled: true
  -
    id: lxzabcjy
    article: 7d5c2ee4-29ff-45be-8e6e-0bfd213412d3
    icon: icons/google.svg
    name: amplitude-browser-sdk-gtm-template
    version: 1.x
    phase: GA
    ga_date: '2022-11-13'
    type: sdk_tool
    enabled: true
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1719615256
---
## Overview

This document outlines the maintenance policy for Amplitude Software Development Kits (SDKs) and Tools, including Browser and Mobile SDKs, the Ampli CLI, and their underlying dependencies. Amplitude regularly provides the Amplitude SDKs and Tools with updates that may contain support for new or updated Amplitude APIs, new features, enhancements, bug fixes, security patches, or documentation updates. Updates may also address changes with dependencies, language runtimes, and operating systems. Amplitude publishes  SDK releases to package managers (for example,  npm, CocoaPods, Maven, PyPI), and are available as source code on GitHub.

Amplitude recommends users to stay up-to-date with SDK releases to keep up with the latest features, security updates, and underlying dependencies. Continued use of an unsupported SDK version isn't recommended, do so at your own discretion.

## Versioning

The Amplitude SDK and Tools release versions are in the form of `X.Y.Z` where `X` represents the major version. Increasing the major version of an SDK indicates that this SDK underwent significant and large changes to support new idioms and patterns in the language. Amplitude introduces major versions when public interfaces (for example, classes, methods, or types), behaviors, or semantics have changed. Update your applications for them to work with the newest SDK version. It's important to update major versions carefully, following Amplitude's upgrade guidelines.

## SDK major version life-cycle

The life-cycle for major SDKs and Tools versions consists of 5 phases:

- **Developer Preview (Beta) (Phase 0)** - During this phase, SDKs are fully supported, and can used in production environments, however, there may be breaking changes without a new major version release. If used in a production environment, Amplitude recommends setting a fixed version, updating regularly, and testing after each update. These SDKs provide early access to the latest features and allow for user feedback prior to GA. Once Amplitude identifies a release to be a stable product, it may mark it as GA.

- **General Availability (GA) (Phase 1)** - During this phase, SDKs are fully supported. Amplitude provides regular SDK releases that include support for new services, API updates for existing services, as well as bug and security fixes. For Tools, Amplitude provides regular releases that include new feature updates and bug fixes.

- **Maintenance Announcement (Phase 2)** - Amplitude makes a public announcement at least 6 months before an SDK or Tool enters maintenance mode. During this period, the SDK continues to be fully supported. Typically, Amplitude announces maintenance mode at the same time as the next major version moves to GA.

- **Maintenance (Phase 3)** - During the maintenance mode, Amplitude limits SDK releases to address critical bug fixes and security issues only. An SDK doesn't receive API updates for new or existing services, or updates to support new regions. Maintenance mode has a default duration of at least 12 months, unless otherwise specified.

- **End-of-Support (EOL) (Phase 4)** - When an SDK reaches end-of support, it no longer receive updates or releases. Already published releases continue to be available through public package managers and the code remains on GitHub. Amplitude may archive the GitHub repository. Use SDKs that have reached end-of-support at your own discretion. Amplitude recommends users upgrade to the new major version.

## Dependency life-cycle

Most Amplitude SDKs have underlying dependencies, such as language runtimes, operating systems, or third party libraries and frameworks. These dependencies are typically tied to the language community or the vendor who owns that particular component. Each community or vendor publishes their own end-of-support schedule for their product.

The following terms are used to classify underlying third party dependencies:

- **Operating System (OS):** Examples include MacOS 12.6, Android 13, Windows 11, etc.
- **Language Runtime**: Examples include TypeScript 4.1.6, Swift 5.7, Java 8, Python 3.10.4, etc.
- **Third party Library / Framework**: Examples include OpenSSL, OCLIF, React, etc.

Amplitude's policy is to continue supporting SDK dependencies for at least 6 months after the community or vendor ends support for the dependency. This policy, however, could vary depending on the specific dependency.


{{partial:admonition type="note" heading=""}}
Amplitude reserves the right to stop support for an underlying dependency without increasing the major SDK version
{{/partial:admonition}}

## Communication methods

Amplitude communicates maintenance announcements in several ways:

- An email announcement to affected accounts, announcing plans to end support for the specific SDK version. The email outlines the path to end-of-support, specify the campaign timelines, and provide upgrade guidance.

- Amplitude updates [SDK documentation](/docs/sdks), such as [API reference documentation](/docs/apis), user guides, SDK product marketing pages, and GitHub README docs to share the campaign timeline and provide guidance on upgrading affected applications.

- Amplitude publishes blog post in the [Amplitude Community](https://community.amplitude.com/) that outlines the path to end-of-support, as well as reiterates the campaign timelines.

- Amplitude adds deprecation warnings to the SDKs, outlining the path to end-of-support and linking to the SDK documentation.

To see the list of available major versions of Amplitude SDKs and Tools and where they're in their maintenance life cycle, see Amplitude SDKs and Tools version support matrix.

## SDKs and Tools version support matrix

The matrix below shows the list of available Amplitude SDK and Tools major versions and where they're in the maintenance life cycle with associated timelines. Amplitude updates the matrix with the release of a new major version or when a major version transitions to a new phase in the maintenance life cycle.

{{partial:partials/sdk-maintenance-matrix}}

<!-- vale off -->

| SDK / Tool                                                                                                                                                                                                                                                                                                                                                                                   | Version   | Phase              | GA Date    | Notes                                       |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|--------------------|------------|---------------------------------------------|
| :material-console: [Ampli CLI](../ampli/index.md) <br/> :octicons-package-16: [`@amplitude/ampli`](https://www.npmjs.com/package/@amplitude/ampli)                                                                                                                                                                                                                                           | 1.x       | :material-star: GA | 2021-11-15 |                                             |
| :material-android: [Android SDK](./android-kotlin/index.md)<br/>:octicons-package-16: [`com.amplitude:analytics-android`](https://mvnrepository.com/artifact/com.amplitude/analytics-android)<br/>:material-github: [Amplitude-Kotlin](https://github.com/amplitude/Amplitude-Kotlin)                                                                                                        | 1.x       | :material-star: GA | 2022-06-28 |                                             |
| :material-android: [Android SDK](./android/index.md)<br/>:octicons-package-16: [`com.amplitude:android-sdk`](https://mvnrepository.com/artifact/com.amplitude/android-sdk)<br/>:material-github: [Amplitude-Android](https://github.com/amplitude/Amplitude-Android)                                                                                                                         | 3.x       | End-of-support     | 2021-12-16 | EOL: 2021-12-16<br/>Bad release (3.35.1)    |
| :material-android: [Android SDK](./android/index.md)<br/>:octicons-package-16: [`com.amplitude:android-sdk`](https://mvnrepository.com/artifact/com.amplitude/android-sdk)<br/>:material-github: [Amplitude-Android](https://github.com/amplitude/Amplitude-Android)                                                                                                                         | 1.x -2.x  | Maintenance        | 2014-05-01 | MD: 2023-06-14                              |
| :material-language-typescript: [Browser SDK](./browser-2/index.md)<br/> :octicons-package-16: [`@amplitude/analytics-browser`](https://www.npmjs.com/package/@amplitude/analytics-browser)<br/>:material-github: [Amplitude-TypeScript](https://github.com/amplitude/Amplitude-TypeScript)                                                                                                   | 2.x       | :material-star: GA | 2023-06-14 |                                             |
| :material-language-typescript: [Browser SDK](./typescript-browser/index.md) <br/> :octicons-package-16: [`@amplitude/analytics-browser`](https://www.npmjs.com/package/@amplitude/analytics-browser)<br/>:material-github: [Amplitude-TypeScript](https://github.com/amplitude/Amplitude-TypeScript)                                                                                         | 1.x       | Maintenance        | 2022-06-29 | MD: 2023-06-29                              |
| :material-language-typescript: [Browser SDK](./marketing-analytics-browser/index.md) <br/> :octicons-package-16: [`@amplitude/marketing-analytics-browser`](https://www.npmjs.com/package/@amplitude/arketing-analytics-browser)<br/>:material-github: [Amplitude-TypeScript](https://github.com/amplitude/Amplitude-TypeScript)                                                             | 1.x       | Maintenance        | 2022-06-29 | MD: 2023-06-29<br/>Replaced by Browser 2.0  |
| :material-language-javascript: [Browser SDK](./javascript/index.md)<br/>:octicons-package-16: [`@amplitude/amplitude-js`](https://www.npmjs.com/package/amplitude-js)<br/>:material-github: [Amplitude-JavaScript](https://github.com/amplitude/Amplitude-JavaScript)                                                                                                                        | 1.x - 8.x | Maintenance        | 2014-06-11 | MD: 2023-06-29                              |
| :simple-googlechrome: [Chrome Event Explorer](../../debugger/?h=debug#instrumentation-explorer)<br/>:octicons-package-16: [`Amplitude Event Explorer`](https://chrome.google.com/webstore/detail/amplitude-event-explorer/acehfjhnmhbmgkedjmjlobpgdicnhkbp)                                                                                                                                  | 1.x       | :material-star: GA | 2023-04-25 |                                             |
| :simple-flutter: [Flutter SDK](./flutter/index.md)<br/>:octicons-package-16: [`amplitude_flutter`](https://pub.dev/packages/amplitude_flutter)<br/>:material-github: [Amplitude-Flutter](https://github.com/amplitude/Amplitude-Flutter)                                                                                                                                                     | 1.x - 3.X | :material-star: GA | 2020-04-30 |                                             |
| :material-google: [Google Tag Manager (Client)](../../sources/google-tag-manager-client/)<br/>:simple-googletagmanager: [Amplitude Analytics Browser SDK](https://tagmanager.google.com/gallery/#/owners/amplitude/templates/amplitude-browser-sdk-gtm-template)<br/>:material-github: [amplitude-browser-sdk-gtm-template](https://github.com/amplitude/amplitude-browser-sdk-gtm-template) | 1.x       | :material-star: GA | 2022-11-13 |                                             |
| :material-google: [Google Tag Manager (Server)](../../sources/google-tag-manager-server/)<br/>:simple-googletagmanager: [Amplitude Analytics](https://tagmanager.google.com/gallery/#/owners/amplitude/templates/amplitude-server-gtm-template)<br/>:material-github: [amplitude-browser-sdk-gtm-template](https://github.com/amplitude/amplitude-server-gtm-template)                       | 1.x       | :material-star: GA | 2022-05-02 |                                             |
| :material-google: [Google Tag Manager (Client)](../../sources/google-tag-manager-client-legacy/)<br/>:simple-googletagmanager: [Amplitude Analytics Legacy](https://tagmanager.google.com/gallery/#/owners/amplitude/templates/amplitude-gtm-template)<br/>:material-github: [amplitude-gtm-template](https://github.com/amplitude/amplitude-gtm-template)                                   | 1.x       | Maintenance        | 2021-10-21 | MD: 2022-11-13                              |
| :material-language-go: [Go SDK](./go/index.md)<br/>:octicons-package-16: [`github.com/amplitude/analytics-go`](https://pkg.go.dev/github.com/amplitude/analytics-go)<br/>:material-github: [analytics-go](https://github.com/amplitude/analytics-go)                                                                                                                                         | 1.x       | :material-star: GA | 2023-02-09 |                                             |
| :material-apple-ios: [iOS SDK](./ios-swift/index.md)<br/>:octicons-package-16: `AmplitudeSwift`<br/>:material-github: [Amplitude-Swift](https://github.com/amplitude/Amplitude-Swift)                                                                                                                                                                                                        | 1.x       | :material-star: GA | 2023-10-27 |                                             |
| :material-apple-ios: [iOS SDK](./ios/index.md)<br/>:octicons-package-16: [`Amplitude`](https://cocoapods.org/pods/Amplitude-iOS)<br/>:material-github: [Amplitude-iOS](https://github.com/amplitude/Amplitude-iOS)                                                                                                                                                                           | 1.x - 8.X | Maintenance        | 2014-06-05 | MD: 2023-10-27                              |
| :material-language-java: [Java SDK](./java/index.md)<br/>:octicons-package-16: [`com.amplitude.:java-sdk`](https://mvnrepository.com/artifact/com.amplitude/java-sdk)<br/>:material-github: [Amplitude-Java](https://github.com/amplitude/Amplitude-Java)                                                                                                                                    | 1.x       | :material-star: GA | 2021-06-15 |                                             |
| :material-nodejs: [Node SDK](./typescript-node/index.md)<br/>:octicons-package-16: [`@amplitude/analytics-node`](https://www.npmjs.com/package/@amplitude/analytics-node)<br/>:material-github: [Amplitude-Typescript](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-node)                                                                                  | 1.x       | :material-star: GA | 2022-12-10 |                                             |
| :material-nodejs: [Node SDK](./node/index.md) <br/>:octicons-package-16: [`@amplitude/node`](https://www.npmjs.com/package/@amplitude/node)<br/>:material-github: [Amplitude-Node](https://github.com/amplitude/Amplitude-Node)                                                                                                                                                              | 1.x       | Maintenance        | 2020-09-25 | MD: 2022-12-10                              |
| :material-language-python: [Python SDK](./python/index.md)<br/>:octicons-package-16: [`amplitude-analytics`](https://pypi.org/project/amplitude-analytics/)<br/>:material-github: [Amplitude-Python](https://github.com/amplitude/Amplitude-Python)                                                                                                                                          | 1.x       | :material-star: GA | 2022-06-29 |                                             |
| :material-react: [React SDK](https://github.com/amplitude/react-amplitude#readme)<br/>:octicons-package-16: [`@amplitude/react-amplitude`](https://www.npmjs.com/package/@amplitude/react-amplitude)<br/>:material-github: [react-amplitude](https://github.com/amplitude/react-amplitude)                                                                                                   | 1.x       | End-of-support     | 2019-05-27 | EOL: 2022-06-29<br/>Replaced by Browser 2.0 |
| :material-react: [React Native SDK](./typescript-react-native/index.md)<br/>:octicons-package-16: [`@amplitude/analytics-react-native`](https://www.npmjs.com/package/@amplitude/analytics-react-native)<br/>:material-github: [Amplitude-TypeScript](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-react-native)                                           | 1.x       | :material-star: GA | 2023-02-02 |                                             |
| :material-react: [React Native SDK](./react-native/index.md)<br/>:octicons-package-16: [`@amplitude/react-native`](https://www.npmjs.com/package/@amplitude/react-native)<br/>:material-github: [Amplitude-ReactNative](https://github.com/amplitude/Amplitude-ReactNative)                                                                                                                  | 2.x       | Maintenance        | 2021-03-02 | MD: 2023-02-02                              |
| :material-unity: [Unity SDK](./unity/index.md)<br/>:octicons-package-16: [`amplitude-unity.unitypackage`](https://github.com/amplitude/unity-plugin/releases)<br/>:material-github: [unity-plugin](https://github.com/amplitude/unity-plugin)                                                                                                                                                | 1.x - 2.X | GA                 | 2020-03-18 |                                             |
| :material-unreal: [Unreal SDK](./unreal/index.md)<br/>:octicons-package-16: [`AmplitudeUnreal`](https://github.com/amplitude/Amplitude-Unreal/releases)<br/>:material-github: [Amplitude-Unreal](https://github.com/amplitude/Amplitude-Unreal)                                                                                                                                              | 0.x       | Beta               | N/A        |                                             |