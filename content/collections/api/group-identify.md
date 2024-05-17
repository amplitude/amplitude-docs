---
id: 4d2cf9ef-beac-4b30-a798-689da9b5417c
blueprint: api
title: 'Group Identify API'
source: 'https://www.docs.developers.amplitude.com/analytics/apis/group-identify-api/'
auth_method: api_key
standard_endpoint: 'https://api2.amplitude.com/groupidentify'
eu_endpoint: 'https://api.eu.amplitude.com/groupidentify'
postman_link: 'https://www.postman.com/amplitude-dev-docs/workspace/amplitude-developers/folder/20044411-2ed076b0-6456-4c16-8b85-a675d9f156df?action=share&source=copy-link&creator=29131806&ctx=documentation'
lede: |-
  Use the Group Identify API to set or update the properties of particular groups.

  The Amplitude [Accounts add-on](/analytics/account-level-reporting) makes analytical functionality available at the group level. A group is an object that a set of users might belong to, like a company of customers, team of users, or a playlist with listeners. Groups can help you understand how accounts interact with your product, instead of how individual users interact.
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1715973802
---
## Considerations

- Updates affect only future events, and don't update historical events.
- You can track up to 5 unique group types and 10 total groups per event.
- The maximum number of group identifies per request is 1024.
- The maximum number of group properties per request is 1024.
- The maximum byte size/per request is 1 mb.

## Request

Set or update group properties.

`POST https://api2.amplitude.com/groupidentify`

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request POST '<https://api2.amplitude.com/groupidentify>' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'api_key=<API_KEY>' \
--data-urlencode 'identification=[{"group_properties":{"org csm":"Lucas","org plan":"Enterprise","org owner":"Luis"},"group_type":"Seller","group_value":"12345678"}]'
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
POST /groupidentify?api_key={api-key}&identification={"group_properties":{"org_csm":"Lucas","org_plan":"Enterprise","org_owner":"Luis"},"group_type":"org_id","group_value":"12345678"} HTTP/1.1
Host: api2.amplitude.com
```
{{/partial:tab}}
{{/partial:tabs}}

### Required parameters


|<div class="big-column">Name</div>|Description|
|---|----|
|`api_key`|Your project API key.|
|`identification`|Either a single JSON identification object or an array of JSON objects, each of which represents one identification. |

### Identification parameter keys

| <div class="big-column">Key</div>  | Description | Example |
| ---  | --- | --- |
| `group_type` | String. Group type. | "org name", "org id" |
| `group_value` |String. One specific value of the `group_type`.  <br> | `"group_type":"org id","group_value":"12345678"` or `"group_type":"account name","group_value":"Acme Corp"`. Ex.`"org id":"12345678", "account name":"Acme Corp"` 
| `group_properties` |String. A dictionary of key-value pairs that represent data tied to the group. Each distinct value appears as a group segment on the Amplitude dashboard.  <br> You can store property values in an array, and date values are transformed into string values. See the next table for supported operations. | `{"arr": "10000", "cs": \["Justin", "Ben"\], "renewal_date": “01/01/2018" }` |

`group_properties` supports these operations:

| <div class="big-column">Operation</div> | Description |
| --- | --- |
| `$set` | Set the value of a property. |
| `$setOnce` | Set the value of a property, prevent overriding the property value. |
| `$add` | Add a numeric value to a numeric property. |
| `$append and $prepend` | Append and prepend the value to a group property array. |
| `$unset` | Remove a property. |

## Status codes

|Code|Message|
|----|---------|
|200|Success|
|400|Bad request. See the error message for specifics.|