---
id: f649f2b4-9197-43dd-8935-628a62467838
blueprint: api
title: 'Chart Annotations API'
source: 'https://www.docs.developers.amplitude.com/analytics/apis/chart-annotations-api/'
auth_method: http_basic
standard_endpoint: 'https://amplitude.com/api/2/annotations'
eu_endpoint: 'https://analytics.eu.amplitude.com/api/2/annotations'
postman_link: 'https://www.postman.com/amplitude-dev-docs/workspace/amplitude-developers/folder/20044411-c858ea6d-9201-4acd-b0aa-d78692da1b44?action=share&source=copy-link&creator=29131806&ctx=documentation'
lede: "The Chart Annotations API lets you programmatically annotate important dates like feature releases and marketing campaigns on your organization's charts with a horizontal axis of calendar dates."
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716312268
api_status: ga
summary: "Programmatically annotate important dates like feature releases and marketing campaigns on your organization's charts with a horizontal axis of calendar dates."
---
## Create an annotation

```bash
POST /api/2/annotations?app_id=yourAppID&date=YYYY-MM-DD&label=yourLabel&chart_id=yourChartID&details=yourDetails HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```

### Query parameters

|Parameter|Description|
|----|----|
|`app_id`| <span class="required">Required</span>. Integer. The Project ID of the project your chart belongs to.|
|`date`| <span class="required">Required</span>. Date. Date (YYYY-MM-DD) of the annotation.|
|`label`| <span class="required">Required</span>. String. The title of your annotation.|
|`chart_id`| <span class="optional">Optional</span>. String. The ID of the chart (found in URL) to annotate. If you don't include a `chart_id`, the annotation is global and appears on all charts in the project.|
|`details`|<span class="optional">Optional</span>. String. Details for the annotation.|

### Response

```json
{
        "annotation": 
    {
        "date": "2023-09-16", 
        "details": "Added new user properties.", 
        "id": 50079, 
        "label": "Version 2.4 Release"
        } 
        "success": true
}
```

## Get all chart annotations

Retrieves all chart annotations in your project.

```bash
GET /api/2/annotations HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```

### Response


```json
{
    "data": [
        {
            "id": 160419,
            "date": "2021-09-01",
            "label": "First September",
            "details": "My annotation"
        },
        {
            "id": 160427,
            "date": "2021-09-01",
            "label": "Annotation 2",
            "details": "Another annotation"
        },
        {
            "id": 160507,
            "date": "2021-09-25",
            "label": "Annotation 3",
            "details": "Chart annotation"
        },
        {
            "id": 160508,
            "date": "2021-09-30",
            "label": "Annotation 4",
            "details": "Made another annotation"
        }
    ]
}
```

## Get a single chart annotation

Retrieve a single chart annotation, by ID.

```bash
GET /api/2/annotations?id=CHARTID HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```

### Query parameters

|Name|Description|
|----|-----------|
|`id`|<span class="required">Required</span>. Annotation ID.|

### Response

A successful response returns the chart annotation's data.

```json
{
    "data": [

        {
            "id": 160427,
            "date": "2022-01-31",
            "label": "Chart Annotation 1",
            "details": "This is a chart annotation"
        }
    ]
}
```