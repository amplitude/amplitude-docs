---
id: 007916ba-740a-4159-87fb-38e5e51a54c0
blueprint: destination-catalog
use_cases:
  - 'Use the insights provided by Amplitude to inform experimentation and feature flagging strategies in Statsig.'
  - 'Identify the most effective feature variations for specific user groups and improve user engagement and satisfaction.'
short_description: 'Ship code and grow your product faster with Statsig'
integration_category:
  - experimentation
integration_type:
  - event-streaming
partner_doc_link: 'https://docs.statsig.com/integrations/data-connectors/amplitude'
title: Statsig (Event Stream)
source: 'https://docs.developers.amplitude.com/data/destinations/statsig'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/statsig.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713480200
---

[Statsig](https://statsig.com/) is a modern feature-management and product experimentation platform that helps you to ship faster by providing actionable causal analysis, meaningful data insights, and automatically running 10x more experiments.
 
## Considerations

Keep these things in mind when sending events to Statsig:

- You must enable this integration in each Amplitude project you want to use it in.
- Amplitude matches the `user_id` to the id within Statsig to associated events. If user with that ID doesn't exist in Statsig, then Statsig creates one. Make sure that the Amplitude `user_id` field matches the Statsig id field to avoid user duplication.
- The limits for Statsig events are:
    - Maximum user identifier and event name: 64 bytes
    - Maximum size of metadata: 2048 bytes (stringified JSON)
    - Amplitude sends all user, event, and group properties along with the event.

## Setup

### Statsig setup

To configure an Event Streaming integration from Amplitude to Statsig, you need the Server Secret Key from Statsig.

See the [Statsig documentation](https://docs.statsig.com/feature-gates/implement/server#step-1-get-the-statsig-server-secret-key) instructions to retrieve it.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Statsig**.
3. Enter a sync name, then click **Create Sync**.
4. Toggle Status from **Disabled** to **Enabled**.
5. Paste your Statsig **Server Secret Key**.
6. Toggle the **Send events** filter to select the events to send. You can send all events, but Amplitude recommends choosing the most important ones.
7. When finished, enable the destination and save.
