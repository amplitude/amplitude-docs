---
id: bb58c08d-f8a5-476b-89d6-b995ab8a3c94
blueprint: experiment-sdk
title: "Experiment Flutter SDK"
sdk_status: current
article_type: core
supported_languages:
  - dart
landing: false
github_link: "https://github.com/amplitude/experiment-flutter-client"
releases_url: "https://github.com/amplitude/experiment-flutter-client/releases"
package_name: amplitude_experiment
bundle_url: "https://pub.dev/packages/amplitude_experiment"
shields_io_badge: "https://img.shields.io/pub/v/amplitude_experiment"
exclude_from_sitemap: false
logo: icons/flutter.svg
---

Official documentation for Amplitude Experiment's Client-side Flutter SDK.

## Install

Add the `amplitude_experiment` package to your `pubspec.yaml`:

```yaml
dependencies:
  amplitude_experiment: ^0.1.0-alpha.1
```

Then run:

```bash
flutter pub get
```

### Web installation (optional)

The Flutter Experiment SDK uses Dart's JavaScript interoperability to enable the [Experiment JavaScript SDK](/docs/sdks/experiment-sdks/experiment-javascript) for Flutter Web. This requires that you make the SDK available within the global JavaScript scope. Add the following script tag to `web/index.html` in your Flutter project:

```html
<script src="https://unpkg.com/@amplitude/experiment-js-client@1.20.1/dist/experiment.umd.js"></script>
```

{{partial:admonition type="info" heading="Platform support"}}
This SDK supports Android, iOS, and Web platforms.
{{/partial:admonition}}

{{partial:admonition type="warning" heading="Alpha SDK"}}
This SDK is currently in alpha. APIs may change and there may be breaking changes before the stable release.
{{/partial:admonition}}

{{partial:admonition type="tip" heading="Quick start"}}
The right way to initialize the Experiment SDK depends on whether you use an Amplitude SDK for analytics or a third party (for example, Segment).

{{partial:tabs tabs="Amplitude, Third party"}}
{{partial:tab name="Amplitude"}}

1. [Initialize the experiment client](#initialize).
2. [Fetch variants](#fetch).
3. [Access a flag's variant](#variant).

```dart
import 'package:amplitude_flutter/amplitude.dart';
import 'package:amplitude_flutter/configuration.dart';
import 'package:amplitude_experiment/amplitude_experiment.dart';

// (1) Initialize the Amplitude Analytics SDK.
final amplitude = Amplitude(Configuration(apiKey: 'API_KEY'));
await amplitude.isBuilt;

// (2) Initialize the experiment client with Amplitude Analytics.
final experiment = await Experiment.initializeWithAmplitude(
  'DEPLOYMENT_KEY',
  ExperimentConfig(),
);

// (3) Fetch variants and await the result.
await experiment.fetch();

// (4) Look up a flag's variant.
final variant = await experiment.variant('FLAG_KEY');
if (variant.value == 'on') {
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

```dart
import 'package:amplitude_experiment/amplitude_experiment.dart';

// (1) Initialize the experiment client and implement an
// exposure tracking provider.
final experiment = await Experiment.initialize(
  'DEPLOYMENT_KEY',
  ExperimentConfig(
    trackingProvider: MyExposureTracker(),
  ),
);

// (2) Fetch variants with the user and await the result.
final user = ExperimentUser(
  userId: 'user@company.com',
  deviceId: 'abcdefg',
  userProperties: {'premium': true},
);
await experiment.fetch(user);

// (3) Look up a flag's variant.
final variant = await experiment.variant('FLAG_KEY');
if (variant.value == 'on') {
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

```dart
static Future<ExperimentClient> initializeWithAmplitude(String apiKey, ExperimentConfig config)
```

{{/partial:tab}}
{{partial:tab name="Third party"}}

```dart
static Future<ExperimentClient> initialize(String apiKey, ExperimentConfig config)
```

{{/partial:tab}}
{{/partial:tabs}}

| Parameter | Requirement | Description                                                                                                                                                        |
| --------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `apiKey`  | required    | The [deployment key](/docs/feature-experiment/data-model#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config`  | required    | The client [configuration](#configuration) used to customize SDK client behavior.                                                                                  |

The initializer returns a singleton instance, so subsequent initializations for the same instance name always return the initial instance. To create multiple instances, use the `instanceName` [configuration](#configuration).

{{partial:tabs tabs="Amplitude, Third party"}}
{{partial:tab name="Amplitude"}}

```dart
import 'package:amplitude_flutter/amplitude.dart';
import 'package:amplitude_flutter/configuration.dart';
import 'package:amplitude_experiment/amplitude_experiment.dart';

final amplitude = Amplitude(Configuration(apiKey: 'API_KEY'));
await amplitude.isBuilt;

final experiment = await Experiment.initializeWithAmplitude(
  'DEPLOYMENT_KEY',
  ExperimentConfig(),
);
```

{{partial:admonition type="note" heading="Instance name"}}
If you're using a custom instance name for analytics, both the Amplitude Analytics SDK and Experiment SDK must be initialized with the same `instanceName`. This enables them to automatically connect when initializing the client with `initializeWithAmplitude()`. Review more information about the `instanceName` field in the [Analytics SDK docs](https://amplitude.com/docs/sdks/analytics/flutter/flutter-sdk-4#configure-the-sdk).
{{/partial:admonition}}
{{/partial:tab}}
{{partial:tab name="Third party"}}

```dart
import 'package:amplitude_experiment/amplitude_experiment.dart';

final experiment = await Experiment.initialize(
  'DEPLOYMENT_KEY',
  ExperimentConfig(
    trackingProvider: MyExposureTracker(),
  ),
);
```

{{/partial:tab}}
{{/partial:tabs}}

### Configuration

SDK client configuration occurs during initialization.

| <div class="big-column">Name</div>        | Description                                                                                                                                                                                               | Default Value                    |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `logLevel`                                | The minimum log level to output. Options: `LogLevel.none`, `LogLevel.error`, `LogLevel.warn`, `LogLevel.info`, `LogLevel.debug`.                                                                          | `LogLevel.warn`                  |
| `fallbackVariant`                         | The default variant to fall back to if a variant for the provided key doesn't exist.                                                                                                                      | `null`                           |
| `initialVariants`                         | An initial set of variants to access. This field is valuable for bootstrapping the client SDK with values rendered by the server using server-side rendering (SSR).                                       | `{}`                             |
| `source`                                  | The primary source of variants. Set the value to `Source.initialVariants` and configure `initialVariants` to bootstrap the SDK for SSR or testing purposes.                                               | `Source.localStorage`            |
| `serverZone`                              | Select the Amplitude data center to get flags and variants from, `us` or `eu`.                                                                                                                            | `ServerZone.us`                  |
| `serverUrl`                               | The host to fetch remote evaluation variants from. For hitting the EU data center, use `serverZone`.                                                                                                      | `https://api.lab.amplitude.com`  |
| `flagsServerUrl`                          | The host to fetch local evaluation flags from. For hitting the EU data center, use `serverZone`.                                                                                                          | `https://flag.lab.amplitude.com` |
| `fetchTimeoutMillis`                      | The timeout for fetching variants in milliseconds.                                                                                                                                                        | `10000`                          |
| `retryFetchOnFailure`                     | Whether to retry variant fetches in the background if the request doesn't succeed.                                                                                                                        | `true`                           |
| `automaticExposureTracking`               | If true, calling [`variant()`](#variant) tracks an exposure event through the configured `trackingProvider`. If no tracking provider is set, this configuration option does nothing.                      | `true`                           |
| `fetchOnStart`                            | If true, always [fetch](#fetch) remote evaluation variants on [start](#start). If false, never fetch on start.                                                                                            | `true`                           |
| `pollOnStart`                             | Poll for local evaluation flag configuration updates once per minute on [start](#start).                                                                                                                  | `false`                          |
| `automaticFetchOnAmplitudeIdentityChange` | Only matters if you use `initializeWithAmplitude`. If `true`, any change to the user ID, device ID, or user properties from analytics triggers the experiment SDK to fetch variants and update its cache. | `false`                          |
| `userProvider`                            | An interface used to provide the user object to `fetch()` when called. See [User provider](#user-provider).                                                                                               | `null`                           |
| `trackingProvider`                        | Implement and configure this interface to track exposure events through the experiment SDK, either automatically or explicitly. See [Exposure tracking provider](#exposure-tracking-provider).            | `null`                           |
| `instanceName`                            | Custom instance name for experiment SDK instance. **The value of this field is case-sensitive.**                                                                                                          | `$default_instance`              |
| `initialFlags`                            | A JSON string representing an initial set of flag configurations to use for local evaluation.                                                                                                             | `null`                           |

{{partial:admonition type="info" heading="EU data center"}}
If you're using Amplitude's EU data center, configure the `serverZone` option on initialization to `ServerZone.eu`.
{{/partial:admonition}}

### Integrations

If you use Amplitude Analytics SDK to track events into Amplitude, Amplitude recommends that you set up an integration on initialization. Integrations implement [provider](#providers) interfaces to enable a more streamlined developer experience by making it easier to **manage user identity** and **track exposure events**.

{{partial:collapse name="Amplitude integration"}}
The Amplitude Experiment SDK is set up to integrate seamlessly with the Amplitude Analytics SDK.

```dart
import 'package:amplitude_flutter/amplitude.dart';
import 'package:amplitude_flutter/configuration.dart';
import 'package:amplitude_experiment/amplitude_experiment.dart';

final amplitude = Amplitude(Configuration(apiKey: 'API_KEY'));
await amplitude.isBuilt;

final experiment = await Experiment.initializeWithAmplitude(
  'DEPLOYMENT_KEY',
  ExperimentConfig(),
);
```

When you use the integration initializer, it configures implementations of the [user provider](#user-provider) and [exposure tracking provider](#exposure-tracking-provider) interfaces to pull user data from the Amplitude Analytics SDK and track exposure events.
{{/partial:collapse}}

## Fetch

Fetches variants for a [user](/docs/feature-experiment/data-model#users) and stores the results in the client for fast access. This function [remote evaluates](/docs/feature-experiment/remote-evaluation) the user for flags associated with the deployment used to initialize the SDK client.

```dart
Future<void> fetch([ExperimentUser? user, FetchOptions? options])
```

| Parameter | Requirement | Description                                                                                                                                                                                                                                                                                                                            |
| --------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user`    | optional    | Explicit [user](/docs/feature-experiment/data-model#users) information to pass with the request to evaluate. This user information is merged with user information provided from [integrations](#integrations) via the [user provider](#user-provider), preferring properties passed explicitly to `fetch()` over provided properties. |
| `options` | optional    | Fetch options such as a list of specific flag keys to fetch.                                                                                                                                                                                                                                                                           |

Amplitude Experiment recommends calling `fetch()` during application start up so that the user gets the most up-to-date variants for the application session. Furthermore, you should wait for the fetch request to return a result before rendering the user experience to avoid the interface "flickering".

```dart
final user = ExperimentUser(
  userId: 'user@company.com',
  deviceId: 'abcdefg',
  userProperties: {'premium': true},
);
await experiment.fetch(user);
```

If you're using an [integration](#integrations) or a custom [user provider](#user-provider) then you can fetch without inputting the user.

```dart
await experiment.fetch();
```

{{partial:admonition type="tip" heading="Fetch when user identity changes"}}
If you want the most up-to-date variants for the user, it's recommended that you call `fetch()` whenever the user state changes in a meaningful way. For example, if the user logs in and receives a user ID, or has a user property set which may affect flag or experiment targeting rules.

In the case of user properties, Amplitude recommends passing new user properties explicitly to `fetch()` instead of relying on user enrichment prior to [remote evaluation](/docs/feature-experiment/remote-evaluation). This is because user properties that are synced remotely through a separate system have no timing guarantees with respect to `fetch()`. For example, a race.
{{/partial:admonition}}

If `fetch()` times out (default 10 seconds) or fails for any reason, the SDK client will return and retry in the background with back-off. You may configure the timeout or disable retries in the [configuration options](#configuration) when the SDK client is initialized.

{{partial:collapse name="Account-level bucketing and analysis"}}
If your organization has purchased the [Accounts add-on](/docs/analytics/account-level-reporting) you may perform bucketing and analysis on groups rather than users. Reach out to your representative to gain access to this beta feature.

Groups must either be included in the user sent with the fetch request (recommended), or identified with the user via a group identify call from the [Group Identify API](/docs/apis/analytics/group-identify) or via [`setGroup()` from an analytics SDK](/docs/sdks/analytics/browser/browser-sdk-2#user-groups).

```dart
await experiment.fetch(
  ExperimentUser(
    userId: 'user@company.com',
    deviceId: 'abcdefg',
    userProperties: {'premium': true},
    groups: {'org name': ['Amplitude']},
  ),
);
```

{{/partial:collapse}}

## Start

{{partial:admonition type="info" heading="Fetch vs start"}}
Use `start` if you're using client-side [local evaluation](/docs/feature-experiment/local-evaluation). If you're only using [remote evaluation](/docs/feature-experiment/remote-evaluation), call [fetch](#fetch) instead of `start`.
{{/partial:admonition}}

Start the Experiment SDK to get flag configurations from the server and fetch remote evaluation variants for the user. The SDK is ready once the returned future completes.

```dart
Future<void> start(ExperimentUser? user)
```

| Parameter | Requirement | Description                                                                                                                                                                                                                                                                                                                                                                        |
| --------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user`    | optional    | Explicit [user](/docs/feature-experiment/data-model#users) information to pass with the request to fetch variants. This user information merges with user information from any [integrations](#integrations) through the [user provider](#user-provider), and prefers properties passed explicitly to `fetch()` over provided properties. Also sets the user in the SDK for reuse. |

Call `start()` when your application is initializing, after user information is available to use to evaluate or [fetch](#fetch) variants. The returned future completes after loading local evaluation flag configurations and fetching remote evaluation variants.

Set `fetchOnStart` in the SDK configuration to control the behavior of `start()` to improve the performance of your application.

- If your application never relies on remote evaluation, set `fetchOnStart` to `false` to avoid increased startup latency caused by remote evaluation.
- If your application relies on remote evaluation, but not right at startup, you may set `fetchOnStart` to `false` and call `fetch()` and await the future separately.

{{partial:tabs tabs="Amplitude, Third party"}}
{{partial:tab name="Amplitude"}}

```dart
await experiment.start(null);
```

{{/partial:tab}}
{{partial:tab name="Third party"}}

```dart
final user = ExperimentUser(
  userId: 'user@company.com',
  deviceId: 'abcdefg',
  userProperties: {'premium': true},
);
await experiment.start(user);
```

{{/partial:tab}}
{{/partial:tabs}}

## Variant

Access a [variant](/docs/feature-experiment/data-model#variants) for a [flag or experiment](/docs/feature-experiment/data-model#flags-and-experiments) from the SDK client's local store.

{{partial:admonition type="info" heading="Automatic exposure tracking"}}
When an [integration](#integrations) is used or a custom [exposure tracking provider](#exposure-tracking-provider) is set, `variant()` automatically tracks an exposure event through the tracking provider. To disable this functionality, [configure](#configuration) `automaticExposureTracking` to be `false`, and track exposures manually using [`exposure()`](#exposure).
{{/partial:admonition}}

```dart
Future<Variant> variant(String flagKey, [Variant? fallbackVariant])
```

| Parameter         | Requirement | Description                                                                                                                                 |
| ----------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `flagKey`         | required    | The **flag key** to identify the [flag or experiment](/docs/feature-experiment/data-model#flags-and-experiments) to access the variant for. |
| `fallbackVariant` | optional    | The value to return if no variant was found for the given `flagKey`.                                                                        |

When determining which variant a user has been bucketed into, compare the variant `value` to a well-known string.

```dart
final variant = await experiment.variant('FLAG_KEY');
if (variant.value == 'on') {
  // Flag is on
} else {
  // Flag is off
}
```

{{partial:admonition type="info" heading="Access a variant's payload"}}
A variant may also be configured with a dynamic [payload](/docs/feature-experiment/data-model#variants) of arbitrary data. Access the `payload` field from the variant object after checking the variant's `value`.

```dart
final variant = await experiment.variant('FLAG_KEY');
if (variant.value == 'on') {
  final payload = variant.payload;
}
```

{{/partial:admonition}}

A `null` variant `value` means that the user hasn't been bucketed into a variant. You may use the built in **fallback** parameter to provide a variant to return if the store doesn't contain a variant for the given flag key.

```dart
final variant = await experiment.variant(
  'FLAG_KEY',
  Variant(value: 'control'),
);
if (variant.value == 'control') {
  // Control
} else if (variant.value == 'treatment') {
  // Treatment
}
```

## All

Access all [variants](/docs/feature-experiment/data-model#variants) stored by the SDK client.

```dart
Future<Map<String, Variant>> all()
```

## Clear

Clear all [variants](/docs/feature-experiment/data-model#variants) in the cache and storage.

```dart
Future<void> clear()
```

You can call `clear` after user logout to clear the variants in cache and storage.

```dart
await experiment.clear();
```

## Exposure

Manually track an [exposure event](/docs/feature-experiment/under-the-hood/event-tracking#exposure-events) for the current variant of the given flag key through configured [integration](#integrations) or custom [exposure tracking provider](#exposure-tracking-provider). Generally used in conjunction with setting the `automaticExposureTracking` [configuration](#configuration) option to `false`.

```dart
Future<void> exposure(String flagKey)
```

| Parameter | Requirement | Description                                                                                                                                                                                                                        |
| --------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `flagKey` | required    | The **flag key** to identify the [flag or experiment](/docs/feature-experiment/data-model#flags-and-experiments) variant to track an [exposure event](/docs/feature-experiment/under-the-hood/event-tracking#exposure-events) for. |

```dart
final variant = await experiment.variant('FLAG_KEY');

// Do other things...

await experiment.exposure('FLAG_KEY');
if (variant.value == 'control') {
  // Control
} else if (variant.value == 'treatment') {
  // Treatment
}
```

## Providers

{{partial:admonition type="tip" heading="Integrations"}}
If you use the Amplitude Analytics SDK alongside the Experiment Client SDK, Amplitude recommends you use an [integration](#integrations) instead of implementing custom providers.
{{/partial:admonition}}

Provider implementations enable a more streamlined developer experience by making it easier to manage user identity and track exposure events.

### User provider

The user provider is used by the SDK client to access the most up-to-date user information only when it's needed (for example, when [`fetch()`](#fetch) is called). This provider is optional, but helps if you have a user information store already set up in your application. This way, you don't need to manage two separate user info stores in parallel, which may result in a divergent user state if the application user store is updated and experiment isn't (or vice versa).

```dart
abstract interface class UserProvider {
  ExperimentUser getUser();
}
```

To use your custom user provider, set the `userProvider` [configuration](#configuration) option with an instance of your custom implementation on SDK initialization.

```dart
class CustomUserProvider implements UserProvider {
  @override
  ExperimentUser getUser() {
    // Return the current user from your app's user store
    return ExperimentUser(userId: 'user@company.com');
  }
}

final experiment = await Experiment.initialize(
  'DEPLOYMENT_KEY',
  ExperimentConfig(
    userProvider: CustomUserProvider(),
  ),
);
```

### Exposure tracking provider

Implementing an exposure tracking provider is highly recommended. [Exposure tracking](/docs/feature-experiment/under-the-hood/event-tracking#exposure-events) increases the accuracy and reliability of experiment results and improves visibility into which flags and experiments a user is exposed to.

```dart
abstract interface class ExposureTrackingProvider {
  void track(Exposure exposure);
}
```

The implementation of `track()` should track an event of type `$exposure` (a.k.a name) with two event properties, `flag_key` and `variant`, corresponding to the two fields on the `Exposure` object argument. Finally, the event tracked must eventually end up in Amplitude Analytics for the same project that the deployment used to [initialize](#initialize) the SDK client lives within, and for the same user that variants were [fetched](#fetch) for.

To use your custom exposure tracking provider, set the `trackingProvider` [configuration](#configuration) option with an instance of your custom implementation on SDK initialization.

```dart
class CustomExposureTracker implements ExposureTrackingProvider {
  @override
  void track(Exposure exposure) {
    // Track the exposure event to your analytics provider
    analytics.track('\$exposure', {
      'flag_key': exposure.flagKey,
      'variant': exposure.variant,
    });
  }
}

final experiment = await Experiment.initialize(
  'DEPLOYMENT_KEY',
  ExperimentConfig(
    trackingProvider: CustomExposureTracker(),
  ),
);
```

## Bootstrapping

You may want to bootstrap the experiment client with an initial set of flags and variants when variants are obtained from an external source (for example, not from calling `fetch()` on the SDK client). Use cases include [local evaluation](/docs/feature-experiment/local-evaluation), [server-side rendering](/docs/feature-experiment/advanced-techniques/server-side-rendering), or integration testing on specific variants.

### Initial variants

To bootstrap the client, set the flags and variants in the `initialVariants` [configuration](#configuration) option, then set the `source` to `Source.initialVariants` so that the SDK client prefers the bootstrapped variants over any previously fetched and stored variants for the same flags.

```dart
final experiment = await Experiment.initialize(
  'DEPLOYMENT_KEY',
  ExperimentConfig(
    initialVariants: {
      'flag-key-1': Variant(value: 'on'),
      'flag-key-2': Variant(value: 'treatment'),
    },
    source: Source.initialVariants,
  ),
);
```

### Initial flags

To bootstrap the client with a set of flag configurations for local evaluation, set the `initialFlags` [configuration](#configuration) option with a JSON string of flag configurations.

```dart
final experiment = await Experiment.initialize(
  'DEPLOYMENT_KEY',
  ExperimentConfig(
    initialFlags: '{"flag-key-1": ...}',
  ),
);
```
