---
id: 0128c1e3-dbc5-4612-982f-aefef4ad4db0
blueprint: java_sdk
title: 'Ampli for Java SDK'
sdk_status: current
article_type: ampli
supported_languages:
  - java
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1721151518
source: 'https://www.docs.developers.amplitude.com/data/sdks/java/ampli/'
ampli_examples:
  -
    id: lyop5ui2
    ampli_language: Kotlin
    ampli_example_link: 'https://github.com/amplitude/ampli-examples/blob/main/jre/kotlin/AmpliApp'
  -
    id: lyop6258
    ampli_language: Java
    ampli_example_link: 'https://github.com/amplitude/ampli-examples/blob/main/jre/java/AmpliApp'
---
Amplitude Data supports tracking analytics events from JRE programs written in Java (6 and higher).

## Quick start

1. [Install the Amplitude SDK](#install-the-amplitude-sdk)

    ```java
    implementation 'com.amplitude:java-sdk:[1.8.0,2.0)'
    implementation 'org.json:json:20201115'
    ```

2. [Install the Ampli CLI](#install-the-ampli-cli)

    ```shell
    npm install -g @amplitude/ampli
    ```

3. [Pull the Ampli Wrapper into your project](#pull)

    ```shell
    ampli pull [--path ./src/main/java/com/amplitude/ampli]
    ```

4. [Initialize the Ampli Wrapper](#load)

    ```java
    import com.amplitude.ampli.*;

    Ampli.getInstance().load(new LoadOptions()
      .setClient(new LoadClientOptions().setApiKey(AMPLITUDE_API_KEY))
    );
    ```

5. [Identify users and set user properties](#identify)

    ```java
    Ampli.getInstance().identify("user-id",
       Identify.builder().userProp("A user property").build()
    );
    ```

6. [Track events with strongly typed methods and classes](#track)

    ```java
    Ampli.getInstance().songPlayed("user_id",
      SongPlayed.builder().songId("song-1").build()
    );
    Ampli.getInstance().track("user_id",
      SongFavorited.builder().songId("song-2").build()
    );
    ```

7. [Flush events before application exit](#flush)

    ```java
    Ampli.getInstance().flush()
    ```

8. [Verify implementation status with CLI](#status)

    ```shell
    ampli status [--update]
    ```

## Install the Amplitude SDK

If you haven't already, install the core Amplitude SDK dependencies.


{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
Inside `<dependencies>` add:
```xml
<dependency>
    <groupId>com.amplitude</groupId>
    <artifactId>java-sdk</artifactId>
    <version>[1.8.0,2.0)</version>
</dependency>
<dependency>
    <groupId>org.json</groupId>
    <artifactId>json</artifactId>
    <version>20201115</version>
</dependency>
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```bash
implementation 'com.amplitude:java-sdk:[1.8.0,2.0)'
implementation 'org.json:json:20201115'
```
{{/partial:tab}}
{{/partial:tabs}}

## Install Ampli CLI

Install the [Ampli CLI](/docs/sdks/ampli/ampli-cli) from Homebrew or npm.

{{partial:tabs tabs="Homebrew, npm"}}
{{partial:tab name="Homebrew"}}
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

## Load

Initialize Ampli in your code. The `load()` method accepts configuration option arguments:

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
import com.amplitude.ampli.*;

Ampli.getInstance().load(new LoadOptions()
    .setClient(new LoadClientOptions().setApiKey(AMPLITUDE_API_KEY))
);
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
import com.amplitude.ampli.*

ampli.load(LoadOptions(
    client = LoadClientOptions(apiKey = AMPLITUDE_API_KEY)
))
```
{{/partial:tab}}
{{/partial:tabs}}

| Arg | Description |
|-|-|
|`LoadOptions`| Required. Specifies configuration options for the Ampli Wrapper.|
|`disabled`|Optional. Specifies whether the Ampli Wrapper does any work. When true, all calls to the Ampli Wrapper are no-ops. Useful in local or development environments.|
|`client.instance`| <span class="required">Required if `client.apiKey` isn't set</span>. Specifies an Amplitude instance. By default Ampli creates an instance for you.|
|`client.apiKey`| <span class="required">Required if `client.instance` isn't set</span>. Specifies an API Key. This option overrides the default, which is the API Key configured in your tracking plan.|

## Identify

Call `identify()` to set user properties.

Just as Ampli creates types for events and their properties, it creates types for user properties.

The `identify()` function accepts an optional `userId`, optional user properties, and optional `options`.

For example your tracking plan contains a user property called `userProp`. The property's type is a string.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
Ampli.getInstance().identify("user-id", Identify.builder()
    .userProp("A user property")
    .build()
);
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
ampli.identify("user-id", Identify(
    userProp = "A trait associated with this user"
))
```
{{/partial:tab}}
{{/partial:tabs}}

The options argument allows you to pass [Amplitude fields](/docs/apis/analytics/http-v2#keys-for-the-event-argument) for this call, such as `deviceId`.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
Ampli.getInstance().identify(
    userId,
    Identify.builder().userProp("A trait associated with this user").build(),
    new EventOptions().setDeviceId(deviceId).setUserId("some-user"),
);
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
ampli.identify(userId, Identify(
    userProp = "A trait associated with this user",
    )
    EventOptions(deviceId = "device-id"),
)
```
{{/partial:tab}}
{{/partial:tabs}}

## Group

Call `setGroup()` to associate a user with their group (for example, their department or company). The `setGroup()` function accepts a required `groupType`, and `groupName`.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
Ampli.getInstance().setGroup("user-id", "GroupType", "GroupName");
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
ampli.setGroup("user-id", "GroupType", "GroupName");
```
{{/partial:tab}}
{{/partial:tabs}}

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, then the count includes the group.

For example, you want to group your users based on what organization they're in by using an 'orgId'. Joe is in 'orgId' '10', and Sue is in 'orgId' '15'. Sue and Joe both perform a certain event. You can query their organizations in the Event Segmentation Chart.

When setting groups, define a `groupType` and `groupName`. In the previous example, 'orgId' is the `groupType` and '10' and '15' are the values for `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'.

Setting a group also sets the `groupType:groupName` as a user property, and overwrites any existing `groupName` value set for that user's groupType, and the corresponding user property value. `groupType` is a string, and `groupName` can be either a string or an array of strings to indicate that a user is in multiple groups.

For example, if Joe is in 'orgId' '10' and '20', then the `groupName` is '[10, 20]').

Your code might look like this:

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
Ampli.getInstance().setGroup("user-id", "orgID", ["10", "20"]);
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
ampli.setGroup("user-id", "orgId", ["10", "20"]);
```
{{/partial:tab}}
{{/partial:tabs}}

## Track

To track an event, call the event's corresponding function. Every event in your tracking plan gets its own function in the Ampli Wrapper. The call is structured like this:

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
Ampli.getInstance().track(String userId, Event event, EventOptions options, MiddlewareExtra extra)
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
ampli.track(userId: String, event: Event, options: EventOptions, extra: MiddlewareExtra)
```
{{/partial:tab}}
{{/partial:tabs}}

The `options` argument allows you to pass [Amplitude fields](/docs/apis/analytics/http-v2#properties-1), like `price`, `quantity` and `revenue`. The `extra` argument lets you pass data to middleware.

For example, in the following code snippet, your tracking plan contains an event called `songPlayed`. The event is defined with two required properties: `songId` and `songFavorited.` The property type for `songId` is string, and `songFavorited` is a boolean.

The event has an Amplitude field defined: `deviceId`. Learn more about Amplitude fields [here](/docs/apis/analytics/http-v2#properties-1). The event has one MiddlewareExtra defined: `extra`. Learn more about [Middleware](/docs/sdks/sdk-middleware).

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
MiddlewareExtra extra = new MiddlewareExtra();
extra.put("extra-key", "extra-value");

Ampli.getInstance().songPlayed("user-id",
    SongPlayed.builder()
    .songId('songId') // String
    .songFavorited(true) // Boolean
    .build(),
    new EventOptions().setDeviceId(deviceId),
    extra
);
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```java
ampli.songPlayed("user-id",
    SongPlayed(
    songId = 'songId', // String,
    songFavorited = true, // Boolean
    ),
    options = EventOptions(deviceId = "device-id"),
    extra = MiddlewareExtra(mapOf("extra-key" to "extra-value")
));
```
{{/partial:tab}}
{{/partial:tabs}}

Ampli also generates a class for each event.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
SongPlayed event = SongPlayed.builder()
    .songId('songId') // String
    .songFavorited(true) // Boolean
    .build()
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val myEventObject = SongPlayed(
    songId = 'songId', // String,
    songFavorited = true, // Boolean
);
```
{{/partial:tab}}
{{/partial:tabs}}

Send Event objects using the generic track method.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
Ampli.getInstance().track("user-id", SongPlayed.builder()
    .songId('songId') // String
    .songFavorited(true) // Boolean
    .build()
);
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
ampli.track("user-id", SongPlayed(
    songId = 'songId', // String,
    songFavorited = true, // Boolean
));
```
{{/partial:tab}}
{{/partial:tabs}}

## Flush

The Ampli wrapper queues events and sends them on an interval based on the configuration.

Call `flush()` to immediately send any pending events.

The `flush()` method returns a promise that can be used to ensure all pending events have been sent before continuing.
This can be useful to call prior to application exit.

Ampli flushes events in the buffer automatically when `flushQueueSize` or `flushInterval` are reached.

Ampli sends events automatically without calling `flush()`, but using `flush()` is useful if you need to send events before the application exits.

## Ampli CLI

### Pull

The `pull` command downloads the Ampli Wrapper code to your project. Run the `pull` command from the project root.

```bash
ampli pull
```

You will be prompted to log in to your workspace and select a source.

```bash
➜ ampli pull
Ampli project is not initialized. No existing `ampli.json` configuration found.
? Create a new Ampli project here? Yes
? Organization: Amplitude
? Workspace: My Workspace
? Source: My Source
```

### Status

Verify that events are implemented in your code with the status command:

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
