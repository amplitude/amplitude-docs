---
id: 0d5a2d8a-7266-4442-807c-2f2f84fe1ae5
blueprint: react_native_sdk
title: 'Migrate to the latest React Native SDK'
sdk_status: current
article_type: migration
supported_languages:
  - js
  - ts
sdk_version_comparison:
  -
    cells:
      - Feature
      - 'Latest React Native SDK'
      - 'Maintenance React Native SDK'
  -
    cells:
      - Package
      - '[@amplitude/analytics-react-native](https://www.npmjs.com/package/@amplitude/analytics-react-native)'
      - '[@amplitude/react-native](https://www.npmjs.com/package/@amplitude/react-native)'
  -
    cells:
      - Structure
      - 'Mobile platforms (Android & iOS) utilize native app context modules for accessing system info, async storage for persistence.'
      - 'Wrapper of the iOS and Android SDK and Amplitude JavaScript SDK. Providing mappings from React Native to native SDK functions.'
  -
    cells:
      - 'Supported platforms'
      - 'iOS, Android, Web and Expo.'
      - 'iOS, Android, Web.'
  -
    cells:
      - Configuration
      - 'Configuration is implemented by Configuration object during initialize amplitude.'
      - 'Supports specific setter methods.'
  -
    cells:
      - 'Storage provider'
      - '`LocalStorage()` by default, if not enabled, use `MemoryStorage()`. Fully configurable.'
      - 'Depends on the Maintenance iOS, Maintenance Android and Maintenance Browser SDK storage.'
  -
    cells:
      - 'Logger provider'
      - 'Amplitude Logger. Fully customizable.'
      - 'Depends on the native iOS, Android, Amplitude JavaScript logger provider.'
  -
    cells:
      - Customization
      - Plugins
      - Middleware
  -
    cells:
      - 'Server endpoint'
      - 'HTTP V2 API'
      - 'HTTP V1 API'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718672648
source: 'https://www.docs.developers.amplitude.com/data/sdks/typescript-react-native/migration/'
---
Amplitude's latest React Native SDK (`@amplitude/analytics-react-native`) features a plugin architecture, built-in type definition and broader platform support.

The latest React Native SDK isn't fully backwards compatible with maintenance React Native SDK `@amplitude/react-native`. However, it will transfer user, device, and event data to the new SDK automatically in versions `v1.3.4` and above.

To migrate to `@amplitude/analytics-react-native`, update your dependencies and instrumentation.

## Terminology

* `@amplitude/react-native`: Maintenance React Native SDK
* `@amplitude/analytics-react-native`: Latest React Native SDK

## Dependency

Update package.json to uninstall the maintenance React Native SDK and install the latest React Native SDK.

```json
{
    "dependencies": {
      "@amplitude/react-native": "*" 
      "@amplitude/analytics-react-native": "^1" 
    }
}
```

## Instrumentation

Latest React Native SDK offers an API to instrument events. To migrate to it, you need to update a few calls. The following sections detail which calls have changed.

### Initialization

`getInstance()` in the maintenance SDK only accepts API key and has been removed. To initialize the SDK, call `init()`, with the user ID and configuration parameters.

```ts
- import { Amplitude } from '@amplitude/react-native'; 
+ import { init } from '@amplitude/analytics-react-native'; 

- Amplitude.getInstance().init(API_KEY) 
+ init(API_KEY, OPTIONAL_USER_ID, config); 
```

### Configuration

The latest React Native SDK instance accepts a configuration object during upon initialization that contains similar settings to the maintenance SDK.

|@amplitude/react-native|@amplitude/analytics-react-native|
|-|-|
| `enableCoppaControl()` | Refer to [COPPA](#coppa) section for more details |
| `disableCoppaControl()` | Refer to [COPPA](#coppa) section for more details |
| `setAdvertisingIdForDeviceId()` | No configuration to set ADID as device ID. But ADID is still tracked by default as `config.trackingOptions.adid` defaults to `true`. To learn more about how device ID is initialized [here](#device-id).  |
| `setAppSetIdForDeviceId()` | No configuration to set App Set ID as device ID. But the latest React Native SDK will track it in a newly released version soon. |
| `setOptOut()` | both `setOptOut()` and `config.optOut` are supported |
| `trackingSessionEvents()` | `config.trackingSessionEvents` |
| `setUseDynamicConfig()` | NOT SUPPORTED |
| `setMinTimeBetweenSessionsMillis()`| `config.sessionTimeout` |
| `setServerZone()` | `config.serverZone` |
| `setServerUrl()` | `config.serverUrl` |
| `setEventUploadMaxBatchSize()` | `config.flushQueueSize` |
| `setEventUploadPeriodMillis()` | `config.flushIntervalMillis` |
| `setEventUploadThreshold()` | `config.flushQueueSize` |
| `enableLogging()`| Logging is enabled and cannot be turned off. However, you can set `config.logLevel` and customize `config.loggerProvider` |
| `setLogLevel()`| `config.logLevel` |
| `addLogCallback()` | It's not fully supported but you can customize a logger by setting `config.loggerProvider`. |

### logEvent

The `logEvent()` API maps to `track()`.

```ts
import { Amplitude } from '@amplitude/react-native'; 
import { track } from '@amplitude/analytics-react-native'; 

Amplitude.getInstance().logEvent('Button Clicked', {buttonColor: 'primary'}); 
track('Button Clicked', { buttonColor: 'primary' }); 
```

### uploadEvents

The `uploadEvents()` API maps to `flush()`.

```ts
import { Amplitude } from '@amplitude/react-native'; 
import { flush } from '@amplitude/analytics-react-native'; 

Amplitude.getInstance().uploadEvents(); 
flush(); 
```

### identify

The `identify()` API and `Identify` type remain the same.

```ts
import { Amplitude, Identify } from '@amplitude/react-native'; 
import { Identify, identify } from '@amplitude/analytics-react-native'; 

const identifyObj = new Identify();
identifyObj.set('location', 'LAX');

Amplitude.getInstance().identify(identifyObj); 
identify(identifyObj); 
```

### setUserProperties

The `setUserProperties()` API has been removed, but you can now use the unified `identify()` API to add user properties.

```ts
import { Amplitude } from '@amplitude/react-native'; 
import { Identify, identify } from '@amplitude/analytics-react-native'; 

Amplitude.getInstance().setUserProperties({ 
    membership, "paid",
    payment, "bank",
})
const identifyObj = new amplitude.Identify() 
identifyObj
    .set("membership", "paid")
    .set("payment", "bank")
amplitude.identify(identifyObj)
```

### clearUserProperties

The `clearUserProperties()` API has been removed, but you can now use the unified `identify()` API to remove user properties.

```ts
import { Amplitude } from '@amplitude/react-native'; 
import { Identify, identify } from '@amplitude/analytics-react-native'; 

Amplitude.getInstance().clearUserProperties(); 
const identifyObj = new amplitude.Identify() 
identifyObj.clearAll()
amplitude.identify(identifyObj)
```

### setUserId

{{partial:admonition type="warning" heading=""}}
The maintenance SDK uses an old SDK endpoint (`api2.amplitude.com`) which enforces no length limit for `deviceId` and `userId`. The latest SDK uses Amplitude's HTTP V2 API (`api2.amplitude.com/2/httpapi`) and requires identifiers to be at least 5 characters by default. When you migrate to the latest SDK, set `config.minIdLength` to a smaller value if you allowed identifiers with fewer than 5 characters.
{{/partial:admonition}}

The `setUserId()` API remains the same.

```ts
import { Amplitude } from '@amplitude/react-native'; 
import { setUserId } from '@amplitude/analytics-react-native' 

Amplitude.getInstance().setUserId("test_user_id"); 
setUserId('user@amplitude.com'); 
```

### groupIdentify

You can now make an identify call without calling `getInstance()`.

```ts
import { Amplitude } from '@amplitude/react-native'; 
import { Identify, groupIdentify } from '@amplitude/analytics-react-native';  

const groupType = 'plan';
const groupName = 'enterprise';
const identifyObj = new Identify()
identifyObj.set('key1', 'value1');

Amplitude.getInstance().groupIdentify(groupType, groupName, identifyObj); 
groupIdentify(groupType, groupName, identifyObj); 
```

### logRevenue

The `logRevenue()` API maps to `revenue()`. `receipt` and `receiptSignature` is not supported.

```ts
import { Amplitude } from '@amplitude/react-native';  
import { Revenue, revenue } from '@amplitude/analytics-react-native'; 

const userProperties = { 
    price: 3,
    productId: 'com.company.productId',
    quantity: 2,
    revenueType: 'productRevenue',
    eventProperties: {
        key: 'value',
    },
};

ampInstance.logRevenue(userProperties); 

const event = new Revenue() 
    .setPrice(3)
    .setProductId('com.company.productId')
    .setQuantity(2)
    .setRevenueType('productRevenue')
    .setEventProperties({
        key: 'value',
    })

revenue(event); 
```

You can also use `setRevenue(6)` instead of `setPrice(3)` and `setQuantity(2)`.

## Advanced topics

### Device ID

As the maintenance React Native SDK is a wrapper of the maintenance iOS, maintenance Android SDK and maintenance Browser SDK and provides mappings from React Native to native SDK functions, device ID generation follows the native SDK of each platform. Learn more about device ID lifecycle of [maintenance iOS SDK](/docs/sdks/analytics/ios/ios-sdk#device-id-lifecycle) and [maintenance Android SDK](/docs/sdks/analytics/android/android-sdk#device-id-lifecycle). You can also call `setAdvertisingIdForDeviceId()` or `setAppSetIdForDeviceId()` to set ADID or App Set ID as device ID.

The latest React Native SDK initializes the device ID in the following order, with the device ID being set to the first valid value encountered:

1. Device ID of in the configuration on initialization
2. "deviceId" value from URL param, for example `http://example.com/?deviceId=123456789`. If it runs on Web.
3. Device ID in cookie storage.
4. A randomly generated 36-character UUID

### Advertising ID

The maintenance React Native SDK supports setting an advertising ID as device ID by `setAdvertisingIdForDeviceId()` or `setAppSetIdForDeviceId()`. The latest React Native SDK tracks ADID by default as `config.trackingOptions.adid` defaults to `true`. However, the latest React Native SDK doesn't support App Set ID, IDFA, or IDFV.

### COPPA 

You can enable COPPA control by `enableCoppaControl()` in maintenance React Native SDK. The latest React Native SDK doesn't support that API but you can still enable COPPA using `config.trackingOptions` or an [Enrichment Plugin](/docs/sdks/analytics/react-native/react-native-sdk#enrichment-type-plugin-example) to remove identifying information from being tracked.

* Learn how to enable IDFA, IDFV, ADID, and AppSetId in the [Advertising Identifiers](/docs/sdks/analytics/react-native/react-native-sdk#advertising-identifiers) documentation.
* You can turn off IP address tracking by setting `config.trackingOptions.ipAddress` to `false`
* You can use an [enrichment Plugin](/docs/sdks/analytics/react-native/react-native-sdk#enrichment-type-plugin-example) to delete `city` in the payload, or any other identifying information.
* Location (latitude and longitude) isn't tracked

### Session events

The maintenance React Native SDK supports automatically log start and end events by calling `trackingSessionEvents(true)`. In the latest React Native SDK, you can do the same by setting `config.trackingSessionEvents` to true. Events logged within the same session have the same session ID and Amplitude groups events together by session.

## Data migration

Starting [v1.3.4](https://github.com/amplitude/Amplitude-TypeScript/releases/tag/%40amplitude%2Fanalytics-react-native%401.3.4), existing [maintenance SDK](/docs/sdks/analytics/react-native/react-native-sdk-maintenance) data (events, user/device ID) are moved to the latest SDK by default. It can be disabled by setting `migrateLegacyData` to `false` in the [Configuration](../#configuration).

```typescript
init(API_KEY, OPTIONAL_USER_ID, {
  migrateLegacyData: false,
})
```