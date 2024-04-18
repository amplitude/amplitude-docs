---
id: aabe343e-46b4-45a5-9b56-2db63db22d25
blueprint: destination-catalog
title: Appcues
source: 'https://docs.developers.amplitude.com/data/destinations/appcues'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713457602
---
Amplitude's Appcues integration allows you to send finely targeted behavioral audiences from Amplitude to Appcues. You can then use them to power tailored in-product onboarding tutorials, tooltips, announcements, promotions, and surveys.

## Considerations

- You need an Appcues account.
- You must have a user property in Amplitude that matches the User ID field in Appcues.

## Setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Appcues**.
3. Enter your Appcues account ID. You can find your account ID by following [these instructions](https://docs.appcues.com/article/254-http-api).
4. Select the Amplitude user property to map to the Appcues `User ID` field. This property should match the `User ID` field.
5. Save your work.

## Send a cohort

To sync a cohort between Amplitude and Appcues, follow these steps:

1. Open your cohort and select the API target to sync to.
2. Specify the custom field to sync to. Appcues automatically creates this field the first time your cohort syncs. The field name can't contain any quote characters.
3. Specify whether to run a one-time sync, or whether you want the sync to occur on a scheduled basis.

In Appcues, the cohort appears as a user property. Its name matches the one you provided for the custom field. It's set to `true` if a user is in the cohort at the time of sync, and `false` if they're not.