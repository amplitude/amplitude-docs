---
id: f2544bc7-1bc0-47c4-a95e-7770f4074bb8
blueprint: source-catalog
use_cases:
  - "The use case of sending data from Apphud to Amplitude involves transferring in-app subscription events from Apphud to Amplitude. This integration enriches Amplitude's user profiles with detailed subscription revenue data, providing deeper insights into user behavior and enabling more informed decision-making for app optimization and marketing strategies. Essentially, it enhances the analytical capabilities of Amplitude by adding a layer of financial data from Apphud, aiding in the comprehensive analysis of user engagement and revenue generation within the app"
short_description: 'Apphud can send in-app subscription events into Amplitude to help enrich your Amplitude user profiles with subscription revenue.'
integration_category:
  - subscription-management
integration_type:
  - raw-events
partner_doc_link: 'https://apphud.com/integrations/amplitude'
title: Apphud
source: 'https://www.docs.developers.amplitude.com/data/sources/apphud'
status: beta
category: 'Subscription Management'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
partner_maintained: false
integration_icon: partner-icons/apphud.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713819924
---
Apphud can send subscription events into Amplitude to help enrich your Amplitude user profiles with subscriptions revenue. This is useful for seeing all events and revenue that occur for your app even if it’s not active for a period of time. 

## About Apphud

[Apphud](https://apphud.com/) is a revenue data platform designed for mobile app teams to scale results and grow even faster by making data-driven decisions. Apphud boosts in-app subscriptions growth by helping you deliver web-to-app ads and centralizing app revenue data for analysis.

## Considerations

## Setup

{{partial:admonition type="tip"}}
For help with this integration, contact the [Apphud Support team](https://apphud.com/contact).
{{/partial:admonition}}

### Prerequisites

Before you can add this integration, you must do the following: 

- Add the [Apphud SDK](https://docs.apphud.com/docs/sdk-integration).
- Add the [Amplitude SDK](/docs/sdks).
- Match the user IDs between Apphud and Amplitude. See the [Apphud documentation](https://docs.apphud.com/docs/amplitude#match-user-ids) for help with this step. 

### Amplitude setup

Copy your Amplitude API keys for both your test and production projects.

There are no other setup steps in Amplitude. 

### Apphud setup

See detailed instructions for this integration in the [Apphud documentation](https://docs.apphud.com/docs/amplitude).