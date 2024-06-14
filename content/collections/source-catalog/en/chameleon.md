---
id: a7d14a16-8a6a-44f2-9038-3fb11bdcde4f
blueprint: source-catalog
use_cases:
  - "The use case with sending events from Chameleon to Amplitude involves leveraging Chameleon's capabilities to create personalized product experiences for customers. Chameleon empowers companies to deliver highly-targeted product experiences at scale, promoting customer engagement and loyalty. By sending Chameleon data to Amplitude, businesses can ensure they have the right attributes to deliver contextual messages, understand how their guidance impacts users' journeys, and find opportunities to better guide users."
short_description: 'Send Chameleon data to Amplitude, and use behavioral cohorts to target Chameleon Experiences.'
integration_category:
  - customer-engagement
integration_type:
  - raw-events
partner_doc_link: 'https://www.chameleon.io/integrations/amplitude'
title: Chameleon
source: 'https://www.docs.developers.amplitude.com/data/sources/chameleon'
category: Collaboration
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
partner_maintained: false
integration_icon: partner-icons/chameleon.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713820792
---

[Chameleon](https://www.chameleon.io/) is a product adoption platform which allows you to create beautiful product guidance that helps, guides, and delights your users throughout their journey. Build, manage and optimize your product tours without writing code. This Chameleon integration allows you to analyze Chameleon tour performance alongside other product data within Amplitude.

## Considerations

- You must enable this integration in each Amplitude project.
- For this integration to work, you must use the [Amplitude's client-side browser SDK](/docs/sdks/sdk-catalog/browser-sdk) in your web app. This SDK must be available at the root property of `window.amplitude`. Events then go to whichever Amplitude project loaded on the page where the event took place.
- Use this [Google Sheet](https://docs.google.com/spreadsheets/d/1qBiAojhSoUSEGLlwvzAhO5CxFLTNeutA_h2iV9gsvRk/copy) schema to understand the full details of all Chameleon data sent to Amplitude.

## Setup

This guide is complementary to [Chameleon's docs](https://help.chameleon.io/en/articles/1349762-amplitude-integration-user-guide#sending-chameleon-events-to-amplitude).

### Amplitude setup

Copy the Amplitude API key for your project. There are no other setup steps in Amplitude. 

### Chameleon setup

1. Log in to your Chameleon dashboard.
2. Navigate to **Integrations** > **Amplitude**, and then click **Configure**.
3. Click **Edit project** under the Connect to your Amplitude account tile. <!-- markdown-link-check-disable-next-line -->
4. Click **Connect Amplitude** on the [Amplitude Dashboard](https://app.chameleon.io/integrations/amplitude) to open the connection modal.
5. Enter the API Key and Secret Key.
6. Click **Connect**.
7. Turn on the **Send Chameleon data to Amplitude** toggle to send events to Amplitude.
