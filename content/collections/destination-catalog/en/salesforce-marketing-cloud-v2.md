---
id: 1b21e92e-2877-43f1-ab51-cfc87d398186
blueprint: destination-catalog
title: 'Salesforce Marketing Cloud V2'
source: 'https://docs.developers.amplitude.com/data/destinations/salesforce-marketing-cloud-v2'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
partner_maintained: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713480732
connection: destination
integration_type:
  - cohorts
integration_category:
  - marketing-automation
integration_icon: partner-icons/salesforce.svg
use_cases:
  - 'Automate re-engagement and onboarding messages based on custom touchpoints and sales cycle'
  - 'Enable SMS, push, and group messaging, so marketers can deploy fraud alerts and location-based offers based on real-time behavior'
short_description: 'Salesforce Marketing Cloud is a provider of digital marketing automation and analytics software and services.'
---
Salesforce Marketing Cloud provides marketing engagement automation that allows you to engage your users. Using this integration enables your marketing and growth teams to use behavioral data to better target campaigns and increase user engagement.

This integration combines Amplitude's analytics with Salesforce Marketing Cloud. You can export [Behavioral Cohorts](/docs/analytics/behavioral-cohorts) from Amplitude to Salesforce Marketing Cloud so that you can better engage your users. 

{{partial:admonition type="info" title="Differences between v1 and v2"}}
There are several key improvements to the Salesforce Marketing Cloud v2 integration.

In the Salesforce Marketing Cloud v1 integration, you first had to manually create a data extension within Salesforce Marketing Cloud called "Amplitude Engage" and add a dedicated field to this data extension before performing a cohort sync.

In the Salesforce Marketing Cloud v2 integration, all you have to do is follow the standard cohort sync process in Amplitude. Salesforce Marketing Cloud automatically creates a new data extension with a standardized cohort name in the specified folder (if not, default folder 'Data Extensions').
{{/partial:admonition}}

## Considerations

- The Salesforce Marketing Cloud v2 integration is only available on paid Amplitude plans.
- You must enable this integration in each Amplitude project you want to use it in.
- Anonymized UUID as identifiers in both Amplitude and Salesforce Marketing Cloud work for this integration so you don't have to send email addresses or PII to Amplitude.
- Amplitude will automatically create new contacts for users within the Data Extension in Salesforce Marketing Cloud who don't already exist within Salesforce Marketing Cloud.
- Depending on your company's network policy, you may need to add the following IP addresses to your allowlist to allow Amplitude's servers to access your BigQuery instance:

    - Amplitude US IP addresses:
        - 52.33.3.219
        - 35.162.216.242
        - 52.27.10.221 
    - Amplitude EU IP addresses:
        - 3.124.22.25
        - 18.157.59.125
        - 18.192.47.195

## Setup

### Marketing Cloud setup

You need a Subdomain, Client ID, and Client Secret from Salesforce Marketing Cloud.

1. In [Salesforce Marketing Cloud](https://mc.exacttarget.com/), navigate to **Setup** under Settings.
2. In the Quick Find box, search for **Installed Packages**.
3. Click **New** to create a new package.
4. Click **Add Component**.
5. For the Component Type, select **API Integration**. This step generates the API integration information that's required in Amplitude.
6. For the integration type, select **Server-to-Server**.
7. Grant the package these permissions:
    - Contacts
        - Audiences: Read and Write
        - Lists and subscribers: Read and Write
    - Data
        - Data Extensions: Read and Write
8. **Save** the package.
9. Copy the **Client ID**, **Client Secret**, and **Subdomain** from the app you want to integrate.
    - For the Subdomain, see the Authentication Base URI and only copy the subdomain. For example, if the Authentication Base URL is  "https://mc1n78yx33kxv5mv1q7fh81flfjq.auth.marketingcloudapis.com/," then only copy `mc1n78yx33kxv5mv1q7fh81flfjq`.

10. Click on **Access** tab and click on **Enable All Business Units**.
11. (Optional) Create a new folder to hold all your future data extensions. You can do this in the Salesforce Marketing cloud by navigating to **Audience Builder** and clicking on **Data Extensions** at the top navigation bar. Click on "+" to create a new folder. Make sure the folder name is unique for the cohort sync.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Salesforce Marketing Cloud V2**.
3. Paste in the **Client ID**, **Client Secret**, and **Subdomain** credentials you generated in Salesforce Marketing Cloud.
4. (Optional) Enter a folder name you created on the Data Extension page.
5. Provide a **Name** for the Name field. This name will be used as the name for the API Target when you are syncing a cohort from Amplitude. 
6. Map an **Amplitude User Property** to the Marketing Cloud contact key.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select Salesforce Marketing Cloud v2, then click **Next**.
3. Choose the API target you want to sync to.
4. Choose the sync cadence.
5. When finished, save your work.

## Locating your Amplitude Cohort in Salesforce Marketing Cloud

1. Log into [Salesforce Marketing Cloud](https://mc.exacttarget.com/).
2. Click on **Audience Builder** on the top navigation bar and navigate to **Contact Builder**. 
3. Click on **Data Extensions** at the top navigation bar.
4. Find the relevant **Data Extensions** folder that you specified during the setup process.
5. Click on a specific cohort and click on **Records** to view the list of users.
