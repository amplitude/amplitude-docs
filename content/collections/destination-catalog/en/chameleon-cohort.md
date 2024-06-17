---
id: bdd8beac-9847-4603-848c-cb818d545bd5
blueprint: destination-catalog
title: 'Chameleon (Cohort)'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - cohorts
partner_maintained: false
integration_icon: partner-icons/chameleon.svg
source: 'https://www.docs.developers.amplitude.com/data/destinations/chameleon-cohort/'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718650007
---
[Chameleon](https://www.chameleon.io/) is a product adoption platform which allows you to create beautiful product guidance that helps, guides, and delights your users throughout their journey. Build, manage and optimize your product tours without writing code. This Chameleon integration allows you to analyze Chameleon tour performance alongside other product data within Amplitude.

{{partial:admonition type="note" heading=""}}
This integration is maintained by Chameleon. [Contact the Chameleon support team](mailto:help@trychameleon.com) with any questions about this integration.
{{/partial:admonition}}

## Considerations

- You must enable this integration in each Amplitude project.
- For this integration to work, you must use the [Amplitude's client-side browser SDK](../sdks/typescript-browser/index.md) in your web app. This SDK must be available at the root property of `window.amplitude`. Events then go to whichever Amplitude project loaded on the page where the event took place.
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