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

This documentation has separate sections for [remote](/docs/feature-experiment/remote-evaluation) and [local](/docs/feature-experiment/local-evaluation) evaluation.

## Remote evaluation

Implements fetching variants for a user using [remote evaluation](/docs/feature-experiment/remote-evaluation).

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

The SDK client should be initialized in your server on startup. The [deployment key](/docs/feature-experiment/data-model#deployments) argument passed into the `api_key` parameter must live within the same project that you are sending analytics events to.

```python
Experiment.initialize_remote(api_key, config = None) : RemoteEvaluationClient
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `api_key` | required | The [deployment key](/docs/feature-experiment/data-model#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

{{partial:admonition type="info" heading="Timeout and retry configuration"}}
Configure the timeout and retry options to best fit your performance requirements.
```python
experiment = Experiment.initialize_remote('<DEPLOYMENT_KEY>', Config())
```
{{/partial:admonition}}

#### Configuration

You can configure the SDK client on initialization.

{{partial:admonition type="info" heading="EU data center"}}
If you're using Amplitude's EU data center, configure the `server_zone` option on initialization.
{{/partial:admonition}}

| <div class="big-column">Name</div>  | Description | Default Value |
| --- | --- | --- |
| `debug` | When `True`, sets the logger level to `DEBUG`. | `False` |
| `logger` | Custom `logging.Logger` instance for SDK logging. | Default Logger with `WARNING` level |
| `server_zone` | The Amplitude data center to use. Either `ServerZone.US` or `ServerZone.EU` | `ServerZone.US` |
| `server_url` | The host to fetch variants from. | `https://api.lab.amplitude.com` |
| `fetch_timeout_millis` | The timeout for fetching variants in milliseconds. This timeout only applies to the initial request, not subsequent retries | `10000` |
| `fetch_retries` | The number of retries to attempt if a request to fetch variants fails. | `0` |
| `fetch_retry_backoff_min_millis` | The minimum (initial) backoff after a request to fetch variants fails. This delay is scaled by the `fetchRetryBackoffScalar` | `500` |
| `fetch_retry_backoff_max_millis` | The maximum backoff between retries. If the scaled backoff becomes greater than the max, the max is used for all subsequent requests | `10000` |
| `fetch_retry_backoff_scalar` | Scales the minimum backoff exponentially. | `1.5` |
| `fetch_retry_timeout_millis` | The request timeout for retrying variant fetches. | `10000` |

### Fetch

Fetches variants for a [user](/docs/feature-experiment/data-model#users) and returns the results. This function [remote evaluates](/docs/feature-experiment/remote-evaluation) the user for flags associated with the deployment used to initialize the SDK client.

```python
fetch_v2(user: User, fetch_options: FetchOptions = None) : Variants
```

| Parameter  | Requirement | Description |
| --- | --- | --- |
| `user` | required | The [user](/docs/feature-experiment/data-model#users) for whom variants should be fetched. |
| `fetch_options` | optional | The [options](#fetch-options) for the fetch request. |

**FetchOptions**

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `tracks_exposure` | To track or not track an exposure event for this fetch request. If `None`, uses the server's default behavior (does not track exposure). | `None` |
| `tracks_assignment` | To track or not track an assignment event for this fetch request. If `None`, uses the server's default behavior (does track assignment). | `None` |

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
| `user`     | required    | The [user](/docs/feature-experiment/data-model#users) for whom variants should be fetched. |
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

{{partial:collapse name="Account-level bucketing and analysis (v1.3.0+)"}}
If your organization has purchased the [Accounts add-on](/docs/analytics/account-level-reporting) you may perform bucketing and analysis on groups rather than users. Reach out to your representative to gain access to this beta feature.

Groups must either be included in the user sent with the fetch request (recommended), or identified with the user using a group identify call from the [Group Identify API](/docs/apis/analytics/group-identify) or using [`setGroup()` from an analytics SDK](/docs/sdks/analytics/browser/browser-sdk-2#user-groups).

```python
user = User(
    device_id="abcdefg",
    user_id="user@company.com",
    user_properties={
        'premium': True
    },
    groups={"org name": ["Amplitude"]}
)
variants = experiment.fetch_v2(user)
```

To pass freeform group properties, see this example:

```python
user = User(
    device_id="abcdefg",
    user_id="user@company.com",
    user_properties={
        'premium': True
    },
    group_properties={"org name": ["Amplitude"]}
)
variants = experiment.fetch_v2(user)
```

{{/partial:collapse}}

## Local evaluation

Implements evaluating variants for a user using [local evaluation](/docs/feature-experiment/local-evaluation). If you plan on using local evaluation, you should [understand the tradeoffs](/docs/feature-experiment/local-evaluation#targeting-capabilities).

### Install

Install the Python Server SDK's local evaluation.

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
1. [Initialize the local evaluation client.](#initialize)
2. [Start the local evaluation client.](#start)
3. [Evaluate a user.](#evaluate)

```python
# (1) Initialize the local evaluation client with a server deployment key.
experiment = Experiment.initialize_local("DEPLOYMENT_KEY", LocalEvaluationConfig(
  # (Recommended) Enable local evaluation cohort targeting.
  cohort_sync_config=CohortSyncConfig(api_key="API_KEY", secret_key="SECRET_KEY")
))

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

Initializes a [local evaluation](/docs/feature-experiment/local-evaluation) client.

{{partial:admonition type="warning" heading="Server deployment key"}}
You must [initialize](#initialize-1) the local evaluation client with a server [deployment](/docs/feature-experiment/data-model#deployments) key in to get access to local evaluation flag configs.
{{/partial:admonition}}

```python
Experiment.initialize_local(api_key, config = None) : LocalEvaluationClient
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The server [deployment key](/docs/feature-experiment/data-model#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

{{partial:admonition type="tip" heading="Flag polling interval"}}
Use the `flag_config_polling_interval_millis` [configuration](#configuration) to determine the time flag configs take to update once modified (default 30s).
{{/partial:admonition}}

#### Configuration

You can configure the SDK client on initialization.

{{partial:admonition type="info" heading="EU data center"}}
If you're using Amplitude's EU data center, configure the `server_zone` option on initialization.
{{/partial:admonition}}

**LocalEvaluationConfig**

| <div class="big-column">Name</div> | Description                                                                                                             | Default Value                   |
| --- |-------------------------------------------------------------------------------------------------------------------------|---------------------------------|
| `debug` | When `True`, sets the logger level to `DEBUG`.                                                                          | `False`                         |
| `logger` | Custom `logging.Logger` instance for SDK logging. | Default Logger with `WARNING` level |
| `server_zone` | The Amplitude data center to use. Either `ServerZone.US` or `ServerZone.EU`                                             | `ServerZone.US`                 |
| `server_url` | The host to fetch flag configurations from.                                                                             | `https://api.lab.amplitude.com` |
| `flag_config_polling_interval_millis` | The interval to poll for updated flag configs after calling [`start()`](#start)                                         | `30000`                         |
| `flag_config_poller_request_timeout_millis` | The timeout for the request made by the flag config poller                                                              | `10000`                         |
| `assignment_config` | **Deprecated.** Use `exposure_config` instead. Configuration for automatically tracking assignment events after an evaluation.                                         | `None`                          |
| `exposure_config` | Configuration for tracking exposure events after an evaluation.                                         | `None`                          |
| `cohort_sync_config` | Configuration to enable cohort downloading for [local evaluation cohort targeting](#local-evaluation-cohort-targeting). | `None`                          |

**AssignmentConfig**

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `api_key` | The analytics API key and NOT the experiment deployment key | *required* |
| `cache_capacity` | The maximum number of assignments stored in the assignment cache | `65536` |
| `send_evaluated_props`| Set to `True` to send properties of the evaluated user in assignment events | `False` |
| [Analytics SDK Options](/docs/sdks/analytics-sdks/python/python-sdk#configuration) | Options to configure the underlying Amplitude Analytics SDK used to track assignment events |  |

**ExposureConfig**

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `api_key` | The analytics API key and NOT the experiment deployment key | *required* |
| `cache_capacity` | The maximum number of exposures stored in the exposure cache | `65536` |
| [Analytics SDK Options](/docs/sdks/analytics-sdks/python/python-sdk#configuration) | Options to configure the underlying Amplitude Analytics SDK used to track exposure events |  |

**CohortSyncConfig**

| <div class="big-column">Name</div> | Description                                                                                                                                                                                | Default Value |
|------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| --- |
| `api_key`                          | The analytics API key and NOT the experiment deployment key                                                                                                                                | *required* |
| `secret_key`                       | The analytics secret key                                                                                                                                                                   | *required* |
| `max_cohort_size`                  | The maximum size of cohort that the SDK will download. Cohorts larger than this size will not be downloaded.                                                                               | `2147483647` |
| `cohort_polling_interval_millis`   | The interval, in milliseconds, to poll Amplitude for cohort updates (60000 minimum).                                                                                                       | `60000` |
| `cohort_server_url`                | The cohort server endpoint from which to fetch cohort data. For hitting the EU data center, set `server_zone` to `ServerZone.EU`. Setting this value will override `server_zone` defaults. | `https://cohort-v2.lab.amplitude.com` |

### Start

Start the local evaluation client, pre-fetching local evaluation mode flag configs for [evaluation](#evaluate) and starting the flag config poller at the [configured](#configuration) interval.

```python
start()
```

You should await the result of `start()` to ensure that flag configs are ready to be used before calling [`evaluate_v2()`](#evaluate)

```python
experiment.start()
```

### Evaluate

Executes the [evaluation logic](/docs/feature-experiment/implementation) using the flags pre-fetched on [`start()`](#start). Evaluate must be given a user object argument and can optionally be passed an array of flag keys if only a specific subset of required flag variants are required.

{{partial:admonition type="tip" heading="Automatic assignment tracking"}}
Set [`assignment_config`](#configuration) to automatically track an assignment event to Amplitude when `evaluate_v2()` is called.
{{/partial:admonition}}

{{partial:admonition type="tip" heading="Exposure tracking"}}
Set [`exposure_config`](#configuration) to enable exposure tracking. Then, set `tracks_exposure` to `True` in `EvaluateOptions` when calling `evaluate_v2()`.
{{/partial:admonition}}

```python
evaluate_v2(self, user: User, flag_keys: List[str], options: EvaluateOptions) : Dict[str, Variant]
```

| Parameter   | Requirement | Description |
|-------------| --- | --- |
| `user`      | required | The [user](/docs/feature-experiment/data-model#users) to evaluate. |
| `flag_keys` | optional | Specific flags or experiments to evaluate. If nil, or empty, all flags and experiments are evaluated. |
| `options`   | optional | The [options](#evaluate-options) for the evaluation request. |

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

**EvaluateOptions**

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `tracks_exposure` | If `True`, the SDK tracks an exposure event for the evaluated variants. | `False` |

### Local evaluation cohort targeting

Since version `1.4.0`, the local evaluation SDK client supports downloading cohorts for local evaluation targeting. You must configure the `cohort_sync_config` option with the analytics `api_key` and `secret_key` on initialization to enable this support.

```python
experiment = Experiment.initialize_local("DEPLOYMENT_KEY", LocalEvaluationConfig(
  # (Recommended) Enable local evaluation cohort targeting.
  cohort_sync_config=CohortSyncConfig(api_key="API_KEY", secret_key="SECRET_KEY")
))
```

## Custom logging

Pass a custom `logging.Logger` instance to control logging behavior.

### Custom logger

Pass a custom `logging.Logger` instance to `RemoteEvaluationConfig` or `LocalEvaluationConfig`:

```python
import logging
from amplitude_experiment import Experiment, RemoteEvaluationConfig, LocalEvaluationConfig

# Create a custom logger
custom_logger = logging.getLogger('MyAppLogger')
custom_logger.setLevel(logging.WARN)
handler = logging.FileHandler('experiment.log')
handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
custom_logger.addHandler(handler)

# Remote evaluation with custom logger
remote_config = RemoteEvaluationConfig(
    logger=custom_logger
)
experiment = Experiment.initialize_remote('DEPLOYMENT_KEY', remote_config)

# Local evaluation with custom logger
local_config = LocalEvaluationConfig(
    logger=custom_logger
)
experiment = Experiment.initialize_local('DEPLOYMENT_KEY', local_config)
```

### Debug flag with default logger

Without a custom logger, the `debug` flag controls the default logger's level:

```python
# Without custom logger, debug=False uses WARNING level
config = RemoteEvaluationConfig(
    debug=False
)
# Default logger level is WARNING

# Without custom logger, debug=True uses DEBUG level
config = RemoteEvaluationConfig(
    debug=True
)
# Default logger level is DEBUG
```

With a custom logger, the `debug` flag is ignored and your logger maintains its configured level:

```python
import logging
from amplitude_experiment import Experiment, RemoteEvaluationConfig

custom_logger = logging.getLogger('MyAppLogger')
custom_logger.setLevel(logging.WARN)

# Custom logger maintains its WARN level regardless of debug flag
config = RemoteEvaluationConfig(
    logger=custom_logger,
    debug=True
)
# Logger level stays WARN (debug flag is ignored)
```

## Access Amplitude cookies

If you're using the Amplitude Analytics SDK on the client-side, the Python server SDK provides an `AmplitudeCookie` class with convenience functions for parsing and interacting with the Amplitude identity cookie. This is useful for ensuring that the Device ID on the server matches the Device ID set on the client, especially if the client hasn't yet generated a Device ID.

```python
import uuid
from amplitude_experiment import AmplitudeCookie

# Get the cookie name for the Amplitude API key
# For Browser SDK 2.0 cookies, use new_format=True:
# amp_cookie_name = AmplitudeCookie.cookie_name('amplitude-api-key', new_format=True)
amp_cookie_name = AmplitudeCookie.cookie_name('amplitude-api-key')
device_id = None

# Try to get device ID from existing cookie
if request.cookies.get(amp_cookie_name):
  device_id = AmplitudeCookie.parse(request.cookies.get(amp_cookie_name)).device_id
  # For Browser SDK 2.0: AmplitudeCookie.parse(request.cookies.get(amp_cookie_name), new_format=True).device_id

# If no device ID found, generate a new one and set the cookie
if device_id is None:
  device_id = str(uuid.uuid4())
  amp_cookie_value = AmplitudeCookie.generate(device_id)
  # For Browser SDK 2.0: AmplitudeCookie.generate(device_id, new_format=True)
  response.set_cookie(amp_cookie_name, amp_cookie_value, 
    domain='.your-domain.com',  # this should be the same domain used by the Amplitude JS SDK
    httponly=False,
    secure=False
  )
```


