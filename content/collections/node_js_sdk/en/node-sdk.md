---
id: e3b9838b-8d35-49d8-ba91-5a0840cbc603
blueprint: node_js_sdk
title: 'Node SDK'
sdk_status: maintenance
article_type: core
supported_languages:
  - js
github_link: 'https://github.com/amplitude/Amplitude-Node'
releases_url: 'https://github.com/amplitude/Amplitude-Node/releases'
bundle_url: 'https://www.npmjs.com/package/@amplitude/node'
shields_io_badge: 'https://img.shields.io/npm/v/@amplitude/node.svg'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1721756356
ampli_article: 032ffb7e-a0ff-49d8-bcad-2407d7bd5573
source: 'https://www.docs.developers.amplitude.com/data/sdks/node/'
migration_guide:
  - 1ca7ad5b-47f8-4709-b0f1-083941dc62c9
package_name: '@amplitude/node'
platform: Node
noindex: true
---
This is Amplitude Node.js SDK written in Typescript, the first backend SDK for Amplitude.

The client-side SDKs are optimized to track session and attribution for a single user or device. The Node SDK's focus is to offer a helpful developer experience to help back-end services reliably and correctly send events from many users and sources. 

The Node SDK provides:

- Batching of events to send multiple events in the same request.
- Retry handling mechanisms to handle when a network request fails, or a payload is throttled or invalid.
- Useful utilities and typing help debug instrumentation issues.

## Initialize the SDK

Before you instrument, you must initialize the SDK using the API key for your Amplitude project.
 Initialization creates a default instance, but you can create more instances using `getInstance` with a string name.

```js
// Option 1, initialize with API_KEY only
Amplitude.init(AMPLITUDE_API_KEY);

// Option 2, initialize including configuration
var options = {};
Amplitude.init(AMPLITUDE_API_KEY, options);
```

## Configure the SDK

| Name | Description | Default Value |
| --- | --- | --- |
| `debug` | `boolean`. Whether or not the SDK should be started in debug mode. This will enable the SDK to generate logs at WARN level or above, if the logLevel is not specified. | `false` |
| `logLevel` | `LogLevel`. Configuration of the logging verbosity of the SDK. `None` - No Logs will be surfaced. `Error` - SDK internal errors will be generated. `Warn` - Warnings will be generated around dangerous/deprecated features. `Verbose` - All SDK actions will be logged. | `LogLevel.None` |
| `maxCachedEvents` | `number`. The maximum events in the buffer. | `16000` |
| `retryTimeouts` | `number[].` Determines # of retries for sending failed events and how long each retry to wait for (ms). An empty array means no retries. | `[100, 100, 200, 200, 400, 400, 800, 800, 1600, 1600, 3200, 3200]` |
| `optOut` | `boolean`. Whether you opt out from sending events. | `false` |
| `retryClass` | `Retry`. The class being used to handle event retrying. | `null` |
| `transportClass` | `Transport`. The class being used to transport events. | `null` |
| `serverUrl` | `string`. If you're using a proxy server, set its url here. | `https://api2.amplitude.com/2/httpapi` |
| `uploadIntervalInSec` | `number`. The events upload interval in seconds. | `0` |
| `minIdLength` | `number`. Optional parameter allowing users to set minimum permitted length for user_id & device_id fields. | `5` |
| `requestTimeoutMillis` | `number`. Configurable timeout in milliseconds. | `10000` |
| `onRetry` | `(response: Response, attemptNumber: number, isLastRetry: boolean) => boolean)`. @param `response` - Response from the given retry attempt. @param `attemptNumber` - Index in retryTimeouts for how long Amplitude waited before this retry attempt. Starts at 0. @param `isLastRetry` - True if attemptNumber === retryTimeouts.length - 1. Lifecycle callback that is executed after a retry attempt. Called in {@link Retry.sendEventsWithRetry}. | `null` |

### Configure batching behavior

To support high-performance environments, the SDK sends events in batches. Every event logged by `logEvent` method is queued in memory. Events are flushed in batches in background. You can customize batch behavior with `maxCachedEvents` and `uploadIntervalInSec`. By default, the serverUrl will be `https://api2.amplitude.com/2/httpapi`. For customers who want to send large batches of data at a time, you can use the batch mode. You need to set the server url to the [batch event upload API](/docs/apis/analytics/batch-event-upload) based on your needs. 

- Standard Server Batch API - `https://api2.amplitude.com/batch`
- EU Residency Server Batch API - `https://api.eu.amplitude.com/batch`

Both the regular mode and the batch mode use the same events upload threshold and flush time intervals.

```js
Amplitude.init(AMPLITUDE_API_KEY, {
 // Events queued in memory will flush when number of events exceed upload threshold
 // Default value is 16000
 maxCachedEvents: 20000,
 // Events queue will flush every certain milliseconds based on setting
 // Default value is 0 second. 
 uploadIntervalInSec: 10,
});
```

### EU data residency

To send data to Amplitude's EU servers, configure the server URL during initialization.

```js
client = Amplitude.init(AMPLITUDE_API_KEY, {
 serverUrl: "https://api.eu.amplitude.com/2/httpapi"
});
```

## Send events

{{partial:admonition type="note" heading=""}}
This SDK uses the [HTTP V2](/docs/apis/analytics/http-v2) API and follows the same constraints for events. Make sure that all events logged in the SDK have the `event_type` field and at least one of `device_id` or `user_id`, and follow the HTTP API's constraints on each of those fields.
{{/partial:admonition}}

To prevent instrumentation issues, device IDs and user IDs must be strings with a length of 5 characters or more. If an event contains a device ID or user ID that's too short, the ID value is removed from the event. If the event doesn't have a `user_id` or `device_id` value, the upload may be rejected with a 400 status. Override the default minimum length of 5 characters by passing the `min_id_length` option with the request.

{{partial:tabs tabs="TypeScript, JavaScript"}}
{{partial:tab name="TypeScript"}}
```ts
import * as Amplitude from '@amplitude/node';

const client = Amplitude.init(AMPLITUDE_API_KEY);

client.logEvent({
 event_type: 'Node.js Event',
 user_id: 'datamonster@gmail.com',
 location_lat: 37.77,
 location_lng: -122.39,
 ip: '127.0.0.1',
 event_properties: {
 keyString: 'valueString',
 keyInt: 11,
 keyBool: true
 }
});

// Send any events that are currently queued for sending.
// Will automatically happen on the next event loop.
client.flush();
```
{{/partial:tab}}
{{partial:tab name="JavaScript"}}
```js
// ES5 Syntax
const Amplitude = require('@amplitude/node');
// ES6 Syntax
import * as Amplitude from '@amplitude/node';

var client = Amplitude.init(AMPLITUDE_API_KEY);
client.logEvent({
 event_type: 'Node.js Event',
 user_id: 'datamonster@gmail.com',
 location_lat: 37.77,
 location_lng: -122.39,
 ip: '127.0.0.1',
 event_properties: {
 keyString: 'valueString',
 keyInt: 11,
 keyBool: true
 }
});

// Send any events that are currently queued for sending.
// Will automatically happen on the next event loop.
client.flush();

```
{{/partial:tab}}
{{/partial:tabs}}

## Middleware

Middleware allows you to extend Amplitude by running a sequence of custom code on every event. This pattern is flexible and you can use it to support event enrichment, transformation, filtering, routing to third-party destinations, and more.

Each middleware is a simple function with this signature:

```js
function (payload: MiddlewarePayload: next: MiddlewareNext): void;
```

The `payload` contains the `event` as well as an optional `extra` that allows you to pass custom data to your own middleware implementations.

To invoke the next Middleware in the queue, use the `next` function. You must call `next(payload)` to continue the Middleware chain. If a Middleware doesn't call `next`, then the event processing stop executing after the current middleware completes.

Add middleware to Amplitude via `client.addEventMiddleware()`. You can add as many middleware as you like. Each middleware runs in the order in which it was added.

```js
const loggingMiddleware: Middleware = (payload, next) => {
 console.log(`[amplitude] event=${payload.event} extra=${payload.extra}`);
 // continue to next middleware in chain
 next(payload);
}

const filteringMiddleware: Middleware = (payload, next) => {
 const {eventType} = payload.event;
 if (shouldSendEvent(eventType)) {
 next(payload)
 } else {
 // event will not continue to following middleware or be sent to Amplitude
 console.log(`Filtered event: ${eventType}`);
 }
}

client.addEventMiddleware(loggingMiddleware)
client.addEventMiddleware(filteringMiddleware)

```

You can find examples for [Typescript](https://github.com/amplitude/ampli-examples/tree/main/browser/typescript/v1/react-app/src/middleware) and [JavaScript](https://github.com/amplitude/ampli-examples/tree/main/browser/javascript/v1/react-app/src/middleware).