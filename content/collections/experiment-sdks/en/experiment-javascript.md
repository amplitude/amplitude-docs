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
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1740528000
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
Official documentation for Amplitude Experiment's client-side JavaScript SDK.

## Install

{{partial:admonition type="info" heading="Unified SDK"}}
Install the [Browser Unified SDK](/docs/sdks/analytics/browser/browser-unified-sdk) to access Experiment alongside Analytics and Session Replay from a single package.
{{/partial:admonition}}

{{partial:tabs tabs="npm, yarn, CDN"}}
{{partial:tab name="npm"}}
```bash
# Experiment SDK only
npm install --save @amplitude/experiment-js-client

# Unified SDK — includes all Amplitude products
npm install @amplitude/unified
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
# Experiment SDK only
yarn add @amplitude/experiment-js-client

# Unified SDK — includes all Amplitude products
yarn add @amplitude/unified
```
{{/partial:tab}}
{{partial:tab name="CDN"}}
```html
<script src="https://unpkg.com/@amplitude/experiment-js-client@1.15.5/dist/experiment.umd.js"></script>
```
{{/partial:tab}}
{{/partial:tabs}}

## Quick start

The right initialization method depends on your analytics setup:

{{partial:tabs tabs="Amplitude Analytics, Unified SDK, Third party"}}
{{partial:tab name="Amplitude Analytics"}}
1. [Initialize the client](#initialize)
2. [Fetch variants](#fetch)
3. [Access a flag's variant](#variant)

```typescript
import { Experiment } from '@amplitude/experiment-js-client';

// (1) Initialize with Amplitude Analytics integration
const experiment = Experiment.initializeWithAmplitudeAnalytics('DEPLOYMENT_KEY');

// (2) Fetch variants for the current user
await experiment.fetch();

// (3) Read a flag's variant
const variant = experiment.variant('FLAG_KEY');
if (variant.value === 'on') {
  // Flag is on
}
```
{{/partial:tab}}
{{partial:tab name="Unified SDK"}}
1. [Initialize the Unified SDK](#initialize)
2. [Fetch variants](#fetch)
3. [Access a flag's variant](#variant)

```typescript
import { initAll, experiment } from '@amplitude/unified';

// (1) Initialize the Unified SDK
initAll('API_KEY', {
  experiment: { deploymentKey: 'DEPLOYMENT_KEY' }
});

// (2) Fetch variants
await experiment()?.fetch();

// (3) Read a flag's variant
const variant = experiment()?.variant('FLAG_KEY');
if (variant?.value === 'on') {
  // Flag is on
}
```
{{/partial:tab}}
{{partial:tab name="Third party"}}
1. [Initialize the client](#initialize) with an exposure tracking provider
2. [Fetch variants for the user](#fetch)
3. [Access a flag's variant](#variant)

```typescript
import { Experiment } from '@amplitude/experiment-js-client';

// (1) Initialize with a custom exposure tracking provider
const experiment = Experiment.initialize('DEPLOYMENT_KEY', {
  exposureTrackingProvider: {
    track: (exposure) => {
      analytics.track('$exposure', exposure); // your analytics SDK
    }
  }
});

// (2) Fetch variants with explicit user info
const user = {
  user_id: 'user@company.com',
  device_id: 'abcdefg',
  user_properties: { premium: true },
};
await experiment.fetch(user);

// (3) Read a flag's variant
const variant = experiment.variant('FLAG_KEY');
if (variant.value === 'on') {
  // Flag is on
}
```
{{/partial:tab}}
{{/partial:tabs}}

## Initialize

Initialize the SDK once at application startup. The [deployment key](/docs/feature-experiment/data-model#deployments) must belong to the same Amplitude project where you send analytics events.

{{partial:tabs tabs="Amplitude Analytics, Unified SDK, Third party"}}
{{partial:tab name="Amplitude Analytics"}}
```typescript
initializeWithAmplitudeAnalytics(apiKey: string, config?: ExperimentConfig): ExperimentClient
```

```typescript
import { Experiment } from '@amplitude/experiment-js-client';

const experiment = Experiment.initializeWithAmplitudeAnalytics('DEPLOYMENT_KEY');
```
{{/partial:tab}}
{{partial:tab name="Unified SDK"}}
```typescript
initAll(apiKey: string, config?: UnifiedConfig): void
```

```typescript
import { initAll, experiment } from '@amplitude/unified';

// deploymentKey falls back to the API key if not provided
initAll('API_KEY', {
  experiment: { deploymentKey: 'DEPLOYMENT_KEY' }
});
```
{{/partial:tab}}
{{partial:tab name="Third party"}}
```typescript
initialize(apiKey: string, config?: ExperimentConfig): ExperimentClient
```

```typescript
import { Experiment } from '@amplitude/experiment-js-client';

const experiment = Experiment.initialize('DEPLOYMENT_KEY', {
  exposureTrackingProvider: {
    track: (exposure) => {
      analytics.track('$exposure', exposure)
    }
  }
});
```
{{/partial:tab}}
{{/partial:tabs}}

| Parameter | Required | Description |
| --- | --- | --- |
| `apiKey` | Yes | The deployment key, which authorizes fetch requests and determines which flags to evaluate |
| `config` | No | Client configuration options — see [Configuration](#configuration) |

The initializer returns a singleton instance. Subsequent calls with the same instance name return the original instance. To create multiple instances, use the `instanceName` configuration option.

### Integrations

If you use Amplitude or Segment Analytics SDKs, configure an integration on initialization. Integrations automatically handle user identity management and exposure tracking.

{{partial:collapse name="Amplitude integration"}}
```typescript
import * as amplitude from '@amplitude/analytics-browser';
import { Experiment } from '@amplitude/experiment-js-client';

amplitude.init('API_KEY');
const experiment = Experiment.initializeWithAmplitudeAnalytics('DEPLOYMENT_KEY');
```

This integration pulls user data from the Amplitude Analytics SDK and tracks exposure events through it automatically.

**Supported versions:**

All versions of [Amplitude Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2) support this integration.

| Legacy Analytics SDK version | Experiment SDK version |
| --- | --- |
| `8.18.1+` | `1.4.1+` |
{{/partial:collapse}}

{{partial:collapse name="Segment integration"}}
Configure the Experiment SDK after the analytics SDK loads and initializes.

```typescript
analytics.ready(() => {
  const experiment = Experiment.initialize('DEPLOYMENT_KEY', {
    exposureTrackingProvider: {
      track: (exposure) => {
        analytics.track('$exposure', exposure)
      }
    }
  });
});
```

When fetching variants, pass the Segment anonymous ID and user ID:

```typescript
await experiment.fetch({
  user_id: analytics.user().id(),
  device_id: analytics.user().analyticsId(),
});
```
{{/partial:collapse}}

## Configuration

Configure the SDK client once during initialization.

{{partial:collapse name="Configuration options"}}
| Name | Description | Default |
| --- | --- | --- |
| `logLevel` | Minimum log level to output. Options: `LogLevel.Disable`, `LogLevel.Error`, `LogLevel.Warn`, `LogLevel.Info`, `LogLevel.Debug`, `LogLevel.Verbose`. | `LogLevel.Error` |
| `loggerProvider` | Custom logger implementation. Must implement the `Logger` interface. | `null` |
| `fallbackVariant` | The default variant to fall back to if a variant for the provided key doesn't exist. | `{}` |
| `initialVariants` | An initial set of variants for bootstrapping — useful for SSR. | `{}` |
| `source` | Primary source of variants. Set to `Source.InitialVariants` with `initialVariants` to bootstrap for SSR or testing. | `Source.LocalStorage` |
| `serverZone` | Amplitude data center to use — `us` or `eu`. | `us` |
| `serverUrl` | Host for remote evaluation variant fetching. Use `serverZone` for EU instead of setting this directly. | `https://api.lab.amplitude.com` |
| `flagsServerUrl` | Host for local evaluation flag fetching. Use `serverZone` for EU instead. | `https://flag.lab.amplitude.com` |
| `fetchTimeoutMillis` | Timeout for fetching variants in milliseconds. | `10000` |
| `retryFetchOnFailure` | Retry variant fetches in the background if the request fails. | `true` |
| `automaticExposureTracking` | When `true`, calling `variant()` automatically tracks an exposure event through the configured `exposureTrackingProvider`. | `true` |
| `fetchOnStart` | When `true` or `undefined`, always fetch remote evaluation variants on `start()`. | `true` |
| `pollOnStart` | Poll for local evaluation flag configuration updates once per minute on `start()`. | `true` |
| `automaticFetchOnAmplitudeIdentityChange` | When using `initializeWithAmplitudeAnalytics`, re-fetch variants on any user ID, device ID, or user property change. | `false` |
| `userProvider` | Interface for providing user information to `fetch()`. | `null` |
| `exposureTrackingProvider` | Interface for tracking exposure events automatically or explicitly. | `null` |
| `instanceName` | Custom instance name. Value is case-sensitive. | `null` |
| `initialFlags` | JSON string of initial flag configurations for local evaluation bootstrapping. | `undefined` |
| `consentOptions` | Cookie consent management. Set `status` to `ConsentStatus.GRANTED`, `PENDING`, or `REJECTED`. | `{ status: ConsentStatus.GRANTED }` |
| `httpClient` | Custom HTTP client implementation for network requests. | Default HTTP client |
{{/partial:collapse}}

## Fetch

Fetch variants for the current user and store the results in the client's local cache. Call `fetch()` once on startup and again whenever the user's identity or key properties change.

```typescript
fetch(user?: ExperimentUser, options?: FetchOptions): Promise<Client>
```

| Parameter | Required | Description |
| --- | --- | --- |
| `user` | No | Explicit user information to pass with the request. Merges with user provider data, preferring explicitly passed properties. |
| `options` | No | Explicit flag keys to fetch. Omit to fetch all flags for this deployment. |

```typescript
// With Amplitude integration — user info pulled automatically
await experiment.fetch();

// With explicit user object
await experiment.fetch({
  user_id: 'user@company.com',
  device_id: 'abcdefg',
  user_properties: { premium: true },
});
```

{{partial:admonition type='tip' heading="Fetch on identity change"}}
Call `fetch()` again when the user logs in (a `user_id` becomes available) or when key user properties change. Pass the updated user object explicitly rather than relying on remote enrichment to avoid race conditions.
{{/partial:admonition}}

If `fetch()` times out (default 10 seconds) or fails, the SDK returns the cached variants and retries in the background with backoff. Configure the timeout or disable retries in the [configuration options](#configuration).

{{partial:collapse name="Account-level bucketing (v1.5.6+)"}}
If your organization has purchased the [Accounts add-on](/docs/analytics/account-level-reporting), you can perform bucketing and analysis on groups rather than users.

Include groups in the `fetch()` call:

```typescript
await experiment.fetch({
  user_id: 'user@company.com',
  device_id: 'abcdefg',
  groups: { 'org name': ['Amplitude'] },
});
```
{{/partial:collapse}}

## Start

Use `start()` instead of `fetch()` when you're using client-side [local evaluation](/docs/feature-experiment/local-evaluation), or when you want the SDK to handle both local and remote evaluation together.

{{partial:admonition type="info" heading="When to use start vs. fetch"}}
- Use `start()` for local evaluation or combined local + remote evaluation.
- Use `fetch()` for remote evaluation only.
{{/partial:admonition}}

```typescript
start(user?: ExperimentUser): Promise<void>
```

```typescript
// Load local flag configs AND fetch remote variants
await experiment.start();

// Skip remote fetch — local evaluation only
const experiment = Experiment.initializeWithAmplitudeAnalytics('DEPLOYMENT_KEY', {
  fetchOnStart: false,
});
await experiment.start();
```

## Variant

Access a [variant](/docs/feature-experiment/data-model#variants) from the SDK's local store. Automatically tracks an exposure event when an [integration](#integrations) or custom [exposure tracking provider](#exposure-tracking-provider) is configured.

```typescript
variant(key: string, fallback?: string | Variant): Variant
```

| Parameter | Required | Description |
| --- | --- | --- |
| `key` | Yes | The flag key that identifies the flag or experiment |
| `fallback` | No | The value to return if no variant is found for the given key |

```typescript
// Simple on/off flag
const variant = experiment.variant('new-dashboard');
if (variant.value === 'on') {
  showNewDashboard();
}

// Multivariate flag
const variant = experiment.variant('pricing-page-layout');
switch (variant.value) {
  case 'control':  showV1(); break;
  case 'grid':     showGrid(); break;
  case 'minimal':  showMinimal(); break;
  default:         showV1(); // handle null / unassigned
}

// With a fallback for unassigned users
const variant = experiment.variant('FLAG_KEY', { value: 'control' });
if (variant.value === 'control') {
  // Control
} else if (variant.value === 'treatment') {
  // Treatment
}
```

{{partial:admonition type="info" heading="Access a variant's payload"}}
A variant can include a dynamic [JSON payload](/docs/feature-experiment/json-payloads). Access it from the `payload` field after checking the variant's `value`.

```typescript
const variant = experiment.variant('product-config');
if (variant.value === 'v2') {
  const { maxItems, showBadges } = variant.payload;
  renderProductList({ maxItems, showBadges });
}
```
{{/partial:admonition}}

## Exposure tracking

Exposure events tell Amplitude's analysis engine that a user saw a variant. Without them, experiment results are unreliable.

**Automatic tracking (default):** When `automaticExposureTracking` is `true`, calling `variant()` automatically tracks an exposure event through your configured analytics provider. No extra code needed.

**Manual tracking:** Set `automaticExposureTracking` to `false` and call `exposure()` explicitly — for example, after a component renders and the user actually sees the variant.

```typescript
exposure(key: string): void
```

```typescript
const variant = experiment.variant('checkout-redesign');

// ... render the component ...

// Track exposure only after the user sees the variant
experiment.exposure('checkout-redesign');
```

## All

Access all variants stored in the SDK's local cache.

```typescript
all(): Variants
```

## Clear

Clear all variants from the cache and storage. Call `clear()` after user logout.

```typescript
clear(): void
```

```typescript
experiment.clear();
```

## Providers

{{partial:admonition type='tip' heading="Use integrations when possible"}}
If you use Amplitude or Segment, use an [integration](#integrations) instead of implementing custom providers. Integrations handle user identity and exposure tracking automatically.
{{/partial:admonition}}

### User provider

The user provider gives the SDK access to the most up-to-date user information when `fetch()` is called. Use it to avoid maintaining two separate user stores in your application.

```typescript
interface ExperimentUserProvider {
  getUser(): ExperimentUser;
}
```

```typescript
const experiment = Experiment.initialize('DEPLOYMENT_KEY', {
  userProvider: new CustomUserProvider(),
});
```

### Exposure tracking provider

Implementing an exposure tracking provider is highly recommended. Exposure tracking increases the accuracy of experiment results and improves visibility into which flags and experiments each user encounters.

```typescript
export interface ExposureTrackingProvider {
  track(exposure: Exposure): void;
}
```

The `track()` implementation must send an event named `$exposure` with `flag_key` and `variant` properties to the same Amplitude project as the deployment key.

```typescript
const experiment = Experiment.initialize('DEPLOYMENT_KEY', {
  exposureTrackingProvider: new CustomExposureTrackingProvider(),
});
```

## Bootstrapping

Bootstrap the client with an initial set of variants when you obtain them from an external source — for example, from server-side rendering or integration testing.

### Bootstrap variants

```typescript
const experiment = Experiment.initialize('DEPLOYMENT_KEY', {
  initialVariants: {
    'FLAG_KEY': { value: 'treatment' }
  },
  source: Source.InitialVariants,
});
```

### Bootstrap flag configurations

Use `initialFlags` to bootstrap local evaluation flag configurations. The SDK evaluates against these until `start()` or `fetch()` loads updated configs.

```typescript
const experiment = Experiment.initialize('DEPLOYMENT_KEY', {
  initialFlags: '<FLAGS_JSON>',
});
```

To download initial flags, use the [Evaluation Flags API](/docs/apis/experiment/experiment-evaluation-api).

## Consent management

The SDK supports cookie consent management. Consent status controls data storage persistence and exposure tracking.

### Consent status values

- **`GRANTED` (1)**: User has granted consent. Uses `localStorage` and `sessionStorage`, tracks exposures immediately.
- **`PENDING` (2)**: Waiting for the user's decision. Stores data in-memory only and queues exposures without tracking them. When consent changes to `GRANTED`, the SDK persists in-memory data and fires all queued exposures.
- **`REJECTED` (0)**: User has rejected consent. The SDK doesn't initialize, store data, or track exposures.

### Configure consent on initialization

```typescript
import { Experiment, ConsentStatus } from '@amplitude/experiment-js-client';

const experiment = Experiment.initialize('DEPLOYMENT_KEY', {
  consentOptions: { status: ConsentStatus.PENDING }
});
```

### Update consent status

```typescript
// When the user grants consent
experiment.setConsentStatus(ConsentStatus.GRANTED);

// When the user rejects consent
experiment.setConsentStatus(ConsentStatus.REJECTED);
```

When consent changes from `PENDING` to `REJECTED`, the SDK deletes all persisted data from `localStorage` and `sessionStorage`, including stored variants, user info, and queued exposure events.

### Integration example

```typescript
const experiment = Experiment.initializeWithAmplitudeAnalytics('DEPLOYMENT_KEY', {
  consentOptions: { status: ConsentStatus.PENDING }
});

await experiment.fetch();

window.addEventListener('consentGranted', () => {
  experiment.setConsentStatus(ConsentStatus.GRANTED);
});

window.addEventListener('consentRejected', () => {
  experiment.setConsentStatus(ConsentStatus.REJECTED);
});
```

## Custom logging

Control log verbosity with `logLevel`, or implement the `Logger` interface to integrate your own logging solution.

### Log levels

- `LogLevel.Disable` — no logging.
- `LogLevel.Error` — errors only (default).
- `LogLevel.Warn` — errors and warnings.
- `LogLevel.Info` — errors, warnings, and informational messages.
- `LogLevel.Debug` — errors, warnings, info, and debug messages.
- `LogLevel.Verbose` — all messages.

```typescript
import { Experiment, LogLevel } from '@amplitude/experiment-js-client';

const experiment = Experiment.initialize('DEPLOYMENT_KEY', {
  logLevel: LogLevel.Debug,
});
```

### Custom logger

```typescript
import { Experiment, Logger, LogLevel } from '@amplitude/experiment-js-client';

class CustomLogger implements Logger {
  error(message?: any, ...params: any[]): void {
    myLoggingService.error(message, ...params);
  }
  warn(message?: any, ...params: any[]): void {
    myLoggingService.warn(message, ...params);
  }
  info(message?: any, ...params: any[]): void {
    myLoggingService.info(message, ...params);
  }
  debug(message?: any, ...params: any[]): void {
    myLoggingService.debug(message, ...params);
  }
  verbose(message?: any, ...params: any[]): void {
    myLoggingService.verbose(message, ...params);
  }
}

const experiment = Experiment.initialize('DEPLOYMENT_KEY', {
  loggerProvider: new CustomLogger(),
  logLevel: LogLevel.Warn,
});
```

## HTTP client

Provide a custom HTTP client implementation to handle network requests — useful for environments with specific networking requirements.

```typescript
export interface HttpClient {
  request(
    requestUrl: string,
    method: string,
    headers: Record<string, string>,
    data: string,
    timeoutMillis?: number,
  ): Promise<{ status: number; body: string }>;
}
```

```typescript
const experiment = Experiment.initialize('DEPLOYMENT_KEY', {
  httpClient: new CustomHttpClient(),
});
```

## Changelog

Current version: **1.15.5**

- [Releases](https://github.com/amplitude/experiment-js-client/releases)
- [API reference](https://amplitude.github.io/experiment-js-client/)
- [npm](https://www.npmjs.com/package/@amplitude/experiment-js-client)
