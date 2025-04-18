---
id: 06872cc1-b613-496a-925c-c9c784a0ab77
blueprint: destination-catalog
use_cases:
  - 'Better understand the impact of your advertising efforts and gain visibility into the customer experience by sending Amplitude events to Meta Pixel'
short_description: "Amplitude Activation's Meta Pixel streaming integration enables you to forward your Amplitude events and users straight to Meta Pixel with just a few clicks."
integration_category:
  - ad-networks
integration_type:
  - event-streaming
title: 'Meta Pixel'
source: 'https://docs.developers.amplitude.com/data/destinations/meta-pixel'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/meta.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713479522
---
Amplitude Activation's Meta Pixel streaming integration enables you to forward your Amplitude events and users straight to Meta Pixel with just a few clicks.

## Setup

### Prerequisites

To configure streaming from Amplitude to Meta Pixel, you need the following information from Meta Pixel.

- **Meta Pixel ID**: The Pixel ID for your Pixel. See the [Meta Pixel documentation](https://developers.facebook.com/docs/marketing-api/conversions-api/get-started/#pixel-id) for help locating your Pixel ID.
- **Meta Pixel Conversions API Access Token**: The access token used for authentication. See the [Meta Pixel documentation](https://developers.facebook.com/docs/marketing-api/conversions-api/get-started/#access-token) for help generating an access token.

### Create a new sync

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Meta Pixel**.
3. Enter a sync name, then click **Create Sync**.

### Enter credentials

1. Enter your **Meta Pixel ID**.
2. Enter your **Meta Pixel Conversions API Access Token**.

### Configure event forwarding

_You must have a Meta developer account to access any events forwarded to Meta Pixel. The rate limits for Meta Pixel are determined on a per-account basis. If you have rate limiting issues, report them to your Meta CSM._

Under **Send Events**, make sure the toggle is enabled ("Events are sent to Meta Pixel") if you want to stream events to Meta Pixel. When enabled, events are automatically forwarded to Meta Pixel when they're ingested in Amplitude. Events aren't sent on a schedule or on-demand using this integration. 

1. In **Select and filter events** choose which events you want to send. Choose only the events you need in Meta Pixel. _Transformed events aren't supported._

2. In **Map properties to destination**:
    _These user properties are sent as [Meta Pixel Customer Information Parameters](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters/). Transformed user properties aren't supported._

    1. Select an Amplitude user property that corresponds to your [**External ID**](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/external-id/), from the left dropdown.
    2. (recommended) Map Amplitude user properties to Meta Pixel properties. It's recommended that you map Amplitude properties to as Meta Pixel properties as possible, for the best conversions.
        1. Select an Amplitude user property that corresponds to a Meta Pixel property, from the left dropdown.
        2. Select the Meta Pixel property, from the corresponding right dropdown.

    See the full list of [Meta Pixel properties that are supported by Amplitude](#supported-meta-pixel-properties).

3. (optional) In **Select additional properties**, select any more event and user properties you want to send to Meta Pixel. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to Meta Pixel as [Meta Pixel Custom Data Parameters](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/custom-data). _Transformed event properties and transformed user properties aren't supported._

### Enable sync

When satisfied with your configuration, at the top of the page toggle the **Status** to "Enabled" and click **Save**.

## Supported Meta Pixel properties

| Parameter Name    | Required              | Hashed                |
|-------------------|:---------------------:|:---------------------:|
| **External ID**   | ✅   | ✅   |
| Email             |                       | ✅   |
| Phone Number      |                       | ✅   |
| First Name        |                       | ✅   |
| Last Name         |                       | ✅   |
| Date of Birth     |                       | ✅   |
| Gender            |                       | ✅   |
| City              |                       | ✅   |
| State             |                       | ✅   |
| Zip Code          |                       | ✅   |
| Country           |                       | ✅   |
| Client IP Address |                       |                       |
| Client User Agent |                       |                       |
| Click ID          |                       |                       |
| Browser ID        |                       |                       |
| Subscription ID   |                       |                       |
| Facebook Login ID |                       |                       |
| Lead ID           |                       |                       |
