---
id: 81cb131b-7361-41c8-901d-c3d49e1f9dc3
blueprint: experiment-api
title: 'Experiment Management API Holdout Group Endpoints'
author: 8b3cc0f4-f0bb-4156-90b4-90317d4c2d8a
landing: false
parent: f64a356a-2a9a-44e3-a482-f429a565a12c
exclude_from_sitemap: false
updated_by: 8b3cc0f4-f0bb-4156-90b4-90317d4c2d8a
updated_at: 1736278665
---
| <div class="big-column">Name</div> | Description |
| --- | --- |
| [List](#list) | List of holdout groups including their configuration details. |
| [Edit](#edit) | Edit holdout group. |
| [Create](#create) | Create a new holdout. |


## List

```bash
GET https://experiment.amplitude.com/api/1/holdouts
```

Fetch a list of holdout groups including their configuration details.

### Query parameters

| Name| Description |
| --- | --- |
| `limit` | The max number of mutex groups to be returned. Capped at 1000. |
| `cursor` | The offset to start the "page" of results from. |

### Response

A successful request returns a `200 OK` response and a list of holdout groups encoded as JSON in the response body.

{{partial:tabs tabs="Request, Response"}}
{{partial:tab name="Request"}}
```bash
curl --request GET \
--url 'https://experiment.amplitude.com/api/1/holdout?limit=1000' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <management-api-key>'
```
{{/partial:tab}}
{{partial:tab name="Response"}}
```json
{
  	"holdouts": [
      	{
            "id": <holdoutId>,
            "projectId": <projectId>,
            "name": "Example Holdout",
            "key": "holdout-abcdefgh",
            "description": "Example holdout",
            "holdoutPercentage": 5,
            "evaluationMode": "remote",
            "bucketingKey": "amplitude_id",
            "bucketingSalt": "ABCDEFGH",
            "variantName": "on",
            "experiments": [123],
            "individualInclusion": ["x@amplitude.com"],
            "individualExclusion": ["y@amplitude.com"],
            "deleted": false,
            "createdBy": <createdBy>,
            "lastModifiedBy": <lastModifiedBy>,
            "createdAt": "2025-01-01T00:00:00.000Z",
            "lastModifiedAt": "2025-01-01T00:00:00.000Z"
        }
	],
    "nextCursor": <cursorId>
}
```
{{/partial:tab}}
{{/partial:tabs}}

## Get details

```bash
GET https://experiment.amplitude.com/api/1/holdouts/<id>
```

Fetch the configuration details of a holdout group.

### Path variables

| Name | Description |
|---|----|
|`id`| Required. String. Holdout group's ID.|

### Response

A successful request returns a `200 OK` response and a JSON object with the holdout group's details.

{{partial:tabs tabs="Request, Response"}}
{{partial:tab name="Request"}}
```bash
curl --request GET \
    --url 'https://experiment.amplitude.com/api/1/holdouts/<id>' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
```
{{/partial:tab}}
{{partial:tab name="Response"}}
```bash
{
    "id": <holdoutId>,
    "projectId": <projectId>,
    "name": "Example Holdout",
    "key": "holdout-abcdefgh",
    "description": "Example holdout",
    "holdoutPercentage": 5,
    "evaluationMode": "remote",
    "bucketingKey": "amplitude_id",
    "bucketingSalt": "ABCDEFGH",
    "variantName": "on",
    "experiments": [123],
    "individualInclusion": ["x@amplitude.com"],
    "individualExclusion": ["y@amplitude.com"],
    "deleted": false,
    "createdBy": <createdBy>,
    "lastModifiedBy": <lastModifiedBy>,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "lastModifiedAt": "2025-01-01T00:00:00.000Z"
}
```
{{/partial:tab}}
{{/partial:tabs}}

## Edit

```bash
PATCH https://experiment.amplitude.com/api/1/holdouts/{id}
```

Edit a holdout group.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Holdout group's ID.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
| `name` | Optional | string | The holdout group name. |
| `description` | Optional | string | The holdout group description. |
| `experiments` | Optional | number array | List of experiment ids to be included in this holdout group. Experiment evaluation mode must be compatible with holdout group's evaluation mode. |
| `individualInclusion` | Optional | string array | List of user ids or device ids to be included in this holdout group (never experience the experiments). |
| `individualExclusion` | Optional | string array | List of user ids or device ids to be excluded in this holdout group (may experience the experiments). |
|`archive`| Optional | boolean | Property to archive or unarchive holdout group. The holdout group will be set as deleted and removed from all child experiments’ parent dependencies. |

{{partial:admonition type="example" heading="Example request"}}
```json
{
    "name": "updated name",
    "description": "updated description",
  	"experiments": [123],
  	"individualInclusion": ["x@amplitude.com"]
}
```
{{/partial:admonition}}


### Response

A successful request returns a `200 OK` response.

{{partial:admonition type="example" heading="Request"}}
```curl
curl --request PATCH \
    --url 'https://experiment.amplitude.com/api/1/holdouts/<id>' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>' \
    --data '{"name": "updated name"}'
```
{{/partial:admonition}}

## Create

```bash
POST https://experiment.amplitude.com/api/1/holdouts
```

Create a new holdout group.

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
| `projectId` | Required | number | Project id of the holdout group. |
| `name` | Required | string | The holdout group name. |
| `key` | Optional | string | The holdout group key. Must be unique across all flags, experiments, holdout groups, and mutex groups. If not specified, one will be generated. |
| `description` | Optional | string | The holdout group description. |
| `holdoutPercentage` | Required | number | Holdout percentage. An integer number between 1 and 99 inclusively. |
| `evaluationMode` | Optional | string | Evaluation mode, options are `local` and `remote`. Defaulted to `remote` |
| `bucketingKey` | Optional | string | Bucketing key. Defaulted to "amplitude_id" |
| `experiments` | Optional | number array | List of experiment ids to be included in this holdout group. Experiment evaluation mode must be compatible with holdout group's evaluation mode. |
| `individualInclusion` | Optional | string array | List of user ids or device ids to be included in this holdout group (never experience the experiments). |
| `individualExclusion` | Optional | string array | List of user ids or device ids to be excluded in this holdout group (may experience the experiments). |

{{partial:admonition type="example" heading="Example request"}}
```json
{
    "projectId": <projectId>,
    "name": "Example Holdout",
  	"key": "example-holdout",
    "holdoutPercentage": 5,
    "evaluationMode": "local",
    "bucketingKey": "device_id",
    "experiments": [21197],
    "individualInclusion": ["x@amplitude.com"],
    "individualExclusion": ["y@amplitude.com"],
}
```
{{/partial:admonition}}

### Response

A successful request returns a `200 OK` response and a JSON object with the holdout group's id and url.

{{partial:tabs tabs="Request, Response"}}
{{partial:tab name="Request"}}
```bash
curl --request POST \
    --url 'https://experiment.amplitude.com/api/1/holdouts' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>' \
    --data '{"projectId":"<projectId>","name":"Example Holdout","holdoutPercentage":5}'
```
{{/partial:tab}}
{{partial:tab name="Response"}}
```json
{
    "id": "<id>",
    "url": "http://experiment.amplitude.com/amplitude/experiments/grouped-experiments"
}
```
{{/partial:tab}}
{{/partial:tabs}}