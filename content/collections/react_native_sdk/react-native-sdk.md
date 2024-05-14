---
id: 1962c691-4ecd-4b0f-bff9-1807438bc582
blueprint: react_native_sdk
title: 'React Native SDK'
sdk_status: current
article_type: core
supported_languages:
  - ts
github_link: 'https://github.com/amplitude/Amplitude-TypeScript/tree/v1.x/packages/analytics-react-native'
releases_url: 'https://github.com/amplitude/Amplitude-TypeScript/releases?q=analytics-react-native&expanded=true'
bundle_url: 'https://www.npmjs.com/package/@amplitude/analytics-react-native'
api_reference_url: 'https://amplitude.github.io/Amplitude-TypeScript/'
shields_io_badge: 'https://img.shields.io/npm/v/@amplitude/analytics-react-native'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1715723218
ampli_article: 4029875a-0e71-4ad0-869b-289dea48b625
migration_guide:
  - 0d5a2d8a-7266-4442-807c-2f2f84fe1ae5
---
The React Native SDK lets you send events to Amplitude.

{{partial:admonition type="note" heading="React Native support"}}
Since [React-Native](https://github.com/facebook/react-native) doesn't provide stable release versioning, ensuring backward compatibility is challenging, especially as React-Native itself isn't backward compatible and might introduce breaking changes across different versions. You can check [here](https://github.com/react-native-community/cli#compatibility) for more details. Therefore, Amplitude supports only the latest version of React-Native.
{{/partial:admonition}}

## Compatibility matrix

The following matrix lists the support for Amplitude React Native SDK version for [different versions of React Native and React Native CLI](https://github.com/react-native-community/cli).

| @amplitude/analytics-react-native | react-native     |Gradle|Android Gradle Plugin|
|-----------------------------------|------------------|---|---|
| >= 1.4.0                          | >= 0.68          | 7.5.1+ | 7.2.1+ |
| >= 1.0.0, <= 1.3.6                | >= 0.61, <= 0.70 | 3.5.3+ | 3.5.3+ |

Learn more about the Android [Gradle Plugin compatibility](https://developer.android.com/studio/releases/gradle-plugin#updating-gradle).


## Install the SDK

To get started with using Amplitude React Native SDK, install the package to your project with npm. You must also install `@react-native-async-storage/async-storage` for the SDK to work as expected.

{{partial:admonition type="tip" heading="Web and Expo support"}}
This SDK can be used for react-native apps built for web or built using [Expo](https://expo.dev/) (Expo Go not yet supported).
{{/partial:admonition}}

{{partial:tabs tabs="npm, yarn, expo"}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/analytics-react-native
npm install @react-native-async-storage/async-storage
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/analytics-react-native
yarn add @react-native-async-storage/async-storage
```
{{/partial:tab}}
{{partial:tab name="expo"}}
```bash
expo install @amplitude/analytics-react-native
expo install @react-native-async-storage/async-storage
```
{{/partial:tab}}
{{/partial:tabs}}

Install the native modules to run the SDK on iOS.

```bash
cd ios
pod install
```

## Initialize the SDK

Initialization is necessary before any instrumentation is done. The API key for your Amplitude project is required. Optionally, a user ID and config object can be passed in this call. The SDK can be used anywhere after it's initialized anywhere in an application.

```ts
import { init } from '@amplitude/analytics-react-native';

// Option 1, initialize with API_KEY only
init(API_KEY);

// Option 2, initialize including user ID if it's already known
init(API_KEY, 'user@amplitude.com');

// Option 3, initialize including configuration
init(API_KEY, 'user@amplitude.com', {
  disableCookies: true, // Disables the use of browser cookies
});
```

## Configure the SDK

{{partial:admonition type="note" heading="Web vs. mobile"}}
The configuration of the SDK is shared across web and mobile platforms, but many of these options simply don't apply when running the SDK on native platforms (for example iOS, Android). For example, when the SDK is run on web, the identity is stored in the browser cookie by default, whereas on native platforms identity is stored in async storage.
{{/partial:admonition}}

{{partial:collapse name="Configuration options"}}
| Name  | Description | Default Value |
| --- | --- | --- |
|`instanceName`| `string`. The instance name. | `$default_instance` |
|`flushIntervalMillis`| `number`. Sets the interval of uploading events to Amplitude in milliseconds. | 1,000 (1 second) |
|`flushQueueSize`| `number`. Sets the maximum number of events that are batched in a single upload attempt. | 30 events |
|`flushMaxRetries`| `number`. Sets the maximum number of retries for failed upload attempts. This is only applicable to retryable errors. | 5 times.|
|`logLevel` | `LogLevel.None` or `LogLevel.Error` or `LogLevel.Warn` or `LogLevel.Verbose` or `LogLevel.Debug`. Sets the log level. | `LogLevel.Warn` |
|`loggerProvider `| `Logger`. Sets a custom `loggerProvider` class from the Logger to emit log messages to desired destination. | `Amplitude Logger` |
|`minIdLength`|  `number`. Sets the minimum length for the value of `userId` and `deviceId` properties. | `5` |
|`optOut` | `boolean`. Sets permission to track events. Setting a value of `true` prevents Amplitude from tracking and uploading events. | `false` |
|`serverUrl`| `string`. Sets the URL where events are upload to. | `https://api2.amplitude.com/2/httpapi` | 
|`serverZone`| `EU` or  `US`. Sets the Amplitude server zone. Set this to `EU` for Amplitude projects created in `EU` data center. | `US` |
|`useBatch`| `boolean`. Sets whether to upload events to Batch API instead of the default HTTP V2 API or not. | `false` |
|`appVersion` | `string`. Sets an app version for events tracked. This can be the version of your application. For example: "1.0.0" | `undefined` |
|`deviceId` | `string`. Sets an identifier for the device running your application. | `UUID()` |
|`cookieExpiration` | `number`. Sets expiration of cookies created in days. | 365 days |
|`cookieSameSite` | `string`. Sets `SameSite` property of cookies created. | `Lax` |
|`cookieSecure` | `boolean`. Sets `Secure` property of cookies created. | `false` |
|`cookieStorage` | `Storage<UserSession>`. Sets a custom implementation of `Storage<UserSession>` to persist user identity. | `MemoryStorage<UserSession>` |
|`cookieUpgrade`| `boolean`. Sets upgrading from cookies created by [maintenance Browser SDK](/data/sdks/javascript/). If true, new Browser SDK deletes cookies created by maintenance Browser SDK. If false, Browser SDK keeps cookies created by maintenance Browser SDK. | `true` |
|`disableCookies`| `boolean`. Sets permission to use cookies. If value is `true`, localStorage API is used to persist user identity. | The cookies is enable by default. |
|`domain` | `string`. Sets the domain property of cookies created. | `undefined` |
|`partnerId` | `string`. Sets partner ID. Amplitude requires the customer who built an event ingestion integration to add the partner identifier to `partner_id`. | `undefined` |
|`sessionTimeout` | `number`. Sets the period of inactivity from the last tracked event before a session expires in milliseconds. | 1,800,000 milliseconds (30 minutes) |
|`userId` | `number`. Sets an identifier for the user being tracked. Must have a minimum length of 5 characters unless overridden with the `minIdLength` option. | `undefined` |
|`trackingOptions`| `TrackingOptions`. Configures tracking of additional properties. Please refer to `Optional tracking` section for more information. | Enable all tracking options by default. |
|`storageProvider`| `Storage<Event[]>`. Implements a custom `storageProvider` class from Storage. | `MemoryStorage` |
|`trackingSessionEvents`| `boolean`. Whether to automatically log start and end session events corresponding to the start and end of a user's session. | `false` |
|`migrateLegacyData`| `boolean`. Available in `1.3.4`+. Whether to migrate [maintenance SDK](../react-native) data (events, user/device ID). | `true` |

{{/partial:collapse}}

### Configure batching behavior

To support high-performance environments, the SDK sends events in batches. Every event logged by the `track` method is queued in memory. Events are flushed in batches in background. You can customize batch behavior with `flushQueueSize` and `flushIntervalMillis`. By default, the serverUrl will be `https://api2.amplitude.com/2/httpapi`. For customers who want to send large batches of data at a time, set `useBatch` to `true` to set `setServerUrl` to batch event upload API `https://api2.amplitude.com/batch`. Both the regular mode and the batch mode use the same events upload threshold and flush time intervals.

```ts
import * as amplitude from '@amplitude/analytics-react-native';

amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  // Events queued in memory will flush when number of events exceed upload threshold
  // Default value is 30
  flushQueueSize: 50, 
  // Events queue will flush every certain milliseconds based on setting
  // Default value is 10000 milliseconds
  flushIntervalMillis: 20000,
});
```

### EU data residency

You can configure the server zone when initializing the client for sending data to Amplitude's EU servers. The SDK sends data based on the server zone if it's set.

{{partial:admonition type="note" heading=""}}
For EU data residency, the project must be set up inside Amplitude EU. You must initialize the SDK with the API key from Amplitude EU.
{{/partial:admonition}}

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  serverZone: 'EU',
});
```

### Debugging

You can control the level of logs printed to the developer console.

- 'None': Suppresses all log messages.
- 'Error': Shows error messages only.
- 'Warn': Shows error messages and warnings. This is the default value if `logLevel` isn't explicitly specified.
- 'Verbose': Shows informative messages.
- 'Debug': Shows error messages, warnings, and informative messages that may be useful for debugging, including the function context information for all SDK public method invocations. This logging mode is only suggested to be used in development phases.

Set the log level by configuring the `logLevel` with the level you want.

```ts
amplitude.init(AMPLITUDE_API_KEY, OPTIONAL_USER_ID, {
  logLevel: amplitude.Types.LogLevel.Warn,
});
```

The default logger outputs log to the developer console. You can provide your own logger implementation based on the `Logger` interface for any customization purpose. For example, collecting any error messages from the SDK in a production environment.

Set the logger by configuring the `loggerProvider` with your own implementation.

```ts
amplitude.init(AMPLITUDE_API_KEY, OPTIONAL_USER_ID, {
  loggerProvider: new MyLogger(),
});
```

#### Debug mode
Enable the debug mode by setting the `logLevel` to "Debug", for example:

```ts
amplitude.init(AMPLITUDE_API_KEY, OPTIONAL_USER_ID, {
  logLevel: amplitude.Types.LogLevel.Debug,
});
```

The default logger outputs extra function context information to the developer console when invoking any SDK public method, including:

- 'type': Category of this context, for example "invoke public method".
- 'name': Name of invoked function, for example "track".
- 'args': Arguments of the invoked function.
- 'stacktrace': Stacktrace of the invoked function.
- 'time': Start and end timestamp of the function invocation.
- 'states': Useful internal states snapshot before and after the function invocation.

## Track events

{{partial:admonition type="note" heading=""}}
This SDK uses the [Http V2](/apis/http-v2) API and follows the same constraints for events. Make sure that all events logged in the SDK have the `event_type` field and at least one of `deviceId`  (included by default) or `userId`, and follow the Http API's constraints on each of those fields.

To prevent instrumentation issues, device IDs and user IDs must be strings with a length of 5 characters or more. If an event contains a device ID or user ID that's too short, the ID value is removed from the event. If the event doesn't have a `userId` or `deviceId` value, the upload may be rejected with a 400 status. Override the default minimum length of 5 characters by setting the `minIdLength` config option.
{{/partial:admonition}}

Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to note.

```ts
import { track } from '@amplitude/analytics-react-native';

// Track a basic event
track('Button Clicked');

// Track events with optional properties
const eventProperties = {
  buttonColor: 'primary',
};
track('Button Clicked', eventProperties);
```

### Track events to multiple projects

If you need to log events to multiple Amplitude projects, you'll need to create separate instances for each Amplitude project. Then, pass the instance variables to wherever you want to call Amplitude. Each instance allows for independent `apiKeys`, `userIds`, `deviceIds`, and settings.

```ts
import * as amplitude from '@amplitude/analytics-react-native';

const defaultInstance = amplitude.createInstance();
defaultInstance.init(API_KEY_DEFAULT);

const envInstance = amplitude.createInstance();
envInstance.init(API_KEY_ENV, {
  instanceName: 'env',
});
```

## User properties

User properties help you understand your users at the time they performed some action within your app such as their device details, their preferences, or language.

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties. The operations are declared via a provided Identify interface. You can chain multiple operations together in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.

{{partial:admonition type="note" heading=""}}
If the Identify call is sent after the event, the results of operations will be visible immediately in the dashboard user’s profile area, but it won't appear in chart result until another event is sent after the Identify call. The identify call only affects events going forward. More details [here](/data/user-properties-and-events).
{{/partial:admonition}}

### Identify

The Identify object provides controls over setting user properties. An Identify object must first be instantiated, then Identify methods can be called on it, and finally the client will make a call with the Identify object.

```ts
import { identify, Identify } from '@amplitude/analytics-react-native';

const identifyObj = new Identify();
identify(identifyObj);
```

#### Identify.set

This method sets the value of a user property. For example, you can set a role property of a user.

```ts
import { Identify, identify } from '@amplitude/analytics-react-native';

const identifyObj = new Identify();
identifyObj.set('location', 'LAX');

identify(identifyObj);
```

#### Identify.setOnce

This method sets the value of a user property only once. Subsequent calls using setOnce() will be ignored. For example, you can set an initial login method for a user and since only the initial value is tracked, setOnce() ignores subsequent calls.

```ts
import { Identify, identify } from '@amplitude/analytics-react-native';

const identifyObj = new Identify();
identifyObj.setOnce('initial-location', 'SFO');

identify(identifyObj);
```

#### Identify.add

This method increments a user property by some numerical value. If the user property doesn't have a value set yet, it will be initialized to 0 before being incremented. For example, you can track a user's travel count.

```ts
import { Identify, identify } from '@amplitude/analytics-react-native';

const identifyObj = new Identify();
identifyObj.add('travel-count', 1);

identify(identifyObj);
```

#### Arrays in user properties

Arrays can be used as user properties. You can directly set arrays or use `prepend`, `append`, `preInsert` and `postInsert` to generate an array.

#### `Identify.prepend`

This method prepends a value or values to a user property array. If the user property doesn't have a value set yet, it will be initialized to an empty list before the new values are prepended.

```ts
import { Identify, identify } from '@amplitude/analytics-react-native';

const identifyObj = new Identify();
identifyObj.prepend('visited-locations', 'LAX');

identify(identifyObj);
```

#### `Identify.append`

This method appends a value or values to a user property array. If the user property doesn't have a value set yet, it will be initialized to an empty list before the new values are prepended.

```ts
import { Identify, identify } from '@amplitude/analytics-react-native';

const identifyObj = new Identify();
identifyObj.append('visited-locations', 'SFO');

identify(identifyObj);
```

#### `Identify.preInsert`

This method pre-inserts a value or values to a user property if it doesn't exist in the user property yet. Pre-insert means inserting the value at the beginning of a given list. If the user property doesn't have a value set yet, it will be initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, it will be no operation.

```ts
import { Identify, identify } from '@amplitude/analytics-react-native';

const identifyObj = new Identify();
identifyObj.preInsert('unique-locations', 'LAX');

identify(identifyObj);
```

#### Identify.postInsert

This method post-inserts a value or values to a user property if it doesn't exist in the user property yet. Post-insert means inserting the value at the end of a given list. If the user property doesn't have a value set yet, it will be initialized to an empty list before the new values are post-inserted. If the user property has an existing value, it will be no operation.

```ts
import { Identify, identify } from '@amplitude/analytics-react-native';

const identifyObj = new Identify();
identifyObj.postInsert('unique-locations', 'SFO');

identify(identifyObj);
```

#### Identify.remove

This method removes a value or values to a user property if it exists in the user property. Remove means remove the existing values from the given list. If the item doesn't exist in the user property, it will be no operation.

```ts
import { Identify, identify } from '@amplitude/analytics-react-native';

const identifyObj = new Identify();
identifyObj.remove('unique-locations', 'JFK')

identify(identifyObj);
```

### User groups

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, then the count includes the group.

For example, you want to group your users based on what organization they're in by using an 'orgId'. Joe is in 'orgId' '10', and Sue is in 'orgId' '15'. Sue and Joe both perform a certain event. You can query their organizations in the Event Segmentation Chart.

When setting groups, define a `groupType` and `groupName`. In the previous example, 'orgId' is the `groupType` and '10' and '15' are the values for `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'.

Setting a group also sets the `groupType:groupName` as a user property, and overwrites any existing `groupName` value set for that user's groupType, and the corresponding user property value. `groupType` is a string, and `groupName` can be either a string or an array of strings to indicate that a user is in multiple groups.

{{partial:admonition type="example" heading=""}}
If Joe is in 'orgId' '15', then the `groupName` would be '15'.

```ts
import { setGroup } from '@amplitude/analytics-react-native';

// set group with single group name
setGroup('orgId', '15');
```

If Joe is in 'sport' 'tennis' and 'soccer', then the `groupName` would be '["tennis", "soccer"]'.

```ts
import { setGroup } from '@amplitude/analytics-react-native';

// set group with multiple group names
setGroup('sport', ['soccer', 'tennis']);
```
{{/partial:admonition}}

You can also set **event-level groups** by passing an `Event` Object with `groups` to `track`. With event-level groups, the group designation applies only to the specific event being logged, and doesn't persist on the user unless you explicitly set it with `setGroup`.

```ts
import { track } from '@amplitude/analytics-react-native';

track({
  event_type: 'event type',
  event_properties: { eventPropertyKey: 'event property value' },
  groups: { 'orgId': '15' }
});
```

## Group properties

Use the Group Identify API to set or update the properties of particular groups. These updates only affect events going forward.

The `groupIdentify()` method accepts a group type and group name string parameter, as well as an Identify object that will be applied to the group.

```ts
import { Identify, groupIdentify } from '@amplitude/analytics-react-native';

const groupType = 'plan';
const groupName = 'enterprise';
const event = new Identify()
event.set('key1', 'value1');

groupIdentify(groupType, groupName, identify);
```

## Track revenue

The preferred method of tracking revenue for a user is to use `revenue()` in conjunction with the provided Revenue interface. Revenue instances will store each revenue transaction and allow you to define several special revenue properties (such as "revenueType", "productIdentifier", etc.) that are used in Amplitude's Event Segmentation and Revenue LTV charts. These Revenue instance objects are then passed into `revenue()` to send as revenue events to Amplitude. This lets automatically display data relevant to revenue in the platform. You can use this to track both in-app and non-in-app purchases.

To track revenue from a user, call revenue each time a user generates revenue. For example, 3 units of a product were purchased at $3.99.

```ts
import { Revenue, revenue } from '@amplitude/analytics-react-native';

const event = new Revenue()
  .setProductId('com.company.productId')
  .setPrice(3.99)
  .setQuantity(3);

revenue(event);
```

### Revenue interface

|Name | Description |
|-----|-------|
|`product_id` | Optional. String. An identifier for the product. Amplitude recommends something like the Google Play Store product ID. Defaults to null. |
|`quantity` | Required. Int. The quantity of products purchased. Note: revenue = quantity * price. Defaults to 1|
|`price` | Required. Double. The price of the products purchased, and this can be negative. Note: revenue = quantity * price. Defaults to null. |
|`revenue_type` | Optional, but required for revenue verification. String. The revenue type (for example tax, refund, income).  Defaults to null.|
|`receipt`| Optional. String. The receipt identifier of the revenue. Defaults to null|
|`receipt_sig`| Optional, but required for revenue verification. String. The receipt signature of the revenue. Defaults to null.|
|`properties`| Optional. JSONObject. An object of event properties to include in the revenue event. Defaults to null.

## Flush the event buffer

The `flush` method triggers the client to send buffered events.

```typescript
import { flush } from '@amplitude/analytics-react-native';

flush();
```

By default, `flush` is called automatically in an interval, if you want to flush the events altogether, you can control the async flow with the optional Promise interface, for example:

```typescript
await init(AMPLITUDE_API_KEY).promise;
track('Button Clicked');
await flush().promise;
```

## Custom user ID

If your app has its login system that you want to track users with, you can call `setUserId` at any time.

TypeScript

```ts
import { setUserId } from '@amplitude/analytics-react-native';

setUserId('user@amplitude.com');
```

You can also assign the User ID as an argument to the init call.

```ts
import { init } from '@amplitude/analytics-react-native';

init(API_KEY, 'user@amplitude.com');
```

## Custom session ID

You can assign a new Session ID using `setSessionId`. When setting a custom session ID, make sure the value is in milliseconds since epoch (Unix Timestamp).

TypeScript

```ts
import { setSessionId } from '@amplitude/analytics-react-native';

setSessionId(Date.now());
```

## Custom device ID

If your app has its login system that you want to track users with, you can call `setUserId` at any time.

You can assign a new device ID using `deviceId`. When setting a custom device ID, make sure the value is sufficiently unique. A UUID is recommended.

```ts
import { setDeviceId } from '@amplitude/analytics-react-native';
const { uuid } = require('uuidv4');

setDeviceId(uuid());
```

## Reset when a user logs out

`reset` is a shortcut to anonymize users after they log out, by:

- setting `userId` to `undefined`
- setting `deviceId` to a new UUID value

With an undefined `userId` and a completely new `deviceId`, the current user would appear as a brand new user in dashboard.

```ts
import { reset } from '@amplitude/analytics-react-native';

reset();
```

## Opt users out of tracking

You can turn off logging for a given user by setting `setOptOut` to `true`.

```ts
import { setOptOut } from '@amplitude/analytics-react-native';

setOptOut(true);
```

No events are saved or sent to the server while `setOptOut` is enabled, and the setting persists across page loads. 

Re-enable logging by setting `setOptOut` to `false`.

```ts
import { setOptOut } from '@amplitude/analytics-react-native';

setOptOut(false);
```

## Optional tracking

By default, the SDK tracks these properties automatically. You can override this behavior by passing a configuration called `trackingOptions` when initializing the SDK, setting the appropriate options to false.

| Tracking Options | Default |
| --- | --- |
| `adid` | `true` |
| `carrier` | `true` |
| `deviceManufacturer` | `true` |
| `deviceModel` | `true` |
| `ipAddress` | `true` |
| `language` | `true` |
| `osName` | `true` |
| `osVersion` | `true` |
| `platform` | `true` |

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  trackingOptions: {
    adid: false,
    appSetId: false,
    carrier: false,
    deviceManufacturer: false,
    deviceModel: false,
    ipAddress: false,
    idfv: false,
    language: false,
    osName: false,
    osVersion: false,
    platform: false,
  },
});
```

## Callback

All asynchronous APIs are optionally awaitable through a Promise interface. This also serves as a callback interface.

```ts
import { track } from '@amplitude/analytics-react-native';

// Using async/await
const results = await track('Button Clicked').promise;
result.event; // {...} (The final event object sent to Amplitude)
result.code; // 200 (The HTTP response status code of the request.
result.message; // "Event tracked successfully" (The response message)

// Using promises
track('Button Clicked').promise.then((result) => {
  result.event; // {...} (The final event object sent to Amplitude)
  result.code; // 200 (The HTTP response status code of the request.
  result.message; // "Event tracked successfully" (The response message)
});
```

## Plugins

Plugins allow you to extend Amplitude SDK's behavior by, for example, modifying event properties (enrichment type) or sending to third-party APIs (destination type). A plugin is an object with methods `setup()` and `execute()`.

### add

The `add` method adds a plugin to Amplitude. Plugins can help processing and sending events.

```typescript
import { add } from '@amplitude/analytics-react-native';

add(new Plugin());
```

### remove

The `remove` method removes the given plugin name from the client instance if it exists.

```typescript
import { remove } from '@amplitude/analytics-react-native';

remove(plugin.name);
```

### Plugin setup

This method contains logic for preparing the plugin for use and has config as a parameter. The expected return value is undefined. A typical use for this method, is to copy configuration from config or instantiate plugin dependencies. This method is called when the plugin is registered to the client via `client.add()`.

### Plugin.execute

This method contains the logic for processing events and has event as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event; while if used as a destination type plugin, the expected return value is a map with keys: `event` (BaseEvent), `code` (number), and `message` (string). This method is called for each event, including Identify, GroupIdentify and Revenue events, that's instrumented using the client interface.

### Enrichment type plugin example

Here's an example of a plugin that modifies each event that's instrumented by adding an increment integer to `event_id` property of an event starting from 100.

```ts
import { init, add } from '@amplitude/analytics-react-native';
import { ReactNativeConfig, EnrichmentPlugin, Event, PluginType } from '@amplitude/analytics-types';

export class AddEventIdPlugin implements EnrichmentPlugin {
  name = 'add-event-id';
  type = PluginType.ENRICHMENT as const;
  currentId = 100;
  config?: ReactNativeConfig;
  
  /**
   * setup() is called on plugin installation
   * example: client.add(new AddEventIdPlugin());
   */
  async setup(config: ReactNativeConfig): Promise<undefined> {
     this.config = config;
     return;
  }
   
  /**
   * execute() is called on each event instrumented
   * example: client.track('New Event');
   */
  async execute(event: Event): Promise<Event> {
    event.event_id = this.currentId++;
    return event;
  }
}

init('API_KEY');
add(new AddEventIdPlugin());
```

### Destination type plugin example

Here's an example of a plugin that sends each instrumented event to a target server URL using your preferred Http client.

```ts
import { init, add } from '@amplitude/analytics-react-native';
import { ReactNativeConfig, DestinationPlugin, Event, PluginType, Result } from '@amplitude/analytics-types';

export class MyDestinationPlugin implements DestinationPlugin {
  name = 'my-destination-plugin';
  type = PluginType.DESTINATION as const;
  serverUrl: string;
  config?: ReactNativeConfig;

  constructor(serverUrl: string) {
    this.serverUrl = serverUrl;
  }

  /**
   * setup() is called on plugin installation
   * example: client.add(new MyDestinationPlugin());
   */
  async setup(config: ReactNativeConfig): Promise<undefined> {
    this.config = config;
    return;
  }

  /**
   * execute() is called on each event instrumented
   * example: client.track('New Event');
   */
  async execute(event: Event): Promise<Result> {
    const payload = { key: 'secret', data: event };
    const response = await fetch(this.serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify(payload),
    });
    return {
      code: response.status,
      event: event,
      message: response.statusText,
    };
  }
}

init('API_KEY');
add(new MyDestinationPlugin('https://custom.domain.com'));
```

## Advanced topics

### Custom Http client

You can provide an implementation of `Transport` interface to the `transportProvider` configuration option for customization purpose, for example, sending requests to your proxy server with customized HTTP request headers.

```ts
import { Transport } from '@amplitude/analytics-types';

class MyTransport implements Transport {
  async send(serverUrl: string, payload: Payload): Promise<Response | null> {
    // check example: https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/analytics-client-common/src/transports/fetch.ts
  }
}

amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  transportProvider: new MyTransport(),
});
```

### Location

The Amplitude ingestion servers resolve event location in the following order:

1. User-provided `city`, `country`, `region`
2. Resolved from `location_lat` and `location_lng`
3. Resolved from `ip`

By default, location will be determined by the `ip` on the server side. If you want more provide more granular location you can set `city`, `country` and `region` individually, or set `location_lat` and `location_lng` which will then be resolved to `city`, `country` and `region` on the server. 
We do not automatically set precise location in the SDK to avoid extra permissions that my not be needed by all customers.

To set fine grain location, you can use an enrichment Plugin. Here is an [example](https://github.com/amplitude/Amplitude-TypeScript/blob/v1.x/examples/plugins/react-native-get-location-plugin/LocationPlugin.ts) of how to set `location_lat` and `location_lng`.

Note that disabling IP tracking via `ipTracking: false` in [TrackingOptions](/data/sdks/typescript-react-native/#optional-tracking) will prevent location from being resolved on the backend. In this case you may want to create a Plugin like above to set any relevant location information yourself.

### Carrier

Carrier support works on Android, but Apple stopped supporting it in iOS 16. In earlier versions of iOS, we fetch carrier info using `CTCarrier` and `serviceSubscriberCellularProviders` which are [deprecated](https://developer.apple.com/documentation/coretelephony/cttelephonynetworkinfo/3024511-servicesubscribercellularprovide) with [no replacement](https://developer.apple.com/forums/thread/714876?answerId=728276022#728276022).

### Advertising Identifiers

Different platforms have different advertising identifiers. Due to user privacy concerns, Amplitude does not automatically collect these identifiers. However, it is easy to enable them using the instructions below. It is important to note that some identifiers are no longer recommended for use by the platform providers. Please read the notes below before deciding to enable them.

| Platform | Advertising Identifier | Recommended | Notes |
| --- | --- |-------------| --- |
| Android | AppSetId | Yes         | [AppSetId](https://developer.android.com/training/articles/app-set-id) is a unique identifier for the app instance. It is reset when the app is reinstalled. |
| Android | ADID | No          | [ADID](https://support.google.com/googleplay/android-developer/answer/6048248?hl=en) is a unique identifier for the device. It is reset when the user opts out of personalized ads. |
| iOS | IDFV | Yes         | [IDFV](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor) is a unique identifier for the app instance. It is reset when the app is reinstalled. |
| iOS | IDFA | No          | [IDFA](https://developer.apple.com/documentation/adsupport/asidentifiermanager/1614151-advertisingidentifier) is a unique identifier for the device. It is reset when the user opts out of personalized ads. |

#### Android

##### App set ID

App set ID is a unique identifier for each app install on a device. App set ID is reset by the user manually when they uninstall the app, or after 13 months of not opening the app. Google designed this as a privacy-friendly alternative to Ad ID for users who want to opt out of stronger analytics.

To use App Set ID, follow these steps.

1. Add `play-services-appset` as a dependency to the Android project of your app.

    ```bash
    dependencies {
        implementation 'com.google.android.gms:play-services-appset:16.0.2'
    }
    ```

2. Enable `trackingOptions.appSetId`

    ```ts
    amplitude.init(API_KEY, OPTIONAL_USER_ID, {
      trackingOptions: {
        appSetId: true,
      },
    });
    ```
   
##### Android Ad ID

Android Ad ID is a unique identifier for each device. Android Ad ID is reset by the user manually when they opt out of personalized ads.

To use Android Ad ID, follow these steps.

1. Add `play-services-ads-identifier` as a dependency to the Android project of your app. More detailed setup is [described in our latest Android SDK docs](/data/sdks/android-kotlin/#advertiser-id).

    ```bash
    dependencies {
      implementation 'com.google.android.gms:play-services-ads-identifier:18.0.1'
    }
    ```

Android Ad Id is enabled by default. To disable it, set `trackingOptions.adId` to `false`.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  trackingOptions: {
    adId: false,
  },
});
```

#### iOS

##### IDFV

IDFV is a unique identifier for the app instance. It is reset when the app is reinstalled.

To enable IDFV on iOS devices set `trackingOptions.idfv` to `true`.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  trackingOptions: {
    idfv: true,
  },
});
```

##### IDFA

{{partial:admonition type="warning" heading=""}}
IDFA is no longer recommended. You should consider using IDFV instead when possible.
{{/partial:admonition}}

IDFA is a unique identifier for the device. It is reset when the user opts out of personalized ads.

The React Native SDK does not directly access the IDFA as it would require adding the `AdSupport.framework` to your app. Instead you can use an Enrichment Plugin to set the IDFA yourself.

Here is an [example Plugin that sets the IDFA](https://github.com/amplitude/Amplitude-TypeScript/blob/main/examples/plugins/react-native-idfa-plugin/idfaPlugin.ts)  using a third-party library.

### Over the air updates (OTA)

If you are using platform like Expo that supports OTA updates. It is important to know our SDK has both native and JS code. If you are using OTA updates, you will need to make sure the native code is updated as well. See Expo's documentation on [publishing](https://docs.expo.dev/archive/classic-updates/publishing) and [runtime versions](https://docs.expo.dev/eas-update/runtime-versions/) for more details.

Below are versions of the SDK with the native code changes:

| @amplitude/analytics-react-native                                                                                     |
|-----------------------------------------------------------------------------------------------------------------------|
| [1.3.0](https://github.com/amplitude/Amplitude-TypeScript/releases/tag/%40amplitude%2Fanalytics-react-native%401.3.0) |