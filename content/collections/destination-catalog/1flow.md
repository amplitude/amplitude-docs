---
id: 787eaf94-411a-405c-bc1c-3ed9054d0202
blueprint: destination-catalog
title: 1Flow
source: 'https://docs.developers.amplitude.com/data/destinations/1flow'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_category:
  - qualitative-feedback
integration_type:
  - cohorts
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713396323
partner_doc_link: 'https://docs.1flow.ai/integrations/amplitude'
use_cases:
  -
    id: lv4fr2kf
    use_case: 'Sync Amplitude cohorts with 1Flow to deploy dynamic in-app surveys and messages.'
  -
    id: lv4frid4
    use_case: 'Collect targeted feedback and insights directly from specific user groups to understand user needs and improve product features based on direct user input.'
short_description: '1Flow is a fast & easy way to understand your customers in-product, so you can reduce churn, grow faster, and build the right features.'
---
[1Flow](https://1flow.app/) enables product-led customer everboarding through embedded onboarding checklists, contextual guides, and empty states. Customers can get set up at their own speed, track progress, and collaborate across their team.

## Considerations

- This integration is only available for customers who have paid plans with both 1Flow and Amplitude.
- You must enable this integration for each Amplitude project you want to use it in.
- To use this integration, you must have an Amplitude User ID that maps to a 1Flow user profile. 1Flow supports the User ID field, and you should make sure to use the same User IDs across 1Flow and Amplitude.

## Setup

This guide is complementary to 1Flow’s instructions.

### 1Flow setup

1. Log into your 1Flow Dashboard.
2. Navigate to the Integrations page and open Amplitude settings.
3. Enable **Sync Amplitude user cohorts to 1Flow** option under Cohort Sync.
4. Copy the API key (and use this to add 1Flow destination in Amplitude).
5. When finished, save your work.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **1Flow**.
3. Enter a name and 1Flow API key. 
4. Map the **Amplitude User ID field** to the **1Flow User ID field**.
5. Save when finished.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **1Flow**, then click **Next**.
3. Choose the account you want to sync to.
4. Set the sync cadence.
5. When finished, save your work.