---
id: 1ee2b9cd-8d8f-48dd-9145-4ac707d89115
blueprint: source-catalog
use_cases:
  - 'Create targeted cohorts for your email marketing needs by sending Amplitude cohorts to MailChimp'
  - 'Personalize your messaging by sending your Amplitude events and users to MailChimp with one click.'
  - 'Import Mailchimp subscribe and unsubscribe events to measure the success of your marketing efforts.'
short_description: 'Mailchimp provides an email marketing platform. Features include campaign design, tracking, segmentation and list management.'
integration_category:
  - marketing-automation
integration_type:
  - raw-events
  - cohorts
title: Mailchimp
source: 'https://www.docs.developers.amplitude.com/data/sources/mailchimp'
category: 'Marketing Automation'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
partner_maintained: false
integration_icon: partner-icons/mailchimp.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713825454
---
Mailchimp is an all-in-one Marketing Platform for small business. Mailchimp empowers millions of customers around the world to start and grow their businesses with smart marketing technology, award-winning support, and inspiring content.

Use this integration to import Mailchimp subscribe and unsubscribe events.

## Considerations

- This integration is only available for customers who have paid plans with Amplitude.
- Mailchimp events are sent to Amplitude from a specific [Mailchimp audience](https://mailchimp.com/help/getting-started-audience/ "https://mailchimp.com/help/getting-started-audience/"). If you don't have an existing audience, you need to [create one](https://mailchimp.com/help/create-audience/ "https://mailchimp.com/help/create-audience/").
- Events received from Mailchimp all have the `[Mailchimp]` prefix. 
- Only `[Mailchimp] subscribe` and `[Mailchimp] unsubscribe` are supported.

## Setup 

### Mailchimp setup

[Find your Mailchimp audience ID](https://mailchimp.com/help/find-audience-id/) for the audience you would like to use for sending events to Amplitude. If you have multiple audiences, you must set sup this integration for each one.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Sources** tab.
2. In the Other Sources section, click **Mailchimp**.
3. Click **Connect to Mailchimp**. This redirects you to a Mailchimp login page.
4. Enter your username and password on the Mailchimp login page. Then click **Log In**.
5. Authorize Amplitude to access to your account. Click **Allow.** You are then automatically redirected back to Amplitude, to the Connect Mailchimp page.
6. Enter your [Mailchimp audience ID](https://mailchimp.com/help/find-audience-id), then click **Next**. This automatically creates a webhook on your Mailchimp audience to send events to Amplitude.

{{partial:admonition type="note" title=""}}
There is a limit of **one** webhook per specific Mailchimp audience and Amplitude project. If a webhook for this Mailchimp audience and Amplitude project already exists, it's reset to the default configurations supported by Amplitude. Amplitude supports only Mailchimp `subscribe` and `unsubscribe` events, from Mailchimp user sources only.
{{/partial:admonition}}

After Amplitude starts receiving events from your Mailchimp audience, Mailchimp appears on the Data Sources page, under *Sources,* with a status of *Connected*.