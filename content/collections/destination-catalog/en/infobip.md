---
id: d278336c-6bc5-4f22-b63e-ce5b8d630dd1
blueprint: destination-catalog
use_cases:
  - "Enable targeted messaging campaigns by utilizing cohorts created within Amplitude, leveraging Infobip's omnichannel engagement platform. With this integration, businesses can seamlessly sync cohorts from Amplitude to Infobip, allowing for personalized and effective communication strategies across various messaging channels."
short_description: 'Infobip is an omnichannel engagement powering a broad range of messaging channels, tools, and solutions for customer engagement, authentication, and security.'
integration_category:
  - customer-engagement
integration_type:
  - cohorts
title: Infobip
source: 'https://docs.developers.amplitude.com/data/destinations/infobip-cohort'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1730929512
integration_icon: partner-icons/infobip1.svg
---
[Infobip](https://www.infobip.com/) is a global leader in omnichannel engagement powering a broad range of messaging channels, tools, and solutions for advanced customer engagement, authentication, and security.

This integration lets you send targeted messages using the specific cohorts you've created in Amplitude.

## Setup

### Infobip setup

1. Navigate to the [Infobip Portal](https://portal.infobip.com/login/?callback=https%3A%2F%2Fportal.infobip.com%2F%3F), click **Project Settings**, and select **API Keys**.
2. Generate a new key and add a description. Copy the key.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Infobip**.
3. Enter a name and Infobip API Key.
4. Save the destination.

## Statuses

### Create a new list

URL: `https://api.infobip.com/saas/amplitude/1/lists`

Status codes

{{partial:tabs tabs="200 Success, 400 Bad Request, 401 Unauthorized, 429 Too Many Requests"}}
{{partial:tab name="200 Success"}}
```json
{
    "listId": 2568
}
```
{{/partial:tab}}
{{partial:tab name="400 Bad Request"}}
```json
{
    "requestError": {
        "serviceException": {
            "messageId": "BAD_REQUEST",
            "text": "Bad request",
            "validationErrors": {
                "name": [
                    "property not found or blank"
                ]
            }
        }
    }
}
```
{{/partial:tab}}
{{partial:tab name="401 Unauthorized"}}
```json
{
    "requestError": {
        "serviceException": {
            "messageId": "UNAUTHORIZED",
            "text": "Invalid login details"
        }
    }
}
```
{{/partial:tab}}
{{partial:tab name="429 Too Many Requests"}}
One request per API key every 2 seconds


```json
{
    "requestError":{
        "serviceException":{
          "messageId":
              "TOO_MANY_REQUESTS",
            "text":"Too many requests"
          }
      }
}
```
{{/partial:tab}}
{{/partial:tabs}}

### Add people to list

URL: `https://api.infobip.com/saas/amplitude/1/lists/%257BlistId%257D/add`

{{partial:tabs tabs="200 Success, 400 Bad Request, 401 Unauthorized, 429 Too Many Requests"}}
{{partial:tab name="200 Success"}}
- If no errors, just the modified/created counters will show the number of ids.
- If one or more ids were unable to be added to a list, the errors section will be populated with the total counter and arrays of grouped ids by type of error

```json
{
  "modifiedCount": 0,
  "createdCount": 3,
  "errors": {
    "count": 1,
    "failed": {
      "VALIDATION_ERROR": ["invalid_mail.com"]
    }
  }
}
```
{{/partial:tab}}
{{partial:tab name="400 Bad Request"}}
```json
{
  "statusCode": "TAG_NOT_FOUND",
  "message": "Tag with id \"87881\" does not exist"
}
```
{{/partial:tab}}
{{partial:tab name="401 Unauthorized"}}
```json
{
  "requestError": {
    "serviceException": {
      "messageId": "UNAUTHORIZED",
      "text": "Invalid login details"
    }
  }
}
```
{{/partial:tab}}
{{partial:tab name="429 Too Many Requests"}}
```json
{
  "requestError": {
    "serviceException": {
      "messageId": "TOO_MANY_REQUESTS",
      "text": "Too many requests"
    }
  }
}
```
{{/partial:tab}}
{{/partial:tabs}}

### Remove people from list

URL: `https://api.infobip.com/saas/amplitude/1/lists/%257BlistId%257D/remove`

{{partial:tabs tabs="200 Success, 400 Bad Request, 401 Unauthorized, 429 Too Many Requests"}}
{{partial:tab name="200 Success"}}
```json
{}
```
{{/partial:tab}}
{{partial:tab name="400 Bad Request"}}
```json
{
  "statusCode": "TAG_NOT_FOUND",
  "message": "Tag with id \"87881\" does not exist"
}
```
{{/partial:tab}}
{{partial:tab name="401 Unauthorized"}}
```json
{
  "requestError": {
    "serviceException": {
      "messageId": "UNAUTHORIZED",
      "text": "Invalid login details"
    }
  }
}
```
{{/partial:tab}}
{{partial:tab name="429 Too Many Requests"}}
One request per Api key every 5 seconds.

```json
{
  "requestError": {
    "serviceException": {
      "messageId": "TOO_MANY_REQUESTS",
      "text": "Too many requests"
    }
  }
}
```
{{/partial:tab}}
{{/partial:tabs}}