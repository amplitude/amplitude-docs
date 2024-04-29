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
updated_at: 1710272856
---
The Node.js SDK lets you send events from your Node app to Amplitude.

## Initialize the SDK

Initialization is necessary before any instrumentation is done. The API key for your Amplitude project is required. The SDK can be used anywhere after it's initialized anywhere in an application.

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

{{partial:collapse name="Configuration options"}}
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
{{/partial:collapse}}

### Configure batching behavior

To support high-performance environments, the SDK sends events in batches. Every event logged by theÂ `track`Â method is queued in memory. Events are flushed in batches in background. You can customize batch behavior with `flushQueueSize` and `flushIntervalMillis`. By default, the serverUrl will be `https://api2.amplitude.com/2/httpapi`. For customers who want to send large batches of data at a time, set `useBatch` to `true` to set `setServerUrl` to batch event upload API `https://api2.amplitude.com/batch`. Both the regular mode and the batch mode use the same events upload threshold and flush time intervals.

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

{{partial:admonition type="note" title=""}}
For EU data residency, the project must be set up inside Amplitude EU. You must initialize the SDK with the API key from Amplitude EU.
{{/partial:admonition}}

```js
import * as amplitude from '@amplitude/analytics-node';

amplitude.init(API_KEY, {
 serverZone: amplitude.Types.ServerZone.EU,
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

#### Debug mode

Enable the debug mode by setting the `logLevel` to "Debug", for example:

```js
amplitude.init(AMPLITUDE_API_KEY, {
 logLevel: amplitude.Types.LogLevel.Debug,
});
```

With the default logger, extra function context information will be output to the developer console when invoking any SDK public method, including:

- 'type': Category of this context, e.g., "invoke public method".
- 'name': Name of invoked function, e.g., "setUserId".
- 'args': Arguments of the invoked function.
- 'stacktrace': Stacktrace of the invoked function.
- 'time': Start and end timestamp of the function invocation.
- 'states': Useful internal states snapshot before and after the function invocation.