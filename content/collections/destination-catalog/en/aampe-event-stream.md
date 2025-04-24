---
id: 86251fc3-ce13-402b-b026-96526c24eba3
blueprint: destination-catalog
title: 'Aampe Event Stream Sync'
description: 'Stream events and user properties from Amplitude to Aampe for personalized messaging and engagement.'
connection: destination
integration_type:
  - event-streaming
integration_category:
  - messaging
partner_maintained: false
integration_icon: partner-icons/aampe.png
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1745526698
---
Aampe's event stream integration enables you to send user events and properties from Amplitude to Aampe in real-time. This data powers Aampe's AI agents to deliver personalized messaging across multiple channels.

[Aampe](https://aampe.com/) deploys individual AI agents, one for each user, that analyze behavior and preferences to deliver hyper-personalized messages across SMS, email, push notifications, and in-app banners. 

## Prerequisites

This Amplitude to Aampe event streaming integration requires an Aampe account.

## Aampe setup

Retrieve your Aampe API key:

2. Go to [https://compose.aampe.com/system-setup/integrations/events](https://compose.aampe.com/system-setup/integrations/events)
3. Log in with your organization credentials
4. Navigate to *System Setup > Integrations > Event data import*
5. Click **Connect** next to "Aampe endpoint"
6. Copy the API key

### Amplitude setup

1. Navigate to **Data > Destinations** in your Amplitude dashboard
2. Search for "Aampe" and select **Aampe** with subtitle Events and User Properties
3. Enter a sync name click **Create Sync**.
4. Configure the destination with:
   - **REST API Key**: Paste the Aampe API key you copied in [Aampe setup](#aampe-setup)
   - **Mappings**: Select the Amplitude property that maps to the Aampe User ID. The property you choose should match the `user_id` in Aampe.
   - **Send Events**: By default, Amplitude sends all events to Aampe. Optionally define filter criteria to limit the events that Amplitude sends. Optionally select any additional user properties to send with event information to Aampe.
   - **Send users**: Enable the toggle to send users and associated user properties to Aampe. Optionally select additional user properties to send with users to Aampe.
5. Enable the destination when you're ready and click **Save**.

## Data Security

- All API communications use bearer token authentication
- Data is transmitted securely over HTTPS
- User identifiers should be non-PII where possible