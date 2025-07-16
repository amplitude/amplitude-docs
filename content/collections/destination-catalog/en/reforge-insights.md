---
blueprint: destination-catalog
use_cases:
  - 'Sending cohorts from Amplitude to Reforge Insights is a great way to get product insights from specific groups of users. With this integration, your team can surface trends from cohorts, extract common feature requests, bug reports and questions and get a deeper understanding of what specific groups of users are asking about.
short_description: 'Sync your Amplitude cohorts with Reforge Insights to understand qualitative feedback from specific groups of users.'
integration_category:
  - qualitative-feedback
integration_type:
  - cohorts
partner_doc_link: 'https://docs.monterey.ai/integrations/external-cohorts#amplitude'
title: Reforge Insights
source: 'https://docs.developers.amplitude.com/data/destinations/reforge-insights'
category: 'Cohort syncing'
connection: destination
partner_maintained: false
integration_icon: partner-icons/reforge-insights.svg
exclude_from_sitemap: false

---
The cohorts integration with Amplitude is a great way to get product insights from specific cohorts of users. With this integration, your team can:
 - Surface trends from cohorts
 - Extract common feature requests, bug reports and questions
 - Understand what specific groups of users are asking about

## Setup

### Reforge Insights setup

1. Go to the Reforge Insights [integrations page](https://insights.reforge.com/w/default/settings/integrations). Ensure you have the correct workspace selected (see the top of the left sidebar).
2. Scroll down to the **External Cohort Sources** section and click **Connect** in the Amplitude Cohorts panel.
3. Click **Connect Amplitude** and copy the API key.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. Filter by Type: Cohorts, and click on the **Reforge** destination. Then click on **Add another destination**
3. Enter a name for the integration and the API key you copied during the Reforge Insights setup.
4. Under **User Mapping**, select an Amplitude user property to use for mapping users. This user property must be an email address field.
5. When finished, click **Save**.

Once you save the integration, you can sync your first cohort.

## Syncing a cohort

Follow these steps to sync any Amplitude cohort to Reforge Insights:

1. From the Syncs page in Amplitude (found under the **Users** menu), click on **Create Sync**.
2. Select **Cohort** as the sync type, then select a cohort from the dropdown menu that appears. Click **Next**.
3. Select **Reforge** from the *or sync this cohort to...* section. Select the Reforge integration you set up previously in the dropdown menu and click **Next**.
4. Set the sync cadence, then click **Sync** to start syncing.
