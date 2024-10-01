---
id: 8cbcfa2a-a300-48c8-b551-aee1b1423cdb
blueprint: node_js_sdk
title: 'Node.js SDK'
sdk_status: current
article_type: core
major_version: 1
supported_languages:
  - js
  - ts
github_link: 'https://github.com/amplitude/Amplitude-TypeScript/tree/v1.x/packages/analytics-node'
releases_url: 'https://github.com/amplitude/Amplitude-TypeScript/releases?q=analytics-node&expanded=true'
bundle_url: 'https://www.npmjs.com/package/@amplitude/analytics-node'
api_reference_url: 'https://amplitude.github.io/Amplitude-TypeScript/'
shields_io_badge: 'https://img.shields.io/npm/v/@amplitude/analytics-node.svg'
ampli_article: 5f0a9b3c-627c-4014-bb2e-d1ac1c465db9
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1727813155
source: 'https://www.docs.developers.amplitude.com/data/sdks/typescript-node/'
package_name: '@amplitude/analytics-node'
platform: Node
version_name: 'Node.js SDK'
---
The Node.js SDK lets you send events to Amplitude.

## Install the SDK

Install the dependency with npm or yarn.

{{partial:tabs tabs="npm, yarn"}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/analytics-node
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/analytics-node
```
{{/partial:tab}}
{{/partial:tabs}}

## Initialize the SDK

Initialization is necessary before you instrument the SDK. The API key for your Amplitude project is required. The SDK can be used anywhere after it's initialized anywhere in an application.

```js
import { init } from '@amplitude/analytics-node';

// Option 1, initialize with API_KEY only
init(API_KEY);

// Option 2, initialize including configuration
init(API_KEY, {
 flushIntervalMillis: 30 * 1000, // Sets request interval to 30s
});
```

## Configure the SDK

| Name | Description | Default Value |
| --- | --- | --- |
| `instanceName` | `string`. The instance name. | `$default_instance` |
| `flushIntervalMillis` | `number`. Sets the interval of uploading events to Amplitude in milliseconds. | 10,000 (10 seconds) |
| `flushQueueSize` | `number`. Sets the maximum number of events that are batched in a single upload attempt. | 300 events |
| `flushMaxRetries` | `number`. Sets the maximum number of retries for failed upload attempts. This is only applicable to retryable errors. | 12 times. |
| `logLevel` | `LogLevel.None` or `LogLevel.Error` or `LogLevel.Warn` or `LogLevel.Verbose` or `LogLevel.Debug`. Sets the log level. | `LogLevel.Warn` |
| `loggerProvider` | `Logger`. Sets a custom `loggerProvider` class from the Logger to emit log messages to desired destination. | `Amplitude Logger` |
| `minIdLength` | `number`. Sets the minimum length for the value of `user_id` and `device_id` properties. | `5` |
| `optOut` | `boolean`. Sets permission to track events. Setting a value of `true` prevents Amplitude from tracking and uploading events. | `false` |
| `serverUrl` | `string`. Sets the URL where events are upload to. | `https://api2.amplitude.com/2/httpapi` |
| `serverZone` | `EU` or `US`. Sets the Amplitude server zone. Set this to `EU` for Amplitude projects created in `EU` data center. | `US` |
| `storageProvider` | `Storage<Event[]>`. Sets a custom implementation of `Storage<Event[]>` to persist unsent events. | `MemoryStorage` |
| `transportProvider` | `Transport`. Sets a custom implementation of `Transport` to use different request API. | `HTTPTransport` |
| `useBatch` | `boolean`. Sets whether to upload events to Batch API instead of the default HTTP V2 API or not. | `false` |

### Configure batching behavior

To support high-performance environments, the SDK sends events in batches. Every event logged by the `track` method is queued in memory. Events are flushed in batches in background. You can customize batch behavior with `flushQueueSize` and `flushIntervalMillis`. By default, the serverUrl will be `https://api2.amplitude.com/2/httpapi`. For customers who want to send large batches of data at a time, set `useBatch` to `true` to set `setServerUrl` to batch event upload API `https://api2.amplitude.com/batch`. Both the regular mode and the batch mode use the same events upload threshold and flush time intervals.

```js
import * as amplitude from '@amplitude/analytics-node';

amplitude.init(API_KEY, {
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

```
import * as amplitude from '@amplitude/analytics-node';

amplitude.init(API_KEY, {
 serverZone: amplitude.Types.ServerZone.EU,
});

```
{{/partial:admonition}}

### Debugging

You can control the level of logs printed to the developer console.

- `None`: Suppresses all log messages.
- `Error`: Shows error messages only.
- `Warn`: Shows error messages and warnings. This is the default value if `logLevel` isn't explicitly specified.
- `Verbose`: Shows informative messages.
- `Debug`: Shows error messages, warnings, and informative messages that may be useful for debugging, including the function context information for all SDK public method invocations. This logging mode is only suggested to be used in development phases.

Set the log level by configuring the `logLevel` with the level you want.

```js
amplitude.init(AMPLITUDE_API_KEY, {
 logLevel: amplitude.Types.LogLevel.Warn,
});
```

The default logger outputs log to the developer console. You can provide your own logger implementation based on the `Logger` interface for any customization purpose. For example, collecting any error messages from the SDK in a production environment.

Set the logger by configuring the `loggerProvider` with your own implementation.

```js
amplitude.init(AMPLITUDE_API_KEY, {
 loggerProvider: new MyLogger(),
});
```

### Debug mode

Enable the debug mode by setting the `logLevel` to "Debug", for example:

```js
amplitude.init(AMPLITUDE_API_KEY, {
 logLevel: amplitude.Types.LogLevel.Debug,
});

```

With the default logger, extra function context information will be output to the developer console when invoking any SDK public method, including:

- `type`: Category of this context, for example, `invoke public method`.
- `name`: Name of invoked function, for example, `setUserId`.
- `args`: Arguments of the invoked function.
- `stacktrace`: Stacktrace of the invoked function.
- `time`: Start and end timestamp of the function invocation.
- `states`: Useful internal states snapshot before and after the function invocation.

## Track an event

{{partial:admonition type="note" heading=""}}
This SDK uses the [HTTP V2](https://developers.amplitude.com/docs/http-api-v2) API and follows the same constraints for events. Make sure that all events logged in the SDK have the `event_type` field and at least one of `deviceId`  (included by default) or `userId`, and follow the HTTP API's constraints on each of those fields.

To prevent instrumentation issues, device IDs and user IDs must be strings with a length of 5 characters or more. If an event contains a device ID or user ID that's too short, the ID value is removed from the event. If the event doesn't have a `userId` or `deviceId` value, the upload may be rejected with a 400 status. Override the default minimum length of 5 characters by setting the `minIdLength` config option.
{{/partial:admonition}}

Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to note.

```js
import { track } from '@amplitude/analytics-node';

// Track a basic event
track('Button Clicked', undefined, {
 user_id: 'user@amplitude.com',
});

// Track events with optional properties
const eventProperties = {
 buttonColor: 'primary',
};
track('Button Clicked', eventProperties, {
 user_id: 'user@amplitude.com',
});
```

## Track events to multiple projects

If you need to log events to multiple Amplitude projects, you'll need to create separate instances for each Amplitude project. Then, pass the instance variables to wherever you want to call Amplitude. Each instance allows for independent apiKeys, userIds, deviceIds, and settings.

```js
import * as amplitude from '@amplitude/analytics-node';

const defaultInstance = amplitude.createInstance();
defaultInstance.init(API_KEY_DEFAULT);

const envInstance = amplitude.createInstance();
envInstance.init(API_KEY_ENV, {
 instanceName: 'env',
});
```

## User properties

User properties help you understand your users at the time they performed some action within your app such as their device details, their preferences, or language.

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties. The operations are declared via a provided Identify interface. Chain together multiple operations together in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.

{{partial:admonition type="note" heading=""}}
If the Identify call is sent after the event, the results of operations are visible immediately in the dashboard user's profile area, but it don't appear in chart result until another event is sent after the Identify call. The identify call only affects events going forward. See [Overview of user properties and event properties in Amplitude](/docs/data/user-properties-and-events) for more information.
{{/partial:admonition}}

### Set a user property

The Identify object provides controls over setting user properties. An Identify object must first be instantiated, then Identify methods can be called on it, and finally the client makes a call with the Identify object.

```js
import { identify, Identify } from '@amplitude/analytics-node';

const identifyObj = new Identify();
identify(identifyObj, {
 user_id: 'user@amplitude.com',
});
```

#### Identify.set

This method sets the value of a user property. For example, you can set a role property of a user.

```js
import { Identify, identify } from '@amplitude/analytics-node';

const identifyObj = new Identify();
identifyObj.set('location', 'LAX');

identify(identifyObj, {
 user_id: 'user@amplitude.com',
});
```

#### Identidy.setOnce

This method sets the value of a user property only once. Subsequent calls using `setOnce()` are ignored. For example, you can set an initial login method for a user and since only the initial value is tracked, setOnce() ignores subsequent calls.

```js
import { Identify, identify } from '@amplitude/analytics-node';

const identifyObj = new Identify();
identifyObj.setOnce('initial-location', 'SFO');

identify(identifyObj, {
 user_id: 'user@amplitude.com',
});

```

#### Identify.add

This method increments a user property by some numerical value. If the user property doesn't have a value set yet, it's initialized to 0 before being incremented. For example, you can track a user's travel count.

```js
import { Identify, identify } from '@amplitude/analytics-node';

const identifyObj = new Identify();
identifyObj.add('travel-count', 1);

identify(identifyObj, {
 user_id: 'user@amplitude.com',
});
```

### Arrays in user properties

Arrays can be used as user properties. You can directly set arrays or use `prepend`, `append`, `preInsert` and `postInsert` to generate an array.

#### Identify.prepend

This method prepends a value or values to a user property array. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are prepended.

```js
import { Identify, identify } from '@amplitude/analytics-node';

const identifyObj = new Identify();
identifyObj.prepend('visited-locations', 'LAX');

identify(identifyObj, {
 user_id: 'user@amplitude.com',
});
```

#### Identify.append

This method appends a value or values to a user property array. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are prepended.

```js
import { Identify, identify } from '@amplitude/analytics-node';

const identifyObj = new Identify();
identifyObj.append('visited-locations', 'SFO');

identify(identifyObj, {
 user_id: 'user@amplitude.com',
});
```

#### Identify.preInsert
This method pre-inserts a value or values to a user property if it doesn't exist in the user property yet. Pre-insert means inserting the value at the beginning of a given list. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, it's a no operation.

```js
import { Identify, identify } from '@amplitude/analytics-node';

const identifyObj = new Identify();
identifyObj.preInsert('unique-locations', 'LAX');

identify(identifyObj, {
 user_id: 'user@amplitude.com',
});

```

#### Identify.postInsert

This method post-inserts a value or values to a user property if it doesn't exist in the user property yet. Post-insert means inserting the value at the end of a given list. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are post-inserted. If the user property has an existing value, it's a no operation.

```js
import { Identify, identify } from '@amplitude/analytics-node';

const identifyObj = new Identify();
identifyObj.postInsert('unique-locations', 'SFO');

identify(identifyObj, {
 user_id: 'user@amplitude.com',
});

```

#### Identify.remove

This method removes a value or values to a user property if it exists in the user property. Remove means remove the existing value from the given list. If the item doesn't exist in the user property, it's a no operation.

```js
import { Identify, identify } from '@amplitude/analytics-node';

const identifyObj = new Identify();
identifyObj.remove('unique-locations', 'JFK')

identify(identifyObj, {
 user_id: 'user@amplitude.com',
});

```

## User groups

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, then the count includes the group.

For example, you want to group your users based on what organization they're in by using an 'orgId'. Joe is in 'orgId' '10', and Sue is in 'orgId' '15'. Sue and Joe both perform a certain event. You can query their organizations in the Event Segmentation Chart.

When setting groups, define a `groupType` and `groupName`. In the previous example, 'orgId' is the `groupType` and '10' and '15' are the values for `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'.

Setting a group also sets the `groupType:groupName` as a user property, and overwrites any existing `groupName` value set for that user's groupType, and the corresponding user property value. `groupType` is a string, and `groupName` can be either a string or an array of strings to indicate that a user is in multiple groups.

{{partial:admonition type="example" heading=""}}
If Joe is in 'orgId' '15', then the `groupName` would be '15'.

```js
import { setGroup } from '@amplitude/analytics-node';

// set group with a single group name
setGroup('orgId', '15', {
 user_id: 'user@amplitude.com',
});

```

If Joe is in 'sport' 'tennis' and 'soccer', then the `groupName` would be '["tennis", "soccer"]'.

```js
import { setGroup } from '@amplitude/analytics-node';

// set group with multiple group names
setGroup('sport', ['soccer', 'tennis'], {
 user_id: 'user@amplitude.com',
});

```
{{/partial:admonition}}

You can also set **event-level groups** by passing an `Event` Object with `groups` to `track`. With event-level groups, the group designation applies only to the specific event being logged, and doesn't persist on the user unless you explicitly set it with `setGroup`.

```js
import { track } from '@amplitude/analytics-node';

track({
 event_type: 'event type',
 event_properties: { eventPropertyKey: 'event property value' },
 groups: { 'orgId': '15' }
}, undefined, {
 user_id: 'user@amplitude.com',
});

```

### Group properties

Use the Group Identify API to set or update the properties of particular groups. These updates only affect events going forward.

The `groupIdentify()` method accepts a group type and group name string parameter, as well as an Identify object that's applied to the group.

```js
import { Identify, groupIdentify } from '@amplitude/analytics-node';

const groupType = 'plan';
const groupName = 'enterprise';
const event = new Identify()
event.set('key1', 'value1');

groupIdentify(groupType, groupName, identify, {
 user_id: 'user@amplitude.com',
});

```

## Revenue tracking

The preferred method of tracking revenue for a user is to use `revenue()` in conjunction with the provided Revenue interface. Revenue instances store each revenue transaction and allow you to define several special revenue properties (such as "revenueType", "productIdentifier", etc.) that are used in Amplitude's Event Segmentation and Revenue LTV charts. These Revenue instance objects are then passed into `revenue()` to send as revenue events to Amplitude. This lets automatically display data relevant to revenue in the platform. You can use this to track both in-app and non-in-app purchases.

To track revenue from a user, call revenue each time a user generates revenue. For example, a customer purchased 3 units of a product at $3.99.

```js
import { Revenue, revenue } from '@amplitude/analytics-node';

const event = new Revenue()
 .setProductId('com.company.productId')
 .setPrice(3.99)
 .setQuantity(3);

revenue(event, {
 user_id: 'user@amplitude.com',
});

```

### Revenue interface

| Name | Description |
| --- | --- |
| `product_id` | Optional. String. An identifier for the product. Amplitude recommends something like the Google Play Store product ID. Defaults to null. |
| `quantity` | Required. Int. The quantity of products purchased. Note: revenue = quantity * price. Defaults to 1 |
| `price` | Required. Double. The price of the products purchased, and this can be negative. Note: revenue = quantity * price. Defaults to null. |
| `revenue_type` | Optional, but required for revenue verification. String. The revenue type (for example, tax, refund, income). Defaults to null. |
| `receipt` | Optional. String. The receipt identifier of the revenue. Defaults to null |
| `receipt_sig` | Optional, but required for revenue verification. String. The receipt signature of the revenue. Defaults to null. |
| `properties` | Optional. JSONObject. An object of event properties to include in the revenue event. Defaults to null. |

## Flush the event buffer

The `flush` method triggers the client to send buffered events.

```js
import { flush } from '@amplitude/analytics-node';

flush();

```

By default, `flush` is called automatically in an interval, if you want to flush the events altogether, you can control the async flow with the optional Promise interface, for example:

```js
await init(AMPLITUDE_API_KEY).promise;
track('Button Clicked', undefined, {
 user_id: 'user@amplitude.com',
});
await flush().promise;

```

## Opt users out of tracking

You can turn off logging for a given user by setting `setOptOut` to `true`.

```js
import { setOptOut } from '@amplitude/analytics-node';

setOptOut(true);

```

No events are saved or sent to the server while `setOptOut` is enabled, and the setting persists across page loads. 

Re-enable logging by setting `setOptOut` to `false`.

```js
import { setOptOut } from '@amplitude/analytics-node';

setOptOut(false);

```

## Callback

All asynchronous APIs are optionally awaitable through a Promise interface. This also serves as a callback interface.

```js
import { track } from '@amplitude/analytics-node';

// Using async/await
const results = await track('Button Clicked', undefined, {
 user_id: 'user@amplitude.com',
}).promise;
result.event; // {...} (The final event object sent to Amplitude)
result.code; // 200 (The HTTP response status code of the request.
result.message; // "Event tracked successfully" (The response message)

// Using promises
track('Button Clicked', undefined, {
 user_id: 'user@amplitude.com',
}).promise.then((result) => {
 result.event; // {...} (The final event object sent to Amplitude)
 result.code; // 200 (The HTTP response status code of the request.
 result.message; // "Event tracked successfully" (The response message)
});

```

## Plugins

Plugins allow you to extend Amplitude SDK's behavior by, for example, modifying event properties (enrichment type) or sending to third-party APIs (destination type). A plugin is an object with methods `setup()` and `execute()`.

### Add

The `add` method adds a plugin to Amplitude client instance. Plugins can help processing and sending events.

```js
import { add } from '@amplitude/analytics-node';

add(new Plugin());

```

### Remove

The `remove` method removes the given plugin name from the client instance if it exists.

```js
import { remove } from '@amplitude/analytics-node';

remove(plugin.name);

```

### Create a custom plugin

| Field / Function | Description |
| -----------------| ------------|
| `plugin.setup()` | Optional. The setup function is an optional method called when you add the plugin or on first init whichever happens later. This function accepts two parameters: 1) Amplitude configuration; and 2) Amplitude instance. This is useful for setup operations and tasks that depend on either the Amplitude configuration or instance. Examples include assigning baseline values to variables, setting up event listeners, and many more. |
| `plugin.execute()` | Optional for type:enrichment. For enrichment plugins, execute function is an optional method called on each event. This function must return a new event, otherwise, the SDK drops the passed event from the queue. This is useful for cases where you need to add/remove properties from events, filter events, or perform any operation for each event tracked. <br/><br/> For destination plugins, execute function is a required method called on each event. This function must return a response object with keys: `event` (BaseEvent), `code` (number), and `message` (string). This is useful for sending events for third-party endpoints.|

### Plugin examples

{{partial:tabs tabs="Enrichment, Destination"}}
{{partial:tab name="Enrichment"}}
Here's an example of a plugin that modifies each instrumented event by adding an increment integer to `event_id` property of an event starting from 100.
```js
import { init, add } from '@amplitude/analytics-node';
import { NodeConfig, EnrichmentPlugin, Event, PluginType } from '@amplitude/analytics-types';

export class AddEventIdPlugin implements EnrichmentPlugin {
  name = 'add-event-id';
  type = PluginType.ENRICHMENT as const;
  currentId = 100;
  config?: NodeConfig;

  /**
   * setup() is called on plugin installation
   * example: client.add(new AddEventIdPlugin());
   */
  async setup(config: NodeConfig): Promise<undefined> {
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
{{/partial:tab}}
{{partial:tab name="Destination"}}
Here's an example of a plugin that sends each instrumented event to a target server URL using your preferred HTTP client.

```js
import { init, add } from '@amplitude/analytics-node';
import { NodeConfig, DestinationPlugin, Event, PluginType, Result } from '@amplitude/analytics-types';
import fetch from 'node-fetch';

export class MyDestinationPlugin implements DestinationPlugin {
 name = 'my-destination-plugin';
 type = PluginType.DESTINATION as const;
 serverUrl: string;
 config?: NodeConfig;

 constructor(serverUrl: string) {
 this.serverUrl = serverUrl;
 }

 /**
 * setup() is called on plugin installation
 * example: client.add(new MyDestinationPlugin());
 */
 async setup(config: NodeConfig): Promise<undefined> {
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
{{/partial:tab}}
{{/partial:tabs}}

## Custom HTTP client

You can provide an implementation of `Transport` interface to the `transportProvider` configuration option for customization purpose, for example, sending requests to your proxy server with customized HTTP request headers.

```js
import { Transport } from '@amplitude/analytics-types';

class MyTransport implements Transport {
 async send(serverUrl: string, payload: Payload): Promise<Response | null> {
 // check example: https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/analytics-client-common/src/transports/fetch.ts
 }
}

amplitude.init(API_KEY, {
 transportProvider: new MyTransport(),
});

```