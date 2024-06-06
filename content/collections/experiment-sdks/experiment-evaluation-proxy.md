---
id: 764109e2-cb86-4d19-af7d-fa0d9516f663
blueprint: experiment-sdk
title: 'Experiment Evaluation Proxy'
source: 'https://www.docs.developers.amplitude.com/experiment/infra/evaluation-proxy/'
sdk_status: current
article_type: core
supported_languages:
  - docker
landing: false
github_link: 'https://github.com/amplitude/evaluation-proxy'
releases_url: 'https://github.com/amplitude/evaluation-proxy/releases'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717526601
bundle_url: 'https://hub.docker.com/r/amplitudeinc/evaluation-proxy'
shields_io_badge: 'https://img.shields.io/docker/v/amplitudeinc/evaluation-proxy?color=blue&label=docker&logo=docker&logoColor=white'
logo: icons/docker.svg
---
{{partial:admonition type="beta" heading=""}}
The evaluation proxy is under active development. APIs are unstable and may change before general availability.
{{/partial:admonition}}

The Evaluation Proxy is a Service to enable, enhance, and optimize [local evaluation](/docs/docs/experiment/local-evaluation) running within your infrastructure.

![](statamic://asset::help_center_conversions::experiment/evaluation-proxy.drawio.png)

* **Enable local evaluation on unsupported platforms**: Use remote [Evaluation APIs](/docs/docs/experiment-apis/experiment-evaluation-api) and [SDKs](sdks/experiment-sdks) to run local evaluation in your infrastructure.

* **Automatically track assignment events for local evaluations**: Identical assignment events are deduplicated for 24 hours.

* **Enhance local evaluation with large cohort targeting**: Targeted cohorts are synced hourly to the Evaluation Proxy and added to the user prior to evaluation.

## Configuration

The evaluation proxy is either configured via a `yaml` file (recommended, more configuration options), or using environment variables.

The default location for the configuration yaml file is `/etc/evaluation-proxy-config.yaml`. You may also configure the file location using the `PROXY_CONFIG_FILE_PATH` environment variable.

* [`projects`](#projects) (required)
* [`configuration`](#configuration-1) (optional).

{{partial:admonition type="tip" heading="Recommended configuration"}}
Replace the fields in the configuration with values specific to your account/infrastructure.

```yaml
projects:
  - apiKey: "YOUR API KEY"
    secretKey: "YOUR SECRET KEY"
    managementKey: "YOUR MANAGEMENT API KEY"

configuration:
  redis:
    uri: "YOUR REDIS URI" # e.g. "redis://localhost:6379"
```
{{/partial:admonition}}

Environment configuration can only configure a single project. Environment variable configuration is only considered if the configuration file is not found.

| Environment Variable | Description |
| --- | --- |
| `AMPLITUDE_API_KEY` | The project's [API key](/docs/docs/apis/keys-and-tokens#api-key). |
| `AMPLITUDE_SECRET_KEY` | The project's [secret key](/docs/docs/apis/keys-and-tokens#secret-key). |
| `AMPLITUDE_EXPERIMENT_MANAGEMENT_API_KEY` | <span style="max-width:450px;display:inline-block">The [Experiment management API key](/docs/docs/apis/keys-and-tokens#management-api-key). Must be created for the same project as the configured API and secret key. Used to automatically access and update deployments used for the project.</span> |
| `AMPLITUDE_REDIS_URI` | Optional. The entire URI to connect to Redis. Include the protocol, host, port, and optional username, password, and path (for example `redis://localhost:6379`). |
| `AMPLITUDE_REDIS_PREFIX` | Optional. The prefix to connect  |
| `AMPLITUDE_SERVER_URL` | Optional. The server URL, including protocol and host, to fetch flags from. |
| `AMPLITUDE_COHORT_SERVER_URL` | Optional. The server URL, including protocol and host, to download cohorts from. |

| Field | Type | Description |
| --- | --- | --- |
| `projects` | array | Required. See [`projects`](#projects). |
| `configuration` | object | Optional. See [`configuration`](#configuration-1) |

### projects

A required array of objects with the following fields, all which are required.

| <div class="big-column">Field</div> | <div style="max-width:450px;display:inline-block">Description</div> |
| --- | --- |
| `id` | The project's ID. Found in the project settings. |
| `apiKey` | The project's [API key](/docs/docs/apis/keys-and-tokens#api-key). |
| `secretKey` | The project's [secret key](/docs/docs/apis/keys-and-tokens#secret-key). |
| `managementKey` | The [Experiment management API key](/docs/docs/apis/keys-and-tokens#management-api-key). Must be created for the same project as the configured API and secret key. Used to automatically access and update deployments used for the project. |

### configuration

An optional object of extra configuration.

| <div class="big-column">Field</div> | <div style="max-width:450px;display:inline-block">Description</div> |
| --- | --- |
| `redis` | Optional (Recommended). See [`redis`](#redis). Configure the proxy to use redis as persistent storage. |
| `flagSyncIntervalMillis` | Optional. The polling interval to update flag configurations (default `10000`). |
| `maxCohortSize` | Optional. The maximum size of targeted cohorts that the proxy can download (default `2147483647`). |
| `serverUrl` | Optional. The server URL, including protocol and host, to fetch flags from. (default `https://api.lab.amplitude.com`) |
| `cohortServerUrl` | Optional. The server URL, including protocol and host, to download cohorts from. (default `https://cohort.lab.amplitude.com`) |

!!!info "EU Data Residency"
{{partial:admonition type="info" heading="EU data residency"}}
To use the evaluation proxy with the EU data center, set the [`serverUrl`](#configuration-1) and [`cohortServerUrl`](#configuration-1) configurations to hit the EU data center endpoints:
```yaml
configuration:
  # Other configurations...
  serverUrl: "https://api.lab.eu.amplitude.com"
  cohortServerUrl: "https://cohort.lab.eu.amplitude.com"
```
{{/partial:admonition}}

#### redis

Configure the evaluation proxy to use Redis as a persistent storage. Highly recommended to enable the evaluation proxy to run efficiently.

| <div class="big-column">Field</div> | <div style="max-width:450px;display:inline-block">Description</div> |
| --- | --- |
| `uri` | Required. The full URI to connect to Redis with. Include the protocol, host, port, and optional username, password, and path. |
| `readOnlyUri` | Optional. Optional URI to connect to read only replicas for high scaling high volume reads to Redis read replicas. |
| `prefix` | Optional. A prefix for all keys saved by the evaluation proxy (default `amplitude`). |

## Deployment

The evaluation proxy is stateless, and should be deployed with multiple instances behind a load balancer for high availability and scalability.

For example, a kubernetes deployment with greater than one replica.

### Kubernetes

Use the evaluation proxy [Helm chart](https://github.com/amplitude/evaluation-proxy-helm) to install the proxy service on kubernetes or generate the files needed to deploy the service manually. The repository also contains an [example of running the evaluation proxy on kubernetes](https://github.com/amplitude/evaluation-proxy-helm/tree/main/example) locally using `minikube`.

#### Helm

##### Add helm repo

```bash
helm repo add \
    evaluation-proxy-helm https://amplitude.github.io/evaluation-proxy-helm
```

##### Configure `values.yaml`

Configure the chart values. The recommended approach to configuring and installing the helm chart is using a values.yaml configuration file.

The chart's `evaluationProxy` value contents exactly match the evaluation proxy's configuration file fields.

```yaml
evaluationProxy:
  # At least one project is required.
  projects:
    - apiKey: "YOUR API KEY"
      secretKey: "YOUR SECRET KEY"
      managementKey: "YOUR MANAGEMENT API KEY"
  configuration: {}
#    redis:
#      uri: "redis://redis-master.default.svc.cluster.local:6379"
```

##### Install helm chart

```bash
helm install -f values.yaml \
    evaluation-proxy evaluation-proxy-helm/evaluation-proxy
```

### Docker

You may run [the docker image](https://hub.docker.com/r/amplitudeinc/evaluation-proxy) directly. First, create a [configuration](#configuration) file, then run the docker image mounting the file as a volume to the expected directory in the container.

```bash
docker run \
    -v CONFIG_FILE_PATH:/etc/evaluation-proxy-config.yaml \
    amplitudeinc/evaluation-proxy
```

!!!tip "Docker compose example"
{{partial:admonition type="tip" heading="Docker compose example"}}
The [evaluation-proxy GitHub repository](https://github.com/amplitude/evaluation-proxy) also contains an example using `docker compose` to run the proxy alongside a local Redis image.
{{/partial:admonition}}

## Evaluation

The Evaluation Proxy exposes remote [Evaluation API](/docs/docs/experiment-apis/experiment-evaluation-api) and [SDK](/docs/docs/sdks/experiment-sdks) endpoints to run local evaluation within your cluster. This is useful to enable platforms and languages which aren't supported by local evaluation SDKs. As an added benefit, fetch requests made to the evaluation proxy can target cohorts of users, and have assignment events tracked automatically to Amplitude.

**You must send requests to the service using `http` on port `3546`.**

{{partial:admonition type="example" heading="Kubernetes"}}
A Kubernetes deployed Evaluation Proxy service (named `evaluation-proxy`) running within a kubernetes namespace `main` is from within the cluster at: `http://evaluation-proxy.main.svc.cluster.local:3546`
{{/partial:admonition}}