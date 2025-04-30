---
id: 779445f8-5e18-40b8-85ca-8e25059c7e9f
blueprint: destination-catalog
title: 'Plotline (Cohort Sync)'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - cohorts
integration_category:
  - customer-engagement
partner_maintained: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1730928206
source: 'https://www.docs.developers.amplitude.com/data/destinations/plotline-cohort/'
integration_icon: partner-icons/plotline.svg
---
[Plotline](https://www.plotline.so/) enables Product and marketing teams to configure in-app nudges to improve feature adoption and drive conversions. Fully no-code.

## Considerations

Keep these things in mind when sending events to Plotline:

- You must enable this integration in each Amplitude project you want to use it in.
- You need a paid Plotline plan to enable this integration.
- Amplitude matches the `user_id` to the ID within Plotline to associated events. If a user with that id doesn't exist within Plotline, a user is created. Make sure that the Amplitude `user_id` field matches the Plotline ID field to avoid user duplication.

## Setup

For more information on setting up this integration, see the [Plotline documentation](https://docs.plotline.so), under the "Integrations" section.

### Prerequisites

To configure your Cohort integration from Amplitude to Plotline, you need the following information from Plotline:

- API Key: To start sending data into Plotline, you first have to get your API Key. See the [Plotline documentation](https://docs.plotline.so) for more help.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Plotline**.
3. Add your Plotline API key.
4. Enter a name.
5. Map the Amplitude User ID.
6. Save your work.

## Use cases

1. Improve feature adoption by using slideouts, hotspots, tooltips and more to drive adoption of new features.
2. Activate more users and personalize onboarding flows to guide new users to their "aha moment" faster.
3. Launch in-app surveys targeted to specific user cohorts based on their activity.