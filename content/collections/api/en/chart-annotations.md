---
id: f649f2b4-9197-43dd-8935-628a62467838
blueprint: api
title: 'Chart Annotations API'
source: 'https://www.docs.developers.amplitude.com/analytics/apis/chart-annotations-api/'
auth_method: http_basic
standard_endpoint: 'https://amplitude.com/api/3/annotations'
eu_endpoint: 'https://analytics.eu.amplitude.com/api/3/annotations'
postman_link: 'https://www.postman.com/amplitude-dev-docs/workspace/amplitude-developers/folder/20044411-c858ea6d-9201-4acd-b0aa-d78692da1b44?action=share&source=copy-link&creator=29131806&ctx=documentation'
lede: "The Chart Annotations API lets you programmatically annotate important dates and time ranges like feature releases and marketing campaigns on your organization's charts. You can organize annotations into categories and use hourly granularity for precise timing."
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716312268
api_status: ga
summary: "Programmatically annotate important dates and time ranges like feature releases and marketing campaigns on your organization's charts. Organize annotations into categories and use hourly granularity for precise timing."
---
## Annotation categories

Manage annotation categories to organize your annotations. Create categories, update their names, and assign them to annotations.

### Create an annotation category

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request POST 'https://amplitude.com/api/3/annotation-categories' \
--header 'Authorization: Basic {api-key}:{secret-key}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "category": "Releases"
}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
POST /api/3/annotation-categories HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
Content-Type: application/json

{
  "category": "Releases"
}
```
{{/partial:tab}}
{{/partial:tabs}}

#### Body parameters

| Parameter  | Description                                                               |
| ---------- | ------------------------------------------------------------------------- |
| `category` | <span class="required">Required</span>. String. The name of the category. |

#### Response

```json
{
   "data": {
      "id": 569,
      "category": "test category api"
     }
}
```

#### Error responses

- `400` - Invalid field
- `409` - Category already exists

### Get all annotation categories

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/3/annotation-categories' \
-u '{api-key}:{secret-key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/3/annotation-categories HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

#### Query parameters

| Parameter  | Description                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `category` | <span class="optional">Optional</span>. String. If specified, returns only the specified category. Otherwise, returns all categories. |

#### Response

```json
{
  "data": [
    {
      "id": 12345,
      "name": "Alerts"
    },
    {
      "id": 6789,
      "name": "Releases"
    }
  ]
}
```

#### Error responses

- `400` - Invalid category
- `404` - Category not found

### Get an annotation category by ID

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/3/annotation-categories/:category_id' \
-u '{api-key}:{secret-key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/3/annotation-categories/:category_id HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

#### Path parameters

| Parameter     | Description                                                              |
| ------------- | ------------------------------------------------------------------------ |
| `category_id` | <span class="required">Required</span>. Integer. The ID of the category. |

#### Response

```json
{
  "data": {
    "id": 12345,
    "name": "Alerts"
  }
}
```

#### Error responses

- `400` - Invalid category ID
- `404` - Category not found

### Update an annotation category

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request PUT 'https://amplitude.com/api/3/annotation-categories/:category_id' \
--header 'Authorization: Basic {api-key}:{secret-key}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "category": "Updated Category Name"
}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
PUT /api/3/annotation-categories/:category_id HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
Content-Type: application/json

{
  "category": "Updated Category Name"
}
```
{{/partial:tab}}
{{/partial:tabs}}

#### Path parameters

| Parameter     | Description                                                                        |
| ------------- | ---------------------------------------------------------------------------------- |
| `category_id` | <span class="required">Required</span>. Integer. The ID of the category to update. |

#### Body parameters

| Parameter  | Description                                                                   |
| ---------- | ----------------------------------------------------------------------------- |
| `category` | <span class="required">Required</span>. String. The new name of the category. |

#### Response

```json
{
   "data": {
      "id": 569,
      "category": "updated category name"
   }
}
```

#### Error responses

- `400` - Invalid category ID
- `404` - Category not found
- `409` - Category already exists

### Delete an annotation category

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request DELETE 'https://amplitude.com/api/3/annotation-categories/:category_id' \
-u '{api-key}:{secret-key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
DELETE /api/3/annotation-categories/:category_id HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

#### Path parameters

| Parameter     | Description                                                                        |
| ------------- | ---------------------------------------------------------------------------------- |
| `category_id` | <span class="required">Required</span>. Integer. The ID of the category to delete. |

#### Response

```json
{
  "success": true
}
```

#### Error responses

- `400` - Invalid category ID
- `404` - Category not found

### Bulk update annotation categories

Assign a category to multiple annotations at once.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request PUT 'https://amplitude.com/api/3/annotation-categories/bulk/:category_id' \
--header 'Authorization: Basic {api-key}:{secret-key}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "annotation_ids": [12345, 67890, 11111]
}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
PUT /api/3/annotation-categories/bulk/:category_id HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
Content-Type: application/json

{
  "annotation_ids": [12345, 67890, 11111]
}
```
{{/partial:tab}}
{{/partial:tabs}}

#### Path parameters

| Parameter     | Description                                                                        |
| ------------- | ---------------------------------------------------------------------------------- |
| `category_id` | <span class="required">Required</span>. Integer. The ID of the category to assign. |

#### Body parameters

| Parameter        | Description                                                                        |
| ---------------- | ---------------------------------------------------------------------------------- |
| `annotation_ids` | <span class="required">Required</span>. Array. A list of annotation IDs to update. |

#### Response

```json
{
    "data": [
        {
            "id": 12345,
            "start": "2025-12-18T15:00:00+00:00",
            "label": "test",
            "details": null,
            "category": {
                "id": 12345,
                "category": "Alerts"
            },
            "end": null,
            "chart_id": null
        },
        …
    ]
}
```

#### Error responses

- `400` - Invalid category ID
- `400` - Invalid annotation IDs
- `400` - One or more invalid annotation ID
- `404` - Category not found

## Annotations

Create, retrieve, update, and delete chart annotations. Annotations can span single dates or time ranges with hourly granularity.

### Create an annotation

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request POST 'https://amplitude.com/api/3/annotations' \
--header 'Authorization: Basic {api-key}:{secret-key}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "label": "Feature X Release",
  "start": "2025-11-01T07:00:00+00:00",
  "category": "Releases",
  "chart_id": "abc123",
  "details": "This marks the release of feature X",
  "end": "2025-11-10T07:00:00+01:00"
}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
POST /api/3/annotations HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
Content-Type: application/json

{
  "label": "Feature X Release",
  "start": "2025-11-01T07:00:00+00:00",
  "category": "Releases",
  "chart_id": "abc123",
  "details": "This marks the release of feature X",
  "end": "2025-11-10T07:00:00+01:00"
}
```
{{/partial:tab}}
{{/partial:tabs}}

#### Body parameters

| Parameter  | Description                                                                                                                                                                                               |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`    | <span class="required">Required</span>. String. The title of your annotation.                                                                                                                             |
| `start`    | <span class="required">Required</span>. String. Timestamp corresponding to the start of this annotation in ISO 8601 format (`YYYY-MM-DDThh:mmTZD`). For example: `"2025-11-01T07:00:00+00:00"`.           |
| `category` | <span class="optional">Optional</span>. String. The name of the category that the annotation belongs to.                                                                                                  |
| `chart_id` | <span class="optional">Optional</span>. String. The ID of the chart (found in the URL) to annotate. If you don't include `chart_id`, the annotation is global and appears on all charts for your project. |
| `details`  | <span class="optional">Optional</span>. String. Details for the annotation.                                                                                                                               |
| `end`      | <span class="optional">Optional</span>. String. Timestamp corresponding to the end of this annotation in ISO 8601 format (`YYYY-MM-DDThh:mmTZD`). For example: `"2025-11-10T07:00:00+01:00"`.             |

#### Response

```json
{
  "data": {
    "id": 12345,
    "start": "2025-11-01T07:00:00+00:00",
    "details": "This marks the release of feature X",
    "category": {
      "id": 45678,
      "name": "Releases"
    },
    "end": "2025-11-10T07:00:00+01:00",
    "label": "Feature X Release",
    "chart_id": null
  }
}
```

#### Error responses

- `400` - Invalid field
- `404` - Category not found

### Get all annotations

Retrieves all chart annotations in your project. Supports filtering by category, chart, and date range.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/3/annotations?category=Releases&start=2025-11-01T07:00:00+00:00&end=2025-11-30T07:00:00+00:00' \
-u '{api-key}:{secret-key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/3/annotations?category=Releases&start=2025-11-01T07:00:00+00:00&end=2025-11-30T07:00:00+00:00 HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

#### Query parameters

| Parameter  | Description                                                                                                                                                                                                                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `category` | <span class="optional">Optional</span>. String. If specified, only returns annotations in this category. Doesn't combine with `chart_id` filter.                                                                                                                                                   |
| `chart_id` | <span class="optional">Optional</span>. String. If specified, only returns annotations that show on this chart. Doesn't combine with `category` filter.                                                                                                                                            |
| `start`    | <span class="optional">Optional</span>. String. If specified, only returns annotations that occur after `start` in ISO 8601 format (`YYYY-MM-DDThh:mmTZD`). For example: `"2025-11-10T07:00:00+01:00"`.                                                                                            |
| `end`      | <span class="optional">Optional</span>. String. If specified, only returns annotations that occur before `end` in ISO 8601 format (`YYYY-MM-DDThh:mmTZD`). If the annotation spans a date range, the annotation's end date must be before `end` input. For example: `"2025-11-10T07:00:00+01:00"`. |

#### Response

```json
{
  "data": [
    {
      "id": 12345,
      "start": "2025-11-01T07:00:00+00:00",
      "details": "This marks the release of feature X",
      "category": {
        "id": 45678,
        "name": "Releases"
      },
      "end": "2025-11-10T07:00:00+01:00",
      "label": "Feature X Release",
      "chart_id": null
    }
  ]
}
```

#### Error responses

- `400` - Invalid request
- `409` - Conflict

### Get a single annotation

Retrieves a single chart annotation by ID.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/3/annotations/:annotation_id' \
-u '{api-key}:{secret-key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/3/annotations/:annotation_id HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

#### Path parameters

| Parameter       | Description                                                                            |
| --------------- | -------------------------------------------------------------------------------------- |
| `annotation_id` | <span class="required">Required</span>. Integer. The ID of the annotation to retrieve. |

#### Response

```json
{
  "data": {
    "id": 12345,
    "start": "2025-11-01T07:00:00+00:00",
    "details": "This marks the release of feature X",
    "category": {
      "id": 45678,
      "name": "Releases"
    },
    "end": "2025-11-10T07:00:00+01:00",
    "label": "Feature X Release",
    "chart_id": null
  }
}
```

#### Error responses

- `400` - Invalid annotation ID
- `404` - Annotation not found

### Update an annotation

Updates a specific annotation. Supports partial updates—only the fields you specify in the request body are updated.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request PUT 'https://amplitude.com/api/3/annotations/:annotation_id' \
--header 'Authorization: Basic {api-key}:{secret-key}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "label": "Updated Feature X Release",
  "end": "2025-11-15T07:00:00+01:00"
}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
PUT /api/3/annotations/:annotation_id HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
Content-Type: application/json

{
  "label": "Updated Feature X Release",
  "end": "2025-11-15T07:00:00+01:00"
}
```
{{/partial:tab}}
{{/partial:tabs}}

#### Path parameters

| Parameter       | Description                                                                          |
| --------------- | ------------------------------------------------------------------------------------ |
| `annotation_id` | <span class="required">Required</span>. Integer. The ID of the annotation to update. |

#### Body parameters

| Parameter  | Description                                                                                                                                                                                                                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`    | <span class="optional">Optional</span>. String. The title of your annotation.                                                                                                                                                                                                                                   |
| `start`    | <span class="optional">Optional</span>. String. Timestamp corresponding to the start of this annotation in ISO 8601 format (`YYYY-MM-DDThh:mmTZD`). For example: `"2025-11-01T07:00:00+00:00"`.                                                                                                                 |
| `category` | <span class="optional">Optional</span>. String. The name of the category that the annotation belongs to.                                                                                                                                                                                                        |
| `chart_id` | <span class="optional">Optional</span>. String. The ID of the chart (found in the URL) to annotate. If you don't include `chart_id`, the annotation is global and appears on all charts for your project. Set to `null` to remove the association to a specific chart and make the annotation visible globally. |
| `details`  | <span class="optional">Optional</span>. String. Details for the annotation.                                                                                                                                                                                                                                     |
| `end`      | <span class="optional">Optional</span>. String. Timestamp corresponding to the end of this annotation in ISO 8601 format (`YYYY-MM-DDThh:mmTZD`). For example: `"2025-11-10T07:00:00+01:00"`. Set to `null` to remove the end time.                                                                             |

#### Response

```json
{
  "data": {
    "id": 12345,
    "start": "2025-11-01T07:00:00+00:00",
    "details": "This marks the release of feature X",
    "category": {
      "id": 45678,
      "name": "Releases"
    },
    "end": "2025-11-15T07:00:00+01:00",
    "label": "Updated Feature X Release",
    "chart_id": null
  }
}
```

#### Error responses

- `400` - Invalid field
- `404` - Annotation not found
- `404` - Category not found

### Delete an annotation

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request DELETE 'https://amplitude.com/api/3/annotations/:annotation_id' \
-u '{api-key}:{secret-key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
DELETE /api/3/annotations/:annotation_id HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

#### Path parameters

| Parameter       | Description                                                                          |
| --------------- | ------------------------------------------------------------------------------------ |
| `annotation_id` | <span class="required">Required</span>. Integer. The ID of the annotation to delete. |

#### Response

```json
{
  "success": true
}
```

#### Error responses

- `400` - Invalid annotation ID
- `404` - Annotation not found
