---
id: d27d0516-c3d4-45db-97a1-9d634147dbee
blueprint: destination-catalog
title: 'Cohort Webhooks'
source: 'https://docs.developers.amplitude.com/data/destinations/cohort-webhooks'
category: 'Cohort syncing'
partner_maintained: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1721766883
integration_type:
  - cohorts
---
Cohort webhooks allow you to receive cohort updates to your webhook endpoints. This allows for custom data enrichment, filtering, or aggregation based on the specific requirements of the webhook endpoint or internal systems. Integrate the transformed data into marketing automation platforms or other systems, enabling personalized and targeted marketing campaigns with up-to-date cohort insights.

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.
- You need a paid Amplitude plan to use Cohort Webhooks.
- Cohort Webhooks send add or remove batches to the destination. Expect the destination to process each batch within 1–2 seconds (including network latency) to ensure Amplitude receives a 200 OK response within retry limits. If the destination doesn’t respond in time, the call times out and retries, which may result in duplicate payloads.
- Amplitude recommends that you test destination endpoint latency with tools like Postman to confirm responses are within the expected window.
- If processing takes longer, use an async API pattern that returns a 200 OK immediately and handles the payload asynchronously, for example with in-memory queues.

## Setup

1. To configure streaming from Amplitude to your webhook, collect the following information:

      - **Webhook URL**: The destination URL Amplitude should use to send events and users.
      - **Header Information**: You can set up to five extra headers for the webhook request.

2. Create a new destination.

      1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
      2. In the Cohorts section, click **Webhook**.

3. Enter the URL endpoint for the webhook. For example, `https://mycompany.com/webhook`.
Amplitude doesn't have a single IP address for forwarding events and users, so ensure that your URL can receive payloads from any Amplitude hosts.

4. There are two preset headers for every webhook sync:

      - `Content-Type: application/json`
      - `User-Agent: Amplitude/Webhook/1.0`

      After these preset headers, you can define five more headers. To create a new header:

      1. Enter the header name on the left side text box
      2. Enter the header value on the right side text box
      3. A new header row appears if the limit isn't reached

5. Define the payload you want to receive in the webhook. You can choose to:
    1. Send the default Amplitude payload which follows the Amplitude cohort format. 
    2. Customize the payload using an [Apache FreeMarker](https://freemarker.apache.org/) template. See [FreeMarker Templating Language](#freemarker-templating-language) for more information.

6. When satisfied with your configuration, click **Save** to complete the setup process.

## Establish Cohort syncs to your destination

1. In Amplitude, open the cohort you want to export.
2. Click **Sync**, and choose Webhook.
3. Select the defined webhook destination.
4. (Optional) Select up to 50 user properties to carry along with the user. Amplitude adds the selected properties to the user payload, and makes them accessible in the FreeMarker template.
5. Select the sync cadence.
6. Click **Sync** to begin the sync. 

## FreeMarker Templating Language

See the FreeMarker [guide to creating templates](https://freemarker.apache.org/docs/dgui.html) for more help.

### Example template for sending user ID only cohort updates

{{partial:tabs tabs="Template, Payload"}}
{{partial:tab name="Template"}}
```FreeMarker
{
   "cohort_name": "${input.cohort_name}",
   "cohort_id": "${input.cohort_id}",
   "in_cohort": ${input.in_cohort?c},
   "computed_time": "${input.computed_time}",
   "message_id": "${input.message_id}",
   "users": [
   <#list input.users as user>
   {
      "user_id": "${user.user_id}"
   }<#sep>,
   </#list>
   ]
}
```
{{/partial:tab}}
{{partial:tab name="Payload"}}
```json
{
    "cohort_name": "My Test Cohort",
    "cohort_id": "7khm89cz",
    "in_cohort": true,
    "computed_time": "1692206763",
    "message_id": "9baaa88f-9d46-4ee5-a946-be0c6aea0046::enter::0",
    "users": [
      {
         "user_id": "user_one@example.com"
      },
      {
         "user_id": "user_two@example.com"
      },
      {
         "user_id": "user_three@example.com"
      }
    ]
}
```
{{/partial:tab}}
{{/partial:tabs}}

### Example template for sending user with user properties cohort updates

{{partial:tabs tabs="Template, Payload"}}
{{partial:tab name="Template"}}
```FreeMarker
{
    "cohort_name": "${input.cohort_name}",
    "cohort_id": "${input.cohort_id}",
    "in_cohort": ${input.in_cohort?c},
    "computed_time": "${input.computed_time}",
     "message_id": "${input.message_id}",
    "users": [
     <#list input.users as user>
     {
         "user_id": "${user.user_id}",
         "user_properties": {
            <#list input.user_properties?keys as key>
                <#assign value = input.user_properties[key]>
                "${key}": <#if value?is_number || value?is_boolean>${value}<#else>${UtilClass.toJsonString(value)}</#if><#if key_has_next>,</#if>
            </#list>
        }
      }<#sep>,
     </#list>
]
}
```
{{/partial:tab}}
{{partial:tab name="Payload"}}
```json
{
 "cohort_name": "My Test Cohort",
 "cohort_id": "7khm89cz",
 "in_cohort": true,
 "computed_time": "1692206763",
 "message_id": "9baaa88f-9d46-4ee5-a946-be0c6aea0046::enter::0",
 "users": [
   {
     "user_id": "user_one@example.com",
     "user_properties": {
       "name": "John Doe",
       "country": "US",
       "city": "San Francisco"
     }
   },
   {
     "user_id": "user_two@example.com",
     "user_properties": {
       "name": "Jane Smith",
       "country": "US",
       "city": "New York"
     }
   },
   {
     "user_id": "user_three@example.com",
     "user_properties": {
       "name": "Alice Johnson",
       "country": "US",
       "city": "Los Angeles"
     }
   }
 ]
}
```
{{/partial:tab}}
{{/partial:tabs}}


### Example template for sending cohort updates per user

Some webhook destinations would need a list of users as a batch. In the below example, set the cohort name and cohort id as a single boolean property determining whether the user is in the cohort or not.

{{partial:tabs tabs="Template, Payload"}}
{{partial:tab name="Template"}}
```FreeMarker
[ < #list input.users.iterator() as user > {
	'user_id': '${user.user_id}',
	'amplitude_${input.cohort_name}_${input.cohort_id}': $ {
		input.in_cohort
	}
} < #if user_has_next > , < /#if></#list > ]
```
{{/partial:tab}}
{{partial:tab name="Payload"}}
```json
{
   [
      {
         "user_id": "user_one@example.com",
         "amplitude_My Test Cohort_7khm89cz": true
      },
      {
         "user_id": "user_two@example.com",
         "amplitude_My Test Cohort_7khm89cz": true
      },
      {
         "user_id": "user_three@example.com",
         "amplitude_My Test Cohort_7khm89cz": true
      }
    ]
}
```
{{/partial:tab}}
{{/partial:tabs}}

### Other useful information for templates

- FreeMarker replaces the `${ ... }` constructs with the value of the expression inside the curly braces.
- `input` is a reserved variable that refers to the event as an object. The "input" has the same format as the example payload above.
- `input` has the following below format:
  - `cohort_name` string. The display name of the cohort.
  - `cohort_id` string. The unique identifier of the cohort.
  - `in_cohort` boolean. Show if this batch of users is entering/leaving the cohort.
  - `computed_time` string. The time Amplitude computes this update, represented as Unix epoch time in seconds (for example, `"1692206763"`).
  - `message_id` string. The unique identifier of this update message. When a retry happens, you can use this value to de-duplicate.
  - `users` list of JSON objects. The actual user payload.
    - `user_id` string. The Amplitude `user_id` of the user.
    - `user_properties` JSON object. The user properties selected for this user during this cohort sync.
