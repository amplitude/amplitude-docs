---
id: 599fcf45-81ec-43f9-a3a0-a253fd999a34
blueprint: experiment-api
title: 'Experiment Evaluation API'
source: 'https://www.docs.developers.amplitude.com/experiment/apis/evaluation-api/'
summary:  Lets you retrieve variant assignment data for users with remote evaluation.
---
The Amplitude Experiment Evaluation REST API lets you retrieve variant assignment data for users via [remote evaluation](/docs/feature-experiment/remote-evaluation). User information passes as query parameters on the request to allow for [caching the response on the CDN](/docs/feature-experiment/under-the-hood/performance-and-caching#cdn-caching). When you call this API, Amplitude tracks an `[Experiment] Assignment` event.

## Regions

| Region              | URL                                                                   |
| ------------------- | -------------------------------------------------------------------------- |
| Standard Server     | `https://api.lab.amplitude.com/v1/`       |
| EU Residency Server | `https://api.lab.eu.amplitude.com/v1/` |

## Authorization

The REST API authenticates the request using your [deployment](/docs/feature-experiment/data-model#deployments) key set in the Authorization header with the prefix `Api-Key`. For example, `Authorization: Api-Key <deployment_key>`

## Query parameters

| <div class="big-column">Name</div> | Description                                                                                                                                                                                                                      |
|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `user_id`                          | The user's ID.                                                                                                                                                                                                                   |
| `device_id`                        | The user's device ID.                                                                                                                                                                                                            |
| `flag_keys`                        | Specific flag keys to get the variants of. Multiple flag keys should be separated by commas, e.g. `flag_keys=flag-A,flag-B`.  If empty/missing, Experiment evaluates all flags & experiments associated with the deployment key. |
| `context`                          | JSON string consisting of a full user context. Set user properties in the `user_properties` field (for example: `{"user_properties":{"premium":true}}`). For more information about user context, see the definition in the [Data Model](/docs/feature-experiment/data-model#full-user-definition).                                                                         |

## Headers

| <div class="big-column">Name</div> | Description                                                            |
|------------------------------|------------------------------------------------------------------------|
| `X-Amp-Exp-Track`                           | Set to `no-track` to not track an assignment event for the evaluation. |


## Responses

### 200 OK

A successful request returns a `200` response and a map of flag key to variants. If `flag_keys` isn't provided, Experiment evaluates all flags associated with the deployment key in the authorization header.

#### Response body

The response body is a JSON object keyed by the flag key. The value for a given flag key is the variant assigned to the user. The variant contains its identification `key` (a.k.a value) and an optional payload containing a JSON element.

```json
{
    "<flag_keys>": {
        "key": "<variant_value>",
        "payload": <variant_payload>
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

Use the [example](#example) below to try the API from your browser or copy a curl.

### 400 Bad Request

If the request has invalid JSON in the context parameter, it returns a `400` status.

### 401 Unauthorized

If the request doesn't include a valid API key, it returns a `401` response.

## Example

Set the fields in the table, and press send to send the request in browser, or copy the curl to send the request yourself.


{{partial:experiment/interactive-evaluation-table}}

