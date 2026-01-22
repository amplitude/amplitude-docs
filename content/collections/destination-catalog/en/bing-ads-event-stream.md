---
id: 7f8e9d2c-3a4b-5c6d-8e9f-1a2b3c4d5e6f
blueprint: destination-catalog
use_cases:
  - 'Stream behavioral event data from Amplitude to Bing Ads through the Microsoft Conversions API (CAPI). Sync key user actions—such as purchases, sign-ups, and product views—directly to Bing Ads to improve conversion tracking, optimize campaigns, and enhance ad targeting on the Microsoft Advertising Network.'
short_description: 'Stream events from Amplitude to Bing Ads to improve conversion tracking and campaign optimization on the Microsoft Advertising Network.'
integration_category:
  - ad-networks
integration_type:
  - event-streaming
title: 'Bing Ads (Event Stream)'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/bing.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1732492800
---
Stream behavioral event data from Amplitude to Bing Ads through the Microsoft Conversions API (CAPI). This integration enables you to send server-side conversion events directly to Bing Ads, helping you track conversions more accurately, optimize automated bidding, and improve remarketing campaigns on the Microsoft Advertising Network.

By enabling real-time event streaming, this integration helps you:
- Optimize campaign performance with richer behavioral data.
- Enhance remarketing and audience targeting.
- Support automated bidding with more complete conversion data.

## Considerations

- You need a Microsoft Advertising account with a Universal Event Tracking (UET) tag configured.
- Bing Ads requires SHA256 encryption for email and phone identifiers. If your Amplitude property isn't pre-encrypted, Amplitude applies the hash before sending to Bing Ads.
- This integration uses the Bing Ads Conversions API: `https://capi.uet.microsoft.com/v1/{tagID}/events`
  - Documentation: [Microsoft Conversions API Guide](https://learn.microsoft.com/en-us/advertising/guides/uet-conversion-api-integration?view=bingads-13)
- You must include at least one user identifier (`anonymousId`, `externalId`, `em`, `ph`, `msclkid`, `idfa`, `gaid`) with each event.
- Include the `msclkid` (Microsoft Click ID) parameter whenever available to link events to ad clicks.
- Type requirements:
  - Phone numbers must be in E.164 format (for example, `+14155552671`).
  - Currency values must use ISO 4217 currency codes (for example, `USD`, `EUR`, `JPY`).
  - Price and value must be in number format (for example, `19.99`).
  - Quantity must be an integer (for example, `2`).
  - Event time must be in Unix UTC timestamp format (seconds since epoch).

## Setup

### Prerequisites

Before you begin, you need:
- A [Microsoft Advertising](https://ads.microsoft.com/) account is required.
- **UET Tag ID**: You can find your configured UET tags in your Microsoft Advertising account under *Conversions > UET tag*.
- **Microsoft Conversions API Access Token**: Contact your Microsoft Advertising Account Manager to obtain this token.

### Create a new sync

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the **Events** section, click **Bing Ads**.
3. Enter a sync name, then click **Create Sync**.

### Enter credentials

1. Enter your **UET Tag ID**.
2. Enter your **Microsoft Conversions API Access Token**.

### Configure event forwarding

Under **Send Events**, make sure the toggle is enabled if you want to stream events to Bing Ads. When enabled, Amplitude automatically forwards events to Bing Ads when it ingests them. Amplitude doesn't send events on a schedule or on-demand using this integration.

1. Select the **Event Type**:
   - **Custom**: For action-based events like purchases, sign-ups, and user interactions.
   - **Page Load**: For page view events. When you select Page Load, map the **Event Source URL** parameter to capture the page URL.

2. In **Select and filter events**, choose which events you want to send. Choose only the events you need in Bing Ads. You can stream any events from your tracking plan.

3. In **Map properties to destination**, map Amplitude properties to Bing Ads properties. You must include at least one user identifier with each event. See the full list of [Bing Ads user properties supported by Amplitude](#supported-bing-ads-properties).

### Enable sync

When satisfied with your configuration, at the top of the page toggle the **Status** to "Enabled" and click **Save**.

After you enable the integration, Amplitude streams the selected events to Bing Ads in real time. Events appear under your UET tag, where you can use them for conversion tracking, automated bidding, and remarketing.

## Supported Bing Ads properties

See the [Microsoft Conversions API documentation](https://learn.microsoft.com/en-us/advertising/guides/uet-conversion-api-integration?view=bingads-13) for details on accepted values and formats.

### User properties

Amplitude sends these user properties as Bing Ads user identifiers for event attribution and audience matching.

{{partial:admonition type="note" heading="Required properties"}}
Ensure you send at least one required identifier with each event.
{{/partial:admonition}}

| Property Name                                             | Hashed |
| --------------------------------------------------------- | ------ |
| Email <span class="required">required</span>              | ✅      |
| Phone <span class="required">required</span>              | ✅      |
| Anonymous ID <span class="required">required</span>       |        |
| External ID <span class="required">required</span>        |        |
| Microsoft Click ID <span class="required">required</span> |        |
| IDFA <span class="required">required</span>               |        |
| GAID <span class="required">required</span>               |        |
| IP Address                                                |        |
| User Agent                                                |        |



### Event properties

These event properties enrich your event data for conversion tracking and remarketing.

- Event ID
- Event Source URL
- Page Load ID
- Referrer URL
- Page Title
- Event Category
- Event Label
- Event Value
- Search Term
- Transaction ID
- Value
- Currency
- Items
- Item IDs
- Page Type
- E-commerce Total Value
- E-commerce Category
