---
id: 2f06bc2b-baa8-4aad-8391-b0e53fcdfe8e
blueprint: destination-catalog
use_cases:
  - 'The use case with sending event data from Fivetran to Amplitude involves streamlining data integration and analytics processes. By syncing event data from various sources through Fivetran, organizations can centralize their data in Amplitude for comprehensive analysis. This integration allows businesses to gain deeper insights into user behavior, engagement patterns, and product usage across multiple platforms and channels. With a unified view of data in Amplitude, organizations can make data-driven decisions, optimize marketing strategies, and enhance the overall user experience.'
short_description: 'Fivetran is the leader in automated data integration, delivering ready-to-use connectors that adapt to change.'
integration_category:
  - etl
integration_type:
  - raw-events
partner_doc_link: 'https://fivetran.com/docs/applications/amplitude'
title: Fivetran
source: 'https://docs.developers.amplitude.com/data/destinations/fivetran'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/fivetran.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713478548
---

Fivetran is the leader in automated data integration, delivering ready-to-use connectors that adapt to change. Using this integration, you can forward events from Amplitude to your destination using the Fivetran connector.

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.
- Sync frequencies to Fivetran are dependent on the plan level. Syncs can be anywhere from 1 minute to 24 hours. The default sync frequency is 6 hours.

## Setup

This guide complements the [Fivetran Amplitude setup guide](https://fivetran.com/docs/applications/amplitude/setup-guide).

### Amplitude setup

Copy the Amplitude API key for your project. There are no other setup steps in Amplitude.

### Fivetran setup

1. Log into your Fivetran dashboard.
2. In the [connector setup form](https://fivetran.com/docs/getting-started/fivetran-dashboard/connectors#addanewconnector), enter the Destination schema name of your choice.
3. Click **Add Project**.
4. Enter the project name, `apiKey`, and `secretKey` you found in [Step 1](https://fivetran.com/docs/applications/amplitude/setup-guide#getapikeyandsecretkey).
5. Click **OK**.
6. Click **Save & Test**. Fivetran starts syncing your data from your Amplitude account.