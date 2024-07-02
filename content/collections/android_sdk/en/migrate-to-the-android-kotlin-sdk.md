---
id: 016795b7-45ca-4daa-9458-85bf283a35cb
blueprint: android_sdk
title: 'Migrate to the Android-Kotlin SDK'
sdk_status: maintenance
article_type: migration
source: https://www.docs.developers.amplitude.com/data/sdks/android-kotlin/migration/
supported_languages:
  - java
  - kotlin
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1715119669
sdk_version_comparison:
  -
    cells:
      - Feature
      - 'Maintenance SDK'
      - 'Latest SDK'
  -
    cells:
      - Package
      - '[com.amplitude:android-sdk](https://mvnrepository.com/artifact/com.amplitude/android-sdk)'
      - '[com.amplitude:analytics-android](https://mvnrepository.com/artifact/com.amplitude/analytics-android)'
  -
    cells:
      - 'SSL Pinning'
      - Supported
      - TBD
  -
    cells:
      - Configuration
      - 'Supports specific setter methods'
      - 'Configuration is implemented by the configuration object. Configurations need to be passed into Amplitude Object during initialization.'
  -
    cells:
      - 'Logger Provider'
      - 'Amplitude Logger. Not customizable.'
      - '`ConsoleLoggerProvider()` by default. Fully customizable.'
  -
    cells:
      - 'Storage Provider'
      - 'SQLite Database.'
      - '`InMemoryStorageProvider()` by default. File storage. Fully customizable.'
  -
    cells:
      - Customization
      - Middleware
      - Plugins
  -
    cells:
      - 'Server Endpoint'
      - 'HTTP V1 API'
      - 'HTTP V2 API'
  -
    cells:
      - 'Batch API'
      - 'Not supported.'
      - 'Supported, with configuration.'
  -
    cells:
      - 'Default Event Tracking'
      - 'Support sessions tracking only, disabled by default.'
      - 'Support sessions, app lifecycles, screen views, and deep links trackings.'
exclude_from_sitemap: false
---
Amplitude's latest Android SDK (`com.amplitude:analytics-android`) features a plugin architecture, built-in type definitions, is written in Kotlin. The latest Android SDK isn't backwards compatible with the maintenance Android SDK `com.amplitude:android-sdk`. 

To migrate to `com.amplitude:analytics-android`, update your dependencies and instrumentation.

## Terminology

* `com.amplitude:android-sdk`: Maintenance Android SDK
* `com.amplitude:analytics-android`: Latest Android SDK

## Dependency

Update build.gradle to remove the maintenance Android SDK and add the latest Android SDK. Then sync project with Gradle files.

```java
dependencies {
  implementation 'com.amplitude:android-sdk:2.+' //[tl! --]
  implementation 'com.squareup.okhttp3:okhttp:4.2.2' //[tl! ++:1]
  implementation 'com.amplitude:analytics-android:1.+'
}
```

## Instrumentation

The latest Android SDK offers an new API to instrument events. To migrate to it, you need to update a few calls. The following sections detail which calls have changed.

### Initialization

Initialize the SDK with a valid Amplitude API Key and Android application context.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
import com.amplitude.api.Amplitude //[tl! --:1]
import com.amplitude.api.AmplitudeClient
import com.amplitude.android.Amplitude //[tl! ++]

val client = Amplitude.getInstance() //[tl! --:1]
  .initialize(getApplicationContext(), "YOUR_API_KEY")
val client = Amplitude( //[tl! ++:5]
    Configuration(
        apiKey = "YOUR_API_KEY",
        context = getApplicationContext()
    )
)
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
import com.amplitude.api.Amplitude; //[tl! --:1]
import com.amplitude.api.AmplitudeClient;
import com.amplitude.android.Amplitude; //[tl! ++]

AmplitudeClient client = Amplitude.getInstance() //[tl! --:1]
  .initialize(getApplicationContext(), "YOUR_API_KEY");
Amplitude client =  new Amplitude(new Configuration( //[tl! ++:3]
    apiKey = "YOUR_API_KEY",
    context = getApplicationContext()
));
```
{{/partial:tab}}
{{/partial:tabs}}

### Configuration

The latest Android SDK configuration comes in a different shape. Some configurations are no longer supported.

| com.amplitude:android-sdk      | com.amplitude:analytics-android                                                                                                                                                                                                  |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `eventUploadPeriodMillis`      | `flushIntervalMillis`                                                                                                                                                                                                            |
| `eventUploadThreshold`         | `flushQueueSize`                                                                                                                                                                                                                 |
| `eventUploadMaxBatchSize`      | Not supported                                                                                                                                                                                                                    |
| `eventMaxCount`                | Not supported                                                                                                                                                                                                                    |
| `identifyBatchIntervalMillis`  | `identifyBatchIntervalMillis`                                                                                                                                                                                                    |
| `flushEventsOnClose`           | `flushEventsOnClose`                                                                                                                                                                                                             |
| `optOut`                       | `optOut`                                                                                                                                                                                                                         |
| `trackingSessionEvents`        | `trackingSessionEvents`                                                                                                                                                                                                          |
| `sessionTimeoutMillis`         | Not supported. The maintenance SDK disables foreground tracking by default and uses `sessionTimeoutMillis` when foreground tracking is disabled. However, the latest SDK enables foreground tracking and it's not configurable. |
| `minTimeBetweenSessionsMillis` | `minTimeBetweenSessionsMillis`                                                                                                                                                                                                   |
| `serverUrl`                    | `serverUrl` defaults to `https://api2.amplitude.com/2/httpapi` while the maintenance SDK defaults to `https://api2.amplitude.com/`                                                                                               |
| `useDynamicConfig`             | Not supported                                                                                                                                                                                                                    |

### Send events

The `logEvent()` API maps to `track()`. The `eventProperties` is `JSONObject` type in the maintenance SDK while it's `Map<String, Any?>` type in the latest SDK. 

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
import org.json.JSONException //[tl! --:1]
import org.json.JSONObject

val eventProperties = JSONObject() //[tl! --:7]
try {
  eventProperties.put("buttonColor", "primary")
} catch (e: JSONException) {
  System.err.println("Invalid JSON")
  e.printStackTrace()
}
client.logEvent("Button Clicked", eventProperties)

client.track( //[tl! ++:3]
    "Button Clicked",
    mutableMapOf<String, Any?>("buttonColor" to "primary")
)
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
import org.json.JSONException; //[tl! --:1]
import org.json.JSONObject;

JSONObject eventProperties = new JSONObject(); //[tl! --:7]
try {
  eventProperties.put("buttonColor", "primary");
} catch (JSONException e) {
  System.err.println("Invalid JSON");
  e.printStackTrace();
}
client.logEvent("Button Clicked", eventProperties);

client.track("Button Clicked", new HashMap() {{ //[tl! ++:2]
    put("buttonColor", "primary");
}});
```
{{/partial:tab}}
{{/partial:tabs}}

### Flush events

Unset events are stored in a buffer and flushed (sent) on app close by default. Events are flushed based on which criteria is met first: `flushIntervalMillis` or `flushQueueSize`.

You can disable flushing by setting `flushEventsOnClose` to `false`.

You can also force the SDK to upload unsent events. The `uploadEvents()` API maps to `flush()`.

```kotlin
client.uploadEvents() //[tl! --]
client.flush() //[tl! ++]
```

### Set user properties

The `identify()` API remains the same

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
val identify = Identify()
identify.set("location", "LAX")
client.identify(identify)
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
Identify identify = new Identify();
identify.set("location", "LAX");
client.identify(identify);
```
{{/partial:tab}}
{{/partial:tabs}}

### Set group properties

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
val groupType = "plan"
val groupName = "enterprise"

val identify = Identify().set("key", "value")
client.groupIdentify(groupType, groupName, identify)
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
String groupType = "plan";
Object groupName = "enterprise";

Identify identify = new Identify().set("key", "value");
client.groupIdentify(groupType, groupName, identify);
```
{{/partial:tab}}
{{/partial:tabs}}

### Track revenue

The `logRevenueV2()` API maps to `revenue()`.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
val revenue = Revenue()
revenue.productId = "com.company.productId"
revenue.price = 3
revenue.quantity = 2
client.logRevenueV2(revenue) //[tl! --]
client.revenue(revenue) //[tl! ++]
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
Revenue revenue = new Revenue()
revenue.setProductId("com.company.productId");
revenue.setPrice(3);
revenue.setQuantity(2); 
client.logRevenueV2(revenue); //[tl! --]
client.revenue(revenue); //[tl! ++]
```
{{/partial:tab}}
{{/partial:tabs}}

#### Revenue verification

The revenue verification logic is on Amplitude's backend. Revenue verification remains functional after migrating to the latest Android SDK.

## Advanced topics

{{partial:admonition type="warning" heading=""}}
The maintenance SDK uses an old SDK endpoint (`api2.amplitude.com`) which enforces no length limit for `deviceId` and `userId`. The latest SDK uses Amplitude's HTTP V2 API (`api2.amplitude.com/2/httpapi`) and requires identifiers to be at least 5 characters by default. When you migrate to the latest SDK, set `config.minIdLength` to a smaller value if you allowed identifiers with fewer than 5 characters.
{{/partial:admonition}}

Most of the behaviors of the latest SDK remain the same with the maintenance SDK. Refer to the advanced topics sections of the [maintenance SDK](/docs/sdks/analytics/android/android-sdk#advanced-topics) and the [latest SDK](/docs/sdks/analytics/android/android-kotlin-sdk) to learn more about a specific advanced topic.

## Data migration

Existing [maintenance SDK](/docs/sdks/analytics/android/android-sdk) data (events, user/device ID) are moved to the latest SDK by default. It can be disabled by setting `migrateLegacyData` to `false` in the [Configuration](#configuration). Learn more in [Github](https://github.com/amplitude/Amplitude-Kotlin/blob/main/android/src/main/java/com/amplitude/android/migration/RemnantDataMigration.kt#L9-L16).

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
amplitude = Amplitude(
    Configuration(
        ...
        migrateLegacyData = false,
    )
)
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
Configuration configuration = new Configuration("AMPLITUDE_API_KEY", getApplicationContext());
configuration.setMigrateLegacyData(false);

Amplitude amplitude = new Amplitude(configuration);
```
{{/partial:tab}}
{{/partial:tabs}}