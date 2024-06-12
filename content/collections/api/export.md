---
id: 1a113ef9-06ab-4fa0-b050-6ddfa980d980
blueprint: api
title: 'Export API'
source: 'https://www.docs.developers.amplitude.com/analytics/apis/export-api/'
auth_method: http_basic
standard_endpoint: 'https://amplitude.com/api/2/export'
eu_endpoint: 'https://analytics.eu.amplitude.com/api/2/export'
postman_link: 'https://www.postman.com/amplitude-dev-docs/workspace/amplitude-developers/folder/20044411-faf32aa1-95c4-4069-a0e7-d318b2eaebc3?action=share&source=copy-link&creator=29131806&ctx=documentation'
lede: "The Export API lets you export your project's event data."
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716312307
api_status: ga
summary: "Export your project's event data."
---
## Considerations

- The specified date range refers to the time the event data was uploaded to Amplitude servers (see `server_upload_time`). The Export API returns events timestamped in UTC. Data is available to export at a minimum within 2 hours of when the servers received it. For example, data sent between 8 and 9 PM begins loading at 9 PM and is available via the Export API at 11 PM. Note that there is no delay in platform reporting. Only exports are delayed.
- Export API isn't supported for a cross-project view because the view doesn’t own any data. To export all the data in the view, you would need to call the Export API on the underlying projects that actually ingested the data.
- Size limit is 4GB. If the size exceeds 4GB, the request returns a 400 response. In this case, choose a smaller time range to export the data. In cases where an hour's worth of data exceeds 4GB, use the [Amazon S3 export](/docs/data/destination-catalog/amazon-s3#run-a-manual-export).
- To export a whole day, use `T00` to `T23`. For example, `GET 'https://amplitude.com/api/2/export?start=20230101T00&end=20220101T23'`
- The max period you can query at once is 365 days.

## Request

`GET https://amplitude.com/api/2/export`

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/2/export?start=<starttime>&end=<endtime>' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
GET /api/2/export?start=<starttime>&end=<endtime> HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Get data for a period"}}
Export activity data from between midnight on January 1, 2022 and midnight January 27, 2022. 

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/2/export?start=20220101T00&end=20220127T00' \
--header 'Authorization: Basic YWhhbWwsdG9uQGFwaWdlZS5jb206bClwYXNzdzByZAo'
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
GET /api/2/export?start=20220101T00&end=20220127T00 HTTP/1.1
Host: amplitude.com
Authorization: Basic YWhhbWwsdG9uQGFwaWdlZS5jb206bClwYXNzdzByZAo
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

## Query parameters

|Name|Description|
|-----|------------|
|`start`| <span class="required">Required</span>. First hour included in data series, formatted YYYYMMDDTHH. For example, `0220201T05`.|
|`end` |<span class="required">Required</span>. Last hour included in data series, formatted YYYYMMDDTHH For example, `20220201T05`.|

## Response

The response is a zipped archive of JSON files. Depending on data volume, there can be several files per hour. The API returns a 404 response is there is no data for the time range you requested.

{{partial:admonition type="note" heading=""}}
Events before November 12, 2014 are grouped by day, instead of by the hour.
{{/partial:admonition}}

### Response schema

The response includes one event JSON object per line in each file, with the following schema:

``` json
{
 "server_received_time": UTC ISO-8601 formatted timestamp,
 "app": int,
 "device_carrier": string,
 "city": string,
 "user_id": string,
 "uuid": UUID,
 "event_time": UTC ISO-8601 formatted timestamp,
 "platform": string,
 "os_version": string,
 "amplitude_id": long,
 "processed_time": UTC ISO-8601 formatted timestamp,
 "version_name": string,
 "ip_address": string,
 "paying": boolean,
 "dma": string,
 "group_properties": dict,
 "user_properties": dict,
 "client_upload_time": UTC ISO-8601 formatted timestamp,
 "$insert_id": string,
 "event_type": string,
 "library": string,
 "amplitude_attribution_ids": string,
 "device_type": string,
 "start_version": string,
 "location_lng": float,
 "server_upload_time": UTC ISO-8601 formatted timestamp,
 "event_id": int,
 "location_lat": float,
 "os_name": string,
 "groups": dict,
 "event_properties": dict,
 "data": dict,
 "device_id": string,
 "language": string,
 "country": string,
 "region": string,
 "session_id": long,
 "device_family": string,
 "sample_rate": null,
 "client_event_time": UTC ISO-8601 formatted timestamp,
}
```

## Status codes

|Code|Message|
|----|---------|
|200|Success|
|400|The file size of the exported data is too large. Shorten the time ranges and try again. The limit size is 4GB.|
|404|No data available for the time range requested.|
|504|The amount of data is large causing a timeout. For large amounts of data, use the [Amazon S3 destination](/docs/data/destination-catalog/amazon-s3#run-a-manual-export).|