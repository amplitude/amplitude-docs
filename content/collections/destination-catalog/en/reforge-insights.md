---
id: e05c8b31-0a0a-4c01-bfc9-75786b43ee45
blueprint: destination-catalog
short_description: 'Sync your Amplitude cohorts with Reforge Insights to understand qualitative feedback from specific groups of users.'
integration_category:
  - qualitative-feedback
integration_type:
  - cohorts
partner_doc_link: 'https://docs.monterey.ai/integrations/external-cohorts#amplitude'
title: 'Reforge Insights'
source: 'https://docs.developers.amplitude.com/data/destinations/reforge-insights'
category: 'Cohort syncing'
connection: destination
partner_maintained: false
integration_icon: partner-icons/reforge-insights.svg
exclude_from_sitemap: false
---
Reforge Insights' cohorts integration with Amplitude helps you get product insights from specific cohorts of users. With this integration, your team can:

- Surface trends from cohorts.
- Extract common feature requests, bug reports and questions.
- Understand what specific groups of users are asking about.

## Reforge Insights setup

1. Go to the Reforge Insights [integrations page](https://insights.reforge.com/w/default/settings/integrations). Ensure you have the correct workspace selected.
2. Scroll down to the **External Cohort Sources** section and click **Connect** in the Amplitude Cohorts panel.
3. Click **Connect Amplitude** and copy the API key.

## Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. Filter by Type: Cohorts, and click on the **Reforge** destination. Then click on **Add another destination**
3. Enter a name for the integration and the API key you copied during the Reforge Insights setup.
4. Under **User Mapping**, select an Amplitude user property to use for mapping users. This user property must be an email address field.
5. When finished, click **Save**.

After you save the integration, you can sync your first cohort.

## Syncing a cohort

##### To sync any Amplitude cohort to Reforge Insights:

1. From the Syncs page in Amplitude (found under the **Users** menu), click on **Create Sync**.
2. Select **Cohort** as the sync type, then select a cohort from the dropdown menu that appears. Click **Next**.
3. Select **Reforge** from the *or sync this cohort to...* section. Select the Reforge integration you set up previously in the dropdown menu and click **Next**.
4. Set the sync cadence, then click **Sync** to start syncing.
