---
id: 4189e402-ab32-4288-837f-cea28db379f1
blueprint: api
title: 'Event Streaming Metrics Summary API'
source: 'https://www.docs.developers.amplitude.com/analytics/apis/event-streaming-metrics-summary-api/'
auth_method: http_basic
standard_endpoint: 'https://amplitude.com/api/2/event-streaming/delivery-metrics-summary'
eu_endpoint: 'https://analytics.eu.amplitude.com/api/2/event-streaming/delivery-metrics-summary'
postman_link: 'https://www.postman.com/amplitude-dev-docs/workspace/amplitude-developers/folder/20044411-3cde52d1-570f-473b-8478-df595ae77e45?action=share&source=copy-link&creator=29131806&ctx=documentation'
lede: 'Use the Event Streaming Metrics API to monitor delivery metrics for your event streams.'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716312299
api_status: ga
summary: 'Get delivery metrics summary for a configured event stream.'
---
## Considerations

- The latest 4 hours of data is accurate to the minute. Beyond that, the data is aggregated internally for every hour. Consider this when requesting metric data older than 4 hours.
- Amplitude retains event streaming metrics for the last 90 days. Sending `start` or `end` time beyond this threshold returns a `500` status. 

## Limits

The API has a limit of 4 concurrent requests per project, and 12 requests per minute per project. Amplitude rejects anything above this threshold with a `429` status code.

## Request

Send a `GET` request with required and optional parameters to `https://analytics.amplitude.com/api/2/event-streaming/delivery-metrics-summary`. 

Here is a basic request with only the required parameters.

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://analytics.amplitude.com/api/2/event-streaming/delivery-metrics-summary?sync_id=SYNC_ID&time_period=TIME_PERIOD' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
GET /api/2/event-streaming/delivery-metrics-summary?sync_id=SYNC_ID&time_period=TIME_PERIOD HTTP/1.1
Host: analytics.amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64-encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Get the last four hours"}}
Gets the last four hours of data for the decoded sync ID `30001625`.

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://analytics.amplitude.com/api/2/event-streaming/delivery-metrics-summary?sync_id=30001625&time_period=FOUR_HOURS' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
GET /api/2/event-streaming/delivery-metrics-summary?sync_id=30001625&time_period=FOUR_HOURS HTTP/1.1
Host: analytics.amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Get the last hour"}}
Gets the last hour of data for the decoded sync ID `30001625`.

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://analytics.amplitude.com/api/2/event-streaming/delivery-metrics-summary?sync_id=30001625&time_period=ONE_HOUR' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
GET /api/2/event-streaming/delivery-metrics-summary?sync_id=30001625&time_period=ONE_HOUR HTTP/1.1
Host: analytics.amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Get data for a custom period"}}
Gets the data between October 1, 2022 at 7:00 AM UTC +1 and October 31, 2022 at 7:00 AM UTC +1 for the decoded sync ID `30001625`.

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://analytics.amplitude.com/api/2/event-streaming/delivery-metrics-summary?sync_id=30001625&time_period=CUSTOM&start=2022-10-01T07:00:00+01:00&end=end=2022-10-31T07:00:00+01:00' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
GET /api/2/event-streaming/delivery-metrics-summary?sync_id=30001625&time_period=CUSTOM&start=2022-10-01T07:00:00+01:00&end=2022-10-31T07:00:00+01:00 HTTP/1.1
Host: analytics.amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

## Query parameters

|<div class ="big-column">Name</div>|Description|
|-----|----------|
|`sync_id`|  <span class="required">Required</span>. The ID for a specific streaming destination. You can find this ID under the title of the sync on the destination's setting page.|
|`time_period`|  <span class="required">Required</span>. Retrieves the data for a specified period. Can be one of the following values:<br>`TEN_MINUTES`<br>`ONE_HOUR`<br> `FOUR_HOURS`<br> `ONE_DAY`<br> `ONE_WEEK`<br> `TWO_WEEKS`<br> `CUSTOM`|
|`start`| <span class="optional">Optional</span>, but <span class="required">required if `time_period` is `CUSTOM`</span>. The inclusive starting time of the custom interval in the format `YYYY-MM-DDThh:mmTZD` (ISO-8601). For example, `2022-10-01T07:00:00+01:00`|
|`end`|<span class="optional">Optional</span>, <span class="required">required if `time_period` is `CUSTOM`</span>. The exclusive end time of the custom interval in the format `YYYY-MM-DDThh:mmTZD` (ISO-8601). For example, `2022-10-31T07:00:00+01:00`|


## Response

The response is a JSON blob with the retrieved delivery metrics for the specific sync.

| Attribute | Description |
|-----------| ------------|
| `timePeriod` | string. The `time_period` sent in the request. |
| `eventsDelivered` | int. The total number of delivered events. |
| `eventsNotDelivered` | int. The total number of events that weren't delivered. | 
| `deliveryRate` | double. The delivery success rate. | 
| `latencyInSeconds` | double. The p95 latency in seconds. | 
| `timePeriodStart` | string. The UTC (ISO-8601) timestamp for the request start time. |
| `timePeriodEnd` | string. The UTC (ISO-8601) timestamp for the request end time. |
| `successOnFirstAttempt` | int. Events delivered successfully in the first attempt. |
| `successAfterRetry` | int. Events delivered successfully after one or more retries. |
| `eventsExpired` | int. Events that weren't sent after all retry attempts. |
| `eventsDiscarded` | int. Events that weren't sent due to data incomplete/invalid. |

```json
{
  "timePeriod": "CUSTOM",
  "eventsDelivered": 19,
  "eventsNotDelivered": 0,
  "deliveryRate": 1.0,
  "latencyInSeconds": 5.098051910578275,
  "timePeriodStart": "2022-10-01 06:00:00.000000",
  "timePeriodEnd": "2022-10-31 06:00:00.000000",
  "successOnFirstAttempt": 19,
  "successAfterRetry": 0,
  "eventsExpired": 0,
  "eventsDiscarded": 0
}
```

## Status codes

|Code|Message|
|----|-------|
|200|Success|
|400|Bad request|
|401|Unauthorized|
|403|Forbidden: attempt to access sync outside of organization and app.|
|429|Rate limit exceeded|
|500|Internal server error|