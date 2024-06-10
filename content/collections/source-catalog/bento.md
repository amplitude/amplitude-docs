---
id: f9e04fe6-a512-48f2-a5a7-1566e2e93c89
blueprint: source-catalog
use_cases:
  - "Customize user experiences on Bento using Amplitude's event data, improving engagement through targeted messages and tailored services."
  - 'Deliver context-specific guides on Bento based on Amplitude data, gathering user feedback to continually enhance guidance and user experience.'
short_description: 'Send Cohorts and events to Bento for guide targeting and step auto-completion. Receive events back from Bento on user progress in guides.'
integration_category:
  - customer-engagement
integration_type:
  - event-streaming
  - raw-events
  - cohorts
partner_doc_link: 'https://help.trybento.co/en/articles/6978743-amplitude-integration'
title: Bento
source: 'https://www.docs.developers.amplitude.com/data/sources/bento'
category: Collaboration
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
partner_maintained: false
integration_icon: partner-icons/bento.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713820226
connection: source
---
[Bento](https://www.trybento.co/) enables product-led customer everboarding through embedded onboarding checklists, contextual guides, and empty states. Bento's data model allows guides to be customized per customer via attributes or even human tailoring. Customers are able to get set up at their own speed, track progress, and collaborate across their team. 
With the Bento ingestion integration, you can send events to Amplitude to understand the impact of engagement with guides on user activation.

## Considerations

- You have to identify users on both platforms in the same way. The Bento Identity ID must be the same as the Amplitude `user_id`.

## Setup

This guide is complementary to Bento’s instructions. Visit the [Bento documentation](https://help.trybento.co/en/articles/6978743-send-events-to-amplitude) for more.

### Amplitude setup

Copy your project's API key. There are no other setup steps in Amplitude. [Find your project API key](/docs/api/authentication).

### Bento setup

1. Log into your Bento dashboard.
2. Visit the Integrations page and click on Amplitude.
3. Paste your Amplitude API key and click Connect.

## Use case

Receive events on when a user has completed a specific onboarding step and map it to usage of a particular feature to understand direct correlation.