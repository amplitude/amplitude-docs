---
id: 21aa4205-1f40-42c4-ab52-6166c31f9ef3
blueprint: destination-catalog
title: 'Intercom (Cohort Sync)'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - cohorts
integration_category:
  - customer-engagement
partner_maintained: false
integration_icon: partner-icons/intercom.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713566523
source: 'https://www.docs.developers.amplitude.com/data/destinations/intercom-cohort/'
---

Send behavioral cohorts from Amplitude to Intercom so that you can better engage your users based on how they’ve interacted with your product and their lifecycle timing. 

## Considerations
- This integration must be enabled on a per-project basis within Amplitude.
- This integration supports real-time sync. Real-time syncs update each minute and are built for interactive use cases where a rapid update is required.

## Setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Intercom**.
3. Log into your Intercom account (via OAuth) to authenticate and select the account you want to sync the cohort to.
4. Intercom redirects you to the Amplitude dashboard. Select the identifiers you want to use for the cohort sync.
5. Save your work when finished.

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose Intercom.
2. Choose the destination.
3. Select the sync cadence.
4. Save your work.

{{partial:admonition type="note" title=""}}
Users are exported based on their **user ID**. Users must already exist in Intercom with corresponding user IDs in order to be properly synced
{{/partial:admonition}}

{{partial:admonition type="note" title=""}}
For scheduled cohort syncs, the initial sync includes the full cohort. All subsequent syncs update the original cohort via additions and removals.
{{/partial:admonition}}
