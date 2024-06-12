---
id: 3d99d4e9-e683-47df-9856-055f488805bb
blueprint: destination-catalog
use_cases:
  - 'Organizations can stream event data from Amplitude to Customer.io in real-time. By leveraging this integration, businesses can enrich their Customer.io profiles with detailed behavioral data captured by Amplitude. This enables more accurate segmentation, personalized messaging, and automated workflows within Customer.io, leading to more effective marketing campaigns and enhanced customer experiences.'
short_description: 'Customer.io helps you send automated email, push, SMS, and webhooks based on your customers’ activities and makes conversion tracking, optimization and re-marketing easier.'
integration_category:
  - marketing-automation
integration_type:
  - event-streaming
partner_doc_link: 'https://customer.io/docs/journeys/amplitude-out/'
title: Customer.io (Event Stream)
source: 'https://docs.developers.amplitude.com/data/destinations/customer-io'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/customerio.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713478471
---

Amplitude CDP's Customer.io streaming integration enables you to forward your Amplitude events and users straight to [Customer.io](https://customer.io/) with just a few clicks.

## Setup

### Prerequisites

To configure streaming from Amplitude to Customer.io, you need the following information from Customer.io.

- **Customer.io Tracking Site ID**: The Customer.io Site ID used for authenticating with the track API.
- **Customer.io Tracking API Key**: The Customer.io API Key used for authenticating with the track API.

See the [Customer.io documentation](https://www.customer.io/docs/api/track/#section/Authentication/Basic-Auth-(Tracking-API-Key)) for help locating your track API credentials.

### Create a new sync

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Customer.io**.
3. Enter a sync name, then click **Create Sync**.

### Enter credentials

1. Enter your **Customer.io Tracking Site ID**.
2. Enter your **Customer.io Tracking API Key**.
3. Select your **Customer.io Account Region**.

### Configure mappings

_This applies to both event and user forwarding. Transformed user properties aren't supported._

Select an Amplitude user property that corresponds to your **Customer.io User Identifier**, from the left dropdown.

- If the selected Amplitude user property values contains email addresses, Customer.io will match users on the [Customer.io email](https://customer.io/docs/identifying-people/#identifiers) (case-insensitive).
- If the selected Amplitude user property values are prefixed with `cio_`, Customer.io will match users on the [Customer.io canonical identifier](https://customer.io/docs/identifying-people/#cio_id), a unique identifier provided by Customer.io for each user.
- Customer.io limits the **Customer.io User Identifier** values to be no more than 150 bytes in size.

### Configure event forwarding

Under **Send Events**, make sure the toggle is enabled ("Events are sent to Customer.io") if you want to stream events to Customer.io. When enabled, events are automatically forwarded to Customer.io when they're ingested in Amplitude.

{{partial:admonition type="info" title="Keep in mind"}}
- Events aren't sent on a schedule or on-demand using this integration.
- Events are sent to Customer.io as [Customer.io events](https://www.customer.io/docs/api/track/#tag/Track-Events), including web page views and mobile screen views.
- Customer.io automatically creates a new user in Customer.io if the provided **Customer.io User Identifier** doesn't exist in Customer.io.
{{/partial:admonition}}


1. In **Select and filter events** choose which events you want to send. Choose only the events you need in Customer.io. _Transformed events aren't supported._

{{partial:admonition type="warning" title="Events for anonymous users"}}
Customer.io requires that all events have a user ID present. If you have selected any events to send to Customer.io that may not have a user ID, add a filter to send only events where the user ID is present. Otherwise, your delivery metrics may be affected.
{{/partial:admonition}}

2. (optional) In **Select additional properties**, select any more event and user properties you want to send to Customer.io. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to Customer.io as [Customer.io event data](https://www.customer.io/docs/events/#event-name-and-data). _Transformed event properties and transformed user properties aren't supported._

### Configure user forwarding

To stream user and property updates to Customer.io, enable **Send Users**. This setting creates or updates users in Customer.io when you update them in Amplitude with the [HTTP V2 API](/docs/analytics/apis/http-v2-api/) or [Identify API](/docs/apis/analytics/identify). This integration doesn't support scheduled or on-demand updates.

You can optionally select user properties to send to Customer.io in the **Select additional properties** field. Amplitude sends only the properties you select and only when one of them is updated. Amplitude sends these properties as [Customer.io user attributes](https://www.customer.io/docs/attributes/). _This integration doesn't support transformed user properties_.

### Enable sync

When satisfied with your configuration, at the top of the page toggle the **Status** to "Enabled" and click **Save**.
