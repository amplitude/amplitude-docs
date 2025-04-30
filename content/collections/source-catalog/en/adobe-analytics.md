---
id: 05cf1a4c-4c34-4519-874e-4c5335fe8dac
blueprint: source-catalog
use_cases:
  - 'Utilize Adobe Analytics to connect and track customer behavior across different devices and channels, offering a unified view of the customer journey.'
  - "Leverage Adobe Analytics' advanced reporting capabilities within Amplitude to gain actionable insights, enabling data-driven decisions to optimize marketing campaigns, improve product features, and enhance overall business strategies."
short_description: 'Adobe provides analytics and optimizations for mobile apps and brings together all marketing capabilities across Adobe Marketing Cloud.'
integration_category:
  - marketing-analytics
integration_type:
  - raw-events
partner_doc_link: 'https://amplitude.com/blog/adobe-customers-can-see-user-behavior-with-amplitude'
title: 'Adobe Analytics'
source: 'https://www.docs.developers.amplitude.com/data/sources/adobe-analytics'
category: 'Marketing Analytics'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
partner_maintained: false
integration_icon: partner-icons/adobe-experience-cloud.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713818759
connection: source
---
With Amplitude's Adobe Analytics integration, you can import your Adobe Analytics data directly into Amplitude, without any engineering work. Dive deeper into your Adobe-generated customer and product data, give your data governors more self-service control, and connect customer behavior across devices and channels. Your teams can go beyond single-device page view data and see a detailed, cross-platform view of all customer behavior.

This integration also gives your team better visibility into how raw data comes into your analytics system from various sources. This visibility comes in handy for not only planning and analyzing data, but also maintaining control, compliance, and privacy.

This article helps guide you through the process of ingesting Adobe data into Amplitude.

## Considerations

- This feature is available to customers on the [Enterprise, Growth, and Scholarship](https://amplitude.com/pricing) plans.
- Amplitude suggests reading this [blog post on how Adobe and Amplitude work together](https://amplitude.com/blog/adobe-customers-can-see-user-behavior-with-amplitude). You may also want to go over the [Data Taxonomy Playbook](https://help.amplitude.com/hc/en-us/articles/115000465251-Data-Taxonomy-Playbook) before getting started.
- Amplitude maps Adobe data like this: 
    - For `event_type,` Amplitude looks up the events in the Adobe event list and compares it to a lookup table where the event names are defined.
    - `user_id:` Amplitude uses `postvisidhigh` or, if that's not available, `postvisidlow`.
    - `device_id`: Amplitude uses `custvisid`.
    - User properties aren't synced in this integration. 
    - Amplitude receives data with the Adobe field names (for example, event1, event2, event3). For that reason, Amplitude recommends that you add display names for events.

## Set up and use the integration

{{partial:admonition type="tip" title=""}}
Amplitude recommends that you create a test project or development environment for each production project to test your instrumentation.
{{/partial:admonition}}

To integrate Amplitude with Adobe Analytics, follow these steps:

1. Open or create the project where you'd like to use your Adobe Analytics data. Then click **Data Sources**.
2. Click **I want to import data into Amplitude**, then click **Adobe Analytics**.
3. Follow the on-screen instructions. 
4. On the *Enable Data Source* tab, enter a name and description for this data source, and confirm your event mapping preferences.
5. When you're done, click **Save Source**. Then click **Finish**.

You should now see Adobe Analytics in your list of data sources. 

To view the daily events uploaded chart, click on the Adobe Analytics data source.