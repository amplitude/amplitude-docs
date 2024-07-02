---
id: 7a2593e7-565f-4cb8-8b8a-ac138219acb4
blueprint: api
title: 'Lookup Table API 2'
auth_method: http_basic
standard_endpoint: 'https://data-api.amplitude.com/api/3/lookup_table'
eu_endpoint: 'https://data-api.eu.amplitude.com/api/3/lookup_table'
postman_link: 'https://god.gw.postman.com/run-collection/20044411-88bd70c1-9e00-483c-aaf1-2b7159f9bb2b?action=collection%2Ffork&collection-url=entityId%3D20044411-88bd70c1-9e00-483c-aaf1-2b7159f9bb2b%26entityType%3Dcollection%26workspaceId%3D2ffc735a-10a6-4f54-818e-16c87aeebcd7#?env%5BAmplitude%20API%20Environment%5D=W3sia2V5IjoiYXBpX2tleSIsInZhbHVlIjoiSU5TRVJUIEFQSSBLRVkiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoic2VjcmV0Iiwic2Vzc2lvblZhbHVlIjoiSU5TRVJUIEFQSSBLRVkiLCJzZXNzaW9uSW5kZXgiOjB9LHsia2V5Ijoic2VjcmV0X2tleSIsInZhbHVlIjoiSU5TRVJUIFNFQ1JFVCBLRVkiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoic2VjcmV0Iiwic2Vzc2lvblZhbHVlIjoiSU5TRVJUIFNFQ1JFVCBLRVkiLCJzZXNzaW9uSW5kZXgiOjF9LHsia2V5IjoiU0NJTV90b2tlbiIsInZhbHVlIjoiSU5TRVJUIFNDSU0gVE9LRU4iLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoic2VjcmV0Iiwic2Vzc2lvblZhbHVlIjoiSU5TRVJUIFNDSU0gVE9LRU4iLCJzZXNzaW9uSW5kZXgiOjJ9LHsia2V5Ijoib3JnX2FwaV9rZXkiLCJ2YWx1ZSI6IklOU0VSVCBPUkcgQVBJIEtFWSIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJzZWNyZXQiLCJzZXNzaW9uVmFsdWUiOiJJTlNFUlQgT1JHIEFQSSBLRVkiLCJzZXNzaW9uSW5kZXgiOjN9LHsia2V5Ijoib3JnX3NlY3JldF9rZXkiLCJ2YWx1ZSI6IklOU0VSVCBPUkcgU0VDUkVUIEtFWSIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJzZWNyZXQiLCJzZXNzaW9uVmFsdWUiOiJJTlNFUlQgT1JHIFNFQ1JFVCBLRVkiLCJzZXNzaW9uSW5kZXgiOjR9XQ=='
api_status: ga
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718651015
lede: |-
  Lookup tables let you augment user and event properties. Instead of using formulas, you can upload a CSV file that contains property mappings to derive new properties. 

  To create a lookup property, create a lookup table to reference. You can retrieve and update each of the tables using the API. Lookup Tables are identified by the name and are scoped per project.
source: 'https://www.docs.developers.amplitude.com/data/apis/lookup-tables-api/'
---
## Considerations

The CSV file must follow these requirements:

- The max file size is 100 MB and the file can't have more than 1,000,000 rows.
- The first row must contain column names/headers.
- The first column must correspond to the mapping property value and must contain *unique* values. Lookup Tables search for exact matches, and are *case-sensitive*.
- Separate columns with commas.
- Separate rows with line breaks.
- If a field value contains commas or quotes, wrap it in double quotation marks. The first double quote signifies the beginning of the column data, and the last double quote marks the end. If the value contains a string with double quotes, these Amplitude replaces them with two double quotes `""`.

## Create a Lookup Table

Create a Lookup Table object by uploading a CSV that maps an existing property to the new properties to create. Send the request with the type multipart/form-data type.

### Parameters


| <div class="big-column">Name</div> | Type   | Description                                                                                    |
| ---------------------------------- | ------ | ---------------------------------------------------------------------------------------------- |
| `name`                             | String | <span class="required">Required.</span> Name of the table.                                     |
| `file`                             | File   | <span class="required">Required.</span> A CSV representation of the mappings.                  |
| `key`                              | String | <span class="required">Required.</span> Column in CSV to use as key of lookup table.           |
| `property`                         | JSON   | <span class="required">Required.</span> Property in Amplitude to map to the key column in CSV. |
| `property.value`                   | String | <span class="required">Required.</span> Name of property in Amplitude.                         |
| `property.type`                    | String | <span class="required">Required.</span> Type of property in Amplitude.                         |
| `property.groupType`               | String | Required only if property is a group property.                                                 |

### Example request

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl -L -X POST 'https://data-api.amplitude.com/api/3/lookup_table' \
        -u API_KEY:SECRET_KEY \
        -F 'file=@"/path/to/file.csv"' \
        -F 'name=":name"' \
        -F 'key=":key"' \
        -F 'property="{\"value\": \":propertyName\", \"type\": \":propertyType\", \"groupType\":  \":propertyGroupType\"}";type=application/json'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```
POST '/api/3/lookup_table' HTTP/1.1
Host: data-api.amplitude.com
Authorization: Basic {api-key}:{secret-key}
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="key"

:key
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="name"

:name
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name=":name"; filename="file.csv"
Content-Type: text/csv

(data)
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="property"
Content-Type: application/json

{"value": ":propertyName", "type": ":propertyType", "groupType": ":propertyGroupType"}
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```
{{/partial:tab}}
{{/partial:tabs}}

### Response

```json
{
"appId": "<projectId>",
"name": "example-lookup",
"columnHeaders": [
    "Language"
],
"createdAt": 1715912516,
"createdBy": "api",
"lastModifiedAt": 1715912516,
"lastModifiedBy": "api",
"isDeleted": false,
"isConfigured": true,
"keyColumnHeader": "SKU",
"keyProperty": {
    "type": "event",
    "value": "example",
    "groupType": "User"
},
"fileName": "lookup-table-example.csv",
"rowCount": 3,
"sizeBytes": 0,
}
```

## Retrieve a Lookup Table

Retrieve a Lookup Table by its name.

### Parameters

| <div class="big-column">Name</div> | Type   | Description                                                |
| ---------------------------------- | ------ | ---------------------------------------------------------- | 
| `name`                             | String | <span class="required">Required</span>. Name of the table. |

### Example request

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl -L -X GET 'https://data-api.amplitude.com/api/3/lookup_table/:name' \
        -u API_KEY:SECRET_KEY
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/3/lookup_table/:name HTTP/1.1
Host: data-api.amplitude.com
Authorization: Basic {api-key}:{secret-key}
```
{{/partial:tab}}
{{/partial:tabs}}

### Response

```json
{
    "appId": "<projectId>",
    "name": "example-lookup",
    "columnHeaders": [
        "Language"
    ],
    "createdAt": 1715912516,
    "createdBy": "api",
    "lastModifiedAt": 1715912516,
    "lastModifiedBy": "api",
    "isDeleted": false,
    "isConfigured": true,
    "keyColumnHeader": "SKU",
    "keyProperty": {
        "type": "event",
        "value": "example",
        "groupType": "User"
    },
    "fileName": "lookup-table-example.csv",
    "rowCount": 3,
    "sizeBytes": 5,
}
```

## Download a CSV

Download the lookup table object as a CSV. Any incremental changes are applied in the downloaded file.

### Parameters

| <div class="big-column">Name</div> | Type   | Description                                                |
| ---------------------------------- | ------ | ---------------------------------------------------------- |  
| `name`                             | String | <span class="required">Required</span>. Name of the table. |

### Example request

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl -L -X GET 'https://data-api.amplitude.com/api/3/lookup_table/:name/csv' \
        -u API_KEY:SECRET_KEY
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/3/lookup_table/:name/csv HTTP/1.1
Host: data-api.amplitude.com
Authorization: Basic {api-key}:{secret-key}
```
{{/partial:tab}}
{{/partial:tabs}}

## Override a Lookup Table

Override a Lookup Table object by uploading a CSV that replaces the CSV already uploaded to Amplitude. Send the request with the type multipart/form-data type.

### Parameters

| <div class="big-column">Name</div> | Type   | Description                                                |
| ---------------------------------- | ------ | ---------------------------------------------------------- |  
| `name`                             | String | <span class="required">Required</span>. Name of the table. |
| `file`                             | File   | A CSV representation of the mappings.                      |
| `property`                         | JSON   | Property in Amplitude to map to the key column in CSV.     |
| `property.value`                   | String | Name of property in Amplitude.                             |
| `property.type`                    | String | Type of property in Amplitude.                             |
| `property.groupType`               | String | Required only if property is a group property.             |

### Example request

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl -L -X PUT 'https://data-api.amplitude.com/api/3/lookup_table/:name' \
        -u API_KEY:SECRET_KEY \
        -F 'file=@"/path/to/file.csv"' \
        -F 'property="{\"value\": \":propertyName\", \"type\": \":propertyType\", \"groupType\":  \":propertyGroupType\"}";type=application/json'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
PUT '/api/3/lookup_table/:name' HTTP/1.1
Host: data-api.amplitude.com
Authorization: Basic {api-key}:{secret-key}
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name=":name"; filename="file.csv"
Content-Type: text/csv

(data)
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="property"
Content-Type: application/json

"value": ":propertyName", "type": ":propertyType", "groupType": ":propertyGroupType"
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```
{{/partial:tab}}
{{/partial:tabs}}

### Response

```json
{
    "appId": "<projectId>",
    "name": "example-lookup",
    "columnHeaders": [
        "Language"
    ],
    "createdAt": 1715912516,
    "createdBy": "api",
    "lastModifiedAt": 1715912516,
    "lastModifiedBy": "api",
    "isDeleted": false,
    "isConfigured": true,
    "keyColumnHeader": "SKU",
    "keyProperty": {
        "type": "event",
        "value": "example",
        "groupType": "User"
    },
    "fileName": "lookup-table-example.csv",
    "rowCount": 3,
    "sizeBytes": 0,
}
```


## Update a Lookup Table

Update a Lookup Table's columns and data. If you provide a CSV file, the file is merged with the existing CSV within Amplitude. This allows for incremental updates of the CSV, instead of a complete replacement.

### Parameters


| <div class="big-column">Name</div> | Type   | Description                                                |
| ---------------------------------- | ------ | ---------------------------------------------------------- | 
| `name`                             | String | <span class="required">Required</span>. Name of the table. |
| `file`                             | File   | A CSV representation of the mappings.                      |
| `property`                         | JSON   | Property in Amplitude to map to the key column in CSV.     |
| `property.value`                   | String | Name of property in Amplitude.                             |
| `property.type`                    | String | Type of property in Amplitude.                             |
| `property.groupType`               | String | Required only if property is a group property.             |
### Example request

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl -L -X PATCH 'https://data-api.amplitude.com/api/3/lookup_table/:name' \
        -u API_KEY:SECRET_KEY
        -F 'file=@"/path/to/file.csv"' \
        -F 'property="{\"value\": \":propertyName\", \"type\": \":propertyType\", \"groupType\":  \":propertyGroupType\"}";type=application/json'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
PATCH '/api/3/lookup_table/:name' HTTP/1.1
Host: data-api.amplitude.com
Authorization: Basic {api-key}:{secret-key}
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name=":name"; filename="file.csv"
Content-Type: text/csv

(data)
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="property"
Content-Type: application/json

"value": ":propertyName", "type": ":propertyType", "groupType": ":propertyGroupType"
------WebKitFormBoundary7MA4YWxkTrZu0gW--

```
{{/partial:tab}}
{{/partial:tabs}}

### Response

```json
{
    "appId": "<projectId>",
    "name": "example-lookup",
    "columnHeaders": [
        "Language"
    ],
    "createdAt": 1715912516,
    "createdBy": "api",
    "lastModifiedAt": 1715912516,
    "lastModifiedBy": "api",
    "isDeleted": false,
    "isConfigured": true,
    "keyColumnHeader": "SKU",
    "keyProperty": {
        "type": "event",
        "value": "example",
        "groupType": "User"
    },
    "fileName": "lookup-table-example.csv",
    "rowCount": 3,
    "sizeBytes": 0,
}
```

## Delete a Lookup Table

Delete a Lookup Table.

### Parameters

| <div class="big-column">Name</div> | Type   | Description                                                |
| ---------------------------------- | ------ | ---------------------------------------------------------- | 
| `name`                             | String | <span class="required">Required</span>. Name of the table. |

### Example request

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl -L -X DELETE 'https://data-api.amplitude.com/api/3/lookup_table/:name' \
        -u API_KEY:SECRET_KEY
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
DELETE /api/3/lookup_table/:name HTTP/1.1
Host: data-api.amplitude.com
Authorization: Basic {api-key}:{secret-key}
```
{{/partial:tab}}
{{/partial:tabs}}

### Response

```json
{
    "message": "Lookup table <:name> deleted successfully",
    "success": true
}
```

## List all Lookup Tables

List all the Lookup Tables for the project.

### Example request

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl -L -X GET 'https://data-api.amplitude.com/api/3/lookup_table' \
        -u API_KEY:SECRET_KEY
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/3/lookup_table HTTP/1.1
Host: data-api.amplitude.com
Authorization: Basic {api-key}:{secret:key}
```
{{/partial:tab}}
{{/partial:tabs}}

### Response


```json
[
    {
        "appId": "<projectId>",
        "name": "example-lookup",
        "columnHeaders": [
            "Language"
        ],
        "createdAt": 1715912516,
        "createdBy": "api",
        "lastModifiedAt": 1715912516,
        "lastModifiedBy": "api",
        "isDeleted": false,
        "isConfigured": true,
        "keyColumnHeader": "SKU",
        "keyProperty": {
            "type": "event",
            "value": "example",
            "groupType": "User"
        },
        "fileName": "lookup-table-example.csv",
        "rowCount": 3,
        "sizeBytes": 5,
    },
    {
        "appId": "<projectId>",
        "name": "example-lookup-2",
        "columnHeaders": [
            "Language"
        ],
        "createdAt": 1715912516,
        "createdBy": "api",
        "lastModifiedAt": 1715912516,
        "lastModifiedBy": "api",
        "isDeleted": false,
        "isConfigured": true,
        "keyColumnHeader": "SKU",
        "keyProperty": {
            "type": "event",
            "value": "example",
            "groupType": "User"
        },
        "fileName": "lookup-table-example.csv",
        "rowCount": 50,
        "sizeBytes": 10,
    }
]
```

## Error Codes

All the above lookup table APIs share common error codes as described below.

### Structure

| <div class="big-column">Name</div> | Description                                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `statusCode`                       | Http status code of error. 400, 409, 413                                                                      |
| `message`                          | Human readable message describing the error                                                                   |
| `errorCode`                        | Static error code string                                                                                      |
| `extraParams`                      | Each error might have extra parameters in the response to help better point to the exact reason for the error |

### Types

| <div class="big-column">Code</div>       | Description                                                                        |
| ---------------------------------------- | ---------------------------------------------------------------------------------- |
| `LOOKUP_TABLE_INVALID_FILE_COUNT `         | Attempted to upload more than 1 file for a single lookup table.                    |
| `LOOKUP_TABLE_INVALID_FILE_SIZE  `         | Created/Edited a lookup table using a file bigger than 100mb.                      |
| `LOOKUP_TABLE_INVALID_FILE_TYPE `          | Created/Edited a lookup table using a file that wasn't a CSV.                      |
| `LOOKUP_TABLE_INVALID_KEY_COLUMN `         | Created a lookup table with a "key" input not present in the headers of the table. |
| `LOOKUP_TABLE_INVALID_VALUE_COLUMN`        | Cell in uploaded file exceeds 1,024 characters.                                    |
| `LOOKUP_TABLE_INVALID_KEY_PROPERTY`        | Provided key property doesn't exist in Amplitude.                                  |
| `LOOKUP_TABLE_INVALID_NUMBER_OF_ROWS`      | Created/Edited a lookup table using a file with more than 1mil rows.               |
| `LOOKUP_TABLE_KEY_COLUMN_DUPLICATE_VALUES` | Specified key column has duplicate values.                                         |
| `LOOKUP_TABLE_INVALID_TABLE_NAME`          | Provided name is invalid.                                                          |
| `LOOKUP_TABLE_MALFORMED_CSV`               | Provided CSV not processed correctly. See error message for more details.          |
| `LOOKUP_TABLE_INVALID_INPUT`               | Input for field doesn't match expectation. See error message for more details.     |
| `LOOKUP_TABLE_ALREADY_EXISTS`              | Created a table that already exists in the provided project.                       |
| `LOOKUP_TABLE_DOES_NOT_EXIST`              | Attempted to load or edit table that doesn't exist.                                |
| `LOOKUP_TABLE_INVALID_COLUMN_HEADERS`      | Column headers in file not processed correctly.                                    |