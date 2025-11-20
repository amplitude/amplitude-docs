---
id:
blueprint: destination-catalog
title: 'Notifly (Cohort Sync)'
author:
connection: destination
integration_type:
  - cohorts
integration_category:
  - marketing-automation
partner_maintained: false
integration_icon: partner-icons/notifly.svg
use_cases:
  - 'Target key cohorts with messaging informed by customer insights'
exclude_from_sitemap: false
updated_by:
updated_at:
source: 'https://docs.developers.amplitude.com/data/destinations/notifly-cohort-sync'
---

The Notifly destination allows you to sync your Amplitude-built cohort to your [Notifly](https://notifly.tech/en) user group for targeting purposes.

## Use cases

1. **Cart Abandonment Recovery:** Sync a cohort of users who added items to their cart but didn't complete checkout to Notifly, then trigger a user journey with a series of reminder notifications offering incentives to complete their purchase.
2. **Feature Adoption Campaigns:** Create a cohort of users who haven't tried a new feature and sync it to Notifly to run a targeted campaign with in-app messages and push notifications demonstrating the feature's value and driving adoption.
3. **Win-Back Inactive Users:** Identify users who haven't opened the app in 30 days, sync this cohort to Notifly, and set up a user journey that sends a sequence of messages with personalized content, special offers, or updates to re-engage them.

## Considerations

- This integration maps an Amplitude user ID to the external_user_id of a Notifly user.
- Anonymous users are not supported. Each user must have a user ID to be identified across Amplitude and Notifly. Please ensure that the selected user property exists in both Amplitude and Notifly.
- Notifly creates one user group per cohort. To avoid cohort discrepancies, each new sync for the same cohort will reset the existing user group. (Note: "new sync" refers to a newly added destination.) Be careful when syncing again with a different mapping.

## Notifly setup

In Notifly, navigate to Settings.
Copy the Project ID and API Credentials (Access and Secret Key).

## Amplitude setup

1. In Amplitude Data, navigate to *Catalog > Destinations* tab.
2. In the Cohort section, click *Notifly*.
3. Enter a name, your Notifly Project ID, Access Key, and Secret Key.
4. Map an Amplitude user ID to the Notifly external_user_id. You can choose any pre-defined or custom user property in Amplitude to serve as the user ID.
5. Save when finished.

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click Sync, and choose Notifly.
2. Choose the destination.
3. Select the sync cadence.
4. Save your work.

{{partial:admonition type="note" title=""}}
For scheduled cohort syncs, only the initial sync will include the full cohort. All subsequent syncs will include all additions and removals since the last sync.
{{/partial:admonition}}

## Cohorts in Notifly

After you send your Amplitude cohort to Notifly, you can see it in the *User Groups* section of the Notifly dashboard. Cohorts sent by Amplitude include an "(Amplitude)" suffix in the name.

Notifly only ingests users for whom they have identifiers.

{{partial:admonition type="example" title=""}}
User A, User B, and User C are in the Amplitude cohort (Cohort 1). Notifly only has identifiers for User A and User C. Notifly creates a user group that includes User A and User C, and drops User B.
{{/partial:admonition}}
