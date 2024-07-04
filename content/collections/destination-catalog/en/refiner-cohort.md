---
id: 712c2693-1778-4ebe-8ea0-9ac1e0a7936f
blueprint: destination-catalog
title: 'Refiner (Cohort)'
connection: destination
integration_type:
  - cohorts
integration_category:
  - qualitative-feedback
partner_maintained: false
integration_icon: partner-icons/refiner.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1720116131
---

{{partial:admonition type="note" heading="Refiner maintains this integration"}}
This integration is maintained by Refiner. Contact the Refiner support team for support with this integration. 
{{/partial:admonition}}

[Refiner](https://refiner.io/) is a user feedback and customer survey solution designed specifically for data-driven SaaS teams. It enables these teams to gain a more profound understanding of their users' needs, gauge customer satisfaction, enhance retention rates, and conduct research to inform their future product development strategies.

## Considerations

- This integration is available to customers with paid Amplitude plans.
- You must enable this integration in each Amplitude project you want to use it in.
- You need a paid Refiner plan to enable this integration.

## Setup

### Refiner setup

1. In Refiner, navigate to Settings.
2. Copy the **API Key** and **Segment ID** to your clipboard.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Refiner**.
3. Click **Add another destination**.
4. Enter **API Key** and **Segment ID**.
5. Map the Amplitude User_ID field to the Refiner User_ID field. 
6. Save when finished.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **Refiner**, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence.
5. When finished, save your work.

### Use cases

1. **User Onboarding Improvement:** Identify struggling user cohorts in Amplitude and send them to Refiner for targeted feedback. Use this data to optimize your onboarding process, resulting in higher user satisfaction and retention.
2. **Feature Prioritization:** Segment users based on feature engagement in Amplitude and send cohorts to Refiner. Gather feedback to guide feature development priorities, ensuring alignment with user preferences and needs.
3. **Churn Prevention:** Spot potential churn risk cohorts in Amplitude, send them to Refiner and collect feedback. Proactively address user concerns to prevent churn and enhance customer satisfaction and retention strategies.
