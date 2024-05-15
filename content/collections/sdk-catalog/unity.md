---
id: 06e72ffb-fe50-4afb-9a15-67e88597afc3
blueprint: sdk-catalog
title: 'Unity SDK'
source: 'https://www.docs.developers.amplitude.com/data/sdks/unity/'
nav_title: developers
logo: icons/unity.svg
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1714687952
template: sdk-landing
---
The Amplitude Analytics Unity SDK is a plugin to simplify the integration of Amplitude iOS and Android SDKs into your Unity project. This SDK works with Unity 2019.3.11 and higher.

{{partial:admonition type="tip" heading="Supported platforms"}}
Unity SDK doesn't support pure desktop or Editor

Remember to test your apps using the `Build Settings` for either Android or iOS, which links to their respective devices or emulators.
{{/partial:admonition}}

## Install the SDK

The Amplitude Analytics Unity SDK supports different methods of installation, depending on the platform.

### Option 1: Unity Package Manager

1. Make sure you have [Git](https://git-scm.com/) installed.
2. In Unity, click `Window > Package Manager`.
3. Click the plus **+** sign and select `Add package from Git URL`.
4. Enter `https://github.com/amplitude/unity-plugin.git?path=/Assets`, and then click **Add**.
5. The Unity editor imports the package from Git.

### Option 2: Manual download

1. Download the latest [`amplitude-unity.unitypackage`](https://github.com/amplitude/unity-plugin/releases) from GitHub releases.
2. Double click `amplitude-unity.unitypackage` to import the package into your Unity project.

### Android

#### Add obfuscation exception

Add this line in your ProGuard rules file - `proguard.pro`.

```bash
-keep class com.amplitude.unity.plugins.AmplitudePlugin { *; }
```

#### Dependency management

Amplitude's `com.amplitude.android-sdk` is a transitive library, it doesn't include any other dependencies by itself. Other dependencies for `com.amplitude.android-sdk` are placed into `Assets/Plugins/Android`. Amplitude uses OkHttp, and the other dependencies you see are ones OkHttp depends on (for example, Okio or Jetbrains).

If you use OkHttp  in your project, you can choose not to include OkHttp and its related dependencies by unchecking them.

#### Use unity-jar-resolver

Some users use `unity-jar-resolver` themselves. When they force resolve dependencies, it cleans up Amplitude-related jars. In this case, declare those dependencies in your `*Dependencies.xml` file.

Add Amplitude's native dependencies under `androidPackage` tag.

```xml
<androidPackage spec="com.amplitude:android-sdk:2.+">
    <repositories>
    <repository>https://maven.google.com</repository>
    </repositories>
</androidPackage>

<androidPackage spec="com.squareup.okhttp3:okhttp:4.2.2">
    <repositories>
    <repository>https://maven.google.com</repository>
    </repositories>
</androidPackage>
```

#### API compatibility

The Amplitude Analytics Unity SDK depends on the OkHttp library.  OkHttp v3.13 requires the minimum version to be Android 5.0, Android Lollipop (API 21). [Read details here](https://developer.squareup.com/blog/okhttp-3-13-requires-android-5/).

Amplitude doesn't restrict which OkHttp version to use. For API 19, 20 (Android KitKat) to work, downgrade the OkHttp version to be lower than 3.13.

1. Change the version of OkHttp to be lower than 3.13.
2. In Unity, import the library by copying the .jar file, you can downgrade OkHttp library by replacing it with a version lower than 3.13.
If you use google dependency resolver, update the dependency version for OkHttp in `*Dependency.xml` file.

### iOS XCode troubleshooting

If Xcode doesn't let you use a simulator or device, it's because you must configure the Unity project to use either the Device SDK (real life devices) or the Simulator SDK (emulator).

To change the settings for the build, select `Unity > Edit > Project Settings... > Player > iOS Tab`, open the dropdown menu Other Settings, scroll to **Configuration**, and select either value needed for the Target SDK field.

## Initialize the SDK

Initialization is necessary you can do instrumentation. The API key for your Amplitude project is required.

```c#
Amplitude amplitude = Amplitude.getInstance();
amplitude.setServerUrl("https://api2.amplitude.com");
amplitude.logging = true;
amplitude.trackSessionEvents(true);
amplitude.init(AMPLITUDE_API_KEY);
```

Optionally, you may send a string `instanceName` to `getInstance()`. This string is associated with all the settings of one `Amplitude` object.

```c#
Amplitude amplitude1 = Amplitude.getInstance("client_1");
Amplitude amplitude2 = Amplitude.getInstance("client_2");
//Settings changes in amplitude1 will not be reflected in amplitude2
Amplitude.getInstance("client_1") //this is the same reference as amplitude1
```

## Configure the SDK

Amplitude Unity SDK runs on the top of the [Amplitude Android Maintenance SDK](/sdks/analytics/android-sdk/android-sdk), and [Amplitude iOS Maintenance SDK](/sdks/analytics/ios/ios-sdk). The following are the C# settable config options.

For other default configurations:

- on Android, see [Android Configuration](/sdks/analytics/android-sdk/android-kotlin/#configuration)
- on iOS side, see [iOS configuration](/sdks/analytics/ios/ios-sdk#configuration)