---
id: fd9cb872-7781-46a7-bf79-c1e7bcbdf816
blueprint: experiment-sdk
title: 'Experiment Android SDK'
source: 'https://www.docs.developers.amplitude.com/experiment/sdks/android-sdk/'
sdk_status: current
article_type: core
supported_languages:
  - kotlin
landing: false
github_link: 'https://github.com/amplitude/experiment-android-client'
releases_url: 'https://github.com/amplitude/experiment-android-client/releases'
api_reference_url: 'https://amplitude.github.io/experiment-android-client/'
shields_io_badge: 'https://img.shields.io/maven-metadata/v.svg?label=Maven%20Central&metadataUrl=https%3A%2F%2Frepo1.maven.org%2Fmaven2%2Fcom%2Famplitude%2Fexperiment-android-client%2Fmaven-metadata.xml'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717526421
logo: icons/android.svg
---
Official documentation for Amplitude Experiment's Client-side Android SDK implementation.

## Install

Add to the dependencies in your Android project's `build.gradle` file.

```groovy
dependencies {
  implementation 'com.amplitude:experiment-android-client:<VERSION>'
}
```

{{partial:admonition type="tip" heading="Quick start"}}
The right way to initialize the Experiment SDK depends on whether you use an Amplitude SDK for analytics or a third party (for example, Segment).

{{partial:tabs tabs="Amplitude, Third party"}}
{{partial:tab name="Amplitude"}}
1. [Initialize the experiment client](#initialize)
2. [Fetch variants](#fetch)
3. [Access a flag's variant](#variant)

```kotlin
class MyApplication : Application() {

    override fun onCreate() {
        super.onCreate()

        // (1) Initialize the experiment client
        val client = Experiment.initializeWithAmplitudeAnalytics(
            this, "DEPLOYMENT_KEY", ExperimentConfig()
        )

        // (2) Fetch variants
        try {
            // NOTE: The future returned resolves after a network call. Do not
            //       wait for this future on the main application thread in
            //       production applications to avoid ANR if the user has a poor
            //       network connection.
            client.fetch().get()
        } catch (e: Exception) {
            e.printStackTrace()
        }

        // (3) Lookup a flag's variant
        val variant = client.variant("<FLAG_KEY>")
        if (variant.value == "on") {
            // Flag is on
        } else {
            // Flag is off
        }
    }
}
```

{{/partial:tab}}
{{partial:tab name="Third party"}}
1. [Initialize the experiment client](#initialize)
2. [Fetch variants for a user](#fetch)
3. [Access a flag's variant](#variant)

```kotlin
class MyApplication : Application() {

   override fun onCreate() {
       super.onCreate()

       // (1) Initialize the experiment client
       val client = Experiment.initialize(this, "DEPLOYMENT_KEY", ExperimentConfig.builder()
           .exposureTrackingProvider(object : ExposureTrackingProvider {
               override fun track(exposure: Exposure) {
                   // TODO: Implement exposure tracking
                   // Analytics.with(context).track(
                   //     "\$exposure",
                   //     Properties()
                   //         .putValue("flag_key", exposure.flagKey)
                   //         .putValue("variant", exposure.variant)
                   //         .putValue("experiment_key", exposure.experimentKey));
                   // )
               }
           }).build()
       )

       // (2) Fetch variants for a user
       val user = ExperimentUser.builder()
           .userId("user@company.com")
           .deviceId("abcdefg")
           .userProperty("premium", true)
           .build()
       try {
            // NOTE: The future returned resolves after a network call. Do not
            //       wait for this future on the main application thread in
            //       production applications to avoid ANR if the user has a poor
            //       network connection.
           client.fetch(user).get()
       } catch (e: Exception) {
           e.printStackTrace()
       }

       // (3) Lookup a flag's variant
       val variant = client.variant("<FLAG_KEY>")
       if (variant.value == "on") {
           // Flag is on
       } else {
           // Flag is off
       }
   }
}
```

{{/partial:tab}}
{{/partial:tabs}}
{{/partial:admonition}}

## Initialize

The SDK client should be initialized in your application on startup. The [deployment key](/docs/feature-experiment/data-model#deployments) argument passed into the `apiKey` parameter must live within the same project that you are sending analytics events to.

{{partial:tabs tabs="Amplitude, Third party"}}
{{partial:tab name="Amplitude"}}
```kotlin
fun initializeWithAmplitudeAnalytics(
    application: Application, apiKey: String, config: ExperimentConfig
)
```

{{/partial:tab}}
{{partial:tab name="Third party"}}
```kotlin
fun initialize(application: Application, apiKey: String, config: ExperimentConfig)
```
{{/partial:tab}}
{{/partial:tabs}}

| <div class='med-column'>Parameter</div> | Requirement | Description |
| --- | --- | --- |
| `application` | required | The Android `Application` context. Used to persist variants across sessions. |
| `apiKey` | required | The [deployment key](/docs/feature-experiment/data-model#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

The initializer returns a singleton instance, so subsequent initializations for the same instance name will always return the initial instance. To create multiple instances, use the `instanceName` [configuration](#configuration).

{{partial:tabs tabs="Amplitude, Third party"}}
{{partial:tab name="Amplitude"}}
```kotlin
val experiment = Experiment.initializeWithAmplitudeAnalytics(
    context, "DEPLOYMENT_KEY", ExperimentConfig()
)
```
{{/partial:tab}}
{{partial:tab name="Third party"}}
```kotlin
val experiment = Experiment.initialize(context, "DEPLOYMENT_KEY", ExperimentConfig())
```
{{/partial:tab}}
{{/partial:tabs}}

### Configuration

SDK client configuration occurs during initialization.

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `debug` | Enable additional debug logging within the SDK. Should be set to false in production builds. | `false` |
| `fallbackVariant` | The default variant to fall back if a variant for the provided key doesn't exist. | `{}` |
| `initialVariants` | An initial set of variants to access. This field is valuable for bootstrapping the client SDK with values rendered by the server using server-side rendering (SSR). | `{}` |
| `source` | The primary source of variants. Set the value to `Source.INITIAL_VARIANTS` and configure `initialVariants` to bootstrap the SDK for SSR or testing purposes. | `Source.LOCAL_STORAGE` |
| `serverZone` | Select the Amplitude data center to get flags and variants from | `ServerZone.US` |
| `serverUrl` | The host to fetch remote evaluation variants from. For hitting the EU data center, use `serverZone`. | `https://api.lab.amplitude.com` |
| `flagsServerUrl` | The host to fetch local evaluation flags from. For hitting the EU data center, use `serverZone`. | `https://flag.lab.amplitude.com` |
| `fetchTimeoutMillis` | The timeout for fetching variants in milliseconds. | `10000` |
| `retryFetchOnFailure` | Whether to retry variant fetches in the background if the request doesn't succeed. | `true` |
| `automaticExposureTracking` | If true, calling [`variant()`](#variant) tracks an exposure event through the configured `exposureTrackingProvider`. If no exposure tracking provider is set, this configuration option does nothing.  | `true` |
| `fetchOnStart` | If true or null, always [fetch](#fetch) remote evaluation variants on [start](#start). If false, never fetch on start. | `true` |
| `pollOnStart` | Poll for local evaluation flag configuration updates once per minute on [start](#start). | `true` |
| `automaticFetchOnAmplitudeIdentityChange` | Only matters if you use the `initializeWithAmplitudeAnalytics` initialization function to seamlessly integrate with the Amplitude Analytics SDK. If `true` any change to the user ID, device ID or user properties from analytics triggers the experiment SDK to fetch variants and update it's cache. | `false` |
| `userProvider` | An interface used to provide the user object to `fetch()` when called. See [Experiment User](https://developers.experiment.amplitude.com/docs/experiment-user#user-providers) for more information. | `null` |
| `exposureTrackingProvider` | Implement and configure this interface to track exposure events through the experiment SDK, either automatically or explicitly. | `null` |
| `instanceName` | Custom instance name for experiment SDK instance. **The value of this field is case-sensitive.** | `null` |
| `initialFlags` | A JSON string representing an initial set of flag configurations to use for local evaluation. | `undefined` |

{{partial:admonition type="note" heading="EU Data Center"}}
If you use Amplitude's EU data center, configure the `serverZone` option on initialization to `ServerZone.EU`.
{{/partial:admonition}}

### Integrations

If you use either Amplitude or Segment Analytics SDKs to track events into Amplitude, set up an integration on initialization. Integrations automatically implement [provider](#providers) interfaces to enable a more streamlined developer experience by making it easier to **manage user identity** and **track exposures events**.

{{partial:collapse name="Amplitude integration"}}
The Amplitude Experiment SDK is set up to integrate seamlessly with the Amplitude Analytics SDK.
{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
Amplitude.getInstance().init("API_KEY");
ExperimentClient experiment = Experiment.initializeWithAmplitudeAnalytics( //[tl! ~~]
    context, "DEPLOYMENT_KEY", new ExperimentConfig());
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
Amplitude.getInstance().init("API_KEY")
val experiment = Experiment.initializeWithAmplitudeAnalytics( //[tl! ~~]
    context,
    "DEPLOYMENT_KEY",
    ExperimentConfig(),
)
```
{{/partial:tab}}
{{/partial:tabs}}
If you use a custom instance name for analytics, set the same value in the `instanceName` configuration option in the Experiment SDK.

Using the integration initializer will automatically configure implementations of the [user provider](#user-provider) and [exposure tracking provider](#exposure-tracking-provider) interfaces to pull user data from the Amplitude Analytics SDK and track exposure events.

**Supported Versions**

| Analytics SDK Version | Experiment SDK Version |
| --- | --- |
| `2.36.0+` | `1.5.1+` |

{{/partial:collapse}}

{{partial:collapse name="Segment integration"}}
Experiment's integration with Segment Analytics must be configured manually. The Experiment SDK must then be configured on initialization with an instance of the exposure tracking provider. Make sure this happens _after_ the analytics SDK has been loaded an initialized.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
`SegmentExposureTrackingProvider.java`
```java
class SegmentExposureTrackingProvider implements ExposureTrackingProvider {
    private Analytics analytics;
    public SegmentExposureTrackingProvider(Analytics analytics) {
        this.analytics = analytics;
    }
    @Override
    public void track(Exposure exposure) {
        analytics.track(
                "$exposure",
                new Properties()
                    .putValue("flag_key", exposure.flagKey)
                    .putValue("variant", exposure.variant)
                    .putValue("experiment_key", exposure.experimentKey));
    }
}
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
class SegmentExposureTrackingProvider(
    private val analytics: Analytics
): ExposureTrackingProvider {

    override fun track(exposure: Exposure) {
        analytics.track(
            "\$exposure",
            Properties()
                .putValue("flag_key", exposure.flagKey)
                .putValue("variant", exposure.variant)
                .putValue("experiment_key", exposure.experimentKey)
        )
    }
}
```
{{/partial:tab}}
{{/partial:tabs}}
Configure the Experiment SDK on initialization with an instance of the exposure tracking provider.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
Analytics analytics = // Initialize segment analytics
ExperimentConfig config = ExperimentConfig.builder()
    .exposureTrackingProvider(new SegmentExposureTrackingProvider(analytics))
    .build();
ExperimentClient experiment = Experiment.initialize(context, "DEPLOYMENT_KEY", config);
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val analytics = // Initialize segment analytics
val config = ExperimentConfig.builder()
    .exposureTrackingProvider(SegmentExposureTrackingProvider(analytics))
    .build()
val experiment = Experiment.initialize(context, "DEPLOYMENT_KEY", config)
```
{{/partial:tab}}
{{/partial:tabs}}
When [fetching variants](#fetch), pass the segment anonymous ID and user ID for the device ID and user ID, respectively.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
String userId = analytics.getAnalyticsContext().traits().userId();
String deviceId = analytics.getAnalyticsContext().traits().anonymousId();
try {
    ExperimentUser user = ExperimentUser.builder()
        .userId(userId)
        .deviceId(deviceId)
        .build();
    experiment.fetch(user).get();
} catch (Exception e) {
    e.printStackTrace();
}
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val userId = analytics.analyticsContext.traits().userId()
val deviceId = analytics.analyticsContext.traits().anonymousId()
try {
    val user = ExperimentUser.builder()
        .userId(userId)
        .deviceId(deviceId)
        .build()
    experiment.fetch(user).get()
} catch (e: Exception) {
    e.printStackTrace()
}
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

## Fetch

Fetches variants for a [user](/docs/feature-experiment/data-model#users) and store the results in the client for fast access. This function [remote evaluates](/docs/feature-experiment/remote-evaluation) the user for flags associated with the deployment used to initialize the SDK client.

```kotlin
fun fetch(user: ExperimentUser? = null, options: FetchOptions? = null): Future<ExperimentClient>
```

| Parameter  | Requirement | Description |
| --- | --- | --- |
| `user` | optional | Explicit [user](/docs/feature-experiment/data-model#users) information to pass with the request to evaluate. This user information is merged with user information provided from [integrations](#integrations) via the [user provider](#user-provider), preferring properties passed explicitly to `fetch()` over provided properties. |
| `options` | optional | Explicit flag keys to fetch.|

Amplitude Experiment recommends calling `fetch()` during application start up so that the user gets the most up-to-date variants for the application session. Furthermore, you'll need to wait for the fetch request to return a result before rendering the user experience to avoid the interface "flickering".

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
try {
    ExperimentUser user = ExperimentUser.builder()
        .userId("user@company.com")
        .userProperty("premium", true)
        .build();
    experiment.fetch(user).get();
} catch (Exception e) {
    e.printStackTrace();
}
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
try {
    val user = ExperimentUser.builder()
        .userId("user@company.com")
        .userProperty("premium", true)
        .build()
    experiment.fetch(user).get()
} catch (e: Exception) {
    e.printStackTrace()
}
```
{{/partial:tab}}
{{/partial:tabs}}

If you're using an [integration](#integrations) or a custom [user provider](#user-provider) then you can fetch without inputting the user.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
experiment.fetch(null);
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
experiment.fetch()
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="tip" heading="Fetch when user identity changes"}}
If you want the most up-to-date variants for the user, it's recommended that you call `fetch()` whenever the user state changes in a meaningful way. For example, if the user logs in and receives a user ID, or has a user property set which may effect flag or experiment targeting rules.

In the case of **user properties**, Amplitude recommends passing new user properties explicitly to `fetch()` instead of relying on user enrichment prior to [remote evaluation](/docs/feature-experiment/remote-evaluation). This is because user properties that are synced remotely through a separate system have no timing guarantees with respect to `fetch()` -- for example, a race.
{{/partial:admonition}}

If `fetch()` times out (default 10 seconds) or fails for any reason, the SDK client will return and retry in the background with back-off. You may configure the timeout or disable retries in the [configuration options](#configuration) when the SDK client is initialized.

## Start

{{partial:admonition type="info" heading="Fetch vs start"}}
Use `start` if you're using client-side [local evaluation](/docs/feature-experiment/local-evaluation). If you're only using [remote evaluation](/docs/feature-experiment/remote-evaluation), call [fetch](#fetch) instead of `start`.
{{/partial:admonition}}

Start the Experiment SDK to get flag configurations from the server and fetch remote evaluation variants for the user. The SDK is ready once the returned future resolves.

```kotlin
fun start(user: ExperimentUser? = null): Future<ExperimentClient>
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `user` | optional | Explicit [user](/docs/feature-experiment/data-model#users) information to pass with the request to fetch variants. This user information is merged with user information provided from [integrations](#integrations) via the [user provider](#user-provider), preferring properties passed explicitly to `fetch()` over provided properties. Also sets the user in the SDK for reuse. | `null` |

Call `start()` when your application is initializing, after user information is available to use to evaluate or [fetch](#fetch) variants. The returned future resolves after loading local evaluation flag configurations and fetching remote evaluation variants.

Configure the behavior of `start()` by setting `fetchOnStart` in the SDK configuration on initialization to improve performance based on the needs of your application.

* If your application never relies on remote evaluation, set `fetchOnStart` to `false` to avoid increased startup latency caused by remote evaluation.
* If your application relies on remote evaluation, but not right at startup, you may set `fetchOnStart` to `false` and call `fetch()` and await the future separately.

{{partial:tabs tabs="Amplitude, Third-party"}}
{{partial:tab name="Amplitude"}}
```kotlin
try {
    experiment.start().get();
} catch (e: Exception) {
    e.printStackTrace();
}
```
{{/partial:tab}}
{{partial:tab name="Third-party"}}
```kotlin
ExperimentUser user = ExperimentUser.builder()
    .userId("user@company.com")
    .userProperty("premium", true)
    .build();
try {
    experiment.start(user).get();
} catch (e: Exception) {
    e.printStackTrace();
}
```
{{/partial:tab}}
{{/partial:tabs}}

## Variant

Access a [variant](/docs/feature-experiment/data-model#variants) for a [flag or experiment](/docs/feature-experiment/data-model#flags-and-experiments) from the SDK client's local store.

{{partial:admonition type="info" heading="Automatic exposure tracking"}}
When an [integration](#integrations) is used or a custom [exposure tracking provider](#exposure-tracking-provider) is set, `variant()` will automatically track an exposure event through the tracking provider. To disable this functionality, [configure](#configuration) `automaticExposureTracking` to be `false`, and track exposures manually using [`exposure()`](#exposure).
{{/partial:admonition}}

```kotlin
fun variant(key: String, fallback: Variant? = null): Variant
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `key` | required | The **flag key** to identify the [flag or experiment](/docs/feature-experiment/data-model#flags-and-experiments) to access the variant for. |
| `fallback` | optional | The value to return if no variant was found for the given `flagKey`. |

When determining which variant a user has been bucketed into, you'll want to compare the variant `value` to a well-known string.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
Variant variant = client.variant("<FLAG_KEY>");
if (variant.is("on")) {
    // Flag is on
} else {
    // Flag is off
}
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
Variant variant = client.variant("<FLAG_KEY>");
if (variant.value == "on") {
    // Flag is on
} else {
    // Flag is off
}
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="note" heading="Access the variant's payload"}}
A variant may also be configured with a dynamic [payload](/docs/feature-experiment/data-model#variants) of arbitrary data. Access the `payload` field from the variant object after checking the variant's `value`.

The `payload` on Android is of type `Object` (`Any?`) meaning you will need to cast the payload to the expected type. JSON object and array types need to be cast as `org.json.JSONObject` and `org.json.JSONArray` respectively.

For example, if the payload is `{"key":"value"}`:

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
Variant variant = experiment.variant("<FLAG_KEY>");
if (variant.is("on") && variant.payload != null) {
    try {
        String value = ((JSONObject) variant.payload).getString("key");
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val variant = experiment.variant("<FLAG_KEY>")
if (variant.value == "on") {
    try {
        val value = (variant.payload as JSONObject).getString("key")
    } catch (e: Exception) {
        e.printStackTrace()
    }
}
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:admonition}}

A `null` variant `value` means that the user hasn't been bucketed into a variant. You may use the built in **fallback** parameter to provide a variant to return if the store doesn't contain a variant for the given flag key.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
Variant variant = experiment.variant("<FLAG_KEY>", new Variant("control"));
if (variant.is("control")) {
    // Control
} else if (variant.is("treatment")) {
    // Treatment
}
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val variant = experiment.variant("<FLAG_KEY>", Variant("control"))
if (variant.value == "control") {
    // Control
} else if (variant.value == "treatment") {
    // Treatment
}
```
{{/partial:tab}}
{{/partial:tabs}}

## All

Access all [variants](/docs/feature-experiment/data-model#variants) stored by the SDK client.

```kotlin
fun all(): Map<String, Variant>
```

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
experiment.all();
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
experiment.all()
```
{{/partial:tab}}
{{/partial:tabs}}

## Clear

Clear all [variants](/docs/feature-experiment/data-model#variants) in the cache and storage.

```kotlin
fun clear()
```

You can call `clear` after user logout to clear the variants in cache and storage.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
experiment.clear();
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
experiment.clear()
```
{{/partial:tab}}
{{/partial:tabs}}

## Exposure

Manually track an [exposure event](/docs/feature-experiment/under-the-hood/event-tracking#exposure-events) for the current variant of the given flag key through configured [integration](#integrations) or custom [exposure tracking provider](#exposure-tracking-provider). Generally used in conjunction with setting the `automaticExposureTracking` [configuration](#configuration) optional to `false`.

```kotlin
fun exposure(key: String)
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `key` | required | The **flag key** to identify the [flag or experiment](/docs/feature-experiment/data-model#flags-and-experiments) variant to track an [exposure event](/docs/feature-experiment/under-the-hood/event-tracking#exposure-events) for. |

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
Variant variant = experiment.variant("<FLAG_KEY>");

// Do other things...

experiment.exposure("<FLAG_KEY>");
if (variant.is("control")) {
    // Control
} else if (variant.is("treatment")) {
    // Treatment
}
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val variant = experiment.variant("<FLAG_KEY>")

// Do other things...

experiment.exposure("<FLAG_KEY>")
if (variant.value == "control") {
    // Control
} else if (variant.value == "treatment") {
    // Treatment
}
```
{{/partial:tab}}
{{/partial:tabs}}

## Providers

{{partial:admonition type="tip" heading="Integrations"}}
If you use Amplitude or Segment analytics SDKs along side the Experiment Client SDK, Amplitude recommends you use an [integration](#integrations) instead of implementing custom providers.
{{/partial:admonition}}

Provider implementations enable a more streamlined developer experience by making it easier to manage user identity and track exposures events.

### User provider

The user provider is used by the SDK client to access the most up-to-date user information only when it's needed (for example, when [`fetch()`](#fetch) is called). This provider is optional, but helps if you have a user information store already set up in your application. This way, you don't need to manage two separate user info stores in parallel, which may result in a divergent user state if the application user store is updated and experiment isn't (or vice versa).

```kotlin title="ExperimentUserProvider"
interface ExperimentUserProvider {
    fun getUser(): ExperimentUser
}
```

To use your custom user provider, set the `userProvider` [configuration](#configuration) option with an instance of your custom implementation on SDK initialization.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
ExperimentConfig config = ExperimentConfig.builder()
    .userProvider(new CustomUserProvider())
    .build();
ExperimentClient experiment = Experiment.initialize(
    context, "<DEPLOYMENT_KEY>", config);
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val config = ExperimentConfig.builder()
    .userProvider(CustomUserProvider())
    .build()
val experiment = Experiment.initialize(context, "<DEPLOYMENT_KEY>", config)
```
{{/partial:tab}}
{{/partial:tabs}}

### Exposure tracking provider

Implementing an exposure tracking provider is highly recommended. [Exposure tracking](/docs/feature-experiment/under-the-hood/event-tracking#exposure-events) increases the accuracy and reliability of experiment results and improves visibility into which flags and experiments a user is exposed to.

```kotlin
interface ExposureTrackingProvider {
    fun track(exposure: Exposure)
}
```

The implementation of `track()` should track an event of type `$exposure` (a.k.a name) with two event properties, `flag_key` and `variant`, corresponding to the two fields on the `Exposure` object argument. Finally, the event tracked must eventually end up in Amplitude Analytics for the same project that the [deployment] used to [initialize](#initialize) the SDK client lives within, and for the same user that variants were [fetched](#fetch) for.

To use your custom user provider, set the `exposureTrackingProvider` [configuration](#configuration) option with an instance of your custom implementation on SDK initialization.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
ExperimentConfig config = ExperimentConfig.builder()
    .exposureTrackingProvider(new CustomExposureTrackingProvider())
    .build();
ExperimentClient experiment = Experiment.initialize(
    context, "<DEPLOYMENT_KEY>", config);
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val config = ExperimentConfig.builder()
    .exposureTrackingProvider(CustomExposureTrackingProvider())
    .build()
val experiment = Experiment.initialize(context, "<DEPLOYMENT_KEY>", config)
```
{{/partial:tab}}
{{/partial:tabs}}
