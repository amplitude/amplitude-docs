---
id: 6a55acfa-0ff3-44e0-ba65-6d0c55543750
blueprint: destination-catalog
use_cases:
  - "Leverage Amplitude's cohort data to send targeted messages via OneSignal's customer messaging platform, driving engagement and conversion across multiple channels such as push notifications, email, SMS, and in-app messages."
  - 'Ingest events from OneSignal into Amplitude to enrich analytics and gain deeper insights into user engagement and the effectiveness of messaging campaigns.'
short_description: 'OneSignal is the most widely-used customer messaging and engagement solution, helping over a million businesses deliver over 10 billion messages to their customers each day.'
integration_category:
  - customer-engagement
integration_type:
  - cohorts
partner_doc_link: 'https://documentation.onesignal.com/docs/amplitude'
title: OneSignal
source: 'https://docs.developers.amplitude.com/data/destinations/onesignal'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/onesignal.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713479919
---
OneSignal offers a powerful multi-channel platform that includes mobile and web push notifications, in-app messaging, SMS, and email. When you integrate OneSignal with Amplitude, you can develop sound messaging strategies that drive user engagement and optimize conversions. 

OneSignal and Amplitude work together to enable you to sync cohorts from Amplitude to OneSignal to send targeted messaging.

For more information on how to set up and use this integration, see [OneSignal's documentation.](https://documentation.onesignal.com/docs/amplitude)

## Considerations

- This integration is only available for customers who have paid plans with both OneSignal and Amplitude.
- You must enable this integration for each Amplitude project you want to use it in.
- This integration doesn't support anonymous users. You have to set a user ID for each user to identify them between Amplitude and OneSignal. From OneSignal, you can use the [external id](https://documentation.onesignal.com/docs/external-user-ids) to do this. 
- The Amplitude Integration is available with OneSignal Growth package and higher tiers. Contact <a href="mailto:support@onesignal.com">OneSignal Support</a> with any questions.

## Setup

### OneSignal setup

1. In OneSignal, navigate to **Settings → Keys & IDs**. 
2. Copy the App ID and the API key.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **OneSignal**.
3. Enter a name, your OneSignal App ID, and API key.
4. Map an Amplitude user ID to the OneSignal external ID.
5. Save when finished. 

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose OneSignal.
2. Choose the destination.
3. Select the sync cadence.
4. Save your work.

After you export the cohort, you can create a segment in OneSignal that includes the cohort. See the [OneSignal documentation](https://documentation.onesignal.com/docs/amplitude#step-6-how-to-use-an-amplitude-cohort-within-your-segment) for more information.
