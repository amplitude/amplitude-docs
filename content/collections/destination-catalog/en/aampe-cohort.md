---
title: Aampe Cohort Sync
description: Send Amplitude cohorts to Aampe for agentic messaging and engagement.
---

Aampe's cohort sync integration enables you to sync your Amplitude cohorts to Aampe in real-time, allowing you to leverage your user segments for personalized messaging and engagement strategies.

[Aampe](https://aampe.com/) deploys individual AI agents, one for each user, that analyze behavior and preferences to deliver hyper-personalized messages across SMS, email, push notifications, and in-app banners. 

## Setup

### Prerequisites

To configure an Event Streaming integration from Amplitude to Aampe, you must fulfill the following prerequisites from Aampe:

- Aampe account


### Aampe setup

1. Log into your Aampe dashboard and copy your **API key** 
    1. Go to [https://compose.aampe.com/system-setup/integrations/events](https://compose.aampe.com/system-setup/integrations/events)
    2. Log in with your organization credentials
    3. Go to System Setup -> Integrations -> Event data import (https://compose.aampe.com/system-setup/integrations/events)
    4. Click **Connect** next to "Aampe endpoint"
    5. Copy the API key


### Amplitude Setup: Aampe Destination

1. Navigate to **Data > Destinations** in your Amplitude dashboard
2. Search for "Aampe" and select **Aampe with subtitle Cohorts**
3. Configure the destination with the following details:
   - **Name**: Aampe - Cohorts
   - **API Key**: You can obtain this from the steps done above by using Aampe setup
4. Select the appropriate User ID mapping that connects to your other Aampe data (preferably a non-PII identifier). The user_id should be able to match the user_id in Aampe.
5. Click **Save**

## Syncing Cohorts

After setting up either integration method:

1. Go to **Users > Cohorts** in Amplitude
2. Select the cohort you want to sync
3. Click **Target Users**
4. Choose **Aampe** as the sync destination
5. Enable **Real-time Sync**
6. Click **Sync**

Your cohort will now sync to Aampe in real-time, allowing you to use these segments for personalized messaging and engagement strategies.

## Data Security

- The integration uses bearer token authentication for secure data transmission
- User IDs should be non-PII identifiers where possible
- All data is transmitted over HTTPS

## Notes

1. Verify your API key is correct
2. Ensure your User ID mapping matches between Amplitude and Aampe
3. Verify your network allows outbound connections to the Aampe API endpoint
