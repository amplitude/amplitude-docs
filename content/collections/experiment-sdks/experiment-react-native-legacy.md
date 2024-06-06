---
id: 02f37e03-e7c5-4324-835a-772a79e0963c
blueprint: experiment-sdk
title: 'Experiment React Native SDK (Legacy)'
source: 'https://www.docs.developers.amplitude.com/experiment/sdks/react-native-sdk-legacy/'
sdk_status: maintenance
article_type: core
supported_languages:
  - js
landing: false
github_link: 'https://github.com/amplitude/experiment-react-native-client'
releases_url: 'https://github.com/amplitude/experiment-react-native-client/releases'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717526405
bundle_url: 'https://badge.fury.io/js/@amplitude%2Fexperiment-react-native-client'
shields_io_badge: 'https://badge.fury.io/js/@amplitude%2Fexperiment-react-native-client.svg'
logo: icons/react.svg
---
{{partial:admonition type="warning" heading=""}}
This SDK is legacy and will only continue to receive bug fixes until it is eventually deprecated. We recommend upgrading to `v1.0.0+` which supports SDK integrations, React Native Web, Expo, and more.
{{/partial:admonition}}

Official documentation for Amplitude Experiment's Client-side React Native SDK.

## Install

{{partial:admonition type="warning" heading="Web compatibility"}}
Experiment React Native SDK is only compatible with iOS and Android React Native projects. Use the [JavaScript SDK](/docs/docs/sdks/experiment-sdks/experiment-javascript) to support all three platforms.
{{/partial:admonition}}

Install the Experiment JavaScript Client SDK.

{{partial:tabs tabs="npm, yarn"}}
{{partial:tab name="npm"}}
```bash
npm install --save @amplitude/experiment-react-native-client
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/experiment-react-native-client
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="tip" heading="Quick start"}}
1. [Initialize the experiment client](#initialize)
2. [Fetch variants for the user](#fetch)
3. [Access a flag's variant](#variant)

```js
// (1) Initialize the experiment client
await Experiment.initialize('<DEPLOYMENT_KEY>');

// (2) Fetch variants for a user
const user = {
    user_id: 'user@company.com',
    device_id: 'abcdefg',
    user_properties: {
        'premium': true,
    },
};
await Experiment.fetch(user);

// (3) Lookup a flag's variant
const variant = await Experiment.variant('<FLAG_KEY>');
if (variant.value === 'on') {
    // Flag is on
} else {
    // Flag is off
}
```
{{/partial:admonition}}

## Core functions

The following functions make up the core of the Experiment client-side SDK.

{{partial:admonition type="info" heading="Async functions"}}
Native SDKs are used under-the-hood, so you need to `await` the result of all functions.
{{/partial:admonition}}

### Initialize

The SDK client should be initialized in your application on startup. The [deployment key](/docs/docs/experiment/data-model#deployments) argument passed into the `apiKey` parameter must live within the same project that you are sending analytics events to.

```js
initialize(apiKey: string, config?: ExperimentConfig): Promise<boolean>
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The [deployment key](/docs/docs/experiment/data-model#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

The initializer returns a singleton instance, so subsequent initializations for the same instance name will always return the initial instance. To create multiple instances, use the `instanceName` [configuration](#configuration).

```js
const experiment = await Experiment.initialize('<DEPLOYMENT_KEY>');
```

#### Integrations

If you use either Amplitude or Segment Analytics SDKs to track events into Amplitude, you'll want to set up an integration on initialization. Integrations automatically implement [provider](#providers) interfaces to enable a more streamlined developer experience by making it easier to **manage user identity** and **track exposures events**.

{{partial:admonition type="info" heading="Amplitude integration"}}
The Amplitude Experiment SDK is set up to integrate seamlessly with the Amplitude Analytics SDK. All you need to do is update your SDK versions to the latest, and use the special integration initialization function.

```js hl_lines="2"
await Amplitude.getInstance().init('<API_KEY>');
await Experiment.initializeWithAmplitudeAnalytics('<DEPLOYMENT_KEY>');
```

Note that, if you are using a custom instance name for analytics, you will need to set the same value in the `instanceName` [configuration option](#configuration) in the experiment SDK.

Using the integration initializer will automatically configure implementations of the [user provider](#user-provider) and [exposure tracking provider](#exposure-tracking-provider) interfaces to pull user data from the Amplitude Analytics SDK and track exposure events.

**Supported Versions**

| Analytics SDK Version | Experiment SDK Version |
| --- | --- |
| `2.8.0+` | `0.6.0+` |

{{/partial:admonition}}

#### Configuration

The SDK client can be configured once on initialization.

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `debug` | Enable additional debug logging within the SDK. Should be set to false in production builds. | `false` |
| `fallbackVariant` | The default variant to fall back if a variant for the provided key does not exist. | `{}` |
| `initialVariants` | An initial set of variants to access. This field is valuable for bootstrapping the client SDK with values rendered by the server using server-side rendering (SSR). | `{}` |
| `serverUrl` | The host to fetch variants from. | `https://api.lab.amplitude.com` |
| `fetchTimeoutMillis` | The timeout for fetching variants in milliseconds. | `10000` |
| `retryFetchOnFailure` | Whether or not to retry variant fetches in the background if the request does not succeed. | `true` |
| `automaticExposureTracking` | If true, calling [`variant()`](#variant) will track an exposure event through the configured `exposureTrackingProvider`. If no exposure tracking provider is set, this configuration option does nothing.  | `true` |
| `automaticFetchOnAmplitudeIdentityChange` | Only matters if you use the `initializeWithAmplitudeAnalytics` initialization function to seamlessly integrate with the Amplitude Analytics SDK. If `true` any change to the user ID, device ID or user properties from analytics will trigger the experiment SDK to fetch variants and update it's cache. | `false` |
| `userProvider` | An interface used to provide the user object to `fetch()` when called. See [Experiment User](https://developers.experiment.amplitude.com/docs/experiment-user#user-providers) for more information. | `null` |
| `exposureTrackingProvider` | Implement and configure this interface to track exposure events through the experiment SDK, either automatically or explicitly. | `null` |
| `instanceName` | Custom instance name for experiment SDK instance. **The value of this field is case-sensitive.** | `null` |

{{partial:admonition type="info" heading="EU data center"}}
If you're using Amplitude's EU data center, configure the `serverUrl` option on initialization to `https://api.lab.eu.amplitude.com`
{{/partial:admonition}}

### Fetch

Fetches variants for a [user](/docs/docs/experiment/data-model#users) and store the results in the client for fast access. This function [remote evaluates](/docs/docs/experiment/remote-evaluation) the user for flags associated with the deployment used to initialize the SDK client.

```js
fetch(user?: ExperimentUser): Promise<boolean>
```

| Parameter  | Requirement | Description |
| --- | --- | --- |
| `user` | optional | Explicit [user](/docs/docs/experiment/data-model#users) information to pass with the request to evaluate. This user information is merged with user information provided from [integrations](#integrations) via the [user provider](#user-provider), preferring properties passed explicitly to `fetch()` over provided properties. |

Amplitude recommends calling `fetch()` during application start up so that the user gets the most up-to-date variants for the application session. Furthermore, you'll need to wait for the fetch request to return a result before rendering the user experience in order to avoid the interface "flickering".

```js
const user = {
    user_id: 'user@company.com',
    device_id: 'abcdefg',
    user_properties: {
        'premium': true,
    },
};
await Experiment.fetch(user);
```

If you're using an [integration](#integrations) or a custom [user provider](#user-provider) then you can fetch without inputting the user.

```js
await Experiment.fetch();
```

{{partial:admonition type="tip" heading="Fetch when user identity changes"}}
If you want the most up-to-date variants for the user, it is recommended that you call `fetch()` whenever the user state changes in a meaningful way. For example, if the user logs in and receives a user ID, or has a user property set which may effect flag or experiment targeting rules.

In the case of **user properties**, Amplitude recommends passing new user properties explicitly to `fetch()` instead of relying on user enrichment prior to [remote evaluation](/docs/docs/experiment/remote-evaluation). This is because user properties that are synced remotely through a separate system have no timing guarantees with respect to `fetch()`--i.e. a race.
{{/partial:admonition}}

{{partial:admonition type="tip" heading="Timeout and retries"}}
If `fetch()` times out (default 10 seconds) or fails for any reason, the SDK client will return and retry in the background with back-off. You may configure the timeout or disable retries in the [configuration options](#configuration) when the SDK client is initialized.
{{/partial:admonition}}

### Variant

Access a [variant](/docs/docs/experiment/data-model#variants) for a [flag or experiment](/docs/docs/experiment/data-model#flags-and-experiments) from the SDK client's local store.

{{partial:admonition type="info" heading="Automatic exposure tracking"}}
When an [integration](#integrations) is used or a custom [exposure tracking provider](#exposure-tracking-provider) is set, `variant()` will automatically track an exposure event through the tracking provider. To disable this functionality, [configure](#configuration) `automaticExposureTracking` to be `false`, and track exposures manually using [`exposure()`](#exposure).
{{/partial:admonition}}

```js
variant(key: string): Promise<Variant>
```

```js
variantWithFallback(key: string, fallback: Variant): Promise<Variant>
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `key` | required | The **flag key** to identify the [flag or experiment](/docs/docs/experiment/data-model#flags-and-experiments) to access the variant for. |
| `fallback` | optional | The value to return if no variant was found for the given `flagKey`. |

When determining which variant a user has been bucketed into, you'll want to compare the variant `value` to a well-known string.

```js
const variant = await Experiment.variant('<FLAG_KEY>');
if (variant.value === 'on') {
    // Flag is on
} else {
    // Flag is off
}
```

{{partial:admonition type="info" heading="Access the variant's payload"}}
A variant may also be configured with a dynamic [payload](/docs/docs/experiment/data-model#variants) of arbitrary data. Access the `payload` field from the variant object after checking the variant's `value`.

```js
const variant = await Experiment.variant('<FLAG_KEY>');
if (variant.value === 'on') {
    const payload = variant.payload;
}
```
{{/partial:admonition}}

A `null` variant `value` means that the user has not been bucketed into a variant. You may use the built in **fallback** parameter to provide a variant to return if the store does not contain a variant for the given flag key.

```js
const variant = await Experiment.variantWithFallback('<FLAG_KEY>', { value: 'control' });
if (variant === 'control') {
    // Control
} else if (variant === 'treatment') {
    // Treatment
}
```

### All

Access all [variants](/docs/docs/experiment/data-model#variants) stored by the SDK client.

```js
all(): Promise<Variants>
```

### Exposure

Manually track an [exposure event](/docs/docs/experiment/under-the-hood/event-tracking#exposure-events) for the current variant of the given flag key through configured [integration](#integrations) or custom [exposure tracking provider](#exposure-tracking-provider). Generally used in conjunction with setting the `automaticExposureTracking` [configuration](#configuration) optional to `false`.

```js
exposure(key: string): Promise<boolean>
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `key` | required | The **flag key** to identify the [flag or experiment](/docs/docs/experiment/data-model#flags-and-experiments) variant to track an [exposure event](/docs/docs/experiment/under-the-hood/event-tracking#exposure-events) for. |

```js
const variant = await Experiment.variant('<FLAG_KEY>');

// Do other things...

await Experiment.exposure('<FLAG_KEY>');
if (variant === 'control') {
    // Control
} else if (variant === 'treatment') {
    // Treatment
}
```