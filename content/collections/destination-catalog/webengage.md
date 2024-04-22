---
id: a3411d91-bf78-4e36-9fe4-9444cecd8dd2
blueprint: destination-catalog
title: Webengage
source: 'https://docs.developers.amplitude.com/data/destinations/webengage'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - cohorts
integration_category:
  - marketing-automation
partner_maintained: false
integration_icon: partner-icons/web-engage.svg
use_cases:
  - 'Engage cohort users with highly targeted & personalized messages through their preferred channel. Be it Push, In-app, SMS, Web Overlays, Web Push, Email, or WhatsApp.'
  - 'Drive retention-led growth by activating dormant customers, promoting repeat purchases, and driving platform engagement & content consumption.'
short_description: 'A robust customer data platform, personalization engine, omnichannel campaign manager, and an analytics engine all baked into one seamless full-stack Retention OS.'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713481379
---
[WebEngage](https://webengage.com/) enables Product and marketing teams to configure in-app nudges to improve feature adoption and drive conversions. Fully no-code.

WebEngage is a user engagement and retention platform that enables you to send personalized marketing communications across 12+ channels, including email, push notification, WhatsApp, and more.

## Considerations

- This integration is only available for customers who have paid plans with Amplitude.
- You must enable this integration in each Amplitude project you want to use it in.
- You need a paid WebEngage plan to enable this integration.
- Amplitude matches the `user_id` to the `CUID` in WebEngage to associate cohorts. If a user with a specific `user_id` doesn't exist in WebEngage, WebEngage doesn't create a user. Make sure that the Amplitude `user_id` field matches the WebEngage id field (`CUID`) to avoid user duplication.

## Setup

To configure the Cohort integration from Amplitude to WebEngage, complete the following steps in each platform.

### WebEngage 

In WebEngage, navigate to Data Platform > Integrations > REST API and copy the REST API key.

### Amplitude

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **WebEngage**.
3. Enter **Name** and paste in the **API** key you copied from **WebEngage**.
4. Select the Amplitude properties that map to WebEngage's User ID.
5. Save when finished.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **WebEngage**, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence.
5. When finished, save your work.

### Use cases

Exporting user or behavioral-based Amplitude cohorts to WebEngage enables you to:

1. Drive retention-led growth by activating dormant customers, promoting repeat purchases, and driving platform engagement & content consumption. 
2. Engage cohort users with highly targeted & personalized messages through their preferred channel. Be it Push, In-app, SMS, Web Overlays, Web Push, Email, or WhatsApp.