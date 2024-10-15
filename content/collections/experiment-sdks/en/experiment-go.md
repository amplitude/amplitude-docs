---
id: 1e224b64-c80b-48a2-a408-57a73aa36a33
blueprint: experiment-sdk
title: 'Experiment Go SDK'
source: 'https://www.docs.developers.amplitude.com/experiment/sdks/go-sdk/'
sdk_status: current
article_type: core
supported_languages:
  - go
landing: false
github_link: 'https://github.com/amplitude/experiment-go-server'
releases_url: 'https://github.com/amplitude/experiment-go-server/releases'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717526428
shields_io_badge: 'https://img.shields.io/github/v/tag/amplitude/experiment-go-server?sort=semver'
logo: icons/go.svg
---
Official documentation for Amplitude Experiment's server-side Go SDK implementation.

This documentation is split into two sections for [remote](/docs/feature-experiment/remote-evaluation) and [local](/docs/feature-experiment/local-evaluation) evaluation:

## Remote evaluation

Implements fetching variants for a user via [remote evaluation](/docs/feature-experiment/remote-evaluation).

### Install

Install the Go Server SDK using `go get`.

```bash
go get github.com/amplitude/experiment-go-server
```

{{partial:admonition type="tip" heading="Quick start"}}
1. [Initialize the experiment client](#initialize)
2. [Fetch variants for the user](#fetch)
3. [Access a flag's variant](#fetch)

```go
// (1) Initialize the local evaluation client with a server deployment key.
client := remote.Initialize("<DEPLOYMENT_KEY>", nil)

// (2) Fetch variants for a user
user := &experiment.User{
  UserId:   "user@company.com",
  DeviceId: "abcdefg",
  UserProperties: map[string]interface{}{
    "premium": true,
  },
}
variants, err := client.Fetch(user)
if err != nil {
  // Handle error
}

// (3) Access a flag's variant
variant := variants["<FLAG_KEY>"]
if variant.Value == "on" {
    // Flag is on
} else {
    // Flag is off
}
```

{{/partial:admonition}}

### Initialize

The SDK client should be initialized in your server on startup. The [deployment key](/docs/feature-experiment/data-model#deployments) argument passed into the `apiKey` parameter must live within the same project that you are sending analytics events to.

```go
func Initialize(apiKey string, config *Config) *Client
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The [deployment key](/docs/feature-experiment/data-model#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

```go
client := remote.Initialize("<DEPLOYMENT_KEY>", nil)
```

#### Configuration

The SDK client can be configured on initialization.

{{partial:admonition type="info" heading="EU data center"}}
If you're using Amplitude's EU data center, configure the `ServerZone` option on initialization.
{{/partial:admonition}}

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `Debug` | Set to `true` to enable debug logging. | `false` |
| `ServerZone` | The Amplitude data center to use. Either `USServerZone` or `EUServerZone`. | `USServerZone` |
| `ServerUrl` | The host to fetch flag configurations from. | `https://api.lab.amplitude.com` |
| `FlagConfigPollingInterval` |  The timeout for fetching variants in milliseconds. This timeout only applies to the initial request, not subsequent retries | `500 * time.Millisecond` |
| `RetryBackoff.FetchRetries` | The number of retries to attempt if a request to fetch variants fails. | `1` |
| `RetryBackoff.FetchRetryBackoffMin` | The minimum (initial) backoff after a request to fetch variants fails. This delay is scaled by the `RetryBackoff.FetchRetryBackoffScalar` | `0` |
| `RetryBackoff.FetchRetryBackoffMax` | The maximum backoff between retries. If the scaled backoff becomes greater than the max, the max is used for all subsequent requests | `10 * time.Second` |
| `RetryBackoff.FetchRetryBackoffScalar` | Scales the minimum backoff exponentially. | `1` |
| `RetryBackoff.FetchRetryTimeout` | The request timeout for retrying variant fetches. | `500 * time.Millisecond` |

### Fetch

Fetches variants for a [user](/docs/feature-experiment/data-model#users) and returns the results. This function [remote evaluates](/docs/feature-experiment/remote-evaluation) the user for flags associated with the deployment used to initialize the SDK client.

```go
func (c *Client) Fetch(user *experiment.User) (map[string]experiment.Variant, error)
```

| Parameter  | Requirement | Description |
| --- | --- | --- |
| `user` | required | The [user](/docs/feature-experiment/data-model#users) to remote fetch variants for. |

```go
user := &experiment.User{
    UserId:   "user@company.com",
    DeviceId: "abcdefg",
    UserProperties: map[string]interface{}{
        "premium": true,
    },
}
variants, err := client.Fetch(user)
if err != nil {
    // Handle error
}
```

After fetching variants for a user, you may to access the variant for a specific flag.

```go
variant := variants["<FLAG_KEY>"]
if variant.Value == "on" {
    // Flag is on
} else {
    // Flag is off
}
```

## Local evaluation

Implements evaluating variants for a user via [local evaluation](/docs/feature-experiment/local-evaluation). If you plan on using local evaluation, you should [understand the tradeoffs](/docs/feature-experiment/local-evaluation#targeting-capabilities).

### Install

Install the Go Server SDK using `go get`.

```bash
go get github.com/amplitude/experiment-go-server
```

{{partial:admonition type="tip" heading="Quick start"}}
 1. [Initialize the local evaluation client.](#initialize-1)
 2. [Start the local evaluation client.](#start)
 3. [Evaluate a user.](#evaluate)

 ```go
 // (1) Initialize the local evaluation client with a server deployment key.
 client := local.Initialize("<DEPLOYMENT_KEY>", &local.Config{
  // (Recommended) Enable local evaluation cohort targeting.
  CohortSyncConfig: &local.CohortSyncConfig {
    ApiKey: "<API_KEY>",
    SecretKey: "<SECRET_KEY>"
  }
 })

 // (2) Start the local evaluation client.
 err := client.Start()
 if err != nil {
   panic(err)
 }

   // (3) Evaluate a user.
 user := &experiment.User{DeviceId: "abcdefg"}
 variants, err := client.EvaluateV2(user, nil)
 if err != nil {
   panic(err)
 }
 ```
{{/partial:admonition}}

### Initialize

Initializes a [local evaluation](/docs/feature-experiment/local-evaluation) client.

{{partial:admonition type="warning" heading="Server deployment key"}}
You must [initialize](#initialize-1) the local evaluation client with a server [deployment](/docs/feature-experiment/data-model#deployments) key to get access to local evaluation flag configs.
{{/partial:admonition}}

```go
func Initialize(apiKey string, config *Config) *Client
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The server [deployment key](/docs/feature-experiment/data-model#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

{{partial:admonition type="tip" heading="Flag polling interval"}}
Use the `FlagConfigPollingInterval` [configuration](#configuration-1) to determine the time flag configs take to update once modified (default 30s).
{{/partial:admonition}}

#### Configuration

The SDK client can be configured on initialization.

{{partial:admonition type="info" heading="EU data center"}}
If you're using Amplitude's EU data center, configure the `ServerZone` option on initialization.
{{/partial:admonition}}

**Config**

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `Debug` | Set to `true` to enable debug logging. | `false` |
| `ServerZone` | The Amplitude data center to use. Either `USServerZone` or `EUServerZone`. | `USServerZone` |
| `ServerUrl` | The host to fetch flag configurations from. | `https://api.lab.amplitude.com` |
| `FlagConfigPollingInterval` | The interval to poll for updated flag configs after calling [`Start()`](#start) | `30 * time.Second` |
| `FlagConfigPollerRequestTimeout` | The timeout for the request made by the flag config poller | `10 * time.Second` |
| `AssignmentConfig` | Configuration for automatically tracking assignment events after an evaluation. | `nil` |
| `CohortSyncConfig` | Configuration to enable cohort downloading for [local evaluation cohort targeting](#local-evaluation-cohort-targeting). | `nil` |

**AssignmentConfig**

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `CacheCapacity` | The maximum number of assignments stored in the assignment cache | `524288` |
| [`Config`](/docs/sdks/analytics/go/go-sdk#configuration) | Options to configure the underlying Amplitude Analytics SDK used to track assignment events |  |

**CohortSyncConfig**

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `ApiKey` | The analytics API key and NOT the experiment deployment key | *required* |
| `SecretKey` | The analytics secret key | *required* |
| `MaxCohortSize` | The maximum size of cohort that the SDK will download. Cohorts larger than this size won't download. | `2147483647` |
| `CohortPollingIntervalMillis` | The interval, in milliseconds, to poll Amplitude for cohort updates (60000 minimum). | `60000` |

### Start

Start the local evaluation client, pre-fetching local evaluation mode flag configs for [evaluation](#evaluate) and starting the flag config poller at the [configured](#configuration) interval.

```go
func (c *Client) Start() error
```

You should await the result of `Start()` to ensure that flag configs are ready to be used before calling [`Evaluate()`](#evaluate)

```go
err := client.Start()
if err != nil {
    panic(err)
}
```

### Evaluate

Executes the [evaluation logic](/docs/feature-experiment/implementation) using the flags pre-fetched on [`Start()`](#start). Evaluate must be given a user object argument and can optionally be passed an array of flag keys if only a specific subset of required flag variants are required.

{{partial:admonition type="tip" heading="Automatic assignment tracking"}}
Set [`AssignmentConfig`](#configuration_1) to automatically track an assignment event to Amplitude when `EvaluateV2()` is called.
{{/partial:admonition}}

```go
func (c *Client) EvaluateV2(user *experiment.User, flagKeys []string) (map[string]experiment.Variant, error)
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `user` | required | The [user](/docs/feature-experiment/data-model#users) to evaluate. |
| `flagKeys` | optional | Specific flags or experiments to evaluate. If nil, or empty, all flags and experiments are evaluated. |

```go
// The user to evaluate
user := &experiment.User{DeviceId: "abcdefg"}

// Evaluate all flag variants
allVariants, err := client.EvaluateV2(user, nil)
if err != nil {
    // Handle Error
}

// Evaluate a specific subset of flag variants
specificVariants, err := client.EvaluateV2(user, []string{
    "<FLAG_KEY_1>",
    "<FLAG_KEY_2>",
})

// Access a variant
variant := allVariants["<FLAG_KEY>"]
if variant.Value == "on" {
    // Flag is on
} else {
    // Flag is off
}
```

### Local evaluation cohort targeting

Since version `1.7.0`, the local evaluation SDK client supports downloading cohorts for local evaluation targeting. Configure the `CohortSyncConfig` option with the analytics `ApiKey` and `SecretKey` on initialization to enable this support.

```go
client := local.Initialize("<DEPLOYMENT_KEY>", &local.Config{
  // (Recommended) Enable local evaluation cohort targeting.
  CohortSyncConfig: &local.CohortSyncConfig {
    ApiKey: "<API_KEY>",
    SecretKey: "<SECRET_KEY>"
  }
})
```
