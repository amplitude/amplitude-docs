---
id: 54b567aa-96bb-4a2c-8b5a-c61efa012543
blueprint: source-catalog
use_cases:
  - 'Better understand correlations between satisfaction and user behavior and product usage by running surveys via Sprig and feeding that data to Amplitude.'
short_description: 'Sprig helps you capture rich user insights to build better products. Our In-Product Surveys allow you to target specific users and get real-time feedback on your product experience at scale.'
integration_category:
  - qualitative-feedback
integration_type:
  - raw-events
partner_doc_link: 'https://docs.sprig.com/docs/amplitude'
title: Sprig
source: 'https://www.docs.developers.amplitude.com/data/sources/sprig'
category: 'Qualitative Feedback'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
partner_maintained: false
integration_icon: partner-icons/sprig.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718141144
---
[Sprig](https://sprig.com/) is the product development lifecycle research platform. Sprig is on a mission to make experiences that matter. Companies use Sprig's Concept and Usability Testing and In-Product Surveys to get research insights from users about new ideas, designs, and current product experiences.

With the Sprig ingestion integration, you can automatically send survey data to Amplitude when you get a response, and use the data when creating charts and cohorts in Amplitude.

## Considerations

- You must identify users the same way on both platforms. The Sprig Identity ID must have the same value as the Amplitude `user_id`.

## Setup

This guide is complementary to Sprig's instructions. Visit the [Sprig documentation](https://docs.sprig.com/docs/amplitude) for more.

### Amplitude setup

Copy your project's API key. There are no other setup steps in Amplitude. [Find your project API key](/docs/apis/authentication).

### Sprig setup

1. From your Sprig dashboard, visit the **Integrations** page and click **Amplitude**.
2. Paste your Amplitude API key and save.

## Use case

When a user submits a response to a Sprig survey, their response data can contain important information that can be used in conjunction with product analytics to produce insights. For example, if you run a CSAT or NPS survey via Sprig, you can push that data to Amplitude. You can then use Amplitude's tools to better understand correlations between satisfaction and user behavior and product usage.