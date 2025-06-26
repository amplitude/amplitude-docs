---
id: 74ce0abb-800b-4404-a9e9-526624f256b0
blueprint: destination-catalog
use_cases:
  - "Utilize Segment's software and APIs to collect, clean, and control customer data across various digital touchpoints. By sending events from Segment to Amplitude, businesses can leverage Amplitude's analytics capabilities to gain deeper insights into user behavior, track key metrics, and optimize product experiences."
  - 'Send Amplitude behavioral cohorts to Segment to leverage them with ad networks, marketing automation tools, and personalization engines. By utilizing cohorts created in Amplitude, businesses can better tailor campaigns and product experiences based on user behavior and attributes.'
short_description: "Join 20,000+ businesses that use Segment's software and APIs to collect, clean, and control their customer data."
integration_category:
  - cdp
integration_type:
  - cohorts
partner_doc_link: 'https://segment.com/docs/connections/destinations/catalog/amplitude/'
title: Segment
source: 'https://docs.developers.amplitude.com/data/destinations/segment'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
partner_maintained: false
integration_icon: partner-icons/segment.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713480063
connection: destination
---

Send Amplitude behavioral cohorts to Segment to use with your ad networks, marketing automation tools, and personalization engines so you can better tailor campaigns and product experiences.

## Considerations

- To configure this integration, you need a level of access that allows you to configure sources in Segment and integrations in Amplitude. For Amplitude users, this means you need Admin or Manager privileges.
- This integration sends `user_id` values from behavioral cohorts to Segment, along with an attribute that flags the cohort each user belongs to. 
- Anonymous users aren't supported.
- You can sync behavioral cohorts to your Segment-connected raw data warehouses and downstream destinations that accept Segment identify events. Amplitude sets cohorts as unique user traits in Segment with True/False values to reflect whether the given user belongs to the cohort that has been synced.

## Setup

### Segment setup

1. Add Amplitude as a source on your Segment account. Follow the directions in [Segment's documentation.](https://segment.com/docs/sources/cloud-apps/amplitude-cohorts/)
2. Copy the Amplitude source's `writeKey` from Segment. You need this key for the setup in Amplitude.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Segment**.
3. Click **Add New Key** and paste the `writeKey` (the key you copied in step 2).
4. Enter a name for the Segment `writeKey` you pasted. (You can use the same name you used for the Amplitude source in Segment). When you add multiple Segment destinations to receive cohorts, the name helps you identify which destination you're sending to. 
5. Save when finished.

## Send a cohort

Amplitude sends cohort data to Segment by triggering an identify call for each user in the syncing cohort. This appears as `<cohort_name> (<cohort_id>)` with `True` or `False` as the value, depending on whether the given user satisfies the cohort's membership criteria at that time.

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose Segment.
2. Choose the API target. This is the name you gave the integration in Amplitude.
3. Select the sync cadence. If you're not sure which selection is best, try setting up automated, recurring syncs for any strategically essential cohorts, whereas one-time syncs are more appropriate for project work.
4. Save your work.
