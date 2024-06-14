---
id: 820ed4ae-a833-487c-bf95-ef1dd75d0729
blueprint: destination-catalog
use_cases:
  - "Trigger automated emails based on user actions or inactions within the application. For example, if a user signs up but doesn't engage with a key feature within a certain timeframe, Userlist can automatically send an onboarding email highlighting that feature."
  - 'Develop targeted onboarding campaigns that guide new users through the product, based on their interactions. This ensures that users receive relevant information and prompts that align with their stage in the user journey.'
short_description: 'This integration lets you sync cohorts from Amplitude to Userlist so you can target users with Userlist content based on behavior tracked by Amplitude.'
integration_category:
  - marketing-automation
integration_type:
  - event-streaming
partner_doc_link: 'https://userlist.com/docs/integrations/amplitude/'
title: Userlist (Event Stream)
source: 'https://docs.developers.amplitude.com/data/destinations/userlist'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/userlist.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713480316
---

[Userlist](https://userlist.com/) is an email automation platform for SaaS companies. Unlike other email providers, it meets the complexity of your SaaS business. You can track company-level data, and trigger campaigns based on company-level events. It's the best way to onboard, engage, and nurture customers and marketing leads.

## Considerations

Keep these things in mind when sending events to [Userlist](https://userlist.com/):

- You must enable this integration in each Amplitude project you want to use it in.
- You need a paid Userlist plan to enable this integration.
- Amplitude matches the `user_id` to the ID field within Userlist to associated events. If user with that ID doesn't exist in Userlist, a user is created. Make sure that the Amplitude `user_id` field matches the Userlist identifier field to avoid user duplication.
- Amplitude sends all user, event, and group properties along with the event.

## Setup

### Userlist setup

To start sending data into Userlist, you first have to get your Push API Key from Userlist. It's used to authenticate your requests to the Push API and connect the data with your account. Find this in your Userlist Settings. See the [Userlist documentation](https://userlist.com/docs/getting-started/integration-guide/) for more help. There are no other setup steps in Userlist.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Userlist**.
3. Enter a sync name, then click **Create Sync**.
4. Click **Edit**, then paste your Userlist Push Key.
5. Toggle the Send events filter to select the events to send. You can send all events, but Amplitude recommends choosing the most important ones.
6. Use the Event Properties filter to select event properties.
7. When finished, enable the destination and save.
