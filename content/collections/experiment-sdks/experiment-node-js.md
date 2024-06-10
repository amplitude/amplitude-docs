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

This documentation has separate sections for [remote](/docs/docs/experiment/remote-evaluation) and [local](/docs/docs/experiment/local-evaluation) evaluation:

## Remote evaluation

Implements fetching variants for a user via [remote evaluation](/docs/docs/experiment/remote-evaluation).

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

The SDK client should be initialized in your server on startup. The [deployment key](/docs/docs/experiment/data-model#deployments) argument passed into the `apiKey` parameter must live within the same project that you are sending analytics events to.

```js
initializeRemote(apiKey: string, config?: RemoteEvaluationConfig): RemoteEvaluationClient
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The [deployment key](/docs/docs/experiment/data-model#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

!!!warning "Timeout & Retry Configuration"
{{partial:admonition type="warning" heading="Timeout and retry configuration"}}
**The default timeout and retry configuration options are too high for most server environments**. Configure the timeout and retry options to best fit your performance requirements. If [remote evaluation performance](/docs/docs/experiment/under-the-hood/performance-and-caching#remote-evaluation) is too slow, consider using [local evaluation](#local-evaluation).
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

| <div class="big-column">Name</div>  | Description | Default Value |
| --- | --- | --- |
| `debug` | Enable additional debug logging. | `false` |
| `serverUrl` | The host to fetch variants from. | `https://api.lab.amplitude.com` |
| `fetchTimeoutMillis` | The timeout for fetching variants in milliseconds. This timeout only applies to the initial request, not subsequent retries | `10000` |
| `fetchRetries` | The number of retries to attempt if a request to fetch variants fails. | `8` |
| `fetchRetryBackoffMinMillis` | The minimum (initial) backoff after a request to fetch variants fails. This delay is scaled by the `fetchRetryBackoffScalar` | `500` |
| `fetchRetryBackoffMaxMillis` | The maximum backoff between retries. If the scaled backoff becomes greater than the max, the max is used for all subsequent requests | `10000` |
| `fetchRetryBackoffScalar` | Scales the minimum backoff exponentially. | `1.5` |
| `fetchRetryTimeoutMillis` | The request timeout for retrying variant fetches. | `10000` |

!!!info "EU Data Center"
{{partial:admonition type="info" heading="EU data center"}}
If you're using Amplitude's EU data center, configure the `serverUrl` option on initialization to `https://api.lab.eu.amplitude.com`
{{/partial:admonition}}

### Fetch

Fetches variants for a [user](/docs/docs/experiment/data-model#users) and returns the results. This function [remote evaluates](/docs/docs/experiment/remote-evaluation) the user for flags associated with the deployment used to initialize the SDK client.

```js
fetchV2(user: ExperimentUser): Promise<Variants>
```

| Parameter  | Requirement | Description |
| --- | --- | --- |
| `user` | required | The [user](/docs/docs/experiment/data-model#users) to remote fetch variants for. |

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

Implements evaluating variants for a user via [local evaluation](/docs/docs/experiment/local-evaluation). If you plan on using local evaluation, you should [understand the tradeoffs](/docs/docs/experiment/local-evaluation#targeting-capabilities).

!!!note "Local Evaluation Mode"
{{partial:admonition type="note" heading="Local evaluation mode"}}
The local evaluation client can only evaluation flags which are [set to local evaluation mode](/docs/docs/experiment/advanced-techniques/create-a-local-evaluation-flag).
{{/partial:admonition}}

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
const experiment = Experiment.initializeLocal('<DEPLOYMENT_KEY>');

// (2) Start the local evaluation client.
await experiment.start();

// (2) Evaluate a user.
const user = { device_id: 'abcdefg' };
const variants = experiment.evaluateV2(user);
```
{{/partial:admonition}}

### Initialize Local

Initializes a [local evaluation](/docs/docs/experiment/local-evaluation) client.

{{partial:admonition type="warning" heading="Server deployment key"}}
You must [initialize](#initialize-local) the local evaluation client with a server [deployment](/docs/docs/experiment/data-model#deployments) key to get access to local evaluation flag configs.
{{/partial:admonition}}

```js
initializeLocal(apiKey: string, config?: LocalEvaluationConfig): LocalEvaluationClient
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The server [deployment key](/docs/docs/experiment/data-model#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

{{partial:admonition type="tip" heading="Flag polling interval"}}
Use the `flagConfigPollingIntervalMillis` [configuration](#configuration_1) to determine the time flag configs take to update once modified (default 30s).
{{/partial:admonition}}

{{partial:admonition type="tip" heading="Flag streaming"}}
Use the `streamUpdates` [configuration](#configuration_1) to get flag config updates pushed to SDK (default false), instead of polling every `flagConfigPollingIntervalMillis` milliseconds. The time for SDK to receive the update after saving is generally under 1 second. It will fallback to polling if streaming failed. Configure `flagConfigPollingIntervalMillis` [configuration](#configuration_1) as well for fallback. 
{{/partial:admonition}}

#### Configuration

You can configure the SDK client on initialization.

**LocalEvaluationConfig**

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `debug` | Set to `true` to enable debug logging. | `false` |
| `serverUrl` | The host to fetch flag configurations from. | `https://api.lab.amplitude.com` |
| `bootstrap` | Bootstrap the client with a map of flag key to flag configuration | `{}` |
| `flagConfigPollingIntervalMillis` | The interval (in milliseconds) to poll for updated flag configs after calling `start()` | `30000` |
| `assignmentConfig` | Configuration for automatically tracking assignment events after an evaluation. | `null` |
| `streamUpdates` | Enable streaming to replace polling for receiving flag config updates. Instead of polling every second, our servers push updates to SDK generally within a second. If stream fails for any reason, it will fallback to polling automatically and retry streaming after some interval. | `false` |
| `streamServerUrl` | The stream server url to stream from. | `https://stream.lab.amplitude.com` |
| `streamFlagConnTimeoutMillis` | The timeout for establishing a valid flag config stream. This includes time for a connection to be established to stream server and time for receiving initial flag configs. | `1500` |

**AssignmentConfig**

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `apiKey` | The analytics API key and NOT the experiment deployment key | *required* |
| `cacheCapacity` | The maximum number of assignments stored in the assignment cache | `65536` |
| [Analytics SDK Options](/docs/docs/sdks/analytics/browser/browser-sdk-2#configuration) | Options to configure the underlying Amplitude Analytics SDK used to track assignment events |  |

!!!info "EU Data Center"
{{partial:admonition type="info" heading="EU data center"}}
If you're using Amplitude's EU data center, configure the `serverUrl` option on initialization to `https://api.lab.eu.amplitude.com`

If you opted in for streaming flag config updates, configure the `streamServerUrl` option on initialization to `https://stream.lab.eu.amplitude.com`
{{/partial:admonition}}

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

Executes the [evaluation logic](/docs/docs/experiment/implementation) using the flags pre-fetched on [`start()`](#start). You must give evaluate a user object argument. You can optionally pass an array of flag keys if you require only a specific subset of required flag variants.

!!!tip "Automatic Assignment Tracking"
{{partial:admonition type="tip" heading="Automatic assignment tracking"}}
Set [`assignmentConfig`](#configuration_1) to automatically track an assignment event to Amplitude when `evaluateV2()` is called.
{{/partial:admonition}}

```js
evaluateV2(user: ExperimentUser, flagKeys?: string[]): Record<string, Variant>
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `user` | required | The [user](/docs/docs/experiment/data-model#users) to evaluate. |
| `flagKeys` | optional | Specific flags or experiments to evaluate. If undefined, null, or empty, all flags and experiments are evaluated. |

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

## Access Amplitude cookies

If you're using the Amplitude Analytics SDK on the client-side, the Node.js server SDK provides an `AmplitudeCookie` class with convenience functions for parsing and interacting with the Amplitude identity cookie. This is useful for ensuring that the Device ID on the server matches the Device ID set on the client, especially if the client hasn't yet generated a Device ID.

```js
import { AmplitudeCookie } from '@amplitude/experiment-node-server';

app.use((req, res, next) => {
  const { query, cookies, url, path, ip, host } = req

  // grab amp device id if present
  const ampCookieName = AmplitudeCookie.cookieName('amplitude-api-key');
  let deviceId = null;
  if (cookies[ampCookieName]) {
    deviceId = AmplitudeCookie.parse(cookies[ampCookieName]).device_id;
  }
  if (!deviceId) {
    // deviceId doesn't exist, set the Amplitude Cookie
    deviceId = random22CharBase64String();
    const ampCookieValue = AmplitudeCookie.generate(deviceId);
    res.cookie(ampCookieName, ampCookieValue, {
      domain: '.your-domain.com', // this should be the same domain used by the Amplitude JS SDK
      maxAge: 365 * 24 * 60 * 60 * 1000, // this is currently the same as the default in the Amplitude JS SDK, can be modified
      sameSite: 'Lax'
    });
  }

  next()
});
```