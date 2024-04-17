---
id: 92609ebd-5820-4841-8c14-d93cc9eae5c9
blueprint: destination-catalog
title: Airship
source: 'https://docs.developers.amplitude.com/data/destinations/airship'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - cohorts
integration_category:
  - customer-engagement
partner_doc_link: '"https://docs.airship.com/integrations/amplitude/ "'
use_cases:
  -
    id: lv4g0gh9
    use_case: "Use Amplitude's analytics to segment users based on behavior and preferences, and then target these cohorts with Airship's personalized messaging across various channels."
  -
    id: lv4g0i5y
    use_case: 'Leverage Airship to deliver data-driven, contextual interactions to Amplitude-defined user segments, improving engagement, retention, and conversion rates.'
short_description: 'Airship provides an end-to-end solution for capturing value across the entire customer app lifecycle—from acquisition and activation to engagement and loyalty.'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713396481
---
This integration combines Amplitude's analytics with Airship's customer engagement tools into one unified system. Use this integration to interact with any user segment or cohort via push notifications, in-app messages, and more to advance your app engagement or conversion goals.

You can also send events from Airship to Amplitude if your Airship plan includes real-time data streaming. For more information, visit the [Airship documentation center](https://docs.airship.com/partners/amplitude/).

## Considerations

- To schedule daily and hourly syncs, you need Amplitude Audiences.

## Prerequisites 

If you use Amplitude's SDKs, integrate both the Airship and [Amplitude SDKs](https://help.amplitude.com/hc/en-us/sections/115000961027-SDK-Installation) in your app. Then follow the instructions in these articles link key identifiers: 

- Amplitude: [SDKs and APIs](https://developers.amplitude.com/docs)
- Airship: [Getting Started Guide](http://docs.urbanairship.com/dev-resources.html#getting-started) 

If you use Amplitude's Http API to send server-side events, you can send these key identifiers as user properties via Identify API.

In the app code, link identifiers between the two services. See the following code samples, depending on your platform.

{{partial:admonition type="note"}}
Amplitude recommends you store your Airship Channel ID as a custom user property in Amplitude, named `UAChannelID`.
{{/partial:admonition}}

{{partial:tabs tabs="iOS, Android, Identify API"}}
{{partial:tab name="iOS"}}
```swift
AMPIdentify *identify = [[AMPIdentify identify] set:@"UAChannelID" value:[UAirship push].channelID]; [[Amplitude instance] identify:identify];
```
{{/partial:tab}}
{{partial:tab name="Android"}}
```kotlin
AMPIdentify *identify = [[AMPIdentify identify] set:@"UAChannelID" value:[UAirship push].channelID]; [[Amplitude instance] identify:identify];
```
{{/partial:tab}}
{{partial:tab name="Identify API"}}
```bash
curl --data 'api_key=040062a5d38552315b98302ba4f2f' --data 'identification=[{"user_id":"datamonster@gmail.com", "user_properties":{"UAChannelID":"12345-6789-01234"}}]' https://api.amplitude.com/identify
```
{{/partial:tab}}
{{/partial:tabs}}

To confirm you've configured it correctly, [look up your test user or device in Amplitude](/analytics/user-data-lookup). See the `UAChannelID `property stored as a user property at the top of your user profile.

## Amplitude setup 

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Airship**.
3. Enter your Airship API keys.
4. Map your Airship ID to an Amplitude ID. Amplitude recommends mapping `UAChannelID` in Amplitude to `Auto Channel ID` in Airship; however, you can map user ID, device ID, or any user property in Amplitude to any Airship ID.
5. Save your work.

!!!note
    Auto Channel maps to the channel ID of the correct platform (Android or iOS) in Airship automatically.

## Airship setup

Create a tag group in Airship called "Amplitude".

1. In Airship, navigate to **Settings -> APIs and Integrations** and click **Tag Groups**. 
2. Fill in the tag name, description, and group key. Be sure to set the group key as "amplitude".

After you deploy the application update, you can sync cohorts.

## Send a cohort

To sync cohorts between Amplitude and Airship, follow these steps:

1. Create a [behavioral cohort](https://help.amplitude.com/hc/en-us/articles/231881448-Behavioral-Cohorts) in Amplitude. Make sure your cohort contains at least one user.
2. In the behavioral cohort, click **Sync** in the menu, and select **Airship**. Your Airship dashboard begins processing this cohort as a new tag under the "Amplitude" tag group.

After the tag finishes processing, compose your message in Airship's Message Composer. The Amplitude-defined tags are in the search bar, under the Amplitude tag group. The tags created in Airship have **[Amplitude]** as a prefix.