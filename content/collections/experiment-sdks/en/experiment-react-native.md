---
id: 3f748a4b-f71d-4eb8-9e0a-72360f774bfa
blueprint: experiment-sdk
title: 'Experiment React Native SDK'
source: 'https://www.docs.developers.amplitude.com/experiment/sdks/react-native-sdk/'
sdk_status: current
article_type: core
supported_languages:
  - js
landing: false
github_link: 'https://github.com/amplitude/experiment-react-native-client'
releases_url: 'https://github.com/amplitude/experiment-react-native-client/releases'
shields_io_badge: 'https://img.shields.io/npm/v/@amplitude/experiment-react-native-client'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717526489
logo: icons/react.svg
---
Official documentation for Amplitude Experiment's Client-side React Native SDK.

## Install

Install the Experiment JavaScript Client SDK. This library depends on `@react-native-async-storage/async-storage` which you also need to install.

{{partial:admonition type="info" heading="Web and Expo support"}}
This SDK can be used for react-native apps built for web or built using [Expo](https://expo.dev/) (Expo Go not yet supported).
{{/partial:admonition}}

{{partial:tabs tabs="npm, yarn, expo"}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/experiment-react-native-client
npm install @react-native-async-storage/async-storage
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/experiment-react-native-client
yarn add @react-native-async-storage/async-storage
```
{{/partial:tab}}
{{partial:tab name="expo"}}
```bash
expo install @amplitude/experiment-react-native-client
expo install @react-native-async-storage/async-storage
```
{{/partial:tab}}
{{/partial:tabs}}

You need to install the native modules to run the SDK on iOS.

```bash
cd ios
pod install
```

{{partial:admonition type="tip" heading="Quick start"}}
The right way to initialize the Experiment SDK depends on whether you use an Amplitude SDK for analytics or a third party (for example, Segment).

{{partial:tabs tabs="Amplitude, Third party"}}
{{partial:tab name="Amplitude"}}
1. [Initialize the experiment client](#initialize)
2. [Fetch variants](#fetch)
3. [Access a flag's variant](#variant)

```js
import { Experiment } from '@amplitude/experiment-react-native-client';

// (1) Initialize the experiment client with Amplitude Analytics.
const experiment = Experiment.initializeWithAmplitudeAnalytics(
    'DEPLOYMENT_KEY'
);

// (2) Fetch variants and await the promise result.
await experiment.fetch();

// (3) Lookup a flag's variant.
const variant = experiment.variant('FLAG_KEY');
if (variant.value === 'on') {
    // Flag is on
} else {
    // Flag is off
}
```

{{/partial:tab}}
{{partial:tab name="Third party"}}
1. [Initialize the experiment client](#initialize)
2. [Fetch variants for a user](#fetch)
3. [Access a flag's variant](#variant)

```js
import { Experiment } from '@amplitude/experiment-react-native-client';

// (1) Initialize the experiment client with Amplitude Analytics and
// implement an exposure tracking provider.
const experiment = Experiment.initialize(
   'DEPLOYMENT_KEY',
   {
       exposureTrackingProvider: {
           track: (exposure) => {
               // TODO: Implement exposure tracking
               // analytics.track('$exposure', exposure)
           }
       }
   }
);

// (2) Fetch variants with the user and await the promise result.
const user = {
   user_id: 'user@company.com',
   device_id: 'abcdefg',
   user_properties: {
       premium: true,
   },
}
await experiment.start(user);

// (3) Lookup a flag's variant.
const variant = experiment.variant('FLAG_KEY');
if (variant.value === 'on') {
   // Flag is on
} else {
   // Flag is off
}
```

{{/partial:tab}}
{{/partial:tabs}}
{{/partial:admonition}}

## Initialize

The SDK client should be initialized in your application on startup. The [deployment key](/docs/feature-experiment/data-model#deployments) argument passed into the `apiKey` parameter must live within the same project that you are sending analytics events to.

{{partial:tabs tabs="Amplitude, Third party"}}
{{partial:tab name="Amplitude"}}
```js
initializeWithAmplitudeAnalytics(apiKey: string, config?: ExperimentConfig): ExperimentClient
```
{{/partial:tab}}
{{partial:tab name="Third party"}}
```js
initialize(apiKey: string, config?: ExperimentConfig): ExperimentClient
```
{{/partial:tab}}
{{/partial:tabs}}

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The [deployment key](/docs/feature-experiment/data-model#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

The initializer returns a singleton instance, so subsequent initializations for the same instance name will always return the initial instance. To create multiple instances, use the `instanceName` [configuration](#configuration).

{{partial:tabs tabs="Amplitude, Third party"}}
{{partial:tab name="Amplitude"}}
```js
import { Experiment } from '@amplitude/experiment-js-client';

const experiment = initializeWithAmplitudeAnalytics('DEPLOYMENT_KEY');
```

{{partial:admonition type="note" heading="Instance name"}}
If you're using a custom instance name for analytics, you need to set the same value in the `instanceName` [configuration option](#configuration) in the experiment SDK, or visa versa.
{{/partial:admonition}}
{{/partial:tab}}
{{partial:tab name="Third party"}}
```js
import { Experiment } from '@amplitude/experiment-js-client';

const experiment = Experiment.initialize(
    'DEPLOYMENT_KEY',
    {
        exposureTrackingProvider: {
            track: (exposure) => {
                // TODO: Implement exposure tracking
                // analytics.track('$exposure', exposure)
            }
        }
    }
);
```
{{/partial:tab}}
{{/partial:tabs}}


### Configuration

SDK client configuration occurs during initialization.

| <div class="big-column">Name</div> | Description | Default Value                |
| --- | --- |------------------------------|
| `debug` | Enable additional debug logging within the SDK. Should be set to false in production builds. | `false`                      |
| `fallbackVariant` | The default variant to fall back if a variant for the provided key doesn't exist. | `{}`                         |
| `initialVariants` | An initial set of variants to access. This field is valuable for bootstrapping the client SDK with values rendered by the server using server-side rendering (SSR). | `{}`                         |
| `source` | The primary source of variants. Set the value to `Source.InitialVariants` and configured `initialVariants` to bootstrap the SDK for SSR or testing purposes. | `Source.LocalStorage`        |
| `serverZone` | Select the Amplitude data center to get flags and variants from, `us` or `eu`. | `us`                         |
| `serverUrl` | The host to fetch remote evaluation variants from. For hitting the EU data center, use `serverZone`. | `https://api.lab.amplitude.com` |
| `flagsServerUrl` | The host to fetch local evaluation flags from. For hitting the EU data center, use `serverZone`. | `https://flag.lab.amplitude.com` |
| `fetchTimeoutMillis` | The timeout for fetching variants in milliseconds. | `10000`                      |
| `retryFetchOnFailure` | Whether to retry variant fetches in the background if the request doesn't succeed. | `true`                       |
| `automaticExposureTracking` | If true, calling [`variant()`](#variant) tracks an exposure event through the configured `exposureTrackingProvider`. If no exposure tracking provider is set, this configuration option does nothing.  | `true`                       |
| `fetchOnStart` | If true or undefined, always [fetch](#fetch) remote evaluation variants on [start](#start). If false, never fetch on start. | `true`                       |
| `pollOnStart` | Poll for local evaluation flag configuration updates once per minute on [start](#start). | `true`                       |
| `automaticFetchOnAmplitudeIdentityChange` | Only matters if you use the `initializeWithAmplitudeAnalytics` initialization function to seamlessly integrate with the Amplitude Analytics SDK. If `true` any change to the user ID, device ID or user properties from analytics triggers the experiment SDK to fetch variants and update it's cache. | `false`                      |
| `userProvider` | An interface used to provide the user object to `fetch()` when called. | `null`                       |
| `exposureTrackingProvider` | Implement and configure this interface to track exposure events through the experiment SDK, either automatically or explicitly. | `null`                       |
| `instanceName` | Custom instance name for experiment SDK instance. **The value of this field is case-sensitive.** | `null`                       |
| `initialFlags` | A JSON string representing an initial set of flag configurations to use for local evaluation. | `undefined`                  |
| `httpClient` | (Advanced) Use your own HTTP client implementation to handle network requests made by the SDK. | Default HTTP client                     |

{{partial:admonition type="info" heading="EU data center"}}
If you're using Amplitude's EU data center, configure the `serverZone` option on initialization to `eu`.
{{/partial:admonition}}

### Integrations

If you use either Amplitude or Segment Analytics SDKs to track events into Amplitude, Amplitude recommends that you set up an integration on initialization. Integrations implement [provider](#providers) interfaces to enable a more streamlined developer experience by making it easier to **manage user identity** and **track exposures events**.

{{partial:collapse name="Amplitude integration"}}
The Amplitude Experiment SDK is set up to integrate seamlessly with the Amplitude Analytics SDK.

```js
import * as amplitude from '@amplitude/analytics-browser';
import { Experiment } from '@amplitude/experiment-js-client';

amplitude.init('API_KEY');
const experiment = Experiment.initializeWithAmplitudeAnalytics('DEPLOYMENT_KEY'); //[tl! ~~]
```

When you use the integration initializer, it configures implementations of the [user provider](#user-provider) and [exposure tracking provider](#exposure-tracking-provider) interfaces to pull user data from the Amplitude Analytics SDK and track exposure events.
{{/partial:collapse}}

{{partial:collapse name="Segment integration"}}
When you use Segment as your analytics provider, configure the integration with Experiment manually on initialization with an instance of the exposure tracking provider. Ensure this happens after the analytics SDK loads and initializes.

```js
analytics.ready(() => {
    const experiment =  Experiment.initialize('DEPLOYMENT_KEY', {
        exposureTrackingProvider: {
            track: (exposure) => {
                analytics.track('$exposure', exposure)
            }
        }
    });
});
```

When [fetching variants](#fetch), pass the segment anonymous ID and user ID for the device ID and user ID, respectively.

```js
await experiment.fetch({
    user_id: analytics.user().id(),
    device_id: analytics.user().analyticsId(),
});
```
{{/partial:collapse}}

## Fetch

Fetches variants for a [user](/docs/feature-experiment/data-model#users) and store the results in the client for fast access. This function [remote evaluates](/docs/feature-experiment/remote-evaluation) the user for flags associated with the deployment used to initialize the SDK client.

```js
fetch(user?: ExperimentUser): Promise<Client>
```

| Parameter  | Requirement | Description |
| --- | --- | --- |
| `user` | optional | Explicit [user](/docs/feature-experiment/data-model#users) information to pass with the request to evaluate. This user information is merged with user information provided from [integrations](#integrations) via the [user provider](#user-provider), preferring properties passed explicitly to `fetch()` over provided properties. |

Amplitude Experiment recommends calling `fetch()` during application start up so that the user gets the most up-to-date variants for the application session. Furthermore, should wait for the fetch request to return a result before rendering the user experience to avoid the interface "flickering".

```js
const user = {
    user_id: 'user@company.com',
    device_id: 'abcdefg',
    user_properties: {
        'premium': true,
    },
};
await experiment.fetch(user);
```

If you're using an [integration](#integrations) or a custom [user provider](#user-provider) then you can fetch without inputting the user.

```js
await experiment.fetch();
```

{{partial:admonition type="tip" heading="Fetch when user identity changes"}}
If you want the most up-to-date variants for the user, it's recommended that you call `fetch()` whenever the user state changes in a meaningful way. For example, if the user logs in and receives a user ID, or has a user property set which may effect flag or experiment targeting rules.

In the case of **user properties**, Amplitude recommends passing new user properties explicitly to `fetch()` instead of relying on user enrichment prior to [remote evaluation](/docs/feature-experiment/remote-evaluation). This is because user properties that are synced remotely through a separate system have no timing guarantees with respect to `fetch()`--i.e. a race.
{{/partial:admonition}}

If `fetch()` times out (default 10 seconds) or fails for any reason, the SDK client will return and retry in the background with back-off. You may configure the timeout or disable retries in the [configuration options](#configuration) when the SDK client is initialized.

{{partial:collapse name="Account-level bucketing and analysis (v1.1.0+)"}}
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

## Start

{{partial:admonition type="info" heading="Fetch vs start"}}
Use `start` if you're using client-side [local evaluation](/docs/feature-experiment/local-evaluation). If you're only using [remote evaluation](/docs/feature-experiment/remote-evaluation), call [fetch](#fetch) instead of `start`.
{{/partial:admonition}}

Start the Experiment SDK to get flag configurations from the server and fetch remote evaluation variants for the user. The SDK is ready once the returned promise resolves.

```js
start(user?: ExperimentUser): Promise<void>
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `user` | optional | Explicit [user](/docs/feature-experiment/data-model#users) information to pass with the request to fetch variants. This user information merges with user information from any [integrations](#integrations) through the [user provider](#user-provider), and prefers properties passed explicitly to `fetch()` over provided properties. Also sets the user in the SDK for reuse. | `undefined` |

Call `start()` when your application is initializing, after user information is available to use to evaluate or [fetch](#fetch) variants. The returned promise resolves after loading local evaluation flag configurations and fetching remote evaluation variants.

Set `fetchOnStart` in the SDK configuration to set the behavior of `start()` to improve the performance of your application.

* If your application never relies on remote evaluation, set `fetchOnStart` to `false` to avoid increased startup latency caused by remote evaluation.
* If your application relies on remote evaluation, but not right at startup, you may set `fetchOnStart` to `false` and call `fetch()` and await the promise separately.

{{partial:tabs tabs="Amplitude, Third party"}}
{{partial:tab name="Amplitude"}}
```js
await experiment.start();
```
{{/partial:tab}}
{{partial:tab name="Third party"}}
```js
const user = {
    user_id: 'user@company.com',
    device_id: 'abcdefg',
    user_properties: {
        premium: true
    }
};
await experiment.start(user);
```
{{/partial:tab}}
{{/partial:tabs}}

If the client is bootstrapped with `initialVariants` or `initialFlags` and doesn't need to await the results of `start()`, call and await `cacheReady()` to ensure variants and flags have been loaded from async storage.

## Variant

Access a [variant](/docs/feature-experiment/data-model#variants) for a [flag or experiment](/docs/feature-experiment/data-model#flags-and-experiments) from the SDK client's local store.

{{partial:admonition type="info" heading="Automatic exposure tracking"}}
When an [integration](#integrations) is used or a custom [exposure tracking provider](#exposure-tracking-provider) is set, `variant()` will automatically track an exposure event through the tracking provider. To disable this functionality, [configure](#configuration) `automaticExposureTracking` to be `false`, and track exposures manually using [`exposure()`](#exposure).
{{/partial:admonition}}

```js
variant(key: string, fallback?: string | Variant): Variant
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `key` | required | The **flag key** to identify the [flag or experiment](/docs/feature-experiment/data-model#flags-and-experiments) to access the variant for. |
| `fallback` | optional | The value to return if no variant was found for the given `flagKey`. |

When determining which variant a user has been bucketed into, you'll want to compare the variant `value` to a well-known string.

```js
const variant = experiment.variant('<FLAG_KEY>');
if (variant.value === 'on') {
    // Flag is on
} else {
    // Flag is off
}
```

{{partial:admonition type="info" heading="Access a variant's payload"}}
A variant may also be configured with a dynamic [payload](/docs/feature-experiment/data-model#variants) of arbitrary data. Access the `payload` field from the variant object after checking the variant's `value`.

```js
const variant = experiment.variant('<FLAG_KEY>');
if (variant.value === 'on') {
    const payload = variant.payload;
}
```
{{/partial:admonition}}

A `null` variant `value` means that the user hasn't been bucketed into a variant. You may use the built in **fallback** parameter to provide a variant to return if the store doesn't contain a variant for the given flag key.

```js
const variant = experiment.variant('<FLAG_KEY>', { value: 'control' });
if (variant === 'control') {
    // Control
} else if (variant === 'treatment') {
    // Treatment
}
```

## All

Access all [variants](/docs/feature-experiment/data-model#variants) stored by the SDK client.

```js
all(): Variants
```

## Clear

Clear all [variants](/docs/feature-experiment/data-model#variants) in the cache and storage.

```js
clear(): void
```

You can call `clear` after user logout to clear the variants in cache and storage.

```js
experiment.clear();
```

## Exposure

Manually track an [exposure event](/docs/feature-experiment/under-the-hood/event-tracking#exposure-events) for the current variant of the given flag key through configured [integration](#integrations) or custom [exposure tracking provider](#exposure-tracking-provider). Generally used in conjunction with setting the `automaticExposureTracking` [configuration](#configuration) optional to `false`.

```js
exposure(key: string): void
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `key` | required | The **flag key** to identify the [flag or experiment](/docs/feature-experiment/data-model#flags-and-experiments) variant to track an [exposure event](/docs/feature-experiment/under-the-hood/event-tracking#exposure-events) for. |

```js
const variant = experiment.variant('<FLAG_KEY>');

// Do other things...

experiment.exposure('<FLAG_KEY>');
if (variant === 'control') {
    // Control
} else if (variant === 'treatment') {
    // Treatment
}
```

## Providers

{{partial:admonition type="tip" heading="Integrations"}}
If you use Amplitude or Segment analytics SDKs along side the Experiment Client SDK, Amplitude recommends you use an [integration](#integrations) instead of implementing custom providers.
{{/partial:admonition}}

Provider implementations enable a more streamlined developer experience by making it easier to manage user identity and track exposures events.

### User provider

The user provider is used by the SDK client to access the most up-to-date user information only when it's needed (for example, when [`fetch()`](#fetch) is called). This provider is optional, but helps if you have a user information store already set up in your application. This way, you don't need to manage two separate user info stores in parallel, which may result in a divergent user state if the application user store is updated and experiment isn't (or vice versa).

```js
interface ExperimentUserProvider {
  getUser(): ExperimentUser;
}
```

To use your custom user provider, set the `userProvider` [configuration](#configuration) option with an instance of your custom implementation on SDK initialization.

```js
const experiment = Experiment.initialize('<DEPLOYMENT_KEY>', {
    userProvider: new CustomUserProvider(),
});
```

### Exposure tracking provider

Implementing an exposure tracking provider is highly recommended. [Exposure tracking](/docs/feature-experiment/under-the-hood/event-tracking#exposure-events) increases the accuracy and reliability of experiment results and improves visibility into which flags and experiments a user is exposed to.

```js title="ExposureTrackingProvider"
export interface ExposureTrackingProvider {
  track(exposure: Exposure): void;
}
```

The implementation of `track()` should track an event of type `$exposure` (a.k.a name) with two event properties, `flag_key` and `variant`, corresponding to the two fields on the `Exposure` object argument. Finally, the event tracked must eventually end up in Amplitude Analytics for the same project that the [deployment] used to [initialize](#initialize) the SDK client lives within, and for the same user that variants were [fetched](#fetch) for.

To use your custom user provider, set the `exposureTrackingProvider` [configuration](#configuration) option with an instance of your custom implementation on SDK initialization.

```js
const experiment = Experiment.initialize('<DEPLOYMENT_KEY>', {
    exposureTrackingProvider: new CustomExposureTrackingProvider(),
});
```

## Bootstrapping

You may want to bootstrap the experiment client with an initial set of flags and variants when variants are obtained from an external source (for example, not from calling `fetch()` on the SDK client). Use cases include [local evaluation](/docs/feature-experiment/local-evaluation), [server-side rendering](/docs/feature-experiment/advanced-techniques/server-side-rendering), or integration testing on specific variants.

To bootstrap the client, set the flags and variants in the `initialVariants` [configuration](#configuration) object, then set the `source` to `Source.InitialVariants` so that the SDK client prefers the bootstrapped variants over any previously fetched & stored variants for the same flags.

```js
const experiment = Experiment.initialize('<DEPLOYMENT_KEY>', {
    initialVariants: { /* Flags and variants */ },
    source: Source.InitialVariants,
});
```

## HTTP client

You can provide a custom HTTP client implementation to handle network requests made by the SDK. This is useful for environments with specific networking requirements or when you need to customize request handling.

```js title="HttpClient"
export interface SimpleResponse {
  status: number;
  body: string;
}

export interface HttpClient {
  request(
    requestUrl: string,
    method: string,
    headers: Record<string, string>,
    data: string,
    timeoutMillis?: number,
  ): Promise<SimpleResponse>;
}
```

To use your custom HTTP client, set the `httpClient` [configuration](#configuration) option with an instance of your implementation on SDK initialization.

```js
const experiment = Experiment.initialize('<DEPLOYMENT_KEY>', {
    httpClient: new CustomHttpClient(),
});
```

