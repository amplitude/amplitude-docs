---
id: 74389f98-3646-437f-bc39-c6e29a2d917b
blueprint: destination-catalog
title: 'Aampe Cohort Sync'
description: 'Send Amplitude cohorts to Aampe for agentic messaging and engagement.'
connection: destination
integration_type:
  - cohorts
integration_category:
  - messaging
partner_maintained: false
integration_icon: partner-icons/aampe.png
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1745526730
---
Aampe's cohort sync integration enables you to sync your Amplitude cohorts to Aampe in real-time, allowing you to leverage your user segments for personalized messaging and engagement strategies.

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


## Amplitude setup

1. Navigate to **Data > Destinations** in Amplitude
2. Search for `Aampe` and click **Aampe Cohorts**
3. Click **Add another destination**
4. Configure the destination with the following details:
   - **Name**: Provide a descriptive name for this instance of the integration.
   - **API Key**: Paste the Aampe API key you copied in [Aampe setup](#aampe-setup)
   - Select the Amplitude property that maps to the Aampe User ID. The property you choose should match the `user_id` in Aampe.
5. Click **Save**

## Sync Cohorts

After setting up either integration method:

1. Go to **Users > Cohorts** in Amplitude
2. Select the cohort you want to sync
3. Click **Target Users**
4. Choose **Aampe** as the sync destination
5. Enable **Real-time Sync**
6. Click **Sync**

Your cohort syncs to Aampe in real-time, allowing you to use these segments for personalized messaging and engagement strategies.

## Data Security

- The integration uses bearer token authentication for secure data transmission
- User IDs should be non-PII identifiers where possible
- All data is transmitted over HTTPS