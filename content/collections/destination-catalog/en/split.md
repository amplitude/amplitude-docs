---
id: 1b8bb721-f043-4b71-aa97-9b8d30dcaebd
blueprint: destination-catalog
use_cases:
  - 'Target customers by behavioral attributes to serve relevant flag treatments to the right cohorts.'
  - 'Create a predictive cohort for users most likely to achieve a desired outcome and test a new feature used to produce that outcome on the cohort.'
  - 'Run deeper analysis on impression data in Amplitude to compare user behavior across flag treatments and determine why certain metrics changed as a result.'
short_description: 'Split is revolutionizing software delivery with Impact-Driven Development, pairing the speed and reliability of feature flags with data to measure the impact of every feature.'
integration_category:
  - experimentation
integration_type:
  - cohorts
partner_doc_link: 'https://www.split.io/product/integrations/amplitude'
title: Split
source: 'https://docs.developers.amplitude.com/data/destinations/split'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/split.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713480173
---

With Amplitude's Split integration, you can export your Amplitude cohorts and use them as segmentation and targeting criteria in Split. From there you can create splits or feature flags for specific segments of users defined by your Amplitude data.

## Setup

### Split setup

To set up the integration, you need to collect some information from your Split dashboard first. 

1. From your Split dashboard, select your account of choice and click **Admin Settings**.
2. From within admin settings, navigate to the *API Keys* tab and click **Add API Key**. Make sure to set the key type to *Admin*. After it's created, copy the key.
3. Next, specify the workspace to which you'd like to export your Amplitude cohorts. Click **Workspaces** from the left-hand sidebar and copy the workspace ID.
4. Next, click **View** for the workspace you selected. From inside that workspace, select the **Environments** tab, and copy the appropriate environment ID. 
5. Select the **Traffic Type** tab and copy the traffic type id.

### Amplitude setup 

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Split**.
3. In the *Connect to Split* modal, enter the following information you collected from Split:
      - The access token (API Key)
      - Workspace ID
      - Environment ID
      - Traffic type ID
4. Map the user identifier Amplitude uses to sync with Split.
5. Save your work.


{{partial:admonition type="note" title=""}}
Choose a matching identifier in Amplitude and Split. This is often `userID`.
{{/partial:admonition}}

## Export cohorts into Split

After you connect Split and Amplitude, you can sync any Amplitude cohort to it.

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose **Split**.
2. Choose the API target.
3. Select the sync cadence.
4. Save your work.

{{partial:admonition type="note" title=""}}
The Split integration supports ingestion of cohorts with fewer than 100,000 users. 
{{/partial:admonition}}

After the cohort is synced to Split, it appears in your Split workspace in the *Segments* section. You can then use this segment for targeting rules in feature flags and splits you set up in Split.