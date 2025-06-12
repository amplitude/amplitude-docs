---
id: 0008efc7-5bd6-4f1f-b8a7-2088be40b355
blueprint: destination-catalog
use_cases:
  - "Leverage Amplitude's behavioral analytics to identify and define specific user segments. You can send these cohorts to Userflow to create personalized in-app experiences."
  - "Capture user interactions within the app via Userflow's events and stream this data to Amplitude to enrich user behavior insights and improve analytics."
short_description: 'You want to improve user onboarding but your developers are busy. Userflow lets your team build  in-app product tours, checklists, trackers, and surveys, without code.'
integration_category:
  - customer-engagement
integration_type:
  - cohorts
partner_doc_link: 'https://userflow.com/docs/integrations/amplitude'
title: Userflow
source: 'https://docs.developers.amplitude.com/data/destinations/userflow'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/userflow.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713480296
---

[Userflow](https://userflow.com/) enables your whole team to build in-app product tours, checklists, surveys, resource center and more. No coding skills required.

This integration lets you sync cohorts from Amplitude to Userflow, so you can target users with Userflow content based on behavior tracked by Amplitude.

## Setup

For more details on using this integration, see [Userflow's documentation](https://userflow.com/docs/integrations/amplitude).

### Userflow setup

1. In Userflow, navigate to **Settings > Integrations**.
2. Click **Add integration**, then find and add Amplitude.
3. Copy the Integration Secret value to your clipboard.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Userflow**.
3. Paste the Integration Secret into the Userflow destination settings.
4. Save when finished.

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose **Userflow**.
2. Choose the destination.
3. Select the sync cadence.
4. Save your work.
