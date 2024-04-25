---
id: 1a838d5e-9b34-4e55-bd64-7d22bcc63db6
blueprint: destination-catalog
use_cases:
  - "Utilize Insider's cutting-edge platform to connect data across multiple channels, predict future behavior with AI, and personalize experiences for customers. By ingesting events from Insider into Amplitude, businesses gain insights into user behavior and engagement, allowing them to optimize conversion rates, personalize retention strategies, and improve the overall customer experience in real-time."
  - "Leverage Amplitude's cohort integration with Insider to extend segmentation and personalization capabilities. With this integration, businesses can seamlessly send cohorts from Amplitude to Insider, empowering them to personalize retention and conversion strategies across various channels, leverage AI recommendations for improved performance, and optimize the customer experience to capture user attention and enhance conversion rates effectively."
short_description: 'Insider connects data across channels, predicts future behavior with AI, and individualizes experiences from a single platform with the fastest time to value.'
integration_category:
  - marketing-automation
integration_type:
  - raw-events
  - cohorts
partner_doc_link: 'https://useinsider.com/integration/amplitude/'
title: Insider
source: 'https://docs.developers.amplitude.com/data/destinations/insider'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/insider.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713478958
---
[Insider](https://useinsider.com/) Growth Management Platform (GMP) helps digital marketers drive growth across the funnel. Use it to deliver personalized journeys across the web, mobile web, mobile apps, messaging, email, and ad channels using unified data.

With cohort integration with Amplitude, partners are able to extend their segmentation and personalization capabilities that Insider offers.

## Setup

### Insider setup

Get an API key from the Insider platform. If you don't have one, create one. 

1. [Navigate to the Insider dashboard](https://inone.useinsider.com/) and select **Settings** from the drop-down menu.
2. Open the *Integration Settings* tab and click **Generate API Key**.
3. Click **UCD**. Then click **Next**.
4. Save when finished.
  
### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Insider**.
3. Add a new destination.
4. Enter a name and the Insider API key. 
5. Map an Amplitude property to an Insider property. 
6. Save when finished. 

## Send a cohort

After you've connected Insider and Amplitude, you can send an Amplitude cohort.

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose Insider.
2. Choose the API target.
3. Select the sync cadence.
4. Save your work.
