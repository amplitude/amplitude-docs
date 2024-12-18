---
id: e082b577-8058-494d-8567-d4ad3ccca149
blueprint: experiment-api
title: 'Experiment Management API Deployment Endpoints'
source: 'https://www.docs.developers.amplitude.com/experiment/apis/management-api/deployments/'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
landing: false
parent: f64a356a-2a9a-44e3-a482-f429a565a12c
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717531446
---
| <div class="big-column">Name</div> | Description |
| --- | --- |
| [List deployments](#list-deployments) | List deployments that experiments or flags can be assigned to. |
| [Create deployment](#create-deployment) | Create a deployment. |
| [Edit deployment](#edit-deployment) | Edit a deployment. |


## List deployments

```bash
GET https://experiment.amplitude.com/api/1/deployments
```

Fetch a list of deployments that experiments or flags can be assigned to.

### Query parameters

|Name|Description|
|---|----|
|`limit`| The max number of deployments to be returned. Capped at 1000.|
|`cursor`| The offset to start the "page" of results from.|

### Response

A successful request returns a `200 OK` response and a list of deployments encoded as JSON in the response body.

{{partial:admonition type="example" heading="Request"}}
```curl
curl --request GET \
    --url 'https://experiment.amplitude.com/api/1/deployments?limit=1000' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
```
{{/partial:admonition}}

{{partial:admonition type="example" heading="Response"}}
```json
    {
        "deployments": [
            {
                "id": <id>,
                "projectId": <projectId>,
                "label": "deployment-1",
                "key": <key>,
                "deleted": true
            },
            {
                "id": <id>,
                "projectId": <projectId>,
                "label": "deployment-2",
                "key": <key>,
                "deleted": false
            }
        ]
    }
```
{{/partial:admonition}}
    
## Create deployment

```bash
POST https://experiment.amplitude.com/api/1/deployments
```

Create a deployment that experiments or flags can be assigned to.

### Query parameters

|Name|Description|
|---|----|
|`projectId`| Required | string | The project's ID. |
|`label`| Required | Deployment's label. Must contain alphanumeric and/or `_`, `-` characters. |
|`type`| Required | string | Deployment's type.  Must be either `client` or `server`. |

{{partial:admonition type="example" heading="Request"}}
```json
{
    "projectId":"<projectId>",
    "label": "hello-world",
    "type": "client"
}
```
{{/partial:admonition}}

### Response

A successful request returns a `200 OK` response and a deployment's id.

{{partial:admonition type="example" heading="Request"}}
```curl
curl --request POST \
    --url 'https://experiment.amplitude.com/api/1/deployments' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
```
{{/partial:admonition}}

{{partial:admonition type="example" heading=""}}
```json
    {
        "id": <id>
    }
```
{{/partial:admonition}}
    
## Edit deployment

```bash
PATCH https://experiment.amplitude.com/api/1/deployments/<id>
```

Edit a deployment that experiments or flags can be assigned to.

### Query parameters

|Name|Description|
|---|----|
|`label`| Optional | Deployment's label. Must contain alphanumeric and/or `_`, `-` characters. |
|`archive`| Optional | string | Soft delete or restore deployment. |

{{partial:admonition type="example" heading="Request"}}
```json
{
    "label": "updated-label"
}
```
{{/partial:admonition}}
    
### Response

A successful request returns a `200 OK` response and `OK` text.

{{partial:admonition type="example" heading="Request"}}
```curl
curl --request PATCH \
    --url 'https://experiment.amplitude.com/api/1/deployments/<id>' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
```
{{/partial:admonition}}
