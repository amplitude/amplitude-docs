---
id: 599fcf45-81ec-43f9-a3a0-a253fd999a34
blueprint: experiment-api
title: 'Experiment Evaluation API'
source: 'https://www.docs.developers.amplitude.com/experiment/apis/evaluation-api/'
summary:  Lets you retrieve variant assignment data for users with remote evaluation.
---
The Amplitude Experiment Evaluation REST API lets you retrieve variant assignment data for users via [remote evaluation](/experiment/remote-evaluation). User information passes as query parameters on the request to allow for [caching the response on the CDN](/experiment/under-the-hood/performance-and-caching#cdn-caching). When you call this API, Amplitude tracks an `[Experiment] Assignment` event.

## Regions

| Region              | URL                                                                   |
| ------------------- | -------------------------------------------------------------------------- |
| Standard Server     | `https://api.lab.amplitude.com/v1/`       |
| EU Residency Server | `https://api.lab.eu.amplitude.com/v1/` |

## Authorization

The REST API authenticates the request using your [deployment](/experiment/data-model#deployments) key set in the Authorization header with the prefix `Api-Key`. For example, `Authorization: Api-Key <deployment_key>`

## Query parameters

| <div class="big-column">Name</div> | Description                                                                                                                                              |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user_id`                          | The user's ID.                                                                                                                                           |
| `device_id`                        | The user's device ID.                                                                                                                                    |
| `flag_key`                         | A specific flag key to get the variant of. If empty/missing, Experiment evaluates all flags & experiments associated with the deployment key.                   |
| `context`                          | JSON string consisting of a full user context. Set user properties in the `user_properties` field (for example: `{"user_properties":{"premium":true}}`). |

## Responses

### 200 OK

A successful request returns a `200` response and a map of flag key to variants. If `flag_key` isn't provided, Experiment evaluates all flags associated with the deployment key in the authorization header.

#### Response body

The response body is a JSON object keyed by the flag key. The value for a given flag key is the variant assigned to the user. The variant contains its identification `key` (a.k.a value) and an optional payload containing a JSON element.

```json
{
    "<flag_key>": {
        "key": "<variant_value>",
        "payload": <variant_payload>
    },
    // ...
}
```

Use the [example](#example) below to try the API from your browser or copy a curl.

### 400 Bad Request

If the request has invalid JSON in the context parameter, it returns a `400` status.

### 401 Unauthorized

If the request doesn't include a valid API key, it returns a `401` response.

## Example

Set the fields in the table, and press send to send the request in browser, or copy the curl to send the request yourself.


{{partial:experiment/interactive-evaluation-table}}

