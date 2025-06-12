---
id: a85a6a0c-d843-4563-908b-18299fe2ed47
blueprint: destination-catalog
use_cases:
  - 'Better engage users based on their patterns of interaction with your product and their lifecycle timing by syncing behavioral cohorts from Amplitude with Marketo.'
  - 'Personalize your Marketo campaigns by targeting the right users with the right messages at the right stages of their journey using Amplitude’s powerful segmentation capabilities.'
short_description: 'Marketo develops and sells marketing automation software for account-based marketing and other marketing services and products including SEO and content creation.'
integration_category:
  - marketing-automation
integration_type:
  - cohorts
title: Marketo
source: 'https://docs.developers.amplitude.com/data/destinations/marketo'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/marketo.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713479467
---
This integration combines Amplitude with Marketo's tools for in-app messaging, push notifications, and email. Use it to sync behavioral cohorts from Amplitude to Marketo, and better engage your users based on their patterns of interaction with your product and their lifecycle timing. Amplitude's powerful segmentation capabilities let you personalize your campaigns by targeting the right users with the right messages at the right stages of their journey.

## Considerations

- Email values are case-sensitive. If you use email address to map users between Amplitude and Marketo, the email address must be consistent between both systems.
- Enable **Upsert Leads** on the cohort sync screen to create Amplitude users in Marketo if they don't already exist.

## Setup

### Marketo setup

1. Copy your Marketo `Client Id`, `Client Secret`, and `REST API Endpoint`. See [Marketo's documentation](https://developers.marketo.com/blog/quick-start-guide-for-marketo-rest-api/) for help with this.

{{partial:admonition type="example" title="Example keys"}}
- `Client ID`: `97890c99-9999-46e4-bccc-351071cd5c3b`
- `Client Secret`: `xzy3XYZxyZqIroHtliA7mDKTx7NUXyZZ`
- `REST API Endpoint`: `https://133-CDN-660.mktorest.com/rest`
{{/partial:admonition}}

2. Create a new custom Boolean field in Marketo to identify your cohorts. This field flags whether a user in Marketo belongs to your Amplitude cohort. See the [Marketo documentation](https://developers.marketo.com/blog/create-a-custom-field-in-marketo-and-update-this-field-via-api/) for help creating the field. You must create a custom field for **each** cohort you want to sync. 
2. Copy the API name of your field. You need this to configure the integration. 

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Marketo**.
3. Enter the API key, API secret, and base URL. The base URL is the same as the REST API endpoint.
4. Enter the rest of the information requested by the modal:
    - For *Name*, enter the name for the API key, so you can select the API target when syncing cohorts.
    - For *Amplitude User Property,* select the Amplitude field you want Marketo to match with.
    - For *Target,* enter the Marketo field to match to the Amplitude user property.

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose Marketo.
2. Choose the destination.
3. Enter the name of the Marketo custom field. This is the API name you copied during Marketo setup.
4. Select the sync cadence.
5. Save your work.

Users who belong have a checkmark next to the custom field you've created, and you can filter for these lists of users.
