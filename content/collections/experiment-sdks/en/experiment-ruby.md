---
id: 932c399a-d47f-4772-a02d-cf3779bf3dac
blueprint: experiment-sdk
title: 'Experiment Ruby SDK'
source: 'https://www.docs.developers.amplitude.com/experiment/sdks/ruby-sdk/'
sdk_status: current
article_type: core
supported_languages:
  - ruby
landing: false
github_link: 'https://github.com/amplitude/experiment-ruby-server'
releases_url: 'https://github.com/amplitude/experiment-ruby-server/releases'
api_reference_url: 'https://amplitude.github.io/experiment-ruby-server/'
shields_io_badge: 'https://img.shields.io/gem/v/amplitude-experiment'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717526612
logo: icons/ruby.svg
---
Official documentation for Amplitude Experiment's server-side Ruby SDK implementation.

This documentation is split into two sections for [remote](/docs/feature-experiment/remote-evaluation) and [local](/docs/feature-experiment/local-evaluation) evaluation:

## Remote evaluation

Implements fetching variants for a user via [remote evaluation](/docs/feature-experiment/remote-evaluation).

### Install

{{partial:admonition type="note" heading="Ruby version compatibility"}}
The Ruby Server SDK works with Ruby 2.0+.
{{/partial:admonition}}

Install the Ruby Server SDK with bundler or gem directly.

{{partial:tabs tabs="Bundler, gem"}}
{{partial:tab name="Bundler"}}
```bash
gem 'amplitude-experiment'
```
{{/partial:tab}}
{{partial:tab name="gem"}}
```bash
gem install amplitude-experiment
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="tip" heading="Quick start"}}
1. [Initialize the experiment client](#initialize)
2. [Fetch variants for the user](#fetch)
3. [Access a flag's variant](#fetch)

```ruby
require 'amplitude-experiment'

# (1) Initialize the experiment client
experiment = AmplitudeExperiment.initialize_remote('<DEPLOYMENT_KEY>', AmplitudeExperiment::RemoteEvaluationConfig.new)

# (2) Fetch variants for a user
user = AmplitudeExperiment::User.new(
  user_id: 'user@company.com',
  device_id: 'abcdefg',
  user_properties: {
    'premium' => true
  }
)
variants = experiment.fetch(user)

# (3) Access a flag's variant
variant = variants['YOUR-FLAG-KEY']
unless variant.nil?
    if variant.value == 'on'
        # Flag is on
    else
        # Flag is off
    end
end
```
{{/partial:admonition}}

### Initialize

The SDK client should be initialized in your server on startup. The [deployment key](/docs/feature-experiment/data-model#deployments) argument passed into the `apiKey` parameter must live within the same project that you are sending analytics events to.

```ruby
initialize_remote(apiKey, config = nil) : Client
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The [deployment key](/docs/feature-experiment/data-model#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

{{partial:admonition type="info" heading="Timeout and retry configuration"}}
Configure the timeout and retry options to best fit your performance requirements.
```ruby
experiment = AmplitudeExperiment.initialize_remote('<DEPLOYMENT_KEY>', AmplitudeExperiment::RemoteEvaluationConfig.new)
```
{{/partial:admonition}}

#### Configuration

You can configure the SDK client on initialization.

{{partial:admonition type="info" heading="EU data center"}}
If you're using Amplitude's EU data center, configure the `server_zone` option on initialization.
{{/partial:admonition}}

| <div class="big-column">Name</div>  | Description | Default Value |
| --- | --- | --- |
| `debug` | Enable additional debug logging. | `false` |
| `server_zone` | The Amplitude data center to use. Either `ServerZone::US` or `ServerZone::EU` | `ServerZone::US` |
| `server_url` | The host to fetch variants from. | `https://api.lab.amplitude.com` |
| `fetch_timeout_millis` | The timeout for fetching variants in milliseconds. This timeout only applies to the initial request, not subsequent retries | `10000` |
| `fetch_retries` | The number of retries to attempt if a request to fetch variants fails. | `0` |
| `fetch_retry_backoff_min_millis` | The minimum (initial) backoff after a request to fetch variants fails. This delay is scaled by the `fetchRetryBackoffScalar` | `500` |
| `fetch_retry_backoff_max_millis` | The maximum backoff between retries. If the scaled backoff becomes greater than the max, the max is used for all subsequent requests | `10000` |
| `fetch_retry_backoff_scalar` | Scales the minimum backoff exponentially. | `1.5` |
| `fetch_retry_timeout_millis` | The request timeout for retrying variant fetches. | `10000` |

### Fetch

Fetches variants for a [user](/docs/feature-experiment/data-model#users) and returns the results. This function [remote evaluates](/docs/feature-experiment/remote-evaluation) the user for flags associated with the deployment used to initialize the SDK client.

```ruby
fetch(user: AmplitudeExperiment::User) : Variants
```

| Parameter  | Requirement | Description |
| --- | --- | --- |
| `user` | required | The [user](/docs/feature-experiment/data-model#users) to remote fetch variants for. |

```ruby
user = AmplitudeExperiment::User.new(
    user_id: 'user@company.com',
    device_id: 'abcdefg',
    user_properties: {
        'premium' => true
    }
)
variants = experiment.fetch(user)
```

After fetching variants for a user, you may to access the variant for a specific flag.

```ruby
variant = variants['YOUR-FLAG-KEY']
unless variant.nil?
  if variant.value == 'on'
    # Flag is on
  else
    # Flag is off
  end
end
```

### Fetch async

The fetch method is synchronous. To fetch asynchronously, you can use `fetch_async` method

```ruby
fetch_async(user: AmplitudeExperiment::User, &callback)
```

| Parameter  | Requirement | Description                                                                                           |
|------------|-------------|-------------------------------------------------------------------------------------------------------|
| `user`     | required    | The [user](/docs/feature-experiment/data-model#users) to remote fetch variants for.                         |
| `callback` | optional    | The callback to handle the variants. Callback takes two arguments: User object and returned Variants. |

```ruby
experiment.fetch_async(user) do |_, variants|
  variant = variants['sdk-ci-test']
  unless variant.nil?
    if variant.value == 'on'
      # Flag is on
    else
      # Flag is off
    end
  end
end
```

## Local evaluation

Implements evaluating variants for a user via [local evaluation](/docs/feature-experiment/local-evaluation). If you plan on using local evaluation, you should [understand the tradeoffs](/docs/feature-experiment/local-evaluation#targeting-capabilities).

### Install

Install the Ruby Server SDK's local evaluation.

{{partial:admonition type="warning Operating system and architecture support" heading=""}}
The local evaluation package currently only supports the following OS' and architectures (`OS/ARCH`):

**Supported**

* darwin/amd64
* darwin/arm64
* linux/amd64
* linux/arm64

**Alpine linux is not supported** at this time.

If you need another OS/Arch supported, please [submit an issue on github](https://github.com/amplitude/experiment-ruby-server/issues/new) or email [experiment@amplitude.com](mailto:experiment@amplitude.com).
{{/partial:admonition}}

Install the Ruby Server SDK with bundler or gem directly.

{{partial:admonition type="info" heading="Ruby version compaitibility"}}
The Ruby Server SDK works with Ruby 2.0+.
{{/partial:admonition}}

{{partial:tabs tabs="Bundler, Gem"}}
{{partial:tab name="Bundler"}}
```bash
gem 'amplitude-experiment'
```
{{/partial:tab}}
{{partial:tab name="Gem"}}
```bash
gem install amplitude-experiment
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="tip" heading="Quick start"}}
1. [Initialize the experiment client](#initialize)
2. [Start the local evaluation client](#start)
3. [Evaluate a user](#evaluate)

```ruby
require 'amplitude-experiment'

# (1) Initialize the local evaluation client with a server deployment key.
experiment = AmplitudeExperiment.initialize_local('DEPLOYMENT_KEY',
  # (Recommended) Enable local evaluation cohort targeting.
  AmplitudeExperiment::LocalEvaluationConfig.new(
    cohort_sync_config: AmplitudeExperiment::CohortSyncConfig.new(
      api_key: 'API_KEY',
      secret_key: 'SECRET_KEY'
    )
  )
)

# (2) Start the local evaluation
experiment.start

# (3) Evaluate a user
user = AmplitudeExperiment::User.new(
  user_id: 'user@company.com',
  device_id: 'abcdefg',
  user_properties: {
    'premium' => true
  }
)
variants = experiment.evaluate(user)
variant = variants['YOUR-FLAG-KEY']
unless variant.nil?
    if variant.value == 'on'
        # Flag is on
    else
        # Flag is off
    end
end
```
{{/partial:admonition}}


### Initialize

Initializes a [local evaluation](/docs/feature-experiment/local-evaluation) client.

{{partial:admonition type="warning" heading="Server deployment key"}}
You must [initialize](#initialize_1) the local evaluation client with a server [deployment](/docs/feature-experiment/data-model#deployments) key to get access to local evaluation flag configs.
{{/partial:admonition}}

```ruby
AmplitudeExperiment.initialize_local(api_key)
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The server [deployment key](/docs/feature-experiment/data-model#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

{{partial:admonition type="tip" heading="Flag polling interval"}}
Use the `flag_config_polling_interval_millis` [configuration](#configuration_1) to determine the time flag configs take to update once modified (default 30s).
{{/partial:admonition}}

#### Configuration

You can configure the SDK client on initialization.

{{partial:admonition type="info" heading="EU data center"}}
If you're using Amplitude's EU data center, configure the `server_zone` option on initialization.
{{/partial:admonition}}

**LocalEvaluationConfig**

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `server_zone` | The Amplitude data center to use. Either `ServerZone::US` or `ServerZone::EU` | `ServerZone::US` |
| `server_url` | The host to fetch flag configurations from. | `https://api.lab.amplitude.com` |
| `bootstrap` | Bootstrap the client with a map of flag key to flag configuration | `{}` |
| `flag_config_polling_interval_millis` | The interval to poll for updated flag configs after calling [`start`](#start) | `30000` |
| `debug` | Set to `true` to enable debug logging. | `false` |
| `assignment_config` | Configuration for automatically tracking assignment events after an evaluation. | `nil` |
| `cohort_sync_config` | Configuration to enable cohort downloading for [local evaluation cohort targeting](#local-evaluation-cohort-targeting). | `nil` |

**AssignmentConfig**

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `api_key` | The analytics API key and NOT the experiment deployment key | *required* |
| `cache_capacity` | The maximum number of assignments stored in the assignment cache | `65536` |
| `flush_queue_size` | Events wait in the buffer and are sent in a batch. The buffer is flushed when the number of events reaches `flush_queue_size`. | `200` |
| `flush_interval_millis` | Events wait in the buffer and are sent in a batch. The buffer is flushed every `flush_interval_millis` milliseconds. | `10 seconds` |
| `flush_max_retries` | The number of times the client retries an event when the request returns an error. | `12` |
| `logger` | The logger instance used by Amplitude client. | Default Ruby logger |
| `min_id_length` | The minimum length of `user_id` and `device_id`. | `5` |
| `callback`  | Client level callback function. Takes three parameters:<br> 1. event: a Event instance<br> 2. code: a integer of HTTP response code <br> 3. message: a string message. | `nil` |
| `server_zone` | The server zone of the projects. Supports `EU` and `US`. For EU data residency, Change to `EU`. | `US` |
| `server_url` | The API endpoint URL that events are sent to. Automatically selected by `server_zone` and `use_batch`. If this field is set with a string value instead of `nil`, then `server_zone` and `use_batch` are ignored and the string value is used. | `https://api2.amplitude.com/2/httpapi` |
| `use_batch` | Whether to use [batch API](/docs/apis/analytics/batch-event-upload#batch-event-upload). By default, the SDK will use the default `serverUrl`. | `False` |
| `storage_provider` | Used to create storage instance to hold events in the storage buffer. Events in storage buffer are waiting to be sent. | `InMemoryStorageProvider` |
| `opt_out`  | Opt out option. If set to `True`, client doesn't process and send events. | `False` |

**CohortSyncConfig**

| <div class="big-column">Name</div> | Description                                                                                                                                                                     | Default Value |
| --- |---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| --- |
| `api_key` | The analytics API key and NOT the experiment deployment key                                                                                                                     | *required* |
| `secret_key` | The analytics secret key                                                                                                                                                        | *required* |
| `max_cohort_size` | The maximum size of cohort that the SDK will download. Cohorts larger than this size will not be downloaded.                                                                    | `2147483647` |
| `cohort_polling_interval_millis` | The interval, in milliseconds, to poll Amplitude for cohort updates (60000 minimum).                                                                                            | `60000` |
| `cohort_server_url`                | The cohort server endpoint from which to fetch cohort data. For hitting the EU data center, set `server_zone` to `EU`. Setting this value will override `server_zone` defaults. | `https://cohort-v2.lab.amplitude.com` |

### Start

Start the local evaluation client, pre-fetching local evaluation mode flag configs for [evaluation](#evaluate) and starting the flag config poller at the [configured](#configuration_1) interval.

```ruby
start
```

You should await the result of `start` to ensure that flag configs are ready to be used before calling [`evaluate()`](#evaluate)

```ruby
experiment.start
```

### Evaluate

Executes the [evaluation logic](/docs/feature-experiment/implementation) using the flags pre-fetched on [`start`](#start). You must give evaluate a user object argument, and can you can optionally pass it an array of flag keys if only a specific subset of required flag variants are required.

{{partial:admonition type="tip" heading="Automatic assignment tracking"}}
Set [`assignment_config`](#configuration_1) to automatically track an assignment event to Amplitude when `evaluate()` is called.
{{/partial:admonition}}

```ruby
evaluate(user, flag_keys)
```

| Parameter   | Requirement | Description |
|-------------| --- | --- |
| `user`      | required | The [user](/docs/feature-experiment/data-model#users) to evaluate. |
| `flag_keys` | optional | Specific flags or experiments to evaluate. If nil, or empty, all flags and experiments are evaluated. |

```ruby
# The user to evaluate
user = AmplitudeExperiment::User.new(user_id: 'test-user')
# Evaluate all flag variants
all_variants = experiment.evaluate(user)
# Evaluate a specific subset of flag variants
specific_variants = experiment.evaluate(user, ["<FLAG_KEY_1>", "<FLAG_KEY_2>"])
# Access a variant
variant = all_variants["<FLAG_KEY>"]
if variant.value == 'on':
    # Flag is on
else:
    # Flag is off
end
```

### Local evaluation cohort targeting

Since version `1.5.0`, the local evaluation SDK client supports downloading cohorts for local evaluation targeting. You must configure the `cohort_sync_config` option with the analytics `api_key` and `secret_key` on initialization to enable this support.

```ruby
experiment = AmplitudeExperiment.initialize_local('DEPLOYMENT_KEY',
  # (Recommended) Enable local evaluation cohort targeting.
  AmplitudeExperiment::LocalEvaluationConfig.new(
    cohort_sync_config: AmplitudeExperiment::CohortSyncConfig.new(
      api_key: 'API_KEY',
      secret_key: 'SECRET_KEY'
    )
  )
)
```

## Access Amplitude cookies

If you're using the Amplitude Analytics SDK on the client-side, the Ruby server SDK provides an `AmplitudeCookie` class with convenience functions for parsing and interacting with the Amplitude identity cookie. This is useful for ensuring that the Device ID on the server matches the Device ID set on the client, especially if the client hasn't yet generated a Device ID.

```ruby
require 'amplitude-experiment'

# grab amp device id if present
amp_cookie_name = AmplitudeExperiment::AmplitudeCookie.cookie_name('amplitude-api-key')
device_id = nil
unless cookies[amp_cookie_name].nil?
  device_id = AmplitudeExperiment::AmplitudeCookie.parse(cookies[amp_cookie_name]).device_id
end

if device_id.nil?
  # deviceId doesn't exist, set the Amplitude Cookie
  device_id = SecureRandom.uuid
  amp_cookie_value = AmplitudeExperiment::AmplitudeCookie.generate(device_id)
  cookies[amp_cookie_name] = {
    value: amp_cookie_value,
    domain: '.your-domain.com', # this should be the same domain used by the Amplitude JS SDK
    httponly: false,
    secure: false
  }
end
```
