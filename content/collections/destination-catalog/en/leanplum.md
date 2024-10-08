---
id: 5fd76e10-7c93-4522-b0f4-8f35a8b8bfca
blueprint: destination-catalog
use_cases:
  - "With this integration, businesses can leverage Amplitude's advanced analytics to identify and segment user groups based on behavior and attributes. These cohorts are seamlessly integrated into Leanplum's platform, enabling targeted messaging, personalized content delivery, and tailored user experiences. By combining Amplitude's analytics capabilities with Leanplum's marketing automation tools, businesses can drive better audience engagement and foster long-term relationships with customers."
short_description: 'Multi-channel customer engagement platform that understands and transforms customer data, behavior, and context to enable personalized campaigns that build customer loyalty and drive revenue.'
integration_category:
  - marketing-automation
integration_type:
  - cohorts
partner_doc_link: 'https://docs.leanplum.com/docs/amplitude-integration'
title: Leanplum
source: 'https://docs.developers.amplitude.com/data/destinations/leanplum'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/leanplum.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713479262
---
Leanplum helps mobile teams orchestrate multi-channel campaigns from messaging to the in-app experience, all from a single mobile marketing platform.

Use this integration to match Amplitude's analytics capabilities with Leanplum's marketing automation tools to drive better audience engagement. Sync cohorts created in Amplitude to Leanplum where they're available as saved audiences. 

{{partial:admonition type="note" heading="Other Amplitude + Leanplum integrations"}}
This integration sends Amplitude cohorts to Leanplum. Amplitude offers other integrations with Leanplum: 

- [Import Leanplum Data](/docs/data/source-catalog/leanplum)
{{/partial:admonition}}

## Considerations

- You need a Leanplum account. Reach out to Leanplum's Customer Success Manager or Account Manager to enable this integration.
- You need a paid Amplitude plan to use this integration. 
- The integration doesn't sync [anonymous users](https://amplitude.zendesk.com/hc/en-us/articles/115003135607-Tracking-Unique-Users#anonymous-users), so make sure all users you send to Leanplum have unique User IDs set in Amplitude.

## Setup

For more information on setting up this integration, see [Leanplum's documentation.](https://docs.leanplum.com/docs/amplitude-integration)

### Leanplum setup 

1. From your Leanplum dashboard, go to **Partner Integrations → Amplitude**.
2. Click **+** to create an Amplitude Secret.
3. Copy the Amplitude Secret and your App ID.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Leanplum**.
3. Enter a Leanplum App ID, API key, and name. Map an Amplitude user property to the Leanplum user ID. 
4. Save when finished.

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose Leanplum.
2. Choose the destination.
3. Select the sync cadence.
4. Save your work.
   
Allow up to 30 minutes for the audience and the users in it to populate in your Audiences dashboard in Leanplum. Audiences synced from Amplitude have a "Amplitude:" prefix.