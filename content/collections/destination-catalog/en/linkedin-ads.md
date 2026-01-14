---
id: 02480ebe-7109-4b9b-bf59-9b2e7116cab0
blueprint: destination-catalog
title: 'LinkedIn Ads'
connection: destination
integration_type:
  - event-streaming
integration_category:
  - ad-networks
partner_maintained: false
integration_icon: partner-icons/linkedin_icon.svg
exclude_from_sitemap: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1752783707
---

LinkedIn Ads is a digital advertising platform that helps you reach professional audiences with targeted campaigns. With this integration, you can stream Amplitude events directly to LinkedIn Ads to help improve targeting, conversion tracking, and campaign optimization.

## Considerations

Before you begin, ensure you have the following:

- A LinkedIn Ads account with access to OAuth
- Your LinkedIn Ads conversion ID

## Use cases

Streaming events from Amplitude to LinkedIn Ads enables the following use cases, among others:

* **Retarget high intent users**: Trigger LinkedIn Ads using behavioral signals like pricing page views, trial starts, or cart abandonment. This helps you re-engage users who are close to converting, but haven't yet taken action.
* **Improve attribution with product signals**: Send product milestones like onboarding completion or feature use as conversion events to LinkedIn. This provides you with better insight into which campaigns lead to meaningful product outcomes, not just ad clicks.
* **Optimize for revenue impact**: Map event properties like purchase value or subscription tier to LinkedIn Ads conversion value fields. This enables you to optimize campaigns toward users who generate the most value, rather than basic conversions.

## Setup

1. In the Amplitude integrations catalog, find and click the LinkedIn Ads destination.
2. Enter a unique **Sync name** to help distinguish this integration from others you might have.
3. Authenticate with LinkedIn. Select an existing OAuth connection, or create a new one.
4. Enter your LinkedIn Ads **Conversion ID**.
5. Select the **ID Type** to send to LinkedIn Ads:

  * **SHA256 Email**: Your identifiers are SHA256 hashed email addresses. Values of this type must be lower case and have no whitespace.
  * **LinkedIn First Party Ads Tracking UUID**: Your identifiers are LinkedIn tracking IDs that you capture in your site or app.
  * **Acxiom ID**: Your identifiers come from Acxiom identity resolution, and you pass those as users properties in Amplitude.
  * **Oracle Moat ID**: Your identifiers come from Oracle's Moat ad measurement platform.

6. Select and map the user identifier. Select the Amplitude user property that matches the ID type you selected in step 5. For example, you might select `User ID`, `Device ID`, or a custom property like `hashed_email`. Amplitude links this property to LinkedIn's `ID Value` and ensures LinkedIn associates events with the correct user.
7. Select the events you want to send to LinkedIn. You can send all events, but Amplitude recommends that you choose events that best correlate to campaign performance. Optionally turn the toggle off to send no events.
8. Optionally map Amplitude properties to the LinkedIn `Conversion Value` and `Currency Code` properties.
9. When you're done, enable the destination, test the connection, and click **Save**.

After you enable the destination, Amplitude begins streaming the events and user identifiers you select to LinkedIn Ads so you can use them for targeting and conversion tracking.

