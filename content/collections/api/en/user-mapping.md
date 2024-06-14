---
id: 47a3ffb0-471c-49dd-a6f7-76408dc7e5d5
blueprint: api
title: 'User Mapping (Aliasing) API'
source: 'https://www.docs.developers.amplitude.com/analytics/apis/aliasing-api/'
auth_method: api_key
standard_endpoint: 'https://api.amplitude.com/usermap'
postman_link: 'https://www.postman.com/amplitude-dev-docs/workspace/amplitude-developers/folder/20044411-7542d35e-29c3-4063-ba07-96b7fe0af15e?action=share&source=copy-link&creator=29131806&ctx=documentation'
api_status: ga
lede: |-
  It's not uncommon for user IDs for the same user to differ across projects within the same organization. The user mapping (aliasing) API lets you map users with different user IDs together in Amplitude.

  In this example, three user records, each with a different user ID, are all merged into the user ID `hank@globex.net`. This new user ID is that user's "global" user ID in the cross-project view. This way, you can get an accurate count of the number of unique users across your entire product portfolio.
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716312377
summary: 'If you use the Portfolio add-on, use this API to map and unmap users across projects to a global user ID.'
---
## Considerations

Keep these considerations in mind when using this API. 

- When you map User 1 to User 2 (the global user ID) the event stream on User 2 contains all the events associated with User 1 *and* User 2. However, User 1 only contains the events associated with User 1. 
- When you map users, user properties **aren't merged**. This means the user properties attached to each event are from the original user who triggered the event. User properties persist only on the original `user_id` and aren't transferred between User 1 and User 2.
- Users are merged in aggregated counts, however when applying a group, the user IDs are listed.
- When you use the User Lookup feature in Amplitude, the UI indicates a mapped user with "Remapped User IDs" or "Remapping Into User ID..."
- Contact Support if you need a list of merged user IDs. 

## Limits

The aliasing API has the following limits:

- Batch limits: 
    - Max of 2000 requests/events in a batch.
    - Max size of 1MB.
    - You can't increase batch limits.
- Rate limits: 
    - By default, Amplitude supports up to 50 events per second over a 30-second window, equalling 1500 alias calls (not batches) total in a 30-second window.
    - If you go over the limit, Amplitude throttles all requests until calls in the 30-second window fall below the limit.
    - If you need this limit increased, contact Amplitude Support.

## Query parameters

|<div class="big-column">Name</div>|Description|
|----|-----------|
|`api_key`| Required. String. an API Key for any project in your organization.|
|`mapping`| Required. Either a single JSON mapping object or an array of JSON objects, each of which represents a single mapping.|

### Mapping paramater

|<div class="big-column">Name</div>|Description|
|----|-----------|
|`user_id`| Required. String. A UUID (unique user ID) specified by you, for the user you want to map. Each JSON mapping object can contain one `user_id` to map.|
|`global_user_id`| Required unless `unmap` is true. String. A UUID (unique user ID) specified by you. The unified identity you want to map the other `user_id` to.|
|`unmap`|Optional. Boolean. When true, the current mapping for `user_id` is removed.|

## User mapping

Map a user ID to a global user ID. Remember that you can map a single user ID per JSON mapping object.

This is a basic request with only the required parameters. See the examples below for more detailed requests.

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```bash
curl --location -g --request POST 'https://api.amplitude.com/usermap?mapping=[{"user_id":"<USER_ID", "global_user_id": "<GLOBAL_USER_ID"}]&api_key=API_KEY'
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
POST /usermap?mapping=[{"user_id":"<USER_ID", "global_user_id": "<GLOBAL_USER_ID"}]&api_key=API_KEY
HTTP/1.1
Host: api.amplitude.com
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Map a user ID to a global user ID"}}
Maps the user ID "63629@hmail.com" to the global user ID "hank@globex.net".

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```curl
curl --location -g --request POST 'https://api.amplitude.com/usermap?mapping=[{"user_id":"63629@hmail.com", "global_user_id": "hank@globex.net"}]&api_key=123456789'
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
POST /usermap?mapping=[{"user_id":"63629@hmail.com", "global_user_id": "hank@globex.net"}]]&api_key=123456789 HTTP/1.1
Host: api.amplitude.com
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Map multiple users in one request"}}
Maps the user ID "63629@hmail.com" to the global user ID "hank@globex.net", and maps the user ID "12345@hmail.com" to the global user ID "hank@globex.net".

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```bash
curl --location -g --request POST 'curl --location -g --request POST 'https://api.amplitude.com/usermap?mapping=[{"user_id":"63629@hmail.com", "global_user_id": "hank@globex.net"}, {"user_id":"12345@hmail.com", "global_user_id": "hank@globex.net"}]&api_key=123456789'
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
POST /usermap?mapping=[{"user_id":"63629@hmail.com", "global_user_id": "hank@globex.net"}, {"user_id":"12345@hmail.com", "global_user_id": "hank@globex.net"}]&api_key=123456789 HTTP/1.1
Host: api.amplitude.com
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

## User unmapping

This is a basic request with only the required parameters. Remember that you can unmap a single user ID per JSON mapping object. See the examples below for more detailed requests.

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```bash
curl --location -g --request POST 'https://api.amplitude.com/usermap?mapping=[{"user_id":"<USER_ID", "unmap": true}]&api_key=API_KEY'
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
POST /usermap?mapping=[{"user_id":"<USER_ID>", "unmap": true}]&api_key=API_KEY
HTTP/1.1
Host: api.amplitude.com
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Unmap a user ID"}}
Unmaps the user ID "63629@hmail.com" and user ID "12345@hmail.com".

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```bash
curl --location -g --request POST 'curl --location -g --request POST 'https://api.amplitude.com/usermap?mapping=[{"user_id":"63629@hmail.com", "unmap":true}, {"user_id":"12345@hmail.com", "unmap":true}]&api_key=123456789'
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
POST /usermap?mapping=[{"user_id":"63629@hmail.com", "unmap":true}, {"user_id":"12345@hmail.com", "unmap":true}]&api_key=123456789 HTTP/1.1
Host: api.amplitude.com
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

## Get existing user mappings

Get the list of mappings that involve the provided user ids. 

{{partial:admonition type="note" heading=""}}
User mappings uses a different URL than the map and unmap endpoints above, `https://amplitude.com/api/2/usermap`.
{{/partial:admonition}}

```python
    user_ids = ["<REPLACE ME WITH LIST OF USER IDS>"]

    request_data = {
        "user_ids": user_ids,
    }
    url = 'https://amplitude.com/api/2/usermap'

    API_KEY = "REPLACE_ME"
    SECRET_KEY = "REPLACE_ME"
    result = requests.get(url, auth=HTTPBasicAuth(API_KEY, SECRET_KEY), data=request_data)
    if result.status_code != 200:
        raise AssertionError(
            "Request failed. Error: code - %s, text - %s" % (result.status_code, result.text))
    else:
        print(result.json())
```

### Query parameters

|<div class="big-column">Name</div>|Description|
|----|-----------|
|`api_key`| Required. String. an API Key for any project in your organization.|
|`secret_key`| Required. String. an API Secret Key for any project in your organization.|
|`user_ids`| Required. A list of user ids. Minimum 1 user id, maximum 100 user ids in a single request. |

### Response

The response for a POST request contains these fields:

| <div class="big-column">Name</div> | Description                                                                                               |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `user id`                          | A user id in the request list.                                                                            |
| `mappings`                         | The mappings associated with this user id. See next section. Empty if the requested user isn't found     |

The `mappings` key contains these fields:

| <div class="big-column">Name</div> | Description                                                                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `amplitude_id`                     | The Amplitude ID of the requested user                                                                                         |
| `mapped_from`                      | A list of objects that map into the requested user. {"amplitude_id": 1234, "user_id": "mappedUser"}                            |
| `mapped_to`                        | A list of objects that the requested user maps into {"amplitude_id": 1234, "user_id": "globalUser"}                            |

```json
 {
    "user1":
        {
           "mapped_from": [{
               "amplitude_id": 1234567,
               "user_id": "user3"
           }],
           "mapped_to": [{
               "amplitude_id": 1234567,
               "user_id": "user2"
           }]
         },
    "user2":
        {
           "mapped_from": [{
               "amplitude_id": 9988676,
               "user_id": "user1"
           }],
           "mapped_to": []
         }
}
 
```