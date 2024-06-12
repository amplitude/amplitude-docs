---
id: f64a356a-2a9a-44e3-a482-f429a565a12c
blueprint: experiment-api
title: 'Experiment Management API'
source: 'https://www.docs.developers.amplitude.com/experiment/apis/management-api/'
summary: Use the Management API to programmatically create and control flags and experiments.
---
The Experiment management API can be used to programmatically create and control flags and experiments.

## Endpoints

| <div class="big-column">API</div> | Description |
| --- | --- |
|[Flag APIs](/docs/apis/experiment/experiment-management-api-flags)| Flag APIs to create, edit, and display flags, and their properties.  |
|[Experiment APIs](/docs/apis/experiment/experiment-management-api-experiments)| Experiment APIs to create, edit, and display experiments, and their properties.  |
|[Deployment APIs](/docs/apis/experiment/experiment-management-api-deployments)| Deployment APIs to create, edit, and display deployments that flags or experiments can be assigned to. |
|[Version APIs](/docs/apis/experiment/experiment-management-api-version-endpoints)| Version APIs to display a list of versions of flags or experiments that the management API key has access to. |


## Management API Key

You can create and revoke management API keys by clicking on "Management API" in the bottom left of the sidebar. Read more about the Management API Key in the [comprehensive guide to all Amplitude keys](/docs/apis/keys-and-tokens).

## Authorization

The management API uses the Http Authorization header for authentication.

The header must be: `Authorization: Bearer <management-api-key>`.

{{partial:admonition type="warning" heading="Management API keuys"}}
Management API keys are different from the deployment keys used to fetch flag variants. They're created and managed via the Management API link in the Experiment sidebar.
{{/partial:admonition}}

## Rate limiting

Current API limits are per project, and impose the following restrictions:

| Limit (requests) | Duration |
| --- | --- |
| 100 | 1 second |
| 100000 | Daily. Daily limits is reset at the end of the day UTC time. |

## Regions

| Region | Endpoint |
| --- | --- |
| Standard Server | `https://experiment.amplitude.com` |
| EU Residency Server | `https://experiment.eu.amplitude.com` |

## Conventions

### Status codes

The API uses meaningful status codes to communicate the result of requests.

| Code | Meaning |
| --- | --- |
| 200 | Success |
| 400 | Input is missing or invalid |
| 401 | Invalid or revoked API key |
| 403 | API key doesn't have access to the specified environment |
| 429 |Too many requests |

### Cursors

Endpoints that list resources such as `/experiments` will only return a limited number of items per request. To fetch the next page of items, the `nextCursor` value returned from the first request must be passed as the `cursor` parameter of the next request. In this way multiple requests can be chained together to fetch the total set of items.
