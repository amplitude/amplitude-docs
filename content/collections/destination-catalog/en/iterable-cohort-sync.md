---
id: 345dca9c-afa7-43bf-af15-0c3760546397
blueprint: destination-catalog
title: 'Iterable (Cohort Sync)'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - cohorts
integration_category:
  - marketing-automation
partner_maintained: false
integration_icon: partner-icons/iterable.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713566725
source: https://www.docs.developers.amplitude.com/data/destinations/iterable-cohort/
---

Send Amplitude cohorts to Iterable to use them in your customer engagement efforts. 


## Considerations 

- This integration must be enabled on a per-project basis.
- By default, Amplitude will sync the user_id value with Iterable's userId field. This means that if you don't specify any specific Amplitude User Property to match with Iterable, the user_id will be used as the identifier for syncing users between the two platforms. Any updates or changes to the user_id in Amplitude will be reflected in Iterable's userId field.
- If you prefer to use a specific Amplitude User Property other than the default user_id to match with Iterable, you can specify that property during the integration setup. This allows you to choose a different Amplitude User Property and map it to Iterable's userId field. The value of the specified Amplitude User Property will then be used for user identification and synchronization between the two platforms.

## Setup

### Prerequisites

Copy your Iterable API key. You can find this in Iterable under **Integrations > API Keys**.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Iterable**.
3. Add your Iterable API key. 
4. Enter a name. 
5. Map the Amplitude user ID.
6. Save your work. 

## Send a cohort

1. In Amplitude, open the cohort you want to export. 
2. Click **Sync**, and choose Iterable.
3. Select the destination.
4. Select the sync cadence.
5. Save when finished.

You can now find the synced behavioral cohort under Iterable's user list. The cohort's name has the `[Amplitude]` prefix.
