---
id: d8af1ad9-ecaf-49dc-92e6-07c5ca0628e3
blueprint: api
title: 'Taxonomy API'
source: 'https://www.docs.developers.amplitude.com/analytics/apis/taxonomy-api/'
auth_method: http_basic
standard_endpoint: 'https://amplitude.com/api/2/'
eu_endpoint: 'https://analytics.eu.amplitude.com/api/2/'
postman_link: 'https://www.postman.com/amplitude-dev-docs/workspace/amplitude-developers/folder/20044411-4b8180c4-e06e-478a-9c96-0ccf6cf652e2?action=share&source=copy-link&creator=29131806&ctx=documentation'
api_status: ga
lede: |-
  The Taxonomy API grants Scholarship, Growth, and Enterprise users the ability to programmatically plan their event schema in the Taxonomy tab.

  The Taxonomy API lets you create, get, update, and delete categories, event types, event properties, and user properties.
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716312370
summary: 'Create, get, update, and delete categories, event types, event properties, and user properties.'
---
## Considerations

* You may have to URL encode special characters in the names of event types, event properties, and user properties.
 For example, encode `Play Song` as `Play%20Song`. Use the [W3Schools](http://www.w3schools.com/tags/ref_urlencode.asp) encoding reference.
* In responses, custom user properties have a `gp:` prefix. For example, `gp:my_custom_property`.
* You must plan events or properties in the schema before you can delete them via this API.

## Limits

For each endpoint, there is a concurrent and a rate limit. This limit restricts the number of requests you can run at the same time, while the rate limit restricts the total number of queries you can run per hour.

Limits are per project, and exceeding any of these limits returns a 429 error.

The endpoints use a cost per query model. Here are the max costs per API Key:

* **Concurrent Cost Limit:** You can run queries that collectively add up to 4 cost at the same time.
* **Period Cost Limit:** You can run up to 7200 cost per hour.

Cost structure of each endpoint:

* GET: 1 cost
* PUT: 2 cost
* POST: 2 cost
* DELETE: 2 cost

## Event category


Event categories are a way to organize your event types into broad groups.


{{partial:admonition type="example" heading=""}}
You want to track how users register for your app, checkout, and how they interact with the onboarding experience. You can bucket your events using these event categories:

- Registration
- Checkout
- Onboarding
{{/partial:admonition}}

### Create event category

Create an event category in your project.

`POST /api/2/taxonomy/category`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request POST 'https://amplitude.com/api/2/taxonomy/category' \
--header 'Authorization: Basic {api-key}:{secret-key}' \ #credentials must be base64 encoded
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'category_name=CATEGORY_NAME'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
POST /api/2/taxonomy/category HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
Content-Type: application/x-www-form-urlencoded
category_name=CATEGORY_NAME
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Create an event category"}}
{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request POST 'https://amplitude.com/api/2/taxonomy/category' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'category_name=Attribution'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
POST /api/2/taxonomy/category HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
Content-Type: application/x-www-form-urlencoded
Content-Length: 25
category_name=Attribution
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

#### Body parameters


|<div class="big-column">Name</div>| Description|
|-----|------|
|`category_name` |<span class="required">Required</span>. Name of the category.|

#### Response

A successful request returns a `200 OK` response with a JSON body:

```json
{
    "success" : true 
}
```

A failed request sends an error message with more information:

```json
{
   "success" : false,
   "errors" : [
      {
         "message" : "error info"
      }
   ]
}
```

### Get all event categories

Get all event categories in your project.

`GET https://amplitude.com/api/2/taxonomy/category`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/taxonomy/category' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/taxonomy/category HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

#### Response

A successful request returns a `200 OK` status with a JSON body:

```json
{
    "success": true,
    "data": [
        {
            "id": 412931,
            "name": "Attribution"
        },
        {
            "id": 412941,
            "name": "Conversion"
        }
    ]
}
```

A failed request returns a `400 Bad Request` response with more information.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Not found"
        }
    ]
}
```

### Get an event category

Get the ID of an event category in your project. Send a `GET` request with the category name.

`GET https://amplitude.com/api/2/taxonomy/category/:category_name`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/2/taxonomy/category/:category_name' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/taxonomy/category/:category_name HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Get a category's ID"}}
This example get the ID for the event category named "Attribution".

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://amplitude.com/api/2/taxonomy/category/Attribution' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='    
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/taxonomy/category/Attribution HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

#### Path parameters

|<div class="big-column">Name</div>| Description|
|----|-----|
|`category_name`| <span class="required">Required</span>. The name of the category|

#### Response

A successful request returns a `200 OK` status and a JSON body with the category's data:

```json
{
    "success": true,
    "data": {
        "id": 412941,
        "name": "Conversion"
    }
}
```

A failed request returns a `400 Bad Request` status with more information about the error.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Not found"
        }
    ]
}
```

Update the name of an event category. Send a `PUT` request with the category ID and a new name in the body.

`PUT https://amplitude.com/api/2/taxonomy/category/:category_id`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request PUT 'https://amplitude.com/api/2/taxonomy/category/CATEGORY_ID' \
-u '{api_key}:{secret_key}' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'category_name=NEW_NAME'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
PUT /api/2/taxonomy/category/CATEGORY_ID HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
Content-Type: application/x-www-form-urlencoded
Content-Length: 23

category_name=NEW_NAME
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Rename a category"}}
This example renames the category with the ID `412941` to "Converted".

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request PUT 'https://amplitude.com/api/2/taxonomy/category/412941' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'category_name=Converted'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
PUT /api/2/taxonomy/category/412941 HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
Content-Type: application/x-www-form-urlencoded
Content-Length: 23

category_name=Converted
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

#### Path parameters

|<div class="big-column">Name</div>| Description|
|----|-----|
|`category_id`| <span class="required">Required</span>. The ID of the category|

#### Body parameters

|<div class="big-column">Name</div>| Description|
|----|-----|
|`category_name`| <span class="required">Required</span>. The new name of the category|

#### 200 ok response

A successful request returns a `200 OK` status and a JSON body.

```json
{
    "success": true
}
```

#### 409 conflict response

If there is a problem with your request, the request returns a `409 Conflict` status, and a JSON body with more information.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Attempted to operate on entity event_category, id \"4129\", that does not exist."
        }
    ]
}
```

### Delete an event category

Delete an event category. Send a `DELETE` request with the category ID.

`DELETE https://amplitude.com/api/2/taxonomy/category/:category_id`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash 
curl --location --request DELETE 'https://amplitude.com/api/2/taxonomy/category/:category_id' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
DELETE /api/2/taxonomy/category/:category_id HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Delete a category"}}
This example deletes the category with the ID `412941`.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request DELETE 'https://amplitude.com/api/2/taxonomy/category/412941' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
DELETE /api/2/taxonomy/category/412941 HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

#### Path parameters

|<div class="big-column">Name</div>| Description|
|----|-----|
|`category_id`| <span class="required">Required</span>. The ID of the category|

#### 200 ok response

A successful request returns a `200 OK` status and a JSON body.

```json
{
    "success": true
}
```

#### 409 conflict response

If there is a problem with your request, the request returns a `409 Conflict` status, and a JSON body with more information.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Attempted to operate on entity event_category, id \"412941\", that does not exist."
        }
    ]
}
```

## Event type

An event is any action a user can take, like *start game* or *add to cart,* or any activity associated with a user, like in-app notifications or push notifications.

You can use the API to manipulate event types.

### Create an event type

Creates an event type. Send a `POST` request to `https://amplitude.com/api/2/taxonomy/event` and include a body with your parameters.

{{partial:admonition type="note" heading=""}}
[Initialize the schema](/docs/data/amplitude-data-settings) before you can add event types via the API.
{{/partial:admonition}}

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request POST 'https://amplitude.com/api/2/taxonomy/event' \
-u '{api_key}:{secret_key}' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'event_type=EVENT_TYPE' \
--data-urlencode 'category=CATEGORY_NAME' \
--data-urlencode 'description=DESCRIPTION'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
POST /api/2/taxonomy/event?=null HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} # credentials must be base64 encoded
Content-Type: application/x-www-form-urlencoded
Content-Length: 80

event_type=EVENT_TYPE&category=CATEGORY_NAME&description=CATEGORY_DESCRIPTION
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Create an event type"}}
This example creates the event type "Onboarding Start" with the category "Onboarding" and a description of "My new onboarding event".

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request POST 'https://amplitude.com/api/2/taxonomy/event' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=' \
--data-urlencode 'event_type=Onboard Start' \
--data-urlencode 'category=Onboarding' \
--data-urlencode 'description=My new onboarding event. ' \
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash

POST /api/2/taxonomy/event HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=

Content-Length: 92

event_type=Onboard%20Start&category=Onboarding&description=My%20new%20onboarding%20event.%20
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

#### Body parameters

|<div class="big-column">Name</div>| Description|
|-----|------|
|`event_type` |<span class="required">Required</span>. String. The event name.|
|`category`|<span class="optional">Optional</span>. String. The event type's category.|
|`description`| <span class="optional">Optional</span>. String. Details about the event type.|

#### 200 ok response

A successful request returns a `200 OK` response with a JSON body:

```json
{
    "success" : true 
}
```

#### 409 conflict response

A failed request returns a `409 Conflict` status with an error message.

```json
{
   "success" : false,
   "errors" : [
      {
         "message" : "error info"
      }
   ]
}
```
### Get all event types

Retrieves all event types in a project. This request has no required parameters.

`GET https://amplitude.com/api/2/taxonomy/event`

{{partial:admonition type="note" heading=""}}
Hidden events, those that have a visibility other than "Visible", don't appear in the response.

By default, deleted events will also not be included, but the `showDeleted` query parameter can be optionally added to the endpoint to include them:

`GET https://amplitude.com/api/2/taxonomy/event?showDeleted=true`
{{/partial:admonition}}

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/taxonomy/event' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/taxonomy/event HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

#### 200 OK response

A successful request returns a `200 OK` status with a JSON body:

```json
{
    "success": true,
    "data": [
        {
            "event_type": "Attribution",
            "category": {
                "name": "Attribution Events"
            },
            "description": null
        },
        {
            "event_type": "Conversation",
            "category": {
                "name": "Conversion Events"
            },
            "description": "This event is fired when a user converts."
        }
    ]
}
```

### Get an event type

Get a single event type, by name. Send a `GET` request with the event name.

`GET https://amplitude.com/api/2/taxonomy/event/:event_type`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/taxonomy/event:event_type' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/taxonomy/event/:event_type HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Get an event type by name"}}
This example gets the "Event 2" event type. This is a custom event, so it has a `ce:` prefix.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash

curl --location --request GET 'https://amplitude.com/api/2/taxonomy/event/ce:Event 2' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash

curl --location --request GET 'https://amplitude.com/api/2/taxonomy/event/ce:Event 2' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

#### Path parameters

|<div class="big-column">Name</div>| Description|
|----|-----|
|`event_type`| <span class="required">Required</span>. String. The event name. Prefix custom event types with `ce:`.|


#### 200 OK response

A successful request returns a `200 OK` status and a JSON body with the event type's data:

```json
{
    "success": true,
    "data": {
        "event_type": "ce:Event 2",
        "category": {
            "name": "Conversion Events"
        },
        "description": null
    }
}
```

#### 400 Bad Request response

A failed request returns a `400 Bad Request` status with more information about the error.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Not found"
        }
    ]
}
```

### Update an event type

Update an event type. Send a `PUT` request with the event type name.

`PUT https://amplitude.com/api/2/taxonomy/event/:event_type`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request PUT 'https://amplitude.com/api/2/taxonomy/event/EVENT_TYPE_NAME' \
-u '{api_key}:{secret_key}'
--data-urlencode 'category=NEW_CATEGORY_NAME' \
--data-urlencode 'display_name=NEW_EVENT_TYPE_DISPLAY_NAME'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
PUT /api/2/taxonomy/event/EVENT_TYPE_NAME HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} # credentials must be base64 encoded
Content-Length: 41

category=NEW_CATEGORY_NAME&display_name=NEW_EVENT_TYPE_DISPLAY_NAME
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Update an event type"}}
This example updates the event type "OnboardingBegin" with the category "Onboarding", event type name "OnboardStart", the display name "Onboarding Start", and a description of "User signed in and completed an onboarding task from modal". Because the event type is custom, it has the `ce:` prefix.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request PUT 'https://amplitude.com/api/2/taxonomy/event/ce:OnboardBegin' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'new_event_type=OnboardStart' \
--data-urlencode 'category=Onboarding' \
--data-urlencode 'description=User signed in and completed an onboarding task from modal.' \
--data-urlencode 'display_name=Onboarding Start'

```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash

PUT /api/2/taxonomy/event/ce:OnboardBegin HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
Content-Type: application/x-www-form-urlencoded
Content-Length: 169

new_event_type=OnboardStart&category=Onboarding&description=User%20signed%20in%20and%20completed%20an%20onboarding%20task%20from%20modal.&display_name=Onboarding%20Start
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

#### Path parameters

|<div class="big-column">Name</div>| Description|
|----|-----|
|`event_type`| <span class="required">Required</span>. String. The event name. Prefix custom event types with `ce:`. |

#### Body parameters

|<div class="big-column">Name</div>| Description|
|----|-----|
|`new_event_type`| <span class="optional">Optional</span>. String. The event type's new name.|
|`category`|<span class="optional">Optional</span>. Current category name of the event type.|
|`description`| <span class="optional">Optional</span>. String. Details to add to the event type.|
|`display_name`| <span class="optional">Optional</span>. String. Display name of an event type. You can update the display name for an event type after it's ingested into Amplitude.|

#### 200 OK response

A successful request returns a `200 OK` status and a JSON body.

```json
{
    "success": true
}
```

#### 409 conflict response

If there is a problem with your request, the request returns a `409 Conflict` status, and a JSON body with more information.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Attempted to change the event display name for event \"ce:Event\", but the event is not in schema."
        }
    ]
}
```

### Delete an event type

Delete an event type.

`DELETE https://amplitude.com/api/2/taxonomy/event/:event_type`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request DELETE 'https://amplitude.com/api/2/taxonomy/event/EVENT_TYPE'
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
DELETE /api/2/taxonomy/event/EVENT_TYPE HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Delete an event type"}}
This example deletes the event type "Event1". Because the event type is custom, it has the `ce:` prefix.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash

curl --location --request DELETE 'https://amplitude.com/api/2/taxonomy/event/ce:Event1' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=' \

```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash

DELETE /api/2/taxonomy/event/ce:Event1 HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=

```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

#### Path parameters

|<div class="big-column">Name</div>| Description|
|----|-----|
|`event_type`| <span class="required">Required</span>. The name of the event type. Prefix custom event types with `ce:`. |

#### 200 OK response

A successful request returns a `200 OK` status and a JSON body.

```json
{
    "success": true
}
```

#### 409 conflict response

If there is a problem with your request, the request returns a `409 Conflict` status, and a JSON body with more information.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Attempted to remove an event, \"ce:Event1\", that is not a planned event."
        }
    ]
}
```

## Event property

Event properties describe the attributes of an event. For example, if 'Swipe' is an event that you are tracking, then the event property ‘Direction’ could have the values ‘Left’ or ‘Right’.

### Create an event property

Create an event property. Send a `POST` request to the endpoint with the required information in the body.

`POST https://amplitude.com/api/2/taxonomy/event-property`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request POST 'https://amplitude.com/api/2/taxonomy/event-property' \
-u '{api_key}:{secret_key}' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'event_type=EVENT_TYPE' \
--data-urlencode 'event_property=EVENT_PROPERTY' \
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
POST /api/2/taxonomy/event-property HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
Content-Type: application/x-www-form-urlencoded
Content-Length: 94

event_type=EVENT_TYPE&event_property=EVENT_PROPERTY
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Create an event property"}}
This example creates the event property "Completed Task" with the description "User completed any onboarding task" for the event "Onboarding Start". The event property is a boolean type, is not required.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash

curl --location --request POST 'https://amplitude.com/api/2/taxonomy/event-property' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=' \
--data-urlencode 'event_type=Onboard Start' \
--data-urlencode 'event_property=Completed Task' \
--data-urlencode 'description=User completed any onboarding task' \
--data-urlencode 'type=boolean' \
--data-urlencode 'is_required=false'

```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash

POST /api/2/taxonomy/event-property HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=

Content-Length: 144

event_type=Onboard%20Start&event_property=Completed%20Task&type=boolean&is_required=false&description=User%20completed%20any%20onboarding%20task
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

#### Body parameters

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`event_type`|<span class="required">Required</span>. String. Name of the event type to which the event properties belong to. |
|`event_property`| <span class="required">Required</span>. String. Name of the event property.|
|`description`|<span class="optional">Optional</span>. String. The event property's description.|
|`type`| <span class="optional">Optional</span>. String. Available with Govern Add-on. The event property's data type. Acceptable values are `string`, `number`, `boolean`, `enum`, and `any`|
|`regex`| <span class="optional">Optional</span>. String. Available with Govern Add-on. Regular expression, custom regex used for pattern matching or more complex values. For example, property zip code must have pattern `[0-9]{5}`|
|`enum_values`|<span class="optional">Optional</span>. String. Available with Govern Add-on. List of allowed values.|
|`is_array_type`|<span class="optional">Optional</span>. Boolean. Available with Govern Add-on.|
|`is_required`|<span class="optional">Optional</span>. Boolean. Available with Govern Add-on. Marks the property as required. When `true`, Amplitude flags events that are missing this property on the Taxonomy page in the web app.|


#### 200 OK response

A successful request returns a `200 OK` status and a JSON body.

```json
{
    "success": true
}
```

#### 409 conflict response

If there is a problem with your request, the request returns a `409 Conflict` status, and a JSON body with more information.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Attempted to add an event property, \"Completed Task\" for event \"Onboard Start\", that already exists."
        }
    ]
}
```

### Get event properties

Get an event's properties.

`GET https://amplitude.com/api/2/taxonomy/event-property`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash

curl --location --request GET 'https://amplitude.com/api/2/taxonomy/event-property' \
-u '{api_key}:{secret_key}' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'event_type=EVENT_NAME'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash

GET /api/2/taxonomy/event-property HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded

event_type=EVENT_NAME
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: get all of an event's properties"}}
This example gets all event properties for the "Onboard Start" event.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash

curl --location --request GET 'https://amplitude.com/api/2/taxonomy/event-property' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA==' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'event_type=Onboard Start'

```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash

GET /api/2/taxonomy/event-property HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA==
Content-Type: application/x-www-form-urlencoded
Content-Length: 26

event_type=Onboard%20Start
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

#### Body parameters

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`event_type`|<span class="required">Required</span>. Name of the event type to which the event properties belong to.|

#### 200 OK response

A successful request returns a `200 OK` status and a JSON body with a list of event properties and their data.

```json
{
    "success": true,
    "data": [
        {
            "event_property": "Completed Task",
            "event_type": "Onboard Start",
            "description": "User completed a task during onboarding.",
            "type": "boolean",
            "regex": null,
            "enum_values": null,
            "is_array_type": false,
            "is_required": false
        },
        {
            "event_property": "Completed Tutorial",
            "event_type": "Onboard Start",
            "description": "",
            "type": "any",
            "regex": null,
            "enum_values": null,
            "is_array_type": false,
            "is_required": false
        }
    ]
}
```

### Get a single event property

Get a single event property. Send a `GET` request with the event property name as a path parameter, and the event name in the body.

`GET https://amplitude.com/api/2/taxonomy/event-property`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/taxonomy/event-property?event_property=EVENT_PROPERTY' \
-u '{api_key}:{secret_key}' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'event_type=EVENT_NAME'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/taxonomy/event-property/EVENT_PROPERTY_NAME HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded

event_type=EVENT_NAME
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Get a property from a specific event"}}
This example gets a the "Completed Task" property for the "Onboard Start" event.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash

curl --location --request GET 'https://amplitude.com/api/2/taxonomy/event-property?event_property=Completed Task' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'event_type=Onboard Start'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash

GET /api/2/taxonomy/event-property?event_property=Completed Task HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA==
Content-Type: application/x-www-form-urlencoded
Content-Length: 26

event_type=Onboard%20Start
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

#### Path parameters

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`event_property`|<span class="required">Required</span>. The event property name.|

#### Body parameter

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`event_type`|<span class="required">Required</span>. Name of the event type to which the event properties belong to.|

#### 200 OK response

A successful request returns a  `200 OK` status and a JSON body containing information about the event property.

```json
{
    "success": true,
    "data": {
        "event_property": "Shared",
        "event_type": "Onboard Finish",
        "description": "Whether user shared content.",
        "type": "boolean",
        "regex": null,
        "enum_values": null,
        "is_array_type": false,
        "is_required": false
    }
}
```

#### 400 Bad Request response

If Amplitude can't find the event property, or you configure the request incorrectly, it returns a `400 Bad Request` response and an error message.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Not found"
        }
    ]
}
```

### Update event property

Update an event property.

`PUT https://amplitude.com/api/2/taxonomy/event-property/:event-property`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request PUT 'https://amplitude.com/api/2/taxonomy/event-property/EVENT_PROPERTY' \
-u '{api_key}:{secret_key}' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'event_type=EVENT_NAME' \
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash

PUT /api/2/taxonomy/event-property/EVENT_PROPERTY HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
Content-Type: application/x-www-form-urlencoded
Content-Length: 24

event_type=EVENT_NAME
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Update an event property"}}
This example updates a the "Completed Task" property. It changes the name to "Task Completed" and adds a description.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash

curl --location --request PUT 'https://amplitude.com/api/2/taxonomy/event-property/Completed Task' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA==' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'description=User completed an onboarding task' \
--data-urlencode 'new_event_property_value=Task Completed' \
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash

PUT /api/2/taxonomy/event-property/Completed Task HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA==
Content-Type: application/x-www-form-urlencoded
Content-Length: 130

event_type=Onboard%20Start&description=User%20completed%20an%20onboarding%20task&new_event_property_value=Task%20Completed&type=any
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

#### Path parameters

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`event-property`|<span class="required">Required</span>. Name of the event property.|

#### Body parameters

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`event_type`|<span class="required">Required</span>. Name of the event type to which the event properties belong to.|
|`description`|<span class="optional">Optional</span>. String. The event property's description.|
|`new_event_property_value`|<span class="optional">Optional</span>. String. Available with Govern Add-on. The new name of the event property.|
|`type`| <span class="optional">Optional</span>. String. Available with Govern Add-on. The event property's data type. Acceptable values are `string`, `number`, `boolean`, `enum`, and `any`|
|`regex`|<span class="optional">Optional</span>. String. Available with Govern Add-on. Regular expression, custom regex used for pattern matching or more complex values. For example, property zip code must have pattern `[0-9]{5}` |
|`enum_values`| <span class="optional">Optional</span>. String. Available with Govern Add-on. List of allowed values.|
|`is_array_type`| <span class="optional">Optional</span>. Boolean. Available with Govern Add-on.|
|`is_required`| <span class="optional">Optional</span>. Boolean. Available with Govern Add-on. Marks the property as required.|

#### 200 OK response

A successful request returns a `200 OK` status and a JSON body.

```json
{
    "success": true
}
```

#### 409 conflict response

Some failed requests return a `409 Conflict` and an error message with more details.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Attempted to change the event property description for property \"Completed Task\" for event \"\", but the property is not in schema."
        }
    ]
}
```

### Delete an event property

Delete an event property. Send a `DELETE` request with the event property as a path parameter and the event type in the request body. 

`DELETE https://amplitude.com/api/2/taxonomy/event-property/:event-property`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request DELETE 'https://amplitude.com/api/2/taxonomy/event-property/EVENT_PROPERTY' \
--header 'Authorization: Basic {api-key}:{secret-key}' # credentials must be base64 encoded \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'event_type=EVENT_NAME'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
DELETE /api/2/taxonomy/event-property/EVENT_PROPERTY HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} # credentials must be base64 encoded

event_type=EVENT_NAME
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Delete an event property"}}
This example deletes the event property "Completed Task" from the "Onboarding Start" event.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash

curl --location --request DELETE 'https://amplitude.com/api/2/taxonomy/event-property/Completed Task' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'event_type=Onboarding Start'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash

DELETE /api/2/taxonomy/event-property/Completed Task HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
Content-Type: application/x-www-form-urlencoded
Content-Length: 29

event_type=Onboarding%20Start
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}


#### Path parameters

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`event_property`|<span class="required">Required</span>. The event property name.|

#### Body parameter

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`event_type`|<span class="required">Required</span>. Name of the event type to which the event properties belong to.|


#### 200 OK response

A successful request returns a `200 OK` status and a JSON body.

```json
{
    "success": true
}
```

## User property

User properties reflect traits about the individuals using your product.

### Create a user property

Create a user property.

`POST https://amplitude.com/api/2/taxonomy/user-property/`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash

curl --location --request POST 'https://amplitude.com/api/2/taxonomy/user-property' \
--header 'Authorization: Basic {api-key}:{secret-key}' # credentials must be base64 encoded \
--data-urlencode 'user_property=USER_PROPERTY' \
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
POST /api/2/taxonomy/user-property HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} # credentials must be base64 encoded

user_property=USER_PROPERTY
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Create a user property"}}
This example creates a user property called "User Type", with a description of "Describes whether the user is a Free, Standard, or Premium user.", a type of `string` and allows the values "Free", "Standard", and "Premium".

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash

curl --location --request POST 'https://amplitude.com/api/2/taxonomy/user-property' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=' \
--data-urlencode 'user_property=User Type' \
--data-urlencode 'description=Describes whether the user is a Free, Standard, or Premium user. ' \
--data-urlencode 'type=string' \
--data-urlencode 'enum_values=Free, Standard, Premium'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash

POST /api/2/taxonomy/user-property HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
Content-Length: 185

user_property=User%20Type&description=Describes%20whether%20the%20user%20is%20a%20Free%2C%20Standard%2C%20or%20Premium%20user.%20&type=string&enum_values=Free%2C%20Standard%2C%20Premium
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

#### Body parameter

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`user_property`|<span class="required">Required</span>. String. Name of the user property type.|
|`description`|<span class="optional">Optional</span>. String. Details to add to the user property type.|
|`type`|<span class="optional">Optional</span>. String. The user property's data type. Acceptable values are `string`, `number`, `boolean`, `enum`, and `any`.|
|`regex`| <span class="optional">Optional</span>. String. Regular expression or custom regex used for pattern matching and more complex values. For example, 'zip code' property must have pattern `[0-9]{5}`.|
|`enum_values`|<span class="optional">Optional</span>. String. List of allowed values, separated by comma. For example: `red, yellow, blue`.|
|`is_array_type`|<span class="optional">Optional</span>. Boolean. Specifies whether the property value is an array.|

#### Response

This request returns either a true or false response.

```json
{
    "success" : true 
}
```

```json
{
    "success" : false 
}
```

### Get all user properties

Retrieves all user properties in your account. This call doesn't have any required parameters.

`GET https://amplitude.com/api/2/taxonomy/user-property`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/taxonomy/user-property' \
-u '{api_key}:{secret_key}''
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/taxonomy/user-property HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

#### Response

A successful request returns a `200 OK` response and a JSON body with user property details.

```json
{
    "success": true,
    "data": [
        {
            "user_property": "device_id",
            "description": null,
            "type": null,
            "enum_values": null,
            "regex": null,
            "is_array_type": false
        }, //[tl! collapse:start]
        {
            "user_property": "event_id",
            "description": null,
            "type": null,
            "enum_values": null,
            "regex": null,
            "is_array_type": false
        },
        {
            "user_property": "amplitude_id",
            "description": null,
            "type": null,
            "enum_values": null,
            "regex": null,
            "is_array_type": false
        },
        {
            "user_property": "location_lat",
            "description": null,
            "type": null,
            "enum_values": null,
            "regex": null,
            "is_array_type": false
        },
        {
            "user_property": "location_lng",
            "description": null,
            "type": null,
            "enum_values": null,
            "regex": null,
            "is_array_type": false
        },
        {
            "user_property": "server_upload_time",
            "description": null,
            "type": null,
            "enum_values": null,
            "regex": null,
            "is_array_type": false
        },
        {
            "user_property": "session_id",
            "description": null,
            "type": null,
            "enum_values": null,
            "regex": null,
            "is_array_type": false
        },
        {
            "user_property": "user_id",
            "description": null,
            "type": null,
            "enum_values": null,
            "regex": null,
            "is_array_type": false
        } //[tl! collapse:end]
    ]
}
```

### Get a user property

Retrieves a single user property, by name.

`GET https://amplitude.com/api/2/taxonomy/user-property/:user_property`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/taxonomy/user-property/USER_PROPERTY' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/taxonomy/user-property/USER_PROPERTY HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Get a user property"}}
This example gets the `device_id` user property.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash

curl --location --request GET 'https://amplitude.com/api/2/taxonomy/user-property/device_id' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash

GET /api/2/taxonomy/user-property/device_id HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

##### Path parameters

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`user_property`|<span class="required">Required</span>. The user property name. Prefix custom user properties with `gp:`|


#### 200 OK response

A successful request returns a `200 OK` response and a JSON body with user property details.

```json
{
    "success": true,
    "data": {
        "user_property": "device_id",
        "description": null,
        "type": null,
        "enum_values": null,
        "regex": null,
        "is_array_type": false
    }
}
```

#### 404 Bad Request response

A failed request returns a `404 Bad Request` status and an error message.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Not found"
        }
    ]
}
```

The Taxonomy API requires an **Enterprise plan**  account or the **Govern add-on** enabled. If your subscription doesn't qualify, the call results in a `404 Bad Request` response. 

### Update a user property

Update a user property.

`PUT https://amplitude.com/api/2/taxonomy/user-property/:user_property`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request PUT 'https://amplitude.com/api/2/taxonomy/user-property/USER_PROPERTY' \
-u '{api_key}:{secret_key}'
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'new_user_property_value=VALUE' \
--data-urlencode 'description=DESCRIPTION'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
PUT /api/2/taxonomy/user-property/USER_PROPERTY HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
Content-Type: application/x-www-form-urlencoded
Content-Length: 37

new_user_property_value=VALUE&description=DESCRIPTION
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Update a user property"}}
This example updates a user property called "user_type" to be named "subscription_type", adds a description of "The user's subscription type", and changes the property's data type to `string`. The user property is prefixed with `gp:` in the path because it's a custom user property. 

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash

curl --location --request PUT 'https://amplitude.com/api/2/taxonomy/user-property/gp:user_type' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=' \
--data-urlencode 'new_user_property_value=subscription_type' \
--data-urlencode 'description=The user'\''s subscription type' \
--data-urlencode 'type=string'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash

PUT /api/2/taxonomy/user-property/gp:user_type HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
Content-Length: 100

new_user_property_value=subscription_type&description=The%20user's%20subscription%20type&type=string
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

#### Path parameters

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`user_property`|<span class="required">Required</span>. The user property name. Prefix custom user properties with `gp:`|

#### Body parameters

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`new_user_property_value`| <span class="optional">Optional</span>. String. New name of the user property type.|
|`description`| <span class="optional">Optional</span>. String. Details to add to the user property type.|
|`type`|<span class="optional">Optional</span>. String. The user property's data type. Acceptable values are `string`, `number`, `boolean`, `enum`, and `any`.|
|`regex`| <span class="optional">Optional</span>. String. Regular expression or custom regex used for pattern matching and more complex values. For example, 'zip code' property must have pattern `[0-9]{5}`.|
|`enum_values`| <span class="optional">Optional</span>. String. List of allowed values, separated by comma. For example: `red, yellow, blue`.|
|`is_array_type`|<span class="optional">Optional</span>. Boolean. Specifies whether the property value is an array.|

#### Response

This request returns either a true or false response.

```json
{
    "success" : true 
}
```

```json
{
    "success" : false 
}
```

### Delete a user property

Deletes a single user property, by name. 

`DELETE https://amplitude.com/api/2/taxonomy/user-property/USER_PROPERTY`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request DELETE 'https://amplitude.com/api/2/taxonomy/user-property/USER_PROPERTY' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash

DELETE /api/2/taxonomy/user-property/USER_PROPERTY HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded

```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Delete a user property"}}
This example deletes a custom user property "interests". Notice that the user property is prefixed with `gp:`.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request DELETE 'https://amplitude.com/api/2/taxonomy/user-property/gp:interests' \
--header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash

DELETE /api/2/taxonomy/user-property/gp:interests HTTP/1.1
Host: amplitude.com
Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

#### Path parameters

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`user_property`|<span class="required">Required</span>. The user property name. Prefix custom user properties with `gp:`|

#### 200 OK response

A successful request returns a `200 OK` response and a JSON message.

```json
{
    "success": true
}
```

#### 409 conflict response

A failed request returns a `409 Bad Request` status and an error message.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Attempted to remove a user property, \"sdf\", that is not a planned user property."
        }
    ]
}
```