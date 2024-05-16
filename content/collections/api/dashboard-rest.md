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
updated_at: 1715898965
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

Different chart types have different costs. For all endpoints not listed here, the cost is 1.
Here are the limits for these endpoints, measured in the cost per query:

- **Concurrent Limit**: Up to 1000 cost at the same time.
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
|`values`| <span class="required">Required</span>. A list of values to filter the segment by. If you are segmenting by a cohort, the value is the cohort ID, found in URL of the cohort in the web app (for example, "5mjbq8w").|

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
`GET https://amplitude.com/api/3/chart/chart_id/query`

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/3/chart/:chart_id/query' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
GET /api/3/chart/:chart_id/query HTTP/1.1
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

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/users?start=STARTDATE&end=ENDDATE' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
GET /api/2/users?start=20210101&end=20210901&m=active&i=30&g=city HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Get active users for a period, counted in an interval"}}
Retrieves active users between January 1, 2021 and September 1, 2021.

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/2/users?start=20210101&end=20210901&m=active'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="Http"}}
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

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```curl
curl --location -g --request GET 'https://amplitude.com/api/2/users?start=20210101&end=20210901&m=active&i=30&s=[{"prop":"city","op": "is","values": ["Amsterdam"]}]'            
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="Http"}}
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

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/sessions/length?start=STARTDATE&end=ENDDATE'
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
GET /api/2/sessions/length?start=20210426&end=20210905 HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} # credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Get session length distribution with a custom bin for a period"}}
Retrieves session length distribution from 0-10 minutes for the period between April 26 and September 5.

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/sessions/length?start=20210426&end=20210905&timeHistogramConfigBinTimeUnit=minutes&timeHistogramConfigBinMin=0&timeHistogramConfigBinMax=10'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="Http"}}
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

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/sessions/length?start=20210426&end=20210905&timeHistogramConfigBinTimeUnit=days&timeHistogramConfigBinMin=0&timeHistogramConfigBinMax=10&timeHistogramConfigBinSize=1'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="Http"}}
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

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/sessions/average?start=20210601&end=20210630' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
GET /api/2/sessions/average?start=20210601&end=20210630 HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

### Query parameters

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

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/sessions/peruser?start=&end=' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="Http"}}
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

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/composition?start=STARTDATE&end=ENDDATE&p=PROPERTY' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
GET /api/2/composition?start=STARTDATE&end=ENDDATE&p=property HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} # credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Get user composition by property for a period of time"}}
Retrieves user composition by platform between June 1 and June 30. 

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/2/composition?start=20210601&end=20210630&p=platform'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="Http"}}
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

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/2/composition?start=20210601&end=20210630&p=gp:event'
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="Http"}}
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