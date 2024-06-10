---
id: 3460df36-4b4b-42dc-869d-24ef5673741e
blueprint: destination-catalog
use_cases:
  - 'Provide high-quality, personalized help at any scale by layering human, self-serve, and proactive support.'
  - 'Onboard, activate, and re-engage customers with targeted outbound messages, product tours, and email campaigns.'
  - 'Convert more website visitors into customers with targeted messages, bots, and real-time chat.'
short_description: 'Intercom is the world’s first Conversational Relationship Platform, helping businesses build better customer relationships through personalized, messenger-based experiences.'
integration_category:
  - customer-engagement
integration_type:
  - event-streaming
partner_doc_link: 'https://www.intercom.com/app-store/apps/amplitude'
title: Intercom (Event Stream)
source: 'https://docs.developers.amplitude.com/data/destinations/intercom'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/intercom.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713478974
---

Amplitude CDP's Intercom streaming integration enables you to forward your Amplitude events and users straight to [Intercom](https://www.intercom.com/) with just a few clicks.

## Setup

### Prerequisites

#### Create a new Intercom app

1. From the [Intercom Developer Hub](https://developers.intercom.com/), click on **Your Apps**.
2. Click **New App**.
3. Enter a name and select a workspace.
4. Click **Create App**.

See [Intercom's documentation](https://developers.intercom.com/building-apps/docs/get-started-developing-on-intercom#create-an-app) for more detailed instructions on creating an app.

#### Required information

To configure streaming from Amplitude to Intercom, you need the following information from Intercom.

**Intercom Access Token**: The Intercom Access Token for your Intercom app.

1. From the [Intercom Developer Hub](https://developers.intercom.com/), click on **Your Apps**.
2. Click on your app.
3. Navigate to the **Authentication** page.
4. The **Intercom Access Token** is listed immediately below the workspace name under **Access Token**.

### Create a new sync

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Intercom**.
3. Enter a sync name, then click **Create Sync**.

### Enter credentials

1. Select your **Intercom API Endpoint**.
2. Enter your **Intercom Access Token**.

### Configure mappings

_This applies to both event and user forwarding. Transformed user properties aren't supported._

1. Select an Amplitude user property that corresponds to your Intercom user ID, from the left dropdown.
2. Select the type of your Intercom user ID, from the right dropdown.
    - **User ID**: Any unique identifier for each user in Intercom.
    - **Email**

### Configure event forwarding

Under **Send Events**, make sure the toggle is enabled ("Events are sent to Intercom") if you want to stream events to Intercom. When enabled, events are automatically forwarded to Intercom when they're ingested in Amplitude. Events aren't sent on a schedule or on-demand using this integration. Events are sent to Intercom as [Intercom data events](https://developers.intercom.com/intercom-api-reference/reference/the-data-event-model). Intercom has a limit of 120 event types.

Intercom triggers an event `[Intercom] event.created` when Intercom creates events, including events from Amplitude's Event Streaming integration.
If you don't want Amplitude to store these events, use Amplitude's [block or drop filters](https://help.amplitude.com/hc/en-us/articles/16805784778907-Remove-invalid-or-incorrect-data) to remove this data.

1. In **Select and filter events** choose which events you want to send. Choose only the events you need in Intercom. _Transformed events aren't supported._

{{partial:admonition type="warning" title="Anonymous user event streaming"}}
Intercom requires that all events have a user ID present. If you have selected any events to send to Intercom that may not have a user ID, add a filter to send only events where the user ID is present. Additionally, events can only be streamed for users that already exist in Intercom. Otherwise, your delivery metrics may be affected.
{{/partial:admonition}}

2. (optional) In **Select additional properties**, select any more event and user properties you want to send to Intercom. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to Intercom as [Intercom event metadata](https://developers.intercom.com/intercom-api-reference/reference/the-data-event-model#metadata-object). Intercom has a limit of 20 metadata values per event. _Transformed event properties and transformed user properties aren't supported._

### Configure user forwarding

To stream user and property updates to Intercom, enable **Send Users**. This setting creates or updates users in Intercom when you update them in Amplitude with the [HTTP V2 API](/docs/analytics/apis/http-v2-api/) or [Identify API](/docs/analytics/apis/identify-api/). This integration doesn't support scheduled or on-demand updates. Each user is created as an [Intercom contact](https://developers.intercom.com/intercom-api-reference/reference/the-contact-model).

You can optionally select user properties to send to Intercom in the **Select additional properties** field. Amplitude sends only the properties you select and only when one of them is updated. Amplitude sends these properties as [Intercom custom attributes](https://www.intercom.com/help/en/articles/179-send-custom-user-attributes-to-intercom/). _This integration doesn't support transformed user properties_.

### Enable sync

When satisfied with your configuration, at the top of the page toggle the **Status** to "Enabled" and click **Save**.
