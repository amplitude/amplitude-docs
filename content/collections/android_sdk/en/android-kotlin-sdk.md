---
id: 4e6f43a0-1f71-4b9d-9193-f45500b42188
blueprint: android_sdk
title: 'Android-Kotlin SDK'
sdk_status: current
article_type: core
supported_languages:
  - java
  - kotlin
github_link: 'https://github.com/amplitude/Amplitude-Kotlin'
releases_url: 'https://github.com/amplitude/Amplitude-Kotlin/releases'
bundle_url: 'https://mvnrepository.com/artifact/com.amplitude/analytics-android'
api_reference_url: 'https://amplitude.github.io/Amplitude-Kotlin'
shields_io_badge: 'https://img.shields.io/maven-central/v/com.amplitude/analytics-android.svg?label=Maven%20Central'
ampli_article: 167c275e-0aad-4fd1-9658-43a25c4654d6
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1721756252
source: 'https://www.docs.developers.amplitude.com/data/sdks/android-kotlin/'
package_name: 'com.amplitude:analytics-android'
platform: Android
---
The Kotlin Android SDK lets you send events to Amplitude.

## Install the SDK

Amplitude recommends using Android Studio as an IDE and Gradle to manage dependencies.

{{partial:tabs tabs="Gradle, Maven"}}
{{partial:tab name="Gradle"}}
If you use Gradle in your project, add the following dependency to `build.gradle`, and sync your project with the updated file.

```groovy
dependencies {
    implementation 'com.amplitude:analytics-android:1.+'
}
```
{{/partial:tab}}
{{partial:tab name="Maven"}}
If you use Maven in your project, the .jar is available on Maven Central with the following configuration in `pom.xml`.
```xml
<dependency>
    <groupId>com.amplitude</groupId>
    <artifactId>analytics-android</artifactId>
    <version>[1.0,2.0]</version>
</dependency>
```
{{/partial:tab}}
{{/partial:tabs}}


## Configure the SDK

{{partial:collapse name="Configuration Options"}}
| Name | Description | Default Value |
| --- | --- | --- |
| `deviceId` | `String?`. The device ID to use for this device. If no deviceID is provided one will be generated automatically. Learn more [here](./#device-id-lifecycle). | `null` |
| `flushIntervalMillis` | `Int`. The amount of time SDK will attempt to upload the unsent events to the server or reach `flushQueueSize` threshold. The value is in milliseconds. | `30000` |
| `flushQueueSize` | `Int`. SDK will attempt to upload once unsent event count exceeds the event upload threshold or reach `flushIntervalMillis` interval. | `30` |
| `flushMaxRetries` | `Int`. Maximum retry times. | `5` |
| `minIdLength` | `Int`. The minimum length for user id or device id. | `5` |
| `partnerId` | `Int`. The partner id for partner integration. | `null` |
| `identifyBatchIntervalMillis` | `Long`. The amount of time SDK will attempt to batch intercepted identify events. The value is in milliseconds | `30000` |
| `flushEventsOnClose` | `Boolean`. Flushing of unsent events on app close. | `true` |
| `callback` | `EventCallBack`. Callback function after event sent. | `null` |
| `optOut` | `Boolean`. Opt the user out of tracking. | `false` |
| ~`trackingSessionEvents`~ (Deprecated. Use [`autocapture`](#autocapture) instead.)| `Boolean`. Automatic tracking of "Start Session" and "End Session" events that count toward event volume. | `false` |
| ~`defaultTracking`~ (Deprecated. Use [`autocapture`](#autocapture) instead.) | `DefaultTrackingOptions`. Enable tracking of default events for sessions, app lifecycles, screen views, and deep links. | `DefaultTrackingOptions(sessions = true)` |
| `autocapture` | `Set<AutocaptureOption>`. A `Set` of Options to enable tracking of default events for sessions, app lifecycles, screen views, deep links, and element interactions. | If the parameter isn't set, `AutocaptureOption.SESSIONS` is added to the `Set` by default. For more information, see [Autocapture](#autocapture).|
| `minTimeBetweenSessionsMillis` | `Long`. The amount of time for session timeout. The value is in milliseconds. | `300000` |
| `serverUrl` | `String`. The server url events upload to. | `https://api2.amplitude.com/2/httpapi` |
| `serverZone` | `ServerZone.US` or `ServerZone.EU`. The server zone to send to, will adjust server url based on this config. | `ServerZone.US` |
| `useBatch` | `Boolean` Whether to use batch API. | `false` |
| `useAdvertisingIdForDeviceId` | `Boolean`. Whether to use advertising id as device id. For more information, see [Advertiser ID](#advertiser-id) for required module and permission. | `false` |
| `useAppSetIdForDeviceId` | `Boolean`. Whether to use app set id as device id. For more information, see [Application ID](#app-set-id) for required module and permission. | `false` |
| `trackingOptions` | `TrackingOptions`. Options to control the values tracked in SDK. | `enable` |
| `enableCoppaControl` | `Boolean`. Whether to enable COPPA control for tracking options. | `false` |
| `instanceName` | `String`. The name of the instance. Instances with the same name will share storage and identity. For isolated storage and identity use a unique `instanceName` for each instance. | `$default_instance` |
| `migrateLegacyData` | `Boolean`. Available in `1.9.0`+. Whether to migrate [maintenance Android SDK](../android) data (events, user/device ID). Learn more [here](https://github.com/amplitude/Amplitude-Kotlin/blob/main/android/src/main/java/com/amplitude/android/migration/RemnantDataMigration.kt#L9-L16). | `true` |
| `offline` | `Boolean \| AndroidNetworkConnectivityCheckerPlugin.Disabled`. Whether the SDK is connected to network. Learn more [here](./#offline-mode) | `false` |
| `storageProvider` | `StorageProvider`. Implements `StorageProvider` interface to store events. | `AndroidStorageProvider` |
| `identifyInterceptStorageProvider` | `StorageProvider`. Implements `StorageProvider` interface for identify event interception and volume optimization. | `AndroidStorageProvider` |
| `identityStorageProvider` | `IdentityStorageProvider`. Implements `IdentityStorageProvider` to store user id and device id. | `FileIdentityStorageProvider` |
| `loggerProvider` | `LoggerProvider`. Implements `LoggerProvider` interface to emit log messages to desired destination. | `AndroidLoggerProvider` |
| `newDeviceIdPerInstall` | Whether to generate different a device id every time when the app is installed regardless of devices. It's legacy configuration only to keep compatible with the old Android SDK. It works the same as `useAdvertisingIdForDeviceId`. | `false` |
| `locationListening` | Whether to enable Android location service. Learn more [here](./#location-tracking). | `true` |

{{/partial:collapse}}

### Configure batching behavior

To support high-performance environments, the SDK sends events in batches. Every event logged by the `track` method is queued in memory. Events are flushed in batches in background. You can customize batch behavior with `flushQueueSize` and `flushIntervalMillis`. By default, the `serverUrl` is `https://api2.amplitude.com/2/httpapi`. For customers who want to send large batches of data at a time, set `useBatch` to `true` to set `setServerUrl` to batch event upload API `https://api2.amplitude.com/batch`. Both the regular mode and the batch mode use the same events upload threshold and flush time intervals.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
import com.amplitude.android.Amplitude

val amplitude = Amplitude(
  Configuration(
    apiKey = AMPLITUDE_API_KEY,
    context = applicationContext,
    flushIntervalMillis = 50000,
    flushQueueSize = 20,
  )
)
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
import com.amplitude.android.Amplitude;

Configuration configuration = new Configuration(AMPLITUDE_API_KEY, getApplicationContext());
configuration.setFlushIntervalMillis(1000);
configuration.setFlushQueueSize(10);

Amplitude amplitude = new Amplitude(configuration);
```
{{/partial:tab}}
{{/partial:tabs}}

You can dynamically set the configuration after initialization. 

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
import com.amplitude.android.Amplitude

val amplitude = Amplitude(
  Configuration(
    apiKey = AMPLITUDE_API_KEY,
    context = applicationContext,
  )
)

amplitude.configuration.optOut = true

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
import com.amplitude.android.Amplitude;

Configuration configuration = new Configuration(AMPLITUDE_API_KEY, getApplicationContext());
Amplitude amplitude = new Amplitude(configuration);

amplitude.getConfiguration().setOptOut(true);

```
{{/partial:tab}}
{{/partial:tabs}}

### EU data residency

You can configure the server zone when initializing the client for sending data to Amplitude's EU servers. The SDK sends data based on the server zone if it's set.

{{partial:admonition type="note" heading=""}}
For EU data residency, the project must be set up inside Amplitude EU. You must initialize the SDK with the API key from Amplitude EU.
{{/partial:admonition}}

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
import com.amplitude.android.Amplitude

val amplitude = Amplitude(
  Configuration(
    apiKey = AMPLITUDE_API_KEY,
    context = applicationContext,
    serverZone = ServerZone.EU
  )
)
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
import com.amplitude.android.Amplitude;

Configuration configuration = new Configuration(AMPLITUDE_API_KEY, getApplicationContext());
configuration.setServerZone(ServerZone.EU);

Amplitude amplitude = new Amplitude(configuration);

```
{{/partial:tab}}
{{/partial:tabs}}

## Track

Events represent how users interact with your application. For example, "Song Played" may be an action you want to note.

```kotlin
amplitude.track("Song Played")

```

You can also optionally include event properties.

```kotlin
amplitude.track(
  "Song Played",
  mutableMapOf<String, Any?>("title" to "Happy Birthday")
)

```

For more complex events you can [create and track a `BaseEvent` object](https://github.com/amplitude/Amplitude-Kotlin/blob/8c3c39ce1f79485a0ce716bbf01de464a9afe9a8/core/src/main/java/com/amplitude/core/Amplitude.kt#L112).

```kotlin
var event = BaseEvent()
event.eventType = "Song Played"
event.eventProperties = mutableMapOf<String, Any?>("title" to "Happy Birthday")
event.groups = mutableMapOf<String, Any?>("test-group-type" to "test-group-value")
event.insertId = 1234
amplitude.track(event)

```

## Identify

{{partial:admonition type="note" heading=""}}
Starting in release v1.7.0, the SDK batches `identify` events that contain only `set` operiatons. This results in fewer sent events and doesn't impact the running of the `set` operations. Use the `identifyBatchIntervalMillis` configuration setting to manage the interval at which the SDK flushes batched identify intercepts.
{{/partial:admonition}}

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties. Declare the operations via a provided Identify interface. You can chain together multiple operations in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.

{{partial:admonition type="note" heading=""}}
If the Identify call is sent after the event, the results of operations will be visible immediately in the dashboard user's profile area, but it will not appear in chart result until another event is sent after the Identify call. The identify call only affects events going forward. 
{{/partial:admonition}}

You can handle the identity of a user using the identify methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms. Send an identify call containing those user property operations to Amplitude server to tie a user's events with specific user properties.

```kotlin
val identify = Identify()
identify.set("color", "green")
amplitude.identify(identify)

```

## Autocapture <a id="track-default-events"></a>

Starting from release v1.17.0, the SDK is able to track more events without manual instrumentation. It can be configured to track the following events automatically:

- Sessions <sup>[1](#fn:1)</sup>
- App lifecycles
- Screen views
- Deep links
- Element interactions

{{partial:collapse name="Autocapture options"}}
| Name | Type | Set by Default | Description |
| --- | --- | --- | --- |
| `SESSIONS` | `AutocaptureOption` | Yes | Enables session tracking. If the option is set, Amplitude tracks session start and session end events otherwise, Amplitude doesn't track session events. When this setting isn't set, Amplitude tracks `sessionId` only. See [Track sessions](#track-sessions) for more information. |
| `APP_LIFECYCLES` | `AutocaptureOption` | No | Enables application lifecycle events tracking. If the option is set, Amplitude tracks application installed, application updated, application opened, and application backgrounded events. Event properties tracked includes: `[Amplitude] Version`, `[Amplitude] Build`, `[Amplitude] Previous Version`, `[Amplitude] Previous Build`, `[Amplitude] From Background`. See [Track application lifecycles](#track-application-lifecycles) for more information. |
| `SCREEN_VIEWS` | `AutocaptureOption` | No | Enables screen views tracking. If the option is set, Amplitude tracks screen viewed events. Event properties tracked includes: `[Amplitude] Screen Name`. See [Track screen views](#track-screen-views) for more information. |
| `DEEP_LINKS` | `AutocaptureOption` | No | Enables deep link tracking. If the option is set, Amplitude tracks deep link opened events. Event properties tracked includes: `[Amplitude] Link URL`, `[Amplitude] Link Referrer`. See [Track deep links](#track-deep-links) for more information. |
| `ELEMENT_INTERACTIONS` | `AutocaptureOption` | No | Enables element interaction tracking. If the option is set, Amplitude tracks user interactions with clickable elements. Event properties tracked includes: `[Amplitude] Action`, `[Amplitude] Target Class`, `[Amplitude] Target Resource`, `[Amplitude] Target Tag`, `[Amplitude] Target Source`, `[Amplitude] Hierarchy`, `[Amplitude] Screen Name`. See [Track element interactions](#track-element-interactions) for more information. |

{{/partial:collapse}}

You can configure Amplitude to start tracking Autocapture events. Otherwise, you can omit the configuration to keep only session tracking enabled.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
The `autocapture` configuration accepts a `Set` of `AutocaptureOption` values. To create the Autocapture options, use the `autocaptureOptions` helper function and add the options to the set with a unary plus sign (`+`) before each option.
```kotlin
import com.amplitude.android.Amplitude

val amplitude = Amplitude(
  Configuration(
    apiKey = AMPLITUDE_API_KEY,
    context = applicationContext,
    autocapture = autocaptureOptions {
        +sessions			   // or `+Autocapture.SESSIONS`
        +appLifecycles		  // or `+Autocapture.APP_LIFECYCLES`
        +deepLinks			  // or `+Autocapture.DEEP_LINKS`
        +screenViews			// or `+Autocapture.SCREEN_VIEWS`
    }
  )
)
```
By default, if the `autocapture` configuration isn't explicitly set during `Configuration` initialization, `configuration.autocapture` will automatically include `AutocaptureOption.SESSIONS`.

If you want to prevent automatic session events capture, set `autocapture` without the `AutocaptureOption.SESSIONS` option.
```kotlin
import com.amplitude.android.Amplitude

val amplitude = Amplitude(
  Configuration(
    apiKey = AMPLITUDE_API_KEY,
    context = applicationContext,
    autocapture = setOf(Autocapture.APP_LIFECYCLES)  // or use `setOf()` to disable autocapture.
  )
)
```
{{/partial:tab}}
{{partial:tab name="Java"}}
The `autocapture` configuration accepts a `Set` of `AutocaptureOption` values.
```java
import com.amplitude.android.Amplitude;

import java.util.Arrays;

Configuration configuration = new Configuration(AMPLITUDE_API_KEY, getApplicationContext());
configuration.getAutocapture().addAll(Arrays.asList(
    AutocaptureOption.APP_LIFECYCLES,
    AutocaptureOption.DEEP_LINKS,
    AutocaptureOption.SCREEN_VIEWS
));

Amplitude amplitude = new Amplitude(configuration);
```
By default, if the `autocapture` configuration isn't explicitly set during `Configuration` initialization, `configuration.getAutocapture()` will automatically include `AutocaptureOption.SESSIONS`.

If you want to prevent automatic session events capture, remove the `AutocaptureOption.SESSIONS` option from `autocapture`.
```java
import com.amplitude.android.Amplitude;

Configuration configuration = new Configuration(AMPLITUDE_API_KEY, getApplicationContext());
configuration.getAutocapture().remove(AutocaptureOption.SESSIONS);

Amplitude amplitude = new Amplitude(configuration);
```
{{/partial:tab}}
{{/partial:tabs}}

### Track sessions

Amplitude enables session tracking by default. Include `AutocaptureOption.SESSIONS` in the `autocapture` configuration to explicitly configure the SDK to track session events or to enable session event tracking along with other Autocapture configurations.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
import com.amplitude.android.Amplitude

val amplitude = Amplitude(
  Configuration(
    apiKey = AMPLITUDE_API_KEY,
    context = applicationContext,
    autocapture = autocaptureOptions {
        +sessions	// or `+Autocapture.SESSIONS`
    }
  )
)
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
import com.amplitude.android.Amplitude;

import java.util.Arrays;

Configuration configuration = new Configuration(AMPLITUDE_API_KEY, getApplicationContext());
// `AutocaptureOption.SESSION` is automatically set in `configuration.autocapture`.

Amplitude amplitude = new Amplitude(configuration);
```
{{/partial:tab}}
{{/partial:tabs}}

For more information about session tracking, refer to [User sessions](#user-sessions).

### Track application lifecycles

You can enable Amplitude to start tracking application lifecycle events by including `AutocaptureOption.APP_LIFECYCLES` in the `autocapture` configuration. Refer to the code sample below.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
import com.amplitude.android.Amplitude

val amplitude = Amplitude(
  Configuration(
    apiKey = AMPLITUDE_API_KEY,
    context = applicationContext,
    autocapture = autocaptureOptions {
        +appLifecycles	// or `+Autocapture.APP_LIFECYCLES`
    }
  )
)
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
import com.amplitude.android.Amplitude;

Configuration configuration = new Configuration(AMPLITUDE_API_KEY, getApplicationContext());
configuration.getAutocapture().add(AutocaptureOption.APP_LIFECYCLES);

Amplitude amplitude = new Amplitude(configuration);
```
{{/partial:tab}}
{{/partial:tabs}}

After enabling this setting, Amplitude tracks the following events:

- `[Amplitude] Application Installed`, this event fires when a user opens the application for the first time right after installation.
- `[Amplitude] Application Updated`, this event fires when a user opens the application after updating the application.
- `[Amplitude] Application Opened`, this event fires when a user launches or foregrounds the application after the first open.
- `[Amplitude] Application Backgrounded`, this event fires when a user backgrounds the application.

### Track screen views

You can enable Amplitude to start tracking screen view events by including `AutocaptureOption.SCREEN_VIEWS` in the `autocapture` configuration. Refer to the code sample below.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
import com.amplitude.android.Amplitude

val amplitude = Amplitude(
  Configuration(
    apiKey = AMPLITUDE_API_KEY,
    context = applicationContext,
    autocapture = autocaptureOptions {
        +screenViews	// or `+Autocapture.SCREEN_VIEWS`
    }
  )
)
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
import com.amplitude.android.Amplitude;

Configuration configuration = new Configuration(AMPLITUDE_API_KEY, getApplicationContext());
configuration.getAutocapture().add(AutocaptureOption.SCREEN_VIEWS);

Amplitude amplitude = new Amplitude(configuration);
```
{{/partial:tab}}
{{/partial:tabs}}

After enabling this setting, Amplitude will track the `[Amplitude] Screen Viewed` event with the screen name property. This property value is read from the activity label, application label, and activity name successively.

### Track deep links

You can enable Amplitude to start tracking deep link events by including `AutocaptureOption.DEEP_LINKS` in the `autocapture` configuration. Refer to the code sample below.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
import com.amplitude.android.Amplitude

val amplitude = Amplitude(
  Configuration(
    apiKey = AMPLITUDE_API_KEY,
    context = applicationContext,
    autocapture = autocaptureOptions {
        +deepLinks	// or `+Autocapture.DEEP_LINKS`
    }
  )
)
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
import com.amplitude.android.Amplitude;

Configuration configuration = new Configuration(AMPLITUDE_API_KEY, getApplicationContext());
configuration.getAutocapture().add(AutocaptureOption.DEEP_LINKS);

Amplitude amplitude = new Amplitude(configuration);
```
{{/partial:tab}}
{{/partial:tabs}}

After enabling this setting, Amplitude will track the `[Amplitude] Deep Link Opened` event with the URL and referrer information.

### Track element interactions

Amplitude can track user interactions with clickable elements with support for both classic Android Views as well as Jetpack Compose. To enable this option, include `AutocaptureOption.ELEMENT_INTERACTIONS` in the `autocapture` configuration. 

{{partial:admonition type="note" heading=""}}
The `AutocaptureOption.ELEMENT_INTERACTIONS` option is experimental. Try it out and share your thoughts on our [GitHub](https://github.com/amplitude/Amplitude-Kotlin).
{{/partial:admonition}}

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
import com.amplitude.android.Amplitude

val amplitude = Amplitude(
  @OptIn(ExperimentalAmplitudeFeature::class)
  Configuration(
    apiKey = AMPLITUDE_API_KEY,
    context = applicationContext,
    autocapture = autocaptureOptions {
        +elementInteractions	// or `+AutocaptureOption.ELEMENT_INTERACTIONS`
    }
  )
)
```
Currently, the `AutocaptureOption.ELEMENT_INTERACTIONS` option is experimental. To opt-in for this feature, apply the `@OptIn(ExperimentalAmplitudeFeature::class)` annotation to the configuration.
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
import com.amplitude.android.Amplitude;

Configuration configuration = new Configuration(AMPLITUDE_API_KEY, getApplicationContext());
configuration.getAutocapture().add(AutocaptureOption.ELEMENT_INTERACTIONS);

Amplitude amplitude = new Amplitude(configuration);
```
{{/partial:tab}}
{{/partial:tabs}}

After enabling this setting, Amplitude will track the `[Amplitude] Element Interacted` event whenever a user interacts with an element in the application.

{{partial:admonition type="info" heading="Support for Jetpack Compose"}}
Amplitude supports tracking user interactions with UI elements implemented in Jetpack Compose. To track interactions, add a `Modifier.testTag` to the `@Composable` functions of the elements that you want to track.
{{/partial:admonition}}

## User groups

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, then the count includes the group.

For example, you want to group your users based on what organization they're in by using an 'orgId'. Joe is in 'orgId' '10', and Sue is in 'orgId' '15'. Sue and Joe both perform a certain event. You can query their organizations in the Event Segmentation Chart.

When setting groups, define a `groupType` and `groupName`. In the previous example, 'orgId' is the `groupType` and '10' and '15' are the values for `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'.

Setting a group also sets the `groupType:groupName` as a user property, and overwrites any existing `groupName` value set for that user's groupType, and the corresponding user property value. `groupType` is a string, and `groupName` can be either a string or an array of strings to indicate that a user is in multiple groups.

{{partial:admonition type="example" heading=""}}
If Joe is in 'orgId' '15', then the `groupName` would be '15'.

```kotlin
// set group with a single group name
amplitude.setGroup("orgId", "15");

```

If Joe is in 'sport' 'tennis' and 'soccer', then the `groupName` would be '["tennis", "soccer"]'.

```kotlin
// set group with multiple group names
amplitude.setGroup("sport", arrayOf("tennis", "soccer"))

```
{{/partial:admonition}}

You can also set **event-level groups** by passing an `Event` Object with `groups` to `track`. With event-level groups, the group designation applies only to the specific event being logged, and doesn't persist on the user unless you explicitly set it with `setGroup`.

```kotlin
val event = BaseEvent()
event.eventType = "event type"
event.eventProperties = mutableMapOf("event property" to "event property value")
event.groups = mutableMapOf("orgId" to "15")
amplitude.track(event)

```

## Group identify

Use the Group Identify API to set or update the properties of particular groups. Keep these considerations in mind:

- Updates affect only future events, and don't update historical events.
- You can track up to 5 unique group types and 10 total groups.

The `groupIdentify` method accepts a group type string parameter and group name object parameter, and an Identify object that's applied to the group.

```kotlin
val groupType = "plan"
val groupName = "enterprise"

val identify = Identify().set("key", "value")
amplitude.groupIdentify(groupType, groupName, identify)

```

## Track revenue


Amplitude can track revenue generated by a user. Revenue is tracked through distinct revenue objects, which have special fields that are used in Amplitude's Event Segmentation and Revenue LTV charts. This allows Amplitude to automatically display data relevant to revenue in the platform. Revenue objects support the following special properties, as well as user-defined properties through the `eventProperties` field.

```kotlin
val revenue = Revenue()
revenue.productId = "com.company.productId"
revenue.price = 3.99
revenue.quantity = 3
amplitude.revenue(revenue)

```

| Name | Description |
| --- | --- |
| `productId` | Optional. String. An identifier for the product. Amplitude recommends something like the Google Play Store product ID. Defaults to `null`. |
| `quantity` | Required. Integer. The quantity of products purchased. Note: revenue = quantity * price. Defaults to 1 |
| `price` | Required. Double. The price of the products purchased, and this can be negative. Note: revenue = quantity * price. Defaults to `null`. |
| `revenueType` | Optional, but required for revenue verification. String. The revenue type (for example, tax, refund, income). Defaults to `null`. |
| `receipt` | Optional. String. The receipt identifier of the revenue. For example, "123456". Defaults to `null`. |
| `receiptSignature` | Optional, but required for revenue verification. String. Defaults to `null`. |

## Custom user identifier

If your app has its login system that you want to track users with, you can call `setUserId` at any time.

```kotlin
amplitude.setUserId("user@amplitude.com")

```

## Custom device identifier

You can assign a new device ID using `deviceId`. When setting a custom device ID, make sure the value is sufficiently unique. Amplitude recommends using a UUID.

```kotlin
import java.util.UUID

amplitude.setDeviceId(UUID.randomUUID().toString())

```

## Reset when a user logs out

`reset` is a shortcut to anonymize users after they log out, by:

- setting `userId` to `null`
- setting `deviceId` to a new value based on current configuration

With an empty `userId` and a completely new `deviceId`, the current user would appear as a brand new user in dashboard.

```kotlin
amplitude.reset()

```

## SDK plugins

Plugins allow you to extend Amplitude SDK's behavior by, for example, modifying event properties (enrichment type) or sending to third-party APIs (destination type). A plugin is an object with methods `setup()` and `execute()`.

### Plugin.setup

This method contains logic for preparing the plugin for use and has `amplitude` instance as a parameter. The expected return value is `null`. A typical use for this method, is to instantiate plugin dependencies. This method is called when the plugin is registered to the client via `amplitude.add()`.

### Plugin.execute

This method contains the logic for processing events and has `event` instance as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event. If used as a destination type plugin, the expected return value is a map with keys: `event` (BaseEvent), `code` (number), and `message` (string). This method is called for each event, including Identify, GroupIdentify and Revenue events, that's instrumented using the client interface.

### Enrichment type plugin example

Here's an example of a plugin that modifies each event that's instrumented by adding extra event property.

```java
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.amplitude.core.Amplitude;
import com.amplitude.core.events.BaseEvent;
import com.amplitude.core.platform.Plugin;

import java.util.HashMap;

public class EnrichmentPlugin implements Plugin {
  public Amplitude amplitude;
  @NonNull
  @Override
  public Amplitude getAmplitude() {
    return this.amplitude;
  }

  @Override
  public void setAmplitude(@NonNull Amplitude amplitude) {
    this.amplitude = amplitude;
  }

  @NonNull
  @Override
  public Type getType() {
    return Type.Enrichment;
  }

  @Nullable
  @Override
  public BaseEvent execute(@NonNull BaseEvent baseEvent) {
    if (baseEvent.getEventProperties() == null) {
      baseEvent.setEventProperties(new HashMap<String, Object>());
    }
    baseEvent.getEventProperties().put("custom android event property", "test");
    return baseEvent;
  }

  @Override
  public void setup(@NonNull Amplitude amplitude) {
    this.amplitude = amplitude;
  }
}

amplitude.add(new EnrichmentPlugin());

```

### Destination type plugin example

In a destination plugin, you can overwrite the `track()`, `identify()`, `groupIdentify()`, `revenue()`, `flush()` functions.

```java
import com.amplitude.core.Amplitude;
import com.amplitude.core.events.BaseEvent;
import com.amplitude.core.platform.DestinationPlugin;
import com.segment.analytics.Analytics;
import com.segment.analytics.Properties;

public class SegmentDestinationPlugin extends DestinationPlugin {
  android.content.Context context;
  Analytics analytics;
  String writeKey;
  public SegmentDestinationPlugin(android.content.Context appContext, String writeKey) {
    this.context = appContext;
    this.writeKey = writeKey;
  }
  @Override
  public void setup(Amplitude amplitude) {
    super.setup(amplitude);
    analytics = new Analytics.Builder(this.context, this.writeKey)
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

amplitude.add(
new SegmentDestinationPlugin(this, SEGMENT_WRITE_KEY)
)

```

## Debugging

Ensure that the configuration and payload are accurate and check for any unusual messages during the debugging process. If everything appears to be right, check the value of `flushQueueSize` or `flushIntervalMillis`. Events are queued and sent in batches by default, which means they don't dispatch to the server. Ensure that you have waited for the events to be sent to the server before checking for them in the charts.

### Log

- Set the [log level](#log-level) to debug to collect useful information during debugging.
- Customize `loggerProvider` class from the `LoggerProvider` and implement your own logic, such as logging error message in server in a production environment. For more information, see [Set log callback](#set-log-callback).


### Plugins

You can take advantage of a Destination Plugin to print out the configuration value and event payload before sending them to the server. You can set the `logLevel` to debug, copy the following `TroubleShootingPlugin` into your project, add the plugin into the Amplitude instance.

- [Java TroubleShootingPlugin example](https://github.com/amplitude/Amplitude-Kotlin/blob/main/samples/java-android-app/src/main/java/com/amplitude/android/sample/TroubleShootingPlugin.java).
- [Kotlin TroubleShootingPlugin example](https://github.com/amplitude/Amplitude-Kotlin/blob/main/samples/kotlin-android-app/src/main/java/com/amplitude/android/sample/TroubleShootingPlugin.kt).

### Event callback

The event callback executes after the event is sent, for both successful and failed events. Use this method to monitor the event status and message. For more information, the Callback [configuration](#configure-the-sdk) setting.

## Advanced topics

### User sessions

Amplitude starts a session when the app is brought into the foreground or when an event is tracked in the background. A session ends when the app remains in the background for more than the time set by `setMinTimeBetweenSessionsMillis()` without any event being tracked. Note that a session will continue for the entire time the app is in the foreground no matter whether session tracking is enabled by `configuration.trackingSessionEvents`, `configuration.defaultTracking`, `configuration.autocapture` or not. 

When the app enters the foreground, Amplitude tracks a session start, and starts a countdown based on `setMinTimeBetweenSessionsMillis()`. Amplitude extends the session and restarts the countdown any time it tracks a new event. If the countdown expires, Amplitude waits until the next event to track a session end event.

Amplitude doesn't set user properties on session events by default. To add these properties, use `identify()` and `setUserId()`. Amplitude aggregates the user property state and associates the user with events based on `device_id` or `user_id`.

Due to the way in which Amplitude manages sessions, there are scenarios where the SDK works expected but it may appear as if events are missing or session tracking is inaccurate:

- If a user doesn't return to the app, Amplitude does not track a session end event to correspond with a session start event.
- If you track an event in the background, it's possible that Amplitude perceives the session length to be longer than the user spends on the app in the foreground.
- If you modify user properties between the last event and the session end event, the session end event reflects the updated user properties, which may differ from other properties associated with events in the same session. To address this, use an enrichment plugin to set `event['$skip_user_properties_sync']` to `true` on the session end event, which prevents Amplitude from synchronizing properties for that specific event. See [$skip_user_properties_sync](/docs/data/converter-configuration-reference/#skip_user_properties_sync) in the Converter Configuration Reference article to learn more.

Amplitude groups events together by session. Events that are logged within the same session have the same `session_id`. Sessions are handled automatically so you don't have to manually call `startSession()` or `endSession()`.

You can adjust the time window for which sessions are extended. The default session expiration time is 30 minutes.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
amplitude = Amplitude(
  Configuration(
    apiKey = AMPLITUDE_API_KEY,
    context = applicationContext,
    minTimeBetweenSessionsMillis = 10000
  )
)
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
Configuration configuration = new Configuration(AMPLITUDE_API_KEY, getApplicationContext());
configuration.setMinTimeBetweenSessionsMillis(1000);

Amplitude amplitude = new Amplitude(configuration);

```
{{/partial:tab}}
{{/partial:tabs}}

By default, Amplitude automatically sends the '[Amplitude] Start Session' and '[Amplitude] End Session' events. Even though these events aren't sent, sessions are still tracked by using `session_id`.
You can also disable those session events.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
amplitude = Amplitude(
  Configuration(
    apiKey = AMPLITUDE_API_KEY,
    context = applicationContext,
    autocapture = setOf()
  )
)

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
amplitude = AmplitudeKt.Amplitude(AMPLITUDE_API_KEY, getApplicationContext(), configuration -> {
    configuration.getAutocapture().remove(AutocaptureOption.SESSION);
    return Unit.INSTANCE;
});

```
{{/partial:tab}}
{{/partial:tabs}}

Use the helper method `getSessionId` to get the value of the current `sessionId`.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
amplitude = Amplitude(
  Configuration(
    apiKey = AMPLITUDE_API_KEY,
    context = applicationContext,
    minTimeBetweenSessionsMillis = 10000
  )
)

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
Configuration configuration = new Configuration(AMPLITUDE_API_KEY, getApplicationContext());
configuration.setMinTimeBetweenSessionsMillis(10000);

Amplitude amplitude = new Amplitude(configuration);

```
{{/partial:tab}}
{{/partial:tabs}}

You can also track events as out-of-session. Out-of-session events have a `sessionId` of `-1` and behave as follows:

1. Aren't part of the current session.
2. Don't extend the current session.
3. Don't start a new session.
4. Don't change the `sessionId` for subsequent events.

A potential use case is for events tracked from push notifications, which are usually external to the customers app usage.

Set the `sessionId` to `-1` in `EventOptions` to mark an event as out-of-session when you call `track(event, options)` or `identify(identify, options)`.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
val outOfSessionOptions = EventOptions().apply {
 sessionId = -1
}
amplitude.identify(
 Identify().set("user-prop", true),
 outOfSessionOptions
)
amplitude.track(
 BaseEvent().apply { eventType = "test event" },
 outOfSessionOptions
)

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
EventOptions outOfSessionOptions = new EventOptions();
outOfSessionOptions.setSessionId(-1L);

amplitude.identify(
 new Identify().set("user-prop", true),
 outOfSessionOptions
);

BaseEvent event = new BaseEvent();
event.eventType = "test event";
amplitude.track(event, outOfSessionOptions);

```
{{/partial:tab}}
{{/partial:tabs}}

### Log level

Control the level of logs that print to the developer console.

- `INFO`: Shows informative messages about events.
- `WARN`: Shows error messages and warnings. This level logs issues that might be a problem and cause some oddities in the data. For example, this level would display a warning for properties with null values.
- `ERROR`: Shows error messages only.
- `DISABLE`: Suppresses all log messages.
- `DEBUG`: Shows error messages, warnings, and informative messages that may be useful for debugging.

Set the log level by calling `setLogLevel` with the level you want.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
amplitude.logger.logMode = Logger.LogMode.DEBUG

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
amplitude.getLogger().setLogMode(Logger.LogMode.DEBUG);

```
{{/partial:tab}}
{{/partial:tabs}}

### Logged out and anonymous users

Amplitude [merges user data](/docs/cdp/sources/instrument-track-unique-users), so any events associated with a known `userId` or `deviceId` are linked the existing user.
 If a user logs out, Amplitude can merge that user's logged-out events to the user's record. You can change this behavior and log those events to an anonymous user instead.

To log events to an anonymous user:

1. Set the `userId` to null.
2. Generate a new `deviceId`.

Events coming from the current user or device appear as a new user in Amplitude. Note: If you do this, you can't see that the two users were using the same device.

```java
amplitude.reset()
```

### Disable tracking

By default the Android SDK tracks several user properties such as `carrier`, `city`, `country`, `ip_address`, `language`, and `platform`.
Use the provided `TrackingOptions` interface to customize and toggle individual fields.

To use the `TrackingOptions` interface, import the class.

```java
import com.amplitude.android.TrackingOptions

```

Before initializing the SDK with your `apiKey`, create a `TrackingOptions` instance with your configuration and set it on the SDK instance.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
val trackingOptions = TrackingOptions()
trackingOptions.disableCity().disableIpAddress().disableLatLng()
amplitude = Amplitude(
  Configuration(
    apiKey = AMPLITUDE_API_KEY,
    context = applicationContext,
    trackingOptions = trackingOptions
  )
)

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
TrackingOptions trackingOptions = new TrackingOptions();
trackingOptions.disableCity().disableIpAddress().disableLatLng();

// init instance
amplitude = AmplitudeKt.Amplitude(AMPLITUDE_API_KEY, getApplicationContext(), configuration -> {
 configuration.setTrackingOptions(trackingOptions);
 return Unit.INSTANCE;
});

```
{{/partial:tab}}
{{/partial:tabs}}

Tracking for each field can be individually controlled, and has a corresponding method (for example, `disableCountry`, `disableLanguage`).

| Method | Description |
| --- | --- |
| `disableAdid()` | Disable tracking of Google ADID |
| `disableAppSetId()` | Disable tracking of App Set Id |
| `disableCarrier()` | Disable tracking of device's carrier |
| `disableCity()` | Disable tracking of user's city |
| `disableCountry()` | Disable tracking of user's country |
| `disableDeviceBrand()` | Disable tracking of device brand |
| `disableDeviceModel()` | Disable tracking of device model |
| `disableTrackDeviceManufacturer()` | Disable tracking of device manufacturer |
| `disableDma()` | Disable tracking of user's designated market area (DMA). |
| `disableIpAddress()` | Disable tracking of user's IP address |
| `disableLanguage()` | Disable tracking of device's language |
| `disableLatLng()` | Disable tracking of user's current latitude and longitude coordinates |
| `disableOsName()` | Disable tracking of device's OS Name |
| `disableOsVersion()` | Disable tracking of device's OS Version |
| `disablePlatform()` | Disable tracking of device's platform |
| `disableRegion()` | Disable tracking of user's region. |
| `disableVersionName()` | Disable tracking of your app's version name |
| `disableApiLevel` | Disable tracking of Android API level |

{{partial:admonition type="note" heading=""}}
Using `TrackingOptions` only prevents default properties from being tracked on newly created projects, where data has not yet been sent. If you have a project with existing data that you want to stop collecting the default properties for, get help in the [Amplitude Community](https://community.amplitude.com/). Disabling tracking doesn't delete any existing data in your project.
{{/partial:admonition}}

### Carrier

Amplitude determines the user's mobile carrier using [Android's TelephonyManager](https://developer.android.com/reference/kotlin/android/telephony/TelephonyManager#getnetworkoperatorname) `networkOperatorName`, which returns the current registered operator of the `tower`. 

### COPPA control

COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking can all be enabled or disabled at one time. Apps that ask for information from children under 13 years of age must comply with COPPA.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
amplitude = Amplitude(
  Configuration(
    apiKey = AMPLITUDE_API_KEY,
    context = applicationContext,
    enableCoppaControl = true //Disables ADID, city, IP, and location tracking
  )
)

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
Configuration configuration = new Configuration(AMPLITUDE_API_KEY, getApplicationContext());
//Disables ADID, city, IP, and location tracking
configuration.setEnableCoppaControl(true);

Amplitude amplitude = new Amplitude(configuration);

```
{{/partial:tab}}
{{/partial:tabs}}

### Advertiser ID

The Android Advertising ID is a unique identifier provided by the Google Play store. As it's unique to every person and not just their devices, it's useful for mobile attribution. This is similar to the IDFA on iOS.
 [Mobile attribution](https://www.adjust.com/blog/mobile-ad-attribution-introduction-for-beginners/) is the attribution of an installation of a mobile app to its original source (such as ad campaign, app store search).
 Users can choose to disable the Advertising ID, and apps targeted to children can't track at all.

Follow these steps to use Android Ad ID.

{{partial:admonition type="warning" heading=""}}
As of April 1, 2022, Google allows users to opt out of Ad ID tracking. Ad ID may return null or error. You can use am alternative ID called [App Set ID](#app-set-id), which is unique to every app install on a device. [Learn more](https://support.google.com/googleplay/android-developer/answer/6048248?hl=en).
{{/partial:admonition}}

1. Add `play-services-ads-identifier` as a dependency.

    ```bash
    dependencies {
      implementation 'com.google.android.gms:play-services-ads-identifier:18.0.1'
    }
    ```

2. `AD_MANAGER_APP` Permission
If you use Google Mobile Ads SDK version 17.0.0 or higher, you need to add `AD_MANAGER_APP` to `AndroidManifest.xml`.

    ```xml
    <manifest>
        <application>
            <meta-data
                android:name="com.google.android.gms.ads.AD_MANAGER_APP"
                android:value="true"/>
        </application>
    </manifest>
    ```

3. Add ProGuard exception

    Amplitude Android SDK uses Java Reflection to use classes in Google Play Services. For Amplitude SDKs to work in your Android application, add these exceptions to `proguard.pro` for the classes from `play-services-ads`.
    `-keep class com.google.android.gms.ads.** { *; }`

4. `AD_ID` Permission 

    When apps update their target to Android 13 or above will need to declare a Google Play services normal permission in the manifest file as follows if you are trying to use the ADID as a deviceId:

    ```xml
    <uses-permission android:name="com.google.android.gms.permission.AD_ID"/>
    ```
    
    Learn More [here](https://support.google.com/googleplay/android-developer/answer/6048248?hl=en).

#### Use the advertising ID as the device ID

After you set up the logic to fetch the advertising ID, you can enable `useAdvertisingIdForDeviceId` to use advertising id as the device ID.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
amplitude = Amplitude(
  Configuration(
    apiKey = AMPLITUDE_API_KEY,
    context = applicationContext,
    useAdvertisingIdForDeviceId = true
  )
)
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
Configuration configuration = new Configuration(AMPLITUDE_API_KEY, getApplicationContext());
configuration.setUseAdvertisingIdForDeviceId(true);

Amplitude amplitude = new Amplitude(configuration);

```
{{/partial:tab}}
{{/partial:tabs}}

### App set ID

App set ID is a unique identifier for each app install on a device. App set ID is reset by the user manually when they uninstall the app, or after 13 months of not opening the app.
 Google designed this as a privacy-friendly alternative to Ad ID for users who want to opt out of stronger analytics.

To use App Set ID, follow these steps.

1. Add `play-services-appset` as a dependency. For versions earlier than 2.35.3, use `'com.google.android.gms:play-services-appset:16.0.0-alpha1'`

    ```bash
    dependencies {
    implementation 'com.google.android.gms:play-services-appset:16.0.2'
    }

    ```
2. Enable to use app set ID as Device ID.

    {{partial:tabs tabs="Kotlin, Java"}}
    {{partial:tab name="Kotlin"}}
    ```kotlin
      amplitude = Amplitude(
        Configuration(
        apiKey = AMPLITUDE_API_KEY,
        context = applicationContext,
        useAppSetIdForDeviceId = true
        )
      )

    ```
    {{/partial:tab}}
    {{partial:tab name="Java"}}
    ```java
    Configuration configuration = new Configuration(AMPLITUDE_API_KEY, getApplicationContext());
    configuration.setUseAppSetIdForDeviceId(true);

    Amplitude amplitude = new Amplitude(configuration);

    ```
    {{/partial:tab}}
    {{/partial:tabs}}

### Device ID lifecycle

The SDK initializes the device ID in the following order, with the device ID being set to the first valid value encountered:

1. Device ID of the instance
2. ADID if `useAdvertisingIdForDeviceId` is enabled and required module is installed. Learn [more](#advertiser-id)
3. App Set ID with an `S` appended if `useAppSetIdForDeviceId` is enabled and required module is installed. Learn [more](#app-set-id)
4. A randomly generated UUID with an `R` appended

#### One user with multiple devices

A single user may have multiple devices, each having a different device ID. To ensure coherence, set the user ID consistently across all these devices. Even though the device IDs differ, Amplitude can still merge them into a single Amplitude ID, thus identifying them as a unique user.

#### Transfer to a new device

It's possible for multiple devices to have the same device ID when a user switches to a new device. When transitioning to a new device, users often transfer their applications along with other relevant data. The specific transferred content may vary depending on the application. In general, it includes databases and file directories associated with the app. However, the exact items included depend on the app's design and the choices made by the developers. If databases or file directories have been backed up from one device to another, the device ID stored within them may still be present. If the SDK attempts to retrieve it during initialization, different devices might end up using the same device ID.

#### Get device ID

Use the helper method `getDeviceId()` to get the value of the current `deviceId`.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
val deviceId = amplitude.getDeviceId();

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
String deviceId = amplitude.getDeviceId();

```
{{/partial:tab}}
{{/partial:tabs}}

To set the device, see to [custom device ID](#custom-device-id).

### Location tracking

Amplitude converts the IP of a user event into a location (GeoIP lookup) by default. This information may be overridden by an app's own tracking solution or user data.

By default, Amplitude can use Android location service (if available) to add the specific coordinates (longitude and latitude) for the location from which an event is logged. Control this behavior by enable / disable location listening during the initialization.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```
amplitude = Amplitude(
  Configuration(
    apiKey = AMPLITUDE_API_KEY,
    context = applicationContext,
    locationListening = true
  )
)

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
Configuration configuration = new Configuration(AMPLITUDE_API_KEY, getApplicationContext());
configuration.setLocationListening(true);

Amplitude amplitude = new Amplitude(configuration);

```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="note" heading="Proguard obfuscation"}}
If you use ProGuard obfuscation, add the following exception to the file:
`-keep class com.google.android.gms.common.** { *; }`
{{/partial:admonition}}

### Opt users out of tracking

Users may wish to opt out of tracking entirely, which means Amplitude doesn't track any of their events or browsing history. `OptOut` provides a way to fulfill a user's requests for privacy.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
amplitude = Amplitude(
  Configuration(
    apiKey = AMPLITUDE_API_KEY,
    context = applicationContext,
    optOut = true
  )
)

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
Configuration configuration = new Configuration(AMPLITUDE_API_KEY, getApplicationContext());
configuration.setOptOut(true);

Amplitude amplitude = new Amplitude(configuration);

```
{{/partial:tab}}
{{/partial:tabs}}

### Push notification events

Don't send push notification events client-side with the Android SDK. Because a user must open the app to initialize the Amplitude SDK in order for the SDK to send the event, events aren't sent to the Amplitude servers until the next time the user opens the app. This can cause data delays.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
import com.amplitude.common.Logger
import com.amplitude.core.LoggerProvider

class sampleLogger : Logger {
override var logMode: Logger.LogMode
 get() = Logger.LogMode.DEBUG
 set(value) {}

 override fun debug(message: String) {
 TODO("Handle debug message here")
 }

 override fun error(message: String) {
 TODO("Handle error message here")
 }

 override fun info(message: String) {
 TODO("Handle info message here")
 }

 override fun warn(message: String) {
 TODO("Handle warn message here")
 }
}

class sampleLoggerProvider : LoggerProvider {
 override fun getLogger(amplitude: com.amplitude.core.Amplitude): Logger {
 return sampleLogger()
 }
}

amplitude = Amplitude(
 Configuration(
 apiKey = AMPLITUDE_API_KEY,
 context = applicationContext,
 loggerProvider = sampleLoggerProvider()
 )
)

```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
import com.amplitude.common.Logger;
import com.amplitude.core.LoggerProvider;

class sampleLogger implements Logger {
 @NonNull
 @Override
 public LogMode getLogMode() {
 return LogMode.DEBUG;
 }

 @Override
 public void setLogMode(@NonNull LogMode logMode) {
 // TODO("Handle debug message here")
 }

 @Override
 public void debug(@NonNull String message) {
 // TODO("Handle debug message here")
 }

 @Override
 public void error(@NonNull String message) {
 // TODO("Handle error message here")
 }

 @Override
 public void info(@NonNull String message) {
 // TODO("Handle info message here")
 }

 @Override
 public void warn(@NonNull String message) {
 // TODO("Handle warn message here")
 }
}

class sampleLoggerProvider implements LoggerProvider {
 @NonNull
 @Override
 public Logger getLogger(@NonNull com.amplitude.core.Amplitude amplitude) {
 return new sampleLogger();
 }
}

```
{{/partial:tab}}
{{/partial:tabs}}

### Multiple instances

You can create multiple instances of Amplitude. Instances with the same `instanceName` share storage and identity. For isolated storage and identity use a unique `instanceName` for each instance. For more details see [Configuration](#configuration).

```kotlin
val amplitude1 = Amplitude(Configuration(
 instanceName = "one",
 apiKey = "api-key-1",
 context = applicationContext,
))
val amplitude2 = Amplitude(Configuration(
 instanceName = "two",
 apiKey = "api-key-2",
 context = applicationContext,
))

```

### Offline mode

Starting from version 1.13.0, the Amplitude Android Kotlin SDK supports offline mode. The SDK checks network connectivity every time it tracks an event. If the device is connected to network, the SDK schedules a flush. If not, it saves the event to storage. The SDK also listens for changes in network connectivity and flushes all stored events when the device reconnects.

To enable this feature, add the `ACCESS_NETWORK_STATE` permission to `AndroidManifest.xml`. Otherwise, the SDK flushes the event based on `flushIntervalMillis` and `flushQueueSize`.

```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

You can also implement you own offline logic:

1. Set `config.offline` to `AndroidNetworkConnectivityCheckerPlugin.Disabled` to disable the default offline logic.
2. Toggle `config.offline` by yourself