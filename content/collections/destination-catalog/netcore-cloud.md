---
id: a09cf85b-cb12-486f-861f-db7ec91441d2
blueprint: destination-catalog
use_cases:
  - 'By syncing cohorts from Amplitude to Netcore Cloud, businesses can deliver personalized campaigns and experiences, leveraging AI-driven insights to boost engagement rates and conversions, thereby improving overall customer satisfaction and loyalty.'
short_description: 'Netcore Cloud is a marketing technology SaaS company offering a full-stack of martech solutions that deliver AI-powered intelligent customer experiences across all touchpoints of the user’s journey.'
integration_category:
  - marketing-automation
integration_type:
  - cohorts
partner_doc_link: 'https://cedocs.netcorecloud.com/docs/amplitude-cohort-sync'
title: 'Netcore Cloud'
source: 'https://docs.developers.amplitude.com/data/destinations/netcore-cloud'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/netcore.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713479895
---
[Netcore Cloud](https://netcorecloud.com/) offers a full-stack of marketing technology solutions that help product and growth marketers deliver AI-powered intelligent customer experiences across all touchpoints of the user's journey.

This integration lets you sync cohorts from Amplitude to Netcore Cloud's Customer Engagement (CE) & Experience Platform.

## Considerations

- The sync can take up to 5 hours to sync a cohort greater than 100k users.

## Setup

### Netcore Cloud setup

1. Log in to the [Netcore Cloud CE panel](https://login.netcoresmartech.com/) as an admin.
2. Navigate to your user profile and copy the API key.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Netcore**.
3. Enter Name and paste in the API key you copied from Netcore.
4. Map the same Amplitude `User_ID` with the primary key from Netcore Cloud CE panel.
5. Save when finished. 

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose Netcore Cloud.
2. Choose the destination.
3. Select the sync cadence.
4. Save your work.

After syncing a cohort from Amplitude platform, you can find it as a list with the format `AMPLITUDE_[Cohort name]`.
