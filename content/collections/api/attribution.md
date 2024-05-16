---
id: bd6019bc-6556-4d83-ad33-70183a3a42f3
blueprint: api
title: 'Attribution API'
source: 'https://www.docs.developers.amplitude.com/analytics/apis/attribution-api/'
auth_method: api_key_query
standard_endpoint: 'https://api2.amplitude.com/attribution'
eu_endpoint: 'https://api.eu.amplitude.com/attribution'
postman_link: 'https://www.postman.com/amplitude-dev-docs/workspace/amplitude-developers/folder/20044411-1fcbe9b1-677c-41ba-9e24-4d8419730071?action=share&source=copy-link&creator=29131806&ctx=documentation'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1715890380
lede: "The Attribution API is for sending attribution campaign events (identified by\_`idfa`,\_`idfv`, or\_`adid`) that contain attribution information."
---

## Considerations

- When Amplitude can't match attribution events to an existing user, they're held for up to 72 hours for potential user matching. If an event isn't logged for a matching user within 72 hours of receiving the attribution data, then Amplitude **drops the attribution data**.
- For most of Amplitude's partners, attribution is matched to Amplitude users and events via the Advertising ID (IDFA, IDFV, or ADID). Therefore, you must send the Advertising ID for attribution requests and you must set the `idfa`, `idfv`, and `adid` fields in Amplitude as the Advertising ID. 
- If you are using the iOS SDK or Android SDK, you can enable tracking of the Advertising ID by following the instructions [here](/sdks/analytics/ios/ios-swift-sdk#advertiser-id). If you are using a JavaScript SDK or React Native, these don't have the functionality to collect Advertising ID automatically due to Google's and Apple's privacy rules around advertising ID and web tracking. You have to send the Advertising ID through the Http API endpoint so that Amplitude can match attribution data/events. See keys in the [Http API V2](/apis/analytics/http-v2) doc.

## Send an attribution event

Send a `POST` request to {{standard_endpoint}} with two arguments: `api_key` and `event`.

### Required arguments

|Name| Description  | Example|
|---|---|---|
|`api_key`| <span class="required">Required</span>. The project's API key. | `api_key`|
|`event`| <span class="required">Required</span>. A request parameter representing the event, in JSON format.| `{"event_type":"[YOUR COMPANY] Install", "idfa": "AEBE52E7-03EE-455A-B3C4-E57283966239", "user_properties": {"[YOUR COMPANY] media source": "facebook", "[YOUR COMPANY] campaign": "refer-a-friend"}, "platform": "ios"}`|

### Event argument keys

These keys are available for the Event argument.

| <div class="big-column">Key</div>              | Description                                                                                                                          | Example                                                  |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|
| `event_type`     | <span class="required">Required</span>. String. The event info. Prefix with brackets `[YOUR COMPANY]`.                                                             | `[YOUR COMPANY] Install`                                 |
| `platform`       | <span class="required">Required</span>. String. Either `ios` or `android`.                                                                                         | `ios`                                                    |
| `idfa` or `idfv` | <span class="required">Required for iOS</span>. String. The Identifier for Advertiser or the Identifier for Vendor. You must include *at least* one for iOS devices. | AEBE52E7-03EE-455A-B3C4-E57283966239                     |
| `adid`           | <span class="required">Required for Android</span>. String. The Google ADID, or Amazon Advertising ID for Amazon devices.                                          | AEBE52E7-03EE-455A-B3C4-E57283966239                     |
| `android_id`       | <span class="optional">Optional</span>. String. (Android) The Android ID                                                                                           | AEBE52E7-03EE-455A-B3C4-E57283966239                     |
| `user_properties`  | <span class="optional">Optional</span>. Dictionary. A dictionary of attribution properties prefixed with brackets `[YOUR COMPANY]`.                                | `{"[YOUR COMPANY] media source": "Facebook"}`            |
| `time`             | <span class="optional">Optional</span>. Long. Timestamp of the event in milliseconds since epoch.                                                                  | 1396381378123. It's set to the upload time by default |

### Example request

The following code illustrates attribution for iOS.

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request POST 'https://api.amplitude.com/attribution' \
--data-urlencode 'api_key=123456789' \
--data-urlencode 'event={"event_type":"[YOUR COMPANY] Install", "idfa": "AEBE52E7-03EE-455A-B3C4-E57283966239", "user_properties": {"[YOUR COMPANY] media source": "facebook", "[YOUR COMPANY] campaign": "refer-a-friend"}, "platform": "ios"}'
```
{{/partial:tab}}
{{partial:tab name="Http"}}
``` bash
POST /attribution HTTP/1.1
Host: api.amplitude.com
Content-Length: 365

api_key={{api_key}}&event=%7B%22event_type%22%3A%22%5BYOUR%20COMPANY%5D%20Install%22%2C%20%22idfa%22%3A%20%22AEBE52E7-03EE-455A-B3C4-E57283966239%22%2C%20%22user_properties%22%3A%20%7B%22%5BYOUR%20COMPANY%5D%20media%20source%22%3A%20%22facebook%22%2C%20%22%5BYOUR%20COMPANY%5D%20campaign%22%3A%20%22refer-a-friend%22%7D%2C%20%22platform%22%3A%20%22ios%22%7D
```
{{/partial:tab}}
{{/partial:tabs}}

The following example illustrates attribution on Android.

{{partial:tabs tabs="cURL, Http"}}
{{partial:tab name="cURL"}}
```curl
curl --location -g --request POST 'https://api2.amplitude.com/attribution?api_key=123456789&event={"event_type":"[YOUR COMPANY] Install","adid": "AEBE52E7-03EE-455A-B3C4-E57283966239", "user_properties": {"[YOUR COMPANY] media source": "facebook", "[YOUR COMPANY] campaign": "refer-a-friend"}, "platform": "android"}'
```
{{/partial:tab}}
{{partial:tab name="Http"}}
```bash
POST /attribution?api_key=api_key&event="{event_type":"[YOUR COMPANY] Install","adid": "AEBE52E7-03EE-455A-B3C4-E57283966239", "user_properties": {"[YOUR COMPANY] media source": "facebook", "[YOUR COMPANY] campaign": "refer-a-friend"}, "platform": "android"} HTTP/1.1
Host: api2.amplitude.com
```
{{/partial:tab}}
{{/partial:tabs}}

## Responses

| Code | Message                                                                                                                     |
|------|-----------------------------------------------------------------------------------------------------------------------------|
| 200  | Success                                                                                                                     |
| 400  | The expected JSON is formatted incorrectly.  |