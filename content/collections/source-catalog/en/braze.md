---
id: 8e0e6981-c5fe-4cfe-8e48-df30e1181cc8
blueprint: source-catalog
use_cases:
  - 'Sending Cohorts to Braze: This feature empowers organizations to utilize their Amplitude cohorts within Braze for targeted marketing campaigns. By seamlessly transferring cohort data, customers can craft personalized messaging strategies tailored to specific customer segments. This enhances user acquisition, retention, and overall customer satisfaction by delivering relevant content based on individual behavior and preferences.'
  - 'Sending Events to Braze: This capability allows organizations to transmit event data from Amplitude to Braze in real-time. By streaming events, such as user interactions or product usage, to Braze, customers gain deeper insights into customer behavior and engagement patterns. Braze can then leverage this data to trigger automated messages, optimize marketing campaigns, and deliver personalized experiences across various digital channels. This fosters more effective communication with customers and drives higher conversion rates.'
  - "Sending Events from Braze back to Amplitude: This use case enables a bidirectional flow of data between Braze and Amplitude. After processing customer interactions and engagements within Braze, relevant event data can be sent back to Amplitude. By integrating this data into Amplitude's analytics platform, customers gain a comprehensive view of customer behavior and campaign performance. This holistic understanding allows customers to refine their marketing strategies, identify growth opportunities, and optimize the customer experience for enhanced satisfaction and loyalty."
short_description: 'A comprehensive customer engagement platform that powers relevant experiences between consumers and brands they love. Braze helps foster human connection through interactive conversations across channels.'
integration_category:
  - marketing-automation
integration_type:
  - cohorts
  - event-streaming
  - raw-events
partner_doc_link: 'https://www.braze.com/docs/partners/data_and_infrastructure_agility/analytics/amplitude/amplitude_audiences/#sync-user-traits-and-computations'
title: Braze
source: 'https://www.docs.developers.amplitude.com/data/sources/braze'
category: 'Marketing Automation'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
partner_maintained: false
integration_icon: partner-icons/braze.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713820679
---
Amplitude's Braze integration lets you send Braze events into Amplitude using Braze Currents. Combine your marketing engagement data from Braze with your product analytics in Amplitude for a complete view of the customer journey.

## What Braze does

Braze is a customer engagement platform that delivers personalized experiences across email, push notifications, in-app messages, and other digital channels. It combines real-time behavioral data with automated messaging to help businesses create targeted marketing campaigns and drive customer engagement.

## Use case

Import Braze engagement events into Amplitude to analyze campaign performance alongside product and marketing analytics. By bringing Braze marketing events into Amplitude, you can understand how campaigns impact product usage, create unified customer journey analyses, and measure the full impact of your marketing efforts on product outcomes.

## Prerequisites

To configure Braze to send events to Amplitude, you need the following from Amplitude:

1. **Amplitude Export API Key**  
   * In Amplitude, navigate to *Settings > Projects*, then select your project.  
   * Go to the General tab and locate your API Key in the project details.  
2. **Amplitude Region**: Your Amplitude data residency region (`US` or `EU`).

## Considerations

* Configure this integration in Braze to send events to your Amplitude project.  
* This integration requires Braze Currents. Currents is available with certain Braze packages. Contact your Braze Customer Success Manager or support@braze.com if you need access.  
* Events sent from Braze to Amplitude count toward your Amplitude event volume quota.  
* Braze only sends event data for users who have their `external_user_id` set or anonymous users who have their `device_id` set.  

  {{partial:admonition type="warning" heading="Important"}}
  Your Amplitude user ID must match the Braze external ID for proper user identification.
  {{/partial:admonition}}

* For anonymous users, set the user's device ID in Amplitude to the device ID used in Braze.
* All events sent to Amplitude include the user's `external_user_id` as the Amplitude user ID.  
* Braze events are subject to Amplitude's HTTP API rate limits: 30 events/second for each device and 500K events/day for each device. If you exceed these thresholds, Amplitude throttles events.  
* Keep your Amplitude API key up to date. If the connector's credentials expire, it stops sending events to Amplitude. If the connector goes more than 48 hours without sending an event, Amplitude drops the connector's events, and you permanently lose that data.

## Braze setup

Review [Braze's documentation](https://www.braze.com/docs/partners/data_and_infrastructure_agility/analytics/amplitude/amplitude_audiences/) for setup instructions. 

## Troubleshooting

### Events aren't appearing in Amplitude

* Verify that users in Braze have their `external_user_id` set (for identified users) or `device_id` set (for anonymous users).  
* For anonymous users, confirm that you synced your Amplitude device ID with your Braze device ID in your SDK implementation.  
* Check that your Amplitude API key is valid and hasn't expired.  
* Make sure you don't exceed rate limits (30 events/second for each device, 500K events/day for each device).

### Events are delayed

* If you exceed Amplitude's rate limits (30 events/second or 500K events/day for each device), Amplitude throttles events, causing delays.  
* Check your SDK integration to ensure your app reports events at a normal rate.  
* Avoid running automated tests that generate many events for a single device.

### Users aren't matching between Braze and Amplitude

* Confirm that your Amplitude user ID matches the Braze external ID.  
* For identified users who were originally created as anonymous users in Braze, they can't be identified by their `device_id` and must use `external_user_id`.