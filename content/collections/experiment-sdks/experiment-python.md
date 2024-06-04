---
id: 0939d037-2575-40b4-9c8d-61ed94265af4
blueprint: experiment-sdk
title: 'Experiment Python SDK'
source: 'https://www.docs.developers.amplitude.com/experiment/sdks/python-sdk/'
sdk_status: current
article_type: core
supported_languages:
  - python
landing: false
github_link: 'https://github.com/amplitude/experiment-python-server'
releases_url: 'https://github.com/amplitude/experiment-python-server/releases'
api_reference_url: 'https://amplitude.github.io/experiment-python-server'
shields_io_badge: 'https://img.shields.io/pypi/v/amplitude-experiment'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717526478
logo: icons/python.svg
---
Official documentation for Amplitude Experiment's server-side Python SDK implementation.

This documentation has separate sections for [remote](/experiment/remote-evaluation) and [local](/experiment/local-evaluation) evaluation.

## Remote evaluation

Implements fetching variants for a user via [remote evaluation](/experiment/remote-evaluation).

### Install

{{partial:admonition type="info" heading="Python version compatibility"}}
The Python Server SDK works with Python 3.6+.
{{/partial:admonition}}

Install the Python Server SDK with pip.

```bash
pip install amplitude-experiment
```

{{partial:admonition type="tip" heading="Quick start"}}
1. [Initialize the experiment client](#initialize)
2. [Fetch variants for the user](#fetch)
3. [Access a flag's variant](#fetch)

```python
from amplitude_experiment import Experiment, RemoteEvaluationConfig, RemoteEvaluationClient, User

# (1) Initialize the experiment client
experiment = Experiment.initialize_remote('<DEPLOYMENT_KEY>')

# (2) Fetch variants for a user
user = User(
    device_id="abcdefg",
    user_id="user@company.com",
    user_properties={
        'premium': True
    }
)
variants = experiment.fetch_v2(user)

# (3) Access a flag's variant
variant = variants['YOUR-FLAG-KEY']
if variant:
    if variant.value == 'on':
        # Flag is on
    else:
        # Flag is off
```
{{/partial:admonition}}

### Initialize

The SDK client should be initialized in your server on startup. The [deployment key](/experiment/data-model#deployments) argument passed into the `api_key` parameter must live within the same project that you are sending analytics events to.

```python
Experiment.initialize_remote(api_key, config = None) : RemoteEvaluationClient
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `api_key` | required | The [deployment key](/experiment/data-model#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

{{partial:admonition type="info" heading="Timeout and retry configuration"}}
Configure the timeout and retry options to best fit your performance requirements.
```python
experiment = Experiment.initialize_remote('<DEPLOYMENT_KEY>', Config())
```
{{/partial:admonition}}

#### Configuration

You can configure the SDK client on initialization.

| <div class="big-column">Name</div>  | Description | Default Value |
| --- | --- | --- |
| `debug` | Enable additional debug logging. | `false` |
| `server_url` | The host to fetch variants from. | `https://api.lab.amplitude.com` |
| `fetch_timeout_millis` | The timeout for fetching variants in milliseconds. This timeout only applies to the initial request, not subsequent retries | `10000` |
| `fetch_retries` | The number of retries to attempt if a request to fetch variants fails. | `0` |
| `fetch_retry_backoff_min_millis` | The minimum (initial) backoff after a request to fetch variants fails. This delay is scaled by the `fetchRetryBackoffScalar` | `500` |
| `fetch_retry_backoff_max_millis` | The maximum backoff between retries. If the scaled backoff becomes greater than the max, the max is used for all subsequent requests | `10000` |
| `fetch_retry_backoff_scalar` | Scales the minimum backoff exponentially. | `1.5` |
| `fetch_retry_timeout_millis` | The request timeout for retrying variant fetches. | `10000` |

!!!info "EU Data Center"
{{partial:admonition type="info" heading="EU data center"}}
If you're using Amplitude's EU data center, configure the `serverUrl` option on initialization to `https://api.lab.eu.amplitude.com`
{{/partial:admonition}}

### Fetch

Fetches variants for a [user](/experiment/data-model#users) and returns the results. This function [remote evaluates](/experiment/remote-evaluation) the user for flags associated with the deployment used to initialize the SDK client.

```python
fetch_v2(user: User) : Variants
```

| Parameter  | Requirement | Description |
| --- | --- | --- |
| `user` | required | The [user](/experiment/data-model#users) to remote fetch variants for. |

```python
user = User(
    device_id="abcdefg",
    user_id="user@company.com",
    user_properties={
        'premium': True
    }
)
variants = experiment.fetch_v2(user)
```

After fetching variants for a user, you may to access the variant for a specific flag.

```python
variant = variants['YOUR-FLAG-KEY']
if variant:
    if variant.value == 'on':
        # Flag is on
    else:
        # Flag is off
```

### Fetch async

The fetch method is synchronous. To fetch asynchronously, you can use `fetch_async` method

```python
fetch_async_v2(user: User, callback)
```

| Parameter  | Requirement | Description                                                                   |
|------------|-------------|-------------------------------------------------------------------------------|
| `user`     | required    | The [user](/experiment/data-model#users) to remote fetch variants for. |
| `callback` | optional    | The callback to handle the variants.                                          |

```python
def fetch_callback(user, variants):
  variant = variants['YOUR-FLAG-KEY']
  if variant:
    if variant.value == 'on':
      # Flag is on
    else:
      # Flag is off

experiment.fetch_async_v2(user, fetch_callback)
```

## Local evaluation

Implements evaluating variants for a user via [local evaluation](/experiment/local-evaluation). If you plan on using local evaluation, you should [understand the tradeoffs](/experiment/local-evaluation#targeting-capabilities).

!!!warning "Local Evaluation Mode"
{{partial:admonition type="warning" heading="Local evaluation mode"}}
The local evaluation client can only evaluation flags which are [set to local evaluation mode](/experiment/advanced-techniques/create-a-local-evaluation-flag).
{{/partial:admonition}}

### Install

Install the Python Server SDK's local evaluation.

!!!warning "OS, and architecture support"
{{partial:admonition type="warning" heading="Operating system and architecture support"}}
The local evaluation package currently only supports the following OS' and architectures (`OS/ARCH`):

**Supported**

* darwin/amd64
* darwin/arm64
* linux/amd64
* linux/arm64

**Alpine linux is not supported**.

If you need another OS/Arch supported, [submit an issue on github](https://github.com/amplitude/experiment-python-server/issues/new) or email [experiment@amplitude.com](mailto:experiment@amplitude.com).
{{/partial:admonition}}

Install the Python Server SDK with pip.

```bash
pip install amplitude-experiment
```


{{partial:admonition type="tip" heading="Quick start"}}
1. [Initialize the local evaluation client.](#initialize_1)
2. [Start the local evaluation client.](#start)
3. [Evaluate a user.](#evaluate)

```python
# (1) Initialize the local evaluation client with a server deployment key.
experiment = Experiment.initialize_local(api_key)

# (2) Start the local evaluation client.
experiment.start()

# (3) Evaluate a user.
user = User(
    device_id="abcdefg",
    user_id="user@company.com",
    user_properties={
        'premium': True
    }
)
variants = experiment.evaluate_v2(user)
```
{{/partial:admonition}}

### Initialize

Initializes a [local evaluation](/experiment/local-evaluation) client.

!!!warning "Server Deployment Key"
{{partial:admonition type="warning" heading="Server deployment key"}}
You must [initialize](#initialize_1) the local evaluation client with a server [deployment](/experiment/data-model#deployments) key in to get access to local evaluation flag configs.
{{/partial:admonition}}

```python
Experiment.initialize_local(api_key, config = None) : LocalEvaluationClient
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The server [deployment key](/experiment/data-model#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

!!!tip "Flag Polling Interval"
{{partial:admonition type="tip" heading="Flag polling interval"}}
Use the `flag_config_polling_interval_millis` [configuration](#configuration_1) to determine the time flag configs take to update once modified (default 30s).
{{/partial:admonition}}

#### Configuration

You can configure the SDK client on initialization.

**LocalEvaluationConfig**

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `debug` | Set to `true` to enable debug logging. | `false` |
| `server_url` | The host to fetch flag configurations from. | `https://api.lab.amplitude.com` |
| `flag_config_polling_interval_millis` | The interval to poll for updated flag configs after calling [`start()`](#start) | `30000` |
| `flag_config_poller_request_timeout_millis` | The timeout for the request made by the flag config poller | `10000` |
| `assignment_config` | Configuration for automatically tracking assignment events after an evaluation. | `None` |

**AssignmentConfig**

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `api_key` | The analytics API key and NOT the experiment deployment key | *required* |
| `cache_capacity` | The maximum number of assignments stored in the assignment cache | `65536` |
| [Analytics SDK Options](/sdks/analytics-sdks/python/python-sdk#configuration) | Options to configure the underlying Amplitude Analytics SDK used to track assignment events |  |

{{partial:admonition type="info" heading="EU data center"}}
If you're using Amplitude's EU data center, configure the `serverUrl` option on initialization to `https://api.lab.eu.amplitude.com`
{{/partial:admonition}}

### Start

Start the local evaluation client, pre-fetching local evaluation mode flag configs for [evaluation](#evaluate) and starting the flag config poller at the [configured](#configuration_1) interval.

```python
start()
```

You should await the result of `start()` to ensure that flag configs are ready to be used before calling [`evaluate_v2()`](#evaluate)

```python
experiment.start()
```

### Evaluate

Executes the [evaluation logic](/experiment/implementation) using the flags pre-fetched on [`start()`](#start). Evaluate must be given a user object argument and can optionally be passed an array of flag keys if only a specific subset of required flag variants are required.

!!!tip "Automatic Assignment Tracking"
{{partial:admonition type="tip" heading="Automatic assignment tracking"}}
Set [`assignment_config`](#configuration_1) to automatically track an assignment event to Amplitude when `evaluate_v2()` is called.
{{/partial:admonition}}

```python
evaluate_v2(self, user: User, flag_keys: List[str]) : Dict[str, Variant]
```

| Parameter   | Requirement | Description |
|-------------| --- | --- |
| `user`      | required | The [user](/experiment/data-model#users) to evaluate. |
| `flag_keys` | optional | Specific flags or experiments to evaluate. If nil, or empty, all flags and experiments are evaluated. |

```python
# The user to evaluate
user = User(user_id='test_user')

# Evaluate all flag variants
all_variants = experiment.evaluate_v2(user)

# Evaluate a specific subset of flag variants
specific_variants = experiment.evaluate_v2(user, ["<FLAG_KEY_1>", "<FLAG_KEY_2>"])

# Access a variant
variant = all_variants["<FLAG_KEY>"]
if variant.value == 'on':
    # Flag is on
else:
    # Flag is off
```

## Access Amplitude cookies

If you're using the Amplitude Analytics SDK on the client-side, the Python server SDK provides an `AmplitudeCookie` class with convenience functions for parsing and interacting with the Amplitude identity cookie. This is useful for ensuring that the Device ID on the server matches the Device ID set on the client, especially if the client hasn't yet generated a Device ID.

```python
import uuid
from amplitude_experiment import AmplitudeCookie

# grab amp device id if present
amp_cookie_name = AmplitudeCookie.cookie_name('amplitude-api-key')
device_id = nil
if request.cookies.get(amp_cookie_name):
  device_id = AmplitudeCookie.parse(request.cookies.get(amp_cookie_name)).device_id

if device_id is None:
  # deviceId doesn't exist, set the Amplitude Cookie
  device_id = str(uuid.uuid4())
  amp_cookie_value = AmplitudeCookie.generate(device_id)
  resp.set_cookie(amp_cookie_name, {
    "value": amp_cookie_value,
    "domain": ".your-domain.com",  # this should be the same domain used by the Amplitude JS SDK
    "httponly": False,
    "secure": False
  })
```