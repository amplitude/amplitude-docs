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

{{partial:admonition type="note" title="One-way sync"}}
This integration syncs data from Amplitude to Marketo only. Marketo data doesn't flow back into Amplitude. This is a destination integration for cohort syncing.
{{/partial:admonition}}

## Use cases

1. **Better engage users based on behavioral patterns:** Sync behavioral cohorts from Amplitude to Marketo to better engage your users based on their patterns of interaction with your product and their lifecycle timing.
2. **Personalize marketing campaigns:** Use Amplitude's powerful segmentation capabilities to personalize your Marketo campaigns by targeting the right users with the right messages at the right stages of their journey.
3. **Account-based marketing:** Leverage Amplitude's user behavior data to create targeted account-based marketing campaigns in Marketo.

## Considerations

- Email values are case-sensitive. If you use email address to map users between Amplitude and Marketo, the email address must be consistent between both systems.
- Enable **Upsert Leads** on the cohort sync screen to create Amplitude users in Marketo if they don't already exist.

## Setup

### Marketo setup

1. Copy your Marketo `Client Id`, `Client Secret`, and `REST API Endpoint`. Go to [Marketo's documentation](https://developers.marketo.com/blog/quick-start-guide-for-marketo-rest-api/) for help with this.

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

## Properties

When syncing cohorts to Marketo, Amplitude uses the user property you specify during setup to match users between Amplitude and Marketo.

### User identifiers

You can map any Amplitude user property to a Marketo field during setup. Common mappings include:

- **Email address**: Most commonly used identifier for matching users between Amplitude and Marketo.
- **User ID**: If your user ID is consistent across both systems.
- **Custom user properties**: Any custom user property that exists in both Amplitude and Marketo.

{{partial:admonition type="note" title="Property mapping"}}
During Amplitude setup, select the Amplitude user property to map to Marketo. The property you choose must exist in both systems and have consistent values for successful user matching.
{{/partial:admonition}}

### Cohort membership

When you sync a cohort to Marketo, Amplitude creates or updates a custom Boolean field in Marketo for each cohort. This field indicates whether a user belongs to the cohort:

- `true`: User is in the cohort.
- `false`: User isn't in the cohort.

You must create a custom Boolean field in Marketo for each cohort you want to sync. The field name must match the API name you enter during the sync process.

## Example use case

A marketing manager wants to create a targeted email campaign in Marketo for users who added items to their cart but didn't complete a purchase.

Here are the steps you can take:

1. In Amplitude, create a cohort of users who performed the "Add to Cart" event but didn't perform the "Purchase Completed" event within seven days.
2. Set up the Marketo destination in Amplitude, mapping the email address user property to Marketo's email field.
3. Create a custom Boolean field in Marketo called "Cart Abandoners" (or similar).
4. Sync the cohort to Marketo, specifying the custom field name.
5. In Marketo, create an email campaign that targets leads where the "Cart Abandoners" field is `true`.
6. Set up automated workflows in Marketo to send reminder emails or special offers to this cohort.

This approach lets you leverage Amplitude's behavioral segmentation to create highly targeted marketing campaigns in Marketo based on actual user behavior in your product.
