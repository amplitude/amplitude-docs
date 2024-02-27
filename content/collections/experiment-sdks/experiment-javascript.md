---
id: da42e101-0d3f-4e0f-81cc-83516100e99b
blueprint: experiment-sdk
title: 'Experiment JavaScript SDK'
source: 'https://www.docs.developers.amplitude.com/experiment/sdks/javascript-sdk/'
github_link: "https://github.com/amplitude/experiment-js-client"
releases_link: "https://github.com/amplitude/experiment-js-client/releases"
api_reference_link: "https://amplitude.github.io/experiment-js-client/"
npm_version_url: "https://img.shields.io/npm/v/@amplitude/experiment-js-client"
---

## Install

Install the Experiment Javascript Client SDK with one of the three following methods:

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

Initialize the SDK in your application on startup. The deployment key argument you pass into the `apiKey` paramater must live in the same Amplitude project to which you send events.

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