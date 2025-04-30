---
id: 50934bfc-8388-44a0-bcb2-dbb6a735ee26
blueprint: destination-catalog
title: 'Moengage (Cohort Sync)'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - cohorts
integration_category:
  - marketing-automation
partner_maintained: false
integration_icon: partner-icons/moengage.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713809624
source: https://www.docs.developers.amplitude.com/data/destinations/moengage-cohort/
---
Amplitude's MoEngage integration allows you to send hyper-targeted behavioral audiences from Amplitude to MoEngage. With MoEngage, you can use Amplitude cohorts to drive precisely tailored email, SMS, push, and in-product messaging.

## Considerations

To use this integration, you  need a MoEngage account, an understanding of Amplitude behavioral cohorts, and an Amplitude user property that matches what you're using for your User ID field in MoEngage.

## Setup

### MoEngage setup

1. Login to your MoEngage dashboard and navigate to **Settings -> API Settings**. 
2. Copy the App ID and Secret Key.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **MoEngage**.
3. Enter a name and app ID.
4. Map your user ID and device ID. Make sure the unique user ID is the same in both Amplitude and MoEngage. This integration uses the device ID to map anonymous users, so make sure that device ID is the same in Amplitude and MoEngage.

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose MoEngage.
2. Choose the destination.
3. Select the sync cadence.
4. Save your work.
  
In MoEngage, the cohort appears as a custom segment with the name `[Amplitude][Cohort Name]`.