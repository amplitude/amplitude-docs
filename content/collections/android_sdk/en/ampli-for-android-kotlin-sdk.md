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
The [Ampli Wrapper](/docs/data/sdks/ampli) is a generated, strongly typed API for tracking Analytics events based on your Tracking Plan in Amplitude Data. The tracking library exposes a function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties.

Ampli provides autocompletion for events & properties defined in Data and enforce your event schemas in code to prevent bad instrumentation. 

## Quick start

1. [(Prerequisite) Create a Tracking Plan in Amplitude Data](/docs/data/create-tracking-plan)

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

Ampli generates a thin facade over the Amplitude SDK which provides convenience methods. The Ampli Wrapper also grants access to every method of the underlying Amplitude SDK through `ampli.client`. [More details](/docs/sdks/ampli#wrapping-the-amplitude-sdk).

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

The options argument allows you to pass [Amplitude fields](/docs/apis/http-v2#keys-for-the-event-argument) for this call, such as `deviceId`.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
val eventOptions = EventOptions();
eventOptions.deviceId = "device-id";

ampli.identify(
 userId,
 Identify(
 userProp = "A trait associated with this user",
 ),
 eventOptions
)

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
EventOptions eventOptions = new EventOptions();
eventOptions.setDeviceId("deviceId");

Ampli.getInstance().identify(
 userId,
 Identify.builder().userProp("A trait associated with this user").build(),
 eventOptions
);

```
{{/partial:tab}}
{{/partial:tabs}}

### Group identify

Call `groupIdentify()` to identify a group in your app and set/update group properties.

Just as Ampli creates types for events and their properties, it creates types for group properties.

The `groupIdentify()` function accepts a string `group_type`, a string `group_name`, an Group event instance, and an optional EventOptions.

For example your tracking plan contains a group `test group:android-java-ampli` has a property called `requiredBoolean` with a boolean type.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
ampli.groupIdentify("test group", "android-kotlin-ampli", Group(requiredBoolean = true))

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
Ampli.getInstance().groupIdentify("test group", "android-java-ampli", Group.builder()
 .requiredBoolean(true)
 .build()
);

```
{{/partial:tab}}
{{/partial:tabs}}

### Group

Call `setGroup()` to associate a user with their group (for example, their department or company). The `setGroup()` function accepts a required `groupType`, and `groupName` and an optional EventOptions.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
ampli.client?.setGroup("groupType", "groupName")

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
Ampli.getInstance().getClient().setGroup("groupType", "groupName");

```
{{/partial:tab}}
{{/partial:tabs}}

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, then the count includes the group.

For example, you want to group your users based on what organization they're in by using an 'orgId'. Joe is in 'orgId' '10', and Sue is in 'orgId' '15'. Sue and Joe both perform a certain event. You can query their organizations in the Event Segmentation Chart.

When setting groups, define a `groupType` and `groupName`. In the previous example, 'orgId' is the `groupType` and '10' and '15' are the values for `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'.

Setting a group also sets the `groupType:groupName` as a user property, and overwrites any existing `groupName` value set for that user's `groupType`, and the corresponding user property value. `groupType` is a string, and `groupName` can be either a string or an array of strings to indicate that a user is in multiple groups.

GroupType is a string, and `groupName` can be either a string or an array of strings to show that a user is in multiple groups. For example, if Joe is in 'orgId' '10' and '20', then the `groupName` is '[10, 20]'.

Your code might look like this:

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
ampli.client?.setGroup("orgId", arrayOf("10", "20"))
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
Ampli.getInstance().getClient().setGroup("orgID", new String[]{"10", "20"});
```
{{/partial:tab}}
{{/partial:tabs}}

### Track

To track an event, call the event's corresponding function. Every event in your tracking plan gets its own function in the Ampli Wrapper. The call is structured like this:

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
ampli.eventName(...eventNameProperties)

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
Ampli.getInstance().eventName(EventName event, EventOptions options)

```
{{/partial:tab}}
{{/partial:tabs}}

The `options` argument allows you to pass [Amplitude fields](/docs/apis/analytics/http-v2#properties-1), like `deviceID`.

For example, in the following code snippets, your tracking plan contains an event called `songPlayed`. The event is defined with two required properties: `songId` and `songFavorited.` The property type for `songId` is string, and `songFavorited` is a boolean.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
ampli.songPlayed(
 songId = "songId", // String,
 songFavorited = true, // Boolean
)

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
Ampli.getInstance().songPlayed(SongPlayed.builder()
 .songId("songId") // String
 .songFavorited(true) // Boolean
 .build()
);

```
{{/partial:tab}}
{{/partial:tabs}}

Ampli also generates a class for each event.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
val myEventObject = SongPlayed(
 songId = "songId", // String,
 songFavorited = true, // Boolean
);

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
SongPlayed event = SongPlayed.builder()
 .songId("songId") // String
 .songFavorited(true) // Boolean
 .build()

```
{{/partial:tab}}
{{/partial:tabs}}

Send event objects using the generic track method.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
val options = EventOptions()
options.userId = "user_id"

ampli.track(SongPlayed(
 songId = "songId", // String
 songFavorited = true, // Boolean
 ), options);

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
EventOptions options = new EventOptions();
options.setUserId("user-id");

Ampli.getInstance().track(SongPlayed.builder()
 .songId("songId") // String
 .songFavorited(true) // Boolean
 .build(), options);

```
{{/partial:tab}}
{{/partial:tabs}}

### Flush

The Ampli wrapper queues events and sends them on an interval based on the configuration.

Call `flush()` to immediately send any pending events.

The `flush()` method returns a promise that can be used to ensure all pending events have been sent before continuing.
This can be useful to call prior to application exit.

Ampli flushes events in the buffer automatically when `flushQueueSize` or `flushInterval` are reached.

Ampli sends events automatically without calling `flush()`, but using `flush()` is useful if you need to send events before the application exits.

```kotlin
ampli.flush()
```

### Plugin

Plugins allow you to extend the Amplitude behavior, for example, modifying event properties (enrichment type) or sending to third-party APIs (destination type).

First you need to define your plugin. See the following code for a Destination Plugin example.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
class SegmentDestinationPlugin(appContext: Context, segmentApiKey: String) : DestinationPlugin() {
 var analytics: Analytics? = null;
 val context: Context = appContext;
 init {
 analytics = Analytics.Builder(appContext, segmentApiKey).build()
 }

 override fun track(event: BaseEvent): BaseEvent {
 val eventProperties = Properties();
 event.eventProperties?.forEach { entry -> entry.value?.let {
 eventProperties.put(entry.key,
 it)
 } }

 analytics?.track(event.eventType, eventProperties);
 return event
 }
}

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
public class SegmentDestinationPlugin extends DestinationPlugin {
 android.content.Context context;
 Analytics analytics;
 String SEGMENT_API_KEY;
 public SegmentDestinationPlugin(android.content.Context appContext, String segmentAPIKey) {
 this.context = appContext;
 this.SEGMENT_WRITE_KEY = segmentWriteKey;
 }
 @Override
 public void setup(Amplitude amplitude) {
 super.setup(amplitude);
 analytics = new Analytics.Builder(this.context, SEGMENT_API_KEY)
 .build();

 Analytics.setSingletonInstance(analytics);
 }

 @Override
 public BaseEvent track(BaseEvent event) {
 Properties properties = new Properties();
 for (Map.Entry<String,Object> entry : event.getEventProperties().entrySet()) {
 properties.putValue(entry.getKey(),entry.getValue());
 }
 analytics.track(event.eventType, properties);
 return event;
 }
}

```
{{/partial:tab}}
{{/partial:tabs}}

Add your plugin after init Ampli.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
ampli.client?.add(
 YourDestinationPlugin(this, DESTINATION_API_KEY)
 )

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
Ampli.getInstance().getClient().add(
new YourDestinationPlugin(this, DESTINATION_API_KEY)
);

```
{{/partial:tab}}
{{/partial:tabs}}

## Ampli CLI

### Pull

The `pull` command downloads the Ampli Wrapper code to your project. Run the `pull` command from the project root.

```bash
ampli pull
```

Log in to your workspace when prompted and select a source.

```bash
➜ ampli pull
Ampli project is not initialized. No existing `ampli.json` configuration found.
? Create a new Ampli project here? Yes
? Organization: Amplitude
? Workspace: My Workspace
? Source: My Source
```

Learn more about [`ampli pull`](/docs/sdks/ampli/ampli-cli#ampli-pull).

### Status

Verify that events are in your code with the status command:

```bash
ampli status [--update]
```

The output displays status and indicates what events are missing.

```bash
➜ ampli status
✘ Verifying event tracking implementation in source code
 ✔ Song Played (1 location)
 ✘ Song Stopped Called when a user stops playing a song.
Events Tracked: 1 missed, 2 total
```

Learn more about [`ampli status`](/docs/sdks/ampli/ampli-cli#ampli-status).