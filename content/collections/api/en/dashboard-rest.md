---
id: 74643fe3-2402-4eb3-a38a-80313b82e453
blueprint: api
title: 'Dashboard REST API'
source: 'https://www.docs.developers.amplitude.com/analytics/apis/dashboard-rest-api/'
auth_method: http_basic
standard_endpoint: 'https://amplitude.com/api/2/'
eu_endpoint: 'https://analytics.eu.amplitude.com/api/2/'
postman_link: 'https://www.postman.com/amplitude-dev-docs/workspace/amplitude-developers/folder/20044411-b3c93c0f-0849-430a-8a82-749c2ac54fea?action=share&source=copy-link&creator=29131806&ctx=documentation'
lede: "You can get data that's displayed on the dashboard graphs in JSON format with the Dashboard REST API."
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716312290
api_status: ga
summary: "Get data that's displayed on the dashboard graphs in JSON format via the Dashboard REST API."
---
## Considerations

- You may have to URL encode special characters in the names of event types, event properties, and user properties. For example, encode `Play Song` as `Play%20Song`. Use the [W3Schools encoding reference](http://www.w3schools.com/tags/ref_urlencode.asp) for help.
- Some examples in this article use backslash syntax to escape characters when using cURL. If you aren't using cURL, then don't encode your request with backslash escape characters.
- The Dashboard REST API time zone is the same as your Amplitude project's time zone.

### Rate limits

For each endpoint, there is a concurrent limit and a rate limit. The concurrent limit restricts the number of requests you can run at the same time. The rate limit restricts the total number of queries you can run per hour. Exceeding these limits returns a 429 error. These limits are per project, and the 429 error also includes information on how you are exceeding the limit.

**Concurrent Limit**: You can run up to 5 concurrent requests across all Amplitude REST API endpoints, including cohort download.

#### User activity/user search limits

You can run up to 360 queries per hour for user activity and user search endpoints.
The [User Activity](#user-activity) and [User Search](#user-search) endpoints have a different rate limit than all other request types.

### Endpoint costs

Endpoints use *cost per query* model. Amplitude calculates cost based on this formula:

`cost = (# of days) * (# of conditions) * (cost for the query type)`

Here is how Amplitude determines each variable in the formula:

- Number of days: This is the number of days in the query.
- Number of conditions: This is the number of segments plus the number of conditions within the segments applied to the chart you are looking at. Each group by counts as 4 segments.

{{partial:admonition type="note" heading="Segments and conditions"}}
* Segments are comparison groups. For more information, see [Add user segments](/docs/analytics/charts/build-charts-add-user-segments#add-more-segments).
* Conditions represent top-level filters. Cohorts, `WHERE`, and "who performed/did" are all conditions in Amplitude. Event filters **don't** count as conditions with regards to API costs.
{{/partial:admonition}}

Different chart types have different costs. For all endpoints not listed here, the cost is 1.
Here are the limits for these endpoints, measured in the cost per query:

- **Concurrent Limit**: Up to 1000 cost within a five minute period.
- **Rate Limit**: Up to 108,000 cost per hour.

- [Event Segmentation](#event-segmentation): Equal to the number of events you are looking at in the left module. If any event has a group by, add a cost of 4 per group by and event.
- [Funnel Analysis](#funnel-analysis): The number of events you are looking at in the funnel multiplied by two. If any event has a group by, add a cost of 4 per group by and event.
- [Retention Analysis](#retention-analysis): The cost for this chart is 8.
- [User Sessions](#get-average-sessions-per-user): The cost for this chart is 4.

## Shared query parameters

These query parameters are shared across several Dashboard REST API endpoints.

- For built-in Amplitude properties, valid values are `version`, `country`, `city`, `region`, `DMA`, `language`, `platform`, `os`, `device`, `device_type`, `start_version`, and `paying`.
- For custom user properties, format the key as `gp:name`.

| Parameter | Description |
| --- | --- |
| `e` | A full event with optional property filters or group by. Events are represented as JSON objects as described in [event format](#event-format). |
| `s` | Segment definitions. Include as many as needed. Segments are represented as JSON arrays, where each element is a JSON object corresponding to a filter condition as described [segment definition](#segment-definition). |
| `g` | The property to group by, for example `platform`. Available only when there is a single segment. Limit: two. |

## Event format

The event parameter can include these keys:

| <div class ="big-column">Name</div>| Description|
|-----|------------|
|`event_type`| <span class="required">Required</span>. The event type.<br> For custom events, prefix the name with `ce:`. For example: "ce:name". <br> For '[Amplitude] Any Active Event', use `_active`.<br> For '[Amplitude] Any Event', use `_all`. <br> For '[Amplitude] Revenue', use `revenue_amount`. <br> For '[Amplitude] Revenue (Verified)', use `verified_revenue`. <br>For '[Amplitude] Revenue (Unverified)', use `unverified_revenue`.|
|`filters` | <span class="optional">Optional</span>. A list of property filters. Each filter is a JSON object with the following keys: <br>`subprop_type` <span class="required">Required</span>. Either "event" or "user", indicating that the property is either an event or user property, respectively. <br> `subprop_key` <span class="required">Required</span>. The name of the property to filter on. Note: For non-Amplitude, custom user properties, prepend the user property name with `gp:`. `gp:` isn't needed for event properties.<br>`subprop_op` <span class="required">Required</span>. The operator for filtering on specific property values, either `is`, `is not`, `contains`, `does not contain`, `less`, `less or equal`, `greater`, `greater or equal`, `set is`, or `set is not`.<br>`subprop_value`: <span class="required">Required</span>. A list of values to filter the event property by.|
|`group_by` | <span class="optional">Optional</span>. A list of properties to group by (at most 2). Each group by is a JSON object with these keys:<br> `type` <span class="required">Required</span>. - Either "event" or "user", indicating that the property is either an event or user property, respectively. <br>`value` <span class="required">Required</span>. - The name of the property to group by.|

### Event format example

```json
{
  "event_type": "CompletedProfile",
  "filters": [
    {
      "subprop_type": "event",
      "subprop_key": "EmailVerified",
      "subprop_op": "is",
      "subprop_value": [
        "true"
      ]
    },
    {
      "subprop_type": "user",
      "subprop_key": "gp:SignUpDate",
      "subprop_op": "is",
      "subprop_value": [
        "2021-08-18"
      ]
    }
  ],
  "group_by": [
    {
      "type": "user",
      "value": "platform"
    }
  ]
}
```

## Segment definition

| Name| Description|
|------|----------|
|`prop`| <span class="required">Required</span>. The name of the property to filter on. For behavioral cohorts, the name of the property is "userdata_cohort". <br>Example ("XYXxxzz" is the identifier from the Behavioral Cohort's URL, https://analytics.amplitude.com/org_name/cohort/**XYXxxzz**.)<br>`s=\[\{"prop":"userdata_cohort","op":"is","values":\["XYXxxzz"\]\}\]`|
|`op` |<span class="required">Required</span>. The operator for filtering on specific property values. Allowed values are `is`, `is not`, `contains`, `does not contain`, `less`, `less or equal`, `greater`, `greater or equal`, `set is`, or `set is not`.|
|`values`| <span class="required">Required</span>. A list of strings to filter the segment by. If you are segmenting by a cohort, the value is the cohort ID, found in URL of the cohort in the web app (for example, "5mjbq8w").|

### Segment definition example

```json
[
    {
        "prop": "version",
        "op": "contains",
        "values": ["1.0", "2.0"]
    },
    {
        "prop": "gp:gender",
        "op": "is",
        "values": ["female"]
    }
]
```

## Export data tables

You can use the Dashboard REST API to export data from data tables. Just query any Data Table chart type, and don't include start or end dates in the query. 

## Get results from an existing chart

Get JSON results from any saved chart via chart ID.
`GET https://amplitude.com/api/3/chart/chart_id/csv`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/3/chart/:chart_id/csv' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/3/chart/:chart_id/csv HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

### Path variables

|Name|Description|
|----|-----------|
|`chart_id`| <span class="required">Required</span>. The chart's ID. Get the chart ID from the chart's URL in the web app. For example, 'abc123' in this URL: https://analytics.amplitude.com/demo/chart/**abc123**.|

### Response

Responses vary based on the chart's type.

## Get active and new user counts

Get the number of active or new users.

`GET https://amplitude.com/api/2/users`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/users?start=STARTDATE&end=ENDDATE' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/users?start=20210101&end=20210901&m=active&i=30&g=city HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Get active users for a period, counted in an interval"}}
Retrieves active users between January 1, 2021 and September 1, 2021.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/2/users?start=20210101&end=20210901&m=active'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/users?start=20210101&end=20210901&m=active HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Get active users for a period, segmented by a property, counted in an interval"}}
Retrieves active users in Amsterdam between January 1 2021 and September 1 2021, counted monthly. 

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location -g --request GET 'https://amplitude.com/api/2/users?start=20210101&end=20210901&m=active&i=30&s=[{"prop":"city","op": "is","values": ["Amsterdam"]}]'            
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/users?start=20210101&end=20210901&m=active&i=30&s=[{"prop":"city","op": "is","values": ["Amsterdam"]}] HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

### Query parameters

|Name|Description|
|-----|----------|
|`start`| <span class="required">Required</span>. First date included in data series, formatted YYYYMMDD. For example, "20221001".|
|`end`| <span class="required">Required</span>. Last date included in data series, formatted YYYYMMDD. For example, "20221001".|
|`m`| <span class="optional">Optional</span>. Either "new" or "active" to get the desired count. Defaults to "active".|
|`i`| <span class="optional">Optional</span>. Either 1, 7, or 30 for daily, weekly, and monthly counts, respectively. Defaults to 1.|
|`s`| <span class="optional">Optional</span>. Segment definitions. Defaults to none. Defined in [Shared query parameters](#shared-query-parameters).|
|`g`| <span class="optional">Optional</span>. The property to group by. Defaults to none. Defined in [Shared query parameters](#shared-query-parameters) |

### Response

The response is a JSON object with this schema:

| <div class="big-column">Attribute</div> | Description |
| --- | --- |
| `series` | An array with one element for each group, in the same order as "seriesMeta", where each element is itself an array that has the value of the metric on each of the days specified in `xValues`. |
| `seriesMeta` | An array of labels with one for each segment. |
| `xValues` | An array of (string) dates in the form "YYYY-MM-DD", one for each date in the specified range. |

```json
{
    "data": {
        "series": [ 
            [46109, 47542],
            [42845, 42626]
        ],
        "seriesMeta": ["United States", "Canada"],
        "xValues": ["2017-08-14", "2017-08-15"]
    }
}
```

## Get session length distribution

Get the number of sessions for each pre-defined length ("bucket") period during a specified date range.

`GET https://amplitude.com/api/2/sessions/length`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/sessions/length?start=STARTDATE&end=ENDDATE'
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/sessions/length?start=20210426&end=20210905 HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} # credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Get session length distribution with a custom bin for a period"}}
Retrieves session length distribution from 0-10 minutes for the period between April 26 and September 5.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/sessions/length?start=20210426&end=20210905&timeHistogramConfigBinTimeUnit=minutes&timeHistogramConfigBinMin=0&timeHistogramConfigBinMax=10'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/sessions/length?start=20210426&end=20210905&timeHistogramConfigBinTimeUnit=minutes&timeHistogramConfigBinMin=0&timeHistogramConfigBinMax=10 HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Get session length distribution by hours with a custom bin size for period"}}
Retrieves session length distribution with 0 - 10 hours with bucket size 2 for the period between April 26 and September 5. 

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/sessions/length?start=20210426&end=20210905&timeHistogramConfigBinTimeUnit=days&timeHistogramConfigBinMin=0&timeHistogramConfigBinMax=10&timeHistogramConfigBinSize=1'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/sessions/length?start=20210426&end=20210905&timeHistogramConfigBinTimeUnit=days&timeHistogramConfigBinMin=0&timeHistogramConfigBinMax=10&timeHistogramConfigBinSize=1 HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

### Query parameters

### Query parameters

|<div class="big-column">Name</div>| Description|
|-------|----------|
|`start`| <span class="required">Required</span>. First date included in data series, formatted YYYYMMDD. For example,"20221001".|
|`end`|<span class="required">Required</span>. Last date included in data series, formatted YYYYMMDD. For example,"20221001".|
|`timeHistogramConfigBinTimeUnit`| <span class="optional">Optional</span>. Time unit for bucket sizes (see below for valid inputs).|
|`timeHistogramConfigBinMin`|<span class="optional">Optional</span>. Minimum value for bucketing, as a number. For example, "0".|
|`timeHistogramConfigBinMax`|<span class="optional">Optional</span>. Maximum value for bucketing, as a number. For example, "600".|
|`timeHistogramConfigBinSize`| <span class="optional">Optional</span>. Size of each bucket, as a number. For example, "60".|

### timeHistogramConfigBin format

`timeHistogramConfigBinTimeUnit` is any of `['hours', 'minutes', 'seconds']`.

To take advantage of custom binning, you must specify `timeHistogramConfigBinMin`, `timeHistogramConfigBinMax`, and `timeHistogramConfigBinTimeUnit`. When `timeHistogramConfigBinSize` isn't specified, Amplitude tries to find the best bin sizing. For example, if you have `timeHistogramConfigBinMin=0`, `timeHistogramConfigBinMax=10`, and `timeHistogramConfigBinTimeUnit=minutes`, there is no guarantee for the final number of bins or bin bounds. If `timeHistogramConfigBinSize=1` is specified, then there are 10 bins, and each bin size equals a minute.

When combined `timeHistogramConfigBin` parameters are invalid or missing, Amplitude defaults to default bins that account for certain behaviors such as bounce rate. These bins are (in milliseconds): `[0, 3000), [3000, 10,000), [10,000, 30,000), [30,000, 60,000), [60,000, 180,000), [180,000, 600,000), [600,000, 1,800,000), [1,800,000, 3,600,000), [3,600,000, 86,400,000)`.

Session lengths have a max length of 1 day (86,400,000 ms).

### Response

The response is a JSON object with this schema:

| <div class="big-column">Attribute</div> | Description |
| --- | --- |
| `series` | An array with one element which is itself an array that includes the counts (number of sessions) for each of the buckets. |
| `xValues` | An array of the (string) session length intervals (buckets) of the format `[bucketStartInSeconds]s-[bucketEndInSeconds]s`. |

```json
{
   "data": {
        "series": [ 
             [0, 120408, 2261, 6984, 10778, 54529, 210614, 336605, 196235, 54148] 
        ],
        "xValues": ["0s-60s", "60s-120s", "120s-180s", "180s-240s", "240s-300s", "300s-360s", "360s-420s", "420s-480s", "480s-540s", "540s-600s"]
    }
}
```

## Get average session length

`GET https://amplitude.com/api/2/sessions/average`

Get the average session length (in seconds) for each day in the specified date range.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/sessions/average?start=20210601&end=20210630' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/sessions/average?start=20210601&end=20210630 HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

### Query parameters

|Name|Description|
|-----|----------|
|`start`| <span class="required">Required</span>. First date included in data series, formatted YYYYMMDD (for example "20221001").|
|`end`| <span class="required">Required</span>. Last date included in data series, formatted YYYYMMDD (for example "20221004").|

### Response

Returns a JSON object with this schema:

| Attribute | Description |
| --- | --- |
| `series` | An array with one element which is itself an array that includes the average session length for each day. |
| `seriesMeta` | An array of labels with one for each segment. |
| `segmentIndex` | This represents the index of the segment, referring to its position in the right module of the chart control panel. |
| `xValues` | An array of (string) dates formatted like "YYYY-MM-DD" with one for each in the specified date range. |

```json
{
    "data": {
        "series": [
            [1204.0238276716443, 1197.4160169086904],
        ],
        "seriesMeta": [
            {"segmentIndex": 0}
        ],
        "xValues": ["2017-08-14", "2017-08-15"]
    }
}
```

## Get average sessions per user

`GET https://amplitude.com/api/2/sessions/peruser`

Get the average number of sessions per user on each day in the specified date range.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/sessions/peruser?start=&end=' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/sessions/average?start=20210601&end=20210630
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key}
```
{{/partial:tab}}
{{/partial:tabs}}

### Query parameters

|Name|Description|
|-----|----------|
|`start`| <span class="required">Required</span>. First date included in data series, formatted YYYYMMDD (for example "20221001").|
|`end`| <span class="required">Required</span>. Last date included in data series, formatted YYYYMMDD (for example "20221004").|

### Response

Returns a JSON object with this schema:

| <div class="big-column">Attribute</div> | Description |
| --- | --- |
| `series` | An array with one element which is itself an array that includes the (float) average number of sessions per user for each day. |
| `seriesMeta` | An array of labels with one for each segment. |
| `segmentIndex` | This represents the index of the segment, referring to its position in the right module of the chart control panel |
| `xValues` | An array of (string) dates formatted like "YYYY-MM-DD" with one for each in the specified date range |

```json
{
    "data": {
        "series": [
            [3.624536794878406, 3.6232302614435854]
        ], 
        "seriesMeta": [
            {"segmentIndex": 0}
        ], 
        "xValues": ["2017-08-14", "2017-08-15"]
    }
}
```

## User composition

Get the distribution of users across values of a user property in the specified date range.

`GET https://amplitude.com/api/2/composition`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/composition?start=STARTDATE&end=ENDDATE&p=PROPERTY' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/composition?start=STARTDATE&end=ENDDATE&p=property HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} # credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Get user composition by property for a period of time"}}
Retrieves user composition by platform between June 1 and June 30. 

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/2/composition?start=20210601&end=20210630&p=platform'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/composition?start=20210601&end=20210630&p=platform HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=

```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Get user composition by custom property event for a period"}}
Retrieves user composition by custom property event between June 1 and June 30. 

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/2/composition?start=20210601&end=20210630&p=gp:event'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/composition?start=20210601&end=20210630&p=gp:event HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

### Query parameters

|Name|Description|
|----|-----------|
|`start`| <span class="required">Required</span>. First date included in data series, formatted YYYYMMDD. For example, "20221001".|
|`end`|<span class="required">Required</span>. Last date included in data series, formatted YYYYMMDD.  For example, "20221001".|
|`p`| <span class="required">Required</span>. The property to get the composition of. For built-in Amplitude properties, valid values are `version`, `country`, `city`, `region`, `DMA`, `language`, `platform`, `os`, `device`, `start_version`, and `paying`. For custom-defined user properties, format the key as gp:name.|

### Response

Returns a JSON object with this schema:

| <div class="big-column">Attribute</div> | Description |
| --- | --- |
| `series` | A one-element array which is the number of unique users who had the corresponding property value in the specified date range. |
| `seriesLabels` | The field that displays what user property the chart is looking at. |
| `xValues` | An array of values the chosen property can take on. |

```json
{ 
    "data": {
        "series": [
            [69643, 47419, 38087, 19064]
        ], 
        "seriesLabels": ["version"], 
        "xValues": ["1.0", "(none)", "1.1", "0.2"]
     }
}
```

## Get events list

Get the list of events with the current week's totals, uniques, and % DAU (daily active users).

{{partial:admonition type="note" heading=""}}
This endpoint returns events that are visible. Hidden events aren't returned by the API.
{{/partial:admonition}}

`GET https://amplitude.com/api/2/events/list`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/events/list' \
-u '{api-key}:{secret-key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/events/list HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

### Response

Returns a JSON object with this schema:

| <div class="big-column">Attribute</div> | Description |
| --- | --- |
| `non_active` | If the event is marked inactive or not. |
| `value` | Name of the event in the raw data. |
| `totals` | The total number of times the event has happened this week. |
| `deleted` | If the event is deleted or not. |
| `flow_hidden` | If the event is hidden from Pathfinder/Pathfinder Users or not. |
| `hidden` | If the event is hidden or not. |
| `display` | The display name of the event. |

```json
{
    "data": [
        {
            "non_active": false, 
            "value": "Add Content to Cart", 
            "totals": 1505645, 
            "deleted": false, 
            "flow_hidden": false, 
            "hidden": false, 
            "display": "Add Content to Cart"
        }, 
        {
            "non_active": false, 
            "value": "Add Friends", 
            "totals": 193167, 
            "deleted": false,
            "flow_hidden": false, 
            "hidden": false, 
            "display": "Add Friends"
        }
    ]
    ...
}
```

## Event segmentation

Get metrics for an event with segmentation.


{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/2/events/segmentation?e={"event_type":"YOUR%20EVENT"}&start=STARTDATE&end=DATE' \
-u '{api-key}:{secret-key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/events/segmentation?e={"event_type":"YOUR%20EVENT"}&start=STARTDATE&end=ENDDATE HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="tip" heading=""}}
You may need to URL encode special characters in the names of event types, event properties, and user properties. For example, encode Play Song as `Play%20Song`.
{{/partial:admonition}}

{{partial:collapse name="Example: Get any active event for a period"}}
Retrieves metrics for any active event between August 1 and August 31. 

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location -g --request GET 'https://amplitude.com/api/2/events/segmentation?e={"event_type":"_active"}&start=20210801&end=20210831'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/events/segmentation?e={"event_type":"_active"}&start=20210801&end=20210831 HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Get two events for a period"}}
Retrieves metrics for the "watch_tutorial" and "transaction" events between August 1 and August 31. 

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location -g --request GET 'https://amplitude.com/api/2/events/segmentation?e={"event_type":"watch_tutorial"}&start=20210801&end=20210802&e2={"event_type":"transaction"}'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/events/segmentation?e={"event_type":"watch_tutorial"}&start=20210801&end=20210831&e2={"event_type":"transaction"} HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Get a custom event for a period"}}
Retrieves metrics for the "My Custom Event" event between August 1 and August 31. 

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location -g --request GET 'https://amplitude.com/api/2/events/segmentation?e={"event_type":"ce:My%20Custom%20Event"}&start=20210801&end=20210831'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/events/segmentation?e={"event_type":"ce:My%20Custom%20Event"}&start=20210801&end=20210831 HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Get event totals for a period"}}
Retrieves totals for the "watch_tutorial" event between August 1 and August 31. 

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location -g --request GET 'https://amplitude.com/api/2/events/segmentation?e={"event_type":"watch_tutorial"}&start=20210801&end=20210831&m=totals'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/events/segmentation?e={"event_type":"watch_tutorial"}&start=20210801&end=20210831&m=totals HTTP/1.1  
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Get event Active % for a period"}}
Retrieves daily active user (DAU) percentage for the "watch_tutorial" event between August 1 and August 31. 

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location -g --request GET 'https://amplitude.com/api/2/events/segmentation?e={"event_type":"watch_tutorial"}&start=20210801&end=20210831&m=pct_dau'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/events/segmentation?e={"event_type":"watch_tutorial"}&start=20210801&end=20210831&m=pct_dau HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

### Query parameters

| <div class="big-column"> Name</div> | Description                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `e`                                 | <span class="required">Required</span>. Include up to two. A full event. [Full description](#event-format). The Dashboard REST API supports segmentation by up to two events. If you wish to query on a second event, use the parameter `e2`.                                                                                                                                                        |
| `m`                                 | <span class="optional">Optional</span>. Non-property metrics: `uniques`, `totals`, `pct_dau`, or `average`. Defaults to `uniques`. Property metrics: `histogram`, `sums`, or `value_avg`.  To use property metrics, you must include a valid group by value  in parameter `e`.  *For custom formulas: "formula" (This metric only supports up to two events currently and the second event needs to have the parameter "e2").* |
| `n`                                 | <span class="optional">Optional</span>. User type, either `any` or `active`.                                                                                                                                                                                                                                                                                                                                                         |
| `start`                             | <span class="required">Required</span>. First date included in data series, formatted YYYYMMDD. For example, "20221001".                                                                                                                                                                                                                                                                                                             |
| `end`                               | <span class="required">Required</span>. Last date included in data series, formatted YYYYMMDD. For example, "20221001".                                                                                                                                                                                                                                                                                                              |
| `i`                                 | Set to -300000, -3600000, 1, 7, or 30 for real-time, hourly, daily, weekly, and monthly counts, respectively. Defaults to 1. Real-time segmentation displays up to 2 days of data, hourly segmentation displays up to 7 days of data, and daily displays up to 365 days of data.                                                                                                                                                     |
| `s`                                 | <span class="optional">Optional</span>. Segment definitions (default: none). [Full description](#shared-query-parameters).                                                                                                                                                                                                                                                                                                           |
| `g`                                 | <span class="optional">Optional</span>. Include up to two. The name of the property to group by. Defaults to none. For non-Amplitude, custom user properties, prepend the user property name with `gp:`. For example, `country` or `gp:utm_campaign`. The Dashboard REST API supports grouping by up to two properties. To query on a second property, use the parameter `g2`.                                                                                                                                                                                                                                                                                            |
| `limit`                             | <span class="optional">Optional</span>. The number of Group By values returned (default: 100). The limit is 1000.                                                                                                                                                                                                                                                                                                                    |
| `formula`                           | Optional, but required if `m` is set to `formula`. If you are using the custom formula metric, you need to pass in the formula here (for example, `UNIQUES(A)/UNIQUES(B)`).                                                                                                                                                                                                                                                          |
| `rollingWindow`                     | Required to use a rolling window. To include a rolling window, pass in the number of days/weeks/months with which to compute a rolling window over.                                                                                                                                                                                                                                                                                  |
| `rollingAverage`                    | Required to use a rolling average. To include a rolling average, pass in the number of days/weeks/months with which to compute a rolling average over.                                                                                                                                                                                                                                                                               |

### Response

| <div class="big-column">Attribute</div> | Description |
| --- | --- |
| `series` | An array with one element for each group, in the same order as "seriesLabels", where each element is itself an array that includes the value of the metric on each of the days specified in "xValues". |
| `seriesLabels` | An array of labels, one for each group. |
| `seriesCollapsed` | An array with one element for each group, in the same order as "seriesLabels", where each element is the value of the bar chart visualization in Event Segmentation. This value is the total unique users over a certain time interval. |
| `xValues` | An array of (string) dates in the form "YYYY-MM-DD", one for each date in the specified range. |

```json 
{
    "data": {
        "series": [ 
            [273333], [190351]
        ],
        "seriesLabels": ["United States", "Germany"],
        "seriesCollapsed": [
            [
                {"value": 273333}
            ],
            [
                {"value": 190351}
            ],
        "xValues": ["2014-10-01", "2014-10-02"]
    }
}
```

## Funnel analysis

Get funnel drop-off and conversion rates.

`GET https://amplitude.com/api/2/funnels`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location -g --request GET 'https://amplitude.com/api/2/funnels?e={"event_type":"EVENT_1"}&e={"event_type":"EVENT_2"}&start=STARTDATE&end=ENDDATE'
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/funnels?e={"event_type":"EVENT"}&e={"event_type":"EVENT"}&e={"event_type":"EVENT"}&start=STARTDATE&end=ENDDATE HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Get event funnel for a series of events in a period, in any order with a specific conversion time"}}
Retrieves Event funnel for "event_one" -> "event_two" -> "event_three" between August 1 to September 26 in ANY ORDER with 3 second conversion time.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location -g --request GET 'https://amplitude.com/api/2/funnels?e={"event_type":"event_one"}&e={"event_type":"event_two"}&e={"event_type":"event_three"}&start=20210801&end=20210926&mode=unordered&cs=3&limit=100'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/funnels?e={"event_type":"event_one"}&e={"event_type":"event_two"}&e={"event_type":"event_three"}&start=20210801&end=20210926&mode=unordered&cs=3&limit=100 HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Get event funnel for a series of events in a period, in a specific order grouped by a property"}}
Retrieves event funnel for "event_one" -> "event_two" between August 1 to September 26 in THIS ORDER for new users where city is none grouped by custom event property called 'event'.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location -g --request GET 'https://amplitude.com/api/2/funnels?e={"event_type":"event_one"}&e={"event_type":"event_two"}&start=20210801&end=20210926&mode=unordered&n=new&s=[{"prop":"city","op": "is","values": ["(none)"]}]&g=gp:event'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/funnels?e={"event_type":"event_one"}&e={"event_type":"event_two"}&start=20210801&end=20210926&mode=unordered&n=new&s=[{"prop":"city","op": "is","values": ["(none)"]}]&g=gp:event HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Get event funnel for a series of events in a period, in a specific order, filtered by property, grouped by property"}}
Retrieve event funnel for "event_one" -> "event_two" between August 1 and September 26 in THIS ORDER for new users where city is none, grouped by library.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location -g --request GET 'https://amplitude.com/api/2/funnels?e={"event_type":"event_one"}&e={"event_type":"event_two"}&start=20210801&end=20210926&mode=unordered&n=new&s=[{"prop":"city","op": "is","values": ["(none)"]}]&g=library'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/funnels?e={"event_type":"event_one"}&e={"event_type":"event_two"}&start=20210801&end=20210926&mode=unordered&n=new&s=[{"prop":"city","op": "is","values": ["(none)"]}]&g=library HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Get event funnel for four events in a period"}}
Get Event funnel for "event_one" -> "event_two" -> "event_three" -> "event_four" between August 1 and September 26 in ANY ORDER.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location -g --request GET 'https://amplitude.com/api/2/funnels?e={"event_type":"event_one"}&e={"event_type":"event_two"}&e={"event_type":"event_three"}&e={"event_type":"event_four"}&start=20210801&end=20210926&mode=unordered'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/funnels?e={"event_type":"event_one"}&e={"event_type":"event_two"}&e={"event_type":"event_three"}&e={"event_type":"event_four"}&start=20210801&end=20210926&mode=unordered HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Get event funnel for four events in a period, for new users, unordered"}}
Get Event funnel for "event_one" -> "event_two" -> "event_three" -> "event_four" between August 1 and September 26 in ANY ORDER, for new users.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location -g --request GET 'https://amplitude.com/api/2/funnels?e={"event_type":"event_one"}&e={"event_type":"event_two"}&e={"event_type":"event_three"}&e={"event_type":"event_four"}&start=20210801&end=20210926&mode=unordered'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/funnels?e={"event_type":"event_one"}&e={"event_type":"event_two"}&start=20210801&end=20210926&mode=unordered&n=new&e={"event_type":"event_four"} HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Get event funnel for four events in a period, for new users, ordered"}}
Get Event funnel for "event_one" -> "event_two" -> "event_three" -> "event_four" between August 1 and September 26 in THIS ORDER, for new users.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location -g --request GET 'https://amplitude.com/api/2/funnels?e={"event_type":"event_one"}&e={"event_type":"event_two"}&e={"event_type":"event_three"}&e={"event_type":"event_four"}&start=20210801&end=20210926&mode=ordered'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/funnels?e={"event_type":"event_one"}&e={"event_type":"event_two"}&start=20210801&end=20210926&mode=ordered&n=new&e={"event_type":"event_four"} HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA==
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

### Query parameters

|Name|Description|
|----|--------|
|`e`| <span class="required">Required</span>. A full event for each step in the funnel. [Full description](#event-format)
|`start`| <span class="required">Required</span>. First date included in data series, formatted YYYYMMDD. For example, `20221001`.|
|`end`|<span class="required">Required</span>. Last date included in data series, formatted YYYYMMDD. For example, `20221001`.|
|`mode`|<span class="optional">Optional</span>. What mode to run the funnel in: `ordered` for events in the given order, `unordered` for events in any order, and `sequential` for events in the given order with no other events between. Defaults to `ordered`.|
|`n`| <span class="optional">Optional</span>. Either "new" or "active" to specify what set of users to consider in the funnel. Defaults to `active`.|
| `i` | Set to -300000, -3600000, 1, 7, or 30 for real-time, hourly, daily, weekly, and monthly counts, respectively. Defaults to 1. Real-time segmentation displays up to 2 days of data, hourly segmentation displays up to 7 days of data, and daily displays up to 365 days of data. |
|`s`| <span class="optional">Optional</span>. Segment definitions. Defaults to none. [Full description](#shared-query-parameters). |
|`g`| <span class="optional">Optional</span>. Limit: one. The name of the property to group by. Defaults to none. For non-Amplitude, custom user properties, prepend the user property name with gp:. For example, `country` or `gp:utm_campaign`.|
|`cs`| <span class="optional">Optional</span>. The conversion window in seconds. Defaults to 2,592,000 (30 days). Conversion windows are automatically rounded down to the nearest day in "unordered" mode.|
|`limit`| <span class="optional">Optional</span>. The number of Group By values returned Defaults to 100. The maximum is 1000.|

### Response

The response includes an array with one element per group. Each element has these fields:

| <div class="big-column">Attribute</div> | Description |
| --- | --- |
| `meta` | An array of labels with one for each segment.  <br>  <br>**segmentIndex** This represents the index of the segment, referring to its position in the right module of the chart control panel. |
| `stepTransTimeDistribution` | The histogram data of each step for how long it took users to convert through that step |
| `stepPrevStepCountDistribution` | The histogram data for each step for how many times users performed the previous step. |
| `bins` | Data for one histogram bucket. start and end are the start/end of the histogram bin, the data in `bin_dist` is the users/count/propsum for that histogram bin. |
| `dayMedianTransTimes` | Median transition times by day between steps. |
| `series` | An array with one element for each group, where each element is itself an array that includes the median transition time between steps in milliseconds on each of the days specified in "xValues".  <br>  <br>**xValues:** An array of (string) dates in the form "YYYY-MM-DD", one for each date in the specified range. **formattedXValues:** An array of (string) dates in the form of "Month DD", one for each date in the specified range. |
| `dayAvgTransTimes` | Average transition times by day between steps.  <br>  <br>**series** An array with one element for each group, where each element is itself an array that includes the average transition time between steps in milliseconds on each of the intervals specified in "xValues".  <br>**xValues** An array of (string) dates in the form "YYYY-MM-DD", one for each date in the specified range.  <br>**formattedXValues** An array of (string) dates in the form of "Month DD", one for each date in the specified range. |
| `stepByStep` | An array with one element for each step of the funnel, indicating the fraction of users from the previous step who completed that step. |
| `medianTransTimes` | An array with one element for each step of the funnel, indicating the median transition time between steps in milliseconds. |
| `cumulative` | An array with one element for each step of the funnel, indicating the fraction of the total users who completed that step. |
| `cumulativeRaw` | An array with one element for each step of the funnel, indicating the number of users who completed that step. |
| `avgTransTimes` | An array with one element for each step of the funnel, indicating the average transition time between steps in milliseconds. |
| `dayFunnels` | Represents the number of users who completed each step of the funnel by day.  <br>  <br>**series** An array with one element for each group, where each element is itself an array that includes the number of users who have completed that step in the funnel on each of the intervals specified in "xValues."  <br>**xValues** An array of (string) dates in the form of "YYYY-MM-DD", one for each date in the specified range.  <br>**formattedXValues** An array of (string) dates in the form of "Month DD", one for each date in the specified range |
| `events` | Labels for each event in the funnel |

```json
{
    "data": [
        {
            "meta": {"segmentIndex": 0},
            "dayMedianTransTimes": {
                "series": [
                    [0, 165548, 264380], [0, 164767, 269444]
                ],
                "xValues": ["2017-08-14", "2017-08-15"],
                "formattedXValues": ["Aug 14", "Aug 15"]
            },
            "dayAvgTransTimes": {
                "series": [
                    [0, 2294365, 5730478], [0, 2268879, 5700436]
                ],
                "xValues": ["2017-08-14", "2017-08-15"],
                "formattedXValues": ["Aug 14", "Aug 15"]
            },
            "stepByStep": [1.0, 0.9915120144246691, 0.9741139357951383],
            "medianTransTimes": [0, 166444, 270194],
            "cumulative": [1.0, 0.9915120144246691, 0.9658456707593803],
            "cumulativeRaw": [163054, 161670, 157485],
            "avgTransTimes": [0, 2175406, 5607243], 
            "dayFunnels": {
                "series": [
                    [125259, 123716, 118636], [126964, 125373, 119986]
                ],
                "xValues": ["2017-08-14", "2017-08-15"],
                "formattedXValues": ["Aug 14", "Aug 15"]
            },
            "events": ["Search Song or Video", "Select Song or Video", "Play Song or Video"]
        } 
    ]
}
```

## Retention analysis

Get user retention for specific starting and returning actions.

`GET https://amplitude.com/api/2/retention`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/retention?se={"event_type":"STARTEVENT"}&re={"event_type":"RETURNEVENT"}&start=STARTDATE&end=ENDDATE' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/retention?se={"event_type":"_active"}&re={"event_type":"EVENT"}&start=STARTDATE&end=ENDDATE 
HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Get unbounded retention for active event with another event return for a period"}}
Retrieves unbounded Retention for Any Active Event with "watch_tutorial" return between August 1 and August 31.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location -g --request GET 'http://amplitude.com/api/2/retention?se={"event_type":"_active"}&re={"event_type":"watch_tutorial"}&start=20210801&end=20210831&rm=rolling'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/retention?se={"event_type":"_active"}&re={"event_type":"watch_tutorial"}&start=20210801&end=20210831&rm=rolling HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Get weekly N-day retention for active event with another event return for a period"}}
Retrieves weekly N-day retention for any active event with "watch_tutorial" return between July 26 and September 5.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location -g --request GET 'http://amplitude.com/api/2/retention?se={"event_type":"_active"}&re={"event_type":"watch_tutorial"}&start=20210726&end=20210905&i=7'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/retention?se={"event_type":"_active"}&re={"event_type":"watch_tutorial"}&start=20210726&end=20210905&i=7 HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: "}}
Get monthly N-day retention for active event with another event return for a period

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location -g --request GET 'http://amplitude.com/api/2/retention?se={"event_type":"_active"}&re={"event_type":"watch_tutorial"}&start=20210726&end=20210905&i=30'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/retention?se={"event_type":"_active"}&re={"event_type":"watch_tutorial"}&start=20210726&end=20210905&i=30 HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

### Query parameters

| Parameter | Description |
| --- | --- |
| `se` | <span class="required">Required</span>. Full event for the start action. Supports two `event_type` values: `_new` for new users, and `_active` for all users. |
| `re` | <span class="required">Required</span>. Full event for the returning action. Supports one `event_type` value: `_all` for all events and `_active` for all active events. |
| `start` | <span class="required">Required</span>. First date included in data series, formatted YYYYMMDD. For example, "20221001". |
| `end` | <span class="required">Required</span>. Last date included in data series, formatted YYYYMMDD. For example, "20221001". |
| `rm` | <span class="optional">Optional</span>. The retention type: bracket, rolling, or n-day. Note that rolling implies unbounded retention. Defaults to n-day, no need to call it explicitly. |
| `rb`  | Optional, but required if `rm` is set to bracket. The days within each bracket, formatted [[0,4]]. For example, if your bracket was Day 0 - Day 4, the parameter value would be [[0,5]]. |
| `i` | <span class="optional">Optional</span>. Either 1, 7, or 30 for daily, weekly, and monthly counts, respectively. Defaults to 1. |
| `s` | <span class="optional">Optional</span>. Segment definitions. Defaults to none. [Full description](#segment-definition). |
| `g` | <span class="optional">Optional</span>. Limit: one. The name of the property to group by. Defaults to none. For non-Amplitude, custom user properties, prepend the user property name with gp:. For example, `country` or `gp:utm_campaign`. |

### Response

| <div class="big-column">Attribute</div> | Description |
| --- | --- |
| `series` | A JSON object containing two keys.  <br>  <br>**dates** - An array of formatted string dates, one for each date in the specified range (in descending order).  <br>**values** - A JSON object with one key for each date, where each value is an array whose n-th element corresponds to the retention for n intervals (days, weeks, or months depending on i) out. This is by each interval. |
| `count` | The number of users retained in that interval. |
| `outof` | The total number of users in the cohort (users who performed the starting action on the date), respectively. |
| `incomplete` | Whether users in that date have had enough time to be retained. |
| `combined` | A JSON object where each value is an array whose n-th element corresponds to the retention for n intervals (days, weeks, or months depending on i) out. This object is the deduplicated aggregate of all date cohorts from the values JSON object. |
| `seriesMeta` | An array of labels with one for each segment. |
| `segmentIndex` | This represents the index of the segment, referring to its position in the right module of the chart control panel. |
| `eventIndex` | This represents the index of the event, referring to which event if you have many return events selected in the left module. |

```json
{
    "data": {
        "series": [
            {
                "dates": ["Aug 15", "Aug 14"],
                "values": {
                    "Aug 14": [
                        {"count": 12864, "outof": 12864, "incomplete": false}, {"count": 9061, "outof": 12864, "incomplete": false}, ..., {"count": 1561, "outof": 12864, "incomplete": true}
                    ],
                    "Aug 15": [
                        {"count": 14720, "outof": 14720, "incomplete": false}, {"count": 10249, "outof": 14720, "incomplete": false}, ..., {"count": 1773, "outof": 14720, "incomplete": true}
                    ],
                },
                "combined": [
                    {"count": 27584, "outof": 27584, "retainedSetId": null, "incomplete": false},
                    {"count": 19310, "outof": 27584, "retainedSetId": null, "incomplete": false},
                    ...
                    {"count": 1561, "outof": 12864, "retainedSetId": null, "incomplete": true}
                ]
            },
        "seriesMeta": [
            {"segmentIndex": 0, "eventIndex": 0}
            ]
        ]
    } 
}
```

## User activity

Get a user summary and their most (or least) recent events. Exceeding the request limits results in 429 errors.

`GET https://amplitude.com/api/2/useractivity`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/2/useractivity?user={amplitude_id}'
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/useractivity?user=247246881751 HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Get events for user with ID 123"}}
{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/2/useractivity?user=123'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/useractivity?user=123 HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Get most recent two events for user with ID 123"}}
Limits are indexed from 0, so notice that the request has a limit of `1` to return the two most recent events.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/2/useractivity?user=123&limit=1' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/useractivity?user=123&limit=1 HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

### Query parameters

| Name | Description |
| --- | --- |
| `user` | <span class="required">Required</span>. Amplitude ID of the user. |
| `offset`  | <span class="optional">Optional</span>. Zero-indexed (from most recent event) offset to start returning events from. |
| `limit` | <span class="optional">Optional</span>. Number of events to return (up to 1000). Note that more events may be returned so that there are no partial sessions. Defaults to 1000. |
| `direction` | <span class="optional">Optional</span>. "earliest" to include the user's earliest event or "latest" to includes the most recent. Defaults to "latest". |

### Response

The response is a JSON object with this schema:

| Attribute | Description |
| --- | --- |
| `events` | An array of JSON objects, one for each event performed by the user. |
| `userData` | Total statistics about the user and their user properties. |


```json
{
    "userData": {
        "user_id": "myusername",
        "canonical_amplitude_id": 12345,
        "merged_amplitude_ids": [11111, 22222],
        "num_events": 142,
        "num_sessions": 23,
        "usage_time": 2570259,
        "first_used": "2015-03-14",
        "last_used": "2015-04-22",
        "purchases": 2,
        "revenue": 9.98,
        "platform": "iOS",
        "os": "ios 8.2",
        "version": "3.4.9",
        "device": "Apple iPhone",
        "device_type": "Apple iPhone 6",
        "carrier": "AT&T",
        "country": "United States",
        "region": "California",
        "city": "San Francisco",
        "dma": "San Francisco-Oakland-San Jose, CA",
        "language": "English",
        "start_version": "1.2.3",
        "device_ids": ["some-device", "some-other-device"],
        "last_location": {
            "lat": 37.133,
            "lng": -122.241
        },
        "properties": {
            "gender": "female"
        }
    },
    "events": [...]
}
```

## User search

Search for a user with a specified Amplitude ID, device ID, user ID, or user ID prefix. Exceeding the request limits results in 429 errors.

`GET https://amplitude.com/api/2/usersearch`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/2/usersearch?user=USER_ID' \
-u '{api-key}:{secret-key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/usersearch?user=user_id HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Search for user by device ID"}}
Search for user with the device ID `0786zXEdyOX1rS3M-P_m1d`.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/2/usersearch?user=0786zXEdyOX1rS3M-P_m1d'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/usersearch?user=0786zXEdyOX1rS3M-P_m1d HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Search for user by Amplitude ID"}}
Search for the user with Amplitude ID `356893043036`.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/2/usersearch?user=356893043036'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='=
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/usersearch?user=356893043036 HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

### Query parameters

|Name|Description|
|----|-----------|
|`user`|<span class="required">Required</span>. Amplitude ID, Device ID, User ID, or User ID prefix.|

### Response

| Attribute | Description |
| --- | --- |
| `matches` | An array of JSON objects, one for each matching user containing their Amplitude ID and User ID. |
| `type` | Which match type (Amplitude ID, Device ID, User ID, User ID prefix) yielded the result. |

```json
{
    "matches": [
        {
            "user_id": "myusername",
            "amplitude_id": 12345
        }
    ],
    "type": "match_user_or_device_id"
}
```

If there are no matches, the response returns a 200 response with the following body:

```json
{
    "type": "nomatch",
    "matches": []
}
```

## Real-time active users

Get active user numbers with 5-minute granularity for the last two days.

`GET https://amplitude.com/api/2/realtime`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/2/realtime' \
-u '{api-key}:{secret-key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/realtime?i=5 HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

### Response

Returns a JSON object with this schema:

| <div class="big-column">Attribute</div> | Description |
| --- | --- |
| `xValues` | An array of (string) times in the form "HH:mm", one for each time interval in a day starting from the current time. |
| `seriesLabels` | An array of two labels: "Today" and "Yesterday". |
| `series` | An array with one element for each group, in the same order as "seriesLabels", where each element is itself an array that includes the value of the metric on each of the days specified in "xValues". |

```json
{
    "data": {
        "xValues": ["15:00", "15:05", "15:10", ... ],
        "seriesLabels": ["Today", "Yesterday"],
        "series": [
            [123, 144, 101, ...],
            [139, 111, 180, ...]
        ]
    }
}
```

## Revenue lifetime value

Get the lifetime value of new users.

`GET https://amplitude.com/api/2/revenue/ltv`

Learn more about the [Revenue LTV chart](/docs/analytics/charts/revenue-ltv/revenue-ltv-track-new-user-monetization).

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/2/revenue/ltv?start=&end=' \
-u '{api-key}:{secret-key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/revenue/ltv?start=STARTDATE&end=ENDDATE HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: LTV aggregated weekly"}}
Requests LTV between December 1 2021 and December 31 2021, aggregated weekly. 

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/2/revenue/ltv?start=20211201&end=20211231&i=7' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/revenue/ltv?start=20211201&end=20211231&i=7 HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: LTV aggregated monthly for new paying users"}}
This example pulls LTV for the year, counted monthly for new paying users. 

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/revenue/ltv?start=20211201&end=20221231&m=3&i=30' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/revenue/ltv?start=20211201&end=20221231&m=3&i=30 HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

### Query parameters

| Parameter | Description |
| --- | --- |
| `m` | <span class="optional">Optional</span>. One of the following metrics: 0 = average revenue per user (ARPU), 1 = average realized revenue per user (ARPPU), 2 = Total Revenue, 3 = Paying Users. Defaults to 0. |
| `start` | <span class="required">Required</span>. First date included in data series, formatted YYYYMMDD. For example, "20221001". |
| `end` | <span class="required">Required</span>. Last date included in data series, formatted YYYYMMDD. For example, "20221001".  |
| `i`  | <span class="optional">Optional</span>. Either 1, 7, or 30 for daily, weekly, and monthly counts, respectively. Defaults to 1. |
| `s` | <span class="optional">Optional</span>. Segment definitions. Defaults to none. [Full description](#segment-definition). |
| `g` | <span class="optional">Optional</span>. Limit: one. The name of the property to group by. Defaults to none. For non-Amplitude, custom user properties, prepend the user property name with `gp:`. For example, `country` or `gp:utm_campaign`. |

### Response

Returns a response containing JSON objects with this schema:
<!-- vale Amplitude.Ellipses = NO-->
| <div class="big-column">Attribute</div> | Description |
| --- | --- |
| `seriesLabels` | An array of labels, one for each group. |
| `series` | A JSON object containing two keys.<br>**dates** - An array of formatted string dates, one for each date in the specified range (in descending order). <br>**values** - A JSON object with one key for each date, where each value is a JSON object with keys `r1d`, `r2d`, ..., `r90d` for the n-day metric values, and the keys `count`, `paid`, and `total_amount`, which indicate the total number of users, number of paid users, and amount paid by the users for the group. |
<!-- vale Amplitude.Ellipses = YES-->

```json
{
    "data": {
        "seriesLabels": [""],
        "series": [
            {
                "dates": ["2021-10-04", "2021-10-03", "2021-10-02", "2021-10-01"],
                "values": {
                    "2014-10-01": {
                        "r1d": 9.99,
                        "r2d": 19.98,
                        ...
                        "r90d": 742.52,
                        "count": 110,
                        "paid": 37,
                        "total_amount": 781.39
                    },
                    ...
                }
            }
        ]
    }
}
```
