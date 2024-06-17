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

The CSV file must comply with the following requirements:

- The max file size is 100 MB and the file can't have more than 1,000,000 rows.
- The first row must contain column names/headers.
- The first column must correspond to the mapping property value and must contain *unique* values. Lookup Tables search for exact matches, and are *case-sensitive*.
- Columns must be separated by commas.
- Rows must be separated by line breaks.
- If a field value contains commas or quotes, it should be wrapped within double quotation marks. The first double quote signifies the beginning of the column data, and the last double quote marks the end. If the value contains a string with double quotes, these are replaced by two double quotes `""`.

## Create a Lookup Table

Create a Lookup Table object by uploading a CSV that maps an existing property to the new properties to create. Send the request with the type multipart/form-data type.

### Parameters

|<div class="big-column">Name</div>| Description|
|-----|------|
|`name` | <span class="required">Required</span>. String. Name of the table.|
|`file` | <span class="required">Required</span>. File. A CSV representation of the mappings.|

### Example request

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```curl
curl -L -X POST 'https://amplitude.com/api/2/lookup_table/:name' \
        -u API_KEY:SECRET_KEY \
        -F 'file=@"/path/to/file.csv"' \
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
POST '/api/2/lookup_table/:name' HTTP/1.1
Host: api2.amplitude.com
Authorization: Basic {{api-key}}:{{secret-key}}
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name=":name"; filename="file.csv"
Content-Type: text/csv

(data)
----WebKitFormBoundary7MA4YWxkTrZu0gW
```
{{/partial:tab}}
{{/partial:tabs}}

### Response

{{partial:tabs tabs="Success, Http 400: Bad Request, HTTP 409: Conflict, HTTP 413: Payload Too Large"}}
{{partial:tab name="Success"}}
```json
{
    "name": "skuToMetadata",
    "column_headers": [
        "Product Category",
        "Product Name"
    ],
    "created_at": "2021-07-15T21:04:23.000593",
    "created_by": "rest",
    "last_modified_at": "2021-07-16T19:14:11.627477",
    "last_modified_by": "rest"
}
```
{{/partial:tab}}
{{partial:tab name="Http 400: Bad Request"}}
```bash
HTTP 400: Bad Request
```

- Invalid file
- File type is invalid. Accepted file types are `text/csv`, `text/plain`, and `text/tab-separated-values`.
- File is empty
- Found duplicate column header. There's a duplicate column, please remove the column so the file can be processed.
{{/partial:tab}}
{{partial:tab name="HTTP 409: Conflict"}}
```bash

HTTP 409: Conflict (Conflict, name already exists)
```

The table already exists
{{/partial:tab}}
{{partial:tab name="HTTP 413: Payload Too Large"}}
```bash

HTTP 413: Payload Too Large
```

The file exceeds the max size.
{{/partial:tab}}
{{/partial:tabs}}

## Retrieve a Lookup Table

Retrieve a Lookup Table by its name.

### Parameters

|<div class="big-column">Name</div>| Description|
|-----|------|
|`name` | <span class="required">Required</span>. String. Name of the table.|

### Example request

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```curl
curl -L -X GET 'https://amplitude.com/api/2/lookup_table/:name' \
        -u API_KEY:SECRET_KEY
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
GET /api/2/lookup_table/:name HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret-key}}
```
{{/partial:tab}}
{{/partial:tabs}}

### Response

{{partial:tabs tabs="Success, Http 404: Not found"}}
{{partial:tab name="Success"}}
```json
{
    "name": "skuToMetadata",
    "column_headers": [
        "Product Category",
        "Product Name"
    ],
    "created_at": "2021-07-15T21:04:23.000593",
    "created_by": "rest",
    "last_modified_at": "2021-07-16T19:14:11.627477",
    "last_modified_by": "rest"
}
```
{{/partial:tab}}
{{partial:tab name="Http 404: Not found"}}
```bash
HTTP 404: Not found
```

The table wasn't found because it wasn't created
{{/partial:tab}}
{{/partial:tabs}}

## Update a Lookup Table

Update a Lookup Table's columns and data.

### Parameters

|<div class="big-column">Name</div>| Description|
|-----|------|
|`name` | <span class="required">Required</span>. String. Name of the table.|
|`file` | <span class="required">Required</span>. File. A CSV representation of the mappings.|

### Example request

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```curl
curl -L -X PATCH 'https://amplitude.com/api/2/lookup_table/:name' \
        -u API_KEY:SECRET_KEY
        -F 'file=@"/path/to/file.csv"' \
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
PATCH /api/2/lookup_table/:name HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret-key}}
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name=":name"; filename="file.csv"
Content-Type: text/csv

(data)
----WebKitFormBoundary7MA4YWxkTrZu0gW
```
{{/partial:tab}}
{{/partial:tabs}}

### Response

{{partial:tabs tabs="Success, Http 400: Bad Request, Http 404: Not found, Http 413: Payload Too Large"}}
{{partial:tab name="Success"}}
```json
{
    "name": "skuToMetadata",
    "column_headers": [
        "Product Category",
        "Product Name"
    ],
    "created_at": "2021-07-15T21:04:23.000593",
    "created_by": "rest",
    "last_modified_at": "2021-07-16T19:14:11.627477",
    "last_modified_by": "rest"
}
```
{{/partial:tab}}
{{partial:tab name="Http 400: Bad Request"}}
```bash
HTTP 400: Bad Request
```

- Requires at least one modification. There should be a file attached.
- File type is invalid. Accepted file types are `text/csv`, `text/plain`, and `text/tab-separated-values`.
- File is empty.
- Found duplicate column header. There's a duplicate column, please remove the column so the file can be processed.
{{/partial:tab}}
{{partial:tab name="Http 404: Not found"}}
```bash
HTTP 404: Not found
```

The table wasn't found because it wasn't created
{{/partial:tab}}
{{partial:tab name="Http 413: Payload Too Large"}}
```bash

HTTP 413: Payload Too Large
```

The file exceeds the max size.
{{/partial:tab}}
{{/partial:tabs}}

## Delete a Lookup Table

### Parameters

|<div class="big-column">Name</div>| Description|
|-----|------|
|`name` | <span class="required">Required</span>. String. Name of the table.|
|`force` | <span class="optional">Optional</span>. Boolean. Delete the associated properties. Defaults to `false`.|

### Example request

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```curl
curl -L -X DELETE 'https://amplitude.com/api/2/lookup_table/:name' \
        -u API_KEY:SECRET_KEY
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
DELETE /api/2/lookup_table/:lookup_table_name?force=True HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret-key}}
```
{{/partial:tab}}
{{/partial:tabs}}

### Repsonse

{{partial:tabs tabs="Success, Http 404: Not found"}}
{{partial:tab name="Success"}}
```json
{
    "name": "skuToMetadata",
    "success": true
}
```
{{/partial:tab}}
{{partial:tab name="Http 404: Not found"}}
```bash

HTTP 404: Not found
```

The table wasn't found.
{{/partial:tab}}
{{/partial:tabs}}

## List all Lookup Tables

List all the Lookup Tables for the project.

### Example request

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```curl
curl -L -X GET 'https://amplitude.com/api/2/lookup_table' \
        -u API_KEY:SECRET_KEY
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
GET /api/2/lookup_table HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret:key}}
```
{{/partial:tab}}
{{/partial:tabs}}

### Response

```json
{
    "data": [
        {
            "name": "isbnToMetadata",
            "column_headers": [
                "Genres",
                "Authors"
            ],
            "created_at": "2021-07-15T21:04:23.000593",
            "created_by": "rest",
            "last_modified_at": "2021-07-16T19:14:11.627477",
            "last_modified_by": "rest"
        },
        {
            "name": "skuToMetadata",
            "column_headers": [
                "Product Category",
                "Product Name"
            ],
            "created_at": "2021-07-16T19:28:18.070073",
            "created_by": "rest",
            "last_modified_at": "2021-07-16T19:28:18.070073",
            "last_modified_by": "rest"
        }
    ]
}
```