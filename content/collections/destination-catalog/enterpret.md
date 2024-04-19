---
id: 29ac0c75-c80e-45c3-8cb2-a25d9033719c
blueprint: destination-catalog
use_cases:
  - 'Sending cohorts from Amplitude to Enterpret enables businesses to combine quantitative data from Amplitude with qualitative insights provided by Enterpret. This integration allows organizations to analyze customer feedback at scale and build a comprehensive taxonomy of customer feedback. By marrying quantitative and qualitative data, businesses can better understand the "why" behind customer behavior, make informed decisions, and improve communication across different languages and industries.'
short_description: 'Enables companies to analyze their customer feedback at scale and builds a comprehensive taxonomy of customer feedback on top of a unified source of truth.'
integration_category:
  - qualitative-feedback
integration_type:
  - cohorts
partner_doc_link: 'https://www.enterpret.com/integrations/amplitude'
title: Enterpret
source: 'https://docs.developers.amplitude.com/data/destinations/enterpret'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/enterpret.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713478484
---
Enterpret analyzes your customer feedback across different sources, such as support conversations, App Store reviews, social media posts and automatically finds insights in it using machine learning. [Enterpret's](https://www.enterpret.com/) integration with Amplitude allows you to marry your quantitative data with the qualitative data, and helps you answer better the "Why" behind the "What".

## Setup

### Enterpret setup

1. In the [Enterpret](https://dashboard.enterpret.com/login) dashboard, navigate to the Settings page, and on the left panel, click  **+  New Integration.**
2. Search and select Amplitude from the Integrations list.
3. Click **Connect** and copy the Enterpret API key.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Enterpret**.
3. Enter a name and Enterpret API key.
4. Map an Amplitude field to the Enterpret User ID field.
5. When finished, save the integration.

After you save the integration, you can sync your first cohort.

## Send a cohort

Next, follow these steps to sync any of your Amplitude cohorts to your Enterpret destinations:

1. From the Cohorts page in Amplitude, click the cohort you want to send, or create a cohort.
2. Click **Sync**.
3. Select **Enterpret**, then click **Next**.
4. From the *Select an API target to sync to list*, select your Enterpret destination.
5. Set the sync cadence.
6. Click **Sync** to start syncing.
