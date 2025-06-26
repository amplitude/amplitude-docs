---
id: 979832a9-fc4e-4218-a8ce-7ddc8f7ea050
blueprint: destination-catalog
use_cases:
  - 'Filter customer feedback based on cohorts created within Amplitude and categorize the insights into themes that can inform the product roadmap.'
  - 'Make better decisions about what to build and who might be most affected when you ship new features.'
short_description: 'Helping product teams anchor their work to figure out what and why to build next.'
integration_category:
  - collaboration
integration_type:
  - cohorts
title: Productboard
source: 'https://docs.developers.amplitude.com/data/destinations/productboard'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/productboard.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713479992
---

By integrating Productboard with Amplitude, you can filter customer feedback based on cohorts created within Amplitude, and categorize the insights into themes that can inform the product roadmap. Product managers can then make better decisions about what to build and who might be most affected when you ship new features .

## Considerations

With this integration, you can choose whether to use Amplitude User_ID, Email or both as the user identifier for matching users across Amplitude and Productboard.

## Setup

For more details on using this integration, see [Productboard's documentation](https://support.productboard.com/hc/en-us/articles/4415882801299-Integrate-Productboard-with-Amplitude-to-combine-behavioral-data-with-customer-feedback?utm_medium=referral&utm_source=partner&utm_campaign=pt_aw_all_support_all_product-release_fy22q1&utm_content=product-release-amplitude-helpcenter).

### Productboard setup

1. In Productboard, navigate to **Settings > Integrations** and scroll down to *Public API*.
2. Click **+** to generate a new Productboard access token. Name the token something easy to understand, like "Amplitude Cohort Sync".
3. Save the token.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Productboard**.
3. Enter a name and paste the token you copied from Productboard.
4. Select the Amplitude properties that map onto the Productboard user ID, email and external ID properties.
   
{{partial:admonition type="info" title="More about properties"}}
- **User ID**: <span class="required">Required</span>. This is a unique, immutable ID that Productboard uses to identify users. If a user has two different user IDs, two unique users appear in Productboard. Consider mapping an external ID so Productboard can deduplicate users.
- **Email**: <span class="optional">Optional</span>. If this is mapped, Amplitude sends user email addresses to Productboard.
- **External ID**: <span class="optional">Optional</span>. If this is mapped, Amplitude sends an external ID to Productboard. Productboard can merge users with the same external ID. Learn more in the [Productboard documentation](https://support.productboard.com/hc/en-us/articles/9140206978707-External-ID-Management-FAQs-and-Troubleshooting)
{{/partial:admonition}}   
      
5. Save when finished.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose Productboard.
2. Choose the API target. This is the name you gave the integration in Amplitude.
3. Select the sync cadence. If you're not sure which selection is best, try setting up automated, recurring syncs for any strategically essential cohorts, whereas one-time syncs are more appropriate for project work.
4. Save your work.

You should be able to use the cohort on Productboard within 30 minutes.
