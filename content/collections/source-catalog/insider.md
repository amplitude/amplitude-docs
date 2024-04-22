---
id: 52e1e0a9-e609-427a-91b7-29e9053efd87
blueprint: source-catalog
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
source: 'https://www.docs.developers.amplitude.com/data/sources/insider'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
partner_maintained: false
integration_icon: partner-icons/insider.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713825394
---
[Insider](https://useinsider.com/) Growth Management Platform (GMP) helps digital marketers drive growth across the funnel. Use it to deliver personalized journeys across the web, mobile web, mobile apps, messaging, email, and ad channels using unified data.

With the Insider event ingestion integration, you can send event data to Amplitude to enable data-driven charts and cohorts in Amplitude.

Use this integration to:

- Collect all messaging channel events such as Email Open or SMS Click so that you can perform advanced analytics use cases and analyze your user data better by creating charts.
- Create cohorts on Amplitude by using channel interaction events such as Journey Entered or In-App events.

## Considerations

- You must identify users on both platforms in the same way. Amplitude recommends using `unique_user_id` (UUID), email, or phone number.

## Setup

This guide is complementary to [Insider's documentation](https://academy.useinsider.com/docs/sending-insider-events-to-amplitude).

### Amplitude setup

Copy the Amplitude API key for the project you want to send Insider data to. There are no other setup steps in Amplitude.

### Insider setup

Make sure you have your Amplitude API key, then contact your Insider Customer Success Manager to finish configuring the integration.