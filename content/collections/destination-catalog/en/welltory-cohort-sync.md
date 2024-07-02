---
id: b84b80e5-e036-4117-b79e-6ddb83da3247
published: false
blueprint: destination-catalog
title: 'Welltory (Cohort Sync)'
connection: destination
integration_type:
  - cohorts
integration_category:
  - other
partner_maintained: false
integration_icon: partner-icons/welltory.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1719352148
---
Welltory helps you build, iterate, and personalize your in-app content experiences. This integration enables you to send cohorts from to Amplitude to Welltory.

!!!info "This integration is managed by Welltory"

{{partial:admonition type="note" heading="Welltory maintains this integration"}}
Contact the [Welltory support team](https://welltory.com/) with any questions about this integration.
{{/partial:admonition}}

## Considerations

- Enable this integration in each Amplitude project you want to use it in.

## Setup

To configure the Cohort integration from Amplitude to Welltory, complete the following steps in each platform.

### Welltory 

In Welltory, navigate to **Settings** then click **Integrations**.

### Amplitude

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Welltory**.
3. Enter **Name** and paste in the **API** key you copied from **Welltory**.
4. Select the Amplitude properties that map to Welltory's User ID.
5. Save when finished.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **Welltory**, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence.
5. When finished, save your work.