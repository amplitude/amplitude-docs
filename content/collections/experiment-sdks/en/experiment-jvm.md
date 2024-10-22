---
id: 3eab77ce-9efe-46bb-9daf-81bf55876d1c
blueprint: experiment-sdk
title: 'Experiment JVM SDK'
source: 'https://www.docs.developers.amplitude.com/experiment/sdks/jvm-sdk/'
sdk_status: current
article_type: core
supported_languages:
  - java
  - kotlin
landing: false
github_link: 'https://github.com/amplitude/experiment-jvm-server'
releases_url: 'https://github.com/amplitude/experiment-jvm-server/releases'
shields_io_badge: 'https://img.shields.io/maven-central/v/com.amplitude/experiment-jvm-server?versionPrefix=1.1'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717526452
logo: icons/java.svg
---
Official documentation for Amplitude Experiment's server-side JVM SDK implementation. This SDK may be used in **either Java or Kotlin** server-side implementations.

This documentation has separate sections for [remote](/docs/experiment/remote-evaluation) and [local](/docs/experiment/local-evaluation) evaluation:

## Remote evaluation

Implements fetching variants for a user via [remote evaluation](/docs/experiment/remote-evaluation).

### Install

Install the JVM Server SDK using Gradle.

{{partial:tabs tabs="Groovy, Kotlin"}}
{{partial:tab name="Groovy"}}
```groovy
implementation "com.amplitude:experiment-jvm-server:<VERSION>"
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
implementation("com.amplitude:experiment-jvm-server:<VERSION>")
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Quick start"}}
1. [Initialize the experiment client](#initialize-remote)
2. [Fetch variants for the user](#fetch)
3. [Access a flag's variant](#fetch)

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
// (1) Initialize the remote evaluation client with a server deployment key.
val experiment = Experiment.initializeRemote("<DEPLOYMENT_KEY>")

// (2) Fetch variants for a user
val user = ExperimentUser.builder()
    .userId("user@company.com")
    .deviceId("abcdefg")
    .userProperty("premium", true)
    .build()
val variants = try {
    experiment.fetch(user).get()
} catch (e: Exception) {
    e.printStackTrace()
    return
}

// (3) Access a flag's variant
val variant = variants["<FLAG_KEY>"]
if (variant?.value == "on") {
    // Flag is on
} else {
    // Flag is off
}
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
// (1) Initialize the remote evaluation client with a server deployment key.
RemoteEvaluationClient experiment =
        Experiment.initializeRemote("<DEPLOYMENT_KEY>");

// (2) Fetch variants for a user
ExperimentUser user = ExperimentUser.builder()
        .userId("user@company.com")
        .deviceId("abcdefg")
        .userProperty("premium", true)
        .build();
Map<String, Variant> variants;
try {
    variants = experiment.fetch(user).get();
} catch (Exception e) {
    e.printStackTrace();
    return;
}

// (3) Access a flag's variant
Variant variant = variants.get("<FLAG_KEY>");
if (Variant.valueEquals(variant, "on")) {
    // Flag is on
} else {
    // Flag is off
}
```
{{/partial:tab}}
{{/partial:tabs}}

{{/partial:collapse}}

### Initialize remote

The SDK client should be initialized in your server on startup. The [deployment key](/docs/experiment/data-model#deployments) argument passed into the `apiKey` parameter must live within the same project that you are sending analytics events to.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
fun initializeRemote(
    apiKey: String,
    config: RemoteEvaluationConfig = RemoteEvaluationConfig()
): RemoteEvaluationClient
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
@Nonnull
public RemoteEvaluationClient initializeRemote(
    @Nonnull String apiKey,
    @Nonnull RemoteEvaluationConfig config
);
```
{{/partial:tab}}
{{/partial:tabs}}


| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The [deployment key](/docs/experiment/data-model#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
val experiment = Experiment.initializeRemote("<DEPLOYMENT_KEY>")
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
RemoteEvaluationClient experiment = Experiment.initializeRemote("<DEPLOYMENT_KEY>");
```
{{/partial:tab}}
{{/partial:tabs}}

#### Configuration

The SDK client can be configured on initialization.

{{partial:admonition type="info" heading="EU data center"}}
If you're using Amplitude's EU data center, configure the `serverZone` option on initialization.
{{/partial:admonition}}

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `debug` | Set to `true` to enable debug logging. | `false` |
| `serverZone` | The Amplitude data center to use. Either `ServerZone.US` or `ServerZone.EU`. | `ServerZone.US` |
| `serverUrl` | The host to fetch flag configurations from. | `https://api.lab.amplitude.com` |
| `fetchTimeoutMillis` |  The timeout for fetching variants in milliseconds. This timeout only applies to the initial request, not subsequent retries | `500` |
| `fetchRetries` | The number of retries to attempt if a request to fetch variants fails. | `1` |
| `fetchRetryBackoffMinMillis` | The minimum (initial) backoff after a request to fetch variants fails. This delay is scaled by the `fetchRetryBackoffScalar` | `0` |
| `fetchRetryBackoffMaxMillis` | The maximum backoff between retries. If the scaled backoff becomes greater than the max, the max is used for all subsequent requests | `10000` |
| `fetchRetryBackoffScalar` | Scales the minimum backoff exponentially. | `1` |

**CohortSyncConfig**

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `apiKey` | The analytics API key and NOT the experiment deployment key | *required* |
| `secretKey` | The analytics secret key | *required* |
| `maxCohortSize` | The maximum size of cohort that the SDK will download. Cohorts larger than this size won't download. | `2147483647` |
| `cohortPollingIntervalMillis` | The interval, in milliseconds, to poll Amplitude for cohort updates (60000 minimum). | `60000` |

### Fetch

Fetches variants for a [user](/docs/experiment/data-model#users) and returns the results. This function [remote evaluates](/docs/experiment/remote-evaluation) the user for flags associated with the deployment used to initialize the SDK client.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
fun fetch(user: ExperimentUser): CompletableFuture<Map<String, Variant>>
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
@Nonnull
public CompletableFuture<Map<String, Variant>> fetch(@Nonnull ExperimentUser user);
```
{{/partial:tab}}
{{/partial:tabs}}

| Parameter  | Requirement | Description |
| --- | --- | --- |
| `user` | required | The [user](/docs/experiment/data-model#users) to remote fetch variants for. |

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
val user = ExperimentUser.builder()
    .userId("user@company.com")
    .deviceId("abcdefg")
    .userProperty("premium", true)
    .build()
val variants = try {
    experiment.fetch(user).get()
} catch (e: Exception) {
    e.printStackTrace()
    return
}
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
ExperimentUser user = ExperimentUser.builder()
    .userId("user@company.com")
    .deviceId("abcdefg")
    .userProperty("premium", true)
    .build();
Map<String, Variant> variants;
try {
    variants = experiment.fetch(user).get();
} catch (Exception e) {
    e.printStackTrace();
    return;
}
```
{{/partial:tab}}
{{/partial:tabs}}


After fetching variants for a user, you may to access the variant for a specific flag.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
val variant = variants["<FLAG_KEY>"]
if (variant?.value == "on") {
    // Flag is on
} else {
    // Flag is off
}
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
Variant variant = variants.get("<FLAG_KEY>");
if (Variant.valueEquals(variant, "on")) {
    // Flag is on
} else {
    // Flag is off
}
```
{{/partial:tab}}
{{/partial:tabs}}

## Local evaluation

Implements evaluating variants for a user via [local evaluation](/docs/experiment/local-evaluation). If you plan on using local evaluation, you should [understand the tradeoffs](/docs/experiment/local-evaluation#targeting-capabilities).

### Install

Install the JVM Server SDK using Maven or Gradle.

{{partial:tabs tabs="Groovy, Kotlin"}}
{{partial:tab name="Groovy"}}
```groovy
implementation "com.amplitude:experiment-jvm-server:<VERSION>"
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
implementation("com.amplitude:experiment-jvm-server:<VERSION>")
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="tip" heading="Quick start"}}
1. [Initialize the local evaluation client.](#initialize-local)
2. [Start the local evaluation client.](#start)
3. [Evaluate a user.](#evaluate)

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}

```kotlin
// (1) Initialize the local evaluation client with a server deployment key.
val experiment = Experiment.initializeLocal(
    "<DEPLOYMENT_KEY>",
    // (Recommended) Enable local evaluation cohort targeting.
    LocalEvaluationConfig.builder()
        .cohortSyncConfig(CohortSyncConfig("<API_KEY>", "<SECRET_KEY>"))
        .build()
)

// (2) Start the local evaluation client.
experiment.start()

// (3) Evaluate a user.
val user = ExperimentUser.builder()
    .userId("user@company.com")
    .deviceId("abcdefg")
    .userProperty("premium", true)
    .build()
val variants = experiment.evaluate(user)
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
// (1) Initialize the local evaluation client with a server deployment key.
LocalEvaluationClient experiment = Experiment.initializeLocal("<DEPLOYMENT_KEY>",
    // (Recommended) Enable local evaluation cohort targeting.
    LocalEvaluationConfig.builder()
        .cohortSyncConfig(new CohortSyncConfig("<API_KEY>", "<SECRET_KEY>"))
        .build());

// (2) Start the local evaluation client.
experiment.start();

// (3) Evaluate a user.
ExperimentUser user = ExperimentUser.builder()
    .userId("user@company.com")
    .deviceId("abcdefg")
    .userProperty("premium", true)
    .build();
Map<String, Variant> variants = experiment.evaluate(user);
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:admonition}}

### Initialize local

Initializes a [local evaluation](/docs/experiment/local-evaluation) client.

{{partial:admonition type="warning" heading="Server deployment key"}}
You must [initialize](#initialize-local) the local evaluation client with a server [deployment](/docs/experiment/data-model#deployments) key to get access to local evaluation flag configs.
{{/partial:admonition}}

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
fun initializeLocal(
    apiKey: String,
    config: LocalEvaluationConfig = LocalEvaluationConfig(),
): LocalEvaluationClient
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
@Nonnull
public LocalEvaluationClient initializeLocal(
    @Nonnull String apiKey,
    @Nonnull LocalEvaluationConfig config
);
```
{{/partial:tab}}
{{/partial:tabs}}

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The server [deployment key](/docs/experiment/data-model#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

{{partial:admonition type="tip" heading="Flag streaming"}}
Use the `streamUpdates` [configuration](#configuration-1) to push flag config updates to the SDK (default `false`), instead of polling every `flagConfigPollingIntervalMillis` milliseconds. The time for SDK to receive the update after saving is generally under one second. It reverts to polling if streaming fails. Configure `flagConfigPollingIntervalMillis` [configuration](#configuration-1) to set the time flag configs take to update once modified (default 30s), as well for fallback.
{{/partial:admonition}}

#### Configuration

You can configure the SDK client on initialization.

{{partial:admonition type="info" heading="EU data center"}}
If you're using Amplitude's EU data center, configure the `serverZone` option on initialization.
{{/partial:admonition}}

**LocalEvaluationConfig**

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `debug` | Set to `true` to enable debug logging. | `false` |
| `serverZone` | The Amplitude data center to use. Either `ServerZone.US` or `ServerZone.EU`. | `ServerZone.US` |
| `serverUrl` | The host to fetch flag configurations from. | `https://api.lab.amplitude.com` |
| `flagConfigPollingIntervalMillis` | The interval to poll for updated flag configs after calling [`Start()`](#start) | `30000` |
| `flagConfigPollerRequestTimeoutMillis` | The timeout for the request made by the flag config poller | `10000` |
| `assignmentConfiguration` | Enable automatic assignment tracking for local evaluations. | `null` |
| `streamUpdates` | Enable streaming to replace polling for receiving flag config updates. Instead of polling every second, Amplitude servers push updates to SDK generally within one second. If the stream fails for any reason, it reverts to polling automatically and retry streaming after some interval. | `false` |
| `streamServerUrl` | The URL of the stream server. | `https://stream.lab.amplitude.com` |
| `streamFlagConnTimeoutMillis` | The timeout for establishing a valid flag config stream. This includes time for establishing a connection to stream server and time for receiving initial flag configs. | `1500` |
| `cohortSyncConfig` | Configuration to enable cohort downloading for [local evaluation cohort targeting](#local-evaluation-cohort-targeting). | `null` |

**AssignmentConfiguration**

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `api_key` | The analytics API key and NOT the experiment deployment key | *required* |
| `cache_capacity` | The maximum number of assignments stored in the assignment cache | `65536` |
| `eventUploadThreshold` | `setEventUploadThreshold()` in the underlying [Analytics SDK](/docs/sdks/analytics/java/jre-java-sdk#configuration) | `10` |
| `eventUploadPeriodMillis` | `setEventUploadPeriodMillis()` in the underlying [Analytics SDK](/docs/sdks/analytics/java/jre-java-sdk#configuration) | `10000` |
| `useBatchMode` | `useBatchMode()` in the underlying [Analytics SDK](/docs/sdks/analytics/java/jre-java-sdk#configuration) | `true` |

**CohortSyncConfig**

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `apiKey` | The analytics API key and NOT the experiment deployment key | *required* |
| `secretKey` | The analytics secret key | *required* |
| `maxCohortSize` | The maximum size of cohort that the SDK will download. Cohorts larger than this size won't download. | `2147483647` |
| `cohortPollingIntervalMillis` | The interval, in milliseconds, to poll Amplitude for cohort updates (60000 minimum). | `60000` |

### Start

Start the local evaluation client, pre-fetching local evaluation mode flag configs for [evaluation](#evaluate) and starting the flag config poller at the [configured](#configuration) interval.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
fun start()
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
public void start();
```
{{/partial:tab}}
{{/partial:tabs}}

You should wait for `start()` to return before calling [`evaluate()`](#evaluate) to ensure that flag configs are available for use in evaluation.

### Evaluate

Executes the [evaluation logic](/docs/experiment/implementation) using the flags pre-fetched on [`start()`](#start). Evaluate must be given a user object argument and can optionally be passed an array of flag keys if only a specific subset of required flag variants are required.

{{partial:admonition type="tip" heading="Automatic assignment tracking"}}
Set [`assignmentConfiguration`](#configuration_1) to automatically track an assignment event to Amplitude when `evaluate()` is called.
{{/partial:admonition}}

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
fun evaluate(user: ExperimentUser, flagKeys: List<String> = listOf()): Map<String, Variant>
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
@Nonnull
public Map<String, Variant> evaluate(@Nonnull experimentUser, @Nonnull List<String> flagKeys);
```
{{/partial:tab}}
{{/partial:tabs}}

| Parameter | Requirement | Description |
| --- | --- | --- |
| `user` | required | The [user](/docs/experiment/data-model#users) to evaluate. |
| `flagKeys` | optional | Specific flags or experiments to evaluate. If empty, all flags and experiments are evaluated. |

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}
```kotlin
// The user to evaluate
val user = ExperimentUser.builder()
    .userId("user@company.com")
    .deviceId("abcdefg")
    .userProperty("premium", true)
    .build()

// Evaluate all flag variants
val allVariants = experiment.evaluate(user)

// Evaluate a specific subset of flag variants
val specificVariants = experiment.evaluate(user, listOf(
    "<FLAG_KEY_1>",
    "<FLAG_KEY_2>",
))

// Access a variant
val variant = allVariants["<FLAG_KEY>"]
if (variant?.value == "on") {
    // Flag is on
} else {
    // Flag is off
}
```
{{/partial:tab}}
{{partial:tab name="Java"}}
```java
// The user to evaluate
ExperimentUser user = ExperimentUser.builder()
    .userId("user@company.com")
    .deviceId("abcdefg")
    .userProperty("premium", true)
    .build();

// Evaluate all flag variants
Map<String, Variant> allVariants = experiment.evaluate(user);

// Evaluate a specific subset of flag variants
Map<String, Variant> specificVariants = experiment.evaluate(user,
    List.of("<FLAG_KEY_1>", "<FLAG_KEY_2>"));

// Access a variant
Variant variant = allVariants.get("<FLAG_KEY>");
if (Variant.valueEquals(variant, "on")) {
    // Flag is on
} else {
    // Flag is off
}
```
{{/partial:tab}}
{{/partial:tabs}}

### Local evaluation cohort targeting

Since version `1.4.0`, the local evaluation SDK client supports downloading cohorts for local evaluation targeting. Configure the SDK using `cohortSyncConfig` with the analytics `apiKey` and `secretKey` on initialization to enable this support.

{{partial:tabs tabs="Kotlin, Java"}}
{{partial:tab name="Kotlin"}}

```kotlin
val experiment = Experiment.initializeLocal(
    "<DEPLOYMENT_KEY>",
    // (Recommended) Enable local evaluation cohort targeting.
    LocalEvaluationConfig.builder()
        .cohortSyncConfig(CohortSyncConfig("<API_KEY>", "<SECRET_KEY>"))
        .build()
)
```

{{/partial:tab}}
{{partial:tab name="Java"}}

```java
// (1) Initialize the local evaluation client with a server deployment key.
LocalEvaluationClient experiment = Experiment.initializeLocal("<DEPLOYMENT_KEY>",
    // (Recommended) Enable local evaluation cohort targeting.
    LocalEvaluationConfig.builder()
        .cohortSyncConfig(new CohortSyncConfig("<API_KEY>", "<SECRET_KEY>"))
        .build());
```

{{/partial:tab}}
{{/partial:tabs}}
