---
id: ab2ebc69-4ba5-4ec6-8801-2b2336f1314f
blueprint: destination-catalog
title: 'Marketo Static List'
source: 'https://docs.developers.amplitude.com/data/destinations/marketo-static-list'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - cohorts
integration_category:
  - marketing-automation
partner_maintained: false
integration_icon: partner-icons/marketo.svg
use_cases:
  - 'Create a targeted marketing campaign based on user cohorts created in Amplitude.'
  - 'Automate emails from Marketo based on activities tracked in a cohort.'
  - 'Reduce the number of fields in Marketo by syncing cohorts to lists instead of fields.'
short_description: 'Marketo develops and sells marketing automation software for account-based marketing and other marketing services and products including SEO and content creation.'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713479430
---
The Marketo static list destination lets you export cohorts into Marketo as a static list, sending them to a destination folder or program of your choice. Use this to leverage Marketo’s tools for in-app messaging, push notifications, and email campaigns to better engage your users. 

{{partial:admonition type="note" title=""}}
This page is about the Marketo Static List destination. Unlike the [Marketo Cohort](/docs/data/destination-catalog/marketo) destination, this integration automatically exports cohorts as a static list in Marketo.
{{/partial:admonition}}

## Considerations

- Email values are case-sensitive. If you use email addresses to map users between Amplitude and Marketo, the email address must be consistent between both systems.
- Marketo generates Amplitude users that don't already exist in Marketo.

## Setup

### Marketo setup


{{partial:admonition type="note" title=""}}
This steps require Marketo Administrator privileges.
{{/partial:admonition}}

You need your Marketo Client ID, Client Secret, and REST API Endpoint. For more detailed instructions, visit [Marketo's documentation](https://developers.marketo.com/blog/quick-start-guide-for-marketo-rest-api/).

1. Create a role with "Read-Write Person" and "Read-write Assets" permissions under "Access API"
2. Create an API-only user and associate it with the API role created previously.
3. Go to **Admin > Integration > Launchpoint** to create a new service. Set 'Service' to 'Custom' and select the API Only User you created in the last step.
4. On the service, click **View Details** and copy the `Client ID` and `Client Secret`.
5. Go to **Admin > Integration > Web Services** and copy the REST API Endpoint. **Important**: Remove the `\rest` at the end of the endpoint. If you don't remove it, the integration doesn't work correctly.

{{partial:admonition type="example" title="Example Keys"}}
- `Client ID:` `97890c99-9999-46e4-bccc-351071cd5c3b`
- `Client Secret:` `xzy3XYZxyZqIroHtliA7mDKTx7NUXyZZ`
- `REST API Endpoint:` `https://133-CDN-660.mktorest.com`
{{/partial:admonition}}

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Marketo Static List**.
3. Enter the name for the connection.
4. Paste the Client ID, Client Secret, and REST API endpoint you copied from Marketo.
5. Assign the Amplitude field mapping for email. This must be a unique identifier.
6. Save when finished.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **Marketo Static List**, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the folder/program type and provide the folder/program ID.
    a. The program ID can be found in the URL, and is the 4-5 digits between the G and A in the URL of the selected program. 
5. Choose the sync cadence.
6. When finished, save your work.

It may take a few minutes depending on the size of your cohort to see the correct number of cohort users on Marketo's side.

## Use cases

1. Create a marketing campaign targeted at a cohort of users created on Amplitude
2. Automate emails from Marketo based on activities tracked in a cohort
3. Reduce the number of fields in Marketo by syncing cohorts to lists instead of fields

## Common issues

### User discrepancies between Amplitude and Marketo

- Some destinations like Marketo may return a 2XXs response indicating the cohort sync has synced successfully out from Amplitude. However sometimes, the 3rd party destination will silently drop users who don't meet their criteria, and this exclusion might not be communicated back to Amplitude. To check whether a user was successfully transferred, you can review the CSV file from Amplitude. While Amplitude strives to identify cases where users aren't included at third-party platforms by analyzing response codes, fully detecting every instance of silent user exclusion due to technical constraints may not always be achievable. If you encounter issues or have queries, check out this [guide](/docs/cdp/audiences/third-party-syncs) for more information on how you can investigate and diagnose cohort sync discrepancies in a self-serve manner.
