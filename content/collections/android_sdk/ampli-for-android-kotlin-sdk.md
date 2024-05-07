---
id: 167c275e-0aad-4fd1-9658-43a25c4654d6
blueprint: android_sdk
title: 'Ampli for Android-Kotlin SDK'
sdk_status: current
article_type: ampli
supported_languages:
  - java
  - kotlin
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1710274401
---
The [Ampli Wrapper](/data/sdks/ampli) is a generated, strongly typed API for tracking Analytics events based on your Tracking Plan in Amplitude Data. The tracking library exposes a function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties.

Ampli provides autocompletion for events & properties defined in Data and enforce your event schemas in code to prevent bad instrumentation. 

## Quick start

1. [(Prerequisite) Create a Tracking Plan in Amplitude Data](/data/create-tracking-plan)

    Plan your events and properties in [Amplitude Data](https://data.amplitude.com/). 

1. [Install the Amplitude SDK](#install-the-amplitude-sdk)

    ```kotlin
    implementation 'com.amplitude:analytics-android:1.+'
    ```

2. [Install the Ampli CLI](#install-the-ampli-cli)

    ```bash
    npm install -g @amplitude/ampli
    ```

3. [Pull the Ampli Wrapper into your project](#pull)

    ```bash
    ampli pull [--path ./app/src/main/java/com/amplitude/ampli]
    ```

4. [Initialize the Ampli Wrapper](#load)

    ```kotlin
    import com.amplitude.ampli.*
    
    ampli.load(appContext, LoadOptions(
      client = LoadClientOptions(apiKey = AMPLITUDE_API_KEY)
    ))
    ```

5. [Identify users and set user properties](#identify)

    ```kotlin
    ampli.identify(userId, Identify(
        userProp = "A trait associated with this user"
    ))
    ```

6. [Track events with strongly typed methods and classes](#track)

    ```kotlin
    ampli.songPlayed(songId = "song-1")
    ampli.track(SongFavorited(songId = "song-2"))
    ```

7. [Flush events before application exit](#flush)

    ```kotlin
    ampli.flush();
    ```

8. [Verify implementation status with CLI](#status)

    ```bash
    ampli status [--update]
    ```

## Install the Amplitude SDK

If you haven't already, install the core Amplitude SDK dependencies.

```kotlin
implementation 'com.amplitude:analytics-android:1.+'
```

{{partial:admonition type="note" heading=""}}
If you're not already requesting the [INTERNET permission](https://developer.android.com/reference/android/Manifest.permission#INTERNET), add `<uses-permission android:name="android.permission.INTERNET" />` to your AndroidManifest.xml.
{{/partial:admonition}}

## Install the Ampli CLI

You can install the Ampli CLI from Homebrew or npm.

{{partial:tabs tabs="brew, npm"}}
{{partial:tab name="brew"}}
```bash
brew tap amplitude/ampli
brew install ampli
```
{{/partial:tab}}
{{partial:tab name="npm"}}
```bash
npm install -g @amplitude/ampli
```
{{/partial:tab}}
{{/partial:tabs}}

### Pull the Ampli Wrapper into your project

Run the Ampli CLI `pull` command to log in to Amplitude Data and download the strongly typed Ampli Wrapper for your tracking plan. Ampli CLI commands are usually run from the project root directory.

```bash
ampli pull
```

## API

Ampli generates a thin facade over the Amplitude SDK which provides convenience methods. The Ampli Wrapper also grants access to every method of the underlying Amplitude SDK through `ampli.client`. [More details](/sdks/ampli#wrapping-the-amplitude-sdk).

### Load

Initialize Ampli in your code. The `load()` method accepts configuration option arguments:

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
import com.amplitude.ampli.*

ampli.load(appContext, LoadOptions(
 client = LoadClientOptions(apiKey = AMPLITUDE_API_KEY)
))

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
import com.amplitude.ampli.*;

Ampli.getInstance().load(this, new LoadOptions()
 .setClient(new LoadClientOptions().setApiKey(AMPLITUDE_API_KEY))
);

```
{{/partial:tab}}
{{/partial:tabs}}

| Arg | Description |
| --- | --- |
| `appContext` | An object with a set of properties to add to every event sent by the Ampli Wrapper. This option is available when there is at least one source template associated with your team's tracking plan. |
| `LoadOptions` | Required. Specifies configuration options for the Ampli Wrapper. |
| `disabled` | Optional. Specifies whether the Ampli Wrapper does any work. When true, all calls to the Ampli Wrapper are no-ops. Useful in local or development environments. |
| `client.instance` | Required if `client.apiKey` isn't set. Specifies an Amplitude instance. By default Ampli creates an instance for you. |
| `client.apiKey` | Required if `client.instance` isn't set. Specifies an API Key. This option overrides the default, which is the API Key configured in your tracking plan. |
| `client.configuration` | Optional. Specifies the Amplitude configuration. This option overrides the default configuration. |

### Identify

Call `identify()` to identify a user in your app and associate all future events with their identity, or to set their properties.

Just as Ampli creates types for events and their properties, it creates types for user properties.

The `identify()` function accepts an optional `userId`, optional user properties, and optional `options`.

For example your tracking plan contains a user property called `userProp`. The property's type is a string.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
ampli.identify(userId, Identify(
 userProp = "A trait associated with this user"
))

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```
Ampli.getInstance().identify(userId, Identify.builder()
 .userProp("A trait associated with this user")
 .build()
);

```
{{/partial:tab}}
{{/partial:tabs}}