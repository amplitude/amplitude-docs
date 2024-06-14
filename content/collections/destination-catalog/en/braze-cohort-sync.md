---
id: 010e6c63-2545-4d85-aa38-cbd3b01a3d12
blueprint: destination-catalog
title: 'Braze (Cohort Sync)'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - cohorts
integration_category:
  - marketing-automation
partner_doc_link: 'https://www.braze.com/docs/partners/data_and_infrastructure_agility/analytics/amplitude/amplitude_audiences/#sync-user-traits-and-computations'
partner_maintained: false
integration_icon: partner-icons/braze.svg
use_cases:
  - 'Sending Cohorts to Braze: This feature empowers organizations to utilize their Amplitude cohorts within Braze for targeted marketing campaigns. By seamlessly transferring cohort data, customers can craft personalized messaging strategies tailored to specific customer segments. This enhances user acquisition, retention, and overall customer satisfaction by delivering relevant content based on individual behavior and preferences.'
short_description: 'A comprehensive customer engagement platform that powers relevant experiences between consumers and brands they love. Braze helps foster human connection through interactive conversations across channels.'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713560326
---

Amplitude Data's Braze integration lets you send your Amplitude cohorts straight to Braze with just a few clicks.

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.
- You need a paid Amplitude plan to enable this integration.
- For more details on using this integration in Braze, see the [Braze documentation](https://www.braze.com/docs/partners/data_and_infrastructure_agility/analytics/amplitude/amplitude_audiences/).
- You must have a Braze account. 

## Setup

### Prerequisites

To configure a cohort integration from Amplitude to Braze, you need the following information from Braze:

1. Data Import Key
 
    - In Braze, click **Partner Integrations** then click on **Amplitude** and **Generate New Key**. 
    - See [Braze documentation](https://www.braze.com/docs/partners/data_and_infrastructure_agility/analytics/amplitude/amplitude_audiences/#step-1-get-the-braze-data-import-key) for more detail.

2. Endpoint: the endpoint for the REST operations 

     - In Braze, click on **Partner Integrations** and click **Amplitude**.
     - It looks like: `https://rest.iad-##.braze.com`. See the [Braze documentation](https://www.braze.com/docs/api/basics/#endpoints) to find your endpoint.

3. App Group REST API Key
   
     - In Braze, click **Settings**, click **API Keys** and then click **Create New API Key** OR choose an existing API key.
     - Find this in your Braze Developer Console. See the [Braze documentation](https://www.braze.com/docs/api/basics/#rest-api-key) for more detail.

### Amplitude setup 

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Braze**.
3. Enter your App Group REST API key, select your endpoint, and paste your Data Import Key.
4. Select an Amplitude User Property and a Braze target object. 
5. When finished, save.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select Braze, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence.
5. When finished, save your work.

## Use the cohort in Braze

1. In Braze, to create a segment of these users, navigate to **Audience** and click on **Segments**.
2. Click on **Create Segment** and name your Segment.
3. Under Add Filter, select **Amplitude Cohorts** and choose the cohort you created and synced from Amplitude.
4. When saved, you can reference this segment during Canvas or campaign creation in the targeting users step.
