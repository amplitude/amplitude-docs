---
title: Aampe Event Stream Sync
description: Stream events and user properties from Amplitude to Aampe for personalized messaging and engagement.
---

Aampe's event stream integration enables you to send user events and properties from Amplitude to Aampe in real-time. This data powers Aampe's AI agents to deliver personalized messaging across multiple channels.

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

### Official Aampe Destination

1. Navigate to **Data > Destinations** in your Amplitude dashboard
2. Search for "Aampe" and select **Aampe** with subtitle Events and User Properties
3. Enter a sync name (**Aampe - Data**), then click **Create Sync**.
4. Configure the destination with:
   - Toggle Status from **Disabled** to **Enabled**.
   - **Name**: Aampe - Data Integration
   - **REST API Key**: Obtain from your Aampe dashboard using the steps linked above.
   - **user_identifier** Select the appropriate User ID mapping that connects to your other Aampe data (preferably a non-PII identifier). The user_id should be able to match the user_id in Aampe.
5. Under **Create & Update users**, make sure the toggle is enabled if you want to send over users and their properties in real time whenever a user is created or user property is updated in Amplitude. This allows Aampe agents to action on the user in real-time
6. Under **Send Events**, make sure the toggle is enabled. When enabled, events are automatically forwarded to Aampe when they're ingested in Amplitude.
7. In **Select and Filter** events choose which events you want to send
   - Recommended: Select all **user events and event properties** for better signals to agents
   - You can also select additional **user properties** to send with each event
8. When finished, enable the destination and Save.

## Data Security

- All API communications use bearer token authentication
- Data is transmitted securely over HTTPS
- User identifiers should be non-PII where possible

## Notes

1. Verify your API key is correct and properly formatted
2. Ensure your network allows outbound connections to the Aampe API endpoint
3. Monitor your event streaming in the Aampe dashboard 