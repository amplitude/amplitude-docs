---
id: 223ccb37-444f-430f-8910-0c1d079aca89
blueprint: experiment-api
title: 'Experiment Management API Flag Endpoints'
source: 'https://www.docs.developers.amplitude.com/experiment/apis/management-api/flags/'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
landing: false
parent: f64a356a-2a9a-44e3-a482-f429a565a12c
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717531451
---
| <div class="big-column">Name</div> | Description |
| --- | --- |
| [List](#list) | List of flags including their configuration details. |
| [Get details](#get-details) | Get the configuration details of a flag. |
| [List versions](#list-versions) | List all versions for a flag. |
| [Get version details](#get-version-details) | Get a specific version for a flag. |
| [List variants](#list-variants) | List all variants for a flag. |
| [Get variant details](#get-variant-details) | Get a specific variant for a flag. |
| [Get variant inclusions](#get-variant-inclusions) | Get all inclusions (users) for a variant. |
| [Create variant](#create-variant) | Create a new variant for a flag. |
| [Edit variant](#edit-variant) | Edit a variant for a flag. |
| [Remove variant](#remove-variant) | Remove a variant from a flag. |
| [Add users to variant](#add-users-to-variant) | Add users to flag's variant. |
| [Remove users from variant](#remove-users-from-variant) | Remove users from flag's variant. |
| [Remove all users from variant](#remove-all-users-from-variant) | Remove all users from flag's variant. |
| [Bulk remove users from variant](#bulk-remove-users-from-variant) | Bulk remove users from experiment's variant. |
| [List deployments](#list-deployments) | List all deployments for a flag. |
| [Create deployment](#create-deployment) | Add a deployment for a flag. |
| [Remove deployment](#remove-deployment) | Remove a deployment from a flag. |
| [Edit](#edit) | Edit flag. |
| [Create](#create) | Create a new flag. |


## List

```bash
GET https://experiment.amplitude.com/api/1/flags
```

Fetch a list of flags including their configuration details. Results are ordered with the most recently created items first.

### Query parameters

| Name| Description |
| --- | --- |
| `limit` | The max number of flags to be returned. Capped at 1000. |
| `cursor` | The offset to start the "page" of results from. |

### Response

A successful request returns a `200 OK` response and a list of flags encoded as JSON in the response body.

{{partial:tabs tabs="Request, Response"}}
{{partial:tab name="Request"}}
```bash
curl --request GET \
--url 'https://experiment.amplitude.com/api/1/flags?limit=1000' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <management-api-key>'
```
{{/partial:tab}}
{{partial:tab name="Response"}}
```json
{
    "flags": [
        {
            "id": <id>,
            "projectId": <projectId>,
            "deployments": [<deploymentId>],
            "key": "flag-key",
            "name": "flag-name",
            "description": "description",
            "enabled": false,
            "evaluationMode": "remote",
            "bucketingKey": "amplitude_id",
            "bucketingSalt": <bucketingSalt>,
            "bucketingUnit": "User",
            "createdBy": "abc@amplitude.com",
            "lastModifiedBy": "abc@amplitude.com",
            "variants": [
                {
                    "key": "on"
                }
            ],
            "rolloutPercentage": 0,
            "rolloutWeights": {
                "on": 1
            },
            "targetSegments": [
                {
                    "name": "Segment 1",
                    "conditions": [
                        {
                            "prop": "city",
                            "op": "is",
                            "type": "property",
                            "values": []
                        }
                    ],
                    "percentage": 0,
                    "bucketingKey": "amplitude_id",
                    "rolloutWeights": {
                        "on": 1
                    }
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
GET https://experiment.amplitude.com/api/1/flags/<id>
```

Fetch the configuration details of a flag.

### Path variables

| Name | Description |
|---|----|
|`id`| Required. String. Flag's ID.|

### Response

A successful request returns a `200 OK` response and a JSON object with the flag's details.

{{partial:tabs tabs="Request, Response"}}
{{partial:tab name="Request"}}
```bash
curl --request GET \
    --url 'https://experiment.amplitude.com/api/1/flags/<id>' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
```
{{/partial:tab}}
{{partial:tab name="Response"}}
```json
{
    "id": <id>,
    "projectId": <projectId>,
    "deployments": [<deploymentId>],
    "key": "flag-key",
    "name": "flag-key",
    "description": "feature flag access",
    "enabled": true,
    "evaluationMode": "remote",
    "bucketingKey": "amplitude_id",
    "bucketingSalt": "mHdQDzeE",
    "bucketingUnit": "User",
    "variants": [
        {
            "key": "on"
        }
    ],
    "rolloutPercentage": 0,
    "rolloutWeights": {
        "on": 1
    },
    "targetSegments": [
        {
            "name": "Segment 1",
            "conditions": [
                {
                    "prop": "country",
                    "op": "is",
                    "type": "property",
                    "values": [
                        "United States"
                    ]
                }
            ],
            "percentage": 0,
            "bucketingKey": "amplitude_id",
            "rolloutWeights": {
                "on": 1
            }
        }
    ],
    "deleted": false
}
```
{{/partial:tab}}
{{/partial:tabs}}

## List versions

```bash
GET https://experiment.amplitude.com/api/1/flags/{id}/versions
```

Fetch a list of all versions for a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|

### Response

A successful request returns a `200 OK` response and a list of flag's versions encoded as an array of JSON objects in the response body. Versions are sorted in a descending order.

{{partial:tabs tabs="Request, Response"}}
{{partial:tab name="Request"}}
```bash
curl --request GET \
    --url 'https://experiment.amplitude.com/api/1/flags/<id>/versions' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
```
{{/partial:tab}}
{{partial:tab name="Response"}}
```json
[
    {
        "createdAt": "2023-07-29T03:32:49.594Z",
        "createdBy": <userId>,
        "version": 3,
        "flagConfig": {
            "id": <id>,
            "projectId": <projectId>,
            "deployments": [<deploymentId>],
            "key": "flag-key",
            "name": "flag-key",
            "description": "feature flag access",
            "enabled": true,
            "evaluationMode": "remote",
            "bucketingKey": "amplitude_id",
            "bucketingSalt": "mHdQDzeE",
            "bucketingUnit": "User",
            "variants": [
                {
                    "key": "on"
                }
            ],
            "rolloutPercentage": 0,
            "rolloutWeights": {
                "on": 1
            },
            "targetSegments": [ //[tl! collapse:start]
                {
                    "name": "Segment 1",
                    "conditions": [
                        {
                            "prop": "country",
                            "op": "is",
                            "type": "property",
                            "values": [
                                "United States"
                            ]
                        }
                    ],
                    "percentage": 0,
                    "bucketingKey": "amplitude_id",
                    "rolloutWeights": {
                        "on": 1
                    }
                }
            ]
        }
    },  //[tl! collapse:end]
    {
        "createdAt": "2023-07-29T03:32:39.494Z",
        "createdBy": <userId>, //[tl! collapse:start]
        "version": 2,
        "flagConfig": {
            "id": <id>,
            "projectId": <projectId>,
            "deployments": [<deploymentId>],
            "key": "flag-key",
            "name": "flag-key",
            "description": "feature flag access",
            "enabled": false,
            "evaluationMode": "remote",
            "bucketingKey": "amplitude_id",
            "bucketingSalt": "mHdQDzeE",
            "bucketingUnit": "User",
            "variants": [
                {
                    "key": "on"
                }
            ],
            "rolloutPercentage": 0,
            "rolloutWeights": {
                "on": 1
            },
            "targetSegments": [
                {
                    "name": "Segment 1",
                    "conditions": [
                        {
                            "prop": "country",
                            "op": "is",
                            "type": "property",
                            "values": [
                                "United States"
                            ]
                        }
                    ],
                    "percentage": 0,
                    "bucketingKey": "amplitude_id",
                    "rolloutWeights": {
                        "on": 1
                    }
                }
            ]
        }
    },
    {
        "createdAt": "2023-07-29T03:30:45.703Z",
        "createdBy": <userId>,
        "version": 1,
        "flagConfig": {
            "id": <id>,
            "projectId": <projectId>,
            "deployments": [],
            "key": "flag-key",
            "name": "flag-key",
            "description": "",
            "enabled": false,
            "evaluationMode": "remote",
            "bucketingKey": "amplitude_id",
            "bucketingSalt": "mHdQDzeE",
            "bucketingUnit": "User",
            "variants": [
                {
                    "key": "on"
                }
            ],
            "rolloutPercentage": 0,
            "rolloutWeights": {
                "on": 1
            },
            "targetSegments": []
        }
    }
] //[tl! collapse:end]
```
{{/partial:tab}}
{{/partial:tabs}}

## Get version details

```bash
GET https://experiment.amplitude.com/api/1/flags/{id}/versions/{versionId}
```

Fetch details of a specific version of a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|
|`versionId`| Required. String. The version's ID.|

### Response

A successful request returns a `200 OK` response and a JSON object with details of the version.

{{partial:tabs tabs="Request, Response"}}
{{partial:tab name="Request"}}
```bash
curl --request GET \
    --url 'https://experiment.amplitude.com/api/1/flags/<id>/versions/<versionId>' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
```
{{/partial:tab}}
{{partial:tab name="Response"}}
```json
{
    "createdAt": "2023-07-29T03:32:49.594Z",
    "createdBy": <userId>,
    "version": 3,
    "flagConfig": {
        "id": <id>,
        "projectId": <projectId>,
        "deployments": [<deploymentId>],
        "key": "flag-key",
        "name": "flag-key",
        "description": "feature flag access",
        "enabled": true,
        "evaluationMode": "remote",
        "bucketingKey": "amplitude_id",
        "bucketingSalt": "mHdQDzeE",
        "bucketingUnit": "User",
        "variants": [
            {
                "key": "on"
            }
        ],
        "rolloutPercentage": 0,
        "rolloutWeights": {
            "on": 1
        },
        "targetSegments": [
            {
                "name": "Segment 1",
                "conditions": [
                    {
                        "prop": "country",
                        "op": "is",
                        "type": "property",
                        "values": [
                            "United States"
                        ]
                    }
                ],
                "percentage": 0,
                "bucketingKey": "amplitude_id",
                "rolloutWeights": {
                    "on": 1
                }
            }
        ]
    }
}
```
{{/partial:tab}}
{{/partial:tabs}}

## List variants

```bash
GET https://experiment.amplitude.com/api/1/flags/{id}/variants
```

Fetch a list of all variants for a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|

### Response

A successful request returns a `200 OK` response and a list of variants encoded as an array of JSON objects in the response body.

{{partial:tabs tabs="Request, Response"}}
{{partial:tab name="Request"}}
```bash
curl --request GET \
    --url 'https://experiment.amplitude.com/api/1/flags/<id>/variants' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
```
{{/partial:tab}}
{{partial:tab name="Response"}}
```json
[
    {
        "key": "on",
        "name": "",
        "payload": {},
        "description": "",
        "rolloutWeight": 1
    }
]
```
{{/partial:tab}}
{{/partial:tabs}}

## Get variant details

```bash
GET https://experiment.amplitude.com/api/1/flags/{id}/variants/{variantKey}
```

Fetch details of a specific variant of a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response and a JSON object with details of a flag variant.

{{partial:tabs tabs="Request, Response"}}
{{partial:tab name="Request"}}
```bash
curl --request GET \
    --url 'https://experiment.amplitude.com/api/1/flags/<id>/variants/<variantKey>' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
```
{{/partial:tab}}
{{partial:tab name="Response"}}
```bash
{
    "key": "on",
    "name": "",
    "payload": {},
    "description": "",
    "rolloutWeight": 1
}
```
{{/partial:tab}}
{{/partial:tabs}}

## Get variant inclusions

```bash
GET https://experiment.amplitude.com/api/1/flags/{id}/variants/{variantKey}/users
```

Fetch a list of inclusions for a specific variant of a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response and a list of inclusions of flag's variant as an array of JSON objects.

{{partial:tabs tabs="Request, Response"}}
{{partial:tab name="Request"}}
```bash
curl --request GET \
    --url 'https://experiment.amplitude.com/api/1/flags/<id>/variants/<variantKey>/users' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
```
{{/partial:tab}}
{{partial:tab name="Response"}}
```bash
[
    <user>@<your-company-email>,
    <userId>
]
```

{{/partial:tab}}
{{/partial:tabs}}

## Create variant

```bash
POST https://experiment.amplitude.com/api/1/flags/{id}/variants
```

Create a new variant for a flag

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`key`| Required | string | The variant key. |
|`description`| Optional | string | Description for the variant.|
|`name`| Optional | string | Name for the variant.|
|`payload`| Optional | string | Optional payload. Value must be a valid JSON element.|
|`rolloutWeight`| Optional | number | Rollout weight for non-targeted users.|

{{partial:admonition type="example" heading="Example request"}}
```json
{
    "key": "new-variant-key",
    "description": "optional description for variant",
    "name": "optional name for variant",
    "payload": {"variant-payload": "example payload"},
    "rolloutWeight": 0
}
```
{{/partial:admonition}}

### Response

A successful request returns a `200 OK` response and `OK` text.

{{partial:admonition type="example" heading="Request"}}
```bash
curl --request POST \
    --url 'https://experiment.amplitude.com/api/1/flags/<id>/variants' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>' \
    --data '{"key":"<key>","name":"<name>","description":"<description>","payload":"<payload>","rolloutWeight":<rolloutWeight>}'
```
{{/partial:admonition}}

## Edit variant

```bash
POST https://experiment.amplitude.com/api/1/flags/<id>/variants/<variantKey>
```

Edit a variant for a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|
|`variantKey`| Required. String. The variant's key.|

{{partial:admonition type="example" heading="Example request"}}
```json
{
    "key": "updated-variant-key",
    "description": "updated optional description for variant",
    "name": "optional name for variant",
    "payload": {"variant-payload": "example payload"},
    "rolloutWeight": 0
}
```
{{/partial:admonition}}

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`key`| Optional | string | The variant key. |
|`description`| Optional | string | Description for the variant.|
|`name`| Optional | string | Name for the variant.|
|`payload`| Optional | string | Optional payload. Value must be a valid JSON element. This value replaces the existing value for the variant payload.|
|`rolloutWeight`| Optional | number | Rollout weight for non-targeted users.|

### Response

A successful request returns a `200 OK` response and `OK` text.

{{partial:admonition type="example" heading="Request"}}
```bash
curl --request PATCH \
    --url 'https://experiment.amplitude.com/api/1/flags/<id>/variants/<variantKey>' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>' \
    --data '{"key":"<key>","name":"<name>","description":"<description>","payload":"<payload>","rolloutWeight":<rolloutWeight>}'
```
{{/partial:admonition}}

## Remove variant

```bash
DELETE https://experiment.amplitude.com/api/1/flags/{id}/variants/{variantKey}
```

Remove a variant from a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response and `OK` text.

{{partial:admonition type="example" heading="Request"}}
```bash
curl --request DELETE \
    --url 'https://experiment.amplitude.com/api/1/flags/<id>/variants/<variantKey>' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
```
{{/partial:admonition}}

## Add users to variant

```bash
POST https://experiment.amplitude.com/api/1/flags/{id}/variants/{variantKey}/users
```

Add inclusions (users or devices) to flag's variant.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|
|`variantKey`| Required. String. The variant's key.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`inclusions`| Required | object | Contains an string array of user or device ids. |

{{partial:admonition type="example" heading="Example request"}}
```json
{
    "inclusions": ["<user1>@<your-company-email>, <user2>@<your-company-email>, <userId>"]
}
```
{{/partial:admonition}}

### Response

A successful request returns a `200 OK` response and `OK` text.

{{partial:admonition type="example" heading="Request"}}
```bash
curl --request POST \
    --url 'https://experiment.amplitude.com/api/1/flags/<id>/variants/<variantKey>/users' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>' \
    --data '{"inclusions":<["id1", "id2", "id3"]>}'
```
{{/partial:admonition}}

## Remove users from variant

```bash
DELETE https://experiment.amplitude.com/api/1/flags/{id}/variants/{variantKey}/users/{userIndex}
```

Remove inclusions (users or devices) from flag's variant.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|
|`variantKey`| Required. String. The variant's key.|
|`userIndex`| Required. String. The user's index. Zero-indexed. Index-based array of users can be obtained via [Get variant inclusions](#get-variant-inclusions)

### Response

A successful request returns a `200 OK` response and `OK` text.

{{partial:admonition type="example" heading="Request"}}
```bash
curl --request DELETE \
    --url 'https://experiment.amplitude.com/api/1/flags/<id>/variants/<variantKey>/users/<userIndex>' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
```
{{/partial:admonition}}

## Remove all users from variant

```bash
DELETE https://experiment.amplitude.com/api/1/flags/{id}/variants/{variantKey}/users
```

Remove all inclusions (users or devices) from flag's variant.

### Path variables

|<div class="big-column">Name</div>|Description|
|---|----|
|`id`| Required. String. Flag's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response and `OK` text.

{{partial:admonition type="example" heading="Request"}}
```bash
curl --request DELETE \
    --url 'https://experiment.amplitude.com/api/1/flags/<id>/variants/<variantKey>/users' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
```
{{/partial:admonition}}

## Bulk remove users from variant

```bash
DELETE https://experiment.amplitude.com/api/1/flags/{id}/variants/{variantKey}/bulk-delete-users
```

Bulk remove users or devices from flag's variant. Limited to 100 per request.

### Path variables

|<div class="big-column">Name</div>|Description|
|---|----|
|`id`| Required. String. Flag's ID.|
|`variantKey`| Required. String. The variant's key.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`users`| Required | object | Contains an string array of user or device ids. |

### Response

A successful request returns a `200 OK` response and `OK` text.

{{partial:admonition type="example" heading="Request"}}
```bash
curl --request DELETE \
    --url 'https://experiment.amplitude.com/api/1/flags/<id>/variants/<variantKey>/bulk-delete-users' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>' \
    --data '{"users":<["id1", "id2", "id3"]>}'
```
{{/partial:admonition}}

## List deployments

```bash
GET https://experiment.amplitude.com/api/1/flags/{id}/deployments
```

List all deployments for a flag.

### Path variables

|<div class="big-column">Name</div>|Description|
|---|----|
|`id`| Required. String. Flag's ID.|

### Response

A successful request returns a `200 OK` response and an array of JSON objects with flag's deployment details.

{{partial:tabs tabs="Request, Response"}}
{{partial:tab name="Request"}}
```bash
curl --request GET \
    --url 'https://experiment.amplitude.com/api/1/flags/<id>/deployments' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
```
{{/partial:tab}}
{{partial:tab name="Response"}}
```json
[
    {
        "id": <id>,
        "projectId": <projectId>,
        "label": "rest-api",
        "key": <key>,
        "deleted": false
    }
]
```
{{/partial:tab}}
{{/partial:tabs}}

## Create deployment

```bash
POST https://experiment.amplitude.com/api/1/flags/{id}/deployments
```

Add a deployment for a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The object's ID.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`deployments`| Required | object | Contains an string array of deployment ids. |

{{partial:admonition type="example" heading="Example request"}}
```json
{
    "deployments": [<deploymentId>]
}
```
{{/partial:admonition}}

???example "Example request (click to open)"


### Response

A successful request returns a `200 OK` response and `OK` text.

{{partial:admonition type="example" heading="Request"}}
```bash
curl --request POST \
    --url 'https://experiment.amplitude.com/api/1/flags/<id>/deployments' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
    --data '{"deployments":[<deploymentId>]}'
```
{{/partial:admonition}}

## Remove deployment

```bash
DELETE https://experiment.amplitude.com/api/1/flags/{id}/deployments/{deploymentId}
```

Remove a deployment from a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|
|`deploymentId`| Required. String. The deployment's ID.|

### Response

A successful request returns a `200 OK` response and `OK` text.

{{partial:admonition type="example" heading="Request"}}
```bash
curl --request DELETE \
    --url 'https://experiment.amplitude.com/api/1/flags/<id>/deployments/<deploymentId>' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
```
{{/partial:admonition}}

## Edit

```bash
PATCH https://experiment.amplitude.com/api/1/flags/{id}
```

Edit a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`name`| Optional | string | Name. |
|`description`| Optional | string | Description. |
|`bucketingKey`| Optional | string | The user property to bucket the user by. |
|`bucketingSalt`| Optional | string | Bucketing salt. |
|`bucketingUnit`| Optional | string | Bucketing unit represented by a group type from the accounts add-on. Used for group level bucketing and analysis. |
|`evaluationMode`| Optional | string | Evaluation mode for the flag, either `local` or `remote`. |
|`rolloutPercentage`| Optional | number | Rollout percentage for non-targeted users. Range 0 - 100. |
|`targetSegments`| Optional | object | See the [`targetSegments`](#targetsegments) table for more information. When `targetSegments` object is provided, it will replace existing target segments. Note: cohorts are not supported at the moment. |
|`enabled`| Optional | boolean | Property to activate or deactivate flag. |
|`archive`| Optional | boolean | Property to archive or unarchive flag. |
|`tags` | Optional | string array | A list of tags for the flag. Tags are added and deleted by the same operation. If you would like to add new tags to the existing ones, you should fetch a list of all flag tags first.

{{partial:admonition type="example" heading="Example request"}}
```json
{
    "name": "updated name",
    "description": "updated description",
    "bucketingKey": "amplitude_id",
    "bucketingSalt": "<bucketingSalt>",
    "bucketingUnit": "org id",
    "evaluationMode": "remote",
    "rolloutPercentage": 0,
    "enabled": false,
    "tags": ["prod", "staging"]
}
```
{{/partial:admonition}}

### Response

A successful request returns a `200 OK` response.

{{partial:admonition type="example" heading="response"}}
```bash
curl --request PATCH \
    --url 'https://experiment.amplitude.com/api/1/flags/<id>' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>' \
    --data '{"enabled":<enabled>,"rolloutPercentage":<rolloutPercentage>}'
```
{{/partial:admonition}}

## Create

```bash
POST https://experiment.amplitude.com/api/1/flags
```

Create a new flag.

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`projectId`| Required | string | The project's ID. |
|`key`| Required | string | The flag key. |
|`name`| Optional | string | The flag name. |
|`description`| Optional | string | Description for the flag.|
|`variants`| Optional | object array | Array of [`variants`](#variants). |
|`bucketingKey`| Optional | string | The user property to bucket the user by. |
|`rolloutWeights`| Optional | object | Rollout weights for non-targeted users. The object should be a mapping from variant key to rollout weight as an integer. For example: `{ "control": 1, "treatment": 1 }`. |
|`targetSegments`| Optional | object | See the [`targetSegments`](#targetsegments) table for more information. |
|`deployments`| Optional | string array | Array of deployments that the flag should be assigned to. |
|`evaluationMode`| Optional | string | Experiment evaluation mode; options include `remote` or `local`. |

#### `variants`

The `variants` field contains these objects.

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`key`| Required | string | The key (a.k.a value) of the variant. |
|`payload`| Optional | string | Optional payload. Value must be a valid JSON element. |
|`name`| Optional | string | The variant name. |
|`description`| Optional | string | The variant description. |

#### `targetSegments`

The `targetSegments` field contains these objects.

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`name`| Required | string | The segment name. |
|`conditions`| Required | object array | Array of [`conditions`](#conditions). |
|`percentage`| Required | number | The allocation percentage for users who match a condition. |
|`rolloutWeights`| Required | object | A map from variant key to rollout weight. For example: `{ "control": 1, "treatment": 1 }`. |

#### `conditions`

The `conditions` field contains these objects.

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`type`| Required | string | **Must have value: `property`** |
|`prop`| Required | string | The property to use in the condition. Prefix custom and free-form properties with `gp:` |
|`op`| Required | string | The [operation](#op) to use in this condition. |
|`values`| Required | string array | The values to use in the operation. |

#### `op`

A string value representing operations on a property value. Possible values are:

- `is`
- `is not`
- `contains`
- `does not contain`
- `less`
- `less or equal`
- `greater`
- `greater or equal`
- `set is`
- `set is not`
- `set contains`
- `set does not contain`
- `glob match`
- `glob does not match`


{{partial:admonition type="example" heading="Example request"}}
```json
{
    "projectId":"<projectId>",
    "name": "Analyze button clicks",
    "key": "analyze-button-clicks",
    "description": "analyze button clicks on the main page",
    "variants": [
        {
            "key": "on"
        }
    ],
    "rolloutWeights": {"on": 1},
    "targetSegments": [
        {
            "name": "Segment 1",
            "conditions": [
                {
                    "prop": "country",
                    "op": "is",
                    "type": "property",
                    "values": [
                        "United States"
                    ]
                }
            ],
            "percentage": 0,
            "bucketingKey": "amplitude_id",
            "rolloutWeights": {
                "on": 1
            }
        }
    ],
    "deployments": ["<deploymentId>"],
    "evaluationMode": "remote"
}
```
{{/partial:admonition}}

### Response

A successful request returns a `200 OK` response and a JSON object with the flag's id and url.

{{partial:tabs tabs="Request, Response"}}
{{partial:tab name="Request"}}
```bash
curl --request POST \
    --url 'https://experiment.amplitude.com/api/1/flags' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>' \
    --data '{"projectId":"<projectId>","key":"<key>"}'
```
{{/partial:tab}}
{{partial:tab name="Response"}}
```json
{
    "id": "<id>",
    "url": "http://experiment.amplitude.com/amplitude/<projectId>/config/<id>"
}
```
{{/partial:tab}}
{{/partial:tabs}}

