---
id: cae327ea-be74-4783-ab16-09f2848cebca
blueprint: instrumentation
title: 'SDK Middleware'
source: 'https://www.docs.developers.amplitude.com/data/sdk-middleware/'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718572745
nav_title: developers
---
Middleware lets you extend Amplitude by running a sequence of custom code on every event. This pattern is flexible and you can use it to support event enrichment, transformation, filtering, routing to third-party destinations, and more.


{{partial:admonition type="note" heading=""}}
Middleware is only supported in Maintenance SDKs except the maintenance Browser SDK and legacy Ampli. Middleware has been replaced by **[Plugins](/docs/sdks/sdk-plugins)** in the latest SDK and Ampli versions.
{{/partial:admonition}}

## Middleware Structure
 
### Function Signature 

Each middleware is a simple function with this signature:

```js
/**
 * A function to run on the Event stream (each logEvent call)
 *
 * @param payload The `payload` contains the `event` to send and an optional `extra` that lets you pass custom data to your own middleware implementations.
 * @param next Function to run the next middleware in the chain, not calling next will end the middleware chain
 */

function (payload: MiddlewarePayload: next: MiddlewareNext): void;
```

Types in middleware:

| <div class="med-column">Name</div> | Type                                 | Description                                                                            |
| ---------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------- |
| `MiddlewarePayload.event`          | Event                                | The event data being sent. The event may vary by platform.                             |
| `MiddlewarePayload.extra`          | { [x: string]: any }                 | Unstructured object to let users pass extra data to middleware.                        |
| `MiddlewareNext`                   | (payload: MiddlewarePayload) => void | Function called at the end of each Middleware to run the next middleware in the chain. |

To invoke the next middleware in the queue, use the `next` function. You must call `next(payload)` to continue the middleware chain. If a middleware doesn't call `next`, then the event processing stops executing after the current middleware completes.

### Payload Customization

Middleware access to event fields may vary by platform. To ensure comprehensive access, Amplitude recommends updating to the latest Ampli version and utilizing the [Plugins](/docs/sdks/sdk-plugins) feature.

For Browser Ampli, the following are the accessible keys under `payload`.

| <div class="med-column">Name</div> | Type                   | Description                                                                                                   |
| ---------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| `event.event_type`                 | string                 | The event name.                                                                                               |
| `event.event_properties`           | { [key: string]: any } | The event properties.                                                                                         |
| `event.user_id`                    | string                 | The event level user ID.                                                                                      |
| `event.device_id`                  | string                 | The event level device ID.                                                                                    |
| `event.user_properties`            | { [key: string]: any } | The event level user properties.                                                                              |
| `extra`                            | { [x: string]: any }   | The extra information you want to send that lets you pass custom data to your own middleware implementations. |

For other platforms, middleware can access and modify the entire Event JSON object, allowing for comprehensive adjustments as needed. Learn more at [here](/docs/apis/analytics/http-v2#keys-for-the-event-argument).

### Use

Add middleware to Amplitude via `amplitude.addEventMiddleware()`. You can add as many middleware as you like. Each middleware runs in the order in which it's added.

```js
amplitude.addEventMiddleware(yourMiddleware());
```

## Middleware examples

Use an Middleware to modify event properties, transformation, filtering, routing to third-party destinations, and more:


### Filtering middleware

```ts
    amplitude.addEventMiddleware((payload, next) => {
    const {eventType} =  payload.event;
    if (shouldSendEvent(eventType)) {
    next(payload)
    } else {
    // event will not continue to following middleware or be sent to Amplitude
    console.log(`Filtered event: ${eventType}`);
    }
});
```
        
### Remove PII (Personally Identifiable Information)

```js
amplitude.addEventMiddleware((payload, next) => {
    const { event } = payload;
    if (hasPii(event.event_properties)) {
    payload.event.event_properties = obfuscate(payload.event.event_properties);
    }
    next(payload);
});
```
    
### Enrich Event Properties

```js
amplitude.addEventMiddleware((payload, next) => {
    const { event } = payload;
    if (needsDeviceId(event)) {
    payload.event.deviceId = getDeviceId();
    }
    next(payload)
});
```

### Send event level groups using Ampli v1

This is an example of how to send event level groups in Ampli V1.
How to send event level groups in SDKs(not in Ampli) is different. Please check the specific SDKs for the usage.

```js
ampli.addEventMiddleware((payload, next) => {
    const {event, extra} =  payload;
    if (event && extra && event.extra.groups) {
    event.groups =  event.extra.groups;
    }

    next(payload);
});

// Pass the event level groups info though middleware extra when calling the tracking plan.
const extra = {groups: {"test_group_name": "test_group_value"}};
ampli.eventWithGroups({requiredNumber: 1.23, requiredBoolean: false}, extra);
```


### Forward data to other services

```js
import amplitude from 'amplitude/sdk'
import adroll from 'adroll';
import segment from 'segment';
import snowplow from 'snowplow';

amplitude.addEventMiddleware((payload, next) => {
    const { event, extra } = payload;
    segment.track(event.event_type, event.event_properties, { extra.anonymousId })
    adroll.track();
    snowplow.track(event.event_type, event.event_properties, extra.snowplow.context);
    // next();
});
```


### Use client-side validation (click to expand)

```js
amplitude.addEventMiddleware((payload, next) => {
    if (isDevelopment && !SchemaValidator.isValid(payload.event)) {
    throw Error(`Invalid event ${event.event_type}`);
    }
    next(payload);
});
```

## Supported SDKs

| Platform                                                                       | SDK                                                                                                               | Github                                                                                        |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [Android](/docs/sdks/analytics/android/android-sdk#middleware)                 | [`com.amplitude:android-sdk`](https://mvnrepository.com/artifact/com.amplitude/android-sdk) | [:material-github: Amplitude-Android](https://github.com/amplitude/Amplitude-Android)         |
| [Node.js](/docs/sdks/analytics/node/node-sdk#middleware)                       | [`@amplitude/node`](https://www.npmjs.com/package/@amplitude/node)                          | [:material-github: Amplitude-Node](https://github.com/amplitude/Amplitude-Node)               |
| [React Native](/docs/sdks/analytics/react-native/react-native-sdk-maintenance) | [`@amplitude/react-native`](https://www.npmjs.com/package/@amplitude/react-native)          | [:material-github: Amplitude-ReactNative](https://github.com/amplitude/Amplitude-ReactNative) |
| [iOS](/docs/sdks/analytics/ios/ios-sdk#middleware)                             | [`Amplitude`](https://cocoapods.org/pods/Amplitude-iOS)                                     | [:material-github: Amplitude-iOS](https://github.com/amplitude/Amplitude-iOS)                 |
| [Java](/docs/sdks/analytics/java/jre-java-sdk#middleware)                      | [`com.amplitude.:java-sdk`](https://mvnrepository.com/artifact/com.amplitude/java-sdk)      | [:material-github: Amplitude-Java](https://github.com/amplitude/Amplitude-Java)               |