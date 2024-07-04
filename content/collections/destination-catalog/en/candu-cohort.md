---
id: e6872a36-9730-4e6b-812f-83dc184b5331
blueprint: destination-catalog
title: 'Candu (Cohort)'
connection: destination
integration_type:
  - cohorts
integration_category:
  - customer-engagement
partner_maintained: false
integration_icon: partner-icons/candu.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1720114572
---
Candu helps you build, iterate, and personalize your in-app content experiences. This integration enables you to send cohorts from to Amplitude to Candu.

{{partial:admonition type="note" heading="Candu manages this integration"}}
Contact the [Candu support team](https://docs.candu.ai/en/) with any questions about this integration.
{{/partial:admonition}}

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.

## Setup

To configure the Cohort integration from Amplitude to Candu, complete the following steps in each platform.

### Candu 

1. In Candu, navigate to **Settings** then click **Integrations**.
2. Under Data & Analytics Integrations, click on Amplitude.
3. Copy the API keys.

### Amplitude

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Candu**.
3. Enter **Name** and paste in the **API** key you copied from **Candu**.
4. Select the Amplitude properties that map to Candu's User ID.
5. Save when finished.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **Candu**, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence.
5. When finished, save your work.
