---
id: 599fcf45-81ec-43f9-a3a0-a253fd999a34
blueprint: experiment-api
title: 'Experiment Evaluation API'
source: 'https://www.docs.developers.amplitude.com/experiment/apis/evaluation-api/'
summary:  Lets you retrieve variant assignment data for users with remote evaluation.
---

The Experiment Evaluation APIs retrieve variant assignment data for users through [remote evaluation](/docs/feature-experiment/remote-evaluation) using the [evaluation API](#evaluation-api), or download local evaluation flags using the [flags API](#flags-api).

## Regions

| Region | URL |
| ------ | --- |
| Standard Server | `https://api.lab.amplitude.com/v1/` |
| EU Residency Server | `https://api.lab.eu.amplitude.com/v1/` |

## Authorization

The evaluation APIs authenticates the request using your [deployment](/docs/feature-experiment/data-model#deployments) key set in the Authorization header with the prefix `Api-Key`. For example, `Authorization: Api-Key <deployment_key>`

---

## Evaluation API

```text
GET /v1/vardata
```

The Evaluation API lets you retrieve variant assignment data for users. When you call this API, Amplitude tracks an `[Experiment] Assignment` event.

### Evaluation query parameters

| Name | Description |
| ---- | ----------- |
| `user_id` | The user's ID. |
| `device_id` | The user's device ID. |
| `flag_keys` | Specific flag keys to get the variants of. If you have more than one flag key, separate them with commas, for example, `flag_keys=flag-A,flag-B`. If empty/missing, Experiment evaluates all flags & experiments associated with the deployment key. |
| `context` | JSON string consisting of a full user context. Set user properties in the `user_properties` field (for example: `{"user_properties":{"premium":true}}`). For more information about user context, see the definition in the [Data Model](/docs/feature-experiment/data-model#full-user-definition). |

### Evaluation headers

| Name | Description |
| ---- | ----------- |
| `Authorization` | Set to `Api-Key <deployment_key>` for authentication. |
| `X-Amp-Exp-Track` | Set to `no-track` to not track an assignment event for the evaluation. |

### Evaluation response

The response body is a JSON object keyed by the flag key. The value for a given flag key is the variant assigned to the user. The variant contains its identification `key` (a.k.a value) and an optional payload containing a JSON element. For each flag, the variant object contains:

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `key` | `string` | Required | The assigned variant key for the flag/experiment. |
| `payload` | `any` | Optional | The variant's payload (if set). Can be any valid JSON value. |
| `expKey` | `string` | Optional | The expeirment key is used to differentiate between different runs of the same experiment. |
| `evaluationId` | `string` | Optional | The evaluation ID is used for debugging purposes. Can be ignored for now. |

{{partial:admonition type="warning" heading="Unexpected response fields."}}
The variant object for each flag may be updated to contain additional response fields. Your code must be able to handle these additional fields gracefully.
{{/partial:admonition}}

For example

```json
{
    "my-experiment": {
        "key": "treatment",
        "payload": { "price": 99.99, "discount": "25%" },
        "expKey": "exp-1",
        "evaluationId": "224681772811_1760563672659_3681"
    },
    // ...
}
```

{{partial:admonition type="note" heading="Empty results"}}
If a user isn't in the target audience, the Evaluation API may return an empty object.

```json
{}
```

{{/partial:admonition}}

#### Evaluation response status codes

| Status Code | Description |
| ----------- | ----------- |
| 200  | A successful request returns a `200` response and a map of flag key to variants. If `flag_keys` isn't provided, Experiment evaluates all flags associated with the deployment key in the authorization header. Use the [example](#evaluation-example) below to try the API from your browser or copy a curl. |
| 400 | If the request has invalid JSON in the context parameter, it returns a `400` status. |
| 401 | If the request doesn't include a valid API key, it returns a `401` response. |

### Evaluation example

Set the fields in the table, and press send to send the request in browser, or copy the curl to send the request yourself.

{{partial:experiment/interactive-evaluation-table}}

---

## Flags API

```text
GET /v1/flags
```

The Flags API allows you to download flag configurations for local evaluations. This is useful for bootstrapping client-side local evaluation SDKs with `initialFlags` or running evaluation using external flag configuration storage like edge environments.

The data model returned by this API is different from what you may experience in the [management API](/docs/apis/experiment/experiment-management-api) for flags and experiments. This format is specifically used for evaluation purposes, which is more verbose and less human readable than the management API.

### Flags query parameters

| Name | Description |
| ---- | ----------- |
| `flag_keys` | Specific flag keys to get the flag configurations for. If you have more than one flag key, separate them with commas, for example,  `flag_keys=flag-A,flag-B`. If empty/missing, the API returns all flags & experiments associated with the deployment key. |

### Flags headers

| Name | Description |
| ---- | ----------- |
| `Authorization` | Set to `Api-Key <deployment_key>` for authentication. |

### Flags response

The evaluation API returns a JSON array of objects where each object represents a flag or experiment. For example, here is a basic response with a single flag.

```json
[
  {
    "key": "example-flag",
    "metadata": {
      "deployed": true,
      "evaluationMode": "local",
      "flagType": "release",
      "flagVersion": 42
    },
    "segments": [
      {
        "metadata": {
          "segmentName": "All Other Users"
        },
        "variant": "off"
      }
    ],
    "variants": {
      "off": {
        "key": "off",
        "metadata": {
          "default": true
        }
      },
      "on": {
        "key": "on",
        "value": "on"
      }
    }
  }
]
```

#### Flags response status codes

| Status Code | Description |
| ----------- | ----------- |
| 200  | A successful request returns a `200` response with an array of flag configurations. |
| 401 | If the request doesn't include a valid API key, it returns a `401` response. |
