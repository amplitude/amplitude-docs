---
id: 58209a5e-a41d-4607-bc7e-6fe209725c38
blueprint: experiment-sdk
title: 'Experiment Node.js SDK'
source: 'https://www.docs.developers.amplitude.com/experiment/sdks/nodejs-sdk/'
sdk_status: current
article_type: core
supported_languages:
  - js
landing: false
github_link: 'https://github.com/amplitude/experiment-node-server'
releases_url: 'https://github.com/amplitude/experiment-node-server/releases'
api_reference_url: 'https://amplitude.github.io/experiment-node-server/'
shields_io_badge: 'https://img.shields.io/npm/v/@amplitude/experiment-node-server'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717526460
logo: icons/node.svg
---
Official documentation for Amplitude Experiment's server-side Node.js SDK implementation.

This documentation has separate sections for [remote](/docs/feature-experiment/remote-evaluation) and [local](/docs/feature-experiment/local-evaluation) evaluation:

## Remote evaluation

Implements fetching variants for a user via [remote evaluation](/docs/feature-experiment/remote-evaluation).

### Install

{{partial:admonition type="note" heading="Node version compatibility"}}
The Node Server SDK works with Node 10+.
{{/partial:admonition}}

{{partial:tabs tabs="npm, yarn"}}
{{partial:tab name="npm"}}
```bash
npm install --save @amplitude/experiment-node-server
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/experiment-node-server
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="tip" heading="Quick start"}}
1. [Initialize the experiment client](#initialize)
2. [Fetch variants for the user](#fetch)
3. [Access a flag's variant](#fetch)

```js
import { Experiment } from '@amplitude/experiment-node-server';

// (1) Initialize the experiment client
const experiment = Experiment.initializeRemote('<DEPLOYMENT_KEY>', {
    fetchTimeoutMillis: 500,
    fetchRetries: 1,
    fetchRetryBackoffMinMillis: 0,
    fetchRetryTimeoutMillis: 500,
});

// (2) Fetch variants for a user
const user = {
    user_id: 'user@company.com',
    device_id: 'abcdefg',
    user_properties: {
        'premium': true,
    },
};
const variants = experiment.fetchV2(user);

// (3) Access a flag's variant
const variant = variants['YOUR-FLAG-KEY'];
if (variant?.value === 'on') {
    // Flag is on
} else {
    // Flag is off
}
```
{{/partial:admonition}}

### Initialize remote

The SDK client should be initialized in your server on startup. The [deployment key](/docs/feature-experiment/data-model#deployments) argument passed into the `apiKey` parameter must live within the same project that you are sending analytics events to.

```js
initializeRemote(apiKey: string, config?: RemoteEvaluationConfig): RemoteEvaluationClient
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The [deployment key](/docs/feature-experiment/data-model#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

{{partial:admonition type="warning" heading="Timeout and retry configuration"}}
**The default timeout and retry configuration options are too high for most server environments**. Configure the timeout and retry options to best fit your performance requirements. If [remote evaluation performance](/docs/feature-experiment/under-the-hood/performance-and-caching#remote-evaluation) is too slow, consider using [local evaluation](#local-evaluation).
{{/partial:admonition}}

```js
import { Experiment } from '@amplitude/experiment-node-server';

const experiment = Experiment.initializeRemote('<DEPLOYMENT_KEY>', config: {
    fetchTimeoutMillis: 500,
    fetchRetries: 1,
    fetchRetryBackoffMinMillis: 0,
    fetchRetryTimeoutMillis: 500,
});
```

#### Configuration

The SDK client can be configured on initialization.

{{partial:admonition type="info" heading="EU data center"}}
If you're using Amplitude's EU data center, configure the `serverZone` option on initialization.
{{/partial:admonition}}

| Name  | Description | Default Value |
| --- | --- | --- |
| `debug` | Enable additional debug logging. | `false` |
| `logLevel` | The minimum log level to output. Options: `Verbose`, `Debug`, `Info`, `Warn`, `Error`, `Disable`. Go to [custom logging](#custom-logging). | `Error` |
| `loggerProvider` | Custom logger implementation. Implement the `LoggerProvider` interface to integrate with your logging solution. Go to [custom logging](#custom-logging). | `ConsoleLogger` |
| `serverZone` | The Amplitude data center to use. Either `"us"` or `"eu"` | `"us"` |
| `serverUrl` | The host to fetch variants from. | `https://api.lab.amplitude.com` |
| `fetchTimeoutMillis` | The timeout for fetching variants in milliseconds. This timeout only applies to the initial request, not subsequent retries | `10000` |
| `fetchRetries` | The number of retries to attempt if a request to fetch variants fails. | `8` |
| `fetchRetryBackoffMinMillis` | The minimum (initial) backoff after a request to fetch variants fails. This delay is scaled by the `fetchRetryBackoffScalar` | `500` |
| `fetchRetryBackoffMaxMillis` | The maximum backoff between retries. If the scaled backoff becomes greater than the max, the max is used for all subsequent requests | `10000` |
| `fetchRetryBackoffScalar` | Scales the minimum backoff exponentially. | `1.5` |
| `fetchRetryTimeoutMillis` | The request timeout for retrying variant fetches. | `10000` |

### Fetch

Fetches variants for a [user](/docs/feature-experiment/data-model#users) and returns the results. This function [remote evaluates](/docs/feature-experiment/remote-evaluation) the user for flags associated with the deployment used to initialize the SDK client.

```js
fetchV2(user: ExperimentUser, fetchOptions?: FetchOptions): Promise<Variants>
```

| Parameter  | Requirement | Description |
| --- | --- | --- |
| `user` | required | The [user](/docs/feature-experiment/data-model#users) for whom variants should be fetched. |
| `fetchOptions` | optional | The [options](#fetch-options) for the fetch request. |

**FetchOptions**

| Name | Description | Default Value |
| --- | --- | --- |
| `flagKeys` | Specific flags or experiments to evaluate. If undefined, null, or empty, all flags and experiments are evaluated. | `undefined` |
| `tracksExposure` | To track or not track an exposure event for this fetch request. If `undefined`, uses the server's default behavior (does not track exposure). | `undefined` |
| `tracksAssignment` | To track or not track an assignment event for this fetch request. If `undefined`, uses the server's default behavior (does track assignment). | `undefined` |

```js
const user = {
    user_id: 'user@company.com',
    device_id: 'abcdefg',
    user_properties: {
        'premium': true,
    },
};
const variants = await experiment.fetchV2(user);
```

After fetching variants for a user, you may to access the variant for a specific flag.

```js
const variant = variants['YOUR-FLAG-KEY'];
if (variant?.value === 'on') {
    // Flag is on
} else {
    // Flag is off
}
```

## Local evaluation

Implements evaluating variants for a user via [local evaluation](/docs/feature-experiment/local-evaluation). If you plan on using local evaluation, you should [understand the tradeoffs](/docs/feature-experiment/local-evaluation#targeting-capabilities).

### Install

Install the Node.js Server SDK with `npm` or `yarn`.

{{partial:tabs tabs="npm, yarn"}}
{{partial:tab name="npm"}}
```bash
npm install --save @amplitude/experiment-node-server
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/experiment-node-server
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="tip" heading="Quick start"}}
1. [Initialize the local evaluation client.](#initialize-local)
2. [Start the local evaluation client.](#start)
3. [Evaluate a user.](#evaluate)

```js
import { Experiment } from '@amplitude/experiment-node-server';

// (1) Initialize the local evaluation client with a server deployment key.
const experiment = Experiment.initializeLocal('<DEPLOYMENT_KEY>', {
  // (Recommended) Enable local evaluation cohort targeting.
  cohortSyncConfig: {
    apiKey: '<API_KEY>',
    secretKey: '<SECRET_KEY>'
  }
});

// (2) Start the local evaluation client.
await experiment.start();

// (2) Evaluate a user.
const user = { device_id: 'abcdefg' };
const variants = experiment.evaluateV2(user);
```
{{/partial:admonition}}

{{partial:collapse name="Account-level bucketing and analysis (v1.5.0+)"}}
If your organization has purchased the [Accounts add-on](/docs/analytics/account-level-reporting) you may perform bucketing and analysis on groups rather than users. Reach out to your representative to gain access to this beta feature.

Groups must either be included in the user sent with the fetch request (recommended), or identified with the user via a group identify call from the [Group Identify API](/docs/apis/analytics/group-identify) or via [`setGroup()` from an analytics SDK](/docs/sdks/analytics/browser/browser-sdk-2#user-groups).

```js
await fetch({
    user_id: 'user@company.com',
    device_id: 'abcdefg',
    user_properties: {
        'premium': true,
    },
    groups: {'org name': ['Amplitude']}
});
```

To pass freeform group properties, see this example:

```js
await fetch({
    user_id: 'user@company.com',
    device_id: 'abcdefg',
    user_properties: {
        'premium': true,
    },
    group_properties: {'org name': ['Amplitude']}
});
```

{{/partial:collapse}}

### Initialize Local

Initializes a [local evaluation](/docs/feature-experiment/local-evaluation) client.

{{partial:admonition type="warning" heading="Server deployment key"}}
You must [initialize](#initialize-local) the local evaluation client with a server [deployment](/docs/feature-experiment/data-model#deployments) key to get access to local evaluation flag configs.
{{/partial:admonition}}

```js
initializeLocal(apiKey: string, config?: LocalEvaluationConfig): LocalEvaluationClient
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The server [deployment key](/docs/feature-experiment/data-model#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

{{partial:admonition type="tip" heading="Flag streaming"}}
Use the `streamUpdates` [configuration](#configuration) to get flag config updates pushed to SDK (default false), instead of polling every `flagConfigPollingIntervalMillis` milliseconds. The time for SDK to receive the update after saving is generally under 1 second. It will fallback to polling if streaming failed. Configure `flagConfigPollingIntervalMillis` [configuration](#configuration) as well for fallback.
{{/partial:admonition}}

#### Configuration

You can configure the SDK client on initialization.

{{partial:admonition type="info" heading="EU data center"}}
If you're using Amplitude's EU data center, configure the `serverZone` option on initialization.
{{/partial:admonition}}

**LocalEvaluationConfig**

| Name | Description | Default Value |
| --- | --- | --- |
| `debug` | Set to `true` to enable debug logging. | `false` |
| `logLevel` | The minimum log level to output. Options: `Verbose`, `Debug`, `Info`, `Warn`, `Error`, `Disable`. See [custom logging](#custom-logging). | `Error` |
| `loggerProvider` | Custom logger implementation. Implement the `LoggerProvider` interface to integrate with your logging solution. See [custom logging](#custom-logging). | `ConsoleLogger` |
| `serverZone` | The Amplitude data center to use. Either `"us"` or `"eu"` | `"us"` |
| `serverUrl` | The host to fetch flag configurations from. | `https://api.lab.amplitude.com` |
| `bootstrap` | Bootstrap the client with a map of flag key to flag configuration | `{}` |
| `flagConfigPollingIntervalMillis` | The interval (in milliseconds) to poll for updated flag configs after calling `start()` | `30000` |
| `assignmentConfig` | **Deprecated.** Configuration for automatically tracking assignment events after an evaluation. | `null` |
| `exposureConfig` | Configuration for tracking exposure events after an evaluation. | `null` |
| `streamUpdates` | Enable streaming to replace polling for receiving flag config updates. Instead of polling every second, our servers push updates to SDK generally within a second. If stream fails for any reason, it will fallback to polling automatically and retry streaming after some interval. | `false` |
| `streamServerUrl` | The stream server url to stream from. | `https://stream.lab.amplitude.com` |
| `streamFlagConnTimeoutMillis` | The timeout for establishing a valid flag config stream. This includes time for a connection to be established to stream server and time for receiving initial flag configs. | `1500` |
| `cohortSyncConfig` | Configuration to enable cohort downloading for [local evaluation cohort targeting](#local-evaluation-cohort-targeting). | `undefined` |

**AssignmentConfig**

| Name | Description | Default Value |
| --- | --- | --- |
| `apiKey` | The analytics API key and NOT the experiment deployment key | *required* |
| `cacheCapacity` | The maximum number of assignments stored in the assignment cache | `65536` |
| [Analytics SDK Options](/docs/sdks/analytics/browser/browser-sdk-2#configure-the-sdk) | Options to configure the underlying Amplitude Analytics SDK used to track assignment events |  |

**ExposureConfig**

| Name | Description | Default Value |
| --- | --- | --- |
| `apiKey` | The analytics API key and NOT the experiment deployment key | *required* |
| `cacheCapacity` | The maximum number of exposures stored in the exposure cache | `65536` |
| [Analytics SDK Options](/docs/sdks/analytics/browser/browser-sdk-2#configure-the-sdk) | Options to configure the underlying Amplitude Analytics SDK used to track exposure events |  |

**CohortSyncConfig**

| Name | Description                                                                                                                                                                   | Default Value |
|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| --- |
| `apiKey`                           | The analytics API key and NOT the experiment deployment key                                                                                                                   | *required* |
| `secretKey`                        | The analytics secret key                                                                                                                                                      | *required* |
| `maxCohortSize`                    | The maximum size of cohort that the SDK will download. Cohorts larger than this size will not be downloaded.                                                                  | `2147483647` |
| `cohortPollingIntervalMillis`      | The interval, in milliseconds, to poll Amplitude for cohort updates (60000 minimum).                                                                                          | `60000` |
| `cohortServerUrl`                  | The cohort server endpoint from which to fetch cohort data. For hitting the EU data center, set `serverZone` to `eu`. Setting this value will override `serverZone` defaults. | `https://cohort-v2.lab.amplitude.com` |

### Start

Start the local evaluation client, pre-fetching local evaluation mode flag configs for [evaluation](#evaluate) and starting the flag config poller at the [configured](#configuration) interval.

```js
start(): Promise<void>
```

You should await the result of `start()` to ensure that flag configs are ready to be used before calling [`evaluateV2()`](#evaluate)

```js
await experiment.start();
```

### Evaluate

Executes the [evaluation logic](/docs/feature-experiment/implementation) using the flags pre-fetched on [`start()`](#start). You must give evaluate a user object argument. You can optionally pass an array of flag keys if you require only a specific subset of required flag variants.

{{partial:admonition type="tip" heading="Exposure tracking"}}
Set [`exposureConfig`](#configuration) to enable exposure tracking. Then, set `tracksExposure` to `true` in `EvaluateOptions` when calling `evaluateV2()`.
{{/partial:admonition}}

```js
evaluateV2(user: ExperimentUser, flagKeys?: string[], options?: EvaluateOptions): Record<string, Variant>
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `user` | required | The [user](/docs/feature-experiment/data-model#users) to evaluate. |
| `flagKeys` | optional | Specific flags or experiments to evaluate. If undefined, null, or empty, all flags and experiments are evaluated. |
| `options` | optional | The [options](#evaluate-options) for the evaluation request. |

```js
// The user to evaluate
const user = { device_id: 'abcdefg' };

// Evaluate all flag variants
const allVariants = experiment.evaluateV2(user);

// Evaluate a specific subset of flag variants
const specificVariants = experiment.evaluateV2(user, [
  'my-local-flag-1',
  'my-local-flag-2',
]);
```

**EvaluateOptions**

| Name | Description | Default Value |
| --- | --- | --- |
| `tracksExposure` | If `true`, the SDK tracks an exposure event for the evaluated variants. | `false` |

### Local evaluation cohort targeting

Since version `1.10.0`, the local evaluation SDK client supports downloading cohorts for local evaluation targeting. You must configure the `cohortSyncConfig` option with the analytics `apiKey` and `secretKey` on initialization to enable this support.

```js
const experiment = Experiment.initializeLocal('<DEPLOYMENT_KEY>', {
  // (Recommended) Enable local evaluation cohort targeting.
  cohortSyncConfig: {
    apiKey: '<API_KEY>',
    secretKey: '<SECRET_KEY>'
  }
});
```

Consider configuring the `maxCohortSize` to avoid downloading large cohorts which may cause your service to run out of memory. Cohorts that are too large will not be downloaded.

## Custom logging

Control log verbosity with the `logLevel` configuration, or implement the `LoggerProvider` interface to integrate your own logger.

### Log levels

- `Verbose`: Detailed debugging logs
- `Debug`: Development and troubleshooting logs
- `Info`: General information
- `Warn`: Warnings
- `Error`: Errors (default)
- `Disable`: No logs

### Custom logger

Implement the `LoggerProvider` interface to use your own logging solution:

```ts
import { Experiment, LogLevel, LoggerProvider } from '@amplitude/experiment-node-server';

class MyCustomLogger implements LoggerProvider {
  verbose(message, ...optionalParams) {
    // Implement verbose logging
  }

  debug(message, ...optionalParams) {
    // Implement debug logging
  }

  info(message, ...optionalParams) {
    // Implement info logging
  }

  warn(message, ...optionalParams) {
    // Implement warn logging
  }

  error(message, ...optionalParams) {
    // Implement error logging
  }
}

// Initialize with custom logger
const experiment = Experiment.initializeLocal(
  '<DEPLOYMENT_KEY>',
  {
    logLevel: LogLevel.Debug,
    loggerProvider: new MyCustomLogger()
  }
);
```

{{partial:admonition type="note" heading="Backward compatibility"}}
The `debug` configuration field is still supported. When set to `true`, it overrides `logLevel` to `Debug`.
{{/partial:admonition}}

## Access Amplitude cookies

If you use the Amplitude Analytics SDK on the client-side, the Node.js server SDK provides an `AmplitudeCookie` class with convenience functions for parsing and interacting with the Amplitude identity cookie. This is useful for server-side rendering (SSR) use cases, where you need to:

- Maintain consistent Device IDs between server-rendered and client-side code.
- Access the user's Amplitude identity before the page renders.
- Generate and set cookies on the server when they don't exist yet.

This ensures that the Device ID on the server matches the Device ID set on the client, even if the client hasn't generated a Device ID yet.

```js
import { AmplitudeCookie } from '@amplitude/experiment-node-server';
import { v4 as uuidv4 } from 'uuid';
// Get the cookie name for the Amplitude API key
// For Browser SDK 2.0 cookies, pass true as second parameter:
// const ampCookieName = AmplitudeCookie.cookieName('amplitude-api-key', true);
const ampCookieName = AmplitudeCookie.cookieName('amplitude-api-key');
let deviceId = null;
// Try to get device ID from existing cookie
if (req.cookies[ampCookieName]) {
  deviceId = AmplitudeCookie.parse(req.cookies[ampCookieName]).device_id;
  // For Browser SDK 2.0: AmplitudeCookie.parse(req.cookies[ampCookieName], true).device_id;
}
// If no device ID found, generate a new one and set the cookie
if (!deviceId) {
  deviceId = uuidv4();
  const ampCookieValue = AmplitudeCookie.generate(deviceId);
  // For Browser SDK 2.0: AmplitudeCookie.generate(deviceId, true);
  res.cookie(ampCookieName, ampCookieValue, {
    domain: '.your-domain.com', // this should be the same domain used by the Amplitude JS SDK
    httpOnly: false,
    secure: false
  });
}
```

