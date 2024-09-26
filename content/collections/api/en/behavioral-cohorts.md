---
id: 9b143989-b24c-447e-9b24-b31b56c81198
blueprint: api
title: 'Behavioral Cohorts API'
source: 'https://www.docs.developers.amplitude.com/analytics/apis/behavioral-cohorts-api/'
auth_method: http_basic
standard_endpoint: 'https://amplitude.com/api/3/cohorts'
eu_endpoint: 'https://analytics.eu.amplitude.com/api/3/cohorts'
postman_link: 'https://www.postman.com/amplitude-dev-docs/workspace/amplitude-developers/folder/20044411-d003b0cd-e59e-4d85-9924-a9f475bf2aba?action=share&source=copy-link&creator=29131806&ctx=documentation'
lede: 'Use the Behavioral Cohorts API to list all your cohorts in Amplitude, export a cohort in Amplitude, or upload a cohort.'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716312235
api_status: ga
summary: 'List all your cohorts in Amplitude, export a cohort in Amplitude, or upload a cohort.'
---
## Considerations

- For Growth and Enterprise plans, the Behavioral Cohorts Download API has a limit of 500 requests per month.
- Amplitude supports a maximum cohort size of 2 million users. For cohorts larger than this, consider the following options:
    - Create a cohort sync to [Amazon Kinesis](/docs/data/destination-catalog/amazon-kinesis-cohort)
    - Create a cohort sync to a custom destination with a  [Webhook](/docs/data/destination-catalog/cohort-webhooks)
    - Create a cohort sync to [Profile API](/docs/apis/analytics/user-profile#get-cohort-ids)
- There's a concurrency limit of 5 requests across cohort downloads and the Dashboard REST API.
- Cohort Download uses an asynchronous API. Getting a cohort happens in three steps:
    1. Request a single cohort.
    2. Poll the cohort status.
    3. Download the file.
- There is limit on Cohort Download to request a single cohort: 60 requests per 10 minutes per app, and 4 parallel request per minute per app.

## Get all cohorts

Get all discoverable cohorts for an app. Use the `id` for each cohort returned in the response to get a single cohort.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/3/cohorts' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/3/cohorts HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

### Query parameters

| Name|Description|
|----|-----|
|`includeSyncInfo`|<span class="optional">Optional</span>. Boolean. Set to true to include cohort sync metadata in response (one-time + disabled sync will be excluded) .|

### Response

The response is a JSON object with this schema:

```json
{
    "cohorts": [
        { COHORT_OBJECT },
        ...
        { COHORT_OBJECT },
    ]
}
```

Each COHORT_OBJECT returned has this schema:

```json
{
    "appId": integer,
    "archived": boolean, // whether cohort is archived
    "definition": { COHORT_DEFINITION }, // Amplitude internal representation of Cohort Definition
    "description": string,
    "finished": boolean, // Amplitude internal use to decide whether a training cohort has finished ML training
    "id": string,
    "name": string,
    "owners": string[],
    "viewers": string[],
    "published": boolean, // whether cohort is discoverable by other users
    "size": integer,
    "type": string, // Amplitude internal representation on different cohort types
    "lastMod": timestamp, // last modified date
    "createdAt": timestamp,
    "lastComputed": timestamp,
    "hidden": boolean, // Amplitude internal use case to hide a cohort
    "metadata": string[], // cohort created from funnel/microscope might have this
    "view_count": integer,
    "popularity": integer, // cohort created from chart might have this
    "last_viewed": timestamp,
    "chart_id": string, // cohort created from chart will have this
    "edit_id": string, // cohort created from chart will have this
    "is_predictive": boolean,
    "is_official_content": boolean,
    "location_id": string, // cohort created from chart might have this
    "shortcut_ids": string[],
    "syncMetadata": COHORT_SYNC_METADATA[]
}
```

Each COHORT_SYNC_METADATA has this schema:

```json
{
    "target": string,
    "frequency": string, // support minute (real-time), hourly, daily
    "last_successful": timestamp,
    "last_failure": timestamp,
    "params": { COHORT_SYNC_LEVEL_PARAM }
}
```

Below is a sample result:

```json
"cohorts": [{
    "appId": 123456,
    "archived": false,
    "definition": {
        "version": 3,
        "countGroup": {
            "name": "User",
            "is_computed": false
        },
        "cohortType": "UNIQUES",
        "andClauses": [{
            "negated": false,
            "orClauses": [{
                "type": "event",
                "time_type": "rolling",
                "time_value": 30,
                "offset": 0,
                "interval": 1,
                "type_value": "_active",
                "operator": ">=",
                "operator_value": 1,
                "group_by": [],
                "metric": null
            }]
        }],
        "referenceFrameTimeParams": {}
    },
    "description": "test description",
    "finished": true,
    "id": "id_12345",
    "name": "Test Cohort 1",
    "owners": [
        "demo@amplitude.com"
    ],
    "viewers": [],
    "published": true,
    "size": 111,
    "type": "redshift",
    "lastMod": 1679437294,
    "createdAt": 1679437288,
    "lastComputed": 1679440233,
    "hidden": false,
    "metadata": null,
    "view_count": null,
    "popularity": null,
    "last_viewed": null,
    "chart_id": null,
    "edit_id": null,
    "is_predictive": false,
    "is_official_content": false,
    "location_id": null,
    "shortcut_ids": [],
    "syncMetadata": [{
        "target": "braze",
        "frequency": "hourly",
        "last_successful": "2023-03-21T16:09:58.848454-07:00",
        "last_failure": null,
        "params": {
            "user_id": "demo@amplitude.com"
        }
    }]
}],
```

## Get one cohort

Get a discoverable cohort using its `cohort_id`.

This is step one in the download a cohort operation. Use the `request_id` returned in the response to poll export status.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/5/cohorts/request/id'
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/5/cohorts/request/id HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}


{{partial:collapse name="Example: Get a cohort with specific properties"}}
This example gets the cohort with ID `26umsb5` and includes the properties `Property1` and `Property2`.
{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/5/cohorts/request/26umsb5?props=1&propKeys=Property1&propKeys=Property2'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/5/cohorts/request/26umsb5?props=1&propKeys=Property1&propKeys=Property2 HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Get cohort with all properties"}}
{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/5/cohorts/request/26umsb5?props=1'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash

GET /api/5/cohorts/request/26umsb5?props=1 HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

### Path parameters

|Name|Description|
|----|-----------|
|`id`|<span class="required">Required</span>. Cohort ID.|


### Query parameters

| Name|Description|
|----|-----|
|`props`|<span class="optional">Optional</span>. Integer. Set to 1 to include user properties in the response object. Set this to `0` or unset if the request keeps timing out.|
|`propKeys`|<span class="optional">Optional</span>. string[]. One or more user properties to include in the response. Add as many `propKeys` parameters as needed. If left undefined and props=1, response object returns all available user properties.|

### Response

Requesting a single cohort returns 202 response code with the following JSON object:

```json
{
    "request_id": "<request_id>",
    "cohort_id": "<cohort_id>"
}
```

If your authorization or the `cohort_id` is invalid, the request returns an error.

## Get request status

Poll the request status using the `request_id` retrieved for the cohort. This is the second phase in a cohort download operation.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/5/cohorts/request-status/:request_id' \
-u '{api_key}:{secret_key}''
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/5/cohorts/request-status/:request_id HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Get the status of a request"}}
This example gets the status of request with the ID `qfaZya`.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/5/cohorts/request-status/qfaZya' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/5/cohorts/request-status/qfaZya HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

### Path parameters

|Name|Description|
|----|-----------|
|`request_id`|<span class="required">Required</span>. The request ID retrieved with the [get one cohort](#get-one-cohort) request.|


### Response

If the job is still running, polling the request status returns a 202 code and the `async_status` 'JOB INPROGRESS'.

```json
{
    "request_id": "<request_id>",
    "cohort_id": "<cohort_id>",
    "async_status": "JOB INPROGRESS"
}
```

If the job has finished running, polling the request status returns a 200 code and the `async_status` 'JOB COMPLETED'.

```json
{
    "request_id": "<request_id>",
    "cohort_id": "<cohort_id>",
    "async_status": "JOB COMPLETED"
}
```

## Download cohort

When the job has finished running, download the cohort.

This is a basic request.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/5/cohorts/request/:requestId/file' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/5/cohorts/request/requestId/file HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Download a requested cohort"}}
This request downloads the file for request ID `Sf7M9j`.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/5/cohorts/request/Sf7M9j/file'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/5/cohorts/request/Sf7M9j/file HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

### Path parameters

|Name|Description|
|----|-----------|
|`request_id`|<span class="required">Required</span>. The request ID retrieved with the [get one cohort](#get-one-cohort) request.|

- For small cohorts, the response body contains the cohort data.
- For large cohorts, you must download the data. If the cohort is large, the response redirects with a 302 response code to a pre-signed Amazon S3 download URL. The download URL is valid for one minute, access it immediately.
- The API request link (`https://amplitude.com/api/5/cohorts/request/:requestId/file`) is valid for seven days. During the seven days, you can make the same request to get a new S3 download link. Each S3 link is valid for one minute.
- Most clients used to send API requests automatically download the data from the S3 link. If your API client doesn't automatically download the cohort from the S3 link, you have one minute access it manually.

## Upload cohort

Generate a new cohort or update an existing cohort by uploading a set of User IDs or Amplitude IDs. This is a basic request example with placeholder values.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request POST 'https://amplitude.com/api/3/cohorts/upload' \
--header 'Content-Type: application/json' \
-u '{api_key}:{secret_key}''
--data-raw '{
    "name": "Cohort Name",
    "app_id": amplitude_project,
    "id_type": "BY_AMP_ID",
    "ids": [
            "amplitude_id",
            "amplitude_id"
    ],
    "owner": "cohort_owner",
    "published": true
}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
POST /api/3/cohorts/upload HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
Content-Type: application/json
Content-Length: 201

{
"name": "Cohort Name",
"app_id": amplitude_project,
"id_type": "BY_AMP_ID",
"ids": [
            "amplitude_id",
            "amplitude_id"
],
"owner": "cohort_owner",
"published": true
}
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Create a new cohort"}}
This example creates a new cohort named "New Cohort" and includes the Amplitude IDs  `10101010101010ID1`, and `00000010101010ID2`.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request POST 'https://amplitude.com/api/3/cohorts/upload' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=' \
-u '{api_key}:{secret_key}' \
--data-raw '{
    "name": "New Cohort",
    "app_id": 153957,
    "id_type": "BY_AMP_ID",
    "ids": [
            "10101010101010ID1",
            "00000010101010ID2"
    ],
    "owner": "datamonster@amplitude.com",
    "published": true
}'

```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
POST /api/3/cohorts/upload HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
Content-Type: application/json
Content-Length: 280

{
    "name": "New Cohort",
    "app_id": 153957,
    "id_type": "BY_AMP_ID",
    "ids": [
        "10101010101010ID1",
        "00000010101010ID2"
    ],
    "owner": "datamonster@amplitude.com",
    "published": true
}

```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

### Body parameters

| <div class="big-column">Parameter</div> | Description |
| --- | --- |
| `name` | <span class="required">Required</span>. String. A name for the cohort. |
| `app_id` | <span class="required">Required</span>. Integer. An identifier for the Amplitude project containing the cohort. |
| `id_type` | <span class="required">Required</span>. String. The kind of ID sent in the ids field. Valid options are `BY_AMP_ID` or `BY_USER_ID`. |
| `ids` | <span class="required">Required</span>. String\[\]. One or more user or Amplitude IDs to include in the cohort. Specify the ID type in the `id_type` field. |
| `owner` | <span class="required">Required</span>. String. The login email of the cohort's owner in Amplitude. |
| `published` | <span class="required">Required</span>. Boolean. Whether the cohort is discoverable or hidden. |
| `skip_save` | <span class="optional">Optional</span>. Boolean. Set to `true` if you want to validate the upload without saving. Default is `false`. |
| `skip_invalid_ids` | <span class="optional">Optional</span>. Boolean. Setting `skip_invalid_ids` to `true` skips invalid IDs and upload the remaining valid IDs. Setting this parameter to `false` ends the upload if the request has invalid IDs. Default is `true`. |
| `existing_cohort_id` | <span class="optional">Optional</span>. String. The ID of an existing cohort. This replaces the contents for the specified cohort with the IDs uploaded in the request. For example, '1a2bc3d' is your cohort's ID, found in the cohort's URL. `https://analytics.amplitude.com/accountname/cohort/**1a2bc3d**`|

### Response

The response is a JSON object with this schema:

```json
{
    "cohort_id": "COHORT_ID"
}
```

#### Response errors

| Parameter | Type | Description |
| --- | --- | --- |
| error | [error json](#update-cohort-error-response-json) | Error details.  |

#### Upload cohort error response JSON

| Parameter | Description |
| --- | --- |
| `http_code` | Integer. Provides the HTTP error, if available.
| `type` | String. Describes the type of error. |
| `message` | String. Describes the error. |
| `metadata` | JSON object. Describes in more detail the cause of the error. For example, which user ID values are invalid. |

## Update cohort membership

Add and remove IDs to incrementally update existing cohort membership.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request POST 'https://amplitude.com/api/3/cohorts/membership' \
--header 'Content-Type: application/json' \
-u '{api_key}:{secret_key}' \
--data-raw '{
    "cohort_id": "COHORT_ID",
    "memberships": [
        {
            "ids": [
                "ID",
                "ID"
            ],
            "id_type": "BY_ID",
            "operation": "ADD"
        },
        {
            "ids": [
                "ID",
                "ID"
            ],
            "id_type": "BY_ID",
            "operation": "REMOVE"
        },
        {
            "ids": [
                "name",
                "name"
            ],
            "id_type": "BY_NAME",
            "operation": "ADD"
        }
    ],
    "skip_invalid_ids": true
}
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash

POST /api/3/cohorts/membership HTTP/1.1
Host: amplitude.com
Content-Type: application/json
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
Content-Length: 362

{
"cohort_id":"COHORT_ID",
"memberships": [
    {
        "ids" : ["ID","ID"],
        "id_type" : "BY_ID",
        "operation" : "ADD"
    },
    {
        "ids" : ["ID","ID"],
        "id_type" : "BY_ID",
        "operation" : "REMOVE"
    },
    {
        "ids" : ["name","name"],
        "id_type" : "BY_NAME",
        "operation" : "ADD"
    }
    ],
"skip_invalid_ids":true,
}
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Remove and add cohort members"}}
This example adds IDs `111` and `222` by ID, removes IDs `333` and `444` by ID, and removes IDs `asd` and `qwe` by name from the the cohort with ID `1a2bc3d`. The operation is set to skip invalid IDs.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request POST 'https://amplitude.com/api/3/cohorts/membership' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=' \
--data-raw '{
"cohort_id":"1a2bc3d",
"memberships": [
    {
        "ids" : ["111","222"],
        "id_type" : "BY_ID",
        "operation" : "ADD"
    },
    {
        "ids" : ["333","444"],
        "id_type" : "BY_ID",
        "operation" : "REMOVE"
    },
    {
        "ids" : ["asd","qwe"],
        "id_type" : "BY_NAME",
        "operation" : "ADD"
    }
    ],
"skip_invalid_ids":true,
}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash

POST /api/3/cohorts/membership HTTP/1.1
Host: amplitude.com
Content-Type: application/json
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
Content-Length: 362

{
"cohort_id":"1a2bc3d",
"memberships": [
    {
        "ids" : ["111","222"],
        "id_type" : "BY_ID",
        "operation" : "ADD"
    },
    {
        "ids" : ["333","444"],
        "id_type" : "BY_ID",
        "operation" : "REMOVE"
    },
    {
        "ids" : ["asd","qwe"],
        "id_type" : "BY_NAME",
        "operation" : "ADD"
    }
    ],
"skip_invalid_ids":true,
}
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

Perform incremental update (add / remove) to existing cohort membership.

### Request body

| Parameter | Description |
| --- | --- |
| `cohort_id` | <span class="required">Required</span>. String. The ID of an existing cohort. This updates the membership for the specified cohort with the IDs being uploaded in this request. |
| `count_group` | <span class="optional">Optional</span>. String. The count group of the given IDs. This must be the same as the cohort’s existing count group. `Count_group` defaults to User. |
| `memberships` | <span class="required">Required</span>. List of [membership json](https://developers.amplitude.com/docs/behavioral-cohorts-api#membershipjson) An array of JSON objects identifying IDs to add or remove. |
| `skip_invalid_ids` | <span class="optional">Optional</span>. Boolean. Setting this parameter to `false` ends the request without updating cohort membership if the request has invalid IDs. Setting `skip_invalid_ids` to `true` skips invalid IDs while applying the remaining valid ids. Default is `true`. |

#### Memberships request JSON

| Parameter | Description |
| --- | --- |
| `ids` | <span class="required">Required</span>. String\[\]. List of IDs to add or remove. |
| `id_type` | <span class="required">Required</span>. String. The kind of ID sent in the `ids` field. Valid options are: *\- BY_ID* *\- BY_NAME* For User `count_group`, BY_ID is amplitude ID and BY_NAME is user ID. For any other `count_group`, `BY_ID` is group ID and `BY_NAME` is group name. |
| `operation` | <span class="required">Required</span>. String. The operation to apply on `ids` field. Valid options are: `ADD` and `REMOVE` |

### Response

| Parameter | Description |
| --- | --- |
| `cohort_id` | String. The ID of an existing cohort for which the membership information was updated. |
| `memberships_result` | List of [`memberships_result` json](#memberships-response-json). An array of JSON objects identifying result of membership update (add or remove) operation. |

#### Memberships response JSON

| Parameter | Description |
| --- | --- |
| `skipped_ids` | List of strings. List of skipped IDs in the membership operation entry.|
| `id_type` | String. The kind of ID sent for the `ids` field in this membership operation entry. |
| `operation` | String. The operation applied on `ids` field in this membership operation entry |
