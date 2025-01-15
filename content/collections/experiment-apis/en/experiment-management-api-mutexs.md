---
id: 3705cc5b-d26c-4a8d-92a3-f3fcb4b8196d
blueprint: experiment-api
title: 'Experiment Management API Mutex Group Endpoints'
source: 'https://www.docs.developers.amplitude.com/experiment/apis/management-api/mutexs/'
author: 8b3cc0f4-f0bb-4156-90b4-90317d4c2d8a
landing: false
parent: f64a356a-2a9a-44e3-a482-f429a565a12c
exclude_from_sitemap: false
updated_by: 8b3cc0f4-f0bb-4156-90b4-90317d4c2d8a
updated_at: 1736278630
---
| <div class="big-column">Name</div> | Description |
| --- | --- |
| [List](#list) | List of mutex groups including their configuration details. |
| [Edit Mutex Group](#edit-mutex-group) | Edit mutex group. |
| [Edit Mutex Group Slots](#edit-mutex-group-slots) | Edit mutex group slots. |
| [Create](#create) | Create a new mutex. |


## List

```bash
GET https://experiment.amplitude.com/api/1/mutexes
```

Fetch a list of mutex groups including their configuration details.

### Query parameters

| Name| Description |
| --- | --- |
| `limit` | The max number of mutex groups to be returned. Capped at 1000. |
| `cursor` | The offset to start the "page" of results from. |

### Response

A successful request returns a `200 OK` response and a list of mutex groups encoded as JSON in the response body.

{{partial:tabs tabs="Request, Response"}}
{{partial:tab name="Request"}}
```bash
curl --request GET \
--url 'https://experiment.amplitude.com/api/1/mutexes?limit=1000' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <management-api-key>'
```
{{/partial:tab}}
{{partial:tab name="Response"}}
```json
{
    "mutexes": [
        {
            "id": <id>,
            "projectId": <projectId>,
            "name": "mutex name",
            "key": "mutex-key",
            "description": null,
            "evaluationMode": "local",
            "bucketingKey": "device_id",
            "bucketingSalt": <bucketingSalt>,
            "slots": [
                {
                    "name": "SLOT 1",
                    "index": 1,
                    "variantKey": "slot-1",
                    "percentage": 95,
                    "experiments": [
                        123
                    ],
                    "holdouts": [
                        456
                    ],
                    "individuals": [],
                    "cohorts": []
                },
                {
                    "name": "SLOT 2",
                    "index": 2,
                    "variantKey": "slot-2",
                    "percentage": 5,
                    "experiments": [],
                    "holdouts": [],
                    "individuals": [],
                    "cohorts": []
                }
            ]
        }
    ],
    "nextCursor": <cursorId>
}
```
{{/partial:tab}}
{{/partial:tabs}}

## Get details

```bash
GET https://experiment.amplitude.com/api/1/mutexes/<id>
```

Fetch the configuration details of a mutex group.

### Path variables

| Name | Description |
|---|----|
|`id`| Required. String. Mutex group's ID.|

### Response

A successful request returns a `200 OK` response and a JSON object with the mutex group's details.

{{partial:tabs tabs="Request, Response"}}
{{partial:tab name="Request"}}
```bash
curl --request GET \
    --url 'https://experiment.amplitude.com/api/1/mutexes/<id>' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
```
{{/partial:tab}}
{{partial:tab name="Response"}}
```bash
{
    "id": <id>,
    "projectId": <projectId>,
    "name": "mutex name",
    "key": "mutex-key",
    "description": null,
    "evaluationMode": "local",
    "bucketingKey": "device_id",
    "bucketingSalt": <bucketingSalt>,
    "slots": [
        {
            "name": "SLOT 1",
            "index": 1,
            "variantKey": "slot-1",
            "percentage": 95,
            "experiments": [
                123
            ],
            "holdouts": [
                456
            ],
            "individuals": [],
            "cohorts": []
        },
        {
            "name": "SLOT 2",
            "index": 2,
            "variantKey": "slot-2",
            "percentage": 5,
            "experiments": [],
            "holdouts": [],
            "individuals": [],
            "cohorts": []
        }
    ]
}
```
{{/partial:tab}}
{{/partial:tabs}}

## Edit Mutex Group

```bash
PATCH https://experiment.amplitude.com/api/1/mutexes/{id}
```

Edit a mutex group.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Mutex group's ID.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`name`| Optional | string | The mutex group name. |
|`description`| Optional | string | The mutex group description. |
|`archive`| Optional | boolean | Property to archive or unarchive mutex group. If true, all other arguments are ignored and the mutex group will be set as deleted and removed from all child experiments’ parent dependencies.  |

{{partial:admonition type="example" heading="Example request"}}
```json
{
    "name": "updated name",
    "description": "updated description"
}
```
{{/partial:admonition}}


### Response

A successful request returns a `200 OK` response.

{{partial:admonition type="example" heading="Request"}}
```curl
curl --request PATCH \
    --url 'https://experiment.amplitude.com/api/1/mutexes/<id>' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>' \
    --data '{"name": "updated name"}'
```
{{/partial:admonition}}

## Edit Mutex Group Slots

```bash
PATCH https://experiment.amplitude.com/api/1/mutexes/{id}/slots/{slotIndex}
```

Edit an mutex group slot.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Mutex group's ID.|
|`slotIndex`| Required. Number. Slot index of this mutex.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`experiments`| Optional | number array | List of experiment ids to be included. |
|`holdouts`| Optional | number array | List of holdout group ids to be included. |
|`individuals`| Optional | string array | List of user ids or device ids to be included. |

{{partial:admonition type="example" heading="Example request"}}
```json
{
    "experiments": [123, 456],
    "individuals": ["x@amplitude.com", "y@amplitude.com", "abcde-12345"]
}
```
{{/partial:admonition}}

### Response

A successful request returns a `200 OK` response.

{{partial:admonition type="example" heading="Request"}}
```curl
curl --request PATCH \
    --url 'https://experiment.amplitude.com/api/1/mutexes/<id>/slots/<slotIndex>' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>' \
    --data '{"experiments": [123, 456]}'
```
{{/partial:admonition}}

## Create

```bash
POST https://experiment.amplitude.com/api/1/mutexes
```

Create a new mutex group.

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
| `projectId` | Required | number | Project id of the mutex group. |
| `name` | Required | string | The mutex group name. |
| `key` | Optional | string | The mutex group key. Must be unique across all flags, experiments, holdout groups, and mutex groups. If not specified, one will be generated. |
| `description` | Optional | string | Description for the mutex group. |
| `evaluationMode` | Optional | string | Mutex group evaluation mode; options include `local` or `remote`. Defaulted to `remote`. |
| `bucketingKey` | Optional | string | The user property to bucket the user by. Defaulted to "amplitude_id" |
| `bucketingSalt` | Optional | string | Mutex Group bucketing salt. Defaulted to a randomized string. |
| `slots` | Required | object array | Array of [`slots`](#slots). Up to 20 slots. Order matters. |

#### slots

The `slots` field contains these objects.

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
| `percentage` | Required | number | The percentage of traffic to this slot. An integer between 1 and 100, inclusively. The sum of percentages in all slots must adds up to 100. |
| `experiments` | Optional | string array | List of experiment ids to be included. |
| `holdouts` | Optional | number array | List of holdout group id to be included. |
| `individuals` | Optional | number array | List of user ids or device ids to be included. |

{{partial:admonition type="example" heading="Example request"}}
```json
{
    "projectId":"<projectId>",
    "name": "Example Mutex Group",
    "key": "example-mutex",
    "description": "An example mutex group",
    "evaluationMode": "remote",
  	"slots": [
      	{
      		"percentage": 40,
          	"experiments": [123],
          	"holdouts": [456]
      	},
      	{
      		"percentage": 60,
          	"experiments": [789],
          	"individuals": ["x@amplitude.com"]
      	}
    ]
}
```
{{/partial:admonition}}

### Response

A successful request returns a `200 OK` response and a JSON object with the mutex group's id and url.

{{partial:tabs tabs="Request, Response"}}
{{partial:tab name="Request"}}
```bash
curl --request POST \
    --url 'https://experiment.amplitude.com/api/1/mutexes' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>' \
    --data '{"projectId":"<projectId>","slots":[{"percentage":40},{"percentage":60}]}'
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