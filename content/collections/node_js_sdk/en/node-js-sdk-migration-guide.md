---
id: 1ca7ad5b-47f8-4709-b0f1-083941dc62c9
blueprint: node_js_sdk
title: 'Node.js SDK Migration Guide'
sdk_status: maintenance
article_type: migration
supported_languages:
  - js
  - ts
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1715102406
sdk_version_comparison:
  -
    cells:
      - Feature
      - '@amplitude/node'
      - '@amplitude/analytics-node'
  -
    cells:
      - Configuration
      - 'Supports specific setter methods.'
      - 'Configuration is implemented by Configuration object during initialize amplitude.'
  -
    cells:
      - 'Logger Provider'
      - 'Amplitude Logger. Not customizable.'
      - 'Amplitude Logger. Fully customizable.'
  -
    cells:
      - 'Storage Provider'
      - 'Local Storage.'
      - 'LocalStorage by default. Fully customizable.'
  -
    cells:
      - Customization
      - Middleware
      - Plugins
  -
    cells:
      - Retry
      - 'Regular retry by default. Also provide offline retry. You are able to customize your retry logic. Fully customizable.'
      - 'Regular retry'
  -
    cells:
      - 'Server Endpoint'
      - 'HTTP V2 API'
      - 'HTTP V2 API'
  -
    cells:
      - 'Batch API'
      - 'Not supported.'
      - 'Supported, with configuration.'
parent: e3b9838b-8d35-49d8-ba91-5a0840cbc603
exclude_from_sitemap: false
---
Amplitude's latest Node.js SDK (`@amplitude/analytics-node`) features a plugin architecture and built-in type definitions. The latest Node.js SDK isn't backwards compatible with the maintenance Node.js SDK `@amplitude/node`. 

To migrate to `@amplitude/analytics-node`, update your dependencies and instrumentation.

## Terminology

- `@amplitude/node`: Maintenance Node.js SDK
- `@amplitude/analytics-node`: Latest Node.js SDK

## Dependencies

Update package.json to uninstall the maintenance Node.js SDK and install the latest Node.js SDK.

```json
{
  "dependencies": {
    "@amplitude/node": "*", //[tl! --]
    "@amplitude/analytics-node": "^1", //[tl! ++]
  }
}
```

Install `@amplitude/analytics-node` by `npm install @amplitude/analytics-node`.

## Instrumentation

The latest Node.js SDK offers an new API to instrument events. To migrate to it, you need to update a few calls. The following sections detail which calls have changed.

### Initialization

The maintenance Node.js SDK only supports namespace import. The latest Node.js SDK supports namespace import (`import * as amplitude from '@amplitude/analytics-node'`) and named import (`import { init } from '@amplitude/analytics-node'`) as well. We are using named import in the examples of latest Node.js SDK in this documentation.

To initialize the SDK, call `init()`, with a valid Amplitude API Key and configuration parameters.

```js
import * as Amplitude from '@amplitude/node' //[tl! --]
import { init } from '@amplitude/analytics-node'; //[tl! ++]

var options = {};
const client = Amplitude.init(AMPLITUDE_API_KEY, options); //[tl! --]
init(API_KEY, options); //[tl! ++]
```

### Configuration

The latest Node.js SDK configuration comes in a different shape. Some configurations are no longer supported.

| @amplitude/node | @amplitude/analytics-node |
| --- | --- |
| `debug` | `logLevel` set to WARN level |
| `logLevel` | `logLevel` |
| `maxCachedEvents` | `flushQueueSize` |
| `retryTimeouts` | `flushMaxRetries` can only be set to a number instead of an array of number as in `retryTimeouts` |
| `optOut` | `optOut` |
| `retryClass` | Not supported. Retry logic is handled internally by latest Node.js SDK |
| `transportClass` | `transportProvider` |
| `serverUrl` | `serverUrl` |
| `uploadIntervalInSec` | `flushIntervalMillis` is in milliseconds while `uploadIntervalInSec` is in seconds |
| `minIdLength` | `minIdLength` |
| `requestTimeoutMillis` | Not supported |
| `onRetry` | Not supported. Retry logic is handled internally by the latest Node.js SDK |

### Log event

The `logEvent()` API maps to `track()`.

```js
import { track } from '@amplitude/analytics-node'; //[tl! ++]

const eventProperties = {
    buttonColor: 'primary',
};

client.logEvent({ //[tl! --]
track({ //[tl! ++:3]
  event_type: 'Button Clicked',
  user_id: 'user@amplitude.com',
  event_properties: eventProperties
});
```

### Flush

The `flush()` API remains the same.

```js
import { flush } from '@amplitude/analytics-node'; //[tl! ++]

client.flush(); //[tl! --]
flush(); //[tl! ++]
```

### Identify

The `identify()` API is very similar but has a different signature. The [maintenance Node.js SDK](https://github.com/amplitude/Amplitude-Node/blob/2ef295e1fb698286d606ea4a2ccbbfdc4ba3fdc8/packages/node/src/nodeClient.ts#L142) has a signature `(userId: string | null, deviceId: string | null, identify: Identify)` while the [latest Node.js SDK](https://github.com/amplitude/Amplitude-TypeScript/blob/8f4ea010279fb21190a2c0595d4ae8a7d9e987ce/packages/analytics-core/src/core-client.ts#L62) has a signature `(identify: Identify, eventOptions?: EventOptions)`. Learn more about what `EventOptions` include [here](https://amplitude.github.io/Amplitude-TypeScript/interfaces/_amplitude_analytics_node.Types.EventOptions.html).

```js
import { identify, Identify } from '@amplitude/analytics-node'; //[tl! ++]

const identifyObj = new Identify();
identifyObj.set('location', 'LAX');

client.identify('user@amplitude.com',null,identifyObj); //[tl! --]
identify(identifyObj, { //[tl! ++:2]
user_id: 'user@amplitude.com',
});
```

### Middleware

Middlewares map to [plugins](/docs/sdks/analytics/node/node-js-sdk#plugins) in the latest Node.js SDK. Here are two types of plugins, enrichment plugins and destination plugins. Here is an example of logging event information.

```js
+ import { add } from '@amplitude/analytics-node'; //[tl! ++:1]
+ import { NodeConfig, EnrichmentPlugin, Event, PluginType } from '@amplitude/analytics-types';

- const loggingMiddleware: Middleware = (payload, next) => { //[tl! --:2]
- console.log(`[amplitude] event=${payload.event} extra=${payload.extra}`);
- next(payload);
}

+ export class AddLogEventPlugin implements EnrichmentPlugin { //[tl! ++:3]
+ name = 'log-event';
+ type = PluginType.ENRICHMENT as const;
+ config?: NodeConfig;

+ async setup(config: NodeConfig): Promise<undefined> { //[tl! ++:3]
+ this.config = config;
+ return;
+ }

+ async execute(event: Event): Promise<Event> { //[tl! ++:4]
+ console.log(`[amplitude] event=${event}`);
+ return event;
+ }
+ }

```

The `addEventMiddleware()` API maps to `add()`.

```js
+ import { add } from '@amplitude/analytics-node'; //[tl! ++]

- client.addEventMiddleware(new Middleware()) //[tl! --]
+ add(new Plugin()); //[tl! ++]
```