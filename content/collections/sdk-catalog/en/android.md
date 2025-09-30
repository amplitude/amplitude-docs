---
id: c3197ac0-3df0-447b-b632-e1ec4b6e88c9
blueprint: sdk-catalog
title: Android
source: 'https://www.docs.developers.amplitude.com/data/sdks/android-kotlin/'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
template: sdk-landing
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1715798855
logo: icons/android.svg
exclude_from_sitemap: false
---
The Kotlin Android SDK lets you send events to Amplitude.

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
| `trackingSessionEvents` | `Boolean`. Deprecated. Automatic tracking of "Start Session" and "End Session" events that count toward event volume. | `false` |
| `defaultTracking` | `DefaultTrackingOptions`. Options to control the default events tracking. | Check [Tracking default events](#tracking-default-events) |
| `minTimeBetweenSessionsMillis` | `Long`. The amount of time for session timeout. The value is in milliseconds. | `300000` |
| `serverUrl` | `String`. The server url events upload to. | `https://api2.amplitude.com/2/httpapi` |
| `serverZone` | `ServerZone.US` or `ServerZone.EU`. The server zone to send to, will adjust server url based on this config. | `ServerZone.US` |
| `useBatch` | `Boolean` Whether to use batch api. | `false` |
| `useAdvertisingIdForDeviceId` | `Boolean`. Whether to use advertising id as device id. Please check [here](../android-kotlin/#advertiser-id) for required module and permission. | `false` |
| `useAppSetIdForDeviceId` | `Boolean`. Whether to use app set id as device id. Please check [here](../android-kotlin/#app-set-id) for required module and permission. | `false` |
| `trackingOptions` | `TrackingOptions`. Options to control the values tracked in SDK. | `enable` |
| `enableCoppaControl` | `Boolean`. Whether to enable COPPA control for tracking options. | `false` |
| `instanceName` | `String`. The name of the instance. Instances with the same name will share storage and identity. For isolated storage and identity use a unique `instanceName` for each instance. | `$default_instance` |
| `migrateLegacyData` | `Boolean`. Available in `1.9.0`+. Whether to migrate [maintenance Android SDK](../android) data (events, user/device ID). Learn more [here](https://github.com/amplitude/Amplitude-Kotlin/blob/main/android/src/main/java/com/amplitude/android/migration/RemnantDataMigration.kt#L9-L16). | `true` |
| `offline` | `Boolean | AndroidNetworkConnectivityCheckerPlugin.Disabled`. Whether the SDK is connected to network. Learn more [here](./#offline-mode) | `false` |
| `storageProvider` | `StorageProvider`. Implements `StorageProvider` interface to store events. | `AndroidStorageProvider` |
| `identifyInterceptStorageProvider` | `StorageProvider`. Implements `StorageProvider` interface for identify event interception and volume optimization. | `AndroidStorageProvider` |
| `identityStorageProvider` | `IdentityStorageProvider`. Implements `IdentityStorageProvider` to store user id and device id. | `FileIdentityStorageProvider` |
| `loggerProvider` | `LoggerProvider`. Implements `LoggerProvider` interface to emit log messages to desired destination. | `AndroidLoggerProvider` |
| `newDeviceIdPerInstall` | Whether to generate different a device id every time when the app is installed regardless of devices. It's legacy configuration only to keep compatible with the old Android SDK. It works the same as `useAdvertisingIdForDeviceId`. | `false` |
| `locationListening` | Whether to enable Android location service. Learn more [here](./#location-tracking). | `true` |

{{/partial:collapse}}

### Configure batching behavior

To support high-performance environments, the SDK sends events in batches. Every event logged by theÂ `track`Â method is queued in memory. Events are flushed in batches in background. You can customize batch behavior with `flushQueueSize` and `flushIntervalMillis`. By default, the `serverUrl` is `https://api2.amplitude.com/2/httpapi`. For customers who want to send large batches of data at a time, set `useBatch` to `true` to set `setServerUrl` to batch event upload API `https://api2.amplitude.com/batch`. Both the regular mode and the batch mode use the same events upload threshold and flush time intervals.

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