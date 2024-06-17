---
id: c94102aa-4167-44c2-a21b-f6134b3aed17
blueprint: destination-catalog
title: 'Humanic.ai (Event stream)'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - event-streaming
partner_maintained: false
integration_icon: partner-icons/humanic-ai.svg
source: 'https://www.docs.developers.amplitude.com/data/destinations/humanic-ai-event-streaming/'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718655642
---
[Humanic AI](https://www.humanic.ai/) is an Agentic Marketing Platform that helps you unlock growth by using AI agents. 

{{partial:admonition type="note" heading=""}}
This integration is maintained by Humanic AI. Email [care@humanic.ai](mailto:care@humanic.ai) for support with this integration. 
{{/partial:admonition}}

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.
- You need an Humanic.ai account to enable this integration.
- Amplitude sends selected user, event, and group properties along with the event.

## Setup

### Humanic AI setup

1. Log in to your [Humanic AI account](https://dashboard.humanic.ai/).
2. Navigate to the **Profile** section by clicking on the name icon located on top right.
3. Go to the **API Key** tab and click on the **Create** button.
4. Copy the API key as this will be required to setup the integration in Amplitude.

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Humanic AI - Event Stream**.
2. Enter a sync name, then click **Create Sync**.
3. Toggle Status from **Disabled** to **Enabled**.
4. Paste your **Humanic.ai API key** that you copied from Humanic dashboard.
5. Toggle the **Send events filter** to select the events to send. Humanic AI recommends choosing the events that are most important to your use case.
6. Use the **Event Properties** filter to select which Event Properties you would like to send.
7. When finished, enable the destination and **Save**.
