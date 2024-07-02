---
id: da42e101-0d3f-4e0f-81cc-83516100e99b
blueprint: experiment-sdk
title: 'Experiment JavaScript SDK'
source: 'https://www.docs.developers.amplitude.com/experiment/sdks/javascript-sdk/'
github_link: 'https://github.com/amplitude/experiment-js-client'
releases_link: 'https://github.com/amplitude/experiment-js-client/releases'
api_reference_link: 'https://amplitude.github.io/experiment-js-client/'
npm_version_url: 'https://img.shields.io/npm/v/@amplitude/experiment-js-client'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717526443
sdk_status: current
article_type: core
supported_languages:
  - js
  - ts
releases_url: 'https://github.com/amplitude/experiment-js-client/releases'
api_reference_url: 'https://amplitude.github.io/experiment-js-client/'
shields_io_badge: 'https://img.shields.io/npm/v/@amplitude/experiment-js-client'
logo: icons/js.svg
---
Official documentation for Amplitude Experiment's Client-side JavaScript SDK implementation.

## Install

Install the Experiment JavaScript Client SDK with one of the three following methods:

{{partial:tabs tabs="npm, yarn, script"}}
{{partial:tab name="npm"}}
```bash
npm install --save @amplitude/experiment-js-client
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/experiment-js-client
```
{{/partial:tab}}
{{partial:tab name="script"}}
```html
<script src="https://unpkg.com/@amplitude/experiment-js-client@1.9.0/dist/experiment.umd.js"></script>
<script>
    // TODO: Replace DEPLOYMENT_KEY with your own deployment key.
    // If you're using a 3rd party for analytics, configure an exposure
    // tracking provider.
    window.experiment = Experiment.Experiment.initializeWithAmplitudeAnalytics(
        'DEPLOYMENT_KEY'
    );
</script>

```
{{/partial:tab}}
{{/partial:tabs}}

## Quickstart

The method you use to initialize the Experiment SDK depends on the method you use to instrument your analytics, using an Amplitude SDK or a third-party, like Segment. Both options require the same steps:

1. Initialize the Experiment client
2. Start the SDK
3. Access a flag's variant

{{partial:tabs tabs="Amplitude, Third-party"}}
{{partial:tab name="Amplitude"}}
```js
import { Experiment } from '@amplitude/experiment-js-client';

// (1) Initialize the experiment client with Amplitude Analytics.
const experiment = Experiment.initializeWithAmplitudeAnalytics(
    'DEPLOYMENT_KEY'
);

// (2) Start the SDK and await the promise result.
await experiment.start();

// (3) Lookup a flag's variant.
const variant = experiment.variant('FLAG_KEY');
if (variant.value === 'on') {
    // Flag is on
} else {
    // Flag is off
}
```
{{/partial:tab}}
{{partial:tab name="Third-party"}}
```js
import { Experiment } from '@amplitude/experiment-js-client';

// (1) Initialize the experiment client and implement a
//     custom exposure tracking provider.
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

// (2) Start the SDK with the user and await the promise result.
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

## Initialize the SDK

Initialize the SDK in your application on startup. The [deployment key](/docs/experiment/data-model#deployments) argument you pass into the `apiKey` parameter must live in the same Amplitude project to which you send events.

{{partial:tabs tabs="Amplitude, Third-party"}}
{{partial:tab name="Amplitude"}}
```js
initializeWithAmplitudeAnalytics(apiKey: string, config?: ExperimentConfig): ExperimentClient
```
{{/partial:tab}}
{{partial:tab name="Third-party"}}
```js
initialize(apiKey: string, config?: ExperimentConfig): ExperimentClient
```
{{/partial:tab}}
{{/partial:tabs}}

| Paramater | Description                                                                                                        |
| --------- | ------------------------------------------------------------------------------------------------------------------ |
| `apikey`  | *Required*. The deployment key which authorizes fetch requests and determines which flags to evaluate for the user |
| `config`  | The client configuration to customize SDK client behavior.                                                         |

The initializer returens a singleton instance, so subsequent initializations for the same instance name always return the initial instance. To create multiple instances, use the `instanceName` configuration.

{{partial:tabs tabs="Amplitude, Third-party"}}
{{partial:tab name="Amplitude"}}
```js
import { Experiment } from '@amplitude/experiment-js-client';

const experiment = initializeWithAmplitudeAnalytics('DEPLOYMENT_KEY');
```
{{/partial:tab}}
{{partial:tab name="Third-party"}}
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

## Configuration

Configure the SDK client once during initialization.

{{partial:collapse name="Configuration"}}
| Name | Description | Default Value |
| --- | --- | --- |
| `debug` | Enable additional debug logging within the SDK. Should be set to false in production builds. | `false` |
| `fallbackVariant` | The default variant to fall back if a variant for the provided key doesn't exist. | `{}` |
| `initialVariants` | An initial set of variants to access. This field is valuable for bootstrapping the client SDK with values rendered by the server using server-side rendering (SSR). | `{}` |
| `source` | The primary source of variants. Set the value to `Source.InitialVariants` and configured `initialVariants` to bootstrap the SDK for SSR or testing purposes. | `Source.LocalStorage` |
| `serverZone` | Select the Amplitude data center to get flags and variants from, `us` or `eu`. | `us` |
| `serverUrl` | The host to fetch remote evaluation variants from. For hitting the EU data center, use `serverZone`. | `https://api.lab.amplitude.com` |
| `flagsServerUrl` | The host to fetch local evaluation flags from. For hitting the EU data center, use `serverZone`. | `https://flag.lab.amplitude.com` |
| `fetchTimeoutMillis` | The timeout for fetching variants in milliseconds. | `10000` |
| `retryFetchOnFailure` | Whether to retry variant fetches in the background if the request doesn't succeed. | `true` |
| `automaticExposureTracking` | If true, calling [`variant()`](#variant) will track an exposure event through the configured `exposureTrackingProvider`. If no exposure tracking provider is set, this configuration option does nothing.  | `true` |
| `fetchOnStart` | If true or undefined, always [fetch](#fetch) remote evaluation variants on [start](#start). If false, never fetch on start. | `true` |
| `pollOnStart` | Poll for local evaluation flag configuration updates once per minute on [start](#start). | `true` |
| `automaticFetchOnAmplitudeIdentityChange` | Only matters if you use the `initializeWithAmplitudeAnalytics` initialization function to seamlessly integrate with the Amplitude Analytics SDK. If `true` any change to the user ID, device ID or user properties from analytics will trigger the experiment SDK to fetch variants and update it's cache. | `false` |
| `userProvider` | An interface used to provide the user object to `fetch()` when called. See [Experiment User](https://developers.experiment.amplitude.com/docs/experiment-user#user-providers) for more information. | `null` |
| `exposureTrackingProvider` | Implement and configure this interface to track exposure events through the experiment SDK, either automatically or explicitly. | `null` |
| `instanceName` | Custom instance name for experiment SDK instance. **The value of this field is case-sensitive.** | `null` |
| `initialFlags` | A JSON string representing an initial set of flag configurations to use for local evaluation. | `undefined` |

{{/partial:collapse}}

### Integrations

If you use either Amplitude or Segment Analytics SDKs to track events into Amplitude, set up an integration on initialization. Integrations automatically implement [provider](#providers) interfaces to enable a more streamlined developer experience by making it easier to **manage user identity** and **track exposures events**.

{{partial:collapse name="Amplitude integration"}}
The Amplitude Experiment SDK is set up to integrate seamlessly with the Amplitude Analytics SDK.

```js
import * as amplitude from '@amplitude/analytics-browser';
import { Experiment } from '@amplitude/experiment-js-client';

amplitude.init('API_KEY');
const experiment = Experiment.initializeWithAmplitudeAnalytics('DEPLOYMENT_KEY');
```

Using the integration initializer configures implementations of the [user provider](#user-provider) and [exposure tracking provider](#exposure-tracking-provider) interfaces to pull user data from the Amplitude Analytics SDK and track exposure events.

**Supported Versions**

All versions of the next-generation [Amplitude analytics Browser](/docs/sdks/analytics/browser/browser-sdk-2) SDK support this integration.

| Legacy Analytics SDK Version | Experiment SDK Version |
| --- | --- |
| `8.18.1+` | `1.4.1+` |

{{/partial:collapse}}

{{partial:collapse name="Segment integration"}}
Experiment's integration with Segment Analytics requires manual configuration. Then, configure the  Experiment SDK on initialization with an instance of the exposure tracking provider. Make sure this happens _after_ the analytics SDK loads an initializes.

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

When [starting the SDK](#start), pass the segment anonymous ID and user ID for the device ID and user ID, respectively.

```js
await experiment.start({
    user_id: analytics.user().id(),
    device_id: analytics.user().analyticsId(),
});
```

{{/partial:collapse}}

{{partial:collapse name="mParticle integration"}}
Experiment's integration with mParticle requires manual integration. The values you use for `user_id` and `device_id` depend on your specific configuration.

In accordance with your event forwarding settings to Amplitude, the event type `Other` may not be the right classification. Make sure that the event type you use is forwarded to Amplitude in destination settings.

```js
const identityRequest = {
    userIdentities: {
        email: "joe_slow@gmail.com",
        customerid: "abcdxyz"
    }
};
mParticle.Identity.login(identityRequest, () => {
    console.log("Identity callback");
});

const experiment = Experiment.initialize("DEPLOYMENT_KEY", {
    exposureTrackingProvider: {
        track: (exposure) => {
            window.mParticle.logEvent('$exposure', window.mParticle.EventType.Other, exposure);
        }
    },
    userProvider: {
        getUser: () => {
            const user_id = window.mParticle.Identity.getCurrentUser().getUserIdentities().userIdentities.customerid;
            const device_id = window.mParticle.getDeviceId();
            if (user_id != null) {
                return {
                    user_id: user_id,
                    device_id: device_id
                };
                else
                    return {
                        device_id: device_id
                    };
            }
        }
    }
});
```

{{/partial:collapse}}

### Start

Start the SDK by getting flag configurations from the server and fetching remote evaluation variants for the user. The SDK is ready once the returned promise resolves.

```js
start(user?: ExperimentUser): Promise<void>
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `user` | optional | Explicit [user](/docs/experiment/data-model#users) information to pass with the request to fetch variants. This user information is merged with user information provided from [integrations](#integrations) via the [user provider](#user-provider), preferring properties passed explicitly to `fetch()` over provided properties. Also sets the user in the SDK for reuse. |

Call `start()` when your application is initializing, after user information is available to use to evaluate or [fetch](#fetch) variants. The returned promise resolves after loading local evaluation flag configurations and fetching remote evaluation variants.

Configure the behavior of `start()` by setting `fetchOnStart` in the SDK configuration on initialization to improve performance based on the needs of your application.

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

### Fetch

Fetches variants for a [user](/docs/experiment/data-model#users) and store the results in the client for fast access. This function [remote evaluates](/docs/experiment/remote-evaluation) the user for flags associated with the deployment used to initialize the SDK client.

{{partial:admonition type="tip" heading="Fetch on user identity change"}}
If you want the most up-to-date variants for the user, it's recommended that you call `fetch()` whenever the user state changes in a meaningful way. For example, if the user logs in and receives a user ID, or has a user property set which may effect flag or experiment targeting rules.

Pass new **user properties** explicitly to `fetch()` instead of relying on user enrichment prior to [remote evaluation](/docs/experiment/remote-evaluation). This is because user properties that are synced remotely through a separate system have no timing guarantees with respect to `fetch()`--for example, a race.
{{/partial:admonition}}

```js
fetch(user?: ExperimentUser, options?: FetchOptions): Promise<Client>
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `user`    | optional | Explicit [user](/docs/experiment/data-model#users) information to pass with the request to evaluate. This user information is merged with user information provided from [integrations](#integrations) via the [user provider](#user-provider), preferring properties passed explicitly to `fetch()` over provided properties. |
| `options` | optional | Explicit flag keys to fetch.|

{{partial:admonition type="beta" heading="Account-level bucketing and analysis (v1.5.6+)"}}
If your organization has purchased the [Accounts add-on](/docs/analytics/account-level-reporting) you may perform bucketing and analysis on groups rather than users. Reach out to your representative to gain access to this beta feature.

Groups must either be included in the user sent with the fetch request (recommended), or identified with the user via a group identify call from the [Group Identify API](/docs/apis/analytics/group-identify) or via [`setGroup()` from an analytics SDK](/docs/sdks/analytics/browser/browser-sdk-2#user-groups).

```js
await fetch({groups: {'org name': ['Amplitude']}});
```
{{/partial:admonition}}

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

{{partial:admonition type="info" heading="Timeout and retries"}}
If `fetch()` times out (default 10 seconds) or fails for any reason, the SDK client will return and retry in the background with back-off. You may configure the timeout or disable retries in the [configuration options](#configuration) when the SDK client is initialized.
{{/partial:admonition}}

### Variant

Access a [variant](/docs/experiment/data-model#variants) for a [flag or experiment](/docs/experiment/data-model#flags-and-experiments) from the SDK client's local store.

{{partial:admonition type="info" heading="Automatic exposure tracking"}}
When an [integration](#integrations) is used or a custom [exposure tracking provider](#exposure-tracking-provider) is set, `variant()` will automatically track an exposure event through the tracking provider. To disable this functionality, [configure](#configuration) `automaticExposureTracking` to be `false`, and track exposures manually using [`exposure()`](#exposure).
{{/partial:admonition}}

```js
variant(key: string, fallback?: string | Variant): Variant
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `key` | required | The **flag key** to identify the [flag or experiment](/docs/experiment/data-model#flags-and-experiments) to access the variant for. |
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
A variant may also be configured with a dynamic [payload](/docs/experiment/data-model#variants) of arbitrary data. Access the `payload` field from the variant object after checking the variant's `value`.

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

### All

Access all [variants](/docs/experiment/data-model#variants) stored by the SDK client.

```js
all(): Variants
```

### Clear

Clear all [variants](/docs/experiment/data-model#variants) in the cache and storage.

```js
clear(): void
```

You can call `clear` after user logout to clear the variants in cache and storage.

```js
experiment.clear();
```

### Exposure

Manually track an [exposure event](/docs/experiment/under-the-hood/event-tracking#exposure-events) for the current variant of the given flag key through configured [integration](#integrations) or custom [exposure tracking provider](#exposure-tracking-provider). Generally used in conjunction with setting the `automaticExposureTracking` [configuration](#configuration) optional to `false`.

```js
exposure(key: string): void
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `key` | required | The **flag key** to identify the [flag or experiment](/docs/experiment/data-model#flags-and-experiments) variant to track an [exposure event](/docs/experiment/under-the-hood/event-tracking#exposure-events) for. |

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

The user provider is used by the SDK client to access the most up-to-date user information only when it's needed (for example, when [`fetch()`](#fetch) is called). This provider is optional, but helps if you have a user information store already set up in your application. This way, you don't need to manage two separate user info stores in parallel, which may result in a divergent user state if the application user store is updated and experiment isn't (or via versa).

```js title="ExperimentUserProvider"
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

Implementing an exposure tracking provider is highly recommended. [Exposure tracking](/docs/experiment/under-the-hood/event-tracking#exposure-events) increases the accuracy and reliability of experiment results and improves visibility into which flags and experiments a user is exposed to.

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

You may want to bootstrap the experiment client with an initial set of flags and variants when variants are obtained from an external source (for example, not from calling `fetch()` on the SDK client). Use cases include [local evaluation](/docs/experiment/local-evaluation), [server-side rendering](/docs/experiment/advanced-techniques/server-side-rendering), or integration testing on specific variants.

To bootstrap the client, set the flags and variants in the `initialVariants` [configuration](#configuration) object, then set the `source` to `Source.InitialVariants` so that the SDK client prefers the bootstrapped variants over any previously fetched & stored variants for the same flags.

```js
const experiment = Experiment.initialize('<DEPLOYMENT_KEY>', {
    initialVariants: { /* Flags and variants */ },
    source: Source.InitialVariants,
});
```