---
id: 62c9cb0e-142c-4f4e-9bd2-92065a536385
blueprint: source-catalog
use_cases:
  - "Leverage Adjust's data to segment users based on specific parameters like ad group or network, enabling a granular analysis of how different advertising efforts impact user engagement, conversion, and retention."
  - "Streaming events to Adjust allows for real-time data transmission from your application to Adjust's platform, enabling immediate analysis and optimization of your marketing efforts."
short_description: 'Adapty helps to analyze and grow in-app subscriptions, integrate in-app purchases within a few hours, and run monetization experiments faster and cheaper.'
integration_category:
  - customer-engagement
integration_type:
  - raw-events
partner_doc_link: 'https://docs.adapty.io/docs/amplitude'
title: Adapty
source: 'https://www.docs.developers.amplitude.com/data/sources/adapty'
category: 'Subscription Management'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
partner_maintained: false
integration_icon: partner-icons/adapty.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713818681
---
[Adapty](https://adapty.io/)is an all-in-one for launching subscription monetization and optimizing the mobile app economy.

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.

## Setup

This guide is complementary to Adapty’s instructions. Visit the [Adapty documentation](https://docs.adapty.io/docs/amplitude) for more.

### Amplitude setup

Copy your project's API key. There are no other setup steps in Amplitude. [Find your project API key](/docs/apis/keys-and-tokens).

### Adapty setup

1. Log into your Adapty dashboard.
2. Navigate to Integrations then click on Amplitude and set the API credentials copied over from Amplitude.
3. SDK configuration - Use Adapty.updateProfile() method to set amplitudeDeviceId or amplitudeUserId. If not set, Adapty uses your user ID (customerUserId) or if it's null Adapty ID. Make sure that the user id you use to send data to Amplitude from your app is the same you send to Adapty.

## Use case

Adapty is a mobile app analytics and marketing automation platform, while Amplitude is a product analytics platform. Sending events from Adapty into Amplitude can provide several use cases, such as:

- **User behavior analysis:** With Adapty, you can track user behavior within your mobile app, such as their actions, preferences, and engagement levels. By sending these events into Amplitude, you can perform advanced analysis on this data to gain insights into user behavior, identify trends, and optimize your app for better engagement and retention.
- **Personalization and targeting:** Adapty allows you to create targeted marketing campaigns based on user behavior and preferences. By sending these events into Amplitude, you can further refine your targeting by combining Adapty data with other data sources, such as demographic data or user feedback, to create more personalized and effective campaigns.
- **Product development:** By sending Adapty events into Amplitude, you can gain insights into how users are interacting with your app and identify areas for improvement. This data can help inform your product development roadmap, allowing you to prioritize features and updates based on user needs and behaviors.
Overall, sending events from Adapty into Amplitude can provide a more comprehensive view of user behavior and app performance, allowing you to make data-driven decisions to improve engagement, retention, and overall user experience.

Overall, sending events from Adapty into Amplitude can provide a more comprehensive view of user behavior and app performance, allowing you to make data-driven decisions to improve engagement, retention, and overall user experience.