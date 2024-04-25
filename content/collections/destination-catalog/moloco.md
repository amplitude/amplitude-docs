---
id: 263e2efd-9386-4843-b5ef-bfbcb3ff6920
blueprint: destination-catalog
title: Moloco
source: 'https://docs.developers.amplitude.com/data/destinations/moloco'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - event-streaming
integration_category:
  - marketing-automation
partner_maintained: false
integration_icon: partner-icons/moloco.svg
short_description: 'Launch a new profit center with your own ad business.'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713480427
---

[Moloco](https://www.linkedin.com/company/moloco/) is a machine learning company that provides performance solutions for digital advertising. Their products include the Moloco Cloud DSP for mobile advertising and the Moloco Commerce Media (MCM) for online retailers. Both products are powered by Moloco's machine-learning engine, which optimizes campaigns and provides personalized recommendations to customers.

This integration lets you stream events and event properties from Amplitude to Moloco Commerce Media (MCM).

## Considerations

Keep these things in mind when sending events to Moloco Commerce Media (MCM):

- You must enable this integration in each Amplitude project you want to use it in.
- The Amplitude integration is only compatible with Moloco Commerce Media (MCM). 
- You need a Moloco Commerce Media (MCM) account to enable this integration.
- Amplitude matches the **User_id** to the ID field within Moloco Commerce Media (MCM) to associated events. If a user with that id doesn't exist within Moloco Commerce Media (MCM), a user is created. Make sure that the Amplitude **User_id** field matches the Moloco **Identity ID** to avoid user duplication.
- Amplitude sends all user properties along with the event.

## Setup

### Prerequisites

To configure an Event Streaming integration from Amplitude to Moloco Commerce Media (MCM), you need the following information from Moloco Commerce Media (MCM):

- **REST API Key:** To start sending data into Moloco Commerce Media (MCM), you first have to get your API Key. It is used to authenticate your requests to the API and connect the data with your account. Find this in your Moloco Commerce Media (MCM) account. 

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Moloco**.
3. Enter a sync name, then click **Create Sync**.
4. Toggle Status from **Disabled** to **Enabled**.
5. Paste your **REST API Key** and **Platform ID**.
6. Toggle the **Send events**.
7. In **Select and filter events** choose which events you want to send. Choose only the events you need in Moloco. *Transformed events aren't supported.*
8. Under **Map properties to destination**, choose your user identifier and map specific Amplitude properties from Amplitude to Moloco.
9. When satisfied with your configuration, click **Save**.

## Use Cases

1. **Real-time User Segmentation:** By sending streaming data from Amplitude, which is a comprehensive analytics platform, to Moloco, you can create real-time user segments based on various attributes and behaviors. This enables you to target specific user groups with personalized advertisements and optimize campaign performance accordingly.
2. **Dynamic Ad Creative Optimization:** By integrating Amplitude's streaming data with Moloco's machine learning engine, you can leverage real-time user insights to dynamically optimize ad creative elements. This includes dynamically adjusting ad content, images, offers, and calls to action based on user preferences and behaviors, resulting in more engaging and effective advertisements.
3. **Behavioral Retargeting:** Amplitude captures user behavior data across various touchpoints, providing valuable insights into user engagement and conversion patterns. By streaming this data to Moloco, you can implement behavioral retargeting strategies, where users who have shown specific behaviors or indicated interest in certain products or services are retargeted with relevant ads across different channels and devices.
