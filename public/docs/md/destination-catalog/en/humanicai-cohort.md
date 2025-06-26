---
id: 79569150-9086-4ef2-b869-3fc5c67d97aa
blueprint: destination-catalog
title: 'Humanic.ai (Cohort)'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - cohorts
partner_maintained: false
integration_icon: partner-icons/humanic-ai.svg
source: 'https://www.docs.developers.amplitude.com/data/destinations/humanic-ai-cohort/'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718649754
---
[Humanic AI](https://www.humanic.ai/) is an Agentic Marketing Platform that helps you unlock growth by using AI agents. 

{{partial:admonition type="note" heading=""}}
This integration is maintained by Humanic AI. Email [care@humanic.ai](mailto:care@humanic.ai) for support with this integration. 
{{/partial:admonition}}

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.
- Humanic AI supports both email addresses and `customer_id` as the identifier. This means you need to map the `user_id` or user property you select in Amplitude must to either `email` or `customer_id`.

## Setup

For more information on setting up this integration, see [Humanic AI’s documentation](https://humanic.gitbook.io/humanic/implementing-integrations/amplitude).

### Humanic AI setup

1. Log in to your **Humanic AI** account.
2. Navigate to the **Profile** section by clicking on the name icon located on top right.
3. Go to the **API Key** tab and click on the **Create** button.
4. Copy the API key, Amplitude requires it to complete the integration.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Humanic AI**.
3. Click **Add another destination**.
4. Enter **Name** and paste in the **API key** you copied from **Humanic AI**.
5. Map the Amplitude User ID field to the Humanic.ai User ID field
6. Save when finished.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **Humanic AI**, then click **Next**
3. Choose the account you want to sync to
4. Choose the sync cadence.
5. When finished, save your work.
