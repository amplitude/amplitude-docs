---
id: 161c3594-8bf1-41cb-adaa-73664e764d46
blueprint: destination-catalog
title: unitQ
source: 'https://docs.developers.amplitude.com/data/destinations/unitq'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - cohorts
integration_category:
  - qualitative-feedback
partner_maintained: false
integration_icon: partner-icons/unitq.svg
use_cases:
  - 'Sending cohorts from Amplitude to unitQ allows organizations to harness AI-driven insights from user feedback to enhance product quality and user experience. By syncing cohorts, companies can complement product analytics with qualitative feedback, pinpoint attrition drivers, understand user types, and optimize onboarding.'
short_description: 'unitQ provides real-time AI‑powered insights from user feedback to help companies craft high‑quality products, services, and experiences.'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713481067
---
[unitQ](https://www.unitq.com/) empowers companies with AI-powered, actionable insights from user feedback to help them craft high-quality products, services, and experiences. unitQ centralizes feedback from all sources and automatically groups it into thousands of granular categories to help organizations discover what matters most to users.

## Considerations

- This integration is only available for customers who have paid plans with Amplitude.
- You must enable this integration in each Amplitude project you want to use it in.
- You must have a paid unitQ plan to enable this integration.

## Setup

For more information on setting up this integration, see [unitQ](https://monitor.unitq.com/zendesk/sso?brand_id=360001108694&locale_id=1&return_to=https%3A%2F%2Fhelp.unitq.com%2Fhc%2Fen-us%2Farticles%2F6221145156243-Integrating-Apps-with-unitQ&timestamp=1692350456)’s documentation.

### unitQ setup

1. In unitQ, navigate to **Integrations**.
2. Find or search for Amplitude and then click the **Available** button.
3. Click **Get Token** and then copy it to your clipboard.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **unitQ**.
3. Click **Add another destination**.
4. Enter **Name** and paste in the **API** key you copied from **unitQ**.
5. Map the Amplitude User ID field to the unitQ User ID field
6. Save when finished.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **unitQ**, then click **Next**
3. Choose the account you want to sync to
4. Choose the sync cadence.
5. When finished, save your work.

### Use cases

1. **Pinpoint key drivers behind attrition:** identify common pain points among users who stopped engaging with your product by complementing product analytics data with user feedback.
2. **Get insights by user type:** better understand the different types of users you serve. Discover what matters the most to each kind of user, including common issues, trends, feature requests, and more.
3. **Optimize your product onboarding:** identify and address top pain points experienced by new users and reasons why specific features have low engagement. 
4. **Supercharge your A/B testing:** analyze the behavior, feedback, and engagement metrics of users of A/B tests to gain a deeper understanding of the outcomes and implications of the variations.
