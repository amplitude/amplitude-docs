---
id: c2261c0e-9ea7-46d1-8cce-b27d6ef82e58
blueprint: destination-catalog
title: 'Customer.io (Cohort Sync)'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - cohorts
integration_category:
  - marketing-automation
partner_maintained: false
source: https://www.docs.developers.amplitude.com/data/destinations/customerio-cohort/
integration_icon: partner-icons/customerio.svg
use_cases:
  - 'This capability allows businesses to sync their Amplitude cohorts with Customer.io. By integrating Amplitude cohorts into Customer.io, organizations can create targeted messaging campaigns based on user behavior captured in Amplitude. This enables personalized communication and engagement strategies tailored to specific customer segments, driving higher conversion rates and improved customer satisfaction.'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713560928
---
[Customer.io](http://customer.io/) is a messaging platform that allows marketers to turn ideas into powerful automated message campaigns. [Customer.io](http://customer.io/)'s logic-based tools help you capture every edge case and connect to the real people in your audience.

{{partial:admonition type="note" heading="Send Amplitude events to Customer.io"}}
This integration sends Amplitude cohorts to Customer.io. There is a separate integration to send Amplitude events. See [Send events to Customer.io](/docs/data/destination-catalog/customer-io) for information.
{{/partial:admonition}}

## Considerations

- This integration is only available for customers who have paid plans with Amplitude. 
- The users in your cohort must exist in Customer.io before the sync from Amplitude. Users that don't exist in Customer.io are ignored and not shown in the sync.
- You must enable this integration in each Amplitude project you want to use it in. 
- To use this integration for EU data centers, specify the EU region during setup.

## Setup

### Customer.io setup

1. Find your Customer.io API key by opening Customer.io and navigating to **Account Settings > API Credentials**.
2. Copy the **Tracking API Key**, the **Site ID**, and **App API Key**.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Customer.io**.
3. Enter a name, tracking API key, site ID, and app API key. 
4. Select a region. 
5. Map an Amplitude property to the Customer.io user ID. 
6. Save when finished.

## Send a cohort

1. From the Cohorts page in Amplitude, click the cohort you want to send, or create a cohort.
2. Click **Sync**.
3. Select **Customer.io**, then click **Next**.
4. From the *Select an API target to sync to list*, select your destination.
5. Set the sync cadence.
6. When finished, click **Sync**.
  
After you have exported the cohort, you can see the cohort in the [Segments](https://customer.io/docs/segments/) section of the Customer.io platform. You can use segments as recipient lists, campaign triggers, filters, conversion goals and more. Whenever you need to reference a subset of the people in your workspace, you use a segment.
