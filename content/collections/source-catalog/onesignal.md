---
id: 2c04c466-a52c-4fcb-a664-09186910ecf4
blueprint: source-catalog
use_cases:
  - "Leverage Amplitude's cohort data to send targeted messages via OneSignal's customer messaging platform, driving engagement and conversion across multiple channels such as push notifications, email, SMS, and in-app messages."
  - 'Ingest events from OneSignal into Amplitude to enrich analytics and gain deeper insights into user engagement and the effectiveness of messaging campaigns.'
short_description: 'OneSignal is the most widely-used customer messaging and engagement solution, helping over a million businesses deliver over 10 billion messages to their customers each day.'
integration_category:
  - customer-engagement
integration_type:
  - cohorts
  - raw-events
partner_doc_link: 'https://documentation.onesignal.com/docs/amplitude'
title: OneSignal
source: 'https://www.docs.developers.amplitude.com/data/sources/onesignal'
category: Collaboration
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
partner_maintained: false
integration_icon: partner-icons/onesignal.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713825795
connection: source
---
OneSignal can send events to Amplitude for mobile push, web push, email, SMS, and in-app message channels. Event options include:

- Sent: The message has been sent to the provider.
- Clicked: The user has clicked and interacted with the message.
- Viewed: The user has viewed the message.
- Confirmed Delivery: The message has been delivered by the provider to the user.

## Setup

For more information on how to set up and use this integration, see [OneSignal's documentation.](https://documentation.onesignal.com/docs/amplitude)

{{partial:admonition type="note" title="Event volume limits"}}
Any events you send from OneSignal to Amplitude count towards your Amplitude event volume quota.
{{/partial:admonition}}