---
id: 23e4ae70-5d61-4256-afb5-a829f89fd4ce
blueprint: destination-catalog
title: Batch
source: 'https://docs.developers.amplitude.com/data/destinations/batch'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - cohorts
integration_category:
  - other
partner_doc_link: 'https://batch.com/partners/amplitude'
use_cases:
  -
    id: lv5gvf50
    use_case: 'When you sync specific user cohorts from Amplitude to Batch, you can target those users more directly in push or in-app campaigns. For example, target a cohort of users who have abandoned their shopping carts with a notification that offers a discount to encourage completion of the purchase.'
  -
    id: lv5gvjnn
    use_case: "Identify cohorts of users who haven't engaged with the app or website for a set period in Amplitude and sync them to Batch. Re-engage these users with personalized content or updates relevant to their previous interactions, aiming to bring them back to the app or website."
short_description: "Batch is a customer engagement platform that allows publishers to personalize push notifications and emails across multiple mobile platforms and web browsers. Batch offers an SaaS solution, integrating with clients' apps and websites via an SDK. This integration lets you sync cohorts from Amplitude to Batch."
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713458468
---
[Batch](https://batch.com/)  is a customer engagement platform that allows publishers to personalize push notifications and emails across multiple mobile platforms and web browsers. Batch offers a SaaS solution, integrating with clients' apps and websites via an SDK. This integration lets you sync cohorts from Amplitude to Batch.  

## Considerations

- This integration is available for customers who have paid plans with Amplitude.
- You must enable this integration in each Amplitude project you want to use it in.
- This integration requires a paid Batch plan.
- The integration requires both custom audiences and third-party connections in Batch.
- Batch expects an identifier that matches the Batch Custom User ID or the Installation ID field. This means the `user_id` or user property you select in Amplitude must contain the same identifier as the one tracked in Batch in one of these fields.

## Setup

Batch supports two types of cohort destination:

- Use the **Batch (Profile)** destination to sync your cohorts with your Batch Omnichannel project.
- Use the **Batch** destination to sync your cohorts with a specific mobile app or website.

### Batch setup

1. In Batch, navigate to Settings > General.
2. Copy the API Key ("Live API Key" for mobile or "SDK API Key" for web) of the application in which you want to use Amplitude’s Cohorts OR the Project key of the omnichannel project in which you want to use Amplitude’s Cohorts.
3. Copy your account's REST API Key.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Batch** or **Batch (Profile)**.
3. Click **Add another destination**.
4. Enter a **Name** and paste in the **API key** you copied from Batch.
5. If not using the **Batch (Profile)** destination: Select the type of identifier composing your segment on Batch (Custom User ID / Installation ID).
6. Map the Amplitude `user_id` field to the Batch `user_id` field.
7. Save when finished.

## Send a cohort

To sync your first cohort:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **Batch**, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence.
5. When finished, save your work.

## Locating your cohort in Batch

When the Cohort is synced to Batch, it appears in the “Audiences” tab of the dashboard. Select it in the targeting section of the campaign editor to use it in a Push, In-App, Email or SMS campaign. This is useful if you want to include or exclude a segment of users from your campaign.